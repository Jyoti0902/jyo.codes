"use client";

import { useState } from "react";
import { categories, site, type Category } from "@/lib/site";
import { ProjectCard } from "./project-card";

export function ProjectFilter() {
  const [active, setActive] = useState<Category>("All");

  const visible =
    active === "All"
      ? site.projects
      : site.projects.filter((project) => project.category === active);

  return (
    <div>
      <div
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => {
          const count =
            category === "All"
              ? site.projects.length
              : site.projects.filter(
                  (project) => project.category === category,
                ).length;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={active === category}
              onClick={() => setActive(category)}
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all ${
                active === category
                  ? "border-ink bg-ink text-canvas"
                  : "border-line text-muted hover:border-ink/25 hover:text-ink"
              }`}
            >
              {category}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  active === category
                    ? "bg-canvas/15 text-canvas/80"
                    : "bg-elevated-2 text-muted"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}.
      </p>

      <div
        key={active}
        id="work-grid"
        className="mt-8 grid gap-5 md:grid-cols-2"
      >
        {visible.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
