import Link from "next/link";
import { businessInfo } from "@/lib/business-info";
import OpenStatusBadge from "@/components/OpenStatusBadge";

const SERVICES = [
  {
    title: "Cellphone Sales",
    description: "Wide range of new and quality pre-owned smartphones.",
  },
  {
    title: "Repairs & Accessories",
    description: "Screen repairs, batteries, chargers, covers, and more.",
  },
  {
    title: "Sound Equipment",
    description: "Speakers, headphones, and audio accessories for every need.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20">
          <OpenStatusBadge />
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {businessInfo.name}
          </h1>
          <p className="max-w-xl text-lg text-zinc-600">{businessInfo.tagline}</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${businessInfo.phone.replace(/\s+/g, "")}`}
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
            >
              Call {businessInfo.phone}
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
            >
              Visit Us
            </Link>
          </div>
          <div className="text-sm text-zinc-500">
            ⭐ {businessInfo.rating.toFixed(2)} rating on Google
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-zinc-900">What We Offer</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-zinc-200 p-6 transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-zinc-900">{service.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-zinc-900">Find Us</h2>
          <p className="mt-2 text-zinc-600">
            {businessInfo.address.street}, {businessInfo.address.city},{" "}
            {businessInfo.address.province} {businessInfo.address.postalCode}
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200">
            <iframe
              src={businessInfo.address.embedUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              loading="lazy"
              title={`Map showing ${businessInfo.name}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
