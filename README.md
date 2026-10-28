# jyo.codes

Personal portfolio for [Jyoti](https://github.com/Jyoti0902) — a software
engineer building production web applications.

The site is a single-page, statically exported portfolio dressed as a
**terminal**: prompt lines instead of section eyebrows, a working shell in the
hero, `⌘K` command palette, an `ls`-style project explorer, `git log`
experience and a `tree` of the toolkit — with dark and light themes, both
built from the same token set.

## Stack

- **Next.js 16** (App Router, Turbopack, static export to `out/`)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** with a token-based design system
- **Framer Motion** — reveals, palette, tab transitions
- **next/font** — Geist Sans for prose, Geist Mono for the shell UI

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

## The shell

The hero is a real input, not a mock. It boots with `whoami`, `pwd` and
`cat focus.txt`, then hands the prompt over.

| Command             | What it does                                                 |
| ------------------- | ------------------------------------------------------------ |
| `help`              | List every command                                           |
| `whoami`            | Role, experience and location                                |
| `ls`                | List sections                                                |
| `cd <section>`      | Scroll to work / experience / skills / about / contact        |
| `open <target>`     | Open a project slug, github, linkedin, resume or email       |
| `projects`          | List shipped products                                        |
| `stack`             | Print the toolkit                                            |
| `theme [light\|dark]` | Switch appearance (no argument toggles)                    |
| `clear`             | Clear the pane (`⌘L` / `Ctrl+L` also works)                  |
| `date`, `neofetch`, `echo`, `sudo`, `exit` | The usual             |

`↑` / `↓` walk the history, `Tab` completes a command, and `Esc` / `Ctrl+C`
clear the current line. Under `prefers-reduced-motion` the boot typing is
skipped and the full transcript appears immediately.

Outside the hero, `⌘K` / `Ctrl+K` (or `/` when not typing) opens the command
palette: jump to a section, open a project, copy the email address, switch the
theme.

## Editing content

Every string on the site — hero copy, projects, experience, skills, education,
links and the contact email — lives in [`lib/site.ts`](lib/site.ts). Update that
file first; the components only handle layout and behaviour. The section nav
and the shell identity (`jyoti@codes`) also come from there.

```
app/
  _components/
    terminal.tsx          Prompt, window chrome, kbd primitives
    hero-shell.tsx        The interactive hero terminal
    command-palette.tsx   ⌘K palette + provider
    project-explorer.tsx  Project table + screenshot pane
    site-header.tsx       Sticky chrome, active section, mobile nav
    site-footer.tsx       Links + editor status bar
  _sections/              Hero, ticker, work, experience, skills, about, contact
  globals.css             Theme tokens, surfaces, CRT texture, motion utilities
  layout.tsx              Fonts, metadata, theme bootstrap, palette provider
  page.tsx                Section composition + Person JSON-LD
lib/site.ts               All site content and links
lib/theme.ts              Theme read/write + section scrolling helpers
public/
  projects/<slug>/        Real screenshots, three per project
  Jyoti-Resume.pdf        Downloadable résumé (phone number removed)
  og.png                  Social sharing image
```

## Design system

| Token      | Dark      | Light     |
| ---------- | --------- | --------- |
| `canvas`   | `#070b09` | `#f2f0e7` |
| `surface`  | `#0b100d` | `#faf8f0` |
| `elevated` | `#101713` | `#fffdf6` |
| `ink`      | `#e2f1e7` | `#10241a` |
| `muted`    | `#8ba295` | `#4d6156` |
| `faint`    | `#5d7166` | `#7c8c82` |
| `accent`   | `#48f09a` | `#087a49` |
| `accent-2` | `#ffcd6b` | `#92560a` |

Dark is phosphor green on near-black; light is a warm "paper terminal". All
tokens live in `app/globals.css` and are exposed to Tailwind through
`@theme inline`, so components never hardcode a colour. `accent-fill` is the
solid button colour in both themes, paired with `accent-fill-ink`.

Atmosphere is two fixed overlays: `.crt` (scanlines plus vignette) and `.noise`.
Both are `pointer-events: none`, sit above the page and drop to a barely-there
opacity so they never interfere with text or buttons.

## Motion

- Section content fades and lifts in on first view (`Reveal`), staggered where
  it reads as one block.
- The hero boot types command by command; the block caret blinks with
  `steps(1)` so it stays crisp.
- Project rows are a `tablist`: `↑` `↓` `Home` `End` move between them, the
  detail pane cross-fades, and the screenshot pane is manually pageable.
- The stack ticker scrolls continuously and pauses on hover/focus.
- `prefers-reduced-motion` disables typing, the caret, the marquee and every
  long transition in both CSS and Framer Motion.

## Accessibility

Semantic landmarks, a skip link, `aria-current` on the active section, a
proper `tablist`/`tabpanel` for projects, `role="log"` for the shell output,
`aria-live` for copy confirmations, Escape-to-close and focus return for both
the palette and the mobile menu, visible focus rings, and a full
`prefers-reduced-motion` path.

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
