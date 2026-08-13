import { Link } from 'react-router-dom'
import { Menu, X, LogOut, BookOpen, User as UserIcon, LayoutDashboard, Home, Megaphone } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'

export function Navbar() {
  const { user, isAdmin, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(true)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  const toggleMenu = () => {
    setMobileOpen(!mobileOpen)
  }

  const closeMenu = () => {
    setMobileOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans">
      {/* Top Banner - With Announcement Tag */}
      {isBannerVisible && (
        <div className="bg-[#111111] text-white text-xs py-2 px-6 flex justify-between items-center w-full tracking-wide">
          <div className="flex-1 flex justify-start items-center gap-4 pl-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#EAEAEA] text-black font-bold text-[10px] uppercase tracking-wider rounded-sm shrink-0">
              <Megaphone className="w-3 h-3" />
              Announcement
            </span>
            <span className="truncate">
              Welcome to sheddy.dev | Blog, Resume & More
            </span>
          </div>
          <button 
            onClick={() => setIsBannerVisible(false)}
            className="text-gray-400 hover:text-white transition-colors ml-4 shrink-0"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 transition-colors duration-200 border-b bg-white text-black border-neutral-200">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0 z-50">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-200">
            <img
              src="/duck.png"
              alt="Sheddy.dev Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
          <span className="text-xl font-semibold tracking-tight">sheddy.dev</span>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 z-50">
          <Link 
            to="/blog"
            className="hidden lg:flex px-6 py-2 text-sm font-medium border transition-colors border-black hover:bg-gray-50 text-black"
          >
            Blog
          </Link>
          
          <Link 
            to="/resume"
            className="hidden lg:flex px-6 py-2 text-sm font-medium border transition-colors border-black bg-white text-black hover:bg-neutral-50"
          >
            Resume
          </Link>

          {isAdmin && (
            <Link 
              to="/admin"
              className="hidden lg:flex px-6 py-2 text-sm font-medium border transition-colors border-black bg-white text-black hover:bg-neutral-50"
            >
              Admin
            </Link>
          )}

          {user ? (
            <button
              onClick={() => signOut()}
              className="hidden lg:flex px-6 py-2 text-sm font-medium border transition-colors border-black bg-white text-black hover:bg-neutral-50"
            >
              Sign Out
            </button>
          ) : null}

          {/* Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="p-2 border transition-colors bg-white text-black border-black hover:bg-gray-50"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Full screen overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[73px] z-50 bg-white border-t border-neutral-200 overflow-y-auto">
          <div className="flex flex-col p-6 space-y-4">
            <Link 
              to="/" 
              onClick={closeMenu}
              className="flex items-center gap-3 py-3 border-b border-neutral-100 text-black hover:text-[#FA520F] transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>
            <Link 
              to="/blog" 
              onClick={closeMenu}
              className="flex items-center gap-3 py-3 border-b border-neutral-100 text-black hover:text-[#FA520F] transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Blog</span>
            </Link>
            <Link 
              to="/resume" 
              onClick={closeMenu}
              className="flex items-center gap-3 py-3 border-b border-neutral-100 text-black hover:text-[#FA520F] transition-colors"
            >
              <UserIcon className="h-5 w-5" />
              <span className="font-medium">Resume</span>
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                onClick={closeMenu}
                className="flex items-center gap-3 py-3 border-b border-neutral-100 text-black hover:text-[#FA520F] transition-colors"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span className="font-medium">Admin</span>
              </Link>
            )}
            {user && (
              <button
                onClick={() => {
                  signOut()
                  closeMenu()
                }}
                className="flex items-center gap-3 py-3 text-black hover:text-[#FA520F] transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}