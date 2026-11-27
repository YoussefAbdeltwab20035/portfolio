"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { verifyAdminPasskey, verifyRecoveryCredentials } from "@/lib/auth";
import {
  BuiltinIconKey,
  CustomLink,
  DEFAULT_PROJECT_CATEGORIES,
  DEFAULT_SITE_PROFILE,
  ExperienceData,
  ExtraAboutSection,
  SiteProfileData,
} from "@/lib/siteDefaults";

interface ExperienceRow {
  id: string;
  role: string;
  organization: string;
  badge: string;
  description: string;
  skillsRaw: string;
}

function mapExperienceRow(r: ExperienceRow): ExperienceData {
  return {
    id: r.id,
    role: r.role,
    organization: r.organization,
    badge: r.badge,
    description: r.description,
    skills: r.skillsRaw
      ? r.skillsRaw
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [],
  };
}

function safeParseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function mapDbProfile(
  row: Awaited<ReturnType<typeof prisma.siteProfile.findUnique>>
): SiteProfileData {
  if (!row) return DEFAULT_SITE_PROFILE;

  const parsedLinks = safeParseJson<CustomLink[]>(row.customLinksRaw, []);
  const parsedCategories = safeParseJson<string[]>(
    row.categoriesRaw,
    DEFAULT_PROJECT_CATEGORIES
  );
  const parsedIcons = safeParseJson<BuiltinIconKey[]>(
    row.enabledIconsRaw,
    DEFAULT_SITE_PROFILE.enabledIcons
  );
  const parsedExtraSections = safeParseJson<ExtraAboutSection[]>(
    (row as { extraSectionsRaw?: string | null }).extraSectionsRaw,
    []
  );
  const rawFit = (row as { heroFitMode?: string | null }).heroFitMode;
  const heroFitMode: "cover" | "contain" =
    rawFit === "contain" ? "contain" : "cover";

  const rawWidth = Number(
    (row as { heroFrameWidth?: number | null }).heroFrameWidth ?? 0
  );
  const rawHeight = Number(
    (row as { heroFrameHeight?: number | null }).heroFrameHeight ?? 0
  );

  return {
    name: row.name || DEFAULT_SITE_PROFILE.name,
    role: row.role || DEFAULT_SITE_PROFILE.role,
    title: row.title || DEFAULT_SITE_PROFILE.title,
    bio: row.bio || DEFAULT_SITE_PROFILE.bio,
    availability: row.availability || DEFAULT_SITE_PROFILE.availability,
    experienceSince:
      row.experienceSince || DEFAULT_SITE_PROFILE.experienceSince,
    workMode: row.workMode || DEFAULT_SITE_PROFILE.workMode,
    location: row.location || DEFAULT_SITE_PROFILE.location,
    phone: row.phone ?? DEFAULT_SITE_PROFILE.phone,
    whatsapp: row.whatsapp ?? DEFAULT_SITE_PROFILE.whatsapp,
    email: row.email ?? DEFAULT_SITE_PROFILE.email,
    github: row.github ?? DEFAULT_SITE_PROFILE.github,
    linkedin: row.linkedin ?? DEFAULT_SITE_PROFILE.linkedin,
    logoUrl: row.logoUrl ?? "",
    heroAvatarUrl: row.heroAvatarUrl || "/photo.png",
    aboutAvatarUrl: row.aboutAvatarUrl || "/photo.png",
    heroFitMode,
    heroFrameWidth: Number.isFinite(rawWidth) && rawWidth > 0 ? rawWidth : 0,
    heroFrameHeight:
      Number.isFinite(rawHeight) && rawHeight > 0 ? rawHeight : 0,
    enabledIcons: Array.isArray(parsedIcons)
      ? parsedIcons
      : DEFAULT_SITE_PROFILE.enabledIcons,
    aboutHeading: row.aboutHeading || DEFAULT_SITE_PROFILE.aboutHeading,
    aboutDescription:
      row.aboutDescription || DEFAULT_SITE_PROFILE.aboutDescription,
    aboutPhilosophy:
      row.aboutPhilosophy || DEFAULT_SITE_PROFILE.aboutPhilosophy,
    vision: row.vision || DEFAULT_SITE_PROFILE.vision,
    mission: row.mission || DEFAULT_SITE_PROFILE.mission,
    aboutPortfolio: row.aboutPortfolio || DEFAULT_SITE_PROFILE.aboutPortfolio,
    extraSections: Array.isArray(parsedExtraSections) ? parsedExtraSections : [],
    customLinks: Array.isArray(parsedLinks) ? parsedLinks : [],
    categories:
      Array.isArray(parsedCategories) && parsedCategories.length > 0
        ? parsedCategories
        : DEFAULT_PROJECT_CATEGORIES,
    recoveryPhone: row.recoveryPhone || row.phone || DEFAULT_SITE_PROFILE.phone,
  };
}

