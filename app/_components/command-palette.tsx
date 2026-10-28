"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { site } from "@/lib/site";
import { applyTheme, currentTheme, scrollToSection } from "@/lib/theme";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Github,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sun,
  Terminal,
} from "./icons";
import { Kbd, WindowDots } from "./terminal";

type PaletteApi = {
  open: () => void;
  close: () => void;
};

const PaletteContext = createContext<PaletteApi | null>(null);

export function useCommandPalette() {
  const context = useContext(PaletteContext);

  if (!context) {
    throw new Error(
      "useCommandPalette must be used inside <CommandPaletteProvider>",
    );
  }

  return context;
}

type Command = {
  id: string;
  group: "Navigate" | "Projects" | "Actions";
  label: string;
  hint: string;
  keywords?: string;
  icon: ReactNode;
  run: () => void;
};

function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function copyText(value: string) {
  return navigator.clipboard.writeText(value);
}

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const api = useMemo<PaletteApi>(
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }),
    [],
  );

  // Cmd/Ctrl+K anywhere, or "/" when the caret is not already in a field.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        Boolean(target?.isContentEditable);

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }

      if (event.key === "/" && !typing) {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <PaletteContext.Provider value={api}>
      {children}
      <PaletteDialog open={open} onClose={() => setOpen(false)} />
    </PaletteContext.Provider>
  );
}

function PaletteDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);

  // Closing resets the query so the next open starts clean.
  const close = useCallback(() => {
    setQuery("");
    setSelected(0);
    onClose();
  }, [onClose]);

  // Copy keeps the palette open so the "copied" state is visible; everything
  // else dismisses before the action runs (e.g. navigating or opening a tab).
  const execute = useCallback(
    (command: Command) => {
      command.run();
      if (command.id !== "copy-email") close();
    },
    [close],
  );

  const commands = useMemo<Command[]>(() => {
    const navigate: Command[] = site.nav.map((item) => ({
      id: `nav-${item.href}`,
      group: "Navigate",
      label: item.label,
      hint: item.command,
      keywords: `section jump go ${item.href}`,
      icon: <ArrowRight className="size-3.5" />,
      run: () => scrollToSection(item.href.replace("#", "")),
    }));

    const projects: Command[] = site.projects.map((project) => ({
      id: `project-${project.slug}`,
      group: "Projects",
      label: project.title,
      hint: `open ${domainOf(project.href)}`,
      keywords: `${project.category} ${project.stack.join(" ")}`,
      icon: <ArrowUpRight className="size-3.5" />,
      run: () => window.open(project.href, "_blank", "noopener,noreferrer"),
    }));

    const actions: Command[] = [
      {
        id: "focus-shell",
        group: "Actions",
        label: "Focus the terminal",
        hint: "cd ~",
        keywords: "shell prompt hero type",
        icon: <Terminal className="size-3.5" />,
        run: () => {
          scrollToSection("home");
          window.dispatchEvent(new CustomEvent("jyo:focus-shell"));
        },
      },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: "cp email",
        keywords: "mail clipboard contact",
        icon: copied ? (
          <Check className="size-3.5 text-accent" />
        ) : (
          <Copy className="size-3.5" />
        ),
        run: () => {
          copyText(site.email)
            .then(() => setCopied(true))
            .catch(() => {
              window.location.href = `mailto:${site.email}`;
            });
        },
      },
      {
        id: "email",
        group: "Actions",
        label: "Send an email",
        hint: `mail ${site.email}`,
        keywords: "contact hire hello",
        icon: <Mail className="size-3.5" />,
        run: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "resume",
        group: "Actions",
        label: "Open résumé",
        hint: "open cv.pdf",
        keywords: "download cv pdf",
        icon: <Download className="size-3.5" />,
        run: () => window.open(site.resume, "_blank", "noopener,noreferrer"),
      },
      {
        id: "github",
        group: "Actions",
        label: "GitHub profile",
        hint: "open github",
        keywords: "code repos source",
        icon: <Github className="size-3.5" />,
        run: () => window.open(site.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        group: "Actions",
        label: "LinkedIn profile",
        hint: "open linkedin",
        keywords: "work history network",
        icon: <Linkedin className="size-3.5" />,
        run: () => window.open(site.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "theme",
        group: "Actions",
        label: "Toggle colour theme",
        hint: "theme light | dark",
        keywords: "dark light mode switch",
        icon:
          currentTheme() === "light" ? (
            <Moon className="size-3.5" />
          ) : (
            <Sun className="size-3.5" />
          ),
        run: () => {
          applyTheme(currentTheme() === "light" ? "dark" : "light");
        },
      },
    ];

    return [...navigate, ...projects, ...actions];
  }, [copied]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return commands;

    return commands.filter((command) =>
      `${command.label} ${command.hint} ${command.keywords ?? ""} ${command.group}`
        .toLowerCase()
        .includes(term),
    );
  }, [commands, query]);

  // Derive the active row instead of clamping state in an effect.
  const activeIndex =
    filtered.length === 0 ? 0 : Math.min(selected, filtered.length - 1);

  // Focus the input on open and hand focus back to the trigger on close.
  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      cancelAnimationFrame(frame);
      restoreFocus.current?.focus?.();
    };
  }, [open]);

  // Clear the "copied" confirmation after a moment.
  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`,
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function onKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((value) =>
        filtered.length === 0 ? 0 : (value + 1) % filtered.length,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((value) =>
        filtered.length === 0
          ? 0
          : (value - 1 + filtered.length) % filtered.length,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const command = filtered[activeIndex];
      if (command) execute(command);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setSelected(0);
    }

    if (event.key === "End") {
      event.preventDefault();
      setSelected(Math.max(0, filtered.length - 1));
    }
  }

  const dur = reduceMotion ? 0 : 0.18;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: dur }}
          onKeyDown={onKeyDown}
        >
          <button
            type="button"
            aria-label="Close command palette"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default bg-canvas/80 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6, scale: 0.995 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="window relative z-10 w-full max-w-xl overflow-hidden shadow-[0_40px_120px_-40px_#000]"
          >
            <div className="window-bar px-3 py-2">
              <WindowDots />
              <span className="ml-2 font-mono text-[11px] text-muted">
                command palette
              </span>
              <span className="ml-auto font-mono text-[9px] tracking-[0.16em] text-faint uppercase">
                {filtered.length} matches
              </span>
            </div>

            <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-3">
              <Search className="size-4 shrink-0 text-accent" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelected(0);
                }}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={
                  filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined
                }
                aria-autocomplete="list"
                placeholder="Type a command or search…"
                spellCheck={false}
                autoComplete="off"
                className="w-full bg-transparent font-mono text-[13px] text-ink outline-none placeholder:text-faint"
              />
              <Kbd>esc</Kbd>
            </div>

            <ul
              ref={listRef}
              id="palette-list"
              role="listbox"
              aria-label="Commands"
              className="max-h-[52vh] overflow-y-auto p-1.5"
            >
              {filtered.map((command, index) => {
                const showGroup =
                  index === 0 || filtered[index - 1].group !== command.group;

                return (
                  <li key={command.id}>
                    {showGroup ? (
                      <p className="px-2.5 pt-2 pb-1 font-mono text-[9px] tracking-[0.18em] text-faint uppercase">
                        {command.group}
                      </p>
                    ) : null}

                    <button
                      type="button"
                      id={`cmd-${command.id}`}
                      role="option"
                      aria-selected={activeIndex === index}
                      data-index={index}
                      onMouseEnter={() => setSelected(index)}
                      onClick={() => execute(command)}
                      className={`flex w-full items-center gap-3 rounded px-2.5 py-2 text-left transition-colors ${
                        activeIndex === index
                          ? "bg-accent-soft text-ink"
                          : "text-muted hover:bg-elevated"
                      }`}
                    >
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded border ${
                          activeIndex === index
                            ? "border-accent/40 text-accent"
                            : "border-line text-faint"
                        }`}
                      >
                        {command.icon}
                      </span>

                      <span className="min-w-0 flex-1 truncate text-[13px]">
                        {command.label}
                      </span>

                      <span className="hidden shrink-0 font-mono text-[10px] text-faint sm:block">
                        {command.hint}
                      </span>

                      {activeIndex === index ? (
                        <span
                          aria-hidden
                          className="shrink-0 font-mono text-[11px] text-accent"
                        >
                          ⏎
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}

              {filtered.length === 0 ? (
                <li className="px-3 py-8 text-center font-mono text-[12px] text-faint">
                  command not found: “{query}” — try “work” or “email”
                </li>
              ) : null}
            </ul>

            <div className="flex items-center gap-3 border-t border-line bg-elevated/60 px-3 py-2 font-mono text-[10px] text-faint">
              <span className="flex items-center gap-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                navigate
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>⏎</Kbd>
                run
              </span>
              <span className="ml-auto text-accent">
                {copied ? "✓ email copied" : ""}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
