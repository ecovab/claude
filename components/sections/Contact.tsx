"use client";

import { motion } from "framer-motion";
import { FaClock, FaFacebookF, FaLocationDot, FaPhone } from "react-icons/fa6";
import { businessInfo } from "@/lib/business-info";
import { getWeeklyHours } from "@/lib/hours";

export function Contact() {
  const weeklyHours = getWeeklyHours();

  return (
    <section id="contact" className="section-padding relative bg-ink">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light/70">
            Visit Us
          </span>
          <h2 className="mt-4 font-display text-4xl text-offwhite sm:text-5xl">
            Find us on <span className="text-gradient-gold">Lady Grey Street</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="flex gap-4">
              <FaLocationDot className="mt-1 text-xl text-gold-light" />
              <div>
                <h3 className="font-display text-lg text-offwhite">Address</h3>
                <p className="mt-1 text-sm text-offwhite/60">
                  {businessInfo.address.street}, {businessInfo.address.city},{" "}
                  {businessInfo.address.province} {businessInfo.address.postalCode}
                </p>
                <a
                  href={businessInfo.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-gold-light underline-offset-4 hover:underline"
                >
                  Get Directions &rarr;
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <FaPhone className="mt-1 text-xl text-gold-light" />
              <div>
                <h3 className="font-display text-lg text-offwhite">Phone</h3>
                <a href={`tel:${businessInfo.phoneIntl}`} className="mt-1 block text-sm text-offwhite/60 hover:text-offwhite">
                  {businessInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <FaClock className="mt-1 text-xl text-gold-light" />
              <div className="w-full max-w-xs">
                <h3 className="font-display text-lg text-offwhite">Opening Hours</h3>
                <ul className="mt-2 space-y-1 text-sm text-offwhite/60">
                  {weeklyHours.map(({ day, label, hours }) => (
                    <li key={day} className="flex justify-between gap-4">
                      <span>{label}</span>
                      <span>{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <FaFacebookF className="mt-1 text-xl text-gold-light" />
              <div>
                <h3 className="font-display text-lg text-offwhite">Social</h3>
                <a
                  href={businessInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm text-offwhite/60 hover:text-offwhite"
                >
                  facebook.com/geckoloungerestaurant
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-2xl border border-gold/10"
          >
            <iframe
              src={businessInfo.address.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 420, filter: "grayscale(0.3) invert(0.92) contrast(0.9)" }}
              loading="lazy"
              title={`Map showing ${businessInfo.fullName}`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
