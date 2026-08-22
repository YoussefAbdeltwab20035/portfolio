"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Lock, 
  Layers, 
  FileCheck2 
} from "lucide-react";

interface FAQItem {
  id: string;
  tag: string;
  question: string;
  answer: string;
  highlight: string;
  icon: typeof ShieldCheck;
}

const FAQS: FAQItem[] = [
  {
    id: "warranty",
    tag: "01 // FREE WARRANTY",
    question: "What happens if an issue appears after launch?",
    answer: "Every single project is backed by an ironclad 3-Month Complimentary Maintenance & Warranty. If any bugs, responsive issues, or performance regressions appear, they are resolved instantly with zero extra billing.",
    highlight: "3 Months Full Technical Coverage Included Free",
    icon: ShieldCheck,
  },
  {
    id: "ownership",
    tag: "02 // 100% ASSET RIGHTS",
    question: "Do I get full ownership of the source code and accounts?",
    answer: "You get total ownership. All GitHub repositories, cloud infrastructure (Vercel/Render), database clusters (MongoDB Atlas), and environment configurations are transferred completely to your accounts upon project sign-off.",
    highlight: "Zero Vendor Lock-in • 100% Intellectual Property Handover",
    icon: Lock,
  },
  {
    id: "payments",
    tag: "03 // MILESTONE ESCROW",
    question: "How are project payments and milestones structured?",
    answer: "Payments are linked directly to working deliverables (typically 50% upfront to initiate architecture & 50% after live demo approval). You only release the final tranche after inspecting the working product on a staging URL.",
    highlight: "Milestone-Gated Payments • Complete Financial Transparency",
    icon: FileCheck2,
  },
  {
    id: "timeline",
    tag: "04 // SPRINT DELIVERY",
    question: "How fast can you build and ship my web application?",
    answer: "Custom MVPs and full-stack platforms are delivered within 2 to 5 weeks. We structure the project in weekly iterative sprints with continuous staging access, so you watch the software come alive in real-time.",
    highlight: "Rapid Iteration • 14-35 Day Typical Time-to-Market",
    icon: Clock,
  },
  {
    id: "design",
    tag: "05 // PIXEL-PERFECT CODE",
    question: "Can you transform Figma designs into high-performance web apps?",
    answer: "Yes, flawlessly. I convert Figma or custom UI designs into responsive, accessible Next.js & Tailwind CSS components with smooth Framer Motion interactions and 95+ Core Web Vitals performance.",
    highlight: "Pixel-Perfect UI • 95+ Lighthouse Performance Guaranteed",
    icon: Layers,
  },
];

export default function FAQ() {
  const [activeId, setActiveId] = useState<string>("warranty");
  const currentFAQ = FAQS.find((f) => f.id === activeId) || FAQS[0];
  const CurrentIcon = currentFAQ.icon;

  const handleGuaranteeSelect = () => {
    const contactSection = document.getElementById("contact");
    const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement | null;

    if (contactSection) {
      const offset = 70;
      const targetY = contactSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetY, behavior: "smooth" });

      setTimeout(() => {
        if (messageInput) {
          messageInput.value = `Hi Youssef, I'd like to discuss a project with the guarantee: "${currentFAQ.highlight}".`;
          messageInput.focus();
        }
      }, 700);
    }
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 max-w-[1550px] mx-auto scroll-mt-20 relative transition-colors duration-300">
      
      {/* ترويسة القسم المتكيفة مع الليل والنهار */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-amber-500/10 dark:bg-black/40 border border-amber-500/20 dark:border-white/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold tracking-widest uppercase mb-4 shadow-sm backdrop-blur-xl">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Client Risk-Free Hub</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#EAE5D9]">
          Guarantees & Project Terms
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#D8D3C8]/70 max-w-xl mt-3 font-normal leading-relaxed">
          Clear deliverables, strict milestone security, and comprehensive post-launch warranty designed to eliminate risk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
        
        {/* قائمة الأزرار اليسارية */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {FAQS.map((faq) => {
            const isSelected = activeId === faq.id;
            const Icon = faq.icon;
            return (
              <button
                key={faq.id}
                type="button"
                onClick={() => setActiveId(faq.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? "bg-white dark:bg-[#0A0D14] border-amber-500 dark:border-amber-400/80 shadow-lg dark:shadow-[0_10px_30px_rgba(245,158,11,0.08)]"
                    : "bg-slate-100/80 dark:bg-[#0A0D14]/60 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFaqIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500 dark:bg-amber-400"
                  />
                )}

                <div className="flex items-center gap-3.5 pl-1">
                  <div className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-200/50 dark:bg-white/[0.03] text-amber-600 dark:text-amber-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 dark:text-[#D8D3C8]/60 uppercase block">
                      {faq.tag}
                    </span>
                    <h3 className={`text-xs sm:text-sm font-bold transition-colors ${
                      isSelected ? "text-slate-900 dark:text-[#EAE5D9]" : "text-slate-700 dark:text-[#D8D3C8]/80 group-hover:text-slate-950 dark:group-hover:text-white"
                    }`}>
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${
                  isSelected ? "text-amber-600 dark:text-amber-400 translate-x-1" : "text-slate-400 dark:text-white/30 group-hover:text-slate-700 dark:group-hover:text-white/70"
                }`} />
              </button>
            );
          })}
        </div>

        {/* لوحة تفاصيل الضمان المختار */}
        <div className="lg:col-span-7 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFAQ.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="h-full rounded-[32px] p-6 sm:p-10 bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.12] shadow-xl dark:shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.08] pb-5 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.03] text-amber-600 dark:text-amber-400">
                      <CurrentIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                        VERIFIED CLAUSE
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-[#D8D3C8]/60">
                        {currentFAQ.tag}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Guaranteed
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#EAE5D9] tracking-tight leading-snug mb-4">
                  {currentFAQ.question}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#D8D3C8]/80 leading-relaxed font-normal">
                  {currentFAQ.answer}
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-400/[0.06] border border-amber-500/20 dark:border-amber-400/20 flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono font-bold text-amber-700 dark:text-amber-300">
                    {currentFAQ.highlight}
                  </span>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-100 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={handleGuaranteeSelect}
                  className="px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-[#EAE5D9] dark:hover:bg-white dark:text-[#0A0D14] font-bold text-xs flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Start Project With This Guarantee</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs font-mono text-slate-500 dark:text-[#D8D3C8]/60 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  100% Risk Free
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* الكروت السفلية الثلاثة المتكيفة */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/10 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 dark:text-[#EAE5D9] font-mono block">90 Days</span>
            <span className="text-xs text-slate-500 dark:text-[#D8D3C8]/70">Post-Launch Free Warranty</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/10 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 dark:text-[#EAE5D9] font-mono block">100%</span>
            <span className="text-xs text-slate-500 dark:text-[#D8D3C8]/70">IP & Code Ownership Transfer</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/10 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-900 dark:text-[#EAE5D9] font-mono block">Milestone Gated</span>
            <span className="text-xs text-slate-500 dark:text-[#D8D3C8]/70">Zero Risk Staged Payments</span>
          </div>
        </div>
      </div>

    </section>
  );
}