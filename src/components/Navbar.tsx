"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleTheme = (e: React.PointerEvent) => {
    e.stopPropagation();
    const currentlyDark = document.documentElement.classList.contains("dark");
    const nextTheme = currentlyDark ? "light" : "dark";

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setTheme(nextTheme);
  };

  const handleToggleMenu = (e: React.PointerEvent) => {
    e.stopPropagation();
    setMobileMenuOpen((prev) => !prev);
  };

  const handleNavClick = (id: string, e?: React.PointerEvent) => {
    if (e) e.stopPropagation();
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isDarkMode = mounted ? (resolvedTheme || theme) === "dark" : true;

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Guarantees", id: "faq" },
    { label: "Milestones", id: "experience" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] transition-colors duration-200 ${
          scrolled
            ? "bg-white dark:bg-[#07090E] border-b border-slate-200 dark:border-white/10 py-3 shadow-md"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-[1550px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onPointerDown={(e) => handleNavClick("home", e)}
            aria-label="Go to home"
            className="flex items-center gap-3 group cursor-pointer shrink-0 bg-transparent border-0 p-0 text-left select-none"
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-white/20 bg-slate-900 shadow-sm group-hover:border-amber-500 transition-colors pointer-events-none">
              <Image
                src="/logo.png"
                alt="Logo"
                width={36}
                height={36}
                priority
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-slate-900 dark:text-[#EAE5D9] tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors hidden sm:inline text-sm pointer-events-none">
              {personal.name}
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-black/60 px-2 py-1 rounded-full border border-slate-200 dark:border-white/15 shadow-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onPointerDown={(e) => handleNavClick(item.id, e)}
                  aria-label={`Navigate to ${item.label}`}
                  className={`relative px-4 py-1.5 text-xs font-semibold transition-colors duration-150 rounded-full cursor-pointer select-none border-0 ${
                    isActive
                      ? "text-slate-900 dark:text-[#0A0D14] bg-white dark:bg-[#EAE5D9] shadow-sm"
                      : "text-slate-600 hover:text-slate-950 dark:text-[#D8D3C8]/70 dark:hover:text-white bg-transparent"
                  }`}
                >
                  <span className="pointer-events-none">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Button */}
            <button
              type="button"
              onPointerDown={handleToggleTheme}
              aria-label="Toggle Theme"
              className="w-10 h-10 rounded-full bg-slate-200 dark:bg-[#151921] hover:bg-slate-300 dark:hover:bg-[#1E232E] border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-800 dark:text-[#D8D3C8] shadow-sm cursor-pointer select-none"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400 pointer-events-none" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 pointer-events-none" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onPointerDown={handleToggleMenu}
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              className="md:hidden w-10 h-10 rounded-full bg-slate-200 dark:bg-[#151921] hover:bg-slate-300 dark:hover:bg-[#1E232E] border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-800 dark:text-[#D8D3C8] shadow-sm cursor-pointer select-none"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-amber-500 pointer-events-none" />
              ) : (
                <Menu className="w-5 h-5 text-slate-900 dark:text-white pointer-events-none" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[64px] left-0 right-0 z-[9999] bg-white dark:bg-[#07090E] border-b border-slate-200 dark:border-white/10 p-4 shadow-2xl flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onPointerDown={(e) => handleNavClick(item.id, e)}
                aria-label={`Navigate to ${item.label}`}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold transition-colors cursor-pointer select-none border-0 ${
                  isActive
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold"
                    : "text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 bg-transparent"
                }`}
              >
                <span className="pointer-events-none">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}