import { cn } from "@/lib/utils";
import type { SelectHTMLAttributes } from "react";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full appearance-none rounded-lg border border-gold/20 bg-charcoal/40 px-4 py-3 text-sm text-offwhite outline-none transition-colors focus:border-gold/60 focus:bg-charcoal/70",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
