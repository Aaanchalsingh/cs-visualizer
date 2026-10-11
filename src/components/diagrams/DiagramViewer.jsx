import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, SkipBack, ChevronRight, ChevronLeft } from 'lucide-react'
import mermaid from 'mermaid'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function DiagramViewer({ concept, onClose }) {
  const { theme } = useTheme()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const diagramRef = useRef(null)
  const intervalRef = useRef(null)

  const steps = concept.steps ?? []
  const currentStep = steps[step] ?? steps[0]

  // Re-init mermaid when theme changes
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
      themeVariables: theme === 'dark' ? {
        background: '#18181b',
        primaryColor: '#4f46e5',
        primaryTextColor: '#fafafa',
        primaryBorderColor: '#27272a',
        lineColor: '#52525b',
        secondaryColor: '#27272a',
        tertiaryColor: '#18181b',
        edgeLabelBackground: '#27272a',
        fontSize: '13px',
      } : {
        background: '#ffffff',
        primaryColor: '#4f46e5',
        primaryTextColor: '#0f172a',
        primaryBorderColor: '#e2e8f0',
        lineColor: '#94a3b8',
        secondaryColor: '#f1f5f9',
        tertiaryColor: '#f8fafc',
        edgeLabelBackground: '#f1f5f9',
        fontSize: '13px',
      },
    })
  }, [theme])

  // Render diagram on step/theme change
  useEffect(() => {
    if (!diagramRef.current || !currentStep?.diagram) return
    const render = async () => {
      try {
        diagramRef.current.removeAttribute('data-processed')
        diagramRef.current.innerHTML = currentStep.diagram
        await mermaid.run({ nodes: [diagramRef.current] })
      } catch (e) {
        console.error('Mermaid render error:', e)
      }
    }
    render()
  }, [step, currentStep, theme])

  // Auto-play
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStep(s => {
          if (s >= steps.length - 1) { setPlaying(false); return s }
          return s + 1
        })
      }, 1800)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing, steps.length])

  // Reset on concept change
  useEffect(() => { setStep(0); setPlaying(false) }, [concept.id])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-0 z-30 md:relative md:inset-auto
                   md:w-[460px] md:flex-shrink-0
                   flex flex-col border-l border-theme bg-theme-secondary overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-theme bg-theme-secondary flex-shrink-0">
          <div className="w-9 h-9 rounded-lg bg-theme-tertiary border border-theme
                          flex items-center justify-center text-lg flex-shrink-0">
            {concept.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-theme-primary text-sm truncate">{concept.title}</h2>
            <p className="text-xs text-theme-muted font-mono">{concept.category}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-theme-muted hover:text-theme-primary
                       hover:bg-theme-tertiary transition-colors flex-shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-theme flex-shrink-0">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => { setStep(i); setPlaying(false) }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'bg-primary-500 w-6' : 'bg-theme-tertiary hover:bg-primary-500/40 w-3'
              }`}
            />
          ))}
          <span className="ml-auto text-xs text-theme-muted font-mono">
            {step + 1}/{steps.length}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          <motion.div
            key={`text-${step}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-semibold text-theme-primary mb-1 text-sm">{currentStep?.title}</h3>
            <p className="text-sm text-theme-secondary leading-relaxed">{currentStep?.explanation}</p>
          </motion.div>

          {/* Diagram */}
          <motion.div
            key={`diagram-${step}-${theme}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="bg-theme-card rounded-xl border border-theme p-4 overflow-x-auto"
          >
            <div ref={diagramRef} className="mermaid text-sm" />
          </motion.div>

          {/* Code */}
          {currentStep?.code && (
            <motion.div
              key={`code-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-xs text-theme-muted mb-2 font-mono uppercase tracking-wider">
                ▸ code example
              </p>
              <pre className="bg-theme-tertiary border border-theme rounded-xl p-4 overflow-x-auto">
                <code className="code-block text-emerald-500 dark:text-emerald-400">
                  {currentStep.code}
                </code>
              </pre>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-theme bg-theme-secondary flex-shrink-0">
          <button
            onClick={() => { setStep(0); setPlaying(false) }}
            disabled={step === 0 && !playing}
            className="p-2 rounded-lg text-theme-muted hover:text-theme-primary
                       hover:bg-theme-tertiary disabled:opacity-30 transition-colors"
          >
            <SkipBack size={15} />
          </button>

          <button
            onClick={() => { setStep(s => Math.max(s - 1, 0)); setPlaying(false) }}
            disabled={step === 0}
            className="p-2 rounded-lg text-theme-muted hover:text-theme-primary
                       hover:bg-theme-tertiary disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={15} />
          </button>

          <button
            onClick={() => setPlaying(p => !p)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg
                       bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold
                       transition-colors shadow-lg shadow-primary-600/20"
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? 'Pause' : 'Play'}
          </button>

          <button
            onClick={() => { setStep(s => Math.min(s + 1, steps.length - 1)); setPlaying(false) }}
            disabled={step === steps.length - 1}
            className="p-2 rounded-lg text-theme-muted hover:text-theme-primary
                       hover:bg-theme-tertiary disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
