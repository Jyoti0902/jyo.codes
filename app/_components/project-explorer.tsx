"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/site";
import { asset } from "@/lib/site";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "./icons";
import { CommandPrompt, WindowBar, WindowDots } from "./terminal";

function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function ShotFrame({ project }: { project: Project }) {
  const images = project.images.length > 0 ? project.images : [];
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = images.length;
  const domain = domainOf(project.href);
  const current = images[index];

  function step(delta: number) {
    if (count === 0) return;
    setIndex((value) => (value + delta + count) % count);
  }

  return (
    <figure className="overflow-hidden rounded border border-line-strong bg-canvas">
      <WindowBar
        title={`${domain} — ${String(index + 1).padStart(2, "0")}.jpg`}
        meta="live screenshot"
        right={<WindowDots />}
      />

      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
        {current ? (
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={current}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={asset(current)}
                alt={`${project.title} interface screenshot ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-left-top"
                priority={false}
              />
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

        <span className="pointer-events-none absolute top-3 left-3 z-20 rounded border border-white/20 bg-black/55 px-2 py-0.5 font-mono text-[9px] tracking-[0.12em] text-white/85 uppercase backdrop-blur">
          live
        </span>
      </div>

      <figcaption className="flex items-center justify-between gap-3 border-t border-line bg-elevated/60 px-2.5 py-1.5">
        <span className="hidden font-mono text-[9px] tracking-[0.12em] text-faint uppercase sm:inline">
          {project.title}
        </span>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={count < 2}
            aria-label={`Previous ${project.title} screenshot`}
            className="grid size-6 place-items-center rounded text-muted transition hover:bg-elevated-2 hover:text-ink disabled:opacity-30"
          >
            <ChevronLeft className="size-3.5" />
          </button>

          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show screenshot ${i + 1} of ${count}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${
                i === index
                  ? "w-5 bg-accent"
                  : "w-1.5 bg-line-strong hover:bg-muted"
              }`}
            />
          ))}

          <button
            type="button"
            onClick={() => step(1)}
            disabled={count < 2}
            aria-label={`Next ${project.title} screenshot`}
            className="grid size-6 place-items-center rounded text-muted transition hover:bg-elevated-2 hover:text-ink disabled:opacity-30"
          >
            <ChevronRight className="size-3.5" />
          </button>

          <span className="ml-1 font-mono text-[9px] text-faint">
            {String(index + 1).padStart(2, "0")}/
            {String(count).padStart(2, "0")}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

function Detail({ project }: { project: Project }) {
  return (
    <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.22fr_1fr] lg:gap-8">
      <div className="order-2 lg:order-1">
        <ShotFrame project={project} />
      </div>

      <div className="order-1 flex flex-col lg:order-2">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] tracking-[0.14em] uppercase">
          <span className="text-accent">#{project.index}</span>
          <span className="text-faint">·</span>
          <span className="text-muted">{project.category}</span>
          <span className="text-faint">·</span>
          <span className="text-muted">{project.client}</span>
        </p>

        <h3 className="mt-2.5 text-2xl font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
          {project.title}
        </h3>

        <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-5">
          <p className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
            # contribution
          </p>
          <ul className="mt-2 space-y-1.5">
            {project.contribution.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2 font-mono text-[11.5px] leading-relaxed text-muted"
              >
                <span aria-hidden className="mt-px text-accent">
                  +
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <p className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
            # stack
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="group mt-auto inline-flex w-fit items-center gap-2 pt-5 font-mono text-[12px] text-ink transition-colors hover:text-accent"
        >
          <span className="text-accent">$</span>
          open {domainOf(project.href)}
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
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
  const project = projects[active];

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
    <div className="mt-10">
      <div className="window overflow-hidden">
        <div className="window-bar px-3 py-2 sm:px-3.5">
          <WindowDots />
          <span className="ml-2 truncate font-mono text-[11px] text-muted">
            ~/work
          </span>
          <span className="ml-auto shrink-0 font-mono text-[9px] tracking-[0.14em] text-faint uppercase">
            {projects.length} entries · drwxr-xr-x
          </span>
        </div>

        <div className="border-b border-line bg-canvas/50 px-3.5 py-2.5">
          <CommandPrompt command="ls -la ~/work --sort=impact" />
        </div>

        <div
          role="tablist"
          aria-label="Projects"
          aria-orientation="vertical"
          className="select-none"
        >
          <div className="hidden grid-cols-[2.5rem_minmax(0,1.5fr)_minmax(0,0.9fr)_minmax(0,1fr)_4rem] gap-3 border-b border-line bg-elevated/40 px-3.5 py-1.5 font-mono text-[9px] tracking-[0.14em] text-faint uppercase sm:grid">
            <span>#</span>
            <span>project</span>
            <span>sector</span>
            <span>stack</span>
            <span className="text-right">link</span>
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
                className={`relative grid w-full grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-2.5 border-b border-line px-3.5 py-3 text-left transition-colors last:border-b-0 sm:grid-cols-[2.5rem_minmax(0,1.5fr)_minmax(0,0.9fr)_minmax(0,1fr)_4rem] sm:gap-3 ${
                  selected
                    ? "bg-accent-soft"
                    : "hover:bg-elevated/70"
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-0.5 transition-colors ${
                    selected ? "bg-accent" : "bg-transparent"
                  }`}
                />

                <span
                  className={`font-mono text-[11px] ${
                    selected ? "text-accent" : "text-faint"
                  }`}
                >
                  {selected ? "▸" : entry.index}
                </span>

                <span className="min-w-0">
                  <span
                    className={`block truncate text-[13.5px] ${
                      selected ? "text-ink" : "text-muted"
                    }`}
                  >
                    {entry.title}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[9.5px] text-faint sm:hidden">
                    {entry.category} · {entry.stack.join(" / ")}
                  </span>
                </span>

                <span className="hidden truncate font-mono text-[10.5px] text-faint sm:block">
                  {entry.category}
                </span>

                <span className="hidden truncate font-mono text-[10.5px] text-faint sm:block">
                  {entry.stack.join(" · ")}
                </span>

                <span
                  className={`hidden justify-self-end font-mono text-[10px] sm:block ${
                    selected ? "text-accent" : "text-faint"
                  }`}
                >
                  live ↗
                </span>

                <ArrowUpRight
                  className={`size-3.5 justify-self-end sm:hidden ${
                    selected ? "text-accent" : "text-faint"
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
          className="border-t border-line"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.slug}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            >
              <Detail project={project} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 font-mono text-[10px] text-faint">
        <span>{"// click a row — or use ↑ ↓ to move through the list"}</span>
        <span>
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </p>
    </div>
  );
}
