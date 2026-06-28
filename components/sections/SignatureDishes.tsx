"use client";

import { motion } from "framer-motion";
import { GiCupcake, GiSteak, GiWineBottle } from "react-icons/gi";
import { GiMartini } from "react-icons/gi";
import { TiltCard } from "@/components/TiltCard";
import { CinematicScene, type SceneMood } from "@/components/CinematicScene";
import { GiFishCooked } from "react-icons/gi";

const SIGNATURES: {
  title: string;
  description: string;
  price: string;
  icon: typeof GiFishCooked;
  mood: SceneMood;
  shotLabel: string;
}[] = [
  {
    title: "Seafood Platter",
    description: "Prawns, calamari, mussels and grilled line fish, built for sharing.",
    price: "R 395",
    icon: GiFishCooked,
    mood: "forest",
    shotLabel: "Seafood platter, fresh off the coals",
  },
  {
    title: "Premium Steaks",
    description: "Grass-fed fillet and rump, char-grilled over open flame to order.",
    price: "From R 165",
    icon: GiSteak,
    mood: "ember",
    shotLabel: "Fillet steak, char-grilled to order",
  },
  {
    title: "House Cocktails",
    description: "The Gecko Mule and other terrace favourites, shaken to order.",
    price: "From R 89",
    icon: GiMartini,
    mood: "amber",
    shotLabel: "Signature cocktail, bar light glinting off the glass",
  },
  {
    title: "Boland Wine",
    description: "A rotating list of Western Cape reds and whites by the glass.",
    price: "From R 55",
    icon: GiWineBottle,
    mood: "amber",
    shotLabel: "Western Cape wine, golden hour through the glass",
  },
  {
    title: "House Desserts",
    description: "Belgian waffles and malva pudding — the table always shares.",
    price: "From R 65",
    icon: GiCupcake,
    mood: "ember",
    shotLabel: "House dessert, warm and ready to share",
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
                  <CinematicScene label={dish.shotLabel} icon={dish.icon} mood={dish.mood} parallax />
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
