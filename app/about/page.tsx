import type { Metadata } from "next";
import { Star } from "lucide-react";
import { businessInfo } from "@/lib/business-info";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: `About | ${businessInfo.name}`,
  description: `Learn more about ${businessInfo.name} in ${businessInfo.address.city}.`,
};

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent-soft/60 to-background dark:from-accent-soft/20" />
      <div className="mx-auto max-w-4xl px-6 py-20">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            About {businessInfo.name}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 text-lg text-foreground/70">
            {businessInfo.name} is {businessInfo.address.city}&apos;s go-to cell phone
            store, proudly serving the local community with quality phones, sound
            equipment, and accessories. {businessInfo.tagline}.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 text-lg text-foreground/70">
            Located at {businessInfo.address.street} in {businessInfo.address.city}, we
            pride ourselves on friendly service and reliable products, earning a{" "}
            {businessInfo.rating.toFixed(2)} star rating from our customers on Google.
          </p>
        </FadeIn>
        <FadeIn delay={0.3} className="mt-8 flex items-center gap-2 text-foreground/80">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={20}
              className={
                i < Math.round(businessInfo.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-foreground/20"
              }
            />
          ))}
          <span className="ml-2 text-sm text-foreground/60">
            {businessInfo.rating.toFixed(2)} / 5 on Google
          </span>
        </FadeIn>
      </div>
    </div>
  );
}
