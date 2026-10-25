import { SectionHeading } from "@/app/_components/section-heading";
import { ProjectShowcase } from "@/app/_components/project-showcase";
import { site } from "@/lib/site";

export function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title="Production products, shipped with care."
          description="Five client platforms across healthcare, real estate and events — with ownership across interface, APIs and delivery."
        />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted/70 uppercase">
            Live product screenshots · click to browse
          </p>
          <p className="font-mono text-[10px] tracking-[0.14em] text-muted/70 uppercase">
            {site.projects.length} live products
          </p>
        </div>

        <ProjectShowcase projects={site.projects} />
      </div>
    </section>
  );
}
