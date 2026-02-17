"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { BsChatDots, BsList } from 'react-icons/bs';
import { PiColumns } from 'react-icons/pi';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { IoAddCircleOutline, IoFilter } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { TbCalendarPlus } from 'react-icons/tb';
import { type ReactNode } from 'react';

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

// --- Helper Components from your original code ---

const KanbanCard: React.FC<{ task: Task; statusColor: string }> = ({ task, statusColor }) => {
    const isUrgentOrProposal = statusColor.includes('red') || statusColor.includes('orange') || task.name.includes('E-commerce');
    return (
        <motion.div whileHover={{ y: -2 }} className="bg-white dark:bg-[#1A1A1A] p-3.5 px-0 rounded-lg border-2 border-[#F0F0F0] dark:border-white/5 shadow-sm dark:shadow-none mb-4 cursor-pointer">
            <div className="flex justify-between items-start mb-2 px-2.5">
                <h4 className="text-[16px] font-semibold text-gray-800 dark:text-gray-100 leading-tight pr-4">{task.title}</h4>
                <div className="shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#E8F8F0] dark:bg-[#252424] flex items-center justify-center border border-[#B7EBD0] dark:border-[#E8F8F0]/10">
                        {task.icon}
                    </div>
                </div>
            </div>
            <p className="text-[13px] px-2.5 text-gray-400 dark:text-gray-500 leading-relaxed mb-5 font-medium line-clamp-2">{task.description}</p>
            <div className=" border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-slate-800/20 flex items-center justify-between border-t-[1.6px] py-2 px-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                        <img src={task.assignees} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[12px] font-medium text-gray-500 dark:text-gray-400 truncate max-w-22.5">{task.name}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0 px-2">
                    <div className={`flex items-center justify-center gap-1.5 px-1.5 py-0.5 rounded-md ${isUrgentOrProposal ? 'bg-[#FEF2F2] text-[#EF4444]' : 'text-gray-400'}`}>
                        <TbCalendarPlus size={13} className='mb-0.5' />
                        <span className="text-[10px] font-semibold tracking-tight">JUNE 15</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                        <BsChatDots size={13} />
                        <span className="text-[10px] font-semibold">8</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const KanbanColumn: React.FC<{ group: TaskGroup; isDarkMode: boolean }> = ({ group }) => {
    return (
        <div className="w-70 sm:w-[320px] min-w-70 sm:min-w-75 max-w-75 flex flex-col h-[75vh] shrink-0 snap-center">
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex flex-col">
                    <h3 className="text-[17px] font-semibold text-gray-900 dark:text-gray-100 tracking-tight">{group.title}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[12px] text-gray-400 font-semibold">{group.count} {group.title === 'Closed' ? 'Deals' : 'Leads'}</span>
                        <span className="text-[12px] text-gray-300 dark:text-gray-700">•</span>
                        <span className="text-[12px] text-slate-600 dark:text-slate-200 font-semibold tracking-wide">$993,000 <span className='text-gray-400'>Total</span></span>
                    </div>
                </div>
                <button title='options' className="text-gray-300 hover:text-gray-500 transition-colors">
                    <MdOutlineMoreHoriz size={22} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar no-scrollbar">
                {group.tasks.map((task) => (
                    <KanbanCard key={task.id} task={task} statusColor={group.dotColor} />
                ))}
                <button className="w-full py-2 flex items-center justify-center gap-2 rounded-lg border-dashed border-2 border-[#F0F0F0] dark:border-white/[0.05]border-gray-100 dark:border-white/5 text-gray-400 dark:text-gray-600 hover:bg-gray-50 dark:hover:bg-white/2 transition-all mt-2 font-bold text-[14px]">
                    <Plus size={18} strokeWidth={3} />
                    <span>Add</span>
                </button>
            </div>
        </div>
    );
};

const ActionButton = ({ icon, label }: { icon: React.ReactNode, label: any }) => (
    <button className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md text-[13px] text-[#17191d] hover:text-slate-800 dark:hover:text-slate-300 hover:bg-slate-200/50 border-[1.6px] border-slate-200/50 dark:border-slate-200/20 dark:text-slate-300/70 dark:hover:bg-white/5 transition-all">
        {icon} <span className="font-normal">{label}</span>
    </button>
);

// --- Main View ---

interface DashboardViewProps {
    data: TaskGroup[];
    isDarkMode: boolean;
    onAddIssue?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ data, isDarkMode, onAddIssue }) => {
    return (
        <>
            <div className="h-11 flex items-center justify-between px-6  border-l-[1.5px] border-l-black/5 dark:border-l-white/5 border-b-[1.5px] border-slate-200 dark:border-white/5 bg-[#F7F8F9]/50 dark:bg-[#0E0E0E]/50 backdrop-blur-md overflow-x-auto no-scrollbar">
                 <div className="flex items-center text-[12px] font-medium space-x-1 text-[#848687] min-w-max">
                        Total :  <span className='text-[#353638] dark:text-slate-200 ml-1'> 17 Leads</span>
                        <span className='text-[16px] px-2 text-[#848687]/40'>•</span>
                        Closed :  <span className='text-[#181819] dark:text-slate-200 ml-1'> 8 Deals</span>
                    </div>

                <div className="hidden sm:flex items-center space-x-3.5">
                    <button title='toggle' onClick={onAddIssue} className="flex items-center space-x-1.5 px-3 py-0.5 rounded-md text-[13px] text-[#17191d] hover:text-slate-800 dark:hover:text-slate-300 hover:bg-slate-200/50 border-[1.6px] border-slate-200/50 dark:border-slate-200/20 dark:text-slate-300/70 dark:hover:bg-white/5 transition-all">
                        <PiColumns size={18} />
                        <div className='h-5 w-px rounded-full bg-slate-200/50' />
                        <BsList size={18} />
                    </button>
                    <ActionButton icon={<IoIosArrowDown size={14} />} label="All leads" />
                    <ActionButton icon={<IoFilter size={14} />} label="Filter" />
                    <button onClick={onAddIssue} className="flex items-center space-x-1.5 px-3 py-1.25 rounded-md bg-[#0B0D10] dark:bg-white text-[#C2C3C7] dark:text-black text-[13px] font-normal shadow-sm">
                        <IoAddCircleOutline size={18} />
                        <span className="hidden sm:inline">Add Lead</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto bg-[#FBFBFC] dark:bg-[#0C0C0C] py-4 px-4 sm:px-7 custom-scrollbar snap-x snap-mandatory">
                <div className="flex h-full gap-4 sm:gap-4 min-w-max items-start">
                    {data.map((group) => (
                        <KanbanColumn key={group.id} group={group} isDarkMode={isDarkMode} />
                    ))}
                </div>
            </div>
        </>
    );
};