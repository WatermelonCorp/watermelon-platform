import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const REPOSITORY = 'WatermelonCorp/watermelon-platform';
const OUTPUT_PATH = path.resolve(process.cwd(), 'public/star-history.svg');

type Stargazer = {
  starred_at: string;
};

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
    };

    return entities[character];
  });
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatLabel(date: Date) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function loadStargazers() {
  const output = execFileSync(
    'gh',
    [
      'api',
      '--paginate',
      '--slurp',
      '-H',
      'Accept: application/vnd.github.star+json',
      `repos/${REPOSITORY}/stargazers?per_page=100`,
    ],
    { encoding: 'utf8' },
  );

  return (JSON.parse(output) as Stargazer[][]).flat();
}

function buildChart(stargazers: Stargazer[]) {
  if (stargazers.length === 0) {
    throw new Error(`No stargazers returned for ${REPOSITORY}.`);
  }

  const width = 1200;
  const height = 480;
  const padding = { top: 124, right: 64, bottom: 74, left: 78 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const countsByDay = new Map<string, number>();

  for (const stargazer of stargazers) {
    const day = stargazer.starred_at.slice(0, 10);
    countsByDay.set(day, (countsByDay.get(day) ?? 0) + 1);
  }

  const dates = [...countsByDay.keys()].sort();
  const start = new Date(`${dates[0]}T00:00:00.000Z`);
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const dayCount = Math.max(
    1,
    Math.round((end.getTime() - start.getTime()) / 86_400_000),
  );
  const points: Array<{ date: Date; count: number }> = [];
  let count = 0;

  for (let offset = 0; offset <= dayCount; offset += 1) {
    const date = new Date(start.getTime() + offset * 86_400_000);
    count += countsByDay.get(formatDate(date)) ?? 0;
    points.push({ date, count });
  }

  const maxCount = Math.max(...points.map((point) => point.count), 1);
  const coordinates = points.map((point, index) => {
    const x = padding.left + (index / dayCount) * chartWidth;
    const y = padding.top + chartHeight - (point.count / maxCount) * chartHeight;
    return { ...point, x, y };
  });
  const line = coordinates
    .map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`)
    .join(' ');
  const area = `${padding.left},${padding.top + chartHeight} ${line} ${padding.left + chartWidth},${padding.top + chartHeight}`;
  const tickValues = [0, Math.ceil(maxCount / 2), maxCount];
  const dateTicks = [0, 0.5, 1].map((progress) => {
    const index = Math.round(progress * dayCount);
    return coordinates[index];
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
  <title id="title">Watermelon Platform GitHub star history</title>
  <desc id="description">A chart showing ${stargazers.length} GitHub stars from ${formatLabel(start)} to ${formatLabel(end)}.</desc>
  <rect width="${width}" height="${height}" rx="24" fill="#101614"/>
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="18" fill="#151e1a" stroke="#2b3931"/>
  <text x="${padding.left}" y="64" fill="#f4f7f5" font-family="ui-sans-serif, system-ui, sans-serif" font-size="28" font-weight="700">Watermelon Platform Star History</text>
  <text x="${padding.left}" y="92" fill="#9caea4" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16">${stargazers.length} GitHub stars · updated ${escapeXml(formatDate(end))}</text>
  ${tickValues
    .map((value) => {
      const y = padding.top + chartHeight - (value / maxCount) * chartHeight;
      return `<line x1="${padding.left}" x2="${padding.left + chartWidth}" y1="${y}" y2="${y}" stroke="#2b3931" stroke-width="1"/><text x="${padding.left - 14}" y="${y + 5}" text-anchor="end" fill="#9caea4" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13">${value}</text>`;
    })
    .join('')}
  <polygon points="${area}" fill="#84cc1624"/>
  <polyline points="${line}" fill="none" stroke="#a3e635" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="${coordinates.at(-1)!.x}" cy="${coordinates.at(-1)!.y}" r="6" fill="#a3e635" stroke="#101614" stroke-width="4"/>
  ${dateTicks
    .map(
      (point) =>
        `<text x="${point.x}" y="${height - 38}" text-anchor="middle" fill="#9caea4" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13">${escapeXml(formatLabel(point.date))}</text>`,
    )
    .join('')}
</svg>`;
}

const stargazers = loadStargazers();
fs.writeFileSync(OUTPUT_PATH, buildChart(stargazers));
console.log(`Star history written to ${path.relative(process.cwd(), OUTPUT_PATH)}.`);
