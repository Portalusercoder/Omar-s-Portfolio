import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-pad flex min-h-[80svh] flex-col justify-center ">
      <p className="kicker">Page 404</p>
      <h1 className="headline mt-4 text-[clamp(2.6rem,8vw,6rem)]">
        This column was pulled.
      </h1>
      <Link href="/" className="oval-btn mt-8 w-fit">
        Return to the index
      </Link>
    </main>
  );
}
