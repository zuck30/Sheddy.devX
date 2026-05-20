import { usePosts } from '@/hooks/usePosts'
import { PostList } from '@/components/blog/PostList'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function HomePage() {
  const { posts, loading } = usePosts()
  const recentPosts = posts.slice(0, 6)

  return (
    <div className="space-y-16 md:space-y-24 py-6 md:py-8">
      {/* Hero Section - Professional Mobile Design */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        
        {/* Content Container */}
        <div className="relative px-5 py-12 md:py-24 md:px-8 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex justify-center md:justify-start mb-6"
            >
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center md:text-left text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] md:leading-[1.15]"
            >
              <span className="block">CRAFTING</span>
              <span className="block mt-2">
                <span className="text-primary">DIGITAL</span>
                <span className="text-foreground"> EXPERIENCES</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-center md:text-left text-base sm:text-lg md:text-xl text-muted-foreground mt-6 md:mt-8 leading-relaxed max-w-2xl mx-auto md:mx-0"
            >
              Exploring the intersection of high-performance engineering, 
              immersive design, and strategic growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 mt-8 md:mt-10"
            >
              <Link to="/blog">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full px-6 md:px-8 h-12 md:h-14 text-base md:text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 gap-2"
                >
                  Explore Blog 
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
              <Link to="/resume">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto rounded-full px-6 md:px-8 h-12 md:h-14 text-base md:text-lg font-semibold border-muted-foreground/20 hover:bg-muted/50 hover:border-primary/50 transition-all duration-300 gap-2"
                >
                  About Me
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
            </motion.div>

          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />
      </motion.section>

      {/* Recent Posts Section */}
      <section className="space-y-6 md:space-y-8 max-w-4xl mx-auto w-full px-4 md:px-0">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="space-y-1.5">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Recent Posts</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Latest articles from the blog
            </p>
          </div>
          <Link 
            to="/blog" 
            className="text-primary font-medium hover:underline flex items-center gap-1 text-sm md:text-base group w-fit"
          >
            View all posts 
            <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <PostList posts={recentPosts} loading={loading} />
      </section>
    </div>
  )
}