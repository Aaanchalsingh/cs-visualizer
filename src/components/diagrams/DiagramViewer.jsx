import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause, SkipBack, ChevronRight } from 'lucide-react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    background: '#111827',
    primaryColor: '#4263eb',
    primaryTextColor: '#f9fafb',
    primaryBorderColor: '#374151',
    lineColor: '#6b7280',
    secondaryColor: '#1f2937',
    tertiaryColor: '#111827',
    edgeLabelBackground: '#1f2937',
    clusterBkg: '#1f2937',
    titleColor: '#f9fafb',
    fontSize: '14px',
  },
})

export default function DiagramViewer({ concept, onClose }) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const diagramRef = useRef(null)
  const intervalRef = useRef(null)

  const steps = concept.steps ?? []
  const currentStep = steps[step] ?? steps[0]

  // Render mermaid diagram whenever step changes
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
  }, [step, currentStep])

  // Auto-play logic
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setStep(s => {
          if (s >= steps.length - 1) {
            setPlaying(false)
            return s
          }
          return s + 1
        })
      }, 1800)
    }
    return () => clearInterval(intervalRef.current)
  }, [playing, steps.length])

  // Reset when concept changes
  useEffect(() => {
    setStep(0)
    setPlaying(false)
  }, [concept.id])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-[480px] flex-shrink-0 border-l border-gray-800 bg-gray-900 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-800">
          <span className="text-2xl">{concept.emoji}</span>
          <div className="flex-1">
            <h2 className="font-semibold text-white">{concept.title}</h2>
            <p className="text-xs text-gray-500">{concept.category}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1 px-5 py-3 border-b border-gray-800">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => { setStep(i); setPlaying(false) }}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? 'bg-primary-500 w-6' : 'bg-gray-700 hover:bg-gray-500 w-3'
              }`}
            />
          ))}
          <span className="ml-auto text-xs text-gray-500">
            {step + 1} / {steps.length}
          </span>
        </div>

        {/* Diagram */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {/* Step title + explanation */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="font-semibold text-gray-100 mb-1">{currentStep?.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{currentStep?.explanation}</p>
          </motion.div>

          {/* Mermaid diagram */}
          <motion.div
            key={`diagram-${step}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl p-4 overflow-x-auto"
          >
            <div ref={diagramRef} className="mermaid text-sm" />
          </motion.div>

          {/* Code example */}
          {currentStep?.code && (
            <motion.div
              key={`code-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-xs text-gray-500 mb-2 font-mono uppercase tracking-wider">Example</p>
              <pre className="bg-gray-800 rounded-xl p-4 text-sm font-mono text-green-300 overflow-x-auto leading-relaxed">
                <code>{currentStep.code}</code>
              </pre>
            </motion.div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 px-5 py-4 border-t border-gray-800">
          <button
            onClick={() => { setStep(0); setPlaying(false) }}
            disabled={step === 0 && !playing}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800
                       disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <SkipBack size={16} />
          </button>

          <button
            onClick={() => setPlaying(p => !p)}
            disabled={step === steps.length - 1 && !playing}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-500
                       text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed
                       transition-colors"
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? 'Pause' : 'Play'}
          </button>

          <button
            onClick={() => { setStep(s => Math.min(s + 1, steps.length - 1)); setPlaying(false) }}
            disabled={step === steps.length - 1}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800
                       disabled:opacity-30 disabled:cursor-not-allowed transition-colors ml-auto"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
