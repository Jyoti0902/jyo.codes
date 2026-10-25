import { Reveal } from "@/app/_components/reveal";
import { SectionHeading } from "@/app/_components/section-heading";
import { MapPin } from "@/app/_components/icons";
import { site } from "@/lib/site";

export function Experience() {
  const { experience } = site;

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-line py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="02 / Experience"
          title="Where I’ve been shipping."
          description="Production work, not prototypes — with ownership across the front end, APIs and deployment."
        />

        <Reveal className="mt-8">
          <div className="relative">
            <div
              aria-hidden
              className="absolute top-3 bottom-3 left-[7px] w-px bg-line sm:left-[9px]"
            />

            <div className="relative pl-8 sm:pl-11">
              <span className="absolute top-2 left-0 flex size-4 items-center justify-center rounded-full border border-line bg-canvas">
                <span className="size-1.5 rounded-full bg-accent" />
              </span>

              <div className="rounded-2xl border border-line bg-elevated/60 p-6 transition-colors hover:bg-elevated sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                      {experience.company}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {experience.role} · {experience.type}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-1.5 sm:items-end">
                    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/50 px-3 py-1 font-mono text-[10px] tracking-wider text-muted uppercase">
                      <span className="size-1.5 rounded-full bg-accent" />
                      {experience.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-muted">
                      <MapPin className="size-3" />
                      {experience.location}
                    </span>
                  </div>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
                  {experience.summary}
                </p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {experience.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-muted/50" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {experience.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
