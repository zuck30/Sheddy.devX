import { usePosts } from '@/hooks/usePosts'
import { PostList } from '@/components/blog/PostList'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowRight, Crown, GitBranch } from 'lucide-react'
import { motion } from 'framer-motion'

export function HomePage() {
  const { posts, loading } = usePosts()
  const recentPosts = posts.slice(0, 6)

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section  */}
      <section 
        className="relative border-b border-white/10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1721946441955-508af523ac60?q=80&w=2046&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/70" />
        

        <div className="absolute top-0 left-0 right-0 h-12 bg-black/60 backdrop-blur-sm border-b border-white/10 flex items-center px-4 gap-2 z-10">
         
          <div className="w-16" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-28">
          <div className="mx-auto max-w-5xl">

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-white/60 mt-6 leading-relaxed max-w-2xl font-mono"
            >
              <span className="text-emerald-400">$</span> Exploring the intersection of high-performance engineering, 
              immersive design, and strategic growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <Link to="/blog">
                <Button 
                  className="w-full sm:w-auto bg-white text-black hover:bg-white/90 rounded-lg px-6 h-11 font-medium gap-2 group"
                >
                  Explore Blog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
              <Link to="/resume">
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg px-6 h-11 font-medium gap-2"
                >
                  About Me
                  <Crown className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 pt-6 border-t border-white/20"
            >
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-white/40 font-mono text-sm mt-1">
                {posts.length} total posts: latest
              </p>
            </div>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-all text-sm font-mono group w-fit"
            >
              view all posts
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Posts Grid */}
          <div className="space-y-3">
            <PostList posts={recentPosts} loading={loading} />
          </div>
        </div>
      </section>
    </div>
  )
}