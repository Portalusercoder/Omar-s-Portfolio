"use client";

import { useState } from "react";
import type { Project } from "@/lib/content";
import { Fact, PlateFace } from "@/components/frame/NewspaperPlate";
import { PageTurn } from "@/components/work/PageTurn";

export function ProjectViewer({
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
  const project = projects[index] ?? projects[0];

  if (!project) {
    return (
      <div className="site-pad flex min-h-0 flex-1 items-center">
        <p>The presses are quiet. New work is being set.</p>
      </div>
    );
  }

  return (
    <div className="site-pad flex min-h-0 flex-1 flex-col overflow-hidden pb-3 pt-2">
      <PageTurn
        index={index}
        count={projects.length}
        onCommit={setIndex}
        render={(pageIndex, priority) => {
          const entry = projects[pageIndex];
          if (!entry) return null;
          return (
            <PlateFace
              src={entry.cover}
              alt={`${entry.title} plate`}
              priority={priority}
            >
              <ProjectCopy
                project={entry}
                position={pageIndex}
                total={projects.length}
              />
            </PlateFace>
          );
        }}
      />
      <p className="cutline mt-1.5">
        Fig. {index + 1} — {project.title}. Drag the leaf to turn the page.
      </p>
    </div>
  );
}

function ProjectCopy({
  project,
  position,
  total,
}: {
  project: Project;
  position: number;
  total: number;
}) {
  return (
    <>
      <div className="min-h-0">
        <p className="kicker">
          The Portfolio · {position + 1} of {total}
        </p>
        <h1 className="headline mt-1 text-[clamp(1.8rem,3.6vw,3.1rem)]">
          {project.title}
        </h1>
        <p className="mt-2 text-[0.92rem] italic">
          {project.role} in the year {project.year}
        </p>
        <p className="drop-cap mt-3 line-clamp-5 text-[0.95rem] leading-snug">
          {project.problem}
        </p>
      </div>
      <dl>
        <Fact label="Category" value={project.role} />
        <Fact label="Services" value={project.tags.join(", ")} />
        <Fact label="Year" value={project.year} />
      </dl>
    </>
  );
}
