import { site } from "@/lib/site";
import { ArrowUpRight, Github, Linkedin, Mail } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_0.8fr_0.8fr]">
          <div>
            <a href="#home" className="inline-flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded border border-line-strong bg-elevated font-mono text-[11px] text-accent">
                &gt;_
              </span>
              <span className="font-mono text-[13px] tracking-tight">
                jyo<span className="text-accent">.</span>codes
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Software Engineer building reliable web products — responsive
              interfaces, secure APIs and dependable deployments.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex items-center gap-2 border-b border-line-strong pb-1 font-mono text-[12px] text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <Mail className="size-3.5" />
              {site.email}
            </a>

            <p className="prompt mt-6 text-muted">
              <span className="prompt-user">{site.shell.user}</span>
              <span className="prompt-symbol">@</span>
              <span className="prompt-host">{site.shell.host}</span>
              <span className="prompt-symbol">:</span>
              <span className="prompt-path">~</span>
              <span className="prompt-symbol"> $ </span>
              <span className="caret align-middle" />
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
              ~/sections
            </p>
            <nav aria-label="Footer" className="mt-4 flex flex-col gap-2">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group flex w-fit items-center gap-2 font-mono text-[12px] text-muted transition-colors hover:text-ink"
                >
                  <span className="text-faint transition-colors group-hover:text-accent">
                    →
                  </span>
                  {item.label.toLowerCase()}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
              ~/links
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {[
                { label: "github", href: site.github, Icon: Github },
                { label: "linkedin", href: site.linkedin, Icon: Linkedin },
                { label: `email`, href: `mailto:${site.email}`, Icon: Mail },
                { label: "résumé", href: site.resume, Icon: ArrowUpRight },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group inline-flex w-fit items-center gap-2 font-mono text-[12px] text-muted transition-colors hover:text-ink"
                >
                  <Icon className="size-3.5 text-faint transition-colors group-hover:text-accent" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-5 font-mono text-[10px] text-faint">
          {site.footerNote}
        </p>
      </div>

      {/* Editor-style status bar closing the page. */}
      <div className="border-t border-line bg-elevated/70">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-3 gap-y-1.5 px-4 py-2 font-mono text-[10px] text-faint sm:px-6">
          <span className="bg-accent px-1.5 py-0.5 font-medium text-accent-fill-ink">
            main ✔
          </span>
          <span>utf-8</span>
          <span className="hidden sm:inline">LF</span>
          <span className="hidden sm:inline">TypeScript</span>
          <span className="hidden md:inline">Next.js</span>

          <span className="ml-auto">© 2026 {site.name}</span>
          <span className="hidden md:inline">⌘K palette</span>
          <a
            href="#home"
            className="text-muted transition-colors hover:text-ink"
          >
            ↑ top
          </a>
        </div>
      </div>
    </footer>
  );
}
