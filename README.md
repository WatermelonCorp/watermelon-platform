# Watermelon Platform

The open-source platform behind [ui.watermelon.sh](https://ui.watermelon.sh).

This repo powers the browsing experience for Watermelon components, animated UI, blocks, dashboards, and templates. It is where discovery, previews, docs, SEO pages, and contributor-facing content all come together.

## What This Repo Does

- renders the public Watermelon UI experience
- loads content from MDX and colocated source files
- previews components, blocks, dashboards, and templates
- generates the sitemap and other search-friendly surfaces
- gives contributors a structured way to publish new content

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- Motion
- React Router
- Bun for the preferred local workflow

## Quick Start

```bash
git clone https://github.com/WatermelonCorp/watermelon-platform.git
cd watermelon-platform
bun install
bun run dev
```

Useful commands:

- `bun run dev`: start the local app
- `bun run build`: generate the sitemap, typecheck, and build production assets
- `bun run lint`: run ESLint
- `bun run preview`: preview the production build locally
- `bun run deploy`: build and deploy

## Content Model

Most public content is file-based and lives in `src/data/contents`.

- `animated-components/`: animated component source folders
- `registry/`: MDX metadata for animated component entries
- `components/`: UI component category configs
- `blocks/`: block content and previews
- `dashboards/`: dashboard entries and demos
- `templates/`: template entries and demos

Routes are wired in `src/components/layout/app-routes.tsx`, and the sitemap is generated from the same content model in `scripts/generate-sitemap.ts`.

## Contributing

The easiest way to contribute is to improve one thing at a time:

1. Read [CONTRIBUTING.md](CONTRIBUTING.md).
2. Pick the content type you want to add or improve.
3. Follow the matching folder pattern in `src/data/contents`.
4. Run `bun run lint` and `bun run build`.
5. Open a PR with screenshots for anything visual.

Docs, polish, accessibility fixes, demo improvements, and contributor experience changes are all valuable contributions here.

## Repository Health

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [AI Policy](AI_POLICY.md)
- [License](LICENSE)

## Support The Work

If Watermelon helps your team, you can support the project through the funding links GitHub surfaces for this repo.

- use the GitHub `Sponsor` button when available
- use the custom funding link configured for the org: [watermelon.sh](https://watermelon.sh)
- star the repo and share it with other builders
