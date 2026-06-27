"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

/** Warm radial light that follows the cursor across a section. */
export function CursorSpotlight({ color = "var(--color-ember)" }: { color?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });
  const background = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, ${color}, transparent 70%)`;

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-30 mix-blend-screen"
      style={{ background }}
    />
  );
}
