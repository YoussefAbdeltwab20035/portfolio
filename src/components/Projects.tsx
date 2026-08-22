"use client";

import { useState } from "react";
import Image from "next/image";
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
import { Project } from "@/data/portfolioData";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface ProjectsProps {
  initialProjects: Project[];
}

export default function Projects({ initialProjects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "arch" | "features">("overview");

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setActiveTab("overview");
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 max-w-[1550px] mx-auto scroll-mt-20 transition-colors duration-300">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 dark:bg-black/40 backdrop-blur-md border border-amber-500/20 dark:border-white/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Selected Production Work
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#EAE5D9]">
            Client & Architecture Projects
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#D8D3C8]/70 max-w-md leading-relaxed font-normal">
          High-performance web apps, scalable microservices, and end-to-end client products built for conversion and scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {initialProjects.map((project: Project, index: number) => (
          <motion.div
            key={project.id || project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative rounded-[32px] bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.12] overflow-hidden hover:border-amber-500 dark:hover:border-amber-400/50 transition-all duration-500 shadow-md dark:shadow-2xl flex flex-col justify-between"
          >
            <div 
              onClick={() => openModal(project)}
              className="relative w-full h-64 sm:h-72 min-h-[256px] overflow-hidden cursor-pointer bg-slate-100 dark:bg-[#05070B] border-b border-slate-200 dark:border-white/[0.08]"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-[#0A0D14] via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
              
              <button 
                type="button"
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
              <div>
                <div className="text-xs font-mono font-medium text-amber-600 dark:text-amber-400 mb-2">
                  {project.subtitle}
                </div>
                <h3 
                  onClick={() => openModal(project)}
                  className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#EAE5D9] group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors cursor-pointer mb-3"
                >
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl text-[11px] font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-[#D8D3C8] border border-slate-200 dark:border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-mono font-medium text-slate-600 dark:text-[#D8D3C8]/80 hover:text-slate-950 dark:hover:text-white transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" /> Source Code
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors ml-auto"
                    >
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-[32px] bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/15 shadow-2xl p-6 sm:p-8 z-10"
            >
              <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase">
                    {selectedProject.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#EAE5D9] mt-1">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 rounded-full bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-[#D8D3C8] hover:text-slate-950 dark:hover:text-white transition-colors border border-slate-200 dark:border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/[0.08] pb-3 mb-6 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
                    activeTab === "overview"
                      ? "bg-slate-900 text-white dark:bg-[#EAE5D9] dark:text-[#0A0D14] font-bold"
                      : "text-slate-600 dark:text-[#D8D3C8]/70 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" /> Overview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("arch")}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
                    activeTab === "arch"
                      ? "bg-slate-900 text-white dark:bg-[#EAE5D9] dark:text-[#0A0D14] font-bold"
                      : "text-slate-600 dark:text-[#D8D3C8]/70 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" /> Architecture
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("features")}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl transition-all ${
                    activeTab === "features"
                      ? "bg-slate-900 text-white dark:bg-[#EAE5D9] dark:text-[#0A0D14] font-bold"
                      : "text-slate-600 dark:text-[#D8D3C8]/70 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Key Features
                </button>
              </div>

              {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="relative w-full h-56 sm:h-72 min-h-[224px] rounded-2xl overflow-hidden mb-4 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#05070B]">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="object-cover object-center"
                    />
                  </div>
                  <p className="text-slate-700 dark:text-[#D8D3C8] text-sm leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </motion.div>
              )}

              {activeTab === "arch" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900 dark:bg-[#05070B] border border-slate-800 dark:border-white/10 font-mono text-xs text-slate-200 dark:text-[#D8D3C8]">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 dark:border-white/10 text-slate-400 dark:text-[#D8D3C8]/50 text-[11px]">
                      <span>{"// System Execution & Data Flow"}</span>
                      <span className="text-amber-400">Production REST Pipeline</span>
                    </div>
                    <p className="text-emerald-400">
                      {"// State-driven client interface with optimistic UI rendering"}
                    </p>
                    <p className="text-amber-300 mt-1">
                      GET /api/v1/{selectedProject.id} ➔ Controller ➔ MongoDB/Atlas ➔ Clean Payload
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedProject.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-xl text-xs font-mono bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-[#D8D3C8] border border-slate-200 dark:border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 ? (
                    selectedProject.keyFeatures.map((feat: string) => (
                      <div
                        key={feat}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-xs md:text-sm text-slate-700 dark:text-[#D8D3C8]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 dark:text-[#D8D3C8]/60 font-mono">
                      Features details available in overview.
                    </p>
                  )}
                </motion.div>
              )}

              <div className="flex items-center justify-end gap-4 mt-8 pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full text-xs font-mono font-medium border border-slate-300 dark:border-white/15 text-slate-700 dark:text-[#D8D3C8] hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
                  >
                    View Code
                  </a>
                )}
                {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full text-xs font-mono font-bold bg-slate-900 text-white hover:bg-slate-800 dark:bg-[#EAE5D9] dark:text-[#0A0D14] dark:hover:bg-white transition-colors"
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