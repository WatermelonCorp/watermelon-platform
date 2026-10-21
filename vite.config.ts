import path from 'path';
import { readFile } from 'node:fs/promises';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { parse as parseYaml } from 'yaml';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

function manualChunks(id: string) {
  if (!id.includes('node_modules')) {
    return undefined;
  }

  const reactVendorPackages = [
    'react',
    'react-dom',
    'react-router-dom',
    'react-router',
    'react-helmet-async',
  ];

  if (reactVendorPackages.some((pkg) => id.includes(`/node_modules/${pkg}/`))) {
    return 'react-vendor';
  }

  const uiVendorPackages = [
    '@radix-ui/react-slot',
    '@radix-ui/react-dialog',
    '@radix-ui/react-separator',
    '@radix-ui/react-tooltip',
    'framer-motion',
    'motion',
    'lucide-react',
    '@hugeicons/react',
    'clsx',
    'tailwind-merge',
    'next-themes',
    'date-fns',
    'recharts',
  ];

  if (uiVendorPackages.some((pkg) => id.includes(`/node_modules/${pkg}/`))) {
    return 'ui-vendor';
  }

  const contentVendorPackages = [
    'react-syntax-highlighter',
    'styled-components',
  ];

  if (
    contentVendorPackages.some((pkg) => id.includes(`/node_modules/${pkg}/`))
  ) {
    return 'content-vendor';
  }

  return undefined;
}

// `file.mdx?frontmatter=title,slug` loads only those frontmatter fields, so
// metadata lists (sidebar, search, nav) don't pull every compiled MDX body
// into the main bundle. The \0 prefix and .js suffix keep the MDX plugin off
// these ids.
function mdxFrontmatter(): Plugin {
  const prefix = '\0mdx-frontmatter:';
  const pattern = /\.mdx\?frontmatter=([\w,]+)$/;
  return {
    name: 'mdx-frontmatter',
    enforce: 'pre',
    async resolveId(source, importer) {
      const match = source.match(pattern);
      if (!match) return null;
      const file = source.slice(0, -match[0].length + '.mdx'.length);
      const resolved = await this.resolve(file, importer, { skipSelf: true });
      return resolved ? `${prefix}${match[1]}:${resolved.id}.js` : null;
    },
    async load(id) {
      if (!id.startsWith(prefix)) return null;
      const rest = id.slice(prefix.length, -'.js'.length);
      const fields = rest.slice(0, rest.indexOf(':')).split(',');
      const file = rest.slice(rest.indexOf(':') + 1);
      this.addWatchFile(file);
      const source = await readFile(file, 'utf8');
      const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const all = (match && parseYaml(match[1])) ?? {};
      const frontmatter = Object.fromEntries(fields.filter((f) => f in all).map((f) => [f, all[f]]));
      return `export const frontmatter = ${JSON.stringify(frontmatter)};`;
    },
  };
}

// The page paints nothing until React mounts, so the main stylesheet does not
// need to block rendering. Ship it as a preload; main.tsx attaches it and waits
// for it before the first render (loadMainStylesheet).
function nonBlockingCss(): Plugin {
  return {
    name: 'non-blocking-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          /<link rel="stylesheet" crossorigin href="(\/assets\/index-[^"]+\.css)">/,
          '<link rel="preload" as="style" crossorigin href="$1" data-main-css>',
        );
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdxFrontmatter(),
    nonBlockingCss(),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        providerImportSource: '@mdx-js/react',
      }),
    },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit slightly as syntax highlighter is naturally large
  },
});
