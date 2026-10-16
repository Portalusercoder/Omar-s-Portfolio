"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { featuredProjects, site } from "@/lib/content";
import { easeApple } from "@/lib/motion";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate min-h-[100svh] md:h-[100svh] md:overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="relative min-h-0 flex-1 overflow-hidden">
          <motion.figure
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: easeApple }}
          >
            <Image
              src="/omar-hero-v2.jpg"
              alt="Omar in a noir city of yellow-lit panels, with a figure on a distant rooftop"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.figure>
          <h1 className="sr-only">{site.name}</h1>
        </div>

        <motion.div
          className="relative z-10 shrink-0 border-t border-line bg-bg"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeApple, delay: 0.28 }}
        >
          <div className="site-grid items-stretch gap-y-6 py-6 md:py-7">
            <div className="relative col-span-12 flex flex-col justify-between gap-5 md:col-span-3 md:min-h-[8.5rem] md:pr-6">
              <p className="text-[0.95rem] leading-snug tracking-[-0.01em] text-muted">
                {site.heroRole.join(" ")}
              </p>
              <Link
                href="/work"
                className="inline-flex min-h-11 w-fit self-start items-center text-[0.95rem] text-fg/90 transition-opacity hover:opacity-60"
              >
                View work
              </Link>
            </div>

            <div className="relative col-span-12 flex flex-col justify-between gap-5 border-t border-line pt-5 md:col-span-5 md:min-h-[8.5rem] md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <p className="max-w-md text-[1.05rem] leading-snug tracking-[-0.015em] text-fg/80">
                {site.heroDescription}
              </p>
              <Link
                href="/contact"
                className="inline-flex min-h-11 w-fit self-start items-center rounded-full bg-fg px-5 text-[0.95rem] text-bg transition-opacity hover:opacity-80"
              >
                Get in touch
              </Link>
            </div>

            <div className="relative col-span-12 border-t border-line pt-5 md:col-span-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <FeaturedSlide />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedSlide() {
  const [index, setIndex] = useState(0);
  const project = featuredProjects[index];
  const last = featuredProjects.length - 1;

  if (!project) return null;

  return (
    <div className="relative pb-5">
      <Link
        href={`/work/${project.slug}`}
        className="relative block aspect-[16/9] overflow-hidden bg-[#111]"
      >
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="(min-width: 768px) 32vw, 92vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.03]"
        />
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 text-[1.05rem] tracking-[-0.02em] text-fg">
          {project.title}
        </span>
      </Link>
      <div className="absolute bottom-0 right-0 flex gap-2">
        <SlideButton
          label="Previous project"
          onClick={() => setIndex((current) => (current === 0 ? last : current - 1))}
        >
          ←
        </SlideButton>
        <SlideButton
          label="Next project"
          onClick={() => setIndex((current) => (current === last ? 0 : current + 1))}
        >
          →
        </SlideButton>
      </div>
    </div>
  );
}

function SlideButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full bg-fg text-[0.95rem] text-bg transition-opacity hover:opacity-80"
    >
      {children}
    </button>
  );
}
