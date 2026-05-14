import * as React from "react";

export default function SliderSvg(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg 
            width="180" 
            height="15" 
            viewBox="0 0 180 15" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x="0.5" y="3.5" width="179" height="9" rx="4.5" className="fill-white dark:fill-black stroke-neutral-600 dark:stroke-neutral-400" />
            <circle cx="55.5" cy="7.5" r="7" className="fill-neutral-300 dark:fill-neutral-700 stroke-neutral-600 dark:stroke-neutral-400" />
        </svg>
    );
}