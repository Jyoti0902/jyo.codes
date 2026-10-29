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
            className="pointer-events-none relative mb-1.5 max-w-[min(70vw,250px)] rounded-2xl rounded-br-md border border-line bg-surface px-3.5 py-2.5 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.55)]"
          >
            <p className="flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.16em] text-accent uppercase">
              <Sparkles className="size-2.5" aria-hidden />
              Momo
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-ink">
              {message.text}
            </p>
            <span
              aria-hidden
              className="absolute -right-[5px] bottom-3 size-2.5 rotate-45 border-r border-b border-line bg-surface"
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
        className="pointer-events-none absolute top-0 left-[46%] -translate-x-1/2 text-[11px] font-semibold text-faint"
      >
        z z
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-[46%] flex -translate-x-1/2 flex-col items-end"
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
  if (sleeping) return <SleepingBunny />;

  const eyesClosed = blinking;
  const cheerful = mood === "happy" || mood === "excited";

  return (
    <svg
      viewBox="0 0 220 250"
      className="rabbit-sprite h-full w-full drop-shadow-[0_16px_22px_rgba(24,24,27,0.16)]"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="momo-fur" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" className="momo-fur-a" />
          <stop offset="100%" className="momo-fur-b" />
        </linearGradient>
        <radialGradient id="momo-cheek" cx="50%" cy="50%" r="50%">
          <stop offset="0%" className="momo-blush" stopOpacity="0.9" />
          <stop offset="100%" className="momo-blush" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="112" cy="240" rx="52" ry="7" fill="#1f1720" opacity="0.08" />

      <circle cx="176" cy="204" r="16" fill="url(#momo-fur)" />
      <path
        d="M169 197a10 10 0 0 1 13 0"
        className="momo-line"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      <g transform="rotate(-11 89 104)">
        <rect
          x="70"
          y="6"
          width="38"
          height="108"
          rx="19"
          fill="url(#momo-fur)"
          className="momo-line"
          strokeWidth="1.5"
        />
        <rect
          className="rabbit-ear momo-ear"
          x="80"
          y="20"
          width="18"
          height="80"
          rx="9"
        />
      </g>

      <g transform="rotate(11 131 104)">
        <rect
          x="112"
          y="6"
          width="38"
          height="108"
          rx="19"
          fill="url(#momo-fur)"
          className="momo-line"
          strokeWidth="1.5"
        />
        <rect
          className="rabbit-ear rabbit-ear-delay momo-ear"
          x="122"
          y="20"
          width="18"
          height="80"
          rx="9"
        />
      </g>

      <path
        d="M66 160c9-12 25-18 46-18s37 6 46 18v40c0 14-19 23-46 23s-46-9-46-23z"
        fill="url(#momo-fur)"
      />
      <path
        d="M104 199v20M116 199v20"
        className="momo-line"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <ellipse
        cx="92"
        cy="216"
        rx="13"
        ry="8"
        className="momo-paw"
        strokeWidth="1.4"
      />
      <ellipse
        cx="128"
        cy="216"
        rx="13"
        ry="8"
        className="momo-paw"
        strokeWidth="1.4"
      />

      <ellipse
        cx="110"
        cy="118"
        rx="63"
        ry="55"
        fill="url(#momo-fur)"
        className="momo-line"
        strokeWidth="1.5"
      />

      <ellipse cx="57" cy="132" rx="21" ry="15" fill="url(#momo-cheek)" />
      <ellipse cx="163" cy="132" rx="21" ry="15" fill="url(#momo-cheek)" />

      {eyesClosed ? (
        <g stroke="#2a1c22" strokeWidth="2.8" strokeLinecap="round" fill="none">
          <path d="M79 116q7 7 14 0" />
          <path d="M127 116q7 7 14 0" />
        </g>
      ) : (
        <g>
          <ellipse cx="86" cy="115" rx="8.5" ry="10.5" fill="#2a1c22" />
          <ellipse cx="134" cy="115" rx="8.5" ry="10.5" fill="#2a1c22" />
          <circle cx="83.4" cy="111" r="3" fill="#ffffff" />
          <circle cx="131.4" cy="111" r="3" fill="#ffffff" />
          <circle cx="88.6" cy="119.6" r="1.4" fill="#ffffff" opacity="0.65" />
          <circle cx="136.6" cy="119.6" r="1.4" fill="#ffffff" opacity="0.65" />
        </g>
      )}

      <path
        d="M105.5 130.5c2.8-2.6 6.2-2.6 9 0-1.2 4.6-4 7-4.5 7s-3.3-2.4-4.5-7Z"
        className="momo-nose"
      />
      <path
        d="M110 137.5v3.2"
        stroke="#2a1c22"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M110 140.7c0 3.2-4.6 4.6-6.4 2.2M110 140.7c0 3.2 4.6 4.6 6.4 2.2"
        stroke="#2a1c22"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      <g className="momo-whisker" strokeWidth="1.8" strokeLinecap="round">
        <path d="M52 128 30 123M52 135 29 137" />
        <path d="M168 128 190 123M168 135 191 137" />
      </g>

      {cheerful && !eyesClosed ? (
        <g className="momo-nose" opacity="0.55">
          <circle cx="69" cy="141" r="1.7" />
          <circle cx="151" cy="141" r="1.7" />
        </g>
      ) : null}
    </svg>
  );
}

