"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.16, 1, 0.3, 1] as const;

const PHASES = [
  {
    name: "DISCOVERY",
    description: "We learn your business, your customers, and what success actually looks like.",
  },
  {
    name: "BUILD",
    description: "Custom design and development — no templates, no shortcuts.",
  },
  {
    name: "REVIEW",
    description: "We test, refine, and make sure every detail earns its place.",
  },
  {
    name: "LAUNCH",
    description: "Your site goes live, and we stay on to keep it growing.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 640px)").matches
  );
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const handler = () => setIsNarrow(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const idx = Math.min(PHASES.length - 1, Math.floor(self.progress * PHASES.length));
        setActiveIndex(idx);
      },
    });

    return () => trigger.kill();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="process" className="process-section relative h-[400vh]">
      <div className="process-sticky sticky top-0 flex h-screen flex-col items-center justify-center gap-3 px-6 lg:px-12">
        <div className="process-phases flex flex-col items-center font-display">
          {PHASES.map((phase, i) => {
            const distance = Math.abs(i - activeIndex);
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={phase.name}
                className={`process-phase ${isActive ? "text-mint" : "text-warm"}`}
                animate={{
                  opacity: isActive ? 1 : Math.max(0.1, 1 - distance * 0.3),
                  x: isActive ? 0 : distance * (isNarrow ? 14 : 32),
                }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {phase.name}
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={activeIndex}
            className="process-description mt-4 max-w-md text-center text-muted"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {PHASES[activeIndex].description}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
