import { usePosts } from '@/hooks/usePosts'
import { PostList } from '@/components/blog/PostList'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowRight, Code, Palette, Rocket } from 'lucide-react'
import { GlassCard } from '@/components/common/GlassCard'

export function HomePage() {
  const { posts, loading } = usePosts()
  const recentPosts = posts.slice(0, 6)

  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-8 relative overflow-hidden py-20 px-4 rounded-[3rem] glass">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10"></div>
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Building the <span className="text-primary">Future</span> of the Web
          </h1>
          <p className="text-xl text-muted-foreground">
            A personal blog about software engineering, modern UI design, and career growth in tech.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link to="/blog">
              <Button size="lg" className="rounded-full gap-2">
                Browse Articles <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/resume">
              <Button size="lg" variant="outline" className="rounded-full">
                View My Resume
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-20 text-left">
          <GlassCard className="space-y-3">
             <Code className="h-8 w-8 text-primary" />
             <h3 className="font-bold text-lg">Clean Code</h3>
             <p className="text-sm text-muted-foreground">Focusing on best practices, performance, and maintainability.</p>
          </GlassCard>
          <GlassCard className="space-y-3">
             <Palette className="h-8 w-8 text-primary" />
             <h3 className="font-bold text-lg">UI/UX Design</h3>
             <p className="text-sm text-muted-foreground">Crafting beautiful, accessible, and user-centric interfaces.</p>
          </GlassCard>
          <GlassCard className="space-y-3">
             <Rocket className="h-8 w-8 text-primary" />
             <h3 className="font-bold text-lg">Career Tips</h3>
             <p className="text-sm text-muted-foreground">Sharing insights from my journey to help fellow developers.</p>
          </GlassCard>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="space-y-8">
        <div className="flex items-end justify-between px-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Recent Posts</h2>
            <p className="text-muted-foreground">Latest articles from the blog.</p>
          </div>
          <Link to="/blog" className="text-primary font-medium hover:underline flex items-center gap-1">
            View all posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <PostList posts={recentPosts} loading={loading} />
      </section>
    </div>
  )
}
