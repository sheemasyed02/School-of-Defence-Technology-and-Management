# School of Defence Technology and Management — Website

Production-ready institutional website built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **GSAP**.

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

| Technology   | Purpose                |
| ------------ | ---------------------- |
| Next.js 14   | App Router framework   |
| TypeScript   | Type safety            |
| Tailwind CSS | Utility-first styling  |
| GSAP         | Scroll & entrance anim |
| clsx + twMerge | Class utilities      |

## Project Structure

```
src/
├── app/            # Next.js App Router pages & layouts
├── components/     # Reusable UI components
├── lib/            # Utility functions
├── hooks/          # Custom React hooks
├── styles/         # Global & module styles
├── animations/     # GSAP animation utilities
├── constants/      # Site-wide constants & config
public/             # Static assets (logo, images)
```
