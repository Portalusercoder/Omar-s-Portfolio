import { site } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

export function Statement() {
  return (
    <section className="site-grid py-[clamp(5rem,12vw,10rem)]">
      <div className="col-span-12 md:col-span-10">
        <h2 className="font-display text-[clamp(2.2rem,5.2vw,4.6rem)] font-medium leading-[1.08] tracking-[-0.035em]">
          <Reveal>{site.statement.heading}</Reveal>
        </h2>
        <p className="mt-8 max-w-xl text-muted">
          <Reveal delay={0.08}>{site.statement.body}</Reveal>
        </p>
        <div className="mt-8">
          <TextLink href="/contact">{site.statement.link}</TextLink>
        </div>
      </div>
    </section>
  );
}
