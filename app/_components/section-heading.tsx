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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2.5">
        <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">
          {eyebrow}
        </p>
        <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-[1.9rem]">
          {title}
        </h2>
      </div>

      {description && (
        <p className="max-w-sm text-[13px] leading-relaxed text-muted sm:text-right">
          {description}
        </p>
      )}
    </div>
  );
}
