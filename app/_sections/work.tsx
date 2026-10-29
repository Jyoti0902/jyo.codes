import { SectionHeading } from "@/app/_components/section-heading";
import { ProjectExplorer } from "@/app/_components/project-explorer";
import { site } from "@/lib/site";

export function Work() {
  return (
    <section
      id="work"
      data-rabbit-section="work"
      className="relative scroll-mt-20 border-t border-line bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="01"
          label="Selected work"
          title="Production products, shipped with care."
          description="Five client platforms across healthcare, real estate and events — with ownership across interface, APIs and delivery. Pick a project to see the live product."
        />

        <ProjectExplorer projects={site.projects} />
      </div>
    </section>
  );
}
