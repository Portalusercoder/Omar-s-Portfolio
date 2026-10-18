export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function publicPath(src: string) {
  if (!src.startsWith("/") || src.startsWith("//")) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || src === base || src.startsWith(`${base}/`)) return src;
  return `${base}${src}`;
}

export function openMail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.assign(href);
}
