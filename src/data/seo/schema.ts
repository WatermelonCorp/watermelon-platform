import { SITE_URL, seoBreadcrumbs, seoPagePath, type SeoIndexPage, type SeoPage } from './index';
import { stripInline } from './inline';
import { socialImageFor } from './og';

const publisher = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Watermelon UI',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
    })),
  };
}

/** JSON-LD objects for an SEO page. No ratings or reviews: comparisons stay factual. */
export function seoPageSchemas(page: SeoPage): object[] {
  const url = `${SITE_URL}${seoPagePath(page)}`;
  const main: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': page.kind === 'free' ? 'CollectionPage' : page.kind === 'guide' ? 'TechArticle' : 'Article',
    headline: page.h1,
    name: page.title,
    description: page.description,
    url,
    mainEntityOfPage: url,
    dateModified: page.updated,
    inLanguage: 'en',
    isAccessibleForFree: true,
    publisher,
    about: page.primaryKeyword,
  };
  if (page.kind !== 'free') {
    main.image = `${SITE_URL}${socialImageFor(seoPagePath(page))}`;
  }
  if (page.kind !== 'free') {
    main.author = publisher;
    main.datePublished = page.updated;
  }

  const schemas: object[] = [breadcrumbSchema(seoBreadcrumbs(page)), main];

  if (page.faqs?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: stripInline(faq.answer) },
      })),
    });
  }

  return schemas;
}

export function seoIndexSchemas(index: SeoIndexPage, pages: SeoPage[]): object[] {
  return [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: index.h1, path: index.path },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: index.title,
      description: index.description,
      url: `${SITE_URL}${index.path}`,
      isAccessibleForFree: true,
      publisher,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: pages.map((page, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}${seoPagePath(page)}`,
          name: page.h1,
        })),
      },
    },
  ];
}
