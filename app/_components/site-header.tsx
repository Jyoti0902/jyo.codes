"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { pick, rabbitLines } from "@/lib/rabbit";
import {
  ArrowUpRight,
  Close,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
} from "./icons";
import { useRabbit } from "./rabbit";
import { ThemeToggle } from "./theme-toggle";

const navLines = rabbitLines.nav as Record<string, readonly string[]>;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const rabbit = useRabbit();

  function hintNav(id: string) {
    const lines = navLines[id];
    if (!lines) return;
    rabbit.say(pick(lines), { mood: "curious", hold: 4200, source: "hover" });
  }

  useEffect(() => {
    const sections = [
      "home",
      ...site.nav.map((item) => item.href.replace("#", "")),
    ]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const threshold = window.scrollY + window.innerHeight * 0.35;
      let current = "home";

      for (const section of sections) {
        if (section.offsetTop <= threshold) current = section.id;
      }

      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-canvas/85 backdrop-blur-xl"
          : "border-transparent bg-canvas/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 sm:px-6">
        <a
          href="#home"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="jyo.codes — back to top"
          onMouseEnter={() => hintNav("home")}
          onFocus={() => hintNav("home")}
        >
          <span className="grid size-8 place-items-center rounded-lg bg-accent-fill text-[13px] font-semibold text-accent-fill-ink transition-transform duration-300 group-hover:-rotate-6">
            j
          </span>
          <span className="text-[14.5px] font-medium tracking-tight">
            jyo<span className="text-accent">.</span>codes
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="ml-4 hidden items-center gap-1 lg:flex"
        >
          {site.nav.map((navItem) => {
            const id = navItem.href.replace("#", "");
            const isActive = active === id;

            return (
              <a
                key={navItem.href}
                href={navItem.href}
                aria-current={isActive ? "true" : undefined}
                onMouseEnter={() => hintNav(id)}
                onFocus={() => hintNav(id)}
                className={`relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-elevated"
                    transition={{ type: "spring", stiffness: 400, damping: 36 }}
                  />
                ) : null}
                <span className="relative z-10">{navItem.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />

          <a
            href={site.resume}
            download="Jyoti-Resume.pdf"
            className="hidden items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-[12px] font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent sm:inline-flex"
          >
            <Download className="size-3.5" />
            Résumé
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:text-ink lg:hidden"
          >
            {open ? <Close className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-canvas/95 backdrop-blur-xl lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto max-w-6xl px-4 py-4 sm:px-6"
            >
              {site.nav.map((navItem) => (
                <a
                  key={navItem.href}
                  href={navItem.href}
                  onClick={() => setOpen(false)}
                  onMouseEnter={() => hintNav(navItem.href.replace("#", ""))}
                  className="group flex items-center justify-between border-b border-line py-3.5"
                >
                  <span className="text-[15px] font-medium text-ink">
                    {navItem.label}
                  </span>
                  <ArrowUpRight className="size-4 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              ))}

              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={site.resume}
                  download="Jyoti-Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-3 py-2.5 text-[12.5px] font-medium text-muted transition-colors hover:text-ink"
                >
                  <Download className="size-3.5" />
                  Résumé
                </a>

                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-fill px-3 py-2.5 text-[12.5px] font-medium text-accent-fill-ink"
                >
                  <Mail className="size-3.5" />
                  Email me
                </a>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex size-10 flex-1 items-center justify-center gap-2 rounded-full border border-line text-[12.5px] text-muted transition-colors hover:text-ink"
                >
                  <Github className="size-4" />
                  GitHub
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex size-10 flex-1 items-center justify-center gap-2 rounded-full border border-line text-[12.5px] text-muted transition-colors hover:text-ink"
                >
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
