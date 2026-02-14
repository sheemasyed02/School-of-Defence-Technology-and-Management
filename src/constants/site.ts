/* ═══════════════════════════════════════════════════════
   Site-wide Constants
   ═══════════════════════════════════════════════════════ */

export const SITE = {
  name: "School of Defence Technology and Management",
  shortName: "SDTM",
  tagline: "Excellence in Defence Education & Research",
  description:
    "The School of Defence Technology and Management (SDTM) is a premier institution dedicated to advancing defence education, research, and strategic management for national security.",
  url: "https://sdtm.edu.in",
  logo: "/logo.png",
  email: "info@sdtm.edu.in",
  phone: "+91-XXXX-XXXXXX",
  address: "New Delhi, India",
  socials: {
    twitter: "#",
    linkedin: "#",
    youtube: "#",
  },
} as const;

export const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Research",   href: "/research" },
  { label: "Faculty",    href: "/faculty" },
  { label: "Admissions", href: "/admissions" },
  { label: "Contact",    href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  institution: [
    { label: "About Us",       href: "/about" },
    { label: "Vision & Mission", href: "/about#vision" },
    { label: "Leadership",     href: "/about#leadership" },
    { label: "Infrastructure", href: "/about#infrastructure" },
  ],
  academics: [
    { label: "Programmes",     href: "/programmes" },
    { label: "Research Labs",  href: "/research" },
    { label: "Faculty",        href: "/faculty" },
    { label: "Publications",   href: "/publications" },
  ],
  quickLinks: [
    { label: "Admissions",     href: "/admissions" },
    { label: "Placements",     href: "/placements" },
    { label: "Events",         href: "/events" },
    { label: "Contact Us",     href: "/contact" },
  ],
} as const;

export const HERO_STATS = [
  { value: 25, suffix: "+", label: "Years of Excellence" },
  { value: 150, suffix: "+", label: "Faculty & Scientists" },
  { value: 5000, suffix: "+", label: "Alumni Network" },
  { value: 40, suffix: "+", label: "Research Labs" },
] as const;
