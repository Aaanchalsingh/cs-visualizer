import { motion } from 'framer-motion'
import {
  BookOpen, GitBranch, Cpu, Layers, Network, Code2
} from 'lucide-react'

const categoryIcons = {
  'All':              <BookOpen size={16} />,
  'Data Structures':  <GitBranch size={16} />,
  'Algorithms':       <Cpu size={16} />,
  'Design Patterns':  <Layers size={16} />,
  'System Design':    <Network size={16} />,
  'Programming':      <Code2 size={16} />,
}

export default function Sidebar({ categories, activeCategory, onCategoryChange }) {
  return (
    <aside className="w-52 flex-shrink-0 border-r border-gray-800 bg-gray-900 flex flex-col py-6 gap-1 overflow-y-auto">
      <p className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">
        Categories
      </p>
      {categories.map(cat => (
        <motion.button
          key={cat}
          whileTap={{ scale: 0.97 }}
          onClick={() => onCategoryChange(cat)}
          className={`flex items-center gap-2 mx-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeCategory === cat
              ? 'bg-primary-600 text-white'
              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
        >
          {categoryIcons[cat] ?? <BookOpen size={16} />}
          {cat}
        </motion.button>
      ))}
    </aside>
  )
}
