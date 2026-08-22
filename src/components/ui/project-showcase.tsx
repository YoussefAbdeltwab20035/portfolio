"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { HalomotButton } from "./halomot-button";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  link?: string;
};

type ProjectShowcaseProps = {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: { name?: string; position?: string; testimony?: string };
  fontSizes?: { name?: string; position?: string; testimony?: string };
  spacing?: {
    top?: string;
    bottom?: string;
    lineHeight?: string;
    nameTop?: string;
    nameBottom?: string;
    positionTop?: string;
    positionBottom?: string;
    testimonyTop?: string;
    testimonyBottom?: string;
  };
  desktopVersionBottomThreshold?: number;
  imageAspectRatio?: number;
  isRTL?: boolean;
  onItemClick?: (link: string) => void;
  outerRounding?: string;
  innerRounding?: string;
  outlineColor?: string;
  hoverOutlineColor?: string;
  buttonInscriptions?: {
    previousButton: string;
    nextButton: string;
    openWebAppButton: string;
  };
  halomotButtonGradient?: string;
  halomotButtonBackground?: string;
  halomotButtonTextColor?: string;
  halomotButtonOuterBorderRadius?: string;
  halomotButtonInnerBorderRadius?: string;
  halomotButtonHoverTextColor?: string;
};

export const ProjectShowcase = ({
  testimonials,
  autoplay = false,
  colors = { name: "var(--project-showcase-name-color)", position: "var(--project-showcase-position-color)", testimony: "var(--project-showcase-testimony-color)" },
  fontSizes = { name: "var(--project-showcase-name-size)", position: "var(--project-showcase-position-size)", testimony: "var(--project-showcase-testimony-size)" },
  spacing = {
    top: "0",
    bottom: "0",
    lineHeight: "var(--project-showcase-line-height)",
    nameTop: "var(--project-showcase-name-top)",
    nameBottom: "var(--project-showcase-name-bottom)",
    positionTop: "var(--project-showcase-position-top)",
    positionBottom: "var(--project-showcase-position-bottom)",
    testimonyTop: "var(--project-showcase-testimony-top)",
    testimonyBottom: "var(--project-showcase-testimony-bottom)",
  },
  desktopVersionBottomThreshold = 1024,
  imageAspectRatio = 1.37,
  isRTL = false,
  onItemClick,
  outerRounding = "28px",
  innerRounding = "26px",
  outlineColor = "rgba(255, 255, 255, 0.1)",
  hoverOutlineColor = "#f59e0b",
  buttonInscriptions = {
    previousButton: "Previous",
    nextButton: "Next",
    openWebAppButton: "Launch Project",
  },
  halomotButtonGradient = "var(--project-showcase-button-gradient)",
  halomotButtonBackground = "var(--project-showcase-button-background)",
  halomotButtonTextColor = "var(--project-showcase-button-text-color)",
  halomotButtonOuterBorderRadius = "var(--project-showcase-button-outer-radius)",
  halomotButtonInnerBorderRadius = "var(--project-showcase-button-inner-radius)",
  halomotButtonHoverTextColor = "var(--project-showcase-button-hover-text-color)",
}: ProjectShowcaseProps) => {
  const [active, setActive] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const handleResize = useCallback(() => {
    if (componentRef.current) {
      setIsMobileView(componentRef.current.offsetWidth < desktopVersionBottomThreshold);
    }
  }, [desktopVersionBottomThreshold]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(handleResize);
    if (componentRef.current) {
      resizeObserver.observe(componentRef.current);
    }
    handleResize();
    return () => {
      if (componentRef.current) {
        resizeObserver.unobserve(componentRef.current);
      }
    };
  }, [handleResize]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div
      ref={componentRef}
      className="w-full mx-auto antialiased font-sans"
      style={{
        lineHeight: spacing.lineHeight,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div
        className="grid items-center gap-8 lg:gap-14"
        style={{
          gridTemplateColumns: isMobileView ? "1fr" : "1fr 1.15fr",
        }}
      >
        {/* منطقة الصور ثلاثية الأبعاد التفاعلية */}
        <div className="w-full">
          <div
            className="relative w-full"
            style={{ paddingTop: `${(1 / imageAspectRatio) * 100}%` }}
          >
            <AnimatePresence mode="popLayout">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.4,
                    scale: isActive(index) ? 1 : 0.92,
                    zIndex: isActive(index) ? 30 : testimonials.length - index,
                    rotate: isActive(index) ? 0 : index % 2 === 0 ? 4 : -4,
                    y: isActive(index) ? 0 : 15,
                  }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 6 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0 origin-bottom"
                >
                  <div
                    className="relative h-full w-full p-[1px] border border-slate-200 dark:border-white/15 shadow-xl transition-all duration-300 overflow-hidden"
                    style={{ borderRadius: outerRounding }}
                  >
                    <div
                      className="relative h-full w-full overflow-hidden bg-slate-950"
                      style={{ borderRadius: innerRounding }}
                    >
                      <Image
                        src={testimonial.src}
                        alt={testimonial.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* نصوص وتفاصيل المشروع وأزرار التحكم */}
        <div className="flex justify-between flex-col py-4 w-full text-left">
          <motion.div
            key={active}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest font-semibold text-amber-600 dark:text-amber-400"
              style={{
                marginTop: spacing.positionTop,
                marginBottom: spacing.positionBottom,
              }}
            >
              {testimonials[active].designation}
            </p>

            <h3
              className="font-bold text-2xl sm:text-4xl text-slate-900 dark:text-[#EAE5D9]"
              style={{
                marginTop: spacing.nameTop,
                marginBottom: spacing.nameBottom,
              }}
            >
              {testimonials[active].name}
            </h3>

            <p
              className="text-slate-600 dark:text-[#D8D3C8]/80 text-sm sm:text-base leading-relaxed"
              style={{
                marginTop: spacing.testimonyTop,
                marginBottom: spacing.testimonyBottom,
              }}
            >
              {testimonials[active].quote}
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-3 pt-6 w-full">
            <HalomotButton
              inscription={buttonInscriptions.previousButton}
              onClick={handlePrev}
              fixedWidth="120px"
              gradient={halomotButtonGradient}
              backgroundColor={halomotButtonBackground}
              textColor={halomotButtonTextColor}
              hoverTextColor={halomotButtonHoverTextColor}
            />
            <HalomotButton
              inscription={buttonInscriptions.nextButton}
              onClick={handleNext}
              fixedWidth="120px"
              gradient={halomotButtonGradient}
              backgroundColor={halomotButtonBackground}
              textColor={halomotButtonTextColor}
              hoverTextColor={halomotButtonHoverTextColor}
            />
            <HalomotButton
              inscription={buttonInscriptions.openWebAppButton}
              onClick={() => onItemClick && onItemClick(testimonials[active].link || "")}
              href={testimonials[active].link}
              fillWidth={isMobileView}
              gradient={halomotButtonGradient}
              backgroundColor={halomotButtonBackground}
              textColor={halomotButtonTextColor}
              hoverTextColor={halomotButtonHoverTextColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};