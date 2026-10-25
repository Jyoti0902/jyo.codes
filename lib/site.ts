// ---------------------------------------------------------------------------
// All site content lives here. Update this file to change copy, projects or
// links — the components only handle layout and behaviour.
// ---------------------------------------------------------------------------

export const categories = ["All", "Healthcare", "CRM", "Events"] as const;

export type Category = (typeof categories)[number];

export const site = {
  name: "Jyoti",
  domain: "jyo.codes",
  url: "https://jyo.codes",
  role: "Software Engineer",
  location: "Mohali, Punjab, India",
  email: "jyotibrar0927@gmail.com",
  phone: "+91 7814467486",
  github: "https://github.com/Jyoti0902",
  linkedin: "https://linkedin.com/in/jyoti-8b7464242",
  resume: "/resume.pdf",
  available: true,

  title: "Jyoti — Software Engineer",
  description:
    "Software engineer with 2.5+ years of experience building production web applications with React, Next.js, TypeScript and Node.js.",

  hero: {
    eyebrow: "Full-stack engineer",
    heading: "I build web products that ship.",
    subheading:
      "I’m Jyoti — a software engineer with 2.5+ years of experience turning complex requirements into fast, reliable interfaces and APIs.",
  },

  nav: [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  stats: [
    { value: "2.5+", label: "Years shipping production software" },
    { value: "5", label: "Client products delivered" },
    { value: "3", label: "Countries served" },
  ],

  marquee: [
    "React",
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
      title: "DialysisOnGo",
      category: "Healthcare" as const,
      description:
        "A healthcare booking platform that helps patients find and book dialysis sessions while travelling. Built the multilingual patient, clinic and admin flows, plus CMS-managed content.",
      highlights: [
        "Multilingual patient, clinic and admin journeys",
        "Session search and booking workflows",
        "CMS-managed content and role-based access",
      ],
      tags: ["Next.js", "TypeScript", "PostgreSQL"],
      href: "https://dialysisongo.com/",
      linkLabel: "View live site",
      featured: true,
    },
    {
      slug: "sunnyhomes-crm",
      title: "Sunny Homes Builders CRM",
      category: "CRM" as const,
      description:
        "An Australia-based real-estate CRM covering lead tracking, property management and sales workflows. Built reusable UI, dashboards and API-driven forms with SWR.",
      highlights: [
        "Lead and property management",
        "Sales workflows and dashboards",
        "API-driven forms with validation",
      ],
      tags: ["React.js", ".NET", "SQL", "SWR", "Tailwind CSS"],
      href: "https://crm.sunnyhomes.com.au/",
      linkLabel: "View live site",
      featured: false,
    },
    {
      slug: "tracevenue",
      title: "TraceVenue",
      category: "Events" as const,
      description:
        "A multi-role event platform connecting customers, vendors and service providers. Built booking and quotation APIs, contract workflows and real-time notifications.",
      highlights: [
        "Multi-role booking and quotation flows",
        "Vendor and contract workflows",
        "REST APIs and real-time notifications",
      ],
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "AWS"],
      href: "https://tracevenue.com/",
      linkLabel: "View live site",
      featured: false,
    },
    {
      slug: "vitalwatch365",
      title: "VitalWatch 365",
      category: "Healthcare" as const,
      description:
        "A US telehealth platform for remote patient monitoring, personalised care plans and virtual physical therapy. Worked across patient progress, guided sessions and notifications.",
      highlights: [
        "Remote patient monitoring workflows",
        "Personalised care plans and progress",
        "Guided therapy sessions and alerts",
      ],
      tags: ["React.js", ".NET", "SQL", "REST APIs"],
      href: "https://vitalwatch365.com/",
      linkLabel: "View live site",
      featured: false,
    },
    {
      slug: "appy-saude",
      title: "Appy Saúde",
      category: "Healthcare" as const,
      description:
        "A healthcare discovery platform for Angola covering pharmacy products, supplements and nearby clinics and hospitals. Focused on responsive browsing and reliable API state.",
      highlights: [
        "Product, supplement and category browsing",
        "Pharmacy, clinic and hospital discovery",
        "Responsive layouts and API synchronisation",
      ],
      tags: ["React.js", ".NET", "SQL", "REST APIs"],
      href: "https://appysaude.co.ao/",
      linkLabel: "View live site",
      featured: false,
    },
  ],

  experience: {
    company: "Sensation Software Solutions Pvt. Ltd.",
    role: "Software Engineer",
    type: "Full-time",
    period: "Jan 2024 — Present",
    location: "Mohali, Punjab, India",
    summary:
      "Shipping production software for clients across healthcare, real estate and events — from reusable front-end systems to secure APIs and cloud deployments.",
    bullets: [
      "Develop and maintain production web applications with React.js, Next.js, Node.js, Express.js and MongoDB.",
      "Build responsive, reusable UI components and keep experiences consistent across devices.",
      "Integrate REST APIs with TanStack Query and SWR for fetching, caching and synchronisation.",
      "Implement JWT authentication and role-based access control for secure workflows.",
      "Deploy and configure environments on AWS EC2, AWS S3 and Docker.",
      "Work with cross-functional teams in an Agile setup to ship features and fix production issues.",
    ],
    stack: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
  },

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "Panjab University, SSG Regional Centre",
      period: "Sep 2022 — Aug 2024",
    },
    {
      degree: "B.Sc. in Computer Science",
      school: "SD College, Kurukshetra University",
      period: "Jul 2019 — Aug 2022",
    },
  ],

  skills: [
    {
      label: "Frontend",
      items: [
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript (ES6+)",
        "Redux Toolkit",
        "TanStack Query",
        "SWR",
        "Tailwind CSS",
        "React Bootstrap",
        "HTML5",
        "CSS3",
      ],
    },
    {
      label: "Backend",
      items: [
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT",
        "Role-based access control",
        "WebSockets",
      ],
    },
    {
      label: "Data",
      items: ["MongoDB", "PostgreSQL", "SQL"],
    },
    {
      label: "Cloud & DevOps",
      items: ["AWS EC2", "AWS S3", "Docker", "CI/CD", "Vercel", "Render"],
    },
    {
      label: "Tools & practice",
      items: [
        "Git",
        "GitHub",
        "Postman",
        "VS Code",
        "MongoDB Compass",
        "MVC",
        "Responsive design",
        "Performance optimisation",
      ],
    },
  ],

  about: [
    "I’m a software engineer based in Mohali, Punjab, with 2.5+ years of experience building production web applications. Most of my work sits in the React and Node.js ecosystem — responsive interfaces on the front, secure APIs and data flows behind them.",
    "I’ve worked with teams and clients across Australia, the USA and Angola on healthcare platforms, real-estate CRMs and event marketplaces. I like clear interfaces, dependable APIs and code that’s still easy to change a year later.",
    "Outside of delivery work, I’m usually exploring better ways to structure front-end systems, improve performance and make complex workflows feel simple.",
  ],

  footerNote: "Designed and built with Next.js, TypeScript and Tailwind CSS.",
} as const;

export type Project = (typeof site.projects)[number];
