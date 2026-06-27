import type { IconType } from "react-icons";
import { FaCamera } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  label: string;
  icon?: IconType;
  tone?: "gold" | "forest" | "ember";
  className?: string;
}

const TONE_GRADIENTS: Record<NonNullable<PlaceholderImageProps["tone"]>, string> = {
  gold: "from-bronze/40 via-charcoal to-ink",
  forest: "from-forest/50 via-charcoal to-ink",
  ember: "from-ember/30 via-charcoal to-ink",
};

/**
 * Stand-in for a real restaurant photo. Swap for an <Image> pointing at
 * /public/images/... once licensed photography is available — every usage
 * carries a `label` describing exactly what should be shot/sourced.
 */
export function PlaceholderImage({ label, icon: Icon = FaCamera, tone = "gold", className }: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br",
        TONE_GRADIENTS[tone],
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 0 0, transparent 0, color-mix(in srgb, var(--color-gold) 8%, transparent) 18px), repeating-radial-gradient(circle at 18px 18px, transparent 0, color-mix(in srgb, var(--color-forest) 10%, transparent) 18px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="noise-overlay" />
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <Icon className="text-3xl text-gold-light/70" aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-offwhite/50">
          {label}
        </span>
      </div>
    </div>
  );
}
