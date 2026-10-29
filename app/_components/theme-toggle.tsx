"use client";

import { useLayoutEffect } from "react";
import { pick, rabbitLines } from "@/lib/rabbit";
import { restoreStoredTheme, toggleTheme } from "@/lib/theme";
import { Moon, Sun } from "./icons";
import { useRabbit } from "./rabbit";

export function ThemeToggle() {
  const rabbit = useRabbit();

  // Re-apply the stored theme after React's dev-mode remount clears the
  // attribute set by the inline script in the document head.
  useLayoutEffect(() => {
    restoreStoredTheme();
  }, []);

  function toggle() {
    const next = toggleTheme();
    rabbit.say(
      pick(next === "light" ? rabbitLines.theme.light : rabbitLines.theme.dark),
      { mood: "happy", expression: "finger_heart", hold: 2800, source: "hover" },
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title="Toggle colour theme"
      aria-label="Toggle colour theme"
      className="inline-flex size-8 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:bg-elevated hover:text-accent"
    >
      <Sun className="theme-sun size-3.5" />
      <Moon className="theme-moon size-3.5" />
    </button>
  );
}
