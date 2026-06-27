"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AnimatedSection({
  children,
  className,
  id,
  style,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.section
      id={id}
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {children}
    </motion.section>
  );
}
