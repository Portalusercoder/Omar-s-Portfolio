"use client";

import { useEffect, useState } from "react";
import { ComicBootScreen } from "@/components/ui/ComicBootScreen";

export function ComicLoader() {
  const [progress, setProgress] = useState(0);
  const [beat, setBeat] = useState(0);
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;

    document.documentElement.classList.add("comic-booting");
    document.body.style.overflow = "hidden";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer = 0;

    const hide = (delay: number) => {
      timer = window.setTimeout(() => {
        setLeaving(true);
        timer = window.setTimeout(() => {
          setVisible(false);
        }, reduce ? 0 : 320);
      }, delay);
    };

    if (reduce) {
      setProgress(100);
      hide(180);
      return () => window.clearTimeout(timer);
    }

    let current = 0;
    const started = Date.now();

    const tick = () => {
      current = Math.min(100, current + 2 + Math.random() * 4.4);
      setProgress(Math.floor(current));
      setBeat((index) => (index + 1) % 5);
      if (current >= 100) {
        hide(Math.max(0, 1400 - (Date.now() - started)) + 160);
        return;
      }
      timer = window.setTimeout(tick, 150 + Math.random() * 80);
    };

    timer = window.setTimeout(tick, 90);
    return () => window.clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    if (visible) return;
    document.documentElement.classList.remove("comic-booting");
    document.body.style.overflow = "";
    window.dispatchEvent(new Event("comic-boot-done"));
  }, [visible]);

  if (!visible) return null;

  return <ComicBootScreen progress={progress} beat={beat} leaving={leaving} />;
}
