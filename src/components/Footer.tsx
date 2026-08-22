"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Check, 
  Copy, 
  Mail, 
  Terminal, 
  ArrowUpRight,
  Loader2 
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

/* أيقونات SVG دقيقة وعالية الجودة */
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

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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

export default function Footer() {
  const { personal } = PORTFOLIO_DATA;
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // إحداثيات تأثير الـ 3D Tilt للدائرة المركزية
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const orbRef = useRef<HTMLDivElement>(null);

  const handleOrbMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbRef.current) return;
    const rect = orbRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({ x: -(y / 4), y: x / 4 });
  };

  const handleOrbMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleCopyEmail = () => {
    if (personal.email) {
      navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSent(true);
        setEmail("");
        setTimeout(() => setSent(false), 4000);
      } else {
        alert("Failed to send notification. Please reach out directly via WhatsApp or Email.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again or contact directly.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Guarantees", id: "faq" },
    { label: "Projects", id: "projects" },
    { label: "Workflow", id: "workflow" },
  ];

  return (
    <footer 
      id="contact" 
      className="relative w-full pt-28 pb-16 px-6 bg-[#04060A] text-slate-100 overflow-hidden border-t border-white/[0.08]"
    >
      {/* شبكة نقاط مضيئة بتأثير Matrix أسود وفخم */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 20%, transparent 85%)"
        }}
      />

      {/* توهج إضاءة في الخلفية */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        
        {/* الدائرة المركزية بالشعار وتأثير 3D Parallax */}
        <div
          ref={orbRef}
          onMouseMove={handleOrbMouseMove}
          onMouseLeave={handleOrbMouseLeave}
          style={{ perspective: 1000 }}
          className="mb-8 cursor-pointer"
        >
          <motion.div
            animate={{
              rotateX: rotate.x,
              rotateY: rotate.y,
            }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2px] bg-gradient-to-tr from-amber-500/40 via-white/10 to-cyan-500/40 shadow-[0_0_40px_rgba(245,158,11,0.15)] flex items-center justify-center group"
          >
            <div className="relative w-full h-full rounded-full bg-[#080C14] border border-white/10 flex items-center justify-center shadow-inner overflow-hidden p-3.5">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Youssef Abdeltwab Logo"
                  fill
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* خط إضاءة متحرك بالداخل */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
            </div>

            <div className="absolute -inset-2 rounded-full bg-amber-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        </div>

        {/* النصوص الترحيبية المركزة */}
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
          Let&apos;s Build Something{" "}
          <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
            Exceptional
          </span>
        </h2>
        
        <p className="text-slate-400 text-sm sm:text-base max-w-lg mb-10 leading-relaxed font-normal">
          Currently open for high-impact full-stack web applications, contract roles, and software architecture discussions.
        </p>

        {/* أزرار السوشيال ميديا والتواصل المباشر */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          
          {/* زر WhatsApp */}
          <a
            href={`https://wa.me/201550386456?text=${encodeURIComponent("مرحباً يوسف، رأيت معرض أعمالك وأريد الاستفسار عن بناء وتطوير مشروع ويب.")}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <WhatsappIcon className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* زر GitHub */}
          {personal.github && (
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}

          {/* زر LinkedIn */}
          {personal.linkedin && (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 text-sky-400 hover:text-sky-300 text-xs font-semibold flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}

          {/* زر Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-400 hover:text-pink-300 text-xs font-semibold flex items-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Instagram</span>
          </a>

          {/* زر نسخ الإيميل بضغطة زر */}
          <button
            onClick={handleCopyEmail}
            className="px-4 py-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-2 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* حقل المراسلة الفعلي المتصل بـ API الإيميل */}
        <form onSubmit={handleSendEmail} className="w-full max-w-md flex items-center gap-2 mb-12">
          <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to connect..."
              disabled={loading || sent}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#090D17] border border-white/10 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading || sent}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-xl shadow-amber-500/15 active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-80 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : sent ? (
              <>
                <Check className="w-4 h-4" />
                <span>Sent!</span>
              </>
            ) : (
              <>
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* روابط التنقل السريعة بين الأقسام */}
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-12">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* سطر حقوق النشر والمعلومات التقنية */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-8 border-t border-white/[0.06] text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
          
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-amber-500" />
            <span>Built with Next.js 15 & MERN Stack</span>
          </div>
        </div>

      </div>
    </footer>
  );
}