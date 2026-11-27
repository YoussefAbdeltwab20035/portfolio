"use client";

import { Mail, Phone, ExternalLink } from "lucide-react";
import { DEFAULT_SITE_PROFILE, SiteProfileData } from "@/lib/siteDefaults";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.5a1.62 1.62 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.62-1.63-1.62Z" />
    </svg>
  );
}

function WhatsappIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.09-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8 2.53 1.09 2.53.73 2.99.69.46-.04 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3Z" />
    </svg>
  );
}

interface FooterProps {
  profile?: SiteProfileData;
}

export default function Footer({ profile = DEFAULT_SITE_PROFILE }: FooterProps) {
  const enabled = profile.enabledIcons || [];

  const openEmailModal = () => {
    window.dispatchEvent(new CustomEvent("open-email-modal"));
  };

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const pillClass =
    "px-5 py-2.5 rounded-full bg-white dark:bg-[#04044A] hover:border-[#00A4FF] dark:hover:border-[#00E7FF] border border-[#04044A]/15 dark:border-[#00A4FF]/30 text-[#04044A] dark:text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer";

  return (
    <footer
      id="contact"
      className="relative w-full py-16 sm:py-24 px-4 sm:px-8 bg-[#EAF2FF] dark:bg-[#020412] text-[#04044A] dark:text-white border-t border-[#04044A]/10 dark:border-[#00A4FF]/20 transition-colors duration-300 pointer-events-auto scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#00A4FF]/50 shadow-[0_10px_30px_rgba(0,164,255,0.25)] mb-5 bg-[#04044A]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.heroAvatarUrl || "/photo.png"}
            alt={profile.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#04044A] dark:text-white mb-3">
          My{" "}
          <span className="text-[#00A4FF] dark:text-[#00E7FF]">Contact</span>
        </h2>

        <p className="text-xs sm:text-base text-[#334173] dark:text-[#CBD9FF]/80 max-w-md mb-8 leading-relaxed">
          {profile.aboutPortfolio}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {enabled.includes("phone") && profile.phone && (
            <a href={`tel:${profile.phone}`} className={pillClass}>
              <Phone className="w-4 h-4 text-[#00A4FF] dark:text-[#00E7FF]" />
              <span>{profile.phone}</span>
            </a>
          )}

          {enabled.includes("whatsapp") && profile.whatsapp && (
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={pillClass}
            >
              <WhatsappIcon className="w-4 h-4 text-emerald-500" />
              <span>WhatsApp</span>
            </a>
          )}

          {enabled.includes("github") && profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={pillClass}
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}

          {enabled.includes("linkedin") && profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={pillClass}
            >
              <LinkedinIcon className="w-4 h-4 text-[#00A4FF]" />
              <span>LinkedIn</span>
            </a>
          )}

          {(profile.customLinks || []).map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={pillClass}
            >
              {link.iconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={link.iconUrl}
                  alt={link.label}
                  className="w-4 h-4 rounded-sm object-contain shrink-0"
                />
              ) : (
                <ExternalLink className="w-3.5 h-3.5 text-[#00A4FF] dark:text-[#00E7FF] shrink-0" />
              )}
              <span>{link.label}</span>
            </a>
          ))}

          {enabled.includes("email") && profile.email && (
            <button
              type="button"
              onClick={openEmailModal}
              className="px-6 py-2.5 rounded-full bg-[#04044A] dark:bg-white text-white dark:text-[#020412] hover:bg-[#00A4FF] dark:hover:bg-[#00E7FF] hover:text-[#020412] text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Email me</span>
            </button>
          )}
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-xs sm:text-sm font-semibold text-[#334173] dark:text-[#CBD9FF]/80 hover:text-[#00A4FF] dark:hover:text-[#00E7FF] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}