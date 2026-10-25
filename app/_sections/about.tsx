import { Reveal } from "@/app/_components/reveal";
import { SectionHeading } from "@/app/_components/section-heading";
import {
  ArrowUpRight,
  Download,
  GraduationCap,
  MapPin,
} from "@/app/_components/icons";
import { site } from "@/lib/site";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-line py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="04 / About"
          title="A developer who sweats the details."
          description="Curious about the product, careful with the interface and comfortable across the stack."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-elevated/60 p-7 sm:p-8">
              <div
                aria-hidden
                className="absolute -top-20 left-1/2 size-52 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
              />

              <div className="relative mx-auto flex size-44 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-line" />
                <div className="orbit-spin absolute inset-3 rounded-full border border-dashed border-accent/30">
                  <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
                </div>
                <div className="absolute inset-10 rounded-full bg-gradient-to-br from-accent/20 via-transparent to-accent-2/15 blur-xl" />
                <span className="relative font-mono text-6xl font-semibold tracking-tight">
                  J<span className="text-accent">.</span>
                </span>
              </div>

              <div className="relative mt-6 text-center">
                <p className="text-lg font-semibold tracking-tight">
                  {site.name}
                </p>
                <p className="mt-1 text-sm text-muted">{site.role}</p>

                <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[10px] tracking-wider text-accent uppercase">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Available for work
                </span>
              </div>

              <div className="relative mt-6 flex items-center justify-center gap-1.5 border-t border-line pt-5 font-mono text-[10px] text-muted">
                <MapPin className="size-3" />
                {site.location}
              </div>

              <div className="relative mt-5 grid grid-cols-3 gap-2 border-t border-line pt-5 text-center">
                <div>
                  <p className="font-mono text-xl font-semibold">2.5+</p>
                  <p className="mt-0.5 text-[10px] text-muted">Years</p>
                </div>
                <div>
                  <p className="font-mono text-xl font-semibold">5</p>
                  <p className="mt-0.5 text-[10px] text-muted">Products</p>
                </div>
                <div>
                  <p className="font-mono text-xl font-semibold">3</p>
                  <p className="mt-0.5 text-[10px] text-muted">Countries</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-4">
              {site.about.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-[15px] leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-9">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-lg border border-line bg-accent-soft text-accent">
                  <GraduationCap className="size-4" />
                </span>
                <h3 className="font-medium tracking-tight">Education</h3>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {site.education.map((item) => (
                  <div
                    key={item.degree}
                    className="rounded-xl border border-line bg-elevated/50 p-4 transition-colors hover:border-accent/30"
                  >
                    <p className="text-sm font-medium">{item.degree}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {item.school}
                    </p>
                    <p className="mt-3 font-mono text-[10px] text-muted">
                      {item.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                download="Jyoti-Resume.pdf"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm transition-colors hover:border-accent/50 hover:bg-accent-soft"
              >
                <Download className="size-4 text-accent" />
                Download résumé
              </a>

              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
              >
                Get in touch
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
