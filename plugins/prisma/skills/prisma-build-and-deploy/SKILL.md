---
name: prisma-build-and-deploy
description: >-
  Build and deploy applications when the user selects or invokes the Prisma
  plugin, including requests like "Build a simple Todo app and deploy it" that
  do not name a stack. Use Prisma Composer for new apps and Prisma Compute for
  deployment. Also use for explicit Composer/Compute build/deploy requests and
  recovering Composer deployments. Standalone deployed-app checks and log
  investigations belong to prisma-diagnose. Does not cover unrelated ORM or
  database administration.
---

# Build and deploy with Prisma

Guide the requested application from working code to a verified deployment.
Selecting Prisma for this task supplies the default: Composer for a new app and
Compute for deployment. The user need not name either product or separately ask
for local and live verification. State that choice briefly and follow this
workflow. Respect explicit stack/hosting choices and local-only requests;
installation alone is not a provider choice.

This journey requires ChatGPT's desktop app with local execution. Check the
actual execution environment: a cloud task launched from desktop is still out of
scope. In web/cloud execution, explain that the user must continue in a desktop
task running locally; do not offer manual credentials as a workaround.

Do not process protected health information (PHI) or payment card data regulated
by PCI DSS through files, CLI commands, database operations, MCP tools, logs, or
application verification. If the request or available context indicates such
data may be present, stop before accessing affected resources; clarify without
requesting real data samples and offer an isolated environment with synthetic
data only. If encountered unexpectedly, stop further access and do not reproduce
the data in responses or artifacts. Never retrieve it merely to redact it later
or switch tools to bypass this restriction. Ordinary Todo requests need no extra
questionnaire; healthcare or payment prototypes using synthetic data are supported.

For Composer declarations, wiring, builds, and database concepts, read the bundled
[Composer core concepts](../prisma-composer-core-concepts/SKILL.md). Reuse its
guidance rather than re-deriving the API. For CLI installation and authentication,
read [the version-specific toolchain reference](references/toolchain.md): the
bundled core reference describes the standalone CLI, while this workflow defaults
to the unified Prisma CLI for new interactive projects.

## Establish the project and toolchain

- Inspect the app, package manifest, lockfile, existing Composer configuration,
  and scripts. Preserve the framework, package manager, and database strategy of
  an existing app. If it is not Composer-ready, explain the concrete adaptation
  needed before undertaking a substantial rewrite.
- Resolve Node and the package-manager executable together, plus Bun when used.
  Before install, build, or deploy, verify their paths and versions in the actual
  execution context against package requirements and project pins. Preserve the
  selected executables across install, build, dev, and deploy; repeat this check
  before work in a new execution context. Use available host capabilities to
  supply supported tooling and install project-local dependencies yourself.
  Explain progress or genuine blockers in plain language; the user should not
  need to open a terminal, run commands, or configure credentials.
- For a new project, use the dependency set in the toolchain reference, including
  required peers, and prefer its verified Node/npm pair when available. For an
  existing project, inspect its installed versions and
  their matching skill/documentation; do not downgrade it to the bundled version.
- Choose a simple implementation suited to the request. Do not turn a small Todo
  request into a design interview. Make the schema and persistence approach
  explicit. New Composer apps requiring persistent application data must use
  Prisma Postgres through Composer: local Postgres during development and managed
  Prisma Postgres on deployment. Browser storage is suitable for preferences or
  caches, never a substitute for database persistence. Static apps need no database.
  Preserve existing apps' database approaches and explicit user choices; Prisma
  ORM is optional. Do not mix raw SQL initialization with ORM migrations.

## Resolve authentication and the deployment target

When deployment is requested, start this after project inspection while local
work continues. Combine outstanding workspace and region questions when possible.

1. Check the existing connection early and verify remote workspace access. Reuse
   a valid session. If login is needed, explain: "To put your app online, connect
   Prisma. If you don't have an account, you can create one during sign-in. Return
   here when you're finished; I'll handle the setup." Describe only providers
   offered by the actual page. Start one managed login using the reference's
   supported command and keep it alive. If the browser does not open, share
   the actual authorization link emitted by that attempt. Leave signup and
   consent to the user; never request passwords, tokens, or callback URLs in chat.
2. After login, require successful process completion, authenticated identity,
   and a successful remote workspace read from the deployment environment before
   saying "You're connected to Prisma." An empty project list is valid; browser
   signup or "I'm done" alone is not proof. Reuse the workspace authorized during
   login unless another was explicitly requested. Honor explicit choices and
   validate access without asking again. If a target still cannot be resolved,
   use authoritative membership when available (sole workspace automatically,
   multiple by asking); otherwise ask once with known sessions as suggestions,
   allowing another name. Stored sessions are not an account-wide inventory and
   failed discovery does not establish a workspace count.
3. Preserve an existing project's region; clarify an explicitly conflicting
   region before provisioning. For a new project, honor the chosen region or ask,
   "Select the region closest to your users." Show the complete supported choices
   with geographic labels and IDs from the reference's region link; do not infer
   a recommendation from the developer's location.
