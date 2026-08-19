import { Fragment, useEffect, useRef, useState } from 'react'
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon as LucideUserIcon,
} from 'lucide-react'
import {
  BellIcon,
  CaretDownIcon,
  CloseIcon,
  CommandIcon,
  SearchIcon,
} from './icons'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { DashboardLink, useDashboardNavigation } from './navigation'
import { currentUser, getBreadcrumbs, notifications } from '../../data'

export function DashboardTopbar() {
  const { pathname } = useDashboardNavigation()
  const breadcrumbs = getBreadcrumbs(pathname)

  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchInputRef = useRef<HTMLInputElement>(null)

  const openMobileSearch = () => {
    setIsMobileSearchOpen(true)
    requestAnimationFrame(() => {
      mobileSearchInputRef.current?.focus()
    })
  }

  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (window.matchMedia('(max-width: 767px)').matches) {
          setIsMobileSearchOpen(true)
          requestAnimationFrame(() => {
            mobileSearchInputRef.current?.focus()
          })
          return
        }
        searchInputRef.current?.focus()
      }
      if (event.key === 'Escape') {
        setIsMobileSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 md:px-8 bg-background">
      {isMobileSearchOpen ? (
        <div className="flex w-full items-center gap-2 md:hidden">
          <InputGroup className="h-10 w-full flex-1 border rounded-lg shadow-custom bg-secondary py-1 pr-2 pl-3">
            <InputGroupAddon className="pl-0 text-muted-foreground/70">
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              ref={mobileSearchInputRef}
              className="h-full p-0 px-1.5! text-sm leading-5 tracking-tight placeholder:text-muted-foreground"
              aria-label="Find a control"
              placeholder="find a control"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </InputGroup>
          <Button
            type="button"
            variant="secondary"
            size="icon-lg"
            className="size-10 shrink-0 rounded-lg shadow-custom"
            aria-label="Close search"
            onClick={closeMobileSearch}
          >
            <CloseIcon className="size-4.5 text-muted-foreground" />
          </Button>
        </div>
      ) : null}

      <div
        className={`${isMobileSearchOpen ? 'hidden' : 'flex'} min-w-0 flex-1 items-center gap-2 md:flex`}
      >
        <SidebarTrigger
          variant="secondary"
          size="icon-lg"
          className="size-10 shrink-0 shadow-custom md:hidden [&_svg]:size-5!"
        />
        <Breadcrumb className="mr-auto hidden min-w-0 md:block">
          <BreadcrumbList className="flex-nowrap text-base">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1

              return (
                <Fragment key={crumb.href}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem className="min-w-0">
                    {isLast ? (
                      <BreadcrumbPage className="truncate font-medium">{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <DashboardLink href={crumb.href}>{crumb.label}</DashboardLink>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <InputGroup className="hidden h-10 w-76.5 border max-w-full rounded-lg shadow-custom bg-secondary py-1 pr-2 pl-3 md:flex">
          <InputGroupAddon className="pl-0 text-muted-foreground/70">
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            ref={searchInputRef}
            className="h-full p-0 px-1.5! text-sm leading-5 tracking-tight placeholder:text-muted-foreground"
            aria-label="Find a control"
            placeholder="find a control"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {searchQuery === '' ? (
            <InputGroupAddon
              align="inline-end"
              className="pr-0 text-muted-foreground/70"
            >
              <div className="flex h-5.5 w-9.5 items-center justify-center gap-1 rounded-md bg-muted/70 px-2 py-1.5">
                <CommandIcon className="size-3! shrink-0" />
                <span className="text-sm leading-none">K</span>
              </div>
            </InputGroupAddon>
          ) : null}
        </InputGroup>
      </div>

      <div
        className={`${isMobileSearchOpen ? 'hidden' : 'flex'} shrink-0 items-center gap-2 md:flex`}
      >
        <Button
          type="button"
          variant="secondary"
          size="icon-lg"
          className="size-10 rounded-lg md:hidden shadow-custom"
          aria-label="Open search"
          onClick={openMobileSearch}
        >
          <SearchIcon className="size-4 text-muted-foreground" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              size="icon-lg"
              className="relative size-10 shadow-custom"
              aria-label="Notifications"
            >
              <BellIcon className="text-muted-foreground" />
              <span className="absolute top-2.5 right-3 size-1.5 shrink-0 rounded-full bg-destructive" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="brindle-dashboard w-72 mr-4.75">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="items-start py-2">
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.description}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground opacity-50">
                      {notification.time}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center hover:underline focus:bg-transparent">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="secondary"
              className="h-10 max-md:size-10 shadow-custom data-open:[&_svg]:rotate-180 data-[state=open]:[&_svg]:rotate-180 max-md:p-0"
              aria-label="Account menu"
            >
              <img
                src={currentUser.avatar}
                alt=""
                className="size-9 md:size-5 rounded-md bg-muted-foreground/70 object-cover"
              />
              <div className="items-center gap-1.5 hidden md:flex">
                <span>{currentUser.name}</span>
                <CaretDownIcon className="size-4 text-muted-foreground transition-transform" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="brindle-dashboard w-56">
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
      </div>
    </header>
  )
}