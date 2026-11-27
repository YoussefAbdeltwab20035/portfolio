"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Upload,
  Images,
  User,
  FileText,
  Briefcase,
  FolderKanban,
  Save,
  Pencil,
  KeyRound,
  Link2,
  Tags,
  Check,
  ImageIcon,
  Layers,
  Maximize2,
  RotateCcw,
} from "lucide-react";
import {
  createProjectAction,
  updateProjectAction,
  deleteProjectAction,
} from "@/app/actions/projectActions";
import {
  getAdminDashboardDataAction,
  updateSiteProfileAction,
  updateAdminSecurityAction,
  resetPasskeyViaRecoveryAction,
  createExperienceAction,
  updateExperienceAction,
  deleteExperienceAction,
} from "@/app/actions/siteActions";
import {
  ALL_BUILTIN_ICONS,
  BuiltinIconKey,
  DEFAULT_SITE_PROFILE,
  ExperienceData,
  SiteProfileData,
} from "@/lib/siteDefaults";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string | null;
  image: string;
  techStackRaw: string;
  keyFeaturesRaw?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
}

type AdminTab = "hero" | "about" | "experience" | "projects" | "security";

interface ConfirmTarget {
  type: "experience" | "project";
  id: string;
  title: string;
}

export default function SecretAdminModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("hero");

  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recPhoneInput, setRecPhoneInput] = useState("");
  const [recPinInput, setRecPinInput] = useState("");
  const [recNewPasskey, setRecNewPasskey] = useState("");

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [profile, setProfile] = useState<SiteProfileData>(DEFAULT_SITE_PROFILE);
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);

  // Custom Links inputs (including custom icon image)
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkIconUrl, setNewLinkIconUrl] = useState("");

  // Extra About Sections inputs
  const [newSecTitle, setNewSecTitle] = useState("");
  const [newSecSubtitle, setNewSecSubtitle] = useState("");
  const [newSecContent, setNewSecContent] = useState("");
  const [editingSecId, setEditingSecId] = useState<string | null>(null);

  // Dynamic Project Categories inputs
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCatIndex, setEditingCatIndex] = useState<number | null>(null);
  const [editingCatValue, setEditingCatValue] = useState("");

  // Security Tab inputs
  const [newMasterPasskey, setNewMasterPasskey] = useState("");
  const [confirmMasterPasskey, setConfirmMasterPasskey] = useState("");
  const [secRecoveryPhone, setSecRecoveryPhone] = useState("");
  const [secNewPin, setSecNewPin] = useState("");

  const [confirmTarget, setConfirmTarget] = useState<ConfirmTarget | null>(null);

  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expRole, setExpRole] = useState("");
  const [expOrg, setExpOrg] = useState("");
  const [expBadge, setExpBadge] = useState("");
  const [expDesc, setExpDesc] = useState("");
  const [expSkills, setExpSkills] = useState("");

  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [projTitle, setProjTitle] = useState("");
  const [projScope, setProjScope] = useState("");
  const [projSubtitle, setProjSubtitle] = useState("");
  const [projYear, setProjYear] = useState("");
  const [projRole, setProjRole] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [projTags, setProjTags] = useState("");
  const [projFeatures, setProjFeatures] = useState("");
  const [projGithubUrl, setProjGithubUrl] = useState("");
  const [projLiveUrl, setProjLiveUrl] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [compressing, setCompressing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const trackpadBoxRef = useRef<HTMLDivElement | null>(null);

  const loadAllData = useCallback(async (key: string) => {
    setLoading(true);
    const res = await getAdminDashboardDataAction(key);
    if (res.success) {
      setProjects(res.projects || []);
      if (res.profile) {
        setProfile(res.profile);
        setSecRecoveryPhone(res.profile.recoveryPhone || res.profile.phone || "");
      }
      setExperiences(res.experiences || []);
      setIsUnlocked(true);
      setIsRecoveryMode(false);
      sessionStorage.setItem("admin_key", key);
      setMsg(null);
    } else {
      setIsUnlocked(false);
      setMsg({ type: "error", text: res.error || "Authentication failed." });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "M" || e.key === "m")
      ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && confirmTarget) {
        setConfirmTarget(null);
      }
    };
    const handleOpenModal = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-admin-modal", handleOpenModal);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-admin-modal", handleOpenModal);
    };
  }, [confirmTarget]);

  useEffect(() => {
    if (!isOpen) return;
    const saved = sessionStorage.getItem("admin_key");
    if (saved) {
      requestAnimationFrame(() => {
        setSecretKey(saved);
        loadAllData(saved);
      });
    }
  }, [isOpen, loadAllData]);

  useEffect(() => {
    const el = trackpadBoxRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 14 : -14;
      setProfile((prev) => {
        const baseW =
          (prev.heroFrameWidth ?? 0) > 0 ? prev.heroFrameWidth! : 460;
        const baseH =
          (prev.heroFrameHeight ?? 0) > 0 ? prev.heroFrameHeight! : 420;
        return {
          ...prev,
          heroFrameWidth: Math.min(1200, Math.max(150, baseW + delta)),
          heroFrameHeight: Math.min(1100, Math.max(150, baseH + delta)),
        };
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isOpen, isUnlocked, activeTab]);

  const compressImageFile = (
    file: File,
    maxWidth = 1000,
    keepPng = false
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height = Math.round((maxWidth / width) * height);
            width = maxWidth;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(img.src);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(
            keepPng
              ? canvas.toDataURL("image/png")
              : canvas.toDataURL("image/jpeg", 0.78)
          );
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleProfileImageUpload = async (
    field: "logoUrl" | "heroAvatarUrl" | "aboutAvatarUrl",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCompressing(true);
    try {
      const isTransparentType =
        file.type === "image/png" || file.type === "image/webp";
      const maxWidth = field === "logoUrl" ? 400 : 1000;
      const compressed = await compressImageFile(
        file,
        maxWidth,
        isTransparentType
      );
      setProfile((prev) => ({ ...prev, [field]: compressed }));
      setMsg({
        type: "success",
        text: "Image ready! Click Save to publish it live.",
      });
    } catch {
      setMsg({ type: "error", text: "Failed to process image." });
    } finally {
      setCompressing(false);
      e.target.value = "";
    }
  };

  const handleLinkIconUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCompressing(true);
    try {
      const isTransparentType =
        file.type === "image/png" || file.type === "image/webp";
      const compressed = await compressImageFile(file, 160, isTransparentType);
      setNewLinkIconUrl(compressed);
    } catch {
      setMsg({ type: "error", text: "Failed to process link icon." });
    } finally {
      setCompressing(false);
      e.target.value = "";
    }
  };

  const toggleBuiltinIcon = (key: BuiltinIconKey) => {
    const current = profile.enabledIcons || [];
    const next = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key];
    setProfile({ ...profile, enabledIcons: next });
  };

  const startResizeDrag = (
    axis: "x" | "y" | "both",
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW =
      (profile.heroFrameWidth ?? 0) > 0 ? profile.heroFrameWidth! : 460;
    const startH =
      (profile.heroFrameHeight ?? 0) > 0 ? profile.heroFrameHeight! : 420;

    const onMove = (moveEvt: PointerEvent) => {
      const dx = moveEvt.clientX - startX;
      const dy = moveEvt.clientY - startY;
      setProfile((prev) => ({
        ...prev,
        heroFrameWidth:
          axis === "x" || axis === "both"
            ? Math.min(1200, Math.max(150, Math.round(startW + dx * 1.8)))
            : prev.heroFrameWidth,
        heroFrameHeight:
          axis === "y" || axis === "both"
            ? Math.min(1100, Math.max(150, Math.round(startH + dy * 1.8)))
            : prev.heroFrameHeight,
      }));
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const handleCustomDimensionInput = (
    dim: "heroFrameWidth" | "heroFrameHeight",
    rawVal: string
  ) => {
    const parsed = parseInt(rawVal, 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
      setProfile((prev) => ({ ...prev, [dim]: 0 }));
      return;
    }
    const max = dim === "heroFrameWidth" ? 1200 : 1100;
    setProfile((prev) => ({
      ...prev,
      [dim]: Math.min(max, Math.max(100, parsed)),
    }));
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretKey) return;
    loadAllData(secretKey);
  };

  const handleRecoverPasskey = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const res = await resetPasskeyViaRecoveryAction({
      whatsappPhone: recPhoneInput,
      recoveryPin: recPinInput,
      newPasskey: recNewPasskey,
    });

    if (res.success) {
      const updatedKey = recNewPasskey.trim();
      setSecretKey(updatedKey);
      setRecPhoneInput("");
      setRecPinInput("");
      setRecNewPasskey("");
      setIsRecoveryMode(false);
      setMsg({
        type: "success",
        text: "Passkey reset successfully! Unlocking dashboard...",
      });
      await loadAllData(updatedKey);
    } else {
      setMsg({ type: "error", text: res.error || "Recovery failed." });
      setLoading(false);
    }
  };

  const persistProfile = async (
    nextProfile: SiteProfileData,
    successText: string
  ) => {
    setLoading(true);
    setMsg(null);
    const res = await updateSiteProfileAction(nextProfile, secretKey);
    if (res.success) {
      setProfile(nextProfile);
      setMsg({ type: "success", text: successText });
      await loadAllData(secretKey);
    } else {
      setMsg({ type: "error", text: res.error || "Failed to save changes." });
    }
    setLoading(false);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await persistProfile(profile, "Site content & images updated live!");
  };

  const handleAddCustomLink = async () => {
    const label = newLinkLabel.trim();
    let url = newLinkUrl.trim();
    if (!label || !url) {
      setMsg({ type: "error", text: "Please enter both link name and URL." });
      return;
    }
    if (
      !/^https?:\/\//i.test(url) &&
      !url.startsWith("mailto:") &&
      !url.startsWith("tel:")
    ) {
      url = `https://${url}`;
    }

    const updatedLinks = [
      ...(profile.customLinks || []),
      {
        id: `link-${Date.now()}`,
        label,
        url,
        iconUrl: newLinkIconUrl || undefined,
      },
    ];
    setNewLinkLabel("");
    setNewLinkUrl("");
    setNewLinkIconUrl("");
    await persistProfile(
      { ...profile, customLinks: updatedLinks },
      `Added "${label}" button.`
    );
  };

  const handleRemoveCustomLink = async (id: string) => {
    const updatedLinks = (profile.customLinks || []).filter((l) => l.id !== id);
    await persistProfile(
      { ...profile, customLinks: updatedLinks },
      "Link removed."
    );
  };

  // Extra About Sections handlers
  const resetExtraSectionForm = () => {
    setEditingSecId(null);
    setNewSecTitle("");
    setNewSecSubtitle("");
    setNewSecContent("");
  };

  const handleSaveExtraSection = async () => {
    const title = newSecTitle.trim();
    const content = newSecContent.trim();
    if (!title || !content) {
      setMsg({
        type: "error",
        text: "Please enter a title and content for the extra About section.",
      });
      return;
    }

    const current = profile.extraSections || [];
    const updated = editingSecId
      ? current.map((s) =>
          s.id === editingSecId
            ? { ...s, title, subtitle: newSecSubtitle.trim(), content }
            : s
        )
      : [
          ...current,
          {
            id: `sec-${Date.now()}`,
            title,
            subtitle: newSecSubtitle.trim(),
            content,
          },
        ];

    resetExtraSectionForm();
    await persistProfile(
      { ...profile, extraSections: updated },
      editingSecId ? "About section updated!" : "New About section added!"
    );
  };

  const handleDeleteExtraSection = async (id: string) => {
    const updated = (profile.extraSections || []).filter((s) => s.id !== id);
    if (editingSecId === id) resetExtraSectionForm();
    await persistProfile(
      { ...profile, extraSections: updated },
      "About section removed."
    );
  };

  const handleAddCategory = async () => {
    const clean = newCategoryName.trim();
    if (!clean || clean.toLowerCase() === "all") return;
    const exists = (profile.categories || []).some(
      (c) => c.toLowerCase() === clean.toLowerCase()
    );
    if (exists) {
      setMsg({ type: "error", text: `Category "${clean}" already exists.` });
      return;
    }
    const updated = [...(profile.categories || []), clean];
    setNewCategoryName("");
    await persistProfile(
      { ...profile, categories: updated },
      `Category "${clean}" added!`
    );
  };

  const handleSaveCategoryEdit = async (idx: number) => {
    const clean = editingCatValue.trim();
    if (!clean || clean.toLowerCase() === "all") {
      setEditingCatIndex(null);
      return;
    }
    const updated = [...(profile.categories || [])];
    updated[idx] = clean;
    setEditingCatIndex(null);
    setEditingCatValue("");
    await persistProfile(
      { ...profile, categories: updated },
      `Category renamed to "${clean}".`
    );
  };

  const handleDeleteCategory = async (idx: number) => {
    const current = profile.categories || [];
    if (current.length <= 1) {
      setMsg({
        type: "error",
        text: "Keep at least one category filter.",
      });
      return;
    }
    const updated = current.filter((_, i) => i !== idx);
    await persistProfile(
      { ...profile, categories: updated },
      "Category removed."
    );
  };

  const handleUpdateSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (newMasterPasskey && newMasterPasskey !== confirmMasterPasskey) {
      setMsg({
        type: "error",
        text: "New passkey and confirmation do not match.",
      });
      return;
    }

    setLoading(true);
    const res = await updateAdminSecurityAction({
      currentPasskey: secretKey,
      newPasskey: newMasterPasskey || undefined,
      recoveryPhone: secRecoveryPhone || undefined,
      newRecoveryPin: secNewPin || undefined,
    });

    if (res.success) {
      if (newMasterPasskey.trim()) {
        const nextKey = newMasterPasskey.trim();
        setSecretKey(nextKey);
        sessionStorage.setItem("admin_key", nextKey);
      }
      setNewMasterPasskey("");
      setConfirmMasterPasskey("");
      setSecNewPin("");
      setMsg({
        type: "success",
        text: "Security & WhatsApp recovery settings updated!",
      });
    } else {
      setMsg({
        type: "error",
        text: res.error || "Failed to update security settings.",
      });
    }
    setLoading(false);
  };

  const resetExpForm = () => {
    setEditingExpId(null);
    setExpRole("");
    setExpOrg("");
    setExpBadge("");
    setExpDesc("");
    setExpSkills("");
  };

  const handleStartEditExp = (exp: ExperienceData) => {
    setEditingExpId(exp.id);
    setExpRole(exp.role);
    setExpOrg(exp.organization);
    setExpBadge(exp.badge);
    setExpDesc(exp.description);
    setExpSkills(exp.skills.join(", "));
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const fd = new FormData();
    fd.set("role", expRole);
    fd.set("organization", expOrg);
    fd.set("badge", expBadge);
    fd.set("description", expDesc);
    fd.set("skillsRaw", expSkills);

    const res = editingExpId
      ? await updateExperienceAction(editingExpId, fd, secretKey)
      : await createExperienceAction(fd, secretKey);

    if (res.success) {
      setMsg({
        type: "success",
        text: editingExpId ? "Experience updated!" : "New experience added!",
      });
      resetExpForm();
      await loadAllData(secretKey);
    } else {
      setMsg({ type: "error", text: res.error || "Operation failed." });
    }
    setLoading(false);
  };

  const resetProjForm = () => {
    setEditingProjId(null);
    setProjTitle("");
    setProjScope("");
    setProjSubtitle("");
    setProjYear("");
    setProjRole("");
    setProjDescription("");
    setProjTags("");
    setProjFeatures("");
    setProjGithubUrl("");
    setProjLiveUrl("");
    setGalleryImages([]);
  };

  const handleStartEditProject = (p: ProjectItem) => {
    const parts = (p.techStackRaw || "").split("<<<GALLERY_START>>>");
    const parsedTags = parts[0]?.trim() || "";
    const parsedExtra = parts[1]
      ? parts[1]
          .split("<<<IMAGE_SEP>>>")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const allImages = [
      ...(p.image && p.image !== "/projects/placeholder.png" ? [p.image] : []),
      ...parsedExtra,
    ];

    const rawDesc = p.description || "";
    const yearMatch = rawDesc.match(/Year:\s*([^|\n]+)/i);
    const roleMatch = rawDesc.match(/Role:\s*([^|\n]+)/i);
    const scopeMatch = rawDesc.match(/Scope:\s*([^|\n]+)/i);
    const cleanBody = rawDesc
      .replace(/^(?:Location|Year|Role|Scope):\s*[^\n]+\n*/i, "")
      .trim();

    setEditingProjId(p.id);
    setProjTitle(p.title);
    setProjScope(scopeMatch ? scopeMatch[1].trim() : "");
    setProjSubtitle(p.subtitle || "");
    setProjYear(yearMatch ? yearMatch[1].trim() : "");
    setProjRole(roleMatch ? roleMatch[1].trim() : "");
    setProjDescription(cleanBody);
    setProjTags(parsedTags);
    setProjFeatures(p.keyFeaturesRaw || "");
    setProjGithubUrl(p.githubUrl || "");
    setProjLiveUrl(p.liveUrl || "");
    setGalleryImages(allImages);
    setMsg(null);
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setCompressing(true);
    try {
      const compressedList = await Promise.all(
        files.map((file) => compressImageFile(file, 1000, false))
      );
      setGalleryImages((prev) => [...prev, ...compressedList]);
    } catch {
      setMsg({ type: "error", text: "Failed to process one or more images." });
    } finally {
      setCompressing(false);
      e.target.value = "";
    }
  };

  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (compressing) return;

    setLoading(true);
    setMsg(null);

    const metaParts: string[] = [];
    if (projYear.trim()) metaParts.push(`Year: ${projYear.trim()}`);
    if (projRole.trim()) metaParts.push(`Role: ${projRole.trim()}`);
    if (projScope.trim()) metaParts.push(`Scope: ${projScope.trim()}`);

    const cleanBody = projDescription
      .replace(/^(?:Location|Year|Role|Scope):\s*[^\n]+\n*/i, "")
      .trim();

    const packedDescription =
      metaParts.length > 0
        ? `${metaParts.join(" | ")}\n\n${cleanBody}`
        : cleanBody;

    const formData = new FormData();
    formData.set("title", projTitle);
    formData.set("subtitle", projSubtitle);
    formData.set("description", packedDescription);
    formData.set("keyFeaturesRaw", projFeatures);
    formData.set("githubUrl", projGithubUrl.trim());
    formData.set("liveUrl", projLiveUrl.trim());

    const coverImage = galleryImages[0] || "";
    const extraImages = galleryImages.slice(1);
    const baseTags = projTags.trim() || "Full-Stack";

    const packedTechStackRaw =
      extraImages.length > 0
        ? `${baseTags} <<<GALLERY_START>>> ${extraImages.join(" <<<IMAGE_SEP>>> ")}`
        : baseTags;

    if (coverImage) formData.set("image", coverImage);
    formData.set("techStackRaw", packedTechStackRaw);

    const res = editingProjId
      ? await updateProjectAction(editingProjId, formData, secretKey)
      : await createProjectAction(formData, secretKey);

    if (res.success) {
      setMsg({
        type: "success",
        text: editingProjId
          ? "Project updated live!"
          : "Project & gallery published!",
      });
      resetProjForm();
      await loadAllData(secretKey);
    } else {
      setMsg({
        type: "error",
        text: res.error || "Failed to save project.",
      });
    }
    setLoading(false);
  };

  const executeConfirmedDelete = async () => {
    if (!confirmTarget) return;
    const { type, id, title } = confirmTarget;

    setLoading(true);
    const res =
      type === "experience"
        ? await deleteExperienceAction(id, secretKey)
        : await deleteProjectAction(id, secretKey);

    setConfirmTarget(null);

    if (res.success) {
      setMsg({ type: "success", text: `Deleted "${title}".` });
      if (type === "experience" && editingExpId === id) resetExpForm();
      if (type === "project" && editingProjId === id) resetProjForm();
      await loadAllData(secretKey);
    } else {
      setMsg({ type: "error", text: res.error || "Delete failed." });
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-[12px] bg-[var(--bg-page)] border border-[var(--border-default)] text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors";
  const labelClass =
    "block type-eyebrow text-[var(--text-secondary)] mb-1.5";

  const previewScale = 0.36;
  const previewW = Math.round(
    ((profile.heroFrameWidth ?? 0) > 0 ? profile.heroFrameWidth! : 460) *
      previewScale
  );
  const previewH = Math.round(
    ((profile.heroFrameHeight ?? 0) > 0 ? profile.heroFrameHeight! : 420) *
      previewScale
  );

  return (
    <div className="no-print fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-[24px] bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-[0_24px_80px_rgba(0,164,255,0.22)] relative flex flex-col text-[var(--text-primary)]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-default)] bg-[var(--bg-subtle)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[12px] bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--border-default)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                Portfolio Owner Dashboard
              </h3>
              <p className="type-eyebrow text-[var(--text-muted)]">
                Control Branding, Photos, Icons, Sections &amp; Projects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem("admin_key");
                  setIsUnlocked(false);
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-500 dark:text-rose-300 border border-rose-500/25 hover:bg-rose-500/25 transition-colors cursor-pointer"
              >
                Lock
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close dashboard"
              className="w-9 h-9 rounded-full bg-[var(--bg-page)] hover:bg-[var(--bg-sand)] border border-[var(--border-default)] text-[var(--text-primary)] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {!isUnlocked ? (
            <div className="max-w-md mx-auto py-8">
              {!isRecoveryMode ? (
                <>
                  <h2 className="type-h3">Owner authentication</h2>
                  <p className="type-caption mt-1.5 mb-6">
                    Enter your master passkey to manage portfolio content and
                    live database projects.
                  </p>

                  {msg && (
                    <div className="mb-4 p-3 rounded-[12px] bg-rose-500/15 border border-rose-500/30 text-rose-500 dark:text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{msg.text}</span>
                    </div>
                  )}

                  <form onSubmit={handleUnlock} className="space-y-4">
                    <div>
                      <label className={labelClass}>Master Passkey</label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"}
                          value={secretKey}
                          onChange={(e) => setSecretKey(e.target.value)}
                          placeholder="Enter passkey..."
                          className={inputClass}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--accent)]"
                        >
                          {showPass ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-base btn-md btn-primary w-full disabled:opacity-50"
                    >
                      {loading ? "Verifying..." : "Unlock dashboard"}
                    </button>
                  </form>

                  <div className="mt-5 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecoveryMode(true);
                        setMsg(null);
                      }}
                      className="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
                    >
                      Forgot passkey? Reset via WhatsApp number
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="type-h3">Reset Master Passkey</h2>
                  <p className="type-caption mt-1.5 mb-6">
                    Verify your registered WhatsApp number and Recovery PIN to
                    set a new passkey.
                  </p>

                  {msg && (
                    <div
                      className={`mb-4 p-3 rounded-[12px] border text-xs flex items-center gap-2 ${
                        msg.type === "success"
                          ? "bg-[var(--accent-soft)] border-[var(--accent)]/30 text-[var(--accent)]"
                          : "bg-rose-500/15 border-rose-500/30 text-rose-500 dark:text-rose-300"
                      }`}
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{msg.text}</span>
                    </div>
                  )}

                  <form onSubmit={handleRecoverPasskey} className="space-y-4">
                    <div>
                      <label className={labelClass}>
                        Registered WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={recPhoneInput}
                        onChange={(e) => setRecPhoneInput(e.target.value)}
                        placeholder="e.g. 01550386456"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Recovery PIN</label>
                      <input
                        type="password"
                        value={recPinInput}
                        onChange={(e) => setRecPinInput(e.target.value)}
                        placeholder="Enter your secret Recovery PIN"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>New Master Passkey</label>
                      <input
                        type="password"
                        value={recNewPasskey}
                        onChange={(e) => setRecNewPasskey(e.target.value)}
                        placeholder="At least 4 characters..."
                        required
                        className={inputClass}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-base btn-md btn-primary w-full disabled:opacity-50"
                    >
                      {loading ? "Resetting..." : "Reset passkey & unlock"}
                    </button>
                  </form>

                  <div className="mt-5 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecoveryMode(false);
                        setMsg(null);
                      }}
                      className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer"
                    >
                      Back to login
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-default)]">
                {(
                  [
                    { id: "hero", label: "Hero, Photos & Icons", icon: User },
                    { id: "about", label: "About & Sections", icon: FileText },
                    { id: "experience", label: "Experience", icon: Briefcase },
                    { id: "projects", label: "Projects", icon: FolderKanban },
                    { id: "security", label: "Security", icon: KeyRound },
                  ] as const
                ).map((tab) => {
                  const Icon = tab.icon;
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMsg(null);
                      }}
                      className={`flex-1 min-w-[110px] flex items-center justify-center gap-2 px-3 py-2 rounded-full type-chip transition-all cursor-pointer ${
                        active
                          ? "bg-gradient-to-r from-[#00A4FF] to-[#00E7FF] text-[#020412] font-bold shadow-md"
                          : "text-[var(--text-secondary)] hover:text-[var(--accent)]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {msg && (
                <div
                  className={`p-3 rounded-[12px] border text-xs flex items-center gap-2 ${
                    msg.type === "success"
                      ? "bg-[var(--accent-soft)] border-[var(--accent)]/35 text-[var(--accent)]"
                      : "bg-rose-500/15 border-rose-500/30 text-rose-500 dark:text-rose-300"
                  }`}
                >
                  {msg.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{msg.text}</span>
                </div>
              )}

              {/* TAB 1: HERO, BRANDING PHOTOS, FRAME MODE, TRACKPAD & CUSTOM SIZE, ICONS & CUSTOM LINKS */}
              {activeTab === "hero" && (
                <div className="space-y-6">
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="p-5 rounded-[16px] bg-[var(--bg-subtle)] border border-[var(--border-default)] space-y-4">
                      <div>
                        <h4 className="type-h4 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-[var(--accent)]" />
                          <span>Site Logo, Photos &amp; Hero Frame</span>
                        </h4>
                        <p className="type-caption">
                          Upload logo or photos and choose how the Hero image
                          frame fits your photo.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-3.5 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-default)] flex flex-col items-center gap-3 text-center">
                          <span className="type-eyebrow">Navbar Logo</span>
                          <div className="w-16 h-16 rounded-xl bg-[#04044A] border border-[#00A4FF]/30 flex items-center justify-center overflow-hidden p-2">
                            {profile.logoUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={profile.logoUrl}
                                alt="Logo Preview"
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <span className="text-xs font-mono text-[#00E7FF]">
                                SVG Default
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <label className="px-3 py-1.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-semibold cursor-pointer inline-flex items-center gap-1">
                              <Upload className="w-3 h-3" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleProfileImageUpload("logoUrl", e)
                                }
                                className="hidden"
                              />
                            </label>
                            {profile.logoUrl && (
                              <button
                                type="button"
                                onClick={() =>
                                  setProfile({ ...profile, logoUrl: "" })
                                }
                                className="px-2.5 py-1.5 rounded-full bg-rose-500/15 text-rose-400 text-xs font-semibold cursor-pointer"
                              >
                                Reset
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-default)] flex flex-col items-center gap-3 text-center">
                          <span className="type-eyebrow">
                            Hero &amp; Contact Photo
                          </span>
                          <div className="w-16 h-16 rounded-xl bg-[#04044A] border border-[#00A4FF]/30 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={profile.heroAvatarUrl || "/photo.png"}
                              alt="Hero Portrait"
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <label className="px-3 py-1.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-semibold cursor-pointer inline-flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            <span>Change Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleProfileImageUpload("heroAvatarUrl", e)
                              }
                              className="hidden"
                            />
                          </label>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[var(--bg-page)] border border-[var(--border-default)] flex flex-col items-center gap-3 text-center">
                          <span className="type-eyebrow">About Section Photo</span>
                          <div className="w-16 h-16 rounded-xl bg-[#04044A] border border-[#00A4FF]/30 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={profile.aboutAvatarUrl || "/photo.png"}
                              alt="About Portrait"
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <label className="px-3 py-1.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-xs font-semibold cursor-pointer inline-flex items-center gap-1">
                            <Upload className="w-3 h-3" />
                            <span>Change Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleProfileImageUpload("aboutAvatarUrl", e)
                              }
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Hero Frame Fit Mode Selector */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold text-[var(--text-primary)] block">
                            Hero Photo Frame Mode
                          </span>
                          <span className="text-[11px] text-[var(--text-muted)]">
                            Choose &ldquo;Full Frame (Contain)&rdquo; to show the
                            entire image without cropping, or &ldquo;Fill Split
                            (Cover)&rdquo;.
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              setProfile({ ...profile, heroFitMode: "contain" })
                            }
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border cursor-pointer ${
                              profile.heroFitMode === "contain"
                                ? "bg-gradient-to-r from-[#00A4FF] to-[#00E7FF] text-[#020412] border-transparent font-bold"
                                : "bg-[var(--bg-page)] text-[var(--text-secondary)] border-[var(--border-default)]"
                            }`}
                          >
                            Full Frame (Contain)
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setProfile({ ...profile, heroFitMode: "cover" })
                            }
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border cursor-pointer ${
                              profile.heroFitMode !== "contain"
                                ? "bg-gradient-to-r from-[#00A4FF] to-[#00E7FF] text-[#020412] border-transparent font-bold"
                                : "bg-[var(--bg-page)] text-[var(--text-secondary)] border-[var(--border-default)]"
                            }`}
                          >
                            Fill Split (Cover)
                          </button>
                        </div>
                      </div>

                      {/* Interactive Trackpad + Custom Size Resizer Box */}
                      <div className="pt-3 border-t border-[var(--border-default)] space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                              <Maximize2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                              <span>
                                Trackpad &amp; Custom Frame Size (Width &amp;
                                Height)
                              </span>
                            </span>
                            <span className="text-[11px] text-[var(--text-muted)]">
                              Type exact px numbers, drag the handles, or scroll
                              with two fingers on your trackpad (up to 1200×1100).
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full bg-[var(--bg-page)] border border-[var(--border-default)] font-mono text-[11px] text-[var(--accent)]">
                              {(profile.heroFrameWidth ?? 0) > 0 ||
                              (profile.heroFrameHeight ?? 0) > 0
                                ? `${profile.heroFrameWidth || 460}px × ${
                                    profile.heroFrameHeight || 420
                                  }px`
                                : "Auto Size"}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setProfile((prev) => ({
                                  ...prev,
                                  heroFrameWidth: 0,
                                  heroFrameHeight: 0,
                                }))
                              }
                              className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 hover:bg-rose-500 hover:text-white text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Reset</span>
                            </button>
                          </div>
                        </div>

                        {/* Custom Width & Height Numeric Controls */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-[var(--text-muted)] mb-1">
                              Custom Width (px)
                            </label>
                            <input
                              type="number"
                              min={0}
                              max={1200}
                              step={10}
                              value={profile.heroFrameWidth || ""}
                              onChange={(e) =>
                                handleCustomDimensionInput(
                                  "heroFrameWidth",
                                  e.target.value
                                )
                              }
                              placeholder="Auto"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-[var(--text-muted)] mb-1">
                              Custom Height (px)
                            </label>
                            <input
                              type="number"
                              min={0}
                              max={1100}
                              step={10}
                              value={profile.heroFrameHeight || ""}
                              onChange={(e) =>
                                handleCustomDimensionInput(
                                  "heroFrameHeight",
                                  e.target.value
                                )
                              }
                              placeholder="Auto"
                              className={inputClass}
                            />
                          </div>
                          <div className="col-span-2 flex items-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                setProfile((prev) => ({
                                  ...prev,
                                  heroFrameWidth: 720,
                                  heroFrameHeight: 720,
                                }))
                              }
                              className="flex-1 py-2.5 px-3 rounded-[12px] bg-[var(--bg-page)] border border-[var(--border-default)] hover:border-[var(--accent)] text-xs font-semibold text-[var(--text-primary)] cursor-pointer transition-colors"
                            >
                              720 × 720
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setProfile((prev) => ({
                                  ...prev,
                                  heroFrameWidth: 960,
                                  heroFrameHeight: 900,
                                }))
                              }
                              className="flex-1 py-2.5 px-3 rounded-[12px] bg-[var(--bg-page)] border border-[var(--border-default)] hover:border-[var(--accent)] text-xs font-semibold text-[var(--text-primary)] cursor-pointer transition-colors"
                            >
                              960 × 900
                            </button>
                          </div>
                        </div>

                        <div
                          ref={trackpadBoxRef}
                          className="w-full py-5 px-4 rounded-2xl bg-[#020412] border border-[#00A4FF]/25 flex items-center justify-center overflow-hidden select-none overscroll-contain"
                        >
                          <div
                            style={{
                              width: `${previewW}px`,
                              height: `${previewH}px`,
                            }}
                            className="relative rounded-xl border-2 border-[#00E7FF] bg-[#04044A]/60 flex items-center justify-center shadow-[0_10px_30px_rgba(0,231,255,0.2)]"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={profile.heroAvatarUrl || "/photo.png"}
                              alt="Live Frame Preview"
                              className={`w-full h-full pointer-events-none ${
                                profile.heroFitMode === "contain"
                                  ? "object-contain"
                                  : "object-cover object-top"
                              }`}
                            />

                            {/* Right Edge Handle (Width) */}
                            <div
                              onPointerDown={(e) => startResizeDrag("x", e)}
                              title="Drag horizontally for Width"
                              className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-10 rounded-full bg-[#00E7FF] cursor-ew-resize shadow"
                            />

                            {/* Bottom Edge Handle (Height) */}
                            <div
                              onPointerDown={(e) => startResizeDrag("y", e)}
                              title="Drag vertically for Height"
                              className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 h-3 w-10 rounded-full bg-[#00E7FF] cursor-ns-resize shadow"
                            />

                            {/* Bottom-Right Corner Handle (Both) */}
                            <div
                              onPointerDown={(e) => startResizeDrag("both", e)}
                              title="Drag corner for Width & Height"
                              className="absolute right-[-7px] bottom-[-7px] w-4 h-4 rounded-full bg-white border-2 border-[#00E7FF] cursor-nwse-resize shadow-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Full Name</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) =>
                            setProfile({ ...profile, name: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Role / Job Title</label>
                        <input
                          type="text"
                          value={profile.role}
                          onChange={(e) =>
                            setProfile({ ...profile, role: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <input
                          type="text"
                          value={profile.phone}
                          onChange={(e) =>
                            setProfile({ ...profile, phone: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>WhatsApp URL</label>
                        <input
                          type="text"
                          value={profile.whatsapp}
                          onChange={(e) =>
                            setProfile({ ...profile, whatsapp: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Email Address</label>
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>GitHub URL</label>
                        <input
                          type="url"
                          value={profile.github}
                          onChange={(e) =>
                            setProfile({ ...profile, github: e.target.value })
                          }
                          placeholder="https://github.com/..."
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>LinkedIn URL</label>
                        <input
                          type="url"
                          value={profile.linkedin}
                          onChange={(e) =>
                            setProfile({ ...profile, linkedin: e.target.value })
                          }
                          placeholder="https://linkedin.com/in/..."
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Contact Section Subtitle
                        </label>
                        <input
                          type="text"
                          value={profile.aboutPortfolio}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              aboutPortfolio: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="p-5 rounded-[16px] bg-[var(--bg-subtle)] border border-[var(--border-default)] space-y-3">
                      <h4 className="type-h4">
                        Active Contact Icons (Hero &amp; Contact)
                      </h4>
                      <p className="type-caption">
                        Toggle which built-in app icons appear on your Hero and
                        Contact sections.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {ALL_BUILTIN_ICONS.map((item) => {
                          const active = (profile.enabledIcons || []).includes(
                            item.key
                          );
                          return (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => toggleBuiltinIcon(item.key)}
                              className={`px-3.5 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                                active
                                  ? "bg-gradient-to-r from-[#00A4FF] to-[#00E7FF] text-[#020412] border-transparent font-bold"
                                  : "bg-[var(--bg-page)] text-[var(--text-muted)] border-[var(--border-default)]"
                              }`}
                            >
                              {active && <Check className="w-3.5 h-3.5" />}
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={loading || compressing}
                        className="btn-base btn-md btn-primary disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>
                          {loading ? "Saving..." : "Save Hero, Photos & Icons"}
                        </span>
                      </button>
                    </div>
                  </form>

                  {/* Custom App / Social Links Manager with Custom Logo/Icon */}
                  <div className="p-5 rounded-[16px] bg-[var(--bg-subtle)] border border-[var(--border-default)] space-y-4">
                    <div>
                      <h4 className="type-h4 flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-[var(--accent)]" />
                        <span>Custom App &amp; Social Links + Logo</span>
                      </h4>
                      <p className="type-caption">
                        Add Instagram, TikTok, Behance, Upwork, or any link with
                        its own logo/icon image — appears in both Hero and
                        Contact.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <input
                        type="text"
                        value={newLinkLabel}
                        onChange={(e) => setNewLinkLabel(e.target.value)}
                        placeholder="App Name (e.g. Instagram, TikTok)"
                        className={`${inputClass} sm:col-span-3`}
                      />
                      <input
                        type="url"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        placeholder="https://..."
                        className={`${inputClass} sm:col-span-4`}
                      />
                      <label className="sm:col-span-3 h-[42px] px-3 rounded-[12px] bg-[var(--bg-page)] border border-[var(--border-default)] hover:border-[var(--accent)] text-xs text-[var(--text-secondary)] flex items-center justify-between gap-2 cursor-pointer">
                        <span className="truncate">
                          {newLinkIconUrl ? "Icon selected ✓" : "Upload Icon"}
                        </span>
                        {newLinkIconUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={newLinkIconUrl}
                            alt="Icon"
                            className="w-5 h-5 rounded-sm object-contain shrink-0"
                          />
                        ) : (
                          <Upload className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLinkIconUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        disabled={loading || compressing}
                        onClick={handleAddCustomLink}
                        className="btn-base btn-md btn-primary sm:col-span-2 w-full disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>
                    </div>

                    {(profile.customLinks || []).length > 0 && (
                      <div className="space-y-2">
                        {profile.customLinks.map((link) => (
                          <div
                            key={link.id}
                            className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-[12px] bg-[var(--bg-page)] border border-[var(--border-default)]"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              {link.iconUrl && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={link.iconUrl}
                                  alt={link.label}
                                  className="w-6 h-6 rounded object-contain shrink-0"
                                />
                              )}
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] truncate">
                                  {link.label}
                                </p>
                                <p className="text-[11px] text-[var(--text-muted)] truncate">
                                  {link.url}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveCustomLink(link.id)}
                              className="p-2 rounded-[10px] bg-rose-500/15 text-rose-500 dark:text-rose-300 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer shrink-0"
                              title="Remove link"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: ABOUT ME & EXTRA CUSTOM ABOUT SECTIONS */}
              {activeTab === "about" && (
                <div className="space-y-6">
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div>
                      <label className={labelClass}>
                        About Section Heading
                      </label>
                      <input
                        type="text"
                        value={profile.aboutHeading}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            aboutHeading: e.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Main Bio &amp; Experience Summary
                      </label>
                      <textarea
                        rows={3}
                        value={profile.aboutDescription}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            aboutDescription: e.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Architecture &amp; Delivery Approach
                      </label>
                      <textarea
                        rows={3}
                        value={profile.aboutPhilosophy}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            aboutPhilosophy: e.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          Frontend Stack Highlights
                        </label>
                        <textarea
                          rows={3}
                          value={profile.vision}
                          onChange={(e) =>
                            setProfile({ ...profile, vision: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Backend &amp; DB Stack Highlights
                        </label>
                        <textarea
                          rows={3}
                          value={profile.mission}
                          onChange={(e) =>
                            setProfile({ ...profile, mission: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-base btn-md btn-primary disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>
                          {loading ? "Saving..." : "Save About content"}
                        </span>
                      </button>
                    </div>
                  </form>

                  {/* Custom Extra Sections inside About */}
                  <div className="p-5 rounded-[16px] bg-[var(--bg-subtle)] border border-[var(--border-default)] space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="type-h4 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[var(--accent)]" />
                          <span>Custom Extra Sections in About</span>
                        </h4>
                        <p className="type-caption">
                          Add extra blocks or highlights to your About section
                          anytime.
                        </p>
                      </div>
                      {editingSecId && (
                        <button
                          type="button"
                          onClick={resetExtraSectionForm}
                          className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer"
                        >
                          Cancel edit
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newSecTitle}
                        onChange={(e) => setNewSecTitle(e.target.value)}
                        placeholder="Section Title (e.g. System Design) *"
                        className={inputClass}
                      />
                      <input
                        type="text"
                        value={newSecSubtitle}
                        onChange={(e) => setNewSecSubtitle(e.target.value)}
                        placeholder="Tag / Subtitle (optional)"
                        className={inputClass}
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={newSecContent}
                      onChange={(e) => setNewSecContent(e.target.value)}
                      placeholder="Section details *"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleSaveExtraSection}
                      className="btn-base btn-md btn-primary disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                      <span>
                        {editingSecId ? "Update section" : "Add section"}
                      </span>
                    </button>

                    {(profile.extraSections || []).length > 0 && (
                      <div className="space-y-2 pt-2">
                        {profile.extraSections.map((sec) => (
                          <div
                            key={sec.id}
                            className="p-3.5 rounded-[12px] bg-[var(--bg-page)] border border-[var(--border-default)] flex items-start justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                                {sec.title}
                              </p>
                              <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mt-0.5">
                                {sec.content}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingSecId(sec.id);
                                  setNewSecTitle(sec.title);
                                  setNewSecSubtitle(sec.subtitle || "");
                                  setNewSecContent(sec.content);
                                }}
                                className="p-2 rounded-[10px] bg-[var(--bg-subtle)] border border-[var(--border-default)] text-[var(--text-primary)] hover:text-[var(--accent)] cursor-pointer"
                                title="Edit section"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteExtraSection(sec.id)}
                                className="p-2 rounded-[10px] bg-rose-500/15 text-rose-500 dark:text-rose-300 hover:bg-rose-500 hover:text-white cursor-pointer"
                                title="Delete section"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: EXPERIENCE / JOURNEY */}
              {activeTab === "experience" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <form
                    onSubmit={handleSaveExperience}
                    className="space-y-3 p-5 rounded-[16px] bg-[var(--bg-subtle)] border border-[var(--border-default)]"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="type-eyebrow text-[var(--accent)] flex items-center gap-1.5">
                        <Plus className="w-3.5 h-3.5" />
                        <span>
                          {editingExpId
                            ? "Edit Experience"
                            : "Add New Experience"}
                        </span>
                      </h4>
                      {editingExpId && (
                        <button
                          type="button"
                          onClick={resetExpForm}
                          className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer"
                        >
                          Cancel edit
                        </button>
                      )}
                    </div>

                    <input
                      type="text"
                      value={expRole}
                      onChange={(e) => setExpRole(e.target.value)}
                      placeholder="Role / Title (e.g. Full-Stack MERN Developer) *"
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={expOrg}
                      onChange={(e) => setExpOrg(e.target.value)}
                      placeholder="Company / Freelance / University *"
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={expBadge}
                      onChange={(e) => setExpBadge(e.target.value)}
                      placeholder="Period / Badge (e.g. 2024 — Present • Cairo) *"
                      required
                      className={inputClass}
                    />
                    <textarea
                      rows={3}
                      value={expDesc}
                      onChange={(e) => setExpDesc(e.target.value)}
                      placeholder="Description of impact, architecture & deliverables *"
                      required
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={expSkills}
                      onChange={(e) => setExpSkills(e.target.value)}
                      placeholder="Skills (comma-separated, e.g. Next.js, Node.js, Prisma)"
                      className={inputClass}
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-base btn-md btn-primary w-full disabled:opacity-50"
                    >
                      {loading
                        ? "Saving..."
                        : editingExpId
                        ? "Update experience"
                        : "Add experience"}
                    </button>
                  </form>

                  <div className="space-y-3">
                    <h4 className="type-h4">
                      Saved Experiences ({experiences.length})
                    </h4>

                    <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                      {experiences.length === 0 ? (
                        <div className="p-6 text-center text-[var(--text-muted)] text-xs rounded-[16px] border border-dashed border-[var(--border-default)]">
                          No experiences added yet. Use the form on the left to
                          add your first journey milestone.
                        </div>
                      ) : (
                        experiences.map((exp) => (
                          <div
                            key={exp.id}
                            className="p-4 rounded-[16px] bg-[var(--bg-subtle)] border border-[var(--border-default)] flex items-start justify-between gap-3"
                          >
                            <div className="min-w-0">
                              <span className="type-eyebrow text-[var(--accent)] block">
                                {exp.badge}
                              </span>
                              <h5 className="text-sm font-semibold text-[var(--text-primary)] truncate mt-0.5">
                                {exp.role}
                              </h5>
                              <p className="text-xs text-[var(--text-secondary)] truncate">
                                {exp.organization}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleStartEditExp(exp)}
                                className="p-2 rounded-[10px] bg-[var(--bg-page)] border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setConfirmTarget({
                                    type: "experience",
                                    id: exp.id,
                                    title: exp.role,
                                  })
                                }
                                className="p-2 rounded-[10px] bg-rose-500/15 text-rose-500 dark:text-rose-300 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PROJECTS & DYNAMIC FILTER CATEGORIES */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="p-5 rounded-[16px] bg-[var(--bg-subtle)] border border-[var(--border-default)] space-y-4">
                    <div>
                      <h4 className="type-h4 flex items-center gap-2">
                        <Tags className="w-4 h-4 text-[var(--accent)]" />
                        <span>Project Filter Bars</span>
                      </h4>
                      <p className="type-caption">
                        Add, rename, or remove project filter tabs. &ldquo;All&rdquo;
                        stays fixed first.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="type-chip px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#00A4FF] to-[#00E7FF] text-[#020412] font-bold">
                        All (Fixed)
                      </span>
                      {(profile.categories || []).map((cat, idx) => (
                        <div
                          key={`${cat}-${idx}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--bg-page)] border border-[var(--border-default)]"
                        >
                          {editingCatIndex === idx ? (
                            <>
                              <input
                                type="text"
                                value={editingCatValue}
                                onChange={(e) =>
                                  setEditingCatValue(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleSaveCategoryEdit(idx);
                                  }
                                }}
                                className="w-28 bg-transparent text-xs font-semibold text-[var(--text-primary)] focus:outline-none"
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={() => handleSaveCategoryEdit(idx)}
                                className="p-1 text-[var(--accent)] hover:opacity-80 cursor-pointer"
                                title="Save name"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="text-xs font-semibold text-[var(--text-primary)]">
                                {cat}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingCatIndex(idx);
                                  setEditingCatValue(cat);
                                }}
                                className="p-1 text-[var(--text-muted)] hover:text-[var(--accent)] cursor-pointer"
                                title="Rename category"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCategory(idx)}
                                className="p-1 text-[var(--text-muted)] hover:text-rose-500 cursor-pointer"
                                title="Delete category"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCategory();
                          }
                        }}
                        placeholder="New filter tab (e.g. E-Commerce, SaaS, AI)..."
                        className={inputClass}
                      />
                      <button
                        type="button"
                        disabled={loading}
                        onClick={handleAddCategory}
                        className="btn-base btn-md btn-primary shrink-0 disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add filter</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <form
                      onSubmit={handleSaveProject}
                      className="space-y-3.5 p-5 rounded-[16px] bg-[var(--bg-subtle)] border border-[var(--border-default)]"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="type-eyebrow text-[var(--accent)] flex items-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" />
                          <span>
                            {editingProjId
                              ? "Edit Software Project"
                              : "Add New Software Project"}
                          </span>
                        </h4>
                        {editingProjId && (
                          <button
                            type="button"
                            onClick={resetProjForm}
                            className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] cursor-pointer"
                          >
                            Cancel edit
                          </button>
                        )}
                      </div>

                      <div>
                        <label className={labelClass}>
                          Project Title (Shown on Card) *
                        </label>
                        <input
                          type="text"
                          value={projTitle}
                          onChange={(e) => setProjTitle(e.target.value)}
                          placeholder="e.g. Wasla — P2P Currency Platform"
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Case Study Heading (Inside Modal, optional)
                        </label>
                        <input
                          type="text"
                          value={projScope}
                          onChange={(e) => setProjScope(e.target.value)}
                          placeholder="e.g. Real-Time Matching Engine & REST API"
                          className={inputClass}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass}>Category</label>
                          <input
                            type="text"
                            list="project-category-options"
                            value={projSubtitle}
                            onChange={(e) => setProjSubtitle(e.target.value)}
                            placeholder="e.g. Full-Stack"
                            className={inputClass}
                          />
                          <datalist id="project-category-options">
                            {(profile.categories || []).map((cat) => (
                              <option key={cat} value={cat} />
                            ))}
                          </datalist>
                        </div>

                        <div>
                          <label className={labelClass}>Year</label>
                          <input
                            type="text"
                            value={projYear}
                            onChange={(e) => setProjYear(e.target.value)}
                            placeholder="e.g. 2026"
                            className={inputClass}
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className={labelClass}>Role</label>
                          <input
                            type="text"
                            value={projRole}
                            onChange={(e) => setProjRole(e.target.value)}
                            placeholder="e.g. Full-Stack MERN Developer"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Description *</label>
                        <textarea
                          rows={3}
                          value={projDescription}
                          onChange={(e) => setProjDescription(e.target.value)}
                          placeholder="Describe architecture, problem solved, and performance impact..."
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Tech Stack / Tags (comma-separated) *
                        </label>
                        <input
                          type="text"
                          value={projTags}
                          onChange={(e) => setProjTags(e.target.value)}
                          placeholder="e.g. Next.js, TypeScript, Prisma, PostgreSQL, Tailwind CSS"
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Key Highlights (comma-separated, optional)
                        </label>
                        <textarea
                          rows={2}
                          value={projFeatures}
                          onChange={(e) => setProjFeatures(e.target.value)}
                          placeholder="e.g. JWT Auth & RBAC, Real-time Socket.io, Automated CI/CD"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>Project Screenshots</label>
                        <div className="relative flex items-center justify-between w-full h-11 px-3.5 rounded-[12px] bg-[var(--bg-page)] border border-[var(--border-default)] text-xs text-[var(--text-secondary)] hover:border-[var(--accent)] transition cursor-pointer">
                          <div className="flex items-center gap-2 truncate">
                            <Images className="w-4 h-4 text-[var(--accent)] shrink-0" />
                            <span className="truncate">
                              {compressing
                                ? "Optimizing images..."
                                : galleryImages.length > 0
                                ? `${galleryImages.length} image(s) ready`
                                : "Upload Project Screenshots (1 or more)..."}
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImagesChange}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <span className="flex items-center gap-1 bg-[var(--accent-soft)] text-[var(--accent)] px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0">
                            <Upload className="w-3 h-3" />
                            <span>Add</span>
                          </span>
                        </div>
                      </div>

                      {galleryImages.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {galleryImages.map((imgData, idx) => (
                            <div
                              key={idx}
                              className="relative w-12 h-12 rounded-[10px] overflow-hidden border border-[var(--border-default)] group/img"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={imgData}
                                alt={`Preview ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {idx === 0 && (
                                <span className="absolute bottom-0 inset-x-0 bg-[#00A4FF] text-[#020412] text-[8px] font-bold text-center">
                                  Cover
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  setGalleryImages((prev) =>
                                    prev.filter((_, i) => i !== idx)
                                  )
                                }
                                className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/img:opacity-100 cursor-pointer"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass}>
                            GitHub URL (Optional)
                          </label>
                          <input
                            type="text"
                            value={projGithubUrl}
                            onChange={(e) => setProjGithubUrl(e.target.value)}
                            placeholder="Leave blank to hide GitHub button"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>
                            Live Demo URL (Optional)
                          </label>
                          <input
                            type="text"
                            value={projLiveUrl}
                            onChange={(e) => setProjLiveUrl(e.target.value)}
                            placeholder="Leave blank to hide Live Demo button"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading || compressing}
                        className="btn-base btn-md btn-primary w-full disabled:opacity-50"
                      >
                        {loading
                          ? "Saving..."
                          : editingProjId
                          ? "Update project"
                          : "Publish project"}
                      </button>
                    </form>

                    <div className="space-y-3">
                      <h4 className="type-h4">
                        Published Projects ({projects.length})
                      </h4>
                      <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
                        {projects.length === 0 ? (
                          <div className="p-6 text-center text-[var(--text-muted)] text-xs rounded-[16px] border border-dashed border-[var(--border-default)]">
                            No projects published yet. Use the form on the left
                            to publish your first project.
                          </div>
                        ) : (
                          projects.map((p) => {
                            const cleanDesc = (p.description || "")
                              .replace(
                                /^(?:Location|Year|Role|Scope):\s*[^\n]+\n*/i,
                                ""
                              )
                              .trim();
                            return (
                              <div
                                key={p.id}
                                className="p-4 rounded-[16px] bg-[var(--bg-subtle)] border border-[var(--border-default)] flex items-center justify-between gap-3"
                              >
                                <div className="min-w-0">
                                  <h5 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                                    {p.title}
                                  </h5>
                                  <p className="text-xs text-[var(--text-secondary)] line-clamp-1">
                                    {cleanDesc}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => handleStartEditProject(p)}
                                    className="p-2 rounded-[10px] bg-[var(--bg-page)] border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                                    title="Edit"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setConfirmTarget({
                                        type: "project",
                                        id: p.id,
                                        title: p.title,
                                      })
                                    }
                                    className="p-2 rounded-[10px] bg-rose-500/15 text-rose-500 dark:text-rose-300 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SECURITY & WHATSAPP RECOVERY */}
              {activeTab === "security" && (
                <form
                  onSubmit={handleUpdateSecurity}
                  className="max-w-2xl space-y-6"
                >
                  <div className="p-5 rounded-[16px] bg-[var(--bg-subtle)] border border-[var(--border-default)] space-y-4">
                    <div>
                      <h4 className="type-h4">Change Master Passkey</h4>
                      <p className="type-caption">
                        Update the password used to unlock this owner dashboard.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>New Master Passkey</label>
                        <input
                          type="password"
                          value={newMasterPasskey}
                          onChange={(e) => setNewMasterPasskey(e.target.value)}
                          placeholder="Leave blank to keep current"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Confirm New Passkey</label>
                        <input
                          type="password"
                          value={confirmMasterPasskey}
                          onChange={(e) =>
                            setConfirmMasterPasskey(e.target.value)
                          }
                          placeholder="Re-enter new passkey"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-[16px] bg-[var(--bg-subtle)] border border-[var(--border-default)] space-y-4">
                    <div>
                      <h4 className="type-h4">WhatsApp Passkey Recovery</h4>
                      <p className="type-caption">
                        Reset your passkey using your WhatsApp number + Recovery
                        PIN (default PIN:{" "}
                        <span className="font-mono font-semibold text-[var(--accent)]">
                          2026
                        </span>
                        ).
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>
                          Recovery WhatsApp Number
                        </label>
                        <input
                          type="text"
                          value={secRecoveryPhone}
                          onChange={(e) => setSecRecoveryPhone(e.target.value)}
                          placeholder="e.g. 01550386456"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          New Recovery PIN (4+ digits)
                        </label>
                        <input
                          type="password"
                          value={secNewPin}
                          onChange={(e) => setSecNewPin(e.target.value)}
                          placeholder="Leave blank to keep current"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-base btn-md btn-primary disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    <span>
                      {loading ? "Saving..." : "Save security settings"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <AnimatePresence>
          {confirmTarget && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => !loading && setConfirmTarget(null)}
              className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="confirm-delete-title"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 8 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm rounded-[24px] bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-2xl p-6 sm:p-8 text-center flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-500 dark:text-rose-400 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>

                <div>
                  <h4 id="confirm-delete-title" className="type-h4">
                    Delete{" "}
                    {confirmTarget.type === "experience"
                      ? "experience"
                      : "project"}
                    ?
                  </h4>
                  <p className="type-caption mt-2">
                    Are you sure you want to permanently remove{" "}
                    <span className="font-semibold text-[var(--text-primary)]">
                      &ldquo;{confirmTarget.title}&rdquo;
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full pt-2">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setConfirmTarget(null)}
                    className="btn-base btn-md btn-sand w-full disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={executeConfirmedDelete}
                    className="btn-base btn-md w-full bg-rose-600 hover:bg-rose-700 text-white border border-rose-600 disabled:opacity-50"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}