"use client";

import { motion } from "framer-motion";
import { businessInfo } from "@/lib/business-info";
import { getWeeklyHours, isOpenNow } from "@/lib/hours";
import AnimatedSection, { itemVariants } from "@/components/AnimatedSection";
import CountUpStat from "@/components/CountUpStat";
import PhoneVisual from "@/components/PhoneVisual";
import { useEffect, useState } from "react";

const STATS = [
  { value: "98%", label: "First-fix rate" },
  { value: "12k+", label: "Devices Revived" },
  { value: "60", label: "Avg Repair Time (min)" },
  { value: "90", label: "Workmanship Warranty (days)" },
  { value: "4.9★", label: "Local Rating" },
];

const SERVICES = [
  {
    title: "Screen Replacement",
    description:
      "Cracked, dead pixels, ghost touch — OEM-grade clarity on most makes and models.",
  },
  {
    title: "Battery Renewal",
    description:
      "Genuine cells fitted in under an hour. Get a full day on a charge again.",
  },
  {
    title: "Water Damage Recovery",
    description:
      "Ultrasonic board cleans, corrosion treatment, component-level diagnosis.",
  },
  {
    title: "Charging Port Repair",
    description:
      "Loose cables and slow charging fixed with precision micro-soldering.",
  },
  {
    title: "Software & Unlocks",
    description:
      "OS recovery, network unlocks, data transfer and account resets.",
  },
  {
    title: "Audio & Speaker Fix",
    description:
      "Speaker, mic and earpiece restoration — clear calls, full sound.",
  },
];

