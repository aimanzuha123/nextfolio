-- ═══════════════════════════════════════════════════════════════
-- Nextfolio — Supabase Database Schema
-- AI-Powered Portfolio Generator for Students
-- ═══════════════════════════════════════════════════════════════

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- USERS TABLE (extends Supabase auth.users)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  location TEXT,
  stream TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'student-pro', 'career-pro')),
  plan_started_at TIMESTAMPTZ,
  plan_expires_at TIMESTAMPTZ,
  referral_code TEXT UNIQUE DEFAULT gen_random_uuid()::text,
  referred_by UUID REFERENCES public.profiles(id),
  is_admin BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- PORTFOLIOS TABLE
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.portfolios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  template_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_url TEXT,
  custom_domain TEXT,
  
  -- Portfolio Data (JSONB for flexibility)
  personal_details JSONB DEFAULT '{}',
  education JSONB DEFAULT '[]',
  skills JSONB DEFAULT '[]',
  projects JSONB DEFAULT '[]',
  experience JSONB DEFAULT '[]',
  
  -- AI Generated Content
  ai_content JSONB DEFAULT '{}',
  ats_score INTEGER DEFAULT 0,
  
  -- Design Customization
  design_config JSONB DEFAULT '{"primaryColor": "#6366f1", "fontFamily": "Inter", "borderRadius": 12}',
  
  -- Analytics
  views_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  
  -- Metadata
  resume_file_url TEXT,
  source_zip_url TEXT,
  qr_code_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,
  
  UNIQUE(user_id, slug)
);

-- ─────────────────────────────────────────────────────────────
-- TEMPLATES TABLE
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  colors JSONB DEFAULT '[]',
  preview_url TEXT,
  html_template TEXT,
  css_template TEXT,
  is_premium BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- PORTFOLIO VIEWS (Analytics)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.portfolio_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE NOT NULL,
  visitor_ip TEXT,
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  page_path TEXT DEFAULT '/',
  session_duration INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- BILLING / SUBSCRIPTIONS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('student-pro', 'career-pro')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'expired', 'past_due')),
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_provider TEXT DEFAULT 'razorpay',
  provider_subscription_id TEXT,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- INVOICES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.invoices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  subscription_id UUID REFERENCES public.subscriptions(id),
  invoice_number TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'pending', 'failed', 'refunded')),
  payment_method TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- AI GENERATION JOBS (Queue)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.generation_jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  job_type TEXT NOT NULL DEFAULT 'full' CHECK (job_type IN ('full', 'rewrite', 'ats-check', 'linkedin')),
  input_data JSONB DEFAULT '{}',
  output_data JSONB DEFAULT '{}',
  error_message TEXT,
  processing_time_ms INTEGER,
  retry_count INTEGER DEFAULT 0,
  max_retries INTEGER DEFAULT 3,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- ─────────────────────────────────────────────────────────────
-- SUPPORT TICKETS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.support_tickets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ticket_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to UUID REFERENCES public.profiles(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- FEATURE TOGGLES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.feature_toggles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'general',
  is_enabled BOOLEAN DEFAULT false,
  metadata JSONB DEFAULT '{}',
  updated_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- SYSTEM LOGS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.system_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  level TEXT NOT NULL CHECK (level IN ('info', 'warning', 'error', 'success')),
  message TEXT NOT NULL,
  service TEXT,
  user_id UUID REFERENCES public.profiles(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────
-- REFERRALS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE public.referrals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  referrer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  referred_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reward_type TEXT DEFAULT 'theme_unlock',
  reward_claimed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(referrer_id, referred_id)
);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY POLICIES
-- ═══════════════════════════════════════════════════════════════

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_jobs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Portfolios: Users can CRUD their own portfolios
CREATE POLICY "Users can view own portfolios" ON public.portfolios FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create portfolios" ON public.portfolios FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own portfolios" ON public.portfolios FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own portfolios" ON public.portfolios FOR DELETE USING (auth.uid() = user_id);

-- Published portfolios are publicly readable
CREATE POLICY "Published portfolios are public" ON public.portfolios FOR SELECT USING (status = 'published');

-- Subscriptions: Users can view their own
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Invoices: Users can view their own
CREATE POLICY "Users can view own invoices" ON public.invoices FOR SELECT USING (auth.uid() = user_id);

-- Generation Jobs: Users can view their own
CREATE POLICY "Users can view own jobs" ON public.generation_jobs FOR SELECT USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════
-- INDEXES
-- ═══════════════════════════════════════════════════════════════

CREATE INDEX idx_portfolios_user_id ON public.portfolios(user_id);
CREATE INDEX idx_portfolios_slug ON public.portfolios(slug);
CREATE INDEX idx_portfolios_status ON public.portfolios(status);
CREATE INDEX idx_portfolio_views_portfolio_id ON public.portfolio_views(portfolio_id);
CREATE INDEX idx_portfolio_views_created_at ON public.portfolio_views(created_at);
CREATE INDEX idx_generation_jobs_user_id ON public.generation_jobs(user_id);
CREATE INDEX idx_generation_jobs_status ON public.generation_jobs(status);
CREATE INDEX idx_system_logs_level ON public.system_logs(level);
CREATE INDEX idx_system_logs_created_at ON public.system_logs(created_at);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);

