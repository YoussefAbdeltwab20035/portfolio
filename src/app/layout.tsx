import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CommandPalette from "@/components/CommandPalette";
import CursorSpotlight from "@/components/CursorSpotlight";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// 1️⃣ ضبط مقاسات الشاشات لجميع الهواتف والأجهزة اللوحية
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0B0F17",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://youssef-abdeltwab.dev"),
  title: {
    default: "Youssef Abdeltwab — Full-Stack Web Developer",
    template: "%s | Youssef Abdeltwab",
  },
  description:
    "Portfolio of Youssef Abdeltwab, a Full-Stack Web Developer specializing in MERN Stack, Next.js, TypeScript, and modern scalable web architectures.",
  keywords: [
    "Youssef Abdeltwab",
    "Full-Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Backend",
    "TypeScript",
    "Web Developer Portfolio Egypt",
  ],
  authors: [{ name: "Youssef Abdeltwab" }],
  creator: "Youssef Abdeltwab",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youssef-abdeltwab.dev",
    title: "Youssef Abdeltwab — Full-Stack Web Developer",
    description:
      "Engineering high-performance, scalable web applications with MERN Stack and Next.js.",
    siteName: "Youssef Abdeltwab Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Youssef Abdeltwab — Full-Stack Web Developer",
    description:
      "Engineering high-performance, scalable web applications with MERN Stack and Next.js.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/photo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrains.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className={`${jakarta.className} font-sans antialiased overflow-x-hidden bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 selection:bg-amber-500/20 selection:text-amber-500`}>
        <ThemeProvider>
          {/* إخفاء إضاءة الماوس على الموبايل والتابلت وتفعيلها فقط على الشاشات الكبيرة مع حماية اللمس */}
          <div className="hidden lg:block pointer-events-none">
            <CursorSpotlight />
          </div>
          <CommandPalette />
          <div className="relative w-full overflow-x-hidden">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}