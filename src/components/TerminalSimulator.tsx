"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
}

const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "skills",
  "projects",
  "contact",
  "matrix",
  "theme",
  "banner",
  "clear",
  "sudo",
];

const ASCII_BANNER = `
  __   __                       __ 
  \\ \\ / /___  _  _ ___ ___ ___/ _|
   \\ V / _ \\| || (_-</ -_) -_)  _|
    |_|\\___/ \\_,_/__/\\___\\___|_|  
  Youssef Abdeltwab — Full-Stack Developer
`;

export default function TerminalSimulator() {
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [matrixMode, setMatrixMode] = useState(false);

  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "welcome",
      command: "welcome",
      output: (
        <div className="text-slate-400 space-y-1">
          <p className="text-emerald-400 font-semibold">
            Welcome to Youssef Abdeltwab&apos;s Interactive CLI v2.0.0
          </p>
          <p>
            Press <span className="text-amber-400 font-bold">Tab</span> for auto-complete or type{" "}
            <span className="text-amber-400 font-bold">help</span>. Try <span className="text-emerald-400 font-bold">matrix</span> or <span className="text-cyan-400 font-bold">theme</span>!
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // التمرير داخل الصندوق الداخلي للتيرمنال فقط دون تحريك نافذة المتصفح
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, matrixMode]);

  const handleTerminalClick = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const match = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(input.trim().toLowerCase()));
      if (match) {
        setInput(match);
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const prevIdx = historyIndex - 1;
        setHistoryIndex(prevIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - prevIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCmd = input.trim().toLowerCase();

    if (!trimmedCmd) return;

    setCmdHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let outputNode: React.ReactNode;

    switch (trimmedCmd) {
      case "help":
        outputNode = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div><span className="text-amber-400 font-bold">about</span> - Summary & current role</div>
            <div><span className="text-amber-400 font-bold">skills</span> - Full-stack technical stack</div>
            <div><span className="text-amber-400 font-bold">projects</span> - Selected portfolio work</div>
            <div><span className="text-amber-400 font-bold">contact</span> - Direct links & socials</div>
            <div><span className="text-emerald-400 font-bold">matrix</span> - Toggle Matrix Rain mode</div>
            <div><span className="text-cyan-400 font-bold">theme</span> - Toggle Dark / Light theme</div>
            <div><span className="text-purple-400 font-bold">banner</span> - Show ASCII text banner</div>
            <div><span className="text-amber-400 font-bold">clear</span> - Clear terminal history</div>
          </div>
        );
        break;

      case "about":
        outputNode = (
          <div className="text-slate-300 leading-relaxed text-xs sm:text-sm space-y-1">
            <p className="text-white font-bold">{PORTFOLIO_DATA.personal.name}</p>
            <p className="text-amber-400">{PORTFOLIO_DATA.personal.role || PORTFOLIO_DATA.personal.title}</p>
            <p className="text-slate-400 text-xs">Full-Stack MERN Web Developer specializing in building modern web applications.</p>
          </div>
        );
        break;

      case "matrix":
        setMatrixMode((prev) => !prev);
        outputNode = (
          <p className="text-emerald-400 font-bold text-xs animate-pulse">
            {matrixMode ? "Exiting Matrix mode..." : "Entering Matrix Digital Rain mode... 🟢"}
          </p>
        );
        break;

      case "theme":
        if (typeof window !== "undefined") {
          document.documentElement.classList.toggle("dark");
        }
        outputNode = (
          <p className="text-cyan-400 font-semibold text-xs">
            Switched portfolio appearance theme! 🌗
          </p>
        );
        break;

      case "banner":
        outputNode = (
          <pre className="text-amber-400 font-mono text-[10px] sm:text-xs leading-none overflow-x-auto py-2">
            {ASCII_BANNER}
          </pre>
        );
        break;

      case "skills":
        outputNode = (
          <pre className="text-cyan-400 text-xs overflow-x-auto p-2 bg-slate-950/60 rounded border border-slate-800 font-mono">
            {JSON.stringify(
              PORTFOLIO_DATA.skillCategories.reduce((acc: Record<string, string[]>, cat) => {
                acc[cat.title] = cat.skills;
                return acc;
              }, {}),
              null,
              2
            )}
          </pre>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2">
            {PORTFOLIO_DATA.projects.map((p) => (
              <div key={p.id} className="text-xs border-l-2 border-amber-500 pl-3 py-0.5">
                <p className="font-bold text-slate-100">{p.title} <span className="text-slate-500 font-normal">({p.subtitle})</span></p>
                <p className="text-slate-400 text-[11px]">{p.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-xs">
            <p>📧 Email: <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-amber-400 underline">{PORTFOLIO_DATA.personal.email}</a></p>
            <p>🐙 GitHub: <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PORTFOLIO_DATA.personal.github}</a></p>
            <p>💬 WhatsApp: <a href={PORTFOLIO_DATA.personal.whatsapp} target="_blank" rel="noreferrer" className="text-emerald-400 underline">Chat directly</a></p>
          </div>
        );
        break;

      case "sudo":
        outputNode = (
          <p className="text-rose-400 font-semibold text-xs">
            Permission denied: You are already running in developer guest mode!
          </p>
        );
        break;

      default:
        outputNode = (
          <p className="text-rose-400 text-xs">
            Command not found: <span className="font-bold">{trimmedCmd}</span>. Press <span className="text-amber-400 font-bold">Tab</span> for autocomplete.
          </p>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        command: input.trim(),
        output: outputNode,
      },
    ]);

    setInput("");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16 px-6 max-w-5xl mx-auto"
    >
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full mb-3 border border-amber-500/20">
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>Interactive Developer Console</span>
          <Sparkles className="w-3 h-3 text-amber-400" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore via CLI
        </h2>
      </div>

      <div
        onClick={handleTerminalClick}
        className={`w-full rounded-3xl border shadow-2xl overflow-hidden font-mono text-xs sm:text-sm cursor-text transition-all duration-500 relative ${
          matrixMode
            ? "bg-black border-emerald-500/50 shadow-emerald-500/10"
            : "bg-[#0D1117] border-slate-800 hover:border-slate-700"
        }`}
      >
        <div className="h-10 px-4 bg-[#161B22] border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-slate-500 text-xs font-sans font-medium">
            {matrixMode ? "matrix@system:~" : "youssef@dev-laptop:~"}
          </span>
          <span className="text-[10px] text-slate-600 font-mono">bash 5.2</span>
        </div>

        <div
          ref={terminalBodyRef}
          className="p-4 sm:p-6 space-y-4 max-h-[380px] overflow-y-auto custom-scrollbar relative"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              {item.command !== "welcome" && (
                <div className="flex items-center gap-2 text-slate-300">
                  <span className={matrixMode ? "text-emerald-400 font-bold" : "text-emerald-400 font-bold"}>
                    youssef@dev
                  </span>
                  <span className="text-slate-600">:</span>
                  <span className="text-cyan-400 font-bold">~</span>
                  <span className="text-slate-500">$</span>
                  <span className="text-slate-100 font-semibold">{item.command}</span>
                </div>
              )}
              <div className="pl-2">{item.output}</div>
            </div>
          ))}

          <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-bold">youssef@dev</span>
            <span className="text-slate-600">:</span>
            <span className="text-cyan-400 font-bold">~</span>
            <span className="text-slate-500">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-slate-100 focus:outline-none caret-amber-400 font-mono text-xs sm:text-sm"
              placeholder="type or press Tab..."
              spellCheck={false}
              autoComplete="off"
            />
            <button type="submit" className="text-slate-600 hover:text-slate-400 transition-colors">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </motion.section>
  );
}