"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Server, 
  Zap, 
  Rocket, 
  CheckCircle2,
  type LucideIcon
} from "lucide-react";

interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
  technologies: string[];
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Full-Stack Web Applications",
    subtitle: "Modern, Scalable & High Performance",
    description:
      "Engineering end-to-end responsive web applications with modern rendering (SSR/SSG), state-of-the-art UI engineering, and top-tier Lighthouse performance.",
    icon: Code2,
    deliverables: [
      "Custom Next.js & React Architecture",
      "SEO, Core Web Vitals & Speed Optimization",
      "Interactive, Mobile-First User Interfaces",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "02",
    title: "Backend Architecture & APIs",
    subtitle: "Secure, Structured & Data-Driven",
    description:
      "Designing clean RESTful APIs, relational & NoSQL schemas, robust query pipelines, and stateless authentication systems built to handle scale.",
    icon: Server,
    deliverables: [
      "Secure JWT & Role-Based Access Control (RBAC)",
      "Database Schema Design & Query Tuning",
      "Production-ready Error Handling & Logging",
    ],
    technologies: ["Node.js", "Express.js", "MongoDB", "Prisma", "PostgreSQL"],
  },
  {
    number: "03",
    title: "Real-Time & Interactive Systems",
    subtitle: "Instant State Synchronization & Low Latency",
    description:
      "Building bidirectional real-time communications, event-driven pipelines, instant chat ecosystems, and live updates without page reloads.",
    icon: Zap,
    deliverables: [
      "Socket.io & WebSocket Streaming Channels",
      "Optimistic UI & Client-State Syncing",
      "Real-time Notification Pipelines",
    ],
    technologies: ["Socket.io", "WebSockets", "REST APIs", "Framer Motion"],
  },
  {
    number: "04",
    title: "Database Modeling & Cloud Deployment",
    subtitle: "Continuous Integration & Zero-Downtime",
    description:
      "Setting up automated CI/CD deployment pipelines, cloud databases, environment secrets security, and production uptime monitoring.",
    icon: Rocket,
    deliverables: [
      "Automated GitHub Actions / Vercel / Render Deployments",
      "Cloud Database Management (MongoDB Atlas / PostgreSQL)",
      "Production Security & CORS Configuration",
    ],
    technologies: ["Vercel", "Render", "MongoDB Atlas", "Git", "Prisma ORM"],
  },
];

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-3xl bg-white/80 dark:bg-[#111723]/70 backdrop-blur-xl border border-slate-200 dark:border-slate-800/80 p-7 md:p-8 transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/5 overflow-hidden"
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.12), transparent 80%)`,
          }}
        />
      )}

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
            SERVICE {service.number}
          </span>
        </div>

        <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold uppercase tracking-wider block mb-1">
          {service.subtitle}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-amber-500 transition-colors">
          {service.title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          {service.deliverables.map((item: string) => (
            <div key={item} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5 z-10">
        {service.technologies.map((tech: string) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs font-semibold uppercase tracking-widest mb-3">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Capabilities & Solutions
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Engineering Services
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md font-mono">
          Transforming business requirements and high-level ideas into reliable, scalable digital products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {SERVICES.map((service: ServiceItem, index: number) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}