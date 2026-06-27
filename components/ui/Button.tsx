import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gold text-ink hover:bg-gold-light shadow-[0_8px_30px_-8px_rgba(201,162,75,0.6)]",
        glass:
          "glass-panel text-offwhite hover:border-gold/40 hover:bg-charcoal/70",
        outline:
          "border border-gold/40 text-offwhite hover:bg-gold/10",
        ghost: "text-offwhite hover:text-gold",
      },
      size: {
        default: "px-6 py-3",
        lg: "px-8 py-4 text-base",
        sm: "px-4 py-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
