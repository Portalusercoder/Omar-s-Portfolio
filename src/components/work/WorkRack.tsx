"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/content";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function WorkRack({
  projects,
  initialSlug,
}: {
  projects: Project[];
  initialSlug?: string;
}) {
  const start = Math.max(
    0,
    projects.findIndex((project) => project.slug === initialSlug),
  );
  const [index, setIndex] = useState(start === -1 ? 0 : start);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; left: number; moved: boolean } | null>(
    null,
  );
  const skipClick = useRef(false);

  useEffect(() => {
    const leaf = scroller.current?.children[index] as HTMLElement | undefined;
    leaf?.scrollIntoView({ inline: "start", block: "nearest", behavior: "smooth" });
  }, [index]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      left: scroller.current?.scrollLeft ?? 0,
      moved: false,
    };
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const startDrag = drag.current;
    if (!startDrag || startDrag.id !== event.pointerId || !scroller.current) return;
    const dx = event.clientX - startDrag.x;
    if (Math.abs(dx) > 6) startDrag.moved = true;
    scroller.current.scrollLeft = startDrag.left - dx;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const startDrag = drag.current;
    if (!startDrag || startDrag.id !== event.pointerId) return;
    skipClick.current = startDrag.moved;
    drag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  if (!projects.length) {
    return (
      <div className="site-pad flex min-h-[70svh] items-center pt-14">
        <p>The presses are quiet. New work is being set.</p>
      </div>
    );
  }

  return (
    <div className="flex h-svh min-h-0 overflow-hidden pt-14">
      <aside className="hidden w-14 shrink-0 items-center justify-center border-r border-fg/15 md:flex">
        <p className="spine-title text-[0.72rem] font-normal tracking-[0.22em]">
          Omar
        </p>
      </aside>
      <div
        ref={scroller}
        className="flex min-h-0 min-w-0 flex-1 touch-pan-x overflow-x-auto overflow-y-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {projects.map((project, projectIndex) => {
          const open = projectIndex === index;
          return (
            <article
              key={project.slug}
              className={cn(
                "flex h-full shrink-0 border-r border-fg/15 transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.32,1)]",
                open ? "w-[min(64vw,38rem)]" : "w-[4.6rem] cursor-pointer md:w-[5.4rem]",
              )}
            >
              {open ? (
                <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-between overflow-y-auto px-6 py-8 md:px-10">
                  <div>
                    <p className="kicker">
                      {project.role} · {project.year}
                    </p>
                    <h1 className="headline mt-4 text-[clamp(2.8rem,8vw,6.4rem)]">
                      {project.title}
                    </h1>
                    <p className="drop-cap mt-6 max-w-xl">{project.problem}</p>
                    <div className="relative mt-8 aspect-[16/10] overflow-hidden bg-fg/5">
                      <Image
                        src={project.cover}
                        alt={`${project.title} plate`}
                        fill
                        priority
                        sizes="52rem"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <a href={`mailto:${site.email}`} className="oval-btn mt-10 w-fit">
                    Email me
                  </a>
                </div>
              ) : (
                <button
                  type="button"
                  className="flex h-full w-full flex-col items-center justify-between py-6"
                  onClick={() => {
                    if (skipClick.current) {
                      skipClick.current = false;
                      return;
                    }
                    setIndex(projectIndex);
                  }}
                >
                  <span className="spine-title text-[clamp(1.15rem,2vw,1.55rem)]">
                    {project.title}
                  </span>
                  {project.year === "2026" ? (
                    <span className="rounded-[2px] bg-accent px-1 py-0.5 text-[0.5rem] uppercase tracking-[0.12em] text-ink">
                      New
                    </span>
                  ) : (
                    <span className="text-[0.62rem] tracking-[0.12em] text-muted">
                      {project.year}
                    </span>
                  )}
                </button>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
