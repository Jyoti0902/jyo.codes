import { SectionHeading } from "@/app/_components/section-heading";
import { Reveal } from "@/app/_components/reveal";
import { Check, GraduationCap, MapPin } from "@/app/_components/icons";
import { site } from "@/lib/site";

export function Experience() {
  const { experience } = site;
  const numbers = site.stats.slice(0, 2);

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 border-t border-line bg-canvas py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="02"
          label="Experience"
          title="Where the production work happens."
          description="Real applications, real users — with ownership across front-end systems, secure APIs and deployment."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <Reveal>
            <div className="card relative h-full overflow-hidden p-6 sm:p-8">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-fill via-accent-fill/60 to-transparent"
              />

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.18em] text-accent uppercase">
                    Current role
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {experience.company}
                  </p>
                </div>

                <span className="rounded-full border border-line bg-elevated px-3 py-1 text-[11px] font-medium text-muted">
                  {experience.type}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-faint">
                <span>{experience.period}</span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {experience.location}
                </span>
              </div>

              <p className="mt-5 text-[14px] leading-relaxed text-muted">
                {experience.summary}
              </p>

              <div className="mt-6 border-t border-line pt-5">
                <p className="text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
                  Impact
                </p>
                <ul className="mt-3 space-y-2.5">
                  {experience.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted"
                    >
                      <Check className="mt-0.5 size-3.5 shrink-0 text-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.05}>
              <div className="card p-6">
                <p className="text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
                  Toolkit in use
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {experience.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-elevated px-2.5 py-1 text-[11px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card p-6">
                <p className="text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
                  By the numbers
                </p>
                <div className="mt-4 grid grid-cols-2 gap-5">
                  {numbers.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-semibold tracking-[-0.04em] tabular-nums">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-14">
          <div className="flex items-center gap-3">
            <GraduationCap className="size-4 text-accent" />
            <h3 className="text-sm font-medium">Education</h3>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {site.education.map((entry) => (
              <div key={entry.degree} className="card card-hover p-5">
                <p className="text-[10px] font-medium tracking-[0.16em] text-faint uppercase">
                  {entry.period}
                </p>
                <p className="mt-2 text-[14.5px] font-medium">
                  {entry.degree}
                </p>
                <p className="mt-1 text-[12.5px] text-muted">{entry.school}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
