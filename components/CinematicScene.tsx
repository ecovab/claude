"use client";

import { useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { IconType } from "react-icons";
import { FaCamera } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export type SceneMood = "goldenHour" | "night" | "ember" | "forest" | "amber";

const MOOD_STYLES: Record<SceneMood, { gradient: string; glow: string; ray: string }> = {
  goldenHour: { gradient: "from-bronze/50 via-charcoal to-ink", glow: "bg-ember/25", ray: "rgba(255,154,84,0.18)" },
  night: { gradient: "from-charcoal-light via-ink to-black", glow: "bg-gold/10", ray: "rgba(201,162,75,0.12)" },
  ember: { gradient: "from-ember/30 via-charcoal to-ink", glow: "bg-ember/20", ray: "rgba(255,122,60,0.16)" },
  forest: { gradient: "from-forest/50 via-charcoal to-ink", glow: "bg-forest-light/15", ray: "rgba(77,112,89,0.16)" },
  amber: { gradient: "from-gold/35 via-charcoal to-ink", glow: "bg-gold/20", ray: "rgba(232,205,135,0.18)" },
};

interface CinematicSceneProps {
  /** Describes exactly what real photo should replace this scene once licensed photography is available. */
  label: string;
  icon?: IconType;
  mood?: SceneMood;
  className?: string;
  /** Subtle mouse-reactive depth shift — use sparingly (hero, featured cards). */
  parallax?: boolean;
}

export function CinematicScene({
  label,
  icon: Icon = FaCamera,
  mood = "amber",
  className,
  parallax = false,
}: CinematicSceneProps) {
  const style = MOOD_STYLES[mood];
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });
  const layerX = useTransform(springX, (v) => v * 16);
  const layerY = useTransform(springY, (v) => v * 16);

  const dustSeeds = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!parallax) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(
        "group relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br",
        style.gradient,
        className
      )}
    >
      <motion.div
        style={parallax ? { x: layerX, y: layerY } : undefined}
        className={cn("absolute -inset-10 rounded-full blur-[80px] opacity-60", style.glow)}
      />

      <div
        className="absolute inset-0 opacity-70"
        style={{ background: `linear-gradient(115deg, transparent 30%, ${style.ray} 48%, transparent 62%)` }}
      />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 0 0, transparent 0, color-mix(in srgb, var(--color-gold) 8%, transparent) 18px), repeating-radial-gradient(circle at 18px 18px, transparent 0, color-mix(in srgb, var(--color-forest) 10%, transparent) 18px)",
          backgroundSize: "36px 36px",
        }}
      />

      {dustSeeds.map((seed) => (
        <span
          key={seed}
          className="dust-mote absolute rounded-full bg-gold-light/40"
          style={{
            left: `${15 + seed * 18}%`,
            bottom: "-10%",
            width: 3 + (seed % 3),
            height: 3 + (seed % 3),
            animationDelay: `${seed * 1.4}s`,
            animationDuration: `${10 + seed * 2}s`,
          }}
        />
      ))}

      <div className="noise-overlay" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />

      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_90px_30px_rgba(0,0,0,0.5)]" />

      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <Icon className="text-3xl text-gold-light/70" aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-offwhite/50">{label}</span>
      </div>
    </div>
  );
}
