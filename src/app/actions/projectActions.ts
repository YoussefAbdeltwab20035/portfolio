"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// كلمة السر الأساسية لضمان عملها بشكل مباشر
const MASTER_KEY = "Devo";

function verifySecret(key: string): boolean {
  if (!key) return false;

  const cleanInput = key.trim();
  const rawEnv = process.env.ADMIN_SECRET_KEY || "";
  const cleanEnv = rawEnv.replace(/['"]/g, "").trim();

  // التحقق إما بمطابقة MASTER_KEY المباشرة أو المتغير القادم من .env
  return cleanInput === MASTER_KEY || (cleanEnv !== "" && cleanInput === cleanEnv);
}

// 1. إضافة مشروع جديد
export async function createProjectAction(formData: FormData, secretKey: string) {
  try {
    if (!verifySecret(secretKey)) {
      return { success: false, error: "Unauthorized: Invalid Secret Passkey." };
    }

    const title = (formData.get("title") as string)?.trim();
    const subtitle = (formData.get("subtitle") as string)?.trim() || "Full-Stack Project";
    const description = (formData.get("description") as string)?.trim();
    const longDescription = (formData.get("longDescription") as string)?.trim() || undefined;
    const image = (formData.get("image") as string)?.trim() || "/placeholder.png";
    const techStackRaw = (formData.get("techStackRaw") as string)?.trim();
    const githubUrl = (formData.get("githubUrl") as string)?.trim() || undefined;
    const liveUrl = (formData.get("liveUrl") as string)?.trim() || undefined;

    if (!title || !description || !techStackRaw) {
      return { success: false, error: "Title, description, and tech stack are required." };
    }

    const count = await prisma.project.count();

    await prisma.project.create({
      data: {
        title,
        subtitle,
        description,
        longDescription,
        image,
        techStackRaw,
        githubUrl,
        liveUrl,
        index: count,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create project.",
    };
  }
}

// 2. حذف مشروع من قاعدة البيانات
export async function deleteProjectAction(id: string, secretKey: string) {
  try {
    if (!verifySecret(secretKey)) {
      return { success: false, error: "Unauthorized: Invalid Secret Passkey." };
    }

    await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete project.",
    };
  }
}

// 3. جلب المشاريع المسجلة
export async function getAdminProjectsAction(secretKey: string) {
  try {
    if (!verifySecret(secretKey)) {
      return { success: false, error: "Unauthorized" };
    }

    const projects = await prisma.project.findMany({
      orderBy: { index: "asc" },
    });

    return { success: true, projects };
  } catch (error) {
    console.error("Prisma Fetch Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch projects from database.",
    };
  }
}