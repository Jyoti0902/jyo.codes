import { site } from "@/lib/site";
import { ArrowUpRight, Github, Linkedin, Mail } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_0.8fr_0.8fr]">
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-md border border-line-strong bg-elevated/70 font-mono text-[11px] text-accent">
                j
              </span>
              <span className="font-mono text-sm tracking-tight">
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
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted/60 uppercase">
              Navigate
            </p>
            <nav aria-label="Footer" className="mt-4 flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit text-sm text-muted transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted/60 uppercase">
              Elsewhere
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
              >
                <Github className="size-3.5" />
                GitHub
                <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
              >
                <Linkedin className="size-3.5" />
                LinkedIn
                <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
              >
                <Mail className="size-3.5" />
                Email
                <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-5 text-[11px] text-muted/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">© 2026 {site.name}. All rights reserved.</p>
          <p className="font-mono hidden sm:block">{site.footerNote}</p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wide transition-colors hover:text-ink"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
