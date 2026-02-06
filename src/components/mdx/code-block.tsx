"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { CopyButton } from "../animate-ui/components/buttons/copy";
import { HugeiconsIcon } from "@hugeicons/react";
import { SourceCodeIcon } from "@hugeicons/core-free-icons";

interface CodeBlockProps {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  maxHeight?: string;
  title?: string;
  mobile?: boolean;
}

export function CodeBlock({
  children,
  language = "tsx",
  showLineNumbers = true,
  className,
  title,
  maxHeight = "400px",
  mobile = false,
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
    <div
      className={cn(
        "group relative rounded-xl border bg-muted/20",
        // desktop keeps clipping, mobile must not
        mobile ? "overflow-visible" : "overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-2 border-b rounded-t-xl",
          "bg-background/80 backdrop-blur",
          // sticky header breaks mobile drawers
          mobile ? "relative" : "sticky top-0 z-10"
        )}
      >
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            icon={SourceCodeIcon}
            size={20}
            className="p-1 border rounded-sm text-primary"
          />
          <span className="text-[11px] font-medium tracking-wide text-muted-foreground">
            {title ? `${title}.${language}` : language}
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

      {/* Code */}
      <div
        className={cn(
          // desktop: internal scroll
          // mobile: let parent (Drawer) scroll
          mobile ? "overflow-visible" : "overflow-auto"
        )}
        style={mobile ? undefined : { maxHeight }}
      >
        <SyntaxHighlighter
          language={language}
          style={resolvedTheme === "dark" ? oneDark : oneLight}
          showLineNumbers={mobile ? false : showLineNumbers}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "13px",
            lineHeight: "1.6",
            background: "transparent",
            // CRITICAL: never constrain height on mobile
            maxHeight: mobile ? "none" : maxHeight,
            overflow: mobile ? "visible" : "auto",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            },
          }}
          wrapLongLines
        >
          {children?.trim() || ""}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
