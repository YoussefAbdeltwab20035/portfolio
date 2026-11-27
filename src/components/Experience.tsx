"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Briefcase, Sparkles } from "lucide-react";
import { ExperienceData } from "@/lib/siteDefaults";

interface ExperienceProps {
  experiences?: ExperienceData[];
}

export default function Experience({ experiences = [] }: ExperienceProps) {
  const getIcon = (index: number) => {
    if (index === 0) return Briefcase;
    if (index === 1) return Code2;
    return GraduationCap;
  };

  return (
    <section
      id="experience"
      className="py-12 sm:py-20 px-4 sm:px-8 max-w-[1440px] mx-auto scroll-mt-20 pointer-events-auto transition-colors duration-300 overflow-hidden"
    >
      <div className="flex flex-col items-start mb-10 pb-6 border-b border-[#04044A]/10 dark:border-[#00A4FF]/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A4FF]/10 dark:bg-[#04044A] border border-[#00A4FF]/30 text-[#000675] dark:text-[#00E7FF] font-mono text-xs font-semibold uppercase tracking-widest mb-2.5">
          <Sparkles className="w-3.5 h-3.5" />
          Milestones
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#04044A] dark:text-white tracking-tight">
          Journey &amp; Experience
        </h2>
        <p className="text-xs sm:text-sm text-[#334173] dark:text-[#CBD9FF]/75 mt-1.5 font-normal">
          Engineering milestones, real-world projects, and academic
          foundations.
        </p>
      </div>

      {experiences.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-[#00A4FF]/30 bg-white/70 dark:bg-[#04044A]/50 p-8 text-center">
          <p className="text-xs sm:text-sm text-[#334173] dark:text-[#CBD9FF]/80">
            No journey milestones added yet. Open the Admin Dashboard to add
            your experiences.
          </p>
        </div>
      ) : (
        <div className="relative border-l border-[#00A4FF]/35 ml-3 sm:ml-6 pl-5 sm:pl-10 flex flex-col gap-6 sm:gap-8">
          {experiences.map((item, index) => {
            const Icon = getIcon(index);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, x: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="relative group pointer-events-auto"
              >
                <div className="absolute -left-[33px] sm:-left-[55px] top-5 w-8 h-8 rounded-full bg-white dark:bg-[#04044A] border border-[#00A4FF]/40 flex items-center justify-center text-[#000675] dark:text-[#00E7FF] group-hover:border-[#00E7FF] group-hover:scale-110 transition-all shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="rounded-[24px] border border-[#04044A]/15 dark:border-[#00A4FF]/25 bg-white dark:bg-[#04044A] p-5 sm:p-8 hover:border-[#00E7FF] transition-all shadow-sm dark:shadow-[0_15px_45px_rgba(0,6,117,0.35)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-base sm:text-xl font-bold text-[#04044A] dark:text-white">
                        {item.role}
                      </h3>
                      <p className="text-xs text-[#0077CC] dark:text-[#00E7FF] font-mono mt-0.5">
                        {item.organization}
                      </p>
                    </div>
                    <span className="w-max px-3.5 py-1 rounded-full bg-[#EAF2FF] dark:bg-[#000675]/80 border border-[#00A4FF]/30 text-xs font-mono text-[#000675] dark:text-[#CBD9FF] font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-[#334173] dark:text-[#CBD9FF]/85 text-xs sm:text-sm leading-relaxed mb-4 font-normal">
                    {item.description}
                  </p>

                  {item.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-[11px] font-mono rounded-xl bg-[#EAF2FF] dark:bg-[#000675]/60 text-[#000675] dark:text-[#CBD9FF] border border-[#00A4FF]/25"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}