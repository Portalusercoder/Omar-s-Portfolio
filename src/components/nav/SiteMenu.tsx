"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMenu } from "@/components/nav/MenuContext";
import { nav } from "@/lib/content";
import { easeApple, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SiteMenu() {
  const { open, setOpen } = useMenu();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const previous = document.activeElement;
    firstLink.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col justify-end bg-black px-[clamp(1.25rem,4vw,4.5rem)] pb-10 pt-28 md:justify-center"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.overlay, ease: easeApple }}
        >
          <nav>
            <ul className="flex flex-col gap-2">
              {nav.map((item, index) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    exit={reduce ? undefined : { y: "110%" }}
                    transition={{
                      duration: duration.overlay,
                      ease: easeApple,
                      delay: reduce ? 0 : 0.08 + index * 0.07,
                    }}
                  >
                    <Link
                      ref={index === 0 ? firstLink : undefined}
                      href={item.href}
                      onMouseEnter={() => setHovered(item.href)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(item.href)}
                      onBlur={() => setHovered(null)}
                      className={cn(
                        "flex items-baseline gap-4 font-display leading-[0.95] tracking-[-0.04em] transition-opacity duration-500 ease-[cubic-bezier(.16,1,.3,1)]",
                        "text-[clamp(2.6rem,8vw,6.5rem)] font-medium",
                        hovered && hovered !== item.href
                          ? "opacity-30"
                          : "opacity-100",
                      )}
                    >
                      <span className="w-10 shrink-0 text-[0.85rem] tracking-wide text-muted md:w-14">
                        {item.number}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
