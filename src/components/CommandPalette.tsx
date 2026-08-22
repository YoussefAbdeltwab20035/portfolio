"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mail,
  FolderGit2,
  User,
  Copy,
  Check,
  Sun,
  Moon,
  Briefcase,
  Laptop,
  ArrowRight,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const { personal, projects } = PORTFOLIO_DATA;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
      });
    }
  }, [isOpen]);

  const toggleTheme = useCallback(() => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const openPalette = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, []);

  const actions = useMemo(() => {
    const list = [
      {
        id: "about",
        category: "Navigation",
        label: "Go to About Section",
        icon: User,
        perform: () => handleNavigate("about"),
      },
      {
        id: "projects",
        category: "Navigation",
        label: "Explore Selected Work",
        icon: FolderGit2,
        perform: () => handleNavigate("projects"),
      },
      {
        id: "experience",
        category: "Navigation",
        label: "View Milestones & Background",
        icon: Briefcase,
        perform: () => handleNavigate("experience"),
      },
      {
        id: "contact",
        category: "Navigation",
        label: "Get in Touch / Contact",
        icon: Mail,
        perform: () => handleNavigate("contact"),
      },
      {
        id: "theme",
        category: "Preferences",
        label: `Switch to ${isDark ? "Light" : "Dark"} Theme`,
        icon: isDark ? Sun : Moon,
        perform: toggleTheme,
      },
      {
        id: "copy-email",
        category: "Quick Actions",
        label: "Copy Email Address",
        icon: Copy,
        perform: () => {
          if (personal.email) {
            navigator.clipboard.writeText(personal.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        },
      },
      {
        id: "github",
        category: "Socials",
        label: "Open GitHub Profile",
        icon: GithubIcon,
        perform: () => {
          if (personal.github) {
            window.open(personal.github, "_blank", "noopener,noreferrer");
          }
        },
      },
    ];

    projects.forEach((proj, idx) => {
      list.push({
        id: `project-${idx}-${proj.title}`,
        category: "Projects",
        label: `Project: ${proj.title}`,
        icon: Laptop,
        perform: () => handleNavigate("projects"),
      });
    });

    return list;
  }, [isDark, toggleTheme, personal, projects, handleNavigate]);

  const filteredActions = useMemo(() => {
    if (!query.trim()) return actions;
    return actions.filter(
      (action) =>
        action.label.toLowerCase().includes(query.toLowerCase()) ||
        action.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, actions]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setQuery("");
            setSelectedIndex(0);
          }
          return !prev;
        });
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        closePalette();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + (filteredActions.length || 1)) % (filteredActions.length || 1)
        );
      } else if (e.key === "Enter" && filteredActions[selectedIndex]) {
        e.preventDefault();
        filteredActions[selectedIndex].perform();
        closePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, closePalette]);

  return (
    <>
      {/* يظهر الزر السفلي فقط على شاشات الديسكتوب (md وأعلى) ويختفي على الهواتف والتابلت لمنع حجب اللمس */}
      <button
        type="button"
        onClick={openPalette}
        className="hidden md:flex fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-[#0B0F17]/90 backdrop-blur-md text-slate-800 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white text-xs font-semibold items-center gap-2 shadow-xl hover:border-slate-400 dark:hover:border-slate-700 transition-all active:scale-95 pointer-events-auto"
      >
        <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
        <span>Search / Commands</span>
        <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 pt-16 sm:pt-4 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePalette}
              className="absolute inset-0 bg-slate-950/60 dark:bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111622] p-4 text-slate-900 dark:text-slate-200 shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3 px-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 font-mono">
                  ESC
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto flex flex-col gap-1 pt-3 px-1">
                {filteredActions.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                    No results found for &quot;{query}&quot;
                  </div>
                ) : (
                  filteredActions.map((action, index) => {
                    const Icon = action.icon;
                    const isSelected = index === selectedIndex;

                    return (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => {
                          action.perform();
                          closePalette();
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center gap-3 p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                          isSelected
                            ? "bg-slate-100 dark:bg-slate-800/80 text-slate-950 dark:text-white"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                        }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg border ${
                            isSelected
                              ? "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-amber-500"
                              : "bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-400"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>

                        <span className="flex-grow">{action.label}</span>

                        {action.id === "copy-email" && copied && (
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Copied
                          </span>
                        )}

                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">
                          {action.category}
                        </span>

                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 ml-1" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 px-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                <div className="flex items-center gap-2">
                  <span>
                    <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      ↑↓
                    </kbd>{" "}
                    navigate
                  </span>
                  <span>
                    <kbd className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      ↵
                    </kbd>{" "}
                    select
                  </span>
                </div>
                <span>{filteredActions.length} Actions</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}