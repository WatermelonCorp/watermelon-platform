"use client";

import * as React from "react";
import { Plus, Circle, X } from 'lucide-react';
import { Moon02Icon, Sun03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { BsBellFill } from 'react-icons/bs';
import { PiCubeTransparent } from 'react-icons/pi';
import { MdLocalActivity } from 'react-icons/md';
import { RiAppsFill } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { FaFireFlameCurved } from 'react-icons/fa6';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

/* ---------------- Sidebar Item ---------------- */

const SidebarItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  badge?: string; 
  active?: boolean; 
}> = ({ icon, label, badge, active }) => (
  <div className={`
    flex items-center gap-4 px-4 py-1.75 rounded-md cursor-pointer transition-all duration-200 group
    ${active 
      ? 'bg-[#7FA2CE]/40 text-[#262626] font-medium dark:bg-white/5 dark:text-[#FDFFFD]/90' 
      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-[#FDFFFD]/80'
    }
  `}>
    <div className="flex items-center gap-3">
      <span className="shrink-0 transition-transform group-hover:scale-110">
        {icon}
      </span>
      <span className={`text-[13px] tracking-normal ${active ? "font-bold" : "font-semibold"}`}>
        {label}
      </span>
    </div>
    {badge && (
      <span className="ml-auto bg-[#7FA2CE] text-white text-[10px] font-semibold px-1.5 py-px rounded-sm">
        {badge}
      </span>
    )}
  </div>
);

/* ---------------- Main Sidebar Component ---------------- */

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function AppSidebar({ isDarkMode, toggleDarkMode, ...props }: AppSidebarProps) {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar 
      collapsible="offcanvas" 
      className="border-none" 
      {...props}
    >
      <div className="h-full flex flex-col border-[1.4px] border-r-[1.5px] transition-colors duration-200 rounded-l-2xl bg-white border-black/5 dark:bg-[#131512] dark:border-white/5  z-90 ">
        
        {/* Header */}
        <SidebarHeader className="p-0">
          <div className="p-4 px-5 flex items-center justify-between lg:mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#7FA2CE] rounded-md flex items-center justify-center shrink-0">
                <PiCubeTransparent className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-[16px] tracking-tight text-[#1A1A1A] dark:text-[#E8EBE8]">
                Dashboard
              </span>
            </div>
            
            {/* Mobile Close Button */}
            <button 
              title="close" 
              className="p-1 lg:hidden text-[#1A1A1A] dark:text-[#E8EBE8] hover:bg-gray-100 dark:hover:bg-white/5 rounded-md transition-colors" 
              onClick={() => setOpenMobile(false)}
            >
              <X size={20} />
            </button>
          </div>
        </SidebarHeader>

        {/* Content */}
        <SidebarContent className="p-0 custom-scrollbar overflow-hidden">
          <nav className="flex-1 px-5 space-y-1 overflow-y-auto custom-scrollbar">
            <SidebarItem icon={<FaFireFlameCurved className="w-4 h-4" />} label="Hot Leads" badge="12" active />
            <SidebarItem icon={<BsBellFill className="w-4 h-4" />} label="Pings" />
            <SidebarItem icon={<MdLocalActivity className="w-4 h-4" />} label="Activities" />
            <SidebarItem icon={<RiAppsFill className="w-4 h-4" />} label="AI Assistant" />
            
            <div className="mt-8 mb-2 px-2">
              <span className="text-[12px] font-normal uppercase tracking-wide text-gray-400 dark:text-[#696966]">
                Workspace
              </span>
            </div>
            
            <SidebarItem icon={<Plus className="w-4 h-4" />} label="Dashboard" />
            <SidebarItem icon={<Circle className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />} label="PromptLab" />
            <SidebarItem icon={<Circle className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />} label="VectorVault" />
          </nav>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="p-0 mt-auto">
          <div className="p-4 px-5 space-y-3">
            <button 
              title="theme" 
              onClick={toggleDarkMode} 
              className="p-2 font-semibold flex gap-4 items-center rounded-lg w-full transition-colors text-[#262626] hover:bg-[#F3F4F6] dark:text-slate-200 dark:hover:bg-white/5"
            >
              <div className="shrink-0">
                {isDarkMode ? (
                  <HugeiconsIcon icon={Sun03Icon} strokeWidth={2} size={18} />
                ) : (
                  <HugeiconsIcon icon={Moon02Icon} size={18} strokeWidth={2} />
                )}
              </div>
              <span className="text-[14px]">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button 
              title="settings" 
              className="p-2 flex gap-4 items-center rounded-lg w-full transition-colors font-semibold text-[#262626] hover:bg-[#F3F4F6] dark:text-slate-200 dark:hover:bg-white/5"
            >
              <IoSettingsOutline size={18} className="shrink-0" />
              <span className="text-[14px]">Settings</span>
            </button>

            <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors text-gray-700 dark:text-[#CCCECD] hover:bg-gray-50 dark:hover:bg-white/5">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-white/10">
                <img 
                  src="https://images.unsplash.com/photo-1554034483-04fda0d3507b?w=600&auto=format&fit=crop" 
                  alt="Avatar" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate">Stephen</span>
                <span className="text-[12px] font-medium opacity-70 hover:underline">View Profile</span>
              </div>
            </div>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}