import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/animations/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /* ─── Defence-Style Color Palette ─── */
      colors: {
        primary: {
          DEFAULT: "#0A1F44",  // Deep navy blue (from DRDO emblem outer ring)
          50:  "#E8EDF5",
          100: "#C5D0E6",
          200: "#8FA3CC",
          300: "#5A76B3",
          400: "#2E4F8A",
          500: "#0A1F44",
          600: "#081A3A",
          700: "#061430",
          800: "#040E24",
          900: "#020818",
        },
        secondary: {
          DEFAULT: "#1B3A6B",  // Medium navy (emblem body blue)
          50:  "#EBF0F7",
          100: "#C9D5E8",
          200: "#93ABD1",
          300: "#5D82BA",
          400: "#3C5E93",
          500: "#1B3A6B",
          600: "#16315B",
          700: "#11274A",
          800: "#0C1D39",
          900: "#071328",
        },
        accent: {
          DEFAULT: "#C0392B",  // Deep red (from DRDO logo red stars)
          50:  "#FDECEB",
          100: "#F9CCC8",
          200: "#F09B94",
          300: "#E76A60",
          400: "#D44D40",
          500: "#C0392B",
          600: "#A33024",
          700: "#86271E",
          800: "#691E17",
          900: "#4C1510",
        },
        gold: {
          DEFAULT: "#D4A843",  // Saffron / golden (from emblem center)
          50:  "#FBF5E6",
          100: "#F4E5BF",
          200: "#EACF8E",
          300: "#DFB85D",
          400: "#D4A843",
          500: "#B8912F",
          600: "#9A7A27",
          700: "#7C631F",
          800: "#5E4C17",
          900: "#40350F",
        },
        background: {
          DEFAULT:  "#F8F9FC",  // Very light blue-grey
          paper:    "#FFFFFF",
          dark:     "#0A1F44",
          muted:    "#EEF1F6",
        },
        foreground: {
          DEFAULT:  "#1A1A2E",  // Near-black with blue undertone
          muted:    "#5A6178",
          light:    "#8A90A2",
          inverted: "#FFFFFF",
        },
        border: {
          DEFAULT: "#D4D8E1",
          light:   "#E8EBF0",
          dark:    "#A0A8B8",
        },
      },

      /* ─── Typography ─── */
      fontFamily: {
        heading: [
          "var(--font-heading)",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        body: [
          "var(--font-body)",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        "display-xl": ["4.5rem",  { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display":    ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["3rem",    { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },

      /* ─── Spacing & Layout ─── */
      maxWidth: {
        site: "1400px",
      },
      spacing: {
        section: "6rem",
        "section-sm": "3rem",
      },
      borderRadius: {
        brand: "0.375rem",
      },

      /* ─── Shadows ─── */
      boxShadow: {
        brand:  "0 4px 24px rgba(10, 31, 68, 0.10)",
        "brand-lg": "0 8px 40px rgba(10, 31, 68, 0.16)",
        glow:   "0 0 20px rgba(10, 31, 68, 0.25)",
      },

      /* ─── Animations (used alongside GSAP) ─── */
      keyframes: {
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "fade-in":    "fade-in 0.5s ease-out forwards",
        shimmer:      "shimmer 2s linear infinite",
      },

      /* ─── Background Images ─── */
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #0A1F44 0%, #1B3A6B 50%, #0A1F44 100%)",
        "hero-radial":
          "radial-gradient(ellipse at 30% 50%, rgba(27,58,107,0.6) 0%, rgba(10,31,68,0.95) 70%)",
        "gold-accent":
          "linear-gradient(90deg, #D4A843 0%, #E8C86A 50%, #D4A843 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
