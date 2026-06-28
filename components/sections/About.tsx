"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GiBarbecue, GiPartyPopper, GiSushis } from "react-icons/gi";
import { CinematicScene } from "@/components/CinematicScene";
import { Reveal } from "@/components/Reveal";
import { SectionGlow } from "@/components/SectionGlow";
import { SectionSeam } from "@/components/SectionSeam";

const TIMELINE = [
  {
    label: "Where it started",
    title: "A grill, a bar, a regular crowd",
    description:
      "Gecko Lounge opened its doors on Lady Grey Street with a simple idea: honest fire-grilled food, cold drinks and a room where everyone feels like a regular.",
    icon: GiBarbecue,
  },
  {
    label: "Growing up",
    title: "A sister venue in Wellington",
    description:
      "The same easy-going energy carried through to a second Gecko Lounge in Wellington, doubling down on what made the original a local favourite.",
    icon: GiPartyPopper,
  },
  {
    label: "Today",
    title: "Sushi nights, sport on the big screen",
    description:
      "Decades on, Gecko Lounge still draws Paarl in for terrace sundowners, weekend sushi and a kitchen that hasn't stopped grilling since day one.",
    icon: GiSushis,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden bg-charcoal">
      <SectionSeam from="ink" />
      <SectionGlow tone="forest" className="-left-1/4 top-0" style={{ y: glowY }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light/70">
              Our Story
            </span>
            <h2 className="mt-4 font-display text-4xl text-offwhite sm:text-5xl">
              Paarl&rsquo;s home for{" "}
              <span className="text-gradient-gold">good food &amp; good company</span>
            </h2>
            <p className="mt-6 max-w-lg font-serif text-lg leading-relaxed text-offwhite/70">
              Gecko Lounge isn&rsquo;t trying to be fine dining — it&rsquo;s the bar and grill
              Paarl actually shows up to. Big portions, fair prices, friendly faces behind the
              bar, and a terrace that fills up the moment the sun starts dropping over the
              valley.
            </p>
            <p className="mt-4 max-w-lg font-serif text-lg leading-relaxed text-offwhite/70">
              Whether you&rsquo;re in for a quiet midweek steak, Sunday sushi, or a table for
              twelve on game day, the kitchen and the bar run on the same philosophy: do it
              properly, keep it relaxed.
            </p>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl glow-gold"
          >
            <CinematicScene
              label="Golden-hour terrace, regulars settling in"
              mood="goldenHour"
              parallax
              className="rounded-2xl"
            />
          </motion.div>
        </div>

        <div className="mt-24 grid gap-8 sm:grid-cols-3">
          {TIMELINE.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              transition={{ delay: index * 0.15 }}
              className="relative rounded-2xl border border-gold/10 bg-ink/40 p-8"
            >
              <item.icon className="text-3xl text-gold-light" aria-hidden="true" />
              <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-bronze">
                {item.label}
              </span>
              <h3 className="mt-2 font-display text-xl text-offwhite">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-offwhite/60">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
