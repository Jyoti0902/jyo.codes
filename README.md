# jyo.codes

Personal portfolio for [Jyoti](https://github.com/Jyoti0902) — a software
engineer building production web applications.

A single-page, statically rendered portfolio built with **Next.js 16**,
**React 19**, **TypeScript** and **Tailwind CSS v4**. It includes a dark/light
theme, scroll-triggered animations, interactive project filters and the real
project history from the résumé.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- Geist via `next/font`
- No animation or icon libraries — CSS transitions and inline SVG icons

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

Almost every string on the site — bio, projects, experience, skills, links,
email — lives in [`lib/site.ts`](lib/site.ts). Update that file first; the page
components only handle layout and behaviour.

```
app/
  _components/           Header, footer, icons, theme toggle, reveal, filters
  _sections/             Hero, work, experience, skills, about, contact
  globals.css            Theme tokens, animation and base styles
  layout.tsx             Fonts, metadata, theme bootstrap script
  page.tsx               Section composition + Person JSON-LD
lib/site.ts              All site content and links
public/resume.pdf        Downloadable résumé
```

## Theme

The theme is applied by a small inline script in `app/layout.tsx` before the
first paint, so there is no flash. The preference is stored in `localStorage`
and falls back to the operating system setting. The toggle swaps icons from the
`data-theme` attribute, so it stays in sync without a hydration mismatch.

## Deployment

The site builds to fully static output (`/`, `/robots.txt`, `/sitemap.xml`), so
it can be hosted anywhere. On Vercel, import the repo and deploy — no
environment variables required. Then point the `jyo.codes` domain at it.
