"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { businessInfo } from "@/lib/business-info";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICE_OPTIONS = [
  "Business Website",
  "E-Commerce Store",
  "Newsletter System",
  "Referral Program",
  "Digital Presence Setup",
  "Ongoing Support",
  "Not sure yet",
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    service: SERVICE_OPTIONS[0],
    message: "",
  });

  function handleCopyEmail() {
    navigator.clipboard.writeText(businessInfo.email).catch(() => {});
    setCopied(true);
    window.location.href = `mailto:${businessInfo.email}`;
    setTimeout(() => setCopied(false), 2000);
  }

  function handleChange(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`New project enquiry from ${form.name || "your website"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.business}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`
    );
    window.location.href = `mailto:${businessInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="contact" className="contact-section mx-auto max-w-6xl px-6 py-24 lg:px-12">
      <div className="contact-grid grid gap-16 lg:grid-cols-2">
        <div className="contact-left flex flex-col gap-6">
          <h2 className="contact-label font-display text-warm">LET&apos;S BUILD</h2>

          <button
            type="button"
            className="contact-block relative flex flex-col items-start gap-1 py-2 text-left"
            onClick={handleCopyEmail}
          >
            <span className="font-display text-warm">{businessInfo.email}</span>
            <AnimatePresence>
              {copied && (
                <motion.span
                  className="copied-tooltip absolute -top-7 left-0 text-mint"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Copied ✓
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <a
            href={`tel:${businessInfo.phoneDigits}`}
            className="contact-block phone-block relative flex flex-col items-start gap-1 py-2"
          >
            <span className="font-display text-warm">{businessInfo.phone}</span>
            <span className="whatsapp-hint absolute -top-7 left-0 text-mint">WhatsApp us</span>
          </a>

          <p className="contact-meta text-muted">
            {businessInfo.location} · {businessInfo.hours}
          </p>
        </div>

        <div className="contact-right">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="contact-form flex flex-col gap-6"
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="form-field relative">
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange("name")}
                    className="w-full py-3"
                  />
                </div>
                <div className="form-field relative">
                  <input
                    required
                    type="text"
                    placeholder="Business"
                    value={form.business}
                    onChange={handleChange("business")}
                    className="w-full py-3"
                  />
                </div>
                <div className="form-field relative">
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange("email")}
                    className="w-full py-3"
                  />
                </div>
                <div className="form-field relative">
                  <select
                    value={form.service}
                    onChange={handleChange("service")}
                    className="w-full py-3"
                  >
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field relative">
                  <textarea
                    required
                    placeholder="Message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange("message")}
                    className="w-full py-3"
                  />
                </div>
                <button type="submit" className="submit-button mt-2 self-start rounded-full px-8 py-4">
                  Send Message
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="sent"
                className="sent-message font-display text-mint"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                ✓ Sent.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
