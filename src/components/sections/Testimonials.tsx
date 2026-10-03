"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { testimonials } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";
import { easeApple, duration } from "@/lib/motion";

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const quote = testimonials[index];

  const go = (next: number) => {
    setIndex((next + testimonials.length) % testimonials.length);
  };

  return (
    <section className="site-grid border-t border-line py-[clamp(5rem,12vw,10rem)]">
      <div className="col-span-12 md:col-span-4">
        <h2 className="font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-medium tracking-[-0.03em]">
          <Reveal>Kind words from clients</Reveal>
        </h2>
        <p className="mt-4 max-w-sm text-sm text-muted">
          The process should feel as considered as the launch.
        </p>
      </div>
      <div className="col-span-12 mt-10 md:col-span-8 md:mt-0">
        <div className="relative min-h-[16rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={quote.name}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: duration.page, ease: easeApple }}
            >
              <p className="font-display text-[clamp(1.35rem,2.6vw,2rem)] font-medium leading-[1.35] tracking-[-0.025em]">
                {quote.quote}
              </p>
              <footer className="mt-8 text-sm text-muted">
                {quote.name} · {quote.company}
              </footer>
              <TextLink href="/contact" className="mt-4">
                Tell me more
              </TextLink>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-10 flex items-center gap-6">
          <button
            type="button"
            className="min-h-11 text-[0.95rem] text-muted transition-opacity duration-200 hover:text-fg"
            onClick={() => go(index - 1)}
          >
            Previous
          </button>
          <span className="text-sm text-muted">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            className="min-h-11 text-[0.95rem] text-muted transition-opacity duration-200 hover:text-fg"
            onClick={() => go(index + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
