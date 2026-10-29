// ---------------------------------------------------------------------------
// Momo the site guide lives in every corner of the page. All of her lines live
// here so the copy stays in one place — components decide when to say them.
// Keep lines short: the speech bubble is small and should never cover the page.
// Lines should name the actual detail (product, stack, place) rather than just
// react to it — she is a guide, not a cheerleader.
// ---------------------------------------------------------------------------

export type RabbitMood = "idle" | "happy" | "curious" | "excited" | "sleepy";

export type MomoExpression =
  | "neutral"
  | "wink_thumbs"
  | "double_thumbs"
  | "love"
  | "thinking"
  | "surprised"
  | "waving"
  | "coding"
  | "pointing"
  | "sleepy"
  | "coffee"
  | "peeking"
  | "idea"
  | "reading"
  | "celebrate"
  | "tired"
  | "confused"
  | "finger_heart";

export const MOMO_STICKERS: Record<MomoExpression, string> = {
  neutral: "/momo/momo-default.png",
  wink_thumbs: "/momo/stickers/momo-wink-thumbs-up.png",
  double_thumbs: "/momo/stickers/momo-double-thumbs-up.png",
  love: "/momo/stickers/momo-love-chin.png",
  thinking: "/momo/stickers/momo-thinking-question.png",
  surprised: "/momo/stickers/momo-surprised-wow.png",
  waving: "/momo/stickers/momo-waving-hello.png",
  coding: "/momo/stickers/momo-laptop-coding.png",
  pointing: "/momo/stickers/momo-pointing-right.png",
  sleepy: "/momo/stickers/momo-sleepy-zzz.png",
  coffee: "/momo/stickers/momo-coffee-tea.png",
  peeking: "/momo/stickers/momo-peeking-side.png",
  idea: "/momo/stickers/momo-idea-lightbulb.png",
  reading: "/momo/stickers/momo-reading-book.png",
  celebrate: "/momo/stickers/momo-celebrate-fists.png",
  tired: "/momo/stickers/momo-tired-bored.png",
  confused: "/momo/stickers/momo-confused-hmm.png",
  finger_heart: "/momo/stickers/momo-finger-heart-wink.png",
};

