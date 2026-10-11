import { Search, X } from 'lucide-react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search concepts..."
        className="w-full pl-9 pr-8 py-2 rounded-lg text-sm font-mono
                   bg-theme-tertiary border border-theme
                   text-theme-primary placeholder-theme-muted
                   focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30
                   transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-primary"
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}
