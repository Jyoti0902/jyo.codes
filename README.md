# jyo.codes

Personal site for [Jyoti](https://github.com/Jyoti0902) — a statically rendered
portfolio built with Next.js, TypeScript and Tailwind CSS.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- Geist via `next/font`

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

Almost every string on the site — bio, projects, stack, links, email — lives in
[`lib/site.ts`](lib/site.ts). Update that file first; the page components only
handle layout.

```
app/
  _components/     Header and footer
  layout.tsx       Fonts, metadata, page chrome
  page.tsx         Hero, work, about, contact
  robots.ts        robots.txt
  sitemap.ts       sitemap.xml
lib/site.ts        All site content and links
```

## Deployment

The site builds to fully static output (`/`, `/robots.txt`, `/sitemap.xml`), so
it can be hosted anywhere. On Vercel, import the repo and deploy — no
environment variables required. Then point the `jyo.codes` domain at it.
