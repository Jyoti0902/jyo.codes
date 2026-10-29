"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { pick, rabbitLines, type RabbitMood } from "@/lib/rabbit";
import { Sparkles } from "./icons";

// ---------------------------------------------------------------------------
// Momo is a tiny site guide: she comments on nav items, cards and sections,
// and curls up to sleep whenever the page goes quiet. The provider below owns
// the "who is talking" state so any component can call `useRabbit().say(...)`.
// ---------------------------------------------------------------------------

export type RabbitMessage = {
  id: number;
  text: string;
  mood: RabbitMood;
};

type SayOptions = {
  mood?: RabbitMood;
  hold?: number;
  source?: "hover" | "section" | "system";
};

type RabbitActions = {
  say: (text: string, options?: SayOptions) => void;
  wake: () => void;
};

type RabbitState = {
  message: RabbitMessage | null;
  sleeping: boolean;
};

const noop = () => {};

const RabbitActionsContext = createContext<RabbitActions>({
  say: noop,
  wake: noop,
});
const RabbitStateContext = createContext<RabbitState>({
  message: null,
  sleeping: false,
});

/** Actions only — components using this do not re-render on every new line. */
export function useRabbit() {
  return useContext(RabbitActionsContext);
}

const SLEEP_AFTER = 3800;
const DEFAULT_HOLD = 4600;

export function RabbitProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<RabbitMessage | null>(null);
  const [sleeping, setSleeping] = useState(false);

  const idRef = useRef(0);
  const messageTimer = useRef<number | null>(null);
  const sleepingRef = useRef(false);
  const lastActivity = useRef(0);
  const lastHover = useRef(0);
  const lastSay = useRef(0);
  const announced = useRef(new Set<string>());

  const clearMessageTimer = useCallback(() => {
    if (messageTimer.current !== null) {
      window.clearTimeout(messageTimer.current);
      messageTimer.current = null;
    }
  }, []);

  const say = useCallback(
    (text: string, options: SayOptions = {}) => {
      if (!text) return;

      sleepingRef.current = false;
      setSleeping(false);
      lastActivity.current = Date.now();
      lastSay.current = Date.now();
      if (options.source === "hover") lastHover.current = Date.now();

      const id = ++idRef.current;
      setMessage({ id, text, mood: options.mood ?? "happy" });

      clearMessageTimer();
      messageTimer.current = window.setTimeout(() => {
        setMessage((current) => (current?.id === id ? null : current));
        messageTimer.current = null;
      }, options.hold ?? DEFAULT_HOLD);
    },
    [clearMessageTimer],
  );

  const wake = useCallback(() => {
    lastActivity.current = Date.now();
    if (!sleepingRef.current) return;

    sleepingRef.current = false;
    setSleeping(false);
    setMessage((current) => (current?.mood === "sleepy" ? null : current));
  }, []);

  // Quiet for a few seconds? Time for a nap.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (sleepingRef.current || document.hidden) return;
      if (Date.now() - lastActivity.current < SLEEP_AFTER) return;

      sleepingRef.current = true;
      setSleeping(true);

      const napId = ++idRef.current;
      setMessage({ id: napId, text: pick(rabbitLines.sleep), mood: "sleepy" });

      clearMessageTimer();
      messageTimer.current = window.setTimeout(() => {
        setMessage((current) => (current?.id === napId ? null : current));
        messageTimer.current = null;
      }, 4200);
    }, 700);

    return () => window.clearInterval(id);
  }, [clearMessageTimer]);

  // Any real interaction counts as "still here" and wakes her up.
  useEffect(() => {
    let lastEvent = 0;
    lastActivity.current = Date.now();

    const onActivity = () => {
      const now = Date.now();
      if (now - lastEvent < 180) return;
      lastEvent = now;
      lastActivity.current = now;
      if (sleepingRef.current) wake();
    };

    // A line belongs to whatever is on screen. Once the page moves, drop it so
    // the bubble never trails over the content you just scrolled to.
    const onScroll = () => {
      onActivity();
      if (sleepingRef.current) return;
      clearMessageTimer();
      setMessage(null);
    };

    const passive = { passive: true } as AddEventListenerOptions;

    window.addEventListener("pointermove", onActivity, passive);
    window.addEventListener("pointerdown", onActivity, passive);
    window.addEventListener("scroll", onScroll, passive);
    window.addEventListener("touchstart", onActivity, passive);
    window.addEventListener("keydown", onActivity);
    window.addEventListener("focusin", onActivity);

    return () => {
      window.removeEventListener("pointermove", onActivity);
      window.removeEventListener("pointerdown", onActivity);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("focusin", onActivity);
    };
  }, [wake, clearMessageTimer]);

  // A small hello once the page has settled.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (Date.now() - lastHover.current < 1400) return;
      say(pick(rabbitLines.greeting), {
        mood: "happy",
        hold: 5400,
        source: "system",
      });
    }, 1600);

    return () => window.clearTimeout(id);
  }, [say]);

  // Announce each section once, the first time it reaches the middle of the
  // viewport. Hover tips always win; sections never talk over the user.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-rabbit-section]"),
    );
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const key = (entry.target as HTMLElement).dataset.rabbitSection;
          if (!key || announced.current.has(key)) continue;
          announced.current.add(key);

          const lines = (
            rabbitLines.section as Record<string, readonly string[]>
          )[key];
          if (!lines) continue;

          window.setTimeout(() => {
            if (document.hidden) return;
            if (Date.now() - lastHover.current < 2000) return;
            if (Date.now() - lastSay.current < 4200) return;

            say(pick(lines), {
              mood: "curious",
              hold: 5200,
              source: "section",
            });
          }, 500);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [say]);

  const actions = useMemo(() => ({ say, wake }), [say, wake]);
  const state = useMemo(() => ({ message, sleeping }), [message, sleeping]);

  return (
    <RabbitActionsContext.Provider value={actions}>
      <RabbitStateContext.Provider value={state}>
        {children}
        <RabbitMascot />
      </RabbitStateContext.Provider>
    </RabbitActionsContext.Provider>
  );
}

