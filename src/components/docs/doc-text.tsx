import { cn } from "@/lib/utils";

export function DocText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed", className)}>
      {children}
    </p>
  );
}
