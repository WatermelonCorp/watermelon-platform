"use client";

import { Search, Plus, Circle, X, Sun, Moon } from 'lucide-react';
import { MdKeyboardCommandKey } from 'react-icons/md';
import { BsBellFill, BsRocketTakeoff, BsStack } from 'react-icons/bs';
import { RiAppsFill } from 'react-icons/ri';
import { HiSparkles } from 'react-icons/hi2';

const SidebarItem = ({ icon, label, badge, active }: any) => (
    <div className={`flex items-center gap-4 px-4 py-1.75 rounded-md cursor-pointer transition-all duration-200 group 
        ${active 
            ? 'bg-orange-100 text-orange-900 font-medium dark:bg-white/5 dark:text-[#FDFFFD]/90' 
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-white/50 dark:hover:bg-white/5 dark:hover:text-[#FDFFFD]/80'
        }`}>
        <div className="flex items-center gap-3"><span className="shrink-0 transition-transform group-hover:scale-110">{icon}</span><span className="text-[13px] tracking-normal font-light">{label}</span></div>
        {badge && <span className="ml-auto bg-[#D62F0A] text-white text-[10px] font-semibold px-1.5 py-px rounded-sm">{badge}</span>}
    </div>
);

export function AppSidebar({ onToggleTheme, isSidebarOpen, setIsSidebarOpen, isDarkMode }: any) {
    return (
        <aside className={`fixed inset-y-0 left-0 z-50 w-65 border-[1.4px] border-r-0 shrink-0 flex flex-col lg:rounded-l-2xl transition-transform duration-300 h-full bg-white border-black/5 dark:bg-[#131512] dark:border-white/5 lg:static lg:translate-x-0 
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            
            {/* Header*/}
            <div className="p-4 px-5 flex items-center justify-between lg:mb-2 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                        <HiSparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-[16px] tracking-tight text-[#1A1A1A] dark:text-[#E8EBE8]">NeuralForge</span>
                </div>
                {/* Close button only visible on mobile */}
                <button title='close' className="text-[#1A1A1A] dark:text-[#E8EBE8] lg:hidden" onClick={() => setIsSidebarOpen(false)}><X className="w-4 h-4" /></button>
            </div>

            {/* Search Bar*/}
            <div className="px-5 mb-6 shrink-0">
                <div className="relative flex items-center rounded-md px-2 py-1.5 transition-colors bg-gray-100 hover:bg-gray-200 dark:bg-[#2B2F28] dark:hover:bg-white/10">
                    <Search className="w-5 h-5 mr-2 text-gray-400 dark:text-[#7C7F79]" />
                    <input type="text" placeholder="search" className="bg-transparent text-xs outline-none w-full text-gray-800 dark:text-white" />
                    <div className="hidden sm:flex text-[10px] px-1 py-px rounded items-center gap-0.5 border border-black/10 text-black/40 bg-white dark:border-white/30 dark:text-white/60 dark:bg-[#5A5C59]">
                        <MdKeyboardCommandKey className="w-2.5 h-2.5" /> K
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-5 space-y-1 overflow-y-auto custom-scrollbar min-h-0">
                <SidebarItem icon={<BsStack className="w-4 h-4" />} label="Queue" badge="12" active />
                <SidebarItem icon={<BsBellFill className="w-4 h-4" />} label="Pings" />
                <SidebarItem icon={<RiAppsFill className="w-4 h-4" />} label="AI Assistant" />
                <div className="mt-8 mb-2 px-2"><span className="text-[12px] font-normal uppercase tracking-wide text-gray-400 dark:text-[#696966]">Workspace</span></div>
                <SidebarItem icon={<Plus className="w-4 h-4" />} label="NeuralForge" />
                <SidebarItem icon={<Circle className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />} label="PromptLab" />
                <SidebarItem icon={<Circle className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />} label="VectorVault" />
              
            </nav>

            {/* Footer*/}
            <div className="p-4 px-5 shrink-0">
                <div className="rounded-xl p-3 mb-4 border relative overflow-hidden group transition-all duration-300 bg-orange-50 border-orange-100 hover:border-orange-200 dark:bg-[#262626]/60 dark:border-white/5 dark:hover:border-white/10">
                    <BsRocketTakeoff className={`w-5 h-5 text-[#D3B536] mb-3 `} />
                    <h4 className="text-[13px] font-medium tracking-tighter mb-1 text-gray-900 dark:text-[#FAFAF8]">You're on Starter access</h4>
                    <p className="text-[11px] font-medium tracking-tighter mb-1 text-gray-500 dark:text-[#585858]">Upgrade to more collabration + larger runs</p>
                    <button title='pro' className="w-fit text-left text-xs font-normal mt-1 px-3 py-1.5 rounded-md border transition-all bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:text-white/60 dark:border-[#4B372A] dark:bg-transparent">Unlock Pro</button>
                </div>
                <button title='theme' onClick={onToggleTheme} className="flex items-center gap-3 w-full px-2 py-2 text-xs transition-colors rounded-lg mb-1 hover:bg-gray-100 text-gray-600 dark:hover:bg-white/5 dark:text-white/60">
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <div className="mt-2 flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer hover:bg-gray-100 text-gray-700 dark:hover:bg-white/5 dark:text-[#CCCECD]">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200"><img src="https://mockmind-api.uifaces.co/content/human/222.jpg" alt="Avatar" /></div>
                    <span className="text-sm font-light">Stephen</span>
                </div>
            </div>
        </aside>
    );
}