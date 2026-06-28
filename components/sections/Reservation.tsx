"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, type FormEvent } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { businessInfo } from "@/lib/business-info";
import { CinematicScene } from "@/components/CinematicScene";
import { Reveal } from "@/components/Reveal";
import { SectionGlow } from "@/components/SectionGlow";
import { SectionSeam } from "@/components/SectionSeam";

const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8+"];

export function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const guests = data.get("guests");
    const date = data.get("date");
    const time = data.get("time");
    const phone = data.get("phone");

    const message = [
      `Hi Gecko Lounge, I'd like to book a table.`,
      `Name: ${name}`,
      `Guests: ${guests}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `Contact number: ${phone}`,
    ].join("\n");

    setSubmitted(true);
    window.open(`https://wa.me/${businessInfo.phoneIntl.replace("+", "")}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <section ref={sectionRef} id="reserve" className="section-padding relative overflow-hidden bg-charcoal">
      <SectionSeam from="ink" />
      <SectionGlow tone="bronze" className="-right-1/4 top-0" style={{ y: glowY }} />

      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light/70">
            Reservations
          </span>
          <h2 className="mt-4 font-display text-4xl text-offwhite sm:text-6xl">
            Your table is <span className="text-gradient-gold">waiting</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-offwhite/60">
            Send us your details and we&rsquo;ll confirm on WhatsApp — usually within minutes
            during opening hours.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="relative h-56 w-full overflow-hidden rounded-2xl glow-gold sm:h-72">
            <CinematicScene label="Candlelit table set for an evening reservation" mood="night" parallax />
          </div>
        </Reveal>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel mt-12 grid gap-6 rounded-2xl p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] sm:grid-cols-2 sm:p-12"
        >
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" required placeholder="Jane Smith" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="jane@email.com" />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" required placeholder="082 000 0000" />
          </div>
          <div>
            <Label htmlFor="guests">Guests</Label>
            <Select id="guests" name="guests" defaultValue="2">
              {GUEST_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option} {option === "1" ? "guest" : "guests"}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" required />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input id="time" name="time" type="time" required />
          </div>

          <div className="sm:col-span-2 mt-2 flex flex-col items-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Button type="submit" size="lg" className="w-full gap-3 sm:w-auto">
                <FaWhatsapp className="text-lg" aria-hidden="true" />
                Reserve a Table
              </Button>
            </motion.div>
            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-forest-light"
              >
                Thanks! We&rsquo;ve opened WhatsApp so you can send your booking through.
              </motion.p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
