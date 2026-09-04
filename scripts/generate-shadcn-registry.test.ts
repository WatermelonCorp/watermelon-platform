import { afterAll, describe, expect, it } from 'bun:test';
import { mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { generateShadcnRegistry } from './generate-shadcn-registry';

const testDirectory = path.join(import.meta.dir, '.registry-test-output');

afterAll(async () => {
  await rm(testDirectory, { recursive: true, force: true });
});

describe('generateShadcnRegistry', () => {
  it('builds installable original and base variants from maintained components', async () => {
    await mkdir(testDirectory, { recursive: true });
    const { items, manifest } = await generateShadcnRegistry(
      testDirectory,
      path.join(testDirectory, 'registry.json'),
    );

    expect(items.length).toBeGreaterThan(200);
    expect(manifest.name).toBe('watermelon');

    const item = JSON.parse(
      await readFile(
        path.join(testDirectory, 'card-split-accordian.json'),
        'utf8',
      ),
    );

    expect(item.$schema).toBe('https://ui.shadcn.com/schema/registry-item.json');
    expect(item.type).toBe('registry:component');
    expect(item.dependencies).toEqual(
      expect.arrayContaining(['lucide-react', 'motion', 'react-icons', 'react-use-measure']),
    );
    expect(item.files[0].path).toBe(
      'components/watermelon/card-split-accordian.tsx',
    );
    expect(item.files[0].content).toContain('export const AccordionApp');
  });
});
