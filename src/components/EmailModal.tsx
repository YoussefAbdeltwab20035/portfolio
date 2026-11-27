"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";

interface EmailModalProps {
  recipientEmail?: string;
}

export default function EmailModal({
  recipientEmail = "youssefabdeltawb@gmail.com",
}: EmailModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{
        subject?: string;
        message?: string;
      }>;
      if (customEvent.detail?.subject) setSubject(customEvent.detail.subject);
      if (customEvent.detail?.message) setMessage(customEvent.detail.message);
      setStatus("idle");
      setIsOpen(true);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("open-email-modal", handleOpen);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-email-modal", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderEmail || !message.trim()) return;

    setLoading(true);
    setStatus("idle");

    try {
      const fullMessage = subject.trim()
        ? `Subject: ${subject.trim()}\n\n${message.trim()}`
        : message.trim();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: senderEmail, message: fullMessage }),
      });

      if (res.ok) {
        setStatus("success");
        setSenderEmail("");
        setSubject("");
        setMessage("");
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg rounded-[24px] bg-white dark:bg-[#04044A] border border-[#04044A]/15 dark:border-[#00A4FF]/35 shadow-[0_25px_80px_rgba(0,164,255,0.28)] p-6 sm:p-8 text-[#04044A] dark:text-white relative"
        >
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#04044A]/10 dark:border-[#00A4FF]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00A4FF]/15 text-[#0077CC] dark:text-[#00E7FF] flex items-center justify-center border border-[#00A4FF]/30">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  Send Direct Message
                </h3>
                <p className="text-xs text-[#64749C] dark:text-[#CBD9FF]/75">
                  To: {recipientEmail}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close message form"
              className="w-9 h-9 rounded-full bg-[#EAF2FF] dark:bg-[#000675] text-[#04044A] dark:text-white flex items-center justify-center border border-[#00A4FF]/25 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {status === "success" && (
            <div className="mb-4 p-3.5 rounded-xl bg-[#00A4FF]/15 border border-[#00A4FF]/35 text-[#0077CC] dark:text-[#00E7FF] text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Your message has been sent! I will reply soon.</span>
            </div>
          )}

          {status === "error" && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                Could not send right now. Please try WhatsApp or{" "}
                <a
                  href={`mailto:${recipientEmail}`}
                  className="underline font-bold"
                >
                  open your mail app
                </a>
                .
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#334173] dark:text-[#CBD9FF] mb-1.5">
                Your Email *
              </label>
              <input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FF] dark:bg-[#020412] border border-[#04044A]/15 dark:border-[#00A4FF]/30 text-xs sm:text-sm text-[#04044A] dark:text-white focus:border-[#00A4FF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#334173] dark:text-[#CBD9FF] mb-1.5">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Project inquiry / Collaboration"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FF] dark:bg-[#020412] border border-[#04044A]/15 dark:border-[#00A4FF]/30 text-xs sm:text-sm text-[#04044A] dark:text-white focus:border-[#00A4FF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#334173] dark:text-[#CBD9FF] mb-1.5">
                Message *
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message or project details..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F8FF] dark:bg-[#020412] border border-[#04044A]/15 dark:border-[#00A4FF]/30 text-xs sm:text-sm text-[#04044A] dark:text-white focus:border-[#00A4FF] focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-base btn-md btn-primary w-full disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? "Sending..." : "Send Email"}</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}