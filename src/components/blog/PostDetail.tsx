import { usePost } from '@/hooks/usePosts'
import { MarkdownRenderer } from './MarkdownRenderer'
import { Calendar, Clock, Eye, ArrowBigUp, ArrowBigDown, ArrowLeft, Share2, Terminal, ChevronUp, Twitter, Linkedin, MessageCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { formatDate, estimateReadingTime, cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { post, loading, error, incrementViews, upvote, downvote } = usePost(slug || '')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  // Check if user already voted
  useEffect(() => {
    if (post) {
      setHasVoted(!!localStorage.getItem(`voted_${post.id}`))
    }
  }, [post?.id])

  // Update view count and SEO meta tags
  useEffect(() => {
    if (post) {
      incrementViews()

      // Update SEO meta tags
      document.title = `${post.title} | Sheddy.dev`
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt || '')
      }

      // Open Graph meta tags for social sharing
      const setOgTag = (property: string, content: string) => {
        let el = document.querySelector(`meta[property="${property}"]`)
        if (!el) {
          el = document.createElement('meta')
          el.setAttribute('property', property)
          document.head.appendChild(el)
        }
        el.setAttribute('content', content)
      }

      setOgTag('og:title', post.title)
      setOgTag('og:description', post.excerpt || '')
      if (post.cover_image) setOgTag('og:image', post.cover_image)
    }

    // Cleanup: reset title on unmount
    return () => {
      document.title = 'Sheddy.dev | Personal Portfolio'
    }
  }, [post?.id])

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Share post to social media
  const share = (platform: string) => {
    const url = window.location.href
    const title = post?.title || ''
    let shareUrl = ''

    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    }
    if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }
    if (platform === 'whatsapp') {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    }

    if (shareUrl) window.open(shareUrl, '_blank')
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A]">
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-4xl">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-24 bg-white/10 rounded" />
              <div className="space-y-4">
                <div className="h-12 w-3/4 bg-white/10 rounded" />
                <div className="h-4 w-full bg-white/10 rounded" />
                <div className="h-4 w-full bg-white/10 rounded" />
                <div className="h-4 w-2/3 bg-white/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error or no post state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 font-mono">Post not found</p>
          <Link to="/blog" className="text-emerald-400 font-mono text-sm mt-4 inline-block hover:underline">
            ← back to blog
          </Link>
        </div>
      </div>
    )
  }

  const voteCount = (post.upvotes || 0) - (post.downvotes || 0)

  return (
    <article className="min-h-screen bg-[#0A0A0A]">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Back button  */}
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="mb-8 gap-2 font-mono text-white/60 hover:text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" /> 
              <span>$ cd ../blog</span>
            </Button>
          </Link>

          {/* Post header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map(tag => (
                <span key={tag} className="text-[11px] font-mono bg-white/10 text-emerald-400 px-2.5 py-1 rounded border border-white/10">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-5 text-sm font-mono text-white/40 border-t border-white/10 pt-5">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {estimateReadingTime(post.content)} read
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" /> {post.views} views
              </span>
            </div>
          </header>

          {/* Cover image */}
          {post.cover_image && (
            <div className="rounded-lg overflow-hidden mb-10 border border-white/10">
              <img 
                src={post.cover_image} 
                alt={post.title} 
                className="w-full object-cover max-h-[400px]" 
                loading="lazy" 
              />
            </div>
          )}

          {/* Markdown content */}
          <div className="prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none mb-12">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Footer with voting and sharing */}
          <footer className="border-t border-white/10 pt-8 mt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
              {/* Vote buttons */}
              <div className="flex items-center gap-2">
                <div className="bg-white/5 border border-white/10 rounded-full flex items-center p-0.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full hover:text-emerald-400 transition-colors",
                      hasVoted && "opacity-40 cursor-not-allowed"
                    )}
                    onClick={() => {
                      if (!hasVoted) {
                        upvote()
                        localStorage.setItem(`voted_${post.id}`, 'up')
                        setHasVoted(true)
                      }
                    }}
                    disabled={hasVoted}
                  >
                    <ArrowBigUp className="h-5 w-5" />
                  </Button>
                  <span className="px-2 text-sm font-mono text-white/80 min-w-[32px] text-center">
                    {voteCount}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full hover:text-red-400 transition-colors",
                      hasVoted && "opacity-40 cursor-not-allowed"
                    )}
                    onClick={() => {
                      if (!hasVoted) {
                        downvote()
                        localStorage.setItem(`voted_${post.id}`, 'down')
                        setHasVoted(true)
                      }
                    }}
                    disabled={hasVoted}
                  >
                    <ArrowBigDown className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-white/40 flex items-center gap-1.5">
                  <Share2 className="h-3.5 w-3.5" /> share:
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => share('twitter')}
                  className="font-mono text-xs text-white/60 hover:text-white hover:bg-white/10 gap-1.5"
                >
                  <Twitter className="h-3.5 w-3.5" />
                  twitter
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => share('linkedin')}
                  className="font-mono text-xs text-white/60 hover:text-white hover:bg-white/10 gap-1.5"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                  linkedin
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => share('whatsapp')}
                  className="font-mono text-xs text-white/60 hover:text-white hover:bg-white/10 gap-1.5"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  whatsapp
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          className="fixed bottom-6 right-6 rounded-full h-10 w-10 bg-white/10 border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm z-50"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className="h-4 w-4 text-white" />
        </Button>
      )}
    </article>
  )
}