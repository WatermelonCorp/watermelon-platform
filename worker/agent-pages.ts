export interface AgentPage {
  title: string;
  description: string;
  markdown: string;
}

export const agentPages: Record<string, AgentPage> = {
  '/': {
    title: 'Watermelon UI',
    description: 'Open-source React components, blocks, dashboards, templates, and showcases built for the community.',
    markdown: `# Watermelon UI

Watermelon UI is an open-source React UI platform built for developers who want strong visual references and real implementation paths at the same time. The site brings together animated components, copy-paste blocks, dashboards, templates, and curated showcases so builders can move from inspiration to shipping faster without losing sight of maintainability. Watermelon is free for the community to browse and use, and the project is maintained in public repositories so contributors can improve the experience directly through pull requests.

## When to use Watermelon

- Use Watermelon when you need production-style React UI ideas with a clear path to implementation.
- Use the blocks and showcases when a task needs full page sections or realistic compositions instead of one isolated widget.
- Use the developers resources when an agent needs machine-readable entry points such as llms.txt, sitemap.xml, OpenAPI, or MCP.

## Main product areas

- [Docs home](https://ui.watermelon.sh/home): browsing surface for the public catalog
- [Animated components](https://ui.watermelon.sh/animated-components): interaction-heavy React examples
- [Blocks](https://ui.watermelon.sh/blocks): reusable landing-page and product sections
- [Showcases](https://ui.watermelon.sh/showcases): curated compositions built from existing blocks
- [Dashboards](https://ui.watermelon.sh/dashboards): dashboard examples and layouts
- [Templates](https://ui.watermelon.sh/templates): template-style starting points

## Developer resources

- [Developers](https://ui.watermelon.sh/developers)
- [llms.txt](https://ui.watermelon.sh/llms.txt)
- [OpenAPI](https://ui.watermelon.sh/openapi.json)
- [Sitemap](https://ui.watermelon.sh/sitemap.xml)
- [MCP](https://mcp.watermelon.sh/)

## Trust and contact

- [About](https://ui.watermelon.sh/about)
- [Contact](https://ui.watermelon.sh/contact)
- [Privacy](https://ui.watermelon.sh/privacy)
- [Terms](https://ui.watermelon.sh/terms)

Watermelon is built in the open by WatermelonCorp and the public platform source lives at [github.com/WatermelonCorp/watermelon-platform](https://github.com/WatermelonCorp/watermelon-platform).`,
  },
  '/developers': {
    title: 'Watermelon UI Developers',
    description: 'Developer-facing entry points for Watermelon UI, including docs, sitemap, OpenAPI, public catalog API, and MCP.',
    markdown: `# Watermelon UI Developers

This page is the fastest way for an engineer or agent to understand Watermelon UI from the outside in. Watermelon exposes a small but intentional set of public resources so humans and AI systems can discover the project, inspect the public catalog, and understand where source-backed contribution paths live.

## Recommended starting points

- [llms.txt](https://ui.watermelon.sh/llms.txt): concise project guidance and when-to-use instructions
- [OpenAPI](https://ui.watermelon.sh/openapi.json): public HTTP contract for machine-readable endpoints
- [Sitemap](https://ui.watermelon.sh/sitemap.xml): crawlable public URL inventory
- [Public catalog summary](https://ui.watermelon.sh/api/catalog/summary): counts by content type
- [Public catalog entries](https://ui.watermelon.sh/api/catalog/entries): list catalog entries by kind

## Public API

The public API is read-only and designed to help agents inspect the Watermelon catalog without scraping the UI. It currently supports summary, filtered listing, and single-entry lookup across animated components, blocks, dashboards, templates, and showcases. JSON errors are structured with machine-readable codes, messages, and resolution hints.

## MCP

Watermelon also provides MCP support for agent workflows. The hosted MCP endpoint is intended for [mcp.watermelon.sh](https://mcp.watermelon.sh/) and the platform repository also contains a repository-backed local MCP server for development and source-aware automation.

## Source of truth

The UI is helpful for browsing, but the repositories are the source of truth for implementation and contribution:

- [WatermelonCorp GitHub organization](https://github.com/WatermelonCorp)
- [watermelon-platform repository](https://github.com/WatermelonCorp/watermelon-platform)
- [watermellon-registry repository](https://github.com/WatermelonCorp/watermellon-registry)`,
  },
  '/about': {
    title: 'About Watermelon UI',
    description: 'Why Watermelon UI exists, what it covers, and how the open-source community helps shape it.',
    markdown: `# About Watermelon UI

Watermelon UI is an open-source interface ecosystem focused on practical building blocks for modern React products. The project brings together animated components, reusable blocks, dashboards, templates, documentation, and curated showcases in one place so developers can understand an interface quickly and adapt it confidently. The public site at ui.watermelon.sh is the browsing layer for that ecosystem, while the source repositories hold the implementation details and contribution workflows.

We are building Watermelon to be useful for solo builders, startups, and product teams that want a faster path from design inspiration to maintainable code. The goal is not to flood people with abstract design-system theory. The goal is to provide strong starting points, realistic compositions, and source-backed examples that are easier to learn from and easier to improve.

Watermelon is free for the community to use. Sponsorship support helps fund maintenance, hosting, accessibility improvements, contributor experience, design iteration, and ongoing quality work across the ecosystem. Contributions are welcome across docs, code, showcases, SEO, AI discoverability, and new component ideas.`,
  },
  '/contact': {
    title: 'Contact Watermelon UI',
    description: 'How to contact Watermelon UI for support, partnerships, sponsorship, and reports.',
    markdown: `# Contact Watermelon UI

For general questions, contributor coordination, partnership inquiries, sponsorship conversations, or feedback about the site, email [watermeloncorpui@gmail.com](mailto:watermeloncorpui@gmail.com). That is the primary public contact path for Watermelon UI today.

If you are reporting a problem, please include the affected URL, repository link when relevant, reproduction steps, screenshots, timestamps, and a short description of the impact. Concrete context helps us respond faster and reduces back-and-forth.

For security issues, licensing concerns, attribution corrections, or content reports, include as much evidence as possible. Helpful details include original source links, repository references, screenshots, and the exact page or asset that needs review.

Watermelon is built for the wider builder community, so we try to keep support and collaboration straightforward. If your message is about sponsoring the work or helping expand the open-source ecosystem, say that directly and we can route the conversation appropriately.`,
  },
  '/privacy': {
    title: 'Watermelon UI Privacy Policy',
    description: 'How Watermelon UI handles analytics, basic usage data, and public contact requests.',
    markdown: `# Watermelon UI Privacy Policy

Watermelon UI is a public browsing and discovery platform, not a personal account system with complex user data storage. We may collect limited technical and usage information such as page views, interaction events, browser or device metadata, and referral information to understand whether the site is working well and where the product experience still has friction.

We use analytics tools such as GA4 and PostHog to understand traffic and product usage patterns. If your browser or network blocks those scripts, some analytics may not run. We do not intentionally collect unnecessary sensitive personal data through normal site usage.

We use collected information for troubleshooting, performance monitoring, feature planning, contributor experience improvements, and product quality work. If we introduce new flows that collect materially different data in the future, this policy should be updated clearly rather than hidden behind vague wording.

For privacy-related questions or requests, contact [watermeloncorpui@gmail.com](mailto:watermeloncorpui@gmail.com).`,
  },
  '/terms': {
    title: 'Watermelon UI Terms of Use',
    description: 'Rules and conditions for using Watermelon UI, its code examples, and public materials.',
    markdown: `# Watermelon UI Terms of Use

By accessing or using Watermelon UI, you agree to these terms. You may browse, copy, and use components from the site in line with the relevant repository licenses and terms. You are responsible for making sure your own project complies with your legal, licensing, accessibility, and security requirements.

Watermelon UI is built to accelerate development, not replace engineering judgment. We care about quality, but adopters are still responsible for validating code, reviewing dependencies, and checking whether an implementation fits their own product needs.

We do not intentionally copy proprietary source code from other creators. We may take visual inspiration from publicly shared designs and build our own implementation. Where known, we provide credit in the inspired-by metadata or public page content.

If you believe a design or implementation on the site is yours and is being used improperly, contact [watermeloncorpui@gmail.com](mailto:watermeloncorpui@gmail.com) with original source links, timestamps, repository references, or similar evidence. Resolution may include attribution updates, modifications, or removal after review.`,
  },
};

export function renderMarkdownAsHtml(markdown: string) {
  return markdown
    .split('\n\n')
    .map((block) => {
      if (block.startsWith('# ')) {
        return `<h1>${escapeHtml(block.slice(2))}</h1>`;
      }

      if (block.startsWith('## ')) {
        return `<h2>${escapeHtml(block.slice(3))}</h2>`;
      }

      if (block.startsWith('- ')) {
        const items = block
          .split('\n')
          .map((line) => line.replace(/^- /, '').trim())
          .map((line) => `<li>${linkifyInline(escapeHtml(line))}</li>`)
          .join('');

        return `<ul>${items}</ul>`;
      }

      return `<p>${linkifyInline(escapeHtml(block).replace(/\n/g, '<br />'))}</p>`;
    })
    .join('\n');
}

function linkifyInline(input: string) {
  return input.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+|mailto:[^)]+)\)/g,
    '<a href="$2">$1</a>',
  );
}

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
