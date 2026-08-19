import {
  AlarmClockIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
  CloseIcon,
  FadersHorizontalIcon,
  FileArrowUpIcon,
  FileTextIcon,
  PlusIcon,
  StatusWarningIcon,
  ShieldCheckIcon,
  CurrencyCircleDollarIcon,
  ArrowsCounterClockwiseIcon,
  TrendDownIcon,
  TrendRightIcon,
  TrendUpIcon,
  WarningTriangleIcon,
} from './icons'
import { NameAvatar } from './shared'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import {
  dashboardActivities,
  dashboardHeader,
  dashboardInsights,
  dashboardClients,
  dashboardRenewals,
  dashboardRisks,
  dashboardStatCards,
  getClientPath,
  type ClientMetaStatus,
  type ClientStatus,
} from '../../data'
import { useState } from 'react'
import { useDashboardNavigation } from './navigation'

type ClientCardData = (typeof dashboardClients)[number]

const CLIENT_STATUSES: ClientStatus[] = [
  "Active",
  "Claim",
  "Review",
  "Pending",
  "Lapsed",
]
const STATUS_ICONS = {
  Active: CheckCircleIcon,
  Claim: FileTextIcon,
  Review: StatusWarningIcon,
  Pending: AlarmClockIcon,
  Lapsed: CloseIcon,
}

function StatusTag({ status }: { status: ClientCardData["status"] }) {
  const styles = {
    Active:
      "bg-[var(--stat-green)]/10 text-[var(--stat-green)] border-[var(--stat-green)]/20",
    Claim:
      "bg-[var(--stat-violet)]/10 text-[var(--stat-violet)] border-[var(--stat-violet)]/20",
    Review:
      "bg-[var(--stat-orange)]/10 text-[var(--stat-orange)] border-[var(--stat-orange)]/20",
    Pending:
      "bg-[var(--stat-orange)]/10 text-[var(--stat-orange)] border-[var(--stat-orange)]/20",
    Lapsed:
      "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20",
  }

  return (
    <span
      className={cn(
        "rounded-full border px-3 py-0.5 text-xs shadow-[var(--badge-inner-shadow)]",
        styles[status],
      )}
    >
      {status}
    </span>
  )
}

type StatCardProps = {
  title: string
  value: string | number
  icon: typeof ShieldCheckIcon
  trend: {
    value?: string | number
    label: string
    direction: "up" | "down" | "neutral"
  }
  chart: { bars: readonly number[]; color: "green" | "violet" | "orange" | "primary" }
  className?: string
}

