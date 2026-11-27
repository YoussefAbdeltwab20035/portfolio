"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Code2,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { Project, PORTFOLIO_DATA } from "@/data/portfolioData";
import { DEFAULT_PROJECT_CATEGORIES } from "@/lib/siteDefaults";

type ProjectWithOptionalGallery = Project & {
  gallery?: string[];
  keyFeatures?: string[];
  keyFeaturesRaw?: string | null;
};

interface ProjectsProps {
  initialProjects?: ProjectWithOptionalGallery[];
  categories?: string[];
}

function GithubMark({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function Projects({
  initialProjects,
  categories,
}: ProjectsProps) {
  const projectsList: ProjectWithOptionalGallery[] = useMemo(
    () =>
      initialProjects && initialProjects.length > 0
        ? initialProjects
        : (PORTFOLIO_DATA.projects as ProjectWithOptionalGallery[]),
    [initialProjects]
  );

  const categoryTabs = useMemo(() => {
    const base =
      categories && categories.length > 0
        ? categories
            .map((c) => c.trim())
            .filter((c) => c && c.toLowerCase() !== "all")
        : DEFAULT_PROJECT_CATEGORIES;
    return ["All", ...Array.from(new Set(base))];
  }, [categories]);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const modalScrollRef = useRef<HTMLDivElement>(null);

  const effectiveCategory = categoryTabs.includes(activeCategory)
    ? activeCategory
    : "All";

  const cleanImageSrc = useCallback((src?: string): string => {
    if (!src) return "";
    const trimmed = src.trim();
    if (!trimmed) return "";

    const dataIdx = trimmed.indexOf("data:image");
    if (dataIdx !== -1) {
      return trimmed.substring(dataIdx).trim();
    }

    if (
      (trimmed.startsWith("/9j/") || trimmed.startsWith("iVBOR")) &&
      !trimmed.startsWith("/")
    ) {
      return `data:image/jpeg;base64,${trimmed}`;
    }

    if (
      trimmed.startsWith("data:image") ||
      trimmed.startsWith("/") ||
      trimmed.startsWith("http")
    ) {
      return trimmed;
    }

    return "";
  }, []);

  const extractTagsAndExtras = useCallback(
    (techStack?: string[]): { tags: string[]; extraImgs: string[] } => {
      if (!techStack || !Array.isArray(techStack) || techStack.length === 0) {
        return { tags: [], extraImgs: [] };
      }

      const combined = techStack.join(",");
      const tags: string[] = [];
      const extraImgs: string[] = [];

      const startMarker = combined.includes("<<<GALLERY_START>>>")
        ? "<<<GALLERY_START>>>"
        : combined.includes("__GALLERY__:")
        ? "__GALLERY__:"
        : null;

      if (startMarker) {
        const idx = combined.indexOf(startMarker);
        const beforePart = combined.slice(0, idx).trim();
        const afterPart = combined.slice(idx + startMarker.length).trim();

        beforePart
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t && !t.startsWith("data:image") && !t.startsWith("/9j/"))
          .forEach((t) => {
            if (!tags.includes(t)) tags.push(t);
          });

        const sep = afterPart.includes("<<<IMAGE_SEP>>>")
          ? "<<<IMAGE_SEP>>>"
          : afterPart.includes(" ||| ")
          ? " ||| "
          : null;

        if (sep) {
          afterPart.split(sep).forEach((chunk) => {
            const cleaned = cleanImageSrc(chunk);
            if (cleaned && !extraImgs.includes(cleaned)) {
              extraImgs.push(cleaned);
            }
          });
        } else if (afterPart) {
          const matches = afterPart.match(
            /data:image\/[a-zA-Z0-9+.-]+;base64,[A-Za-z0-9+/=]+/g
          );
          if (matches && matches.length > 0) {
            matches.forEach((m) => {
              const cleaned = cleanImageSrc(m);
              if (cleaned && !extraImgs.includes(cleaned)) {
                extraImgs.push(cleaned);
              }
            });
          } else {
            const cleanedSingle = cleanImageSrc(afterPart);
            if (cleanedSingle && !extraImgs.includes(cleanedSingle)) {
              extraImgs.push(cleanedSingle);
            }
          }
        }

        return { tags, extraImgs };
      }

      techStack.forEach((item) => {
        const cleanedImg = cleanImageSrc(item);
        if (cleanedImg && cleanedImg.startsWith("data:image")) {
          if (!extraImgs.includes(cleanedImg)) extraImgs.push(cleanedImg);
        } else if (
          item &&
          !item.includes("data:image") &&
          !item.includes("base64,") &&
          item.length < 60
        ) {
          const cleanTag = item.trim();
          if (cleanTag && !tags.includes(cleanTag)) tags.push(cleanTag);
        }
      });

      return { tags, extraImgs };
    },
    [cleanImageSrc]
  );

  const getProjectImages = useCallback(
    (project: ProjectWithOptionalGallery): string[] => {
      const images: string[] = [];

      const cover = cleanImageSrc(project.image);
      if (cover) {
        images.push(cover);
      }

      const { extraImgs } = extractTagsAndExtras(project.techStack);
      const merged = [...(project.gallery || []), ...extraImgs];

      merged.forEach((img) => {
        const cleaned = cleanImageSrc(img);
        if (cleaned && !images.includes(cleaned)) {
          images.push(cleaned);
        }
      });

      return images.length > 0 ? images : ["/projects/placeholder.png"];
    },
    [cleanImageSrc, extractTagsAndExtras]
  );

  const getProjectFeatures = useCallback(
    (project: ProjectWithOptionalGallery): string[] => {
      if (Array.isArray(project.keyFeatures) && project.keyFeatures.length > 0) {
        return project.keyFeatures;
      }
      if (project.keyFeaturesRaw) {
        return project.keyFeaturesRaw
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean);
      }
      return [];
    },
    []
  );

  const getProjectMeta = useCallback((project: ProjectWithOptionalGallery) => {
    const descText = project.longDescription || project.description || "";
    const yearMatch = descText.match(/Year:\s*([^|\n]+)/i);
    const roleMatch = descText.match(/Role:\s*([^|\n]+)/i);
    const scopeMatch = descText.match(/Scope:\s*([^|\n]+)/i);
    const cleanDescription = descText
      .replace(/^(?:Location|Year|Role|Scope):\s*[^\n]+\n*/i, "")
      .trim();

    return {
      year: yearMatch ? yearMatch[1].trim() : "2026",
      role: roleMatch ? roleMatch[1].trim() : "Full-Stack Developer",
      scope: scopeMatch ? scopeMatch[1].trim() : "",
      cleanDescription,
    };
  }, []);

  const getProjectCategoryLabel = useCallback(
    (project: ProjectWithOptionalGallery): string => {
      const { tags } = extractTagsAndExtras(project.techStack);
      const haystack = `${project.subtitle || ""} ${project.title || ""} ${tags.join(" ")}`.toLowerCase();

      for (const cat of categoryTabs) {
        if (cat === "All") continue;
        if (haystack.includes(cat.toLowerCase())) {
          return cat;
        }
      }

      if (
        haystack.includes("next.js") ||
        haystack.includes("nextjs") ||
        haystack.includes("app router")
      ) {
        return "Next.js";
      }
      if (
        haystack.includes("mern") ||
        haystack.includes("mongodb") ||
        haystack.includes("react")
      ) {
        return "MERN Stack";
      }
      if (
        haystack.includes("api") ||
        haystack.includes("backend") ||
        haystack.includes("express") ||
        haystack.includes("node")
      ) {
        return "Backend & APIs";
      }

      return project.subtitle || "Full-Stack";
    },
    [extractTagsAndExtras, categoryTabs]
  );

  const filteredProjects = useMemo(() => {
    if (effectiveCategory === "All") return projectsList;
    const target = effectiveCategory.toLowerCase();

    return projectsList.filter((project) => {
      const { tags } = extractTagsAndExtras(project.techStack);
      const combined = `${project.subtitle || ""} ${project.title || ""} ${tags.join(" ")}`.toLowerCase();
      return combined.includes(target);
    });
  }, [effectiveCategory, projectsList, extractTagsAndExtras]);

  const selectedProject =
    selectedIndex !== null && filteredProjects[selectedIndex]
      ? filteredProjects[selectedIndex]
      : null;

  const selectedImages = useMemo(
    () => (selectedProject ? getProjectImages(selectedProject) : []),
    [selectedProject, getProjectImages]
  );

  const safeSlideIndex =
    selectedImages.length > 0
      ? Math.min(activeSlideIndex, selectedImages.length - 1)
      : 0;

  const openProjectAt = (idx: number) => {
    setSelectedIndex(idx);
    setActiveSlideIndex(0);
    setLightboxIndex(null);
  };

  const closeProjectView = useCallback(() => {
    setLightboxIndex(null);
    setSelectedIndex(null);
    setActiveSlideIndex(0);
  }, []);

  const goToProject = useCallback(
    (dir: "prev" | "next") => {
      if (selectedIndex === null || filteredProjects.length === 0) return;
      const nextIdx =
        dir === "next"
          ? (selectedIndex + 1) % filteredProjects.length
          : (selectedIndex - 1 + filteredProjects.length) %
            filteredProjects.length;
      setSelectedIndex(nextIdx);
      setActiveSlideIndex(0);
      setLightboxIndex(null);
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [selectedIndex, filteredProjects.length]
  );

  const goToSlide = useCallback(
    (dir: "prev" | "next") => {
      if (selectedImages.length <= 1) return;
      setActiveSlideIndex((prev) =>
        dir === "next"
          ? (prev + 1) % selectedImages.length
          : (prev - 1 + selectedImages.length) % selectedImages.length
      );
    },
    [selectedImages.length]
  );

  const handleSelectThumbnail = (idx: number) => {
    setActiveSlideIndex(idx);
    if (modalScrollRef.current && modalScrollRef.current.scrollTop > 180) {
      modalScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToLightbox = useCallback(
    (dir: "prev" | "next") => {
      if (lightboxIndex === null || selectedImages.length === 0) return;
      setLightboxIndex((prev) => {
        if (prev === null) return 0;
        return dir === "next"
          ? (prev + 1) % selectedImages.length
          : (prev - 1 + selectedImages.length) % selectedImages.length;
      });
    },
    [lightboxIndex, selectedImages.length]
  );

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          closeProjectView();
        }
      } else if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goToLightbox("next");
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          goToLightbox("prev");
        }
      } else {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          goToSlide("next");
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          goToSlide("prev");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedIndex,
    lightboxIndex,
    closeProjectView,
    goToLightbox,
    goToSlide,
  ]);

  const handleInquiryJump = (projectTitle: string) => {
    closeProjectView();
    setTimeout(() => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      const textarea = document.querySelector(
        'textarea[name="message"]'
      ) as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.value = `Hi Youssef, I'd like to discuss building a software project similar to "${projectTitle}".`;
        textarea.focus();
      }
    }, 250);
  };

  const hasValidUrl = (url?: string | null) =>
    Boolean(url && url.trim() !== "" && url.trim() !== "#");

  return (
    <section
      id="projects"
      aria-label="Selected Software Engineering Work"
      className="site-section w-full scroll-mt-20 pointer-events-auto"
    >
      <div className="site-container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6 pb-6 border-b border-[var(--border-default)]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] type-eyebrow mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Software Engineering Work</span>
            </div>
            <h2 className="type-h2">Featured Full-Stack Projects</h2>
          </div>

          <p className="type-body max-w-md">
            Production MERN, Next.js, TypeScript, and REST API platforms—click
            any project to explore screenshots, architecture highlights, GitHub
            source, and live demos.
          </p>
        </div>

        {/* Dynamic Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter projects by stack or category"
          className="no-print flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8"
        >
          {categoryTabs.map((category) => {
            const isActive = effectiveCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`type-chip px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer border focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
                  isActive
                    ? "bg-gradient-to-r from-[#00A4FF] to-[#00E7FF] text-[#020412] font-bold border-transparent shadow-sm"
                    : "bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-default)] hover:border-[var(--accent)]"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Clean 3-Column Project Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-[24px] border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 text-center flex flex-col items-center gap-4">
            <p className="type-body">
              No projects matched &ldquo;{effectiveCategory}&rdquo; yet.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory("All")}
              className="btn-base btn-md btn-primary"
            >
              Show all projects
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map(
                (project: ProjectWithOptionalGallery, index: number) => {
                  const allImgs = getProjectImages(project);
                  const coverSrc = allImgs[0] || "/projects/placeholder.png";
                  const categoryLabel = getProjectCategoryLabel(project);
                  const { cleanDescription } = getProjectMeta(project);
                  const { tags } = extractTagsAndExtras(project.techStack);

                  return (
                    <motion.article
                      key={project.id || `${project.title}-${index}`}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.25 }}
                      onClick={() => openProjectAt(index)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${project.title} project details`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          openProjectAt(index);
                        }
                      }}
                      className="group relative aspect-[16/10] w-full rounded-[16px] overflow-hidden bg-[var(--bg-subtle)] border border-[var(--border-default)] hover:border-[var(--accent)]/60 shadow-sm hover:shadow-[0_18px_45px_rgba(0,164,255,0.2)] cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[var(--accent)] transition-all duration-300"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverSrc}
                        alt={`${project.title} — ${categoryLabel}`}
                        loading="lazy"
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/projects/placeholder.png";
                        }}
                      />

                      {/* Clean In-Card Hover Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020412]/95 via-[#020412]/60 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 sm:p-6">
                        <div className="transform translate-y-0 lg:translate-y-2 lg:group-hover:translate-y-0 transition-transform duration-300">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#00E7FF] mb-1">
                            <Code2 className="w-3 h-3" />
                            <span>{categoryLabel}</span>
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug tracking-tight">
                            {project.title}
                          </h3>
                          <p className="text-xs text-white/85 leading-relaxed mt-1.5 line-clamp-2 font-normal">
                            {cleanDescription || project.description}
                          </p>
                          {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2.5">
                              {tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-medium text-[#CBD9FF]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                }
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Full-Screen Software Project Showcase Modal */}
      <AnimatePresence>
        {selectedProject && selectedIndex !== null && (
          <motion.div
            ref={modalScrollRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="no-print fixed inset-0 z-[100000] bg-[var(--bg-page)] text-[var(--text-primary)] overflow-y-auto pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
          >
            {/* Top Header Bar */}
            <div className="sticky top-0 z-30 bg-[var(--bg-surface)]/95 backdrop-blur-md border-b border-[var(--border-default)] py-4">
              <div className="site-container grid grid-cols-12 items-center gap-3">
                <div className="col-span-3 flex items-center gap-2 min-w-0">
                  <span className="type-eyebrow hidden sm:inline-block px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] truncate">
                    {getProjectCategoryLabel(selectedProject)}
                  </span>
                </div>

                <div className="col-span-6 text-center min-w-0">
                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-[var(--text-primary)] truncate">
                    {selectedProject.title}
                  </h2>
                </div>

                <div className="col-span-3 flex justify-end">
                  <button
                    type="button"
                    onClick={closeProjectView}
                    aria-label="Go back to projects"
                    className="px-4 sm:px-5 py-2 rounded-[10px] border border-[var(--accent)]/60 bg-transparent hover:bg-[var(--accent-soft)] text-[var(--text-primary)] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </div>

            {/* Main Showcase Content */}
            <div className="site-container py-8 lg:py-10">
              <div className="max-w-5xl mx-auto">
                <div className="group relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[16px] overflow-hidden bg-[var(--bg-subtle)] border border-[var(--border-default)] shadow-[0_20px_50px_rgba(0,164,255,0.16)]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${selectedProject.id}-stage-${safeSlideIndex}`}
                      src={selectedImages[safeSlideIndex]}
                      alt={`${selectedProject.title} — Screenshot ${safeSlideIndex + 1}`}
                      initial={{ opacity: 0.25 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.25 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setLightboxIndex(safeSlideIndex)}
                      className="w-full h-full object-cover object-center cursor-zoom-in"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/projects/placeholder.png";
                      }}
                    />
                  </AnimatePresence>

                  {selectedImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => goToSlide("prev")}
                        aria-label="Previous screenshot"
                        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => goToSlide("next")}
                        aria-label="Next screenshot"
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => setLightboxIndex(safeSlideIndex)}
                    aria-label="Expand screenshot fullscreen"
                    className="type-eyebrow absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#00E7FF]" />
                    <span>
                      {safeSlideIndex + 1} / {selectedImages.length}
                    </span>
                  </button>
                </div>

                {selectedImages.length > 1 && (
                  <div
                    role="tablist"
                    aria-label="Project screenshot slides"
                    className="flex items-center justify-center flex-wrap gap-2 mt-6"
                  >
                    {selectedImages.map((_, idx) => {
                      const isCurrent = idx === safeSlideIndex;
                      return (
                        <button
                          key={`dot-${idx}`}
                          type="button"
                          role="tab"
                          aria-selected={isCurrent}
                          aria-label={`View screenshot ${idx + 1}`}
                          onClick={() => setActiveSlideIndex(idx)}
                          className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                            isCurrent
                              ? "w-6 bg-[var(--accent)]"
                              : "w-2.5 bg-[var(--border-default)] hover:bg-[var(--text-muted)]"
                          }`}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {selectedImages.length > 1 && (
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {selectedImages.map((imgUrl, idx) => {
                    const isCurrent = idx === safeSlideIndex;
                    return (
                      <button
                        key={`thumb-${selectedProject.id}-${idx}`}
                        type="button"
                        onClick={() => handleSelectThumbnail(idx)}
                        aria-label={`Select screenshot ${idx + 1}`}
                        className={`relative aspect-[4/3] w-full rounded-[12px] overflow-hidden border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
                          isCurrent
                            ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/40 opacity-100"
                            : "border-[var(--border-default)] opacity-55 hover:opacity-100"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imgUrl}
                          alt={`${selectedProject.title} thumbnail ${idx + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/projects/placeholder.png";
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Project Architecture, Stack & Links */}
              {(() => {
                const meta = getProjectMeta(selectedProject);
                const features = getProjectFeatures(selectedProject);
                const { tags } = extractTagsAndExtras(selectedProject.techStack);

                return (
                  <div className="mt-10 rounded-[24px] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 sm:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-7 flex flex-col gap-4">
                        <span className="type-eyebrow w-max px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                          {selectedProject.subtitle ||
                            getProjectCategoryLabel(selectedProject)}
                        </span>
                        <h3 className="type-h3">
                          {meta.scope || selectedProject.title}
                        </h3>
                        <p className="type-body whitespace-pre-line">
                          {meta.cleanDescription || selectedProject.description}
                        </p>

                        {features.length > 0 && (
                          <div className="pt-2 space-y-2">
                            <span className="type-eyebrow text-[var(--text-secondary)] block">
                              Key Engineering Highlights
                            </span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {features.map((feat, i) => (
                                <li
                                  key={`${feat}-${i}`}
                                  className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-primary)]"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="type-chip px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/25"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="lg:col-span-5 flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-4 rounded-[16px] border border-[var(--border-default)] bg-[var(--bg-subtle)]">
                            <span className="type-eyebrow text-[var(--accent)] block">
                              Stack / Category
                            </span>
                            <span className="type-chip text-[var(--text-primary)] mt-1 block">
                              {getProjectCategoryLabel(selectedProject)}
                            </span>
                          </div>
                          <div className="p-4 rounded-[16px] border border-[var(--border-default)] bg-[var(--bg-subtle)]">
                            <span className="type-eyebrow text-[var(--accent)] block">
                              Year
                            </span>
                            <span className="type-chip text-[var(--text-primary)] mt-1 block">
                              {meta.year}
                            </span>
                          </div>
                          <div className="col-span-2 p-4 rounded-[16px] border border-[var(--border-default)] bg-[var(--bg-subtle)]">
                            <span className="type-eyebrow text-[var(--accent)] block">
                              Role
                            </span>
                            <span className="type-chip text-[var(--text-primary)] mt-1 block">
                              {meta.role}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3">
                          {hasValidUrl(selectedProject.liveUrl) && (
                            <a
                              href={selectedProject.liveUrl!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-base btn-md btn-primary w-full inline-flex items-center justify-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Live Demo</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          )}

                          {hasValidUrl(selectedProject.githubUrl) && (
                            <a
                              href={selectedProject.githubUrl!}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-base btn-md btn-sand w-full inline-flex items-center justify-center gap-2"
                            >
                              <GithubMark className="w-4 h-4" />
                              <span>GitHub Source Code</span>
                              <ArrowUpRight className="w-4 h-4 text-[var(--accent)]" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() =>
                              handleInquiryJump(selectedProject.title)
                            }
                            className="btn-base btn-md btn-ghost border border-[var(--border-default)] hover:border-[var(--accent)] w-full"
                          >
                            Build a similar project
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {filteredProjects.length > 1 && (
                <div className="mt-10 pt-6 border-t border-[var(--border-default)] flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => goToProject("prev")}
                    className="btn-base btn-md btn-ghost"
                  >
                    <ChevronLeft className="w-4 h-4 btn-arrow-left" />
                    <span>Previous project</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => goToProject("next")}
                    className="btn-base btn-md btn-ghost text-[var(--accent)]"
                  >
                    <span>Next project</span>
                    <ChevronRight className="w-4 h-4 btn-arrow-right" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && selectedImages[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxIndex(null)}
            className="no-print fixed inset-0 z-[100001] bg-black/95 flex items-center justify-center p-6 sm:p-8 pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot Lightbox"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="fixed top-6 left-6 right-6 z-20 flex items-center justify-between text-white"
            >
              <span className="type-eyebrow px-4 py-2 rounded-full bg-white/10">
                {lightboxIndex + 1} / {selectedImages.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedImages.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToLightbox("prev");
                }}
                aria-label="Previous screenshot"
                className="fixed left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={selectedImages[lightboxIndex]}
              alt={`Expanded screenshot ${lightboxIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[92vw] object-contain rounded-[16px]"
            />

            {selectedImages.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToLightbox("next");
                }}
                aria-label="Next screenshot"
                className="fixed right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}