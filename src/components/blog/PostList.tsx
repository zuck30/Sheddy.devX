// PostList.tsx - Warp Style
import { PostCard } from './PostCard'
import { Post } from '@/types'

interface PostListProps {
  posts: Post[]
  loading?: boolean
}

export function PostList({ posts, loading }: PostListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 animate-pulse">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded bg-white/10" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 border border-white/10 rounded-lg">
        <p className="text-white/40 font-mono">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}