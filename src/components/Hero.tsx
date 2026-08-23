"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Mail, Check, Copy, ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Hero() {
  const { personal } = PORTFOLIO_DATA;
  const containerRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsDesktop(window.innerWidth >= 1024);
    });

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 45;
    const y = (e.clientY - rect.top - rect.height / 2) / 45;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    if (isDesktop) setMouseOffset({ x: 0, y: 0 });
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      className="relative w-full pt-20 sm:pt-28 pb-4 sm:pb-6 px-3 sm:px-6 max-w-[1550px] mx-auto flex items-center justify-center pointer-events-auto overflow-hidden"
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full min-h-[480px] sm:min-h-[600px] lg:h-[86vh] max-h-[920px] rounded-[24px] sm:rounded-[44px] overflow-hidden border border-slate-200 dark:border-white/[0.12] shadow-xl dark:shadow-[0_25px_80px_rgba(0,0,0,0.7)] flex flex-col justify-between p-4 sm:p-10 lg:p-14 group bg-slate-900 dark:bg-[#0A0D14]"
      >
        {/* الصورة الخلفية مع تأثير الحركة للديسكتوب فقط */}
        <motion.div
          animate={
            isDesktop
              ? {
                  x: mouseOffset.x * -1.15,
                  y: mouseOffset.y * -1.15,
                  scale: 1.05,
                }
              : { x: 0, y: 0, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          <Image
            src="/hero-clean.png"
            alt="Youssef Prisma 3D Cinematic"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1550px"
            className="object-cover object-center"
          />
        </motion.div>

        {/* تدرجات الإضاءة والقراءة */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/40 dark:from-black/90 dark:via-black/30 dark:to-black/40 pointer-events-none z-10" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-950/60 dark:from-black/60 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-slate-950/95 dark:from-black/90 to-transparent pointer-events-none z-10" />

        {/* الشريط العلوي للـ Hero */}
        <div className="relative z-30 flex items-center justify-between w-full pointer-events-auto">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-[10px] sm:text-xs font-medium text-white/90 shadow-md">
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
              className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/60 hover:bg-black/80 active:bg-black backdrop-blur-xl border border-white/15 text-white/90 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer pointer-events-auto"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>CV</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 active:bg-black backdrop-blur-xl border border-white/15 text-white/90 transition-all shadow-md active:scale-95 cursor-pointer pointer-events-auto"
              title="Copy Email"
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

        {/* النصوص والأزرار السفلية */}
        <div className="relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-end w-full pt-4 pointer-events-auto">
          <div className="lg:col-span-7 flex items-baseline tracking-tighter">
            <h1 className="text-[3.2rem] xs:text-[4.2rem] sm:text-[6.5rem] md:text-[8rem] lg:text-[9.5rem] xl:text-[11rem] font-bold text-[#EAE5D9] leading-[0.9] sm:leading-[0.85] drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)] font-sans select-none">
              Youssef
            </h1>
            <span className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-amber-400 ml-1">
              *
            </span>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-3.5 sm:gap-5 text-left lg:text-right pb-1 pointer-events-auto">
            <p className="text-[#D8D3C8] text-xs sm:text-sm lg:text-[14px] xl:text-[15px] font-normal leading-relaxed max-w-md drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)]">
              {personal.bio}
            </p>

            <a
              href="#projects"
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2.5 pl-4 sm:pl-6 pr-2 py-1.5 sm:py-2 rounded-full bg-[#EAE5D9] hover:bg-white active:bg-slate-200 text-[#0A0D14] text-xs sm:text-sm font-bold tracking-tight transition-all duration-300 shadow-2xl active:scale-95 cursor-pointer pointer-events-auto"
            >
              <span>Explore Projects</span>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#0A0D14] text-[#EAE5D9] flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}