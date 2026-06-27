import type { Metadata } from "next";
import { Smartphone, Wrench, Headphones, Battery } from "lucide-react";
import { businessInfo } from "@/lib/business-info";
import FadeIn from "@/components/FadeIn";
import ServiceCard from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: `Services | ${businessInfo.name}`,
  description: `Explore the products and services offered by ${businessInfo.name}.`,
};

const SERVICES = [
  {
    icon: <Smartphone size={22} />,
    title: "Cellphone Sales",
    description:
      "A wide selection of new and quality pre-owned smartphones to fit every budget.",
  },
  {
    icon: <Wrench size={22} />,
    title: "Repairs & Maintenance",
    description:
      "Fast and reliable screen, battery, and hardware repairs for most phone brands.",
  },
  {
    icon: <Battery size={22} />,
    title: "Accessories",
    description:
      "Chargers, covers, screen protectors, headphones, and more — all in one place.",
  },
  {
    icon: <Headphones size={22} />,
    title: "Sound Equipment",
    description:
      "Speakers and audio gear to keep you connected to your music wherever you go.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <FadeIn>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Our Services
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-foreground/65">
          Everything you need for your phone and sound equipment, all under one roof
          at {businessInfo.name}.
        </p>
      </FadeIn>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} {...service} delay={i * 0.08} />
        ))}
      </div>
    </div>
  );
}
