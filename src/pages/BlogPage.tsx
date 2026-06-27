import { usePosts } from '@/hooks/usePosts'
import { PostList } from '@/components/blog/PostList'
import { SearchBar } from '@/components/common/SearchBar'
import { TagFilter } from '@/components/common/TagFilter'
import {  useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

export function BlogPage() {
  const [page, setPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [allTags, setAllTags] = useState<string[]>([])
  const [tagsLoading, setTagsLoading] = useState(true)
  const pageSize = 6
  const { posts, totalCount, loading } = usePosts(page, pageSize)


  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('tags')
          .eq('published', true)
        
        if (!error && data) {
          const tagSet = new Set<string>()
          data.forEach(post => {
            if (post.tags && Array.isArray(post.tags)) {
              post.tags.forEach((tag: string) => tagSet.add(tag))
            }
          })
          setAllTags(Array.from(tagSet).sort())
        }
      } catch (err) {
        console.error('Error fetching tags:', err)
      } finally {
        setTagsLoading(false)
      }
    }
    
    fetchAllTags()
  }, [])

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header*/}
          <div className="mb-8">
            <p className="text-white/50 font-mono text-base">
              {totalCount} posts. Sharing thoughts and technical deep-dives
            </p>
          </div>

          {/* Filters  */}
          <div className="mb-8">
            {/* Mobile filter button */}
            <div className="sm:hidden">
              <Button
                variant="outline"
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="w-full justify-between border-white/20 bg-white/5 text-white hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters & Search
                </span>
                {mobileFiltersOpen ? <X className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
              
              {mobileFiltersOpen && (
                <div className="mt-3 p-4 rounded-lg border border-white/20 bg-white/5 space-y-4">
                  <SearchBar />
                  <TagFilter tags={allTags} loading={tagsLoading} />
                </div>
              )}
            </div>

            <div className="hidden sm:block sticky top-20 z-40 bg-[#0A0A0A]/95 backdrop-blur-sm py-4 rounded-lg border border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <SearchBar />
                <TagFilter tags={allTags} loading={tagsLoading} />
              </div>
            </div>
          </div>

          {/* Posts list */}
          <PostList posts={posts} loading={loading} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-white/10">
              <div className="text-sm font-mono text-white/40">
                {totalCount} total posts
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-1">
                  {(() => {
                    const pages = []
                    const maxVisible = 5
                    let startPage = Math.max(1, page - Math.floor(maxVisible / 2))
                    const endPage = Math.min(totalPages, startPage + maxVisible - 1)
                    
                    if (endPage - startPage + 1 < maxVisible) {
                      startPage = Math.max(1, endPage - maxVisible + 1)
                    }
                    
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <Button
                          key={i}
                          variant={page === i ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPage(i)}
                          className={`w-9 h-9 p-0 ${
                            page === i 
                              ? 'bg-emerald-400 text-black hover:bg-emerald-500' 
                              : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                          }`}
                        >
                          {i}
                        </Button>
                      )
                    }
                    return pages
                  })()}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-sm font-mono text-white/40">
                Page {page} of {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}