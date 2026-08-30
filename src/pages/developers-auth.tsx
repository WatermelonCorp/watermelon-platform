import { SEOHead } from '@/components/seo-head';
import { DocPage, DocHeader, DocSection, DocText, DocCard } from '@/components/docs';

export default function DevelopersAuthPage() {
  return (
    <>
      <SEOHead
        title="Watermelon UI Auth Docs"
        description="Authentication and access model for Watermelon UI public APIs, developer resources, and the hosted Watermelon MCP endpoint."
        keywords="watermelon ui auth docs, watermelon api auth, watermelon mcp auth"
      />

      <DocPage>
        <DocHeader
          title="Watermelon UI Auth Docs"
          description="How authentication works across Watermelon public developer surfaces."
        />

        <DocSection title="Current Access Model">
          <DocCard>
            <DocText>
              Watermelon UI public developer resources are currently read-only and do not require account authentication. That includes <a href="/llms.txt" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/llms.txt</a>, <a href="/sitemap.xml" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/sitemap.xml</a>, <a href="/openapi.json" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/openapi.json</a>, <a href="/api/docs" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">/api/docs</a>, and the hosted MCP discovery surface at <a href="https://mcp.watermelon.sh/" className="rounded-sm bg-muted px-2 py-px text-black dark:text-white">mcp.watermelon.sh</a>.
            </DocText>
          </DocCard>
        </DocSection>

        <DocSection title="Public API">
          <DocText>
            The public HTTP API is read-only. It exposes catalog discovery endpoints for summary, listing, and single-entry lookup. No bearer token, API key, or cookie-based session is required. Cross-origin requests are allowed for documented GET and OPTIONS routes, and rate-limit headers are returned so clients can self-throttle.
          </DocText>
        </DocSection>

        <DocSection title="Hosted MCP">
          <DocText>
            The hosted Watermelon MCP endpoint is currently public and unauthenticated. Clients connect to <code>https://mcp.watermelon.sh/mcp</code> using Streamable HTTP. The remote endpoint is intended for read-only catalog access, not for account mutation or private content access.
          </DocText>
        </DocSection>

        <DocSection title="Future Changes">
          <DocText>
            If Watermelon introduces authenticated write APIs, protected partner surfaces, or scoped tokens in the future, those changes should be documented here first with clear credential requirements, auth headers, and migration notes. Until then, agents should assume the documented public resources are intentionally open and read-only.
          </DocText>
        </DocSection>
      </DocPage>
    </>
  );
}
