#!/usr/bin/env node

import { spawn } from 'node:child_process';

const REGISTRY_URL = 'https://registry.watermelon.sh/r';
const slugPattern = /^[a-z0-9]+(?:[a-z0-9-]*[a-z0-9])?$/;

function usage() {
  console.log(`Watermelon UI CLI

Usage:
  npx @watermelon-ui/cli add <component>
  npx @watermelon-ui/cli add <component> --base

Examples:
  npx @watermelon-ui/cli add card-split-accordian
  npx @watermelon-ui/cli add card-split-accordian --base`);
}

const [command, component, ...flags] = process.argv.slice(2);

if (!command || command === '--help' || command === '-h') {
  usage();
  process.exit(0);
}

if (command !== 'add' || !component || !slugPattern.test(component)) {
  console.error('Use `watermelon-ui add <component>` with a lowercase component slug.');
  process.exit(1);
}

const suffix = flags.includes('--base') ? '-base' : '';
const registryItem = `${REGISTRY_URL}/${component}${suffix}.json`;
const child = spawn('npx', ['shadcn@latest', 'add', registryItem], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

child.on('exit', (code) => process.exit(code ?? 1));
