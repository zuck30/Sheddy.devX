import { usePosts } from '@/hooks/usePosts'
import { PostList } from '@/components/blog/PostList'
import { SearchBar } from '@/components/common/SearchBar'
import { TagFilter } from '@/components/common/TagFilter'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function BlogPage() {
  const [page, setPage] = useState(1)
  const pageSize = 6
  const { posts, totalCount, loading } = usePosts(page, pageSize)

  const allTags = useMemo(() => {
    // In a real app, we might fetch all tags from a separate endpoint
    // For now, we use tags from current page + some common ones
    const tags = new Set<string>(['Architecture', 'Engineering', 'Innovation', 'Design', 'Strategy', 'Growth'])
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)))
    return Array.from(tags)
  }, [posts])

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="space-y-12 py-12">
      <div className="space-y-4 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">The <span className="text-primary">Blog</span></h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Sharing my thoughts, experiences, and technical tutorials.
        </p>
      </div>

      <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md py-4 px-4 rounded-2xl border border-white/10 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <SearchBar />
          <TagFilter tags={allTags} />
        </div>
      </div>

      <PostList posts={posts} loading={loading} />

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
