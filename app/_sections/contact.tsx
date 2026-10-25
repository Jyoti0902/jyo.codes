import { CopyEmail } from "@/app/_components/copy-email";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "@/app/_components/icons";
import { Reveal } from "@/app/_components/reveal";
import { site } from "@/lib/site";

const details = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    Icon: Mail,
  },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s+/g, "")}`,
    Icon: Phone,
  },
  {
    label: "Based in",
    value: site.location,
    href: undefined,
    Icon: MapPin,
  },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-line py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-elevated/60 p-7 sm:p-10">
            <div
              aria-hidden
              className="absolute -top-32 -right-24 size-72 rounded-full bg-accent/5 blur-[110px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-36 -left-24 size-64 rounded-full bg-accent-2/5 blur-[110px]"
            />

            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
                  05 / Contact
                </p>

                <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-balance sm:text-[1.9rem]">
                  Have something worth building?
                </h2>

                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
                  I’m open to full-time roles and freelance work. The fastest
                  way to reach me is email — tell me what you’re building and
                  what you need help with.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <a
                    href={`mailto:${site.email}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-4.5 py-2.5 text-sm font-medium text-canvas transition-all hover:-translate-y-0.5 hover:bg-ink/90"
                  >
                    Email me
                    <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                  <CopyEmail email={site.email} />
                </div>

                <a
                  href={`mailto:${site.email}`}
                  className="mt-6 inline-block border-b border-line pb-1 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {site.email}
                </a>
              </div>

              <div className="space-y-2.5">
                {details.map(({ label, value, href, Icon }) => {
                  const content = (
                    <>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas/50 text-muted">
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] tracking-wider text-muted uppercase">
                          {label}
                        </span>
                        <span className="mt-0.5 block truncate text-sm text-ink">
                          {value}
                        </span>
                      </span>
                      {href && (
                        <ArrowUpRight className="ml-auto size-3.5 shrink-0 text-muted transition-colors group-hover:text-accent" />
                      )}
                    </>
                  );

                  return href ? (
                    <a
                      key={label}
                      href={href}
                      className="group flex items-center gap-3 rounded-xl border border-line bg-canvas/40 p-3.5 transition-colors hover:bg-elevated"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-xl border border-line bg-canvas/40 p-3.5"
                    >
                      {content}
                    </div>
                  );
                })}

                <div className="flex gap-2 pt-1">
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-canvas/40 px-3 py-2.5 text-sm text-muted transition-colors hover:bg-elevated hover:text-ink"
                  >
                    <Github className="size-4" />
                    GitHub
                  </a>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-canvas/40 px-3 py-2.5 text-sm text-muted transition-colors hover:bg-elevated hover:text-ink"
                  >
                    <Linkedin className="size-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
