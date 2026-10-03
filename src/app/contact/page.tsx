import type { Metadata } from "next";
import { site } from "@/lib/content";
import { NewspaperPlate } from "@/components/frame/NewspaperPlate";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <NewspaperPlate
        src="/omar.jpg"
        alt="Omar Khuddose in profile"
        cutline="Letters may be left with the editor."
        imageClassName="object-[center_20%]"
      >
        <div className="min-h-0">
          <p className="kicker">Letters to the Editor</p>
          <h1 className="headline mt-1 text-[clamp(1.8rem,3.6vw,3.1rem)]">
            Write the paper
          </h1>
          <p className="mt-2 text-[0.92rem] italic">{site.city}</p>
          <p className="mt-3 text-[0.9rem] leading-snug text-muted">
            A short note is enough. Direct wire: {site.email}
          </p>
        </div>
        <ContactForm />
      </NewspaperPlate>
    </main>
  );
}
