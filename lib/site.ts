// ---------------------------------------------------------------------------
// EDIT ME: every piece of text on the site lives here. Change these values
// instead of digging through the components.
// ---------------------------------------------------------------------------

export const site = {
  name: "Jyoti",
  domain: "jyo.codes",
  url: "https://jyo.codes",
  role: "Full-stack developer",
  location: "India",
  email: "hello@jyo.codes",
  github: "https://github.com/Jyoti0902",
  available: true,

  title: "Jyoti — Full-stack developer",
  description:
    "Full-stack developer building fast, accessible products for the web. TypeScript, React, Node.js and everything in between.",

  hero: {
    eyebrow: "Full-stack developer",
    heading: "Building thoughtful software for the web.",
    subheading:
      "I design and ship product-focused web applications — from the first sketch to the deploy that sticks. Currently focused on TypeScript, React and developer tooling.",
  },

  about: [
    "I'm Jyoti, a full-stack developer who cares about the details users feel but rarely notice: fast loads, honest interfaces, and code that stays readable a year later.",
    "Most of my work lives in the TypeScript ecosystem — React and Next.js on the front end, Node.js services behind them. I like small teams, short feedback loops, and shipping things that people actually use.",
  ],

  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  // Sample projects — replace with your own work.
  projects: [
    {
      title: "jyo.codes",
      description:
        "The site you're reading. A statically rendered portfolio built on Next.js and Tailwind, with zero client-side JavaScript for the core experience.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      href: "https://github.com/Jyoti0902/jyo.codes",
      linkLabel: "Source",
    },
    {
      title: "Pulse",
      description:
        "A lightweight analytics dashboard that turns raw event streams into readable product metrics, with a query builder built for non-technical teammates.",
      tags: ["React", "Node.js", "PostgreSQL"],
      href: "#work",
      linkLabel: "Case study",
    },
    {
      title: "Relay",
      description:
        "A real-time collaboration toolkit — presence, shared cursors and conflict-free documents in a small, typed SDK you can drop into any app.",
      tags: ["TypeScript", "WebSockets", "CRDTs"],
      href: "#work",
      linkLabel: "Case study",
    },
  ],

  stack: [
    {
      label: "Build",
      items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Vite"],
    },
    {
      label: "Serve",
      items: ["Node.js", "PostgreSQL", "Redis", "REST", "GraphQL"],
    },
    {
      label: "Ship",
      items: ["Git", "GitHub Actions", "Docker", "Vercel", "Playwright"],
    },
  ],

  footerNote: "Designed and built in the open.",
} as const;
