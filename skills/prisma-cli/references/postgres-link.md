# prisma postgres link

Links a local project to a Prisma Postgres database.

## Command

```bash
prisma postgres link [options]
```

## Options

| Option | Description |
|--------|-------------|
| `--api-key` | Workspace API key for CI or non-interactive usage |
| `--database` | Database ID to link to, for example `db_abc123` |
| `--force` | Re-link even if already linked to Prisma Postgres |
| `--help` / `-h` | Display help |

When using `--api-key`, also provide `--database`.

## Examples

### Interactive link

```bash
prisma postgres link
```

### Non-interactive link

```bash
prisma postgres link --api-key "<your-api-key>" --database "db_..."
```

## Behavior

The command authenticates with Prisma Console when needed, lets you select a project and ready database interactively, creates a development connection, and writes local project files for Prisma Postgres.

If the project is already linked, use `--force` to re-link.
