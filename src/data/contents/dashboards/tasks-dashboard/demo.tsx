'use client';

import React, { useState, useEffect } from 'react';
import TasksDashboardLayout from './dashboardLayout';
import { TasksDashboardView } from './dashboardView';
import { SAMPLE_DATA } from './data';
import type { TaskGroup } from './data';


import { useTheme } from "next-themes";

const TasksDashboardDemo: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);


  const currentUser = {
    name: 'Aryan',
    avatar: 'https://mockmind-api.uifaces.co/content/human/213.jpg',
    currentProject: 'Mobile App Redesign',
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setIsDarkMode(resolvedTheme === 'dark');
  }, [resolvedTheme, mounted]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  if (!mounted) return null;

  const handleAddIssue = () => {
    console.log('Add Issue clicked');
  };


  const data: TaskGroup[] = SAMPLE_DATA;

  return (
    <TasksDashboardLayout
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      userAvatar={currentUser.avatar}
    >
      <TasksDashboardView
        data={data}
        projectName={currentUser.currentProject}
        userName={currentUser.name}
        onAddIssue={handleAddIssue}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </TasksDashboardLayout>
  );
};

export default TasksDashboardDemo;
