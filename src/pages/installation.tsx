import { SEOHead } from "@/components/seo-head";
import { CodeBlock } from "@/components/mdx";

import {
  DocPage,
  DocHeader,
  DocSection,
  DocText,
  DocCard,
} from "@/components/docs";

export default function InstallationPage() {
  return (
    <>
      <SEOHead
        title="Installation"
        description="Get started with Watermelon UI. Install beautiful React components with a single CLI command. Works with npm, pnpm, yarn, and bun."
        keywords="install, setup, npm, tailwind, react components, shadcn cli"
      />

      <DocPage>
        <DocHeader
          title="Installation"
          description="Get started with Watermelon UI to build modern, responsive, and customizable interfaces with ease. With a simple installation and developer-friendly setup, you can quickly integrate powerful components into your project and create polished, consistent user experiences."
        />

        {/* Prerequisites */}
        <DocSection title="Prerequisites">
          <DocText>
            Ensure your project meets the following requirements before
            installing Watermelon UI:
          </DocText>

          <DocCard>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Node.js 18.0 or later</li>
              <li>• React 18 or later</li>
              <li>• Tailwind CSS 3.4 or later</li>
            </ul>
          </DocCard>
        </DocSection>

        {/* Quick Install */}
        <DocSection title="Quick Install with CLI">
          <DocText>
            The fastest way to add components is using our CLI powered by
            shadcn:
          </DocText>

          <CodeBlock language="bash">
            {`npx shadcn@latest add https://registry.watermelon.sh/r/[component].json`}
          </CodeBlock>
        </DocSection>

        {/* Manual Installation */}
        <DocSection title="Manual Installation">
          <div className="space-y-6">
            <h3 className="font-medium mb-2">1. Install dependencies</h3>
            <CodeBlock language="bash">
              {`npm install tailwindcss motion clsx tailwind-merge`}
            </CodeBlock>

            <h3 className="font-medium mb-2">2. Copy the component code</h3>
            <DocText>
              Browse the components, click the copy button, and paste the code
              into your project.
            </DocText>

            <h3 className="font-medium mb-2">3. Import and use</h3>
            <CodeBlock language="tsx">
              {`import { Component } from "@/components/ui/component";`}
            </CodeBlock>
          </div>
        </DocSection>

        {/* Tailwind Configuration */}
        <DocSection title="Tailwind Configuration">
          <DocText>
            Add the following configuration to your Tailwind setup for optimal
            compatibility:
          </DocText>

          <CodeBlock language="js">
            {`module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}
          </CodeBlock>
        </DocSection>
      </DocPage>
    </>
  );
}
