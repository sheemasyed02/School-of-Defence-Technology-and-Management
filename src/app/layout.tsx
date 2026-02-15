/* ═══════════════════════════════════════════════════════
   Root Layout — wraps every page
   ═══════════════════════════════════════════════════════ */

import type { Metadata, Viewport } from "next";
import { Noto_Sans, Merriweather } from "next/font/google";
import "@/styles/globals.css";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";

/* ─── Fonts (Government / Official style) ─── */
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "700", "900"],
});

/* ─── Metadata ─── */
export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  themeColor: "#0A1F44",
  width: "device-width",
  initialScale: 1,
};

/* ─── Layout ─── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${merriweather.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
