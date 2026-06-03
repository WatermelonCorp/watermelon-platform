"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { CopyButton } from "../animate-ui/components/buttons/copy";
import { HugeiconsIcon } from "@hugeicons/react";
import { SourceCodeIcon } from "@/lib/hugeicons";
import { trackEvent } from "@/lib/analytics";

interface CodeBlockProps {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  title?: string;
  mobile?: boolean;
}

interface SyntaxResult {
  SyntaxHighlighter: any;
  oneDark: Record<string, any>;
  oneLight: Record<string, any>;
}

let syntaxPromise: Promise<SyntaxResult | null> | null = null;

const loadSyntax = async (): Promise<SyntaxResult | null> => {
  if (syntaxPromise) return syntaxPromise;

  syntaxPromise = (async () => {
    try {
      const [
        prismLightModule,
        { oneDark, oneLight },
        tsx,
        typescript,
        bash,
        json,
        css,
        markdown,
        javascript,
      ] = await Promise.all([
        import("react-syntax-highlighter/dist/esm/prism-light"),
        import("react-syntax-highlighter/dist/esm/styles/prism"),
        import("react-syntax-highlighter/dist/esm/languages/prism/tsx"),
        import("react-syntax-highlighter/dist/esm/languages/prism/typescript"),
        import("react-syntax-highlighter/dist/esm/languages/prism/bash"),
        import("react-syntax-highlighter/dist/esm/languages/prism/json"),
        import("react-syntax-highlighter/dist/esm/languages/prism/css"),
        import("react-syntax-highlighter/dist/esm/languages/prism/markdown"),
        import("react-syntax-highlighter/dist/esm/languages/prism/javascript"),
      ]);

      const SyntaxHighlighter =
        (prismLightModule as any).default ||
        (prismLightModule as any).PrismLight ||
        (prismLightModule as any);

      if (typeof SyntaxHighlighter?.registerLanguage !== "function") {
        return null;
      }

      const register = (name: string, mod: any) => {
        const lang = mod?.default || mod;
        if (lang) SyntaxHighlighter.registerLanguage(name, lang);
      };

      register("tsx", tsx);
      register("typescript", typescript);
      register("bash", bash);
      register("json", json);
      register("css", css);
      register("markdown", markdown);
      register("javascript", javascript);

      return {
        SyntaxHighlighter,
        oneDark: oneDark as any,
        oneLight: oneLight as any,
      };
    } catch (error) {
      console.error("Failed to load syntax highlighter:", error);
      return null;
    }
  })();

  return syntaxPromise;
};

// Start loading immediately
if (typeof window !== "undefined") {
  loadSyntax();
}

export function CodeBlock({
  children,
  language = "tsx",
  showLineNumbers = true,
  className,
  title,
  mobile = false,
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [syntax, setSyntax] = useState<SyntaxResult | null>(null);

  useEffect(() => {
    let active = true;
    loadSyntax().then((result) => {
      if (active) setSyntax(result);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className={cn(
        "group relative rounded-2xl overflow-hidden w-full min-w-0",
        "bg-gray-100 dark:bg-neutral-800",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 border-b border-black/5 dark:border-white/5 rounded-t-2xl",
          "bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md",
          mobile ? "relative" : "sticky top-0 z-10"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-neutral-800 p-1.5 rounded-lg shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-center">
            <HugeiconsIcon
              icon={SourceCodeIcon}
              size={14}
              className="text-muted-foreground"
            />
          </div>
          <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {title || language}
          </span>
        </div>

        <CopyButton
          content={children}
          onCopiedChange={(copied) => {
            if (copied) {
              trackEvent("code_copy", {
                language,
                title: title || language,
                char_count: children?.trim()?.length || 0,
                source: "code_block",
              });
            }
          }}
          className="size-8 bg-white dark:bg-neutral-800 rounded-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,1),0_0_0_1px_rgba(0,0,0,0.08),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_0_1px_rgba(255,255,255,0.1),0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0px_rgba(0,0,0,0.04)] flex items-center justify-center hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors text-muted-foreground hover:text-foreground p-0!"
        />
      </div>

      {/* Code */}
      <div className="bg-white/50 dark:bg-neutral-900/50">
        {syntax ? (
          <syntax.SyntaxHighlighter
            language={language}
            style={resolvedTheme === "dark" ? syntax.oneDark : syntax.oneLight}
            useInlineStyles={true}
            className="text-foreground"
            showLineNumbers={mobile ? false : showLineNumbers}
            customStyle={{
              margin: 0,
              padding: "1.25rem",
              fontSize: "13px",
              lineHeight: "1.6",
              background: "transparent",
              overflow: "auto",
              whiteSpace: "pre",
              wordBreak: "normal",
            }}
            codeTagProps={{
              style: {
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                whiteSpace: "pre",
              },
            }}
            wrapLongLines={false}
          >
            {children?.trim() || ""}
          </syntax.SyntaxHighlighter>
        ) : (
          <pre className="m-0 p-5 text-[13px] leading-[1.6] overflow-auto">
            <code className="whitespace-pre font-mono">
              {children?.trim() || ""}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}
