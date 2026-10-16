"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMenu } from "@/components/nav/MenuContext";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

const items = [
  { label: "Index", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function PaperMenu() {
  const { open, setOpen } = useMenu();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      id="paper-index"
      className="fixed inset-0 z-[70] flex flex-col bg-fg text-ink"
      role="dialog"
      aria-modal="true"
      aria-label="Index"
    >
      <div className="site-pad grid h-14 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
        <p className="truncate text-[0.68rem] uppercase tracking-[0.14em]">
          <span className="sm:hidden">Khobar</span>
          <span className="hidden sm:inline">{site.city}</span>
        </p>
        <p className="px-3 font-display text-[0.95rem] tracking-[-0.03em]">Omar</p>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-self-end text-2xl leading-none"
          onClick={() => setOpen(false)}
        >
          <span className="sr-only">Close index</span>
          ×
        </button>
      </div>
      <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-4">
        {items.map((item) => {
          const current =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={cn(
                "headline text-center text-[clamp(3.4rem,12vw,8.5rem)]",
                current && "relative",
              )}
            >
              {current ? (
                <span
                  aria-hidden
                  className="absolute left-[-8%] right-[-8%] top-1/2 h-1 -translate-y-1/2 bg-accent"
                />
              ) : null}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <p className="site-pad pb-6 text-center text-[0.68rem] uppercase tracking-[0.18em]">
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
  );
}