4. Resolve any ambiguous application/project identity. For a new app without an
   explicit target, use production on the project's default `main` branch: omit
   `--stage`, never substitute `--stage main`. Preserve an existing or explicitly
   requested named stage, including `demo`. Carry production/default versus named
   targeting separately from the branch name. State the target as a progress
   update, not another approval request; provision after target selection and
   local verification. Do not rename branches, migrate data, or move existing apps.

Check quota information only through an available supported read-only capability.
Otherwise note briefly that deployment may still fail after creating resources;
do not invent a quota endpoint or promise a comprehensive preflight.

For cancelled, expired, or failed login, explain the outcome and offer a fresh
attempt after the old process has ended. Preserve app progress; distinguish
authentication failure from network, permission, and quota problems. Continue
independent local work while login or answers are pending, then resume deployment
automatically once connection, target, and local verification are ready.

## Build and verify locally

Follow install → typecheck → build → local dev → verification. The app owns its
build; Composer's dev and deploy operations consume that output.

For a Todo app, exercise adding, listing, completing, and deleting a todo. Verify
data survives an actual service restart without resetting its database; exiting
the dev CLI alone is not proof that its service stopped. Check the actual UI in a
browser and inspect failures in the running service. For a different app, test
the equivalent core user action and persistence when relevant.
Use the shared [verification guidance](references/toolchain.md#verification-and-live-recovery)
for bounded requests, retained test identity, and writable evidence paths. Claim
only the persistence or application change actually tested.

Local Composer development does not need cloud credentials. Keep building and
testing locally when cloud login or target selection is still pending. Report
any unperformed verification explicitly.

## Deploy, verify, and recover

Build before deploying. Use the same resolved project and stage throughout the
attempt. Capture a structured deploy report if the installed CLI supports it;
otherwise retain the relevant command output and inspect the platform read-only.

Success requires a live service version, a reachable URL, a working core user
action backed by the database when applicable, and a browser check. Use the
project's supported service inspection commands to distinguish an allocated
service from a live version. A zero exit code or created project is not enough.
For Todo, check CRUD against the deployed application as well as locally.
For a new default-target app, verify the service and any required database are on
the project's default `main` branch. Trace application reads and writes to the provisioned
database using the reference's persistence checks; browser refresh alone is not
database evidence.

When a failure needs investigation or the user requests diagnostics, hand off to
[Prisma Diagnose](../prisma-diagnose/SKILL.md) with the known workspace/project,
target kind and branch, service/app identity, verified links, failed step/error,
and available build/deployment/version IDs. It returns evidence and remaining
gaps without changing the app. This workflow retains responsibility for authorized
recovery; missing MCP access must not block normal building or deployment. Do not
start a separate diagnosis for every successful build.

On failure:

- Record the failed step, reported error, resolved target, and available resource
  IDs. Inspect deployment state, relevant logs, and a database-backed request when
  applicable to establish what is serving. A running process or static health check
  alone does not establish application health. Do not routinely stop/start a live
  version to troubleshoot database failures.
- Preserve the app configuration, deployment identity, and recorded deploy state.
  After an evidence-supported fix, redeploy the same target through its established
  path, using GitHub when configured; verify routing, live version, and application
  behavior again. If safe recovery is unclear, preserve resources and report the
  unresolved condition. Do not guess promotions, replace resources, or introduce
  speculative database connection workarounds. Follow the reference for observed
  idle failures; one successful retry does not prove lasting recovery.
- A quota or entitlement refusal needs resolution, not a retry loop. Do not
  guess the quota amount or limit from a generic `quota-exceeded` error.
- Treat cleanup as a separate action requiring the user's intent. Do not delete
  resources or deployment state as an automatic recovery step.

Finish every successful deployment with **Open your app** (verified live URL) and
**Manage your Prisma project** (verified project URL), resolved as described in the
reference. Include the local URL when available, what was actually verified, any
remaining blocker, and material demo limitations (for example, cookie-only ownership or
lack of cross-device access). If Console deployment history was unavailable,
report it separately from the live result; do not create Git commits to suppress
that warning. Keep unverified work clearly separate from success.

## Offer GitHub saving after success

After the first verified deployment, explain and offer:

> Your app is live, but its source code is still on this computer. I recommend
> saving a private copy to GitHub, an online home for your code and change history.
> It also lets us work on changes separately before publishing them.
>
> Shall I save your code to GitHub and connect it to Prisma? Updates to the
> repository's main branch will then automatically update your live app.

Adapt this to the actual source location and repository default branch: do not
claim code is only local when already saved on GitHub. Skip when already configured
or declined in this journey. This offer does not promise application/database
previews or start branch-development work. Do not start setup merely because an
app was requested. If accepted,
explicitly hand off to [Prisma GitHub Deploy](../prisma-github-deploy/SKILL.md),
carrying the app folder, workspace/project IDs, region, production/default or named
target, actual live branch, service/database identities, available deployment IDs,
and both verified links. That skill owns repository
saving, connection, and automatic updates; do not recreate those procedures here.
