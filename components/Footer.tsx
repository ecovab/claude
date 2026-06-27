import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { businessInfo } from "@/lib/business-info";
import { getWeeklyHours } from "@/lib/hours";

export function Footer() {
  const weeklyHours = getWeeklyHours();

  return (
    <footer id="contact-footer" className="relative border-t border-gold/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-xl tracking-[0.15em] text-offwhite">
            GECKO <span className="text-gradient-gold">LOUNGE</span>
          </h3>
          <p className="mt-3 max-w-xs text-sm text-offwhite/60">{businessInfo.description}</p>
          <div className="mt-5 flex gap-3">
            {businessInfo.socialLinks.facebook && (
              <a
                href={businessInfo.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Gecko Lounge on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 text-gold-light transition-colors hover:bg-gold/10"
              >
                <FaFacebookF size={14} />
              </a>
            )}
            <a
              aria-label="Gecko Lounge on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 text-gold-light transition-colors hover:bg-gold/10"
              href="#"
            >
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light/70">
            Contact
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-offwhite/60">
            <li>
              <a href={`tel:${businessInfo.phoneIntl}`} className="hover:text-offwhite">
                {businessInfo.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${businessInfo.email}`} className="hover:text-offwhite">
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
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light/70">
            Hours
          </h4>
          <ul className="mt-4 space-y-1.5 text-sm text-offwhite/60">
            {weeklyHours.map(({ day, label, hours }) => (
              <li key={day} className="flex justify-between gap-4">
                <span>{label}</span>
                <span>{hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light/70">
            Find Us
          </h4>
          <a
            href={businessInfo.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-gold-light underline-offset-4 hover:underline"
          >
            Get Directions &rarr;
          </a>
        </div>
      </div>

      <div className="border-t border-gold/10 py-6 text-center text-xs text-offwhite/40">
        &copy; {new Date().getFullYear()} {businessInfo.fullName}. All rights reserved.
      </div>
    </footer>
  );
}
