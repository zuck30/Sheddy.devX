import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useThemeStore } from '@/store/themeStore'
import { useEffect } from 'react'

export function Layout() {
  const { theme } = useThemeStore()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground">
      <div className="blob-container">
        <div className="blob" style={{ top: '10%', left: '10%' }}></div>
        <div className="blob" style={{ bottom: '20%', right: '10%', animationDelay: '5s' }}></div>
      </div>
      <Navbar />
      <main className="flex-grow container py-8 relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
