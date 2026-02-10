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

export function CodeBlock({
  children,
  language = "tsx",
  showLineNumbers = true,
  className,
  title,
  mobile = false,
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [syntax, setSyntax] = useState<{
    SyntaxHighlighter: any;
    oneDark: Record<string, any>;
    oneLight: Record<string, any>;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    const loadSyntax = async () => {
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

        if (!active) return;

        const SyntaxHighlighter =
          (prismLightModule as any).default ||
          (prismLightModule as any).PrismLight ||
          (prismLightModule as any);

        if (typeof SyntaxHighlighter?.registerLanguage !== "function") {
          setSyntax(null);
          return;
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

        setSyntax({
          SyntaxHighlighter,
          oneDark: (oneDark as any),
          oneLight: (oneLight as any),
        });
      } catch {
        setSyntax(null);
      }
    };

    loadSyntax();
    return () => {
      active = false;
    };
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children?.trim() || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent("code_copy", {
      language,
      title: title || language,
      char_count: children?.trim()?.length || 0,
      source: "code_block",
    });
  };

  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-muted/20 overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between pl-4 pr-2 py-2 border-b rounded-t-xl",
          "bg-background/80 backdrop-blur",
          mobile ? "relative" : "sticky top-0 z-10"
        )}
      >
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={SourceCodeIcon}
            size={20}
            className="p-1 border rounded-sm text-primary"
          />
          <span className="text-sm font-medium tracking-wide text-muted-foreground">
            {title || language}
          </span>
        </div>

        <CopyButton
          content={children}
          copied={copied}
          onCopiedChange={copyToClipboard}
          size="sm"
          variant="secondary"
          className="h-7 px-2 text-xs"
        />
      </div>

      {/* Code – no scrolling, no height constraints */}
      {syntax ? (
        <syntax.SyntaxHighlighter
          language={language}
          style={resolvedTheme === "dark" ? syntax.oneDark : syntax.oneLight}
          useInlineStyles={true}
          className="text-foreground"
          showLineNumbers={mobile ? false : showLineNumbers}
          customStyle={{
            margin: 0,
            padding: "1rem",
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
        <pre className="m-0 p-4 text-[13px] leading-[1.6] overflow-auto">
          <code className="whitespace-pre font-mono">
            {children?.trim() || ""}
          </code>
        </pre>
      )}
    </div>
  );
}
