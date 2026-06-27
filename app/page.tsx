"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Smartphone,
  Wrench,
  Headphones,
  Star,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { businessInfo } from "@/lib/business-info";
import OpenStatusBadge from "@/components/OpenStatusBadge";
import FadeIn from "@/components/FadeIn";
import ServiceCard from "@/components/ServiceCard";

const SERVICES = [
  {
    icon: <Smartphone size={22} />,
    title: "Cellphone Sales",
    description: "Wide range of new and quality pre-owned smartphones.",
  },
  {
    icon: <Wrench size={22} />,
    title: "Repairs & Accessories",
    description: "Screen repairs, batteries, chargers, covers, and more.",
  },
  {
    icon: <Headphones size={22} />,
    title: "Sound Equipment",
    description: "Speakers, headphones, and audio accessories for every need.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent-soft via-background to-background dark:from-accent-soft/40" />
        <motion.div
          aria-hidden
          className="absolute -top-24 right-0 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-32 -left-20 -z-10 h-96 w-96 rounded-full bg-accent-secondary/20 blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OpenStatusBadge />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
          >
            {businessInfo.name}
            <span className="block bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Phones &amp; Sound, Sorted.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-lg text-foreground/65"
          >
            {businessInfo.tagline}.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href={`tel:${businessInfo.phone.replace(/\s+/g, "")}`}
              className="rounded-full bg-gradient-to-r from-accent to-accent-secondary px-6 py-3 text-sm font-medium text-white shadow-lg shadow-accent/30 transition hover:opacity-90"
            >
              Call {businessInfo.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border-color px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              Visit Us <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-2 text-sm text-foreground/60"
          >
            <Star size={16} className="fill-amber-400 text-amber-400" />
            {businessInfo.rating.toFixed(2)} rating on Google
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <FadeIn>
          <h2 className="text-3xl font-bold text-foreground">What We Offer</h2>
          <p className="mt-2 max-w-xl text-foreground/60">
            Everything you need for your phone and sound equipment, all under one
            roof.
          </p>
        </FadeIn>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-border-color bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <FadeIn className="flex flex-col items-start gap-4">
            <h2 className="text-3xl font-bold text-foreground">Find Us</h2>
            <p className="flex items-center gap-2 text-foreground/65">
              <MapPin size={16} className="text-accent" />
              {businessInfo.address.street}, {businessInfo.address.city},{" "}
              {businessInfo.address.province} {businessInfo.address.postalCode}
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-6 overflow-hidden rounded-2xl border border-border-color">
            <iframe
              src={businessInfo.address.embedUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              title={`Map showing ${businessInfo.name}`}
            />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
