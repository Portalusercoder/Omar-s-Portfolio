import type { Metadata } from "next";
import Image from "next/image";
import { services, site, testimonials } from "@/lib/content";
import { publicPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main>
      <section className="invert-band overflow-hidden">
        <h1 className="headline px-2 text-center text-[clamp(3.6rem,16vw,12rem)]">
          About me
        </h1>
      </section>

      <section className="site-pad py-14">
        <p className="headline max-w-5xl text-[clamp(1.8rem,4.4vw,3.6rem)] leading-[1.05]">
          ※※※ Khobar-based independent designer with a focus on products,
          interfaces, and bilingual systems.
        </p>
      </section>

      <section className="site-pad grid items-end gap-10 pb-16 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden bg-fg/5">
          <Image
            src={publicPath("/omar.jpg")}
            alt="Omar in profile"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-[center_18%]"
          />
        </div>
        <div>
          <h2 className="headline text-[clamp(2.6rem,7vw,5.4rem)]">Practice</h2>
          <p className="drop-cap mt-6 max-w-xl">
            I am a UI/UX designer based in {site.city}. I make digital products
            that stay quiet in the hand: type that holds, motion that earns its
            place, and Arabic and English sharing one structure.
          </p>
        </div>
      </section>

      <section className="site-pad grid gap-4 border-t border-fg/15 py-14 md:grid-cols-3">
        {services.slice(0, 3).map((service) => (
          <div
            key={service.title}
            className="flex h-full flex-col border border-dashed border-fg/35 px-5 py-6"
          >
            <h3 className="font-display text-[1.6rem] tracking-[-0.03em]">
              {service.title}
            </h3>
            <p className="mt-auto pt-4 text-[0.92rem] text-muted">
              {service.items.join(", ")}
            </p>
          </div>
        ))}
      </section>

      <section className="site-pad border-t border-fg/15 py-16">
        <h2 className="headline text-balance text-[clamp(3rem,8vw,6.5rem)]">Selected notes</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {testimonials.slice(0, 3).map((item, index) => (
            <figure key={item.name}>
              <p className="text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                ({index + 1}) {item.company}
              </p>
              <blockquote className="mt-3 font-display text-[1.5rem] leading-snug tracking-[-0.03em]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-4 text-[0.78rem]">{item.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

    </main>
  );
}
