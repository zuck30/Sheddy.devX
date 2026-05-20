import { GlassCard } from '@/components/common/GlassCard'
import { Button } from '@/components/ui/Button'
import { Download, ExternalLink, Mail, MapPin, Calendar, Briefcase, GraduationCap, Award, Code, Brain, Database, Cloud, Users, Eye, Workflow, BarChart } from 'lucide-react'

export function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Shadrack <span className="text-primary">T. John</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            Computer Engineering Student & AI/Full-Stack Developer
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Dodoma, Tanzania</span>
            <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> mwalyangashadrack@gmail.com</span>
          </div>
        </div>
        <Button className="gap-2 rounded-full">
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (2/3 width) */}
        <div className="md:col-span-2 space-y-8">
          {/* About / Summary */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-translucent pb-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" /> About
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Innovative Computer Engineering student and Freelance Full-Stack Developer with over two years of 
              experience building scalable, AI-driven applications. Proven expertise in developing end-to-end 
              solutions including intelligent recommendation systems, unified job alert platforms, and immersive 
              AI companions. Skilled in Python (FastAPI), React, Tailwind CSS, and SQL databases, with specialized 
              focus on integrating Machine Learning models for vision and predictive analytics. Currently finalizing 
              a degree at the University of Dodoma while delivering high-impact freelance projects.
            </p>
          </section>

          {/* Professional Experience */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-translucent pb-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" /> Experience
            </h2>
            <div className="space-y-6">
              {[
                {
                  role: 'Technical Intern',
                  company: 'Azampay Tanzania',
                  location: 'Dar es Salaam',
                  period: 'July 2024 - September 2024',
                  desc: 'Integrated multiple payment gateways and third-party APIs into production fintech platforms. Collaborated on performance tuning, security enhancements, and transaction reliability. Participated in agile development cycles and code review sessions. Conducted system troubleshooting and prepared technical documentations.'
                },
                {
                  role: 'Freelance Full-Stack Developer',
                  company: 'Self-employed',
                  location: 'Remote',
                  period: '2023 - Present',
                  desc: 'Developed custom systems and web applications for local SMEs. Designed and launched multiple web app platforms with React + FastAPI stack. Optimized business workflows through automated reporting. Provided ongoing technical support and maintenance.'
                }
              ].map((job, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                    <h3 className="font-bold text-lg">{job.role}</h3>
                    <span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {job.period}</span>
                  </div>
                  <p className="text-primary font-medium">{job.company} • {job.location}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{job.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-translucent pb-2 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" /> Education
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h3 className="font-bold text-lg">BSc in Computer Engineering</h3>
                  <span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> 2022 - Present</span>
                </div>
                <p className="text-primary font-medium">University of Dar es Salaam</p>
                <p className="text-sm text-muted-foreground">Specializing in Software Development, Machine Learning, System Engineering.</p>
              </div>
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h3 className="font-bold text-lg">Diploma in Computer Science</h3>
                  <span className="text-sm text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> 2020 - 2022</span>
                </div>
                <p className="text-primary font-medium">College of Information and Communication Technologies (COICT)</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-8">
          {/* Technical Skills */}
          <GlassCard className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" /> Technical Skills
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">Languages & Frameworks</p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'].map(skill => (
                    <span key={skill} className="text-xs bg-translucent px-2 py-1 rounded-md">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">AI & Machine Learning</p>
                <div className="flex flex-wrap gap-2">
                  {['LLMs', 'RAG', 'Vector DB', 'LangChain', 'PyTorch', 'Hugging Face', 'Computer Vision'].map(skill => (
                    <span key={skill} className="text-xs bg-translucent px-2 py-1 rounded-md">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Data & Cloud</p>
                <div className="flex flex-wrap gap-2">
                  {['SQL', 'PostgreSQL', 'Azure', 'ETL Pipelines', 'Apache Spark', 'Kafka', 'dbt', 'Power BI'].map(skill => (
                    <span key={skill} className="text-xs bg-translucent px-2 py-1 rounded-md">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Certifications & Roadmap Alignment */}
          <GlassCard className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" /> Certifications & Focus
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0"></div>
                <div>
                  <p className="text-sm font-medium">AZ-900 Azure Fundamentals</p>
                  <p className="text-xs text-muted-foreground">In progress — Q2 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0"></div>
                <div>
                  <p className="text-sm font-medium">AI-102 Azure AI Engineer Associate</p>
                  <p className="text-xs text-muted-foreground">Target — Q3 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0"></div>
                <div>
                  <p className="text-sm font-medium">DP-203 Azure Data Engineer Associate</p>
                  <p className="text-xs text-muted-foreground">Target — Q4 2025</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Learning Path */}
          <GlassCard className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Workflow className="h-5 w-5 text-primary" /> 2025 Roadmap
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Q1-Q2:</span>
                <span className="text-muted-foreground">Python, SQL, Cloud Fundamentals</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Q3:</span>
                <span className="text-muted-foreground">Data Engineering (Spark, dbt, ADF)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Q4:</span>
                <span className="text-muted-foreground">AI/LLMs, RAG, Azure OpenAI</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-translucent">
                <span className="font-medium">📌 Focus:</span>
                <span className="text-primary text-xs">Responsible & Ethical AI</span>
              </div>
            </div>
          </GlassCard>

          {/* Links & Social */}
          <GlassCard className="space-y-4">
            <h2 className="text-xl font-bold">Links</h2>
            <div className="space-y-3">
              <a href="https://shedysilicon.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <ExternalLink className="h-4 w-4" /> Portfolio
              </a>
              <a href="https://github.com/zuck30" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <ExternalLink className="h-4 w-4" /> GitHub
              </a>
              <a href="https://linkedin.com/in/shadrack-john" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <ExternalLink className="h-4 w-4" /> LinkedIn
              </a>
            </div>
            <div className="pt-2 text-xs text-muted-foreground border-t border-translucent">
              <p>English (Fluent) • Swahili (Native)</p>
              <p className="mt-1">Open to remote and onsite opportunities</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}