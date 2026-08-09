import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type SVGProps,
} from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  AlertDiamondIcon,
  AlertTriangleIcon,
  BatteryChargingIcon,
  BedIcon,
  BlingFilledIcon,
  CalendarIcon,
  HeartbeatFilledIcon,
  HeartbeatIcon,
  MoonStarsIcon,
  MoreVerticalIcon,
  NurseFilledIcon,
  TrendUpIcon,
  WalkIcon,
  WarningFilledIcon,
} from './icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  heatmapDateLabels,
  recoveryFactors,
  recoveryHeatmapData,
  type ActivityTrendPoint,
  type HeatmapColumn,
  type HeatmapTile,
  type HeatmapTileData,
  type KeyMetric,
  type KeyMetricIcon,
  type RecoveryFactor,
  type SleepBreakdownPoint,
  type SleepRecoveryTrendPoint,
} from '../../data'
import { cn } from '@/lib/utils'

export const CHART_THEME_COLORS = {
  recovery: '#19c035',
  sleep: '#3b82f6',
  indigo: '#6366f1',
  teal: '#14b8a6',
  heatmap: {
    low: '#d8faff',
    med: '#22d3ee',
    high: '#0091a8',
  },
} as const

const metricIcons: Record<
  KeyMetricIcon,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  heart: HeartbeatIcon,
  walk: WalkIcon,
  moon: MoonStarsIcon,
  battery: BatteryChargingIcon,
  heartbeat: HeartbeatFilledIcon,
  nurse: NurseFilledIcon,
}

