import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { registry, type RegistryItem } from '@/data/registry';
import { SEOHead } from '@/components/seo-head';
import { RegistryCard } from '@/components/registry/registry-card';
import { ComponentModal } from '@/components/registry/component-modal';
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

export default function ComponentsPage() {
  const [selectedItem, setSelectedItem] = useState<RegistryItem | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedPage = Number(searchParams.get('page') ?? '1');

  const sortedItems = useMemo(
    () => [...registry].sort((a, b) => a.name.localeCompare(b.name)),
    []
  );
  const totalPages = Math.max(1, Math.ceil(sortedItems.length / ITEMS_PER_PAGE));
  const currentPage = Number.isFinite(parsedPage)
    ? Math.min(Math.max(1, Math.floor(parsedPage)), totalPages)
    : 1;
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedItems.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sortedItems]);
  const visiblePages = useMemo(
    () => buildVisiblePages(currentPage, totalPages),
    [currentPage, totalPages]
  );

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

  return (
    <>
      <SEOHead
        title="All Components"
        description="Browse all Watermelon UI components. High-quality, customizable React components for modern web apps."
        category="Components"
      />

      <div className="space-y-12">
        <section id="components" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-medium tracking-tight">All Components</h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                Explore every component in the registry with source code and live preview
              </p>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">{registry.length} components available</p>
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
        </section>

        <ComponentModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </>
  );
}
