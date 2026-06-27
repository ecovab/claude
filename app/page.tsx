"use client";

import { motion } from "framer-motion";
import { businessInfo } from "@/lib/business-info";
import { formatHours, isOpenNow } from "@/lib/hours";
import AnimatedSection, { itemVariants } from "@/components/AnimatedSection";
import CountUpStat from "@/components/CountUpStat";
import { useEffect, useState } from "react";

const STATS = [
  { value: "98%", label: "First-fix rate" },
  { value: "12k+", label: "Devices repaired" },
  { value: "60 min", label: "Average repair time" },
  { value: "90 days", label: "Workmanship warranty" },
  { value: "4.9", label: "Google rating" },
];

const SERVICES = [
  {
    name: "Screen Replacement",
    description: "Cracked, dead pixels, ghost touch — OEM-grade clarity restored.",
  },
  {
    name: "Battery Renewal",
    description: "Genuine cells fitted in under an hour. Full day battery, guaranteed.",
  },
  {
    name: "Water Damage Recovery",
    description: "Ultrasonic board clean, corrosion treatment, component diagnosis.",
  },
  {
    name: "Charging Port Repair",
    description: "Precision micro-soldering. No more loose cables or slow charging.",
  },
  {
    name: "Software & Unlocks",
    description: "OS recovery, network unlocks, data transfer, account resets.",
  },
  {
    name: "Audio & Speaker Fix",
    description: "Earpiece, mic and speaker restoration — clear calls, full sound.",
  },
];

const PRODUCTS = [
  {
    category: "Audio",
    title: "Wireless Headphones",
    description: "Studio-grade sound with 40-hour battery life. Built for daily use.",
  },
  {
    category: "Audio",
    title: "Portable Speakers",
    description: "Rugged Bluetooth speakers. Built to travel, built to last.",
  },
  {
    category: "Wearables",
    title: "Smartwatches",
    description: "Track fitness, messages and payments — all from your wrist.",
  },
];

const headlineLines = ["Your phone,", "back to life."];

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
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide"
      style={{
        background: open ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.06)",
        color: open ? "#22C55E" : "#6B6B6B",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: open ? "#22C55E" : "#6B6B6B" }}
      />
      {open ? "Open Now" : "Closed"}
    </span>
  );
}

