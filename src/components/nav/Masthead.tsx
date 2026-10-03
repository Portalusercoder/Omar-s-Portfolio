"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Masthead() {
  const pathname = usePathname();

  return (
    <header className="site-pad shrink-0 pt-1.5">
      <div className="flex items-center justify-between gap-4 text-[0.62rem] uppercase tracking-[0.16em] sm:text-[0.68rem]">
        <p>Dammam, Saudi Arabia</p>
        <p className="hidden sm:block">Saturday, October 3, 2026</p>
        <p>Vol. I · No. 1</p>
      </div>
      <div className="rule-double mt-1" />
      <Link
        href="/"
        className="headline mt-0.5 block text-center text-[clamp(2.1rem,7.4vw,5.8rem)]"
      >
        The Khuddose
      </Link>
      <p className="mt-0.5 hidden text-center text-[0.72rem] italic text-muted sm:block">
        A journal of interface, type, and the quiet work people keep using
      </p>
      <div className="rule-double mt-1" />
      <nav
        aria-label="Primary"
        className="flex items-center justify-center gap-0 text-[0.78rem] uppercase tracking-[0.18em]"
      >
        {items.map((item, index) => {
          const active =
            item.href === "/work"
              ? pathname === "/" || pathname.startsWith("/work")
              : pathname.startsWith(item.href);

          return (
            <span key={item.href} className="flex items-center">
              {index > 0 ? (
                <span className="px-3 text-fg/40" aria-hidden="true">
                  |
                </span>
              ) : null}
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center px-1",
                  active ? "underline decoration-1 underline-offset-4" : "hover:underline hover:underline-offset-4",
                )}
              >
                {item.label}
              </Link>
            </span>
          );
        })}
      </nav>
      <div className="rule" />
    </header>
  );
}
