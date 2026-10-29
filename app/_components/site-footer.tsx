import { site } from "@/lib/site";
import { ArrowUpRight, Github, Linkedin, Mail } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.6fr_0.8fr_0.8fr]">
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-accent-fill text-[13px] font-semibold text-accent-fill-ink">
                j
              </span>
              <span className="text-[14.5px] font-medium tracking-tight">
                jyo<span className="text-accent">.</span>codes
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Software Engineer building reliable web products — responsive
              interfaces, secure APIs and dependable deployments.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex items-center gap-2 text-[13px] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              <Mail className="size-3.5" />
              {site.email}
            </a>
          </div>

          <div>
            <p className="text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
              Sections
            </p>
            <nav aria-label="Footer" className="mt-4 flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit text-[13px] text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
              Elsewhere
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              {[
                { label: "GitHub", href: site.github, Icon: Github },
                { label: "LinkedIn", href: site.linkedin, Icon: Linkedin },
                { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
                { label: "Résumé", href: site.resume, Icon: ArrowUpRight },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group inline-flex w-fit items-center gap-2 text-[13px] text-muted transition-colors hover:text-ink"
                >
                  <Icon className="size-3.5 text-faint transition-colors group-hover:text-accent" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right padding keeps the last row clear of the fixed mascot. */}
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between sm:pr-28 lg:pr-32">
          <p className="text-[11.5px] text-faint">{site.footerNote}</p>

          <div className="flex items-center gap-4 text-[11.5px] text-faint">
            <span>© 2026 {site.name}</span>
            <a href="#home" className="transition-colors hover:text-ink">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
