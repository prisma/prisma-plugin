# GitHub deployments for an existing Composer app

Use the app's installed CLI and preserve its dependency pins. The plugin's current
new-app set is documented in [toolchain](../../prisma-build-and-deploy/references/toolchain.md).
Composer/cloud remain `0.21.0`; this workflow does not require upgrading an existing
app to the new-app CLI. Follow that reference for managed login and workspace checks.

## Save and connect

Inspect `git status`, current branch, remotes, tracked/ignored files, lockfile,
Composer application name/configuration, and workflows before making changes.
Use available GitHub integration or `gh auth status` to establish access; supported
browser sign-in is handled by the agent, never by asking for a token in chat.
Before declaring that authentication is invalid, establish supported network and
credential-store access in that execution context and retry the read there. A
sandbox/keychain-access failure does not establish that the user must log in.
For a new repository, check the approved owner/name does not already exist, create
it privately, and push reviewed source with normal Git operations. Include neither
generated deploy reports/state nor local `AGENTS.md` test instructions. Preserve
legitimate repository instructions in an existing app; inspect their purpose first.
For save-only requests, stop after saving; do not run connection or deployment
steps. If an existing workflow would deploy the push, clarify a non-deploying
destination before pushing rather than silently disabling that workflow.

The app's CLI can inspect the target without changing its local binding:

```sh
npm exec -- prisma auth whoami --json
npm exec -- prisma project show PROJECT_ID --json
npm exec -- prisma branch list --project PROJECT_ID --json
npm exec -- prisma service show SERVICE_ID --project PROJECT_ID --branch LIVE_STAGE --json
npm exec -- prisma postgres show DATABASE_ID --project PROJECT_ID --branch LIVE_STAGE --json
```

Replace placeholders with verified IDs, not guesses. Project inspection does not
necessarily expose the GitHub connection. Check its repository setting through
supported platform/Console inspection as well. Confirm both sides' repository
identity (including numeric GitHub ID when available). If already linked elsewhere,
stop before changing the connection. Inspect installed command help, then connect:

```sh
npm exec -- prisma git connect --project PROJECT_ID https://github.com/OWNER/REPOSITORY
```

Use a persistent interactive process: if the Prisma GitHub App does not cover the
repository in the selected workspace, the CLI opens a connection page and waits.
For an App already installed on an individual GitHub account, choose **Connect
your GitHub account**; use **Install Prisma on GitHub** for a new installation or
organization account. Let the user complete browser authorization. Do not reinstall
the App or change repository permissions merely to associate an existing installation.
This is distinct from GitHub login for pushing code. Require
successful completion and independently verify the existing project's connection.
The connection enables OIDC and platform branch lifecycle; the CLI does not add
the deployment workflow. Inspect any Console-generated workflow PR to avoid two
workflows deploying the same target. Do not copy credentials into GitHub secrets.

## Deployment workflow

The released action requires Bun **1.3.10+** and unified `prisma` with top-level
`deploy` (rc.8 or later); it uses the project's `prisma` devDependency. Retain that
dependency so the action does not fetch its older fallback CLI. Supply compatible
Node, package manager, and Bun explicitly. Preserve exact project pins when present;
verify the selected executables before work in each new execution context as
described in the shared toolchain reference. Report incompatibility rather than
silently upgrading. For npm, use `npm ci`; pnpm/yarn need their existing setup and
explicit frozen-lockfile install commands.

Adapt this **npm/Bun example** to the app. The runtime values match the pilot, not
a mandate to replace another app's compatible versions. Read the default branch
from GitHub's repository settings; the local checked-out branch is not proof.
Replace the example's
`main` push filter with the repository's actual default branch and every `demo`
with the verified live stage if different. Keep the Composer module/config names and
region that already select the deployed project. In a monorepo, also adapt action
`working-directory`, install/build paths, and Node's `cache-dependency-path`.

```yaml
name: Deploy to Prisma
on:
  push:
    branches: ['main']

permissions:
  contents: read
  id-token: write

concurrency:
  group: prisma-deploy-demo
  cancel-in-progress: false

jobs:
  deploy:
    if: github.event.deleted == false
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24.16.0'
          cache: npm
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: '1.4.2'
      - name: Build and deploy
        id: deploy
        uses: prisma/cloud-deploy-action@v1.7.0
        with:
          install-command: npm ci
          build-command: npm run typecheck && npm run build
          module: module.ts
          stage: demo
      - name: Require a deployment
        if: steps.deploy.outputs.outcome != 'succeeded'
        run: |
          echo 'Deployment did not succeed. Check repository connection, OIDC access, and the deployment logs.'
          exit 1
```

Preserve real build/typecheck scripts; do not invent commands an app lacks. Action
deployment runs under Bun independently of how the app builds. Never put untrusted
branch names directly into shell source. Add no `pull_request` deployment trigger
or `pull_request_target` workaround.
New setup deploys only the selected default branch; it does not configure or test
branch previews. Preserve existing appropriate workflows and preview configuration
instead of narrowing them automatically. No long-lived `PRISMA_SERVICE_TOKEN` is needed.

Per-target concurrency prevents overlapping runs; GitHub may supersede a pending
run while an active deploy finishes. Other deployment workflows must use the same
concurrency group or be consolidated with the user's established workflow. Do not
disable unrelated checks. Recheck the push filter if the repository's default
branch changes; a literal filter does not follow a rename automatically.

Default action stage inference uses production, so pass the explicit stage to
preserve a live `demo` application. Do not create demonstration branches or PRs,
merge changes, or delete branches/resources as part of this setup.

## Evidence and recovery

The workflow-configuration commit can trigger verification without an application
change. Inspect that specific run and head SHA, action outcome, reported build ID,
and resulting Prisma service/version; the most recent run may belong to an older
commit. A successful no-op is acceptable when the deployed app already matches
the commit; it proves convergence, not activation of a new application version.
`skipped-no-credential` is a successful GitHub exit without a deployment; the final
guard makes this visible as incomplete setup. Check App access, project/repository
mapping and `id-token: write` before
retrying. Keep authorization failures separate from network, build, quota, or
startup failures. Do not replace OIDC with copied local credentials.

Record baseline live IDs/URL and synthetic rows. Compare after the first GitHub
deployment; a new service version is possible, a replacement live database or
project is not. Preserve browser cookies when checking a cookie-scoped Todo app so
a new anonymous identity is not mistaken for data loss. Verify the browser as well
as API/database behavior; retain evidence
outside the published source if it contains session identifiers or logs.
Use the shared [verification and live recovery](../../prisma-build-and-deploy/references/toolchain.md#verification-and-live-recovery)
instructions for bounded requests, test-artifact handling, and failures. Reuse
successful-run evidence for an already-complete setup rather than forcing another
push. Do not change application behavior to demonstrate this workflow.

Primary references: [deploy on push](https://www.prisma.io/docs/compute/deploy-on-push),
[GitHub connection](https://www.prisma.io/docs/compute/github),
[action v1.7.0](https://github.com/prisma/cloud-deploy-action/tree/v1.7.0).
The action is experimental. Treat changes to its pinned release as a separate
compatibility decision and distinguish scenario reviews from executed CI evidence.
