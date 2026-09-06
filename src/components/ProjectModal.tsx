"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  X, ExternalLink, CheckCircle2, Layers, Cpu, 
  Database, ShieldCheck, Server, Terminal, Sparkles 
} from "lucide-react";
import { Project } from "@/data/portfolioData";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "features">("overview");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  const isBase64Image = (imgSrc?: string) => {
    return imgSrc && (imgSrc.startsWith("data:") || imgSrc.length > 100);
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 pointer-events-auto">
          {/* الخلفية المظلمة المعتمة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
          />

          {/* جسم النافذة الرئيسي */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-y-auto custom-scrollbar z-10 pointer-events-auto"
          >
            {/* زر الإغلاق السريع */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-900/80 text-white border border-slate-700/80 hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* الهيدر مع صورة عرض واسعة */}
            <div className="relative w-full h-64 sm:h-80 bg-slate-950 overflow-hidden">
              {isBase64Image(project.image) ? (
                // لو الصورة Base64 يتم عرضها باستخدام tag عادي لتفادي الـ Next Image Optimizer والـ URI Too Long
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top opacity-95"
                />
              ) : (
                // لو رابط عادي يتم استخدام Next Image
                <Image
                  src={project.image || "/projects/placeholder.png"}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-cover object-top opacity-90"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E131F] via-[#0E131F]/50 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-20">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      Interactive Case Study
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-300 font-medium mt-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* أزرار الروابط */}
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 text-xs font-medium flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* أزرار التبويبات */}
            <div className="px-6 pt-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex items-center gap-4 text-xs font-semibold overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === "overview"
                    ? "border-amber-500 text-amber-500 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Layers className="w-4 h-4" />
                Overview & Solution
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("architecture")}
                className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === "architecture"
                    ? "border-amber-500 text-amber-500 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Cpu className="w-4 h-4" />
                Tech Architecture
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("features")}
                className={`pb-3 border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === "features"
                    ? "border-amber-500 text-amber-500 font-bold"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Key Features ({project.keyFeatures?.length || 0})
              </button>
            </div>

            {/* محتوى المودال */}
            <div className="p-6 sm:p-8 space-y-6">
              {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Project Brief</h4>
                    <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                      {project.longDescription || project.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                      <Server className="w-4 h-4 text-amber-500 mb-1" />
                      <span className="block text-[10px] text-slate-400">Architecture</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Full-Stack MERN</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                      <Database className="w-4 h-4 text-emerald-500 mb-1" />
                      <span className="block text-[10px] text-slate-400">Database</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">MongoDB Atlas</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                      <ShieldCheck className="w-4 h-4 text-cyan-500 mb-1" />
                      <span className="block text-[10px] text-slate-400">Auth & Security</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">JWT / OAuth</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                      <Terminal className="w-4 h-4 text-purple-500 mb-1" />
                      <span className="block text-[10px] text-slate-400">Deployment</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Vercel & Render</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "architecture" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Tech Stack Breakdown</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/80 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800 font-mono text-xs text-slate-300">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-slate-500 text-[11px]">
                      <span>{"// Backend Execution Flow"}</span>
                      <span>RESTful API</span>
                    </div>
                    <p className="text-emerald-400">
                      {"// Client-side state managed via React hooks & optimistic UI updates"}
                    </p>
                    <p className="text-cyan-400 mt-1">
                      GET /api/v1/{project.id} ➔ Controller ➔ MongoDB Aggregation ➔ JSON Response
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "features" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Core Capabilities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.keyFeatures?.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}