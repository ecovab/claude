"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaGoogle, FaStar } from "react-icons/fa6";
import { REVIEWS } from "@/lib/reviews-data";
import { businessInfo } from "@/lib/business-info";
import { Reveal } from "@/components/Reveal";
import { SectionGlow } from "@/components/SectionGlow";
import { SectionSeam } from "@/components/SectionSeam";

const AVATAR_TONES = ["bg-gold/20 text-gold-light", "bg-bronze/25 text-bronze", "bg-forest/25 text-forest-light"];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Reviews() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const review = REVIEWS[index];

  return (
    <section ref={sectionRef} id="reviews" className="section-padding relative overflow-hidden bg-charcoal">
      <SectionSeam from="ink" />
      <SectionGlow tone="gold" className="-left-1/4 top-0" style={{ y: glowY }} />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light/70">
            Word on the street
          </span>
          <h2 className="mt-4 font-display text-4xl text-offwhite sm:text-5xl">
            Loved by <span className="text-gradient-gold">regulars</span>
          </h2>

          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-offwhite/70">
            <span className="flex items-center gap-1 text-gold-light">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className={i < Math.round(businessInfo.rating) ? "" : "opacity-30"} />
              ))}
            </span>
            <span>{businessInfo.rating.toFixed(1)} / 5</span>
            <span className="text-offwhite/30">&middot;</span>
            <span>{businessInfo.reviewCount}+ Google reviews</span>
          </div>
        </Reveal>

        <div className="relative mt-14 min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-panel rounded-2xl p-8 text-left sm:p-10"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
                  >
                    {getInitials(review.name)}
                  </span>
                  <div>
                    <p className="font-medium text-offwhite/90">{review.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-offwhite/45">
                      {review.source === "Google" && <FaGoogle aria-hidden="true" />}
                      <span>{review.source}</span>
                    </div>
                  </div>
                </div>

                <span className="flex shrink-0 items-center gap-0.5 text-gold-light">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} size={13} className={i < review.rating ? "" : "opacity-25"} />
                  ))}
                </span>
              </div>

              <p className="mt-6 font-serif text-lg leading-relaxed text-offwhite/85 sm:text-xl">
                &ldquo;{review.quote}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {REVIEWS.map((r, i) => (
            <button
              key={r.id}
              aria-label={`Show review ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-gold" : "w-3 bg-gold/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
