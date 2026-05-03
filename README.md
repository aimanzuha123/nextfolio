# Nextfolio — AI-Powered Portfolio Generator

<div align="center">

**Build stunning portfolios in minutes. Powered by AI.**

[Live Demo](https://nextfolio.ai) · [Documentation](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## 🚀 What is Nextfolio?

Nextfolio is a premium AI-powered SaaS platform that helps students and freshers from all streams create:

- ✨ **Stunning Portfolio Websites** — 8 professionally designed templates
- 📄 **ATS-Ready Resumes** — AI-optimized, recruiter-approved
- 🤖 **AI-Generated Content** — Professional bios, summaries, project descriptions
- 🔗 **LinkedIn Optimization** — Compelling profiles that attract opportunities
- 📊 **Career Insights** — Skill gap analysis, role recommendations, career roadmaps
- 🌐 **One-Click Deploy** — Instant live portfolio with shareable link + QR code

## 🎯 Target Users

Students and freshers from: MCA, BCA, Engineering, MBA, BBA, Commerce, Arts, Science, Law, Medical, Design, and all graduate programs.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | Tailwind CSS v4, Framer Motion |
| **Backend** | n8n (workflow automation) |
| **Database** | Supabase (PostgreSQL + Auth + Storage) |
| **AI** | OpenAI GPT-4, Anthropic Claude |
| **Email** | Resend |
| **Hosting** | Vercel |

## 📁 Project Structure

```
nextfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout + SEO
│   │   ├── globals.css               # Design system
│   │   ├── pricing/                  # Pricing page
│   │   ├── templates/                # Templates gallery
│   │   ├── faq/                      # FAQ page
│   │   ├── contact/                  # Contact page
│   │   ├── auth/
│   │   │   ├── login/                # Login
│   │   │   └── signup/               # Signup
│   │   ├── dashboard/
│   │   │   ├── page.tsx              # Dashboard overview
│   │   │   ├── layout.tsx            # Dashboard layout + sidebar
│   │   │   ├── wizard/               # 7-step portfolio wizard
│   │   │   ├── results/              # AI generation results
│   │   │   ├── editor/               # Live portfolio editor
│   │   │   ├── analytics/            # Analytics dashboard
│   │   │   ├── billing/              # Plans & billing
│   │   │   └── settings/             # Account settings
│   │   └── admin/
│   │       ├── page.tsx              # Admin overview
│   │       ├── layout.tsx            # Admin layout
│   │       ├── users/                # User management
│   │       ├── revenue/              # Revenue dashboard
│   │       ├── templates/            # Template management
│   │       ├── logs/                 # System logs
│   │       ├── support/              # Support tickets
│   │       └── features/             # Feature toggles
│   ├── components/
│   │   ├── shared/                   # Navbar, Footer
│   │   ├── landing/                  # Landing page sections
│   │   ├── dashboard/                # Dashboard sidebar
│   │   └── wizard/                   # Wizard components
│   ├── lib/
│   │   ├── constants.ts              # App constants & data
│   │   ├── supabase.ts               # Supabase client & auth
│   │   └── utils.ts                  # Utility functions
│   └── types/
│       └── index.ts                  # TypeScript definitions
├── supabase/
│   └── schema.sql                    # Complete database schema
├── n8n/
│   └── workflows.json                # n8n workflow definitions
└── public/                           # Static assets
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- npm/pnpm
- Supabase account
- n8n instance
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/nextfolio.git
cd nextfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# n8n
N8N_WEBHOOK_URL=your_n8n_webhook_url

# Email
RESEND_API_KEY=your_resend_key

# Deployment
VERCEL_TOKEN=your_vercel_token
```

### Database Setup

```bash
# Run the schema in your Supabase SQL editor
# File: supabase/schema.sql
```

## 📋 Pages Overview

### Public Pages
- **Landing Page** — Hero, features, testimonials, pricing, FAQ
- **Pricing** — 3-tier pricing with feature comparison
- **Templates** — Full gallery of 8 premium templates
- **FAQ** — Accordion-style frequently asked questions
- **Contact** — Contact form + info + campus ambassador CTA

### App Pages (Authenticated)
- **Dashboard** — Stats, portfolios, activity feed, quick actions
- **Wizard** — 7-step portfolio creation flow
- **AI Results** — Generated content, ATS score, career roadmap
- **Live Editor** — Visual customization with real-time preview
- **Analytics** — Views, visitors, referrers, top pages
- **Billing** — Plans, payment methods, invoices
- **Settings** — Profile, appearance, notifications, security

### Admin Pages
- **Overview** — Platform stats, recent signups, system health
- **Users** — Searchable user management table
- **Revenue** — Financial metrics and plan distribution
- **Templates** — Template CRUD management
- **Logs** — Filterable system event logs
- **Support** — Ticket management system
- **Features** — Feature toggle switches

## 💰 Pricing Plans

| Feature | Free | Student Pro (₹99/mo) | Career Pro (₹299/mo) |
|---------|------|---------------------|---------------------|
| Portfolios | 1 | Unlimited | Unlimited |
| Templates | Basic | All Premium | All Premium |
| AI Rewrites | Limited | Unlimited | Unlimited |
| PDF Export | ❌ | ✅ | ✅ |
| ATS Tools | ❌ | ❌ | ✅ |
| LinkedIn Optimizer | ❌ | ❌ | ✅ |
| Analytics | ❌ | ❌ | ✅ |
| Custom Domain | ❌ | ❌ | ✅ |

## 🎨 Templates

1. **Developer Dark Neon** — Bold neon on dark canvas (Engineering)
2. **Startup Founder** — Clean, minimal, bold (Business)
3. **Corporate Executive** — Professional elegance (MBA)
4. **Finance Professional** — Trust-inspiring design (Commerce)
5. **Creative Designer** — Vibrant, expressive (Design)
6. **Elegant Legal** — Sophisticated, authoritative (Law)
7. **Healthcare Clean** — Clean, trustworthy (Medical)
8. **Fresher Modern** — Fresh, energetic (All Streams)

## 🔧 n8n Workflow Pipeline

```
Webhook → Validate → Rate Limit → Parse Resume → AI Generate →
ATS Score → Build Files → Save to DB → Deploy → QR Code →
Email User → Log Success → Respond
```

Features: Retry logic (3x), error handling, input sanitization, rate limiting, async job queue.

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Setup
1. Create a Supabase project and run `schema.sql`
2. Set up n8n with the workflow from `n8n/workflows.json`
3. Configure environment variables in Vercel
4. Deploy!

## 📄 License

MIT © Nextfolio

---

<div align="center">
  <p><strong>Built with ❤️ for students everywhere</strong></p>
</div>
