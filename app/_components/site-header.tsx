import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-mono text-sm tracking-tight"
        >
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
          <span className="text-ink">{site.domain}</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm sm:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${site.email}`}
          className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/60 hover:text-ink"
        >
          {site.email}
        </a>
      </div>
    </header>
  );
}
