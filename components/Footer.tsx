import { businessInfo } from "@/lib/business-info";

export default function Footer() {
  return (
    <footer className="site-footer mx-auto flex max-w-6xl flex-col gap-2 px-6 py-10 lg:px-12">
      <p className="footer-line-1 font-display text-warm">
        Ecova Co. — Your Business. Our Ecosystem.
      </p>
      <p className="footer-line-2 text-muted">
        © {new Date().getFullYear()} · {businessInfo.location} · {businessInfo.email}
      </p>
    </footer>
  );
}
