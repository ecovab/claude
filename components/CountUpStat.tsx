"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

function parseStatValue(raw: string) {
  const match = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { target: 0, decimals: 0, prefix: "", suffix: raw };
  const numberPart = match[1];
  const suffix = match[2];
  const decimals = numberPart.includes(".") ? numberPart.split(".")[1].length : 0;
  return { target: parseFloat(numberPart), decimals, prefix: "", suffix };
}

export default function CountUpStat({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { target, decimals, suffix } = parseStatValue(value);
  const [display, setDisplay] = useState(`0${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.2,
      delay,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(`${latest.toFixed(decimals)}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, target, decimals, suffix, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="text-center"
    >
      <div className="text-[36px] font-extrabold text-white">{display}</div>
      <div className="mt-1 text-[12px] uppercase tracking-[0.1em] text-[#6B6B6B]">
        {label}
      </div>
    </motion.div>
  );
}
