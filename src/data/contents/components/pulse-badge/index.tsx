import { cn } from "@/lib/utils";

interface PulseBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info";
}

const variants = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

export function PulseBadge({
  children,
  variant = "info",
  className,
  ...props
}: PulseBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
        "bg-secondary text-foreground",
        className
      )}
      {...props}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            variants[variant]
          )}
        />
        <span
          className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            variants[variant]
          )}
        />
      </span>
      {children}
    </span>
  );
}
