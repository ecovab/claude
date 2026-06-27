"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { useCanRender3D } from "@/hooks/useCanRender3D";
import { MagneticButton } from "@/components/MagneticButton";
import { OpenStatusBadge } from "@/components/OpenStatusBadge";
import { businessInfo } from "@/lib/business-info";
import { useLenis } from "lenis/react";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

const TITLE_LINE_1 = "GECKO";
const TITLE_LINE_2 = "LOUNGE";

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.5 + i * 0.045, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function AnimatedWord({ word, offset }: { word: string; offset: number }) {
  return (
    <span className="inline-flex overflow-hidden">
      {word.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={offset + i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const canRender3D = useCanRender3D();
  const lenis = useLenis();

  function scrollToAbout() {
    const target = document.querySelector("#about");
    if (target instanceof HTMLElement) {
      if (lenis) {
        lenis.scrollTo(target, { offset: -80 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      {/* Ambient background gradients — slow moving warm light */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-1/3 left-1/4 h-[60vmax] w-[60vmax] rounded-full bg-bronze/20 blur-[120px]"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[50vmax] w-[50vmax] rounded-full bg-forest/25 blur-[130px]"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[140px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {canRender3D && (
        <div className="absolute inset-0">
          <HeroScene />
        </div>
      )}

      <div className="noise-overlay" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <OpenStatusBadge />
        </motion.div>

        <h1 className="mt-6 font-display text-[15vw] leading-[0.95] text-offwhite sm:text-[10vw] lg:text-[7.2vw]">
          <span className="block">
            <AnimatedWord word={TITLE_LINE_1} offset={0} />
          </span>
          <span className="block text-gradient-gold">
            <AnimatedWord word={TITLE_LINE_2} offset={TITLE_LINE_1.length} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          className="mt-6 max-w-md font-serif text-lg text-offwhite/70 sm:text-xl"
        >
          {businessInfo.tagline} — fire-grilled flavour, ice-cold drinks and a terrace built for golden hour.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75, duration: 0.8, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            onClick={() => document.querySelector("#reserve")?.scrollIntoView({ behavior: "smooth" })}
            className="glass-panel rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-offwhite transition-colors hover:border-gold/50"
          >
            Reserve a Table
          </MagneticButton>
          <a
            href="#menu"
            className="text-xs font-medium uppercase tracking-[0.16em] text-offwhite/60 transition-colors hover:text-gold-light"
          >
            View Menu &rarr;
          </a>
        </motion.div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        aria-label="Scroll to next section"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-gold-light/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FaChevronDown size={20} />
      </motion.button>
    </section>
  );
}
