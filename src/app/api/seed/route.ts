import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export async function GET() {
  try {
    // 1. مسح أي داتا قديمة عشان ما تتكررش
    await prisma.project.deleteMany();

    // 2. إدخال المشاريع من ملف portfolioData إلى قاعدة البيانات SQLite
    for (let i = 0; i < PORTFOLIO_DATA.projects.length; i++) {
      const p = PORTFOLIO_DATA.projects[i];
      await prisma.project.create({
        data: {
          title: p.title,
          subtitle: p.subtitle,
          description: p.description,
          longDescription: p.longDescription || null,
          image: p.image,
          techStackRaw: p.techStack.join(", "),
          keyFeaturesRaw: p.keyFeatures ? p.keyFeatures.join(", ") : null,
          githubUrl: p.githubUrl || null,
          liveUrl: p.liveUrl || null,
          index: i,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Projects seeded into SQLite database successfully! 🚀",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}