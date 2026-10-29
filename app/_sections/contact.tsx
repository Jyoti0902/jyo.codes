import { CopyEmail } from "@/app/_components/copy-email";
import { Reveal } from "@/app/_components/reveal";
import { Hint } from "@/app/_components/hint";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "@/app/_components/icons";
import { rabbitLines } from "@/lib/rabbit";
import { site } from "@/lib/site";

const elsewhere = [
  {
    label: "github.com/Jyoti0902",
    href: site.github,
    Icon: Github,
  },
  {
    label: "linkedin.com/in/jyoti",
    href: site.linkedin,
    Icon: Linkedin,
  },
  {
    label: site.email,
    href: `mailto:${site.email}`,
    Icon: Mail,
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      data-rabbit-section="contact"
      className="relative scroll-mt-20 border-t border-line bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <Hint lines={rabbitLines.contact.panel}>
            <div className="card relative overflow-hidden">
              <div
                aria-hidden
                className="aurora pointer-events-none absolute -top-24 -right-16 size-[420px] rounded-full opacity-80 blur-2xl"
              />

              <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
                <div>
                  <p className="text-[10px] font-medium tracking-[0.18em] text-accent uppercase">
                    05 — Contact
                  </p>

                  <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.05] font-semibold tracking-[-0.045em] text-balance">
                    {site.contact.heading}{" "}
                    <span className="text-accent">{site.contact.accent}</span>
                  </h2>

                  <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-muted sm:text-[15px]">
                    {site.contact.body}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-2.5">
                    <a
                      href={`mailto:${site.email}`}
                      className="group inline-flex items-center gap-2 rounded-full bg-accent-fill px-5 py-2.5 text-[13px] font-medium text-accent-fill-ink shadow-sm transition hover:brightness-105"
                    >
                      <Mail className="size-3.5" />
                      Email me
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>

                    <CopyEmail email={site.email} />
                  </div>

                  <a
                    href={`mailto:${site.email}`}
                    className="mt-6 inline-flex items-center gap-2 text-[13px] text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {site.email}
                  </a>
                </div>

                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
                      Elsewhere
                    </p>

                    <ul className="mt-3 space-y-1">
                      {elsewhere.map(({ label, href, Icon }) => (
                        <li key={label}>
                          <a
                            href={href}
                            target={
                              href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              href.startsWith("http") ? "noreferrer" : undefined
                            }
                            className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-[13px] text-muted transition-colors hover:bg-elevated hover:text-ink"
                          >
                            <Icon className="size-3.5 shrink-0 text-faint transition-colors group-hover:text-accent" />
                            <span className="truncate">{label}</span>
                            <ArrowUpRight className="ml-auto size-3.5 shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-line bg-canvas/60 p-4">
                    <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                      <span className="status-dot size-1.5 rounded-full bg-accent" />
                      Open to opportunities
                    </p>

                    <p className="mt-2.5 flex items-center gap-1.5 text-[12px] text-muted">
                      <MapPin className="size-3.5 text-faint" />
                      {site.location}
                    </p>

                    <p className="mt-2 text-[12px] leading-relaxed text-muted">
                      Full-time roles · product work · interesting problems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Hint>
        </Reveal>
      </div>
    </section>
  );
}
