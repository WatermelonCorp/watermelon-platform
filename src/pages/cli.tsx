import { SEOHead } from "@/components/seo-head";
import { CodeBlock } from "@/components/mdx";

import {
  DocPage,
  DocHeader,
  DocSection,
  DocText,
  DocCard,
} from "@/components/docs";

export default function CLIPage() {
  return (
    <>
      <SEOHead
        title="CLI Documentation"
        description="Install Watermelon UI components with a single command. Uses the shadcn CLI to add beautiful React components to your project."
        keywords="CLI, shadcn, npx, install, npm, pnpm, yarn, bun"
      />

      <DocPage>
        <DocHeader
          title="CLI"
          description="Use the CLI to quickly add Watermelon UI components to your project."
        />

        {/* Quick Start */}
        <DocSection title="Quick Start">
          <DocText>
            Watermelon UI uses the shadcn CLI for component installation.
            No additional setup is required.
          </DocText>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Add a component</h3>
            <CodeBlock language="bash">
              {`npx shadcn@latest add https://registry.watermelon.sh/r/button-01.json`}
            </CodeBlock>
          </div>
        </DocSection>

        {/* Package Managers */}
        <DocSection title="Package Managers">
          <DocText>
            Choose your preferred package manager:
          </DocText>

          <div className="space-y-6">
            <span className="text-xs font-medium text-muted-foreground">
              npm
            </span>
            <CodeBlock language="bash">
              {`npx shadcn@latest add https://registry.watermelon.sh/r/[component].json`}
            </CodeBlock>

            <span className="text-xs font-medium text-muted-foreground">
              pnpm
            </span>
            <CodeBlock language="bash">
              {`pnpm dlx shadcn@latest add https://registry.watermelon.sh/r/[component].json`}
            </CodeBlock>

            <span className="text-xs font-medium text-muted-foreground">
              yarn
            </span>
            <CodeBlock language="bash">
              {`yarn dlx shadcn@latest add https://registry.watermelon.sh/r/[component].json`}
            </CodeBlock>
            <span className="text-xs font-medium text-muted-foreground">
              bun
            </span>
            <CodeBlock language="bash">
              {`bunx --bun shadcn@latest add https://registry.watermelon.sh/r/[component].json`}
            </CodeBlock>
          </div>
        </DocSection>

        {/* Available Components */}
        <DocSection title="Available Components">
          <DocText>
            Each component page shows the exact install command.
            Here are a few examples:
          </DocText>

          <div className="space-y-3">
            <CodeBlock language="bash">
              {`npx shadcn@latest add https://registry.watermelon.sh/r/button-01.json`}
            </CodeBlock>
            <CodeBlock language="bash">
              {`npx shadcn@latest add https://registry.watermelon.sh/r/alert-01.json`}
            </CodeBlock>
            <CodeBlock language="bash">
              {`npx shadcn@latest add https://registry.watermelon.sh/r/avatar-01.json`}
            </CodeBlock>
            <CodeBlock language="bash">
              {`npx shadcn@latest add https://registry.watermelon.sh/r/analytics-dashboard.json`}
            </CodeBlock>
          </div>
        </DocSection>

        {/* What Gets Installed */}
        <DocSection title="What Gets Installed">
          <DocText>
            When you run the CLI command, the following happens:
          </DocText>

          <div className="space-y-4">
            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                1
              </span>
              <div>
                <p className="font-medium">Component files</p>
                <p className="text-sm text-muted-foreground">
                  Component code is added to your components directory.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                2
              </span>
              <div>
                <p className="font-medium">Dependencies</p>
                <p className="text-sm text-muted-foreground">
                  Required npm packages are automatically installed.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                3
              </span>
              <div>
                <p className="font-medium">Utility functions</p>
                <p className="text-sm text-muted-foreground">
                  Helper functions like <code>cn()</code> are added if missing.
                </p>
              </div>
            </div>
          </div>
        </DocSection>

        {/* Troubleshooting */}
        <DocSection title="Troubleshooting">
          <div className="space-y-6">
            <DocCard>
              <h3 className="font-medium mb-1">
                Command not found: shadcn
              </h3>
              <DocText>
                Use <code>npx</code>, <code>pnpm dlx</code>, or <code>bunx</code>.
                The CLI does not need to be installed globally.
              </DocText>
            </DocCard>

            <DocCard>
              <h3 className="font-medium mb-1">
                Component path conflict
              </h3>
              <DocText>
                If prompted about existing files, you can overwrite or skip.
                We recommend backing up your changes first.
              </DocText>
            </DocCard>

            <DocCard>
              <h3 className="font-medium mb-1">
                Missing Tailwind config
              </h3>
              <DocText>
                Run <code>npx shadcn@latest init</code> to set up the base
                configuration before adding components.
              </DocText>
            </DocCard>
          </div>
        </DocSection>
      </DocPage>
    </>
  );
}
