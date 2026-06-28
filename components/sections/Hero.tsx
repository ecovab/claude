"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { useCanRender3D } from "@/hooks/useCanRender3D";
import { MagneticButton } from "@/components/MagneticButton";
import { OpenStatusBadge } from "@/components/OpenStatusBadge";
import { Atmosphere } from "@/components/Atmosphere";
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
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const depthY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const depthScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

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
    <section ref={sectionRef} id="top" className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      {/* Cinematic dolly-in on load, then a slow parallax drift/zoom as the room recedes on scroll */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: depthY, scale: depthScale }}
      >
        {/* Ambient background gradients — slow moving warm light */}
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

        {/* Atmospheric haze near the horizon */}
        <motion.div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bronze/15 via-ember/5 to-transparent"
          animate={{ opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle lens flare, anchored near the gem's screen position */}
        <motion.div
          className="absolute right-[14%] top-[28%] h-3 w-3 rounded-full bg-gold-light"
          style={{ boxShadow: "0 0 40px 10px rgba(232,205,135,0.55), 0 0 120px 60px rgba(255,122,60,0.12)" }}
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {canRender3D && (
          <div className="absolute inset-0">
            <HeroScene />
          </div>
        )}

        <Atmosphere density={7} />
      </motion.div>

      <div className="noise-overlay" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <OpenStatusBadge />
        </motion.div>

        <div className="relative">
          <h1 className="mt-6 font-display text-[15vw] leading-[0.95] text-offwhite sm:text-[10vw] lg:text-[7.2vw]">
            <span className="block">
              <AnimatedWord word={TITLE_LINE_1} offset={0} />
            </span>
            <span className="block text-gradient-gold">
              <AnimatedWord word={TITLE_LINE_2} offset={TITLE_LINE_1.length} />
            </span>
          </h1>

          {/* Reflection: a soft mirrored echo, as if the title is catching light off a polished bar top */}
          <h1
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-full -mt-2 select-none font-display text-[15vw] leading-[0.95] text-offwhite opacity-[0.08] blur-[2px] sm:text-[10vw] lg:text-[7.2vw]"
            style={{ transform: "scaleY(-1)", maskImage: "linear-gradient(to bottom, black, transparent 70%)" }}
          >
            <span className="block">{TITLE_LINE_1}</span>
            <span className="block">{TITLE_LINE_2}</span>
          </h1>
        </div>

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
      </motion.div>

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
