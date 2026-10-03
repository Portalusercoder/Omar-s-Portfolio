"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { useMenu } from "@/components/nav/MenuContext";

function LenisLock() {
  const { open } = useMenu();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const sync = () => {
      if (open || document.documentElement.classList.contains("comic-booting")) {
        lenis.stop();
        return;
      }
      lenis.start();
    };

    sync();
    window.addEventListener("comic-boot-done", sync);
    return () => window.removeEventListener("comic-boot-done", sync);
  }, [open, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
      }}
    >
      <LenisLock />
      {children}
    </ReactLenis>
  );
}
