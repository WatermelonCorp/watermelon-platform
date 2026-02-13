"use client";

import { useState } from 'react';
import { SubscriptionCalendar } from './index';
import { RiClaudeFill, RiNetflixFill } from 'react-icons/ri';
import { SiAdobe } from 'react-icons/si';
import { FaAmazon } from 'react-icons/fa6';

const MONTHS_LIST = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

const DAYS = [
    { date: 29, isMuted: true }, { date: 30, isMuted: true }, { date: 31, isMuted: true },
    { date: 1 }, { date: 2, indicators: [<span key="y" className="w-1.5 h-1.5 rounded-full bg-yellow-400" />], isLogo: [<RiNetflixFill color='red' size={16} />] },
    { date: 3 }, { date: 4, indicators: [<span key="dot" className="w-1.5 h-1.5 rounded-full bg-purple-400" />], isLogo: [<SiAdobe key="adobe" className="text-[#F00A07]" size={16} />] },
    { date: 5 }, { date: 6 }, { date: 7 }, { date: 8 }, { date: 9 },
    { date: 10, indicators: [<span key="ring" className="w-1.5 h-1.5 rounded-full bg-purple-400" />], isLogo: [<RiClaudeFill color='#827BFF' size={16} />] },
    { date: 11 }, { date: 12 }, { date: 13 }, { date: 14 }, { date: 15 },
    { date: 16 }, { date: 17 }, { date: 18 }, { date: 19 }, { date: 20 },
    { date: 21 }, { date: 22 }, { date: 23 }, { date: 24 },
    { date: 25, indicators: [<span key="y" className="w-1.5 h-1.5 rounded-full bg-yellow-400" />], isLogo: [<FaAmazon key="amazon" className="text-zinc-900 dark:text-white" size={16} />] },
    { date: 26 }, { date: 27 }, { date: 28 }, { date: 29 }, { date: 30 },
    { date: 31 }, { date: 1, isMuted: true }
];

export default function SubscriptionCalendarDemo() {
    const [monthIndex, setMonthIndex] = useState(1); 

    const handleNext = () => setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
    const handlePrev = () => setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));

    return (
        <SubscriptionCalendar
            month={MONTHS_LIST[monthIndex]}
            year={2026}
            onPrevMonth={handlePrev}
            onNextMonth={handleNext}
            days={DAYS}
            monthlyTotal={156.23}
            subscriptionsCount={9}
            newCount={3}
        />
    );
}