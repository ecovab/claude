import type { Metadata } from "next";
import { businessInfo } from "@/lib/business-info";

export const metadata: Metadata = {
  title: `About | ${businessInfo.name}`,
  description: `Learn more about ${businessInfo.name} in ${businessInfo.address.city}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">About {businessInfo.name}</h1>
      <p className="mt-6 text-lg text-zinc-600">
        {businessInfo.name} is {businessInfo.address.city}&apos;s go-to cell phone
        store, proudly serving the local community with quality phones, sound
        equipment, and accessories. {businessInfo.tagline}.
      </p>
      <p className="mt-4 text-lg text-zinc-600">
        Located at {businessInfo.address.street} in {businessInfo.address.city}, we
        pride ourselves on friendly service and reliable products, earning a{" "}
        {businessInfo.rating.toFixed(2)} star rating from our customers on Google.
      </p>
    </div>
  );
}
