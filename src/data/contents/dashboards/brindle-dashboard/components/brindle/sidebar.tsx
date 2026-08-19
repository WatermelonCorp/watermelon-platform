import { useState } from 'react'
import { DashboardLink, useDashboardNavigation } from './navigation'
import {
  BookOpenIcon,
  CreditCardIcon,
  LogOutIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon as LucideUserIcon,
} from 'lucide-react'
import {
  ArrowUpRightIcon,
  CloseIcon,
  QuestionIcon,
  SidebarCollapseIcon,
  ToggleIcon,
  UserIcon,
} from './icons'
import { BrindleLogo } from './logo'
import { useTheme } from './theme-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { currentUser, navigationGroups, policyQueriesData, type NavigationItem } from '../../data'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function UpgradeCard() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const { used, total } = policyQueriesData
  const totalSegments = 25
  const activeSegments = Math.round((used / total) * totalSegments)

  return (
    <div className="relative mb-2 flex flex-col gap-5 rounded-2xl border shadow-custom bg-card p-4 group-data-[collapsible=icon]:hidden">
      <div className="flex justify-end w-full">
        <Button
          size="icon-xs"
          variant="outline"
          onClick={() => setIsVisible(false)}
          className="size-6 bg-transparent"
          aria-label="Close upgrade card"
        >
          <CloseIcon className="size-2.5" />
        </Button>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between text-sm w-full">
          <span className="font-medium text-sidebar-foreground/70">
            Policy queries today
          </span>
          <span className="font-semibold text-foreground">{used}/{total}</span>
        </div>

        <div className="flex h-4 items-center gap-1.25 w-full">
          {Array.from({ length: totalSegments }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-full flex-1 rounded-lg',
                index < activeSegments ? 'bg-primary' : 'bg-muted',
              )}
            />
          ))}
        </div>
      </div>

      <Button
        type="button"
        className="h-10 w-full gap-2 font-medium"
      >
        <span>Upgrade plan</span>
        <ArrowUpRightIcon className="size-4" />
      </Button>
    </div>
  )
}


const menuButtonClassName = cn(
  'h-12 gap-2.5 rounded-lg px-3 text-base text-sidebar-foreground transition-colors border border-transparent hover:text-foreground hover:bg-secondary/70 [&_svg]:size-5!',
  'aria-[current=page]:shadow-[var(--custom-shadow)] aria-[current=page]:bg-secondary aria-[current=page]:border-border aria-[current=page]:font-medium aria-[current=page]:text-sidebar-accent-foreground',
  'data-open:bg-secondary data-open:border-border data-open:shadow-[var(--custom-shadow)] data-open:text-sidebar-accent-foreground',
  'group-data-[collapsible=icon]:size-12! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:[&>span]:hidden',
)

function NavItem({ item }: { item: NavigationItem }) {
  const { isMobile, setOpenMobile } = useSidebar()
  const { pathname } = useDashboardNavigation()
  const isActive = pathname === item.href || !!item.activePath && pathname.startsWith(item.activePath)

  return (
    <SidebarMenuButton
      asChild
      tooltip={item.name}
      className={menuButtonClassName}
    >
      <DashboardLink
        href={item.href}
        aria-current={isActive ? 'page' : undefined}
        onClick={() => {
          if (isMobile) setOpenMobile(false)
        }}
      >
        <item.icon />
        <span>{item.name}</span>
        {item.badge ? (
          <SidebarMenuBadge className="static ml-auto rounded-sm bg-secondary px-1.5 py-0.5 h-fit min-w-0 leading-none text-sm font-normal text-sidebar-foreground/70 shadow-[0_0.2px_4px_0_rgba(0,0,0,0.05)] group-aria-[current=page]/menu-button:shadow-none! group-aria-[current=page]/menu-button:font-medium group-aria-[current=page]/menu-button:text-sidebar-accent-foreground">
            {item.badge}
          </SidebarMenuBadge>
        ) : null}
      </DashboardLink>
    </SidebarMenuButton>
  )
}

function HelpItem() {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className={menuButtonClassName}>
            <QuestionIcon />
            <span>Help</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="start"
          className="brindle-dashboard w-56"
        >
          <DropdownMenuLabel className="font-normal">
            <p className="text-sm font-medium text-foreground">Need help?</p>
            <p>Guides, docs, and support for Brindle.</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <a href="https://docs.brindle.com" target="_blank" rel="noreferrer">
                <BookOpenIcon />
                Documentation
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a
                href="https://brindle.com/support"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircleIcon />
                Contact support
              </a>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

function DarkModeItem() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const label = isDark ? 'Light Mode' : 'Dark Mode'

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={label}
        className={menuButtonClassName}
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        <ToggleIcon pressed={isDark} />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function ProfileItem() {
  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton tooltip="Profile" className={menuButtonClassName}>
            <UserIcon />
            <span>Profile</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="start"
          className="brindle-dashboard w-56"
        >
          <DropdownMenuLabel className="font-normal">
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">
                {currentUser.name}
              </p>
              <p>{currentUser.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <LucideUserIcon />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Billing
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  )
}

function CollapseControl({
  collapsed,
  onToggle,
}: {
  collapsed: boolean
  onToggle: () => void
}) {
  if (!collapsed) {
    return (
      <Button
        variant="secondary"
        onClick={onToggle}
        aria-label="Collapse sidebar"
        className="size-9.5 shadow-custom border"
      >
        <SidebarCollapseIcon className="-rotate-90 size-4" />
      </Button>
    )
  }

  return (
    <div className="relative size-11 shrink-0">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-all ease-linear group-hover:scale-75 group-hover:opacity-0">
        <BrindleLogo className="size-6" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex scale-75 items-center justify-center opacity-0 transition-all ease-linear group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100">
        <Button
          variant="secondary"
          onClick={onToggle}
          aria-label="Expand sidebar"
          className="size-11 shadow-custom border"
        >
          <SidebarCollapseIcon className="rotate-90 size-4" />
        </Button>
      </div>
    </div>
  )
}

export function DashboardSidebar() {
  const { state, toggleSidebar } = useSidebar()
  const collapsed = state === 'collapsed'

  return (
    <Sidebar collapsible="icon" className="h-full">
      <SidebarHeader
        className={cn(
          'h-16 flex-row items-center border-b border-sidebar-border transition-[padding] brindle-dashboard',
          collapsed ? 'justify-start px-3' : 'justify-between gap-4.75 px-4',
        )}
      >
        {!collapsed && (
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <BrindleLogo className="size-8 shrink-0" />
            <span className="truncate text-xl font-semibold">Brindle</span>
          </div>
        )}
        <CollapseControl collapsed={collapsed} onToggle={toggleSidebar} />
      </SidebarHeader>

      <SidebarContent className="gap-4 brindle-dashboard overflow-x-hidden overflow-y-auto px-3 py-4 group-data-[collapsible=icon]:overflow-y-auto!">
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label} className="gap-2 p-0">
            <SidebarGroupLabel className="h-auto px-3 py-1 text-sm font-mono uppercase text-muted-foreground/70">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <NavItem item={item} />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border px-3 py-3 brindle-dashboard">
        <UpgradeCard />
        <SidebarMenu className="gap-2">
          <HelpItem />
          <DarkModeItem />
          <ProfileItem />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
