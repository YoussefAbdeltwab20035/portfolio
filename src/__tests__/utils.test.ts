import { describe, it, expect } from "vitest";

// دالة فحص الإيميل
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// دالة تجهيز رابط واتساب
export function generateWhatsAppLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

describe("Unit Tests: Utilities & Formatters", () => {
  it("should accurately validate email formats", () => {
    expect(isValidEmail("developer@example.com")).toBe(true);
    expect(isValidEmail("invalid-email")).toBe(false);
    expect(isValidEmail("@missinguser.com")).toBe(false);
  });

  it("should generate properly encoded WhatsApp URL", () => {
    const url = generateWhatsAppLink("201550386456", "مرحباً يوسف");
    expect(url).toContain("https://wa.me/201550386456");
    expect(url).toContain(encodeURIComponent("مرحباً يوسف"));
  });
});