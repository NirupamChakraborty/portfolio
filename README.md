# Nirupam Chakraborty — Portfolio

A single-page React portfolio built with Vite, Framer Motion, and a hand-rolled
orange/black "editorial" design system.

## Stack
- React 19 + Vite
- Framer Motion (scroll/entrance animations)
- Live data: GitHub REST API + a public LeetCode stats API (see `src/App.jsx`,
  `GITHUB_USERNAME` / `LEETCODE_USERNAME` constants)

## Structure
Everything — layout, styles, and page data (experience, projects, skills) —
lives in `src/App.jsx`, which is the actual component rendered by
`src/main.jsx`. The files under `src/components/` and `src/data/` are legacy
scaffolding kept for reference; they are not imported anywhere.

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
