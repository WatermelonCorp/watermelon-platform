import { blocks, type BlockItem } from '@/data/blocks';

export interface ShowcaseSection {
  title: string;
  note?: string;
  blockSlug: string;
  block: BlockItem;
}

export interface ShowcaseItem {
  name: string;
  slug: string;
  description: string;
  image: string;
  featured?: boolean;
  tags: string[];
  sections: ShowcaseSection[];
}

type ShowcaseFrontmatterSection = {
  title?: string;
  note?: string;
  blockSlug?: string;
  slug?: string;
};

const mdxFiles = import.meta.glob('./contents/showcases/*.mdx', { eager: true });

function resolveSections(rawSections: ShowcaseFrontmatterSection[] | undefined, showcaseSlug: string): ShowcaseSection[] {
  if (!rawSections || rawSections.length === 0) {
    return [];
  }

  const resolved = rawSections
    .map<ShowcaseSection | null>((section, index) => {
      const blockSlug = section.blockSlug || section.slug;

      if (!blockSlug) {
        console.warn(`Missing block slug for showcase section #${index + 1} in ${showcaseSlug}`);
        return null;
      }

      const block = blocks.find((item) => item.slug === blockSlug);

      if (!block) {
        console.warn(`Missing block "${blockSlug}" referenced by showcase "${showcaseSlug}"`);
        return null;
      }

      return {
        title: section.title || block.name,
        note: section.note,
        blockSlug,
        block,
      };
    });

  return resolved.filter((item): item is ShowcaseSection => item !== null);
}

export const showcases: ShowcaseItem[] = Object.entries(mdxFiles)
  .map<ShowcaseItem | null>(([path, mod]: [string, any]) => {
    const frontmatter = mod.frontmatter;

    if (!frontmatter?.slug || !frontmatter?.title) {
      console.warn('Skipping showcase MDX file with missing frontmatter:', path);
      return null;
    }

    const sections = resolveSections(frontmatter.sections as ShowcaseFrontmatterSection[] | undefined, frontmatter.slug);

    return {
      name: frontmatter.title,
      slug: frontmatter.slug,
      description: frontmatter.description || '',
      image: frontmatter.image || sections[0]?.block.image || '/og-image.avif',
      featured: Boolean(frontmatter.featured),
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
      sections,
    } satisfies ShowcaseItem;
  })
  .filter((item): item is ShowcaseItem => item !== null)
  .sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });
