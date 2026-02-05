import { SEOHead } from "@/components/seo-head";
import { CodeBlock } from "@/components/mdx";

export default function InstallationPage() {
  return (
    <>
      <SEOHead
        title="Installation"
        description="Get started with Watermelon UI. Install beautiful React components with a single CLI command. Works with npm, pnpm, yarn, and bun."
        keywords="install, setup, npm, tailwind, react components, shadcn cli"
      />

      <article className="relative w-full max-w-4xl">
        <header className="pb-8 w-full border-b border-border md:px-16 px-6">
          <h1 className="md:text-3xl text-2xl font-semibold tracking-tight mb-4 font-chivo-mono">
            Installation
          </h1>
          <p className="text-muted-foreground text-md tracking-tight leading-relaxed font-geist-mono">
            Get started with Watermelon UI to build modern, responsive, and
            customizable interfaces with ease. With simple installation and a
            developer-friendly setup, you can quickly integrate powerful
            components into your project and create polished, consistent user
            experiences.
          </p>
        </header>

        <section className="py-8 md:px-16 border-b border-border px-6">
          <h2 className="text-2xl font-medium mb-4">Prerequisites</h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            Ensure your project meets the following requirements before
            installing Watermelon UI:
          </p>
          <ul className="space-y-2 text-muted-foreground font-medium font-geist-mono">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Node.js 18.0 or later
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              React 18 or later
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              Tailwind CSS 3.4 or later
            </li>
          </ul>
        </section>

        <section className="py-8 md:px-16 border-b border-border px-6">
          <h2 className="text-2xl font-medium mb-4">
            Quick Install with CLI
          </h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            The fastest way to add components is using our CLI powered by
            shadcn:
          </p>
          <CodeBlock language="bash">
            {`npx shadcn@latest add https://registry.watermelon.sh/r/[component].json`}
          </CodeBlock>
        </section>

        <section className="py-8 md:px-16 border-b border-border px-6">
          <h2 className="text-2xl font-medium mb-4">Manual Installation</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. Install dependencies</h3>
              <CodeBlock language="bash">
                {`npm install tailwindcss motion clsx tailwind-merge`}
              </CodeBlock>
            </div>
            <div>
              <h3 className="font-medium mb-2">2. Copy the component code</h3>
              <p className="text-muted-foreground font-geist-mono">
                Browse our components, click the copy button, and paste the code
                into your project.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">3. Import and use</h3>
              <CodeBlock language="tsx">
                {`import { Component } from "@/components/ui/component";`}
              </CodeBlock>
            </div>
          </div>
        </section>

        <section className="py-8 md:px-16 px-6 border-b border-border">
          <h2 className="text-2xl font-medium mb-4">
            Tailwind Configuration
          </h2>
          <p className="text-muted-foreground mb-4 font-geist-mono">
            Add the following to your tailwind.config.js for optimal
            compatibility:
          </p>
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
        </section>
      </article>
    </>
  );
}
