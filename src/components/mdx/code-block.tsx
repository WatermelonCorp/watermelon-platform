import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { CopyButton } from "../animate-ui/components/buttons/copy";

interface CodeBlockProps {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  maxHeight?: string;
}

export function CodeBlock({
  children,
  language = "tsx",
  showLineNumbers = true,
  className,
  maxHeight = "400px"
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children?.trim() || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={cn("relative group rounded-lg overflow-hidden border bg-muted/30", className)}>
      {/* Header with language badge and copy button */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {language}
        </span>
        <CopyButton
          variant="secondary"
          size="sm"
          content={children}
          copied={copied}
          onCopiedChange={() => copyToClipboard()}
          className="absolute right-2 top-2 p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
        />
      </div>

      {/* Code content */}
      <div
        className="overflow-auto"
        style={{ maxHeight }}
      >
        <SyntaxHighlighter
          language={language}
          style={resolvedTheme === "dark" ? oneDark : oneLight}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.8125rem",
            lineHeight: "1.6",
            background: "transparent",
          }}
          codeTagProps={{
            style: {
              fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, 'Liberation Mono', 'Courier New', monospace",
            }
          }}
        >
          {children?.trim() || ""}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
