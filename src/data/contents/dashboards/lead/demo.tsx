import React, { useState, useEffect } from 'react';
import LeadDashboardLayout from "./dashboardLayout";
import { DashboardView } from "./dashboardView";
import { useTheme } from "next-themes";
import { CheckSquare, Mail } from 'lucide-react';


import { type ReactNode } from 'react';
import { BsBag } from 'react-icons/bs';

export type Priority = 'High' | 'Normal' | 'Low' | 'Not set';

export interface Task {
    id: string;
    code: string;
    title: string;
    name: string;
    description: string;
    icon?: ReactNode;
    priority: Priority;
    list: string;
    tag: string;
    week: string;
    dueDate: string;
    assignees: string;
}

export interface TaskGroup {
    id: string;
    title: string;
    count: number;
    color: string;
    dotColor: string;
    tasks: Task[];
}

const LeadDashboardDemo: React.FC = () => {
    const { resolvedTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        setIsDarkMode(resolvedTheme === 'dark');
    }, [resolvedTheme, mounted]);

    

    const currentUser = {
        name: "Kanban Board",
        avatar: "https://mockmind-api.uifaces.co/content/human/213.jpg",
        currentProject: "Mobile App Redesign"
    };

    const sampleData: TaskGroup[] = [
        {
            id: 'backlog',
            title: 'Product Backlog',
            count: 3,
            color: '#F1F3F5',
            dotColor: '#868E96',
            tasks: [
                {
                    id: '1',
                    code: 'PRO-1024',
                    title: 'Implement Auth',
                    name: "Alex costa",
                    description: 'Developing a responsive online shopping... ',
                    icon: (<Mail size={14} className="text-[#10B981]" />),
                    priority: 'Normal',
                    list: 'Backend',
                    tag: 'Cycle 14',
                    week: 'W42',
                    dueDate: 'Add date',
                    assignees: 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=600&auto=format&fit=crop'
                },
                {
                    id: '2',
                    code: 'PRO-1025',
                    title: 'Rewrite notification engine to support batching',
                    name: "Alex costa",
                    description: 'Developing a responsive online shopping... ',
                    icon: (<Mail size={14} className="text-[#10B981]" />),
                    priority: 'Normal',
                    list: 'Backend',
                    tag: 'Cycle 14',
                    week: 'W42',
                    dueDate: 'Add date',
                    assignees: 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=600&auto=format&fit=crop'
                },
                {
                    id: '3',
                    code: 'PRO-1026',
                    title: 'Fix visual regression on Safari mobile header',
                    name: "Alex costa",
                    description: 'Developing a responsive online shopping... ',
                    icon: (<BsBag size={14} className="text-[#10B981]" />),
                    priority: 'Low',
                    list: 'Design',
                    tag: 'Sprint 8',
                    week: 'W41',
                    dueDate: 'Oct 12, 2024',
                    assignees: 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=600&auto=format&fit=crop'

                }
            ]
        },
        {
            id: 'in-progress',
            title: 'In Progress',
            count: 4,
            color: '#EBFBEE',
            dotColor: '#40C057',
            tasks: [
                {
                    id: '6',
                    code: 'PRO-988',
                    title: 'Core engine refactor for concurrent requests',
                    name: "Alex costa",
                    description: 'Developing a responsive online shopping... ',
                    icon: (<CheckSquare size={14} className="text-[#10B981]" strokeWidth={2.5} />),
                    priority: 'High',
                    list: 'Engineering',
                    tag: 'Sprint 22',
                    week: 'W40',
                    dueDate: 'Oct 05, 2024',
                    assignees: 'https://plus.unsplash.com/premium_photo-1664443577580-dd2674e9d359?q=80&w=1171&auto=format&fit=crop'
                },
                {
                    id: '7',
                    code: 'PRO-989',
                    title: 'Update design tokens for high-contrast mode',
                    name: "Alex costa",
                    description: 'Developing a responsive online shopping... ',
                    icon: (<CheckSquare size={14} className="text-[#10B981]" strokeWidth={2.5} />),
                    priority: 'Normal',
                    list: 'Design',
                    tag: 'Cycle 12',
                    week: 'W40',
                    dueDate: 'Add date',
                    assignees: 'https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=600&auto=format&fit=crop'
                }
            ]
        },
        {
            id: 'completed',
            title: 'Tasks Completed',
            count: 1,
            color: '#F3F0FF',
            dotColor: '#7950F2',
            tasks: [
                {
                    id: '12',
                    code: 'PRO-840',
                    title: 'Deploy v2.4.0 to production environment',
                    name: "Alex costa",
                    description: 'Developing a responsive online shopping... ',
                    icon: (<CheckSquare size={14} className="text-[#10B981]" strokeWidth={2.5} />),
                    priority: 'High',
                    list: 'DevOps',
                    tag: 'Release',
                    week: 'W38',
                    dueDate: 'Sep 28, 2024',
                    assignees: 'https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?w=600&auto=format&fit=crop'
                }
            ]
        },
        {
            id: 'closed',
            title: 'Closed',
            count: 4,
            color: '#F3F0FF',
            dotColor: '#7950F2',
            tasks: [
                {
                    id: '12',
                    code: 'PRO-840',
                    title: 'Deploy v2.4.0 to production environment',
                    name: "Alex costa",
                    description: 'Developing a responsive online shopping... ',
                    icon: (<CheckSquare size={14} className="text-[#10B981]" strokeWidth={2.5} />),
                    priority: 'High',
                    list: 'DevOps',
                    tag: 'Release',
                    week: 'W38',
                    dueDate: 'Sep 28, 2024',
                    assignees: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop'
                }
            ]
        }
    ];

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    const handleAddIssue = () => {
        console.log("Add Issue clicked");
    };

    if (!mounted) return null;

    return (
        <div className="w-full h-screen overflow-hidden">
            <LeadDashboardLayout
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                userName={currentUser.name}
            >
                <DashboardView
                    data={sampleData}
                    isDarkMode={isDarkMode}
                    onAddIssue={handleAddIssue}
                />
            </LeadDashboardLayout>
        </div>
    );
};

export default LeadDashboardDemo;