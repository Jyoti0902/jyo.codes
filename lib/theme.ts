// Theme helpers shared by the toggle. The initial attribute is set by the
// inline script in the document head, so these only run after mount.

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

export function currentTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable in private modes — the theme still applies.
  }
}

export function toggleTheme(): Theme {
  const next: Theme = currentTheme() === "light" ? "dark" : "light";
  applyTheme(next);
  return next;
}

/** Re-applies a stored theme after React's dev remount clears the attribute. */
export function restoreStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch {
    // Default theme is fine.
  }
}
