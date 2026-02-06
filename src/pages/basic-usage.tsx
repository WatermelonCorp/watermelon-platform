import { SEOHead } from "@/components/seo-head";
import { CodeBlock } from "@/components/mdx";

import {
  DocPage,
  DocHeader,
  DocSection,
  DocText,
  DocCard,
} from "@/components/docs";

export default function BasicUsagePage() {
  return (
    <>
      <SEOHead
        title="Basic Usage"
        description="Learn how to use Watermelon UI components in your React projects. Copy-paste ready components with AI-powered prompts."
        keywords="react components, usage, copy-paste, tailwind, AI prompts, cursor, copilot"
      />

      <DocPage>
        <DocHeader
          title="Basic Usage"
          description="Learn how to use Watermelon UI components in your projects."
        />

        {/* Using Components */}
        <DocSection title="Using Components">
          <DocText>
            Watermelon UI components are designed to be copy-paste ready.
            Browse the library, preview variants, and add components directly
            to your project.
          </DocText>

          <div className="space-y-6">

            <h3 className="font-medium mb-1">Step 1: Find a component</h3>
            <DocText>
              Browse the components section and preview different variants.
            </DocText>



            <h3 className="font-medium mb-2">Step 2: Install via CLI</h3>
            <CodeBlock language="bash">
              {`npx shadcn@latest add https://registry.watermelon.sh/r/button-01.json`}
            </CodeBlock>


            <h3 className="font-medium mb-2">Step 3: Import and use</h3>
            <CodeBlock language="tsx">
              {`import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return (
    <Button onClick={() => console.log("clicked")}>
      Click me
    </Button>
  );
}`}
            </CodeBlock>
          </div>
        </DocSection>

        {/* AI-Powered Prompts */}
        <DocSection title="AI-Powered Prompts">
          <DocText>
            Every component includes optimized prompts for popular AI coding
            assistants. Click the AI icon to copy a tailored prompt for:
          </DocText>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <DocCard className="text-center">
              <img
                src="/brand/claude-logo.webp"
                className="size-10 mx-auto"
                alt="Claude AI logo"
                loading="lazy"
                width={40}
                height={40}
              />
              <h3 className="mt-2 font-medium">Claude</h3>
              <p className="text-sm text-muted-foreground">
                Anthropic&apos;s AI
              </p>
            </DocCard>

            <DocCard className="text-center">
              <img
                src="/brand/cursor-logo-icon.png"
                className="size-10 mx-auto"
                alt="Cursor editor logo"
                loading="lazy"
                width={40}
                height={40}
              />
              <h3 className="mt-2 font-medium">Cursor</h3>
              <p className="text-sm text-muted-foreground">
                AI-first editor
              </p>
            </DocCard>

            <DocCard className="text-center">
              <img
                src="/brand/githubcopilot.png"
                className="size-10 mx-auto"
                alt="GitHub Copilot logo"
                loading="lazy"
                width={40}
                height={40}
              />
              <h3 className="mt-2 font-medium">Copilot</h3>
              <p className="text-sm text-muted-foreground">
                GitHub&apos;s assistant
              </p>
            </DocCard>
          </div>
        </DocSection>

        {/* Customization */}
        <DocSection title="Customization">
          <DocText>
            All components are built with Tailwind CSS and are fully
            customizable. Common patterns include:
          </DocText>

          <ul className="space-y-2 text-sm text-muted-foreground max-w-2xl">
            <li>• Override styles using the <code>className</code> prop</li>
            <li>• Modify CSS variables for theming</li>
            <li>• Extend component props for extra behavior</li>
            <li>• Compose multiple components together</li>
          </ul>
        </DocSection>

        {/* Dark Mode */}
        <DocSection title="Dark Mode">
          <DocText>
            All components support dark mode out of the box. Enable it in
            your app using one of the following approaches:
          </DocText>

          <CodeBlock language="tsx">
            {`// Add dark class to html element
<html className="dark">

// Or use next-themes
import { ThemeProvider } from "next-themes";

<ThemeProvider attribute="class">
  <App />
</ThemeProvider>`}
          </CodeBlock>
        </DocSection>
      </DocPage>
    </>
  );
}
