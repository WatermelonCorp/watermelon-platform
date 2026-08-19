import type { ComponentType, SVGProps } from "react";
import {
  ArrowCounterClockwiseIcon,
  CheckCircleIcon,
  CoinIcon,
  CalendarIcon,
  DashboardSquare02Icon,
  FadersHorizontalIcon,
  FileIcon,
  FolderOpenIcon,
  GearSixIcon,
  LinkIcon,
  SpinnerGapIcon,
  StatusWarningIcon,
  TreeStructureIcon,
  UsersIcon,
  WarningIcon,
} from "./components/brindle/icons";

export type NavIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type NavigationItem = {
  name: string;
  href: string;
  activePath?: string;
  icon: NavIcon;
  badge?: string;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export const appRoutes = {
  overview: { path: "/", label: "Overview" },
  overviewDetails: { path: "/overview", label: "Overview" },
} as const;

export const getClientPath = (clientId: string) =>
  `${appRoutes.overviewDetails.path}/${clientId}`;

export const navigationGroups: NavigationGroup[] = [
  {
    label: "WORKSPACE",
    items: [
      {
        name: appRoutes.overview.label,
        href: appRoutes.overview.path,
        activePath: appRoutes.overviewDetails.path,
        icon: DashboardSquare02Icon,
      },
      {
        name: "Policy Threads",
        href: "/policy-threads",
        icon: TreeStructureIcon,
        badge: "123",
      },
      {
        name: "Documents",
        href: "/documents",
        icon: FileIcon,
        badge: "3,154",
      },
      { name: "Claims Hub", href: "/claims-hub", icon: WarningIcon },
      {
        name: "Renewals",
        href: "/renewals",
        icon: ArrowCounterClockwiseIcon,
      },
    ],
  },
  {
    label: "TEAM",
    items: [
      { name: "Clients", href: "/clients", icon: UsersIcon },
      {
        name: "Shared Portfolio",
        href: "/shared-portfolio",
        icon: FolderOpenIcon,
      },
    ],
  },
  {
    label: "CONFIGURE",
    items: [
      { name: "Integrations", href: "/integrations", icon: LinkIcon },
      { name: "Settings", href: "/settings", icon: GearSixIcon },
    ],
  },
];

export const policyQueriesData = {
  used: 714,
  total: 1000,
};

export type ClientStatus = "Active" | "Claim" | "Review" | "Pending" | "Lapsed";

export const dashboardStatCards = {
  activePolicies: {
    title: "Active policies",
    trend: { value: "23", label: "this month", direction: "up" as const },
    chart: {
      bars: [31, 44, 38, 19, 38, 50, 78, 63, 78, 100],
      color: "green" as const,
    },
  },
  premiumsCollected: {
    title: "Premiums Collected",
    trend: { value: "8.4%", label: "vs last month", direction: "up" as const },
    chart: {
      bars: [31, 44, 38, 63, 38, 38, 56, 72, 78, 91],
      color: "violet" as const,
    },
  },
  openClaims: {
    title: "Open Claims",
    trend: { value: "4", label: "this week", direction: "down" as const },
    chart: {
      bars: [31, 44, 38, 19, 38, 50, 78, 63, 78, 50],
      color: "orange" as const,
    },
  },
  retentionRate: {
    title: "Retention Rate",
    trend: { label: "Stable", direction: "neutral" as const },
    chart: {
      bars: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      color: "primary" as const,
    },
  },
} as const;

export type ClientMetaStatus = {
  icon?: NavIcon;
  prefix?: string;
  text?: string;
};

export type Client = {
  id: string;
  initials: string;
  name: string;
  type: string;
  status: ClientStatus;
  premium: number;
  policyNumber: string;
  since: string;
  renewalDate: string;
  aiManaged?: boolean;
  meta: ClientMetaStatus[];
  metrics: {
    title: string;
    value: string;
    suffix?: string;
    caption: string;
    openClaims?: number;
    closedClaims?: number;
  }[];
  coverages: {
    name: string;
    limit: string;
    deductible: string;
    status: "Active" | "Pending review" | "Expired";
  }[];
  claims: {
    id: string;
    title: string;
    date: string;
    status: "Under review" | "Closed" | "Settled";
    amount: string;
  }[];
  documents: { name: string; type: string; size: string; date: string }[];
  aiInsight: string;
  notes: string[];
};

export const dashboardClients: Client[] = [
  {
    id: "henderson-corp",
    initials: "HC",
    name: "Henderson Corp",
    type: "Commercial Liability",
    status: "Active",
    premium: 12400,
    policyNumber: "POL-2024-0041",
    since: "Mar 2019",
    renewalDate: "Apr 28, 2026",
    aiManaged: true,
    meta: [
      { icon: CoinIcon, text: "$12,400/yr" },
      { icon: CalendarIcon, prefix: "Due:", text: "Apr 28" },
    ],
    metrics: [
      {
        title: "Coverage Limit",
        value: "$5,000,000",
        caption: "Per occurrence",
      },
      { title: "Deductible", value: "$25,000", caption: "General" },
      {
        title: "Claims this year",
        value: "2",
        openClaims: 1,
        closedClaims: 1,
        caption: "",
      },
      { title: "Risk Score", value: "64", suffix: "/100", caption: "Moderate" },
    ],
    coverages: [
      {
        name: "General liability",
        limit: "$5,000,000",
        deductible: "$25,000",
        status: "Active",
      },
      {
        name: "Products liability",
        limit: "$2,000,000",
        deductible: "$15,000",
        status: "Active",
      },
      {
        name: "Property damage",
        limit: "$1,500,000",
        deductible: "$10,000",
        status: "Active",
      },
      {
        name: "Employers liability",
        limit: "$500,000",
        deductible: "$50,000",
        status: "Pending review",
      },
    ],
    claims: [
      {
        id: "#CLM-0302",
        title: "Product liability dispute",
        date: "Filed Feb 15, 2026",
        status: "Under review",
        amount: "$8,750",
      },
      {
        id: "#CLM-0291",
        title: "Slip & fall — premises",
        date: "Filed Feb 15, 2026",
        status: "Closed",
        amount: "$14,200",
      },
    ],
    documents: [
      {
        name: "Schedule of cover — Henderson.pdf",
        type: "PDF",
        size: "24 MB",
        date: "Apr 2, 2026",
      },
      {
        name: "Renewal quote draft.pdf",
        type: "PDF",
        size: "8 MB",
        date: "Apr 1, 2026",
      },
    ],
    aiInsight:
      "Henderson’s renewal is due soon. Based on the open claim and recent risk increase, review the deductible before issuing the final quote.",
    notes: [
      "Priority client since 2019.",
      "History of prompt premium payment.",
      "Risk profile has worsened slightly YoY — monitor claims frequency.",
    ],
  },
  {
    id: "priya-rajan",
    initials: "PR",
    name: "Priya Rajan",
    type: "Vehicle Insurance",
    status: "Claim",
    premium: 2100,
    policyNumber: "POL-2024-0118",
    since: "Jun 2021",
    renewalDate: "Jun 14, 2026",
    meta: [{ icon: CoinIcon, text: "$2,100/yr" }, { text: "Claim open" }],
    metrics: [
      { title: "Coverage Limit", value: "$250,000", caption: "Per incident" },
      { title: "Deductible", value: "$1,000", caption: "Collision" },
      {
        title: "Claims this year",
        value: "1",
        openClaims: 1,
        closedClaims: 0,
        caption: "",
      },
      { title: "Risk Score", value: "42", suffix: "/100", caption: "Low" },
    ],
    coverages: [
      {
        name: "Collision",
        limit: "$100,000",
        deductible: "$1,000",
        status: "Active",
      },
      {
        name: "Comprehensive",
        limit: "$150,000",
        deductible: "$500",
        status: "Active",
      },
    ],
    claims: [
      {
        id: "#CLM-0291",
        title: "Vehicle damage",
        date: "Filed Apr 7, 2026",
        status: "Under review",
        amount: "$3,200",
      },
    ],
    documents: [
      {
        name: "Vehicle policy.pdf",
        type: "PDF",
        size: "6 MB",
        date: "Mar 12, 2026",
      },
    ],
    aiInsight:
      "The open vehicle claim is within expected severity. No coverage changes are recommended yet.",
    notes: [
      "No prior claims in the previous three years.",
      "Premium payments are current.",
    ],
  },
  {
    id: "del-sol-properties",
    initials: "DS",
    name: "Del Sol Properties",
    type: "Properties & contents",
    status: "Review",
    premium: 8750,
    policyNumber: "POL-2024-0196",
    since: "Sep 2018",
    renewalDate: "May 19, 2026",
    meta: [{ icon: CoinIcon, text: "$8,750/yr" }, { text: "Risk Flagged" }],
    metrics: [
      { title: "Coverage Limit", value: "$3,500,000", caption: "Property" },
      { title: "Deductible", value: "$30,000", caption: "General" },
      {
        title: "Claims this year",
        value: "3",
        openClaims: 2,
        closedClaims: 1,
        caption: "",
      },
      { title: "Risk Score", value: "78", suffix: "/100", caption: "Elevated" },
    ],
    coverages: [
      {
        name: "Building",
        limit: "$2,500,000",
        deductible: "$30,000",
        status: "Active",
      },
      {
        name: "Contents",
        limit: "$1,000,000",
        deductible: "$15,000",
        status: "Pending review",
      },
    ],
    claims: [
      {
        id: "#CLM-0315",
        title: "Weather damage",
        date: "Filed Mar 21, 2026",
        status: "Under review",
        amount: "$31,400",
      },
    ],
    documents: [
      {
        name: "Property schedule.pdf",
        type: "PDF",
        size: "18 MB",
        date: "Mar 20, 2026",
      },
    ],
    aiInsight:
      "Risk has increased due to recent weather-related claims. Review catastrophe limits before renewal.",
    notes: [
      "Property exposure increased this year.",
      "Recent claims correlate with weather events.",
    ],
  },
  {
    id: "malik-associates",
    initials: "MA",
    name: "Malik & Associates",
    type: "Directors & Officers",
    status: "Pending",
    premium: 6200,
    policyNumber: "POL-2024-0244",
    since: "Jan 2020",
    renewalDate: "May 8, 2026",
    meta: [{ icon: CoinIcon, text: "$6,200/yr" }, { text: "Renewal draft" }],
    metrics: [
      { title: "Coverage Limit", value: "$2,000,000", caption: "Aggregate" },
      { title: "Deductible", value: "$20,000", caption: "General" },
      {
        title: "Claims this year",
        value: "0",
        openClaims: 0,
        closedClaims: 0,
        caption: "",
      },
      { title: "Risk Score", value: "35", suffix: "/100", caption: "Low" },
    ],
    coverages: [
      {
        name: "Directors & Officers",
        limit: "$2,000,000",
        deductible: "$20,000",
        status: "Active",
      },
    ],
    claims: [],
    documents: [
      {
        name: "Renewal draft.pdf",
        type: "PDF",
        size: "4 MB",
        date: "Apr 3, 2026",
      },
    ],
    aiInsight:
      "Renewal draft is ready for client review. Current loss history supports maintaining existing terms.",
    notes: ["Clean claims history.", "Renewal awaiting client approval."],
  },
  {
    id: "greenfield-retail",
    initials: "GR",
    name: "Greenfield Retail",
    type: "Contents cover",
    status: "Active",
    premium: 2100,
    policyNumber: "POL-2024-0307",
    since: "Jul 2022",
    renewalDate: "Jul 26, 2026",
    aiManaged: true,
    meta: [
      { icon: CoinIcon, text: "$2,100/yr" },
      { icon: CalendarIcon, prefix: "Due:", text: "Jul 26" },
    ],
    metrics: [
      { title: "Coverage Limit", value: "$750,000", caption: "Contents" },
      { title: "Deductible", value: "$5,000", caption: "General" },
      {
        title: "Claims this year",
        value: "0",
        openClaims: 0,
        closedClaims: 0,
        caption: "",
      },
      { title: "Risk Score", value: "28", suffix: "/100", caption: "Low" },
    ],
    coverages: [
      {
        name: "Contents",
        limit: "$750,000",
        deductible: "$5,000",
        status: "Active",
      },
    ],
    claims: [],
    documents: [
      {
        name: "Contents schedule.pdf",
        type: "PDF",
        size: "3 MB",
        date: "Feb 11, 2026",
      },
    ],
    aiInsight:
      "No material changes detected. Current coverage remains appropriate based on available data.",
    notes: ["Low claims frequency.", "Automated renewal eligible."],
  },
  {
    id: "n-begstrom",
    initials: "NB",
    name: "N Begstrom",
    type: "Lifetime policy",
    status: "Lapsed",
    premium: 0,
    policyNumber: "POL-2024-0331",
    since: "Nov 2016",
    renewalDate: "Apr 28, 2026",
    meta: [
      { icon: CalendarIcon, prefix: "Due:", text: "Apr 28" },
      { text: "Follow-up needed" },
    ],
    metrics: [
      { title: "Coverage Limit", value: "$500,000", caption: "Lifetime" },
      { title: "Deductible", value: "$0", caption: "General" },
      {
        title: "Claims this year",
        value: "0",
        openClaims: 0,
        closedClaims: 0,
        caption: "",
      },
      { title: "Risk Score", value: "51", suffix: "/100", caption: "Moderate" },
    ],
    coverages: [
      {
        name: "Lifetime benefit",
        limit: "$500,000",
        deductible: "$0",
        status: "Expired",
      },
    ],
    claims: [],
    documents: [
      {
        name: "Lapse notice.pdf",
        type: "PDF",
        size: "1 MB",
        date: "Apr 29, 2026",
      },
    ],
    aiInsight:
      "Policy has lapsed. Follow-up is recommended before offering reinstatement terms.",
    notes: ["Follow-up needed.", "No active premium collection."],
  },
];

function formatPathSegment(segment: string) {
  return decodeURIComponent(segment)
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) return [{ label: "Overview", href: "/" }];

  return segments.map((segment, index) => ({
    label: formatPathSegment(segment),
    href: `/${segments.slice(0, index + 1).join("/")}`,
  }));
}

