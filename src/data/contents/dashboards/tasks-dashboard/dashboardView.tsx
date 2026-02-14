"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SortAsc, LayoutGrid, ChevronRight, Menu, Layers } from 'lucide-react';
import { CgProfile } from "react-icons/cg";
import { TfiLayoutListThumb } from "react-icons/tfi";
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';
import { RiArrowUpDownLine } from 'react-icons/ri';
import { LuFlipVertical, LuLayoutGrid, LuLayoutPanelLeft } from 'react-icons/lu';
import { PiChartBarHorizontal } from 'react-icons/pi';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckListIcon, DashboardSquare02Icon, StickyNote01Icon } from '@hugeicons/core-free-icons';


import { pickGradient,type TaskGroup } from './data';



const AssigneeStack: React.FC<{ avatars?: string[] }> = ({ avatars = [] }) => {
    const total = avatars.length;
    const limit = 10;
    const maxDisplay = total === limit + 1 ? total : limit;

    return (
        <div className="flex -space-x-2 overflow-hidden items-center">
            {avatars.slice(0, maxDisplay).map((url, i) => (
                <div
                    key={i}
                    className={`w-6 h-6 rounded-full border-2 border-white dark:border-[#0C0C0C] 
                    bg-linear-to-br ${pickGradient(i)} shadow-sm ring-1 ring-black/5 
                    transition-transform hover:-translate-y-0.5 cursor-pointer overflow-hidden`}
                    style={{ zIndex: total - i }}
                >
                    <img src={url} alt="avatar" className="w-full h-full object-cover" />
                </div>
            ))}
            {total > maxDisplay && (
                <div className="flex items-center justify-center h-6 w-6 rounded-full border-2 border-white dark:border-[#0C0C0C] bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 ml-0.5 shadow-sm z-0">
                    +{total - maxDisplay}
                </div>
            )}
        </div>
    );
};

const ActionButton = ({ icon, label }: { icon: React.ReactNode; label: any }) => (
    <button className="flex items-center space-x-1.5 px-2 py-1 rounded-md text-[13px] text-[#212121]/90 hover:text-slate-800 dark:hover:text-slate-300 hover:bg-slate-200/50 border-[1.6px] border-slate-200/50 dark:border-slate-200/20 dark:text-slate-300/70 dark:hover:bg-white/5 transition-all">
        {icon} <span className="font-normal">{label}</span>
    </button>
);

/* ================= TASK GROUP SECTION ================= */