const PRODUCTS = [
  {
    emoji: "🎧",
    title: "Wireless Headphones",
    category: "Audio",
    description: "Studio-grade cans with 40 hr battery life.",
  },
  {
    emoji: "🔊",
    title: "Portable Speakers",
    category: "Audio",
    description: "Rugged Bluetooth speakers built to travel.",
  },
  {
    emoji: "⌚",
    title: "Smartwatches",
    category: "Wearables",
    description: "Track, message, pay — all from your wrist.",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function OpenBadge() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(isOpenNow());
    tick();
    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (open === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        open
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : "border-red-500/30 bg-red-500/10 text-red-400"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${open ? "bg-emerald-400" : "bg-red-400"}`} />
      {open ? "Open Now" : "Closed"}
    </span>
  );
}

export default function Home() {
  const phoneHref = `tel:${businessInfo.phone.replace(/\s+/g, "")}`;
  const whatsappNumber = businessInfo.whatsapp.replace(/\D/g, "");
  const weeklyHours = getWeeklyHours();

  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-color">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(201,168,76,0.1),transparent_55%)]" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 sm:py-32 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
            >
              Paarl&apos;s #1 Repair Shop
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl"
            >
              Your phone,
              <br />
              back to life.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="max-w-xl text-lg text-text-muted"
            >
              {businessInfo.name} is {businessInfo.address.city}&apos;s go-to for
              fast, honest cellular repairs and audio electronics worth listening
              to. Walk-in welcome.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
            >
              <button
                type="button"
                onClick={() => scrollToId("services")}
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#050b18] transition hover:opacity-90"
              >
                Book a Repair
              </button>
              <button
                type="button"
                onClick={() => scrollToId("visit")}
                className="inline-flex items-center gap-2 rounded-full border border-border-color px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
              >
                Get Directions →
              </button>
            </motion.div>
          </div>

          <PhoneVisual />
        </div>

        {/* Stats bar */}
        <div className="border-t border-border-color bg-surface">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-5">
            {STATS.map((stat, i) => (
              <CountUpStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <AnimatedSection id="services" className="mx-auto max-w-6xl px-6 py-24">
        <motion.p variants={itemVariants} className="font-mono text-sm text-accent">
          {"// What we fix"}
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Repairs done right, first time.
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-border-color bg-surface p-6 transition hover:border-accent/50"
            >
              <span className="pointer-events-none absolute -right-2 -top-4 text-6xl font-bold text-border-color transition group-hover:text-accent/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-sm text-accent">
                {String(i + 1).padStart(2, "0")}→
              </span>
              <h3 className="relative mt-3 text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="relative mt-2 text-sm text-text-muted">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-accent px-8 py-10 text-center sm:flex-row sm:text-left"
        >
          <h3 className="text-2xl font-bold text-[#050b18]">
            Walk in. Walk out. Whole again.
          </h3>
          <a
            href={phoneHref}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#050b18] px-6 py-3 text-sm font-semibold text-accent transition hover:opacity-90"
          >
            Call {businessInfo.phone} →
          </a>
        </motion.div>
      </AnimatedSection>

      {/* About */}
      <AnimatedSection id="about" className="border-t border-border-color bg-surface">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <motion.p variants={itemVariants} className="font-mono text-sm text-accent">
            {"// Who we are"}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            A small shop with serious skills.
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-6 text-lg text-text-muted">
            We&apos;re a local repair shop tucked into the Backmin Centre in the
            heart of {businessInfo.address.city}. For years we&apos;ve been the
            locals&apos; first call when something stops working — and the first
            stop when they want something that does. No upsells. No mystery. Just
            clear quotes, careful hands and parts we&apos;d happily put in our own
            devices.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-border-color bg-surface-muted px-4 py-1.5 text-xs uppercase tracking-wide text-accent">
              Based — {businessInfo.address.city}, ZA
            </span>
            <span className="rounded-full border border-border-color bg-surface-muted px-4 py-1.5 text-xs uppercase tracking-wide text-accent">
              Specialty — Repair · Retail
            </span>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Products */}
      <AnimatedSection id="products" className="mx-auto max-w-6xl px-6 py-24">
        <motion.p variants={itemVariants} className="font-mono text-sm text-accent">
          {"// Also in store"}
        </motion.p>
        <motion.h2
          variants={itemVariants}
          className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          While you wait, browse the shelves.
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.title}
              variants={itemVariants}
              style={{
                background: "#1C1C1C",
                borderRadius: 16,
                padding: 28,
                minHeight: 280,
                border: "1px solid #2A2A2A",
                transition: "all 0.3s",
              }}
              className="hover:!border-[#E8173A] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(232,23,58,0.15)]"
            >
              <span className="mb-4 block text-[64px]">{product.emoji}</span>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: "#E8173A" }}
              >
                {product.category}
              </span>
              <h3 className="mt-2 text-xl font-bold text-white">{product.title}</h3>
              <p className="mt-2" style={{ color: "#888888" }}>
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p variants={itemVariants} className="mt-8 text-sm" style={{ color: "#888888" }}>
          Chargers · Cables · Cases · Screen protectors · Power banks · Earphones —
          pop in to see the full range.
        </motion.p>
      </AnimatedSection>

      {/* Visit / Contact */}
      <AnimatedSection
        id="visit"
        className="border-t border-border-color bg-surface"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <motion.p variants={itemVariants} className="font-mono text-sm text-accent">
            {"// Drop in"}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Find us. Call us. Visit us.
          </motion.h2>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <motion.div variants={itemVariants} className="flex flex-col gap-8">
              <OpenBadge />

              <div className="flex items-start gap-3 text-lg text-foreground">
                <span aria-hidden>📍</span>
                <span>
                  Shop 3, Backmin Centre
                  <br />
                  Next to Debonairs Pizza
                  <br />
                  {businessInfo.address.street.split(",").slice(-1)[0]?.trim() ||
                    "41 Lady Grey Street"}
                  , {businessInfo.address.city}, {businessInfo.address.postalCode}
                </span>
              </div>

              <a
                href={phoneHref}
                className="flex items-center gap-3 text-2xl font-semibold text-accent"
              >
                <span aria-hidden>📞</span>
                {businessInfo.phone}
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="flex items-center gap-3 text-lg text-foreground hover:text-accent"
              >
                <span aria-hidden>💬</span>
                WhatsApp: {businessInfo.whatsapp}
              </a>

              <a
                href={`mailto:${businessInfo.email}`}
                className="flex items-center gap-3 text-lg text-foreground hover:text-accent"
              >
                <span aria-hidden>✉️</span>
                {businessInfo.email}
              </a>

              <div className="flex flex-wrap gap-4">
                <a
                  href={phoneHref}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#050b18] transition hover:opacity-90"
                >
                  Call Now
                </a>
                <a
                  href={businessInfo.address.googleMapsUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-border-color px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
                >
                  Open in Maps →
                </a>
              </div>

              <div className="overflow-hidden rounded-2xl border border-border-color bg-surface-muted">
                <table className="w-full text-base">
                  <tbody>
                    {weeklyHours.map(({ day, label, hours }) => (
                      <tr key={day} className="border-b border-border-color last:border-0">
                        <td className="px-5 py-3 font-medium text-foreground">
                          {label}
                        </td>
                        <td
                          className={`px-5 py-3 text-right ${
                            hours === "Closed" ? "text-red-400" : "text-foreground"
                          }`}
                        >
                          {hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="overflow-hidden rounded-2xl border border-accent/40"
              style={{ minHeight: 400 }}
            >
              <iframe
                src={businessInfo.address.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
                loading="lazy"
                title={`Map showing ${businessInfo.name}`}
              />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
