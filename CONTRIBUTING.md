# Contributing to Watermelon Platform

Thanks for helping improve the platform behind `ui.watermelon.sh`.

## Quick Start

```bash
git clone https://github.com/WatermelonCorp/watermelon-platform.git
cd watermelon-platform
bun install
bun run dev
```

Before opening a pull request, run:

```bash
bun run lint
bun run build
```

## Ways To Contribute

- fix bugs or regressions
- improve docs and contributor workflows
- add or refine animated components
- add or refine blocks, dashboards, or templates
- improve accessibility, performance, or SEO

For larger feature work, please open an issue or discussion first so effort does not drift.

## Content Workflows

### Animated Components

1. Create or update files under `src/data/contents/animated-components/<slug>/`.
2. Add or update the matching MDX entry in `src/data/contents/registry/<slug>.mdx`.
3. Keep the folder name, frontmatter `slug`, and install command aligned.

### Blocks

1. Create or update files under `src/data/contents/blocks/<category>/<slug>/`.
2. Add or update `<slug>.mdx` in that same folder.
3. Keep demos responsive and self-contained.

### Dashboards

1. Create or update files under `src/data/contents/dashboards/<slug>/`.
2. Add or update `<slug>.mdx` in that same folder.
3. Keep dashboard-specific code colocated with the entry.

### Templates

1. Create or update files under `src/data/contents/templates/<slug>/`.
2. Add or update `<slug>.mdx` in that same folder.
3. Prefer realistic examples that help people ship faster.

## Pull Request Guidelines

1. Use a branch instead of pushing directly to `main`.
2. Keep the PR focused on one improvement or one content area.
3. Explain the user-facing change clearly.
4. Include screenshots or recordings for visual changes.
5. Update docs when setup, content structure, or workflows change.

## Quality Bar

- match the existing TypeScript and styling patterns
- keep demos readable and mobile-friendly
- avoid unnecessary dependencies
- prefer accessibility and clarity over cleverness
- call out any breaking changes directly in the PR

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
