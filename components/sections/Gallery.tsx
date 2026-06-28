"use client";

import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import { CinematicScene } from "@/components/CinematicScene";
import { Reveal } from "@/components/Reveal";
import { SectionGlow } from "@/components/SectionGlow";
import { SectionSeam } from "@/components/SectionSeam";
import type { IconType } from "react-icons";
import {
  GiBarbecue,
  GiCampfire,
  GiMartini,
  GiSteak,
  GiSushis,
  GiTrophyCup,
} from "react-icons/gi";

const GALLERY_ITEMS = [
  { label: "The terrace at sunset", icon: GiCampfire, mood: "goldenHour" as const, span: "row-span-2" },
  { label: "Fresh off the grill", icon: GiBarbecue, mood: "ember" as const, span: "" },
  { label: "Cocktail hour at the bar", icon: GiMartini, mood: "amber" as const, span: "" },
  { label: "Sushi platter, fresh daily", icon: GiSushis, mood: "forest" as const, span: "row-span-2" },
  { label: "Game day crowd", icon: GiTrophyCup, mood: "amber" as const, span: "" },
  { label: "Fillet steak, char-grilled", icon: GiSteak, mood: "ember" as const, span: "" },
  { label: "Inside the lounge at night", icon: GiMartini, mood: "night" as const, span: "row-span-2" },
  { label: "Ribs, fall-off-the-bone", icon: GiBarbecue, mood: "goldenHour" as const, span: "" },
];

interface GalleryTileProps {
  item: (typeof GALLERY_ITEMS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  onSelect: () => void;
}

function GalleryTile({ item, index, scrollYProgress, onSelect }: GalleryTileProps) {
  const direction = index % 2 === 0 ? 1 : -1;
  const y = useTransform(scrollYProgress, [0, 1], [direction * -18, direction * 18]);

  return (
    <motion.button
      onClick={onSelect}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-xl ${item.span}`}
    >
      <motion.div style={{ y }} className="absolute inset-[-12px]">
        <CinematicScene label={item.label} icon={item.icon} mood={item.mood} />
      </motion.div>
    </motion.button>
  );
}

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  function close() {
    setActiveIndex(null);
  }

  function showNext() {
    setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length));
  }

  function showPrev() {
    setActiveIndex((i) => (i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  }

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrev();
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [activeIndex]);

  return (
    <section ref={sectionRef} id="gallery" className="section-padding relative overflow-hidden bg-ink">
      <SectionSeam from="charcoal" />
      <SectionGlow tone="forest" className="-right-1/4 top-1/4" style={{ y: glowY }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light/70">
            Gallery
          </span>
          <h2 className="mt-4 font-display text-4xl text-offwhite sm:text-5xl">
            A taste of the <span className="text-gradient-gold">atmosphere</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY_ITEMS.map((item, index) => (
            <GalleryTile
              key={item.label}
              item={item}
              index={index}
              scrollYProgress={scrollYProgress}
              onSelect={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-6"
            onClick={close}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.92, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.92, rotateY: 10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}
                className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl glow-gold"
              >
                <CinematicScene
                  label={GALLERY_ITEMS[activeIndex].label}
                  icon={GALLERY_ITEMS[activeIndex].icon as IconType}
                  mood={GALLERY_ITEMS[activeIndex].mood}
                  parallax
                />
              </motion.div>
            </AnimatePresence>

            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-6 top-6 text-2xl text-offwhite/70 transition-colors hover:text-gold-light"
            >
              <FaXmark />
            </button>
            <button
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-offwhite/70 transition-colors hover:text-gold-light sm:left-10"
            >
              <FaChevronLeft />
            </button>
            <button
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-offwhite/70 transition-colors hover:text-gold-light sm:right-10"
            >
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