const MESSAGES = [
  "Momo is napping — tap to wake her",
  "Momo the bunny — tap for a tip",
] as const;

function RabbitMascot() {
  const { say } = useContext(RabbitActionsContext);
  const { message, sleeping } = useContext(RabbitStateContext);
  const reduce = useReducedMotion();
  const [blinking, setBlinking] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const messageId = message?.id ?? 0;

  useEffect(() => {
    if (reduce || sleeping) return;

    const id = window.setInterval(() => {
      setBlinking(true);
      window.setTimeout(() => setBlinking(false), 140);
    }, 4800);

    return () => window.clearInterval(id);
  }, [reduce, sleeping]);

  // Gentle drift so she feels alive rather than pinned to the corner.
  useEffect(() => {
    if (reduce || sleeping) {
      animate(x, 0, { duration: 0.8, ease: "easeInOut" });
      animate(rotate, sleeping ? -4 : 0, { duration: 0.8, ease: "easeInOut" });
      return;
    }

    const id = window.setInterval(() => {
      animate(x, (Math.random() - 0.5) * 24, {
        duration: 2.8,
        ease: "easeInOut",
      });
      animate(rotate, (Math.random() - 0.5) * 5, {
        duration: 2.8,
        ease: "easeInOut",
      });
    }, 5400);

    return () => window.clearInterval(id);
  }, [reduce, sleeping, x, rotate]);

  // A little hop whenever she has something new to say.
  useEffect(() => {
    if (reduce || sleeping || !messageId) return;

    animate(y, [0, -12, -3, 0], {
      duration: 0.7,
      times: [0, 0.32, 0.66, 1],
      ease: "easeOut",
    });
  }, [messageId, reduce, sleeping, y]);

  const poke = () => {
    if (!sleeping) {
      animate(y, [0, -16, -4, 0], {
        duration: 0.75,
        times: [0, 0.3, 0.65, 1],
        ease: "easeOut",
      });
    }

    say(pick(rabbitLines.click), {
      mood: "excited",
      hold: 4200,
      source: "hover",
    });
  };

  return (
    <div className="pointer-events-none fixed right-3 bottom-3 z-40 flex items-end gap-1.5 sm:right-5 sm:bottom-5">
      <p aria-live="polite" role="status" className="sr-only">
        {message?.text ?? ""}
      </p>

      <AnimatePresence initial={false} mode="wait">
        {message ? (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.24, ease: [0.16, 1, 0.3, 1] }
            }
            className="mascot-bubble pointer-events-none relative mb-1.5 max-w-[min(70vw,250px)] rounded-2xl rounded-br-md border px-3.5 py-2.5 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.35)]"
          >
            <p className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.16em] text-accent uppercase">
              <Sparkles className="size-2.5" aria-hidden />
              Momo
            </p>
            <p className="mt-1 text-[12px] leading-relaxed">
              {message.text}
            </p>
            <span
              aria-hidden
              className="mascot-bubble-tail absolute -right-[5px] bottom-3 size-2.5 rotate-45 border-r border-b"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-auto relative">
        {sleeping ? <Zzz still={Boolean(reduce)} /> : null}

        <motion.button
          type="button"
          onClick={poke}
          style={{ x, y, rotate }}
          aria-label={MESSAGES[sleeping ? 0 : 1]}
          title={MESSAGES[sleeping ? 0 : 1]}
          className="group relative block size-[92px] cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:size-[112px]"
        >
          <motion.span
            animate={
              reduce ? undefined : { y: [0, -3, 0], rotate: [0, 0.6, 0] }
            }
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="block h-full w-full transition-transform duration-300 group-hover:scale-105 group-active:scale-95"
          >
            <Bunny
              sleeping={sleeping}
              blinking={blinking}
              mood={message?.mood ?? "idle"}
            />
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}

