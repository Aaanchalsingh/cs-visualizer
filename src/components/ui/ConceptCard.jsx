import { motion } from 'framer-motion'

const categoryColors = {
  'Data Structures': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Algorithms':      'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Design Patterns': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'System Design':   'bg-green-500/10 text-green-400 border-green-500/20',
  'Programming':     'bg-pink-500/10 text-pink-400 border-pink-500/20',
}

const difficultyDot = {
  Beginner:     'bg-green-400',
  Intermediate: 'bg-yellow-400',
  Advanced:     'bg-red-400',
}

export default function ConceptCard({ concept, isSelected, onClick }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-4 transition-colors
        ${isSelected
          ? 'border-primary-500 bg-primary-500/10'
          : 'border-gray-800 bg-gray-900 hover:border-gray-600'
        }`}
    >
      {/* Emoji + title */}
      <div className="flex items-start gap-3">
        <span className="text-2xl">{concept.emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-100 truncate">{concept.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{concept.description}</p>
        </div>
      </div>

      {/* Footer badges */}
      <div className="flex items-center gap-2 mt-3">
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium
          ${categoryColors[concept.category] ?? 'bg-gray-700 text-gray-300 border-gray-600'}`}>
          {concept.category}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-500 ml-auto">
          <span className={`w-1.5 h-1.5 rounded-full ${difficultyDot[concept.difficulty] ?? 'bg-gray-500'}`} />
          {concept.difficulty}
        </span>
      </div>
    </motion.div>
  )
}
