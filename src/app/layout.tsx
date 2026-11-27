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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F8FF" },
    { media: "(prefers-color-scheme: dark)", color: "#020412" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://youssef-abdeltwab.vercel.app"),
  title: {
    default: "Youssef Abdeltwab — Full-Stack MERN Web Developer",
    template: "%s | Youssef Abdeltwab",
  },
  description:
    "Portfolio of Youssef Abdeltwab, a Full-Stack MERN Web Developer specializing in Next.js, TypeScript, Node.js, and scalable cloud web architectures.",
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
      <body
        className={`${jakarta.className} font-sans antialiased bg-[#F4F8FF] dark:bg-[#020412] text-[#04044A] dark:text-white overflow-x-hidden`}
      >
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