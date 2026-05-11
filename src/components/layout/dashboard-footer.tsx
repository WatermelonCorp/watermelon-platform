export default function DashboardFooter() {
    return (
        <footer className="border-t dark:border-black shadow-[inset_0_1px_0_0_rgba(255,255,255,1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 md:px-6 lg:px-8">

                <div className="flex items-center gap-2.5">
                    <span className="text-sm font-medium text-foreground">Watermelon UI</span>
                    <span className="text-muted-foreground/40 text-xs select-none">·</span>
                    <span className="text-xs text-muted-foreground">High-quality React components.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <a
                        href="mailto:watermeloncorpui@gmail.com"
                        className="hover:text-foreground transition-colors underline underline-offset-4"
                    >
                        watermeloncorpui@gmail.com
                    </a>
                    <span className="text-muted-foreground/40 select-none">·</span>
                    <span className="text-muted-foreground/60">© {new Date().getFullYear()} Watermelon</span>
                </div>

            </div>
        </footer>
    )
}