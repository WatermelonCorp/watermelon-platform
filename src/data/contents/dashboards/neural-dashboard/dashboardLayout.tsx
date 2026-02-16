"use client";

import React from 'react';
import { AppSidebar } from "./app-sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    onToggleTheme: () => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
    isDarkMode: boolean;
}

export default function NeuralDashboardLayout({
    children,
    onToggleTheme,
    isSidebarOpen,
    setIsSidebarOpen,
    isDarkMode
}: DashboardLayoutProps) {
    return (
        <div className="flex flex-col lg:flex-row h-dvh w-full overflow-hidden p-4 jet selection:bg-orange-500/30 bg-transparent items-start relative">

            {/* Sidebar Mobile Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Left Sidebar Component */}
            <AppSidebar
                onToggleTheme={onToggleTheme}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                isDarkMode={isDarkMode}
            />

            {/* Main Content Wrapper */}
            <main className="w-full lg:flex-1 flex flex-col min-w-0 rounded-r-2xl lg:rounded-r-2xl lg:rounded-l-none rounded-l-2xl border-[1.6px] overflow-hidden bg-gray-50 border-gray-200 dark:bg-[#0D0D0D] dark:border-white/5 h-dvh">
                {children}
            </main>
        </div>
    );
}