import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { useFilterStore } from '@/store/filterStore'

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, setSearchQuery])

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search posts..."
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
