import { Link } from 'react-router-dom'
import { Calendar, Clock, Eye, ArrowBigUp, ArrowBigDown, MessageSquare, ChevronRight } from 'lucide-react'
import { GlassCard } from '@/components/common/GlassCard'
import { Post } from '@/types'
import { formatDate, estimateReadingTime } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabaseClient'
import { useState } from 'react'

interface PostCardProps {
  post: Post
}

export function PostCard({ post: initialPost }: PostCardProps) {
  const [post, setPost] = useState(initialPost)
  const voteCount = (post.upvotes || 0) - (post.downvotes || 0)
  const hasVoted = localStorage.getItem(`voted_${post.id}`)

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (hasVoted) return
    try {
      const { error } = await supabase.rpc('upvote_post', { post_id: post.id })
      if (!error) {
        setPost(prev => ({ ...prev, upvotes: prev.upvotes + 1 }))
        localStorage.setItem(`voted_${post.id}`, 'up')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleDownvote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (hasVoted) return
    try {
      const { error } = await supabase.rpc('downvote_post', { post_id: post.id })
      if (!error) {
        setPost(prev => ({ ...prev, downvotes: prev.downvotes + 1 }))
        localStorage.setItem(`voted_${post.id}`, 'down')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <GlassCard className="overflow-hidden flex flex-col md:flex-row group hover:border-primary/50 transition-all duration-300">
      {/* Vote Section - Horizontal on mobile, Vertical on desktop */}
      <div className="flex md:flex-col items-center justify-around md:justify-start gap-2 md:gap-1 p-3 md:p-4 md:w-16 bg-translucent/50 border-b md:border-b-0 md:border-r border-translucent">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:h-9 md:w-9 hover:text-orange-500 hover:bg-orange-500/10 transition-all"
          onClick={handleUpvote}
          disabled={!!hasVoted}
        >
          <ArrowBigUp className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
        <span className={`text-sm md:text-base font-bold ${hasVoted === 'up' ? 'text-orange-500' : hasVoted === 'down' ? 'text-blue-500' : ''}`}>
          {voteCount}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:h-9 md:w-9 hover:text-blue-500 hover:bg-blue-500/10 transition-all"
          onClick={handleDownvote}
          disabled={!!hasVoted}
        >
          <ArrowBigDown className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-5 flex flex-col">
        {/* Tags and Meta - Scrollable on mobile if needed */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[10px] md:text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-primary/15 text-primary px-2 py-0.5 rounded-md text-[10px] md:text-[11px] font-semibold">
                {tag}
              </span>
            ))}
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span className="text-[10px] md:text-[11px]">{formatDate(post.created_at)}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-[10px] md:text-[11px]">{estimateReadingTime(post.content)}</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/post/${post.slug}`} className="block group/title">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 group-hover/title:text-primary transition-colors leading-tight">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt - Responsive line clamp */}
        <p className="text-muted-foreground text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-3 md:mb-4 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-4 mt-auto pt-2">
          <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
            <Link 
              to={`/post/${post.slug}`} 
              className="flex items-center gap-1.5 hover:text-primary transition-colors group/comment"
            >
              <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-[11px] md:text-xs">Comments</span>
            </Link>
            <div className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-[11px] md:text-xs">{post.views || 0} views</span>
            </div>
          </div>
          
          {/* Read More - Mobile friendly */}
          <Link 
            to={`/post/${post.slug}`}
            className="flex items-center gap-1 text-xs md:text-sm font-medium text-primary hover:gap-2 transition-all"
          >
            <span className="hidden sm:inline">Read more</span>
            <span className="sm:hidden">Read</span>
            <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Link>
        </div>
      </div>
    </GlassCard>
  )
}