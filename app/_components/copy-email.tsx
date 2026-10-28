"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "./icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);

      if (timeout.current) window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copyEmail}
      className="group inline-flex items-center gap-1.5 rounded border border-line px-2 py-1 font-mono text-[10px] text-faint transition-colors hover:border-accent/50 hover:text-accent"
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className="size-3 text-accent" />
          copied
        </>
      ) : (
        <>
          <Copy className="size-3 transition-colors group-hover:text-accent" />
          cp
        </>
      )}
    </button>
  );
}
