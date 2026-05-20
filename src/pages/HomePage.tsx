import { usePosts } from '@/hooks/usePosts'
import { PostList } from '@/components/blog/PostList'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Sparkles, TrendingUp } from 'lucide-react'
import { GlassCard } from '@/components/common/GlassCard'
import { motion } from 'framer-motion'

export function HomePage() {
  const { posts, loading } = usePosts()
  const recentPosts = posts.slice(0, 6)

  return (
    <div className="space-y-24 py-8 px-0 sm:px-4">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 relative overflow-hidden py-24 px-6 sm:px-12 rounded-none sm:rounded-[3.5rem] glass border-x-0 sm:border-x border-translucent"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10"></div>
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-none"
          >
            CRAFTING <span className="text-primary">DIGITAL</span> EXPERIENCES
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Exploring the intersection of high-performance engineering, immersive design, and strategic growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 pt-6"
          >
            <Link to="/blog">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform gap-2">
                Explore Blog <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/resume">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-bold border-translucent hover:bg-translucent transition-all">
                About Me
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24 text-left">
          {[
            {
              icon: <Cpu className="h-10 w-10 text-primary" />,
              title: "Creative Engineering",
              desc: "Pushing boundaries with robust architectures and cutting-edge technologies."
            },
            {
              icon: <Sparkles className="h-10 w-10 text-primary" />,
              title: "Visual Storytelling",
              desc: "Merging aesthetics with functionality to create unforgettable user journeys."
            },
            {
              icon: <TrendingUp className="h-10 w-10 text-primary" />,
              title: "Strategic Growth",
              desc: "Sharing high-impact insights to accelerate your professional path in tech."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <GlassCard className="h-full space-y-4 border-translucent hover:border-primary/20 transition-colors">
                <div className="bg-primary/10 p-3 rounded-2xl w-fit">
                  {feature.icon}
                </div>
                <h3 className="font-black text-2xl tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recent Posts */}
      <section className="space-y-8 max-w-4xl mx-auto w-full">
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
