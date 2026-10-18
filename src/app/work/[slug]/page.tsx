import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/content";
import { publicPath } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? "Work" };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="flex-1 px-5 pb-10 md:px-8">
      <Link
        href="/work"
        className="inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.16em] text-[#ffffff]/60 hover:text-[#ffffff]"
      >
        All work
      </Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-[1.35fr_0.8fr] lg:items-start">
        <div className="relative aspect-[16/10] overflow-hidden bg-black/20">
          <Image src={publicPath(project.cover)} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" priority />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#ffffff]/50">{project.year}</p>
          <h1 className="mt-3 text-4xl font-medium uppercase leading-[0.95] tracking-[-0.03em] md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[#ffffff]/75">{project.problem}</p>
          <ol className="mt-6 max-w-md list-decimal space-y-2 pl-5 text-base leading-relaxed text-[#ffffff]/75">
            {project.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <dl className="mt-8 grid grid-cols-2 gap-4 text-[11px] uppercase tracking-[0.14em] text-[#ffffff]/55">
            <div>
              <dt>Role</dt>
              <dd className="mt-1 text-[#ffffff]">{project.role}</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd className="mt-1 text-[#ffffff]">{project.timeline}</dd>
            </div>
          </dl>
        </div>
      </div>
      {project.screens.length > 1 ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {project.screens.slice(1).map((src) => (
            <li key={src} className="relative aspect-[16/10] overflow-hidden bg-black/20">
              <Image src={publicPath(src)} alt="" fill sizes="50vw" className="object-cover" />
            </li>
          ))}
        </ul>
      ) : null}
    </main>
  );
}
