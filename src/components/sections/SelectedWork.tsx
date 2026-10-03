import { featuredProjects } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { ProjectTile } from "@/components/work/ProjectTile";

export function SelectedWork() {
  return (
    <section className="site-grid py-[clamp(4rem,10vw,8rem)]">
      <div className="col-span-12 mb-12 md:col-span-8">
        <p className="eyebrow">
          <Reveal>This is what it looks like</Reveal>
        </p>
        <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-medium tracking-[-0.035em]">
          <Reveal delay={0.06}>Something for everyone</Reveal>
        </h2>
      </div>
      <div className="col-span-12 grid gap-x-6 gap-y-14 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <ProjectTile key={project.slug} project={project} />
        ))}
      </div>
      <div className="col-span-12 mt-14">
        <PillButton href="/work">Okay, show me more</PillButton>
      </div>
    </section>
  );
}
