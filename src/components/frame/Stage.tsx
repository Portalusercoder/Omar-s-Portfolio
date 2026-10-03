import Image from "next/image";
import { cn } from "@/lib/utils";

export function Stage({
  src,
  alt,
  children,
  onImageClick,
  imageClassName,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  onImageClick?: () => void;
  imageClassName?: string;
}) {
  const media = (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      sizes="100vw"
      className={cn("object-cover object-center", imageClassName)}
    />
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {onImageClick ? (
        <button
          type="button"
          onClick={onImageClick}
          className="relative min-h-0 w-full flex-1 overflow-hidden"
          aria-label="Next project"
        >
          {media}
        </button>
      ) : (
        <div className="relative min-h-0 w-full flex-1 overflow-hidden">{media}</div>
      )}
      <div className="site-pad grid shrink-0 grid-cols-1 gap-x-10 gap-y-5 py-5 md:grid-cols-12 md:py-6">
        {children}
      </div>
    </div>
  );
}

export function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-line py-2 text-[0.82rem] md:grid-cols-[8.5rem_1fr]">
      <dt className="text-muted">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
