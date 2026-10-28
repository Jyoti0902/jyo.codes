import { SectionHeading } from "@/app/_components/section-heading";
import { Reveal } from "@/app/_components/reveal";
import {
  CommandPrompt,
  TerminalWindow,
} from "@/app/_components/terminal";
import { site } from "@/lib/site";

const facts = [
  ["role", site.role],
  ["location", site.location.toLowerCase()],
  ["company", site.experience.company],
  ["focus", "react · next.js · node.js"],
  ["status", "open to opportunities"],
];

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 border-t border-line py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="04"
          command="cat about.md"
          title="Clear interfaces, reliable data flows, code that stays easy to change."
          description="The short version of how I work — and what I care about when a product goes live."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.32fr_0.68fr] lg:gap-6">
          <Reveal>
            <TerminalWindow
              title="~/about.md"
              meta="markdown · read-only"
              bodyClassName="flex h-full flex-col"
            >
              <div className="border-b border-line bg-canvas/50 px-3.5 py-2.5">
                <CommandPrompt command="cat about.md" />
              </div>

              <div className="flex-1 px-4 py-2 sm:px-6">
                {site.about.map((paragraph, index) => (
                  <div
                    key={paragraph}
                    className="grid grid-cols-[2rem_1fr] gap-3 border-b border-line/70 py-4 last:border-b-0 sm:grid-cols-[2.4rem_1fr] sm:gap-4"
                  >
                    <span className="pt-0.5 font-mono text-[10px] text-faint/70">
                      {String(index + 1).padStart(3, "0")}
                    </span>
                    <p className="text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>

              <p className="border-t border-line bg-elevated/50 px-4 py-1.5 font-mono text-[9px] tracking-[0.14em] text-faint uppercase sm:px-6">
                -- EOF --
              </p>
            </TerminalWindow>
          </Reveal>

          <div className="space-y-5 lg:space-y-6">
            <Reveal delay={0.05}>
              <TerminalWindow
                title="~/facts"
                meta="key: value"
                bodyClassName="p-4 sm:p-5"
              >
                <CommandPrompt command="cat facts.txt" />

                <dl className="mt-3 space-y-1.5 font-mono text-[11px]">
                  {facts.map(([key, value]) => (
                    <div key={key} className="flex gap-3">
                      <dt className="w-16 shrink-0 text-faint">{key}</dt>
                      <dd className="min-w-0 text-muted">{value}</dd>
                    </div>
                  ))}
                </dl>
              </TerminalWindow>
            </Reveal>

            <Reveal delay={0.1}>
              <TerminalWindow
                title="~/strengths"
                meta="checklist"
                bodyClassName="p-4 sm:p-5"
              >
                <CommandPrompt command="cat strengths.txt" />

                <ul className="mt-3 space-y-1.5">
                  {site.strengths.map((strength) => (
                    <li
                      key={strength}
                      className="flex items-start gap-2 font-mono text-[11px] leading-relaxed text-muted"
                    >
                      <span aria-hidden className="text-accent">
                        [x]
                      </span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </TerminalWindow>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
