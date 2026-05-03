'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import PortfolioPreview from '@/components/PortfolioPreview';

interface PortfolioData {
  name: string;
  title: string;
  about: string;
  skills: string[];
  projects: string[];
  internships: string[];
  achievements: string[];
  email: string;
  github: string;
  linkedin: string;
}

const AI_RESPONSES: Partial<PortfolioData> = {
  about: 'A passionate and detail-oriented professional with a strong foundation in modern web technologies. Experienced in building scalable applications and delivering high-quality user experiences. Committed to continuous learning and staying ahead of industry trends.',
  projects: [
    'AI Task Manager - Built an intelligent task management app that uses machine learning to prioritize and categorize tasks automatically, increasing productivity by 40%. (React, Node.js, TensorFlow.js, MongoDB)',
    'E-Commerce Platform - Developed a full-stack e-commerce platform with real-time inventory tracking, secure payment processing, and an intuitive admin dashboard. (Next.js, Stripe, PostgreSQL, Redis)',
    'Portfolio Generator - Created an AI-powered portfolio generator that transforms user inputs into professional, deployable portfolio websites in under 60 seconds. (TypeScript, OpenAI API, Tailwind CSS)',
  ],
  internships: [
    'Frontend Developer Intern at TechCorp (Summer 2023) - Developed responsive UI components and reduced page load time by 15%.',
  ],
  achievements: [
    '1st Place at Global Hackathon 2023',
    'AWS Certified Solutions Architect',
  ]
};

function generatePortfolio(input: { name: string; title: string; skills: string; projects: string; internships: string; achievements: string; email: string; github: string; linkedin: string }): PortfolioData {
  const skillsArr = input.skills.split(',').map(s => s.trim()).filter(Boolean);
  const projectsArr = input.projects.split('\n').map(p => p.trim()).filter(Boolean);
  const internshipsArr = input.internships.split('\n').map(i => i.trim()).filter(Boolean);
  const achievementsArr = input.achievements.split('\n').map(a => a.trim()).filter(Boolean);

  return {
    name: input.name || 'Alex Johnson',
    title: input.title || 'Full-Stack Developer',
    about: AI_RESPONSES.about || '',
    skills: skillsArr.length > 0 ? skillsArr : ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Docker'],
    projects: projectsArr.length > 0 ? projectsArr : (AI_RESPONSES.projects || []),
    internships: internshipsArr.length > 0 ? internshipsArr : (AI_RESPONSES.internships || []),
    achievements: achievementsArr.length > 0 ? achievementsArr : (AI_RESPONSES.achievements || []),
    email: input.email || 'hello@example.com',
    github: input.github || 'github.com/developer',
    linkedin: input.linkedin || 'linkedin.com/in/developer',
  };
}

export default function DashboardPage() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    skills: '',
    projects: '',
    internships: '',
    achievements: '',
    email: '',
    github: '',
    linkedin: '',
  });
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setPortfolioData(null);

    // Simulate AI generation
    setTimeout(() => {
      const result = generatePortfolio(formData);
      setPortfolioData(result);
      setIsGenerating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen page-gradient">
      {/* Top Bar */}
      <header className="glass-strong sticky top-0 z-50 border-b border-white/[0.04]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <span className="text-base font-bold text-white">
              Next<span className="gradient-text">folio</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="antigravity-badge hidden sm:flex">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Antigravity Engine ⚡
            </div>
            <Link href="/templates" className="text-sm text-slate-400 hover:text-white transition-colors">
              ← Templates
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Portfolio <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-slate-400">Enter your details and let AI create your portfolio</p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left - Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-strong rounded-2xl p-6 md:p-8 border border-white/[0.06]">
              <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" /><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838.838-2.872a2 2 0 0 1 .506-.855z" />
                </svg>
                Your Details
              </h2>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Alex Johnson"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Title / Role</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleChange('title', e.target.value)}
                      placeholder="Full-Stack Developer"
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Skills (comma separated)</label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => handleChange('skills', e.target.value)}
                    placeholder="React, Node.js, Python, TypeScript, SQL"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Projects (one per line)</label>
                  <textarea
                    value={formData.projects}
                    onChange={(e) => handleChange('projects', e.target.value)}
                    placeholder="AI Task Manager - React, Node.js&#10;E-Commerce Platform - Next.js, Stripe"
                    rows={3}
                    className="input resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Internships (one per line)</label>
                  <textarea
                    value={formData.internships}
                    onChange={(e) => handleChange('internships', e.target.value)}
                    placeholder="Frontend Developer Intern at TechCorp (Summer 2023)"
                    rows={2}
                    className="input resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Achievements (one per line)</label>
                  <textarea
                    value={formData.achievements}
                    onChange={(e) => handleChange('achievements', e.target.value)}
                    placeholder="1st Place at Global Hackathon 2023"
                    rows={2}
                    className="input resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">GitHub</label>
                    <input
                      type="text"
                      value={formData.github}
                      onChange={(e) => handleChange('github', e.target.value)}
                      placeholder="github.com/username"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">LinkedIn</label>
                    <input
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) => handleChange('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/user"
                      className="input"
                    />
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="btn-primary w-full !py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isGenerating ? (
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    )}
                    {isGenerating ? 'Generating...' : 'Generate Portfolio'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right - Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex h-full"
          >
            <PortfolioPreview data={portfolioData} isGenerating={isGenerating} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