export const dashboardActivities = [
  [
    "Today - 8:42",
    "Henderson Corp renewed automatically",
    "AI processed commercial liability renewal",
  ],
  [
    "Yesterday",
    "Priya Rajan filed vehicle claim #CLM-0291",
    "Damage estimate: $3,200 · AI summary ready",
  ],
  [
    "Yesterday",
    "Del Sol risk score increased +12%",
    "Review before renewal recommended",
  ],
  [
    "Yesterday",
    "Malik & Assoc. renewal draft generated",
    "Awaiting client approval",
  ],
] as const;

export const dashboardRenewals = [
  {
    initials: "GR",
    name: "Greenfield Retail",
    type: "Contents cover",
    time: "4 days",
    tone: "danger",
  },
  {
    initials: "MA",
    name: "Malik & Assoc.",
    type: "Directors & Officers",
    time: "12 days",
    tone: "warning",
  },
  {
    initials: "DS",
    name: "Del Sol Properties",
    type: "Property & contents",
    time: "12 days",
    tone: "warning",
  },
  {
    initials: "GR",
    name: "Greenfield Retail",
    type: "Contents cover",
    time: "31 days",
    tone: "primary",
  },
] as const;

export const dashboardRisks = [
  { label: "Property", bars: 12, tone: "violet", score: 72 },
  { label: "Vehicle", bars: 8, tone: "primary", score: 72 },
  { label: "Liability", bars: 9, tone: "orange", score: 72 },
  { label: "Life & health", bars: 3, tone: "green", score: 72 },
] as const;

