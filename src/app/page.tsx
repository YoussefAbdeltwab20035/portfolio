import { prisma } from "@/lib/prisma";
import { Project } from "@/data/portfolioData";
import {
  getPublicExperiences,
  getPublicSiteProfile,
} from "@/app/actions/siteActions";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import EmailModal from "@/components/EmailModal";

export const dynamic = "force-dynamic";

function normalizeImagePath(raw?: string | null): string {
  if (!raw) return "/wasla.png";
  const trimmed = raw.trim();
  const dataIdx = trimmed.indexOf("data:image");
  if (dataIdx !== -1) return trimmed.substring(dataIdx);
  if (trimmed.startsWith("/") || trimmed.startsWith("http")) return trimmed;
  return `/${trimmed}`;
}

async function getProjects(): Promise<Project[]> {
  try {
    const rawProjects = await prisma.project.findMany({
      orderBy: { index: "asc" },
    });
    if (!rawProjects || rawProjects.length === 0) return [];

    return rawProjects.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      longDescription: p.longDescription ?? undefined,
      image: normalizeImagePath(p.image),
      techStack: p.techStackRaw
        ? p.techStackRaw.split(",").map((s) => s.trim())
        : [],
      keyFeatures: p.keyFeaturesRaw
        ? p.keyFeaturesRaw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : undefined,
      githubUrl: p.githubUrl ?? undefined,
      liveUrl: p.liveUrl ?? undefined,
    }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const [projects, profile, experiences] = await Promise.all([
    getProjects(),
    getPublicSiteProfile(),
    getPublicExperiences(),
  ]);

  return (
    <main className="w-full min-h-screen bg-[#F4F8FF] dark:bg-[#020412] text-[#04044A] dark:text-white overflow-x-hidden">
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Experience experiences={experiences} />
      <Projects initialProjects={projects} categories={profile.categories} />
      <Footer profile={profile} />
      <EmailModal recipientEmail={profile.email} />
    </main>
  );
}