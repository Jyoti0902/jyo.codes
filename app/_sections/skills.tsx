import { Reveal } from "@/app/_components/reveal";
import { SectionHeading } from "@/app/_components/section-heading";
import {
  Cloud,
  Code,
  Database,
  Server,
  Wrench,
} from "@/app/_components/icons";
import { site } from "@/lib/site";

const groupIcons = [Code, Server, Database, Cloud, Wrench];

const dailyDrivers = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
];

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-24 border-t border-line py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="03 / Toolkit"
          title="The stack I reach for."
          description="A practical toolkit for building, connecting and shipping full-stack products."
        />

        <Reveal className="mt-8">
          <div className="flex flex-col gap-3 rounded-2xl border border-line bg-elevated/60 p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <p className="shrink-0 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
              Daily drivers
            </p>
            <span className="hidden h-px flex-1 bg-line sm:block" />
            <div className="flex flex-wrap gap-1.5">
              {dailyDrivers.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-line bg-canvas/60 px-2.5 py-1 font-mono text-xs text-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.skills.map((group, index) => {
            const Icon = groupIcons[index] ?? Code;

            return (
              <Reveal key={group.label} delay={index * 60} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-elevated/60 p-5 transition-colors hover:border-line hover:bg-elevated">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-lg border border-line bg-canvas/50 text-muted">
                      <Icon className="size-4" />
                    </span>
                    <h3 className="text-sm font-medium tracking-tight">
                      {group.label}
                    </h3>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-line bg-canvas/40 px-2.5 py-1 text-xs text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
