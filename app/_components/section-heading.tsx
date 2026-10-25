export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-t border-line pt-5">
      <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.18em] uppercase">
        <span className="flex items-center gap-3 text-muted">
          <span className="text-accent">{index}</span>
          <span className="text-line-strong">/</span>
          {eyebrow}
        </span>
        <span className="hidden text-muted/60 sm:block">
          {String(Number(index) + 1).padStart(2, "0")} — 06
        </span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-10">
        <h2 className="max-w-2xl text-[clamp(1.9rem,3vw,2.75rem)] leading-[1.06] font-semibold tracking-[-0.035em] text-balance">
          {title}
        </h2>

        {description && (
          <p className="max-w-md text-sm leading-relaxed text-muted md:justify-self-end">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
