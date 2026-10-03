import type { Metadata } from "next";
import { site } from "@/lib/content";
import { Fact, NewspaperPlate } from "@/components/frame/NewspaperPlate";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <NewspaperPlate
        src="/omar.jpg"
        alt="Omar Khuddose in profile"
        cutline="The editor, photographed in Dammam."
        imageClassName="object-[center_20%]"
      >
        <div className="min-h-0">
          <p className="kicker">The City Desk</p>
          <h1 className="headline mt-1 text-[clamp(1.8rem,3.6vw,3.1rem)]">
            A designer of Dammam
          </h1>
          <p className="mt-2 text-[0.92rem] italic">{site.title}</p>
          <p className="drop-cap mt-3 line-clamp-5 text-[0.95rem] leading-snug">
            I design digital products from Dammam. Quiet type, reserved motion,
            and bilingual systems that still hold when the brief changes. Arabic
            and English in the same product is not a theme. It is a structural
            decision.
          </p>
        </div>
        <dl>
          <Fact label="Role" value={site.title} />
          <Fact label="Based" value={site.city} />
          <Fact label="Practice" value="Selected projects only" />
        </dl>
      </NewspaperPlate>
    </main>
  );
}
