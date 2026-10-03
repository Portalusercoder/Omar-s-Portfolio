"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RevealImage } from "@/components/ui/RevealImage";
import type { Project } from "@/lib/content";
import { easeApple } from "@/lib/motion";

export function ProjectTile({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const tile = useRef<HTMLAnchorElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0, on: false });

  return (
    <Link
      ref={tile}
      href={`/work/${project.slug}`}
      className="group relative block"
      onMouseEnter={() => setCursor((c) => ({ ...c, on: true }))}
      onMouseLeave={() => setCursor((c) => ({ ...c, on: false }))}
      onMouseMove={(event) => {
        const bounds = tile.current?.getBoundingClientRect();
        if (!bounds) return;
        setCursor({
          x: event.clientX - bounds.left,
          y: event.clientY - bounds.top,
          on: true,
        });
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          className="h-full w-full"
          whileHover={reduce ? undefined : { scale: 1.06 }}
          transition={{ duration: 1.15, ease: easeApple }}
        >
          <RevealImage
            src={project.cover}
            alt={`${project.title} cover`}
            className="h-full w-full"
          />
        </motion.div>
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fg text-[0.8rem] text-bg md:flex"
          animate={{
            x: cursor.x,
            y: cursor.y,
            opacity: cursor.on ? 1 : 0,
            scale: cursor.on ? 1 : 0.7,
          }}
          transition={{ duration: 0.8, ease: easeApple }}
        >
          View
        </motion.span>
      </div>
      <h3 className="mt-4 text-[1.35rem] font-medium tracking-[-0.025em]">
        {project.title}
      </h3>
      <p className="mt-1 text-sm text-muted">{project.tags.join(", ")}</p>
    </Link>
  );
}
