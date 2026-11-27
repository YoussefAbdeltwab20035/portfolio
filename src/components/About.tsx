"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Terminal,
  Layers,
} from "lucide-react";
import { DEFAULT_SITE_PROFILE, SiteProfileData } from "@/lib/siteDefaults";

const BASE_TABS = [
  { id: "overview", label: "Overview & Experience" },
  { id: "stack", label: "Core Tech Stack" },
];

interface AboutProps {
  profile?: SiteProfileData;
}

export default function About({ profile = DEFAULT_SITE_PROFILE }: AboutProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const hasExtra = (profile.extraSections || []).length > 0;
  const tabs = hasExtra
    ? [...BASE_TABS, { id: "extra", label: "More Highlights" }]
    : BASE_TABS;

  const currentTab =
    activeTab === "extra" && !hasExtra ? "overview" : activeTab;

  return (
    <section
      id="about"
      className="relative w-full py-12 sm:py-20 px-4 sm:px-8 max-w-[1440px] mx-auto scroll-mt-20 overflow-hidden transition-colors duration-300 pointer-events-auto"
    >
      <div className="relative w-full rounded-[28px] sm:rounded-[40px] overflow-hidden bg-white dark:bg-[#04044A] border border-[#04044A]/15 dark:border-[#00A4FF]/25 shadow-sm dark:shadow-[0_25px_80px_rgba(0,6,117,0.45)] p-6 sm:p-10 lg:p-14 flex flex-col justify-between pointer-events-auto">
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#00A4FF]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full pb-6 border-b border-[#04044A]/10 dark:border-[#00A4FF]/15">
          <div className="flex items-center gap-2.5 text-[#0077CC] dark:text-[#00E7FF] font-mono text-xs font-bold uppercase tracking-widest">
            <Terminal className="w-4 h-4" />
            <span>About &amp; Engineering Expertise</span>
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 rounded-full bg-[#EAF2FF] dark:bg-[#020412]/70 border border-[#00A4FF]/25 w-full sm:w-auto">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer flex-1 sm:flex-initial text-center ${
                    isActive
                      ? "bg-gradient-to-r from-[#00A4FF] to-[#00E7FF] text-[#020412] font-bold shadow-md"
                      : "text-[#04044A]/75 dark:text-[#CBD9FF]/80 hover:text-[#000675] dark:hover:text-white"
                  }`}
                  type="button"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8">
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            <h2 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-bold text-[#04044A] dark:text-white tracking-tight leading-[1.18]">
              {profile.aboutHeading}
            </h2>

            <AnimatePresence mode="wait">
              {currentTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-[#334173] dark:text-[#CBD9FF] text-sm sm:text-base leading-relaxed">
                    {profile.aboutDescription}
                  </p>
                  <p className="text-[#64749C] dark:text-[#CBD9FF]/80 text-xs sm:text-sm leading-relaxed">
                    {profile.aboutPhilosophy}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-[#EAF2FF] dark:bg-[#000675]/65 border border-[#00A4FF]/25">
                      <span className="text-[#04044A] dark:text-white font-extrabold text-sm sm:text-base block">
                        Full-Stack MERN
                      </span>
                      <p className="text-xs text-[#0077CC] dark:text-[#00E7FF] font-mono mt-1">
                        End-to-End Architecture
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#EAF2FF] dark:bg-[#000675]/65 border border-[#00A4FF]/25">
                      <span className="text-[#04044A] dark:text-white font-extrabold text-sm sm:text-base block">
                        Next.js &amp; TS
                      </span>
                      <p className="text-xs text-[#0077CC] dark:text-[#00E7FF] font-mono mt-1">
                        SSR, SEO &amp; Performance
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#EAF2FF] dark:bg-[#000675]/65 border border-[#00A4FF]/25">
                      <span className="text-[#04044A] dark:text-white font-extrabold text-sm sm:text-base block">
                        REST &amp; Databases
                      </span>
                      <p className="text-xs text-[#0077CC] dark:text-[#00E7FF] font-mono mt-1">
                        Prisma, SQL &amp; MongoDB
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentTab === "stack" && (
                <motion.div
                  key="stack"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                >
                  <div className="p-4 rounded-2xl bg-[#EAF2FF] dark:bg-[#000675]/65 border border-[#00A4FF]/25">
                    <Code2 className="w-4 h-4 text-[#00A4FF] dark:text-[#00E7FF] mb-1.5" />
                    <h4 className="text-[#04044A] dark:text-white text-sm font-bold">
                      Frontend Engineering
                    </h4>
                    <p className="text-[#334173] dark:text-[#CBD9FF]/85 text-xs mt-1 leading-relaxed">
                      {profile.vision}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#EAF2FF] dark:bg-[#000675]/65 border border-[#00A4FF]/25">
                    <Server className="w-4 h-4 text-[#00A4FF] dark:text-[#00E7FF] mb-1.5" />
                    <h4 className="text-[#04044A] dark:text-white text-sm font-bold">
                      Backend &amp; Security
                    </h4>
                    <p className="text-[#334173] dark:text-[#CBD9FF]/85 text-xs mt-1 leading-relaxed">
                      {profile.mission}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#EAF2FF] dark:bg-[#000675]/65 border border-[#00A4FF]/25">
                    <Database className="w-4 h-4 text-[#00A4FF] dark:text-[#00E7FF] mb-1.5" />
                    <h4 className="text-[#04044A] dark:text-white text-sm font-bold">
                      Database Architecture
                    </h4>
                    <p className="text-[#334173] dark:text-[#CBD9FF]/85 text-xs mt-1 leading-relaxed">
                      MongoDB Atlas, Aggregation Pipelines, PostgreSQL (Neon),
                      Prisma ORM &amp; Indexing.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#EAF2FF] dark:bg-[#000675]/65 border border-[#00A4FF]/25">
                    <Cloud className="w-4 h-4 text-[#00A4FF] dark:text-[#00E7FF] mb-1.5" />
                    <h4 className="text-[#04044A] dark:text-white text-sm font-bold">
                      Cloud, DevOps &amp; SEO
                    </h4>
                    <p className="text-[#334173] dark:text-[#CBD9FF]/85 text-xs mt-1 leading-relaxed">
                      Git/GitHub CI/CD, Vercel, Render, Linux CLI, Technical SEO
                      &amp; Search Console.
                    </p>
                  </div>
                </motion.div>
              )}

              {currentTab === "extra" && (
                <motion.div
                  key="extra"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                >
                  {(profile.extraSections || []).map((sec) => (
                    <div
                      key={sec.id}
                      className="p-4 rounded-2xl bg-[#EAF2FF] dark:bg-[#000675]/65 border border-[#00A4FF]/25"
                    >
                      <Layers className="w-4 h-4 text-[#00A4FF] dark:text-[#00E7FF] mb-1.5" />
                      <h4 className="text-[#04044A] dark:text-white text-sm font-bold">
                        {sec.title}
                      </h4>
                      {sec.subtitle && (
                        <p className="text-[11px] font-mono text-[#0077CC] dark:text-[#00E7FF] mt-0.5">
                          {sec.subtitle}
                        </p>
                      )}
                      <p className="text-[#334173] dark:text-[#CBD9FF]/85 text-xs mt-1.5 leading-relaxed whitespace-pre-line">
                        {sec.content}
                      </p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[300px] sm:max-w-[360px] h-[360px] sm:h-[440px] rounded-[28px] overflow-hidden border border-[#00A4FF]/35 shadow-[0_20px_50px_rgba(0,6,117,0.45)] bg-[#000675]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.aboutAvatarUrl || "/photo.png"}
                alt={profile.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}