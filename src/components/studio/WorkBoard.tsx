"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/content";

const FILTERS = ["All work", "Product", "Brand", "Web", "Motion"] as const;

function lane(project: Project) {
  const tags = project.tags.join(" ").toLowerCase();
  if (tags.includes("brand")) return "Brand";
  if (tags.includes("motion")) return "Motion";
  if (tags.includes("web")) return "Web";
  return "Product";
}

export function WorkBoard({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All work");
  const shown = useMemo(
    () => (filter === "All work" ? projects : projects.filter((project) => lane(project) === filter)),
    [filter, projects],
  );
  const total = String(projects.length).padStart(2, "0");
  const count = String(shown.length).padStart(2, "0");

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
      <div>
        <h1 className="max-w-[14rem] text-[1.65rem] font-medium uppercase leading-[0.95] tracking-[-0.02em] md:text-3xl">
          Selected projects across identity, print, digital and experimental work.
        </h1>
        <div className="mt-10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#ffffff]/45">Filter</p>
          <ul className="mt-3">
            {FILTERS.map((item) => {
              const active = item === filter;
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => setFilter(item)}
                    aria-pressed={active}
                    className={`min-h-11 text-left text-[13px] uppercase tracking-[0.12em] ${
                      active ? "text-[#ffffff]" : "text-[#ffffff]/45 hover:text-[#ffffff]/80"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div>
        <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-[#ffffff]/55">
          {count} / {total} projects
        </p>
        {shown.length === 0 ? (
          <p className="text-sm text-[#ffffff]/70">Nothing in this filter. Try all work.</p>
        ) : (
          <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((project, index) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/20">
                    <Image
                      src={project.cover}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="bg-[#ffffff] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-[#000000]">
                        View case
                      </span>
                    </span>
                  </div>
                  <p className="mt-3 text-[13px] uppercase tracking-[0.08em]">
                    <span className="text-[#ffffff]/45">{String(index + 1).padStart(2, "0")}</span>{" "}
                    <span className="font-medium">{project.title}</span>
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#ffffff]/45">
                    {lane(project)} / {project.role}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#ffffff]/45">{project.year}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
