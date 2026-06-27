"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PhoneVisual() {
  const { scrollY } = useScroll();
  const screenY = useTransform(scrollY, [0, 400], [0, -80]);
  const internalsY = useTransform(scrollY, [0, 400], [0, 80]);
  const glowOpacity = useTransform(scrollY, [0, 400], [0, 1]);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative mx-auto aspect-[3/4] w-full max-w-sm"
    >
      {/* Layer 3 — internals */}
      <motion.div
        style={{ y: internalsY }}
        className="absolute inset-4 rounded-3xl bg-surface"
      >
        <div
          className="h-full w-full rounded-3xl opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(201,168,76,0.35) 1px, transparent 1.5px)",
            backgroundSize: "14px 14px",
          }}
        />
      </motion.div>

      {/* Glow between layers */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 rounded-3xl bg-accent/20 blur-2xl"
      />

      {/* Layer 2 — frame */}
      <div className="absolute inset-2 rounded-[2rem] border border-accent/40 bg-[#0d1626] shadow-2xl shadow-black/40" />

      {/* Layer 1 — screen */}
      <motion.div
        style={{ y: screenY }}
        className="absolute inset-2 overflow-hidden rounded-[2rem] border border-accent/30 bg-gradient-to-br from-[#11192c] to-[#0d1626]"
      >
        {!imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/hero-phone.jpg"
            alt="Cell & Sound repaired phone"
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-text-muted">
            <div className="h-20 w-20 rounded-2xl border-2 border-accent/40" />
            <span className="text-xs uppercase tracking-widest">
              Cell &amp; Sound
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
