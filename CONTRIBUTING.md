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
5. Match the slug across all three locations: MDX frontmatter `slug`, the folder name under `src/data/contents/components/`, and any links or references in your MDX content.
6. Use this frontmatter shape in the MDX file (example values shown):

```mdx
---
title: Animated Button
slug: animated-button
category: buttons
description: A button with a smooth hover animation and click effect.
image: https://example.com/preview.jpg
video: https://example.com/preview.mp4
featured: false
featuredOrder: 99
componentNumber: 0
dependencies: ['framer-motion', 'lucide-react']
inspiredByName: Vercel
inspiredByLink: https://vercel.com
install:
  - npx shadcn@latest add https://registry.watermelonui.com/components/animated-button.json
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
