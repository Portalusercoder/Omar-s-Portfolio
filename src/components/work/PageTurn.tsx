"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const easeTurn: [number, number, number, number] = [0.22, 1, 0.32, 1];
const FOLD = -88;

type PageTurnProps = {
  index: number;
  count: number;
  onCommit: (nextIndex: number) => void;
  render: (index: number, priority: boolean) => React.ReactNode;
};

export function PageTurn({ index, count, onCommit, render }: PageTurnProps) {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    id: number;
    x: number;
    moved: boolean;
  } | null>(null);
  const busy = useRef(false);
  const indexRef = useRef(index);
  const finishRef = useRef<(direction: 1 | -1) => void>(() => {});
  const [held, setHeld] = useState(false);
  const turn = useMotionValue(0);

  indexRef.current = index;

  const nextTurn = useTransform(turn, (value) => Math.max(0, value));
  const prevTurn = useTransform(turn, (value) => Math.max(0, -value));
  const currentRotate = useTransform(nextTurn, [0, 1], [0, FOLD]);
  const previousRotate = useTransform(prevTurn, [0, 1], [FOLD, 0]);
  const currentShadow = useTransform(
    nextTurn,
    [0, 0.4, 1],
    [
      "0 0 0 rgba(27,23,18,0)",
      "10px 0 22px rgba(27,23,18,0.14)",
      "0 0 0 rgba(27,23,18,0)",
    ],
  );
  const previousShadow = useTransform(
    prevTurn,
    [0, 0.4, 1],
    [
      "0 0 0 rgba(27,23,18,0)",
      "10px 0 22px rgba(27,23,18,0.14)",
      "0 0 0 rgba(27,23,18,0)",
    ],
  );
  const prevVisibility = useTransform(prevTurn, (value) =>
    value > 0.002 ? "visible" : "hidden",
  );

  const wrap = (value: number) => (value + count) % count;
  const nextIndex = wrap(index + 1);
  const prevIndex = wrap(index - 1);

  useLayoutEffect(() => {
    turn.stop();
    turn.set(0);
    busy.current = false;
  }, [index, turn]);

  const finish = (direction: 1 | -1) => {
    const from = indexRef.current;
    if (reduce) {
      onCommit(wrap(from + direction));
      return;
    }
    if (busy.current) return;
    busy.current = true;
    const remaining = 1 - Math.abs(turn.get());
    void animate(turn, direction, {
      duration: 0.28 + remaining * 0.16,
      ease: easeTurn,
    }).then(() => {
      onCommit(wrap(from + direction));
    });
  };

  const snapBack = () => {
    busy.current = true;
    void animate(turn, 0, {
      duration: 0.24,
      ease: easeTurn,
    }).then(() => {
      busy.current = false;
    });
  };

  finishRef.current = finish;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") finishRef.current(1);
      if (event.key === "ArrowLeft") finishRef.current(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || busy.current || count < 2) return;
    setHeld(true);
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      moved: false,
    };
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start || start.id !== event.pointerId || busy.current) return;
    const width = stageRef.current?.clientWidth ?? 1;
    const dx = start.x - event.clientX;
    if (Math.abs(dx) > 5) start.moved = true;
    if (reduce) return;
    turn.set(Math.max(-1, Math.min(1, dx / Math.max(width * 0.86, 1))));
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    drag.current = null;
    setHeld(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (busy.current) return;

    const dx = start.x - event.clientX;
    const progress = turn.get();

    if (!start.moved) {
      finish(1);
      return;
    }
    if (reduce) {
      if (Math.abs(dx) > 40) finish(dx > 0 ? 1 : -1);
      else turn.set(0);
      return;
    }
    if (progress > 0.2 || dx > 64) finish(1);
    else if (progress < -0.2 || dx < -64) finish(-1);
    else snapBack();
  };

  if (count < 1) return null;

  return (
    <div
      ref={stageRef}
      className="page-stage relative min-h-0 flex-1 touch-none select-none"
      style={{ cursor: held ? "grabbing" : "grab" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="group"
      aria-label="Portfolio pages. Drag to turn."
    >
      <div className="absolute inset-0">{render(nextIndex, false)}</div>

      <motion.div
        className="page-leaf pointer-events-none absolute inset-0"
        style={{
          rotateY: previousRotate,
          boxShadow: previousShadow,
          visibility: prevVisibility,
        }}
        aria-hidden
      >
        <div className="page-face absolute inset-0">{render(prevIndex, false)}</div>
      </motion.div>

      <motion.div
        className="page-leaf pointer-events-none absolute inset-0"
        style={{ rotateY: currentRotate, boxShadow: currentShadow }}
      >
        <div className="page-face absolute inset-0">{render(index, true)}</div>
      </motion.div>
    </div>
  );
}
