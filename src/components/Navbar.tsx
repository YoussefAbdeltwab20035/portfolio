"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { DEFAULT_SITE_PROFILE, SiteProfileData } from "@/lib/siteDefaults";

const emptySubscribe = () => () => {};

interface NavbarProps {
  profile?: SiteProfileData;
}

function BrandMonogram({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M22 3L38 12.2V31.8L22 41L6 31.8V12.2L22 3Z"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 14.5L22 22.5M29.5 14.5L22 22.5M22 22.5V33"
        stroke="#00A4FF"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 27.5H28.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar({ profile = DEFAULT_SITE_PROFILE }: NavbarProps) {
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
      setScrolled(window.scrollY > 30);

      if (window.scrollY < 150) {
        setActiveSection("home");
        return;
      }

      const sections = ["about", "experience", "projects", "contact"];
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
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-200 ${
          scrolled
            ? "bg-white/95 dark:bg-[#020412]/95 backdrop-blur-xl border-b border-[#04044A]/10 dark:border-[#00A4FF]/20 py-3.5 shadow-md"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Logo (Custom uploaded logo from dashboard OR crisp geometric monogram) */}
          <button
            type="button"
            onPointerDown={(e) => handleNavClick("home", e)}
            aria-label="Go to top"
            className="flex items-center group cursor-pointer shrink-0 bg-transparent border-0 p-0 text-left select-none text-[#04044A] dark:text-white transition-colors"
          >
            {profile.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.logoUrl}
                alt={profile.name}
                className="h-10 w-auto max-w-[140px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <BrandMonogram className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" />
            )}
          </button>

          {/* Desktop Right Links */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onPointerDown={(e) => handleNavClick(item.id, e)}
                    className={`text-xs font-bold tracking-wide transition-colors cursor-pointer bg-transparent border-0 ${
                      scrolled
                        ? isActive
                          ? "text-[#00A4FF]"
                          : "text-[#04044A] dark:text-white/85 hover:text-[#00A4FF]"
                        : isActive
                        ? "text-[#00E7FF]"
                        : "text-white hover:text-[#00E7FF]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Pill CTA Button ("CONTACT ME") */}
            <button
              type="button"
              onPointerDown={(e) => handleNavClick("contact", e)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                scrolled
                  ? "bg-[#04044A] text-white dark:bg-white dark:text-[#020412] hover:bg-[#00A4FF] dark:hover:bg-[#00E7FF]"
                  : "bg-white text-[#04044A] hover:bg-[#00E7FF] hover:text-[#020412]"
              }`}
            >
              Contact Me
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onPointerDown={handleToggleTheme}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-full bg-[#04044A]/90 hover:bg-[#000675] border border-[#00A4FF]/35 flex items-center justify-center text-white shadow-sm cursor-pointer"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-[#00E7FF]" />
              ) : (
                <Moon className="w-4 h-4 text-[#00A4FF]" />
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onPointerDown={handleToggleTheme}
              aria-label="Toggle Theme"
              className="w-9 h-9 rounded-full bg-[#04044A] border border-[#00A4FF]/35 flex items-center justify-center text-white cursor-pointer"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-[#00E7FF]" />
              ) : (
                <Moon className="w-4 h-4 text-[#00A4FF]" />
              )}
            </button>

            <button
              type="button"
              onPointerDown={handleToggleMenu}
              aria-label="Toggle Menu"
              className="w-9 h-9 rounded-full bg-[#04044A] border border-[#00A4FF]/35 flex items-center justify-center text-white cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-[#00E7FF]" />
              ) : (
                <Menu className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 z-[9999] bg-[#04044A] border-b border-[#00A4FF]/25 p-4 shadow-2xl flex flex-col gap-2">
          {[...navItems, { label: "Contact Me", id: "contact" }].map((item) => (
            <button
              key={item.id}
              type="button"
              onPointerDown={(e) => handleNavClick(item.id, e)}
              className="w-full text-left px-4 py-3 rounded-xl text-xs font-bold text-white hover:bg-[#000675] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}