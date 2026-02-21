"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SiteHeader } from "./site-header";
import { type ReactNode } from "react";

interface LeadDashboardLayoutProps {
    children: ReactNode;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    userName: string;
}

export default function LeadDashboardLayout({
  children,
  isDarkMode,
  toggleDarkMode,
  userName
}: LeadDashboardLayoutProps) {
  return (
    <div className={`flex h-screen w-full transition-colors duration-200 overflow-hidden ${isDarkMode ? 'dark:bg-[#0C0C0C] text-[#F2F2F2]' : 'bg-[#FFFFFF] text-[#1A1D23]'}`}>
        <SidebarProvider 
            defaultOpen={true} 
            style={{ "--sidebar-width": "240px" } as React.CSSProperties}
            className="w-full relative h-full"
        >
            <AppSidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <SidebarInset className="flex flex-col min-w-0 bg-white dark:bg-[#0C0C0C]">
                <SiteHeader isDarkMode={isDarkMode} userName={userName} />
                <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0C0C0C]">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    </div>
  );
}