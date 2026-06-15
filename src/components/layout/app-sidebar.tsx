// ─── Imports: shadcn sidebar primitives ───────────────────────────────────────
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// ─── Imports: shadcn collapsible (used for Legal section in footer) ───────────
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// ─── Imports: shadcn switch (theme toggle in footer) ─────────────────────────
import { Switch } from "@/components/ui/switch";

// ─── Imports: HugeIcons wrapper ───────────────────────────────────────────────
// IconSvgElement is the exact type the HugeiconsIcon `icon` prop accepts
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

// ─── Imports: icons from the project's shared hugeicons barrel ────────────────
// ArrowRight01Icon → right-chevron on Explore items and Legal row
// Download04Icon   → Installation quickstart icon
// CodeIcon         → Framework Support quickstart icon
// CommandIcon      → ⌘ symbol inside the search kbd badge
// GridIcon         → left icon on every Explore row (4-square)
// SearchIcon       → magnifying glass in the search bar
// ShieldIcon       → icon on the Legal footer row
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  CommandIcon,
  CodeIcon,
  GridIcon,
  SearchIcon,
  DashboardSquare01Icon,
  Layout01Icon,
  SparklesIcon,
} from "@/lib/hugeicons";

// ─── Imports: icons sourced directly from core-free-icons ────────────────────
// These aren't re-exported from the shared barrel yet, so we pull them directly.
// PlayCircleIcon  → Basic Usage quickstart icon
// Clock01Icon     → Changelog quickstart icon
// Terminal01Icon  → CLI quickstart icon
import {
  Clock01Icon,
  HardDriveDownload,
  CubeIcon,
  AuctionIcon,
  Component
} from "@hugeicons/core-free-icons";

// ─── Imports: data registries (used to build nav category lists) ──────────────
import { allCategories } from "@/data/animated-components-registry";
import { uiCategories } from "@/data/components-registry";
import { blockCategories } from "@/data/blocks";

// ─── Imports: routing ────────────────────────────────────────────────────────
import { Link, useLocation } from "react-router-dom";

// ─── Imports: React hooks ─────────────────────────────────────────────────────
import { memo, useCallback, useEffect, useMemo } from "react";

// ─── Imports: layout components ──────────────────────────────────────────────
import { Logo } from "./logo";
import { Socials } from "./socials";

// ─── Imports: next-themes for the theme toggle switch ────────────────────────
import { useTheme } from "next-themes";

// ─── Imports: analytics helper ────────────────────────────────────────────────
import { trackEvent } from "@/lib/analytics";

