import { cn } from '@/lib/utils';
import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export type PreviewViewport = 'desktop' | 'tablet' | 'mobile';

type ViewportSize = {
  width: number;
  height: number;
};

const VIEWPORTS: Record<Exclude<PreviewViewport, 'desktop'>, ViewportSize> = {
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

interface ResponsivePreviewFrameProps {
  viewport: PreviewViewport;
  children?: ReactNode;
  previewUrl?: string;
  className?: string;
}

function useFrameScale(
  viewport: PreviewViewport,
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      if (viewport === 'desktop') {
        setScale(1);
        return;
      }

      const target = VIEWPORTS[viewport];
      const widthScale = container.clientWidth / target.width;
      const heightScale = container.clientHeight / target.height;
      const nextScale = Math.min(widthScale, heightScale, 1);
      setScale(nextScale);
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => observer.disconnect();
  }, [viewport, containerRef]);

  return scale;
}

function syncDocumentStyles(frameDocument: Document) {
  const parentRoot = document.documentElement;
  const frameRoot = frameDocument.documentElement;

  if (frameRoot.className !== parentRoot.className) {
    frameRoot.className = parentRoot.className;
  }
  if (frameRoot.style.cssText !== parentRoot.style.cssText) {
    frameRoot.style.cssText = parentRoot.style.cssText;
  }

  const existingNodes = Array.from(frameDocument.head.querySelectorAll('[data-preview-style]'));
  const existingMap = new Map(existingNodes.map(node => [node.textContent || (node as HTMLLinkElement).href, node]));

  const styles = document.head.querySelectorAll('style, link[rel="stylesheet"]');
  const seenKeys = new Set<string>();

  styles.forEach((node) => {
    const key = node.textContent || (node as HTMLLinkElement).href;
    seenKeys.add(key);

    if (!existingMap.has(key)) {
      const clone = node.cloneNode(true) as HTMLElement;
      clone.setAttribute('data-preview-style', 'true');
      frameDocument.head.appendChild(clone);
    }
  });

  existingMap.forEach((node, key) => {
    if (!seenKeys.has(key)) {
      node.remove();
    }
  });
}

export function ResponsivePreviewFrame({
  viewport,
  children,
  previewUrl,
  className,
}: ResponsivePreviewFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const teardownInteractionsRef = useRef<(() => void) | null>(null);
  const [mountNode, setMountNode] = useState<HTMLDivElement | null>(null);
  const [isFrameReady, setIsFrameReady] = useState(false);

  const scale = useFrameScale(viewport, containerRef);

  const frameSize = useMemo(() => {
    if (viewport === 'desktop') return null;
    return VIEWPORTS[viewport];
  }, [viewport]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const handleLoad = () => {
      const frameDocument = frame.contentDocument;
      if (!frameDocument) return;

      teardownInteractionsRef.current?.();

      const handleClick = (event: Event) => {
        const target = event.target as HTMLElement | null;
        const anchor = target?.closest('a[href]');
        if (anchor) {
          event.preventDefault();
        }
      };

      const handleSubmit = (event: Event) => {
        event.preventDefault();
      };

      frameDocument.addEventListener('click', handleClick);
      frameDocument.addEventListener('submit', handleSubmit);
      teardownInteractionsRef.current = () => {
        frameDocument.removeEventListener('click', handleClick);
        frameDocument.removeEventListener('submit', handleSubmit);
      };

      if (!previewUrl) {
        syncDocumentStyles(frameDocument);
        setMountNode(frameDocument.getElementById('preview-root') as HTMLDivElement | null);
      }
      setIsFrameReady(true);
    };

    frame.addEventListener('load', handleLoad);

    if (previewUrl) {
      frame.src = previewUrl;
    } else {
      frame.srcdoc = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <base target="_parent" href="${window.location.origin}/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body, #preview-root { margin: 0; width: 100%; height: 100%; }
      body { overflow: auto; }
    </style>
  </head>
  <body>
    <div id="preview-root"></div>
  </body>
</html>`;
    }

    return () => {
      frame.removeEventListener('load', handleLoad);
      teardownInteractionsRef.current?.();
      teardownInteractionsRef.current = null;
      setMountNode(null);
      setIsFrameReady(false);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (previewUrl) return;

    const frameDocument = frameRef.current?.contentDocument;
    if (!frameDocument) return;

    syncDocumentStyles(frameDocument);

    const rootObserver = new MutationObserver(() => syncDocumentStyles(frameDocument));
    rootObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style'],
    });

    const headObserver = new MutationObserver(() => syncDocumentStyles(frameDocument));
    headObserver.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href'],
    });

    return () => {
      rootObserver.disconnect();
      headObserver.disconnect();
    };
  }, [mountNode]);

  const frameClasses = cn(
    'bg-background border shadow-sm overflow-hidden transition-all duration-300 ease-in-out',
    viewport === 'desktop' ? 'h-full w-full rounded-md' : 'rounded-[2rem] border-4',
  );

  const frameWidth = frameSize?.width ?? '100%';
  const frameHeight = frameSize?.height ?? '100%';

  return (
    <div ref={containerRef} className={cn('relative h-full w-full', className)}>
      <div
        className={frameClasses}
        style={{
          width: frameWidth,
          height: frameHeight,
          transform: viewport === 'desktop' ? undefined : `scale(${scale})`,
          transformOrigin: 'top center',
          margin: viewport === 'desktop' ? undefined : '0 auto',
        }}
      >
        <iframe
          ref={frameRef}
          title={`responsive-preview-${viewport}`}
          className="h-full w-full border-0"
          sandbox="allow-scripts allow-same-origin"
        />
        {!isFrameReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-background text-sm text-muted-foreground">
            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Loading preview...
          </div>
        )}
        {!previewUrl && mountNode ? createPortal(children, mountNode) : null}
      </div>
    </div>
  );
}
