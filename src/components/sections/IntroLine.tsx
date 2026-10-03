import { site } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function IntroLine() {
  return (
    <section id="intro" className="site-grid py-[clamp(5rem,12vw,10rem)]">
      <h2 className="col-span-12 max-w-5xl font-display text-[clamp(2rem,4.8vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.035em] md:col-span-10">
        <Reveal>{site.intro}</Reveal>
      </h2>
    </section>
  );
}
