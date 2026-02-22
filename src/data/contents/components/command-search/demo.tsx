"use client";

import { useState, useEffect } from 'react';
import { CommandSearch, type CommandItem } from '.';
import { motion, AnimatePresence } from 'motion/react';
import { User, Bell, HelpCircle, Search, ArrowRight, MessageSquare } from 'lucide-react';

const command: CommandItem[] = [
    { id: '1', title: 'Calendar', section: 'Suggestions', icon: <ArrowRight size={16} />, action: () => console.log('Calendar') },
    { id: '2', title: 'Search Emoji', section: 'Suggestions', icon: <ArrowRight size={16} />, action: () => console.log('Emoji') },
    { id: '3', title: 'Calculator', section: 'Suggestions', icon: <ArrowRight size={16} />, action: () => console.log('Calculator') },
    { id: '4', title: 'Documents', section: 'Suggestions', icon: <ArrowRight size={16} />, action: () => console.log('Docs') },
    { id: '5', title: 'Images', section: 'Suggestions', icon: <ArrowRight size={16} />, action: () => console.log('Images') },
    { id: '6', title: 'Music', section: 'Suggestions', icon: <ArrowRight size={16} />, action: () => console.log('Music') },
    { id: '7', title: 'Profile', section: 'Settings', icon: <User size={16} />, shortcut: '⌘ P', action: () => console.log('Profile') },
    { id: '8', title: 'Notifications', section: 'Settings', icon: <Bell size={16} />, shortcut: '⌘ N', action: () => console.log('Notifications') },
    { id: '9', title: 'Messages', section: 'Settings', icon: <MessageSquare size={16} />, shortcut: '⌘ M', action: () => console.log('Messages') },
    { id: '10', title: 'FAQ', section: 'Help', icon: <HelpCircle size={16} />, action: () => console.log('FAQ') },
];

export default function CommandSearchDemo() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'f' && !isOpen && document.activeElement?.tagName !== 'INPUT') {
                e.preventDefault();
                setIsOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <div className="relative h-[550px] w-full flex flex-col items-center justify-center">
            <AnimatePresence>
                {!isOpen ? (
                    <motion.div
                        key="trigger-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center pt-28 h-screen w-full gap-4 z-10"
                    >
                        <div className="flex flex-col items-center text-zinc-400 uppercase tracking-widest text-[10px] font-medium text-center">
                            <span>Press F or</span>
                            <span>Click in</span>
                            <span>Input</span>
                        </div>
                        <div className="h-28 w-[1px] bg-gradient-to-b from-zinc-800 to-transparent" />
                        <motion.button
                            layoutId="command-pallete"
                            onClick={() => setIsOpen(true)}
                            className="group relative flex items-center gap-3 px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white w-full max-w-[280px] md:w-64 h-10 overflow-hidden shadow-sm dark:shadow-none"
                            transition={{ type: 'spring', damping: 30, stiffness: 450, mass: 1 }}
                        >
                            <Search size={16} className="opacity-40" />
                            <span className="text-sm font-medium pr-8">Find...</span>
                            <kbd className="absolute right-2 px-2 py-0.5 text-[14px] font-bold bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">F</kbd>
                        </motion.button>
                    </motion.div>
                ) : (
                    <CommandSearch
                        key="modal"
                        items={command}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};