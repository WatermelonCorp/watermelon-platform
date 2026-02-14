#!/usr/bin/env node

/**
 * fix-component-numbers.mjs
 *
 * Reads every .mdx file in src/data/contents/registry/,
 * sorts them alphabetically by filename, and assigns
 * a unique sequential componentNumber (1, 2, 3, …).
 *
 * Usage:  node scripts/fix-component-numbers.mjs            (dry-run)
 *         node scripts/fix-component-numbers.mjs --write     (apply changes)
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const REGISTRY_DIR = join(
  __dirname,
  '..',
  'src',
  'data',
  'contents',
  'registry',
);

const dryRun = !process.argv.includes('--write');

async function main() {
  const entries = await readdir(REGISTRY_DIR);
  const mdxFiles = entries.filter((f) => f.endsWith('.mdx')).sort();

  console.log(`Found ${mdxFiles.length} .mdx files in registry/\n`);

  let changed = 0;

  for (let i = 0; i < mdxFiles.length; i++) {
    const num = i + 1;
    const filePath = join(REGISTRY_DIR, mdxFiles[i]);
    const content = await readFile(filePath, 'utf-8');

    const match = content.match(/^componentNumber:\s*(\d+)\s*$/m);
    if (!match) {
      console.log(`⚠  ${mdxFiles[i]}  — no componentNumber found, skipping`);
      continue;
    }

    const currentNum = parseInt(match[1], 10);
    if (currentNum === num) {
      console.log(`✓  ${mdxFiles[i]}  — already ${num}`);
      continue;
    }

    const updated = content.replace(
      /^componentNumber:\s*\d+\s*$/m,
      `componentNumber: ${num}`,
    );

    console.log(`✏  ${mdxFiles[i]}  — ${currentNum} → ${num}`);
    changed++;

    if (!dryRun) {
      await writeFile(filePath, updated, 'utf-8');
    }
  }

  console.log(
    `\n${dryRun ? '[DRY RUN] ' : ''}${changed} file(s) ${dryRun ? 'would be' : 'were'} updated.`,
  );
  if (dryRun && changed > 0) {
    console.log('Run with --write to apply changes.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
