import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Loader } from "@/components/Loader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { businessInfo } from "@/lib/business-info";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://geckoloungepaarl.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${businessInfo.fullName} | ${businessInfo.tagline}`,
    template: `%s | ${businessInfo.name}`,
  },
  description: `${businessInfo.description} Visit us at ${businessInfo.address.street}, ${businessInfo.address.city} for fire-grilled steaks, fresh sushi, cocktails and Paarl's favourite terrace.`,
  keywords: [
    "Gecko Lounge Paarl",
    "restaurant Paarl",
    "bar and grill Paarl",
    "steakhouse Paarl",
    "sushi Paarl",
    "Lady Grey Street Paarl",
  ],
  openGraph: {
    title: businessInfo.fullName,
    description: businessInfo.description,
    url: SITE_URL,
    siteName: businessInfo.fullName,
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: businessInfo.fullName,
    description: businessInfo.description,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: businessInfo.fullName,
  description: businessInfo.description,
  telephone: businessInfo.phone,
  email: businessInfo.email,
  servesCuisine: ["Grill", "Steakhouse", "Sushi", "Pub Food"],
  priceRange: "R-RR",
  address: {
    "@type": "PostalAddress",
    streetAddress: businessInfo.address.street,
    addressLocality: businessInfo.address.city,
    addressRegion: businessInfo.address.province,
    postalCode: businessInfo.address.postalCode,
    addressCountry: "ZA",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: businessInfo.rating,
    reviewCount: businessInfo.reviewCount,
  },
  sameAs: [businessInfo.socialLinks.facebook].filter(Boolean),
  openingHoursSpecification: Object.entries(businessInfo.hours).map(([day, hours]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
    opens: hours.closed ? undefined : hours.open,
    closes: hours.closed ? undefined : hours.close,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-ink text-offwhite">
        <SmoothScrollProvider>
          <Loader />
          <ScrollProgress />
          <NoiseOverlay />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
