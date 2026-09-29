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
For a new repository, check the approved owner/name does not already exist, create
it privately, and push reviewed source with normal Git operations. Include neither
generated deploy reports/state nor local `AGENTS.md` test instructions. Preserve
legitimate repository instructions in an existing app; inspect their purpose first.

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
report incompatibility rather than silently upgrading. For npm, use `npm ci`;
pnpm/yarn need their existing setup and explicit frozen-lockfile install commands.

Adapt this **npm/Bun example** to the app. The runtime values match the pilot, not
a mandate to replace another app's compatible versions. Replace every `demo` with
the verified live stage if different. Keep the Composer module/config names and
region that already select the deployed project. In a monorepo, also adapt action
`working-directory`, install/build paths, and Node's `cache-dependency-path`.

```yaml
name: Deploy to Prisma
on:
  push:
    branches: ['**']

permissions:
  contents: read
  id-token: write

concurrency:
  group: prisma-deploy-${{ github.event.repository.default_branch == github.ref_name && 'demo' || github.ref_name }}
  cancel-in-progress: false

jobs:
  deploy:
    if: github.event.deleted == false
    runs-on: ubuntu-latest
    steps:
      - name: Protect the live stage
        env:
          BRANCH: ${{ github.ref_name }}
          DEFAULT_BRANCH: ${{ github.event.repository.default_branch }}
          LIVE_STAGE: demo
        run: |
          if [ "$BRANCH" != "$DEFAULT_BRANCH" ] && [ "$BRANCH" = "$LIVE_STAGE" ]; then
            echo 'This branch name conflicts with the live stage. Rename the branch.'
            exit 1
          fi
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
          stage: ${{ github.event.repository.default_branch == github.ref_name && 'demo' || github.ref_name }}
      - name: Require a deployment
        if: steps.deploy.outputs.outcome != 'succeeded'
        run: |
          echo 'Deployment did not succeed. Check repository connection, OIDC access, and the deployment logs.'
          exit 1
```

Preserve real build/typecheck scripts; do not invent commands an app lacks. Action
deployment runs under Bun independently of how the app builds. Never put untrusted
branch names directly into shell source; expressions above enter environment/input
values. Use no `pull_request` deployment trigger or `pull_request_target` workaround.
Fork PRs do not automatically get previews: only authorized branch pushes to the
connected repository are covered. No long-lived `PRISMA_SERVICE_TOKEN` is needed.

Per-target concurrency prevents overlapping runs; GitHub may supersede a pending
run while an active deploy finishes. Other deployment workflows must use the same
concurrency group or be consolidated with the user's established workflow. Do not
disable unrelated checks. For branch names that normalize to the same platform
target, resolve the conflict before deployment; do not overwrite another preview.

Default action stage inference uses production, so pass the explicit stage to
preserve a live `demo` application. A feature branch named `demo` must be rejected
before deploying. Do not delete such a conflicting branch while it is connected
without checking its platform mapping: branch deletion can trigger cleanup.

Connected repositories use the platform's branch-deletion cleanup. Do **not** add
`mode: destroy`: it is unsupported by the current CLI. After an approved deletion,
verify the preview's resources were removed and the live app remains intact; a
deleted Git branch alone is not proof. A cleanup failure is a separate reported
problem, not permission to delete resources manually.

## Evidence and recovery

Inspect the specific workflow run, commit SHA, action outcome, reported build ID,
and resulting Prisma service/version. `skipped-no-credential` is a successful
GitHub exit without a deployment; the final guard makes this visible as incomplete
setup. Check App access, project/repository mapping and `id-token: write` before
retrying. Keep authorization failures separate from network, build, quota, or
startup failures. Do not replace OIDC with copied local credentials.

Record baseline live IDs/URL and synthetic rows. Compare after the first GitHub
deployment; a new service version is expected, a replacement live database or
project is not. For a preview, confirm a different database/service and URL, then
the same preview identities after its next push. Preserve browser cookies when
checking a cookie-scoped Todo app so a new anonymous identity is not mistaken for
data loss. Verify the browser as well as API/database behavior; retain evidence
outside the published source if it contains session identifiers or logs.

Primary references: [deploy on push](https://www.prisma.io/docs/compute/deploy-on-push),
[GitHub connection](https://www.prisma.io/docs/compute/github),
[action v1.7.0](https://github.com/prisma/cloud-deploy-action/tree/v1.7.0).
The action is experimental. Treat changes to its pinned release as a separate
compatibility decision and distinguish scenario reviews from executed CI evidence.
