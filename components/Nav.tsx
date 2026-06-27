"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#why-ecova", label: "Why Us" },
  { href: "#process", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`nav ${scrolled ? "nav-scrolled" : ""}`}
    >
      <div className="nav-inner mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <a href="#top" className="nav-logo">
          Ecova<span className="text-mint">.</span>
        </a>

        <nav className="nav-links hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <MagneticButton href="#contact" className="nav-cta">
          Start a Project
        </MagneticButton>
      </div>
    </motion.header>
  );
}
