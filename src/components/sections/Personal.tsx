"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";

export function Personal() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yA = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -50]);
  const yB = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -20]);
  const yC = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [20, -70]);
  const shifts = [yA, yB, yC];

  return (
    <section ref={ref} className="site-grid py-[clamp(5rem,12vw,10rem)]">
      <p className="eyebrow col-span-12">
        <Reveal>We love the work, but also</Reveal>
      </p>
      <h2 className="col-span-12 mt-4 max-w-5xl font-display text-[clamp(1.7rem,3.6vw,2.8rem)] font-medium leading-[1.2] tracking-[-0.03em] md:col-span-10">
        <Reveal delay={0.06}>{site.personal.heading}</Reveal>
      </h2>
      <div className="col-span-12 mt-16 grid gap-6 md:grid-cols-3">
        {site.personal.photos.map((photo, index) => (
          <motion.div
            key={photo.src}
            style={{ y: shifts[index] }}
            className={photo.offset}
          >
            <RevealImage
              src={photo.src}
              alt={photo.alt}
              className="aspect-[3/4]"
              sizes="(min-width: 768px) 30vw, 100vw"
              priority={index === 0}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
