import { SEOHead } from "@/components/seo-head";
import { CodeBlock } from "@/components/mdx";

export default function BasicUsagePage() {
  return (
    <>
      <SEOHead
        title="Basic Usage"
        description="Learn how to use Watermelon UI components in your React projects. Copy-paste ready components with AI-powered prompts for Claude, Cursor, and Copilot."
        keywords="react components, usage, copy-paste, tailwind, AI prompts, cursor, copilot"
      />

      <article className="relative w-full max-w-4xl">
        <header className="pb-8 w-full border-b border-border md:px-16 px-6">
          <h1 className="md:text-3xl text-2xl font-semibold tracking-tight mb-4 font-chivo-mono">
            Basic Usage
          </h1>
          <p className="text-muted-foreground text-md tracking-tight leading-relaxed font-geist-mono">
            Learn how to use Watermelon UI components in your projects.
          </p>
        </header>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-medium mb-4">Using Components</h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            Watermelon UI components are designed to be copy-paste ready.
            Simply browse our library, find a component you like, and add it
            to your project.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Step 1: Find a component</h3>
              <p className="text-muted-foreground font-geist-mono">
                Browse the components section and preview different variants.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Step 2: Install via CLI</h3>
              <CodeBlock language="bash">
                {`npx shadcn@latest add https://registry.watermelon.sh/r/button-01.json`}
              </CodeBlock>
            </div>
            <div>
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
          </div>
        </section>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-medium mb-4">AI-Powered Prompts</h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            Every component includes optimized prompts for popular AI coding
            assistants. Click the AI icon to copy a prompt tailored for:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <img
                src="/brand/claude-logo.webp"
                className="size-10 mx-auto"
                alt="Claude AI logo"
                loading="lazy"
                width={40}
                height={40}
              />
              <h3 className="font-medium">Claude</h3>
              <p className="text-sm text-muted-foreground">
                Anthropic&apos;s AI
              </p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <img
                src="/brand/cursor-logo-icon.png"
                className="size-10 mx-auto"
                alt="Cursor editor logo"
                loading="lazy"
                width={40}
                height={40}
              />
              <h3 className="font-medium">Cursor</h3>
              <p className="text-sm text-muted-foreground">AI-first editor</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-center">
              <img
                src="/brand/githubcopilot.png"
                className="size-10 mx-auto"
                alt="GitHub Copilot logo"
                loading="lazy"
                width={40}
                height={40}
              />
              <h3 className="font-medium">Copilot</h3>
              <p className="text-sm text-muted-foreground">
                GitHub&apos;s assistant
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-medium mb-4">Customization</h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            All components are built with Tailwind CSS and are fully
            customizable. Common customization patterns:
          </p>
          <ul className="space-y-2 text-muted-foreground font-geist-mono">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Override styles using className prop
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Modify CSS variables for theming
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Extend component props for additional functionality
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Compose multiple components together
            </li>
          </ul>
        </section>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-medium mb-4">Dark Mode</h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            All components support dark mode out of the box. Enable dark mode
            in your app:
          </p>
          <CodeBlock language="tsx">
            {`// Add dark class to html element
<html className="dark">

// Or use next-themes
import { ThemeProvider } from "next-themes";

<ThemeProvider attribute="class">
  <App />
</ThemeProvider>`}
          </CodeBlock>
        </section>
      </article>
    </>
  );
}
