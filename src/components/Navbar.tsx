"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, Moon, Sun } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const smoothScrollTo = (targetY: number, duration: number = 800) => {
  if (typeof window === "undefined") return;

  const startY = window.scrollY;
  const difference = targetY - startY;
  const startTime = performance.now();

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);

    window.scrollTo(0, startY + difference * easedProgress);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

export default function Navbar() {
  const { personal } = PORTFOLIO_DATA;
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isDark, setIsDark] = useState(true);

  // Effect موحد لإدارة التمرير ومراقبة الأقسام النشطة
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setScrolled(window.scrollY > 25);

      if (window.scrollY < 150) {
        setActiveSection("home");
        return;
      }

      const sections = ["about", "projects", "faq", "experience", "contact"];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    if (isCurrentlyDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);

    if (id === "home") {
      smoothScrollTo(0);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
      smoothScrollTo(targetY);
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Guarantees", id: "faq" },
    { label: "Milestones", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-[#07090E]/80 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/[0.08] py-3 shadow-md dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1550px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* الشعار والاسم */}
        <motion.a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo(0);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-white/20 bg-slate-900 shadow-sm group-hover:border-amber-500 transition-colors">
            <Image 
              src="/logo.png" 
              alt="Youssef Logo"
              fill
              sizes="36px"
              priority
              className="object-cover" 
            />
          </div>
          <span className="font-bold text-slate-900 dark:text-[#EAE5D9] tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors hidden sm:inline text-sm">
            {personal.name}
          </span>
        </motion.a>

        {/* كبسولة التنقل المركزية */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/90 dark:bg-black/40 backdrop-blur-xl px-2 py-1 rounded-full border border-slate-200 dark:border-white/15 shadow-sm dark:shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-4 py-1.5 text-xs font-semibold transition-all duration-300 rounded-full ${
                  isActive
                    ? "text-slate-900 dark:text-[#0A0D14]"
                    : "text-slate-600 hover:text-slate-950 dark:text-[#D8D3C8]/70 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                    className="absolute inset-0 bg-white dark:bg-[#EAE5D9] rounded-full shadow-md -z-10"
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* أزرار الثيم والبحث */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-black/40 dark:hover:bg-black/70 backdrop-blur-xl border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-700 hover:text-amber-600 dark:text-[#D8D3C8] dark:hover:text-amber-400 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => {
              window.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true })
              );
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-black/40 dark:hover:bg-black/70 backdrop-blur-xl border border-slate-200 dark:border-white/15 text-xs font-semibold text-slate-700 dark:text-[#D8D3C8] transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-white/10 rounded-full border border-slate-300 dark:border-white/10 font-mono text-slate-600 dark:text-[#D8D3C8]/80">
              ⌘K
            </kbd>
          </button>
        </div>

      </div>
    </header>
  );
}