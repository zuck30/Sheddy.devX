import { GlassCard } from '@/components/common/GlassCard'
import { Button } from '@/components/ui/Button'
import { Download, ExternalLink, Mail, MapPin } from 'lucide-react'

export function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 px-4">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">John <span className="text-primary">Doe</span></h1>
          <p className="text-xl text-muted-foreground font-medium">Senior Full Stack Developer</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> San Francisco, CA</span>
            <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> hello@example.com</span>
          </div>
        </div>
        <Button className="gap-2 rounded-full">
          <Download className="h-4 w-4" /> Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-translucent pb-2">Experience</h2>
            <div className="space-y-6">
              {[
                {
                  role: 'Senior Software Engineer',
                  company: 'Tech Innovators Inc.',
                  period: '2021 - Present',
                  desc: 'Led the development of a cloud-native SaaS platform using React, Node.js, and AWS. Improved system performance by 40%.'
                },
                {
                  role: 'Full Stack Developer',
                  company: 'Creative Solutions Studio',
                  period: '2018 - 2021',
                  desc: 'Developed various client projects ranging from e-commerce sites to custom CRM systems.'
                }
              ].map((job, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-lg">{job.role}</h3>
                    <span className="text-sm text-muted-foreground">{job.period}</span>
                  </div>
                  <p className="text-primary font-medium">{job.company}</p>
                  <p className="text-sm text-muted-foreground">{job.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-translucent pb-2">Education</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-lg">BS in Computer Science</h3>
                <span className="text-sm text-muted-foreground">2014 - 2018</span>
              </div>
              <p className="text-primary font-medium">University of Technology</p>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <GlassCard className="space-y-4">
            <h2 className="text-xl font-bold">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Next.js', 'Supabase', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'AWS'].map(skill => (
                <span key={skill} className="text-xs bg-translucent px-2 py-1 rounded-md">{skill}</span>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <h2 className="text-xl font-bold">Links</h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <ExternalLink className="h-4 w-4" /> Portfolio
              </a>
              <a href="#" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <ExternalLink className="h-4 w-4" /> GitHub
              </a>
              <a href="#" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                <ExternalLink className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
