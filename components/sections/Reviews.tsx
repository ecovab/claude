"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";
import { REVIEWS } from "@/lib/reviews-data";
import { businessInfo } from "@/lib/business-info";

export function Reviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const review = REVIEWS[index];

  return (
    <section id="reviews" className="section-padding relative bg-charcoal">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
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
        </motion.div>

        <div className="relative mt-14 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-panel rounded-2xl p-10"
            >
              <FaQuoteLeft className="mx-auto text-2xl text-bronze" />
              <p className="mt-6 font-serif text-xl leading-relaxed text-offwhite/85 sm:text-2xl">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-offwhite/50">
                <span className="font-medium text-offwhite/80">{review.name}</span>
                <span>&middot;</span>
                <span>{review.source}</span>
              </div>
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
