import { useState, type ImgHTMLAttributes, type ReactNode } from 'react';

interface ResilientImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
  fallbackSrc?: string;
  retryOnError?: boolean;
}

function getRetryUrl(src: string) {
  try {
    const url = new URL(src);
    url.searchParams.set('_img_retry', Date.now().toString());
    return url.toString();
  } catch {
    return src;
  }
}

function ResilientImageInner({
  src,
  alt,
  fallback = null,
  fallbackSrc,
  retryOnError = true,
  onError,
  ...imgProps
}: ResilientImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasRetried, setHasRetried] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  if (!currentSrc || hasFailed) {
    return <>{fallback}</>;
  }

  return (
    <img
      {...imgProps}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        if (
          retryOnError &&
          !hasRetried &&
          typeof src === 'string' &&
          src.startsWith('http')
        ) {
          setHasRetried(true);
          setCurrentSrc(getRetryUrl(src));
          return;
        }

        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          return;
        }

        setHasFailed(true);
        onError?.(event);
      }}
    />
  );
}

export function ResilientImage(props: ResilientImageProps) {
  return <ResilientImageInner key={String(props.src ?? '')} {...props} />;
}
