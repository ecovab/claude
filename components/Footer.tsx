import Link from "next/link";
import { businessInfo } from "@/lib/business-info";
import { getWeeklyHours } from "@/lib/hours";

export default function Footer() {
  const weeklyHours = getWeeklyHours();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">{businessInfo.name}</h3>
          <p className="mt-2 text-sm text-zinc-600">{businessInfo.tagline}</p>
          <div className="mt-4 flex gap-4">
            {businessInfo.socialLinks.facebook && (
              <a
                href={businessInfo.socialLinks.facebook}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
              >
                Facebook
              </a>
            )}
            {businessInfo.socialLinks.instagram && (
              <a
                href={businessInfo.socialLinks.instagram}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
              >
                Instagram
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Contact
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li>
              <a href={`tel:${businessInfo.phone.replace(/\s+/g, "")}`} className="hover:text-zinc-900">
                {businessInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${businessInfo.email}`} className="hover:text-zinc-900">
                {businessInfo.email}
              </a>
            </li>
            <li>
              {businessInfo.address.street}, {businessInfo.address.city},{" "}
              {businessInfo.address.province} {businessInfo.address.postalCode}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Hours
          </h4>
          <ul className="mt-3 space-y-1 text-sm text-zinc-600">
            {weeklyHours.map(({ day, label, hours }) => (
              <li key={day} className="flex justify-between gap-4">
                <span>{label}</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.{" "}
        <Link href="/contact" className="underline hover:text-zinc-700">
          Get in touch
        </Link>
      </div>
    </footer>
  );
}
