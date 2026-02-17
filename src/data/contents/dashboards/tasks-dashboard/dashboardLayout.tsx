"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppSidebar } from "./app-sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    userAvatar: string;
}

export default function TasksDashboardLayout({
    children,
    isSidebarOpen,
    setIsSidebarOpen,
    isDarkMode,
    toggleDarkMode,
    userAvatar
}: DashboardLayoutProps) {
    return (
        <div className={`flex h-full w-full transition-colors font-sans duration-200 overflow-hidden ${isDarkMode ? 'dark:bg-[#0C0C0C] text-[#F2F2F2]' : 'bg-[#FFFFFF] text-[#1A1D23]'}`}>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 z-90 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar  */}
            <AppSidebar 
                isSidebarOpen={isSidebarOpen} 
                isDarkMode={isDarkMode} 
                toggleDarkMode={toggleDarkMode}
                userAvatar={userAvatar}
            />

            {/* Main Stage */}
            <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0C0C0C]">
                {children}
            </main>
        </div>
    );
}