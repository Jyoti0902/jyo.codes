"use client";

import { useEffect, useRef, useState } from "react";
import { rabbitLines } from "@/lib/rabbit";
import { Check, Copy } from "./icons";
import { useRabbit } from "./rabbit";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<number | null>(null);
  const rabbit = useRabbit();

  useEffect(() => {
    return () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      rabbit.say(rabbitLines.contact.copy[0], {
        mood: "happy",
        hold: 3000,
        source: "hover",
      });

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
      className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-[13px] font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-accent" />
          Copied
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
