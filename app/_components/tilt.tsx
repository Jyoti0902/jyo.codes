"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

/**
 * Wraps an image (or a card) in a soft 3D tilt that follows the pointer, with
 * an optional light sheen. Pointer events bubble, so it works around overlays
 * and links inside the children.
 */
export function Tilt({
  children,
  className = "",
  max = 6,
  glare = true,
  hoverScale = 1,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  hoverScale?: number;
}) {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const sheen = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 150,
    damping: 20,
    mass: 0.4,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 150,
    damping: 20,
    mass: 0.4,
  });

  const rotateY = useTransform(smoothX, [0, 1], [-max, max]);
  const rotateX = useTransform(smoothY, [0, 1], [max, -max]);

  const percentX = useTransform(smoothX, [0, 1], [0, 100]);
  const percentY = useTransform(smoothY, [0, 1], [0, 100]);
  const shine = useMotionTemplate`radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.34), rgba(255,255,255,0) 58%)`;

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
    sheen.set(1);
  }

  function onPointerLeave() {
    pointerX.set(0.5);
    pointerY.set(0.5);
    sheen.set(0);
  }

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      whileHover={hoverScale !== 1 ? { scale: hoverScale } : undefined}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
    >
      {children}

      {glare ? (
        <motion.span
          aria-hidden
          style={{ background: shine, opacity: sheen }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
        />
      ) : null}
    </motion.div>
  );
}
