import { Link } from 'react-router-dom'
import { Calendar, Clock, Eye, Heart } from 'lucide-react'
import { GlassCard } from '@/components/common/GlassCard'
import { Post } from '@/types'
import { formatDate, estimateReadingTime } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/post/${post.slug}`}>
      <GlassCard className="h-full flex flex-col group">
        <div className="aspect-video w-full overflow-hidden rounded-xl mb-4">
          <img
            src={post.cover_image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {estimateReadingTime(post.content)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {post.likes}
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  )
}
