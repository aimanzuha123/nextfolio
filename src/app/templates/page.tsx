'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TemplateCard from '@/components/TemplateCard';

const TEMPLATES_DATA = [
  { id: 'dev-dark', name: 'Developer Dark Neon', category: 'Developer', description: 'Bold neon accents on a dark canvas. Perfect for engineers.', isPremium: false, colors: ['#0a0a0a', '#00ff88', '#6366f1', '#22d3ee'], tags: ['Dark', 'Developer', 'Modern'] },
  { id: 'startup', name: 'Startup Founder', category: 'Student', description: 'Clean, minimal, and bold. Built for ambitious founders.', isPremium: false, colors: ['#ffffff', '#0f172a', '#6366f1', '#f59e0b'], tags: ['Minimal', 'Student', 'Light'] },
  { id: 'corp', name: 'Corporate Executive', category: 'Student', description: 'Professional elegance with a corporate edge.', isPremium: true, colors: ['#f8fafc', '#1e293b', '#0ea5e9', '#0f766e'], tags: ['Modern', 'Student', 'Professional'] },
  { id: 'creative', name: 'Creative Designer', category: 'Designer', description: 'Vibrant and expressive layout for creatives.', isPremium: true, colors: ['#faf5ff', '#7c3aed', '#ec4899', '#f59e0b'], tags: ['Creative', 'Designer', 'Vibrant'] },
  { id: 'finance', name: 'Finance Professional', category: 'Student', description: 'Trust-inspiring design for finance professionals.', isPremium: true, colors: ['#ffffff', '#0c4a6e', '#059669', '#d97706'], tags: ['Minimal', 'Student', 'Professional'] },
  { id: 'medical', name: 'Healthcare Clean', category: 'Student', description: 'Clean, trustworthy design for medical professionals.', isPremium: true, colors: ['#f0fdf4', '#064e3b', '#059669', '#0ea5e9'], tags: ['Modern', 'Student', 'Clean'] },
  { id: 'legal', name: 'Elegant Legal', category: 'Student', description: 'Sophisticated and authoritative for law professionals.', isPremium: true, colors: ['#fffbeb', '#1c1917', '#92400e', '#78350f'], tags: ['Dark', 'Student', 'Elegant'] },
  { id: 'fresher', name: 'Fresher Modern', category: 'Student', description: 'Fresh, modern, and energetic for new graduates.', isPremium: false, colors: ['#09090b', '#818cf8', '#f472b6', '#34d399'], tags: ['Dark', 'Modern', 'Student'] },
];

const CATEGORIES = ['All', 'Student', 'Developer', 'Designer'];
const STYLES = ['All', 'Dark', 'Minimal', 'Modern', 'Creative'];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [styleFilter, setStyleFilter] = useState('All');

  const filtered = useMemo(() => {
    return TEMPLATES_DATA.filter((t) => {
      const matchCategory = categoryFilter === 'All' || t.category === categoryFilter;
      const matchStyle = styleFilter === 'All' || t.tags.includes(styleFilter);
      return matchCategory && matchStyle;
    });
  }, [categoryFilter, styleFilter]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen page-gradient pt-28 pb-20 relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-500/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-main relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="badge mb-4">Templates</div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Choose your{' '}
              <span className="gradient-text">perfect template</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              8 premium templates designed for every field. Pick one and make it yours.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10"
          >
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Category</span>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategoryFilter(c)}
                    className={`filter-btn ${categoryFilter === c ? 'active' : ''}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Style</span>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyleFilter(s)}
                    className={`filter-btn ${styleFilter === s ? 'active' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((template, i) => (
              <TemplateCard
                key={template.id}
                {...template}
                index={i}
                isSelected={selectedTemplate === template.id}
                onSelect={setSelectedTemplate}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-slate-500 text-lg">No templates match your filters.</p>
              <button
                onClick={() => { setCategoryFilter('All'); setStyleFilter('All'); }}
                className="btn-secondary mt-4 !py-2.5"
              >
                Reset Filters
              </button>
            </motion.div>
          )}

          {/* Selected Template CTA */}
          {selectedTemplate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-strong rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl shadow-black/40 border border-white/10"
            >
              <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
              <p className="text-sm text-white font-medium">
                {TEMPLATES_DATA.find(t => t.id === selectedTemplate)?.name} selected
              </p>
              <button
                className="btn-primary !py-2.5 !px-5 !text-sm"
                onClick={() => window.location.href = '/dashboard'}
              >
                <span>Continue →</span>
              </button>
            </motion.div>
          )}

          {/* Antigravity Badge */}
          <div className="flex justify-center mt-16">
            <div className="antigravity-badge">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Powered by Antigravity Engine ⚡
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
