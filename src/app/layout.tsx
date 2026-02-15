/* ═══════════════════════════════════════════════════════
   Root Layout — wraps every page
   ═══════════════════════════════════════════════════════ */

import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import "@/styles/globals.css";
import { createMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";

/* ─── Fonts ─── */
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
      className={`${notoSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased">
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
