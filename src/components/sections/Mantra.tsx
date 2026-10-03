"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/content";
import { PillButton } from "@/components/ui/PillButton";
import { Reveal } from "@/components/ui/Reveal";

export function Mantra() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [140, -40]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.92, 1.04]);

  return (
    <section ref={ref} className="overflow-hidden py-[clamp(5rem,14vw,11rem)]">
      <div className="site-grid">
        <p className="eyebrow col-span-12">
          <Reveal>Mantra</Reveal>
        </p>
      </div>
      <motion.div style={{ scale }} className="site-grid mt-6">
        <motion.p
          style={{ y: y1 }}
          className="col-span-12 font-display text-[clamp(4.8rem,18vw,14rem)] font-medium leading-[0.86] tracking-[-0.05em] text-fg"
        >
          {site.mantra.lines[0]}
        </motion.p>
        <motion.p
          style={{ y: y2 }}
          className="col-span-12 font-display text-[clamp(4.8rem,18vw,14rem)] font-medium leading-[0.86] tracking-[-0.05em] text-fg"
        >
          {site.mantra.lines[1]}
        </motion.p>
      </motion.div>
      <div className="site-grid mt-10">
        <p className="col-span-12 max-w-xl text-muted md:col-span-6">
          {site.mantra.body}
        </p>
        <div className="col-span-12 mt-8">
          <PillButton href="/contact">{site.mantra.cta}</PillButton>
        </div>
      </div>
    </section>
  );
}
