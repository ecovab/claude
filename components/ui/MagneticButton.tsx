"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const SPRING = { stiffness: 150, damping: 15, mass: 0.15 };

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const borderX = useMotionValue(0);
  const borderY = useMotionValue(0);
  const contentX = useMotionValue(0);
  const contentY = useMotionValue(0);

  const borderSpringX = useSpring(borderX, SPRING);
  const borderSpringY = useSpring(borderY, SPRING);
  const contentSpringX = useSpring(contentX, SPRING);
  const contentSpringY = useSpring(contentY, SPRING);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    borderX.set(offsetX * 0.25);
    borderY.set(offsetY * 0.25);
    contentX.set(offsetX * 0.4);
    contentY.set(offsetY * 0.4);
  }

  function handleMouseLeave() {
    borderX.set(0);
    borderY.set(0);
    contentX.set(0);
    contentY.set(0);
  }

  const innerContent = (
    <motion.span
      style={prefersReducedMotion ? undefined : { x: contentSpringX, y: contentSpringY }}
      className="magnetic-button-content"
    >
      {children}
    </motion.span>
  );

  return (
    <motion.div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      style={prefersReducedMotion ? undefined : { x: borderSpringX, y: borderSpringY }}
      className={`magnetic-button ${className}`}
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          className="magnetic-button-hit inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-4"
        >
          {innerContent}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className="magnetic-button-hit inline-flex items-center justify-center whitespace-nowrap rounded-full px-7 py-4"
        >
          {innerContent}
        </button>
      )}
    </motion.div>
  );
}
