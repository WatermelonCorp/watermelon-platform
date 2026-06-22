import { Bell, ChevronDown, CommandIcon, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center border-b bg-background/90 px-4 backdrop-blur md:px-8">
      <SidebarTrigger className="md:hidden" />
      <h1 className="text-base font-semibold">Portfolio Overview</h1>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            className="h-10 w-72 rounded-xl pl-9 pr-8 shadow-border border-0 bg-white focus-visible:ring-primary/30 focus-visible:border-primary/50 focus-visible:border"
            placeholder="find a control"
          />
          <kbd className="absolute right-2.5 bg-white dark:bg-zinc-800 top-2.5 text-sm text-muted-foreground flex gap-1 items-center shadow-border px-1 rounded-sm">
            <CommandIcon className="size-3" /> K
          </kbd>
        </div>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative size-10 border-0 shadow-border bg-white"
            >
              <Bell className="size-4" />
              <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-destructive" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 portfolio-dashboard">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <span className="text-xs font-normal text-muted-foreground">
                3 unread
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-1 p-1">
              <DropdownMenuItem className="flex flex-col items-start gap-1 whitespace-normal p-3">
                <span className="text-sm font-medium">Policy renewal due</span>
                <span className="text-xs text-muted-foreground">
                  Acme Corp's general liability policy expires in 2 days.
                </span>
                <span className="text-[10px] text-muted-foreground mt-1">
                  2 hours ago
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 whitespace-normal p-3">
                <span className="text-sm font-medium">New claim filed</span>
                <span className="text-xs text-muted-foreground">
                  Jane Doe has filed a new auto insurance claim.
                </span>
                <span className="text-[10px] text-muted-foreground mt-1">
                  5 hours ago
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 whitespace-normal p-3">
                <span className="text-sm font-medium">System update</span>
                <span className="text-xs text-muted-foreground">
                  Scheduled maintenance will occur tonight at 2 AM EST.
                </span>
                <span className="text-[10px] text-muted-foreground mt-1">
                  1 day ago
                </span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-center text-sm text-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-10 gap-2 rounded-md border-0 shadow-border bg-white"
            >
              <Avatar className="size-6 border-0 shadow-border">
                <AvatarImage src="https://assets.watermelon.sh/wm_ben.png" />
                <AvatarFallback>VP</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">Vansh Patel</span>
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/50 dark:focus:text-red-500">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
