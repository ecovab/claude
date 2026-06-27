import { cn } from "@/lib/utils";
import type { LabelHTMLAttributes } from "react";

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-gold-light/80",
        className
      )}
      {...props}
    />
  );
}
