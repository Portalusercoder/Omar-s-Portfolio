import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-pad flex min-h-0 flex-1 flex-col justify-center">
      <p className="kicker">Page 404</p>
      <h1 className="headline mt-2 text-[clamp(2rem,6vw,4rem)]">
        This column was pulled.
      </h1>
      <p className="mt-4 max-w-md italic text-muted">
        It may have been renamed, or it never made the edition.
      </p>
      <Link
        href="/work"
        className="kicker mt-6 inline-flex min-h-11 w-fit items-center underline underline-offset-4"
      >
        Return to the portfolio
      </Link>
    </main>
  );
}
