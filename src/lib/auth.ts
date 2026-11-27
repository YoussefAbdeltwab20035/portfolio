import { prisma } from "@/lib/prisma";

const FALLBACK_MASTER_KEY = "Devo";
const FALLBACK_RECOVERY_PIN = "2026";
const FALLBACK_RECOVERY_PHONE = "01550386456";

export function normalizePhone(phone: string): string {
  const digits = (phone || "").replace(/\D/g, "");
  return digits.slice(-10);
}

export async function verifyAdminPasskey(inputKey: string): Promise<boolean> {
  const cleanInput = (inputKey || "").trim();
  if (!cleanInput) return false;

  try {
    const profile = await prisma.siteProfile.findUnique({
      where: { id: "main" },
      select: { adminPasskey: true },
    });

    if (profile?.adminPasskey && profile.adminPasskey.trim() !== "") {
      return cleanInput === profile.adminPasskey.trim();
    }
  } catch {
    // Fallback to env/default if table isn't seeded yet
  }

  const envKey = (process.env.ADMIN_SECRET_KEY || "").replace(/['"]/g, "").trim();
  if (envKey && cleanInput === envKey) return true;

  return cleanInput === FALLBACK_MASTER_KEY;
}

export async function verifyRecoveryCredentials(
  inputPhone: string,
  inputPin: string
): Promise<boolean> {
  const cleanPhone = normalizePhone(inputPhone);
  const cleanPin = (inputPin || "").trim();
  if (!cleanPhone || !cleanPin) return false;

  try {
    const profile = await prisma.siteProfile.findUnique({
      where: { id: "main" },
      select: { recoveryPhone: true, phone: true, recoveryPin: true },
    });

    const expectedPhone = normalizePhone(
      profile?.recoveryPhone || profile?.phone || FALLBACK_RECOVERY_PHONE
    );
    const expectedPin = (profile?.recoveryPin || FALLBACK_RECOVERY_PIN).trim();

    return cleanPhone === expectedPhone && cleanPin === expectedPin;
  } catch {
    return (
      cleanPhone === normalizePhone(FALLBACK_RECOVERY_PHONE) &&
      cleanPin === FALLBACK_RECOVERY_PIN
    );
  }
}