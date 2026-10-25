export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-3">
        <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
          {eyebrow}
        </p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
      </div>

      {description && (
        <p className="max-w-sm text-sm leading-relaxed text-muted sm:text-right">
          {description}
        </p>
      )}
    </div>
  );
}
