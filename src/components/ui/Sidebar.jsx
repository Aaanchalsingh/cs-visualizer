import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, GitBranch, Cpu, Layers, Network, Code2, X } from 'lucide-react'

const categoryIcons = {
  'All':             <BookOpen size={15} />,
  'Data Structures': <GitBranch size={15} />,
  'Algorithms':      <Cpu size={15} />,
  'Design Patterns': <Layers size={15} />,
  'System Design':   <Network size={15} />,
  'Programming':     <Code2 size={15} />,
}

export default function Sidebar({ categories, activeCategory, onCategoryChange, mobileOpen, onMobileClose }) {
  const content = (
    <div className="flex flex-col h-full py-5 gap-0.5 overflow-y-auto">
      <div className="flex items-center justify-between px-4 mb-3">
        <p className="text-xs font-semibold text-theme-muted uppercase tracking-widest">
          Categories
        </p>
        {/* Close button — mobile only */}
        <button
          onClick={onMobileClose}
          className="md:hidden p-1 rounded text-theme-muted hover:text-theme-primary transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {categories.map(cat => (
        <motion.button
          key={cat}
          whileTap={{ scale: 0.97 }}
          onClick={() => { onCategoryChange(cat); onMobileClose?.() }}
          className={`flex items-center gap-2.5 mx-3 px-3 py-2.5 rounded-lg text-sm
                      font-medium transition-all duration-150
            ${activeCategory === cat
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20'
              : 'text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary'
            }`}
        >
          <span className="opacity-80">{categoryIcons[cat] ?? <BookOpen size={15} />}</span>
          {cat}
        </motion.button>
      ))}
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-52 flex-shrink-0
                        border-r border-theme bg-theme-secondary">
        {content}
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-64
                         bg-theme-secondary border-r border-theme md:hidden"
            >
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
