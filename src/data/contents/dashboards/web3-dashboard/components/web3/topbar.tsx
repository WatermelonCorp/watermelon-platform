import { ArrowUpRight, ChevronDown, Plus, Repeat2, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardTopbar() {
  return (
    <header className="flex min-h-16 items-center justify-between gap-4  ">
      <div className="flex items-center gap-2 w-full max-w-sm">
        <SidebarTrigger className="lg:hidden shrink-0" />
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search assets"
            className="h-9 rounded-lg border-border bg-muted pl-9 text-sm w-full"
            placeholder="search assets, pools, transaction..."
          />
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <Button
          variant="outline"
          className="h-9 gap-3 bg-muted "
        >
          <Badge className="size-5 rounded-full bg-indigo-500 p-0 text-white">
            E
          </Badge>
          Ethereum Mainnet
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
        <Button
          variant="outline"
          className="h-9 bg-muted "
        >
          Deposit
          <Plus className="size-4" />
        </Button>
        <Button
          variant="outline"
          className="h-9 bg-muted "
        >
          Withdraw
          <ArrowUpRight className="size-4" />
        </Button>
        <Button className="h-9 bg-primary px-5 text-primary-foreground shadow-[inset_0_1px_6px_2px_rgba(255,255,255,0.1),inset_0_-1px_6px_2px_rgba(0,0,0,0.1)]">
          Swap
          <Repeat2 className="size-4" />
        </Button>
      </div>
    </header>
  );
}
