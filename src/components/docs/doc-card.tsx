import { cn } from "@/lib/utils";

export function DocCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card",
        "p-2 md:p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
