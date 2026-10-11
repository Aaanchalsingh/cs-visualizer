import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Sidebar from './components/ui/Sidebar.jsx'
import SearchBar from './components/ui/SearchBar.jsx'
import ConceptCard from './components/ui/ConceptCard.jsx'
import AskAI from './components/ui/AskAI.jsx'
import DiagramViewer from './components/diagrams/DiagramViewer.jsx'
import { useGemini } from './hooks/useGemini.js'
import { concepts as staticConcepts } from './data/concepts.js'

export default function App() {
  const [selected, setSelected]           = useState(null)
  const [search, setSearch]               = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  // AI state
  const { generate, concept: aiConcept, loading, error, reset } = useGemini()

  const categories = ['All', ...new Set(staticConcepts.map(c => c.category))]

  const filtered = staticConcepts.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      activeCategory === 'All' || c.category === activeCategory
    return matchesSearch && matchesCategory
  })

  // When AI generates a concept, auto-open it in the viewer
  const handleAIResult = async (topic) => {
    setSelected(null)
    await generate(topic)
  }

  // Sync: once aiConcept arrives, open it
  const viewerConcept = selected ?? aiConcept

  const handleClearAI = () => {
    reset()
    setSelected(null)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={cat => { setActiveCategory(cat); setSelected(null) }}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-4 px-6 py-4 border-b border-gray-800 bg-gray-950">
          <div>
            <h1 className="text-xl font-bold text-white">CS Visualizer</h1>
            <p className="text-xs text-gray-500">Learn software engineering concepts visually</p>
          </div>
          <div className="flex-1 max-w-md ml-auto">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </header>

        {/* Ask AI bar */}
        <AskAI
          onResult={handleAIResult}
          loading={loading}
          error={error}
          onClear={aiConcept ? handleClearAI : null}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Concept grid */}
          <div className="flex-1 overflow-y-auto p-6">

            {/* AI result banner */}
            <AnimatePresence>
              {aiConcept && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mb-5"
                >
                  <p className="text-xs text-primary-400 flex items-center gap-1.5 mb-2">
                    <Sparkles size={12} />
                    AI-generated concept — click to view
                  </p>
                  <ConceptCard
                    concept={aiConcept}
                    isSelected={selected?.id === aiConcept.id || !selected}
                    onClick={() => setSelected(
                      selected?.id === aiConcept.id ? null : aiConcept
                    )}
                  />
                  <div className="mt-3 border-t border-gray-800 pt-4">
                    <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
                      Or browse static concepts
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Static concept grid */}
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p className="text-lg">No concepts found</p>
                <p className="text-sm mt-1">Try a different search or category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(concept => (
                  <ConceptCard
                    key={concept.id}
                    concept={concept}
                    isSelected={selected?.id === concept.id}
                    onClick={() => setSelected(
                      selected?.id === concept.id ? null : concept
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Diagram panel — shows whichever concept is active */}
          <AnimatePresence>
            {viewerConcept && (
              <DiagramViewer
                key={viewerConcept.id}
                concept={viewerConcept}
                onClose={() => {
                  setSelected(null)
                  if (aiConcept && !selected) reset()
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
