# jyo.codes

Personal portfolio for [Jyoti](https://github.com/Jyoti0902) — a software
engineer building production web applications.

The site is a single-page, statically exported portfolio with a light-first,
editorial layout: white and zinc surfaces, a soft rose accent, and a strong
focus on selected work, experience and the tech stack. Dark mode is a full
counterpart built from the same token set.

## Stack

- **Next.js 16** (App Router, Turbopack, static export to `out/`)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** with a token-based design system
- **Framer Motion** — reveals, tab transitions, hero motion
- **next/font** — Geist Sans

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # static export to out/
npm run lint    # eslint
```

## The page

- **Hero** — availability, positioning, primary actions, a featured project
  preview and headline numbers.
- **Selected work** — five shipped products in a `tablist`. On desktop the
  project list sits beside a detailed, pageable screenshot; on smaller screens
  it becomes a horizontal chip strip above the detail panel.
- **Experience** — current role, impact bullets, the toolkit in use, headline
  numbers and education.
- **Tech stack** — grouped skill cards covering frontend, backend, data,
  cloud/deployment and everyday tools.
- **About** — a short narrative, at-a-glance facts and strengths.
- **Contact** — email call to action, copy-to-clipboard, social links and
  availability.

The technology ticker between the hero and work scrolls continuously and pauses
on hover or focus.

## Momo, the site guide

**Momo** lives in the bottom-right corner as a round badge: a cut-out portrait
sticker on the logo's pale pink (`#f9d8dd`), the same in both themes. She reads
along as you browse: hovering a nav item, project tab, skill card or contact
panel makes her say a short, contextual tip, and each section introduces itself
the first time it reaches the middle of the screen. The whole line catalogue
lives in [`lib/rabbit.ts`](lib/rabbit.ts), so the copy can be edited in one
place.

After roughly four seconds without pointer, keyboard or scroll activity she
naps — the portrait dims slightly, drifting `z`s appear and she says *"Wake me
up when you need me"* — she stays in the same round badge. Any interaction wakes
her, and clicking her directly always produces a line. Her bubble is announced
through `aria-live="polite"`, and everything — the drift, the hop, the sleep
state — is switched off for `prefers-reduced-motion`.

The portrait is [`public/momo/momo-portrait.png`](public/momo/momo-portrait.png):
the photo with its white background flood-filled away and a small transparent
margin trimmed, so it sits on the pink circle like a sticker. Swap the file to
change the face; keep the subject centred and cut out.

Components can opt in with `useRabbit().say(...)` from
[`app/_components/rabbit.tsx`](app/_components/rabbit.tsx), or — for
server-rendered cards — by wrapping them in
[`Hint`](app/_components/hint.tsx) and passing a list of lines. Lines are picked
at event time, which keeps server and client markup identical.

## Editing content

Every string on the site — hero copy, projects, experience, skills, education,
links and the contact email — lives in [`lib/site.ts`](lib/site.ts). Update that
file first; the components only handle layout and behaviour. Section navigation
also comes from there.

```
app/
  _components/
    project-explorer.tsx  Project tabs + screenshot pane
    section-heading.tsx   Numbered section intro
    reveal.tsx            Scroll-reveal helpers
    site-header.tsx       Sticky header, active section, mobile nav
    site-footer.tsx       Footer navigation + links
    rabbit.tsx            Momo the guide: provider, portrait badge, sleep/wake
    hint.tsx              Hover/focus wrapper that makes Momo speak
    tilt.tsx              Pointer-following 3D tilt + glare
    theme-toggle.tsx      Light/dark switch
  _sections/              Hero, ticker, work, experience, skills, about, contact
  globals.css             Theme tokens, surfaces, motion utilities
  layout.tsx              Fonts, metadata, theme bootstrap
  page.tsx                Section composition + Person JSON-LD
lib/site.ts               All site content and links
lib/rabbit.ts             Every line Momo can say
lib/theme.ts              Theme read/write helpers
public/
  projects/<slug>/        Real screenshots, three per project
  momo/momo-portrait.png  Cut-out portrait for the corner badge
  Jyoti-Resume.pdf        Downloadable résumé (phone number removed)
  og.png                  Social sharing image
```

## Design system

| Token             | Light     | Dark      |
| ----------------- | --------- | --------- |
| `canvas`          | `#fafafa` | `#0a0a0a` |
| `surface`         | `#ffffff` | `#101012` |
| `elevated`        | `#f4f4f5` | `#161618` |
| `line`            | `#e4e4e7` | `#27272a` |
| `ink`             | `#18181b` | `#ededed` |
| `muted`           | `#52525b` | `#a1a1aa` |
| `faint`           | `#71717a` | `#7e7e8a` |
| `accent`          | `#b02c4d` | `#fe9bae` |
| `accent-fill`     | `#fe9bae` | `#fe9bae` |
| `accent-fill-ink` | `#2a0a12` | `#2a0a12` |

Light is the default; a stored preference overrides it on load. All tokens live
in `app/globals.css` and are exposed to Tailwind through `@theme inline`, so
components never hardcode a colour. `accent-fill` is the solid button colour in
both themes, paired with `accent-fill-ink`.

Cards use `.card` (surface, hairline border, soft elevation) and `.card-hover`
for the shared lift-on-hover treatment. The only ambient decoration is the soft
rose `.aurora` wash behind the hero and contact panels.

## Motion

- Section content fades and lifts in on first view (`Reveal`), staggered where
  it reads as one block.
- The hero copy and stats enter in sequence; the featured project card drifts
  gently inside a pointer-tracking 3D tilt, its screenshots slide on a timer and
  can be paged with the dots overlaid on the image.
- Project tabs slide the detail pane in the direction you moved, and each
  screenshot pane tilts under the pointer, slowly pans (Ken Burns) and slides
  between frames with the arrow controls.
- Momo drifts and hops when she speaks; her portrait dims and drifting `z`s
  appear after a few idle seconds.
- The stack ticker scrolls continuously and pauses on hover/focus.
- Hover states lift cards and shift arrows without moving layout.
- `prefers-reduced-motion` disables the marquee, the status pulse, the hero
  drift, the tilts and every long transition in both CSS and Framer Motion.

## Accessibility

Semantic landmarks, a skip link, `aria-current` on the active section, a proper
`tablist`/`tabpanel` for projects with arrow/Home/End keys, `aria-live` for copy
confirmations and Momo's lines, a labelled button for the mascot, Escape-to-close
for the mobile menu, visible focus rings, and a full `prefers-reduced-motion`
path.

## Deployment

`next.config.ts` sets `output: "export"`, so `npm run build` writes plain HTML,
CSS and JS to `out/`. The GitHub Actions workflow in
`.github/workflows/deploy.yml` builds on every push to `main` and deploys to
GitHub Pages.

Pages serves project sites from a sub-path, so the workflow injects:

```yaml
NEXT_PUBLIC_BASE_PATH: /jyo.codes
NEXT_PUBLIC_SITE_URL: https://jyoti0902.github.io/jyo.codes
```

Moving to the `jyo.codes` custom domain is two values in that workflow:
`NEXT_PUBLIC_BASE_PATH: ""` and `NEXT_PUBLIC_SITE_URL: https://jyo.codes`.