export function KeyMetricCard({
  metric,
  className,
}: {
  metric: KeyMetric
  className?: string
}) {
  const Icon = metricIcons[metric.icon]
  const isUp = metric.trend.direction === 'up'

  return (
    <article
      className={cn(
        'flex min-h-37.5 min-w-0 flex-col justify-between rounded-2xl border p-4',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="flex size-7 shrink-0 items-center justify-center rounded-md text-white"
            style={{ backgroundColor: metric.iconBg }}
          >
            <Icon className="size-3.5" />
          </span>
          <p className="truncate text-sm font-medium tracking-tight">
            {metric.label}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              className="shrink-0 border-border/50"
              aria-label={`More about ${metric.label}`}
            >
              <MoreVerticalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bionis-dashboard min-w-max"
          >
            <DropdownMenuItem className="whitespace-nowrap">
              View details
            </DropdownMenuItem>
            <DropdownMenuItem className="whitespace-nowrap">
              View trend
            </DropdownMenuItem>
            <DropdownMenuItem className="whitespace-nowrap">
              Compare periods
            </DropdownMenuItem>
            <DropdownMenuItem className="whitespace-nowrap">
              Hide metric
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-3">
        <p className="leading-none">
          <span className="text-[1.75rem] font-medium">{metric.value}</span>{' '}
          <span className="text-base font-normal">{metric.unit}</span>
        </p>
        <div className="flex items-center gap-2">
          <TrendUpIcon
            className={cn(
              isUp ? 'text-(--trend)' : 'rotate-180 text-destructive',
            )}
          />
          <p className="text-xs">
            <span className="font-medium">{metric.trend.emphasis}</span>{' '}
            <span className="text-muted-foreground">{metric.trend.label}</span>
          </p>
        </div>
      </div>
    </article>
  )
}

type ScoreDonutProps = HTMLAttributes<HTMLDivElement> & {
  value: number
  max?: number
  label?: string
  color?: string
}

const CX = 56.5
const CY = 57
const OUTER_RADIUS = 53.675
const OUTER_STROKE = 5.65
const INNER_RADIUS = 48.45
const INNER_STROKE = 5.1

const CHART_ANIMATION_MS = 900
const AXIS_TICK = {
  fill: 'var(--chart-axis)',
  fontSize: 14,
  fontFamily: 'Geist, sans-serif',
} as const

export function ScoreDonut({
  value,
  max = 100,
  label = 'Score',
  color,
  className,
  style,
  ...props
}: ScoreDonutProps) {
  const circumference = 2 * Math.PI * INNER_RADIUS
  const progress = Math.min(Math.max(value / max, 0), 1)
  const targetOffset = circumference * (1 - progress)
  const [offset, setOffset] = useState(circumference)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    setOffset(circumference)

    if (reducedMotion) {
      setOffset(targetOffset)
      return
    }

    const frame = requestAnimationFrame(() => {
      setOffset(targetOffset)
    })

    return () => cancelAnimationFrame(frame)
  }, [circumference, targetOffset])

  return (
    <div
      className={cn('relative size-28.5 shrink-0', className)}
      style={
        {
          ...style,
          ...(color ? { '--score': color } : null),
        } as CSSProperties
      }
      {...props}
    >
      <svg
        viewBox="0 0 113 114"
        className="size-full -rotate-90"
        aria-hidden
      >
        <circle
          cx={CX}
          cy={CY}
          r={OUTER_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={OUTER_STROKE}
          className="text-(--score)/5"
        />
        <circle
          cx={CX}
          cy={CY}
          r={INNER_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={INNER_STROKE}
          className="text-(--score)/10"
        />
        <circle
          cx={CX}
          cy={CY}
          r={INNER_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={INNER_STROKE}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-(--score) transition-[stroke-dashoffset] duration-[900ms] ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs leading-[1.4] text-muted-foreground">
          {label}
        </span>
        <span className="text-[1.733rem] font-medium leading-[1.4] tabular-nums">
          {value}
        </span>
      </div>
    </div>
  )
}

type ChartTooltipItemProps = {
  label: string
  value: ReactNode
  color?: string
}

function ChartTooltipItem({ label, value, color }: ChartTooltipItemProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border/40 bg-background px-2 py-1.5">
      <div className="flex items-center gap-1.5 min-w-0">
        {color ? (
          <span
            className={cn(
              'size-1.5 rounded-xs shrink-0',
              color.startsWith('#') ? `bg-[${color}]` : color,
            )}
          />
        ) : null}
        <span className="truncate text-[11px] font-medium text-foreground">
          {label}
        </span>
      </div>
      <span className="text-[11px] font-medium text-foreground shrink-0">
        {value}
      </span>
    </div>
  )
}

type ChartTooltipFrameProps = {
  title?: ReactNode
  showCalendarIcon?: boolean
  children: ReactNode
}

function ChartTooltipFrame({
  title,
  showCalendarIcon = true,
  children,
}: ChartTooltipFrameProps) {
  return (
    <div className="bionis-dashboard flex min-w-36 flex-col gap-1 rounded-lg border bg-[var(--chart-tooltip-bg,#fafafa)]! dark:bg-[#171717]! p-1.5 text-xs shadow-md">
      {title ? (
        <div className="flex items-center gap-1.5 px-2 py-1 text-muted-foreground">
          {showCalendarIcon ? (
            <CalendarIcon className="size-3 text-muted-foreground shrink-0" />
          ) : null}
          <span className="text-[11px] font-normal text-[#676767] dark:text-muted-foreground">
            {title}
          </span>
        </div>
      ) : null}
      {children}
    </div>
  )
}

function SleepTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ value?: number }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  const hours = payload[0]?.value
  const isRange = typeof label === 'string' && label.includes('–')

  return (
    <ChartTooltipFrame title={label} showCalendarIcon={false}>
      <ChartTooltipItem
        label={isRange ? 'Avg sleep' : 'Sleep'}
        value={typeof hours === 'number' ? `${hours}h` : '—'}
        color={CHART_THEME_COLORS.sleep}
      />
    </ChartTooltipFrame>
  )
}

function ActivityTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{
    dataKey?: string | number
    value?: number
    payload?: ActivityTrendPoint
  }>
}) {
  if (!active || !payload?.length) return null

  const point = payload[0]?.payload
  const steps = payload.find((item) => item.dataKey === 'steps')?.value
  const recovery = payload.find((item) => item.dataKey === 'recovery')?.value

  return (
    <ChartTooltipFrame title={point?.fullDate ?? point?.label ?? '—'}>
      <ChartTooltipItem
        label="Steps"
        value={
          typeof steps === 'number'
            ? `${(Math.round(steps * 10) / 10).toFixed(1)}k`
            : '—'
        }
        color={CHART_THEME_COLORS.recovery}
      />
      <ChartTooltipItem
        label="Recovery"
        value={typeof recovery === 'number' ? Math.round(recovery * 10) : '—'}
        color={CHART_THEME_COLORS.sleep}
      />
    </ChartTooltipFrame>
  )
}

type SleepBarShapeProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  active?: boolean
}

