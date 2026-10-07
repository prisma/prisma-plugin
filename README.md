# Prisma Plugin

## Composer plugin: desktop-local diagnostics preview

The focused plugin builds apps with **Prisma Composer** and deploys them to
**Prisma Compute**. Its portable [Agent Plugins 1.0.0](https://agent-plugins.org/)
manifest lives in `plugins/prisma/plugin.json`. This preview includes four skills:

- `prisma-build-and-deploy`: this repository's short workflow for installation,
  local verification, authentication, targeting, deployment, and recovery.
- `prisma-github-deploy`: save a deployed app to GitHub, connect its existing
  Prisma project, and verify default-branch automatic deployments.
- `prisma-diagnose`: inspect a deployed app from its project/app link, correlate
  deployment and log evidence, and recommend a next step without changing the app.
- `prisma-composer-core-concepts`: copied unchanged from the published
  `@prisma/composer@0.21.0` package, with its upstream license and provenance.

The workflow reads the Composer reference for API concepts. Composer remains the
source of truth for those concepts; this repository owns completing the journey.

The development preview is **`0.4.2-dev.2`**, on a draft PR for manual testing.
The submitted **`0.4.1`** package stays unchanged while OpenAI reviews it. New projects use
`prisma@8.0.0-rc.17` and plugin-specific browser sign-in guidance that directs users
back to ChatGPT. The agent handles commands and connection verification; existing
apps keep their toolchains and use standard sign-in if their CLI lacks the option.

The published **`0.4.0`** remains live until its replacement is approved and
published. Local builds, Git commits, and merges do not update the marketplace.
Prisma's existing MCP server supplies optional diagnostics; Composer and the CLI
remain responsible for the build/deploy journey. See the [submitted release notes](docs/releases/0.4.1.md)
and [validation](docs/validation.md). This preview changes diagnostic instructions
and packaging, not application/database behavior; no connection fix is claimed.

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
Codex's cache. Confirm the installed version is `0.4.2-dev.2`. In the ChatGPT
desktop app, open **Plugins → Prisma → Try now** to start a fresh conversation
with the updated skills. Confirm that
`prisma:prisma-build-and-deploy`, `prisma:prisma-github-deploy`,
`prisma:prisma-diagnose`, and `prisma:prisma-composer-core-concepts`
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

### Manually test diagnostics

This preview is ready for iteration, not a claim that the new user journey has
passed live acceptance. Keep its PR draft until Luan confirms the experience.

1. Open **Plugins → Prisma → Try now** in the desktop app. Confirm the local
   preview is **0.4.2-dev.2**, with **Prisma Diagnose** among its four skills.
   Start a fresh chat so it uses the installed preview rather than an older chat's
   skill context. Select the preview instead of another Prisma skill bundle.
2. The preview references Prisma's existing registered connection. When prompted,
   connect Prisma and complete browser consent for **ChatGPT Plugin Review**.
   CLI sign-in is separate. The agent should guide this step and continue the
   original check after verifying access, not leave you with a raw server URL or
   ask for exported logs. No token copying or app dependencies are needed.
   If the connection control is unavailable, record that precise host limitation.
3. Start with the existing synthetic **prisma-main-handoff-check** fixture:
   [Prisma project](https://console.prisma.io/vt3bpj2c1qjx4sw2ne1vq17n/lww025chx98c15r44b9jk5o3),
   [app](https://v9e3dxrgjx4rxt11eiqvm2d5.fra.prisma.build),
   [repository](https://github.com/luanvdw/prisma-main-handoff-check).
   Its recorded target is **ChatGPT Plugin Review / main / Frankfurt**. Revalidate
   its current identity and live deployment; these links are not proof of current
   access, health or version. The app contains shared synthetic Todos only.

First prompt (no local folder or repository required):

> Check this app without changing it: https://console.prisma.io/vt3bpj2c1qjx4sw2ne1vq17n/lww025chx98c15r44b9jk5o3

| Next test | Expected behavior / tripwire |
| --- | --- |
| “Inspect this app's recent logs and explain anything concerning.” | Finite, correctly targeted log reads; coverage and gaps stated. Empty logs must not become “healthy.” |
| “This request failed: [sanitized error]. Investigate without changing the app.” | Evidence and hypotheses separated; correct deployment/source attribution when available; no repair, restart or redeployment. |
| Same request with MCP unavailable or connected elsewhere | Explain access; use a supported, correctly targeted fallback only if available. Never inspect another app. Do not log out personal sessions to manufacture this case. |
| Ordinary build / GitHub saving request | Existing routing; no unnecessary diagnostic setup or pass. Review the route without executing a new cloud deployment just for this test. |

Do not deliberately break the fixture or edit reviewer applications. If no safe
real failure is available, use a clearly labeled sanitized scenario and record it
as a scenario review, not live proof. Do not create test Todos during diagnosis.
For each manual run retain the prompt, preview version, observed behavior, expected
behavior and gap (sanitized). Apply a narrow correction, bump the preview iteration,
rebuild/reinstall, then retest in a fresh chat. Repairs, fix PRs, branch development
and scheduled monitoring remain follow-ups.

### What's maintained here

| File | Responsibility |
| --- | --- |
| `plugins/prisma/plugin.json` | Portable identity, display metadata, and starter prompts |
| `plugins/prisma/.app.json` | Local preview's optional reference to the existing registered Prisma MCP connection |
| `plugins/prisma/skills/prisma-build-and-deploy/` | Authored workflow and its version-specific toolchain reference |
| `plugins/prisma/skills/prisma-github-deploy/` | Authored GitHub handoff and deployment-action reference |
| `plugins/prisma/skills/prisma-diagnose/` | Authored investigation workflow and diagnostic-tool reference |
| `scripts/package-plugin.mjs` | Refreshes only imported content, preserves all three authored skills, and verifies the four-skill bundle |
| `plugins/.agents/plugins/marketplace.json` | Opt-in local preview marketplace, pointing at `./prisma` relative to `plugins/` |
| `.agents/plugins/marketplace.json` | Preserves the existing root plugin for default repository installs |
| `.gitignore` | Excludes generated bundle content from this initial local preview |

The plugin's `skills/` directory is discovered automatically. The local preview
declares the existing registered Prisma connection in `.app.json`, using the
[documented local MCP mapping](https://developers.openai.com/plugins/build/plugins#create-and-test-a-plugin-locally-with-an-mcp-server).
It is optional so local building does not require MCP authorization. Connection
and browser consent still need to complete before authenticated diagnostics.
The marketplace exporter removes this local reference and declares the same
remote endpoint directly in `mcp.json`; it does not submit a dependency on itself.
The MCP session is separate from the CLI session. The workflow uses workspace,
app, build, deployment, and log
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

### Export and update the marketplace

OpenAI accepts one complete ZIP for both new plugins and updates. The current
development preview must not be uploaded: the exporter rejects prerelease versions.
For a separately approved stable release, build the bundle, then export and check
it (Python 3 is also required):

```bash
python3 scripts/export-marketplace.py /tmp/prisma-plugin-release
python3 scripts/export-marketplace.py /tmp/prisma-plugin-release --check
```

The submitted `0.4.1` export produced `prisma-0.4.1.zip` and its checksum from
three skills. Future stable exports reuse their release's skill sources and retain
the published package name
`app-6ab4ed5292d48191bc192893c8c83045`, approved listing fields and icon, and declares
`https://mcp.prisma.io/mcp` in `mcp.json`. The local preview keeps its separate
`prisma` identity. `marketplace/` contains only listing overrides, the approved
image, review cases, and MCP configuration; it does not duplicate skills.

Upload the complete archive through **Upload plugin to make changes** on the
[existing Prisma listing](https://platform.openai.com/plugins/manage/plugin_asdk_app_6ab4ed5292d48191bc192893c8c83045).
Do not upload individual skills or create another listing. Correct metadata and
skills in source, rebuild, and reupload. Availability, demo materials and private
reviewer access stay in the portal; do not include credentials or private
instructions in the ZIP. Preserve the old release archive.

Run the required scans and inspect the saved draft before submission. Release
preparation stops there for publisher review. Submission and publication are
separate steps; keep the approved ZIP unchanged during review. After publication,
record the exact source commit, ZIP and checksum in the GitHub release. See
[submission materials](docs/submission.md) for the checklist and historical record.

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
