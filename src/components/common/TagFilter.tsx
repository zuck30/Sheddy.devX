import { useFilterStore } from '@/store/filterStore'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface TagFilterProps {
  tags: string[]
}

export function TagFilter({ tags }: TagFilterProps) {
  const { selectedTags, toggleTag, clearFilters } = useFilterStore()

  if (tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm font-medium mr-2">Filter by:</span>
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"}
          size="sm"
          onClick={() => toggleTag(tag)}
          className={cn(
            "rounded-full px-4",
            selectedTags.includes(tag) && "bg-primary text-primary-foreground"
          )}
        >
          {tag}
        </Button>
      ))}
      {selectedTags.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear
        </Button>
      )}
    </div>
  )
}
