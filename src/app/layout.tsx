import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

import { Nav } from "@/components/layout/Nav";
import { SkipToContent } from "@/components/layout/SkipToContent";

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteName = "papercrane";
const defaultTitle = "Writing | papercrane";
const defaultDescription =
  "Notes on the models we train and the evidence behind them.";

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: "%s | papercrane",
  },
  description: defaultDescription,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EB",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable} h-full`}>
      <body className="paper-surface min-h-full flex flex-col relative">
        <SkipToContent />
        <Nav />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
