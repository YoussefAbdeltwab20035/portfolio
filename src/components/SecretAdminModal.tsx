"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  X, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Upload
} from "lucide-react";
import { 
  createProjectAction, 
  deleteProjectAction, 
  getAdminProjectsAction 
} from "@/app/actions/projectActions";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  techStackRaw: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
}

export default function SecretAdminModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // States لرفع الصورة ومعاينتها
  const [imageValue, setImageValue] = useState("");
  const [imageFileName, setImageFileName] = useState("");

  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const artCardRef = useRef<HTMLDivElement>(null);

  const handleArtMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!artCardRef.current) return;
    const rect = artCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleArtMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlowPos({ x: 50, y: 50 });
  };

  const loadProjects = useCallback(async (key: string) => {
    setLoading(true);
    const res = await getAdminProjectsAction(key);
    if (res.success && res.projects) {
      setProjects(res.projects);
      setIsUnlocked(true);
      sessionStorage.setItem("admin_key", key);
      setMsg(null);
    } else {
      setIsUnlocked(false);
      setMsg({ type: "error", text: res.error || "Authentication failed!" });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "M" || e.key === "m")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    const handleOpenModal = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-admin-modal", handleOpenModal);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-admin-modal", handleOpenModal);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const saved = sessionStorage.getItem("admin_key");
    if (saved) {
      requestAnimationFrame(() => {
        setSecretKey(saved);
        loadProjects(saved);
      });
    }
  }, [isOpen, loadProjects]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretKey) return;
    loadProjects(secretKey);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageValue(reader.result as string);
      };
    }
  };

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // وضع قيمة الصورة المحولة (Base64) أو المسار اليدوي في الـ FormData
    if (imageValue) {
      formData.set("image", imageValue);
    }

    const res = await createProjectAction(formData, secretKey);
    if (res.success) {
      setMsg({ type: "success", text: "Project added to live database!" });
      form.reset();
      setImageValue("");
      setImageFileName("");
      loadProjects(secretKey);
    } else {
      setMsg({ type: "error", text: res.error || "Failed to publish." });
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Permanently remove "${title}"?`)) return;
    setLoading(true);
    const res = await deleteProjectAction(id, secretKey);
    if (res.success) {
      setMsg({ type: "success", text: `Deleted "${title}"!` });
      loadProjects(secretKey);
    } else {
      setMsg({ type: "error", text: res.error || "Delete failed." });
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-[32px] bg-[#0A0E17] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative flex flex-col"
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 z-40 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer shadow-lg"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] h-full overflow-y-auto custom-scrollbar">
          
          {/* الجانب الأيسر */}
          <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-center bg-gradient-to-b from-slate-950/80 to-[#070A12] relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
            <div 
              ref={artCardRef}
              onMouseMove={handleArtMouseMove}
              onMouseLeave={handleArtMouseLeave}
              style={{ perspective: 1000 }}
              className="relative w-full h-[320px] sm:h-[420px] lg:h-full rounded-2xl overflow-hidden cursor-pointer select-none group"
            >
              <motion.div
                animate={{
                  rotateX: rotate.x,
                  rotateY: rotate.y,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl"
              >
                <Image
                  src="/admin-art.jpg"
                  alt="VR Cyberpunk Vision"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.endsWith(".png")) {
                      target.src = "/admin-art.png";
                    }
                  }}
                />

                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(245, 158, 11, 0.25), rgba(6, 182, 212, 0.15) 40%, transparent 70%)`
                  }}
                />

                <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-20 rounded-[100%] border-2 border-cyan-400/40 shadow-[0_0_25px_rgba(6,182,212,0.6)] rotate-[-12deg] pointer-events-none animate-pulse" />
                <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-24 rounded-[100%] border border-orange-500/30 shadow-[0_0_35px_rgba(249,115,22,0.5)] rotate-[-12deg] pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-400 font-semibold mb-2">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Neural Control Node</span>
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    Spatial Management Portal
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Direct access to portfolio dynamic datasets.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* الجانب الأيمن */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-[#0D121F]/90">
            {!isUnlocked ? (
              <div className="max-w-md mx-auto w-full py-4">
                <div className="mb-8">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5 font-medium">
                    Owner authentication required to access database.
                  </p>
                </div>

                {msg && (
                  <motion.div 
                    initial={{ opacity: 0, y: -6 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{msg.text}</span>
                  </motion.div>
                )}

                <form onSubmit={handleUnlock} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Master Passcode
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        value={secretKey}
                        onChange={(e) => setSecretKey(e.target.value)}
                        placeholder="Enter master passkey..."
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#080B11] border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-amber-500/20 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "Authenticating Node..." : "Unlock Dashboard"}
                  </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Protected by Session Protocol</span>
                  <span className="font-mono text-amber-500/80">Active</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Owner Control Deck</h3>
                      <span className="text-[11px] text-slate-400 font-mono">SQLite Live Sync</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      sessionStorage.removeItem("admin_key");
                      setIsUnlocked(false);
                    }}
                    className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-3 py-1.5 rounded-xl bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    Lock Deck
                  </button>
                </div>

                {msg && (
                  <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                    msg.type === "success" 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                      : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                  }`}>
                    {msg.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    <span>{msg.text}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <form onSubmit={handleAddProject} className="space-y-2.5 p-4 rounded-2xl bg-black/40 border border-white/5">
                    <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5 mb-2">
                      <Plus className="w-3.5 h-3.5" /> Add New Project
                    </h4>

                    <input
                      name="title"
                      type="text"
                      placeholder="Project Title *"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:border-amber-500 focus:outline-none"
                    />

                    <input
                      name="subtitle"
                      type="text"
                      placeholder="Subtitle (e.g. Next.js / SaaS)"
                      className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:border-amber-500 focus:outline-none"
                    />

                    <textarea
                      name="description"
                      rows={2}
                      placeholder="Brief Description *"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:border-amber-500 focus:outline-none"
                    />

                    <input
                      name="techStackRaw"
                      type="text"
                      placeholder="Tech Stack (comma separated) *"
                      required
                      className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:border-amber-500 focus:outline-none"
                    />

                    {/* زرار اختيار ورفع الصورة */}
                    <div className="relative flex items-center justify-between w-full h-9 px-3 rounded-xl bg-[#080B11] border border-white/10 text-xs text-slate-400 hover:border-amber-500 transition cursor-pointer">
                      <span className="truncate">
                        {imageFileName ? imageFileName : "Choose Project Image..."}
                      </span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-[10px] font-semibold">
                        <Upload className="w-3 h-3" /> Browse
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        name="liveUrl"
                        type="url"
                        placeholder="Live URL"
                        className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        name="githubUrl"
                        type="url"
                        placeholder="GitHub URL"
                        className="w-full px-3 py-2 rounded-xl bg-[#080B11] border border-white/10 text-xs text-white placeholder:text-slate-600 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? "Adding..." : "Add to Database"}
                    </button>
                  </form>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-300">
                      Live Projects ({projects.length})
                    </h4>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                      {projects.length === 0 ? (
                        <div className="p-6 text-center text-slate-500 text-xs rounded-xl border border-dashed border-white/10">
                          No projects in database yet.
                        </div>
                      ) : (
                        projects.map((p) => (
                          <div
                            key={p.id}
                            className="p-3 rounded-xl bg-[#080B11] border border-white/10 flex items-center justify-between gap-3"
                          >
                            <div className="max-w-[75%]">
                              <h5 className="text-xs font-bold text-white truncate">{p.title}</h5>
                              <p className="text-[10px] text-slate-400 line-clamp-1">{p.description}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDelete(p.id, p.title)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}