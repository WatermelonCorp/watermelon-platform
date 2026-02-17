# Watermelon UI - Component Registry

A modern React component registry platform built with Vite, TypeScript, and shadcn/ui. Showcase your UI components and dashboards with live previews, code examples, and one-click copy functionality.

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Base**: shadcn/ui components
- **Animations**: Motion (Framer Motion)
- **Icons**: Hugeicons, Lucide React
- **Routing**: React Router DOM
- **Charts**: Recharts

## Project Structure

```
src/
├── components/
│   ├── layout/           # App shell (sidebar, navbar, routes)
│   ├── registry/         # Registry cards and modals
│   ├── mdx/              # Code blocks, installation commands
│   ├── ui/               # shadcn/ui base components
│   └── animate-ui/       # Animated UI primitives
├── data/
│   ├── registry.tsx      # Component registry loader
│   ├── dashboards.tsx    # Dashboard registry loader
│   └── contents/
│       ├── components/   # Individual component folders
│       ├── registry/     # Component MDX metadata
│       └── dashboards/   # Dashboard folders
├── pages/                # Route pages
└── lib/                  # Utilities
```

---

## Adding a New Component

### Step 1: Create Component Folder

Create a new folder in `src/data/contents/components/[component-name]/`:

```
src/data/contents/components/my-button/
├── index.tsx    # Main component file
└── demo.tsx     # Demo/usage example
```

### Step 2: Create the Component (`index.tsx`)

```tsx
// src/data/contents/components/my-button/index.tsx
import { cn } from '@/lib/utils';

interface MyButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function MyButton({
  children,
  variant = 'primary',
  className,
}: MyButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg px-4 py-2 font-medium transition-colors',
        variant === 'primary' &&
          'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'secondary' &&
          'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        className,
      )}
    >
      {children}
    </button>
  );
}

export default MyButton;
```

### Step 3: Create the Demo (`demo.tsx`)

```tsx
// src/data/contents/components/my-button/demo.tsx
import { MyButton } from './index';

export default function MyButtonDemo() {
  return (
    <div className="flex gap-4">
      <MyButton variant="primary">Primary</MyButton>
      <MyButton variant="secondary">Secondary</MyButton>
    </div>
  );
}
```

### Step 4: Create MDX Metadata

Create `src/data/contents/registry/my-button.mdx`:

```mdx
---
title: My Button
slug: my-button
category: buttons
description: A customizable button component with multiple variants.
image: https://example.com/preview.png
video: ''
featured: true
featuredOrder: 1
componentNumber: 10
dependencies:
  - clsx
inspiredByName: Apple
inspiredByLink: https://apple.com
install:
  - npx shadcn@latest add https://registry.watermelon.sh/r/my-button.json
---

# My Button

A beautiful button component with smooth animations.
```

### MDX Frontmatter Reference

| Field             | Type     | Required | Description                                          |
| ----------------- | -------- | -------- | ---------------------------------------------------- |
| `title`           | string   | ✅       | Display name of the component                        |
| `slug`            | string   | ✅       | URL-safe identifier (must match folder name)         |
| `category`        | string   | ✅       | Category for grouping (buttons, cards, inputs, etc.) |
| `description`     | string   | ✅       | Short description shown in cards                     |
| `image`           | string   | ❌       | Preview image URL                                    |
| `video`           | string   | ❌       | Preview video URL (takes priority over image)        |
| `featured`        | boolean  | ❌       | Show on homepage                                     |
| `featuredOrder`   | number   | ❌       | Order in featured list                               |
| `componentNumber` | number   | ❌       | Display badge number                                 |
| `dependencies`    | string[] | ❌       | npm packages required                                |
| `inspiredByName`  | string   | ❌       | Credit/inspiration source                            |
| `inspiredByLink`  | string   | ❌       | Link to inspiration                                  |
| `install`         | string[] | ✅       | CLI install commands                                 |

### Step 5: Verify

The component will automatically appear in:

- ✅ Homepage grid
- ✅ Category pages
- ✅ Sidebar navigation (under category)
- ✅ Command palette search (⌘K)

---

## Adding a New Dashboard

### Step 1: Create Dashboard Folder

Create a new folder in `src/data/contents/dashboards/[dashboard-name]/`:

```
src/data/contents/dashboards/my-dashboard/
├── my-dashboard.mdx     # Metadata file
├── demo.tsx             # Main dashboard wrapper
├── dashboardLayout.tsx  # Layout component (optional)
├── dashboardView.tsx    # Main content view
└── components/          # Dashboard-specific components
    ├── MetricCard.tsx
    └── Chart.tsx
```

### Step 2: Create Dashboard Components

**dashboardView.tsx** (Main content):

