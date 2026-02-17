"use client";

import React, { useState, useEffect } from 'react';
import NeuralDashboardLayout from "./dashboardLayout";
import { DashboardView } from "./dashboardView";

const NeuralDashboardDemo: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false); 

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <NeuralDashboardLayout 
            onToggleTheme={() => setIsDarkMode(!isDarkMode)}
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