import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Playground",
};

export default function PlaygroundPage() {
  return (
    <main className="site-pad flex min-h-[80svh] flex-col justify-center ">
      <p className="kicker">The sketch desk</p>
      <h1 className="headline mt-4 text-[clamp(2.6rem,8vw,6rem)]">Held over.</h1>
      <Link href="/work" className="oval-btn mt-8 w-fit">
        The work
      </Link>
    </main>
  );
}
