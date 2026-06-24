# Prisma Plugin

Prisma plugin for agent tools, including curated skills for Prisma ORM, Prisma Client, Prisma Postgres, Prisma Compute, driver adapters, migrations, upgrades, and official Prisma MCP workflows.

## Install

```bash
npx plugins add prisma/prisma-plugin
```

## Supported Tools

| Tool | Support |
| --- | --- |
| OpenAI Codex | Skills and Prisma MCP |
| Claude Code | Skills and Prisma MCP |
| Cursor | Rules, skills, and Prisma MCP metadata |

## What's Included

- Prisma CLI guidance for setup, migrations, database commands, Studio, and MCP
- Prisma Client guidance for querying, relations, transactions, raw SQL, and configuration
- Database setup guidance for PostgreSQL, MySQL, SQLite, MongoDB, SQL Server, CockroachDB, and Prisma Postgres
- Prisma Postgres setup guidance for provisioning a database and connecting it to a local project
- Prisma Postgres guidance for Console, connection strings, `create-db`, Management API, and SDK workflows
- Prisma Compute guidance for app deployment, `prisma.compute.ts`, `@prisma/cli app deploy`, `create-prisma --deploy`, framework readiness, logs, env vars, domains, and monorepos
- Prisma driver adapter implementation guidance for Prisma ORM v7 adapter contracts
- Prisma ORM 7 upgrade guidance
- Cursor rules for Prisma schema and migration best practices

## Skills

- `prisma-cli`
- `prisma-client-api`
- `prisma-compute`
- `prisma-database-setup`
- `prisma-driver-adapter-implementation`
- `prisma-postgres`
- `prisma-postgres-setup`
- `prisma-upgrade-v7`
