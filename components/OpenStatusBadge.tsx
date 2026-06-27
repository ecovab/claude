"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "@/lib/hours";

export default function OpenStatusBadge() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const tick = () => setOpen(isOpenNow());
    tick();
    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (open === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${
        open
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
          : "border-red-500/30 bg-red-500/10 text-red-500"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${open ? "bg-emerald-500" : "bg-red-500"}`}
      />
      {open ? "Open Now" : "Closed"}
    </span>
  );
}
