"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    const timer = setTimeout(() => setVisible(false), 1900);
    return () => clearTimeout(timer);
  }, [lenis]);

  useEffect(() => {
    if (!visible) lenis?.start();
  }, [visible, lenis]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.span
            className="font-display text-2xl tracking-[0.3em] text-offwhite sm:text-3xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            GECKO LOUNGE
          </motion.span>
          <div className="h-px w-40 overflow-hidden bg-charcoal-light">
            <motion.div
              className="h-full bg-gradient-to-r from-bronze via-gold to-gold-light"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] text-offwhite/40">
            Paarl &middot; Est. local favourite
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
