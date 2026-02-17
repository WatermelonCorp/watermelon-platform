"use client";

import React, { useState } from 'react';
import {
    X, ArrowRight, Menu, Globe, Hourglass, Flag, AlertCircle, Calendar
} from 'lucide-react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { HiSparkles } from 'react-icons/hi2';
import { LuCircleDashed } from 'react-icons/lu';
import { FiPaperclip } from 'react-icons/fi';
import { WORK_ITEMS, INITIAL_TABS } from './data';
export interface WorkItem {
    id: string;
    title: string;
    issueId: string;
    origin: string;
    priority: 'High Impact' | 'Moderate' | 'Critical' | 'Low';
    date: string;
    type: 'Time-Sensitive' | 'Long-term' | 'Sprint';
    tags: string[];
    iconType: 'alert' | 'settings' | 'database' | 'user';
    isLive?: boolean;
}

export interface Tab { 
    id: string; 
    title: string; 
    active: boolean; 
    color: string; 
}


const WorkItemCard: React.FC<{ item: WorkItem }> = ({ item }) => {
    const getIcon = () => {
        const logos = {
            alert: { url: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", name: "OpenAI" },
            settings: { url: "https://cdn-icons-png.flaticon.com/128/6033/6033716.png", name: "Meta" },
            database: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9NAHBHbG_tj_AFFrJGCKAWEPDRtvFL28sug&s", name: "Gemini" },
            user: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9NAHBHbG_tj_AFFrJGCKAWEPDRtvFL28sug&s", name: "Anthropic" }
        };
        const logo = logos[item.iconType as keyof typeof logos];
        if (!logo) return null;
        return (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 bg-gray-100 dark:bg-white/5">
                <img src={logo.url} alt={logo.name} className="w-8 h-8 transition-all object-cover duration-300 grayscale group-hover:grayscale-0 dark:invert dark:opacity-70 dark:group-hover:invert-0 dark:group-hover:opacity-100" />
            </div>
        );
    };

    return (
        <div className="p-4 sm:p-5 rounded-xl border transition-all group bg-white border-gray-100 shadow-sm hover:border-gray-200 dark:bg-[#0F0F0F] dark:border-white/4 dark:hover:border-white/10">
            <div className="flex gap-3 items-start mb-5">
                <div className="mt-0.5">{getIcon()}</div>
                <div>
                    <h3 className="text-[13px] font-medium tracking-tight text-gray-900 dark:text-[#E8EBE8]">{item.title}</h3>
                    <span className="text-[11px] mt-0.5 block text-gray-400 dark:text-white/20">{item.issueId}</span>
                </div>
            </div>
            <div className="space-y-4 sm:space-y-6 mb-6">
                {[
                    { Icon: Flag, label: 'Origin', value: item.origin },
                    { Icon: AlertCircle, label: 'Priority', value: item.priority },
                    { Icon: Calendar, label: 'Date', value: item.date },
                ].map((row, i) => (
                    <div key={i} className="flex items-center text-[12px]">
                        <div className="flex items-center gap-2.5 w-22.5 sm:w-25 shrink-0 text-gray-400 dark:text-white/30">
                            <row.Icon className="w-3.5 h-3.5 opacity-50" />
                            <span>{row.label}</span>
                        </div>
                        <span className="truncate font-medium text-gray-700 dark:text-[#E8EBE8] dark:opacity-80">{row.value}</span>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] bg-yellow-50 border-yellow-100 text-yellow-700 dark:bg-[#1A1A1A] dark:border-white/5 dark:text-yellow-500/80">
                    <Hourglass className="w-3 h-3" />
                    <span>{item.type}</span>
                </div>
                {item.tags.map((tag, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] bg-blue-50 border-blue-100 text-blue-700 dark:bg-[#1A1A1A] dark:border-white/5 dark:text-blue-400/80">
                        <Globe className="w-3 h-3" />
                        <span>{tag}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const DashboardView = ({ setIsSidebarOpen, isChatOpen, setIsChatOpen }: { setIsSidebarOpen: (open: boolean) => void, isChatOpen: boolean, setIsChatOpen: (open: boolean) => void }) => {
    const [tabs, setTabs] = useState<Tab[]>(INITIAL_TABS);
     const handleTabClick = (id: string) => {
    setTabs(prev =>
      prev.map(tab => ({
        ...tab,
        active: tab.id === id,
      }))
    );
  };

    return (
        <>
            {/* Header */}
            <header className="h-11 flex items-center gap-1 px-2 overflow-x-auto no-scrollbar border-b shrink-0 bg-gray-50 border-gray-200 dark:bg-[#101010] dark:border-white/5">
                <button title='Menu' className="text-gray-600 dark:text-[#E8EBE8] lg:hidden p-2" onClick={() => setIsSidebarOpen(true)}>
                    <Menu size={16} />
                </button>
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`group flex items-center gap-2 px-3 sm:px-4 h-7.5 cursor-pointer rounded-lg transition-all whitespace-nowrap border-r 
                            ${tab.active 
                                ? 'bg-white border-gray-200 opacity-100 shadow-sm dark:bg-[#202020] dark:border-white/10' 
                                : 'bg-white border-gray-200 opacity-60 hover:opacity-90 dark:bg-[#202020] dark:border-white/10'
                            }`} >
                            <span className="text-[11px] sm:text-[12px] font-medium tracking-tighter text-gray-400 dark:text-[#555]">
                                {tab.id.toUpperCase()}
                            </span>
                            <span className="text-gray-300 dark:text-[#333] opacity-50">•</span>
                            <span className={`text-[11px] sm:text-[12px] font-medium tracking-tight ${tab.color}`}>
                                {tab.title}
                            </span>
                            <X className={`w-3.5 h-3.5 transition-colors ml-1 text-gray-400 hover:text-gray-600 dark:text-[#cbc9c9] dark:hover:text-white ${tab.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                        </div>
                    ))}
                </div>
                <button title='Open Chat' className="text-gray-600 dark:text-[#E8EBE8] lg:hidden ml-auto p-2" onClick={() => setIsChatOpen(!isChatOpen)}>
                    <ArrowRight size={16} className={`transition-transform ${isChatOpen ? 'rotate-180' : ''}`} />
                </button>
            </header>

            {/* Body Container */}
            <div className="flex-1 flex overflow-hidden relative min-h-0 p-1">
                <div className="flex-1 overflow-y-auto border-[1.6px] rounded-lg p-4 sm:p-6 md:p-8 lg:p-12 custom-scrollbar border-gray-100 dark:border-[#202020]">
                    <div className="max-w-4xl mx-auto lg:mx-0">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="text-[11px] font-normal border-[1.6px] py-0.5 px-2 rounded-sm border-gray-200 text-gray-500 dark:border-white/5 dark:text-white/40">MF-214</span>
                            <div className="flex items-center gap-1.5 text-[11px] font-normal px-2 py-0.5 border-[1.6px] rounded-sm border-gray-200 text-gray-500 dark:border-white/5 dark:text-white/30"><RiErrorWarningFill className="w-4 h-4 text-[#FF941B]" />Waiting on <span className="cursor-pointer hover:no-underline underline text-blue-500/60">MF-209</span></div>
                        </div>
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-normal inter tracking-wide max-w-2xl leading-tight text-gray-900 dark:text-[#dcd9d9]">Fix broken context links + make navigation smarter</h1>
                        <div className='flex justify-start gap-4 items-start my-4 mb-6'>
                            <span className="h-fit w-fit p-1 flex justify-center items-center rounded-lg shrink-0 bg-gray-100 dark:bg-[#1F1F1F]"><HiSparkles className="text-orange-500 dark:text-white" size={20} /> </span>
                            <p className="text-[14px] md:text-[15px] text-gray-500 dark:text-white/15">Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum placeholder copy.</p>
                        </div>

                        {/* Responsive Metadata Row */}
                        <div className="w-full border-y py-3 mb-6 border-gray-100 dark:border-white/5">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-0.75">
                                <div className="flex items-center h-8 rounded-md lg:rounded-l-md lg:rounded-r-none overflow-hidden border bg-gray-50 border-gray-100 dark:bg-[#1A1A1A] dark:border-white/3">
                                    <div className="flex items-center gap-2 px-3 sm:px-6">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80]"></div>
                                        <span className="text-[11px] sm:text-[12px] font-normal text-gray-600 dark:text-[#E8EBE8]/70">Active</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 h-full border-l border-inherit">
                                        <span className="text-[10px] text-gray-400 dark:text-[#E8EBE8]/70">++</span>
                                        <span className="text-[11px] sm:text-[12px] font-normal text-gray-600 dark:text-[#E8EBE8]/70">UX</span>
                                    </div>
                                </div>
                                <div className="flex items-center h-8 px-4 sm:px-6 border gap-2 rounded-md lg:rounded-none bg-gray-50 border-gray-100 dark:bg-[#1A1A1A] dark:border-white/3">
                                    <div className="flex -space-x-1.5 sm:-space-x-2">
                                        <img className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-inherit grayscale" src="https://picsum.photos/seed/1/20/20" alt="owner1" />
                                        <img className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-inherit" src="https://picsum.photos/seed/2/20/20" alt="owner2" />
                                    </div>
                                    <span className="text-[11px] sm:text-[13px] text-gray-700 dark:text-[#E8EBE8]">3 owners</span>
                                </div>
                                <button title='Add' className="text-[11px] h-8 transition-opacity px-3 sm:px-4 font-medium border rounded-md lg:rounded-none lg:border-y lg:border-r bg-gray-50 text-gray-700 border-gray-100 dark:bg-[#1A1A1A] dark:text-[#E8EBE8] dark:border-white/3">
                                    Add effort
                                </button>
                                <div className="flex items-center h-8 rounded-md lg:rounded-r-md lg:rounded-l-none px-4 sm:px-6 overflow-hidden border bg-gray-50 border-gray-100 dark:bg-[#1A1A1A] dark:border-white/3">
                                    <div className="flex items-center gap-2 h-full">
                                        <LuCircleDashed className="text-gray-400 dark:text-[#E8EBE8]/40" size={16} />
                                        <span className="text-[11px] sm:text-[12px] text-gray-600 dark:text-[#E8EBE8]">Priority:</span>
                                        <span className="text-[11px] sm:text-[13px] font-medium text-gray-800 dark:text-[#E8EBE8]">Mid</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
                            {WORK_ITEMS.map((item) => (<WorkItemCard key={item.id} item={item} />))}
                        </div>
                    </div>
                </div>

                {/* Right Aside - Chat */}
                <aside className={`absolute inset-y-0 right-0 z-40 lg:static w-full sm:w-87.5 md:w-100 my-1 flex flex-col shrink-0 transition-all duration-300 border-[1.6px] rounded-lg m-1.5 p-4 px-2 custom-scrollbar 
                    ${isChatOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} 
                    ${!isChatOpen && 'lg:flex hidden'} 
                    bg-gray-50 border-gray-200 dark:bg-[#0D0D0D] dark:border-white/5`}>
                    
                    <header className="h-10 px-3 flex items-center justify-between shrink-0 mb-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-[12px] font-normal px-2 py-0.5 border-[1.6px] rounded-sm border-gray-200 text-gray-600 bg-white dark:bg-black shadow-sm dark:border-white/15 dark:text-white/60">Discussion</div>
                            <span className="text-[12px] font-normal border-[1.6px] py-0.5 px-2 rounded-sm border-gray-200 text-gray-400 bg-white dark:bg-black shadow-sm dark:border-white/15 dark:text-white/60">MF-214</span>
                        </div>
                        <button title='close' className="lg:hidden" onClick={() => setIsChatOpen(false)}><X size={16} className="text-gray-400 dark:text-white/40" /></button>
                    </header>

                    <div className="flex-1 overflow-y-auto p-4 md:p-2 space-y-8 custom-scrollbar">
                        <div className="flex flex-col items-center justify-center pt-4 pb-2">
                            <div className="relative mb-3">
                                <img src="https://mockmind-api.uifaces.co/content/abstract/42.jpg" alt="A. Kareem" className="w-10 h-10 rounded-full border-2 border-white/5 object-cover" />
                            </div>
                            <div className="text-center space-y-0.5">
                                <p className="text-[12px] font-medium text-gray-900 dark:text-[#E8EBE8]">
                                    <span className="underline decoration-black/10 dark:decoration-white/20">A. Kareem</span> opened this
                                </p>
                                <p className="text-[10px] capitalize tracking-tight text-gray-400 dark:text-white/20">on Feb 1, 12:57 PM</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-3 group">
                                <div className="shrink-0 mt-auto pb-1">
                                    <img src="https://mockmind-api.uifaces.co/content/abstract/42.jpg" alt="avatar" className="w-6 h-6 rounded-full opacity-80" />
                                </div>
                                <div className="flex flex-col gap-1.5 max-w-[85%]">
                                    {[
                                        "The nav feels noisy. People can't predict what shows up.",
                                        "Some \"related\" items are missing while random ones appear.",
                                        "The graph is linking nodes that share tokens, not meaning."
                                    ].map((txt, i) => (
                                        <div key={i} className="p-3 pl-4 rounded-2xl rounded-bl-none shadow-sm border bg-white border-gray-100 text-gray-700 dark:bg-[#202020] dark:border-transparent dark:text-[#E8EBE8]/90">
                                            <p className="text-[13px] leading-relaxed">{txt}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="gap-2 shrink-0 cursor-pointer flex w-full justify-start items-center mt-4 px-2">
                        <FiPaperclip size={20} className="shrink-0 text-gray-400 hover:text-gray-600 dark:text-[#353535] dark:hover:text-[#595858]" />
                        <div className="relative w-full rounded-md px-3 py-1 bg-white border border-gray-200 shadow-inner dark:bg-[#202020] dark:border-none">
                            <textarea
                                placeholder="type message"
                                rows={1}
                                className="w-full bg-transparent text-xs leading-4 min-h-9 outline-none resize-none block pt-2 text-gray-800 dark:text-white"
                            />
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
};