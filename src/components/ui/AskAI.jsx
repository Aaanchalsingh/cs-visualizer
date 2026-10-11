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
    <div className="border-b border-gray-800 bg-gray-900/60 px-6 py-4">
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-primary-400" />
        <span className="text-xs font-semibold text-primary-400 uppercase tracking-widest">
          Ask AI
        </span>
        <span className="text-xs text-gray-500 ml-1">
          — visualize any concept instantly
        </span>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. How does a B-tree work?"
          disabled={loading}
          className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm
                     text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary-500
                     disabled:opacity-50 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-500
                     text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed
                     transition-colors"
        >
          {loading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <ArrowRight size={15} />
          )}
          {loading ? 'Thinking…' : 'Visualize'}
        </button>

        {/* Clear AI result */}
        <AnimatePresence>
          {onClear && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={() => { onClear(); setInput('') }}
              className="p-2.5 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors"
              title="Clear AI result"
            >
              <X size={15} />
            </motion.button>
          )}
        </AnimatePresence>
      </form>

      {/* Error banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 flex items-start gap-2 text-sm text-red-400 bg-red-500/10
                       border border-red-500/20 rounded-lg px-3 py-2"
          >
            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestion chips */}
      {!loading && !error && (
        <div className="flex flex-wrap gap-2 mt-3">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400
                         hover:bg-gray-700 hover:text-gray-200 border border-gray-700
                         hover:border-gray-500 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 flex items-center gap-3 text-sm text-gray-400"
        >
          <Loader2 size={14} className="animate-spin text-primary-400" />
          <span>Gemini is generating your diagram…</span>
        </motion.div>
      )}
    </div>
  )
}
