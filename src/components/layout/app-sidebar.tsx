import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
} from "@/lib/hugeicons";
import { allCategories } from "@/data/animated-components-registry";
import { uiCategories } from "@/data/components-registry";
import { dashboards } from "@/data/dashboards";
import { blockCategories } from "@/data/blocks";
import { Link, useLocation } from "react-router-dom";
import { memo, useEffect, useMemo } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Socials } from "./socials";

// Memoized menu item to prevent unnecessary re-renders
const NavItem = memo(function NavItem({
  title,
  url,
  isActive,
}: {
  title: string;
  url: string;
  isActive: boolean;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        size="default"
        isActive={isActive}
        className="h-6 md:h-5 px-2.5"
      >
        <Link
          to={url}
          className="text-muted-foreground hover:text-foreground text-xs"
        >
          {title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

// Memoized section component
const NavSection = memo(function NavSection({
  title,
  items,
  defaultOpen = false,
  pathname,
  titleLink,
  indentItems = false,
}: {
  title: string;
  items: { title: string; url: string }[];
  defaultOpen?: boolean;
  pathname: string;
  titleLink?: string;
  indentItems?: boolean;
}) {
  return (
    <SidebarGroup>
      <Collapsible defaultOpen={defaultOpen}>
        <CollapsibleTrigger className="w-full min-h-8">
          {titleLink ? (
            <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-accent rounded-md px-2 py-1.5 min-h-8">
              <Link to={titleLink} className="w-full text-start block py-1.5">
                <span className="font-semibold inline-block w-[80%]">{title}</span>
              </Link>
              <HugeiconsIcon icon={ArrowDown01Icon} size={14} className="transition-transform" />
            </SidebarGroupLabel>
          ) : (
            <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-accent rounded-md px-2 py-1.5 min-h-8">
              <span className="font-semibold">{title}</span>
              <HugeiconsIcon icon={ArrowDown01Icon} size={14} className="transition-transform" />
            </SidebarGroupLabel>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu
            className={
              indentItems
                ? "mt-1 ml-2 border-l border-border/60 pl-2"
                : "mt-1"
            }
          >
            {items.map((item) => (
              <NavItem
                key={item.title}
                title={item.title}
                url={item.url}
                isActive={pathname === item.url}
              />
            ))}
          </SidebarMenu>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
});

// Helper to format category name (e.g., "buttons" -> "Buttons")
function formatCategoryName(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function AppSidebar() {
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile, location.pathname, location.search, location.hash, setOpenMobile]);

  const quickStart = [
    { title: "Installation", url: "/installation" },
    { title: "Framework Support", url: "/framework-support" },
    { title: "Changelog", url: "/changelog" },
  ];

  const legalLinks = [
    { title: "Terms", url: "/terms" },
    { title: "Privacy", url: "/privacy" },
    { title: "Copyright", url: "/copyright" },
  ];

  // Generate component categories from registry
  const componentCategories = useMemo(() =>
    allCategories.map((category) => ({
      title: formatCategoryName(category),
      url: `/animated-components/category/${category}`,
    })),
    []
  );

  // Generate new UI component categories from ui-registry
  const uiComponentCategories = useMemo(() => [
    ...uiCategories.map((cat) => ({
      title: cat.label,
      url: `/components/${cat.slug}`,
    })),
  ], []);

  // Generate block category items from registry
  const blockItems = useMemo(() =>
    blockCategories.map((cat) => ({
      title: cat.label,
      url: `/blocks/${cat.slug}`,
    })),
    []
  );

  // Generate dashboard items from registry
  const dashboardItems = useMemo(() =>
    dashboards.map((dashboard) => ({
      title: dashboard.name,
      url: `/dashboard/${dashboard.slug}`,
    })),
    []
  );

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="p-3">
        <div className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-accent dark:hover:bg-accent/20 transition-colors duration-200 ease-in-out">
          <Logo />
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="scrollbar-hide">

        <NavSection
          title="Quick Start"
          items={quickStart}
          defaultOpen
          pathname={location.pathname}
          indentItems
        />
        <SidebarGroup className="pb-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === "/"}
                className="px-2 py-1.5 min-h-8 hover:bg-accent"
              >
                <Link to="/" className="w-full text-muted-foreground hover:text-foreground">
                  <span className="font-semibold text-xs">Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavSection
          title="Components"
          items={uiComponentCategories}
          defaultOpen
          pathname={location.pathname}
          titleLink="/components"
          indentItems
        />
        <NavSection
          title="Animated Components"
          items={componentCategories}
          defaultOpen
          pathname={location.pathname}
          titleLink="/animated-components"
          indentItems
        />
        <NavSection
          title="Blocks"
          items={blockItems}
          pathname={location.pathname}
          titleLink="/blocks"
          indentItems
        />

        <NavSection
          title="Dashboards"
          items={dashboardItems}
          pathname={location.pathname}
          titleLink="/dashboards"
          indentItems
        />

        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between px-2 py-1.5 min-h-6">
            <span className="font-semibold text-muted-foreground/60">Templates</span>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">Coming Soon</span>
          </SidebarGroupLabel>
        </SidebarGroup>
        <NavSection
          title="Legal"
          items={legalLinks}
          defaultOpen
          pathname={location.pathname}
          indentItems
        />

      </SidebarContent>
      <SidebarFooter className="p-3 border-t -mx-2">
        <div className="flex items-center justify-between">
          <ThemeToggle />
          <Socials />
        </div>
        <span className="text-[10px] mt-2 text-muted-foreground">© {new Date().getFullYear()} Watermelon. All rights reserved.</span>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
