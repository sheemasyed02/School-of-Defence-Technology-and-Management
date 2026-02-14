/* ═══════════════════════════════════════════════════════
   Theme Configuration — Design Tokens
   School of Defence Technology and Management
   ═══════════════════════════════════════════════════════ */

export const theme = {
  colors: {
    primary:    "#0A1F44",
    secondary:  "#1B3A6B",
    accent:     "#C0392B",
    gold:       "#D4A843",
    background: "#F8F9FC",
    foreground: "#1A1A2E",
  },

  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body:    "'Inter', system-ui, sans-serif",
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  spacing: {
    section:    "6rem",
    sectionSm:  "3rem",
    container:  "1400px",
  },

  transitions: {
    fast:   "150ms ease",
    base:   "300ms ease",
    slow:   "500ms ease",
    spring: "600ms cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

export type Theme = typeof theme;
