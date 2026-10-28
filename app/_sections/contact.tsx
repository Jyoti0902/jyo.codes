import { CopyEmail } from "@/app/_components/copy-email";
import { Reveal } from "@/app/_components/reveal";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "@/app/_components/icons";
import {
  CommandPrompt,
  TerminalWindow,
  WindowBar,
} from "@/app/_components/terminal";
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
      className="relative scroll-mt-20 border-t border-line py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <TerminalWindow
            title="~/contact"
            meta="zsh — last login: today"
            bodyClassName="relative"
          >
            <div className="border-b border-line bg-canvas/50 px-4 py-2.5">
              <CommandPrompt
                command={`mail -s "hello" ${site.email}`}
              />
            </div>

            <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 right-0 size-[320px] rounded-full bg-accent/8 blur-[100px]"
            />

            <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-12 lg:p-10">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                  {"// 05 — contact"}
                </p>

                <h2 className="mt-4 text-[clamp(1.85rem,4vw,2.9rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-balance">
                  {site.contact.heading}{" "}
                  <span className="text-accent">{site.contact.accent}</span>
                </h2>

                <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-muted sm:text-[15px]">
                  {site.contact.body}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="group inline-flex items-center gap-2 rounded bg-accent-fill px-4 py-2.5 font-mono text-[12px] font-medium text-accent-fill-ink transition hover:brightness-110"
                  >
                    <Mail className="size-3.5" />
                    email me
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                  <CopyEmail email={site.email} />
                </div>

                <div className="mt-7 rounded border border-line-strong bg-elevated/50">
                  <WindowBar title="to: jyoti" meta="re: work" />
                  <div className="flex flex-wrap items-center gap-2 px-3 py-2.5 font-mono text-[11.5px]">
                    <span className="text-accent">→</span>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
                    >
                      {site.email}
                    </a>
                    <span className="ml-auto hidden text-faint sm:inline">
                      email is the fastest route
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                    # elsewhere
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {elsewhere.map(({ label, href, Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noreferrer" : undefined}
                          className="group flex items-center gap-2 rounded px-2 py-1.5 font-mono text-[11.5px] text-muted transition-colors hover:bg-elevated hover:text-ink"
                        >
                          <Icon className="size-3.5 text-faint transition-colors group-hover:text-accent" />
                          <span className="truncate">{label}</span>
                          <ArrowUpRight className="ml-auto size-3 shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded border border-line bg-elevated/50 p-3">
                  <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-accent uppercase">
                    <span className="status-dot size-1.5 rounded-full bg-accent" />
                    open to opportunities
                  </p>

                  <p className="mt-2 flex items-center gap-1.5 font-mono text-[10.5px] text-faint">
                    <MapPin className="size-3" />
                    {site.location}
                  </p>

                  <p className="mt-2 font-mono text-[10.5px] text-faint">
                    full-time roles · product work · interesting problems
                  </p>
                </div>
              </div>
            </div>

            <p className="border-t border-line bg-elevated/50 px-5 py-2 font-mono text-[9px] tracking-[0.16em] text-faint uppercase sm:px-8 lg:px-10">
              -- end of transmission --
            </p>
          </TerminalWindow>
        </Reveal>
      </div>
    </section>
  );
}
