import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { CopyButton } from '../animate-ui/components/buttons/copy';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showHeader?: boolean;
  maxHeight?: string;
}

export function CodeBlock({
  code,
  language = 'tsx',
  className,
  showHeader = true,
  maxHeight = '300px'
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={cn('relative rounded-lg overflow-hidden border bg-muted/30', className)}>
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {language}
          </span>
          <CopyButton
            variant="secondary"
            size="sm"
            content={code}
            copied={copied}
            onCopiedChange={() => copyToClipboard()}
            className="absolute right-2 top-2 p-2 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          />
        </div>
      )}
      <div className="overflow-auto" style={{ maxHeight }}>
        <SyntaxHighlighter
          language={language}
          style={resolvedTheme === 'dark' ? oneDark : oneLight}
          showLineNumbers
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: 'transparent',
            fontSize: '0.8125rem',
            lineHeight: '1.6',
          }}
          codeTagProps={{
            style: {
              fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, 'Liberation Mono', 'Courier New', monospace",
            }
          }}
        >
          {[code]}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
