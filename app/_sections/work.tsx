import { ProjectFilter } from "@/app/_components/project-filter";
import { SectionHeading } from "@/app/_components/section-heading";

export function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-line py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="01 / Selected work"
          title="Work that made it to production."
          description="Five client products across healthcare, real estate and events — built, shipped and maintained with real users."
        />

        <div className="mt-10">
          <ProjectFilter />
        </div>

        <p className="mt-6 font-mono text-[11px] text-muted">
          Live client sites open in a new tab.
        </p>
      </div>
    </section>
  );
}
