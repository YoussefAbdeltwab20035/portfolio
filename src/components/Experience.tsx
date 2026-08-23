"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Briefcase, Sparkles } from "lucide-react";

const MILESTONES = [
  {
    id: "milestone-freelance",
    period: "2024 — Present",
    role: "Full-Stack Web Developer",
    organization: "Freelance & Independent Client Projects",
    description:
      "Engineering scalable MERN stack and Next.js applications. Designed peer-to-peer service ecosystems, e-learning engines, and real-time backend microservices with MongoDB Atlas.",
    icon: Briefcase,
    skills: ["React", "Next.js", "Node.js", "Express", "MongoDB Atlas", "Tailwind CSS"],
  },
  {
    id: "milestone-grad",
    period: "2024 — 2025",
    role: "Graduation Project Lead",
    organization: "Faculty of Computers & Artificial Intelligence",
    description:
      "Designed and drafted full technical documentation and system architecture for a high-performance matching system, submitted under academic supervision.",
    icon: GraduationCap,
    skills: ["System Design", "Database Architecture", "REST APIs", "Documentation"],
  },
  {
    id: "milestone-studies",
    period: "2023 — 2024",
    role: "Core Web Engineering Studies",
    organization: "Computer Science Specialization",
    description:
      "Deep-dived into data structures, algorithms, 8051 microcontroller assembly, compiler construction, and parallel distributed computing logic.",
    icon: Code2,
    skills: ["Algorithms", "Data Structures", "Parallel Computing", "System Logic"],
  },
];

export default function Experience() {
  return (
    <section 
      id="experience" 
      className="py-12 sm:py-20 px-3 sm:px-6 max-w-[1550px] mx-auto scroll-mt-20 pointer-events-auto transition-colors duration-300 overflow-hidden"
    >
      <div className="flex flex-col items-start mb-8 sm:mb-14 pb-6 border-b border-slate-200 dark:border-white/[0.08]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-black/40 border border-amber-500/20 dark:border-white/10 text-amber-600 dark:text-amber-400 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-2.5">
          <Sparkles className="w-3.5 h-3.5" />
          Milestones
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-[#EAE5D9] tracking-tight">
          Journey & Background
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#D8D3C8]/70 mt-1.5 font-normal">
          A timeline of engineering execution, academic foundations, and full-stack software delivery.
        </p>
      </div>

      <div className="relative border-l border-slate-200 dark:border-white/15 ml-3 sm:ml-6 pl-4 sm:pl-10 flex flex-col gap-6 sm:gap-10">
        {MILESTONES.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative group pointer-events-auto"
            >
              {/* أيقونة التايم لاين */}
              <div className="absolute -left-[29px] sm:-left-[53px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white dark:bg-[#0A0D14] border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-700 dark:text-[#D8D3C8] group-hover:border-amber-500 group-hover:text-amber-500 transition-all shadow-sm">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* بطاقة الخبرة */}
              <div className="rounded-[20px] sm:rounded-[28px] border border-slate-200 dark:border-white/[0.12] bg-white dark:bg-[#0A0D14] p-4 sm:p-8 hover:border-amber-500/40 transition-all shadow-sm dark:shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-[#EAE5D9]">
                      {item.role}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                      {item.organization}
                    </p>
                  </div>
                  <span className="w-max px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-[10px] sm:text-xs font-mono text-slate-700 dark:text-[#D8D3C8] font-semibold">
                    {item.period}
                  </span>
                </div>

                <p className="text-slate-600 dark:text-[#D8D3C8]/80 text-xs sm:text-sm leading-relaxed mb-3.5 sm:mb-4 font-normal">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-mono rounded-xl bg-slate-100 dark:bg-white/[0.03] text-slate-700 dark:text-[#D8D3C8] border border-slate-200 dark:border-white/10"
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