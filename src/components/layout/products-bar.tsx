import { cn } from "@/lib/utils";

// Other free products from the team, shown in the top scrolling strip and the sidebar.
export const products = [
  {
    name: "Bupsy",
    tagline: "the free, open-source Grok Bot alternative for your Mac",
    short: "Free Grok Bot alternative",
    href: "https://bupsy.si/",
    logo: "/products/bupsy.png",
  },
  {
    name: "Black Hole",
    tagline: "tasks, focus timer, notes and calendar in your Mac's notch",
    short: "Your day in the Mac notch",
    href: "https://getblackhole.app/",
    logo: "/products/blackhole.png",
  },
];

// Repeat the list so one track is always wider than the viewport
const REPEAT = 4;

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden}
      className="animate-products-marquee flex shrink-0 items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none"
    >
      {Array.from({ length: REPEAT }).flatMap((_, i) =>
        products.map((p) => (
          <li key={`${i}-${p.name}`} className="px-8">
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              tabIndex={hidden || i > 0 ? -1 : undefined}
              className="flex items-center gap-2 hover:underline"
            >
              <img
                src={p.logo}
                alt=""
                width={20}
                height={20}
                className="size-5 rounded-[5px]"
              />
              <span>
                <span className="font-semibold">{p.name}</span> – {p.tagline}
              </span>
            </a>
          </li>
        )),
      )}
    </ul>
  );
}

export function ProductsBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "group flex h-9 w-full shrink-0 items-center overflow-hidden whitespace-nowrap bg-primary text-sm text-black",
        className,
      )}
    >
      <Track />
      <Track hidden />
    </div>
  );
}
