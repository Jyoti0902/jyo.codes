import { site } from "@/lib/site";
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "@/app/_components/icons";

const socials = [
  { label: "GitHub", href: site.github, Icon: Github },
  { label: "LinkedIn", href: site.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
] as const;

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-5 pt-14 pb-12 sm:px-8 sm:pt-20 sm:pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div
            className="hero-rise lg:col-span-7"
            style={{ animationDelay: "60ms" }}
          >
            {site.available && (
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated/70 px-3 py-1">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                  Open to work
                </span>
              </div>
            )}

            <p className="mt-6 font-mono text-[11px] tracking-[0.22em] text-muted uppercase">
              {site.hero.eyebrow}
            </p>

            <h1 className="mt-3 max-w-2xl text-[2.35rem] leading-[1.06] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.5rem]">
              I build web products{" "}
              <span className="text-gradient">that ship.</span>
            </h1>

            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
              {site.hero.subheading}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-4.5 py-2.5 text-sm font-medium text-canvas transition-all hover:-translate-y-0.5 hover:bg-ink/90"
              >
                View selected work
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              <a
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                download="Jyoti-Resume.pdf"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-4.5 py-2.5 text-sm text-ink transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent-soft"
              >
                <Download className="size-4 text-accent" />
                Download résumé
              </a>
            </div>

            <div className="mt-7 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="size-4" />
                </a>
              ))}

              <span className="ml-1 hidden items-center gap-1.5 font-mono text-[11px] text-muted sm:inline-flex">
                <MapPin className="size-3.5" />
                {site.location}
              </span>
            </div>
          </div>

          <div
            className="hero-rise relative lg:col-span-5"
            style={{ animationDelay: "180ms" }}
          >
            <div
              aria-hidden
              className="absolute -inset-6 rounded-[2rem] bg-accent/5 blur-3xl"
            />

            <div className="relative">
              <div
                aria-hidden
                className="animate-float absolute -top-4 -left-3 z-10 hidden items-center gap-2 rounded-full border border-line bg-elevated px-3 py-1.5 font-mono text-[10px] text-muted shadow-xl sm:flex"
              >
                <span className="size-1.5 rounded-full bg-accent" />
                React
              </div>

              <div
                aria-hidden
                className="animate-float-delayed absolute -right-2 -bottom-4 z-10 hidden items-center gap-2 rounded-full border border-line bg-elevated px-3 py-1.5 font-mono text-[10px] text-muted shadow-xl sm:flex"
              >
                <span className="size-1.5 rounded-full bg-accent-2" />
                Next.js
              </div>

              <div
                className="relative overflow-hidden rounded-2xl border border-line bg-elevated/90 shadow-[0_24px_70px_-45px_var(--glow)] backdrop-blur"
                aria-label="Terminal-style introduction"
              >
                <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                  <span className="size-2.5 rounded-full bg-red-500/80" />
                  <span className="size-2.5 rounded-full bg-amber-400/80" />
                  <span className="size-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-muted">
                    ~/jyoti
                  </span>
                  <span className="ml-auto font-mono text-[10px] tracking-wider text-muted uppercase">
                    zsh
                  </span>
                </div>

                <div className="space-y-3 p-5 font-mono text-[12px] leading-relaxed sm:text-[13px]">
                  <div className="flex gap-2">
                    <span className="text-accent">$</span>
                    <span className="text-ink">whoami</span>
                  </div>
                  <p className="pl-5 text-muted">
                    jyoti — software engineer
                  </p>

                  <div className="flex gap-2">
                    <span className="text-accent">$</span>
                    <span className="text-ink">cat focus.txt</span>
                  </div>
                  <p className="pl-5 text-muted">
                    react · next.js · typescript · node.js
                  </p>

                  <div className="flex gap-2">
                    <span className="text-accent">$</span>
                    <span className="text-ink">ls projects/</span>
                  </div>
                  <p className="pl-5 text-muted">
                    dialysisongo · sunnyhomes-crm · tracevenue
                    <br />
                    vitalwatch365 · appy-saude
                  </p>

                  <div className="flex gap-2">
                    <span className="text-accent">$</span>
                    <span className="text-ink">status</span>
                  </div>
                  <p className="flex flex-wrap items-center gap-2 pl-5 text-muted">
                    <span className="size-1.5 rounded-full bg-accent" />
                    <span className="text-ink">
                      open to new opportunities
                    </span>
                    <span className="terminal-cursor" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hero-rise mt-12 grid grid-cols-3 gap-4 border-t border-line pt-6 sm:mt-16"
          style={{ animationDelay: "320ms" }}
        >
          {site.stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-mono text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 max-w-[10rem] text-[11px] leading-relaxed text-muted sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#work"
        className="mx-auto mb-8 flex w-fit items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-accent"
      >
        Scroll to explore
        <ArrowDown className="size-3.5" />
      </a>
    </section>
  );
}
