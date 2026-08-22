"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Download, 
  Mail, 
  Check, 
  Copy, 
  ArrowRight 
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Hero() {
  const { personal } = PORTFOLIO_DATA;
  const containerRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 45;
    const y = (e.clientY - rect.top - rect.height / 2) / 45;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleCopyEmail = () => {
    if (personal.email) {
      navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      const offset = 80;
      const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative w-full pt-28 pb-10 px-4 sm:px-6 max-w-[1550px] mx-auto flex items-center justify-center overflow-hidden"
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full min-h-[750px] sm:min-h-[820px] lg:h-[88vh] max-h-[940px] rounded-[36px] sm:rounded-[48px] overflow-hidden border border-slate-200 dark:border-white/[0.12] shadow-xl dark:shadow-[0_25px_80px_rgba(0,0,0,0.7)] flex flex-col justify-between p-6 sm:p-12 lg:p-14 select-none group bg-slate-900 dark:bg-[#0A0D14]"
      >
        <motion.div
          animate={{
            x: mouseOffset.x * -1.15,
            y: mouseOffset.y * -1.15,
            scale: 1.05,
          }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <Image
            src="/hero-clean.png"
            alt="Youssef Prisma 3D Cinematic"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 dark:from-black/85 dark:via-black/15 dark:to-black/35 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-slate-950/50 dark:from-black/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-slate-950/80 dark:from-black/75 to-transparent pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 text-xs font-medium text-white/90 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="tracking-wide">Full-Stack Engineer</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Youssef_Abdeltwab_CV.pdf"
              className="px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xl border border-white/15 text-white/90 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>CV</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xl border border-white/15 text-white/90 transition-all shadow-md active:scale-95 cursor-pointer"
              title="Copy Email"
              type="button"
            >
              {copied ? (
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold px-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end w-full pt-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              transform: `translate3d(${mouseOffset.x * 0.75}px, ${mouseOffset.y * 0.75}px, 0)`,
            }}
            className="lg:col-span-7 flex items-baseline tracking-tighter"
          >
            <h1 className="text-[4.5rem] sm:text-[6.8rem] md:text-[8.5rem] lg:text-[9.8rem] xl:text-[11.2rem] font-bold text-[#EAE5D9] leading-[0.85] drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)] font-sans">
              Youssef
            </h1>
            <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-amber-400 ml-1 sm:ml-2">
              *
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col items-start lg:items-end gap-6 text-left lg:text-right pb-4"
          >
            <p className="text-[#D8D3C8] text-xs sm:text-sm lg:text-[14px] xl:text-[15px] font-normal leading-relaxed max-w-md drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
              {personal.bio || 
                "Computer Science student and Full-Stack Developer specializing in building high-performance web applications, scalable backend microservices, and modern UI architectures using MERN Stack, Next.js, and TypeScript."}
            </p>

            <a
              href="#projects"
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-4 pl-7 pr-2 py-2 rounded-full bg-[#EAE5D9] hover:bg-white text-[#0A0D14] text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore Projects</span>
              <div className="w-8 h-8 rounded-full bg-[#0A0D14] text-[#EAE5D9] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>
            </a>
          </motion.div>
        </div>

        <div className="relative z-10 w-full hidden sm:block h-2" />
      </motion.div>
    </section>
  );
}