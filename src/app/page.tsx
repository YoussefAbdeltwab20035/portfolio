import { prisma } from "@/lib/prisma";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import FAQ from "@/components/FAQ";
import Workflow from "@/components/Workflow";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

async function getProjects(): Promise<Project[]> {
  try {
    const rawProjects = await prisma.project.findMany({
      orderBy: { index: "asc" },
    });
    if (!rawProjects || rawProjects.length === 0) return PORTFOLIO_DATA.projects;
    return rawProjects.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      longDescription: p.longDescription ?? undefined,
      image: p.image.startsWith("/") ? p.image : `/${p.image}`,
      techStack: p.techStackRaw ? p.techStackRaw.split(",").map((s) => s.trim()) : [],
      keyFeatures: p.keyFeaturesRaw ? p.keyFeaturesRaw.split(",").map((s) => s.trim()) : undefined,
      githubUrl: p.githubUrl ?? undefined,
      liveUrl: p.liveUrl ?? undefined,
    }));
  } catch {
    return PORTFOLIO_DATA.projects;
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="w-full min-h-screen bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects initialProjects={projects} />
      <FAQ />
      <Workflow />
      <Experience />
      <Footer />
    </main>
  );
}