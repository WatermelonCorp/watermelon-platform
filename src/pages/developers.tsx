import { SEOHead } from '@/components/seo-head';
import { DocPage, DocHeader, DocSection, DocText, DocCard } from '@/components/docs';

export default function DevelopersPage() {
  return (
    <>
      <SEOHead
        title="Developers"
        description="Developer-facing entry points for Watermelon UI, including docs, sitemap, llms.txt, OpenAPI, and the Watermelon MCP server."
        keywords="watermelon ui developers, llms.txt, openapi, mcp, api docs"
      />

      <DocPage>
        <DocHeader
          title="Developers"
          description="Machine-readable and contributor-facing entry points for agents, tools, and engineers."
        />

        <DocSection title="Public Discovery Surfaces">
          <DocText>
            Watermelon now exposes a small but intentional set of developer-facing discovery surfaces so both humans and AI systems can understand the project faster. Start with <a href="/llms.txt" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/llms.txt</a> for high-signal project guidance, <a href="/sitemap.xml" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/sitemap.xml</a> for crawlable public URLs, and <a href="/openapi.json" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/openapi.json</a> for the current public API contract. These files are meant to make the site easier to discover, cite, and integrate with.
          </DocText>
        </DocSection>

        <DocSection title="Watermelon MCP">
          <DocCard>
            <DocText>
              The repository also includes a Watermelon MCP server for local agent workflows. It is aimed at tools and assistants that need structured access to the catalog without scraping the UI manually. The current server is repository-backed and exposes read-only catalog helpers so an agent can inspect components, blocks, templates, dashboards, and showcases from the source content. Run it locally with <code>bun run mcp</code> from the repository root.
            </DocText>
          </DocCard>
        </DocSection>

        <DocSection title="What To Use For What">
          <DocText>
            Use the public website if you want visual browsing and previews. Use the OpenAPI description if you need the current public image-generation endpoint contract. Use `llms.txt` if you want a concise, citation-friendly guide to what Watermelon is and where the best pages live. Use the local MCP server when you want an agent to work directly from the source-backed catalog and contribution model instead of navigating the front-end page by page.
          </DocText>
        </DocSection>
      </DocPage>
    </>
  );
}
