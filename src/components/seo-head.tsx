import { Helmet } from 'react-helmet-async';
import { generateOgImageUrl } from '@/utils/seo';

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
  category?: string;
}


export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  image,
  type = 'website',
  schema,
  ogImageAlt,
  noindex = false,
  category
}: SEOHeadProps) {
  const fullTitle = title.includes('Watermelon UI') ? title : `${title} | Watermelon UI`;
  const envSiteUrl = (import.meta as any).env?.VITE_SITE_URL as string | undefined;
  const siteUrl = (envSiteUrl || "https://ui.watermelon.sh").replace(/\/$/, "");
  const currentPath = typeof window !== "undefined"
    ? `${window.location.pathname}${window.location.search}`
    : "";
  const absoluteUrl = canonical || `${siteUrl}${currentPath}`;
  const absoluteImage = image
    ? (image.startsWith('http') ? image : `${siteUrl}${image}`)
    : generateOgImageUrl({ title, description, category });

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
      <meta property="og:image:alt" content={ogImageAlt || fullTitle} />
      <meta property="og:site_name" content="Watermelon UI" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:site" content="@watermelonshHQ" />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {schema}
        </script>
      )}
    </Helmet>
  );
}