function StatCard({
  chart,
  className,
  icon: Icon,
  title,
  trend,
  value,
}: StatCardProps) {
  const colorMap = {
    green: {
      bar: "bg-[var(--stat-green)]",
      barMuted: "bg-[var(--stat-green)]/20",
    },
    violet: {
      bar: "bg-[var(--stat-violet)]",
      barMuted: "bg-[var(--stat-violet)]/20",
    },
    orange: {
      bar: "bg-[var(--stat-orange)]",
      barMuted: "bg-[var(--stat-orange)]/20",
    },
    primary: { bar: "bg-primary", barMuted: "bg-primary/20" },
  }
  const colors = colorMap[chart.color]

  return (
    <div
      className={cn(
        "flex h-38 min-w-0 flex-col justify-between p-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="size-5 shrink-0" />
        <span className="truncate text-sm font-medium tracking-tight">
          {title}
        </span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-3">
          <span className="text-3xl leading-none font-medium tracking-tight">
            {value}
          </span>
          <div className="flex items-center gap-1.5 text-xs">
            {trend.direction === "up" && (
              <>
                <span className="flex items-center gap-1 text-[var(--stat-green)]">
                  <TrendUpIcon className="size-3.5" />
                  {trend.value}
                </span>
                <span className="text-muted-foreground">{trend.label}</span>
              </>
            )}
            {trend.direction === "down" && (
              <>
                <span className="flex items-center gap-1 text-[var(--danger)]">
                  <TrendDownIcon className="size-3.5" />
                  {trend.value}
                </span>
                <span className="text-muted-foreground">{trend.label}</span>
              </>
            )}
            {trend.direction === "neutral" && (
              <span className="flex items-center gap-1 text-primary">
                <TrendRightIcon className="size-3.5" />
                {trend.label}
              </span>
            )}
          </div>
        </div>
        <div className="flex h-8 w-16 shrink-0 items-end justify-between">
          {chart.bars.map((bar, index) => (
            <div
              key={index}
              className={cn(
                "w-1.25 shrink-0 rounded-xs",
                index === chart.bars.length - 1 ? colors.bar : colors.barMuted,
              )}
              style={{ height: `${Math.max(bar, 6)}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ClientMeta({ icon: Icon, text, prefix }: ClientMetaStatus) {
  if (!text) return null

  return (
    <span className="flex min-w-0 items-center gap-1 rounded-full border px-2 py-1.5">
      {Icon && <Icon className="size-3 shrink-0" />}
      {prefix && <span className="shrink-0 text-muted-foreground">{prefix}</span>}
      <span className="truncate font-medium">{text}</span>
    </span>
  )
}

function ClientCard({ client }: { client: ClientCardData }) {
  const { navigate } = useDashboardNavigation()
  return (
    <button
      type="button"
      onClick={() => navigate(getClientPath(client.id))}
      className="flex min-w-0 flex-col gap-6 rounded-2xl bg-card p-3 text-left shadow-custom transition-colors hover:bg-muted cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <NameAvatar name={client.name} />
        <StatusTag status={client.status} />
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex flex-col gap-1 border-b pb-3">
          <div className="truncate text-base font-medium">{client.name}</div>
          <div className="truncate text-xs text-muted-foreground">
            {client.type}
          </div>
        </div>
        <div className="flex min-w-0 items-center gap-2 text-xs">
          {client.meta.map((status, index) => <ClientMeta key={index} {...status} />)}
        </div>
      </div>
    </button>
  )
}

function InsightCard() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl bg-card p-3 shadow-custom">
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
        {dashboardInsights.map((insight) => (
          <div
            key={insight}
            className="rounded-lg border/60 bg-muted/50 p-3 text-sm leading-snug text-muted-foreground"
          >
            “{insight}”
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between gap-3 border-t pt-3">
        <Button variant="secondary" className="h-9 shadow-custom">
          <span>Dismiss</span>
          <CloseIcon className="size-4" />
        </Button>
        <Button className="h-9 shadow-custom">
          <span>Open report</span>
          <TrendRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}

function ActivityFeed() {
  return (
    <div className="rounded-2xl bg-card p-3 shadow-custom">
      {dashboardActivities.map(([time, title, subtitle], index) => (
        <div
          key={title}
          className={cn(
            "grid grid-cols-[4.5rem_1fr] gap-3 py-3.5",
            index !== dashboardActivities.length - 1 && "border-b",
          )}
        >
          <div className="text-xxs">{time}</div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{title}</div>
            <div className="mt-1 truncate text-xs text-muted-foreground">
              {subtitle}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function RenewalList() {
  const tone = {
    danger:
      "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20",
    warning:
      "bg-[var(--stat-orange)]/10 text-[var(--stat-orange)] border-[var(--stat-orange)]/20",
    primary: "bg-primary/10 text-primary border-primary/20",
  }

  return (
    <div className="rounded-2xl bg-card px-4 py-3 shadow-custom">
      {dashboardRenewals.map((item, index) => (
        <div
          key={`${item.name}-${item.time}`}
          className={cn(
            "flex items-center justify-between gap-3 py-3.5",
            index !== dashboardRenewals.length - 1 && "border-b",
          )}
        >
          <div className="flex min-w-0 items-center gap-3">
            <NameAvatar name={item.name} className="size-8" />
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{item.name}</div>
              <div className="mt-1.5 truncate text-xs text-muted-foreground">
                {item.type}
              </div>
            </div>
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full border px-3 py-0.5 text-xs shadow-[var(--badge-inner-shadow)]",
              tone[item.tone],
            )}
          >
            {item.time}
          </span>
        </div>
      ))}
    </div>
  )
}

function PortfolioRisk() {
  const tone = {
    violet: "bg-[var(--stat-violet)]",
    primary: "bg-primary",
    orange: "bg-[var(--stat-orange)]",
    green: "bg-[var(--stat-green)]",
  }

  return (
    <div className="rounded-2xl bg-card px-4 py-3 shadow-custom">
      {dashboardRisks.map((item, index) => (
        <div
          key={item.label}
          className={cn(
            "grid grid-cols-[5.25rem_1fr_auto] items-center gap-4 py-3.5",
            index !== dashboardRisks.length - 1 && "border-b",
          )}
        >
          <div className="text-sm font-medium">{item.label}</div>
          <div className="flex h-4 items-center gap-1">
            {Array.from({ length: item.bars }).map((_, barIndex) => (
              <span
                key={barIndex}
                className={cn("h-full w-1 rounded-full", tone[item.tone])}
              />
            ))}
          </div>
          <div className="text-sm font-medium">{item.score}</div>
        </div>
      ))}
    </div>
  )
}

export function DashboardPage() {
  const [visibleStatuses, setVisibleStatuses] = useState<ClientStatus[]>(CLIENT_STATUSES)
  const filteredClients = dashboardClients.filter((client) => visibleStatuses.includes(client.status))
  const activePolicies = filteredClients.filter((client) => client.status === "Active").length
  const premiumsCollected = filteredClients.reduce((total, client) => total + client.premium, 0)
  const openClaims = filteredClients.filter((client) => client.status === "Claim").length
  const retentionRate = filteredClients.length
    ? Math.round(
      (filteredClients.filter((client) => client.status !== "Lapsed")
        .length /
        filteredClients.length) *
      100,
    )
    : 0

  return (
    <div className="@container space-y-8 px-4 py-6 md:px-6 md:py-8">
      <div className="flex w-full min-w-0 flex-col gap-4 @3xl:flex-row @3xl:items-end @3xl:justify-between">
        <div className="flex min-w-0 flex-col gap-3.5">
          <h1 className="text-2xl md:text-[1.75rem] font-medium tracking-tight">
            {dashboardHeader.greeting}
          </h1>

          <div className="flex min-w-0 items-center gap-2">
            <div className="flex shrink-0 items-center gap-2 rounded-full border bg-secondary px-3 py-1.5 text-sm text-muted-foreground">
              <AlarmClockIcon className='size-3' />
              <span>{dashboardHeader.renewalsDue} renewals <span className='hidden sm:inline'>due this week</span></span>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-full bg-[var(--stat-orange)]/10 px-3 py-1.5 text-sm text-[var(--stat-orange)]">
              <WarningTriangleIcon className='size-3' />
              <span>{dashboardHeader.claimsForReview} claims <span className='hidden sm:inline'>require your review</span></span>
            </div>
          </div>
        </div>

        <div className="flex w-full shrink-0 items-center justify-between gap-2 @3xl:w-auto @3xl:justify-end">
          <Button
            type="button"
            size="lg"
            className="h-10"
          >
            <span>New Policy</span>
            <PlusIcon className="size-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="h-10 shadow-custom"
            >
              <span>Export</span>
              <FileArrowUpIcon className="size-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="h-10 shadow-custom"
                >
                  <span>Filter</span>
                  <FadersHorizontalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="brindle-dashboard w-48"
              >
                <DropdownMenuLabel>Policy status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {CLIENT_STATUSES.map((status) => {
                  const StatusIcon = STATUS_ICONS[status]
                  const selected = visibleStatuses.includes(status)
                  return (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={selected}
                      onSelect={(event) => event.preventDefault()}
                      onCheckedChange={(checked) =>
                        setVisibleStatuses((current) =>
                          checked
                            ? [...new Set([...current, status])]
                            : current.filter((item) => item !== status),
                        )
                      }
                      className={cn(
                        "text-muted-foreground",
                        selected && "font-medium text-foreground",
                      )}
                    >
                      <StatusIcon className="size-4" />
                      <span>{status}</span>
                    </DropdownMenuCheckboxItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-card shadow-custom sm:grid-cols-2 xl:grid-cols-4">
        <StatCard {...dashboardStatCards.activePolicies} value={activePolicies} icon={ShieldCheckIcon} />
        <StatCard {...dashboardStatCards.premiumsCollected} value={`$${premiumsCollected.toLocaleString()}`} icon={CurrencyCircleDollarIcon} className="border-t sm:border-t-0 sm:border-l xl:border-l" />
        <StatCard {...dashboardStatCards.openClaims} value={openClaims} icon={FileTextIcon} className="border-t sm:border-l xl:border-t-0 xl:border-l" />
        <StatCard {...dashboardStatCards.retentionRate} value={`${retentionRate}%`} icon={ArrowsCounterClockwiseIcon} className="border-t sm:border-l xl:border-t-0 xl:border-l" />
      </div>

      <div className="grid gap-4 @3xl:grid-cols-[minmax(0,3fr)_minmax(18rem,1fr)]">
        <section className="min-w-0 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Policy Portfolio</h2>
            <Button variant="secondary" className="h-9 shadow-custom">
              <span>View all {dashboardHeader.portfolioCount}</span>
              <ArrowUpRightIcon className="size-4" />
            </Button>
          </div>
          <div className="grid gap-2.5 @2xl:grid-cols-2 @4xl:grid-cols-3">
            {filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                client={client}
              />
            ))}
          </div>
        </section>

        <section className="flex min-h-0 min-w-0 flex-col gap-4">
          <div className="flex h-9 shrink-0 items-center justify-between">
            <h2 className="text-lg font-medium">AI Insights</h2>
            <Button
              variant="secondary"
              size="icon"
              className="size-9 shadow-custom"
            >
              <ArrowUpRightIcon className="size-4" />
            </Button>
          </div>
          <InsightCard />
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <section className="flex min-w-0 flex-col gap-3">
          <h2 className="text-lg font-medium">Activity Feed</h2>
          <div className="flex-1 [&>*]:h-full">
            <ActivityFeed />
          </div>
        </section>
        <section className="flex min-w-0 flex-col gap-3">
          <h2 className="text-lg font-medium">Upcoming Renewals</h2>
          <div className="flex-1 [&>*]:h-full">
            <RenewalList />
          </div>
        </section>
        <section className="flex min-w-0 flex-col gap-3">
          <h2 className="text-lg font-medium">Portfolio Risk</h2>
          <div className="flex-1 [&>*]:h-full">
            <PortfolioRisk />
          </div>
        </section>
      </div>
    </div>
  )
}
