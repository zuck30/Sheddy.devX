import { usePosts } from '@/hooks/usePosts'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import hero1 from '@/assets/hero-1.jpg'
import hero2 from '@/assets/hero-2.jpg'
import hero3 from '@/assets/hero-3.jpg'
import hero4 from '@/assets/hero-4.jpg'
import hero5 from '@/assets/hero-5.jpg'
import hero6 from '@/assets/hero-6.jpg'
import hero7 from '@/assets/hero-7.jpg'
import hero8 from '@/assets/hero-8.jpg'
import hero9 from '@/assets/hero-9.jpg'
import hero10 from '@/assets/hero-10.jpg'
import hero11 from '@/assets/hero-11.jpg'
import hero12 from '@/assets/hero-12.jpg'

export function HomePage() {
  const { posts, loading } = usePosts()
  const recentPosts = posts.slice(0, 6)
  const [currentImage, setCurrentImage] = useState(0)
  const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, hero9, hero10, hero11, hero12]

  const nextSlide = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#FAFAF8] text-black min-h-screen selection:bg-[#FA520F] selection:text-white">
      {/* Hero Section - 12 Image Slideshow */}
      <section className="relative min-h-screen w-full bg-[#fafafa] flex flex-col pt-16 md:pt-20 lg:pt-24">
        <main className="flex-grow flex items-center justify-center px-4 md:px-8 py-6 md:py-10 bg-[#fafafa]">
          <div className="relative w-full max-w-[1400px] h-[70vh] md:h-[80vh] rounded-2xl overflow-hidden bg-black shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={heroImages[currentImage]}
                  alt={`Hero Background ${currentImage + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent z-[1]" />

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-8 md:top-12 left-8 md:left-12 z-10 max-w-xl bg-black/70 backdrop-blur-sm p-6 md:p-8 rounded-sm"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight text-white">
                Engineering.
                <br />
                Design.
                <br />
                Growth.
              </h1>
              
              <p className="mt-4 text-sm md:text-base font-normal text-gray-200 leading-relaxed max-w-lg">
                I, Shadrack just like building fast software and clean interfaces with a unique taste that actually work.
              </p>
            </motion.div>

            {/* Navigation controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white transition-all duration-200 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white transition-all duration-200 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImage === index 
                      ? 'bg-white w-6' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </main>
      </section>

      {/* Recent Posts Section */}
      <section className="px-6 md:px-12 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.03em] leading-[0.95]">
                Latest Posts
              </h2>
              <p className="text-[10px] font-mono uppercase text-neutral-700 mt-2">
                {posts.length} total
              </p>
            </div>
            <Link 
              to="/blog" 
              className="group inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-700 hover:text-[#FA520F] transition-colors"
            >
              view all
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="group bg-[#F5F5F5] hover:bg-[#EAEAEA] transition-colors cursor-pointer"
              >
                <Link to={`/post/${post.slug}`} className="block p-8 md:p-10 min-h-[320px] flex flex-col justify-between">
                  <div>
                    {post.cover_image && (
                      <div className="aspect-video relative border border-neutral-200 overflow-hidden mb-6 bg-neutral-100">
                        <img 
                          src={post.cover_image} 
                          alt={post.title} 
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-1 bg-[#FA520F] text-white">
                        Read
                      </span>
                      <span className="text-[10px] font-mono text-neutral-700 uppercase">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-normal tracking-tight mb-3 group-hover:text-[#FA520F] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed line-clamp-3">
                      {post.excerpt?.replace(/^(?:TITLE|EXCERPT|CONTENT):\s*/gi, '').trim() ||
                       post.content?.replace(/<[^>]*>/g, '').substring(0, 160)}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-200/50">
                    <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-neutral-700 group-hover:text-[#FA520F] transition-colors">
                      Read More
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {recentPosts.length === 0 && !loading && (
            <div className="text-center py-20 border border-dashed border-neutral-200">
              <p className="font-mono text-neutral-700">No posts found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}