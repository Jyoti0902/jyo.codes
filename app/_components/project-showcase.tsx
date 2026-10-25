"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
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

/**
 * Titles assemble word by word as the row enters the viewport. Spaces are
 * non-breaking inside the spans so the line still reads correctly, and the
 * final markup stays a single heading for assistive tech.
 */
function AnimatedTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <motion.h3
      className={className}
      initial={reduceMotion ? "shown" : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block will-change-transform"
          variants={{
            hidden: { opacity: 0, y: "0.4em" },
            shown: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.h3>
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

/**
 * One project row, animated against its own scroll progress:
 *
 * - a hairline accent bar across the top edge fills as the row travels up,
 * - the preview lifts, flattens and sharpens from a tilted 0.945 scale,
 * - it drifts gently against the page for a shallow parallax,
 * - the title assembles word by word on first view.
 *
 * All of it is disabled under `prefers-reduced-motion`.
 */
function ProjectRow({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth the raw page scroll a little so the movement reads as intentional.
  const line = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.32], [7.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.32], [0.945, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.22], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [22, -22]);

  // Sunny Homes is index 1: its real screens are ultra-wide CRM views, so the
  // full-bleed 21/9 treatment suits them better than a half-width column.
  const wide = index === 1;
  const reverse = index % 2 === 1;

  const preview = (
    <motion.div
      className="relative"
      style={
        reduceMotion
          ? undefined
          : { rotateX, scale, opacity, y, transformPerspective: 1200 }
      }
    >
      <TiltPreview href={project.href} label={`${project.title} — open live site`}>
        <div
          className={
            wide
              ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
              : "aspect-[5/6] sm:aspect-[16/11]"
          }
        >
          <ProjectVisual project={project} wide={wide} />
        </div>
      </TiltPreview>
    </motion.div>
  );

  return (
    <article ref={ref} className="group relative border-t border-line pt-5">
      {/* Scroll progress hairline drawn over the row's top border. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
      >
        <motion.span
          className="block h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-accent/30"
          style={{ scaleX: reduceMotion ? 1 : line }}
        />
      </span>

      <ProjectMeta project={project} total={total} />

      {wide ? (
        <div className="mt-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
            <AnimatedTitle
              text={project.title}
              className="text-[clamp(1.95rem,3.4vw,3rem)] leading-none font-semibold tracking-[-0.04em]"
            />
            <p className="max-w-md text-sm leading-relaxed text-muted lg:justify-self-end lg:text-right">
              {project.description}
            </p>
          </div>

          <div className="mt-6">{preview}</div>

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
            <AnimatedTitle
              text={project.title}
              className="text-[clamp(1.8rem,3vw,2.6rem)] leading-none font-semibold tracking-[-0.04em]"
            />

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

          <div className={reverse ? "lg:order-1" : ""}>{preview}</div>
        </div>
      )}
    </article>
  );
}

export function ProjectShowcase({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="mt-10 space-y-14 sm:mt-14 sm:space-y-20">
      {projects.map((project, index) => (
        <ProjectRow
          key={project.slug}
          project={project}
          index={index}
          total={projects.length}
        />
      ))}
    </div>
  );
}
