"use client";

import type React from "react";
import { motion } from "framer-motion";
import { AtSign, Phone, ExternalLink } from "lucide-react";
import { DEFAULT_SITE_PROFILE, SiteProfileData } from "@/lib/siteDefaults";

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
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

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
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

function WhatsappIcon({ className = "w-5 h-5" }: { className?: string }) {
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

interface HeroProps {
  profile?: SiteProfileData;
}

export default function Hero({ profile = DEFAULT_SITE_PROFILE }: HeroProps) {
  const enabled = profile.enabledIcons || [];
  const isContain = profile.heroFitMode === "contain";
  const hasCustomSize =
    (profile.heroFrameWidth ?? 0) > 0 || (profile.heroFrameHeight ?? 0) > 0;

  const customFrameStyle: React.CSSProperties = {};
  if ((profile.heroFrameWidth ?? 0) > 0) {
    customFrameStyle.width = `${profile.heroFrameWidth}px`;
    customFrameStyle.maxWidth = "100%";
  }
  if ((profile.heroFrameHeight ?? 0) > 0) {
    customFrameStyle.height = `${profile.heroFrameHeight}px`;
    customFrameStyle.maxHeight = "92vh";
  }

  const squareBtnClass =
    "w-11 h-11 rounded-lg bg-[#DCEAFF] dark:bg-[#04044A] hover:bg-[#00A4FF] dark:hover:bg-[#00E7FF] text-[#04044A] dark:text-white hover:text-white dark:hover:text-[#020412] border border-[#04044A]/15 dark:border-[#00A4FF]/35 shadow-sm flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 cursor-pointer";

  const openEmailModal = () => {
    window.dispatchEvent(new CustomEvent("open-email-modal"));
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[92vh] lg:h-screen lg:min-h-[680px] overflow-x-clip bg-[#F4F8FF] dark:bg-[#020412] text-[#04044A] dark:text-white flex items-center transition-colors duration-300 pointer-events-auto"
    >
      {/* Right Half Background Panel (50% of screen width on desktop) */}
      <div
        className="hidden lg:block absolute inset-y-0 right-0 w-[52vw] bg-gradient-to-br from-[#04044A] via-[#000675] to-[#020412] dark:from-[#04044A] dark:via-[#000675] dark:to-[#04044A] z-0 overflow-hidden"
        style={{
          clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="absolute top-1/4 right-1/4 w-[420px] h-[420px] bg-[#00A4FF]/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[320px] h-[320px] bg-[#00E7FF]/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Full-Bleed Half-Screen Image when Full Frame is active & no custom pixel size */}
        {isContain && !hasCustomSize && (
          <div className="w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.heroAvatarUrl || "/photo.png"}
              alt={profile.name}
              className="w-full h-full object-cover object-top select-none"
            />
          </div>
        )}
      </div>

      {/* Mobile Bottom Diagonal Panel */}
      <div
        className="lg:hidden absolute inset-x-0 bottom-0 h-[52%] bg-gradient-to-b from-[#04044A] via-[#000675] to-[#020412] z-0"
        style={{
          clipPath: "polygon(0% 14%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-12 py-24 lg:py-0 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Half: Text & Social Icons */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-6 flex flex-col items-start text-left lg:pr-10 min-w-0"
        >
          <span className="text-lg sm:text-2xl font-bold text-[#04044A] dark:text-[#00E7FF] tracking-tight mb-3">
            Hi, I am
          </span>

          <h1 className="text-3xl sm:text-5xl xl:text-[3.5rem] font-black tracking-tight text-[#04044A] dark:text-white leading-[1.08] break-words max-w-full">
            {profile.name}
          </h1>

          <p className="text-sm sm:text-lg font-bold text-[#334173] dark:text-[#CBD9FF] mt-2.5">
            {profile.role}
          </p>

          <div className="flex flex-wrap items-center gap-3.5 mt-9 sm:mt-12">
            {enabled.includes("email") && profile.email && (
              <button
                type="button"
                onClick={openEmailModal}
                aria-label="Send Direct Email"
                title={`Send Email to ${profile.email}`}
                className={squareBtnClass}
              >
                <AtSign className="w-5 h-5" />
              </button>
            )}

            {enabled.includes("whatsapp") && profile.whatsapp && (
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className={squareBtnClass}
              >
                <WhatsappIcon className="w-5 h-5" />
              </a>
            )}

            {enabled.includes("github") && profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className={squareBtnClass}
              >
                <GithubIcon className="w-5 h-5" />
              </a>
            )}

            {enabled.includes("linkedin") && profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className={squareBtnClass}
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            )}

            {enabled.includes("phone") && profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                aria-label="Call Phone"
                title={profile.phone}
                className={squareBtnClass}
              >
                <Phone className="w-5 h-5" />
              </a>
            )}

            {(profile.customLinks || []).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
                className="h-11 px-3.5 rounded-lg bg-[#DCEAFF] dark:bg-[#04044A] hover:bg-[#00A4FF] dark:hover:bg-[#00E7FF] text-[#04044A] dark:text-white hover:text-white dark:hover:text-[#020412] border border-[#04044A]/15 dark:border-[#00A4FF]/35 shadow-sm inline-flex items-center gap-2 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                {link.iconUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={link.iconUrl}
                    alt={link.label}
                    className="w-5 h-5 rounded-sm object-contain shrink-0"
                  />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                )}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right Half: Mobile Full-Frame OR Custom Trackpad Size OR Cover Split */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end"
        >
          {hasCustomSize ? (
            <div
              style={customFrameStyle}
              className="relative flex items-center justify-center overflow-hidden rounded-[22px]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.heroAvatarUrl || "/photo.png"}
                alt={profile.name}
                className={`w-full h-full select-none ${
                  isContain ? "object-contain" : "object-cover object-top"
                }`}
              />
            </div>
          ) : isContain ? (
            <div className="lg:hidden relative w-full max-w-[420px] h-[360px] flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.heroAvatarUrl || "/photo.png"}
                alt={profile.name}
                className="w-full h-full object-contain select-none"
              />
            </div>
          ) : (
            <div className="relative w-[320px] sm:w-[420px] lg:w-[500px] h-[400px] sm:h-[520px] lg:h-[86vh] flex items-end justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.heroAvatarUrl || "/photo.png"}
                alt={profile.name}
                className="w-full h-full object-cover object-top drop-shadow-[0_20px_50px_rgba(0,164,255,0.3)] select-none"
              />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}