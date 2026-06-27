"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaXmark } from "react-icons/fa6";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import {
  GiBarbecue,
  GiCampfire,
  GiMartini,
  GiSteak,
  GiSushis,
  GiTrophyCup,
} from "react-icons/gi";

const GALLERY_ITEMS = [
  { label: "The terrace at sunset", icon: GiCampfire, tone: "ember" as const, span: "row-span-2" },
  { label: "Fresh off the grill", icon: GiBarbecue, tone: "ember" as const, span: "" },
  { label: "Cocktail hour at the bar", icon: GiMartini, tone: "gold" as const, span: "" },
  { label: "Sushi platter, fresh daily", icon: GiSushis, tone: "forest" as const, span: "row-span-2" },
  { label: "Game day crowd", icon: GiTrophyCup, tone: "gold" as const, span: "" },
  { label: "Fillet steak, char-grilled", icon: GiSteak, tone: "ember" as const, span: "" },
  { label: "Inside the lounge", icon: GiMartini, tone: "forest" as const, span: "row-span-2" },
  { label: "Ribs, fall-off-the-bone", icon: GiBarbecue, tone: "gold" as const, span: "" },
];

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function close() {
    setActiveIndex(null);
  }

  function showNext() {
    setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY_ITEMS.length));
  }

  function showPrev() {
    setActiveIndex((i) => (i === null ? null : (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  }

  return (
    <section id="gallery" className="section-padding relative bg-ink">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light/70">
            Gallery
          </span>
          <h2 className="mt-4 font-display text-4xl text-offwhite sm:text-5xl">
            A taste of the <span className="text-gradient-gold">atmosphere</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => setActiveIndex(index)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-xl ${item.span}`}
            >
              <PlaceholderImage label={item.label} icon={item.icon} tone={item.tone} />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-6"
            onClick={close}
          >
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9, rotateY: -12 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl glow-gold"
            >
              <PlaceholderImage
                label={GALLERY_ITEMS[activeIndex].label}
                icon={GALLERY_ITEMS[activeIndex].icon}
                tone={GALLERY_ITEMS[activeIndex].tone}
              />
            </motion.div>

            <button
              aria-label="Close"
              onClick={close}
              className="absolute right-6 top-6 text-2xl text-offwhite/70 hover:text-gold-light"
            >
              <FaXmark />
            </button>
            <button
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-offwhite/70 hover:text-gold-light sm:left-10"
            >
              <FaChevronLeft />
            </button>
            <button
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-offwhite/70 hover:text-gold-light sm:right-10"
            >
              <FaChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