function Zzz({ still = false }: { still?: boolean }) {
  if (still) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute -top-2 right-1 z-10 text-[11px] font-semibold text-faint"
      >
        z z
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-2 right-1 z-10 flex flex-col items-end"
    >
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: [0, 0.9, 0], y: [4, -8, -18], x: [0, 4, 8] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeOut",
          }}
          className="text-[11px] font-semibold text-faint"
        >
          z
        </motion.span>
      ))}
    </div>
  );
}

function Bunny({
  sleeping,
  blinking,
  mood,
}: {
  sleeping: boolean;
  blinking: boolean;
  mood: RabbitMood;
}) {
  const eyesClosed = blinking;
  const cheerful = mood === "happy" || mood === "excited";

  return (
    <svg
      viewBox="0 0 220 220"
      className="rabbit-sprite h-full w-full drop-shadow-[0_10px_18px_rgba(24,24,27,0.14)]"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="momo-fur" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" className="momo-fur-a" />
          <stop offset="100%" className="momo-fur-b" />
        </linearGradient>
        <radialGradient id="momo-cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" className="momo-blush" stopOpacity="0.7" />
          <stop offset="100%" className="momo-blush" stopOpacity="0" />
        </radialGradient>
        <clipPath id="momo-avatar">
          <circle cx="110" cy="110" r="108" />
        </clipPath>
      </defs>

      <circle cx="110" cy="110" r="108" className="momo-bg" />

      <g clipPath="url(#momo-avatar)">
        {/* Narrow shoulders with the little dashes from the reference */}
        <rect x="76" y="140" width="60" height="100" rx="20" fill="url(#momo-fur)" />
        <g className="momo-dash" strokeWidth="2.4" strokeLinecap="round">
          <path d="M90 180v9M102 188v9M110 180v9M118 188v9M130 180v9" />
        </g>

        {/* Long ears splayed from the top corners of the head, like the reference */}
        <g transform="rotate(-26 88 132)">
          <rect x="66" y="22" width="36" height="110" rx="18" fill="url(#momo-fur)" />
          <rect
            className="rabbit-ear momo-ear"
            x="75"
            y="36"
            width="18"
            height="82"
            rx="9"
          />
        </g>
        <g transform="rotate(14 132 132)">
          <rect x="120" y="24" width="36" height="108" rx="18" fill="url(#momo-fur)" />
          <rect
            className="rabbit-ear rabbit-ear-delay momo-ear"
            x="129"
            y="38"
            width="18"
            height="80"
            rx="9"
          />
        </g>

        {/* Head, sitting lower in the badge */}
        <ellipse cx="106" cy="121" rx="57" ry="46" fill="url(#momo-fur)" />

        {/* Soft cheeks */}
        <ellipse cx="68" cy="140" rx="14" ry="8" fill="url(#momo-cheek)" />
        <ellipse cx="144" cy="140" rx="14" ry="8" fill="url(#momo-cheek)" />

        {/* Small round eyes with a light brow, closed while blinking/asleep */}
        {sleeping ? (
          <g stroke="#2f2126" strokeWidth="2.4" strokeLinecap="round" fill="none">
            <path d="M75 119h10" />
            <path d="M127 119h10" />
          </g>
        ) : blinking ? (
          <g stroke="#2f2126" strokeWidth="2.6" strokeLinecap="round" fill="none">
            <path d="M74 116q6 5 12 0" />
            <path d="M126 116q6 5 12 0" />
          </g>
        ) : (
          <g>
            <ellipse cx="80" cy="116" rx="6.2" ry="7.2" fill="#3a2830" />
            <ellipse cx="132" cy="116" rx="6.2" ry="7.2" fill="#3a2830" />
            <circle cx="77.6" cy="113" r="2" fill="#ffffff" />
            <circle cx="129.6" cy="113" r="2" fill="#ffffff" />
            <circle cx="82.8" cy="119.8" r="0.9" fill="#ffffff" opacity="0.7" />
            <circle cx="134.8" cy="119.8" r="0.9" fill="#ffffff" opacity="0.7" />
          </g>
        )}
        <g
          stroke="#2f2126"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        >
          <path d="M73 106q7-5 14-1" />
          <path d="M125 106q7-5 14-1" />
        </g>

        {/* Big cream muzzle, a wide plum nose and a little mouth */}
        <ellipse cx="106" cy="143" rx="26" ry="23" className="momo-muzzle" />
        <path
          d="M106 116c-7 0-12 3.5-12 8.5 0 6.5 7.5 11 12 15.5 4.5-4.5 12-9 12-15.5 0-5-5-8.5-12-8.5Z"
          className="momo-nose"
        />
        <path
          d="M106 140v4M106 144c0 4-5 6-7 2M106 144c0 4 5 6 7 2"
          stroke="#2f2126"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <g
          className="momo-blush-line"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        >
          <path d="M91 152h-5M116 152h5M97 158h-5M110 158h5" />
        </g>

        {cheerful && !eyesClosed ? (
          <g className="momo-ear" opacity="0.8">
            <circle cx="58" cy="116" r="1.8" />
            <circle cx="154" cy="116" r="1.8" />
          </g>
        ) : null}
      </g>
    </svg>
  );
}