```tsx
// src/data/contents/dashboards/my-dashboard/dashboardView.tsx
import { Card } from '@/components/ui/card';

const metrics = [
  { label: 'Total Users', value: '12,345', change: '+12%' },
  { label: 'Revenue', value: '$45,678', change: '+8%' },
  { label: 'Orders', value: '1,234', change: '+23%' },
];

export function DashboardView() {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">My Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-4">
            <p className="text-muted-foreground text-sm">{metric.label}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-xs text-green-500">{metric.change}</p>
          </Card>
        ))}
      </div>

      {/* Add charts, tables, etc. */}
    </div>
  );
}
```

**demo.tsx** (Main entry point):

```tsx
// src/data/contents/dashboards/my-dashboard/demo.tsx
import { DashboardView } from './dashboardView';

export default function MyDashboardDemo() {
  return (
    <div className="bg-background h-screen w-full">
      <DashboardView />
    </div>
  );
}
```

### Step 3: Create MDX Metadata

Create `src/data/contents/dashboards/my-dashboard/my-dashboard.mdx`:

```mdx
---
title: My Dashboard
slug: my-dashboard
category: dashboard
description: A comprehensive analytics dashboard with real-time metrics and charts.
image: /dashboards/my-dashboard.png
featured: true
comingSoon: false
dependencies:
  - recharts
  - @tabler/icons-react
---

# My Dashboard

A fully featured dashboard with:

- **Metrics Cards** - Key performance indicators with trends
- **Charts** - Interactive data visualizations
- **Tables** - Data grids with sorting and filtering
```

### Dashboard MDX Frontmatter Reference

| Field          | Type     | Required | Description                                  |
| -------------- | -------- | -------- | -------------------------------------------- |
| `title`        | string   | ✅       | Display name                                 |
| `slug`         | string   | ✅       | URL-safe identifier (must match folder name) |
| `category`     | string   | ✅       | Usually "dashboard"                          |
| `description`  | string   | ✅       | Short description                            |
| `image`        | string   | ❌       | Preview image path                           |
| `featured`     | boolean  | ❌       | Featured in dashboard listings               |
| `comingSoon`   | boolean  | ❌       | Mark as placeholder (disables click)         |
| `dependencies` | string[] | ❌       | npm packages required                        |

### Step 4: Verify

The dashboard will automatically appear in:

- ✅ `/dashboards` listing page
- ✅ Sidebar navigation (under Dashboards)
- ✅ Command palette search (⌘K)
- ✅ Individual page at `/dashboard/[slug]`

---

## File Structure Examples

### Complete Component Example

```
src/data/contents/components/gradient-card/
├── index.tsx          # GradientCard component
└── demo.tsx           # Demo usage

src/data/contents/registry/gradient-card.mdx  # Metadata
```

### Complete Dashboard Example

```
src/data/contents/dashboards/e-commerce/
├── e-commerce.mdx         # Metadata
├── demo.tsx               # Entry point
├── dashboardLayout.tsx    # Layout wrapper
├── dashboardView.tsx      # Main content
├── card.tsx               # Custom Card component
├── revenueChart.tsx       # Revenue chart
├── transactionTable.tsx   # Transactions list
└── trafficChannel.tsx     # Traffic pie chart
```

---

## Development

### Install Dependencies

```bash
bun install
```

### Run Development Server

```bash
bun dev
```

### Build for Production

```bash
bun run build
```

---

## Branching Strategy

- **`main`**: Production-ready code. Only merged from `dev` after verification.
- **`dev`**: Primary development branch. All feature branches target this branch.
- **`feature/*`**: Individual component or feature development.

### Workflow

1.  Sync with `dev`: `git checkout dev && git pull`
2.  Create feature branch: `git checkout -b feature/my-feature`
3.  Develop and test locally.
4.  Open PR targeting `dev`.

---

## Key Features

- **Auto-discovery**: Components and dashboards are automatically loaded from MDX files
- **Live Preview**: See components in action with hot reloading
- **Code Blocks**: Syntax-highlighted code with copy functionality
- **CLI Integration**: One-click copy for installation commands
- **Search**: Command palette (⌘K) searches all components and dashboards
- **Responsive**: Mobile-friendly drawer views
- **Dark Mode**: Full dark/light theme support

---

## Tips

1. **Slug must match folder name** - If your folder is `my-button`, the slug must be `my-button`
2. **Use consistent categories** - Existing categories: buttons, cards, inputs, forms, navigation
3. **Add preview assets** - Images/videos make cards more engaging
4. **List dependencies** - Users need to know what to install
5. **Coming soon dashboards** - Set `comingSoon: true` for placeholders

---

## License

MIT
