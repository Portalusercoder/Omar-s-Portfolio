"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteMenu } from "@/components/nav/SiteMenu";
import { useMenu } from "@/components/nav/MenuContext";
import { site } from "@/lib/content";

export function SiteNav() {
  const { open, setOpen } = useMenu();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[70]">
        <div className="site-grid items-center py-5">
          <Link
            href="/"
            className="pointer-events-auto col-span-6 w-fit text-[1.05rem] font-medium tracking-[-0.03em] text-fg md:col-span-3"
            onClick={() => setOpen(false)}
          >
            {site.wordmark}
          </Link>
          <div className="col-span-6 flex justify-end md:col-span-9">
            <button
              type="button"
              className="pointer-events-auto min-h-11 min-w-11 text-right text-[0.95rem] text-fg/80 transition-opacity hover:opacity-60"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(!open)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <SiteMenu />
    </>
  );
}
