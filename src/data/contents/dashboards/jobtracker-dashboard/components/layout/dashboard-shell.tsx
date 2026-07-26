import type { CSSProperties, ReactNode } from "react";

import { AppSidebar } from "./app-sidebar";
import { TopNavbar } from "./top-navbar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { TooltipProvider } from "../ui/tooltip";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <TooltipProvider>
      <SidebarProvider
        className="jobtracker-dashboard h-svh min-h-0 overflow-hidden"
        style={
          {
            "--sidebar-width": "17rem",
            "--sidebar-width-icon": "3.5rem",
          } as CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset className="h-svh overflow-hidden">
          <TopNavbar />
          <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
