import { GithubIcon, Linkedin01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const socialItems = {
  title: "Follow Us on",
  items: [
    { title: "X", href: "", icon: <HugeiconsIcon icon={NewTwitterIcon} size={18} /> },
    { title: "GitHub", href: "", icon: <HugeiconsIcon icon={GithubIcon} size={18} /> },
    { title: "LinkedIn", href: "", icon: <HugeiconsIcon icon={Linkedin01Icon} size={18} /> },
  ],
};

export const Socials = ({ className }: { className?: string }) => {
  return (
    <div className={cn("md:flex hidden items-center justify-center gap-2 p-2 bg-background border rounded-md", className)}>
      {socialItems.items.map(({ href, title, icon: Icon }) => (
        <Link
          key={title}
          to={href}
          target="_blank"
          rel="noreferrer"
          className="hover:text-primary transition-colors hover:bg-muted/50 size-6 flex items-center justify-center rounded-md"
        >
          {Icon}
        </Link>
      ))}
    </div>
  )
}
