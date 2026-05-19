import { Link } from 'react-router-dom'
import { Menu, Sun, Moon, LogOut, BookOpen, User as UserIcon, LayoutDashboard, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useThemeStore } from '@/store/themeStore'
import { useAuth } from '@/hooks/useAuth'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/Sheet'

export function Navbar() {
  const { theme, toggleTheme } = useThemeStore()
  const { user, isAdmin, signOut } = useAuth()

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <Link to="/" className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${isMobile ? 'text-lg py-2' : ''}`}>
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      <Link to="/blog" className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${isMobile ? 'text-lg py-2' : ''}`}>
        <BookOpen className="h-4 w-4" />
        <span>Blog</span>
      </Link>
      <Link to="/resume" className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${isMobile ? 'text-lg py-2' : ''}`}>
        <UserIcon className="h-4 w-4" />
        <span>Resume</span>
      </Link>
      {isAdmin && (
        <Link to="/admin" className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${isMobile ? 'text-lg py-2' : ''}`}>
          <LayoutDashboard className="h-4 w-4" />
          <span>Admin</span>
        </Link>
      )}
    </>
  )

  return (
    <nav className="sticky top-0 z-50 w-full px-4 py-4">
      <div className="container glass flex h-16 items-center justify-between px-6 border-white/10">
        <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80">
          Sheddy.dev
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {user ? (
            <div className="flex items-center gap-2">
               <span className="hidden sm:inline text-sm text-muted-foreground">{user.email}</span>
               <Button variant="ghost" size="icon" onClick={() => signOut()}>
                 <LogOut className="h-5 w-5" />
               </Button>
            </div>
          ) : (
            <Link to="/admin">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass border-l border-white/10">
              <SheetHeader>
                <SheetTitle className="text-left border-b border-white/10 pb-4">Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks isMobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
