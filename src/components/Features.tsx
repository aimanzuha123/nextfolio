'use client';

import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M12 18v-6" /><path d="M9 15l3-3 3 3" />
      </svg>
    ),
    title: 'AI Resume Generator',
    description: 'Generate ATS-optimized resumes tailored to your field. Our AI analyzes job trends and crafts compelling content.',
    gradient: 'from-purple-500/20 to-purple-500/5',
    borderGlow: 'group-hover:shadow-purple-500/10',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" /><path d="M9 21V9" />
      </svg>
    ),
    title: 'Portfolio Builder',
    description: '8 premium templates designed for every stream. Drag, customize, and publish your perfect portfolio.',
    gradient: 'from-blue-500/20 to-blue-500/5',
    borderGlow: 'group-hover:shadow-blue-500/10',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Real-time Preview',
    description: 'See every change instantly. Edit text, swap layouts, and preview your portfolio live before publishing.',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    borderGlow: 'group-hover:shadow-cyan-500/10',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Antigravity Engine',
    description: 'Ultra-fast rendering with zero-lag transitions. Your portfolio loads in under 1 second, everywhere.',
    gradient: 'from-amber-500/20 to-amber-500/5',
    borderGlow: 'group-hover:shadow-amber-500/10',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Features() {
  return (
    <section id="features" className="section relative">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="badge mb-4">Features</div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Everything you need to{' '}
            <span className="gradient-text">stand out</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From AI-generated content to instant deployment. Build your professional brand in minutes.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className={`group card relative overflow-hidden hover:shadow-2xl ${feature.borderGlow}`}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mb-5 text-slate-300 group-hover:text-white group-hover:border-white/10 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-[0.95rem]">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