// ─────────────────────────────────────────────────────────────────────────────
// QuickstartItem type — each item in the Quickstart flat list
// ─────────────────────────────────────────────────────────────────────────────
interface QuickstartItemProps {
  title: string;
  url: string;
  /** Proper HugeIcons icon type — matches the `icon` prop of HugeiconsIcon */
  icon: IconSvgElement;
  isActive: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// QuickstartNavItem — Memoized flat nav row with a per-item icon on the left.
// Matches the Figma "Quickstart" section style: icon + label, no chevron.
// ─────────────────────────────────────────────────────────────────────────────
const QuickstartNavItem = memo(function QuickstartNavItem({
  title,
  url,
  icon,
  isActive,
}: QuickstartItemProps) {
  return (
    <SidebarMenuItem>
      {/* h-10 gives each row enough height to breathe, matching the Figma spacing */}
      <SidebarMenuButton
        asChild
        size="default"
        isActive={isActive}
        className="h-10 px-2 gap-2"
      >
        <Link
          to={url}
          className="flex items-center text-muted-foreground hover:text-foreground text-sm"
        >
          {/* Per-item icon — each quickstart item has a unique icon per the design */}
          <HugeiconsIcon
            icon={icon}
            size={18}
            className="shrink-0 text-muted-foreground"
          />
          {title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// ExploreCollapsibleItem — Explore row that expands to show sub-items.
// Header row: [GridIcon] [Label]  [chevron rotates on open]
// Sub-items: indented list with a left border, matching the old sidebar style.
// ─────────────────────────────────────────────────────────────────────────────
const ExploreCollapsibleItem = memo(function ExploreCollapsibleItem({
  title,
  titleUrl,
  items,
  isAnyChildActive,
  defaultOpen = false,
  icon,
}: {
  /** Section label shown in the trigger row */
  title: string;
  /** Optional: clicking the label itself navigates here (not the toggle) */
  titleUrl?: string;
  /** Sub-items rendered inside the collapsible */
  items: { title: string; url: string; isActive: boolean }[];
  /** Whether any child is currently active — keeps the section open */
  isAnyChildActive: boolean;
  /** Start expanded by default */
  defaultOpen?: boolean;
  icon?: IconSvgElement;
}) {
  // When there are no sub-items, render a plain flat link row — no collapsible,
  // no chevron, no CollapsibleContent — so clicking causes zero layout shift.
  if (items.length === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="default"
          isActive={isAnyChildActive}
          className="h-10 px-2 w-full"
        >
          <Link
            to={titleUrl ?? "#"}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <HugeiconsIcon
              icon={icon || GridIcon}
              size={18}
              className="shrink-0 text-muted-foreground"
            />
            {title}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      {/* Collapsible wraps the trigger row + the sub-item list */}
      <Collapsible defaultOpen={defaultOpen || isAnyChildActive}>
        {/* ── Trigger row: grid icon + label + rotating chevron ── */}
        <CollapsibleTrigger asChild>
          <SidebarMenuButton
            size="default"
            isActive={isAnyChildActive}
            className="h-10 px-2 justify-between w-full"
          >
            {/* Left cluster: grid icon + label (label is a link if titleUrl provided) */}
            <span className="flex items-center gap-2 text-sm">
              <HugeiconsIcon
                icon={icon || GridIcon}
                size={18}
                className="shrink-0 text-muted-foreground"
              />
              {titleUrl ? (
                // Allow navigating to the index page without closing the collapsible
                <Link
                  to={titleUrl}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-foreground"
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </span>
            {/* Right: down-chevron rotates 90° when collapsed via CSS group trick */}
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={16}
              className="shrink-0 text-muted-foreground/60 transition-transform group-data-[state=closed]/collapsible:-rotate-90"
            />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        {/* ── Sub-item list — indented with a left accent border ── */}
        <CollapsibleContent>
          <SidebarMenu className="mt-1 ml-2 border-l border-border/60 pl-2 pr-2.5">
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  size="sm"
                  isActive={item.isActive}
                  className="h-6 px-2.5"
                >
                  <Link
                    to={item.url}
                    className="text-muted-foreground hover:text-foreground text-xs mb-0.5"
                  >
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// ExploreComingSoonItem — Non-expandable Explore row with a "Soon" badge.
// Used for Blocks, Dashboards, Templates until their pages are ready.
// ─────────────────────────────────────────────────────────────────────────────
const ExploreComingSoonItem = memo(function ExploreComingSoonItem({
  title,
  icon,
}: {
  title: string;
  icon?: IconSvgElement;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        size="default"
        disabled
        className="h-10 px-2 justify-between opacity-60 cursor-default"
      >
        {/* Left cluster: grid icon + label */}
        <span className="flex items-center gap-2 text-sm">
          <HugeiconsIcon
            icon={icon || GridIcon}
            size={18}
            className="shrink-0 text-muted-foreground"
          />
          {title}
        </span>
        {/* Right: coming-soon pill badge */}
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-lime-400">
          Soon
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// Helper — format a category slug to a human-readable label
// e.g., "buttons" → "Buttons"
// ─────────────────────────────────────────────────────────────────────────────
function formatCategoryName(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// AppSidebar — Main application sidebar
//
// Layout (top → bottom):
//   Header  : Logo + collapse trigger
//   Content : Search bar → Quickstart → Explore
//   Footer  : Legal (collapsible) → Theme switch → Socials → Copyright
// ─────────────────────────────────────────────────────────────────────────────
export function AppSidebar() {
  const location = useLocation();
  const { isMobile, setOpenMobile, setOpen } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();

  // ── Close sidebar on route change ──
  // • Always close the mobile sheet (slide-over) on any navigation.
  // • Also collapse the desktop sidebar when the user opens a block detail
  //   page (/block/:slug) — those pages are wide and benefit from the extra
  //   space, and this is where the user lands after clicking a card.
  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    } else if (location.pathname.startsWith('/block/')) {
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isMobile]);

  // ── Quickstart items — each has a unique icon per the Figma design ──
  // NOTE: "Basic Usage" and "CLI" pages may not have routes yet; add them when ready.
  const quickStartItems = [
    { title: "Installation", url: "/installation", icon: HardDriveDownload },
    // { title: "Basic Usage", url: "/basic-usage", icon: PlayCircleIcon },
    { title: "Framework Support", url: "/framework-support", icon: CodeIcon },
    // { title: "CLI", url: "/cli", icon: ComputerTerminal02Icon },
    { title: "Changelog", url: "/changelog", icon: Clock01Icon },
  ];

  // ── Legal links — shown in a collapsible in the footer ──
  const legalLinks = [
    { title: "Terms", url: "/terms" },
    { title: "Privacy", url: "/privacy" },
    { title: "Copyright", url: "/copyright" },
  ];

  // ── Generate animated-component category sub-items for the Explore collapsible ──
  const componentCategories = useMemo(
    () =>
      allCategories.map((category) => ({
        title: formatCategoryName(category),
        url: `/animated-components/category/${category}`,
        isActive: location.pathname === `/animated-components/category/${category}`,
      })),
    [location.pathname]
  );

  // ── Generate UI-component category sub-items for the Explore collapsible ──
  const uiComponentCategories = useMemo(
    () =>
      uiCategories.map((cat) => ({
        title: cat.label,
        url: `/components/${cat.slug}`,
        isActive: location.pathname === `/components/${cat.slug}`,
      })),
    [location.pathname]
  );

  // ── Generate blocks category sub-items for the Explore collapsible ──
  const blockNavCategories = useMemo(
    () =>
      blockCategories.map((cat) => ({
        title: cat.label,
        url: `/blocks/${cat.slug}`,
        isActive: location.pathname === `/blocks/${cat.slug}`,
      })),
    [location.pathname]
  );

  // ── Theme toggle ──
  const isDark = resolvedTheme === "dark";
  const handleThemeToggle = useCallback(
    (checked: boolean) => {
      // checked=true → user wants dark; checked=false → light
      setTheme(checked ? "dark" : "light");
    },
    [setTheme]
  );

  // ── Search bar click — opens the existing CommandPalette via ⌘K event ──
  const handleSearchClick = useCallback(() => {
    trackEvent("command_palette_open", { source: "sidebar_search" });
    // The CommandPalette component listens for this keyboard event globally
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
      })
    );
  }, []);

  return (
    <Sidebar variant="inset" className="p-0">
      {/* ─── Header: logo + collapse trigger ─────────────────────────────── */}
      <SidebarHeader className="p-3.5 px-6 bg-gray-100 dark:bg-neutral-900 border-b border-border dark:border-black shadow-[0_1.5px_0_0_rgba(255,255,255,1)] dark:shadow-[0_0.5px_0_0_rgba(255,255,255,0.1)] z-10">
        <div className="flex items-center justify-between  transition-colors duration-200 ease-in-out">
          <Logo />
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      {/* ─── Content ──────────────────────────────────────────────────────── */}
      <SidebarContent className="scrollbar-hide px-2 bg-gray-100 dark:bg-neutral-900">

        {/* ── Search trigger bar ──
            Matches the Figma search row: magnifying glass + "search" text + ⌘K badge.
            Clicking dispatches the keydown event that opens CommandPalette.
        */}
        <SidebarGroup className="px-2 pt-1 pb-2 mt-4 lg:hidden">
          <button
            type="button"
            onClick={handleSearchClick}
            aria-label="Open search (⌘K)"
            className="flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-input/50 bg-background px-3 text-sm text-muted-foreground transition-colors hover:border-input hover:bg-muted/50 hover:text-foreground"
          >
            {/* Left: search icon + placeholder */}
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={SearchIcon} strokeWidth={2} className="size-4 shrink-0" />
              <span>search</span>
            </div>
            {/* Right: keyboard shortcut badge */}
            <kbd className="pointer-events-none flex h-5 select-none items-center gap-0.5 rounded-md border border-input/50 bg-muted/50 px-1.5 font-mono text-[10px] font-medium text-muted-foreground leading-none">
              <HugeiconsIcon icon={CommandIcon} size={13} />K
            </kbd>
          </button>
        </SidebarGroup>

        {/* ── Quickstart section ──
            Flat list — not collapsible. Each item has a unique icon.
            Matches the Figma "Quickstart" block with generous row heights.
        */}
        <SidebarGroup >
          {/* Section heading — bold label matching Figma typography */}
          <SidebarGroupLabel className="px-2 min-h-8 mt-2">
            <span className="font-semibold text-sidebar-foreground text-[14px] 0">Quickstart</span>
          </SidebarGroupLabel>
          <SidebarMenu className="flex flex-col gap-0.5 ">
            {quickStartItems.map((item) => (
              <QuickstartNavItem
                key={item.title}
                title={item.title}
                url={item.url}
                icon={item.icon}
                isActive={location.pathname === item.url}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* ── Explore section ──
            Collapsible rows for Component and Animated (show all sub-pages).
            Non-expandable "Soon" rows for Blocks, Dashboards, Templates.
        */}
        <SidebarGroup>
          {/* Section heading */}
          <SidebarGroupLabel className="px-2 min-h-8">
            <span className="font-semibold text-sidebar-foreground text-[14px]">Explore</span>
          </SidebarGroupLabel>
          <SidebarMenu className="flex flex-col gap-0.5">

            {/* Animated — collapsible, expands to all animated component categories */}
            <ExploreCollapsibleItem
              title="Animated"
              titleUrl="/animated-components"
              icon={SparklesIcon}
              items={componentCategories}
              isAnyChildActive={location.pathname.startsWith("/animated-components")}
            />

            {/* Component — collapsible, expands to all UI component categories */}
            <ExploreCollapsibleItem
              title="Component"
              titleUrl="/components"
              icon={Component}
              items={uiComponentCategories}
              isAnyChildActive={location.pathname.startsWith("/components")}
            />
            {/* Blocks — collapsible, expands to all UI block categories */}
            <ExploreCollapsibleItem
              title="Blocks"
              titleUrl="/blocks"
              icon={CubeIcon}
              items={blockNavCategories}
              isAnyChildActive={location.pathname.startsWith("/blocks")}
            />
            {/* Dashboards — live; links directly to /dashboards */}
            <ExploreCollapsibleItem
              title="Dashboards"
              titleUrl="/dashboards"
              icon={DashboardSquare01Icon}
              items={[]}
              isAnyChildActive={location.pathname.startsWith("/dashboard")}
            />
            {/* Templates — coming soon; not expandable yet */}
            <ExploreComingSoonItem title="Templates" icon={Layout01Icon} />
          </SidebarMenu>
        </SidebarGroup>

        {/* ── Legal — collapsible row with shield icon + chevron ── */}
        {/* group class enables group-data-[state] selectors on child elements */}
        {/*
          group/legal — named group scoped to THIS collapsible only.
          Without a name, group-data-[state=open] can also match sidebar ancestors
          that use `group` + their own data-state (e.g. data-state="expanded"),
          which silently breaks the selector. Naming the group prevents that.
        */}
        <Collapsible className="mt-auto mb-2 group/legal">
          <CollapsibleTrigger asChild>
            {/* Row matches the Figma footer: [shield] Legal  [>] */}
            <button
              type="button"
              className="flex w-full items-center justify-between px-2 py-2 rounded-md hover:bg-accent/20 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                {/* Shield icon — matches the Figma legal row */}
                <HugeiconsIcon icon={AuctionIcon} size={18} className="shrink-0" />
                Legal
              </span>
              {/*
                group-data-[state=open]/legal reads data-state="open" specifically
                from the ancestor named group/legal (the Collapsible root above).
                Radix sets data-state="open" on Collapsible.Root when expanded.
              */}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                className="shrink-0 text-muted-foreground/60 transition-transform duration-200 group-data-[state=open]/legal:rotate-90"
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            {/* Legal sub-items — indented with a left accent border */}
            <SidebarMenu className="mt-1 ml-4 border-l border-border/60 pl-2">
              {legalLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size="sm"
                    isActive={location.pathname === item.url}
                    className="h-7 px-2"
                  >
                    <Link
                      to={item.url}
                      className="text-muted-foreground hover:text-foreground text-xs"
                    >
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>

      </SidebarContent>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <SidebarFooter className="border-t border-border bg-gray-100 dark:bg-neutral-900 dark:border-black shadow-[inset_0_1.5px_0_0_rgba(255,255,255,1)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] px-2">


        {/* ── Theme toggle row ──
            Matches the Figma footer row: [moon icon] Light/Dark Mode  [switch]
        */}
        <div className="flex items-center justify-between px-2 py-2 lg:hidden">
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            {/* Moon crescent SVG — matches the Figma icon exactly */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
              aria-hidden="true"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            {/* Label reflects current theme — "Light Mode" in light, "Dark Mode" in dark */}
            {isDark ? "Dark Mode" : "Light Mode"}
          </span>
          {/* Shadcn Switch — controlled by next-themes resolvedTheme */}
          <Switch
            checked={isDark}
            onCheckedChange={handleThemeToggle}
            aria-label="Toggle dark/light mode"
          />
        </div>

        {/* ── Socials section ──
            "Socials" label above the icon row, matching the Figma footer layout.
        */}
        <div className="px-2 pt-1 pb-0.5">
          <span className="text-xs font-medium text-muted-foreground">Socials</span>
        </div>
        {/* Social icon row — reuses the existing Socials component, stripped of its border/bg */}
        <div className="px-1">
          <Socials className="border-0 bg-transparent p-0 justify-start gap-2" />
        </div>

        {/* ── Copyright notice ── */}
        <span className="text-[10px] mt-1 px-2 text-muted-foreground">
          © {new Date().getFullYear()} Watermelon. All rights reserved.
        </span>

      </SidebarFooter>

      {/* Sidebar rail — invisible drag handle that lets users resize the sidebar */}
      <SidebarRail />
    </Sidebar>
  );
}