export default function Home() {
  const phoneHref = `tel:${businessInfo.phone.replace(/\s+/g, "")}`;
  const whatsappNumber = businessInfo.whatsapp.replace(/\D/g, "");
  const weekdayHours = formatHours("monday");
  const saturdayHours = formatHours("saturday");
  const sundayHours = formatHours("sunday");

  return (
    <div style={{ background: "#0E0E0E", color: "#FFFFFF", fontFamily: "var(--font-inter), sans-serif" }}>
      {/* Hero */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[11px] uppercase"
          style={{ letterSpacing: "0.3em", color: "#6B6B6B" }}
        >
          {businessInfo.address.city.toUpperCase()} · SOUTH AFRICA
        </motion.span>

        <h1
          className="mt-6 font-extrabold text-white"
          style={{ fontSize: "clamp(52px, 8vw, 96px)", lineHeight: 1.05 }}
        >
          {headlineLines.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
              className="block"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <div
          style={{
            width: 40,
            height: 2,
            background: "#E8173A",
            margin: "24px auto",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mx-auto"
          style={{ fontSize: 18, color: "#6B6B6B", maxWidth: 480, lineHeight: 1.7 }}
        >
          Fast. Honest. Guaranteed. {businessInfo.name} has been{" "}
          {businessInfo.address.city}&apos;s most trusted repair shop for years —
          walk-ins welcome, no appointment needed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-4"
          style={{ marginTop: 40 }}
        >
          <button
            type="button"
            onClick={() => scrollToId("services")}
            className="font-semibold text-white transition"
            style={{
              background: "#E8173A",
              padding: "16px 32px",
              borderRadius: 6,
              fontSize: 15,
            }}
          >
            Book a Repair
          </button>
          <button
            type="button"
            onClick={() => scrollToId("visit")}
            className="font-semibold text-white transition hover:!border-white"
            style={{
              background: "transparent",
              padding: "16px 32px",
              borderRadius: 6,
              fontSize: 15,
              border: "1px solid #242424",
            }}
          >
            Get Directions
          </button>
        </motion.div>
      </section>

      {/* Stats strip */}
      <div
        style={{
          background: "#161616",
          borderTop: "1px solid #242424",
          borderBottom: "1px solid #242424",
          padding: "32px 0",
        }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 sm:grid-cols-5">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="relative flex items-center justify-center sm:border-l first:border-l-0"
              style={{ borderColor: "#242424" }}
            >
              <CountUpStat value={stat.value} label={stat.label} delay={i * 0.08} />
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <AnimatedSection id="services" className="mx-auto max-w-6xl px-6" >
        <div style={{ paddingTop: 120, paddingBottom: 120 }}>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <motion.div variants={itemVariants}>
              <p
                className="text-[11px] font-semibold uppercase"
                style={{ color: "#E8173A", letterSpacing: "0.2em" }}
              >
                Services
              </p>
              <h2
                className="mt-3 font-extrabold text-white"
                style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
              >
                Repairs done right,
                <br />
                the first time.
              </h2>
            </motion.div>
            <motion.p
              variants={itemVariants}
              style={{ color: "#6B6B6B", maxWidth: 360 }}
            >
              Most repairs completed same day. Every job backed by a 90-day
              workmanship warranty. We don&apos;t cut corners — ever.
            </motion.p>
          </div>

          <div style={{ borderTop: "1px solid #242424", margin: "60px 0 0" }} />

          <div>
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.name}
                variants={itemVariants}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col items-start gap-2 transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
                style={{
                  padding: "28px 0",
                  borderBottom: "1px solid #242424",
                }}
              >
                <div className="flex items-start gap-6 sm:items-center">
                  <span
                    style={{
                      color: "#242424",
                      fontSize: 13,
                      fontWeight: 700,
                      width: 48,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold text-white" style={{ fontSize: 18 }}>
                    {service.name}
                  </span>
                </div>
                <p
                  className="sm:text-right"
                  style={{ color: "#6B6B6B", fontSize: 14, maxWidth: 400 }}
                >
                  {service.description}
                </p>
                <span style={{ color: "#E8173A", fontSize: 20 }} className="hidden sm:inline">
                  →
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between"
            style={{ background: "#E8173A", padding: 48, borderRadius: 6 }}
          >
            <h3 className="font-extrabold text-white" style={{ fontSize: 28 }}>
              Walk in. Walk out. Fixed.
            </h3>
            <a
              href={phoneHref}
              className="font-bold text-white"
              style={{ fontSize: 24, textDecoration: "none" }}
            >
              {businessInfo.phone}
            </a>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* About */}
      <AnimatedSection id="about" style={{ background: "#161616" }}>
        <div
          className="mx-auto max-w-6xl px-6"
          style={{ paddingTop: 120, paddingBottom: 120 }}
        >
          <div className="grid gap-12 md:grid-cols-2">
            <motion.div variants={itemVariants}>
              <p
                className="text-[11px] font-semibold uppercase"
                style={{ color: "#E8173A", letterSpacing: "0.2em" }}
              >
                About
              </p>
              <h2
                className="mt-3 font-extrabold text-white"
                style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
              >
                A small shop with
                <br />
                serious skills.
              </h2>
              <p
                style={{
                  color: "#6B6B6B",
                  fontSize: 16,
                  lineHeight: 1.8,
                  maxWidth: 440,
                  marginTop: 24,
                }}
              >
                We&apos;re tucked into the Backmin Centre in the heart of{" "}
                {businessInfo.address.city}. No upsells. No mystery. Just clear
                quotes, careful hands, and parts we&apos;d put in our own devices.
              </p>
              <div className="flex flex-wrap gap-3" style={{ marginTop: 40 }}>
                <span
                  className="rounded-full"
                  style={{
                    background: "#0E0E0E",
                    border: "1px solid #242424",
                    color: "#6B6B6B",
                    padding: "8px 16px",
                    fontSize: 13,
                  }}
                >
                  {businessInfo.address.city}, ZA
                </span>
                <span
                  className="rounded-full"
                  style={{
                    background: "#0E0E0E",
                    border: "1px solid #242424",
                    color: "#6B6B6B",
                    padding: "8px 16px",
                    fontSize: 13,
                  }}
                >
                  Est. Repair · Retail
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                background: "#0E0E0E",
                border: "1px solid #242424",
                borderRadius: 12,
                padding: 48,
              }}
            >
              <span
                className="block font-extrabold"
                style={{ color: "#E8173A", fontSize: 80, lineHeight: 1, marginBottom: -16 }}
              >
                &ldquo;
              </span>
              <p
                className="font-medium text-white"
                style={{ fontSize: 20, lineHeight: 1.6 }}
              >
                No upsells. No mystery. Just clear quotes, careful hands and
                parts we&apos;d happily put in our own devices.
              </p>
              <div style={{ borderTop: "1px solid #242424", margin: "24px 0" }} />
              <span style={{ color: "#6B6B6B", fontSize: 13 }}>
                {businessInfo.name} — {businessInfo.address.city}
              </span>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Products */}
      <AnimatedSection id="products" className="mx-auto max-w-6xl px-6">
        <div style={{ paddingTop: 120, paddingBottom: 120 }}>
          <motion.p
            variants={itemVariants}
            className="text-[11px] font-semibold uppercase"
            style={{ color: "#E8173A", letterSpacing: "0.2em" }}
          >
            In Store
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="mt-3 font-extrabold text-white"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            While you wait,
            <br />
            browse the shelves.
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-3" style={{ marginTop: 64 }}>
            {PRODUCTS.map((product) => (
              <motion.div
                key={product.title}
                variants={itemVariants}
                className="flex flex-col transition hover:-translate-y-1 hover:!border-[#E8173A]"
                style={{
                  background: "#161616",
                  border: "1px solid #242424",
                  borderRadius: 12,
                  padding: "40px 32px",
                }}
              >
                <span
                  className="text-[11px] font-semibold uppercase"
                  style={{ color: "#E8173A", letterSpacing: "0.2em" }}
                >
                  {product.category}
                </span>
                <div style={{ width: 24, height: 2, background: "#E8173A", margin: "16px 0" }} />
                <h3 className="font-bold text-white" style={{ fontSize: 22 }}>
                  {product.title}
                </h3>
                <p style={{ color: "#6B6B6B", fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>
                  {product.description}
                </p>
                <div className="mt-auto flex items-center gap-2" style={{ marginTop: 24 }}>
                  <span
                    className="rounded-full"
                    style={{ width: 8, height: 8, background: "#22C55E" }}
                  />
                  <span style={{ color: "#6B6B6B", fontSize: 12 }}>In Stock</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={itemVariants}
            className="text-center"
            style={{ color: "#6B6B6B", fontSize: 14, letterSpacing: "0.05em", marginTop: 48 }}
          >
            Chargers · Cables · Cases · Screen Protectors · Power Banks · Earphones
          </motion.p>
        </div>
      </AnimatedSection>

      {/* Visit */}
      <AnimatedSection id="visit" style={{ background: "#161616" }}>
        <div
          className="mx-auto max-w-6xl px-6"
          style={{ paddingTop: 120, paddingBottom: 120 }}
        >
          <motion.p
            variants={itemVariants}
            className="text-[11px] font-semibold uppercase"
            style={{ color: "#E8173A", letterSpacing: "0.2em" }}
          >
            Visit Us
          </motion.p>
          <motion.h2
            variants={itemVariants}
            className="font-extrabold text-white"
            style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1.1, marginTop: 12 }}
          >
            Find us.
            <br />
            Call us.
            <br />
            Visit us.
          </motion.h2>

          <div className="grid gap-12 md:grid-cols-2" style={{ marginTop: 64 }}>
            <motion.div variants={itemVariants}>
              <div style={{ marginBottom: 40 }}>
                <p
                  className="text-[11px] uppercase"
                  style={{ color: "#6B6B6B", letterSpacing: "0.2em", marginBottom: 12 }}
                >
                  Address
                </p>
                <p className="font-semibold text-white" style={{ fontSize: 18 }}>
                  Shop 3, Backmin Centre
                </p>
                <p style={{ color: "#6B6B6B", fontSize: 15 }}>Next to Debonairs Pizza</p>
                <p style={{ color: "#6B6B6B", fontSize: 15 }}>
                  {businessInfo.address.street.split(",").slice(-1)[0]?.trim() ||
                    "41 Lady Grey Street"}
                  , {businessInfo.address.city}, {businessInfo.address.postalCode}
                </p>
              </div>

              <div style={{ marginBottom: 40 }}>
                <p
                  className="text-[11px] uppercase"
                  style={{ color: "#6B6B6B", letterSpacing: "0.2em", marginBottom: 12 }}
                >
                  Phone
                </p>
                <a
                  href={phoneHref}
                  className="font-extrabold text-white transition hover:!text-[#E8173A]"
                  style={{ fontSize: 28, textDecoration: "none" }}
                >
                  {businessInfo.phone}
                </a>
              </div>

              <div style={{ marginBottom: 40 }}>
                <p
                  className="text-[11px] uppercase"
                  style={{ color: "#6B6B6B", letterSpacing: "0.2em", marginBottom: 12 }}
                >
                  WhatsApp
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  className="font-semibold"
                  style={{ color: "#E8173A", fontSize: 16, textDecoration: "none" }}
                >
                  Chat on WhatsApp →
                </a>
              </div>

              <div style={{ marginBottom: 48 }}>
                <p
                  className="text-[11px] uppercase"
                  style={{ color: "#6B6B6B", letterSpacing: "0.2em", marginBottom: 12 }}
                >
                  Email
                </p>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="text-white transition hover:!text-[#E8173A]"
                  style={{ fontSize: 16, textDecoration: "none" }}
                >
                  {businessInfo.email}
                </a>
              </div>

              <div
                style={{
                  background: "#0E0E0E",
                  border: "1px solid #242424",
                  borderRadius: 12,
                  padding: 32,
                }}
              >
                <p
                  className="text-[11px] uppercase"
                  style={{ color: "#6B6B6B", letterSpacing: "0.2em", marginBottom: 20 }}
                >
                  Hours
                </p>
                <div
                  className="flex items-center justify-between"
                  style={{ padding: "12px 0", borderBottom: "1px solid #242424" }}
                >
                  <span style={{ color: "#FFFFFF" }}>Mon – Fri</span>
                  <span style={{ color: "#FFFFFF" }}>{weekdayHours}</span>
                </div>
                <div
                  className="flex items-center justify-between"
                  style={{ padding: "12px 0", borderBottom: "1px solid #242424" }}
                >
                  <span style={{ color: "#FFFFFF" }}>Saturday</span>
                  <span style={{ color: "#FFFFFF" }}>{saturdayHours}</span>
                </div>
                <div className="flex items-center justify-between" style={{ padding: "12px 0" }}>
                  <span style={{ color: "#FFFFFF" }}>Sunday</span>
                  <span style={{ color: "#E8173A" }}>{sundayHours}</span>
                </div>

                <div style={{ marginTop: 20 }}>
                  <OpenBadge />
                </div>
              </div>

              <div className="flex flex-wrap gap-3" style={{ marginTop: 32 }}>
                <a
                  href={phoneHref}
                  className="font-semibold text-white"
                  style={{
                    background: "#E8173A",
                    padding: "14px 28px",
                    borderRadius: 6,
                    textDecoration: "none",
                  }}
                >
                  Call Now
                </a>
                <a
                  href={businessInfo.address.googleMapsUrl}
                  className="font-semibold text-white transition hover:!border-white"
                  style={{
                    background: "transparent",
                    border: "1px solid #242424",
                    padding: "14px 28px",
                    borderRadius: 6,
                    textDecoration: "none",
                  }}
                >
                  Get Directions →
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{
                borderRadius: 12,
                border: "1px solid #242424",
                overflow: "hidden",
                minHeight: 500,
              }}
            >
              <iframe
                src={businessInfo.address.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 500 }}
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
