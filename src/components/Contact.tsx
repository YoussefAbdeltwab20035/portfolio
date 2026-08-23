"use client";

import { useState } from "react";
import { 
  Mail, 
  Check, 
  Copy, 
  Sparkles, 
  ArrowUpRight
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function WhatsappIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.09-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.69.46-.04 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3Z" />
    </svg>
  );
}

export default function Contact() {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCopyEmail = () => {
    if (personal.email) {
      navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSent(false), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="w-full max-w-[1550px] mx-auto py-12 sm:py-20 px-3 sm:px-6 scroll-mt-20 pointer-events-auto overflow-hidden">
      
      {/* الكارت الرئيسي المتكيف */}
      <div className="relative w-full rounded-[28px] sm:rounded-[44px] overflow-hidden bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/[0.12] shadow-xl dark:shadow-[0_25px_80px_rgba(0,0,0,0.7)] p-5 sm:p-10 lg:p-14 transition-colors duration-300">
        
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
          
          {/* الجانب الأيسر: معلومات الاتصال المباشرة وروابط السوشيال */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6 text-left w-full">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-black/40 border border-amber-500/20 dark:border-white/10 text-amber-600 dark:text-amber-400 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Initiate Sprint
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-[#EAE5D9] tracking-tight leading-[1.15]">
                Let&apos;s build something <span className="font-light italic text-amber-600 dark:text-amber-400">exceptional.</span>
              </h2>
              <p className="text-slate-600 dark:text-[#D8D3C8]/70 text-xs sm:text-sm mt-3 leading-relaxed font-normal">
                Available for full-stack web applications, contract engineering, and enterprise architecture consultations.
              </p>
            </div>

            {/* بطاقات الاتصال السريعة */}
            <div className="flex flex-col gap-2.5 pt-1 w-full">
              <button
                onClick={handleCopyEmail}
                type="button"
                className="w-full p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] hover:bg-slate-100 dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/10 flex items-center justify-between transition-all group cursor-pointer pointer-events-auto"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 dark:text-[#D8D3C8]/60">Direct Email</p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-[#EAE5D9] break-all">{personal.email}</p>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-slate-200/60 dark:bg-white/5 text-slate-700 dark:text-[#D8D3C8]">
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </div>
              </button>

              <div className="grid grid-cols-2 gap-2.5 w-full">
                {personal.whatsapp && (
                  <a
                    href={personal.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2 text-xs font-semibold transition-all active:scale-95 cursor-pointer pointer-events-auto"
                  >
                    <WhatsappIcon className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                )}

                {personal.github && (
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-[#D8D3C8] hover:text-slate-950 dark:hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-all active:scale-95 cursor-pointer pointer-events-auto"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* الجانب الأيمن: نموذج التواصل */}
          <div className="lg:col-span-7 w-full">
            <form 
              onSubmit={handleSubmit}
              className="p-5 sm:p-7 rounded-[24px] sm:rounded-[32px] bg-slate-50 dark:bg-[#05070B]/80 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl flex flex-col gap-3.5 w-full pointer-events-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-[#D8D3C8]/70 mb-1 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-[#EAE5D9] placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-[#D8D3C8]/70 mb-1 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-[#EAE5D9] placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-[#D8D3C8]/70 mb-1 uppercase">Project Requirements & Scope</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, desired deliverables, timeline, or chosen guarantee..."
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200 dark:border-white/10 text-xs sm:text-sm text-slate-900 dark:text-[#EAE5D9] placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:border-amber-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending || isSent}
                className="mt-1 w-full py-3 sm:py-3.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-[#EAE5D9] dark:hover:bg-white dark:text-[#0A0D14] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer disabled:opacity-80 pointer-events-auto"
              >
                {isSent ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Message Sent Successfully</span>
                  </>
                ) : isSending ? (
                  <span>Transmitting Payload...</span>
                ) : (
                  <>
                    <span>Send Project Brief</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}