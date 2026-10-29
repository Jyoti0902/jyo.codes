import { Hint } from "@/app/_components/hint";
import { rabbitLines } from "@/lib/rabbit";
import { site } from "@/lib/site";

export function Ticker() {
  const items = [...site.marquee, ...site.marquee];

  return (
    <section
      aria-label="Technology stack"
      className="border-y border-line bg-surface"
    >
      <Hint lines={rabbitLines.ticker}>
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <span className="shrink-0 text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
            Toolkit
          </span>

          <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
            <div aria-hidden className="marquee-track flex w-max items-center">
              {items.map((tech, index) => (
                <span
                  key={`${tech}-${index}`}
                  className="flex items-center text-[11.5px] whitespace-nowrap text-muted"
                >
                  {tech}
                  <span className="mx-4 text-line-strong">•</span>
                </span>
              ))}
            </div>
          </div>

          <span className="hidden shrink-0 text-[10px] text-faint sm:inline">
            {site.marquee.length} tools
          </span>

          <ul className="sr-only">
            {site.marquee.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </Hint>
    </section>
  );
}
