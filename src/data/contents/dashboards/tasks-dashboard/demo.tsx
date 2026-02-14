'use client';

import React, { useState, useEffect } from 'react';
import TasksDashboardLayout from './dashboardLayout';
import { TasksDashboardView } from './dashboardView';
import { SAMPLE_DATA } from './data';
import type { TaskGroup } from './data';


const TasksDashboardDemo: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);


  const currentUser = {
    name: 'Aryan',
    avatar: 'https://mockmind-api.uifaces.co/content/human/213.jpg',
    currentProject: 'Mobile App Redesign',
  };


  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

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
