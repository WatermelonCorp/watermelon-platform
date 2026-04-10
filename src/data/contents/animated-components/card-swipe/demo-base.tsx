import {
    Book02Icon,
    Brain02Icon,
    DropletFreeIcons,
    RunningShoesIcon,
    SwimmingIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from '@hugeicons/react';
import { CardSwipe } from './base';

const items = [
    {
        id: 1,
        title: "Reading",
        description: "Sharpen your mind & escape to new adventures.",
        icon: () => (
            <HugeiconsIcon
                icon={Book02Icon}
                size={52}
                strokeWidth={1.5}
            />
        ),
    },
    {
        id: 2,
        title: "Drink Water",
        description: "Stay hydrated & energized. Your body will thank you!",
        icon: () => (
            <HugeiconsIcon
                icon={DropletFreeIcons}
                size={52}
                strokeWidth={1.5}
            />
        ),
    },
    {
        id: 3,
        title: "Running",
        description: "Feel the endorphins! Get a quick energy boost.",
        icon: () => (
            <HugeiconsIcon
                icon={RunningShoesIcon}
                size={52}
                strokeWidth={1.5}
            />
        ),
    },
    {
        id: 4,
        title: "Swimming",
        description: "Low-impact workout. Refreshing & invigorating.",
        icon: () => (
            <HugeiconsIcon
                icon={SwimmingIcon}
                size={52}
                strokeWidth={1.5}
            />
        ),
    },
    {
        id: 5,
        title: "Meditation",
        description: "Find inner peace. Just 5 minutes can de-stress.",
        icon: () => (
            <HugeiconsIcon
                icon={Brain02Icon}
                size={52}
                strokeWidth={1.5}
            />
        ),
    },
];


function CardSwipeDemo() {
    return (
        <div className="flex items-center justify-center">
            <CardSwipe items={items} />
        </div>
    )
}

export default CardSwipeDemo