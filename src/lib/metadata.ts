/* ═══════════════════════════════════════════════════════
   SEO / Metadata Helpers
   ═══════════════════════════════════════════════════════ */

import { Metadata } from "next";
import { SITE } from "@/constants";

export function createMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title =
    typeof overrides.title === "string"
      ? `${overrides.title} | ${SITE.name}`
      : { default: SITE.name, template: `%s | ${SITE.name}` };

  return {
    title,
    description: overrides.description ?? SITE.description,
    metadataBase: new URL(SITE.url),
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: SITE.url,
      siteName: SITE.name,
      title: typeof title === "string" ? title : SITE.name,
      description: overrides.description ?? SITE.description,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      ...(overrides.openGraph ?? {}),
    },
    twitter: {
      card: "summary_large_image",
      title: typeof title === "string" ? title : SITE.name,
      description: overrides.description ?? SITE.description,
      ...(overrides.twitter ?? {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: "/logo.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
    ...overrides,
  };
}
