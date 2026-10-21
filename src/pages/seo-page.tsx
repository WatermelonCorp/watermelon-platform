import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SEOHead } from '@/components/seo-head';
import { DocHeader, DocPage, DocSection, DocText } from '@/components/docs';
import {
  SITE_URL,
  seoBreadcrumbs,
  seoIndexByPath,
  seoPagePath,
  seoPagesByPath,
  seoPagesOfKind,
  type SeoPage,
  type SeoSection,
} from '@/data/seo';
import { catalogLinks } from '@/data/seo/catalog-links.generated';
import { parseInline } from '@/data/seo/inline';
import { seoIndexSchemas, seoPageSchemas } from '@/data/seo/schema';
import { seoPageReferences } from '@/data/seo/references';
import NotFoundPage from '@/pages/not-found';

// ─── Inline text: [links](/path) and `code` ──────────────────────────────────

function Inline({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((segment, i) => {
        if (segment.type === 'text') return <Fragment key={i}>{segment.text}</Fragment>;
        if (segment.type === 'code') {
          return (
            <code key={i} className="bg-muted rounded px-1.5 py-0.5 font-mono text-[0.85em]">
              {segment.text}
            </code>
          );
        }
        return segment.href.startsWith('/') ? (
          <Link key={i} to={segment.href} className="text-foreground underline underline-offset-4">
            {segment.text}
          </Link>
        ) : (
          <a key={i} href={segment.href} className="text-foreground underline underline-offset-4" rel="noopener">
            {segment.text}
          </a>
        );
      })}
    </>
  );
}

// ─── Section pieces ──────────────────────────────────────────────────────────

function SectionTable({ table, caption }: { table: NonNullable<SeoSection['table']>; caption: string }) {
  return (
    <div className="border-border overflow-x-auto rounded-xl border">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-muted/50">
          <tr>
            {table.columns.map((column, i) => (
              <th key={i} scope="col" className="px-4 py-3 font-medium whitespace-nowrap">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r} className="border-border border-t">
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="px-4 py-3 align-top font-medium">
                    <Inline text={cell} />
                  </th>
                ) : (
                  <td key={c} className="text-muted-foreground px-4 py-3 align-top">
                    <Inline text={cell} />
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CatalogList({ spec }: { spec: NonNullable<SeoSection['catalog']> }) {
  const items = catalogLinks[spec.kind]
    .filter((item) => !spec.category || item.category === spec.category)
    .slice(0, spec.limit);

  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            to={item.href}
            className="border-border hover:bg-muted/50 block rounded-lg border px-3 py-2 text-sm transition-colors"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Section({ section }: { section: SeoSection }) {
  return (
    <DocSection title={section.heading}>
      {section.paragraphs?.map((paragraph, i) => (
        <DocText key={i}>
          <Inline text={paragraph} />
        </DocText>
      ))}
      {section.bullets && (
        <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm leading-relaxed md:text-base">
          {section.bullets.map((bullet, i) => (
            <li key={i}>
              <Inline text={bullet} />
            </li>
          ))}
        </ul>
      )}
      {section.table && <SectionTable table={section.table} caption={section.heading} />}
      {section.catalog && <CatalogList spec={section.catalog} />}
    </DocSection>
  );
}

function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-muted-foreground mb-4 text-xs">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link to={item.path} className="hover:text-foreground">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function PageLinks({ heading, pages }: { heading: string; pages: SeoPage[] }) {
  return (
    <DocSection title={heading}>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link
              to={seoPagePath(page)}
              className="border-border hover:bg-muted/50 block h-full rounded-xl border p-4 transition-colors"
            >
              <span className="block text-sm font-medium">{page.h1}</span>
              <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">
                {page.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </DocSection>
  );
}

// ─── Pages ───────────────────────────────────────────────────────────────────

function SeoArticle({ page }: { page: SeoPage }) {
  const path = seoPagePath(page);
  const related = page.related.map((p) => seoPagesByPath[p]).filter(Boolean);

  return (
    <>
      <SEOHead
        title={page.title}
        description={page.description}
        keywords={[page.primaryKeyword, ...page.secondaryKeywords].join(', ')}
        canonical={`${SITE_URL}${path}`}
        type="article"
        schema={JSON.stringify(seoPageSchemas(page))}
      />
      <DocPage>
        <Breadcrumbs items={seoBreadcrumbs(page)} />
        <DocHeader title={page.h1} />
        <DocSection>
          {page.intro.map((paragraph, i) => (
            <DocText key={i}>
              <Inline text={paragraph} />
            </DocText>
          ))}
        </DocSection>
        {page.sections.map((section) => (
          <Section key={section.heading} section={section} />
        ))}
        {page.faqs && page.faqs.length > 0 && (
          <DocSection title="Frequently asked questions">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="space-y-2">
                <h3 className="text-sm font-medium md:text-base">{faq.question}</h3>
                <DocText>
                  <Inline text={faq.answer} />
                </DocText>
              </div>
            ))}
          </DocSection>
        )}
        {page.kind !== 'free' && (
          <DocSection title="References">
            <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
              {seoPageReferences(page).map((ref) => (
                <li key={ref.href}>
                  <a href={ref.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                    {ref.title}
                  </a>
                </li>
              ))}
            </ul>
          </DocSection>
        )}
        {related.length > 0 && <PageLinks heading="Related" pages={related} />}
        <p className="text-muted-foreground pt-6 text-xs">Last reviewed {page.updated}.</p>
      </DocPage>
    </>
  );
}

function SeoIndex({ path }: { path: string }) {
  const index = seoIndexByPath[path];
  const all = index.groups.flatMap((group) => seoPagesOfKind(group.kind));

  return (
    <>
      <SEOHead
        title={index.title}
        description={index.description}
        canonical={`${SITE_URL}${index.path}`}
        schema={JSON.stringify(seoIndexSchemas(index, all))}
      />
      <DocPage>
        <Breadcrumbs
          items={[
            { name: 'Home', path: '/' },
            { name: index.h1, path: index.path },
          ]}
        />
        <DocHeader title={index.h1} description={index.intro} />
        {index.groups.map((group) => (
          <PageLinks key={group.kind} heading={group.heading} pages={seoPagesOfKind(group.kind)} />
        ))}
      </DocPage>
    </>
  );
}

export default function SeoRoutePage() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, '') || '/';
  if (seoIndexByPath[path]) return <SeoIndex path={path} />;
  const page = seoPagesByPath[path];
  if (!page) return <NotFoundPage />;
  return <SeoArticle page={page} />;
}
