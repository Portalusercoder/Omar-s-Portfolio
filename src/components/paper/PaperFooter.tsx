import { site } from "@/lib/content";

export function PaperFooter({
  lead = "Let's create something together",
}: {
  lead?: string;
}) {
  return (
    <footer className="site-pad pb-8 pt-16">
      <div className="flex flex-col items-start justify-between gap-8 border-t border-fg/20 pt-10 md:flex-row md:items-end">
        <p className="headline max-w-[12ch] text-balance text-[clamp(2.5rem,5.4vw,4.8rem)]">
          {lead}
        </p>
        <a href={`mailto:${site.email}`} className="oval-btn shrink-0">
          Email me
        </a>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-[0.68rem] uppercase tracking-[0.16em]">
        <p>Omar © {new Date().getFullYear()}</p>
        <p>
          {site.socials.map((social, index) => (
            <span key={social.href}>
              {index > 0 ? <span className="px-2">·</span> : null}
              <a href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