-- ═══════════════════════════════════════════════════════════════
-- FUNCTIONS & TRIGGERS
-- ═══════════════════════════════════════════════════════════════

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_portfolios_updated_at BEFORE UPDATE ON public.portfolios FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_templates_updated_at BEFORE UPDATE ON public.templates FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Increment portfolio views
CREATE OR REPLACE FUNCTION increment_portfolio_views()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.portfolios SET views_count = views_count + 1 WHERE id = NEW.portfolio_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_portfolio_view_created
  AFTER INSERT ON public.portfolio_views
  FOR EACH ROW EXECUTE FUNCTION increment_portfolio_views();

-- ═══════════════════════════════════════════════════════════════
-- SEED DATA: Default Templates
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.templates (id, name, category, description, colors, is_premium) VALUES
('developer-dark-neon', 'Developer Dark Neon', 'Engineering', 'Bold neon accents on a dark canvas', '["#0a0a0a", "#00ff88", "#6366f1", "#22d3ee"]', false),
('startup-founder', 'Startup Founder', 'Business', 'Clean, minimal, and bold', '["#ffffff", "#0f172a", "#6366f1", "#f59e0b"]', false),
('corporate-executive', 'Corporate Executive', 'MBA', 'Professional elegance with a corporate edge', '["#f8fafc", "#1e293b", "#0ea5e9", "#0f766e"]', true),
('finance-professional', 'Finance Professional', 'Commerce', 'Trust-inspiring design for finance professionals', '["#ffffff", "#0c4a6e", "#059669", "#d97706"]', true),
('creative-designer', 'Creative Designer', 'Design', 'Vibrant and expressive layout', '["#faf5ff", "#7c3aed", "#ec4899", "#f59e0b"]', true),
('legal-elegant', 'Elegant Legal', 'Law', 'Sophisticated and authoritative', '["#fffbeb", "#1c1917", "#92400e", "#78350f"]', true),
('healthcare-clean', 'Healthcare Clean', 'Medical', 'Clean, trustworthy design', '["#f0fdf4", "#064e3b", "#059669", "#0ea5e9"]', true),
('fresher-modern', 'Fresher Modern', 'All Streams', 'Fresh, modern, and energetic', '["#09090b", "#818cf8", "#f472b6", "#34d399"]', false);

-- Seed default feature toggles
INSERT INTO public.feature_toggles (id, name, description, category, is_enabled) VALUES
('ai-generation', 'AI Portfolio Generation', 'Enable AI-powered content generation', 'Core', true),
('one-click-deploy', 'One-Click Deploy', 'Deploy portfolios to Vercel/Netlify', 'Core', true),
('ats-checker', 'ATS Score Checker', 'Resume ATS scoring', 'AI Features', true),
('linkedin-optimizer', 'LinkedIn Optimizer', 'AI LinkedIn optimization', 'AI Features', true),
('career-roadmap', 'Career Roadmap AI', 'Career growth suggestions', 'AI Features', false),
('referral-system', 'Referral System', 'Invite friends for rewards', 'Growth', true),
('public-gallery', 'Public Gallery', 'Public portfolio showcase', 'Growth', false),
('rate-limiting', 'Rate Limiting', 'API rate limiting', 'Security', true),
('maintenance-mode', 'Maintenance Mode', 'Show maintenance page', 'System', false);
