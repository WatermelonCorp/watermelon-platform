import { SEOHead } from "@/components/seo-head";
import { CodeBlock } from "@/components/mdx";

export default function CLIPage() {
  return (
    <>
      <SEOHead
        title="CLI"
        description="Install Watermelon UI components with a single command. Uses the shadcn CLI to add beautiful React components to your project."
        keywords="CLI, shadcn, npx, install, npm, pnpm, yarn, bun"
      />

      <article className="relative w-full max-w-4xl">
        <header className="pb-8 w-full border-b border-border md:px-16 px-6">
          <h1 className="md:text-3xl text-2xl font-semibold tracking-tight mb-4 font-chivo-mono">
            CLI
          </h1>
          <p className="text-muted-foreground text-md tracking-tight leading-relaxed font-geist-mono">
            Use the CLI to quickly add Watermelon UI components to your project.
          </p>
        </header>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            Watermelon UI uses the shadcn CLI for component installation. No
            additional setup required.
          </p>
          <div>
            <h3 className="font-medium mb-2">Add a component</h3>
            <CodeBlock language="bash">
              {`npx shadcn@latest add https://registry.watermelon.sh/r/button-01.json`}
            </CodeBlock>
          </div>
        </section>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-semibold mb-4">Package Managers</h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            Choose your preferred package manager:
          </p>
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground">npm</span>
              <CodeBlock language="bash">
                {`npx shadcn@latest add https://registry.watermelon.sh/r/[component].json`}
              </CodeBlock>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">pnpm</span>
              <CodeBlock language="bash">
                {`pnpm dlx shadcn@latest add https://registry.watermelon.sh/r/[component].json`}
              </CodeBlock>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">yarn</span>
              <CodeBlock language="bash">
                {`yarn dlx shadcn@latest add https://registry.watermelon.sh/r/[component].json`}
              </CodeBlock>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">bun</span>
              <CodeBlock language="bash">
                {`bunx --bun shadcn@latest add https://registry.watermelon.sh/r/[component].json`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-semibold mb-4">
            Available Components
          </h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            Each component page shows the exact install command. Here are some
            examples:
          </p>
          <div className="space-y-2 font-mono text-sm">
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
        </section>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-semibold mb-4">What Gets Installed</h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            When you run the CLI command, the following happens:
          </p>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                1
              </span>
              <div>
                <span className="font-medium">Component files</span>
                <p className="text-sm text-muted-foreground font-geist-mono">
                  The component code is added to your components directory
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                2
              </span>
              <div>
                <span className="font-medium">Dependencies</span>
                <p className="text-sm text-muted-foreground font-geist-mono">
                  Required npm packages are automatically installed
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                3
              </span>
              <div>
                <span className="font-medium">Utility functions</span>
                <p className="text-sm text-muted-foreground font-geist-mono">
                  Helper functions like cn() are added if not present
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Command not found: shadcn</h3>
              <p className="text-sm text-muted-foreground font-geist-mono">
                Make sure you&apos;re using npx, pnpm dlx, or bunx to run the
                command. The CLI doesn&apos;t need to be installed globally.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Component path conflict</h3>
              <p className="text-sm text-muted-foreground font-geist-mono">
                If prompted about existing files, you can choose to overwrite
                or skip. We recommend backing up your changes first.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Missing Tailwind config</h3>
              <p className="text-sm text-muted-foreground font-geist-mono">
                Run `npx shadcn@latest init` first to set up the base
                configuration before adding components.
              </p>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
