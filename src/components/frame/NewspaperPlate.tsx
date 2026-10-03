import Image from "next/image";
import { cn } from "@/lib/utils";

export function PlateFace({
  src,
  alt,
  children,
  imageClassName,
  priority = false,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  imageClassName?: string;
  priority?: boolean;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col border-y-2 border-fg bg-bg md:flex-row">
      <div className="relative min-h-0 w-full flex-[1.15] overflow-hidden md:flex-[7] md:border-r md:border-fg">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 768px) 58vw, 100vw"
          className={cn("object-cover object-center", imageClassName)}
        />
      </div>
      <div className="flex min-h-0 flex-[0.95] flex-col justify-between gap-3 overflow-hidden border-t border-fg p-3 md:border-t-0 md:p-5">
        {children}
      </div>
    </div>
  );
}

export function NewspaperPlate({
  src,
  alt,
  cutline,
  children,
  imageClassName,
}: {
  src: string;
  alt: string;
  cutline?: string;
  children: React.ReactNode;
  imageClassName?: string;
}) {
  return (
    <div className="site-pad flex min-h-0 flex-1 flex-col overflow-hidden pb-3 pt-2">
      <div className="min-h-0 flex-1">
        <PlateFace src={src} alt={alt} imageClassName={imageClassName} priority>
          {children}
        </PlateFace>
      </div>
      {cutline ? <p className="cutline mt-1.5">{cutline}</p> : null}
    </div>
  );
}

export function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6.2rem_1fr] gap-3 border-t border-fg py-1.5 text-[0.82rem]">
      <dt className="kicker text-[0.62rem] leading-6">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
