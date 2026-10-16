"use client";

import Link from "next/link";
import { useMenu } from "@/components/nav/MenuContext";
import { site } from "@/lib/content";

export function PaperHeader() {
  const { open, setOpen } = useMenu();

  return (
    <header className="site-pad fixed inset-x-0 top-0 z-50 grid h-14 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center bg-bg/92 backdrop-blur-[2px]">
      <p className="truncate text-[0.68rem] uppercase tracking-[0.14em]" title={site.city}>
        <span className="sm:hidden">Khobar</span>
        <span className="hidden sm:inline">{site.city}</span>
      </p>
      <Link href="/" className="px-3 font-display text-[0.95rem] tracking-[-0.03em]">
        Omar
      </Link>
      <button
        type="button"
        className="flex min-h-11 min-w-11 flex-col items-end justify-self-end gap-1.5"
        aria-expanded={open}
        aria-controls="paper-index"
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">{open ? "Close index" : "Open index"}</span>
        <span className="block h-px w-5 bg-fg" />
        <span className="block h-px w-5 bg-fg" />
        <span className="block h-px w-3.5 bg-fg" />
      </button>
    </header>
  );
}
