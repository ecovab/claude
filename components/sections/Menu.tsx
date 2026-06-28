"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";
import { MENU_CATEGORIES, MENU_ITEMS, type MenuCategoryId } from "@/lib/menu-data";
import { CinematicScene, type SceneMood } from "@/components/CinematicScene";
import { Reveal } from "@/components/Reveal";
import { SectionGlow } from "@/components/SectionGlow";
import { SectionSeam } from "@/components/SectionSeam";
import { cn } from "@/lib/utils";

const CATEGORY_MOOD: Record<MenuCategoryId, SceneMood> = {
  starters: "amber",
  seafood: "forest",
  grill: "ember",
  burgers: "ember",
  pizza: "amber",
  sushi: "forest",
  drinks: "amber",
  cocktails: "night",
  desserts: "ember",
};

export function Menu() {
  const [active, setActive] = useState<MenuCategoryId | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const items = active === "all" ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === active);

  function toggleExpanded(id: string) {
    setExpandedId((current) => (current === id ? null : id));
  }

  return (
    <section ref={sectionRef} id="menu" className="section-padding relative overflow-hidden bg-charcoal">
      <SectionSeam from="ink" />
      <SectionGlow tone="bronze" className="-right-1/4 bottom-0" style={{ y: glowY }} />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-light/70">
            The Menu
          </span>
          <h2 className="mt-4 font-display text-4xl text-offwhite sm:text-5xl">
            Something for <span className="text-gradient-gold">every table</span>
          </h2>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActive("all");
              setExpandedId(null);
            }}
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
              onClick={() => {
                setActive(category.id);
                setExpandedId(null);
              }}
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
            {items.map((item) => {
              const expanded = expandedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group overflow-hidden rounded-xl border border-gold/10 bg-ink/50 transition-colors hover:border-gold/30"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <CinematicScene
                      label={`${item.name}, plated at Gecko Lounge`}
                      mood={CATEGORY_MOOD[item.category]}
                    />
                    {item.popular && (
                      <span className="absolute left-3 top-3 rounded-full bg-bronze/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-offwhite backdrop-blur-sm">
                        Guest favourite
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleExpanded(item.id)}
                    aria-expanded={expanded}
                    className="flex w-full items-start justify-between gap-3 p-6 text-left"
                  >
                    <div>
                      <h3 className="font-display text-lg text-offwhite">{item.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-offwhite/55">{item.description}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <motion.span
                        key={item.price}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="whitespace-nowrap text-sm font-medium text-gold-light"
                      >
                        {item.price}
                      </motion.span>
                      <FaChevronDown
                        size={11}
                        className={cn(
                          "text-offwhite/40 transition-transform duration-300",
                          expanded && "rotate-180"
                        )}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-gold/10"
                      >
                        <div className="px-6 py-5">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze">
                            Ingredients
                          </span>
                          <p className="mt-2 text-sm text-offwhite/75">{item.ingredients.join(" · ")}</p>

                          {item.pairing && (
                            <>
                              <span className="mt-4 block text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze">
                                Pairs well with
                              </span>
                              <p className="mt-2 text-sm text-gold-light">{item.pairing}</p>
                            </>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
