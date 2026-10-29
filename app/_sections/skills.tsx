import { SectionHeading } from "@/app/_components/section-heading";
import { RevealGroup, RevealItem } from "@/app/_components/reveal";
import { Hint } from "@/app/_components/hint";
import { Cloud, Code, Database, Server, Wrench } from "@/app/_components/icons";
import { rabbitLines, type MomoExpression } from "@/lib/rabbit";
import { site } from "@/lib/site";

const groups = [
  { Icon: Code, span: "lg:col-span-3" },
  { Icon: Server, span: "lg:col-span-3" },
  { Icon: Database, span: "lg:col-span-2" },
  { Icon: Cloud, span: "lg:col-span-2" },
  { Icon: Wrench, span: "lg:col-span-2" },
] as const;

const skillExpressions: Record<string, MomoExpression> = {
  frontend: "coding",
  backend: "coding",
  data: "thinking",
  cloud: "idea",
  tools: "wink_thumbs",
};

const skillLines = rabbitLines.skillGroup as Record<string, readonly string[]>;

export function Skills() {
  return (
    <section
      id="skills"
      data-rabbit-section="skills"
      className="relative scroll-mt-20 border-t border-line bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="03"
          label="Tech stack"
          title="The toolkit behind the work."
          description="Grouped the way I actually use it — interfaces, APIs, data, delivery, and the everyday tools around them."
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {site.skills.map((group, index) => {
            const { Icon, span } = groups[index];

            return (
              <RevealItem key={group.key} className={span}>
                <Hint
                  lines={skillLines[group.key] ?? rabbitLines.skillGroup.tools}
                  expression={skillExpressions[group.key] ?? "thinking"}
                  className="h-full"
                >
                  <div className="card card-hover flex h-full flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-9 place-items-center rounded-xl bg-accent-soft text-accent">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-[11px] font-medium text-faint tabular-nums">
                        {String(group.items.length).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[15px] font-medium">
                      {group.label}
                    </h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                      {group.caption}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-line bg-elevated px-2.5 py-1 text-[11px] text-muted"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Hint>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
