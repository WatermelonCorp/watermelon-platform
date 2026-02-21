import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import matter from 'gray-matter';

const CONTENTS_DIR = path.join(process.cwd(), 'src/data/contents');

async function fixNumbers() {
  // 1. Components
  await processCategory('components', 'src/data/contents/registry/*.mdx');
  // 2. Blocks
  await processCategory('blocks', 'src/data/contents/blocks/*/*.mdx');
  // 3. Dashboards
  await processCategory('dashboards', 'src/data/contents/dashboards/*/*.mdx');
}

async function processCategory(type: string, pattern: string) {
  console.log(`Processing ${type}...`);
  const files = await glob(pattern);

  const items: { path: string; data: any; content: string }[] = [];

  for (const file of files) {
    const fileContent = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(fileContent);
    items.push({ path: file, data, content });
  }

  // Sort by existing number, then by slug
  items.sort((a, b) => {
    const numA = a.data.componentNumber ?? Infinity;
    const numB = b.data.componentNumber ?? Infinity;
    if (numA !== numB) return numA - numB;
    return (a.data.slug || '').localeCompare(b.data.slug || '');
  });

  // Re-assign numbers
  items.forEach((item, index) => {
    const newNumber = index + 1;
    if (item.data.componentNumber !== newNumber) {
      console.log(`  Updating ${path.basename(item.path)}: ${item.data.componentNumber} -> ${newNumber}`);
      item.data.componentNumber = newNumber;

      const newContent = matter.stringify(item.content, item.data);
      fs.writeFileSync(item.path, newContent);
    }
  });

  console.log(`  Processed ${items.length} ${type}.`);
}

fixNumbers().catch(console.error);