const TaskGroupSection: React.FC<{ group: TaskGroup }> = ({ group }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="w-full p-2 px-6">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="group sticky top-0 z-20 flex items-center px-6 py-2 jet border rounded-md cursor-pointer backdrop-blur border-b border-slate-200/60 dark:border-white/4 transition-colors duration-200"
                style={{ backgroundColor: isOpen ? `${group.dotColor}1A` : undefined }}
            >
                {!isOpen && <div className="absolute inset-0 bg-slate-50/70 dark:bg-[#0C0C0C]/70 -z-10 rounded-md" />}
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} className="mr-2 text-slate-400">
                    <ChevronRight size={13} />
                </motion.div>
                <div className="flex items-center gap-3">
                    <div className="w-3.5 h-3.5 rounded-full border-2 shadow-sm border-white" style={{ backgroundColor: group.dotColor }} />
                    <h3 className="text-[13px] font-medium text-slate-700 dark:text-slate-200">{group.title}</h3>
                    <span className="text-[11px] py-[1.5px] px-1.5 rounded-sm border-[1.4px] border-slate-200/70 dark:border-white/70 bg-white dark:bg-white/10 text-slate-500 dark:text-white/70">
                        {group.count}
                    </span>
                </div>
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-[1fr_180px_160px_160px_140px_120px] px-6 py-2 jet text-[11px] font-medium capitalize tracking-wide text-slate-400 mt-2 min-w-225">
                            <div className='flex items-center gap-2'>Name <RiArrowUpDownLine size={14} /></div>
                            <div className='flex items-center gap-2'>Priority <RiArrowUpDownLine size={14} /></div>
                            <div className='flex items-center gap-2'>List <RiArrowUpDownLine size={14} /></div>
                            <div className='flex items-center gap-2'>Tag <RiArrowUpDownLine size={14} /></div>
                            <div className='flex items-center gap-2'>Due date <RiArrowUpDownLine size={14} /></div>
                            <div className='flex items-center gap-2'>Assignee <RiArrowUpDownLine size={14} /></div>
                        </div>

                        {group.tasks.map((task) => (
                            <div
                                key={task.id}
                                className="mt-2 grid grid-cols-[96px_1fr_180px_160px_160px_140px_110px] items-center px-6 py-1.5 border-[#F7F8F9] dark:border-[#0E0E0E] hover:bg-[#F4F4F4] border-[1.6px] hover:border-transparent dark:hover:bg-white/2.5 rounded-md min-w-225"
                            >
                                <div className="text-[12px] text-slate-400 tabular-nums">{task.code}</div>
                                <div className="truncate text-[13px] font-medium text-slate-700 dark:text-slate-200">{task.name}</div>
                                <div>
                                    <span className={`inline-flex px-3 py-0.5 rounded-sm text-[12px] font-medium border-[1.5px] ${
                                        task.priority === "High"
                                            ? "border-red-200 dark:text-red-400 text-red-600"
                                            : task.priority === "Low"
                                            ? "border-emerald-100 text-emerald-600 dark:text-emerald-400"
                                            : "border-blue-100 text-blue-600 dark:text-blue-400"
                                    }`}>
                                        {task.priority}
                                    </span>
                                </div>
                                <div className="text-[12px] text-slate-500 dark:text-slate-400">{task.list}</div>
                                <div className="flex gap-2">
                                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10">{task.tag}</span>
                                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10">{task.week}</span>
                                </div>
                                <div className="text-[12px] text-slate-500 dark:text-slate-400">{task.dueDate}</div>
                                <div className="flex justify-end">
                                    <AssigneeStack avatars={task.assignees} />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/* MAIN VIEW   */

interface TasksDashboardProps {
    data: TaskGroup[];
    projectName?: string;
    userName?: string;
    onAddIssue?: () => void;
    setIsSidebarOpen: (open: boolean) => void;
}

export const TasksDashboardView: React.FC<TasksDashboardProps> = ({
    data,
    projectName,
    userName,
    onAddIssue,
    setIsSidebarOpen
}) => {
    const [activeTab, setActiveTab] = useState('List');
    const [active, setActive] = useState("grid");

    const navItems = [
        { icon: <HugeiconsIcon icon={CheckListIcon} size={14} />, label: 'List' },
        { icon: <LuLayoutPanelLeft size={14} />, label: 'Kanban' },
        { icon: <PiChartBarHorizontal size={14} />, label: 'Gantt' },
        { icon: <Layers size={14} />, label: 'Archive' },
        { icon: <HugeiconsIcon icon={DashboardSquare02Icon} size={14} />, label: 'Dashboard' },
    ];


    return (
        <>
            <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b border-slate-200 dark:border-white/5">
                <div className="flex items-center space-x-2 text-[13px]">
                    <button
                        title="menu"
                        onClick={() => setIsSidebarOpen(true)}
                        className="lg:hidden p-1.5 mr-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10"
                    >
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center justify-center space-x-2 text-[13px]">
                        <span className="hidden lg:flex text-[#171717]/90 hover:text-[#3d3d3d]/90 font-medium inter dark:text-slate-200 items-center gap-2.5 cursor-pointer">
                            <HugeiconsIcon size={16} icon={StickyNote01Icon} />
                            Tasks
                        </span>
                        <span className="hidden lg:inline text-[#171717]/80 dark:text-slate-400 text-[16px]">/</span>
                        <span className="hidden lg:flex text-[#171717]/90 hover:text-[#3d3d3d]/90 font-medium inter dark:text-slate-200 items-center gap-2.5 cursor-pointer">
                            <CgProfile size={16} />
                            {userName} Tasks
                        </span>
                        <span className="hidden lg:inline text-[#171717]/80 dark:text-slate-400 text-[16px]">/</span>
                        <span className="flex text-[#171717]/90 hover:text-[#3d3d3d]/90 font-medium inter dark:text-slate-200 items-center gap-2.5 cursor-pointer mr-4">
                            <LuFlipVertical size={16} />
                            {projectName}
                        </span>
                        <MdOutlineMoreHoriz size={18} color="#8f8d8d" className="hidden lg:block" />
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <div className="hidden md:flex -space-x-1.5">
                        {[...Array(5)].map((_, i) => (<div key={i} className={`w-6 h-6 rounded-full border-2 border-white dark:border-[#0C0C0C] bg-linear-to-br ${pickGradient(i)} ring-1 ring-black/5`} />))}
                    </div>
                    <div className="flex items-center bg-slate-200/50 dark:bg-white/5 rounded-md p-0.5">
                        <button title='grid' onClick={() => setActive('grid')} className={`p-1 rounded ${active === 'grid' ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-slate-500'}`}><LayoutGrid size={14} /></button>
                        <button title='list' onClick={() => setActive('list')} className={`p-1 rounded ${active === 'list' ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-slate-500'}`}><TfiLayoutListThumb size={14} /></button>
                    </div>
                    <button onClick={onAddIssue} className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-[#0B0D10] dark:bg-white text-[#C2C3C7] dark:text-black text-[13px] font-normal shadow-sm">
                        <IoAddCircleOutline size={18} />
                        <span className="hidden sm:inline">Issue</span>
                    </button>
                </div>
            </header>

            <div className="h-11 flex items-center justify-between px-6 border-b border-slate-200 dark:border-white/5 bg-[#F7F8F9]/50 dark:bg-[#0E0E0E]/50 backdrop-blur-md overflow-x-auto no-scrollbar">
                <div className="flex items-center space-x-1 min-w-max">
                    {navItems.map((item) => (
                        <button title={item.label}
                            key={item.label}
                            onClick={() => setActiveTab(item.label)}
                            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-[13px] font-normal transition-all ${activeTab === item.label ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm ring-1 ring-black/5' : 'text-slate-500'}`}
                        >
                            {item.icon} <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                <div className="hidden sm:flex items-center space-x-2">
                    <ActionButton icon={<LuLayoutGrid size={14} />} label={<>Group by <span className="font-medium text-slate-600/90">Status</span> </>} />
                    <ActionButton icon={<Search size={14} />} label="Search" />
                    <ActionButton icon={<Filter size={14} />} label="Filter" />
                    <ActionButton icon={<SortAsc size={14} />} label="Sort" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto scroll-smooth p-6 
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                dark:[&::-webkit-scrollbar-thumb]:bg-white/10
                dark:[&::-webkit-scrollbar-thumb]:hover:bg-white/20
                [&::-webkit-scrollbar-thumb]:bg-slate-200
                [&::-webkit-scrollbar-thumb]:hover:bg-slate-300">
                <div className="min-w-full overflow-x-auto no-scrollbar">
                    <div className="min-w-225">
                        {data.map((group) => (
                            <TaskGroupSection key={group.id} group={group} />
                        ))}
                    </div>
                </div>
                <div className="h-20" />
            </div>
        </>
    );
};