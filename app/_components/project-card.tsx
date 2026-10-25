import type { Project } from "@/lib/site";
import { ArrowUpRight } from "./icons";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className={`card-enter group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-elevated/70 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-line hover:bg-elevated hover:shadow-[0_18px_50px_-35px_var(--glow)] md:p-7 ${
        project.featured ? "md:col-span-2 md:p-8" : ""
      }`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-accent/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />

      {project.featured && (
        <span className="absolute top-0 right-0 rounded-bl-xl border-b border-l border-line bg-canvas/80 px-3 py-1 font-mono text-[10px] tracking-wider text-muted uppercase">
          Featured
        </span>
      )}

      <div className="relative flex items-center justify-between gap-4">
        <span className="font-mono text-[10px] tracking-wider text-muted">
          {String(index + 1).padStart(2, "0")} / {project.category}
        </span>
        <span className="inline-flex size-8 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-ink/25 group-hover:text-ink">
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <h3 className="relative mt-4 text-lg font-semibold tracking-tight sm:text-xl">
        {project.title}
      </h3>

      <p className="relative mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      <ul
        className={`relative mt-4 grid gap-1.5 text-xs text-muted ${
          project.featured ? "sm:grid-cols-3" : ""
        }`}
      >
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2">
            <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted/50" />
            {highlight}
          </li>
        ))}
      </ul>

      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="relative mt-auto flex items-center gap-3 pt-6">
        <span className="font-mono text-[10px] tracking-wider text-muted uppercase transition-colors group-hover:text-ink">
          {project.linkLabel}
        </span>
        <span className="h-px flex-1 bg-line" />
        <ArrowUpRight className="size-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
      </div>
    </a>
  );
}
