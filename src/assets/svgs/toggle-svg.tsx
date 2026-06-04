import * as React from "react";

export default function ToggleSvg(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg 
            width="179" 
            height="70" 
            viewBox="0 0 179 70" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="30" cy="30" r="29.5" transform="matrix(0.866025 -0.5 0.866025 0.5 0 40)" className="fill-muted stroke-neutral-600 dark:stroke-neutral-400" />
            <path d="M16 30V38M20 39.5V49.7575M88 31V39.5M83 40.5V50.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
            <circle cx="30" cy="30" r="29.5" transform="matrix(0.866025 -0.5 0.866025 0.5 0 30)" className="fill-white dark:fill-black stroke-neutral-600 dark:stroke-neutral-400" />
            <circle cx="30" cy="30" r="29.5" transform="matrix(0.866025 -0.5 0.866025 0.5 75 40)" className="fill-muted stroke-neutral-600 dark:stroke-neutral-400" />
            <path d="M91 30V38M95 39.5V49.7575M163 31V39.5M158 40.5V50.5" className="stroke-neutral-600 dark:stroke-neutral-400" />
            <circle cx="30" cy="30" r="29.5" transform="matrix(0.866025 -0.5 0.866025 0.5 75 30)" className="fill-white dark:fill-black stroke-neutral-600 dark:stroke-neutral-400" />
            <g clipPath="url(#clip0_774_522)">
                <path d="M42.6875 24.48L43.6667 25.0453M59.3333 34.0904L60.3125 34.6558M42.6875 34.6558L43.6667 34.0904M59.3333 25.0453L60.3125 24.48M51.5 22.3725L51.5 23.1718M51.5 35.9639L51.5 36.7633M39.0372 29.5679H40.4217M62.5783 29.5679H63.9628M55.4167 27.3066C57.5798 28.5555 57.5798 30.5803 55.4167 31.8292C53.2536 33.078 49.7464 33.078 47.5833 31.8292C45.4202 30.5803 45.4202 28.5555 47.5833 27.3066C49.7464 26.0577 53.2536 26.0577 55.4167 27.3066Z" className="stroke-neutral-600 dark:stroke-neutral-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g clipPath="url(#clip1_774_522)">
                <path d="M134.987 25.7507C136.409 26.6657 137.342 27.7989 137.673 29.0134C138.003 30.2279 137.718 31.4717 136.85 32.5945C135.983 33.7172 134.57 34.6709 132.784 35.3401C130.998 36.0093 128.914 36.3655 126.784 36.3656C124.655 36.3656 122.571 36.0096 120.785 35.3405C118.998 34.6713 117.586 33.7178 116.718 32.5951C115.85 31.4724 115.564 30.2286 115.895 29.014C116.225 27.7995 117.158 26.6662 118.58 25.7512C118.912 25.5377 119.513 25.6727 119.624 25.9517C119.997 26.8865 120.909 27.7207 122.209 28.3179C123.509 28.9152 125.122 29.2404 126.784 29.2404C128.446 29.2404 130.058 28.9152 131.359 28.3179C132.659 27.7207 133.57 26.8865 133.944 25.9517C134.056 25.6722 134.655 25.5372 134.987 25.7507Z" className="stroke-neutral-600 dark:stroke-neutral-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_774_522">
                    <rect width="27.1355" height="27.1355" fill="white" transform="matrix(0.866025 -0.5 0.866025 0.5 28 29.5679)" />
                </clipPath>
                <clipPath id="clip1_774_522">
                    <rect width="24" height="24" fill="white" transform="matrix(0.866025 -0.5 0.866025 0.5 106 30)" />
                </clipPath>
            </defs>
        </svg>
    );
}