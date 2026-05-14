import * as React from "react";

export default function FilterSvg(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg 
            width="104" 
            height="70" 
            viewBox="0 0 104 70" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="30" cy="30" r="29.5" transform="matrix(0.866025 -0.5 0.866025 0.5 0 40)" className="fill-neutral-200 dark:fill-neutral-800 stroke-neutral-900 dark:stroke-neutral-200" />
            <path d="M16 30V38M20 39.5V49.7575M88 31V39.5M83 40.5V50.5" className="stroke-neutral-900 dark:stroke-neutral-200" />
            <circle cx="30" cy="30" r="29.5" transform="matrix(0.866025 -0.5 0.866025 0.5 0 30)" className="fill-neutral-50 dark:fill-neutral-900 stroke-neutral-900 dark:stroke-neutral-200" />
            <path d="M57.1577 17L28.5789 33.5L52.3946 33.75L63.6529 40.25L70.1481 36.5L58.8897 30L57.1577 17Z" className="fill-neutral-200 dark:fill-neutral-800 stroke-neutral-900 dark:stroke-neutral-200" />
        </svg>
    );
}