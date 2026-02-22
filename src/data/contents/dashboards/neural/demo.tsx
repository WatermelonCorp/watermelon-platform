"use client";

import React, { useState, useEffect } from 'react';
import NeuralDashboardLayout from "./dashboardLayout";
import { DashboardView } from "./dashboardView";
import { useTheme } from "next-themes";

const NeuralDashboardDemo: React.FC = () => {
    const { resolvedTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        setIsDarkMode(resolvedTheme === 'dark');
    }, [resolvedTheme, mounted]);

    

    if (!mounted) return null;

    return (
        <NeuralDashboardLayout
            onToggleTheme={() => setIsDarkMode((prev) => !prev)}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isDarkMode={isDarkMode}
        >
            <DashboardView
                setIsSidebarOpen={setIsSidebarOpen}
                isChatOpen={isChatOpen}
                setIsChatOpen={setIsChatOpen}
            />
        </NeuralDashboardLayout>
    );
};

export default NeuralDashboardDemo;