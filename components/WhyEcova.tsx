"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.16, 1, 0.3, 1] as const;

const LINES: Array<{ text: string; mint?: boolean }> = [
  { text: "We grow" },
  { text: "WITH you.", mint: true },
  { text: "Not just" },
  { text: "FOR you.", mint: true },
];

const REASONS = [
  {
    title: "Local knowledge, world-class execution",
    body: "We know South African businesses because we are one. We build to a standard that competes globally.",
  },
  {
    title: "Zero templates — ever",
    body: "Every site is designed and coded from scratch around your business, not assembled from a theme.",
  },
  {
    title: "Growth systems that compound",
    body: "Newsletters, referrals, and SEO that keep working long after launch day.",
  },
  {
    title: "We stay after launch",
    body: "Ongoing support means your site evolves with your business instead of going stale.",
  },
];

export default function WhyEcova() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      lineRefs.current.forEach((line) => {
        if (!line) return;
        const inner = line.querySelector(".why-line-inner");
        if (!inner) return;
        gsap.fromTo(
          inner,
          { yPercent: 100 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              end: "top 35%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="why-ecova"
      ref={containerRef}
      className="why-ecova-section mx-auto max-w-6xl px-6 py-24 lg:px-12"
    >
      <div className="why-ecova-grid grid gap-16 lg:grid-cols-2">
        <div className="why-statement font-display">
          {LINES.map((line, i) => (
            <div
              key={line.text}
              className="why-line-clip overflow-hidden"
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
            >
              <span className={`why-line-inner block ${line.mint ? "text-mint" : "text-warm"}`}>
                {line.text}
              </span>
            </div>
          ))}
        </div>

        <div className="why-reasons flex flex-col gap-10">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="why-reason flex flex-col gap-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <span className="reason-dash text-mint">──</span>
              <h4 className="font-display text-warm">{reason.title}</h4>
              <p className="text-muted">{reason.body}</p>
            </motion.div>
          ))}

          <motion.blockquote
            className="testimonial mt-4 flex flex-col gap-3 border-l-2 pl-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE, delay: REASONS.length * 0.08 }}
          >
            <p className="text-warm">
              &ldquo;Walk-in enquiries jumped in the first week. People said they found us
              online and it looked professional.&rdquo;
            </p>
            <footer className="text-muted">
              Cellsound Electronics &amp; Repair · First Ecova client
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
