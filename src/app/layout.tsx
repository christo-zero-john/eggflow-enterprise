import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

/**
 * Two faces, chosen to be clearly different from each other.
 *
 * Bricolage Grotesque carries every display line. It is a grotesque with
 * irregular terminals and a width axis — set wide and tight it reads as
 * confident and slightly hand-made, which is closer to a moulded object than
 * any of the neutral geometrics would be.
 *
 * Instrument Sans does the reading. It was chosen over Inter deliberately:
 * Inter is the face every project reaches for by default, and it looks it.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — the egg rack that reloads itself`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — the egg rack that reloads itself`,
    description: site.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
