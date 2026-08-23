"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Database, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Sparkles 
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const TABS = [
  { id: "story", label: "Overview" },
  { id: "deliverables", label: "What I Build For You" },
  { id: "guarantees", label: "Client Guarantees" },
];

export default function About() {
  const { personal } = PORTFOLIO_DATA;
  const [activeTab, setActiveTab] = useState("story");

  return (
    <section 
      id="about" 
      className="relative w-full py-8 sm:py-16 px-3 sm:px-6 max-w-[1550px] mx-auto scroll-mt-20 overflow-hidden transition-colors duration-300 pointer-events-auto"
    >
      <div className="relative w-full rounded-[24px] sm:rounded-[44px] overflow-hidden bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.12] shadow-sm dark:shadow-[0_25px_80px_rgba(0,0,0,0.7)] p-4 sm:p-10 lg:p-14 flex flex-col justify-between pointer-events-auto">
        
        {/* ترويسة القسم */}
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4 w-full pb-4 sm:pb-8 border-b border-slate-100 dark:border-white/[0.08]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-amber-500/30 bg-slate-950 p-1 flex items-center justify-center shadow-sm shrink-0">
              <Image
                src="/logo.png"
                alt="Youssef Icon"
                width={40}
                height={40}
                priority
                className="w-full h-full object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/15 text-[10px] sm:text-xs font-mono text-slate-800 dark:text-white/90 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tracking-wide uppercase">Engineering Profile // 2026</span>
            </div>
          </div>

          {/* شريط التبويبات المتجاوب */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/15 w-full sm:w-auto overflow-x-auto no-scrollbar">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-300 cursor-pointer whitespace-nowrap flex-1 sm:flex-initial text-center ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-[#EAE5D9] dark:text-[#0A0D14] font-bold shadow-md"
                      : "text-slate-600 dark:text-[#D8D3C8]/70 hover:text-slate-950 dark:hover:text-white"
                  }`}
                  type="button"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* منطقة المحتوى والصورة */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center pt-5 sm:pt-8">
          
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 text-left">
            <div>
              <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-[#EAE5D9] tracking-tight leading-[1.2]">
                Turning business goals into <span className="font-light italic text-amber-600 dark:text-amber-400">scalable web products.</span>
              </h2>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "story" && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <p className="text-slate-700 dark:text-[#D8D3C8] text-xs sm:text-sm font-normal leading-relaxed">
                    I&apos;m <span className="text-slate-950 dark:text-white font-semibold">{personal.name}</span>, a Full-Stack Engineer focused on building robust, high-performance web applications that help businesses scale, convert visitors, and automate operations.
                  </p>
                  <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-xs sm:text-sm leading-relaxed">
                    From custom dashboards and SaaS platforms to fast customer-facing interfaces, every solution is built with production-grade reliability, data security, and seamless user experiences.
                  </p>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-center sm:text-left">
                      <span className="text-slate-900 dark:text-[#EAE5D9] font-bold text-xs sm:text-base block sm:inline">MERN</span>
                      <p className="text-[10px] sm:text-[11px] text-amber-600 dark:text-amber-400/90 font-mono mt-0.5">Stack Core</p>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-center sm:text-left">
                      <span className="text-slate-900 dark:text-[#EAE5D9] font-bold text-xs sm:text-base block sm:inline">Next.js</span>
                      <p className="text-[10px] sm:text-[11px] text-amber-600 dark:text-amber-400/90 font-mono mt-0.5">Speed & SEO</p>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-center sm:text-left">
                      <span className="text-slate-900 dark:text-[#EAE5D9] font-bold text-xs sm:text-base block sm:inline">100%</span>
                      <p className="text-[10px] sm:text-[11px] text-amber-600 dark:text-amber-400/90 font-mono mt-0.5">Ownership</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "deliverables" && (
                <motion.div
                  key="deliverables"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
                >
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Code2 className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Custom Web Applications</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-0.5">Full-stack web products built for scale, performance, and reliability.</p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">SaaS & Admin Dashboards</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-0.5">Role-based controls, secure authentication, and real-time analytics.</p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Database className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">API & Database Design</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-0.5">Clean database schemas and secure endpoints that respond in milliseconds.</p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-1" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Speed & UX Optimization</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-0.5">Mobile-first layouts optimized for fast load times and high conversions.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "guarantees" && (
                <motion.div
                  key="guarantees"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
                >
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Complete Code Ownership</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-0.5">You get 100% full rights and access to the clean source code repository.</p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Direct Communication</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-0.5">Fast updates and milestone demos without project management layers.</p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Production Ready</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-0.5">Deployed live with zero-downtime architecture and proper documentation.</p>
                  </div>
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-1" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Post-Launch Support</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-0.5">Technical handover and maintenance support for a smooth launch.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* حاوية الصورة الشخصية المتناسقة */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[280px] sm:max-w-[360px] h-[340px] sm:h-[450px] rounded-[24px] sm:rounded-[28px] overflow-hidden border border-slate-200 dark:border-white/15 shadow-xl bg-slate-100 dark:bg-[#0F131C]">
              <Image
                src={personal.avatarUrl || "/about-photo.png"}
                alt={personal.name}
                fill
                priority
                sizes="(max-width: 768px) 280px, 360px"
                className="object-cover object-top filter contrast-[1.04] brightness-95"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-[#0A0D14] via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-white text-xs font-bold">{personal.name}</h4>
                  <p className="text-amber-400 font-mono text-[10px] sm:text-[11px]">Full-Stack Developer</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}