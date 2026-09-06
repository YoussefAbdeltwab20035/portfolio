"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ExternalLink, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Maximize2,
  X,
  Sparkles
} from "lucide-react";
import { Project, PORTFOLIO_DATA } from "@/data/portfolioData";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface ProjectsProps {
  initialProjects?: Project[];
}

export default function Projects({ initialProjects }: ProjectsProps) {
  const projectsList = initialProjects && initialProjects.length > 0 ? initialProjects : PORTFOLIO_DATA.projects;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "arch" | "features">("overview");

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setActiveTab("overview");
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // دالة تنظيف المسار لقطع أي سلاش أو دومين قبل كود الـ base64
  const cleanDataUri = (src?: string) => {
    if (!src) return "/projects/placeholder.png";
    const s = src.trim();
    const dataIdx = s.indexOf("data:image");
    if (dataIdx !== -1) {
      return s.substring(dataIdx);
    }
    return s;
  };

  return (
    <section id="projects" className="py-12 sm:py-20 px-3 sm:px-6 max-w-[1550px] mx-auto scroll-mt-20 pointer-events-auto transition-colors duration-300">
      
      {/* الترويسة */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-black/40 backdrop-blur-md border border-amber-500/20 dark:border-white/10 text-amber-700 dark:text-amber-400 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            Selected Production Work
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#EAE5D9]">
            Client & Architecture Projects
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-[#D8D3C8]/80 max-w-md leading-relaxed font-normal">
          High-performance web apps, scalable microservices, and end-to-end client products built for conversion and scale.
        </p>
      </div>

      {/* شبكة المشاريع */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        {projectsList.map((project: Project, index: number) => {
          const imgSrc = cleanDataUri(project.image);

          return (
            <motion.div
              key={project.id || project.title}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative rounded-[24px] sm:rounded-[32px] bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.12] overflow-hidden hover:border-amber-500 dark:hover:border-amber-400/50 transition-all duration-300 shadow-sm dark:shadow-2xl flex flex-col justify-between pointer-events-auto"
            >
              <div 
                onClick={() => openModal(project)}
                className="relative w-full h-52 sm:h-72 overflow-hidden cursor-pointer bg-slate-900 dark:bg-[#05070B] border-b border-slate-200 dark:border-white/[0.08]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={`Preview of ${project.title}`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/projects/placeholder.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-[#0A0D14] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(project);
                  }}
                  aria-label={`Enlarge details for ${project.title}`}
                  className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer pointer-events-auto"
                >
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="p-5 sm:p-8 flex flex-col flex-grow justify-between">
                <div>
                  <div className="text-[11px] sm:text-xs font-mono font-medium text-amber-700 dark:text-amber-400 mb-1.5">
                    {project.subtitle}
                  </div>
                  <h3 
                    onClick={() => openModal(project)}
                    className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-[#EAE5D9] group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors cursor-pointer mb-2.5"
                  >
                    {project.title}
                  </h3>
                  <p className="text-slate-700 dark:text-[#D8D3C8]/80 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
                    {project.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-xl text-[10px] sm:text-[11px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-[#D8D3C8] border border-slate-200 dark:border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-slate-100 dark:border-white/[0.08]">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View GitHub repository of ${project.title}`}
                        className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-700 dark:text-[#D8D3C8]/80 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        <GithubIcon className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Launch live project demo of ${project.title}`}
                        className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 hover:text-amber-600 transition-colors ml-auto cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* المودال التفاعلي */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[24px] sm:rounded-[32px] bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/15 shadow-2xl p-5 sm:p-8 z-10 pointer-events-auto custom-scrollbar"
            >
              <div className="flex items-start justify-between mb-5 pb-3.5 border-b border-slate-100 dark:border-white/[0.08]">
                <div className="max-w-[85%]">
                  <span className="text-[11px] sm:text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold uppercase">
                    {selectedProject.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-[#EAE5D9] mt-0.5">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close project preview"
                  className="p-1.5 sm:p-2 rounded-full bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-[#D8D3C8] hover:text-slate-950 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* التبويبات */}
              <div className="flex items-center gap-1.5 border-b border-slate-100 dark:border-white/[0.08] pb-3 mb-5 font-mono text-xs overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  aria-label="Show project overview tab"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "overview"
                      ? "bg-slate-900 text-white dark:bg-[#EAE5D9] dark:text-[#0A0D14] font-bold shadow-sm"
                      : "text-slate-700 dark:text-[#D8D3C8]/80 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("arch")}
                  aria-label="Show project architecture tab"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "arch"
                      ? "bg-slate-900 text-white dark:bg-[#EAE5D9] dark:text-[#0A0D14] font-bold shadow-sm"
                      : "text-slate-700 dark:text-[#D8D3C8]/80 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" /> Architecture
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("features")}
                  aria-label="Show project key features tab"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === "features"
                      ? "bg-slate-900 text-white dark:bg-[#EAE5D9] dark:text-[#0A0D14] font-bold shadow-sm"
                      : "text-slate-700 dark:text-[#D8D3C8]/80 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Key Features
                </button>
              </div>

              {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3.5">
                  <div className="relative w-full h-48 sm:h-72 rounded-2xl overflow-hidden mb-3 border border-slate-200 dark:border-white/10 bg-slate-900 dark:bg-[#05070B]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cleanDataUri(selectedProject.image)}
                      alt={`Detailed view of ${selectedProject.title}`}
                      className="w-full h-full object-cover object-center"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/projects/placeholder.png";
                      }}
                    />
                  </div>
                  <p className="text-slate-800 dark:text-[#D8D3C8] text-xs sm:text-sm leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </motion.div>
              )}

              {activeTab === "arch" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3.5">
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900 dark:bg-[#05070B] border border-slate-800 dark:border-white/10 font-mono text-xs text-slate-200 dark:text-[#D8D3C8]">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 dark:border-white/10 text-slate-400 dark:text-[#D8D3C8]/50 text-[10px] sm:text-[11px]">
                      <span>{"// System Execution & Data Flow"}</span>
                      <span className="text-amber-400">Production REST Pipeline</span>
                    </div>
                    <p className="text-emerald-400 text-[11px] sm:text-xs">
                      {"// State-driven client interface with optimistic UI rendering"}
                    </p>
                    <p className="text-amber-300 mt-1 text-[11px] sm:text-xs break-all">
                      GET /api/v1/{selectedProject.id} ➔ Controller ➔ MongoDB/Atlas ➔ Clean Payload
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {selectedProject.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-xl text-[10px] sm:text-xs font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-800 dark:text-[#D8D3C8] border border-slate-200 dark:border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2.5">
                  {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 ? (
                    selectedProject.keyFeatures.map((feat: string) => (
                      <div
                        key={feat}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-800 dark:text-[#D8D3C8]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-[#D8D3C8]/60 font-mono">
                      Features details available in overview.
                    </p>
                  )}
                </motion.div>
              )}

              {/* أزرار المودال */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-4 mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View code repository of ${selectedProject.title}`}
                    className="px-4 py-2.5 rounded-full text-xs font-mono font-medium border border-slate-300 dark:border-white/15 text-slate-800 dark:text-[#D8D3C8] hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors text-center cursor-pointer"
                  >
                    View Code
                  </a>
                )}
                {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Launch ${selectedProject.title} project live demo`}
                    className="px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-slate-900 text-white hover:bg-slate-800 dark:bg-[#EAE5D9] dark:text-[#0A0D14] dark:hover:bg-white transition-colors text-center cursor-pointer shadow-md"
                  >
                    Launch Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}