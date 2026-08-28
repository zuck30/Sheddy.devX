'use client';
import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Download, ExternalLink, Mail, MapPin, Calendar, Briefcase, GraduationCap, Code, Users, Workflow, Github, Globe, ArrowUpRight } from 'lucide-react';

export default function ResumePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const skills = {
    languages: ['Python', 'FastAPI', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    ai: ['LLMs', 'RAG', 'Vector DB', 'LangChain', 'PyTorch', 'Hugging Face', 'Computer Vision'],
    data: ['SQL', 'PostgreSQL', 'Azure', 'Docker', 'ETL Pipelines', 'Apache Spark', 'Supabase', 'TensorFlow', 'Jupyter Notebook'],
  };

  return (
    <section 
      ref={containerRef}
      className="bg-white text-[#171321] font-sans w-full py-24 md:py-32 relative overflow-hidden"
    >
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#171321] z-[100] origin-left" 
        style={{ scaleX }} 
      />

      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <header className="mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Shadrack Timothy John Mwalyanga
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl max-w-3xl leading-relaxed text-gray-600 mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              Computer Software Engineer and Young Aspiring AI Researcher. Passionate about building scalable software, AI-driven applications, and contributing to open-source projects.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-6 mt-6 text-sm text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Dodoma, Dar es Salaam, Tanzania</span>
              <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> mwalyangashadrack@gmail.com</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-8"
            >
              <a 
                href="/resume.pdf" 
                download="Shadrack_John_Resume.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#171321] text-white font-medium hover:bg-[#2a2438] transition-all rounded-[2rem] text-base hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)]"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </motion.div>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* About Section */}
              <motion.div 
                className="bg-[#EFE8FF] p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171321]/60 mb-4">
                  <Users className="h-4 w-4" />
                  About
                </h2>
                <p className="text-base text-[#171321] leading-relaxed">
                  Hi, My name is Shadrack or Shadrackovsky and freelance systems developer with 4+ years building scalable software and AI-driven applications for African markets. Focused on low-resource language technology, intelligent recommendation systems, and full-stack product development. Proficient in Python, React, TypeScript, and Tailwind CSS, with hands-on data engineering experience in Python and Jupyter Notebook. Founder of ANTERA, an AI research company, and an active open-source contributor.
                </p>
              </motion.div>

              {/* Experience Section */}
              <motion.div 
                className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7 }}
              >
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171321]/60 mb-6">
                  <Briefcase className="h-4 w-4" />
                  Experience
                </h2>
                <div className="space-y-8">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                      <h3 className="text-xl font-bold tracking-tight text-[#171321]">Technical Intern</h3>
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#171321]/60 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> July 2024 - October 2024
                      </span>
                    </div>
                    <p className="text-[#171321]/70 font-medium text-sm mb-2">Azampay Tanzania, Dar es Salaam</p>
                  </div>

                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                      <h3 className="text-xl font-bold tracking-tight text-[#171321]">Freelance Full-Stack Developer</h3>
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#171321]/60 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 2023 - Present
                      </span>
                    </div>
                    <p className="text-[#171321]/70 font-medium text-sm mb-2">Freelancer, Remote</p>
                  </div>
                </div>
              </motion.div>

              {/* Education Section */}
              <motion.div 
                className="bg-[#EFE8FF] p-8 md:p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171321]/60 mb-6">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                      <h3 className="text-xl font-bold tracking-tight text-[#171321]">BSc in Computer Engineering</h3>
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#171321]/60 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 2022 - Present
                      </span>
                    </div>
                    <p className="text-[#171321]/70 font-medium text-sm mb-1">University of Dodoma (CIVE)</p>
                    <p className="text-[#171321]/60 text-sm">Specializing in Software Development, Machine Learning, System Engineering.</p>
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1">
                      <h3 className="text-xl font-bold tracking-tight text-[#171321]">Diploma in Computer Science</h3>
                      <span className="text-xs font-semibold uppercase tracking-widest text-[#171321]/60 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> 2020 - 2022
                      </span>
                    </div>
                    <p className="text-[#171321]/70 font-medium text-sm">College of Information and Communication Technologies (COICT)</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              
              {/* Technical Skills */}
              <motion.div 
                className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.7 }}
              >
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171321]/60 mb-4">
                  <Code className="h-4 w-4" />
                  Skills
                </h2>
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#171321]/60 mb-2">Languages & Frameworks</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.languages.map(skill => (
                        <span key={skill} className="text-[10px] font-medium px-3 py-1.5 bg-[#171321] text-white rounded-full">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#171321]/60 mb-2">AI & Machine Learning</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.ai.map(skill => (
                        <span key={skill} className="text-[10px] font-medium px-3 py-1.5 bg-[#171321] text-white rounded-full">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#171321]/60 mb-2">Data & Cloud</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.data.map(skill => (
                        <span key={skill} className="text-[10px] font-medium px-3 py-1.5 bg-[#171321] text-white rounded-full">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Roadmap */}
              <motion.div 
                className="bg-[#EFE8FF] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.7 }}
              >
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171321]/60 mb-4">
                  <Workflow className="h-4 w-4" />
                  Roadmap
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-[#171321]">Now:</span>
                    <span className="text-[#171321]/70">Scaling Swahili LLM & ANTERA products</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-[#171321]">Next:</span>
                    <span className="text-[#171321]/70">Fine-tuning pipelines, LoRA/QLoRA at scale</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-[#171321]">2026:</span>
                    <span className="text-[#171321]/70">Graduate study in AI/Data (Poland)</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#171321]/10 flex justify-between text-sm">
                    <span className="font-bold uppercase text-[#171321]/60">Focus:</span>
                    <span className="font-medium text-[#171321]">Low-resource language AI for Africa</span>
                  </div>
                </div>
              </motion.div>

              {/* Links */}
              <motion.div 
                className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.7 }}
              >
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171321]/60 mb-4">
                  <Globe className="h-4 w-4" />
                  Links
                </h2>
                <div className="space-y-3">
                  <a href="https://shedysilicon.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#171321] hover:text-[#171321]/60 transition-colors">
                    <ExternalLink className="h-4 w-4" /> Shadrackovsky
                  </a>
                  <a href="https://antera.co.tz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#171321] hover:text-[#171321]/60 transition-colors">
                    <ExternalLink className="h-4 w-4" /> Antera
                  </a>
                  <a href="https://github.com/zuck30" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#171321] hover:text-[#171321]/60 transition-colors">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-1">
                  <p className="text-sm font-medium text-[#171321]">English (Fluent), Swahili (Native)</p>
                  <p className="text-sm text-[#171321]/60">Open to remote and onsite opportunities</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}