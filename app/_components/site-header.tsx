"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import {
  ArrowUpRight,
  Close,
  Download,
  Github,
  Linkedin,
  Mail,
  Menu,
} from "./icons";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = [
      "home",
      ...site.nav.map((item) => item.href.replace("#", "")),
    ]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const onScroll = () => {
      setScrolled(window.scrollY > 10);

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
          ? "border-line bg-canvas/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          className="group flex items-center gap-2.5"
          aria-label="jyo.codes — back to top"
        >
          <span className="grid size-7 place-items-center rounded-md border border-line-strong bg-elevated/70 font-mono text-[11px] text-accent transition-colors group-hover:border-accent/50">
            j
          </span>
          <span className="font-mono text-sm tracking-tight">
            jyo<span className="text-accent">.</span>codes
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex"
        >
          {site.nav.map((navItem) => {
            const id = navItem.href.replace("#", "");
            const isActive = active === id;

            return (
              <a
                key={navItem.href}
                href={navItem.href}
                className={`relative py-1 text-[13px] transition-colors ${
                  isActive ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {navItem.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href={site.resume}
            download="Jyoti-Resume.pdf"
            className="hidden items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[11px] text-ink transition-colors hover:border-accent/60 hover:bg-accent-soft sm:inline-flex"
          >
            <Download className="size-3.5 text-accent" />
            Résumé
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink md:hidden"
          >
            {open ? <Close className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-canvas/95 backdrop-blur-xl md:hidden"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex max-w-7xl flex-col px-5 py-5 sm:px-8"
            >
              {site.nav.map((navItem, index) => (
                <a
                  key={navItem.href}
                  href={navItem.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-line py-3.5 text-xl tracking-tight text-ink"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-muted">
                      0{index + 1}
                    </span>
                    {navItem.label}
                  </span>
                  <ArrowUpRight className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              ))}

              <div className="mt-5 flex items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent-fill px-4 py-2.5 text-sm font-medium text-accent-fill-ink"
                >
                  <Mail className="size-4" />
                  Email me
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
                >
                  <Github className="size-4" />
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted hover:text-ink"
                >
                  <Linkedin className="size-4" />
                </a>
              </div>

              <a
                href={site.resume}
                download="Jyoti-Resume.pdf"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-between rounded-full border border-line px-4 py-2.5 text-sm text-muted"
              >
                Download résumé
                <Download className="size-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
