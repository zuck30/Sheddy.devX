export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 bg-background/60 backdrop-blur-md mt-auto">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Sheddy.dev. Built with React & Supabase.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  )
}