export const rabbitLines = {
  greeting: [
    "Hi, I'm Momo! 👋 Hover anything and I'll tell you what's inside.",
    "Psst… I'm Momo. I know where every detail lives ✨",
  ],

  sleep: [
    "Wake me up when you need me… 💤",
    "Napping right here in my circle! Move around to wake me 😴",
  ],

  click: [
    "Boop! Jyoti builds with React, Next.js and Node ✨",
    "DialysisOnGo is the flagship — clinic booking across India 🩺",
    "Five live client products live under Work 👀",
    "Since Jan 2024: Software Engineer at Sensation Software Solutions 💼",
    "MCA, Panjab University — and a lot of production code 🎓",
  ],

  nav: {
    home: [
      "Back to the top: 2.5+ years, 5 products, 3 markets 🎈",
      "Hero bit — featured project is DialysisOnGo ✨",
    ],
    work: [
      "Five live products: DialysisOnGo, Sunny Homes, TraceVenue, VitalWatch, Appy Saúde 👀",
      "Healthcare, real estate and events — all shipped for real clients ✨",
    ],
    experience: [
      "Software Engineer at Sensation since Jan 2024, Mohali 💼",
      "React, Next, Node and Express, with AWS and Docker for delivery 🧰",
    ],
    skills: [
      "React, Next, TypeScript, Node, Express, MongoDB, PostgreSQL, AWS, Docker 🛠️",
      "Ten frontend tools, six backend, three databases, six cloud 🌸",
    ],
    about: [
      "MCA from Panjab University, B.Sc. from Kurukshetra 🌸",
      "Based in Mohali, Punjab — open to roles and product work ☕",
    ],
    contact: [
      "jyotibrar0927@gmail.com — the fastest way to reach her 💌",
      "GitHub @Jyoti0902 and LinkedIn, right here 💗",
    ],
  },

  section: {
    work: [
      "Five client platforms: healthcare, real estate, events. Pick one 👈",
      "Each project has three real screenshots — arrows page through them ✨",
    ],
    experience: [
      "Sensation Software Solutions, Jan 2024 → now: six lines of real impact 💼",
      "React, Next, TypeScript, Node, Express, MongoDB, Postgres, AWS, Docker 🧰",
    ],
    skills: [
      "Ten frontend tools, six backend, three databases, six cloud 🛠️",
      "Hover a card — I'll name what's actually inside 🌸",
    ],
    about: [
      "MCA 2024, B.Sc. 2022, and six strengths she uses at work 🌷",
      "Clear interfaces, reliable data, code that stays easy to change ☕",
    ],
    contact: [
      "Email jyotibrar0927@gmail.com — or copy it with one click 💌",
      "Open to full-time roles and product work, Mohali or remote 👋",
    ],
  },

  hero: {
    primary: ["Explore My Work — five live client products inside ✨"],
    secondary: ["Get In Touch — email is jyotibrar0927@gmail.com 💗"],
    resume: ["One click: MCA, 2.5+ years, React / Next / Node — page one 📄"],
    shot: [
      "DialysisOnGo — real clinics in Bangalore, Chennai and Mumbai 🩺",
      "Featured project: three screenshots, paged by the dots above 👀",
    ],
    social: ["GitHub @Jyoti0902 · LinkedIn /in/jyoti-8b7464242 ✨"],
    stats: [
      "2.5+ years in production · 5 client products · 3 markets 📦",
      "Markets: Australia, the United States and Angola 🌍",
    ],
  },

  project: {
    dialysisongo: [
      "DialysisOnGo — clinic booking across India, no booking fees 🩺",
      "Next.js, TypeScript and PostgreSQL, built with a cross-functional team 🧩",
    ],
    "sunnyhomes-crm": [
      "Sunny Homes — CRM for an Australian builder: leads, jobs, WHS 📋",
      "React on the front, .NET and SQL behind it, SWR for the APIs 🦘",
    ],
    tracevenue: [
      "TraceVenue — venues, quotations and contracts in one marketplace 🎪",
      "React, Node, Express and MongoDB, with real-time notifications 🔔",
    ],
    vitalwatch365: [
      "VitalWatch 365 — remote patient monitoring for US clinicians 🫀",
      "Care plans, virtual physio and IoT device telemetry in one app 📈",
    ],
    "appy-saude": [
      "Appy Saúde — pharmacy catalogue and clinic directory in Angola 🇦🇴",
      "React, .NET and SQL, with searchable pharmacies and hospitals 🏥",
    ],
  },

  shot: [
    "Click the shot to open the live site — three screens per project ↗",
    "Each frame is the real product, not a mockup ✨",
  ],

  skillGroup: {
    frontend: [
      "React, Next, TypeScript, Redux Toolkit, Tailwind, SWR, TanStack Query 🌸",
      "Ten tools for interfaces that hold up in production ✨",
    ],
    backend: [
      "Node and Express APIs with JWT auth, RBAC and WebSockets 🔧",
      "Six backend tools — auth and real-time flows included 🔐",
    ],
    data: ["MongoDB for documents, PostgreSQL and SQL for relational data 🗂️"],
    cloud: [
      "AWS EC2, S3, Docker and CI/CD — plus Render and Vercel deploys 🚀",
      "Six ways to ship, and she has used all of them ✨",
    ],
    tools: ["Git, GitHub, Postman, VS Code, MongoDB Compass 🛠️"],
  },

  experience: {
    role: [
      "Software Engineer at Sensation Software Solutions, Jan 2024 → now 💼",
      "Full-time in Mohali — healthcare, real estate and event products ✨",
    ],
    toolkit: ["React, Next, TypeScript, Node, Express, MongoDB, Postgres, AWS, Docker 🧰"],
    numbers: [
      "2.5+ years · 5 products · clients in India, Australia, the US, Angola 🔢",
      "Healthcare twice, real estate, events and a pharmacy marketplace 📦",
    ],
    education: [
      "MCA, Panjab University (2024) · B.Sc. CS, Kurukshetra (2022) 🎓",
      "Master of Computer Applications at SSG Regional Centre 🎓",
    ],
  },

  about: {
    story: [
      "2.5+ years across healthcare, real estate and events — front end to deploys ☕",
      "React, Next, TypeScript, Node — plus auth, state and AWS delivery 🌸",
    ],
    glance: [
      "Mohali, Punjab · Sensation Software Solutions · open to opportunities 📋",
      "Focus: React, Next.js, Node.js — status: available 🌷",
    ],
    strengths: [
      "Frontend systems, REST APIs, JWT/RBAC, AWS + Docker, delivery ✨",
      "Six strengths, all used on client work — no filler 👋",
    ],
  },

  contact: {
    panel: [
      "jyotibrar0927@gmail.com — tell her what you're building 💌",
      "Email her, or copy the address straight from this panel 📋",
    ],
    copy: ["Copied jyotibrar0927@gmail.com — paste it somewhere nice 📋"],
    links: ["GitHub @Jyoti0902 · LinkedIn /in/jyoti-8b7464242 · email ✨"],
    status: ["Open to full-time roles and product work — Mohali or remote 🌷"],
  },

  ticker: [
    "React, Next, TypeScript, Node, Express, MongoDB, Postgres, Tailwind, AWS, Docker 🛠️",
    "Twelve tools sliding by — TanStack Query and REST APIs included 👋",
  ],

  theme: {
    light: ["Lights on! ☀️", "Bright and clean, just like the site ✨"],
    dark: ["Lights off… spooky 🌙", "Dark mode? Excellent taste 👋"],
  },
} as const;

/** Pick a random line. Only call this from event handlers, never during SSR. */
export function pick<T>(lines: readonly T[]): T {
  return lines[Math.floor(Math.random() * lines.length)];
}