export const dashboardInsights = [
  "Henderson Corp renewal due in 4 days. Del Sol property risk score elevated, 3 open claims correlate with weather events. 2 policies lapsing this month if no action taken",
  "Pinnacle Group upcoming audit in 10 days. Coastal region risk factors increasing, 4 claims associated with flooding incidents. 3 policies need renewal confirmation this quarter.",
] as const;

export const dashboardHeader = {
  greeting: "Good Morning, Vansh",
  renewalsDue: 3,
  claimsForReview: 2,
  portfolioCount: 1235,
} as const;

export const currentUser = {
  name: "Alex Morgan",
  email: "alex@brindle.com",
  initials: "AM",
  avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent("Alex Morgan")}`,
};

export const notifications = [
  {
    id: "exception-spike",
    title: "Exception volume spike",
    description: "3,154 open exceptions need review this week.",
    time: "2 min ago",
  },
  {
    id: "audit-complete",
    title: "Audit run completed",
    description: "Controls audit finished with 12 flagged items.",
    time: "1 hour ago",
  },
  {
    id: "integration-sync",
    title: "Integration synced",
    description: "ERP connector finished its latest sync.",
    time: "Yesterday",
  },
] as const;

export type SourceKind = "oracle" | "sharepoint" | "concur" | "email";

export type BatchStatus = "processing" | "completed" | "exception";

export const metrics = [
  {
    id: "total-processed",
    label: "Total processed",
    value: "147,392",
    icon: "clock" as const,
    trend: { value: "+2.4%", label: "vs last run", tone: "up" as const },
  },
  {
    id: "matched",
    label: "Matched",
    value: "12,847",
    icon: "seal" as const,
    trend: { value: "+97.86%", label: "match rate" },
  },
  {
    id: "exceptions",
    label: "Exceptions",
    value: "12,847",
    icon: "warning" as const,
    trend: { value: "2.14%", label: "exception rate" },
  },
  {
    id: "processing",
    label: "Processing",
    value: "12,847",
    icon: "arrows" as const,
    trend: { value: "Live", label: "in queue", tone: "live" as const },
  },
] as const;

export const batchTransactions = [
  {
    id: "1",
    status: "processing" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "sharepoint"] as SourceKind[],
    confidence: 72,
  },
  {
    id: "2",
    status: "processing" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "concur"] as SourceKind[],
    confidence: 58,
  },
  {
    id: "3",
    status: "completed" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "concur", "email"] as SourceKind[],
    confidence: 99,
  },
  {
    id: "4",
    status: "processing" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "concur"] as SourceKind[],
    confidence: 58,
  },
  {
    id: "5",
    status: "processing" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "concur"] as SourceKind[],
    confidence: 58,
  },
  {
    id: "6",
    status: "exception" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "email", "concur"] as SourceKind[],
    confidence: 34,
    confidenceNote: "Amount Variance",
  },
  {
    id: "7",
    status: "completed" as BatchStatus,
    transactionId: "TXN-84921",
    po: "PO-6952",
    vendor: "Accenture LTD",
    amount: "$42,200.00",
    sources: ["oracle", "concur"] as SourceKind[],
    confidence: 97,
  },
] as const;

export const sourceLabels: Record<SourceKind, string> = {
  oracle: "Oracle ERP",
  sharepoint: "Sharepoint",
  concur: "Concur",
  email: "Email",
};

export const batchStatusFilters = [
  { value: "all", label: "All statuses", icon: FadersHorizontalIcon },
  { value: "processing", label: "Processing", icon: SpinnerGapIcon },
  { value: "completed", label: "Completed", icon: CheckCircleIcon },
  { value: "exception", label: "Exception", icon: StatusWarningIcon },
] as const;

export type BatchTransaction = (typeof batchTransactions)[number];

export type MatchLineStatus = "matched" | "mismatched" | "partial";

export type TransactionDetails = {
  customer: string;
  batchId: string;
  date: string;
  flagged: boolean;
  purchaseOrder: {
    status: MatchLineStatus;
    amount: string;
    reference: string;
    source: string;
  };
  invoice: {
    status: MatchLineStatus;
    amount: string;
    reference: string;
    deltaVsPo: string;
  };
  goodsReceipt: {
    status: MatchLineStatus;
    amount: string;
    reference: string;
    fulfillment: string;
  };
  timeline: { title: string; parts: string[] }[];
};

export function getTransactionDetails(
  row: BatchTransaction,
): TransactionDetails {
  const isException = row.status === "exception";
  const isComplete = row.status === "completed";

  return {
    customer: "Consulting Corp",
    batchId: "BAT-2026-0407",
    date: "Apr 7, 2026",
    flagged: isException,
    purchaseOrder: {
      status: "matched",
      amount: isException ? "$417,301.00" : row.amount,
      reference: row.po.startsWith("PO")
        ? `PO-2026-${row.po.replace(/\D/g, "")}`
        : row.po,
      source: sourceLabels[row.sources[0] ?? "oracle"],
    },
    invoice: {
      status: isException ? "mismatched" : isComplete ? "matched" : "partial",
      amount: row.amount,
      reference: `INV-CC-${row.id.padStart(4, "0")}`,
      deltaVsPo: isException ? "+$12,450" : isComplete ? "$0.00" : "+$420.00",
    },
    goodsReceipt: {
      status: isException ? "partial" : isComplete ? "matched" : "partial",
      amount: isException ? "$394,100.00" : row.amount,
      reference: `GR-0407-${row.id.padStart(3, "0")}`,
      fulfillment: isException ? "91.7%" : isComplete ? "100%" : "86.4%",
    },
    timeline: [
      ...(isException
        ? [
            {
              title: "Flagged as exception",
              parts: [
                "Audit AI",
                "Audit AI",
                `Confidence dropped to ${row.confidence}%`,
              ],
            },
          ]
        : []),
      {
        title: "Viewed by J. Hartwell",
        parts: ["Manual review", "Today 11:38 AM"],
      },
      {
        title: "Three-way match processed",
        parts: ["Manual review", "Today 11:38 AM"],
      },
      {
        title: isException ? "Flagged as exception" : "Match checks completed",
        parts: ["Automated", "Today 11:34 AM", "PO, Invoice, GR ingested"],
      },
      {
        title: "Transaction Submitted",
        parts: ["Oracle ERP sync", "Today 11:30 AM", "BAT-2026-0407"],
      },
    ],
  };
}

export type BatchStatusFilter = (typeof batchStatusFilters)[number]["value"];

export const auditControls = {
  defaultLive: true,
} as const;

export function filterBatchTransactions(
  transactions: typeof batchTransactions,
  statusFilter: BatchStatusFilter,
) {
  if (statusFilter === "all") return [...transactions];
  return transactions.filter((row) => row.status === statusFilter);
}

export function buildBatchExportCsv(
  transactions: ReturnType<typeof filterBatchTransactions>,
) {
  const header = [
    "Status",
    "Transaction ID",
    "PO",
    "Vendor",
    "Amount",
    "Sources",
    "Confidence",
    "Note",
  ];

  const rows = transactions.map((row) => [
    row.status,
    row.transactionId,
    row.po,
    row.vendor,
    row.amount,
    row.sources.map((source) => sourceLabels[source]).join(" | "),
    `${row.confidence}%`,
    "confidenceNote" in row && row.confidenceNote ? row.confidenceNote : "",
  ]);

  return [header, ...rows]
    .map((cells) =>
      cells.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");
}
