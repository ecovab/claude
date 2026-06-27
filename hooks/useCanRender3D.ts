"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Gates the Three.js hero scene behind reduced-motion preference and a rough low-power device check. */
export function useCanRender3D(): boolean {
  const reducedMotion = usePrefersReducedMotion();
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const isSmallScreen = window.innerWidth < 640;
    // Computed client-only: server has no `window`/`navigator`, so this must run post-hydration, not in the lazy initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLowPower(cores <= 2 || isSmallScreen);
  }, []);

  return !reducedMotion && !lowPower;
}
