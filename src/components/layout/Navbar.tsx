import { Link } from 'react-router-dom'
import { Menu, LogOut, BookOpen, User as UserIcon, LayoutDashboard, Home, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useState, useEffect } from 'react'

export function Navbar() {
  const { user, isAdmin, signOut } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

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

  const NavLinks = ({ isMobile = false, onClick }: { isMobile?: boolean; onClick?: () => void }) => (
    <>
      <Link 
        to="/" 
        onClick={onClick}
        className={`flex items-center gap-2 font-mono transition-colors ${
          isMobile 
            ? 'text-white/80 hover:text-emerald-400 py-3 px-4 rounded-lg hover:bg-white/10' 
            : 'text-sm text-white/60 hover:text-white'
        }`}
      >
        <Home className="h-4 w-4" />
        <span>~/home</span>
      </Link>
      <Link 
        to="/blog" 
        onClick={onClick}
        className={`flex items-center gap-2 font-mono transition-colors ${
          isMobile 
            ? 'text-white/80 hover:text-emerald-400 py-3 px-4 rounded-lg hover:bg-white/10' 
            : 'text-sm text-white/60 hover:text-white'
        }`}
      >
        <BookOpen className="h-4 w-4" />
        <span>~/blog</span>
      </Link>
      <Link 
        to="/resume" 
        onClick={onClick}
        className={`flex items-center gap-2 font-mono transition-colors ${
          isMobile 
            ? 'text-white/80 hover:text-emerald-400 py-3 px-4 rounded-lg hover:bg-white/10' 
            : 'text-sm text-white/60 hover:text-white'
        }`}
      >
        <UserIcon className="h-4 w-4" />
        <span>~/resume</span>
      </Link>
      {isAdmin && (
        <Link 
          to="/admin" 
          onClick={onClick}
          className={`flex items-center gap-2 font-mono transition-colors ${
            isMobile 
              ? 'text-white/80 hover:text-emerald-400 py-3 px-4 rounded-lg hover:bg-white/10' 
              : 'text-sm text-white/60 hover:text-white'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>~/admin</span>
        </Link>
      )}
    </>
  )

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#0A0A0A] border-b border-white/10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between max-w-7xl mx-auto">
            {/* Logo with duck.png image - rounded and styled */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 p-0.5 shadow-lg shadow-emerald-400/20">
                <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
                  <img 
                    src="/duck.png" 
                    alt="Sheddy.dev logo" 
                    className="h-7 w-7 object-contain rounded-full"
                  />
                </div>
              </div>
              <span className="text-sm font-mono font-semibold text-white group-hover:text-emerald-400 transition-colors hidden sm:inline">
                sheddy.dev
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <NavLinks />
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Auth section */}
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-xs font-mono text-white/40">
                    {user.email?.split('@')[0]}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Sign out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Link to="/admin">
                  <button className="px-3 py-1.5 rounded-lg text-xs font-mono text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                    $ login
                  </button>
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu drawer - fixed overlay with solid background */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-14 z-50 bg-[#0A0A0A]">
          <div className="flex flex-col p-4 space-y-1">
            <NavLinks isMobile onClick={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}