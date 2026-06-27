"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function ServiceCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-border-color bg-surface p-6 transition-colors hover:border-accent/50"
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-accent/20 to-accent-secondary/10 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />
      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-secondary text-white shadow-lg shadow-accent/20">
        {icon}
      </div>
      <h3 className="relative mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="relative mt-2 text-sm text-foreground/65">{description}</p>
    </motion.div>
  );
}
