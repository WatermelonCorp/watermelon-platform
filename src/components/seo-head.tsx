import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { socialImageFor } from '@/data/seo/og';
import { SITE_URL } from '@/data/seo/site';
import { fitDescription } from '@/data/seo/fit';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: string;
  ogImageAlt?: string;
  noindex?: boolean;
  /** Kept for callers; share images now come from the route (src/data/seo/og.ts). */
  category?: string;
}


export function SEOHead({
  title,
  description: rawDescription,
  keywords,
  canonical,
  image,
  type = 'website',
  schema,
  ogImageAlt,
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title.includes('Watermelon UI') ? title : `${title} | Watermelon UI`;
  // Same fitting as the Worker, so the app and raw HTML ship one description.
  const description = fitDescription(rawDescription);
  // Always the production domain. A VITE_SITE_URL set in a build environment
  // (Cloudflare Workers Builds had the workers.dev URL) must never leak into
  // canonical, og:url, or share image URLs.
  const siteUrl = SITE_URL;
  // Path only: query strings (?ref=, utm_*) must not become part of the canonical.
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
  const absoluteUrl = canonical || `${siteUrl}${currentPath}`;
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";
  const shareImage = socialImageFor(pathname, image);
  const absoluteImage = shareImage.startsWith('http') ? shareImage : `${siteUrl}${shareImage}`;

  // index.html ships static head tags (marked data-seo) that the Worker fills
  // in per route for crawlers that skip JavaScript. Under React 19,
  // react-helmet-async renders its own tags without replacing those, so drop
  // the static copies once this page's tags are in place.
  useEffect(() => {
    document.head.querySelectorAll('[data-seo]').forEach((element) => element.remove());
  }, []);

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={absoluteUrl} />
      <link rel="alternate" hrefLang="en-us" href={absoluteUrl} />
      <link rel="alternate" hrefLang="x-default" href={absoluteUrl} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="content-language" content="en-us" />
      <meta name="theme-color" content="#FF5112" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={ogImageAlt || fullTitle} />
      <meta property="og:site_name" content="Watermelon UI" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={ogImageAlt || fullTitle} />
      <meta name="twitter:site" content="@watermelonui" />
      <meta name="twitter:creator" content="@watermelonui" />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {schema}
        </script>
      )}
    </Helmet>
  );
}
