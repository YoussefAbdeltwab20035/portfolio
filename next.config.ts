import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1️⃣ تفعيل الضغط الفائق (Gzip/Brotli) لتخفيض حجم البيانات المنقولة
  compress: true,

  // 2️⃣ حماية وأمان: إخفاء هيدر Next.js لتصعيب تتبع تقنيات الموقع
  poweredByHeader: false,

  // 3️⃣ تحسين الصور الفائق + تفعيل الكاش الطويل (1 سنة) لدعم مئات الآلاف من الزوار
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
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

  // 4️⃣ مسح جُمل الـ console.log تلقائياً في النسخة النهائية
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 5️⃣ تسريع شحن مكتبات الأيقونات والأنيميشن (Tree Shaking & Package Optimization)
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // 6️⃣ التحكم في مكان مؤشر أدوات التطوير
  devIndicators: {
    position: "bottom-right",
  },

  // 7️⃣ دمج Security Headers + ترويسات التخزين المؤقت الدائمة (Edge Cache Headers)
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
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2|woff)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;