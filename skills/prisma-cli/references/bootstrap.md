# prisma bootstrap

Bootstraps a Prisma Postgres project from scratch or connects an existing project.

## Command

```bash
prisma bootstrap [options]
```

## Options

| Option | Description |
|--------|-------------|
| `--api-key` | Workspace API key for CI or non-interactive usage |
| `--database` | Database ID to link to, for example `db_abc123` |
| `--template` | Starter template name, for example `nextjs` or `express` |
| `--force` | Re-link even if the project is already linked to Prisma Postgres |
| `--help` / `-h` | Display help |

When using `--api-key`, also provide `--database`.

## Examples

### Interactive bootstrap

```bash
prisma bootstrap
```

### Non-interactive link

```bash
prisma bootstrap --api-key "<your-api-key>" --database "db_..."
```

### With starter template

```bash
prisma bootstrap --template nextjs
```

## Behavior

The command can initialize a Prisma project, scaffold a supported starter template, link to Prisma Postgres, install dependencies, run generation, run migrations, and run seed steps when applicable.

Supported template names in the current source include `nextjs`, `express`, `hono`, `fastify`, `nuxt`, `sveltekit`, `remix`, `react-router-7`, `astro`, and `nest`.
