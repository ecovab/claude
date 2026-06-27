"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  /** Number of preceding characters already staggered, for continuing a stagger across multiple instances. */
  delayOffset?: number;
  charStagger?: number;
  baseDelay?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SplitText({
  text,
  className = "",
  delayOffset = 0,
  charStagger = 0.025,
  baseDelay = 0,
}: SplitTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  // +1 per word accounts for the space that follows it, keeping the
  // per-character stagger continuous across word boundaries.
  const wordStartOffsets = words.reduce<number[]>((acc, word, wi) => {
    acc.push(wi === 0 ? 0 : acc[wi - 1] + words[wi - 1].length + 1);
    return acc;
  }, []);

  return (
    <span className={`split-text ${className}`} aria-label={text}>
      {words.map((word, wi) => {
        const chars = word.split("");
        const startOffset = wordStartOffsets[wi];

        return (
          <Fragment key={wi}>
            {/* The word itself must stay an atomic inline-block — adjacent
                inline-block boxes have an implicit break opportunity between
                them even with no whitespace, so per-character wrapping alone
                would let lines split mid-word. */}
            <span className="split-text-word inline-block">
              {chars.map((char, ci) => (
                <span
                  className="split-text-char-wrap inline-block overflow-hidden"
                  key={ci}
                  aria-hidden="true"
                >
                  <motion.span
                    className="split-text-char inline-block"
                    initial={prefersReducedMotion ? { opacity: 0 } : { y: "120%", opacity: 0 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.7,
                      ease: EASE,
                      delay: baseDelay + (delayOffset + startOffset + ci) * charStagger,
                    }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </span>
  );
}
