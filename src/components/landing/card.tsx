import { cn } from "@/lib/utils";

export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex justify-center p-4 border border-neutral-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-900 rounded-4xl w-100 h-80 overflow-hidden relative",
        className,
      )}
    >
      <div className="absolute -top-10 -left-10 w-30 h-30 bg-gray-300/10 dark:bg-neutral-950/10 border border-dashed border-gray-300/80 dark:border-neutral-800 rounded-full" />
      <div className="absolute -bottom-10 -right-10 w-50 h-50 bg-gray-300/10 dark:bg-neutral-950/10 border border-dashed border-gray-300/80 dark:border-neutral-800 rounded-full" />
      <div className="absolute -top-30 -right-20 w-40 h-40 bg-gray-300/30 dark:bg-neutral-950/40 border border-dashed border-gray-300/60 dark:border-neutral-800 rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-50 h-40 bg-gray-300/30 dark:bg-neutral-950/40 border border-dashed border-gray-300/60 dark:border-neutral-800 rounded-full" />

      <div className="absolute h-full w-px bg-gray-300/80 dark:bg-neutral-800 left-1/2 top-0 transform -translate-x-1/2" />
      <div className="absolute w-full h-px bg-gray-300/80 dark:bg-neutral-800 left-0 top-1/2 transform -translate-y-1/2" />

      {/* --- INNER CARD CONTENT --- */}
      <div className="h-full w-full border border-gray-200 dark:border-neutral-800 rounded-xl bg-background overflow-hidden relative z-10 flex">
        {children}
      </div>
    </div>
  );
}
