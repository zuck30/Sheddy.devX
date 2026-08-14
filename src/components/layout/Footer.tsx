
import { Mail, MessageCircle } from 'lucide-react'
import hero9 from '@/assets/hero-4.jpg'

// Social Icons
const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

export function Footer() {
  // Remove currentYear since it's not being used
  // const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-[#FAFAF8] text-black font-sans antialiased border-t border-neutral-200 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero9}
          alt="Footer Background"
          className="w-full h-full object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF8]/70 via-[#FAFAF8]/60 to-[#FAFAF8]/70" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FA520F]/10 via-transparent to-[#FCD34D]/10" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-neutral-200 bg-white/70 backdrop-blur-sm">
          
          {/* Column 1: Brand */}
          <div className="group p-8 md:p-12 min-h-[280px] flex flex-col justify-between hover:bg-neutral-50/50 transition-colors border-b md:border-b-0 lg:border-r border-neutral-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-neutral-200 bg-white flex-shrink-0 flex items-center justify-center">
                <img 
                  src="/duck.png" 
                  alt="Sheddy.dev Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <span className="text-lg font-semibold tracking-tight text-black">sheddy.dev</span>
            </div>
            <p className="text-sm text-[#1F1F1F] font-medium leading-relaxed">
              Building fast software and clean interfaces with a unique taste that actually work.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="group p-8 md:p-12 min-h-[280px] flex flex-col justify-between hover:bg-neutral-50/50 transition-colors border-b md:border-b-0 lg:border-r border-neutral-200">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6 font-mono">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/resume">Resume</FooterLink>
              <FooterLink href="/">Home</FooterLink>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div className="group p-8 md:p-12 min-h-[280px] flex flex-col justify-between hover:bg-neutral-50/50 transition-colors border-b md:border-b-0 lg:border-r border-neutral-200">
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6 font-mono">Social</h3>
            <ul className="space-y-3">
              <FooterLink href="https://github.com/zuck30/zuck30">GitHub</FooterLink>
              <FooterLink href="https://www.linkedin.com/in/shadrackovsky">LinkedIn</FooterLink>
              <FooterLink href="#">Twitter</FooterLink>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="group p-8 md:p-12 min-h-[280px] flex flex-col justify-between hover:bg-neutral-50/50 transition-colors">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-600 mb-6 font-mono">Contact</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[#1F1F1F] group/link font-medium">
                  <Mail className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span className="text-sm font-mono group-hover/link:text-black transition-colors">mwalyangashadrack@gmail.com</span>
                </li>
                <a href="mailto:mwalyangashadrack@gmail.com" className="flex items-center gap-3 text-[#1F1F1F] group/link cursor-pointer font-medium">
                  <MessageCircle className="w-4 h-4 text-neutral-500 shrink-0" />
                  <span className="text-sm font-mono group-hover/link:text-black transition-colors">Contact</span>
                </a>
              </ul>
            </div>
            <div className="mt-8 pt-8 border-t border-neutral-100">
              <div className="flex items-center gap-4 text-neutral-400">
                <a href="https://www.instagram.com/sheddysilicon" target="_blank" rel="noopener noreferrer" className="hover:text-[#FA520F] transition-colors">
                  <InstagramIcon />
                </a>
                <a href="https://twitter.com/shadrackovsky" target="_blank" rel="noopener noreferrer" className="hover:text-[#FA520F] transition-colors">
                  <XIcon />
                </a>
                <a href="https://www.linkedin.com/in/shadrackovsky" target="_blank" rel="noopener noreferrer" className="hover:text-[#FA520F] transition-colors">
                  <LinkedinIcon />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="text-sm font-semibold text-[#1F1F1F] hover:text-[#FA520F] transition-colors block"
    >
      {children}
    </a>
  </li>
)