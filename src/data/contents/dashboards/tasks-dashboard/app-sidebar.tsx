"use client";

import React from 'react';
import { Search, Bell, HelpCircle, PanelLeft, Command, Home, Inbox, ClipboardList, Layers, CheckSquare, LayoutGrid, Users, FileText } from 'lucide-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { BubbleChatIcon, Folder01Icon, Home04Icon, Moon02Icon, Note01Icon, Sun03Icon } from '@hugeicons/core-free-icons';
import { HiOutlineUsers, HiMiniRectangleStack } from 'react-icons/hi2';
import { TbStack2Filled } from 'react-icons/tb';
import { FaCreditCard } from 'react-icons/fa6';
import { BsChatSquareDotsFill } from 'react-icons/bs';
import { PiTerminalWindowFill } from 'react-icons/pi';

// --- Sub Components ---
const SlimNavItem = ({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) => (
    <div className={`p-2 rounded-lg cursor-pointer transition-all ${active ? 'dark:bg-indigo-600/10 bg-[#EAEAEA] text-[#8A8C8F] dark:text-white/90' : 'text-[#8A8C8F] hover:bg-[#EAEAEA] dark:hover:bg-indigo-600/10 hover:text-slate-600 dark:hover:text-slate-200'}`}>
        {icon}
    </div>
);

const IconButton = ({ icon, active = false, bgVariant = "none" }: any) => (
    <button title='options' className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${active ? 'dark:bg-indigo-600/10 bg-[#EAEAEA] text-[#8A8C8F] dark:text-white/90' : 'text-[#8A8C8F] hover:bg-[#EAEAEA] dark:hover:bg-indigo-600/10 hover:text-slate-600 dark:hover:text-slate-200'} ${bgVariant === 'gray' ? 'dark:bg-indigo-600/10 bg-[#EAEAEA] text-[#8A8C8F] dark:text-white/90' : ''}`}>
        {icon}
    </button>
);

const ColoredIcon = ({ color, icon }: any) => (
    <button className={`w-5 h-5 rounded-[6px] ${color} shadow-sm active:scale-95 transition-transform hover:brightness-110 flex items-center justify-center`}>{icon}</button>
);

interface AppSidebarProps {
    isSidebarOpen: boolean;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    userAvatar: string;
}

export function AppSidebar({ isSidebarOpen, isDarkMode, toggleDarkMode, userAvatar }: AppSidebarProps) {
    return (
        <div className={`
            fixed inset-y-0 left-0 z-100 flex transition-transform duration-300 lg:relative lg:translate-x-0 h-full
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
            {/* Slim Navigation Sidebar  */}
            <aside className="w-14.5 shrink-0 border-r border-slate-200 dark:border-white/5 flex flex-col justify-between items-center py-4 space-y-5 bg-[#F7F8F9] dark:bg-[#0E0E0E]">
                <div className="flex flex-col space-y-3">
                    <div className='mb-4 text-slate-900 dark:text-white'><TbStack2Filled size={28} /></div>
                    <SlimNavItem icon={<HugeiconsIcon icon={Home04Icon} size={18} strokeWidth={1.5} />} active />
                    <SlimNavItem icon={<Search strokeWidth={2} size={18} />} />
                    <SlimNavItem icon={<Bell size={18} strokeWidth={2} />} />
                    <SlimNavItem icon={<HugeiconsIcon icon={Folder01Icon} strokeWidth={2} size={18} />} />
                    <SlimNavItem icon={<HugeiconsIcon icon={BubbleChatIcon} strokeWidth={2} size={18} />} />
                    <SlimNavItem icon={<HugeiconsIcon icon={Note01Icon} strokeWidth={2} size={18} />} />
                    <SlimNavItem icon={<HiOutlineUsers size={18} strokeWidth={2} />} />
                </div>
                <div className="mt-auto flex flex-col space-y-4 pb-2">
                    <button title='theme' onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-[#EAEAEA] dark:hover:bg-indigo-600/10 text-[#8A8C8F] transition-colors hover:text-slate-600 dark:hover:text-slate-200">
                        {isDarkMode ? <HugeiconsIcon icon={Sun03Icon} strokeWidth={2} size={18} /> : <HugeiconsIcon icon={Moon02Icon} size={18} strokeWidth={2} />}
                    </button>
                    <SlimNavItem icon={<HelpCircle size={18} />} />
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden cursor-pointer ring-1 ring-black/5 dark:ring-white/5">
                        <img src={userAvatar} alt="User" className="w-full h-full object-cover" />
                    </div>
                </div>
            </aside>

            {/* Workspace Sidebar */}
            <aside className="w-14 shrink-0 border-r border-slate-200 dark:border-white/5 flex flex-col items-center py-4 dark:bg-[#0E0E0E] bg-[#FBFBFB]">
                <div className="mb-0.5"><IconButton icon={<PanelLeft size={18} />} /></div>
                <div className="w-14 h-[1.5px] bg-slate-200 dark:bg-white/5 mb-4" />
                <div className="flex flex-col space-y-2">
                    <IconButton icon={<Command size={18} />} active />
                    <IconButton icon={<Home size={18} />} />
                    <IconButton icon={<Bell size={18} />} />
                    <IconButton icon={<Inbox size={18} />} />
                    <IconButton icon={<ClipboardList size={18} />} />
                </div>
                <div className="w-14 h-[1.5px] bg-slate-200 dark:bg-white/5 my-4" />
                <div className="flex flex-col space-y-2">
                    <IconButton icon={<Layers size={18} />} />
                    <IconButton icon={<CheckSquare size={18} />} bgVariant="gray" />
                    <IconButton icon={<LayoutGrid size={18} />} />
                    <IconButton icon={<Users size={18} />} />
                    <IconButton icon={<FileText size={18} />} />
                </div>
                <div className="w-14 h-[1.5px] bg-slate-200 dark:bg-white/5 my-4" />
                <div className="flex flex-col space-y-3">
                    <ColoredIcon color="text-blue-500" icon={<FaCreditCard />} />
                    <ColoredIcon color="text-purple-500" icon={<BsChatSquareDotsFill />} />
                    <ColoredIcon color="text-green-500" icon={<PiTerminalWindowFill />} />
                    <ColoredIcon color="text-blue-400" icon={<HiMiniRectangleStack />} />
                </div>
            </aside>
        </div>
    );
}