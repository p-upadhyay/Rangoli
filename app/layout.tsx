import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yaadon Ki Rangoli — Suron Bhari Ravivaar Ki Subah",
  description: "An unofficial nostalgia project celebrating the ritual of Sunday-morning Hindi film songs.",
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
