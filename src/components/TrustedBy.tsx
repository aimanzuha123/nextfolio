'use client';

import { motion } from 'framer-motion';

const TRUSTED_ITEMS = [
  'Engineering', 'MBA', 'Design', 'Medical', 'Commerce',
  'Law', 'Arts & Science', 'BCA/MCA', 'Architecture', 'Data Science',
];

export default function TrustedBy() {
  return (
    <section className="section py-16 md:py-20 relative overflow-hidden">
      <div className="container-main">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm uppercase tracking-[0.2em] text-slate-500 mb-10 font-medium"
        >
          Trusted by students across disciplines
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto"
        >
          {TRUSTED_ITEMS.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * i }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.3)' }}
              className="px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm text-slate-400 hover:text-slate-200 transition-all duration-300 cursor-default"
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Divider line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}
