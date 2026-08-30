# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.3.0] - 2026-08-30

### Added
- Added a dedicated showcase system so curated page compositions can be contributed through source-backed MDX files and pull requests.
- Added developer-facing AI discovery surfaces including `llms.txt`, stronger OpenAPI coverage, a public API docs index, and structured catalog JSON endpoints.
- Added a repository-backed Watermelon MCP server plus a Cloudflare Worker deployment path for hosted MCP.
- Added new trust and developer pages including `/about`, `/contact`, and `/developers`.

### Changed
- Improved the public platform README, contribution guidance, funding links, and open-source repository health docs.
- Expanded sitemap coverage so more public routes are visible to crawlers and agents.
- Shifted the site toward Worker-first agent responses so known routes can return meaningful HTML and markdown while unknown routes return a real `404`.

### Fixed
- Hardened frontend dependencies and cleaned up package risk across the platform.
- Added structured JSON API error responses for catalog endpoints and better machine-readable fallbacks for agents.

## [2.2.0] - 2026-08-20

### Added
- Added five new dashboards across the August shipping cycle: Agndex, Astrix, Tallie, Bionis, and Medesk.
- Approved and integrated more shared components used by the dashboard experiences.

### Changed
- Refined sitemap coverage and dashboard indexing as new content landed.

### Fixed
- Fixed copy interactions, small UI regressions, and general dashboard cleanup discovered during the August release cycle.

## [2.1.2] - 2026-07-29

### Added
- Added new dashboard experiences including Supademo, DemoStack, Librar, Jobtracker, and Gridline.
- Added Open Graph image generation for richer sharing and preview metadata.

### Changed
- Moved static media assets to the CDN for more reliable asset delivery.

### Fixed
- Polished dashboard integrations, theme behavior, tooltips, shadows, mobile sidebar actions, and responsive layout issues across DemoStack, Librar, Jobtracker, and Gridline.

## [2.1.1] - 2026-06-30

### Added
- Added 10 premium animated components featuring polished micro-interactions, smooth transitions, shared layout animations, and production-ready APIs.
- Introduced 6 interactive animated widgets designed for dashboards and landing pages, including highly customizable motion and responsive behavior.
- Released a complete SaaS landing page template with responsive sections, modern animations, pricing, testimonials, FAQs, and conversion-focused layouts.
- Added 10 new website blocks, including Hero, FAQ, Footer, Features, CTA, Stats, Testimonials, Pricing, Logos, and Contact sections.

### Changed
- Refined animation performance across the registry with smoother motion, improved timing, and reduced layout shifts.
- Enhanced component consistency, responsiveness, accessibility, and overall developer experience throughout the library.

## [2.1.0] - 2026-06-26

### Added
- Added 10 new Hero sections featuring modern layouts, interactive elements, and conversion-focused designs.
- Added 4 new Footer sections with improved navigation, responsive structures, and enhanced content organization.
- Added a new Insurance Portfolio Dashboard with policy management, claims monitoring, renewal tracking, portfolio risk analysis, and AI-powered operational insights.
- Released the official Watermelon UI landing page, showcasing the component registry, dashboards, templates, and design system.

### Changed
- Enhanced component consistency across the registry for a more polished developer experience.
- Improved responsiveness and visual refinement throughout blocks, dashboards, and templates.

## [2.0.1] - 2026-06-16

### Added
- Added 17 new Hero sections to the registry with modern layouts, animations, and conversion-focused designs.
- Added 4 new Footer sections featuring enhanced navigation, social links, and responsive layouts.
- Added 7 new Authentication sections including Sign In, Sign Up, and split-screen variants.
- Added 1 new CTA section designed to improve engagement and conversion rates.
- Added a new Web3 Dashboard with portfolio analytics, lending metrics, APY tracking, market insights, and DeFi management tools.

### Changed
- Completely redesigned the Dashboard page with improved layout structure, visual hierarchy, and navigation.
- Enhanced responsiveness and overall user experience across desktop and mobile devices.

### Fixed
- Fixed various component rendering issues across the registry.
- Resolved styling inconsistencies, spacing problems, and responsive layout edge cases.
- Improved component stability and addressed multiple minor UI bugs.

## [2.0.0] - 2026-06-04

### Added
- Added 123 new blocks to the registry, significantly expanding the library of ready-to-use layouts.
- Added 29 premium Hero and Footer sections, providing more high-quality landing page building blocks.

### Changed
- Full platform revamp with refreshed design system, updated layouts, and improved developer experience.
- Improved spacing, hierarchy, and interaction patterns on core pages.

### Removed
- Removed Bento and Dashboard board components from the registry.
