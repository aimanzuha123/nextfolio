'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function PortfolioPreview({ data, isGenerating }: { data: PortfolioData | null; isGenerating: boolean }) {
  const [activeSection, setActiveSection] = useState('about');

  if (isGenerating) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-6 py-20 rounded-2xl border border-white/[0.08] bg-[#0a0a1a]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl border-2 border-purple-500/30 border-t-purple-500 flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(168,85,247,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </motion.div>
        <div className="text-center">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white font-semibold mb-1"
          >
            Antigravity Engine processing...
          </motion.p>
          <p className="text-sm text-slate-500">Generating your portfolio with AI</p>
        </div>
        {/* Shimmer blocks */}
        <div className="w-full max-w-md space-y-3 mt-4 px-6">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              className="shimmer h-4 rounded-lg"
              style={{ width: `${85 - i * 12}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-white/[0.08] bg-[#0a0a1a]">
        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M3 9h18" /><path d="M9 21V9" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-400 mb-2">Portfolio Preview</h3>
        <p className="text-sm text-slate-600 max-w-xs">
          Fill in your details and click &ldquo;Generate Portfolio&rdquo; to see your AI-generated portfolio here.
        </p>
      </div>
    );
  }

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-full w-full"
    >
      {/* Browser Chrome */}
      <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0a0a1a] h-full flex flex-col">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-4 py-1 rounded-md bg-white/5 text-xs text-slate-500 font-mono">
              {data.name.toLowerCase().replace(/\s/g, '')}.nextfolio.ai
            </div>
          </div>
        </div>

        {/* Header - Name & Role */}
        <div className="px-6 md:px-8 pt-8 pb-6 border-b border-white/5">
          <h2 className="text-3xl font-bold text-white mb-2">{data.name}</h2>
          <p className="text-purple-400 font-medium text-lg">{data.title}</p>
        </div>

        {/* Nav tabs */}
        <div className="flex gap-6 border-b border-white/5 px-6 md:px-8">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`py-4 text-sm font-medium transition-all relative ${
                activeSection === s.id ? 'text-purple-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {s.label}
              {activeSection === s.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeSection === 'about' && (
              <motion.div key="about" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} className="space-y-10">
                <section>
                  <p className="text-slate-300 leading-relaxed">{data.about}</p>
                </section>

                {data.internships.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-white mb-4">Internships & Experience</h3>
                    <div className="space-y-4">
                      {data.internships.map((internship, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <p className="text-slate-300 text-sm leading-relaxed">{internship}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {data.achievements.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-white mb-4">Achievements</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                      {data.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </motion.div>
            )}

            {activeSection === 'projects' && (
              <motion.div key="projects" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}>
                <div className="space-y-4">
                  {data.projects.map((proj, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/20 transition-all"
                    >
                      <p className="text-slate-300 text-sm leading-relaxed">{proj}</p>
                    </motion.div>
                  ))}
                  {data.projects.length === 0 && (
                    <p className="text-slate-500 text-sm">No projects added yet.</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeSection === 'skills' && (
              <motion.div key="skills" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}>
                <div className="flex flex-wrap gap-3">
                  {data.skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm text-purple-200 hover:bg-purple-500/20 transition-all cursor-default"
                    >
                      {skill}
                    </motion.div>
                  ))}
                  {data.skills.length === 0 && (
                    <p className="text-slate-500 text-sm">No skills added yet.</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeSection === 'contact' && (
              <motion.div key="contact" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}>
                <div className="space-y-4">
                  {data.email && (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500 mb-0.5">Email</p>
                        <p className="text-sm text-white truncate">{data.email}</p>
                      </div>
                    </div>
                  )}
                  {data.github && (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#93c5fd">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500 mb-0.5">GitHub</p>
                        <p className="text-sm text-white truncate">{data.github}</p>
                      </div>
                    </div>
                  )}
                  {data.linkedin && (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="w-10 h-10 rounded-lg bg-[#0077b5]/10 flex items-center justify-center shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077b5">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-slate-500 mb-0.5">LinkedIn</p>
                        <p className="text-sm text-white truncate">{data.linkedin}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
