import {
    Book02Icon,
    Brain02Icon,
    DropletFreeIcons,
    RunningShoesIcon,
    SwimmingIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from '@hugeicons/react';
import { CardSwipe } from '.';

const items = [
    {
        id: 1,
        title: "Reading",
        description: "Sharpen your mind & escape to new adventures.",
        icon: (props: any) => (
            <HugeiconsIcon
                icon={Book02Icon}
                size={52}
                strokeWidth={1.5}
                {...props}
            />
        ),
    },
    {
        id: 2,
        title: "Drink Water",
        description: "Stay hydrated & energized. Your body will thank you!",
        icon: (props: any) => (
            <HugeiconsIcon
                icon={DropletFreeIcons}
                size={52}
                strokeWidth={1.5}
                {...props}
            />
        ),
    },
    {
        id: 3,
        title: "Running",
        description: "Feel the endorphins! Get a quick energy boost.",
        icon: (props: any) => (
            <HugeiconsIcon
                icon={RunningShoesIcon}
                size={52}
                strokeWidth={1.5}
                {...props}
            />
        ),
    },
    {
        id: 4,
        title: "Swimming",
        description: "Low-impact workout. Refreshing & invigorating.",
        icon: (props: any) => (
            <HugeiconsIcon
                icon={SwimmingIcon}
                size={52}
                strokeWidth={1.5}
                {...props}
            />
        ),
    },
    {
        id: 5,
        title: "Meditation",
        description: "Find inner peace. Just 5 minutes can de-stress.",
        icon: (props: any) => (
            <HugeiconsIcon
                icon={Brain02Icon}
                size={52}
                strokeWidth={1.5}
                {...props}
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