export async function getPublicSiteProfile(): Promise<SiteProfileData> {
  try {
    const row = await prisma.siteProfile.findUnique({
      where: { id: "main" },
    });
    return mapDbProfile(row);
  } catch {
    return DEFAULT_SITE_PROFILE;
  }
}

export async function getPublicExperiences(): Promise<ExperienceData[]> {
  try {
    const rows = await prisma.experience.findMany({
      orderBy: { index: "asc" },
    });
    if (!rows || rows.length === 0) return [];
    return rows.map(mapExperienceRow);
  } catch {
    return [];
  }
}

export async function getAdminDashboardDataAction(secretKey: string) {
  try {
    if (!(await verifyAdminPasskey(secretKey))) {
      return { success: false, error: "Invalid Master Passkey." };
    }

    const [profileRow, projects, experienceRows] = await Promise.all([
      prisma.siteProfile.findUnique({ where: { id: "main" } }),
      prisma.project.findMany({ orderBy: { index: "asc" } }),
      prisma.experience.findMany({ orderBy: { index: "asc" } }),
    ]);

    const experiences: ExperienceData[] = experienceRows.map(mapExperienceRow);

    return {
      success: true,
      profile: mapDbProfile(profileRow),
      projects,
      experiences,
    };
  } catch (error) {
    console.error("Dashboard load error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to load dashboard data.",
    };
  }
}

