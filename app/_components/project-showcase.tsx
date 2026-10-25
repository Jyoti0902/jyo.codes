"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Project } from "@/lib/site";
import { ArrowUpRight } from "./icons";
import { ProjectVisual } from "./project-visual";

function TiltPreview({
  children,
  href,
  label,
}: {
  children: ReactNode;
  href: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [2.6, -2.6]), {
    stiffness: 160,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3.2, 3.2]), {
    stiffness: 160,
    damping: 22,
  });

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1400 }
      }
      className="relative [transform-style:preserve-3d]"
    >
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className="block transition-transform duration-500 hover:scale-[1.008]"
      >
        {children}
      </a>
    </motion.div>
  );
}

function ProjectMeta({
  project,
  total,
}: {
  project: Project;
  total: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] tracking-[0.16em] uppercase">
      <span className="text-accent">{project.index}</span>
      <span className="text-muted">—</span>
      <span className="text-muted">{project.category}</span>
      <span className="size-1 rounded-full bg-line-strong" />
      <span className="text-muted">{project.client}</span>
      <span className="ml-auto hidden text-muted/50 sm:inline">
        {project.index} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

function ContributionList({
  project,
  columns = false,
}: {
  project: Project;
  columns?: boolean;
}) {
  return (
    <ul className={`mt-5 gap-2 ${columns ? "grid sm:grid-cols-3" : "space-y-2"}`}>
      {project.contribution.map((line) => (
        <li
          key={line}
          className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-muted"
        >
          <span className="mt-[7px] size-1 shrink-0 rounded-full bg-accent/70" />
          {line}
        </li>
      ))}
    </ul>
  );
}

function Stack({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {project.stack.map((tech) => (
        <span
          key={tech}
          className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function LiveLink({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group/link inline-flex items-center gap-2 border-b border-line-strong pb-1 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
    >
      View live site
      <ArrowUpRight className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </a>
  );
}

export function ProjectShowcase({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="mt-10 space-y-14 sm:mt-14 sm:space-y-20">
      {projects.map((project, index) => {
        const wide = index === 2;
        const reverse = index % 2 === 1;

        return (
          <article
            key={project.slug}
            className="group border-t border-line pt-5"
          >
            <ProjectMeta project={project} total={projects.length} />

            {wide ? (
              <div className="mt-6">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
                  <h3 className="text-[clamp(1.95rem,3.4vw,3rem)] leading-none font-semibold tracking-[-0.04em]">
                    {project.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-muted lg:justify-self-end lg:text-right">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6">
                  <TiltPreview
                    href={project.href}
                    label={`${project.title} — open live site`}
                  >
                    <div className="aspect-[5/6] sm:aspect-[16/9] lg:aspect-[21/9]">
                      <ProjectVisual project={project} />
                    </div>
                  </TiltPreview>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                  <ContributionList project={project} columns />

                  <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
                    <Stack project={project} />
                    <LiveLink project={project} />
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`mt-6 grid items-center gap-8 ${
                  index === 0
                    ? "lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]"
                    : "lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]"
                }`}
              >
                <div className={reverse ? "lg:order-2" : ""}>
                  <h3 className="text-[clamp(1.8rem,3vw,2.6rem)] leading-none font-semibold tracking-[-0.04em]">
                    {project.title}
                  </h3>

                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <ContributionList project={project} />

                  <div className="mt-6">
                    <Stack project={project} />
                  </div>

                  <div className="mt-6">
                    <LiveLink project={project} />
                  </div>
                </div>

                <div className={reverse ? "lg:order-1" : ""}>
                  <TiltPreview
                    href={project.href}
                    label={`${project.title} — open live site`}
                  >
                    <div className="aspect-[5/6] sm:aspect-[16/11]">
                      <ProjectVisual project={project} />
                    </div>
                  </TiltPreview>
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
