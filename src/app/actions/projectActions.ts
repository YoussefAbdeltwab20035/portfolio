"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAdminPasskey } from "@/lib/auth";

function sanitizeImagePath(rawImage?: string): string {
  if (!rawImage) return "/wasla.png";
  const trimmed = rawImage.trim();

  const dataIdx = trimmed.indexOf("data:image");
  if (dataIdx !== -1) {
    return trimmed.substring(dataIdx);
  }

  return trimmed;
}

export async function createProjectAction(formData: FormData, secretKey: string) {
  try {
    if (!(await verifyAdminPasskey(secretKey))) {
      return { success: false, error: "Unauthorized: Invalid Secret Passkey." };
    }

    const title = (formData.get("title") as string)?.trim();
    const subtitle =
      (formData.get("subtitle") as string)?.trim() || "Full-Stack Project";
    const description = (formData.get("description") as string)?.trim();
    const longDescription =
      (formData.get("longDescription") as string)?.trim() || undefined;
    const rawImage = (formData.get("image") as string)?.trim();
    const image = sanitizeImagePath(rawImage);
    const techStackRaw = (formData.get("techStackRaw") as string)?.trim();
    const keyFeaturesRaw =
      (formData.get("keyFeaturesRaw") as string)?.trim() || undefined;
    const githubUrl = (formData.get("githubUrl") as string)?.trim() || undefined;
    const liveUrl = (formData.get("liveUrl") as string)?.trim() || undefined;

    if (!title || !description || !techStackRaw) {
      return {
        success: false,
        error: "Title, description, and tech stack tags are required.",
      };
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
        keyFeaturesRaw,
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

export async function updateProjectAction(
  id: string,
  formData: FormData,
  secretKey: string
) {
  try {
    if (!(await verifyAdminPasskey(secretKey))) {
      return { success: false, error: "Unauthorized: Invalid Secret Passkey." };
    }

    const title = (formData.get("title") as string)?.trim();
    const subtitle =
      (formData.get("subtitle") as string)?.trim() || "Full-Stack Project";
    const description = (formData.get("description") as string)?.trim();
    const longDescription =
      (formData.get("longDescription") as string)?.trim() || undefined;
    const rawImage = (formData.get("image") as string)?.trim();
    const techStackRaw = (formData.get("techStackRaw") as string)?.trim();
    const keyFeaturesRaw =
      (formData.get("keyFeaturesRaw") as string)?.trim() || undefined;
    const githubUrl = (formData.get("githubUrl") as string)?.trim() || null;
    const liveUrl = (formData.get("liveUrl") as string)?.trim() || null;

    if (!id || !title || !description || !techStackRaw) {
      return {
        success: false,
        error: "Title, description, and tech stack tags are required.",
      };
    }

    await prisma.project.update({
      where: { id },
      data: {
        title,
        subtitle,
        description,
        ...(longDescription !== undefined ? { longDescription } : {}),
        ...(rawImage ? { image: sanitizeImagePath(rawImage) } : {}),
        techStackRaw,
        ...(keyFeaturesRaw !== undefined ? { keyFeaturesRaw } : {}),
        githubUrl,
        liveUrl,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update project.",
    };
  }
}

export async function deleteProjectAction(id: string, secretKey: string) {
  try {
    if (!(await verifyAdminPasskey(secretKey))) {
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

export async function getAdminProjectsAction(secretKey: string) {
  try {
    if (!(await verifyAdminPasskey(secretKey))) {
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
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch projects from database.",
    };
  }
}