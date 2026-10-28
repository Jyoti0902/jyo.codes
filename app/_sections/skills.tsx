import { SectionHeading } from "@/app/_components/section-heading";
import { Reveal } from "@/app/_components/reveal";
import {
  CommandPrompt,
  TerminalWindow,
} from "@/app/_components/terminal";
import { site } from "@/lib/site";

const MAX_ITEMS = Math.max(...site.skills.map((group) => group.items.length));

export function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-20 border-t border-line py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="03"
          command="tree ~/skills -L 2"
          title="The toolkit behind the work."
          description="Grouped the way I actually use it — interfaces, APIs, data, delivery, and the everyday tools around them."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_0.6fr] lg:gap-6">
          <Reveal>
            <TerminalWindow
              title="~/skills"
              meta={`${site.skills.reduce((total, group) => total + group.items.length, 0)} items`}
              bodyClassName="p-4 sm:p-5"
            >
              <CommandPrompt command="tree ~/skills -L 2" />

              <div className="mt-4 font-mono text-[11.5px] leading-[1.95]">
                <p className="text-ink">~/skills</p>

                {site.skills.map((group, groupIndex) => {
                  const last = groupIndex === site.skills.length - 1;

                  return (
                    <div key={group.key}>
                      {/* Hanging indent keeps wrapped captions and long item
                          lists aligned under the tree branch. */}
                      <p className="pl-[4ch] -indent-[4ch]">
                        <span aria-hidden className="whitespace-pre text-faint">
                          {last ? "└── " : "├── "}
                        </span>
                        <span className="text-accent">
                          {group.label.toLowerCase()}/
                        </span>{" "}
                        <span className="text-faint">
                          ({group.items.length})
                        </span>
                        <span className="hidden text-[10.5px] text-faint/80 sm:inline">
                          {" "}
                          — {group.caption.toLowerCase()}
                        </span>
                      </p>

                      <p className="pl-[4ch] -indent-[4ch] text-[11px] text-muted">
                        <span aria-hidden className="whitespace-pre text-faint">
                          {last ? "    " : "│   "}
                        </span>
                        {group.items.map((item, itemIndex) => (
                          <span key={item}>
                            {item}
                            {itemIndex < group.items.length - 1 ? (
                              <span aria-hidden className="text-faint/70">
                                {" · "}
                              </span>
                            ) : null}
                          </span>
                        ))}
                      </p>
                    </div>
                  );
                })}
              </div>
            </TerminalWindow>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="window flex h-full flex-col p-4 sm:p-5">
              <CommandPrompt command="wc -l ~/skills/*" />

              <div className="mt-4 space-y-2.5">
                {site.skills.map((group) => (
                  <div key={group.key}>
                    <div className="flex items-baseline justify-between gap-2 font-mono text-[10.5px]">
                      <span className="text-muted">
                        {group.label.toLowerCase()}
                      </span>
                      <span className="text-faint">
                        {String(group.items.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div
                      className="mt-1 h-1.5 overflow-hidden rounded-sm bg-elevated-2"
                      aria-hidden
                    >
                      <div
                        className="h-full rounded-sm bg-accent/80"
                        style={{
                          width: `${Math.round(
                            (group.items.length / MAX_ITEMS) * 100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-2 border-t border-line pt-2.5 font-mono text-[10.5px]">
                <span className="text-faint">total</span>
                <span className="text-accent">
                  {site.skills.reduce(
                    (total, group) => total + group.items.length,
                    0,
                  )}
                </span>
              </div>

              <p className="mt-auto pt-5 font-mono text-[10px] leading-relaxed text-faint">
                {"// breadth of the toolkit, counted from the tree"}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
