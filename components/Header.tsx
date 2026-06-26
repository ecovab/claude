import Link from "next/link";
import { businessInfo } from "@/lib/business-info";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-zinc-900">
          {businessInfo.name}
        </Link>
        <nav className="hidden gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href={`tel:${businessInfo.phone.replace(/\s+/g, "")}`}
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          Call Now
        </a>
      </div>
    </header>
  );
}
