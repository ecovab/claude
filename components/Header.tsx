"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { businessInfo } from "@/lib/business-info";
import { MagneticButton } from "@/components/MagneticButton";
import { useLenis } from "lenis/react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#dishes", label: "Dishes" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToAnchor(href: string) {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target instanceof HTMLElement) {
      if (lenis) {
        lenis.scrollTo(target, { offset: -80 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "glass-panel py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToAnchor("#top");
          }}
          className="font-display text-xl tracking-[0.2em] text-offwhite sm:text-2xl"
        >
          GECKO <span className="text-gradient-gold">LOUNGE</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToAnchor(link.href)}
              className="text-xs font-medium uppercase tracking-[0.16em] text-offwhite/70 transition-colors hover:text-gold-light"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton
            onClick={() => scrollToAnchor("#reserve")}
            className="rounded-full bg-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-gold-light"
          >
            Reserve a Table
          </MagneticButton>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="text-2xl text-offwhite lg:hidden"
        >
          {menuOpen ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-ink/95 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToAnchor(link.href)}
                  className="py-3 text-left font-display text-lg text-offwhite/80 transition-colors hover:text-gold-light"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollToAnchor("#reserve")}
                className="mt-4 rounded-full bg-gold px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink"
              >
                Reserve a Table
              </button>
              <a
                href={`tel:${businessInfo.phoneIntl}`}
                className="mt-2 py-2 text-center text-sm text-offwhite/60"
              >
                Or call {businessInfo.phone}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
