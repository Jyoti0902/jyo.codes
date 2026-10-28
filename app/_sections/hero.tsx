"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { asset, site } from "@/lib/site";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "@/app/_components/icons";

const socials = [
  { label: "GitHub", href: site.github, Icon: Github },
  { label: "LinkedIn", href: site.linkedin, Icon: Linkedin },
  { label: "Email", href: `mailto:${site.email}`, Icon: Mail },
] as const;

const featured = site.projects[0];

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
        className="aurora pointer-events-none absolute -top-44 right-[-12%] h-[520px] w-[520px] rounded-full opacity-70 blur-2xl sm:h-[660px] sm:w-[660px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-12 pb-14 sm:px-6 sm:pt-20 sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <motion.div
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            variants={container}
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[11.5px] font-medium text-muted shadow-sm">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-fill opacity-70" />
                  <span className="status-dot relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                {site.hero.status}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-6 max-w-[15ch] text-[clamp(2.5rem,5.6vw,4.15rem)] leading-[0.98] font-semibold tracking-[-0.05em] text-balance"
            >
              {site.hero.headingLead}{" "}
              <span className="text-accent-gradient">
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
                className="group inline-flex items-center gap-2 rounded-full bg-accent-fill px-5 py-2.5 text-[13px] font-medium text-accent-fill-ink shadow-sm transition hover:brightness-105"
              >
                {site.hero.primaryCta}
                <ArrowDown className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>

              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[13px] font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
              >
                {site.hero.secondaryCta}
                <ArrowUpRight className="size-3.5 text-accent transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href={site.resume}
                download="Jyoti-Resume.pdf"
                className="inline-flex items-center gap-1.5 px-1.5 py-2.5 text-[12.5px] text-muted transition-colors hover:text-ink"
              >
                <Download className="size-3.5" />
                Résumé
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-5"
            >
              <div className="flex items-center gap-1.5">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                  >
                    <Icon className="size-3.5" />
                  </a>
                ))}
              </div>

              <span className="hidden h-4 w-px bg-line-strong sm:block" />

              <span className="inline-flex items-center gap-1.5 text-[12px] text-muted">
                <MapPin className="size-3.5 text-faint" />
                {site.location}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={
              reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-[0_32px_80px_-52px_rgba(24,24,27,0.55)]"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <div className="relative aspect-[16/11]">
                    <Image
                      src={asset(featured.images[0])}
                      alt={`${featured.title} interface preview`}
                      fill
                      sizes="(min-width: 1024px) 44vw, 100vw"
                      className="object-cover object-left-top"
                      priority
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                      <div className="min-w-0 text-white">
                        <p className="text-[9.5px] font-medium tracking-[0.18em] text-white/70 uppercase">
                          Selected work
                        </p>
                        <p className="mt-1 truncate text-[14px] font-medium">
                          {featured.title}
                        </p>
                      </div>

                      <a
                        href="#work"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur transition-colors hover:bg-white/25"
                      >
                        View case
                        <ArrowUpRight className="size-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5 px-1">
              <p className="text-[11.5px] text-faint">
                {featured.category} · {featured.client}
              </p>

              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 shadow-sm">
                <span aria-hidden className="size-1.5 rounded-full bg-accent-fill" />
                <span className="text-[11.5px] font-medium text-muted">
                  {site.projects.length} client products shipped
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-3">
          {site.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="card card-hover px-5 py-5"
            >
              <p className="text-2xl font-semibold tracking-[-0.03em] tabular-nums sm:text-[1.7rem]">
                {stat.value}
              </p>
              <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
