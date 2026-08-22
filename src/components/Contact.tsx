"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  Sparkles, 
  MessageSquare,
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

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.5a1.62 1.62 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62Z" />
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
    <section id="contact" className="py-20 px-4 sm:px-6 max-w-[1550px] mx-auto scroll-mt-20">
      
      {/* الكارت الرئيسي بنظام Prisma الفاخر */}
      <div className="relative w-full rounded-[36px] sm:rounded-[48px] overflow-hidden bg-[#0A0D14] border border-white/[0.12] shadow-[0_25px_80px_rgba(0,0,0,0.7)] p-8 sm:p-12 lg:p-16">
        
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-amber-500/[0.06] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* الجانب الأيسر: معلومات الاتصال المباشرة وروابط السوشيال */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 border border-white/10 text-amber-400 font-mono text-xs font-semibold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Initiate Sprint
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#EAE5D9] tracking-tight leading-[1.15]">
                Let&apos;s build something <span className="font-light italic text-amber-400">exceptional.</span>
              </h2>
              <p className="text-[#D8D3C8]/70 text-xs sm:text-sm mt-4 leading-relaxed font-normal">
                Available for full-stack web applications, contract engineering, and enterprise architecture consultations.
              </p>
            </div>

            {/* بطاقات الاتصال السريعة */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                type="button"
                className="w-full p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 flex items-center justify-between transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] font-mono text-[#D8D3C8]/60">Direct Email</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#EAE5D9]">{personal.email}</p>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white/5 text-[#D8D3C8]">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </div>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://wa.me/201026027170"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-2 text-xs font-semibold transition-all active:scale-95"
                >
                  <WhatsappIcon className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                {personal.github && (
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[#D8D3C8] hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-all active:scale-95"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* الجانب الأيمن: نموذج التواصل التفاعلي */}
          <div className="lg:col-span-7">
            <form 
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-[32px] bg-[#05070B]/80 border border-white/10 shadow-2xl flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-[#D8D3C8]/70 mb-1.5 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    className="w-full px-4 py-3 rounded-2xl bg-[#0A0D14] border border-white/10 text-xs sm:text-sm text-[#EAE5D9] placeholder:text-white/20 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#D8D3C8]/70 mb-1.5 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-3 rounded-2xl bg-[#0A0D14] border border-white/10 text-xs sm:text-sm text-[#EAE5D9] placeholder:text-white/20 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#D8D3C8]/70 mb-1.5 uppercase">Project Requirements & Scope</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, desired deliverables, timeline, or chosen guarantee..."
                  className="w-full px-4 py-3 rounded-2xl bg-[#0A0D14] border border-white/10 text-xs sm:text-sm text-[#EAE5D9] placeholder:text-white/20 focus:outline-none focus:border-amber-400 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending || isSent}
                className="mt-2 w-full py-3.5 rounded-full bg-[#EAE5D9] hover:bg-white text-[#0A0D14] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-[1.01] active:scale-95 cursor-pointer disabled:opacity-80"
              >
                {isSent ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
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