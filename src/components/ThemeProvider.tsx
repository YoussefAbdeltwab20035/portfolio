"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Search, Moon, Sun } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const emptySubscribe = () => () => {};

export default function Navbar() {
  const { personal } = PORTFOLIO_DATA;
  const { theme, setTheme, resolvedTheme } = useTheme();

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (window.scrollY < 120) {
        setActiveSection("home");
        return;
      }

      const sections = ["about", "projects", "faq", "experience", "contact"];
      const scrollPosition = window.scrollY + 200;

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const current = resolvedTheme || theme;
    setTheme(current === "dark" ? "light" : "dark");
  };

  const handleOpenSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(new CustomEvent("open-search-palette"));
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSection(id);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
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
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 pointer-events-auto ${
        scrolled
          ? "bg-white/90 dark:bg-[#07090E]/90 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/[0.08] py-2 sm:py-3 shadow-md"
          : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-[1550px] mx-auto px-3 sm:px-6 flex items-center justify-between gap-2">
        {/* الشعار */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0 pointer-events-auto"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-white/20 bg-slate-900 shadow-sm group-hover:border-amber-500 transition-colors">
            <Image
              src="/logo.png"
              alt="Youssef Logo"
              width={36}
              height={36}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-slate-900 dark:text-[#EAE5D9] tracking-tight text-xs sm:text-sm hidden lg:inline">
            {personal.name}
          </span>
        </a>

        {/* كبسولة التنقل الذكية */}
        <nav className="flex items-center gap-0.5 sm:gap-1 bg-slate-200/70 dark:bg-black/50 backdrop-blur-xl p-1 rounded-full border border-slate-300/80 dark:border-white/15 shadow-sm max-w-full overflow-x-auto no-scrollbar pointer-events-auto">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative px-2.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold transition-all duration-200 rounded-full cursor-pointer whitespace-nowrap select-none ${
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
                      stiffness: 400,
                      damping: 30,
                    }}
                    className="absolute inset-0 bg-white dark:bg-[#EAE5D9] rounded-full shadow-sm -z-10"
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* أزرار التحكم */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 pointer-events-auto">
          {/* زر الليل والنهار */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 dark:bg-black/50 hover:bg-slate-200 dark:hover:bg-black/80 active:scale-90 backdrop-blur-xl border border-slate-300 dark:border-white/15 flex items-center justify-center text-slate-800 dark:text-[#D8D3C8] transition-all shadow-sm cursor-pointer"
          >
            {mounted ? (
              (resolvedTheme || theme) === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )
            ) : (
              <div className="w-4 h-4" />
            )}
          </button>

          {/* زر البحث */}
          <button
            type="button"
            onClick={handleOpenSearch}
            aria-label="Open Search"
            className="w-8 h-8 sm:w-auto sm:px-3.5 sm:py-1.5 rounded-full bg-slate-100 dark:bg-black/50 hover:bg-slate-200 dark:hover:bg-black/80 active:scale-90 backdrop-blur-xl border border-slate-300 dark:border-white/15 flex items-center justify-center gap-2 text-xs font-semibold text-slate-800 dark:text-[#D8D3C8] transition-all shadow-sm cursor-pointer"
          >
            <Search className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-white/10 rounded-full border border-slate-300 dark:border-white/10 font-mono">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
}