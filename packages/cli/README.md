# Watermelon UI CLI

Connect Codex, Claude Code, or Cursor to the free hosted Watermelon MCP server:

```bash
npx @watermelon-ui/cli init --client codex
npx @watermelon-ui/cli init --client claude
npx @watermelon-ui/cli init --client cursor
```

The command writes a project-scoped MCP configuration. Watermelon MCP is read-only and does not require an API key.

Install any component returned by MCP or found on Watermelon UI:

```bash
npx @watermelon-ui/cli add card-split-accordian
```

For an animated component's theme-token base variant:

```bash
npx @watermelon-ui/cli add card-split-accordian --base
```

The CLI uses the public Watermelon shadcn registry, so installed source belongs to your project and can be edited freely.
