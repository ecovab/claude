"use client";

import { motion, type MotionStyle } from "framer-motion";

type GlowTone = "gold" | "forest" | "ember" | "bronze";

const TONE_COLOR: Record<GlowTone, string> = {
  gold: "bg-gold/10",
  forest: "bg-forest/15",
  ember: "bg-ember/10",
  bronze: "bg-bronze/15",
};

interface SectionGlowProps {
  tone?: GlowTone;
  className?: string;
  style?: MotionStyle;
}

/** Decorative ambient blob used to give sections the same sense of depth as the Hero. Never intercepts pointer events. */
export function SectionGlow({ tone = "gold", className, style }: SectionGlowProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute h-[42vmax] w-[42vmax] rounded-full blur-[120px] ${TONE_COLOR[tone]} ${className ?? ""}`}
      style={style}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
