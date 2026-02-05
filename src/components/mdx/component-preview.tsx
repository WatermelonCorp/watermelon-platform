import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ViewIcon, CodeIcon, Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { CodeBlock } from "./code-block";

interface ComponentPreviewProps {
  children?: React.ReactNode;
  // name?: string;
  title?: string;
  code?: string;
  className?: string;
}

export function ComponentPreview({
  children,
  // name,
  title,
  code,
  className,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={cn("relative rounded-xl border overflow-hidden my-6 bg-background", className)}>
      {/* Header with tabs and actions */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
        <div className="flex items-center gap-1">
          {/* Preview Tab */}
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
              activeTab === "preview"
                ? "bg-background text-foreground shadow-sm border"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <HugeiconsIcon icon={ViewIcon} size={14} />
            Preview
          </button>

          {/* Code Tab */}
          {code && (
            <button
              onClick={() => setActiveTab("code")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                activeTab === "code"
                  ? "bg-background text-foreground shadow-sm border"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <HugeiconsIcon icon={CodeIcon} size={14} />
              Code
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {title && (
            <span className="text-xs text-muted-foreground mr-2">{title}</span>
          )}
          {code && (
            <button
              onClick={copyCode}
              className="p-1.5 rounded-md hover:bg-accent transition-colors"
              title="Copy code"
            >
              {copied ? (
                <HugeiconsIcon icon={Tick02Icon} size={14} className="text-green-500" />
              ) : (
                <HugeiconsIcon icon={Copy01Icon} size={14} className="text-muted-foreground" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Preview Panel */}
        {activeTab === "preview" && (
          <div className="min-h-[280px] flex items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted/50 via-transparent to-transparent">
            <div className="relative">
              <React.Suspense
                fallback={
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </div>
                }
              >
                {children}
              </React.Suspense>
            </div>
          </div>
        )}

        {/* Code Panel */}
        {activeTab === "code" && code && (
          <div className="max-h-[400px] overflow-auto">
            <CodeBlock maxHeight="400px" showLineNumbers={true}>
              {code}
            </CodeBlock>
          </div>
        )}
      </div>
    </div>
  );
}

// Export a simpler version for MDX usage
export function CompPreview(props: ComponentPreviewProps) {
  return <ComponentPreview {...props} />;
}
