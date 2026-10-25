"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/site";

/**
 * Project previews.
 *
 * Every live product uses real screenshots (three per project, cross-fading
 * while in view, paused on hover). `CrmPreview` is the fallback "interface
 * study" used only when a project has no images — it is labelled as such in
 * the frame footer so it is never mistaken for a screenshot.
 */

function Frame({
  title,
  tag,
  footerLeft,
  footerRight,
  flush = false,
  children,
}: {
  title: string;
  tag: string;
  footerLeft: string;
  footerRight: string;
  flush?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_40px_90px_-50px_var(--glow)]">
      <div className="flex shrink-0 items-center gap-2 border-b border-line bg-elevated/80 px-3.5 py-2.5">
        <span className="size-2 rounded-full bg-ink/20" />
        <span className="size-2 rounded-full bg-ink/12" />
        <span className="size-2 rounded-full bg-ink/8" />
        <span className="ml-2 truncate font-mono text-[10px] tracking-wide text-muted">
          {title}
        </span>
        <span className="ml-auto shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[8px] tracking-[0.16em] text-muted uppercase">
          {tag}
        </span>
      </div>

      <div
        className={
          flush
            ? "relative min-h-0 flex-1 bg-canvas"
            : "relative min-h-0 flex-1 p-3 sm:p-4"
        }
      >
        {children}
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-line bg-elevated/60 px-3.5 py-1.5">
        <span className="truncate font-mono text-[8px] tracking-[0.14em] text-muted/70 uppercase">
          {footerLeft}
        </span>
        <span className="shrink-0 font-mono text-[8px] text-muted/40">{footerRight}</span>
      </div>

      <div className="preview-sheen pointer-events-none absolute inset-0 opacity-50" />
    </div>
  );
}

function ShotGallery({ project, wide }: { project: Project; wide: boolean }) {
  const images = project.images ?? [];
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || !inView || paused || images.length < 2) return;

    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % images.length),
      5200,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion, inView, paused, images.length]);

  const domain = (() => {
    try {
      return new URL(project.href).hostname.replace(/^www\./, "");
    } catch {
      return project.href;
    }
  })();

  return (
    <Frame
      title={domain}
      tag={project.category}
      footerLeft="Live product screenshot"
      footerRight={`${String(index + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`}
      flush
    >
      <div
        ref={ref}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        className="relative h-full w-full overflow-hidden bg-canvas"
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${project.title} interface screenshot ${i + 1}`}
            fill
            sizes={wide ? "(min-width: 1024px) 92vw, 100vw" : "(min-width: 1024px) 58vw, 100vw"}
            className={`object-cover object-left-top transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/25 bg-black/45 px-2.5 py-1 font-mono text-[8px] tracking-[0.16em] text-white/90 uppercase backdrop-blur">
            {project.title}
          </span>
          <span className="flex items-center gap-1.5">
            {images.map((src, i) => (
              <span
                key={src}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-white/90" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </span>
        </div>
      </div>
    </Frame>
  );
}

function CrmPreview() {
  const columns = [
    { label: "New enquiry", count: "02", cards: ["Website enquiry", "Referral"] },
    { label: "Site visit", count: "01", cards: ["Property viewing"] },
    { label: "Contract", count: "01", cards: ["Offer accepted"] },
  ];

  return (
    <Frame
      title="crm.sunnyhomes.com.au"
      tag="Sales CRM"
      footerLeft="Interface study — original composition"
      footerRight="Not a screenshot"
    >
      <div className="grid h-full grid-cols-[1fr] gap-3 sm:grid-cols-[46px_1fr]">
        <div className="hidden flex-col items-center gap-2 rounded-lg border border-line bg-elevated/60 py-2.5 sm:flex">
          <span className="grid size-7 place-items-center rounded-md bg-accent/15 font-mono text-[11px] text-accent">
            S
          </span>
          <span className="h-px w-5 bg-line" />
          {["▤", "◫", "◇", "⌂"].map((glyph, index) => (
            <span
              key={glyph}
              className={`grid size-6 place-items-center rounded text-[11px] ${
                index === 0 ? "bg-accent-soft text-accent" : "text-muted/60"
              }`}
            >
              {glyph}
            </span>
          ))}
          <span className="mt-auto size-6 rounded-full border border-line bg-canvas/60" />
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-semibold tracking-[-0.02em]">
              Pipeline overview
            </p>
            <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[8px] tracking-wide text-muted">
              SWR
            </span>
          </div>

          <div className="mt-3 grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
            {columns.map((column, columnIndex) => (
              <div
                key={column.label}
                className={`flex min-w-0 flex-col rounded-md border border-line bg-canvas/40 p-2 ${
                  columnIndex === 2 ? "hidden sm:flex" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="truncate font-mono text-[8px] tracking-[0.1em] text-muted uppercase">
                    {column.label}
                  </span>
                  <span className="font-mono text-[8px] text-muted/50">{column.count}</span>
                </div>

                <div className="mt-2 space-y-1.5">
                  {column.cards.map((card, cardIndex) => (
                    <div
                      key={card}
                      className={`rounded border px-2 py-1.5 ${
                        columnIndex === 2
                          ? "border-accent/35 bg-accent-soft"
                          : "border-line bg-elevated/80"
                      }`}
                    >
                      <p className="truncate text-[10px] leading-tight text-ink/90">{card}</p>
                      <div className="mt-1.5 flex items-center gap-1">
                        <span className="size-3 rounded-full bg-ink/12" />
                        <span className="h-px flex-1 bg-line-strong" />
                        {cardIndex === 0 ? (
                          <span className="font-mono text-[7px] text-accent">New</span>
                        ) : (
                          <span className="font-mono text-[7px] text-muted/60">Open</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {column.cards.length < 2 && (
                  <div className="mt-1.5 rounded border border-dashed border-line px-2 py-1.5 text-center font-mono text-[8px] text-muted/40">
                    + Add lead
                  </div>
                )}

                {columnIndex === 0 && (
                  <div className="mt-auto hidden pt-2 sm:block">
                    <div className="flex h-8 items-end gap-1">
                      {[42, 66, 50, 82, 58, 92].map((height, index) => (
                        <span
                          key={index}
                          className={`flex-1 rounded-sm ${
                            index > 3 ? "bg-accent/60" : "bg-ink/10"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <p className="mt-1 font-mono text-[7px] text-muted/60">Lead activity</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function ProjectVisual({
  project,
  wide = false,
}: {
  project: Project;
  wide?: boolean;
}) {
  if (project.images.length > 0) {
    return <ShotGallery project={project} wide={wide} />;
  }

  return <CrmPreview />;
}
