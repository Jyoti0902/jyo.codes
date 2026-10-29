"use client";

import type { ReactNode } from "react";
import { pick, type MomoExpression, type RabbitMood } from "@/lib/rabbit";
import { useRabbit } from "./rabbit";

/**
 * Small client wrapper for server-rendered cards. Pass a list of lines; Momo
 * picks one when the pointer or keyboard focus lands on the card.
 */
export function Hint({
  lines,
  mood = "curious",
  expression,
  hold = 4400,
  className = "",
  children,
}: {
  lines: readonly string[];
  mood?: RabbitMood;
  expression?: MomoExpression;
  hold?: number;
  className?: string;
  children: ReactNode;
}) {
  const rabbit = useRabbit();

  const speak = () => {
    rabbit.say(pick(lines), { mood, expression, hold, source: "hover" });
  };

  return (
    <div
      className={className}
      onMouseEnter={speak}
      onFocus={speak}
      onTouchStart={speak}
    >
      {children}
    </div>
  );
}
