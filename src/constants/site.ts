/* ═══════════════════════════════════════════════════════
   Site-wide Constants
   ═══════════════════════════════════════════════════════ */

export const SITE = {
  name: "School of Defence Technology",
  tagline: "Excellence in Defence Education & Research",
  description:
    "The School of Defence Technology is a premier institution dedicated to advancing defence education, research, and strategic management for national security.",
  url: "https://sdtm.edu.in",
  logo: "/logo.png",
  email: "director_sdt@diat.ac.in",
  phone: "+91-20-24304000",
  address: "School of Defence Technology, DIAT (DU), Girinagar, Pune - 411025",
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
