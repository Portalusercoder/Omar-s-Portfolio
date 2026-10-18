"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import { openMail } from "@/lib/utils";

const field =
  "w-full border-b border-fg/40 bg-transparent py-3 font-serif outline-none placeholder:italic placeholder:text-muted/70 focus:border-fg";

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
    openMail({
      to: site.email,
      subject: `Note from ${name.trim()}`,
      body: `${details.trim()}\n\nReply to: ${email.trim()}`,
    });
    setStatus("success");
  };

  if (status === "success") {
    return (
      <p className="text-[0.92rem] italic">
        Received. A reply will be set from {site.email}.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
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
        className="oval-btn mt-4 disabled:opacity-50"
      >
        {status === "submitting" ? "Setting type" : "Email me"}
      </button>
    </form>
  );
}
