import { Reveal } from "@/app/_components/reveal";
import { SectionHeading } from "@/app/_components/section-heading";
import {
  ArrowUpRight,
  Download,
  GraduationCap,
  MapPin,
} from "@/app/_components/icons";
import { site } from "@/lib/site";

const facts = [
  { label: "Role", value: site.role },
  { label: "Base", value: "Mohali, Punjab" },
  { label: "Experience", value: "2.5+ years" },
  { label: "Focus", value: "Full-stack web" },
  { label: "Education", value: "MCA · Panjab University" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="04"
          eyebrow="About"
          title="Engineering with care, from interface to API."
          description="A product-minded engineer who values clear interfaces, dependable data flows and code that stays easy to change."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-elevated/40 p-6 sm:p-7">
                <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />

                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                    Profile
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/50 px-2.5 py-1 font-mono text-[9px] tracking-wide text-muted uppercase">
                    <span className="size-1.5 rounded-full bg-accent" />
                    Open to work
                  </span>
                </div>

                <dl className="relative mt-5 divide-y divide-line border-t border-line">
                  {facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <dt className="font-mono text-[10px] tracking-[0.12em] text-muted/70 uppercase">
                        {fact.label}
                      </dt>
                      <dd className="text-right text-[13px] text-ink">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="relative mt-5 rounded-xl border border-line bg-canvas/50 p-4">
                  <p className="font-serif text-lg leading-snug italic">
                    “Clear interfaces. Reliable data. Code that stays easy to
                    change.”
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={site.resume}
                  download="Jyoti-Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
                >
                  <Download className="size-4 text-accent" />
                  Résumé
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
                >
                  Get in touch
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="max-w-2xl space-y-5">
              <p className="text-[17px] leading-relaxed text-ink/90">
                {site.about[0]}
              </p>
              {site.about.slice(1).map((paragraph) => (
                <p
                  key={paragraph.slice(0, 28)}
                  className="text-[15px] leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                  Strengths
                </p>
                <span className="font-mono text-[10px] text-muted/50">
                  {String(site.strengths.length).padStart(2, "0")}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 sm:gap-x-10">
                {site.strengths.map((strength, index) => (
                  <div
                    key={strength}
                    className="flex items-baseline gap-3 border-b border-line py-3.5"
                  >
                    <span className="font-mono text-[10px] text-accent/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] text-muted">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-center gap-2.5 border-b border-line pb-3">
                <GraduationCap className="size-4 text-accent" />
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                  Education
                </p>
              </div>

              {site.education.map((item) => (
                <div
                  key={item.degree}
                  className="grid gap-1 border-b border-line py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {item.degree}
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted">
                      {item.school}
                    </p>
                  </div>
                  <p className="font-mono text-[10px] tracking-wide text-muted/60 sm:text-right">
                    {item.period}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-muted/60 uppercase">
              <MapPin className="size-3.5" />
              {site.location}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
