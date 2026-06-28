"use client";

import { useMemo } from "react";

interface AtmosphereProps {
  /** Density of floating dust motes. Keep low — this is ambience, not confetti. */
  density?: number;
  className?: string;
}

/** Full-bleed ambient layer: drifting dust motes + a slow light-ray sweep. Decorative only — never intercepts pointer events. */
export function Atmosphere({ density = 6, className }: AtmosphereProps) {
  const motes = useMemo(() => Array.from({ length: density }, (_, i) => i), [density]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <div
        className="light-ray absolute -inset-1/4 opacity-40"
        style={{
          background:
            "linear-gradient(105deg, transparent 35%, rgba(232,205,135,0.10) 48%, transparent 60%)",
        }}
      />
      {motes.map((seed) => (
        <span
          key={seed}
          className="dust-mote absolute rounded-full bg-gold-light/50"
          style={{
            left: `${(seed * 37) % 100}%`,
            bottom: "-5%",
            width: 2 + (seed % 3),
            height: 2 + (seed % 3),
            animationDelay: `${seed * 1.7}s`,
            animationDuration: `${14 + (seed % 4) * 3}s`,
          }}
        />
      ))}
    </div>
  );
}
