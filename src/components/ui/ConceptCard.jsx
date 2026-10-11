import { motion } from 'framer-motion'

const categoryColors = {
  'Data Structures': 'bg-blue-500/10 text-blue-500 border-blue-500/20 dark:text-blue-400',
  'Algorithms':      'bg-violet-500/10 text-violet-500 border-violet-500/20 dark:text-violet-400',
  'Design Patterns': 'bg-amber-500/10 text-amber-500 border-amber-500/20 dark:text-amber-400',
  'System Design':   'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:text-emerald-400',
  'Programming':     'bg-pink-500/10 text-pink-500 border-pink-500/20 dark:text-pink-400',
}

const difficultyConfig = {
  Beginner:     { dot: 'bg-emerald-400', text: 'text-emerald-500 dark:text-emerald-400' },
  Intermediate: { dot: 'bg-amber-400',   text: 'text-amber-500 dark:text-amber-400' },
  Advanced:     { dot: 'bg-red-400',     text: 'text-red-500 dark:text-red-400' },
}

export default function ConceptCard({ concept, isSelected, onClick }) {
  const diff = difficultyConfig[concept.difficulty] ?? { dot: 'bg-gray-400', text: 'text-gray-500' }

  return (
    <motion.div
      layout
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 group
        ${isSelected
          ? 'border-primary-500 bg-primary-500/5 glow'
          : 'border-theme bg-theme-card hover:border-primary-500/40 hover:shadow-lg hover:shadow-black/5'
        }`}
    >
      {/* Top row */}
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0
                        bg-theme-tertiary border border-theme group-hover:border-primary-500/30
                        transition-colors`}>
          {concept.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-theme-primary text-sm leading-snug truncate">
            {concept.title}
          </h3>
          <p className="text-xs text-theme-muted mt-0.5 line-clamp-2 leading-relaxed">
            {concept.description}
          </p>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-center gap-2 mt-3">
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium
          ${categoryColors[concept.category] ?? 'bg-gray-500/10 text-gray-500 border-gray-500/20'}`}>
          {concept.category}
        </span>
        <span className={`flex items-center gap-1 text-xs ml-auto font-mono ${diff.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
          {concept.difficulty}
        </span>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="mt-2 pt-2 border-t border-primary-500/20">
          <p className="text-xs text-primary-500 font-mono">▶ viewing</p>
        </div>
      )}
    </motion.div>
  )
}
