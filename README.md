# FloStudios.ai — Next.js + React

The FloStudios.ai landing page, built with **Next.js 15 (App Router)**, **React 19**, and **TypeScript**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server (hot reload)    |
| `npm run build` | Production build                     |
| `npm start`     | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Project structure

```
app/
  layout.tsx        Root layout, fonts, metadata/favicon
  page.tsx          Composes the section components
  globals.css       The full design system (CSS variables + all styles)
components/
  Nav.tsx           Fixed nav (hide-on-scroll behavior wired in SiteEffects)
  Hero.tsx          Video-background hero + animated content-creation scene
  Work.tsx          Project cards + "Design Arsenal" marquee (data-driven)
  Services.tsx      Service cards
  Podcast.tsx       "The Flo Frequency" band
  StudentImpact.tsx Built-by-Flearners cards + recruit banner
  Ecosystem.tsx     FloLabs ecosystem cards
  FinalCTA.tsx      Closing call-to-action
  Footer.tsx        Footer
  SiteEffects.tsx   'use client' — all scroll/reveal/counter/parallax/video JS
public/
  flostudios-logo.png
  assets/           Drop hero-bg.mp4 here to use a real video background
```

## Hero video

The hero shows a self-contained **animated content-creation scene** (a drifting
wall of clip tiles + waveform) by default. To use real footage, drop a file at:

```
public/assets/hero-bg.mp4
```

It fades in over the animated scene automatically once it loads.

## Notes

- Fonts (Sora + Inter) load via Google Fonts in `app/layout.tsx`. Swap to
  `next/font` if you want them self-hosted.
- All interactions respect `prefers-reduced-motion`.
- The custom-cursor and magnetic-button effects were intentionally removed per
  design feedback; the current interaction set is nav hide-on-scroll, scroll
  reveals, the arsenal marquee, animated counters, and hero scroll-parallax.
