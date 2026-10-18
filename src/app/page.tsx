import Image from "next/image";
import { publicPath } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-8">
      <div className="relative aspect-square w-[min(78vw,420px)] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <Image
          src={publicPath("/omar.jpg")}
          alt="Omar"
          fill
          priority
          sizes="420px"
          className="object-cover object-[center_18%]"
        />
      </div>
    </main>
  );
}
