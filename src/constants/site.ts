/* ═══════════════════════════════════════════════════════
   Site-wide Constants
   ═══════════════════════════════════════════════════════ */

export const SITE = {
  name: "School of Defence Technology and Management",
  tagline: "Excellence in Defence Education & Research",
  description:
    "The School of Defence Technology and Management is a premier institution dedicated to advancing defence education, research, and strategic management for national security.",
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
  { label: "Home",          href: "/" },
  { label: "About",         href: "/about" },
  { label: "Faculty",       href: "/faculty" },
  { label: "Programs",      href: "/programs" },
  { label: "Students",      href: "/students" },
  { label: "Alumni",        href: "/alumni" },
  { label: "Placements",    href: "/placements" },
  { label: "Events",        href: "/events" },
  { label: "Research",      href: "/research" },
  { label: "Gallery",       href: "/gallery" },
  { label: "Repositories",  href: "/repositories" },
  { label: "Announcements", href: "/announcements" },
  { label: "Contact",       href: "/contact" },
] as const;

export const FOOTER_LINKS = {
  institution: [
    { label: "About Us",        href: "/about" },
    { label: "Faculty",         href: "/faculty" },
    { label: "Research",        href: "/research" },
    { label: "Gallery",         href: "/gallery" },
  ],
  academics: [
    { label: "Programs",        href: "/programs" },
    { label: "Students",        href: "/students" },
    { label: "Placements",      href: "/placements" },
    { label: "Repositories",    href: "/repositories" },
  ],
  community: [
    { label: "Alumni",          href: "/alumni" },
    { label: "Events",          href: "/events" },
    { label: "Announcements",   href: "/announcements" },
    { label: "Contact",         href: "/contact" },
  ],
} as const;

export const HERO_STATS = [
  { value: 450, suffix: "+", label: "Active Students" },
  { value: 28, suffix: "+", label: "Expert Faculty" },
  { value: 98, suffix: "%", label: "Placement Rate" },
] as const;