export async function updateSiteProfileAction(
  data: SiteProfileData,
  secretKey: string
) {
  try {
    if (!(await verifyAdminPasskey(secretKey))) {
      return { success: false, error: "Unauthorized." };
    }

    const cleanWidth =
      typeof data.heroFrameWidth === "number" &&
      Number.isFinite(data.heroFrameWidth) &&
      data.heroFrameWidth > 0
        ? Math.round(data.heroFrameWidth)
        : 0;

    const cleanHeight =
      typeof data.heroFrameHeight === "number" &&
      Number.isFinite(data.heroFrameHeight) &&
      data.heroFrameHeight > 0
        ? Math.round(data.heroFrameHeight)
        : 0;

    const payload = {
      name: (data.name || "").trim() || DEFAULT_SITE_PROFILE.name,
      role: (data.role || "").trim() || DEFAULT_SITE_PROFILE.role,
      title: (data.title || "").trim() || DEFAULT_SITE_PROFILE.title,
      bio: (data.bio || "").trim() || DEFAULT_SITE_PROFILE.bio,
      availability:
        (data.availability || "").trim() || DEFAULT_SITE_PROFILE.availability,
      experienceSince:
        (data.experienceSince || "").trim() ||
        DEFAULT_SITE_PROFILE.experienceSince,
      workMode: (data.workMode || "").trim() || DEFAULT_SITE_PROFILE.workMode,
      location: (data.location || "").trim() || DEFAULT_SITE_PROFILE.location,
      phone: (data.phone || "").trim(),
      whatsapp: (data.whatsapp || "").trim(),
      email: (data.email || "").trim(),
      github: (data.github || "").trim(),
      linkedin: (data.linkedin || "").trim(),
      logoUrl: (data.logoUrl || "").trim(),
      heroAvatarUrl: (data.heroAvatarUrl || "").trim() || "/photo.png",
      aboutAvatarUrl: (data.aboutAvatarUrl || "").trim() || "/photo.png",
      heroFitMode: data.heroFitMode === "contain" ? "contain" : "cover",
      heroFrameWidth: cleanWidth,
      heroFrameHeight: cleanHeight,
      enabledIconsRaw: JSON.stringify(data.enabledIcons || []),
      aboutHeading:
        (data.aboutHeading || "").trim() || DEFAULT_SITE_PROFILE.aboutHeading,
      aboutDescription:
        (data.aboutDescription || "").trim() ||
        DEFAULT_SITE_PROFILE.aboutDescription,
      aboutPhilosophy:
        (data.aboutPhilosophy || "").trim() ||
        DEFAULT_SITE_PROFILE.aboutPhilosophy,
      vision: (data.vision || "").trim() || DEFAULT_SITE_PROFILE.vision,
      mission: (data.mission || "").trim() || DEFAULT_SITE_PROFILE.mission,
      aboutPortfolio:
        (data.aboutPortfolio || "").trim() ||
        DEFAULT_SITE_PROFILE.aboutPortfolio,
      extraSectionsRaw: JSON.stringify(data.extraSections || []),
      customLinksRaw: JSON.stringify(data.customLinks || []),
      categoriesRaw: JSON.stringify(
        data.categories && data.categories.length > 0
          ? data.categories
          : DEFAULT_PROJECT_CATEGORIES
      ),
    };

    await prisma.siteProfile.upsert({
      where: { id: "main" },
      create: {
        id: "main",
        ...payload,
      },
      update: payload as never,
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Update site profile error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update profile.",
    };
  }
}

export async function updateAdminSecurityAction(params: {
  currentPasskey: string;
  newPasskey?: string;
  recoveryPhone?: string;
  newRecoveryPin?: string;
}) {
  try {
    if (!(await verifyAdminPasskey(params.currentPasskey))) {
      return { success: false, error: "Current passkey is invalid." };
    }

    const newKey = params.newPasskey?.trim();
    const newPhone = params.recoveryPhone?.trim();
    const newPin = params.newRecoveryPin?.trim();

    if (newKey && newKey.length < 4) {
      return {
        success: false,
        error: "New passkey must be at least 4 characters.",
      };
    }

    if (newPin && newPin.length < 4) {
      return {
        success: false,
        error: "Recovery PIN must be at least 4 characters.",
      };
    }

    const existing = await prisma.siteProfile.findUnique({
      where: { id: "main" },
    });

    if (!existing) {
      await prisma.siteProfile.create({
        data: {
          id: "main",
          name: DEFAULT_SITE_PROFILE.name,
          role: DEFAULT_SITE_PROFILE.role,
          title: DEFAULT_SITE_PROFILE.title,
          bio: DEFAULT_SITE_PROFILE.bio,
          availability: DEFAULT_SITE_PROFILE.availability,
          experienceSince: DEFAULT_SITE_PROFILE.experienceSince,
          workMode: DEFAULT_SITE_PROFILE.workMode,
          location: DEFAULT_SITE_PROFILE.location,
          phone: DEFAULT_SITE_PROFILE.phone,
          whatsapp: DEFAULT_SITE_PROFILE.whatsapp,
          email: DEFAULT_SITE_PROFILE.email,
          github: DEFAULT_SITE_PROFILE.github,
          linkedin: DEFAULT_SITE_PROFILE.linkedin,
          logoUrl: DEFAULT_SITE_PROFILE.logoUrl,
          heroAvatarUrl: DEFAULT_SITE_PROFILE.heroAvatarUrl,
          aboutAvatarUrl: DEFAULT_SITE_PROFILE.aboutAvatarUrl,
          enabledIconsRaw: JSON.stringify(DEFAULT_SITE_PROFILE.enabledIcons),
          aboutHeading: DEFAULT_SITE_PROFILE.aboutHeading,
          aboutDescription: DEFAULT_SITE_PROFILE.aboutDescription,
          aboutPhilosophy: DEFAULT_SITE_PROFILE.aboutPhilosophy,
          vision: DEFAULT_SITE_PROFILE.vision,
          mission: DEFAULT_SITE_PROFILE.mission,
          aboutPortfolio: DEFAULT_SITE_PROFILE.aboutPortfolio,
          customLinksRaw: JSON.stringify(DEFAULT_SITE_PROFILE.customLinks),
          categoriesRaw: JSON.stringify(DEFAULT_SITE_PROFILE.categories),
          adminPasskey: newKey || undefined,
          recoveryPhone: newPhone || DEFAULT_SITE_PROFILE.recoveryPhone,
          recoveryPin: newPin || undefined,
        },
      });
    } else {
      await prisma.siteProfile.update({
        where: { id: "main" },
        data: {
          ...(newKey ? { adminPasskey: newKey } : {}),
          ...(newPhone ? { recoveryPhone: newPhone } : {}),
          ...(newPin ? { recoveryPin: newPin } : {}),
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Update security error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update security settings.",
    };
  }
}

export async function resetPasskeyViaRecoveryAction(params: {
  whatsappPhone: string;
  recoveryPin: string;
  newPasskey: string;
}) {
  try {
    const newKey = (params.newPasskey || "").trim();
    if (newKey.length < 4) {
      return {
        success: false,
        error: "New passkey must be at least 4 characters.",
      };
    }

    const valid = await verifyRecoveryCredentials(
      params.whatsappPhone,
      params.recoveryPin
    );
    if (!valid) {
      return {
        success: false,
        error: "WhatsApp number or Recovery PIN does not match.",
      };
    }

    const existing = await prisma.siteProfile.findUnique({
      where: { id: "main" },
    });

    if (!existing) {
      await prisma.siteProfile.create({
        data: {
          id: "main",
          name: DEFAULT_SITE_PROFILE.name,
          role: DEFAULT_SITE_PROFILE.role,
          title: DEFAULT_SITE_PROFILE.title,
          bio: DEFAULT_SITE_PROFILE.bio,
          availability: DEFAULT_SITE_PROFILE.availability,
          experienceSince: DEFAULT_SITE_PROFILE.experienceSince,
          workMode: DEFAULT_SITE_PROFILE.workMode,
          location: DEFAULT_SITE_PROFILE.location,
          phone: DEFAULT_SITE_PROFILE.phone,
          whatsapp: DEFAULT_SITE_PROFILE.whatsapp,
          email: DEFAULT_SITE_PROFILE.email,
          github: DEFAULT_SITE_PROFILE.github,
          linkedin: DEFAULT_SITE_PROFILE.linkedin,
          logoUrl: DEFAULT_SITE_PROFILE.logoUrl,
          heroAvatarUrl: DEFAULT_SITE_PROFILE.heroAvatarUrl,
          aboutAvatarUrl: DEFAULT_SITE_PROFILE.aboutAvatarUrl,
          enabledIconsRaw: JSON.stringify(DEFAULT_SITE_PROFILE.enabledIcons),
          aboutHeading: DEFAULT_SITE_PROFILE.aboutHeading,
          aboutDescription: DEFAULT_SITE_PROFILE.aboutDescription,
          aboutPhilosophy: DEFAULT_SITE_PROFILE.aboutPhilosophy,
          vision: DEFAULT_SITE_PROFILE.vision,
          mission: DEFAULT_SITE_PROFILE.mission,
          aboutPortfolio: DEFAULT_SITE_PROFILE.aboutPortfolio,
          customLinksRaw: JSON.stringify(DEFAULT_SITE_PROFILE.customLinks),
          categoriesRaw: JSON.stringify(DEFAULT_SITE_PROFILE.categories),
          adminPasskey: newKey,
        },
      });
    } else {
      await prisma.siteProfile.update({
        where: { id: "main" },
        data: { adminPasskey: newKey },
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Recovery error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Passkey recovery failed.",
    };
  }
}

export async function createExperienceAction(
  formData: FormData,
  secretKey: string
) {
  try {
    if (!(await verifyAdminPasskey(secretKey))) {
      return { success: false, error: "Unauthorized." };
    }

    const role = (formData.get("role") as string)?.trim();
    const organization = (formData.get("organization") as string)?.trim();
    const badge = (formData.get("badge") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const skillsRaw = (formData.get("skillsRaw") as string)?.trim() || "";

    if (!role || !organization || !badge || !description) {
      return { success: false, error: "All required fields must be filled." };
    }

    const count = await prisma.experience.count();

    await prisma.experience.create({
      data: {
        role,
        organization,
        badge,
        description,
        skillsRaw,
        index: count,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Create experience error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create experience.",
    };
  }
}

export async function updateExperienceAction(
  id: string,
  formData: FormData,
  secretKey: string
) {
  try {
    if (!(await verifyAdminPasskey(secretKey))) {
      return { success: false, error: "Unauthorized." };
    }

    const role = (formData.get("role") as string)?.trim();
    const organization = (formData.get("organization") as string)?.trim();
    const badge = (formData.get("badge") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const skillsRaw = (formData.get("skillsRaw") as string)?.trim() || "";

    if (!id || !role || !organization || !badge || !description) {
      return { success: false, error: "All required fields must be filled." };
    }

    await prisma.experience.update({
      where: { id },
      data: {
        role,
        organization,
        badge,
        description,
        skillsRaw,
      },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Update experience error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update experience.",
    };
  }
}

export async function deleteExperienceAction(id: string, secretKey: string) {
  try {
    if (!(await verifyAdminPasskey(secretKey))) {
      return { success: false, error: "Unauthorized." };
    }

    await prisma.experience.delete({ where: { id } });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete experience error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to delete experience.",
    };
  }
}