import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import "@/styles/globals.css";
import { createMetadata } from "@/lib/metadata";
import { DevToolsBlocker } from "@/components/DevToolsBlocker";

/* ─── Fonts ─── */
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = createMetadata();

export const viewport: Viewport = {
  themeColor: "#0A1F44",
  width: "device-width",
  initialScale: 1,
};

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
        <DevToolsBlocker />
        {children}
      </body>
    </html>
  );
}
