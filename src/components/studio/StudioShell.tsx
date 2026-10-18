"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { projects, site } from "@/lib/content";
import { openMail } from "@/lib/utils";

const label = "text-[11px] uppercase tracking-[0.16em] text-[#ffffff]/70";
const strong = "text-[#ffffff]";

function clockLabel() {
  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Riyadh",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date());
  return `${time} AST`;
}

export function StudioShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState("");
  const titleId = useId();
  const latest = projects[0];

  useEffect(() => {
    const tick = () => setNow(clockLabel());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onHome = pathname === "/";
  const onWork = pathname.startsWith("/work");
  const navClass = (active: boolean) =>
    `inline-flex min-h-11 items-center text-[12px] uppercase tracking-[0.16em] ${
      active ? "font-medium text-[#ffffff]" : "text-[#ffffff]/55 hover:text-[#ffffff]"
    }`;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#000000] text-[#ffffff] [font-family:var(--font-outfit),system-ui,sans-serif]">
      <header className="flex flex-col gap-3 px-5 py-5 md:grid md:grid-cols-4 md:items-center md:gap-6 md:px-8 md:py-6">
        <p className={label}>
          Name / <span className={strong}>{site.name}</span>
        </p>
        <p className={`${label} md:text-center`}>
          Occupation / <span className={strong}>Graphic designer</span>
        </p>
        <p className={`${label} md:text-center`}>
          Location / <span className={strong}>Khobar, Saudi Arabia</span>
        </p>
        <nav className="flex items-center justify-end gap-4 md:gap-6" aria-label="Portfolio">
          <Link href="/" className={navClass(onHome)} aria-current={onHome ? "page" : undefined}>
            Home
          </Link>
          <Link href="/work" className={navClass(onWork)} aria-current={onWork ? "page" : undefined}>
            My work
          </Link>
          <button type="button" className={navClass(open)} onClick={() => setOpen(true)}>
            Contact
          </button>
        </nav>
      </header>

      <div className="flex flex-1 flex-col">{children}</div>

      <footer className="grid grid-cols-2 gap-x-6 gap-y-3 px-5 py-6 md:grid-cols-4 md:items-end md:px-8 md:py-7">
        <p className="text-lg font-medium uppercase tracking-[0.04em] md:text-[1.65rem]">
          Portfolio / 2026
        </p>
        <p className={`${label} md:text-center`}>
          Latest project /{" "}
          {latest ? (
            <Link
              href={`/work/${latest.slug}`}
              className="underline decoration-[#ffffff]/40 underline-offset-4 hover:decoration-[#ffffff]"
            >
              {latest.title}
            </Link>
          ) : (
            "—"
          )}
        </p>
        <p className={`${label} md:text-center`}>
          Status / <span className={strong}>Open for work</span>
        </p>
        <p className={`${label} text-right`}>
          Local time / <span className={strong}>{now || "—"}</span>
        </p>
      </footer>

      {open && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-8">
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-md"
            aria-label="Close contact form"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto bg-white p-6 text-black sm:p-10"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id={titleId} className="text-2xl font-semibold tracking-[0.04em] sm:text-3xl">
                SEND A MESSAGE
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-11 px-2 text-[11px] uppercase tracking-[0.16em] text-black/60 hover:text-black"
              >
                Close
              </button>
            </div>
            <StudioInquiry />
          </div>
        </div>
      )}
    </div>
  );
}

function StudioInquiry() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const field =
    "w-full border-0 border-b border-black/30 bg-transparent py-2 text-base text-black placeholder:text-black/40 focus:border-black focus:outline-none";
  const lab = "mb-1 block text-[10px] uppercase tracking-[0.16em] text-black/60";

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.trim().length < 8) {
      setError("Name, a real email, and a short note are required.");
      return;
    }
    setError("");
    setSending(true);
    const details = [
      company.trim() && `Company: ${company.trim()}`,
      projectType.trim() && `Project type: ${projectType.trim()}`,
      message.trim(),
      `Reply to: ${email.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    openMail({
      to: site.email,
      subject: `Inquiry from ${name.trim()}`,
      body: details,
    });
    setSent(true);
    setSending(false);
  }

  if (sent) {
    return (
      <p className="mt-10 text-lg" role="status">
        Sent. I’ll reply to {email.trim()}.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <label>
          <span className={lab}>Your name</span>
          <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" autoComplete="name" />
        </label>
        <label>
          <span className={lab}>Your email</span>
          <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoComplete="email" />
        </label>
        <label>
          <span className={lab}>Company / optional</span>
          <input className={field} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company name" autoComplete="organization" />
        </label>
        <label>
          <span className={lab}>Project type</span>
          <input className={field} value={projectType} onChange={(e) => setProjectType(e.target.value)} placeholder="Identity, product, web…" />
        </label>
      </div>
      <label className="mt-6 block">
        <span className={lab}>Tell me about the project</span>
        <textarea
          className={`${field} min-h-24 resize-y`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Project details, timing and budget."
        />
      </label>
      {error ? (
        <p className="mt-4 text-sm text-black" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <p className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.14em] text-black/70">
          {site.socials.slice(0, 3).map((social) => (
            <a key={social.href} href={social.href} target="_blank" rel="noreferrer" className="hover:text-black">
              {social.label}
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="hover:text-black">
            {site.email}
          </a>
        </p>
        <button
          type="submit"
          disabled={sending}
          className="min-h-12 bg-black px-6 text-[12px] font-medium uppercase tracking-[0.16em] text-white hover:bg-black/80 disabled:opacity-50"
        >
          {sending ? "Sending…" : "Submit inquiry"}
        </button>
      </div>
    </form>
  );
}
