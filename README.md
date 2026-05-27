# prisma-plugin

Unified Prisma plugin repo for agent tools.

## Install

```bash
npx plugins add prisma/prisma-plugin
```

For local development:

```bash
npx plugins discover .
npx plugins add . --target codex --scope local
codex plugin add prisma@plugins-cli
claude plugin marketplace add . --scope local
claude plugin install prisma@prisma --scope local
```

## Supported Targets

| Tool | Surface |
| --- | --- |
| OpenAI Codex | `.plugin/plugin.json` and legacy `.codex-plugin/plugin.json` |
| Cursor | `.cursor-plugin/plugin.json` |
| Claude Code | `.claude-plugin/plugin.json` |

Note: `plugins@1.3.1` detects Cursor on macOS, but its `--target cursor` installer currently writes through the Claude-style plugin cache instead of `~/.cursor/plugins`.

## Contents

- `skills/` - canonical Prisma skills copied from the latest Codex plugin
- `rules/` - Cursor rules for Prisma schema and migration guidance
- `.mcp.json` - official remote Prisma MCP server configuration
- `assets/prisma-icon.svg` - shared plugin icon

## Skills

- `prisma-cli` - Prisma CLI commands, migrations, database commands, Studio, and MCP
- `prisma-client-api` - Prisma Client querying, relations, transactions, raw SQL, and options
- `prisma-database-setup` - provider setup for PostgreSQL, MySQL, SQLite, MongoDB, SQL Server, CockroachDB, Prisma Postgres, and client setup
- `prisma-postgres` - Prisma Postgres Console, create-db, Management API, and SDK workflows
- `prisma-upgrade-v7` - Prisma ORM 7 migration guidance and breaking changes

## Source Of Truth

The Codex plugin is the freshest Prisma plugin source. This repo uses its five consolidated skills, MCP config, and icon as the canonical implementation. Cursor and Claude manifests are lightweight wrappers over that same shared content.

Seeded from `prisma/codex-plugin` commit `ca81872` on branch `remove-local-prisma-mcp`.

Cursor's older granular skill split is intentionally not copied here. Only its `rules/` are retained because they complement the latest Codex skill model without duplicating stale guidance.

## Compatibility

The root `.plugin/plugin.json` is the primary manifest for the `plugins` CLI.

The repo also keeps `.codex-plugin/plugin.json` and `.agents/plugins/marketplace.json` so older Codex marketplace flows can still discover the plugin while teams migrate to:

```bash
npx plugins add prisma/prisma-plugin
```

Destructive Prisma actions such as migration resets still require explicit user consent and review.
