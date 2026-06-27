"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "@/lib/hours";

export function OpenStatusBadge() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    // Computed client-only: server has no `window`/local time, so this must run post-hydration, not in the lazy initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(isOpenNow());
    const interval = setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (open === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] ${
        open
          ? "border-forest-light/40 bg-forest/20 text-forest-light"
          : "border-bronze/40 bg-bronze/15 text-gold-light"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-forest-light" : "bg-bronze"}`} />
      {open ? "Open Now" : "Closed Now"}
    </span>
  );
}
