"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "@/app/_components/icons";
import { CommandPrompt } from "@/app/_components/terminal";
import { HeroShell } from "@/app/_components/hero-shell";

const socials = [
  { label: "GitHub", href: site.github, Icon: Github },
  { label: "LinkedIn", href: site.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
] as const;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-x-0 top-0 h-[560px] opacity-60"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-10 pb-12 sm:px-6 sm:pt-16 sm:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12">
          <motion.div
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={container}
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded border border-line-strong bg-elevated/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-muted uppercase backdrop-blur">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="status-dot relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                {site.hero.status}
              </span>
            </motion.div>

            <motion.div variants={item} className="mt-7">
              <CommandPrompt command="cat intro.md" className="text-muted" />
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-3 max-w-[16ch] text-[clamp(2.45rem,5.4vw,4.05rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance"
            >
              {site.hero.headingLead}{" "}
              <span className="text-accent text-glow">
                {site.hero.headingAccent}
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
            >
              {site.hero.subheading}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center gap-2.5"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded bg-accent-fill px-4 py-2.5 font-mono text-[12px] font-medium text-accent-fill-ink transition hover:brightness-110"
              >
                <span aria-hidden className="text-accent-fill-ink/60">
                  ./
                </span>
                {site.hero.primaryCta.toLowerCase()}
                <ArrowDown className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded border border-line-strong px-4 py-2.5 font-mono text-[12px] text-ink transition-colors hover:border-accent/60 hover:bg-accent-soft hover:text-accent"
              >
                {site.hero.secondaryCta.toLowerCase()}
                <ArrowUpRight className="size-3.5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href={site.resume}
                download="Jyoti-Resume.pdf"
                className="inline-flex items-center gap-1.5 px-1 py-2.5 font-mono text-[12px] text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
              >
                <Download className="size-3.5" />
                résumé.pdf
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-5"
            >
              <div className="flex items-center gap-1.5">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={label}
                    className="inline-flex size-8 items-center justify-center rounded border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                  >
                    <Icon className="size-3.5" />
                  </a>
                ))}
              </div>

              <span className="hidden h-4 w-px bg-line-strong sm:block" />

              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-muted">
                <MapPin className="size-3.5 text-faint" />
                {site.location}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={
              reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-full bg-accent/5 blur-3xl"
            />
            <div className="relative">
              <HeroShell />
            </div>
            <p className="mt-2.5 flex items-center justify-between px-1 font-mono text-[10px] text-faint">
              <span>{"// interactive — try whoami, ls, or help"}</span>
              <span className="hidden sm:inline">⌘K for everything</span>
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-3"
        >
          {site.stats.map((stat) => (
            <div key={stat.label} className="bg-surface/70 px-4 py-3.5">
              <p className="font-mono text-xl font-medium tracking-tight text-ink sm:text-2xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
