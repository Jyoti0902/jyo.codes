import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/**
 * Section intro: a quiet numbered eyebrow, then the human-readable heading.
 */
export function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <Reveal>
      <header className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
            <span aria-hidden className="size-1.5 rounded-full bg-accent-fill" />
            {index} — {label}
          </span>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>

        <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance">
          {title}
        </h2>

        {description ? (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
            {description}
          </p>
        ) : null}
      </header>
    </Reveal>
  );
}
