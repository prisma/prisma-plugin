# prisma mcp

Starts Prisma's MCP server for AI development tools.

## Command

```bash
prisma mcp
```

## What It Does

- Starts a Model Context Protocol (MCP) server for your Prisma project
- Wraps selected Prisma CLI workflows for compatible AI tools
- Exposes tools for migration status, development migrations, migration reset, and Prisma Studio

## Usage

```bash
prisma mcp
```

The current help surface also accepts:

```bash
prisma mcp --early-access
```

## Typical Use Cases

- Connect Prisma to ChatGPT, Claude, or other MCP-aware tools
- Let an AI assistant run Prisma migration and Studio workflows through MCP
- Help an agent inspect migration status and apply development migrations with project context

## Notes

- Run this from the project that contains your Prisma schema and `prisma.config.ts`
- The command is separate from Prisma Studio and does not open a browser UI
- The MCP server wraps Prisma CLI commands. For exact behavior of commands like `migrate dev` or `migrate reset`, follow the underlying CLI command docs rather than relying only on the MCP tool descriptions.

## References

- [Prisma CLI `mcp` command](https://docs.prisma.io/docs/cli/mcp)
- [Prisma MCP Server](https://www.prisma.io/docs/ai/tools/chatgpt)
