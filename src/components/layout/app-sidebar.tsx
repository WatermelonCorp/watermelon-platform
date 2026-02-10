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
} from "@/components/ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDown01Icon,
} from "@/lib/hugeicons";
import { allCategories } from "@/data/registry";
import { dashboards } from "@/data/dashboards";
import { blocks } from "@/data/blocks";
import { Link, useLocation } from "react-router-dom";
import { memo, useMemo } from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Socials } from "./socials";

// Memoized menu item to prevent unnecessary re-renders
const NavItem = memo(function NavItem({
  title,
  url,
  isActive
}: {
  title: string;
  url: string;
  isActive: boolean;
}) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild size="lg" isActive={isActive}>
        <Link
          to={url}
          className="text-muted-foreground hover:text-foreground"
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
}: {
  title: string;
  items: { title: string; url: string }[];
  defaultOpen?: boolean;
  pathname: string;
  titleLink?: string;
}) {
  return (
    <SidebarGroup>
      <Collapsible defaultOpen={defaultOpen}>
        <CollapsibleTrigger className="w-full min-h-12">
          {titleLink ? (
            <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-accent rounded-md px-2 py-3 min-h-12">
              <Link to={titleLink} className="w-full text-start block py-3">
                <span className="font-semibold inline-block w-[80%]">{title}</span>
              </Link>
              <HugeiconsIcon icon={ArrowDown01Icon} size={14} className="transition-transform" />
            </SidebarGroupLabel>
          ) : (
            <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-accent rounded-md px-2 py-3 min-h-12">
              <span className="font-semibold">{title}</span>
              <HugeiconsIcon icon={ArrowDown01Icon} size={14} className="transition-transform" />
            </SidebarGroupLabel>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenu className="mt-1">
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

  const quickStart = [
    { title: "Installation", url: "/installation" },
    { title: "Basic Usage", url: "/basic-usage" },
    { title: "Framework Support", url: "/framework-support" },
    { title: "CLI", url: "/cli" },
  ];

  // Generate component categories from registry
  const componentCategories = useMemo(() =>
    allCategories.map((category) => ({
      title: formatCategoryName(category),
      url: `/components/category/${category}`,
    })),
    []
  );

  // Generate block items from registry
  const blockItems = useMemo(() =>
    blocks.map((block) => ({
      title: block.name,
      url: `/block/${block.slug}`,
    })),
    []
  );

  const templates = [
    { title: "React", url: "/templates/react" },
    { title: "Next.js", url: "/templates/nextjs" },
    { title: "Vue", url: "/templates/vue" },
    { title: "Svelte", url: "/templates/svelte" },
  ];

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
      <SidebarHeader className="p-4">
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
        />
        <NavSection
          title="Components"
          items={componentCategories}
          defaultOpen
          pathname={location.pathname}
          titleLink="/"
        />
        <NavSection
          title="Blocks"
          items={blockItems}
          pathname={location.pathname}
          titleLink="/blocks"
        />
        <NavSection
          title="Templates"
          items={templates}
          pathname={location.pathname}
        />
        <NavSection
          title="Dashboards"
          items={dashboardItems}
          pathname={location.pathname}
          titleLink="/dashboards"
        />
      </SidebarContent>
      <SidebarFooter className="p-4 border-t -mx-2">
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
