import { cn } from "@/lib/utils";

export function DocPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "relative mr-auto w-full max-w-4xl",
        "px-2 sm:px-6 md:px-10",
        "pb-24",
        className
      )}
    >
      {children}
    </article>
  );
}
