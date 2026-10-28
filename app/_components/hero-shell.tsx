"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { applyTheme, currentTheme, scrollToSection } from "@/lib/theme";
import { WindowDots } from "./terminal";

type LineKind = "cmd" | "out" | "dim" | "accent" | "error" | "help";

type Line = {
  id: number;
  kind: LineKind;
  text: string;
};

type BootEntry = {
  cmd: string;
  out: Array<{ text: string; kind: LineKind }>;
};

const BOOT: BootEntry[] = [
  {
    cmd: "whoami",
    out: [
      { text: "jyoti — software engineer · 2.5+ years in production", kind: "out" },
    ],
  },
  {
    cmd: "pwd",
    out: [{ text: "/india/punjab/mohali", kind: "dim" }],
  },
  {
    cmd: "cat focus.txt",
    out: [{ text: site.focus.join(" · ").toLowerCase(), kind: "accent" }],
  },
];

const SECTIONS = ["work", "experience", "skills", "about", "contact"] as const;

const HELP: Array<[string, string]> = [
  ["whoami", "who is behind this site"],
  ["ls", "list sections"],
  ["cd <section>", "work · experience · skills · about · contact"],
  ["open <target>", "project slug, github, linkedin, resume, email"],
  ["projects", "list shipped products"],
  ["stack", "print the toolkit"],
  ["theme [light|dark]", "switch appearance"],
  ["clear", "clear this pane"],
  ["date", "print the current time"],
  ["exit", "try it"],
];

function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function bootLines(): Array<{ text: string; kind: LineKind }> {
  return BOOT.flatMap((entry) => [
    { text: entry.cmd, kind: "cmd" as LineKind },
    ...entry.out,
  ]);
}

