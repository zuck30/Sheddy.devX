import { PostCard } from './PostCard'
import { Post } from '@/types'

interface PostListProps {
  posts: Post[]
  loading?: boolean
}

export function PostList({ posts, loading }: PostListProps) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="glass-card animate-pulse h-[160px] flex gap-0 p-0 overflow-hidden">
            <div className="w-12 bg-translucent h-full"></div>
            <div className="flex-1 p-4 space-y-3">
              <div className="bg-translucent h-3 w-1/4 rounded"></div>
              <div className="bg-translucent h-6 w-3/4 rounded"></div>
              <div className="bg-translucent h-4 w-full rounded"></div>
            </div>
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
    <div className="flex flex-col gap-4">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
