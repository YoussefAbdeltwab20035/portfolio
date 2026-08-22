"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Compass, 
  Code2, 
  Rocket, 
  HeartHandshake, 
  ArrowUpRight,
  CheckCircle2,
  type LucideIcon 
} from "lucide-react";

interface StepItem {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
  tag: string;
}

const STEPS: StepItem[] = [
  {
    step: "01",
    tag: "Blueprint",
    title: "Discovery & System Architecture",
    subtitle: "Phase 01 — Structural Foundation",
    description:
      "Deconstructing requirements into scalable DB schemas, stateless API contracts, and milestone roadmaps before touching a single line of code.",
    icon: Compass,
    highlights: ["Schema & Entity Modeling", "RESTful Architecture Blueprint", "Milestone Roadmap & Scope"],
  },
  {
    step: "02",
    tag: "Sprint Execution",
    title: "Agile Development & Staging",
    subtitle: "Phase 02 — Weekly Iterations",
    description:
      "Writing clean, modular TypeScript with regular progress reviews and private preview links, keeping you in complete control of the progress.",
    icon: Code2,
    highlights: ["Weekly Working Milestones", "Live Private Staging Previews", "Direct Technical Feedback Loop"],
  },
  {
    step: "03",
    tag: "Production",
    title: "QA, Security & Cloud Deployment",
    subtitle: "Phase 03 — Production-Grade Launch",
    description:
      "Stress testing, Core Web Vitals optimization, automated CI/CD pipeline configuration, and zero-downtime deployment to secure cloud infra.",
    icon: Rocket,
    highlights: ["Core Web Vitals & Speed Tuning", "CORS & Secrets Hardening", "Automated CI/CD Workflows"],
  },
  {
    step: "04",
    tag: "Handover",
    title: "Source Handover & Support",
    subtitle: "Phase 04 — Complete Ownership",
    description:
      "Full ownership transfer of your repositories and keys, comprehensive API documentation, and dedicated post-launch support.",
    icon: HeartHandshake,
    highlights: ["100% Repository & Key Transfer", "Clear Architecture Docs", "Post-Launch Warranty & Support"],
  },
];

function WorkflowCard({ step, index }: { step: StepItem; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = step.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-3xl bg-slate-900/40 dark:bg-[#0E131F]/60 backdrop-blur-2xl border border-slate-200/80 dark:border-white/[0.08] p-8 transition-all duration-500 hover:border-amber-500/40 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 overflow-hidden"
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.08), transparent 80%)`,
          }}
        />
      )}

      <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-mono font-medium tracking-wider uppercase text-amber-500/90 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
              {step.tag}
            </span>
          </div>

          <span className="text-2xl font-mono font-bold tracking-tighter text-slate-300 dark:text-slate-700 group-hover:text-amber-500/80 transition-colors">
            /{step.step}
          </span>
        </div>

        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
          {step.subtitle}
        </span>
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 group-hover:text-amber-400 transition-colors">
          {step.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-normal">
          {step.description}
        </p>

        <div className="space-y-2 pt-4 border-t border-slate-200/60 dark:border-white/[0.06]">
          {step.highlights.map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 pt-6 mt-6 border-t border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span>Status: Production Verified</span>
        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </motion.div>
  );
}

export default function Workflow() {
  return (
    <section id="workflow" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 font-mono text-xs font-semibold tracking-wider uppercase mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
            Execution Architecture
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:via-slate-100 dark:to-slate-400">
            How We Build & Ship
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md font-mono leading-relaxed">
          Predictable milestones, transparent execution, and production-tested architectures tailored for high-stakes projects.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {STEPS.map((step, index) => (
          <WorkflowCard key={step.step} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}