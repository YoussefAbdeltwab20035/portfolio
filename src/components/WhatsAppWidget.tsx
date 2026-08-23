"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Code2, Globe } from "lucide-react";

const WHATSAPP_NUMBER = "201026027170";

const PROJECT_INTENTS = [
  {
    id: "fullstack",
    icon: Globe,
    title: "Custom Web Application",
    text: "مرحباً يوسف! أنا مهتم بتطوير تطبيق ويب مخصص (Full-Stack Web App) وأريد مناقشة التفاصيل معك.",
  },
  {
    id: "saas",
    icon: Code2,
    title: "SaaS / Admin Dashboard",
    text: "أهلاً يوسف، أحتاج إلى بناء منصة SaaS / لوحة تحكم داشبورد مع نظام مصادقة وصلاحيات متقدمة.",
  },
  {
    id: "consultation",
    icon: Sparkles,
    title: "Technical Consultation",
    text: "مرحباً يوسف، أرغب في استشارة هندسية لمراجعة معمارية مشروع ومناقشة تكاليف التنفيذ.",
  },
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (text: string) => {
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[320px] sm:w-[380px] rounded-3xl bg-[#090D17] border border-white/15 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-white pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-3 h-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Youssef Abdeltwab</h4>
                  <p className="text-[11px] font-mono text-emerald-400">Online // Ready to build</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Introductory Prompt */}
            <p className="text-xs text-slate-300 my-4 leading-relaxed bg-white/[0.03] p-3 rounded-2xl border border-white/5">
              مرحباً بك! أنا يوسف عبد التواب، مهندس برمجيات وتطبيقات ويب سحابية. اختر نوع المشروع الذي تحتاجه للبدء مباشرة عبر واتساب:
            </p>

            {/* Quick Intent Options */}
            <div className="space-y-2">
              {PROJECT_INTENTS.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectOption(item.text)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] hover:bg-amber-500/15 active:bg-amber-500/20 border border-white/10 hover:border-amber-500/40 text-left transition-all duration-200 group cursor-pointer"
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-900 border border-white/10 text-amber-400 group-hover:text-amber-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                        {item.title}
                      </span>
                    </div>
                    <Send className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white shadow-[0_10px_30px_rgba(16,185,129,0.4)] border border-emerald-300/30 cursor-pointer pointer-events-auto"
        type="button"
        title="Direct WhatsApp Contact"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-[#090D17]" />
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
}