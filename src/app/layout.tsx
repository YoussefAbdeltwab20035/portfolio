import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import SecretAdminModal from "@/components/SecretAdminModal";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className={`${jakarta.className} font-sans antialiased bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <div className="hidden lg:block pointer-events-none fixed inset-0 z-0 select-none">
            <CursorSpotlight />
          </div>

          {children}

          <SecretAdminModal />
        </ThemeProvider>
      </body>
    </html>
  );
}