"use client";

import { useState } from "react";
import { formOptions, site } from "@/lib/content";
import { openMail } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { cn } from "@/lib/utils";

type FormState = {
  services: string[];
  budget: string;
  details: string;
  name: string;
  email: string;
  company: string;
  delivery: string;
  source: string;
};

const empty: FormState = {
  services: [],
  budget: "",
  details: "",
  name: "",
  email: "",
  company: "",
  delivery: "",
  source: "",
};

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "min-h-11 rounded-full border px-4 text-[0.9rem] tracking-[-0.01em] transition-colors duration-200",
        selected
          ? "border-fg bg-fg text-bg"
          : "border-white/15 bg-transparent text-fg/80 hover:border-white/40 hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

export function InquiryForm({ heading = "Tell me what you need" }: { heading?: string }) {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  const toggleService = (service: string) => {
    setValues((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!values.services.length) next.services = "Pick at least one.";
    if (!values.budget) next.budget = "Choose a range.";
    if (values.details.trim().length < 12) {
      next.details = "A little more context helps.";
    }
    if (!values.name.trim()) next.name = "Add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Use a valid email.";
    }
    if (!values.delivery) next.delivery = "When should this land?";
    if (!values.source) next.source = "How did you find me?";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const body = [
      values.company && `Company: ${values.company}`,
      values.services.length && `Services: ${values.services.join(", ")}`,
      values.budget && `Budget: ${values.budget}`,
      values.delivery && `Delivery: ${values.delivery}`,
      values.source && `Source: ${values.source}`,
      values.details,
      `Reply to: ${values.email}`,
    ]
      .filter(Boolean)
      .join("\n");
    openMail({
      to: site.email,
      subject: `Inquiry from ${values.name.trim()}`,
      body,
    });
    setStatus("success");
  };

  if (status === "success") {
    return (
      <section id="inquiry" className="site-grid py-[clamp(5rem,12vw,10rem)]">
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.6rem)] font-medium tracking-[-0.035em]">
            I have it. Talk soon.
          </h2>
          <p className="mt-5 max-w-md text-muted">
            I’ll write back from {`hello@omarkhuddose.com`}. If it’s urgent, send
            a short note there directly.
          </p>
          <div className="mt-8">
            <PillButton
              onClick={() => {
                setValues(empty);
                setErrors({});
                setStatus("idle");
              }}
            >
              Write another
            </PillButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="inquiry"
      className="site-grid scroll-mt-24 py-[clamp(5rem,12vw,10rem)]"
    >
      <h2 className="col-span-12 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-medium tracking-[-0.035em] md:col-span-9">
        <Reveal>{heading}</Reveal>
      </h2>
      <form
        onSubmit={onSubmit}
        noValidate
        className="col-span-12 mt-12 max-w-3xl space-y-12"
      >
        <fieldset>
          <legend className="mb-4 text-sm text-muted">Services</legend>
          <div className="flex flex-wrap gap-2">
            {formOptions.services.map((service) => (
              <Chip
                key={service}
                selected={values.services.includes(service)}
                onClick={() => toggleService(service)}
              >
                {service}
              </Chip>
            ))}
          </div>
          {errors.services ? (
            <p className="mt-3 text-sm text-danger">{errors.services}</p>
          ) : null}
        </fieldset>

        <fieldset>
          <legend className="mb-4 text-sm text-muted">Budget</legend>
          <div className="flex flex-wrap gap-2">
            {formOptions.budgets.map((budget) => (
              <Chip
                key={budget}
                selected={values.budget === budget}
                onClick={() => setValues((current) => ({ ...current, budget }))}
              >
                {budget}
              </Chip>
            ))}
          </div>
          {errors.budget ? (
            <p className="mt-3 text-sm text-danger">{errors.budget}</p>
          ) : null}
        </fieldset>

        <div>
          <label htmlFor="details" className="mb-4 block text-sm text-muted">
            Project details
          </label>
          <textarea
            id="details"
            rows={5}
            value={values.details}
            onChange={(event) =>
              setValues((current) => ({ ...current, details: event.target.value }))
            }
            className="w-full resize-y border-b border-line bg-transparent py-3 outline-none transition-colors duration-700 focus:border-fg"
          />
          {errors.details ? (
            <p className="mt-3 text-sm text-danger">{errors.details}</p>
          ) : null}
        </div>

        <div>
          <p className="mb-4 text-sm text-muted">Your details</p>
          <div className="grid gap-6 md:grid-cols-3">
            <label className="block">
              <span className="sr-only">Name</span>
              <input
                name="name"
                autoComplete="name"
                placeholder="Name"
                value={values.name}
                onChange={(event) =>
                  setValues((current) => ({ ...current, name: event.target.value }))
                }
                className="w-full border-b border-line bg-transparent py-3 outline-none transition-colors duration-700 placeholder:text-muted/70 focus:border-fg"
              />
              {errors.name ? (
                <p className="mt-2 text-sm text-danger">{errors.name}</p>
              ) : null}
            </label>
            <label className="block">
              <span className="sr-only">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                value={values.email}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                className="w-full border-b border-line bg-transparent py-3 outline-none transition-colors duration-700 placeholder:text-muted/70 focus:border-fg"
              />
              {errors.email ? (
                <p className="mt-2 text-sm text-danger">{errors.email}</p>
              ) : null}
            </label>
            <label className="block">
              <span className="sr-only">Company</span>
              <input
                name="company"
                autoComplete="organization"
                placeholder="Company"
                value={values.company}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    company: event.target.value,
                  }))
                }
                className="w-full border-b border-line bg-transparent py-3 outline-none transition-colors duration-700 placeholder:text-muted/70 focus:border-fg"
              />
            </label>
          </div>
        </div>

        <fieldset>
          <legend className="mb-4 text-sm text-muted">Delivery date</legend>
          <div className="flex flex-wrap gap-2">
            {formOptions.delivery.map((delivery) => (
              <Chip
                key={delivery}
                selected={values.delivery === delivery}
                onClick={() => setValues((current) => ({ ...current, delivery }))}
              >
                {delivery}
              </Chip>
            ))}
          </div>
          {errors.delivery ? (
            <p className="mt-3 text-sm text-danger">{errors.delivery}</p>
          ) : null}
        </fieldset>

        <fieldset>
          <legend className="mb-4 text-sm text-muted">
            Where did you hear about me?
          </legend>
          <div className="flex flex-wrap gap-2">
            {formOptions.sources.map((source) => (
              <Chip
                key={source}
                selected={values.source === source}
                onClick={() => setValues((current) => ({ ...current, source }))}
              >
                {source}
              </Chip>
            ))}
          </div>
          {errors.source ? (
            <p className="mt-3 text-sm text-danger">{errors.source}</p>
          ) : null}
        </fieldset>

        {status === "error" ? (
          <p className="text-sm text-danger">
            That didn’t send. Try again, or write hello@omarkhuddose.com.
          </p>
        ) : null}

        <PillButton type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending" : "Let's do it"}
        </PillButton>
      </form>
    </section>
  );
}
