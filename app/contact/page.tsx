import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { businessInfo } from "@/lib/business-info";
import { getWeeklyHours } from "@/lib/hours";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: `Contact | ${businessInfo.name}`,
  description: `Get in touch with ${businessInfo.name} in ${businessInfo.address.city}.`,
};

export default function ContactPage() {
  const weeklyHours = getWeeklyHours();
  const whatsappNumber = businessInfo.whatsapp.replace(/\D/g, "");

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent-soft/50 to-background dark:from-accent-soft/20" />
      <div className="mx-auto max-w-6xl px-6 py-20">
        <FadeIn>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/65">
            Reach out by phone, WhatsApp, or visit us in store — we&apos;d love to
            help.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <FadeIn delay={0.1}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
              Get in Touch
            </h2>
            <ul className="mt-4 space-y-3 text-foreground/80">
              <li>
                <a
                  href={`tel:${businessInfo.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 rounded-xl border border-border-color bg-surface p-3 transition hover:border-accent"
                >
                  <Phone size={18} className="text-accent" />
                  {businessInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  className="flex items-center gap-3 rounded-xl border border-border-color bg-surface p-3 transition hover:border-accent"
                >
                  <MessageCircle size={18} className="text-accent" />
                  WhatsApp: {businessInfo.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className="flex items-center gap-3 rounded-xl border border-border-color bg-surface p-3 transition hover:border-accent"
                >
                  <Mail size={18} className="text-accent" />
                  {businessInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={businessInfo.address.googleMapsUrl}
                  className="flex items-center gap-3 rounded-xl border border-border-color bg-surface p-3 transition hover:border-accent"
                >
                  <MapPin size={18} className="text-accent" />
                  {businessInfo.address.street}, {businessInfo.address.city},{" "}
                  {businessInfo.address.province} {businessInfo.address.postalCode}
                </a>
              </li>
            </ul>

            <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-foreground/50">
              Store Hours
            </h2>
            <ul className="mt-4 space-y-1 rounded-xl border border-border-color bg-surface p-4 text-foreground/75">
              {weeklyHours.map(({ day, label, hours }) => (
                <li key={day} className="flex justify-between gap-4 text-sm">
                  <span>{label}</span>
                  <span>{hours}</span>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2} className="overflow-hidden rounded-2xl border border-border-color">
            <iframe
              src={businessInfo.address.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 480 }}
              loading="lazy"
              title={`Map showing ${businessInfo.name}`}
            />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
