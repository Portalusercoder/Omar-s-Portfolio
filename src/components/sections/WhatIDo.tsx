"use client";

import Image from "next/image";
import { services } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export function WhatIDo() {
  return (
    <section className="site-grid py-[clamp(4rem,10vw,8rem)]">
      <p className="eyebrow col-span-12 mb-10">
        <Reveal>What I do</Reveal>
      </p>
      <ul className="col-span-12 border-t border-line">
        {services.map((service) => (
          <li key={service.title} className="group relative border-b border-line">
            <div className="grid grid-cols-12 items-baseline gap-4 py-6">
              <h3 className="col-span-12 text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium tracking-[-0.03em] text-fg/90 transition-opacity duration-500 group-hover:opacity-100 md:col-span-5">
                {service.title}
              </h3>
              <p className="col-span-12 text-sm text-muted transition-colors duration-500 group-hover:text-fg/70 md:col-span-7">
                {service.items.join("  ·  ")}
              </p>
            </div>

            <aside
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-[42%] z-20 hidden w-[min(20rem,36vw)] -translate-y-1/2 scale-[0.98] opacity-0 transition-[opacity,transform] duration-400 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100 group-hover:opacity-100 md:block"
            >
              <div className="overflow-hidden bg-black">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={service.preview}
                    alt=""
                    fill
                    sizes="320px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </aside>
          </li>
        ))}
      </ul>
    </section>
  );
}
