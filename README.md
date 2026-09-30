# Prisma Plugin

## Composer plugin: desktop-local preview

The first focused preview builds apps with **Prisma Composer** and deploys them to
**Prisma Compute**. Its portable [Agent Plugins 1.0.0](https://agent-plugins.org/)
manifest lives in `plugins/prisma/plugin.json`. It includes three skills:

- `prisma-build-and-deploy`: this repository's short workflow for installation,
  local verification, authentication, targeting, deployment, and recovery.
- `prisma-github-deploy`: save a deployed app to GitHub, connect its existing
  Prisma project, and verify default-branch automatic deployments.
- `prisma-composer-core-concepts`: copied unchanged from the published
  `@prisma/composer@0.21.0` package, with its upstream license and provenance.

The workflow reads the Composer reference for API concepts. Composer remains the
source of truth for those concepts; this repository owns completing the journey.

The local development preview is **`0.4.1-dev.4`**. New projects use
`prisma@8.0.0-rc.17` and plugin-specific browser sign-in guidance that directs users
back to ChatGPT. The agent handles commands and connection verification; existing
apps keep their toolchains and use standard sign-in if their CLI lacks the option.

The submitted **`0.4.0`** package remains separate and unchanged, using
`prisma@8.0.0-rc.15`. Its OpenAI submission was observed in **Review** on
2026-09-25. That submission connects Prisma's existing MCP server for optional
diagnostics. Composer and the CLI remain responsible for the build/deploy journey.
See [validation](docs/validation.md) for completed checks and remaining acceptance.

### Package and install

These are contributor packaging instructions, not steps for plugin users.
Prerequisites: Node.js 22.18+ (or a newer supported release), `tar`, internet access
to the npm registry, and a current Codex CLI with `codex plugin` support. The
packager uses Node's standard library; there is no dependency-install step in this
repository. It checks the pinned archive's integrity and never runs npm lifecycle
scripts or installs Composer into this repository.

From this repository's root, build and check the bundle:

```bash
node scripts/package-plugin.mjs
node scripts/package-plugin.mjs --check
```

After packaging, install the preview explicitly:

```bash
codex plugin marketplace add "$PWD/plugins"
codex plugin add prisma@prisma-preview
codex plugin list --marketplace prisma-preview --json
```

This registers the local `prisma-preview` marketplace and installs its Prisma plugin into
Codex's cache. Confirm the installed version is `0.4.1-dev.4`. In the ChatGPT
desktop app, open **Plugins → Prisma → Try now** to start a fresh conversation
with the updated skills. Confirm that
`prisma:prisma-build-and-deploy`, `prisma:prisma-github-deploy`, and
`prisma:prisma-composer-core-concepts`
are available (Codex prefixes skills with their plugin name). Enable only the
focused Prisma preview for acceptance testing, so another Prisma installation
does not supply additional skills.

### First test

In the ChatGPT desktop app, open **Plugins → Prisma → Try now**, then use:

> Build a simple Todo app and deploy it

Use **ChatGPT's desktop app with local execution**. Web and cloud execution,
including cloud tasks launched from desktop, are deferred. Initial validation
uses macOS; other operating systems have not been verified.

Selecting Prisma supplies the Composer/Compute defaults, including local and live
verification. The agent handles tooling, dependencies, and commands. The user
completes browser signup/consent when needed and answers unresolved target
questions; they never need a terminal, copied authentication codes, or manual
credential configuration. Explicit stack or hosting choices
still take precedence. Merely installing the plugin does not make Prisma the
default for unrelated tasks.

The skill guides the agent's use of the desktop's local capabilities. Its workflow
defaults to the project-local **unified `prisma` CLI** for new interactive apps.
The bundled
[toolchain reference](plugins/prisma/skills/prisma-build-and-deploy/references/toolchain.md)
contains the verified installation set, required peer, runtime checks, and command
sequence, managed browser login, and verification before confirming a connection.

Local Composer development needs no cloud credentials. Before deployment the
workflow checks for an existing CLI session and verifies workspace access; browser
login is needed only if that session is missing or expired. New users can create
an account during sign-in. If the browser does not open, the agent shares the
authorization link from the same pending attempt. After successful login it checks
authenticated identity and remote workspace access, then reuses the authorized
workspace unless another was explicitly requested. Browser signup alone is not
proof of a working connection. Local work continues while login is pending.

Installing this plugin does not deploy or provision anything. New persistent apps
use Prisma Postgres through Composer, locally and on deployment; browser storage
is only for preferences or caches. Static apps need no database, and existing
apps retain their database choices. New apps use production on the default `main`
branch without a stage override. Existing named targets such as `demo` are retained.
The handoff includes verified **Open your app** and **Manage your Prisma project**
links, and reports partial provisioning separately from success.
Service-token setup is not a workaround for unsupported web/cloud execution.

See [validation and upstream findings](docs/validation.md) for the acceptance
scenarios, recorded evidence, and remaining limits of this preview.

### Save to GitHub and enable updates

After a verified first deployment, the build workflow explains the next step:

> Your app is live, but its source code is still on this computer. I recommend
> saving a private copy to GitHub, an online home for your code and change history.
> It also lets us work on changes separately before publishing them.
>
> Shall I save your code to GitHub and connect it to Prisma? Updates to the
> repository's main branch will then automatically update your live app.

It adapts this wording to the actual source location and default branch.
Acceptance hands off to the GitHub skill. You can also request this directly for
an existing deployed Composer app.
The agent confirms a repository destination (private by default), saves reviewed
source, and connects it to the existing Prisma project. GitHub login for saving
code and Prisma GitHub App access for deployment are separate browser steps.
An explicit save-only request saves the code without enabling or triggering deployment.

The reference pins `prisma/cloud-deploy-action@v1.7.0` with GitHub OIDC. New
automation deploys pushes to the repository's actual default branch to the existing
target. Production/default deployments omit the stage override; existing named
targets such as `demo` keep their explicit mapping. New repositories use `main`.
Appropriate existing workflows, including previews,
are preserved. Missing-credential outcomes mean incomplete setup, even when the
GitHub run is green. The workflow-configuration commit verifies automatic updates
without changing app behavior; a successful no-op is acceptable. Setup finishes
with repository, successful run, live-app, and Prisma project links, without a
demonstration PR or application/database preview promise.
GitHub Actions runs remotely, while the agent still works in a desktop-local task.

Shared guidance checks runtimes before work in each execution context, bounds
HTTP checks, and retains test identity outside Git. Recovery inspects database-backed
behavior as well as routing and service state, preserves live resources, and uses
the established deployment path after an evidence-supported fix.

The completed pilot remains the deployment baseline. Its preview, merge, and
cleanup exercise is retained in maintainer validation notes, outside the setup
journey. See [validation](docs/validation.md) for executed checks, scenario reviews,
and unresolved application reliability observations. A separate branch-development
skill, broad PR-management, and automatic cross-conversation discovery are deferred.

### What's maintained here

| File | Responsibility |
| --- | --- |
| `plugins/prisma/plugin.json` | Portable identity, display metadata, and starter prompts |
| `plugins/prisma/skills/prisma-build-and-deploy/` | Authored workflow and its version-specific toolchain reference |
| `plugins/prisma/skills/prisma-github-deploy/` | Authored GitHub handoff and deployment-action reference |
| `scripts/package-plugin.mjs` | Refreshes only imported content, preserves both authored skills, and verifies the full bundle |
| `plugins/.agents/plugins/marketplace.json` | Opt-in local preview marketplace, pointing at `./prisma` relative to `plugins/` |
| `.agents/plugins/marketplace.json` | Preserves the existing root plugin for default repository installs |
| `.gitignore` | Excludes generated bundle content from this initial local preview |

The plugin's `skills/` directory is discovered automatically. MCP is registered
separately in the submission portal, not embedded in this skills bundle. To test
diagnostics locally, connect `https://mcp.prisma.io/mcp` through the host's supported
MCP/OAuth settings alongside the three-skill preview. The MCP session is separate
from the CLI session. The workflow uses workspace, app, build, deployment, and log
reads only when diagnosing a failure or responding to a diagnostic request; missing
MCP access does not block the CLI journey. The server itself exposes broader tools
and permissions; workflow guidance does not restrict server access.

The older root skills and tool manifests below
remain the default repository install. The separate `prisma-preview` marketplace
installs only the Composer bundle after packaging.

To iterate, edit the maintained files, bump `version` in
`plugins/prisma/plugin.json`, rerun the packager and `--check`, then run
`codex plugin add prisma@prisma-preview` again and start a new task. Codex uses its
installed copy, so edits to this checkout alone do not update active tasks.
`--check` is offline and detects missing, changed, or additional bundle files.
To update Composer, review the new upstream skill and change the package version,
tarball URL, and npm `dist.integrity` together in the packaging script.

Run `node --test scripts/package-plugin.test.mjs` for packaging regression tests
(requires access to the npm registry). These build an isolated temporary copy and
verify repeatability, preservation of authored content, and integrity failures.

The local marketplace is separate from public directory publication. Rebuilding
or reinstalling this preview does not replace the skills uploaded for `0.4.0`.
Do not overwrite the saved submission archives or upload development previews to
the existing submission. A fresh clone
must run the packager before installing. Preserve a complete release ZIP of the
generated `plugins/prisma/` tree, with `plugin.json` at its root; do not include
the older root plugin. In the current With MCP form, upload each skill as its own
ZIP with `SKILL.md` at the root and its reference paths intact. Export those ZIPs
from the same verified bundle without changing their contents. The submitted
**With MCP** version in the [OpenAI plugin submission](https://platform.openai.com/plugins)
portal combines its separately registered server with the two uploaded skills.
Leave that submission untouched while iterating locally. Updating a submission
or publishing requires a separate instruction from the publisher.
The generated `upstream.json` records exactly which release and files were packaged.
See [submission materials](docs/submission.md) for review cases, recording guidance,
and its recorded preparation history. Submission does not mean OpenAI has approved
or published the plugin.

## Existing broad plugin

Prisma plugin for agent tools, including curated skills for Prisma ORM, Prisma Client, Prisma Postgres, Prisma Compute, driver adapters, migrations, upgrades, and official Prisma MCP workflows.

### Existing installer

This is the repository's previous install route. For the focused Composer preview,
use the local packaging and installation steps above.

```bash
npx plugins add prisma/prisma-plugin
```

### Supported Tools

| Tool | Support |
| --- | --- |
| OpenAI Codex | Skills and Prisma MCP |
| Claude Code | Skills and Prisma MCP |
| Cursor | Rules, skills, and Prisma MCP metadata |

### What's Included

- Prisma CLI guidance for setup, migrations, database commands, Studio, and MCP
- Prisma Client guidance for querying, relations, transactions, raw SQL, and configuration
- Database setup guidance for PostgreSQL, MySQL, SQLite, MongoDB, SQL Server, CockroachDB, and Prisma Postgres
- Prisma Postgres setup guidance for provisioning a database and connecting it to a local project
- Prisma Postgres guidance for Console, connection strings, `create-db`, Management API, and SDK workflows
- Prisma Compute guidance for app deployment, `prisma.compute.ts`, `@prisma/cli app deploy`, `create-prisma --deploy`, framework readiness, logs, env vars, domains, and monorepos
- Prisma driver adapter implementation guidance for Prisma ORM v7 adapter contracts
- Prisma ORM 7 upgrade guidance
- Cursor rules for Prisma schema and migration best practices

### Skills

- `prisma-cli`
- `prisma-client-api`
- `prisma-compute`
- `prisma-database-setup`
- `prisma-driver-adapter-implementation`
- `prisma-postgres`
- `prisma-postgres-setup`
- `prisma-upgrade-v7`
