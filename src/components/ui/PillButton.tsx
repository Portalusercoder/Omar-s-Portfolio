import Link from "next/link";
import { cn } from "@/lib/utils";

const styles =
  "inline-flex min-h-11 items-center justify-center text-[0.95rem] underline underline-offset-4 transition-opacity duration-300 hover:opacity-55 disabled:cursor-wait disabled:opacity-50";

type PillButtonProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function PillButton({
  href,
  children,
  className,
  type = "button",
  onClick,
  disabled,
}: PillButtonProps) {
  const classes = cn(styles, className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
