import type { Metadata } from "next";
import { businessInfo } from "@/lib/business-info";
import { getWeeklyHours } from "@/lib/hours";

export const metadata: Metadata = {
  title: `Contact | ${businessInfo.name}`,
  description: `Get in touch with ${businessInfo.name} in ${businessInfo.address.city}.`,
};

export default function ContactPage() {
  const weeklyHours = getWeeklyHours();
  const whatsappNumber = businessInfo.whatsapp.replace(/\D/g, "");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-zinc-900">Contact Us</h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Reach out by phone, WhatsApp, or visit us in store — we&apos;d love to help.
      </p>

      <div className="mt-10 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Get in Touch
          </h2>
          <ul className="mt-4 space-y-3 text-zinc-700">
            <li>
              <span className="font-medium">Phone: </span>
              <a
                href={`tel:${businessInfo.phone.replace(/\s+/g, "")}`}
                className="text-zinc-900 underline"
              >
                {businessInfo.phone}
              </a>
            </li>
            <li>
              <span className="font-medium">WhatsApp: </span>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="text-zinc-900 underline"
              >
                {businessInfo.whatsapp}
              </a>
            </li>
            <li>
              <span className="font-medium">Email: </span>
              <a
                href={`mailto:${businessInfo.email}`}
                className="text-zinc-900 underline"
              >
                {businessInfo.email}
              </a>
            </li>
            <li>
              <span className="font-medium">Address: </span>
              {businessInfo.address.street}, {businessInfo.address.city},{" "}
              {businessInfo.address.province} {businessInfo.address.postalCode}
            </li>
            <li>
              <a
                href={businessInfo.address.googleMapsUrl}
                className="text-zinc-900 underline"
              >
                Get Directions
              </a>
            </li>
          </ul>

          <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Store Hours
          </h2>
          <ul className="mt-4 space-y-1 text-zinc-700">
            {weeklyHours.map(({ day, label, hours }) => (
              <li key={day} className="flex justify-between gap-4 sm:w-64">
                <span>{label}</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200">
          <iframe
            src={businessInfo.address.embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 400 }}
            loading="lazy"
            title={`Map showing ${businessInfo.name}`}
          />
        </div>
      </div>
    </div>
  );
}
