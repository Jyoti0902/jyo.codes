import { SectionHeading } from "@/app/_components/section-heading";
import { Reveal } from "@/app/_components/reveal";
import { Check } from "@/app/_components/icons";
import { site } from "@/lib/site";

const facts = [
  ["Role", site.role],
  ["Location", site.location],
  ["Company", site.experience.company],
  ["Focus", "React · Next.js · Node.js"],
  ["Status", "Open to opportunities"],
] as const;

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 border-t border-line bg-canvas py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="04"
          label="About"
          title="Clear interfaces, reliable data flows, code that stays easy to change."
          description="The short version of how I work — and what I care about when a product goes live."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          <Reveal>
            <div className="card h-full p-6 sm:p-8">
              <p className="text-[10px] font-medium tracking-[0.18em] text-accent uppercase">
                A little context
              </p>

              <div className="mt-5 space-y-4">
                {site.about.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={
                      index === 0
                        ? "text-[15.5px] leading-relaxed text-ink sm:text-base"
                        : "text-[13.5px] leading-relaxed text-muted sm:text-sm"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-2 border-t border-line pt-5">
                {site.focus.map((focus) => (
                  <span
                    key={focus}
                    className="rounded-full border border-line bg-elevated px-3 py-1 text-[11.5px] text-muted"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.05}>
              <div className="card p-6">
                <p className="text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
                  At a glance
                </p>

                <dl className="mt-4 space-y-3">
                  {facts.map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-start justify-between gap-4 border-b border-line pb-3 last:border-b-0 last:pb-0"
                    >
                      <dt className="text-[11.5px] text-faint">{key}</dt>
                      <dd className="text-right text-[12.5px] font-medium text-ink">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card p-6">
                <p className="text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
                  Strengths
                </p>

                <ul className="mt-4 space-y-2.5">
                  {site.strengths.map((strength) => (
                    <li
                      key={strength}
                      className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-muted"
                    >
                      <Check className="mt-0.5 size-3.5 shrink-0 text-accent" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
