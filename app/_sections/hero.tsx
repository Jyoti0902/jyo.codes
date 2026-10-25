"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import {
  ArrowDown,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "@/app/_components/icons";
import { Magnetic } from "@/app/_components/magnetic";
import { HeroFallback } from "@/app/_components/hero-fallback";

const HeroVisual = dynamic(
  () =>
    import("@/app/_components/hero-visual").then((mod) => mod.HeroVisual),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center">
        <HeroFallback />
      </div>
    ),
  },
);

const socials = [
  { label: "GitHub", href: site.github, Icon: Github },
  { label: "LinkedIn", href: site.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
] as const;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.075, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const headingWords = "I build digital products that".split(" ");
  const animate = "visible";

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-5 pt-10 pb-10 sm:px-8 sm:pt-16 sm:pb-14">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-8 xl:gap-12">
          <motion.div
            initial={reduceMotion ? "visible" : "hidden"}
            animate={animate}
            variants={container}
          >
            {site.available && (
              <motion.div variants={item}>
                <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-elevated/60 px-3 py-1.5 backdrop-blur">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                    {site.hero.status}
                  </span>
                </span>
              </motion.div>
            )}

            <motion.div
              variants={item}
              className="mt-8 flex items-center gap-3"
            >
              <span className="hairline w-8" />
              <p className="font-mono text-[10px] tracking-[0.28em] text-muted uppercase">
                {site.hero.eyebrow}
              </p>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-4 max-w-[17ch] text-[clamp(2.5rem,5vw,4.15rem)] leading-[0.99] font-semibold tracking-[-0.045em] text-balance"
            >
              {headingWords.map((word) => (
                <span key={word}>
                  <span className="mr-[0.22em] inline-block">{word}</span>{" "}
                </span>
              ))}
              <span className="serif-accent text-gradient inline-block pr-1">
                make an impact.
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted sm:text-base"
            >
              {site.hero.subheading}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent-fill px-5 py-3 text-sm font-medium text-accent-fill-ink transition hover:brightness-110"
                >
                  {site.hero.primaryCta}
                  <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </Magnetic>

              <Magnetic strength={7}>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm text-ink transition-colors hover:border-accent/60 hover:bg-accent-soft"
                >
                  {site.hero.secondaryCta}
                  <ArrowRight className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              <div className="flex items-center gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>

              <span className="h-4 w-px bg-line-strong" />

              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-muted uppercase">
                <MapPin className="size-3.5" />
                {site.location}
              </span>

              <a
                href={site.resume}
                download="Jyoti-Resume.pdf"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-muted uppercase underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
              >
                <Download className="size-3.5" />
                Résumé
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute inset-[12%] rounded-full bg-accent/8 blur-[90px]" />
            <HeroVisual />
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-7 sm:mt-12 sm:grid-cols-[1fr_auto] sm:items-end"
        >
          <div className="grid grid-cols-3 gap-4">
            {site.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1.5 max-w-[11rem] text-[11px] leading-relaxed text-muted sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <a
            href="#work"
            className="group hidden items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-ink sm:inline-flex"
          >
            Scroll to explore
            <span className="relative block h-8 w-px overflow-hidden bg-line-strong">
              <span className="absolute inset-x-0 top-0 h-3 animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-accent" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
