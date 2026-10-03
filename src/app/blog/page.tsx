import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <main className="site-pad flex min-h-0 flex-1 flex-col justify-center">
      <p className="kicker">The Back Page</p>
      <h1 className="headline mt-2 text-[clamp(2rem,6vw,4rem)]">Held over.</h1>
      <p className="mt-4 max-w-md italic text-muted">
        Notes are paused while this edition stays on one sheet.
      </p>
      <Link
        href="/work"
        className="kicker mt-6 inline-flex min-h-11 w-fit items-center underline underline-offset-4"
      >
        The Portfolio
      </Link>
    </main>
  );
}
