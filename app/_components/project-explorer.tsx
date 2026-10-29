"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/site";
import { asset } from "@/lib/site";
import { pick, rabbitLines } from "@/lib/rabbit";
import { Tilt } from "./tilt";
import { useRabbit } from "./rabbit";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "./icons";

const projectLines = rabbitLines.project as Record<string, readonly string[]>;

function ShotFrame({ project }: { project: Project }) {
  const images = project.images;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduceMotion = useReducedMotion();
  const rabbit = useRabbit();
  const count: number = images.length;
  const current = images[index];

  function step(delta: number) {
    if (count === 0) return;
    setDirection(delta);
    setIndex((value) => (value + delta + count) % count);
  }

  function goTo(next: number) {
    setDirection(next >= index ? 1 : -1);
    setIndex(next);
  }

  return (
    <figure
      className="group/shot relative overflow-hidden border-b border-line bg-elevated"
      onMouseEnter={() =>
        rabbit.say(pick(rabbitLines.shot), {
          mood: "curious",
          expression: "peeking",
          hold: 4400,
          source: "hover",
        })
      }
    >
      <Tilt
        max={3}
        hoverScale={1.015}
        className="aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]"
      >
        {current ? (
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, x: direction * 26, scale: 1.02 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={
                reduceMotion ? undefined : { opacity: 0, x: direction * -18 }
              }
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <motion.div
                className="relative h-full w-full"
                animate={reduceMotion ? undefined : { scale: [1, 1.045] }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={asset(current)}
                  alt={`${project.title} interface screenshot ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-left-top transition-transform duration-[1200ms] group-hover/shot:scale-[1.03]"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        ) : null}

        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} — open live site`}
          className="absolute inset-0 z-10"
        />

        <span className="pointer-events-none absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 text-[9.5px] font-medium tracking-[0.14em] text-white uppercase backdrop-blur">
          <span className="size-1.5 rounded-full bg-accent-fill" />
          Live
        </span>

        <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 bg-gradient-to-t from-black/60 via-black/10 to-transparent px-3 pt-10 pb-3">
          <span className="truncate text-[10px] font-medium tracking-[0.14em] text-white/75 uppercase">
            {project.category}
          </span>

          <div className="flex shrink-0 items-center gap-1 rounded-full border border-white/20 bg-black/30 px-1.5 py-1 backdrop-blur">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={count < 2}
              aria-label={`Previous ${project.title} screenshot`}
              className="grid size-6 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="size-3.5" />
            </button>

            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show screenshot ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-5 bg-accent-fill"
                    : "w-1.5 bg-white/45 hover:bg-white/70"
                }`}
              />
            ))}

            <button
              type="button"
              onClick={() => step(1)}
              disabled={count < 2}
              aria-label={`Next ${project.title} screenshot`}
              className="grid size-6 place-items-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white disabled:opacity-30"
            >
              <ChevronRight className="size-3.5" />
            </button>

            <span className="ml-0.5 text-[9.5px] text-white/70 tabular-nums">
              {String(index + 1).padStart(2, "0")}/
              {String(count).padStart(2, "0")}
            </span>
          </div>
        </div>
      </Tilt>
    </figure>
  );
}

function Detail({ project }: { project: Project }) {
  return (
    <>
      <ShotFrame project={project} />

      <div className="p-5 sm:p-7">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px] font-medium tracking-[0.16em] text-accent uppercase">
          <span>{project.category}</span>
          <span aria-hidden className="text-line-strong">
            /
          </span>
          <span className="text-faint">{project.client}</span>
        </p>

        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-[1.7rem]">
          {project.title}
        </h3>

        <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-6">
          <p className="text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
            What I built
          </p>
          <ul className="mt-3 space-y-2">
            {project.contribution.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 text-[13px] leading-relaxed text-muted"
              >
                <span
                  aria-hidden
                  className="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent-fill"
                />
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line bg-elevated px-2.5 py-1 text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent-fill px-4 py-2.5 text-[12.5px] font-medium text-accent-fill-ink transition hover:brightness-105"
        >
          Visit live site
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </>
  );
}

export function ProjectExplorer({
  projects,
}: {
  projects: readonly Project[];
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const rabbit = useRabbit();
  const project = projects[active];

  function hintProject(slug: string) {
    const lines = projectLines[slug];
    if (!lines) return;
    rabbit.say(pick(lines), {
      mood: "curious",
      expression: "pointing",
      hold: 4000,
      source: "hover",
    });
  }

  function select(index: number) {
    const next = (index + projects.length) % projects.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      select(index + 1);
      return;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      select(index - 1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      select(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      select(projects.length - 1);
    }
  }

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-8">
      <div
        role="tablist"
        aria-label="Projects"
        className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:sticky lg:top-24 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        <div className="mb-1 hidden items-center justify-between px-1 lg:flex">
          <span className="text-[10px] font-medium tracking-[0.18em] text-faint uppercase">
            Projects
          </span>
          <span className="text-[10px] text-faint tabular-nums">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {projects.map((entry, index) => {
          const selected = index === active;

          return (
            <button
              key={entry.slug}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`tab-${entry.slug}`}
              aria-selected={selected}
              aria-controls="project-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              onMouseEnter={() => hintProject(entry.slug)}
              onFocus={() => hintProject(entry.slug)}
              className={`group relative flex shrink-0 snap-start items-center gap-2 rounded-full border px-3 py-2 text-left transition-all duration-300 lg:w-full lg:items-start lg:gap-3 lg:rounded-xl lg:px-3.5 lg:py-3 ${
                selected
                  ? "border-line bg-surface shadow-sm"
                  : "border-transparent hover:bg-surface/70"
              }`}
            >
              <span
                className={`grid size-6 shrink-0 place-items-center rounded-full border text-[9.5px] font-medium transition-colors lg:mt-0.5 lg:size-7 lg:text-[10px] ${
                  selected
                    ? "border-accent-fill bg-accent-fill text-accent-fill-ink"
                    : "border-line text-faint"
                }`}
              >
                {entry.index}
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-[13px] font-medium transition-colors lg:text-[14px] ${
                    selected ? "text-ink" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {entry.title}
                </span>
                <span className="mt-0.5 hidden truncate text-[11.5px] text-faint lg:block">
                  {entry.category}
                </span>
              </span>

              <ArrowUpRight
                className={`hidden size-4 shrink-0 transition-all duration-300 lg:block ${
                  selected
                    ? "text-accent"
                    : "text-faint opacity-0 group-hover:opacity-100"
                }`}
              />
            </button>
          );
        })}
      </div>

      <div
        id="project-panel"
        role="tabpanel"
        aria-labelledby={`tab-${project.slug}`}
        className="card overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={project.slug}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <Detail project={project} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