export function HeroShell() {
  const reduceMotion = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const idRef = useRef(0);
  const timers = useRef<number[]>([]);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const nextId = useCallback(() => {
    idRef.current += 1;
    return idRef.current;
  }, []);

  const push = useCallback(
    (entries: Array<{ text: string; kind: LineKind }>) => {
      setLines((current) => [
        ...current,
        ...entries.map((entry) => ({ ...entry, id: nextId() })),
      ]);
    },
    [nextId],
  );

  const finishBoot = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
    setTyped("");
    setLines(
      bootLines().map((entry) => ({ ...entry, id: nextId() })),
    );
    setDone(true);
  }, [nextId]);

  // Type the boot commands once, then hand the prompt over to the visitor.
  useEffect(() => {
    timers.current.push(
      window.setTimeout(() => {
        setLines([]);
        setTyped("");
        setDone(false);
      }, 0),
    );

    if (reduceMotion) {
      timers.current.push(window.setTimeout(finishBoot, 0));
    } else {
      let delay = 420;
      const charDelay = 30;

      BOOT.forEach((entry) => {
        for (let i = 1; i <= entry.cmd.length; i += 1) {
          const partial = entry.cmd.slice(0, i);
          timers.current.push(
            window.setTimeout(() => setTyped(partial), delay),
          );
          delay += charDelay;
        }

        const entryDelay = delay;
        timers.current.push(
          window.setTimeout(() => {
            setTyped("");
            push([
              { text: entry.cmd, kind: "cmd" },
              ...entry.out,
            ]);
          }, entryDelay),
        );

        delay += 320;
      });

      timers.current.push(window.setTimeout(() => setDone(true), delay));
    }

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, [reduceMotion, finishBoot, push]);

  // Keep the newest output in view, like a real shell.
  useEffect(() => {
    const node = outputRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [lines, typed, done]);

  // The command palette can send focus to this prompt.
  useEffect(() => {
    function onFocusShell() {
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    }

    window.addEventListener("jyo:focus-shell", onFocusShell);
    return () => window.removeEventListener("jyo:focus-shell", onFocusShell);
  }, [reduceMotion]);

  function runCommand(raw: string) {
    const command = raw.trim();
    if (!command) return;

    setHistory((current) => [command, ...current].slice(0, 40));
    setHistoryIndex(-1);
    setLines((current) => [
      ...current,
      { id: nextId(), kind: "cmd", text: command },
    ]);

    const [name = "", ...rest] = command.split(/\s+/);
    const arg = rest.join(" ").trim();
    const lower = name.toLowerCase();

    const say = (text: string, kind: LineKind = "out") =>
      push([{ text, kind }]);

    switch (lower) {
      case "help":
        say("available commands", "accent");
        push(
          HELP.map(([cmd, description]) => ({
            text: `${cmd.padEnd(19)}${description}`,
            kind: "help" as LineKind,
          })),
        );
        return;

      case "whoami":
        push([
          { text: "jyoti — software engineer", kind: "out" },
          { text: "2.5+ years shipping production web apps", kind: "dim" },
          { text: `based in ${site.location.toLowerCase()}`, kind: "dim" },
          { text: site.email, kind: "accent" },
        ]);
        return;

      case "ls":
        say("about.md  contact/  experience/  skills/  work/", "out");
        say("5 entries — try: cd work", "dim");
        return;

      case "cd": {
        if (!arg) {
          say("usage: cd <section>", "dim");
          say(`sections: ${SECTIONS.join(" · ")}`, "dim");
          return;
        }

        const target = arg.replace(/^~\/?/, "").replace(/\/$/, "").toLowerCase();

        if (!SECTIONS.includes(target as (typeof SECTIONS)[number])) {
          say(`cd: no such directory: ${arg}`, "error");
          return;
        }

        say(`→ cd ~/${target}`, "accent");
        window.setTimeout(() => scrollToSection(target), 220);
        return;
      }

      case "open": {
        if (!arg) {
          say("usage: open <project|github|linkedin|resume|email>", "dim");
          return;
        }

        const target = arg.toLowerCase();
        const project = site.projects.find(
          (item) =>
            item.slug.toLowerCase() === target ||
            item.title.toLowerCase() === target ||
            domainOf(item.href).toLowerCase() === target,
        );

        if (project) {
          say(`→ opening ${domainOf(project.href)}`, "accent");
          window.open(project.href, "_blank", "noopener,noreferrer");
          return;
        }

        const links: Record<string, { url: string; label: string }> = {
          github: { url: site.github, label: "github.com/Jyoti0902" },
          linkedin: { url: site.linkedin, label: "linkedin.com/in/jyoti" },
          resume: { url: site.resume, label: "Jyoti-Resume.pdf" },
          cv: { url: site.resume, label: "Jyoti-Resume.pdf" },
          email: { url: `mailto:${site.email}`, label: site.email },
          mail: { url: `mailto:${site.email}`, label: site.email },
        };

        const link = links[target];
        if (!link) {
          say(`open: unknown target: ${arg}`, "error");
          say("try: projects", "dim");
          return;
        }

        say(`→ opening ${link.label}`, "accent");
        if (link.url.startsWith("mailto:")) {
          window.location.href = link.url;
        } else {
          window.open(link.url, "_blank", "noopener,noreferrer");
        }
        return;
      }

      case "projects":
        push([
          { text: "shipped products", kind: "accent" },
          ...site.projects.map((project) => ({
            text: `  ${project.index}  ${project.title.padEnd(26)}${domainOf(project.href)}`,
            kind: "out" as LineKind,
          })),
          { text: 'open any of them with: open <slug>', kind: "dim" },
        ]);
        return;

      case "stack":
        say(site.marquee.join(" · "), "out");
        return;

      case "theme": {
        const next = arg.toLowerCase();

        if (next === "light" || next === "dark") {
          applyTheme(next);
          say(`theme → ${next}`, "accent");
          return;
        }

        const applied: "light" | "dark" =
          currentTheme() === "light" ? "dark" : "light";
        applyTheme(applied);
        say(`theme → ${applied}`, "accent");
        return;
      }

      case "clear":
        setLines([]);
        return;

      case "date":
        say(new Date().toLocaleString(), "dim");
        return;

      case "neofetch":
        push([
          { text: `${site.shell.user}@${site.shell.host}`, kind: "accent" },
          { text: "-------------------", kind: "dim" },
          { text: "role     : software engineer", kind: "out" },
          { text: "uptime   : 2.5+ years in production", kind: "out" },
          { text: "shell    : react · next.js · typescript", kind: "out" },
          { text: "editor   : vs code", kind: "out" },
          { text: `location : ${site.location}`, kind: "out" },
          { text: "status   : open to opportunities", kind: "accent" },
        ]);
        return;

      case "echo":
        say(arg || " ", "out");
        return;

      case "sudo":
        say("jyoti is not in the sudoers file. This incident has been reported.", "error");
        return;

      case "exit":
      case "logout":
        say("there is no exit. you can scroll instead.", "accent");
        return;

      default:
        say(`command not found: ${name}`, "error");
        say(`type "help" for available commands`, "dim");
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(value);
    setValue("");
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setValue(history[next]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setValue("");
        return;
      }
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setValue(history[next]);
      return;
    }

    if (event.key === "Tab") {
      const match = HELP.map(([cmd]) => cmd.split(" ")[0]).find((cmd) =>
        cmd.startsWith(value.trim().toLowerCase()),
      );

      if (match && value.trim()) {
        event.preventDefault();
        setValue(`${match} `);
      }
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setLines([]);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setValue("");
      return;
    }

    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "c") {
      // Mirrors a shell: ^C abandons the line instead of copying it.
      if (value) {
        event.preventDefault();
        push([{ text: `${value}^C`, kind: "dim" }]);
        setValue("");
      }
    }
  }

  function focusPrompt() {
    inputRef.current?.focus();
  }

  return (
    <div className="window overflow-hidden">
      <div className="window-bar px-3 py-2">
        <WindowDots />
        <span className="ml-2 truncate font-mono text-[11px] text-muted">
          {site.shell.user}@{site.shell.host}: ~
        </span>

        <span className="ml-auto flex items-center gap-2">
          {!done ? (
            <button
              type="button"
              onClick={finishBoot}
              className="font-mono text-[9px] tracking-[0.14em] text-faint uppercase transition-colors hover:text-accent"
            >
              skip intro
            </button>
          ) : (
            <span className="hidden font-mono text-[9px] tracking-[0.14em] text-faint uppercase sm:inline">
              zsh
            </span>
          )}
        </span>
      </div>

      <div
        ref={outputRef}
        role="log"
        aria-live={done ? "polite" : "off"}
        aria-label="Terminal output"
        className="h-[248px] cursor-text overflow-y-auto bg-canvas/40 px-3.5 py-3 font-mono text-[12px] leading-[1.75] sm:h-[268px]"
      >
        {lines.map((line) => (
          <p
            key={line.id}
            className={`whitespace-pre-wrap break-words ${
              line.kind === "cmd"
                ? "text-ink"
                : line.kind === "help"
                  ? "pl-[21ch] -indent-[21ch] text-faint"
                  : line.kind === "dim"
                    ? "text-faint"
                    : line.kind === "accent"
                      ? "text-accent"
                      : line.kind === "error"
                        ? "text-danger"
                        : "text-muted"
            }`}
          >
            {line.kind === "cmd" ? (
              <>
                <span className="text-accent">~</span>
                <span className="text-faint"> $ </span>
              </>
            ) : null}
            {line.text}
          </p>
        ))}

        {!done ? (
          <p className="text-ink">
            <span className="text-accent">~</span>
            <span className="text-faint"> $ </span>
            {typed}
            <span className="caret" aria-hidden />
          </p>
        ) : null}
      </div>

      <form
        onSubmit={onSubmit}
        onClick={focusPrompt}
        className="flex items-center gap-2 border-t border-line bg-elevated/60 px-3.5 py-2.5"
      >
        <label htmlFor="hero-shell" className="sr-only">
          Terminal command
        </label>
        <span className="shrink-0 font-mono text-[12px] text-accent">~</span>
        <span className="shrink-0 font-mono text-[12px] text-faint">$</span>
        <input
          ref={inputRef}
          id="hero-shell"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          disabled={!done}
          placeholder={done ? 'type "help" and press enter' : "booting…"}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-describedby="hero-shell-hint"
          className="shell-input w-full bg-transparent font-mono text-[12px] text-ink caret-accent outline-none placeholder:text-faint disabled:cursor-wait"
        />
        <span id="hero-shell-hint" className="hidden shrink-0 font-mono text-[10px] text-faint sm:inline">
          ↑↓ history
        </span>
      </form>
    </div>
  );
}
