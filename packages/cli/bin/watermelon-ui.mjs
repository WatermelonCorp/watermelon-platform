#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const MCP_URL = 'https://mcp.watermelon.sh/mcp';
const REGISTRY_URL = 'https://registry.watermelon.sh/r';
const slugPattern = /^[a-z0-9]+(?:[a-z0-9-]*[a-z0-9])?$/;

function usage() {
  console.log(`Watermelon UI CLI

Usage:
  npx @watermelon-ui/cli init --client <codex|claude|cursor>
  npx @watermelon-ui/cli add <component>
  npx @watermelon-ui/cli add <component> --base

Examples:
  npx @watermelon-ui/cli init --client codex
  npx @watermelon-ui/cli init --client claude
  npx @watermelon-ui/cli init --client cursor
  npx @watermelon-ui/cli add card-split-accordian`);
}

function flagValue(args, flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

async function readOptional(filePath) {
  try {
    return await readFile(filePath, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
}

async function updateJson(filePath, server) {
  const source = await readOptional(filePath);
  const config = source.trim() ? JSON.parse(source) : {};
  config.mcpServers = { ...(config.mcpServers ?? {}), watermelon: server };
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(config, null, 2)}\n`);
}

function upsertTomlSection(source) {
  const lines = source.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === '[mcp_servers.watermelon]');
  if (start >= 0) {
    let end = start + 1;
    while (end < lines.length && !lines[end].trim().startsWith('[')) end += 1;
    lines.splice(start, end - start);
  }

  const trimmed = lines.join('\n').trimEnd();
  return `${trimmed ? `${trimmed}\n\n` : ''}[mcp_servers.watermelon]\nurl = "${MCP_URL}"\n`;
}

async function initClient(client, cwd) {
  if (client === 'codex') {
    const filePath = path.join(cwd, '.codex', 'config.toml');
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, upsertTomlSection(await readOptional(filePath)));
    return filePath;
  }

  if (client === 'claude') {
    const filePath = path.join(cwd, '.mcp.json');
    await updateJson(filePath, { type: 'http', url: MCP_URL });
    return filePath;
  }

  if (client === 'cursor') {
    const filePath = path.join(cwd, '.cursor', 'mcp.json');
    await updateJson(filePath, { url: MCP_URL });
    return filePath;
  }

  throw new Error('Choose a supported client: codex, claude, or cursor.');
}

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  usage();
  process.exit(0);
}

if (command === 'init') {
  const client = flagValue(args, '--client');
  const cwd = path.resolve(flagValue(args, '--cwd') ?? process.cwd());

  try {
    const filePath = await initClient(client, cwd);
    console.log(`Connected Watermelon MCP for ${client} in ${path.relative(cwd, filePath)}.`);
    console.log(`Endpoint: ${MCP_URL}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
  process.exit(0);
}

if (command === 'add') {
  const component = args[1];
  if (!component || !slugPattern.test(component)) {
    console.error('Use `watermelon-ui add <component>` with a lowercase component slug.');
    process.exit(1);
  }

  const suffix = args.includes('--base') ? '-base' : '';
  const registryItem = `${REGISTRY_URL}/${component}${suffix}.json`;
  const child = spawn('npx', ['shadcn@latest', 'add', registryItem], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  child.on('exit', (code) => process.exit(code ?? 1));
} else {
  console.error(`Unknown command: ${command}`);
  usage();
  process.exit(1);
}
