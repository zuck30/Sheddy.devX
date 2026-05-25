import { Github, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A] mt-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Main footer content */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/zuck30/zuck30" 
                className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/shadrackovsky" 
                className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div>
            <p className="text-[11px] font-mono text-white/20">
              © {currentYear} sheddy.dev
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}