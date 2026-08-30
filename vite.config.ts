import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import mdx from "@mdx-js/rollup"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"

function manualChunks(id: string) {
  if (!id.includes("node_modules")) {
    return undefined
  }

  const reactVendorPackages = [
    "react",
    "react-dom",
    "react-router-dom",
    "react-router",
    "react-helmet-async",
  ]

  if (reactVendorPackages.some((pkg) => id.includes(`/node_modules/${pkg}/`))) {
    return "react-vendor"
  }

  const uiVendorPackages = [
    "@radix-ui/react-slot",
    "@radix-ui/react-dialog",
    "@radix-ui/react-separator",
    "@radix-ui/react-tooltip",
    "framer-motion",
    "lucide-react",
    "@hugeicons/react",
    "clsx",
    "tailwind-merge",
    "next-themes",
    "date-fns",
    "recharts",
  ]

  if (uiVendorPackages.some((pkg) => id.includes(`/node_modules/${pkg}/`))) {
    return "ui-vendor"
  }

  return undefined
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        providerImportSource: "@mdx-js/react",
      }),
    },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit slightly as syntax highlighter is naturally large
  },
})
