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
  const siteUrl = 'https://watermelon-ui.com'; // Placeholder - replace with actual production URL
  const absoluteUrl = canonical || siteUrl;
  const absoluteImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/og-image.png`;

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={absoluteUrl} />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="content-language" content="en-us" />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={absoluteImage} />

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
