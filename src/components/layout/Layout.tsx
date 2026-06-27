import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useThemeStore } from '@/store/themeStore'
import { useEffect } from 'react'

export function Layout() {
  const { theme } = useThemeStore()

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A]">
      {/* Animated background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[10%] left-[10%] w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '8s' }}
        />
        <div 
          className="absolute bottom-[20%] right-[5%] w-80 h-80 bg-emerald-400/3 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '12s', animationDelay: '2s' }}
        />
        <div 
          className="absolute top-[40%] right-[30%] w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '15s', animationDelay: '4s' }}
        />
      </div>

      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px'
        }}
      />

      <Navbar />
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}