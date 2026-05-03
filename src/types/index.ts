// ═══════════════════════════════════════════════════════════════
// Nextfolio — Type Definitions
// ═══════════════════════════════════════════════════════════════

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  plan: 'free' | 'student-pro' | 'career-pro';
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  template_id: string;
  status: 'draft' | 'published' | 'archived';
  published_url?: string;
  personal_details: PersonalDetails;
  education: Education[];
  skills: string[];
  projects: Project[];
  experience: Experience[];
  ai_content?: AIGeneratedContent;
  created_at: string;
  updated_at: string;
}

export interface PersonalDetails {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  bio: string;
  linkedin?: string;
  github?: string;
  website?: string;
  stream: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
  gpa?: string;
  achievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github_link?: string;
  image_url?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'full-time' | 'internship' | 'freelance' | 'part-time';
  start_date: string;
  end_date: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface AIGeneratedContent {
  about_me: string;
  professional_bio: string;
  resume_summary: string;
  ats_score: number;
  ats_improvements: string[];
  skills_enhanced: string[];
  project_descriptions: Record<string, string>;
  seo_metadata: {
    title: string;
    description: string;
    keywords: string[];
  };
  linkedin_summary: string;
  career_suggestions: string[];
  interview_tips: string[];
  skill_gaps: string[];
  recommended_roles: string[];
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  colors: string[];
  preview: string;
  popular: boolean;
}

export interface WizardData {
  step: number;
  personal_details: PersonalDetails;
  education: Education[];
  skills: string[];
  projects: Project[];
  experience: Experience[];
  resume_file?: File;
  template_id: string;
}

export interface DashboardStats {
  total_portfolios: number;
  total_views: number;
  total_downloads: number;
  ats_avg_score: number;
}

export interface AdminStats {
  total_users: number;
  active_users: number;
  total_revenue: number;
  portfolios_generated: number;
  conversion_rate: number;
}
