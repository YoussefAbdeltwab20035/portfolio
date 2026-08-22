"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Briefcase, Sparkles } from "lucide-react";

const MILESTONES = [
  {
    period: "2024 — Present",
    role: "Full-Stack Web Developer",
    organization: "Freelance & Independent Client Projects",
    description: "Engineering scalable MERN stack and Next.js applications. Designed peer-to-peer service ecosystems, e-learning engines, and real-time backend microservices with MongoDB Atlas.",
    icon: Briefcase,
    skills: ["React", "Next.js", "Node.js", "Express", "MongoDB Atlas", "Tailwind CSS"],
  },
  {
    period: "2024 — 2025",
    role: "Graduation Project Lead",
    organization: "Faculty of Computers & Artificial Intelligence",
    description: "Designed and drafted full technical documentation and system architecture for a high-performance matching system, submitted under academic supervision.",
    icon: GraduationCap,
    skills: ["System Design", "Database Architecture", "REST APIs", "Documentation"],
  },
  {
    period: "2023 — 2024",
    role: "Core Web Engineering Studies",
    organization: "Computer Science Specialization",
    description: "Deep-dived into data structures, algorithms, 8051 microcontroller assembly, compiler construction, and parallel distributed computing logic.",
    icon: Code2,
    skills: ["Algorithms", "Data Structures", "Parallel Computing", "System Logic"],
  },
];

export default function Experience() {
  return (
    <section 
      id="experience" 
      className="py-20 px-4 sm:px-6 max-w-[1550px] mx-auto scroll-mt-20 transition-colors duration-300"
    >
      <div className="flex flex-col items-start mb-14 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 dark:bg-black/40 border border-amber-500/20 dark:border-white/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Milestones
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-[#EAE5D9] tracking-tight">
          Journey & Background
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#D8D3C8]/70 mt-2 font-normal">
          A timeline of engineering execution, academic foundations, and full-stack software delivery.
        </p>
      </div>

      <div className="relative border-l border-slate-200 dark:border-white/15 ml-4 md:ml-6 pl-6 md:pl-10 flex flex-col gap-10">
        {MILESTONES.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="relative group"
            >
              <div className="absolute -left-[37px] md:-left-[53px] top-1 w-8 h-8 rounded-full bg-white dark:bg-[#0A0D14] border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-700 dark:text-[#D8D3C8] group-hover:border-amber-500 group-hover:text-amber-500 transition-all shadow-md">
                <Icon className="w-4 h-4" />
              </div>

              <div className="rounded-[28px] border border-slate-200 dark:border-white/[0.12] bg-white dark:bg-[#0A0D14] p-6 sm:p-8 hover:border-amber-500/40 transition-all shadow-md dark:shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#EAE5D9]">
                      {item.role}
                    </h3>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-mono mt-0.5">{item.organization}</p>
                  </div>
                  <span className="w-max px-3.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-[#D8D3C8] font-semibold">
                    {item.period}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-[#D8D3C8]/80 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-xl bg-slate-100 dark:bg-white/[0.03] text-slate-700 dark:text-[#D8D3C8] border border-slate-200 dark:border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}