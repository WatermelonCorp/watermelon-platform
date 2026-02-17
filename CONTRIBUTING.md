# Contributing

Thanks for contributing to Watermelon Platform. This guide focuses on adding new components to the registry.

## Setup

1. Install dependencies: `bun install`
2. Start the dev server: `bun run dev`

## Create A Branch

1. Sync your local `dev`: `git checkout dev` then `git pull`
2. Create a feature branch: `git checkout -b feature/<component-slug>`

## Add A Component

1. Pick a kebab-case slug for the component, for example `animated-button`.
2. Create `src/data/contents/components/<slug>/index.tsx`.
3. Create `src/data/contents/components/<slug>/demo.tsx`.
4. Create `src/data/contents/registry/<slug>.mdx`.
5. Match the slug across all locations: MDX frontmatter `slug`, the folder name, and any references in your MDX content.
6. Use this frontmatter shape in the MDX file:

```mdx
---
title: Animated Button
slug: animated-button
category: buttons
description: A button with a smooth hover animation.
image: /previews/animated-button.jpg
video: /previews/animated-button.mp4
dependencies: ['framer-motion']
install:
  - npx shadcn@latest add https://registry.watermelon.sh/r/animated-button.json
---
```

## Add A Block

1. Create a new folder under `src/data/contents/blocks/<slug>/`.
2. Create `src/data/contents/blocks/<slug>/demo.tsx` (the main export from this file will be rendered in the preview).
3. Create `src/data/contents/blocks/<slug>/<slug>.mdx` for documentation and metadata.
4. Add any supporting components or files within the same folder.
5. Use this frontmatter shape in the MDX file:

```mdx
---
title: Feature Section
slug: feature-section
category: sections
description: A modern feature grid section.
image: /blocks/feature-section.png
video: /blocks/feature-section.mp4
dependencies: ['lucide-react']
install:
  - npx shadcn@latest add https://registry.watermelon.sh/r/feature-section.json
---
```

## Add A Dashboard

1. Create a new folder under `src/data/contents/dashboards/<slug>/`.
2. Create `src/data/contents/dashboards/<slug>/demo.tsx`.
3. Create `src/data/contents/dashboards/<slug>/<slug>.mdx`.
4. Place all dashboard-specific layouts, views, and data files within this folder to keep it self-contained.
5. Use this frontmatter shape in the MDX file:

```mdx
---
title: Admin Dashboard
slug: admin-dashboard
category: dashboard
description: A comprehensive admin interface.
image: /dashboards/admin-dashboard.webp
video: /dashboards/admin-dashboard.mp4
dependencies: ['recharts']
install:
  - npx shadcn@latest add https://registry.watermelon.sh/r/admin-dashboard.json
---
```

## Run Checks

1. Lint: `bun run lint`
2. Build: `bun run build`

## Submit Your PR

1. Push your branch: `git push -u origin feature/<component-slug>`
2. Open a pull request targeting the `dev` branch.
3. Provide a short summary and screenshots or a video of the component demo.

## Tips

1. Keep demos focused and responsive.
2. Prefer small, composable APIs in `index.tsx` and keep `demo.tsx` as a usage example only.
