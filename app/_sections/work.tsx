import { SectionHeading } from "@/app/_components/section-heading";
import { ProjectExplorer } from "@/app/_components/project-explorer";
import { site } from "@/lib/site";

export function Work() {
  return (
    <section
      id="work"
      className="relative scroll-mt-20 border-t border-line py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="01"
          command="ls -la ~/work"
          title="Production products, shipped with care."
          description="Five client platforms across healthcare, real estate and events — with ownership across interface, APIs and delivery. Open a row to see the live product."
        />

        <ProjectExplorer projects={site.projects} />
      </div>
    </section>
  );
}
