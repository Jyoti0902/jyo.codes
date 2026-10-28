import type { ReactNode } from "react";
import { site } from "@/lib/site";

/** The `jyoti@codes:~$` prompt, used above every command in the UI. */
export function CommandPrompt({
  path = site.shell.path,
  command,
  className = "",
}: {
  path?: string;
  command: string;
  className?: string;
}) {
  return (
    <span className={`prompt block ${className}`}>
      <span className="prompt-user">{site.shell.user}</span>
      <span className="prompt-symbol">@</span>
      <span className="prompt-host">{site.shell.host}</span>
      <span className="prompt-symbol">:</span>
      <span className="prompt-path">{path}</span>
      <span className="prompt-symbol"> $ </span>
      <span className="prompt-cmd">{command}</span>
    </span>
  );
}

export function WindowDots() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden>
      <span className="dot-red" />
      <span className="dot-amber" />
      <span className="dot-green" />
    </span>
  );
}

export function WindowBar({
  title,
  meta,
  right,
  className = "",
}: {
  title: string;
  meta?: string;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`window-bar px-3 py-2 sm:px-3.5 ${className}`}>
      <WindowDots />

      <span className="ml-1.5 min-w-0 truncate font-mono text-[11px] text-muted sm:ml-2.5">
        {title}
      </span>

      <span className="ml-auto flex shrink-0 items-center gap-2">
        {right}
        {meta ? (
          <span className="hidden font-mono text-[9px] tracking-[0.16em] text-faint uppercase sm:inline">
            {meta}
          </span>
        ) : null}
      </span>
    </div>
  );
}

/** A rounded terminal window with a title bar. */
export function TerminalWindow({
  title,
  meta,
  right,
  children,
  className = "",
  bodyClassName = "",
}: {
  title: string;
  meta?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={`window overflow-hidden ${className}`}>
      <WindowBar title={title} meta={meta} right={right} />
      <div className={`relative ${bodyClassName}`}>{children}</div>
    </div>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex min-w-5 items-center justify-center rounded border border-line-strong bg-elevated px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted">
      {children}
    </kbd>
  );
}

/** `[ label ]` styled button, the terminal equivalent of a pill. */
export function Bracket({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] text-faint" aria-hidden>
      {children}
    </span>
  );
}
