import { cn } from "@/lib/utils";

interface AvatarStackProps {
  avatars: { src: string; alt: string }[];
  max?: number;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function AvatarStack({ avatars, max = 4, size = "md" }: AvatarStackProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <div className="flex items-center -space-x-3 hover:space-x-1 transition-all duration-300">
      {visible.map((avatar, i) => (
        <img
          key={i}
          src={avatar.src}
          alt={avatar.alt}
          className={cn(
            sizes[size],
            "rounded-full border-2 border-background object-cover",
            "hover:scale-110 hover:z-10 transition-transform duration-200"
          )}
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            sizes[size],
            "rounded-full border-2 border-background bg-muted",
            "flex items-center justify-center text-xs font-medium"
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
