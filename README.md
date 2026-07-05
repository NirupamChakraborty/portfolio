# Nirupam Chakraborty — Portfolio

A multi-page React portfolio built with Vite, React Router, Framer Motion,
and Three.js — the "Aurora" design system (deep space-navy dark mode /
soft lavender light mode, violet → cyan gradient accents, glassmorphic
floating nav + dock, and a theater-curtain page transition).

**Live site:** https://portfolio-beta-one-82.vercel.app

## Stack
- **React 19 + Vite** — app shell and build tooling
- **React Router DOM (v7)** — real routes (`/about`, `/projects/:slug`, etc.),
  not anchor-link scrolling
- **Framer Motion** — scroll-triggered 3D "drop-in" card animations, the
  theater-curtain transition, and micro-interactions
- **Three.js** — lightweight animated wireframe + particle scene in the hero,
  lazy-loaded into its own chunk so it doesn't block first paint
- **Live data** — GitHub REST API + a public LeetCode stats API, rendered on
  the `/stats` page (see `src/data/siteConfig.js` for the `GITHUB_USERNAME`
  / `LEETCODE_USERNAME` constants and `src/components/StatsCards.jsx` for the
  fetch logic)

## Structure
```
src/
  App.jsx                 Router setup (createBrowserRouter)
  layouts/RootLayout.jsx  Persistent shell: curtain, nav, dock, footer, theme
  pages/                  One file per route (Home, About, Experience,
                           Projects, ProjectDetail, Skills, Stats, Contact,
                           NotFound)
  components/             Navbar, MobileDock, Curtain, Scene3D, StatsCards,
                           Cursor, ThemeToggle, Ticker, Footer, etc.
  data/                   Content — experiences.js, projects.js, skills.js,
                           techLogos.js, siteConfig.js
  index.css               The entire Aurora design system (CSS variables
                           drive both themes — nothing is hardcoded per-theme
                           outside of the `:root` / `[data-theme='light']`
                           blocks)
```

### Theming
Everything reads from CSS custom properties (`--bg`, `--accent`,
`--accent-2`, `--surface`, `--text`, `--muted`, `--nav-bg`, etc.) defined
once in `index.css`. Toggling the sun/moon icon flips `data-theme` on
`<html>` and every component follows automatically — there's no
theme-specific styling scattered through JSX.

### Page transition
`src/components/Curtain.jsx` renders two pleated fabric panels that slide in
from the sides to meet at center (covering the route swap), hold briefly
with the brand mark glowing, then slide back apart — a real theater-curtain
open/close, not a fade. It plays once on first load and again on every
route change.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Notes
- Update `GITHUB_USERNAME` / `LEETCODE_USERNAME` in `src/data/siteConfig.js`
  if either handle changes.
- Project entries live in `src/data/projects.js` — each needs a unique
  `slug` (used for the `/projects/:slug` route).
- The three.js hero scene (`src/components/Scene3D.jsx`) automatically
  reduces particle count and pixel ratio on small screens for performance.






























































































































  
