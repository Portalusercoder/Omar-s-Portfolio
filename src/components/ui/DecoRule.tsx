import { cn } from "@/lib/utils";

export function DecoRule({ className }: { className?: string }) {
  return (
    <div className={cn("deco-rule", className)} aria-hidden="true">
      <span className="deco-diamond" />
    </div>
  );
}
