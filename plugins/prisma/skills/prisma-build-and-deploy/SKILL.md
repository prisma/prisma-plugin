---
name: prisma-build-and-deploy
description: >-
  Build and deploy applications when the user selects or invokes the Prisma
  plugin, including requests like "Build a simple Todo app and deploy it" that
  do not name a stack. Use Prisma Composer for new apps and Prisma Compute for
  deployment. Also use for explicit Composer/Compute requests and recovering
  Composer deployments. Does not cover unrelated ORM or database administration.
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
  Check paths and versions against package requirements and project pins. Preserve
  the selected executables across install, build, dev, and deploy; recheck them
  when commands switch execution contexts. Use available host capabilities to
  supply supported tooling and install project-local dependencies yourself.
  Explain progress or genuine blockers in plain language; the user should not
  need to open a terminal, run commands, or configure credentials.
- For a new project, use the dependency set in the toolchain reference, including
  required peers, and prefer its verified Node/npm pair when available. For an
  existing project, inspect its installed versions and
  their matching skill/documentation; do not downgrade it to the bundled version.
- Choose a simple implementation suited to the request. Do not turn a small Todo
  request into a design interview. Make the schema and persistence approach
  explicit; do not accidentally mix raw SQL initialization with ORM migrations.

## Resolve authentication and the deployment target

When deployment is requested, start this after project inspection while local
work continues. Combine outstanding workspace and region questions when possible.

1. Check the existing connection early and verify remote workspace access. Reuse
   a valid session. If login is needed, explain: "To put your app online, connect
   Prisma. If you don't have an account, you can create one during sign-in. Return
   here when you're finished; I'll handle the setup." Describe only providers
   offered by the actual page. Start one managed login using the reference's
   plugin context option and keep it alive. If the browser does not open, share
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
4. Resolve any ambiguous application/project identity. Preserve the requested
   stage; a new demo defaults to `demo`. State the resolved target as a progress
   update, not another approval request. Provision only after target selection and
   local verification are complete. Omitting the stage targets production.

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

On failure:

- Record the failed step, reported error, resolved target, and available resource
  IDs. Check whether an existing version is still serving traffic, whether a new
  version is live, or whether nothing is serving. Do not infer this from the
  failure alone.
- Preserve the app configuration, deployment identity, and recorded deploy state.
  Explain what exists and what remains incomplete. Fix the reported cause before
  retrying the same target so Composer can converge existing resources. If state
  cannot be verified, stop and investigate instead of creating a renamed app.
- A quota or entitlement refusal needs resolution, not a retry loop. Do not
  guess the quota amount or limit from a generic `quota-exceeded` error.
- Treat cleanup as a separate action requiring the user's intent. Do not delete
  resources or deployment state as an automatic recovery step.

Finish with the local/deployed URLs, what was actually verified, any remaining
blocker, and material demo limitations (for example, cookie-only ownership or
lack of cross-device access). If Console deployment history was unavailable,
report it separately from the live result; do not create Git commits to suppress
that warning. Keep unverified work clearly separate from success.
