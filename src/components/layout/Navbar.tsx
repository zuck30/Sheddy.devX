import { Link } from 'react-router-dom'
import { Menu, Sun, Moon, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useThemeStore } from '@/store/themeStore'
import { useAuth } from '@/hooks/useAuth'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/Sheet'

export function Navbar() {
  const { theme, toggleTheme } = useThemeStore()
  const { user, isAdmin, signOut } = useAuth()

  const NavLinks = () => (
    <>
      <Link to="/blog" className="text-sm font-medium hover:text-primary">Blog</Link>
      <Link to="/resume" className="text-sm font-medium hover:text-primary">Resume</Link>
      {isAdmin && <Link to="/admin" className="text-sm font-medium hover:text-primary">Admin</Link>}
    </>
  )

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80">
          Tech<span className="text-primary">Blog</span>
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
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
