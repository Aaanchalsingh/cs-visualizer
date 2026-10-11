import { useState } from 'react'
import Sidebar from './components/ui/Sidebar.jsx'
import SearchBar from './components/ui/SearchBar.jsx'
import ConceptCard from './components/ui/ConceptCard.jsx'
import DiagramViewer from './components/diagrams/DiagramViewer.jsx'
import { concepts } from './data/concepts.js'

export default function App() {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(concepts.map(c => c.category))]

  const filtered = concepts.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      activeCategory === 'All' || c.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex h-screen overflow-hidden bg-gray-950">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
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

        <div className="flex flex-1 overflow-hidden">
          {/* Concept grid */}
          <div className="flex-1 overflow-y-auto p-6">
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

          {/* Diagram panel */}
          {selected && (
            <DiagramViewer
              concept={selected}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
