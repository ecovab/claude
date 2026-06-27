"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { MENU_CATEGORIES, MENU_ITEMS, type MenuCategoryId } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

export function Menu() {
  const [active, setActive] = useState<MenuCategoryId | "all">("all");

  const items = useMemo(
    () => (active === "all" ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === active)),
    [active]
  );

  return (
    <section id="menu" className="section-padding relative bg-charcoal">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light/70">
            The Menu
          </span>
          <h2 className="mt-4 font-display text-4xl text-offwhite sm:text-5xl">
            Something for <span className="text-gradient-gold">every table</span>
          </h2>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActive("all")}
            className={cn(
              "rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors",
              active === "all" ? "bg-gold text-ink" : "border border-gold/20 text-offwhite/60 hover:border-gold/50"
            )}
          >
            All
          </button>
          {MENU_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActive(category.id)}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors",
                active === category.id
                  ? "bg-gold text-ink"
                  : "border border-gold/20 text-offwhite/60 hover:border-gold/50"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-xl border border-gold/10 bg-ink/50 p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg text-offwhite">{item.name}</h3>
                  <span className="whitespace-nowrap text-sm font-medium text-gold-light">{item.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-offwhite/55">{item.description}</p>
                {item.popular && (
                  <span className="mt-3 inline-block rounded-full bg-bronze/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-light">
                    Guest favourite
                  </span>
                )}

                {/* Ingredients reveal on hover */}
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink via-ink/95 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze">
                    Ingredients
                  </span>
                  <p className="mt-2 text-sm text-offwhite/80">{item.ingredients.join(" · ")}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
