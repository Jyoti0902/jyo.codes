// ---------------------------------------------------------------------------
// All portfolio content lives here. Update this file to change copy, projects,
// links or skills — the components only handle layout and behaviour.
// ---------------------------------------------------------------------------

// GitHub Pages serves project sites from a sub-path, so files in `public/` are
// only reachable behind the build-time base path. `asset()` prefixes a public
// path with it; on a root domain the prefix is empty and nothing changes.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${basePath}${path}`;
}

export const site = {
  name: "Jyoti",
  domain: "jyo.codes",
  // Absolute URL of the deployed site — set by the deploy workflow.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://jyo.codes",
  role: "Software Engineer",
  location: "Mohali, Punjab, India",
  email: "jyotibrar0927@gmail.com",
  github: "https://github.com/Jyoti0902",
  linkedin: "https://linkedin.com/in/jyoti-8b7464242",
  resume: asset("/Jyoti-Resume.pdf"),
  available: true,

  focus: ["Frontend systems", "Reliable APIs", "Cloud delivery"],

  title: "Jyoti — Software Engineer",
  description:
    "Software Engineer with 2.5+ years of experience building production-ready web applications, responsive interfaces and reliable APIs.",

  hero: {
    status: "Open to opportunities",
    eyebrow: "Software Engineer",
    heading: "I build digital products that make an impact.",
    headingLead: "I build digital products that",
    headingAccent: "make an impact.",
    subheading:
      "I’m Jyoti, a Software Engineer with 2.5+ years of experience building production-ready web applications, responsive interfaces, and reliable APIs.",
    primaryCta: "Explore My Work",
    secondaryCta: "Get In Touch",
  },

  nav: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  stats: [
    { value: "2.5+", label: "Years in production engineering" },
    { value: "5", label: "Client products delivered" },
    { value: "3", label: "Markets served" },
  ],

  marquee: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "AWS",
    "Docker",
    "TanStack Query",
    "REST APIs",
  ],

  projects: [
    {
      slug: "dialysisongo",
      index: "01",
      title: "DialysisOnGo",
      category: "Healthcare booking",
      client: "Global",
      description:
        "A healthcare booking platform that helps patients and travellers find vetted dialysis clinics across India, check real-time chair availability and book sessions with no booking fees.",
      contribution: [
        "Collaborated with a cross-functional team to build the platform.",
        "Developed responsive, multilingual interfaces.",
        "Integrated functionality across patient, clinic, and admin modules.",
      ],
      stack: ["Next.js", "TypeScript", "PostgreSQL"],
      href: "https://dialysisongo.com/",
      images: [
        "/projects/dialysisongo/01.jpg",
        "/projects/dialysisongo/02.jpg",
        "/projects/dialysisongo/03.jpg",
      ],
      preview: "booking",
      tone: "mint",
      featured: true,
    },
    {
      slug: "sunnyhomes-crm",
      index: "02",
      title: "Sunny Homes Builders CRM",
      category: "Real-estate CRM",
      client: "Australia",
      description:
        "A custom CRM for an Australian home builder — lead opportunities, jobs, WHS, forms and reporting in one workspace, with per-lead activity timelines and document checklists.",
      contribution: [
        "Developed reusable UI components and responsive CRM interfaces.",
        "Integrated APIs using SWR.",
        "Implemented forms, validation, and dashboard features.",
      ],
      stack: ["React.js", ".NET", "SQL", "SWR"],
      href: "https://crm.sunnyhomes.com.au/",
      images: [
        "/projects/sunnyhomes/01.jpg",
        "/projects/sunnyhomes/02.jpg",
        "/projects/sunnyhomes/03.jpg",
      ],
      preview: "crm",
      tone: "lime",
      featured: false,
    },
    {
      slug: "tracevenue",
      index: "03",
      title: "TraceVenue",
      category: "Event platform",
      client: "Multi-tenant B2B2C",
      description:
        "A multi-tenant B2B2C venue booking platform where planners discover venues, request and compare quotations, and manage contracts — with real-time booking sync across customers, venue admins and super admins.",
      contribution: [
        "Engineered the platform on the MERN stack with Socket.IO real-time booking synchronisation.",
        "Implemented JWT authentication and RBAC across customer, venue-admin and super-admin roles.",
        "Automated proposal workflows and supported 100+ venue bookings, deployed on AWS EC2, Docker and S3.",
      ],
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO"],
      href: "https://tracevenue.com/",
      images: [
        "/projects/tracevenue/01.jpg",
        "/projects/tracevenue/02.jpg",
        "/projects/tracevenue/03.jpg",
      ],
      preview: "venue",
      tone: "mint",
      featured: false,
    },
    {
      slug: "vitalwatch365",
      index: "04",
      title: "VitalWatch 365",
      category: "Digital healthcare",
      client: "United States",
      description:
        "A remote patient monitoring platform combining personalised care plans, virtual physical therapy and IoT device telemetry for patients and clinicians across the US.",
      contribution: [
        "Developed and maintained platform features.",
        "Integrated APIs and managed application state.",
        "Improved reusable components and healthcare workflows.",
      ],
      stack: ["React.js", ".NET", "SQL", "REST APIs"],
      href: "https://vitalwatch365.com/",
      images: [
        "/projects/vitalwatch/01.jpg",
        "/projects/vitalwatch/02.jpg",
        "/projects/vitalwatch/03.jpg",
      ],
      preview: "vitals",
      tone: "lime",
      featured: false,
    },
    {
      slug: "appy-saude",
      index: "05",
      title: "Appy Saúde",
      category: "Healthcare discovery",
      client: "Angola",
      description:
        "A healthcare marketplace for Angola — pharmaceutical products, supplements and wellness items, plus a searchable directory of pharmacies, clinics and hospitals.",
      contribution: [
        "Supported product browsing and category navigation.",
        "Implemented and maintained responsive UI components.",
        "Integrated APIs and improved application state management.",
      ],
      stack: ["React.js", ".NET", "SQL", "REST APIs"],
      href: "https://appysaude.co.ao/",
      images: [
        "/projects/appysaude/01.jpg",
        "/projects/appysaude/02.jpg",
        "/projects/appysaude/03.jpg",
      ],
      preview: "catalog",
      tone: "mint",
      featured: false,
    },
  ],

  experience: {
    company: "Sensation Software Solutions Pvt. Ltd.",
    role: "Software Engineer",
    type: "Full-time",
    period: "Jun 2024 — Present",
    location: "Mohali, Punjab",
    summary:
      "Building and maintaining production web applications for clients across healthcare, real estate, events and e-commerce — from reusable front-end systems to secure APIs and cloud deployments.",
    bullets: [
      "Engineered TraceVenue, a multi-tenant B2B2C venue booking platform on the MERN stack, with Socket.IO real-time booking sync and JWT-based auth with RBAC across customer, venue-admin and super-admin roles.",
      "Supported 100+ venue bookings and deployed the platform with AWS EC2, Docker and Amazon S3.",
      "Developed and enhanced Econiya (econiya.com) with Next.js, reusable front-end components and a custom CMS for content management.",
      "Built production web applications with React.js, Next.js, Node.js, Express.js and MongoDB, integrating REST APIs to support scalable features and efficient data exchange.",
      "Supported deployment and infrastructure on AWS EC2, S3 and Docker, and collaborated with cross-functional teams to improve reliability and performance.",
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Socket.IO",
      "AWS",
      "Docker",
    ],
    internship: {
      role: "Software Engineer Intern",
      period: "Jan 2024 — Jun 2024",
      summary:
        "Built React components and REST APIs for TraceMenu, a QR-based restaurant management platform.",
      bullets: [
        "Developed React components and RESTful APIs for TraceMenu, contributing to a 30% improvement in operational efficiency across 50+ restaurants.",
        "Implemented Redux-based cart management with automatic quantity aggregation and persistent state across refreshes.",
        "Used MongoDB transactions to keep orders, payments and inventory consistent, with rollback handling for failed payments.",
        "Optimised search with debouncing (60% fewer API calls) and added Socket.IO updates, pagination and Nodemailer email notifications.",
      ],
    },
  },

  skills: [
    {
      key: "frontend",
      label: "Frontend",
      caption: "Interfaces that hold up in production.",
      items: [
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Redux Toolkit",
        "Tailwind CSS",
        "React Bootstrap",
        "SWR",
        "TanStack Query",
      ],
    },
    {
      key: "backend",
      label: "Backend",
      caption: "APIs, auth and real-time flows.",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT",
        "RBAC",
        "WebSockets",
      ],
    },
    {
      key: "data",
      label: "Databases",
      caption: "Modelling and querying application data.",
      items: ["MongoDB", "PostgreSQL", "SQL"],
    },
    {
      key: "cloud",
      label: "Cloud & deployment",
      caption: "Shipping and running the product.",
      items: ["AWS EC2", "AWS S3", "Docker", "CI/CD", "Render", "Vercel"],
    },
    {
      key: "tools",
      label: "Tools",
      caption: "The everyday workspace.",
      items: [
        "Git",
        "GitHub",
        "Postman",
        "VS Code",
        "MongoDB Compass",
        "API Integration",
        "Performance Optimization",
      ],
    },
  ],

  about: [
    "I’m a Software Engineer with 2.5+ years of professional experience building production web applications. My work sits across responsive frontend engineering, API integration and the delivery details that make a product dependable.",
    "I’ve shipped client platforms across healthcare, real estate, events and e-commerce — working with React, Next.js, TypeScript, Node.js and Express, alongside SQL and NoSQL databases. I’m comfortable building real-time booking flows, custom CMS tooling, authentication and role-based access, and supporting deployments on AWS and Docker.",
    "I care about clear interfaces, reliable data flows and code that stays easy to change. I’m continuously learning and focused on building products that hold up for real users.",
  ],

  strengths: [
    "Production web application development",
    "Responsive frontend engineering",
    "REST API integration & state management",
    "JWT authentication & role-based access",
    "Cloud deployment with AWS & Docker",
    "Cross-functional delivery",
  ],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Panjab University, SSG Regional Centre",
      period: "Sep 2022 — Aug 2024",
    },
    {
      degree: "Bachelor of Science in Computer Science (B.Sc.)",
      school: "SD College, Kurukshetra University",
      period: "Jul 2019 — Aug 2022",
    },
  ],

  contact: {
    heading: "Have an interesting problem to solve?",
    accent: "Let’s build something meaningful.",
    body: "I’m open to software engineering roles and product work. Email is the best way to reach me — tell me what you’re building and where you need help.",
  },

  footerNote: "Built with Next.js, TypeScript and Tailwind CSS. No templates harmed.",
} as const;

export type Project = (typeof site.projects)[number];
