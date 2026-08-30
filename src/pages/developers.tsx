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
            Watermelon now exposes a small but intentional set of developer-facing discovery surfaces so both humans and AI systems can understand the project faster. Start with <a href="/llms.txt" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/llms.txt</a> for high-signal project guidance, <a href="/sitemap.xml" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/sitemap.xml</a> for crawlable public URLs, <a href="/openapi.json" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/openapi.json</a> for the current public API contract, and <a href="/api/docs" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/api/docs</a> for a quick machine-readable API index. These files are meant to make the site easier to discover, cite, and integrate with.
          </DocText>
        </DocSection>

        <DocSection title="Watermelon MCP">
          <DocCard>
            <DocText>
              Watermelon exposes both a hosted and a local MCP story for agent workflows. The hosted endpoint lives at <a href="https://mcp.watermelon.sh/" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">mcp.watermelon.sh</a>, and the repository also includes a local MCP server for source-aware workflows. Both are aimed at tools and assistants that need structured access to the catalog without scraping the UI manually. The current server is read-only and exposes catalog helpers so an agent can inspect components, blocks, templates, dashboards, and showcases from the source content. Run it locally with <code>bun run mcp</code> from the repository root.
            </DocText>
          </DocCard>
        </DocSection>

        <DocSection title="How To Use MCP">
          <DocText>
            The easiest setup is to use the hosted Watermelon MCP server. In any MCP-compatible client, add a new remote MCP server and use <code>https://mcp.watermelon.sh/mcp</code> as the server URL. Once connected, your client should be able to call the read-only Watermelon catalog tools without scraping the site manually.
          </DocText>
          <DocText>
            If you are using a GPT- or Claude-style client with MCP support, open that client’s MCP or tools settings, create a new server connection, paste <code>https://mcp.watermelon.sh/mcp</code>, and save it. After that, ask the model to list catalog entries, fetch a specific Watermelon entry, or summarize the catalog structure.
          </DocText>
          <DocText>
            If your client only supports local MCP servers, clone the <a href="https://github.com/WatermelonCorp/watermelon-platform" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">watermelon-platform</a> repository and run <code>bun run mcp</code> from the project root. That starts the local Watermelon MCP server for source-aware development workflows.
          </DocText>
        </DocSection>

        <DocSection title="Named Docs">
          <DocText>
            If you are searching by name, Watermelon also publishes dedicated pages for <a href="/developers/auth" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">Watermelon UI Auth Docs</a> and <a href="/developers/mcp" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">Watermelon UI MCP Docs</a>. Those pages explain the current access model, hosted MCP endpoint, and how to connect from GPT- or Claude-compatible MCP clients.
          </DocText>
        </DocSection>

        <DocSection title="What To Use For What">
          <DocText>
            Use the public website if you want visual browsing and previews. Use the OpenAPI description and <a href="/api/docs" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/api/docs</a> if you need the current public catalog endpoint contract. Use `llms.txt` if you want a concise, citation-friendly guide to what Watermelon is and where the best pages live. Use MCP when you want an agent to work from the source-backed catalog and contribution model instead of navigating the front-end page by page.
          </DocText>
        </DocSection>
      </DocPage>
    </>
  );
}
