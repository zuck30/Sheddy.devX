import { useFilterStore } from '@/store/filterStore'
import { cn } from '@/lib/utils'
import { Hash, X } from 'lucide-react'

interface TagFilterProps {
  tags: string[]
  loading?: boolean
}

export function TagFilter({ tags, loading }: TagFilterProps) {
  const { selectedTags, toggleTag, clearFilters } = useFilterStore()

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-mono text-white/40">loading tags...</span>
      </div>
    )
  }

  // Don't render if no tags
  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex items-center gap-1.5 mr-1">
        <Hash className="h-3 w-3 text-emerald-400" />
        <span className="text-xs font-mono text-white/40">tags</span>
        <span className="text-white/20 mx-1">|</span>
      </div>

      {/* Tag buttons */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={cn(
              "px-2.5 py-1 rounded text-xs font-mono transition-all duration-150",
              selectedTags.includes(tag)
                ? "bg-emerald-400 text-black border border-emerald-400"
                : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Clear filters button */}
      {selectedTags.length > 0 && (
        <button
          onClick={clearFilters}
          className="ml-1 p-1 rounded text-white/30 hover:text-white/60 hover:bg-white/10 transition-colors"
          aria-label="Clear all filters"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}