
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

export interface FooterColumn {
    title: string;
    links: { label: string; href: string }[];
}

export interface Footer17Props {
    heading?: string;
    brandName?: string;
    navColumns?: FooterColumn[];
    socialLinks?: { label: string; href: string }[];
    legalText?: string;
    bottomLinks?: { label: string; href: string }[];
}

export default function Footer17({
    heading = "Connect\nwith us.",
    brandName = "Watermelon",
    navColumns = [
        {
            title: "Menu",
            links: [
                { label: "About", href: "#" },
                { label: "Our Work", href: "#" },
                { label: "Philosophy", href: "#" },
                { label: "Services Contact", href: "#" },
            ],
        },
        {
            title: "Office",
            links: [
                { label: "26 Broadway, 8th floor", href: "#" },
                { label: "New York, NY 10004", href: "#" },
                { label: "United States", href: "#" },
            ],
        },
    ],
    socialLinks = [
        { label: "INSTAGRAM", href: "#" },
        { label: "FACEBOOK", href: "#" },
        { label: "TWITTER", href: "#" },
        { label: "BEHANCE", href: "#" },
    ],
    legalText = "© 2026 Firefa Inc. — Registered with FINTRAC (M3388606); cards issued by Peoples Trust Company (Canada)\nand Community Federal Savings Bank (USA) under license from Visa.",
    bottomLinks = [
        { label: "Press and Media", href: "#" },
        { label: "Privacy Policy", href: "#" },
    ],
}: Footer17Props) {
    return (
        <footer className="relative w-full bg-neutral-50 dark:bg-neutral-950/70 text-neutral-600 dark:text-neutral-400 font-sans overflow-hidden transition-colors duration-300">
            {/* ── Noise Background ── */}
            <div
                className="absolute inset-0 opacity-[0.05] dark:opacity-[0.04] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* ── Vertical Floating Contact Text ── */}
            <div className="absolute right-0 top-[40%] origin-bottom-right -rotate-90 hidden xl:block">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-300 translate-x-1/2 transition-colors duration-300">
                    Contact
                </span>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-24 pb-12 flex flex-col min-h-screen justify-between">

                {/* ── Top Section ── */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24">
                    <div className="flex flex-col gap-4 lg:w-1/2">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] text-neutral-900 dark:text-neutral-300 tracking-tight whitespace-pre-line transition-colors duration-300">
                            {heading}
                        </h2>
                        {/* Corner Arrow SVG */}
                        <svg
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="text-neutral-400 dark:text-neutral-500 transition-colors duration-300"
                        >
                            <path d="M6 4v10h10" />
                            <path d="M12 10l4 4-4 4" />
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 lg:w-1/2 lg:justify-end">
                        {navColumns.map((col, idx) => (
                            <div key={idx} className="flex flex-col gap-6">
                                <h4 className="text-lg font-medium text-neutral-900 dark:text-neutral-200 transition-colors duration-300">
                                    {col.title}
                                </h4>
                                <ul className="flex flex-col gap-4">
                                    {col.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <a
                                                href={link.href}
                                                className="text-base text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Middle Section: Divider & Socials ── */}
                <div className="flex flex-col md:flex-row items-center gap-4 mt-24">
                    <div className="hidden md:block h-px bg-neutral-200 dark:bg-neutral-800 flex-1 transition-colors duration-300"></div>
                    <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-12 w-full md:w-auto">
                        {socialLinks.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.href}
                                className="text-[11px] font-medium tracking-widest text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white uppercase flex items-center gap-1.5 transition-colors group"
                            >
                                {link.label}
                                <HugeiconsIcon
                                    icon={ArrowUpRight01Icon}
                                    size={14}
                                    className="text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── Lower Section: Giant Text & Legal ── */}
                <div className="flex flex-col w-full relative">

                    {/* Giant Brand Name */}
                    <div className="w-full flex justify-center relative mb-8">
                        <svg
                            className="w-full h-auto select-none transition-colors duration-300"
                            viewBox={`0 0 ${Math.max(brandName.length * 60, 300)} 105`}
                            preserveAspectRatio="xMidYMid meet"
                            aria-label={brandName}
                        >
                            <text
                                x="50%"
                                y="50%"
                                dominantBaseline="middle"
                                textAnchor="middle"
                                className="fill-neutral-300 dark:fill-white/20 font-bold tracking-tighter transition-colors duration-300"
                                fontSize="110"
                            >
                                {brandName}
                            </text>
                        </svg>

                        <div className="w-full absolute bottom-0 inset-x-0 h-px bg-neutral-200 dark:bg-neutral-800 mb-2 sm:mb-4 md:mb-6 lg:mb-10 z-10 transition-colors duration-300"></div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 text-sm text-neutral-500 transition-colors duration-300">
                        <p className="max-w-2xl leading-relaxed whitespace-pre-line">
                            {legalText}
                        </p>

                        <div className="flex items-center gap-8">
                            {bottomLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.href}
                                    className="hover:text-neutral-900 dark:hover:text-neutral-300 transition-colors whitespace-nowrap"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}