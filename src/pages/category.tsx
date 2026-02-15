import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { registry, type RegistryItem } from '@/data/registry';
import { RegistryCard } from '@/components/registry/registry-card';
import { ComponentModal } from '@/components/registry/component-modal';
import { SEOHead } from '@/components/seo-head';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 18;

function buildVisiblePages(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  if (currentPage <= 3) return [1, 2, 3, 4, "ellipsis", totalPages];
  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedPage = Number(searchParams.get('page') ?? '1');

  const filteredItems = useMemo(() => {
    if (!category) return [];
    return registry
      .filter(item => item.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [category]);
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const currentPage = Number.isFinite(parsedPage)
    ? Math.min(Math.max(1, Math.floor(parsedPage)), totalPages)
    : 1;
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredItems]);
  const visiblePages = useMemo(
    () => buildVisiblePages(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const title = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';
  const setPage = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (nextPage === 1) next.delete('page');
      else next.set('page', String(nextPage));
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (filteredItems.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Category not found</h2>
        <p className="text-muted-foreground">No components found for this category.</p>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title={`${title} Components`}
        description={`Browse our collection of ${title} components. High-quality, customizable React components for your next project.`}
        category={title}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-medium tracking-tight">{title}</h1>
          <p className="text-muted-foreground text-sm md:text-base">{filteredItems.length} components</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageItems.map((item) => (
            <RegistryCard
              key={item.slug}
              item={item}
              onClick={(item) => setSelectedItem(item)}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination className="pt-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {visiblePages.map((page, idx) => (
                <PaginationItem key={`${page}-${idx}`}>
                  {page === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        <ComponentModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </>
  );
}
