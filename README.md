# jyo.codes

Personal portfolio for [Jyoti](https://github.com/Jyoti0902) — a software
engineer building production web applications.

A single-page, statically rendered portfolio built with **Next.js 16**,
**React 19**, **TypeScript** and **Tailwind CSS v4**, with an interactive
React Three Fiber hero, scroll-reveal motion and a dark/light theme.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** with a token-based design system
- **React Three Fiber / Three.js / Drei** — procedural 3D hero, no external models
- **Framer Motion** — reveals, magnetic buttons, layout-aware indicators
- **next/font** — Geist Sans, Geist Mono, Instrument Serif

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Editing content

Every string on the site — hero copy, projects, experience, skills, education,
links and the contact email — lives in [`lib/site.ts`](lib/site.ts). Update that
file first; the components only handle layout and behaviour.

```
app/
  _components/           Header, footer, icons, 3D hero, previews, motion primitives
  _sections/             Hero, work, experience, skills, about, contact
  globals.css            Theme tokens, surfaces, animation utilities
  layout.tsx             Fonts, metadata, dark-first theme bootstrap
  page.tsx               Section composition + Person JSON-LD
  icon.svg               Favicon
lib/site.ts              All site content and links
public/
  Jyoti-Resume.pdf       Downloadable résumé (phone number removed)
  og.png                 Social sharing image
```

## Design system

| Token         | Dark      | Light     |
| ------------- | --------- | --------- |
| `canvas`      | `#0B0F14` | `#F6F2E9` |
| `surface`     | `#0F151B` | `#FAF7F0` |
| `elevated`    | `#151D25` | `#FFFDF8` |
| `ink`         | `#F3F5F4` | `#10201B` |
| `muted`       | `#98A3AD` | `#56655F` |
| `accent`      | `#16C7A0` | `#0A6F5B` |
| `accent-2`    | `#A3F66B` | `#4F6F1E` |

`accent` doubles as the text/interaction colour, so it darkens in the light
theme to keep contrast. `accent-fill` is the solid button colour in both themes.
All tokens live in `app/globals.css` and are exposed to Tailwind through
`@theme inline`.

## 3D hero

`app/_components/hero-visual.tsx` renders a procedural faceted core with orbital
rings, glowing nodes and floating interface fragments. It:

- detects WebGL before mounting and falls back to a CSS composition
  (`hero-fallback.tsx`) on unsupported devices,
- is loaded with `next/dynamic` (`ssr: false`) so it never blocks first paint,
- honours `prefers-reduced-motion` by rendering a single static frame,
- re-colours itself when the theme changes.

## Project previews

All five project visuals in `app/_components/project-visual.tsx` are real
screenshots of the live products — three per project, cross-fading every ~5 s
while the frame is in view, pausing on hover and held static under
`prefers-reduced-motion`. Each frame is labelled **Live product screenshot** with
its domain in the title bar.

Images live in `public/projects/<slug>/01.jpg`–`03.jpg` (1600 px wide, JPEG
q80–82). Replace a file to update a shot. Setting `images: []` in `lib/site.ts`
falls back to the CSS **interface study** frame (`CrmPreview`) and is labelled
as such.

The work rows animate against their own scroll progress: a hairline accent bar
fills across the top edge, the preview lifts and flattens from a slight tilt and
drifts against the page, and each title assembles word by word on first view.
Sunny Homes uses the full-bleed 21/9 layout because its CRM screens are
ultra-wide.

## Theme

The theme is applied by a small inline script in `app/layout.tsx` before the
first paint, so there is no flash. **Dark is the default**; a stored preference
wins. The toggle swaps icons from the `data-theme` attribute, so it stays in
sync without a hydration mismatch.

## Accessibility

Semantic landmarks, a skip link, visible focus rings, `aria-label`/`aria-pressed`
on controls, Escape-to-close and scroll locking for the mobile menu, and
`prefers-reduced-motion` support across both CSS and Framer Motion.

## Deployment

The site builds to fully static output (`/`, `/robots.txt`, `/sitemap.xml`), so
it can be hosted anywhere. On Vercel, import the repo and deploy — no
environment variables required. Then point the `jyo.codes` domain at it.
