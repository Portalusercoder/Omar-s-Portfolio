import type { Metadata } from "next";
import { site } from "@/lib/content";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main>
      <section className="site-pad grid items-start gap-14 py-16 md:grid-cols-2 md:gap-20 md:py-24">
        <div>
          <p className="kicker">Letters</p>
          <h1 className="headline mt-4 text-[clamp(3.4rem,8vw,6.8rem)]">
            Let&apos;s talk!
          </h1>
          <p className="mt-6 max-w-sm text-pretty text-[1.15rem] leading-snug">
            Are you looking for a quiet, exact interface? A short note is
            enough. Direct wire: {site.email}
          </p>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
