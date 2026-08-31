import { SEOHead } from '@/components/seo-head';
import {
  DocPage,
  DocHeader,
  DocSection,
  DocText,
  DocCard,
} from '@/components/docs';

export default function DevelopersMcpPage() {
  return (
    <>
      <SEOHead
        title="Watermelon UI MCP Docs"
        description="How to connect to the hosted Watermelon MCP server, inspect the catalog, and use it from ChatGPT- or Claude-compatible MCP clients."
        keywords="watermelon ui mcp docs, watermelon mcp, chatgpt mcp, claude mcp"
      />

      <DocPage>
        <DocHeader
          title="Watermelon UI MCP Docs"
          description="Connection details and usage guidance for the hosted and local Watermelon MCP servers."
        />

        <DocSection title="Hosted Endpoint">
          <DocCard>
            <DocText>
              The hosted Watermelon MCP endpoint is{' '}
              <code>https://mcp.watermelon.sh/mcp</code>. Discovery metadata is
              available at{' '}
              <a
                href="https://mcp.watermelon.sh/"
                className="bg-muted rounded-sm px-2 py-px text-black dark:text-white"
              >
                mcp.watermelon.sh
              </a>
              , health information is available at{' '}
              <a
                href="https://mcp.watermelon.sh/health"
                className="bg-muted rounded-sm px-2 py-px text-black dark:text-white"
              >
                /health
              </a>
              , and a short machine-readable overview is published at{' '}
              <a
                href="https://mcp.watermelon.sh/llms.txt"
                className="bg-muted rounded-sm px-2 py-px text-black dark:text-white"
              >
                /llms.txt
              </a>
              .
            </DocText>
          </DocCard>
        </DocSection>

        <DocSection title="Available Tools">
          <DocText>
            The current hosted toolset is intentionally small and read-only:{' '}
            <code>catalog_summary</code>, <code>list_catalog_entries</code>, and{' '}
            <code>get_catalog_entry</code>. These are enough for an agent to
            inspect Watermelon’s public catalog without scraping the website
            page by page.
          </DocText>
        </DocSection>

        <DocSection title="ChatGPT And Claude">
          <DocText>
            Watermelon MCP is designed for MCP-compatible clients that support
            remote Streamable HTTP servers. That includes modern GPT- and
            Claude-oriented MCP workflows when the client supports remote MCP
            connections. The exact connection screen varies by app, but the
            value to enter is the hosted endpoint URL:{' '}
            <code>https://mcp.watermelon.sh/mcp</code>.
          </DocText>
          <DocText>
            A simple flow is: open MCP or tools settings, create a new remote
            server, paste <code>https://mcp.watermelon.sh/mcp</code>, save, then
            ask your model to list catalog entries or fetch a specific
            Watermelon UI block, template, showcase, or dashboard by slug.
          </DocText>
          <DocText>
            If your client only supports local MCP servers, use the
            repository-backed local server instead by cloning{' '}
            <a
              href="https://github.com/WatermelonCorp/watermelon-platform"
              className="bg-muted rounded-sm px-2 py-px text-black dark:text-white"
            >
              watermelon-platform
            </a>{' '}
            and running <code>bun run mcp</code> from the repository root.
          </DocText>
        </DocSection>

        <DocSection title="When To Use MCP">
          <DocText>
            Use the hosted MCP server when an agent needs structured Watermelon
            catalog access inside an MCP-native tool flow. Use the website when
            you want visual previews. Use{' '}
            <a
              href="/openapi.json"
              className="bg-muted rounded-sm px-2 py-px text-black dark:text-white"
            >
              /openapi.json
            </a>{' '}
            and{' '}
            <a
              href="/api/docs"
              className="bg-muted rounded-sm px-2 py-px text-black dark:text-white"
            >
              /api/docs
            </a>{' '}
            when a plain HTTP integration is easier than a full MCP client.
          </DocText>
        </DocSection>
      </DocPage>
    </>
  );
}
