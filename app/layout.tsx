import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "BYD IL Corso with Ron Corona",
  description:
    "A simpler way to explore BYD vehicles and request a personalized proposal in Cebu.",
  openGraph: {
    title: "Find the BYD that fits your life.",
    description: "Explore the Philippine BYD range with personal assistance from Ron Corona at BYD IL Corso.",
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/og.png`, width: 1200, height: 630, alt: "BYD IL Corso with Ron Corona" }],
  },
  twitter: { card: "summary_large_image", images: [`${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/og.png`] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
