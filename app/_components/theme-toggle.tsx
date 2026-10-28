"use client";

import { useLayoutEffect } from "react";
import { restoreStoredTheme, toggleTheme } from "@/lib/theme";
import { Moon, Sun } from "./icons";

export function ThemeToggle() {
  // Re-apply the stored theme after React's dev-mode remount clears the
  // attribute set by the inline script in the document head.
  useLayoutEffect(() => {
    restoreStoredTheme();
  }, []);

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      title="Toggle colour theme"
      aria-label="Toggle colour theme"
      className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:bg-elevated hover:text-accent"
    >
      <Sun className="theme-sun size-3.5" />
      <Moon className="theme-moon size-3.5" />
    </button>
  );
}
