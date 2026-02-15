
import type { Metadata, Viewport } from "next";
import { Noto_Sans } from "next/font/google";
import "@/styles/globals.css";
import { createMetadata } from "@/lib/metadata";

<<<<<<< Updated upstream
/* ─── Fonts ─── */
const notoSans = Noto_Sans({
=======
const inter = Inter({
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">{children}</main>
        <Footer />
=======
        {children}
>>>>>>> Stashed changes
      </body>
    </html>
  );
}
