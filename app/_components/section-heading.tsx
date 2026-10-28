import type { ReactNode } from "react";
import { CommandPrompt } from "./terminal";

/**
 * Section intro: a shell command, then the human-readable heading. The command
 * is decoration with meaning — it tells you how the section is built.
 */
export function SectionHeading({
  index,
  command,
  title,
  description,
}: {
  index: string;
  command: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <header className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
          {`// ${index}`}
        </span>
        <span className="h-px w-10 bg-line-strong" aria-hidden />
      </div>

      <CommandPrompt command={command} className="mt-4 text-muted" />

      <h2 className="mt-4 text-[clamp(1.85rem,4vw,2.85rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
