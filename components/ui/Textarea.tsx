import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-gold/20 bg-charcoal/40 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/40 outline-none transition-colors focus:border-gold/60 focus:bg-charcoal/70",
        className
      )}
      {...props}
    />
  );
}
