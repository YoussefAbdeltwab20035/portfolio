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
      className="relative w-full py-16 px-4 sm:px-6 max-w-[1550px] mx-auto scroll-mt-20 overflow-hidden transition-colors duration-300"
    >
      <div className="relative w-full rounded-[36px] sm:rounded-[48px] overflow-hidden bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.12] shadow-xl dark:shadow-[0_25px_80px_rgba(0,0,0,0.7)] p-8 sm:p-12 lg:p-16 flex flex-col justify-between select-none">
        
        {/* ترويسة القسم مع الشعار المضيء */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 w-full pb-8 border-b border-slate-100 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            {/* الشعار المضيء المخصص */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-amber-500/30 bg-slate-950 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)] shrink-0">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Youssef Icon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/15 text-xs font-mono text-slate-800 dark:text-white/90 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="tracking-wide uppercase">Engineering Profile // 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/15">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
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
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-10">
          
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-[#EAE5D9] tracking-tight leading-[1.1]">
                Turning business goals into <span className="font-light italic text-amber-600 dark:text-amber-400">scalable web products.</span>
              </h2>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "story" && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-slate-700 dark:text-[#D8D3C8] text-sm sm:text-[15px] font-normal leading-relaxed">
                    I&apos;m <span className="text-slate-950 dark:text-white font-semibold">{personal.name}</span>, a Full-Stack Engineer focused on building robust, high-performance web applications that help businesses scale, convert visitors, and automate operations.
                  </p>
                  <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-xs sm:text-sm leading-relaxed">
                    From custom dashboards and SaaS platforms to fast customer-facing interfaces, every solution is built with production-grade reliability, data security, and seamless user experiences.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-4">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                      <span className="text-slate-900 dark:text-[#EAE5D9] font-bold text-base sm:text-lg">MERN</span>
                      <p className="text-[11px] text-amber-600 dark:text-amber-400/90 font-mono mt-0.5">Stack Architecture</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                      <span className="text-slate-900 dark:text-[#EAE5D9] font-bold text-base sm:text-lg">Next.js</span>
                      <p className="text-[11px] text-amber-600 dark:text-amber-400/90 font-mono mt-0.5">High Speed & SEO</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                      <span className="text-slate-900 dark:text-[#EAE5D9] font-bold text-base sm:text-lg">100%</span>
                      <p className="text-[11px] text-amber-600 dark:text-amber-400/90 font-mono mt-0.5">Code Ownership</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "deliverables" && (
                <motion.div
                  key="deliverables"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Code2 className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-2" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Custom Web Applications</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-1">Full-stack web products built for scale, performance, and reliability.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-2" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">SaaS & Admin Dashboards</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-1">Role-based controls, secure authentication, and real-time analytics.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Database className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-2" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">API & Database Design</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-1">Clean database schemas and secure endpoints that respond in milliseconds.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 mb-2" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Speed & UX Optimization</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-1">Mobile-first layouts optimized for fast load times and high conversions.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "guarantees" && (
                <motion.div
                  key="guarantees"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Complete Code Ownership</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-1">You get 100% full rights and access to the clean source code repository.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Direct Communication</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-1">Fast updates and milestone demos without project management layers.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Production Ready</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-1">Deployed live with zero-downtime architecture and proper documentation.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10">
                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mb-2" />
                    <h4 className="text-slate-900 dark:text-white text-xs sm:text-sm font-semibold">Post-Launch Support</h4>
                    <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-[11px] sm:text-xs mt-1">Technical handover and maintenance support for a smooth launch.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* حاوية الصورة الشخصية المحددة الحجم */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-[340px] h-[440px] sm:w-[380px] sm:h-[480px] rounded-[32px] overflow-hidden border border-slate-200 dark:border-white/15 shadow-2xl bg-slate-100 dark:bg-[#0F131C]">
              <Image
                src={personal.avatarUrl || "/about-photo.png"}
                alt={personal.name}
                width={380}
                height={480}
                priority
                className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-95"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-[#0A0D14] via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-white text-xs font-bold">{personal.name}</h4>
                  <p className="text-amber-400 font-mono text-[11px]">Full-Stack Developer</p>
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