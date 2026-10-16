import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/content";

export function FeaturePair({
  left,
  right,
  heading,
  note,
  tip,
}: {
  left: Project;
  right: Project;
  heading: string;
  note: string;
  tip: string;
}) {
  return (
    <section className="site-pad grid items-start gap-12 py-14 md:grid-cols-3 md:items-center md:gap-8 md:py-16">
      <FeatureCard project={left} />
      <div className="mx-auto max-w-xs text-center">
        <h2 className="headline text-balance text-[clamp(2.6rem,5vw,4.4rem)]">{heading}</h2>
        <p className="mt-4 text-balance text-[1.05rem] leading-snug">{note}</p>
        <p className="mt-6 text-balance text-[0.72rem] uppercase tracking-[0.12em] text-muted">
          Tip! {tip}
        </p>
      </div>
      <FeatureCard project={right} />
    </section>
  );
}

function FeatureCard({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-fg/5">
        <Image
          src={project.cover}
          alt={`${project.title} plate`}
          fill
          sizes="(min-width: 768px) 30vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.32,1)] group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-4 flex flex-wrap items-center gap-2 font-display text-[1.05rem] tracking-[-0.02em]">
        {project.title}
        {project.year === "2026" ? (
          <span className="rounded-[2px] bg-accent px-1.5 py-0.5 text-[0.58rem] uppercase tracking-[0.14em] text-ink">
            New
          </span>
        ) : null}
      </p>
      <p className="mt-2 line-clamp-3 max-w-sm text-[0.92rem] leading-snug text-muted">
        {project.problem}
      </p>
    </Link>
  );
}
