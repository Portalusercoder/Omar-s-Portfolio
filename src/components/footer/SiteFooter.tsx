"use client";

import { useState } from "react";
import Link from "next/link";
import { footerNav, site } from "@/lib/content";
import { PillButton } from "@/components/ui/PillButton";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "success">("idle");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("success");
    setEmail("");
  };

  return (
    <footer className="relative z-0 border-t border-line pt-16">
      <div className="site-grid gap-y-12">
        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow">Follow or DM</p>
          <ul className="mt-4 space-y-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center text-fg hover:text-muted"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-12 md:col-span-4">
          <p className="eyebrow">Write</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-flex min-h-11 items-center text-fg hover:text-muted"
          >
            {site.email}
          </a>
          <p className="mt-6 text-sm text-muted">{site.city}</p>
        </div>
        <div className="col-span-12 md:col-span-5">
          <h2 className="text-xl font-medium tracking-[-0.025em]">
            Talk to a human
          </h2>
          <form onSubmit={onSubmit} className="mt-5 flex flex-wrap items-end gap-3">
            <label className="min-w-[16rem] flex-1">
              <span className="sr-only">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setState("idle");
                }}
                placeholder="Email"
                className="w-full border-b border-line bg-transparent py-3 outline-none transition-colors duration-700 placeholder:text-muted/70 focus:border-fg"
              />
            </label>
            <PillButton type="submit">Submit</PillButton>
          </form>
          {state === "error" ? (
            <p className="mt-3 text-sm text-danger">Use a valid email.</p>
          ) : null}
          {state === "success" ? (
            <p className="mt-3 text-sm text-muted">Noted. I’ll write back.</p>
          ) : null}
          <a
            href={`mailto:${site.email}?subject=Coffee%20in%20Khobar`}
            className="mt-8 inline-flex min-h-11 items-center text-fg underline decoration-transparent underline-offset-4 hover:decoration-fg"
          >
            {site.coffee}
          </a>
        </div>
        <nav className="col-span-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-8">
          {footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center text-sm text-muted hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
