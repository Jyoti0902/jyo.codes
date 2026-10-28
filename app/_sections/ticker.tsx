import { site } from "@/lib/site";

export function Ticker() {
  const items = [...site.marquee, ...site.marquee];

  return (
    <section
      aria-label="Technology stack"
      className="border-y border-line bg-surface/40"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6">
        <span className="shrink-0 font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
          {"// stack"}
        </span>

        <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
          <div aria-hidden className="marquee-track flex w-max items-center">
            {items.map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="flex items-center font-mono text-[11px] whitespace-nowrap text-muted"
              >
                {tech}
                <span className="mx-4 text-faint/70">/</span>
              </span>
            ))}
          </div>
        </div>

        <span className="hidden shrink-0 font-mono text-[10px] text-faint sm:inline">
          {site.marquee.length} tools
        </span>

        <ul className="sr-only">
          {site.marquee.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
