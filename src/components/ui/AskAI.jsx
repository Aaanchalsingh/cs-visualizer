import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, X, AlertCircle, Loader2 } from 'lucide-react'

const SUGGESTIONS = [
  'How does a hash map work?',
  'Explain merge sort',
  'What is a deadlock?',
  'How does TCP handshake work?',
  'Explain the factory pattern',
  'What is memoization?',
]

export default function AskAI({ onResult, loading, error, onClear }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return
    onResult(input.trim())
  }

  const handleSuggestion = (text) => {
    setInput(text)
    onResult(text)
  }

  return (
    <div className="border-b border-theme bg-theme-secondary px-4 md:px-6 py-4">
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
          </span>
          <Sparkles size={13} className="text-primary-500" />
          <span className="text-xs font-bold text-primary-500 uppercase tracking-widest font-mono">
            Ask AI
          </span>
        </div>
        <span className="text-xs text-theme-muted hidden sm:block">
          — visualize any concept instantly
        </span>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. How does a B-tree work?"
          disabled={loading}
          className="flex-1 min-w-0 px-4 py-2.5 rounded-lg text-sm font-mono
                     bg-theme-tertiary border border-theme
                     text-theme-primary placeholder-theme-muted
                     focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30
                     disabled:opacity-50 transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                     bg-primary-600 hover:bg-primary-500 active:bg-primary-700
                     text-white text-sm font-semibold
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors shadow-lg shadow-primary-600/20 flex-shrink-0"
        >
          {loading
            ? <Loader2 size={14} className="animate-spin" />
            : <ArrowRight size={14} />
          }
          <span className="hidden sm:inline">{loading ? 'Thinking…' : 'Visualize'}</span>
        </button>

        <AnimatePresence>
          {onClear && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={() => { onClear(); setInput('') }}
              className="p-2.5 rounded-lg border border-theme text-theme-muted
                         hover:text-theme-primary hover:bg-theme-tertiary transition-colors flex-shrink-0"
              title="Clear AI result"
            >
              <X size={14} />
            </motion.button>
          )}
        </AnimatePresence>
      </form>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 flex items-start gap-2 text-sm text-red-500
                       bg-red-500/5 border border-red-500/20 rounded-lg px-3 py-2"
          >
            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
            <span className="text-xs">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions */}
      {!loading && !error && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="text-xs px-2.5 py-1 rounded-full font-mono
                         bg-theme-tertiary border border-theme
                         text-theme-muted hover:text-primary-500 hover:border-primary-500/40
                         transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 flex items-center gap-2 text-xs text-theme-muted font-mono"
        >
          <Loader2 size={12} className="animate-spin text-primary-500" />
          Generating diagram with Groq AI… (retrying if needed)
        </motion.div>
      )}
    </div>
  )
}