function SleepBarShape({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  active = false,
}: SleepBarShapeProps) {
  if (height <= 0) return null
  const cap = 3
  const bodyHeight = Math.max(height - cap, 0)

  return (
    <g>
      {active ? (
        <rect
          x={x - 1}
          y={y - 1}
          width={width + 2}
          height={height + 1}
          rx={2}
          fill="var(--chart-sleep)"
          opacity={0.12}
        />
      ) : null}
      <rect
        x={x}
        y={y + cap}
        width={width}
        height={bodyHeight}
        fill={active ? 'var(--chart-sleep)' : 'var(--chart-sleep-fill)'}
        opacity={active ? 0.28 : 1}
      />
      <rect
        x={x}
        y={y}
        width={width}
        height={cap}
        fill="var(--chart-sleep)"
      />
    </g>
  )
}

function SleepAxisTick({
  x,
  y,
  index,
  data,
}: {
  x?: number | string
  y?: number | string
  index?: number
  data: SleepBreakdownPoint[]
}) {
  const point = typeof index === 'number' ? data[index] : undefined
  if (!point || x == null || y == null) return null

  const tickX = typeof x === 'number' ? x : Number(x)
  const tickY = typeof y === 'number' ? y : Number(y)
  if (Number.isNaN(tickX) || Number.isNaN(tickY)) return null

  const lines = point.labelLines
  const lineHeight = 12

  return (
    <text
      x={tickX}
      y={tickY + 8}
      textAnchor="middle"
      fill="#a1a1aa"
      fontSize={10}
      fontFamily="Geist, sans-serif"
    >
      {lines.map((line, lineIndex) => (
        <tspan
          key={`${point.label}-${lineIndex}`}
          x={tickX}
          dy={lineIndex === 0 ? 0 : lineHeight}
        >
          {line}
        </tspan>
      ))}
    </text>
  )
}

export function SleepBreakdownChart({
  data,
  flaggedNights,
  className,
}: {
  data: SleepBreakdownPoint[]
  flaggedNights: number
  className?: string
}) {
  return (
    <article
      className={cn(
        'flex min-h-106.5 flex-col gap-8 rounded-2xl border bg-background p-4',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: CHART_THEME_COLORS.indigo }}
          >
            <MoonStarsIcon className="size-4.5" />
          </span>
          <h3 className="text-lg font-medium">Sleep breakdown</h3>
        </div>
        <span className="h-8 inline-flex shrink-0 items-center gap-2 rounded-xl bg-(--chart-warn-bg) py-1 pr-4 pl-3 text-sm font-medium text-(--chart-warn)">
          <WarningFilledIcon className="size-5" />
          {flaggedNights} nights flagged
        </span>
      </div>

      <div className="h-82.5 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 18 }}
            barCategoryGap="18%"
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--chart-grid)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={(props) => <SleepAxisTick {...props} data={data} />}
              height={36}
            />
            <YAxis
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
              tickFormatter={(value: number) => `${value}h`}
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
              width={36}
            />
            <Tooltip cursor={false} content={<SleepTooltip />} />
            <Bar
              dataKey="hours"
              shape={<SleepBarShape />}
              activeBar={<SleepBarShape active />}
              isAnimationActive
              animationDuration={CHART_ANIMATION_MS}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}

function ActivityAxisTick({
  x,
  y,
  index,
  data,
}: {
  x?: number | string
  y?: number | string
  index?: number
  data: ActivityTrendPoint[]
}) {
  const point = typeof index === 'number' ? data[index] : undefined
  if (!point?.showTick || x == null || y == null) return null

  const tickX = typeof x === 'number' ? x : Number(x)
  const tickY = typeof y === 'number' ? y : Number(y)
  if (Number.isNaN(tickX) || Number.isNaN(tickY)) return null

  return (
    <text
      x={tickX}
      y={tickY + 10}
      textAnchor="middle"
      fill="#a1a1aa"
      fontSize={10}
      fontFamily="Geist, sans-serif"
    >
      {point.label}
    </text>
  )
}

