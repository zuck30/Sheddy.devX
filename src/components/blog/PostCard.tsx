import { Link } from 'react-router-dom'
import { Calendar, Clock, Eye, ArrowBigUp, ArrowBigDown, MessageSquare } from 'lucide-react'
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

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (localStorage.getItem(`voted_${post.id}`)) return
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
    if (localStorage.getItem(`voted_${post.id}`)) return
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
    <GlassCard className="p-0 overflow-hidden flex group hover:border-primary/50 transition-all duration-300">
      {/* Vote Sidebar */}
      <div className="w-12 bg-translucent flex flex-col items-center py-4 gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:text-orange-500 hover:bg-orange-500/10"
          onClick={handleUpvote}
        >
          <ArrowBigUp className="h-6 w-6" />
        </Button>
        <span className="text-sm font-bold">{voteCount}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:text-blue-500 hover:bg-blue-500/10"
          onClick={handleDownvote}
        >
          <ArrowBigDown className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
          <div className="flex gap-1">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="bg-primary/20 text-primary px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(post.created_at)}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {estimateReadingTime(post.content)}
          </span>
        </div>

        <Link to={`/post/${post.slug}`} className="block">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>

        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-6 text-xs text-muted-foreground font-bold mt-auto">
          <Link to={`/post/${post.slug}`} className="flex items-center gap-2 hover:bg-translucent p-1 px-2 rounded transition-colors">
            <MessageSquare className="h-4 w-4" />
            <span>Comments</span>
          </Link>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{post.views} views</span>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
