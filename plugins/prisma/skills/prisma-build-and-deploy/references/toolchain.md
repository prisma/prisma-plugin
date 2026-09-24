# Toolchain for the local preview

Read this when installing dependencies or choosing the CLI/authentication path.
Composer API concepts live in the bundled upstream skill; this reference owns
the plugin's version-specific installation and command guidance.

## Verified installation set

**Desktop onboarding release gate:** the set below is the previous verified
baseline. `prisma@8.0.0-rc.15` does not support `--ui-context`. The new login
handoff must not be activated until the CLI change is released, an exact version
containing it is verified with this dependency set, and the CLI pin and this
notice are updated. Do not run the unsupported option, patch installed packages,
or use a floating version. Until then, continue independent local work and report
the release dependency if a new login is needed.

| Package | Version | Purpose |
| --- | --- | --- |
| `@prisma/composer` | `0.21.0` | Composer authoring and the bundled concepts skill |
| `@prisma/composer-prisma-cloud` | `0.21.0` | Compute and Postgres target |
| `@prisma/orm-postgres` | `8.0.0-rc.11` | Required peer declared by this cloud-target release |
| `prisma` | `8.0.0-rc.15` | Unified CLI for interactive development and deployment |

Verified on 2026-09-23: a clean npm install of these four exact versions succeeded
under Node 24.16.0 and npm 11.13.0, without peer-dependency bypass flags. The
Composer, cloud-control, and ORM-control imports loaded, and the unified CLI's
dev, deploy, and project-list help commands ran. This verifies installation and
command loading; it does not by itself verify an app or cloud deployment.

For a new npm project (translate to the existing package manager when relevant):

```sh
npm install --save-exact @prisma/composer@0.21.0 @prisma/composer-prisma-cloud@0.21.0 @prisma/orm-postgres@8.0.0-rc.11
npm install --save-dev --save-exact prisma@8.0.0-rc.15
```

Installing the peer does not require the app to use Prisma ORM. It satisfies the
cloud package's declared dependency; a raw Postgres app can retain its client and
schema strategy. Add the app's own build/typecheck/runtime dependencies as needed
and retain its lockfile. Do not use `--legacy-peer-deps` or `--force` as default
installation instructions.

The core package does not supply the `prisma-composer` executable. That executable
belongs to `@prisma/composer-cli`. The unified `prisma` package supplies the
`prisma` executable and brings its own Composer CLI dependency; do not force all
packages, including that internal dependency, to share the same version number.

## Runtime and command path

