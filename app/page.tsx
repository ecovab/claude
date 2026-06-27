"use client";

import { motion } from "framer-motion";
import { businessInfo } from "@/lib/business-info";
import { getWeeklyHours } from "@/lib/hours";
import AnimatedSection, { itemVariants } from "@/components/AnimatedSection";

const STATS = [
  { value: "98%", label: "First-fix rate" },
  { value: "12k+", label: "Devices Revived" },
  { value: "60 min", label: "Avg Repair Time" },
  { value: "90 day", label: "Workmanship Warranty" },
  { value: "4.9★", label: "Local Rating" },
];

const SERVICES = [
  {
    title: "Screen Replacement",
    description:
      "Cracked, dead pixels, ghost touch — we restore OEM-grade clarity on most makes and models.",
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
    title: "Wireless Headphones",
    category: "Audio",
    description: "Studio-grade cans with 40 hr battery life.",
    gradient: "from-cyan-500/30 via-blue-500/20 to-transparent",
  },
  {
    title: "Portable Speakers",
    category: "Audio",
    description: "Rugged Bluetooth speakers built to travel.",
    gradient: "from-teal-400/30 via-cyan-500/20 to-transparent",
  },
  {
    title: "Smartwatches",
    category: "Wearables",
    description: "Track, message, pay — all from your wrist.",
    gradient: "from-blue-400/30 via-indigo-500/20 to-transparent",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const phoneHref = `tel:${businessInfo.phone.replace(/\s+/g, "")}`;
  const weeklyHours = getWeeklyHours();

  return (
    <div className="bg-[#0a0a0f] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.12),transparent_45%)]" />

        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 sm:py-32">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
          >
            Your phone,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              back to life.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            className="max-w-xl text-lg text-white/60"
          >
            {businessInfo.name} is {businessInfo.address.city}&apos;s go-to for fast,
            honest cellular repairs and the audio electronics worth listening to.
            Walk-in welcome.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={() => scrollToId("services")}
              className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-[#0a0a0f] transition hover:opacity-90"
            >
              Book a Repair
            </button>
            <button
              type="button"
              onClick={() => scrollToId("visit")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Get Directions →
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="mt-4 grid w-full grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-5"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-cyan-400 sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wide text-white/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <AnimatedSection
        id="services"
        className="mx-auto max-w-6xl px-6 py-24"
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-sm text-cyan-400"
        >
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
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/40"
            >
              <span className="pointer-events-none absolute -right-2 -top-4 text-6xl font-bold text-white/[0.06] transition group-hover:text-cyan-400/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-sm text-cyan-400">
                {String(i + 1).padStart(2, "0")}→
              </span>
              <h3 className="relative mt-3 text-lg font-semibold text-white">
                {service.title}
              </h3>
              <p className="relative mt-2 text-sm text-white/60">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-8 py-10 text-center sm:flex-row sm:text-left"
        >
          <h3 className="text-2xl font-bold">
            Walk in. Walk out. Whole again.
          </h3>
          <a
            href={phoneHref}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-[#0a0a0f] transition hover:opacity-90"
          >
            Call {businessInfo.phone} →
          </a>
        </motion.div>
      </AnimatedSection>

      {/* About */}
      <AnimatedSection className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-6 py-24">
          <motion.p variants={itemVariants} className="font-mono text-sm text-cyan-400">
            {"// Who we are"}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            A small shop with serious skills.
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-6 text-lg text-white/65">
            We&apos;re a local repair shop tucked into the Backmin Centre in the
            heart of {businessInfo.address.city}. For years we&apos;ve been the
            locals&apos; first call when something stops working — and the first
            stop when they want something that does. No upsells. No mystery. Just
            clear quotes, careful hands and parts we&apos;d happily put in our own
            devices.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-wide text-white/60">
              Based — {businessInfo.address.city}, ZA
            </span>
            <span className="rounded-full border border-white/15 px-4 py-1.5 text-xs uppercase tracking-wide text-white/60">
              Specialty — Repair · Retail
            </span>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Products */}
      <AnimatedSection className="mx-auto max-w-6xl px-6 py-24">
        <motion.p variants={itemVariants} className="font-mono text-sm text-cyan-400">
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
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className={`h-40 bg-gradient-to-br ${product.gradient}`} />
              <div className="p-6">
                <span className="text-xs uppercase tracking-wide text-cyan-400">
                  {product.category}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p variants={itemVariants} className="mt-8 text-sm text-white/50">
          Chargers · Cables · Cases · Screen protectors · Power banks · Earphones —
          pop in to see the full range.
        </motion.p>
      </AnimatedSection>

      {/* Visit / Map */}
      <AnimatedSection
        id="visit"
        className="border-t border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <motion.p variants={itemVariants} className="font-mono text-sm text-cyan-400">
            {"// Drop in"}
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Find us, call us, visit us.
          </motion.h2>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <motion.div variants={itemVariants}>
              <p className="text-white/70">
                {businessInfo.address.street}, {businessInfo.address.city},{" "}
                {businessInfo.address.province} {businessInfo.address.postalCode}
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={phoneHref}
                  className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-[#0a0a0f] transition hover:opacity-90"
                >
                  Call {businessInfo.phone}
                </a>
                <a
                  href={businessInfo.address.googleMapsUrl}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Directions Open in Maps →
                </a>
              </div>

              <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-sm text-white/70">
                  <tbody>
                    {weeklyHours.map(({ day, label, hours }) => (
                      <tr key={day} className="border-b border-white/10 last:border-0">
                        <td className="px-4 py-3 font-medium text-white/80">
                          {label}
                        </td>
                        <td className="px-4 py-3 text-right">{hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="overflow-hidden rounded-2xl border border-white/10"
            >
              <iframe
                src={businessInfo.address.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 420 }}
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
