import { About } from "@/app/_sections/about";
import { Contact } from "@/app/_sections/contact";
import { Experience } from "@/app/_sections/experience";
import { Hero } from "@/app/_sections/hero";
import { Skills } from "@/app/_sections/skills";
import { TechMarquee } from "@/app/_sections/tech-marquee";
import { Work } from "@/app/_sections/work";
import { site } from "@/lib/site";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: site.email,
  jobTitle: site.role,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mohali",
    addressRegion: "Punjab",
    addressCountry: "IN",
  },
  worksFor: {
    "@type": "Organization",
    name: site.experience.company,
  },
  alumniOf: site.education.map((item) => ({
    "@type": "CollegeOrUniversity",
    name: item.school,
  })),
  sameAs: [site.github, site.linkedin],
  knowsAbout: [
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
};

export default function Home() {
  return (
    <div id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <Hero />
      <TechMarquee />
      <Work />
      <Experience />
      <Skills />
      <About />
      <Contact />
    </div>
  );
}
