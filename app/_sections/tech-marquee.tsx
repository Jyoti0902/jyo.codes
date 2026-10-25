import { site } from "@/lib/site";

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
    >
      {site.marquee.map((item) => (
        <span
          key={item}
          className="flex items-center gap-8 font-mono text-[11px] tracking-[0.18em] text-muted uppercase sm:gap-12"
        >
          {item}
          <span className="size-1 rotate-45 bg-accent/50" />
        </span>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <section
      aria-label="Technologies I work with"
      className="relative border-y border-line bg-surface/30"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center gap-6 px-5 sm:px-8">
        <span className="hidden shrink-0 items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-muted/60 uppercase sm:inline-flex">
          <span className="size-1.5 rounded-full bg-accent" />
          Core stack
        </span>

        <div className="marquee-mask flex-1 overflow-hidden py-4">
          <div className="marquee-track flex w-max">
            <MarqueeGroup />
            <MarqueeGroup hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
