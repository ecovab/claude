"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    title: "Business Websites",
    description: "Custom-built. Conversion-focused. Nothing off the shelf.",
  },
  {
    title: "E-Commerce Stores",
    description: "Sell while you sleep. Full inventory, payments, and order flow.",
  },
  {
    title: "Newsletter Systems",
    description: "QR-linked email campaigns that bring customers back on repeat.",
  },
  {
    title: "Referral Programs",
    description: "Turn your existing customers into your best marketing channel.",
  },
  {
    title: "Digital Presence Setup",
    description: "Google listing, local SEO, and branding that shows up first.",
  },
  {
    title: "Ongoing Support",
    description: "We don't vanish after launch. We stay in your ecosystem.",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="services" className="services-section mx-auto max-w-6xl px-6 py-24 lg:px-12">
      <div className="services-list flex flex-col">
        {SERVICES.map((service, i) => {
          const isActive = activeIndex === i;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <motion.div
                className="service-row flex flex-col justify-center overflow-hidden px-2"
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex((cur) => (cur === i ? null : cur))}
                onClick={() => setActiveIndex((cur) => (cur === i ? null : i))}
                animate={{
                  height: isActive ? 140 : 80,
                  backgroundColor: isActive ? "var(--surface)" : "rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="service-row-top flex items-center justify-between">
                  <h3 className="service-title font-display">{service.title}</h3>
                  <motion.span
                    className="service-icon text-mint"
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    +
                  </motion.span>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      className="service-description mt-2 max-w-2xl text-muted"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {service.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
