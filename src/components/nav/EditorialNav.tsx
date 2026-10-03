"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function EditorialNav() {
  const pathname = usePathname();

  return (
    <header className="site-pad shrink-0">
      <nav
        aria-label="Primary"
        className="grid h-14 grid-cols-3 items-center text-[0.95rem] tracking-[-0.02em] md:h-16"
      >
        {items.map((item, index) => {
          const active =
            item.href === "/work"
              ? pathname === "/" || pathname.startsWith("/work")
              : pathname.startsWith(item.href);
          const align =
            index === 0
              ? "justify-self-start"
              : index === 1
                ? "justify-self-center"
                : "justify-self-end";

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                align,
                "inline-flex min-h-11 items-center transition-opacity duration-300",
                active ? "text-fg" : "text-fg/45 hover:text-fg",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
