import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

// 1. تعريف Typescript Interface صريح لمنع ظهور أخطاء ESLint
interface RawProjectItem {
  title: string;
  subtitle?: string;
  category?: string;
  description: string;
  longDescription?: string;
  image: string;
  techStack: string[];
  keyFeatures?: string[];
  githubUrl?: string;
  github?: string;
  liveUrl?: string;
  live?: string;
}

export async function GET() {
  try {
    // 2. مسح المشاريع القديمة
    await prisma.project.deleteMany();

    // 3. قراءة البيانات بنوع صريح
    const projectsList = PORTFOLIO_DATA.projects as unknown as RawProjectItem[];

    for (let i = 0; i < projectsList.length; i++) {
      const p = projectsList[i];

      await prisma.project.create({
        data: {
          title: p.title || "Project Title",
          subtitle: p.subtitle || p.category || "Full-Stack Project",
          description: p.description || "",
          longDescription: p.longDescription ?? null,
          image: p.image || "/projects/placeholder.png",
          techStackRaw: Array.isArray(p.techStack) ? p.techStack.join(", ") : "",
          keyFeaturesRaw: Array.isArray(p.keyFeatures)
            ? p.keyFeatures.join(", ")
            : null,
          githubUrl: p.githubUrl || p.github || null,
          liveUrl: p.liveUrl || p.live || null,
          index: i,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Projects seeded into SQLite database successfully! 🚀",
    });
  } catch (error: unknown) {
    console.error("Seed error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}