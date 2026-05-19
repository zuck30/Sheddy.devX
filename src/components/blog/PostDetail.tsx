import { usePost } from '@/hooks/usePosts'
import { MarkdownRenderer } from './MarkdownRenderer'
import { Calendar, Clock, Eye, Heart, ArrowLeft, Share2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { formatDate, estimateReadingTime, cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { post, loading, error, incrementViews, toggleLike } = usePost(slug || '')
  const [isLiked, setIsLiked] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    if (post) {
      incrementViews()
      setIsLiked(localStorage.getItem(`liked_${post.id}`) === 'true')

      // Dynamic SEO Meta Tags
      document.title = `${post.title} | TechBlog`
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt || '')
      }

      // OG Meta Tags
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

    return () => {
      document.title = 'TechBlog | Personal Portfolio'
    }
  }, [post?.id])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) return <div className="animate-pulse container max-w-4xl py-12 space-y-8">
    <div className="h-10 w-3/4 bg-white/5 rounded"></div>
    <div className="h-96 w-full bg-white/5 rounded-2xl"></div>
    <div className="space-y-4">
        <div className="h-4 w-full bg-white/5 rounded"></div>
        <div className="h-4 w-full bg-white/5 rounded"></div>
        <div className="h-4 w-2/3 bg-white/5 rounded"></div>
    </div>
  </div>

  if (error || !post) return <div className="text-center py-20">Post not found</div>

  const handleLike = async () => {
    await toggleLike()
    setIsLiked(localStorage.getItem(`liked_${post.id}`) === 'true')
  }

  const share = (platform: string) => {
    const url = window.location.href
    const title = post.title
    let shareUrl = ''

    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
    if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

    if (shareUrl) window.open(shareUrl, '_blank')
  }

  return (
    <article className="container max-w-4xl py-12 relative">
      <Link to="/blog">
        <Button variant="ghost" size="sm" className="mb-8 gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Button>
      </Link>

      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {formatDate(post.created_at)}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> {estimateReadingTime(post.content)}
          </span>
          <span className="flex items-center gap-2">
            <Eye className="h-4 w-4" /> {post.views} views
          </span>
        </div>
      </header>

      {post.cover_image && (
        <div className="rounded-3xl overflow-hidden mb-12 glass">
          <img src={post.cover_image} alt={post.title} className="w-full object-cover max-h-[500px]" />
        </div>
      )}

      <div className="mb-16">
        <MarkdownRenderer content={post.content} />
      </div>

      <footer className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className={cn("gap-2 rounded-full", isLiked && "text-red-500 border-red-500/50 bg-red-500/10")}
            onClick={handleLike}
          >
            <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
            {post.likes} Likes
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <Share2 className="h-4 w-4" /> Share:
          </span>
          <Button variant="ghost" size="sm" onClick={() => share('twitter')}>Twitter</Button>
          <Button variant="ghost" size="sm" onClick={() => share('linkedin')}>LinkedIn</Button>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          className="fixed bottom-8 right-8 rounded-full h-12 w-12 shadow-2xl z-50"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowLeft className="h-5 w-5 rotate-90" />
        </Button>
      )}
    </article>
  )
}
