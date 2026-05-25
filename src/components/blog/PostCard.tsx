import { Link } from 'react-router-dom'
import { Calendar, Clock, Eye, ArrowUp, ArrowDown, MessageSquare, ChevronRight, Terminal } from 'lucide-react'
import { Post } from '@/types'
import { formatDate, estimateReadingTime } from '@/lib/utils'
import { supabase } from '@/lib/supabaseClient'
import { useState, useEffect } from 'react'

interface PostCardProps {
  post: Post
}

export function PostCard({ post: initialPost }: PostCardProps) {
  const [post, setPost] = useState(initialPost)
  const [hasVoted, setHasVoted] = useState<string | null>(null)

  useEffect(() => {
    setHasVoted(localStorage.getItem(`voted_${post.id}`))
  }, [post.id])

  const voteCount = (post.upvotes || 0) - (post.downvotes || 0)

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (hasVoted) return
    try {
      const { error } = await supabase.rpc('upvote_post', { post_id: post.id })
      if (!error) {
        setPost(prev => ({ ...prev, upvotes: (prev.upvotes || 0) + 1 }))
        localStorage.setItem(`voted_${post.id}`, 'up')
        setHasVoted('up')
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
        setPost(prev => ({ ...prev, downvotes: (prev.downvotes || 0) + 1 }))
        localStorage.setItem(`voted_${post.id}`, 'down')
        setHasVoted('down')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Link to={`/post/${post.slug}`} className="block group">
      <div className="bg-white/5 border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/[0.07] transition-all duration-200">
        <div className="p-4">
          {/* Header with metadata - Terminal style */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">$</span>
              <span className="text-white/40">post</span>
              <span className="text-white/40">→</span>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {post.tags?.slice(0, 3).map(tag => (
                <span 
                  key={tag} 
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/60 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-white/40 line-clamp-2 mb-3 font-mono">
            {post.excerpt}
          </p>

          {/* Footer - Like Warp's run metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/40">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {estimateReadingTime(post.content)}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3 h-3" />
                {post.views || 0} views
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3 h-3" />
                discuss
              </span>
            </div>

            {/* Vote buttons - Terminal style */}
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleUpvote(e)
                }}
                className={`p-1 rounded hover:bg-white/10 transition-colors ${
                  hasVoted === 'up' ? 'text-emerald-400' : 'text-white/30 hover:text-emerald-400'
                }`}
                disabled={!!hasVoted}
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono text-white/60 min-w-[20px] text-center">
                {voteCount}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleDownvote(e)
                }}
                className={`p-1 rounded hover:bg-white/10 transition-colors ${
                  hasVoted === 'down' ? 'text-red-400' : 'text-white/30 hover:text-red-400'
                }`}
                disabled={!!hasVoted}
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Status indicator line - Like Warp's "Just now" */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/30">
            {estimateReadingTime(post.content)} read
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}