/**
 * The sleeping pose: Momo tucked into a little bed, head on the pillow, ears
 * flopped over the headboard and a blanket pulled up to her chin.
 */
function SleepingBunny() {
  return (
    <svg
      viewBox="0 0 220 250"
      className="rabbit-sprite h-full w-full drop-shadow-[0_16px_22px_rgba(24,24,27,0.16)]"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="momo-fur-sleep" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" className="momo-fur-a" />
          <stop offset="100%" className="momo-fur-b" />
        </linearGradient>
        <radialGradient id="momo-cheek-sleep" cx="50%" cy="50%" r="50%">
          <stop offset="0%" className="momo-blush" stopOpacity="0.9" />
          <stop offset="100%" className="momo-blush" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="112" cy="234" rx="90" ry="6" fill="#1f1720" opacity="0.08" />

      {/* Headboard */}
      <rect
        x="6"
        y="120"
        width="32"
        height="104"
        rx="15"
        fill="#f5d3de"
        stroke="#eec6d3"
        strokeWidth="1.5"
      />
      <rect x="13" y="132" width="18" height="38" rx="9" fill="#fbe9ef" />

      {/* Bed frame and mattress */}
      <rect x="42" y="226" width="10" height="9" rx="4" fill="#e8c7d2" />
      <rect x="188" y="226" width="10" height="9" rx="4" fill="#e8c7d2" />
      <rect x="28" y="208" width="186" height="22" rx="10" fill="#ecc9d6" />
      <rect
        x="28"
        y="184"
        width="186"
        height="28"
        rx="13"
        fill="#fffbfd"
        stroke="#e7bfcd"
        strokeWidth="1.5"
      />

      {/* Pillow */}
      <rect
        x="38"
        y="162"
        width="62"
        height="24"
        rx="12"
        fill="#ffffff"
        stroke="#f0d3dd"
        strokeWidth="1.5"
      />

      {/* Ears, flopped back over the headboard */}
      <g transform="rotate(-27 88 152)">
        <rect
          x="70"
          y="82"
          width="28"
          height="82"
          rx="14"
          fill="url(#momo-fur-sleep)"
          className="momo-line"
          strokeWidth="1.5"
        />
        <rect className="momo-ear" x="78" y="96" width="12" height="54" rx="6" />
      </g>
      <g transform="rotate(-3 110 152)">
        <rect
          x="102"
          y="90"
          width="26"
          height="74"
          rx="13"
          fill="url(#momo-fur-sleep)"
          className="momo-line"
          strokeWidth="1.5"
        />
        <rect className="momo-ear" x="109" y="103" width="12" height="48" rx="6" />
      </g>

      {/* Head, resting on the pillow */}
      <circle
        cx="90"
        cy="163"
        r="33"
        fill="url(#momo-fur-sleep)"
        className="momo-line"
        strokeWidth="1.5"
      />

      <ellipse cx="68" cy="176" rx="17" ry="12" fill="url(#momo-cheek-sleep)" />

      <g stroke="#2a1c22" strokeWidth="2.8" strokeLinecap="round" fill="none">
        <path d="M74 160q8 8 16 0" />
        <path d="M98 160q8 8 16 0" />
      </g>

      <path
        d="M86.5 173c2.4-2.2 5.4-2.2 7.8 0-1 4-3.5 6-3.9 6s-2.9-2-3.9-6Z"
        className="momo-nose"
      />
      <path
        d="M90.5 179.4c0 2.6-3.6 3.8-5.2 2M90.5 179.4c0 2.6 3.6 3.8 5.2 2"
        stroke="#2a1c22"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />

      <g className="momo-whisker" strokeWidth="1.7" strokeLinecap="round">
        <path d="M60 166 46 162M60 173 46 175" />
      </g>

      {/* Blanket, pulled up to her chin and tucked over the mattress */}
      <path
        className="rabbit-breathe"
        d="M104 196V174a16 16 0 0 1 16-16h62a16 16 0 0 1 16 16v22a8 8 0 0 1-8 8h-78a8 8 0 0 1-8-8Z"
        fill="#f7c3d2"
        stroke="#efb3c6"
        strokeWidth="1.5"
      />
      <path
        d="M110 174h84"
        stroke="#fbdce6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g fill="#fbe4eb" opacity="0.85">
        <circle cx="126" cy="188" r="2.2" />
        <circle cx="150" cy="188" r="2.2" />
        <circle cx="174" cy="188" r="2.2" />
      </g>

      {/* Paws resting on the blanket edge */}
      <g>
        <ellipse
          cx="128"
          cy="160"
          rx="8.5"
          ry="6.5"
          className="momo-paw"
          strokeWidth="1.4"
        />
        <path
          d="M125 157v5M131 157v5"
          className="momo-paw-line"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <ellipse
          cx="146"
          cy="159"
          rx="8.5"
          ry="6.5"
          className="momo-paw"
          strokeWidth="1.4"
        />
        <path
          d="M143 156v5M149 156v5"
          className="momo-paw-line"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </g>

      {/* Tail at the foot of the bed */}
      <circle cx="205" cy="180" r="11" fill="url(#momo-fur-sleep)" />
      <path
        d="M200 174a7 7 0 0 1 9 0"
        className="momo-line"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
