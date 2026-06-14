import { cn } from "@/lib/utils";

type AssetBadgeProps = {
  symbol: string;
  color: string;
  size?: "sm" | "md";
};

export function AssetBadge({ symbol, color, size = "md" }: AssetBadgeProps) {
  const text = symbol === "Bitcoin" ? "B" : symbol.slice(0, 1);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full text-xs text-white  shadow-[inset_0_1px_2px_1px_rgba(255,255,255,0.2),inset_0px_-1px_2px_1px_rgba(0,0,0,0.08)] ",
        size === "sm" ? "size-6" : "size-9",
        color,
        symbol === "ETH" || symbol === "Ethereum" ? "text-slate-700" : ""
      )}
    >
      {text}
    </span>
  );
}
