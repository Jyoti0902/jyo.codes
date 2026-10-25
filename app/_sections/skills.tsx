"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/app/_components/section-heading";
import { site } from "@/lib/site";

export function Skills() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const group = site.skills[active];

  return (
    <section
      id="skills"
      className="relative scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Technical toolkit"
          title="A practical stack, used in production."
          description="Grouped by how I use them — from responsive interfaces to APIs, data and deployment."
        />

        <div className="mt-12 grid gap-7 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12">
          <div className="flex flex-col">
            {site.skills.map((skill, index) => {
              const isActive = index === active;

              return (
                <button
                  key={skill.key}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  className={`group relative flex items-center gap-5 border-t border-line py-5 text-left transition-colors ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] tracking-[0.14em] ${
                      isActive ? "text-accent" : "text-muted/60"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg tracking-[-0.02em] sm:text-xl">
                    {skill.label}
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-muted/60">
                    {String(skill.items.length).padStart(2, "0")}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="skill-active"
                      className="absolute inset-x-0 top-0 h-px bg-accent"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </button>
              );
            })}

            <p className="mt-6 max-w-xs text-[11px] leading-relaxed text-muted/70">
              No proficiency scores — just the tools I use to design, build and
              ship production software.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-line bg-elevated/40 p-6 backdrop-blur sm:p-9">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />
            <div className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-accent/10 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-28 -left-20 size-64 rounded-full bg-accent-2/8 blur-[90px]" />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

            <div className="relative flex h-full flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={group.key}
                  initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-1 flex-col"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                      {String(active + 1).padStart(2, "0")} /{" "}
                      {group.label}
                    </span>
                    <span className="hairline hidden w-14 sm:block" />
                  </div>

                  <div className="flex flex-1 flex-col justify-center py-7">
                    <p className="max-w-md font-serif text-[1.6rem] leading-tight text-ink italic sm:text-[1.9rem]">
                      {group.caption}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {group.items.map((item, index) => (
                        <motion.span
                          key={item}
                          initial={
                            reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.035,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="cursor-default rounded-full border border-line bg-canvas/60 px-3.5 py-2 font-mono text-[11.5px] text-muted transition-colors hover:border-accent/50 hover:bg-accent-soft hover:text-ink"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 border-t border-line pt-5">
                    <span className="size-1.5 rounded-full bg-accent" />
                    <span className="font-mono text-[10px] tracking-[0.14em] text-muted/70 uppercase">
                      Used across production projects
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-muted/50">
                      {String(group.items.length).padStart(2, "0")} tools
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
