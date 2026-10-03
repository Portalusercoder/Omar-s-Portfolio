import Link from "next/link";
import { cn } from "@/lib/utils";

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center text-fg/90 transition-opacity duration-300 hover:opacity-60",
        className,
      )}
    >
      {children}
    </Link>
  );
}
