import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { businessInfo } from "@/lib/business-info";
import { getWeeklyHours } from "@/lib/hours";

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.83c0-2.51 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  const weeklyHours = getWeeklyHours();

  return (
    <footer className="border-t border-border-color bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{businessInfo.name}</h3>
          <p className="mt-2 text-sm text-foreground/60">{businessInfo.tagline}</p>
          <div className="mt-4 flex gap-3">
            {businessInfo.socialLinks.facebook && (
              <a
                href={businessInfo.socialLinks.facebook}
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-color text-foreground/70 transition hover:border-accent hover:text-accent"
              >
                <FacebookIcon />
              </a>
            )}
            {businessInfo.socialLinks.instagram && (
              <a
                href={businessInfo.socialLinks.instagram}
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-color text-foreground/70 transition hover:border-accent hover:text-accent"
              >
                <InstagramIcon />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
            Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-foreground/70">
            <li>
              <a
                href={`tel:${businessInfo.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 hover:text-accent"
              >
                <Phone size={14} /> {businessInfo.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${businessInfo.email}`}
                className="flex items-center gap-2 hover:text-accent"
              >
                <Mail size={14} /> {businessInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 flex-shrink-0" />
              <span>
                {businessInfo.address.street}, {businessInfo.address.city},{" "}
                {businessInfo.address.province} {businessInfo.address.postalCode}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
            Hours
          </h4>
          <ul className="mt-3 space-y-1 text-sm text-foreground/70">
            {weeklyHours.map(({ day, label, hours }) => (
              <li key={day} className="flex justify-between gap-4">
                <span>{label}</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border-color py-4 text-center text-xs text-foreground/50">
        © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.{" "}
        <Link href="/contact" className="underline hover:text-accent">
          Get in touch
        </Link>
      </div>
    </footer>
  );
}
