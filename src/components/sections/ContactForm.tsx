"use client";

import { useState } from "react";
import { site } from "@/lib/content";

const field =
  "w-full border-b border-fg bg-transparent py-2 font-serif outline-none placeholder:italic placeholder:text-muted/70 focus:border-fg";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || details.trim().length < 8) {
      setError("Set your name, a true email, and a short notice.");
      return;
    }

    setError("");
    setStatus("submitting");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, details }),
      });
      if (!response.ok) throw new Error("failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="text-[0.92rem] italic">
        Received. A reply will be set from {site.email}.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2" noValidate>
      <label className="block">
        <span className="sr-only">Name</span>
        <input
          name="name"
          autoComplete="name"
          placeholder="Name of correspondent"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={field}
        />
      </label>
      <label className="block">
        <span className="sr-only">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Address for reply"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={field}
        />
      </label>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea
          name="details"
          rows={2}
          placeholder="The notice"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          className={`${field} resize-none`}
        />
      </label>
      {error || status === "error" ? (
        <p className="text-[0.8rem] text-danger">
          {error || `The wire failed. Write ${site.email}.`}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="kicker inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 disabled:opacity-50"
      >
        {status === "submitting" ? "Setting type" : "To the editor"}
      </button>
    </form>
  );
}
