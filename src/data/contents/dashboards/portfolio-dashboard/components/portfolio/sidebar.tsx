"use client";

import { Link} from "react-router-dom";

import {
  ArrowUpRight,
  BadgeHelp,
  ChevronLeft,
  FileText,
  FolderOpen,
  HelpCircle,
  LayoutGrid,
  Link2,
  MessageSquareMore,
  RefreshCcw,
  Settings,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "../theme-toggle";
import LogoIcon from "./logo-icon";

const groups = [
  {
    label: "WORKSPACE",
    items: [
      [LayoutGrid, "Overview", "/", ""],
      [MessageSquareMore, "Policy Threads", "/policy-threads", "123"],
      [FileText, "Documents", "/documents", "3,154"],
      [BadgeHelp, "Claims Hub", "/claims-hub", ""],
      [RefreshCcw, "Renewals", "/renewals", ""],
    ],
  },
  {
    label: "TEAM",
    items: [
      [UsersRound, "Clients", "/clients", ""],
      [FolderOpen, "Shared Portfolio", "/shared-portfolio", ""],
    ],
  },
  {
    label: "CONFIGURE",
    items: [
      [Link2, "Integrations", "/integrations", ""],
      [Settings, "Settings", "/settings", ""],
    ],
  },
] as const;
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <LogoIcon className="size-8 text-primary" />
      <span className="text-xl font-semibold">Watermelon</span>
    </div>
  );
}
export function DashboardSidebar() {
  

  return (
    <Sidebar className="border-r border-border portfolio-dashboard">
      <SidebarHeader className="h-16 flex-row items-center justify-between border-b px-4">
        <Logo />
        <Button variant="outline" size="icon" className="size-10">
          <ChevronLeft />
        </Button>
      </SidebarHeader>
      <SidebarContent className="px-2 py-5">
        {groups.map((group) => (
          <SidebarGroup key={group.label} className="p-0 pb-5">
            <SidebarGroupLabel className="px-3 text-xs font-normal">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(([Icon, label, href, count]) => {
                  const isActive = label === "Overview";
                  return (
                    <SidebarMenuItem key={label} >
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`h-11 rounded-xl px-3 text-sm dark:data-active:bg-zinc-800 data-active:bg-white ${isActive ? "text-primary hover:text-primary shadow-border  border-0" : "text-foreground"}`}
                      >
                        <Link to={href}>
                          <Icon className={`size-5 ${isActive ? "text-primary" : "text-foreground"}`} />
                          <span className={`${isActive ? "text-primary" : "text-foreground"}`}>{label}</span>
                          {count ? (
                            <span className="ml-auto rounded-sm bg-white dark:bg-zinc-800 px-2 py-0.5 text-xs shadow-border ">
                              {count}
                            </span>
                          ) : null}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-4 p-4">
        <Card className="gap-4 rounded-2xl p-4 shadow-border">
          <div className="flex justify-end">
            <Button variant="ghost" size="icon" className="size-8 shadow-border">
              <X className="size-4" />
            </Button>
          </div>
          <div className="flex justify-between text-sm">
            <span>Policy queries today</span>
            <strong className="tabular-nums font-medium">714/1000</strong>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className={`h-4 w-1 rounded-full ${i < 16 ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <Button className="min-h-10 shadow-primary border border-primary">Upgrade plan <ArrowUpRight className="size-4" /></Button>
        </Card>
        <div className="space-y-1">
          <Button
            variant="ghost"
            className="h-10 w-full justify-start gap-3 px-2 text-muted-foreground"
          >
            <HelpCircle />
            Help
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            className="h-10 w-full justify-start gap-3 px-2 text-muted-foreground"
          >
            <UserRound />
            Profile
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
