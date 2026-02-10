import { BellIcon, MessageCircle, Tag } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import { LuBadgeCheck } from "react-icons/lu";
import { TbClockHour12 } from "react-icons/tb";
import { ActivitiesCard } from ".";

const activities = [
    {
        icon: <MessageCircle className="h-6 w-6" />,
        title: "New Message!",
        desc: "Sarah sent you a message.",
        time: "Just Now",
    },
    {
        icon: <LuBadgeCheck className="h-6 w-6" />,
        title: "Level Up!",
        desc: "You've unlocked a new achievement.",
        time: "2 min ago",
    },
    {
        icon: <TbClockHour12 className="h-7 w-7 rotate-45" />,
        title: "Reminder: Meeting Today",
        desc: "Your team meeting starts in 30 min.",
        time: "3 hour ago",
    },
    {
        icon: <Tag className="h-6 w-6 rotate-90" />,
        title: "Special Offer!",
        desc: "Save 20% off on subscription upgrade.",
        time: "12 hours ago",
    },
    {
        icon: <FaCircleCheck className="h-6 w-6" />,
        title: "Task Assigned!",
        desc: "A new task is awaiting action.",
        time: "Yesterday",
    },
];

function ActivitiesCardDemo() {
    return (
        <div className="flex items-center justify-center w-full px-4">
            <ActivitiesCard
                headerIcon={<BellIcon className="size-8 text-gray-400 dark:text-zinc-500" />}
                title="5 New Activities"
                subtitle="What's happening around you"
                activities={activities}
            />
        </div>
    );
}

export default ActivitiesCardDemo;