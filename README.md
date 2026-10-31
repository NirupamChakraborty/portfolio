# Nirupam Chakraborty — Portfolio

A multi-page React portfolio with a luxury automotive and terminal design:
carbon black, one racing red, instrument-style telemetry driven by scrolling,
and a keyboard command menu (Cmd/Ctrl + K).

**Live site:** https://portfolio-beta-one-82.vercel.app

## Stack
- **React 19 + Vite** — app shell and build tooling
- **React Router DOM (v7)** — real routes (`/about`, `/projects/:slug`, etc.)
- **Framer Motion** — scroll-linked animation and transitions
- **Archivo, JetBrains Mono, Inter** — self-hosted variable fonts
- **Live data** — GitHub REST API, rendered on the `/stats` page

## Structure
```
src/
  App.jsx                 Router setup (createBrowserRouter)
  layouts/RootLayout.jsx  Persistent shell: nav, footer, theme, motion config
  pages/                  One file per route
  components/             Navbar, Reveal, ScrollText, StackCards, Showcase,
                          PortraitZoom, LetterReveal, CountUp, PageHeader, etc.
  data/                   Content — experiences.js, projects.js, skills.js,
                          siteConfig.js
  lib/motion.js           Shared easing curve and spring
  index.css               Design tokens and all styles
```

### Theming
Colours are CSS custom properties defined once at the top of `index.css`. The
site opens in the dark theme until a visitor picks one with the toggle; a
small script in `index.html` applies it before first paint.

### Motion
Every animation shares the curve and spring in `src/lib/motion.js`. All
scroll-linked effects switch off when the visitor has requested reduced motion.

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
- Update `GITHUB_USERNAME` in `src/data/siteConfig.js` if the handle changes.
- Project entries live in `src/data/projects.js` — each needs a unique `slug`
  (used for the `/projects/:slug` route) and a `shot` screenshot in
  `public/projects/`.
- `vercel.json` sends every route to `index.html`, so deep links work.
