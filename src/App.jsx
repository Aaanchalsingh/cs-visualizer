import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Menu, Terminal } from 'lucide-react'
import Sidebar from './components/ui/Sidebar.jsx'
import SearchBar from './components/ui/SearchBar.jsx'
import ConceptCard from './components/ui/ConceptCard.jsx'
import AskAI from './components/ui/AskAI.jsx'
import DiagramViewer from './components/diagrams/DiagramViewer.jsx'
import ThemeToggle from './components/ui/ThemeToggle.jsx'
import Footer from './components/ui/Footer.jsx'
import { useGemini } from './hooks/useGemini.js'
import { concepts as staticConcepts } from './data/concepts.js'

export default function App() {
  const [selected, setSelected]             = useState(null)
  const [search, setSearch]                 = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { generate, concept: aiConcept, loading, error, reset } = useGemini()

  const categories = ['All', ...new Set(staticConcepts.map(c => c.category))]

  const filtered = staticConcepts.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const handleAIResult = async (topic) => {
    setSelected(null)
    await generate(topic)
  }

  const viewerConcept = selected ?? aiConcept

  const handleClearAI = () => { reset(); setSelected(null) }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-theme-primary scanline">

      {/* ── Top Navbar ─────────────────────────────────────────────── */}
      <header className="flex items-center gap-3 px-4 md:px-6 py-3
                         border-b border-theme bg-theme-secondary flex-shrink-0">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 -ml-1 rounded-lg text-theme-muted
                     hover:text-theme-primary hover:bg-theme-tertiary transition-colors"
        >
          <Menu size={18} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
            <Terminal size={14} className="text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold text-theme-primary font-mono leading-none">
              CS Visualizer
            </h1>
            <p className="text-xs text-theme-muted leading-none mt-0.5">
              learn by seeing
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xs ml-auto">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Theme toggle */}
        <ThemeToggle />
      </header>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <Sidebar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={cat => { setActiveCategory(cat); setSelected(null) }}
          mobileOpen={mobileMenuOpen}
          onMobileClose={() => setMobileMenuOpen(false)}
        />

        {/* Main */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Ask AI bar */}
          <AskAI
            onResult={handleAIResult}
            loading={loading}
            error={error}
            onClear={aiConcept ? handleClearAI : null}
          />

          {/* Concept grid */}
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 md:p-6">

              {/* AI result card */}
              <AnimatePresence>
                {aiConcept && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-5"
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles size={11} className="text-primary-500" />
                      <p className="text-xs text-primary-500 font-mono">AI-generated — click to view</p>
                    </div>
                    <ConceptCard
                      concept={aiConcept}
                      isSelected={!selected || selected?.id === aiConcept.id}
                      onClick={() => setSelected(
                        selected?.id === aiConcept.id ? null : aiConcept
                      )}
                    />
                    <div className="mt-4 mb-2 flex items-center gap-3">
                      <div className="flex-1 h-px bg-theme-tertiary" />
                      <span className="text-xs text-theme-muted font-mono uppercase tracking-widest">
                        or browse
                      </span>
                      <div className="flex-1 h-px bg-theme-tertiary" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stats bar */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-theme-muted font-mono">
                  {filtered.length} concept{filtered.length !== 1 ? 's' : ''}
                  {activeCategory !== 'All' && ` in ${activeCategory}`}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-theme-muted">
                  <p className="text-sm font-mono">No concepts found</p>
                  <p className="text-xs mt-1">Try a different search or category</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
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

            {/* Diagram panel */}
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

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  )
}
