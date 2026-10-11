import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-14 h-7 rounded-full border border-theme
                 bg-theme-tertiary flex items-center px-1 transition-colors"
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`w-5 h-5 rounded-full flex items-center justify-center
                    ${isDark ? 'bg-primary-500 ml-auto' : 'bg-amber-400 mr-auto'}`}
      >
        {isDark
          ? <Moon size={11} className="text-white" />
          : <Sun size={11} className="text-white" />
        }
      </motion.span>
    </motion.button>
  )
}
