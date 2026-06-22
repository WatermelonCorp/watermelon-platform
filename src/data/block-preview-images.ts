// ─── Block Preview Image Configuration ──────────────────────────────────────
//
// Maps each block category slug (lowercase) to its preview image URL parts.
// To add a new category, add an entry here — the rest is automatic.
//
// Image URL pattern:
//   `https://assets.watermelon.sh/${urlPath}/${filePrefix}-${paddedNumber}.avif`

export interface BlockPreviewImageConfig {
  /** URL path segment after the base domain (e.g. "announce", "auth") */
  urlPath: string;
  /** Filename prefix before the number (e.g. "announcement", "auth") */
  filePrefix: string;
}

/**
 * Registry of preview image configs keyed by **lowercase** category slug.
 *
 * Category slugs come from MDX frontmatter and may have mixed casing
 * (e.g. "Announcement", "FAQ", "CTA"). We normalise to lowercase at lookup.
 */
export const blockPreviewImages: Record<string, BlockPreviewImageConfig> = {
  announcement:  { urlPath: 'announce',     filePrefix: 'announcement' },
  auth:          { urlPath: 'auth',         filePrefix: 'auth' },
  stats:         { urlPath: 'stats',        filePrefix: 'stats' },
  blog:          { urlPath: 'blog',         filePrefix: 'blog' },
  hero:          { urlPath: 'hero',         filePrefix: 'hero' },
  testimonials:  { urlPath: 'testimonial',  filePrefix: 'testimonial' },
  team:          { urlPath: 'team',         filePrefix: 'team' },
  career:        { urlPath: 'career',       filePrefix: 'career' },
  newsletter:    { urlPath: 'news-letter',  filePrefix: 'news-letter' },
  integrations:  { urlPath: 'integration',  filePrefix: 'integration' },
  notification:  { urlPath: 'notification', filePrefix: 'notification' },
  navigation:    { urlPath: 'navigation',   filePrefix: 'navigation' },
  pricing:       { urlPath: 'pricing',      filePrefix: 'pricing' },
  widget:        { urlPath: 'widget',       filePrefix: 'widget' },
  contact:       { urlPath: 'contact',      filePrefix: 'contact' },
  faq:           { urlPath: 'faq',          filePrefix: 'faq' },
  error:         { urlPath: 'error',        filePrefix: 'error' },
  'file-upload': { urlPath: 'file-upload',  filePrefix: 'file-upload' },
  feature:       { urlPath: 'feature',      filePrefix: 'feature' },
  cta:           { urlPath: 'cta',          filePrefix: 'cta' },
  footer:        { urlPath: 'footer',       filePrefix: 'footer' },
};

const BASE_URL = 'https://assets.watermelon.sh';

/**
 * Extract the numeric part from a block slug (e.g. "hero-12" → 12, "auth-01" → 1).
 * Returns `null` if no trailing number is found.
 */
function extractBlockNumber(slug: string): number | null {
  const match = slug.match(/-(\d+)$/);
  if (!match?.[1]) return null;
  return parseInt(match[1], 10);
}

/**
 * Build the preview image URL for a given block.
 *
 * @param categorySlug - The category slug from the block's frontmatter (any casing)
 * @param blockSlug    - The block slug (e.g. "hero-12", "auth-01")
 * @returns The full `.avif` image URL, or `null` if the category has no config
 */
export function getBlockPreviewImageUrl(
  categorySlug: string,
  blockSlug: string,
): string | null {
  const config = blockPreviewImages[categorySlug.toLowerCase()];
  if (!config) return null;

  const num = extractBlockNumber(blockSlug);
  if (num === null) return null;

  const paddedNumber = String(num).padStart(2, '0');
  return `${BASE_URL}/${config.urlPath}/${config.filePrefix}-${paddedNumber}.avif`;
}