export function ActivityTrendChart({
  data,
  periodLabel,
  className,
}: {
  data: ActivityTrendPoint[]
  periodLabel: string
  className?: string
}) {
  const reactId = useId().replace(/:/g, '')
  const stepsGradientId = `steps-fill-${reactId}`
  const recoveryGradientId = `recovery-fill-${reactId}`

  return (
    <article
      className={cn(
        'flex min-h-106.5 flex-col gap-4 rounded-2xl border bg-background p-4',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-(--chart-sleep) text-white">
            <HeartbeatIcon className="size-4.5" />
          </span>
          <h3 className="text-lg font-medium">Activity & HRV trend</h3>
        </div>
        <span className="h-8 inline-flex shrink-0 items-center rounded-xl bg-(--chart-period-bg) px-3 py-1 text-sm font-medium text-(--chart-period)">
          {periodLabel}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3.5 sm:justify-end">
        <div className="flex items-center gap-2 text-sm font-medium text-(--chart-axis)">
          <span className="size-2 rounded-full bg-(--chart-steps)" />
          Steps (Ã·1000)
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-(--chart-axis)">
          <span className="size-2 rounded-full bg-(--chart-recovery)" />
          Recovery score (Ã·10)
        </div>
      </div>

      <div className="h-75 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={stepsGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--chart-steps)"
                  stopOpacity={0.88}
                />
                <stop
                  offset="50%"
                  stopColor="var(--chart-steps)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient
                id={recoveryGradientId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="var(--chart-recovery)"
                  stopOpacity={0.88}
                />
                <stop
                  offset="50%"
                  stopColor="var(--chart-recovery)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--chart-grid)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="dateKey"
              axisLine={false}
              tickLine={false}
              interval={0}
              minTickGap={0}
              tick={(props) => <ActivityAxisTick {...props} data={data} />}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
              width={36}
            />
            <Tooltip
              cursor={{
                stroke: 'var(--foreground)',
                strokeWidth: 1,
                strokeDasharray: '4 4',
                strokeOpacity: 0.35,
              }}
              content={<ActivityTooltip />}
            />
            <Area
              type="monotone"
              dataKey="steps"
              stroke="var(--chart-steps)"
              strokeWidth={2}
              fill={`url(#${stepsGradientId})`}
              isAnimationActive
              animationDuration={CHART_ANIMATION_MS}
              animationEasing="ease-out"
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="recovery"
              stroke="var(--chart-recovery)"
              strokeWidth={2}
              fill={`url(#${recoveryGradientId})`}
              isAnimationActive
              animationDuration={CHART_ANIMATION_MS}
              animationEasing="ease-out"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}

function SleepRecoveryTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: Array<{
    payload?: SleepRecoveryTrendPoint
  }>
}) {
  if (!active || !payload?.length) return null
  const point = payload[0]?.payload
  if (!point) return null
  const { sleepHrs: sleep, recoveryScore: recovery } = point

  return (
    <ChartTooltipFrame title={point.fullDate}>
      <ChartTooltipItem
        label="Sleep"
        value={typeof sleep === 'number' ? `${sleep}h` : '—'}
        color={CHART_THEME_COLORS.recovery}
      />
      <ChartTooltipItem
        label="Recovery"
        value={typeof recovery === 'number' ? `${recovery}%` : '—'}
        color={CHART_THEME_COLORS.sleep}
      />
    </ChartTooltipFrame>
  )
}

function SleepRecoveryAxisTick({
  x,
  y,
  index,
  data,
}: {
  x?: number | string
  y?: number | string
  index?: number
  data: SleepRecoveryTrendPoint[]
}) {
  const point = typeof index === 'number' ? data[index] : undefined
  if (!point?.showTick || x == null || y == null) return null

  const tickX = typeof x === 'number' ? x : Number(x)
  const tickY = typeof y === 'number' ? y : Number(y)
  if (Number.isNaN(tickX) || Number.isNaN(tickY)) return null

  return (
    <text
      x={tickX}
      y={tickY + 10}
      textAnchor="middle"
      fill="#a1a1aa"
      fontSize={10}
      fontFamily="Geist, sans-serif"
    >
      {point.formattedDate}
    </text>
  )
}

export function SleepRecoveryTrendChart({
  data,
  className,
}: {
  data: SleepRecoveryTrendPoint[]
  className?: string
}) {
  const reactId = useId().replace(/:/g, '')
  const sleepGradientId = `sleep-trend-fill-${reactId}`

  return (
    <article
      className={cn(
        'flex min-h-110 flex-col gap-5 rounded-2xl border bg-background p-4 md:p-6',
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex items-center gap-3">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-white"
            style={{ backgroundColor: CHART_THEME_COLORS.indigo }}
          >
            <MoonStarsIcon className="size-4.5" />
          </span>
          <h3 className="text-lg font-medium tracking-tight">
            Sleep & recovery over time
          </h3>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-xl bg-[rgba(0,178,90,0.1)] px-3 py-1 text-sm font-medium tracking-tight text-[#00b25a]">
          Improving
        </span>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Nightly hours and recovery score for the last 30 days
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: CHART_THEME_COLORS.recovery }}
            />
            <span>Sleep (hrs)</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: CHART_THEME_COLORS.sleep }}
            />
            <span>Recovery score</span>
          </div>
        </div>
      </div>

      <div className="h-80 w-full min-w-0 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={sleepGradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={CHART_THEME_COLORS.recovery}
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor={CHART_THEME_COLORS.recovery}
                  stopOpacity={0.0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--chart-grid)"
              strokeDasharray="4 4"
            />
            <XAxis
              dataKey="dateKey"
              axisLine={false}
              tickLine={false}
              interval={0}
              minTickGap={0}
              tick={(props) => <SleepRecoveryAxisTick {...props} data={data} />}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              tick={AXIS_TICK}
              width={36}
            />
            <Tooltip
              cursor={{
                stroke: 'var(--foreground)',
                strokeWidth: 1,
                strokeDasharray: '4 4',
                strokeOpacity: 0.35,
              }}
              content={<SleepRecoveryTooltip />}
            />
            <Area
              type="monotone"
              dataKey="sleepPlot"
              stroke={CHART_THEME_COLORS.recovery}
              strokeWidth={2.5}
              fill={`url(#${sleepGradientId})`}
              isAnimationActive
              animationDuration={CHART_ANIMATION_MS}
              animationEasing="ease-out"
              dot={false}
              activeDot={{
                r: 4,
                fill: CHART_THEME_COLORS.recovery,
                stroke: '#ffffff',
                strokeWidth: 2,
              }}
            />
            <Area
              type="monotone"
              dataKey="recoveryPlot"
              stroke={CHART_THEME_COLORS.sleep}
              strokeWidth={1.5}
              strokeDasharray="14 10"
              fill="none"
              isAnimationActive
              animationDuration={CHART_ANIMATION_MS}
              animationEasing="ease-out"
              dot={false}
              activeDot={{
                r: 4,
                fill: CHART_THEME_COLORS.sleep,
                stroke: '#ffffff',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}

const factorIcons: Record<
  'moon' | 'walk' | 'warning' | 'alert' | 'bed',
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  moon: MoonStarsIcon,
  walk: WalkIcon,
  warning: AlertTriangleIcon,
  alert: AlertDiamondIcon,
  bed: BedIcon,
}

export function RecoveryFactorsCard({
  factors = recoveryFactors,
  className,
}: {
  factors?: RecoveryFactor[]
  className?: string
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <article
      className={cn(
        'flex min-h-90 flex-1 flex-col justify-between rounded-2xl border p-4 md:p-5',
        'bg-[linear-gradient(180deg,rgba(20,184,166,0.12)_0%,transparent_42%)] dark:bg-[linear-gradient(180deg,rgba(20,184,166,0.08)_0%,transparent_42%)]',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span
            className="flex size-[28px] items-center justify-center rounded-[7.6px] text-white shadow-2xs"
            style={{ backgroundColor: CHART_THEME_COLORS.teal }}
          >
            <BlingFilledIcon className="size-[16px]" />
          </span>
          <h3 className="text-base font-medium tracking-tight">
            Recovery factors
          </h3>
        </div>
        <span className="inline-flex shrink-0 items-center rounded-[12px] bg-white px-2.5 py-2 text-xs font-medium text-[#4a85e4] dark:bg-card">
          7 days outlook
        </span>
      </div>

      {/* Factors List */}
      <div className="flex flex-col gap-3">
        {factors.map((factor, idx) => {
          const Icon = factorIcons[factor.icon]
          return (
            <div
              key={factor.id}
              className="flex items-center justify-between gap-3 rounded-[12px] bg-[#f9f9f9] p-3 dark:bg-muted/50 transition-all duration-300 hover:bg-[#f3f4f6] dark:hover:bg-muted/80"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <Icon
                  className="size-5 shrink-0"
                  style={{ color: factor.color }}
                />
                <span className="truncate text-base font-medium tracking-tight">
                  {factor.label}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 w-48 sm:w-52 justify-end">
                <div className="relative h-4 w-32 sm:w-36 rounded-[8px] bg-[#ebecec] dark:bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-[8px] transition-all duration-700 ease-out"
                    style={{
                      width: mounted ? `${factor.fillPercentage}%` : '0%',
                      transitionDelay: `${idx * 100}ms`,
                      backgroundColor: factor.color,
                    }}
                  />
                </div>
                <span className="w-11 text-right text-base font-medium tracking-tight">
                  {factor.value}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}

const tileColorMap: Record<HeatmapTile, string> = {
  low: 'bg-[#d8faff] dark:bg-cyan-950/70 hover:opacity-75',
  med: 'bg-[#22d3ee] dark:bg-cyan-500 hover:opacity-75',
  high: 'bg-[#0091a8] dark:bg-cyan-700 hover:opacity-75',
}

const tileDotColorMap: Record<HeatmapTile, string> = {
  low: 'bg-[#00b4d8]',
  med: 'bg-[#06b6d4]',
  high: 'bg-[#0091a8]',
}

export function RecoveryHeatmapCard({
  data = recoveryHeatmapData,
  dateLabels = heatmapDateLabels,
  className,
}: {
  data?: HeatmapColumn[]
  dateLabels?: string[]
  className?: string
}) {
  const [mounted, setMounted] = useState(false)
  const [hoverPos, setHoverPos] = useState<{
    active: boolean
    tile: HeatmapTileData | null
    x: number
    y: number
  }>({
    active: false,
    tile: null,
    x: 0,
    y: 0,
  })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    tile: HeatmapTileData,
  ) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setHoverPos({
      active: true,
      tile,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    setHoverPos((prev) => ({ ...prev, active: false }))
  }

  return (
    <article
      ref={cardRef}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative flex min-h-90 flex-1 flex-col justify-between rounded-2xl border p-4 md:p-5',
        'bg-[linear-gradient(180deg,rgba(34,211,238,0.12)_0%,transparent_42%)] dark:bg-[linear-gradient(180deg,rgba(34,211,238,0.08)_0%,transparent_42%)]',
        className,
      )}
    >
      {/* Persistently Mounted Recharts-like Floating Tooltip */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-40"
        style={{
          transform: `translate3d(${hoverPos.x}px, ${hoverPos.y - 12}px, 0) translate(-50%, -100%)`,
          transition:
            'transform 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 150ms ease-out',
          opacity: hoverPos.active && hoverPos.tile ? 1 : 0,
        }}
      >
        {hoverPos.tile && (
          <ChartTooltipFrame title={hoverPos.tile.date}>
            <ChartTooltipItem
              label={hoverPos.tile.status}
              value={`${hoverPos.tile.score}%`}
              color={tileDotColorMap[hoverPos.tile.level]}
            />
          </ChartTooltipFrame>
        )}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span
            className="flex size-[28px] items-center justify-center rounded-[7.6px] text-white shadow-2xs"
            style={{ backgroundColor: CHART_THEME_COLORS.heatmap.med }}
          >
            <BatteryChargingIcon className="size-[16px]" />
          </span>
          <h3 className="text-base font-medium tracking-tight">
            Recovery heatmap
          </h3>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
          <span>Low</span>
          <div className="flex items-center gap-[2px]">
            <span
              className="size-[12px] rounded-xs dark:bg-cyan-950"
              style={{ backgroundColor: CHART_THEME_COLORS.heatmap.low }}
            />
            <span
              className="size-[12px] rounded-xs dark:bg-cyan-500"
              style={{ backgroundColor: CHART_THEME_COLORS.heatmap.med }}
            />
            <span
              className="size-[12px] rounded-xs dark:bg-cyan-700"
              style={{ backgroundColor: CHART_THEME_COLORS.heatmap.high }}
            />
          </div>
          <span>High</span>
        </div>
      </div>

      {/* Grid Matrix */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {data.map((col, colIdx) => (
            <div key={col.id} className="flex flex-col gap-1">
              {col.tiles.map((tile, tileIdx) => (
                <div
                  key={tile.id}
                  onMouseMove={(e) => handleMouseMove(e, tile)}
                  className={cn(
                    'h-[37px] rounded-[6px] transition-opacity duration-200 cursor-pointer',
                    mounted ? 'opacity-100' : 'opacity-0',
                    tileColorMap[tile.level],
                  )}
                  style={{
                    transitionDelay: `${colIdx * 35 + tileIdx * 12}ms`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* X-Axis Dates */}
        <div className="flex items-center justify-between text-sm text-[#61728c] dark:text-muted-foreground px-1 pt-1 font-normal">
          {dateLabels.map((date) => (
            <span key={date}>{date}</span>
          ))}
        </div>
      </div>
    </article>
  )
}