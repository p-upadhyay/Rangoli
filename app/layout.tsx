import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const title = "Yaadon Ki Rangoli — Suron Bhari Ravivaar Ki Subah";
const description =
  "An unofficial nostalgia project celebrating the ritual of Sunday-morning Hindi film songs.";

export const metadata: Metadata = {
  // Needed for absolute URLs in the share tags. Point this at your own domain
  // when you add one.
  metadataBase: new URL("https://rangoli-seven.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "Yaadon Ki Rangoli",
    locale: "hi_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
