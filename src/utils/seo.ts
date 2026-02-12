/**
 * SEO Utilities and JSON-LD generation
 */

export const siteConfig = {
  name: "Watermelon UI",
  title: "Watermelon UI - High-Quality React Components Registry",
  description: "A collection of high-quality React components, dashboards, and UI blocks. Copy and paste production-ready UI with ease.",
  url: "https://ui.watermelon.sh",
  ogImage: "https://ui.watermelon.sh/og-image.png",
  twitterHandle: "@watermelonui",
};

export const generateOgImageUrl = (params: {
  title: string;
  description?: string;
  category?: string;
}) => {
  const url = new URL(`${siteConfig.url}/api/og`);
  url.searchParams.set('title', params.title);
  if (params.description) url.searchParams.set('description', params.description);
  if (params.category) url.searchParams.set('category', params.category);
  return url.toString();
};

export const buildPath = (type: 'component' | 'dashboard' | 'block', slug: string) => {
  switch (type) {
    case 'component':
      return `/components/${slug}`;
    case 'dashboard':
      return `/dashboard/${slug}`;
    case 'block':
      return `/block/${slug}`;
    default:
      return `/${slug}`;
  }
};

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "logo": `${siteConfig.url}/logo.png`,
  "sameAs": [
    "https://github.com/watermeloncorp",
    "https://twitter.com/watermelonui"
  ],
});

export const generateWebPageSchema = (title: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": title,
  "description": description,
  "url": url,
});

export const generateSoftwareApplicationSchema = (item: {
  name: string;
  description: string;
  image: string;
  slug: string;
  category: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": item.name,
  "description": item.description,
  "image": item.image,
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": `${siteConfig.url}${buildPath('component', item.slug)}`
});

export const generateBreadcrumbSchema = (items: { name: string; item: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.item.startsWith('http') ? item.item : `${siteConfig.url}${item.item}`
  })),
});
