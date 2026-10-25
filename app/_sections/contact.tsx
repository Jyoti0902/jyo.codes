import { CopyEmail } from "@/app/_components/copy-email";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "@/app/_components/icons";
import { Reveal } from "@/app/_components/reveal";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/70 px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />
            <div className="pointer-events-none absolute -top-40 -right-24 size-[420px] rounded-full bg-accent/10 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-48 -left-32 size-[380px] rounded-full bg-accent-2/8 blur-[120px]" />

            <div className="orbit-spin pointer-events-none absolute top-1/2 -right-24 hidden size-[360px] -translate-y-1/2 rounded-full border border-dashed border-line-strong lg:block">
              <span className="absolute top-8 left-10 size-1.5 rounded-full bg-accent" />
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase">
                <span className="text-accent">05</span>
                <span className="text-line-strong">/</span>
                <span className="text-muted">Contact</span>
              </div>

              <h2 className="mt-6 max-w-4xl text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance">
                {site.contact.heading}{" "}
                <span className="serif-accent text-gradient">
                  {site.contact.accent}
                </span>
              </h2>

              <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div>
                  <p className="max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                    {site.contact.body}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    <a
                      href={`mailto:${site.email}`}
                      className="group inline-flex items-center gap-2 rounded-full bg-accent-fill px-5 py-3 text-sm font-medium text-accent-fill-ink transition hover:brightness-110"
                    >
                      <Mail className="size-4" />
                      Email me
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>

                    <CopyEmail email={site.email} />
                  </div>

                  <a
                    href={`mailto:${site.email}`}
                    className="mt-6 inline-block border-b border-line-strong pb-1 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent sm:text-base"
                  >
                    {site.email}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-end">
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[12px] text-muted transition-colors hover:border-accent/50 hover:text-ink"
                  >
                    <Github className="size-3.5" />
                    GitHub
                  </a>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[12px] text-muted transition-colors hover:border-accent/50 hover:text-ink"
                  >
                    <Linkedin className="size-3.5" />
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-[10px] tracking-wide text-muted/70 uppercase">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" />
                  {site.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Open to opportunities
                </span>
                <span className="ml-auto hidden sm:inline">
                  Email is the best way to reach me
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
