import { usePosts } from '@/hooks/usePosts'
import { SearchBar } from '@/components/common/SearchBar'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Filter, X } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { Link } from 'react-router-dom'

export function BlogPage() {
  const [page, setPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const pageSize = 6
  const { posts, totalCount, loading } = usePosts(page, pageSize)

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="bg-[#FAFAF8] text-black min-h-screen selection:bg-[#FA520F] selection:text-white pt-16 md:pt-20 lg:pt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Header */}
        <header className="mb-24 md:mb-40 text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-0.02em] leading-[1.1] mb-6">
            Welcome to my blog.
          </h1>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed text-neutral-500 mx-auto font-light">
            {totalCount} posts. Sharing thoughts and technical stuff.
          </p>
        </header>

        {/* Filters - Search only */}
        <div className="mb-12">
          {/* Mobile filter button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="w-full flex items-center justify-between bg-[#FA520F] hover:bg-black text-white px-4 py-3 font-mono text-sm font-bold uppercase tracking-wider transition-colors duration-200 border-2 border-[#FA520F] hover:border-black"
            >
              <span className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Search
              </span>
              {mobileFiltersOpen ? <X className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            
            {mobileFiltersOpen && (
              <div className="mt-4 p-6 border-2 border-neutral-200 bg-white space-y-4">
                <SearchBar />
              </div>
            )}
          </div>

          {/* Desktop search */}
          <div className="hidden sm:block">
            <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 border border-neutral-200 bg-white">
              <SearchBar />
            </div>
          </div>
        </div>

        {/* Posts Grid - Antera Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className="group bg-[#F5F5F5] hover:bg-[#EAEAEA] transition-colors cursor-pointer"
            >
              <Link to={`/post/${post.slug}`} className="block p-8 md:p-10 min-h-[320px] flex flex-col justify-between">
                <div>
                  {post.cover_image && (
                    <div className="aspect-video relative border border-neutral-200 overflow-hidden mb-6 bg-neutral-100">
                      <img 
                        src={post.cover_image} 
                        alt={post.title} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-1 bg-[#FA520F] text-white">Read</span>
                    <span className="text-[10px] font-mono text-neutral-700 uppercase">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-normal tracking-tight mb-3 group-hover:text-[#FA520F] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed line-clamp-3">
                    {post.excerpt?.replace(/^(?:TITLE|EXCERPT|CONTENT):\s*/gi, '').trim() ||
                     post.content?.replace(/<[^>]*>/g, '').substring(0, 160)}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-200/50">
                  <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-neutral-700 group-hover:text-[#FA520F] transition-colors">
                    Read More
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {posts.length === 0 && !loading && (
          <div className="text-center py-20 border border-dashed border-neutral-200">
            <p className="font-mono text-neutral-700">No articles found.</p>
          </div>
        )}

        {/* Pagination - Antera Style */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-neutral-200">
            <div className="text-[10px] font-mono uppercase text-neutral-700">
              {totalCount} total posts
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="bg-white hover:bg-neutral-100 text-black px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider transition-colors duration-200 border-2 border-neutral-300 hover:border-black disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
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
                      <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider transition-colors duration-200 border-2 ${
                          page === i 
                            ? 'bg-[#FA520F] text-white border-[#FA520F]' 
                            : 'bg-white text-black border-neutral-300 hover:border-black hover:bg-neutral-100'
                        }`}
                      >
                        {i}
                      </button>
                    )
                  }
                  return pages
                })()}
              </div>
              
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="bg-white hover:bg-neutral-100 text-black px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider transition-colors duration-200 border-2 border-neutral-300 hover:border-black disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="text-[10px] font-mono uppercase text-neutral-700">
              Page {page} of {totalPages}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}