Composer and the unified CLI require Node **22.18.0 or newer**. Prefer a supported
Node release satisfying the app's pins. On POSIX, inspect `command -v node`,
`node --version`, `command -v npm`, and `npm --version` together (substitute the
project's package manager and platform equivalents). For Bun builds or services,
also check `command -v bun` and `bun --version`.

Run these checks and setup operations yourself. Prefer the desktop host's bundled
runtime or a supported host installation capability when a runtime is missing;
do not assume the user prepared a developer environment. Install dependencies in
the app, preserving existing conventions. If the host cannot supply required
tooling or permission, state the concrete blocker without handing the user shell
commands. Initial acceptance is macOS only; other operating systems are unverified.

Use project-local commands and inspect `prisma --help`, `prisma dev --help`, and
`prisma deploy --help` for the installed version. The unified commands are
`prisma dev module.ts` and `prisma deploy module.ts`; there is no `composer`
command group. Preserve the selected Node/package-manager pair, including PATH
and child processes, across installation, build, dev, and deploy. When commands
switch shell, sandbox, or network-access contexts, recheck there or inspect the
failing command's runtime in its logs; an earlier version check is insufficient.
Resolve DNS or network-access failures through the host's supported access path,
not dependency overrides. Investigate resolution errors before changing versions.

After installation, use the project's npm scripts and local CLI:

```sh
npm run typecheck
npm run build
npm exec -- prisma dev module.ts
# Verify the app locally; stop dev when done.
# Deploy only once local verification and target selection are complete.
npm exec -- prisma deploy module.ts --stage demo --report deploy-report.json
```

Start the authentication/target checks below early when deployment is requested;
they are not a prerequisite for local development. Keep deploy reports out of
source control. Use the installed CLI, not floating `prisma@latest`. Existing apps
keep their validated versions and matching package-shipped Composer skill.

## Authentication and targeting

Use the selected project-local CLI and the same environment/credential store for
login, verification, and deployment. First run `npm exec -- prisma auth whoami
--json`, inspect the authenticated result (exit zero alone is insufficient), and
verify access with `npm exec -- prisma project list --json`. An empty successful
list is valid. Network or permission failures do not by themselves justify login.
Explicit service credentials override stored sessions; check the effective
workspace without printing secrets or silently changing credential modes.

For a missing or expired session, after the release gate above is satisfied:

```sh
npm exec -- prisma auth login --ui-context prisma-plugin --json
```

Use a persistent **PTY/interactive process** in the desktop-local environment;
the current CLI keeps its callback listener open after a browser-launch failure
only when stdin is a TTY. Retain its process/session handle and poll with short
waits while doing independent local work. Keep one attempt active: do not restart
because it is still waiting, close stdin, background-and-forget it, or give it a
short total timeout. Capture the `verification` endpoint event (or the emitted
authorization URL) before browser opening. If opening fails, make that exact URL
a clickable chat link while the same attempt remains pending. Never substitute
the Console homepage, construct an OAuth URL, or pass the local callback URL to
the user. Do not relay the CLI's terminal/paste instructions to chat.

The user completes signup and consent in their browser. Describe providers only
after inspecting that page, not from a hard-coded list. A browser success page or
user message does not prove credentials reached this process. Require login exit
success, `auth whoami --json` showing authentication, and a successful `project
list --json` from the deployment environment before confirming the connection or
provisioning. Preserve the workspace returned by login and verify it matches the
effective workspace. If an explicit different target was requested, select its
stored session with `prisma auth workspace use <id-or-name>` and verify remotely;
if none exists, explain that sign-in must authorize that workspace.

`prisma auth workspace list` lists local sessions only, not all account memberships.
Do not repeat the workspace question after consent selected it, infer counts, or
treat failed discovery as an empty account. On denial, expiry, or cancellation,
retain app progress and offer a new attempt. Stop and confirm the previous process
has exited before starting one, using a fresh emitted URL. Never ask the user to
copy codes, credentials, or callback URLs. Keep connection failure separate from
remote permission, network, or quota errors. Do not log out existing sessions as
recovery; acceptance tests must use isolated credential storage.

Read the complete supported region list in [Compute limitations](https://www.prisma.io/docs/compute/limitations)
(the `.md` version is available for text retrieval). Configure the selected region
through `prismaCloud({ region })` or `PRISMA_REGION`; config wins if both are set.
An existing project retains its region. Use `--stage demo` for a new demo; omitting
it targets production. The module's application name selects the project; inspect
`--name` for an explicit override. Reuse the same name and stage on retries.

For CI, the standalone Composer CLI, or operations imported from
`@prisma/composer/control`, provide `PRISMA_SERVICE_TOKEN` and
`PRISMA_WORKSPACE_ID` through the environment. The control API does not inherit
the unified CLI's browser session. The unified CLI does not expose all standalone
verbs, so do not invent `prisma destroy` or `prisma log`; inspect the supported
surface before attempting cleanup or log inspection.
Those credential paths are technical context, not a fallback for this novice
journey. Web/cloud execution, including desktop-launched cloud tasks, is deferred;
direct the user to desktop-local execution without manual credential workarounds.

## Evidence before workarounds

The fresh Todo test reproduced `Cannot read properties of null (reading
'edgesOut')` during installation with Node 23.11.0/npm 10.9.2. Selecting Node
24.16.0/npm 11.13.0 for the same project allowed installation to complete without
peer-bypass flags. Prefer an already available supported runtime matching the
verified pair; a process-scoped selection is also possible:

```sh
npm exec --yes --package=node@24.16.0 --package=npm@11.13.0 -- npm install
```

Run that recovery only in the affected project, retaining its manifest and
lockfile. Inspect the error before changing an existing app's toolchain. This is
evidence for the tested versions, not a claim that every other runtime fails.

The cloud smoke test also reproduced `DEPLOY.CONTAINER_FAILED` with
`Prisma Management API error resolving containers: SyntaxError: Unexpected token`
and a response beginning with gzip bytes (`0x1f 0x8b`). This occurred under Node
24.16.0 with the package set above. The deploy report had no resource nodes and a
remote project listing confirmed no project had been created. After preserving
that report, the same application, workspace, region, and stage deployed
successfully with project-local Bun 1.4.2, including its CLI child processes.

Only for this reproduced failure, inspect the remote state and preserve the
failed report before retrying; use a different retry-report path as shown below.
In an npm project, the tested recovery invocation is:

```sh
npm install --save-dev --save-exact bun@1.4.2
# Keep the previously resolved workspace, region, application name, and stage.
./node_modules/.bin/bun run --bun prisma deploy module.ts --stage demo --report deploy-retry-report.json
```

Replace `demo` with the already resolved stage if different; preserve the region
in configuration or `PRISMA_REGION`. Bun's [`--bun` option](https://bun.com/docs/runtime/bunfig#run-bun)
also routes child `node` commands through Bun. Verify the parent and relevant
child runtime when diagnosing this error; running only the parent CLI with Bun
does not establish what its children use. This is a conditional recovery verified
for the tested releases, not the default deployment runtime or a root-cause fix.
Authentication, quota, configuration, and startup failures require their own
diagnosis; `DEPLOY.CONTAINER_FAILED` alone does not justify switching runtimes.

After this recovery succeeds, retain the working project-local invocation in the
app's existing deployment script or run instructions, with a brief reason. Keep
existing build steps, package-manager conventions, and target configuration.
Record the tested Bun version, not machine-specific executable paths or credentials.
Avoid global runtime changes and undocumented credential extraction.

Primary references: [CLI authentication](https://www.prisma.io/docs/cli/auth),
[Composer deployment](https://www.prisma.io/docs/cli/deploy),
[Composer getting started](https://www.prisma.io/docs/composer/getting-started).
When live documentation and an installed release differ, inspect that release's
help and package metadata; do not guess flags from newer documentation.
