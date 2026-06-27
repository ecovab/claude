"use client";

import { motion } from "framer-motion";
import { GiCupcake, GiSteak, GiWineBottle } from "react-icons/gi";
import { GiMartini } from "react-icons/gi";
import { TiltCard } from "@/components/TiltCard";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { GiFishCooked } from "react-icons/gi";

const SIGNATURES = [
  {
    title: "Seafood Platter",
    description: "Prawns, calamari, mussels and grilled line fish, built for sharing.",
    price: "R 395",
    icon: GiFishCooked,
    tone: "forest" as const,
  },
  {
    title: "Premium Steaks",
    description: "Grass-fed fillet and rump, char-grilled over open flame to order.",
    price: "From R 165",
    icon: GiSteak,
    tone: "ember" as const,
  },
  {
    title: "House Cocktails",
    description: "The Gecko Mule and other terrace favourites, shaken to order.",
    price: "From R 89",
    icon: GiMartini,
    tone: "gold" as const,
  },
  {
    title: "Boland Wine",
    description: "A rotating list of Western Cape reds and whites by the glass.",
    price: "From R 55",
    icon: GiWineBottle,
    tone: "gold" as const,
  },
  {
    title: "House Desserts",
    description: "Belgian waffles and malva pudding — the table always shares.",
    price: "From R 65",
    icon: GiCupcake,
    tone: "ember" as const,
  },
];

export function SignatureDishes() {
  return (
    <section id="dishes" className="section-padding relative bg-ink">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light/70">
            Signature
          </span>
          <h2 className="mt-4 font-display text-4xl text-offwhite sm:text-5xl">
            What Gecko does <span className="text-gradient-gold">best</span>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNATURES.map((dish, index) => (
            <motion.div
              key={dish.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
            >
              <TiltCard className="group overflow-hidden rounded-2xl border border-gold/10 bg-charcoal">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <PlaceholderImage label={dish.title} icon={dish.icon} tone={dish.tone} />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl text-offwhite">{dish.title}</h3>
                    <span className="whitespace-nowrap text-sm font-medium text-gold-light">
                      {dish.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-offwhite/60">{dish.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
