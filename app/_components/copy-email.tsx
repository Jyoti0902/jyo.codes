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
      className="group inline-flex items-center gap-2 rounded-full border border-line bg-elevated/60 px-4 py-2.5 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-ink"
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-accent" />
          Copied to clipboard
        </>
      ) : (
        <>
          <Copy className="size-3.5 transition-colors group-hover:text-accent" />
          Copy email
        </>
      )}
    </button>
  );
}
