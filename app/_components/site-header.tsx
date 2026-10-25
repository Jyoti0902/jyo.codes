"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { ArrowUpRight, Close, Menu } from "./icons";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-canvas/80 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2.5 font-mono text-sm tracking-tight"
          aria-label="jyoti.codes — back to top"
        >
          <span className="size-1.5 rounded-full bg-accent" />
          <span>
            jyo<span className="text-accent">.</span>codes
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-ink/25 hover:text-ink sm:inline-flex"
          >
            Résumé
            <ArrowUpRight className="size-3" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:text-ink md:hidden"
          >
            {open ? (
              <Close className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-line bg-canvas/95 backdrop-blur-xl md:hidden"
        >
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line/70 py-3 text-sm text-muted transition-colors last:border-0 hover:text-ink"
              >
                {item.label}
                <ArrowUpRight className="size-4" />
              </a>
            ))}

            <a
              href={site.resume}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-between rounded-xl border border-line px-4 py-3 text-sm text-ink transition-colors hover:border-accent/50"
            >
              View résumé
              <ArrowUpRight className="size-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
