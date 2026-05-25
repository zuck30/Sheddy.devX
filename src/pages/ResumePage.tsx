import { Button } from '@/components/ui/Button'
import { Download, ExternalLink, Mail, MapPin, Calendar, Briefcase, GraduationCap, Award, Code, Users, Workflow, Terminal, Github, Linkedin, Globe } from 'lucide-react'

export function ResumePage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Terminal header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm mb-3">
              <Terminal className="w-4 h-4" />
              <span>$ cat resume.md</span>
            </div>
          </div>

          {/* Header Section - Warp style */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12 pb-8 border-b border-white/10">
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
                <span className="text-white">Shadrack </span>
                <span className="text-emerald-400">T. John</span>
              </h1>
              <p className="text-lg text-white/60 font-mono">
                Computer Engineering Student & ML/Full-Stack Developer
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-mono text-white/40">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Dodoma, Tanzania</span>
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> mwalyangashadrack@gmail.com</span>
              </div>
            </div>
            <a href="/resume.pdf" download="Shadrack_John_Resume.pdf">
              <Button className="gap-2 bg-white text-black hover:bg-white/90 rounded-lg px-5 h-10 font-mono text-sm">
                <Download className="h-4 w-4" /> download.pdf
              </Button>
            </a>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <section className="bg-white/5 border border-white/10 rounded-lg p-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                  <Users className="h-4 w-4 text-emerald-400" /> 
                  <span className="font-mono text-emerald-400">$ about</span>
                </h2>
                <p className="text-white/60 font-mono text-sm leading-relaxed">
                  Innovative Computer Engineering student and Freelance Full-Stack Developer with over two years of 
                  experience building scalable, AI-driven applications. Proven expertise in developing end-to-end 
                  solutions including intelligent recommendation systems, unified job alert platforms, and immersive 
                  AI companions. Skilled in Python (FastAPI), React, Tailwind CSS, and SQL databases, with specialized 
                  focus on integrating Machine Learning models for vision and predictive analytics.
                </p>
              </section>

              {/* Experience Section */}
              <section className="bg-white/5 border border-white/10 rounded-lg p-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <Briefcase className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-emerald-400">$ experience</span>
                </h2>
                <div className="space-y-5">
                  {/* Technical Intern */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                      <h3 className="text-white font-semibold">Technical Intern</h3>
                      <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> July 2024 - Sep 2024
                      </span>
                    </div>
                    <p className="text-emerald-400 font-mono text-sm mb-2">Azampay Tanzania • Dar es Salaam</p>
                    <p className="text-white/50 font-mono text-xs leading-relaxed">
                      Integrated multiple payment gateways and third-party APIs into production fintech platforms. 
                      Collaborated on performance tuning, security enhancements, and transaction reliability. 
                      Participated in agile development cycles and code review sessions.
                    </p>
                  </div>

                  {/* Freelance Developer */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                      <h3 className="text-white font-semibold">Freelance Full-Stack Developer</h3>
                      <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 2023 - Present
                      </span>
                    </div>
                    <p className="text-emerald-400 font-mono text-sm mb-2">Self-employed • Remote</p>
                    <p className="text-white/50 font-mono text-xs leading-relaxed">
                      Developed custom systems and web applications for local SMEs. Designed and launched multiple 
                      web app platforms with React + FastAPI stack. Optimized business workflows through automated 
                      reporting. Provided ongoing technical support and maintenance.
                    </p>
                  </div>
                </div>
              </section>

              {/* Education Section */}
              <section className="bg-white/5 border border-white/10 rounded-lg p-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <GraduationCap className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-emerald-400">$ education</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                      <h3 className="text-white font-semibold">BSc in Computer Engineering</h3>
                      <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 2022 - Present
                      </span>
                    </div>
                    <p className="text-emerald-400 font-mono text-sm mb-1">University of Dar es Salaam</p>
                    <p className="text-white/50 font-mono text-xs">Specializing in Software Development, Machine Learning, System Engineering.</p>
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                      <h3 className="text-white font-semibold">Diploma in Computer Science</h3>
                      <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 2020 - 2022
                      </span>
                    </div>
                    <p className="text-emerald-400 font-mono text-sm">College of Information and Communication Technologies (COICT)</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Technical Skills */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <Code className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-emerald-400">$ skills</span>
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-white/60 font-mono text-xs mb-2">Languages & Frameworks</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'].map(skill => (
                        <span key={skill} className="text-[11px] font-mono bg-white/10 text-white/60 px-2 py-1 rounded border border-white/10">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-white/60 font-mono text-xs mb-2">AI & Machine Learning</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['LLMs', 'RAG', 'Vector DB', 'LangChain', 'PyTorch', 'Hugging Face', 'Computer Vision'].map(skill => (
                        <span key={skill} className="text-[11px] font-mono bg-white/10 text-white/60 px-2 py-1 rounded border border-white/10">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-white/60 font-mono text-xs mb-2">Data & Cloud</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['SQL', 'PostgreSQL', 'Azure', 'ETL Pipelines', 'Apache Spark', 'Kafka', 'dbt', 'Power BI'].map(skill => (
                        <span key={skill} className="text-[11px] font-mono bg-white/10 text-white/60 px-2 py-1 rounded border border-white/10">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <Award className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-emerald-400">$ certifications</span>
                </h2>
                <div className="space-y-3">
                  {[
                    { name: 'AZ-900 Azure Fundamentals', status: 'In progress', date: 'Q2 2025' },
                    { name: 'AI-102 Azure AI Engineer', status: 'Target', date: 'Q3 2025' },
                    { name: 'DP-203 Azure Data Engineer', status: 'Target', date: 'Q4 2025' }
                  ].map((cert, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <div>
                        <p className="text-white/80 font-mono text-xs">{cert.name}</p>
                        <p className="text-white/30 font-mono text-[10px]">{cert.status} — {cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2025 Roadmap */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <Workflow className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-emerald-400">$ roadmap_2025</span>
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-emerald-400">Q1-Q2:</span>
                    <span className="text-white/50">Python, SQL, Cloud Fundamentals</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-emerald-400">Q3:</span>
                    <span className="text-white/50">Data Engineering (Spark, dbt, ADF)</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-emerald-400">Q4:</span>
                    <span className="text-white/50">AI/LLMs, RAG, Azure OpenAI</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex justify-between text-xs font-mono">
                    <span className="text-white/60">Focus:</span>
                    <span className="text-emerald-400">Responsible & Ethical AI</span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <h2 className="text-white font-bold text-lg flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
                  <Globe className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-emerald-400">$ links</span>
                </h2>
                <div className="space-y-2">
                  <a href="https://shedysilicon.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono text-white/60 hover:text-emerald-400 transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" /> portfolio
                  </a>
                  <a href="https://github.com/zuck30" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono text-white/60 hover:text-emerald-400 transition-colors">
                    <Github className="h-3.5 w-3.5" /> github
                  </a>
                  <a href="https://linkedin.com/in/shadrack-john" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono text-white/60 hover:text-emerald-400 transition-colors">
                    <Linkedin className="h-3.5 w-3.5" /> linkedin
                  </a>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-white/40 font-mono text-xs">English (Fluent) • Swahili (Native)</p>
                  <p className="text-white/30 font-mono text-[10px] mt-1">Open to remote and onsite opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}