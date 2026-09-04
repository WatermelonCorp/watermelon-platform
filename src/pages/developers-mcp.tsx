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
            The hosted server searches all 850 public examples. Use{' '}
            <code>search</code> for catalog discovery,{' '}
            <code>get_component</code> for source files and install details,{' '}
            <code>get_inspiration</code> to compare visual directions,{' '}
            <code>compose_page</code> to plan compatible page sections, and{' '}
            <code>list_categories</code> for accurate category counts. The
            earlier catalog tools remain available as compatibility aliases.
          </DocText>
        </DocSection>

        <DocSection title="One-Command Setup">
          <DocText>
            The release-ready installer creates a project-scoped configuration
            and connects to the free hosted server; no Watermelon account or
            API key is required. These commands become available when{' '}
            <code>@watermelon-ui/cli</code> is published to npm. Until then,
            use the manual setup below.
          </DocText>
          <DocCard>
            <pre className="overflow-x-auto text-sm leading-7">
              <code>{`npx @watermelon-ui/cli init --client codex
npx @watermelon-ui/cli init --client claude
npx @watermelon-ui/cli init --client cursor`}</code>
            </pre>
          </DocCard>
          <DocText>
            Restart the client after setup, then try: “Search Watermelon for an
            animated pricing section and show me four options.” Follow with
            “Get the source and install command for the best match.”
          </DocText>
        </DocSection>

        <DocSection title="Usage Analytics And Privacy">
          <DocText>
            Watermelon records aggregate MCP handshake and tool-call counts to
            understand service health and improve the public catalog. The
            telemetry does not store IP addresses, session IDs, prompts, tool
            arguments, or client-provided version strings. Client names are
            reduced to broad categories such as <code>chatgpt</code>,{' '}
            <code>claude</code>, <code>cursor</code>, <code>codex</code>, or{' '}
            <code>other</code>.
          </DocText>
          <DocText>
            Check the{' '}
            <a
              href="https://mcp.watermelon.sh/health"
              className="bg-muted rounded-sm px-2 py-px text-black dark:text-white"
            >
              MCP health endpoint
            </a>{' '}
            for the current public service and analytics configuration.
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
            For manual setup: open MCP or tools settings, create a Streamable
            HTTP server named <code>watermelon</code>, paste{' '}
            <code>https://mcp.watermelon.sh/mcp</code>, save, and restart the
            client. Codex users can also run{' '}
            <code>codex mcp add watermelon --url https://mcp.watermelon.sh/mcp</code>.
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
