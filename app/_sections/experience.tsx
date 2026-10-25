"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { SectionHeading } from "@/app/_components/section-heading";
import { Reveal } from "@/app/_components/reveal";
import { MapPin } from "@/app/_components/icons";
import { site } from "@/lib/site";

export function Experience() {
  const { experience } = site;
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 72%", "end 70%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="relative scroll-mt-24 border-t border-line py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title="Where the production work happens."
          description="Real applications, real users — with ownership across front-end systems, secure APIs and deployment."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-elevated/60 px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                <span className="size-1.5 rounded-full bg-accent" />
                {experience.period}
              </span>

              <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                {experience.role}
              </h3>

              <p className="mt-2 text-[15px] text-muted">
                {experience.company}
              </p>

              <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-muted uppercase">
                <MapPin className="size-3.5" />
                {experience.location}
              </p>

              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
                {experience.summary}
              </p>

              <div className="mt-7 flex flex-wrap gap-1.5">
                {experience.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6">
                <div>
                  <p className="font-mono text-2xl font-medium tracking-tight">
                    2.5+
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    Years in production
                  </p>
                </div>
                <div>
                  <p className="font-mono text-2xl font-medium tracking-tight">
                    5
                  </p>
                  <p className="mt-1 text-[11px] text-muted">
                    Client platforms
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div ref={listRef} className="relative pl-7 sm:pl-9">
            <div className="absolute inset-y-0 left-0 w-px bg-line" />
            <motion.div
              aria-hidden
              className="absolute inset-y-0 left-0 w-px origin-top bg-gradient-to-b from-accent to-accent-2"
              style={reduceMotion ? { scaleY: 1 } : { scaleY: lineScale }}
            />

            <ol className="space-y-8">
              {experience.bullets.map((bullet, index) => (
                <motion.li
                  key={bullet}
                  initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px 0px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative"
                >
                  <span className="absolute top-2 -left-7 size-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_0_4px_var(--canvas)] sm:-left-9" />
                  <span className="font-mono text-[10px] tracking-[0.16em] text-muted/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
                    {bullet}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
