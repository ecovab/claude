"use client";

import { useEffect, useState } from "react";
import { isOpenNow } from "@/lib/hours";

export default function OpenStatusBadge() {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    setOpen(isOpenNow());
    const interval = setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (open === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
        open
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${open ? "bg-green-500" : "bg-red-500"}`}
      />
      {open ? "Open Now" : "Closed"}
    </span>
  );
}
