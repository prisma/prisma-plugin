# Prisma Plugin

Prisma plugin for agent tools, including curated skills for Prisma ORM, Prisma Client, Prisma Postgres, Prisma Compute, driver adapters, migrations, upgrades, and official Prisma MCP workflows.

## Install

```bash
npx plugins add prisma/prisma-plugin
```

## Agent Plugins Standard

This repository conforms to the [Agent Plugins](https://agent-plugins.org) open standard (v1.0.0):

- `plugin.json` — the portable manifest at the repository root
- `mcp.json` — the portable MCP server declaration (official Prisma MCP over streamable HTTP)
- `skills/` — one directory per skill with an Agent Skills `SKILL.md`

Any Agent Plugins–compatible client (ChatGPT/Codex, Cursor, GitHub Copilot, VS Code, Kiro, and others) can consume these files directly. The client-specific directories (`.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/`, `.plugin/`) are kept for clients and installers that predate the standard; the portable files at the root are the source of truth.

## Supported Tools

| Tool | Support |
| --- | --- |
| Agent Plugins clients (VS Code, Copilot, Kiro, …) | Skills and Prisma MCP via the portable standard files |
| OpenAI Codex | Skills and Prisma MCP |
| Claude Code | Skills and Prisma MCP |
| Cursor | Rules, skills, and Prisma MCP metadata |

Codex also discovers this repository directly as a plugin marketplace via `.agents/plugins/marketplace.json`; the repo-root plugin path (`"./"`) requires Codex 0.142.0 or newer.

## What's Included

- Prisma CLI guidance for setup, migrations, database commands, Studio, and MCP
- Prisma Client guidance for querying, relations, transactions, raw SQL, and configuration
- Database setup guidance for PostgreSQL, MySQL, SQLite, MongoDB, SQL Server, CockroachDB, and Prisma Postgres
- Prisma Postgres setup guidance for provisioning a database and connecting it to a local project
- Prisma Postgres guidance for Console, connection strings, `create-db`, Management API, and SDK workflows
- Prisma Compute guidance for app deployment, `prisma.compute.ts`, `@prisma/cli app deploy`, `create-prisma --deploy`, framework readiness, logs, env vars, domains, and monorepos
- Prisma driver adapter implementation guidance for Prisma ORM v7 adapter contracts
- Prisma ORM 7 upgrade guidance
- Prisma MongoDB upgrade decision guidance for v6 projects (stay on v6 vs Prisma Next)
- Cursor rules for Prisma schema and migration best practices

## Skills

- `prisma-cli`
- `prisma-client-api`
- `prisma-compute`
- `prisma-database-setup`
- `prisma-driver-adapter-implementation`
- `prisma-mongodb-upgrade`
- `prisma-postgres`
- `prisma-postgres-setup`
- `prisma-upgrade-v7`
