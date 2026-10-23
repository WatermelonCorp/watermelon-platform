/**
 * Fails when the built site in dist/ has no PostHog key or GA measurement ID.
 *
 * Both are read from VITE_* env vars at build time. A build without them
 * still works but silently sends no analytics (seen 2026-10-14: a deploy
 * built without .env stopped all PostHog and GA tracking).
 *
 * Run after `vite build` and before deploying: bun run scripts/check-analytics-build.ts
 */
import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'dist/assets');
const bundle = fs
  .readdirSync(assetsDir)
  .filter((file) => file.endsWith('.js'))
  .map((file) => fs.readFileSync(path.join(assetsDir, file), 'utf-8'))
  .join('\n');

const missing: string[] = [];
if (!/phc_[A-Za-z0-9]{20,}/.test(bundle)) missing.push('VITE_POSTHOG_KEY');
if (!/G-[A-Z0-9]{6,}/.test(bundle)) missing.push('VITE_GA_MEASUREMENT_ID');

if (missing.length) {
  console.error(
    `Analytics missing from the build: ${missing.join(', ')}.\n` +
      'Set them in .env (see .env.example) or the CI environment, then rebuild.',
  );
  process.exit(1);
}

console.log('Analytics keys present in the build.');
