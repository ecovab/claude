"use client";

import { motion } from "framer-motion";
import { EXPERIENCES } from "@/lib/experiences-data";

export function Experience() {
  return (
    <section id="experience" className="section-padding relative bg-ink">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light/70">
            The Experience
          </span>
          <h2 className="mt-4 font-display text-4xl text-offwhite sm:text-5xl">
            Six reasons to <span className="text-gradient-gold">pull up a chair</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-gold/10 bg-gold/10 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCES.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
              whileHover={{ backgroundColor: "rgba(201,162,75,0.06)" }}
              className="group flex flex-col gap-4 bg-charcoal p-8"
            >
              <experience.icon className="text-3xl text-gold-light transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-display text-xl text-offwhite">{experience.title}</h3>
              <p className="text-sm leading-relaxed text-offwhite/60">{experience.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
