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
          className="flex items-center gap-8 font-mono text-xs tracking-wider text-muted uppercase sm:gap-12"
        >
          {item}
          <span className="text-accent/70">✦</span>
        </span>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <section
      aria-label="Technologies I work with"
      className="marquee-mask overflow-hidden border-y border-line py-5"
    >
      <div className="marquee-track flex w-max">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </section>
  );
}
