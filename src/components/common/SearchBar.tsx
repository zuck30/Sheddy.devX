import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { useFilterStore } from '@/store/filterStore'

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  // Debounce search input to avoid excessive filter updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, setSearchQuery])

  // Clear search input
  const clearSearch = () => {
    setLocalQuery('')
    setSearchQuery('')
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <Search className="h-3.5 w-3.5 text-white/40" />
        </div>
        
        {/* Search input */}
        <Input
          type="text"
          placeholder="grep posts..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="pl-16 pr-10 h-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 font-mono text-sm rounded-lg focus:border-emerald-400/50 focus:ring-emerald-400/20"
        />
        
        {/* Clear button - only show when there's text */}
        {localQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      
      {/* Search hint - optional */}
      {!localQuery && (
        <div className="absolute -bottom-5 left-3 text-[10px] font-mono text-white/20 pointer-events-none hidden sm:block">
          press / to search
        </div>
      )}
    </div>
  )
}