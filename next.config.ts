import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1️⃣ حماية وأمان: إخفاء هيدر Next.js لتصعيب تتبع تقنيات الموقع
  poweredByHeader: false,

  // 2️⃣ تحسين الصور (Image Optimization) لدعم صيغ AVIF و WebP الخفيفة جداً
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // 3️⃣ مسح جُمل الـ console.log تلقائياً في النسخة النهائية (Production) لسرعة الأداء
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 4️⃣ تسريع شحن مكتبات الأيقونات والأنيميشن (Tree Shaking & Package Optimization)
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // 5️⃣ التحكم في مكان مؤشر أدوات التطوير (Dev Indicators)
  devIndicators: {
    position: "bottom-right",
  },

  // 6️⃣ إضافة Security Headers لحماية موقعك من هجمات XSS و Clickjacking
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;