'use client';

import { motion } from 'framer-motion';

interface TemplateCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  colors: string[];
  isPremium: boolean;
  tags: string[];
  index: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function TemplateCard({
  id, name, category, description, colors, isPremium, tags, index, isSelected, onSelect,
}: TemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect(id)}
      className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-400 ${
        isSelected
          ? 'border-purple-500/50 shadow-lg shadow-purple-500/10 bg-[#0f0f23]'
          : 'border-white/[0.06] bg-[#0a0a1a] hover:border-white/[0.12]'
      }`}
    >
      {/* Preview Gradient */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${colors[0]}22, ${colors[1]}33, ${colors[2]}22, ${colors[3]}11)`,
          }}
        />
        {/* Mock Layout Lines */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md" style={{ background: `${colors[2]}44` }} />
            <div className="h-2 w-16 rounded-full" style={{ background: `${colors[1]}33` }} />
          </div>
          <div className="space-y-2">
            <div className="h-3 w-3/4 rounded-full" style={{ background: `${colors[1]}22` }} />
            <div className="h-2.5 w-1/2 rounded-full" style={{ background: `${colors[2]}18` }} />
            <div className="flex gap-2 pt-1">
              <div className="h-6 w-16 rounded-md" style={{ background: `${colors[2]}33` }} />
              <div className="h-6 w-12 rounded-md" style={{ background: `${colors[1]}22` }} />
            </div>
          </div>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            onClick={(e) => { e.stopPropagation(); window.location.href = '/dashboard'; }}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 btn-primary !py-2.5 !px-5 !text-sm"
          >
            <span>Use Template</span>
          </motion.button>
        </div>
        {/* Premium badge */}
        {isPremium && (
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-[0.65rem] font-semibold text-amber-300 uppercase tracking-wider">
            Pro
          </div>
        )}
        {/* Selected check */}
        {isSelected && (
          <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1.5">
          <h3 className="font-semibold text-white text-[0.95rem] group-hover:text-purple-300 transition-colors">
            {name}
          </h3>
        </div>
        <p className="text-xs text-slate-500 mb-3">{description}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[0.65rem] rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-500">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
