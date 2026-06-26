import type { Metadata } from "next";
import { businessInfo } from "@/lib/business-info";

export const metadata: Metadata = {
  title: `Services | ${businessInfo.name}`,
  description: `Explore the products and services offered by ${businessInfo.name}.`,
};

const SERVICES = [
  {
    title: "Cellphone Sales",
    description:
      "A wide selection of new and quality pre-owned smartphones to fit every budget.",
  },
  {
    title: "Repairs & Maintenance",
    description:
      "Fast and reliable screen, battery, and hardware repairs for most phone brands.",
  },
  {
    title: "Accessories",
    description:
      "Chargers, covers, screen protectors, headphones, and more — all in one place.",
  },
  {
    title: "Sound Equipment",
    description:
      "Speakers and audio gear to keep you connected to your music wherever you go.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">Our Services</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Everything you need for your phone and sound equipment, all under one roof
        at {businessInfo.name}.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="rounded-xl border border-zinc-200 p-6 transition hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-zinc-900">{service.title}</h2>
            <p className="mt-2 text-sm text-zinc-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
