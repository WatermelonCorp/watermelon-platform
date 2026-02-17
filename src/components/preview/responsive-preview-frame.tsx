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
  children: ReactNode;
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

  frameRoot.className = parentRoot.className;
  frameRoot.style.cssText = parentRoot.style.cssText;

  const existing = frameDocument.head.querySelectorAll('[data-preview-style]');
  existing.forEach((node) => node.remove());

  const styles = document.head.querySelectorAll(
    'style, link[rel="stylesheet"]',
  );

  styles.forEach((node) => {
    const clone = node.cloneNode(true) as HTMLElement;
    clone.setAttribute('data-preview-style', 'true');
    frameDocument.head.appendChild(clone);
  });
}

export function ResponsivePreviewFrame({
  viewport,
  children,
  className,
}: ResponsivePreviewFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mountNode, setMountNode] = useState<HTMLDivElement | null>(null);

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

      syncDocumentStyles(frameDocument);
      setMountNode(frameDocument.getElementById('preview-root') as HTMLDivElement | null);
    };

    frame.addEventListener('load', handleLoad);

    frame.srcdoc = `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
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

    return () => {
      frame.removeEventListener('load', handleLoad);
      setMountNode(null);
    };
  }, []);

  useEffect(() => {
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
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        />
        {mountNode ? createPortal(children, mountNode) : null}
      </div>
    </div>
  );
}
