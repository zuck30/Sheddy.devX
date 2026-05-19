import { PostCard } from './PostCard'
import { Post } from '@/types'

interface PostListProps {
  posts: Post[]
  loading?: boolean
}

export function PostList({ posts, loading }: PostListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="glass-card animate-pulse h-[400px]">
            <div className="bg-white/5 h-48 w-full rounded-xl mb-4"></div>
            <div className="bg-white/5 h-6 w-3/4 rounded mb-2"></div>
            <div className="bg-white/5 h-4 w-1/2 rounded mb-4"></div>
            <div className="bg-white/5 h-20 w-full rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-medium text-muted-foreground">No posts found.</h3>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
