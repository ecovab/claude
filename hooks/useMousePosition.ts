"use client";

import { useEffect, useState } from "react";

interface NormalizedPosition {
  x: number;
  y: number;
}

/** Mouse position normalized to [-1, 1] across the viewport, for parallax/lighting effects. */
export function useMousePosition(): NormalizedPosition {
  const [position, setPosition] = useState<NormalizedPosition>({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      setPosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      });
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return position;
}
