"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Menu } from 'lucide-react';
import { LuBellDot } from 'react-icons/lu';
import { MdKeyboardCommandKey } from 'react-icons/md';

interface SiteHeaderProps {
    isDarkMode: boolean;
    userName: string;
}

export function SiteHeader({ isDarkMode, userName }: SiteHeaderProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-14 flex items-center justify-between px-4 sm:px-6 border-b-[1.5px] border-slate-200 dark:border-white/5">
        <div className="flex items-center space-x-2 text-[13px]">
            {/* Replaced generic onClick with toggleSidebar from Shadcn */}
            <button title="menu" onClick={toggleSidebar} className="lg:hidden p-1.5 mr-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/10">
                <Menu size={20} />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[13px]">
                <span className="hidden lg:flex text-[#171717]/90 hover:text-[#3d3d3d]/90 font-normal inter dark:text-slate-200 items-center gap-2.5 cursor-pointer">
                    Tasks
                </span>
                <span className="hidden lg:inline text-[#171717]/80 dark:text-slate-400 text-[16px] opacity-70 mb-0.5">/</span>
                <span className="hidden lg:flex text-[#171717] hover:text-[#3d3d3d]/90 font-medium inter dark:text-slate-200 items-center gap-2.5 cursor-pointer">
                    {userName}
                </span>
            </div>
        </div>

        <div className="flex items-center space-x-2">
            <div className={`relative flex items-center rounded-full px-3 py-1.5  transition-colors ${isDarkMode ? 'bg-[#2B2F28] hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <MdKeyboardCommandKey className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-[#7C7F79]' : 'text-gray-400'}`} />
                <input type="text" placeholder="Search" className={`bg-transparent text-xs outline-none w-full ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
                <div className={`hidden sm:flex text-[10px] px-1 py-px rounded items-center gap-0.5 border ${isDarkMode ? 'border-white/30 text-white/60 bg-transparent' : 'border-black/10 text-black/40 bg-transparent'}`}>
                    <MdKeyboardCommandKey className="w-2.5 h-2.5" /> K
                </div>
            </div>
            <div className='border-[1.4px] flex justify-center items-center gap-2.5 border-gray-200 dark:border-[#2e332c] py-[6px] px-2.5 rounded-full'>
                <LuBellDot className='text-sm' size={16} />
                <span className='bg-[#53565B] text-white/90 px-1.5 rounded-full text-[12px]'>12</span>
            </div>
            <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${isDarkMode ? ' text-[#CCCECD]' : ' text-gray-700'}`}>
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=600&auto=format&fit=crop" alt="Avatar" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    </header>
  );
}