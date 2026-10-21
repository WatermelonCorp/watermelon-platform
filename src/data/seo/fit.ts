/**
 * Search snippet limits: full titles up to 60 characters, descriptions 120 to
 * 160. Shared by the React pages (SEOHead) and the Worker, so both ship the
 * same values. Keep this file free of React and Vite-only imports.
 */
export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 120;
export const DESCRIPTION_MAX = 160;

const SUFFIX = ' | Watermelon UI';

export function withSiteSuffix(title: string) {
  return title.includes('Watermelon UI') ? title : `${title}${SUFFIX}`;
}

/** The first title whose full form fits, else the shortest one. */
export function fitTitle(...candidates: string[]): string {
  return (
    candidates.find((title) => withSiteSuffix(title).length <= TITLE_MAX) ??
    candidates.reduce((a, b) => (b.length < a.length ? b : a))
  );
}

// True of every page on the site. Each is added only if its key phrase is not
// already in the description, and only while it still fits.
const fillers = [
  { key: 'tailwind', text: 'Built with React and Tailwind CSS.' },
  { key: 'open source', text: 'Free and open source under the MIT license.' },
  { key: 'shadcn cli', text: 'Copy the code or install it with the shadcn CLI.' },
  { key: 'watermelon ui', text: 'Part of Watermelon UI.' },
];

/** Trims long descriptions at a sentence or word, and tops up short ones. */
export function fitDescription(text: string): string {
  let description = text.replace(/\s+/g, ' ').trim();

  if (description.length > DESCRIPTION_MAX) {
    // Prefer dropping one whole sentence (never the first) over cutting words.
    const sentences = description.split(/(?<=[.!?])\s+/);
    const withoutOne = sentences
      .slice(1)
      .map((_, i) => sentences.filter((__, j) => j !== i + 1).join(' '))
      .filter((d) => d.length >= DESCRIPTION_MIN && d.length <= DESCRIPTION_MAX)
      .sort((a, b) => b.length - a.length)[0];
    const cut = description.slice(0, DESCRIPTION_MAX);
    const sentenceEnd = cut.lastIndexOf('. ');
    description =
      withoutOne ??
      (sentenceEnd + 1 >= DESCRIPTION_MIN
        ? cut.slice(0, sentenceEnd + 1)
        : `${cut.slice(0, cut.lastIndexOf(' ', DESCRIPTION_MAX - 2)).replace(/[\s,;:–-]+$/, '')}…`);
  }

  for (const filler of fillers) {
    if (description.length >= DESCRIPTION_MIN) break;
    if (description.toLowerCase().includes(filler.key)) continue;
    const next = `${description}${/[.!?…]$/.test(description) ? '' : '.'} ${filler.text}`;
    if (next.length <= DESCRIPTION_MAX) description = next;
  }

  return description;
}
