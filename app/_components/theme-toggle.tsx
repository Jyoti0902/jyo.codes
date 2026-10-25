"use client";

import { useLayoutEffect } from "react";
import { Moon, Sun } from "./icons";

export function ThemeToggle() {
  // Re-apply the stored theme after React's dev-mode remount clears the
  // attribute set by the inline script in the document head.
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch {
      // localStorage can be unavailable in private modes; the default is fine.
    }
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const next =
      root.getAttribute("data-theme") === "light" ? "dark" : "light";

    root.setAttribute("data-theme", next);

    try {
      localStorage.setItem("theme", next);
    } catch {
      // Ignore storage failures — the theme still changes for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title="Toggle colour theme"
      aria-label="Toggle colour theme"
      className="inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
    >
      <Sun className="theme-sun size-4" />
      <Moon className="theme-moon size-4" />
    </button>
  );
}
