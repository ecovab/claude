"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SplitText from "@/components/ui/SplitText";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import MagneticButton from "@/components/ui/MagneticButton";

const EASE = [0.16, 1, 0.3, 1] as const;
const LINE_ONE = "YOUR BUSINESS.";
const LINE_TWO_WARM = "OUR ";
const LINE_TWO_MINT = "ECOSYSTEM.";
const HEADLINE_BASE_DELAY = 0.5;

const MARQUEE_TEXT =
  "WEB DESIGN · DIGITAL GROWTH · SOUTH AFRICA · ECOVA CO. · YOUR BUSINESS · OUR ECOSYSTEM · WEB DESIGN · DIGITAL GROWTH · SOUTH AFRICA · ECOVA CO. · YOUR BUSINESS · OUR ECOSYSTEM ·";

interface Blob {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  phase: number;
  speed: number;
  driftX: number;
  driftY: number;
  color: [number, number, number];
  alpha: number;
}

function createBlobs(width: number, height: number): Blob[] {
  const palette: Array<[number, number, number]> = [
    [10, 31, 21], // deep forest green
    [4, 4, 6], // near-black
    [8, 24, 17],
  ];

  return Array.from({ length: 6 }, (_, i) => {
    const baseX = Math.random() * width;
    const baseY = Math.random() * height;
    return {
      baseX,
      baseY,
      x: baseX,
      y: baseY,
      radiusX: width * (0.22 + Math.random() * 0.18),
      radiusY: height * (0.22 + Math.random() * 0.18),
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.15,
      driftX: width * (0.06 + Math.random() * 0.06),
      driftY: height * (0.06 + Math.random() * 0.06),
      color: palette[i % palette.length],
      alpha: 0.5 + Math.random() * 0.25,
    };
  });
}

function InkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const c = canvas;
    const context = ctx;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let blobs = createBlobs(width, height);
    let mouseX = width / 2;
    let mouseY = height / 2;
    let rafId = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = width * dpr;
      c.height = height * dpr;
      c.style.width = `${width}px`;
      c.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      blobs = createBlobs(width, height);
    }

    function handlePointerMove(e: PointerEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function draw(time: number) {
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#07070A";
      context.fillRect(0, 0, width, height);

      const t = time * 0.001;

      for (const blob of blobs) {
        const driftX = Math.sin(t * blob.speed + blob.phase) * blob.driftX;
        const driftY = Math.cos(t * blob.speed * 0.8 + blob.phase) * blob.driftY;

        const targetX = blob.baseX + driftX + (mouseX - blob.baseX) * 0.15;
        const targetY = blob.baseY + driftY + (mouseY - blob.baseY) * 0.15;

        blob.x += (targetX - blob.x) * 0.02;
        blob.y += (targetY - blob.y) * 0.02;

        const [r, g, b] = blob.color;
        const gradient = context.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          Math.max(blob.radiusX, blob.radiusY)
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${blob.alpha})`);
        gradient.addColorStop(1, "rgba(7, 7, 10, 0)");

        context.save();
        context.translate(blob.x, blob.y);
        context.scale(blob.radiusX / Math.max(blob.radiusX, blob.radiusY), blob.radiusY / Math.max(blob.radiusX, blob.radiusY));
        context.translate(-blob.x, -blob.y);
        context.fillStyle = gradient;
        context.fillRect(
          blob.x - Math.max(blob.radiusX, blob.radiusY) * 1.5,
          blob.y - Math.max(blob.radiusX, blob.radiusY) * 1.5,
          Math.max(blob.radiusX, blob.radiusY) * 3,
          Math.max(blob.radiusX, blob.radiusY) * 3
        );
        context.restore();
      }

      rafId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);

    if (prefersReducedMotion) {
      draw(0);
    } else {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      rafId = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  return <canvas ref={canvasRef} className="hero-canvas absolute inset-0 h-full w-full" aria-hidden="true" />;
}

export default function Hero() {
  return (
    <section id="top" className="hero-section relative flex min-h-screen flex-col justify-end overflow-hidden">
      <InkCanvas />

      <div className="hero-content relative z-10 flex flex-1 flex-col justify-center gap-6 px-6 pt-32 lg:px-12">
        <h1 className="hero-headline">
          <span className="hero-headline-line block text-warm">
            <SplitText text={LINE_ONE} baseDelay={HEADLINE_BASE_DELAY} delayOffset={0} />
          </span>
          <span className="hero-headline-line block">
            <span className="text-warm">
              <SplitText
                text={LINE_TWO_WARM}
                baseDelay={HEADLINE_BASE_DELAY}
                delayOffset={LINE_ONE.length}
              />
            </span>
            <span className="text-mint">
              <SplitText
                text={LINE_TWO_MINT}
                baseDelay={HEADLINE_BASE_DELAY}
                delayOffset={LINE_ONE.length + LINE_TWO_WARM.length}
              />
            </span>
          </span>
        </h1>

        <motion.p
          className="hero-sub max-w-xl text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.3 }}
        >
          We build websites that work while you sleep.
        </motion.p>

        <motion.div
          className="hero-ctas mt-2 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1.5 }}
        >
          <MagneticButton href="#contact" className="hero-cta-primary">
            Get Your Website
          </MagneticButton>
          <MagneticButton href="#process" className="hero-cta-secondary">
            See Our Work
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.7 }}
      >
        <MarqueeStrip text={MARQUEE_TEXT} className="hero-marquee px-6 lg:px-12" />
      </motion.div>
    </section>
  );
}
