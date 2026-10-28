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
  Search,
} from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { useCommandPalette } from "./command-palette";
import { Kbd } from "./terminal";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const palette = useCommandPalette();

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
          : "border-transparent bg-canvas/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-2 px-4 sm:px-6">
        <a
          href="#home"
          className="group flex shrink-0 items-center gap-2"
          aria-label="jyo.codes — back to top"
        >
          <span className="grid size-7 place-items-center rounded border border-line-strong bg-elevated font-mono text-[11px] text-accent transition-colors group-hover:border-accent/50 group-hover:bg-accent-soft">
            &gt;_
          </span>
          <span className="font-mono text-[13px] tracking-tight">
            jyo<span className="text-accent">.</span>codes
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="ml-3 hidden items-center gap-0.5 lg:flex"
        >
          {site.nav.map((navItem, index) => {
            const id = navItem.href.replace("#", "");
            const isActive = active === id;

            return (
              <a
                key={navItem.href}
                href={navItem.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative flex items-baseline gap-1.5 rounded px-2.5 py-1.5 font-mono text-[12px] transition-colors ${
                  isActive
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:bg-elevated hover:text-ink"
                }`}
              >
                <span
                  className={`text-[9px] ${
                    isActive ? "text-accent/70" : "text-faint"
                  }`}
                >
                  0{index + 1}
                </span>
                {navItem.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={palette.open}
            className="hidden items-center gap-2 rounded border border-line bg-elevated/60 px-2.5 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-line-strong hover:text-ink sm:inline-flex"
          >
            <Search className="size-3.5" />
            <span className="hidden md:inline">search</span>
            <Kbd>⌘K</Kbd>
          </button>

          <ThemeToggle />

          <a
            href={site.resume}
            download="Jyoti-Resume.pdf"
            className="hidden items-center gap-1.5 rounded border border-line-strong px-2.5 py-1.5 font-mono text-[11px] text-ink transition-colors hover:border-accent/60 hover:bg-accent-soft hover:text-accent sm:inline-flex"
          >
            <Download className="size-3.5" />
            cv
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-8 items-center justify-center rounded border border-line text-muted transition-colors hover:text-ink lg:hidden"
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
              <p className="prompt text-faint">$ cd ~/sections</p>

              {site.nav.map((navItem, index) => (
                <a
                  key={navItem.href}
                  href={navItem.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between border-b border-line py-3"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] text-faint">
                      0{index + 1}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[15px] text-ink">
                        {navItem.label}
                      </span>
                      <span className="font-mono text-[10px] text-faint">
                        {navItem.command}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              ))}

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    palette.open();
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded border border-line bg-elevated px-3 py-2.5 font-mono text-[12px] text-muted"
                >
                  <Search className="size-3.5" />
                  palette
                </button>

                <a
                  href={site.resume}
                  download="Jyoti-Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 rounded border border-line bg-elevated px-3 py-2.5 font-mono text-[12px] text-muted"
                >
                  <Download className="size-3.5" />
                  résumé
                </a>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded bg-accent-fill px-4 py-2.5 font-mono text-[12px] font-medium text-accent-fill-ink"
                >
                  <Mail className="size-3.5" />
                  email me
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="inline-flex size-10 items-center justify-center rounded border border-line text-muted hover:text-ink"
                >
                  <Github className="size-4" />
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex size-10 items-center justify-center rounded border border-line text-muted hover:text-ink"
                >
                  <Linkedin className="size-4" />
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
