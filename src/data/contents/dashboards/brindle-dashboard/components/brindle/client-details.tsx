import {
  AlarmClockIcon,
  CurrencyCircleDollarIcon,
  FileTextIcon,
  ShieldCheckIcon,
  StatusWarningIcon,
  PolicyArrowRightIcon,
  CalendarIcon,
  PolicyCloseIcon,
  PolicyCopyIcon,
  PolicyDocumentIcon,
  PolicyDownloadIcon,
  PolicyExternalArrowIcon,
  PolicyRenewIcon,
  PolicySparklesIcon,
  UnderwriterNoteIcon,
} from "./icons";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { dashboardClients } from "../../data";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDashboardNavigation } from "./navigation";

function StatusTag({
  children,
  tone = "green",
  size = "sm",
  shadow = true,
}: {
  children: React.ReactNode;
  tone?: "green" | "orange" | "red" | "blue";
  size?: "sm" | "lg";
  shadow?: boolean;
}) {
  const tones = {
    green:
      "border-[var(--stat-green)]/20 bg-[var(--stat-green)]/10 text-[var(--stat-green)]",
    orange:
      "border-[var(--stat-orange)]/20 bg-[var(--stat-orange)]/10 text-[var(--stat-orange)]",
    red: "border-[var(--danger)]/20 bg-[var(--danger)]/10 text-[var(--danger)]",
    blue: "border-primary/20 bg-primary/10 text-primary",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border text-xs",
        size === "lg" ? "h-7 px-3" : "px-3 py-0.5",
        shadow && "shadow-[var(--badge-inner-shadow)]",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

const METRIC_ICONS = {
  "Coverage Limit": ShieldCheckIcon,
  Deductible: CurrencyCircleDollarIcon,
  "Claims this year": FileTextIcon,
  "Risk Score": StatusWarningIcon,
} as const;

function Metric({
  title,
  value,
  suffix,
  caption,
  openClaims,
  closedClaims,
}: {
  title: string;
  value: string;
  suffix?: string;
  caption: string;
  openClaims?: number;
  closedClaims?: number;
}) {
  const Icon = METRIC_ICONS[title as keyof typeof METRIC_ICONS];
  return (
    <div className="flex min-h-38 flex-col justify-between p-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="size-5" />}
        <span className="truncate text-sm font-medium tracking-tight">
          {title}
        </span>
      </div>
      <div>
        <div className="truncate text-3xl leading-none font-medium tracking-tight">
          {value}
          {suffix && (
            <span className="text-sm text-muted-foreground">{suffix}</span>
          )}
        </div>
        <div className="mt-3 text-xxs text-muted-foreground">
          {openClaims !== undefined && closedClaims !== undefined ? (
            <>
              <span className="text-foreground">{openClaims}</span> open ·{" "}
              <span className="text-foreground">{closedClaims}</span> closed
            </>
          ) : (
            caption
          )}
        </div>
      </div>
    </div>
  );
}

export function ClientDetailsPage() {
  const { pathname } = useDashboardNavigation();
  const clientId = pathname.split('/').filter(Boolean)[1];
  const [copied, setCopied] = useState(false);
  const client = dashboardClients.find((item) => item.id === clientId);

  const copyPolicyNumber = async () => {
    if (!client) return;
    await navigator.clipboard.writeText(client.policyNumber);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  if (!client) return null;

  return (
    <div className="@container flex w-full flex-col gap-8 px-4 py-6 md:px-6 md:py-8">
      <header className="flex flex-col gap-5 @3xl:min-h-28 @3xl:flex-row @3xl:items-end @3xl:justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
            {client.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <button
              type="button"
              onClick={copyPolicyNumber}
              className="inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Copy policy number"
            >
              <span>{client.policyNumber}</span>
              {copied ? <CheckIcon className="size-3.5" /> : <PolicyCopyIcon />}
            </button>
            <span className="size-1.5 rounded-full bg-border" />
            <span>{client.type}</span>
            <span className="size-1.5 rounded-full bg-border" />
            <span>Since {client.since}</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="flex h-7 items-center gap-1.5 rounded-full border bg-card px-3 text-xs shadow-none">
              <AlarmClockIcon className="size-3.5" />
              Renewal:{" "}
              <strong className="font-medium">{client.renewalDate}</strong>
            </span>
            <StatusTag
              size="lg"
              tone={
                client.status === "Lapsed"
                  ? "red"
                  : client.status === "Review" || client.status === "Pending"
                    ? "orange"
                    : client.status === "Claim"
                      ? "blue"
                      : "green"
              }
            >
              {client.status}
            </StatusTag>
            {client.aiManaged && (
              <span className="flex h-7 items-center gap-1.5 rounded-full bg-primary/10 px-3 text-xs text-primary">
                <PolicySparklesIcon className="size-3.5" />
                AI Managed
              </span>
            )}
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2 @3xl:w-auto @3xl:justify-end">
          <Button className="h-10 shadow-custom">
            <span>Renew Now</span>
            <PolicyRenewIcon />
          </Button>
          <Button variant="secondary" className="h-10 shadow-custom">
            <span>Download PDF</span>
            <PolicyDownloadIcon />
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border bg-card shadow-custom sm:grid-cols-2 @3xl:grid-cols-4 [&>*:not(:first-child)]:border-t sm:[&>*:nth-child(even)]:border-l sm:[&>*:nth-child(n+3)]:border-t @3xl:[&>*]:border-t-0 @3xl:[&>*:not(:first-child)]:border-l">
        {client.metrics.map((metric) => (
          <Metric key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid min-w-0 items-start gap-4 @4xl:grid-cols-[minmax(0,2.15fr)_minmax(18rem,1fr)] @4xl:items-stretch">
        <section className="min-w-0 @4xl:flex @4xl:min-h-0 @4xl:flex-col">
          <div className="mb-3 flex min-h-10 flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-medium">Coverage Schedule</h2>
            <Button variant="secondary" className="h-9 shadow-custom">
              Edit coverage
              <PolicyExternalArrowIcon />
            </Button>
          </div>
          <div className="max-w-full max-h-88 overflow-auto rounded-2xl border bg-card shadow-custom no-scrollbar @4xl:min-h-0 @4xl:flex-1">
            <div className="min-w-156">
              <div className="grid grid-cols-4 bg-muted/60 px-5 py-3 text-sm font-medium text-muted-foreground">
                <span>Coverage Type</span>
                <span>Limit</span>
                <span>Deductible</span>
                <span>Status</span>
              </div>
              {client.coverages.map((coverage) => (
                <div
                  key={coverage.name}
                  className="grid min-h-14 grid-cols-4 items-center border-t px-5 text-sm font-medium"
                >
                  <span>{coverage.name}</span>
                  <span>{coverage.limit}</span>
                  <span>{coverage.deductible}</span>
                  <span>
                    {coverage.status === "Active" ? (
                      <StatusTag>Active</StatusTag>
                    ) : coverage.status === "Expired" ? (
                      <StatusTag tone="red">Expired</StatusTag>
                    ) : (
                      <StatusTag tone="orange">Pending review</StatusTag>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="@4xl:flex @4xl:min-h-0 @4xl:flex-col">
          <h2 className="mb-3 flex min-h-10 items-center text-lg font-medium">
            Claims history
          </h2>
          <div className="max-h-88 overflow-y-auto rounded-2xl border bg-card px-4 shadow-custom no-scrollbar @4xl:min-h-0 @4xl:flex-1">
            {client.claims.length ? (
              client.claims.map((claim, index) => (
                <div
                  key={claim.id}
                  className={cn("py-3.5", index > 0 && "border-t")}
                >
                  <a className="text-sm text-primary underline underline-offset-2">
                    {claim.id}
                  </a>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium leading-3.5">
                        {claim.title}
                      </div>
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon className="size-3 text-foreground" />
                        {claim.date}
                      </div>
                      <div className="mt-3">
                        {claim.status === "Closed" ? (
                          <StatusTag shadow={false}>Closed</StatusTag>
                        ) : claim.status === "Under review" ? (
                          <StatusTag tone="blue" shadow={false}>Under review</StatusTag>
                        ) : (
                          <StatusTag shadow={false}>Settled</StatusTag>
                        )}
                      </div>
                    </div>
                    <span className="mt-0.5 shrink-0 rounded-full border px-3 py-1 text-base leading-5 font-medium shadow-[var(--badge-inner-shadow)]">
                      {claim.amount}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-6 text-sm text-muted-foreground">
                No claims
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="grid items-start gap-4 @4xl:grid-cols-2">
        <section>
          <div className="mb-3 flex min-h-10 flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-medium">Coverage Schedule</h2>
            <Button variant="secondary" className="h-9 shadow-custom">
              Upload
              <PolicyExternalArrowIcon />
            </Button>
          </div>
          <div className="rounded-2xl border bg-card px-4 py-3 shadow-custom">
            {client.documents.map((document, index) => (
              <div
                key={document.name}
                className={cn(
                  "flex min-h-15 items-center justify-between gap-3 py-2 sm:gap-4 sm:py-0",
                  index > 0 && "border-t",
                )}
              >
                <div className="flex min-w-0 items-start gap-3 sm:gap-4">
                  <PolicyDocumentIcon className="mt-0.5 shrink-0 text-foreground" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium leading-3.5">
                      {document.name}
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      {document.type} · {document.size}
                    </div>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground max-sm:hidden">
                  {document.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-5">
          <section>
            <h2 className="mb-3 flex min-h-10 items-center text-lg font-medium">AI Insights</h2>
            <div className="rounded-2xl border bg-card p-3 shadow-custom">
              <div className="rounded-lg bg-muted/60 p-3 text-sm leading-snug text-muted-foreground">
                {client.aiInsight}
              </div>
              <div className="mt-2 text-sm font-medium">
                Insuris Core v2.4 · Policy context
              </div>
              <div className="mt-3 flex min-w-0 gap-2 border-t pt-3">
                <input
                  type="text"
                  placeholder="Ask about this client..."
                  className="h-9 min-w-0 flex-1 rounded-lg border bg-transparent px-3 text-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
                />
                <Button className="h-9">
                  Send
                  <PolicyArrowRightIcon />
                </Button>
              </div>
            </div>
          </section>
          <section>
            <h2 className="mb-3 text-lg font-medium">Underwriter notes</h2>
            <div className="rounded-2xl border bg-card p-3 shadow-custom">
              <div className="space-y-1">
                {client.notes.map((note) => (
                  <div
                    key={note}
                    className="flex items-center gap-2.5 rounded-lg bg-muted/60 p-3 text-sm leading-snug text-muted-foreground"
                  >
                    <UnderwriterNoteIcon className="shrink-0" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                <Button variant="secondary" className="h-9 w-fit shadow-custom">
                  Dismiss
                  <PolicyCloseIcon />
                </Button>
                <Button className="h-9 w-fit shadow-custom">
                  Open report
                  <PolicyArrowRightIcon />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
