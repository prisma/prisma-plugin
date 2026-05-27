# prisma debug

Prints information helpful for debugging and bug reports.

## Command

```bash
prisma debug [options]
```

## What It Does

Outputs debugging context from the current project and process:
- Prisma schema path or schema lookup error
- Local engine cache directory
- Relevant environment variables, grouped by purpose
- Whether the terminal is interactive
- Whether CI was detected

## Options

| Option | Description |
|--------|-------------|
| `--schema` | Path to schema file |
| `--config` | Custom path to your Prisma config file |

## Example Output Shape

```text
-- Prisma schema --
Path: prisma/schema.prisma

-- Local cache directory for engines files --
Path: ...

-- Environment variables --
...

-- Terminal is interactive? --
true

-- CI detected? --
false
```

## When to Use

- **Troubleshooting**: Checking version mismatches
- **Reporting Issues**: Including environment info in GitHub issues
- **Verifying Installation**: Ensuring correct binaries are downloaded
