import { cn } from "@/lib/utils";

export function DocSection({
  id,
  title,
  children,
  className,
}: {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-2 md:py-4 border-b border-border last:border-b-0",
        className
      )}
    >
      {title && (
        <h2 className="text-lg md:text-xl font-medium tracking-tight mb-4">
          {title}
        </h2>
      )}
      <div className="space-y-6">{children}</div>
    </section>
  );
}
