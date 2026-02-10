import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  schema?: string;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  image,
  type = 'website',
  schema
}: SEOHeadProps) {
  const fullTitle = title.includes('Watermelon UI') ? title : `${title} | Watermelon UI`;
  const envSiteUrl = (import.meta as any).env?.VITE_SITE_URL as string | undefined;
  const fallbackOrigin = typeof window !== "undefined" ? window.location.origin : "https://watermelon-ui.com";
  const siteUrl = envSiteUrl || fallbackOrigin;
  const absoluteUrl = canonical || (typeof window !== "undefined" ? window.location.href : siteUrl);
  const absoluteImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.png`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={absoluteUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta httpEquiv="content-language" content="en-us" />
      <meta name="theme-color" content="#FF5112" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content="Watermelon UI" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {schema}
        </script>
      )}
    </Helmet>
  );
}
