export interface CustomLink {
  id: string;
  label: string;
  url: string;
  iconUrl?: string;
}

export interface ExtraAboutSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
}

export type BuiltinIconKey =
  | "email"
  | "whatsapp"
  | "github"
  | "linkedin"
  | "phone";

export interface SiteProfileData {
  name: string;
  role: string;
  title: string;
  bio: string;
  availability: string;
  experienceSince: string;
  workMode: string;
  location: string;
  phone: string;
  whatsapp: string;
  email: string;
  github: string;
  linkedin: string;
  logoUrl: string;
  heroAvatarUrl: string;
  aboutAvatarUrl: string;
  heroFitMode: "cover" | "contain";
  heroFrameWidth: number;
  heroFrameHeight: number;
  enabledIcons: BuiltinIconKey[];
  aboutHeading: string;
  aboutDescription: string;
  aboutPhilosophy: string;
  vision: string;
  mission: string;
  aboutPortfolio: string;
  extraSections: ExtraAboutSection[];
  customLinks: CustomLink[];
  categories: string[];
  recoveryPhone?: string;
}

export interface ExperienceData {
  id: string;
  role: string;
  organization: string;
  badge: string;
  description: string;
  skills: string[];
}

export const ALL_BUILTIN_ICONS: { key: BuiltinIconKey; label: string }[] = [
  { key: "email", label: "Email (Opens Contact Form)" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "github", label: "GitHub" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "phone", label: "Phone Number" },
];

export const DEFAULT_PROJECT_CATEGORIES: string[] = [
  "Full-Stack",
  "Next.js",
  "MERN Stack",
  "Backend & APIs",
];

export const DEFAULT_SITE_PROFILE: SiteProfileData = {
  name: "Youssef Abdeltwab",
  role: "Full-Stack MERN Web Developer",
  title: "Architecting Scalable MERN & Next.js Web Applications",
  bio: "High-impact Full-Stack Web Developer specializing in MongoDB, Express.js, React, Node.js, Next.js, and TypeScript.",
  availability: "Available for Freelance & Full-Time",
  experienceSince: "MERN & Next.js Specialist",
  workMode: "Remote & On-site",
  location: "Cairo, Egypt",
  phone: "01550386456",
  whatsapp: "https://wa.me/201550386456",
  email: "youssefabdeltawb@gmail.com",
  github: "https://github.com/YoussefAbdeltwab20035",
  linkedin: "https://linkedin.com/in/youssef-abdeltawb-2ba2ba323",
  logoUrl: "",
  heroAvatarUrl: "/photo.png",
  aboutAvatarUrl: "/photo.png",
  heroFitMode: "cover",
  heroFrameWidth: 0,
  heroFrameHeight: 0,
  enabledIcons: ["email", "whatsapp", "github", "linkedin", "phone"],
  aboutHeading:
    "Engineering scalable full-stack products with clean architecture & measurable impact.",
  aboutDescription:
    "I'm Youssef Abdeltwab, a Full-Stack MERN Web Developer specialized in architecting decoupled client-server platforms, high-throughput REST APIs, and ultra-fast Next.js & TypeScript interfaces.",
  aboutPhilosophy:
    "From database schema modeling (PostgreSQL, Prisma, MongoDB Atlas) to production cloud deployments on Vercel and Render, every system is engineered for security, speed, and maintainability.",
  vision:
    "Next.js (App Router), React.js, TypeScript, Tailwind CSS, Framer Motion, Core Web Vitals.",
  mission:
    "Node.js, Express.js, RESTful APIs, JWT / RBAC Security, PostgreSQL, Prisma ORM, MongoDB Atlas.",
  aboutPortfolio:
    "Available for Freelance & Fulltime — Full-Stack MERN & Next.js web applications.",
  extraSections: [],
  customLinks: [],
  categories: DEFAULT_PROJECT_CATEGORIES,
  recoveryPhone: "01550386456",
};

export const DEFAULT_EXPERIENCES: ExperienceData[] = [];