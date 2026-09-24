# Local preview validation

Prepared source/bundle: `0.4.0-dev.4`, 2026-09-24. Installed working preview remains
`0.4.0-dev.3+codex.20260924021431`. **Desktop v1 is not yet complete:** the new
onboarding needs a released CLI with the context option and fresh-user acceptance.
The published `prisma@8.0.0-rc.15` pin is retained as the previous verified baseline,
not represented as supporting the new option. Application/deployment results below
remain the `0.4.0-dev.2` baseline. Agent-reported evidence is labeled separately.

## Local PR review (2026-09-24)

Review of PR #7 found and resolved two issues before merging the preview source:

- The default repository marketplace pointed at an incomplete, release-gated
  bundle. It now remains byte-for-byte identical to main's existing root-plugin
  route. The opt-in `prisma-preview` marketplace lives under `plugins/`; its
  documented installation step is conditional on the onboarding release gate.
- The ignore-rule regression assertion skipped tracked files. It now uses
  `git check-ignore --no-index`; an isolated tracked-file fixture reproduced the
  original false negative and confirmed the corrected command detects it.

The packaging regression test, skill-format validator, bundle integrity check,
marketplace target/asset/skill checks, and diff whitespace check passed. Composer's
imported reference is unchanged. No installed plugin, personal credentials, or
cloud resources were changed. This repository currently has no GitHub CI checks;
these are locally executed results, not hosted CI or fresh-user acceptance.

## Desktop onboarding revision (`0.4.0-dev.4`)

The authored workflow now requires desktop-local execution, agent-managed setup,
one managed browser login, a real emitted authorization link when opening fails,
and successful login/identity/remote-access checks before confirming connection.
It preserves the workspace selected during consent and keeps local work moving
while signup is pending. Recovery retains app progress and never requests codes,
tokens, or callback URLs. Web/cloud execution is explicitly deferred.

Upstream implementation: [Prisma CLI PR #281](https://github.com/prisma/prisma-cli/pull/281),
commit `b50b587`, based on main `6a34270`. The optional context is validated by the
normal argument parser and propagated only to browser completion rendering. OAuth,
scopes, consent, callback validation, credential persistence, and terminal output
are unchanged. No source changes were made to Composer or the authentication service.
PR #281 was marked ready for review, approved by CodeRabbit with no actionable
findings, and merged as `12c9663` on 2026-09-24 after all checks passed, including
the repository's end-to-end job and Ubuntu/Windows package tests. No Prisma bot
review appeared; the user explicitly authorized proceeding with CodeRabbit's
approval. Its advisory docstring-coverage warning was assessed without adding
boilerplate to existing callbacks and test helpers. These CI results do not
establish a fresh desktop signup or Windows/Linux plugin journey. No review
requirement was bypassed. The coordinated release remains a separate human gate;
the plugin must still wait for an exact released and verified CLI version.

The version-only [release PR #282](https://github.com/prisma/prisma-cli/pull/282)
prepares `8.0.0-rc.16` from merged main and is deliberately left unmerged with
auto-merge disabled. Its checks passed for build, types, lint, 80 versioning/script
tests, skill packaging, CLI tests (1,019 passed; 2 skipped), wrapper tests (3
passed), and clean tarball installs. Release conformance reports zero failures
and six allowed findings under main's existing engine `0.4.0`/`0.6.0` transition
exceptions. The PR also records a local macOS engine prompt-test timeout that
reproduces before the bump at `b50b587`; this requires coordinated review rather
than being reported as a fully green release. No published CLI pin or installed
plugin was changed during this release preparation.

Directly executed checks on the available macOS desktop, Node `24.16.0` and pnpm
`11.6.0` (not Windows/Linux acceptance):

| Check | Observed result |
| --- | --- |
| CLI static checks | `pnpm typecheck` and `pnpm lint` passed |
| CLI package regression suite | 1,019 passed, 2 skipped |
| Focused auth suite | 85 passed, including context propagation, invalid/missing values before login, unchanged credential/session shape, success/failure wording, OAuth denial, workspace escaping, and abort handling |
| Default browser page | Compared rendered output with main for known, missing, and escaped workspace names: byte-for-byte identical |
| Browser-opening failure | A simulated opener failure in a persistent TTY attempt completed through the same listener; the exact verification URL was emitted once and token exchange ran once, without a pasted callback |
| End-to-end runner | After building the `prisma` wrapper: 7 local checks passed, 48 cloud lifecycle tests skipped without isolated test credentials; this is not a real OAuth or cloud acceptance result |
| Built CLI help | Unified `prisma auth login --help` exposes `--ui-context` with `prisma-plugin` as its supported value |
| Skill/package checks | Authored skill format, rebuild, offline integrity check, and existing packaging regression test passed; both skills and the single supporting reference are in the six-file bundle |
| Preservation | Imported Composer `0.21.0` SHA-256 remains `67b50e78fbb6cafd00bb99b0e56fe8a49e4a7190219474bf1b9be933f08bbcbb`; branding and starter prompts unchanged |
| Installed copy | Both v3 skills and all installed files still match their provenance; deliberately not refreshed with the release-gated v4 draft |

The first auth test run could not bind local callback servers in the sandbox;
rerunning with local-server permission passed. The first end-to-end runner attempt
required the wrapper build; after building it, local checks passed. Neither is
recorded as an authentication/product defect. No personal Prisma session was
changed and no live deployment or cloud resource creation was performed.

Still required before activating this revision:

1. Release the merged CLI change through the coordinated maintainer process. Select an
   exact published version containing the flag, clean-install it alongside the
   unchanged Composer/cloud `0.21.0` and ORM peer `8.0.0-rc.11`, and verify it.
   Then replace the reference's old CLI pin/install command and remove its release
   gate; do not use a guessed version, local package patch, or floating dependency.
2. With isolated credential storage and a human completing signup/consent, test an
   ordinary prompt from a fresh desktop account and clean local setup. Verify
   pending signup never triggers provisioning, cancelled/expired login can retry
   without duplicate processes, a returning session is reused, explicit workspace
   choices are respected, and an empty authorized workspace succeeds. The unit
   simulations above do not replace this acceptance run.
3. Verify actual local restart persistence and live service version, reachable
   URL, database-backed actions, and browser behavior with that released CLI.
4. Record the exact version/results here, clear the README's pending notice,
   rebuild with a fresh dev.4 cache suffix, refresh the installed copy, and verify
   both installed skills and their references. A fresh task must pick up the copy.

## Listing and branding follow-up (2026-09-24)

Applied the approved platform description, 26-character listing subtitle, and
new/existing-app starter prompts. Display name and publisher remain Prisma.
Both listing accents use the website's coral `#F34A60`; contrast checks passed
against white and `#212121`. Preserved the supplied logo in the source asset and
centred its unchanged artwork on a 264 × 264 canvas.

The rebuilt bundle passed integrity checks and the existing packaging regression
test. Removed a Finder `.DS_Store` file from the bundle after integrity validation
identified it. All skill files remained byte-for-byte unchanged, including the
Composer `0.21.0` reference. Codex installation succeeded; all six installed
bundle files and provenance matched the source. No cloud deployment was run.

## Generic-prompt follow-up (2026-09-23)

This revision introduced “Build a simple Todo app and deploy it” as the starter
prompt and README example; the listing prompts were broadened on 2026-09-24.
The authored workflow's discovery metadata and introduction explicitly interpret
Prisma selection as the Composer/Compute default, retaining local and live checks.
An independent offline routing evaluation selected this workflow for the generic
prompt with Prisma selected, preserved local-only scope and existing Next.js/pnpm
conventions, and did not route explicit Vercel or unrelated SQL requests to it.
An unselected installed plugin was not treated as the user's provider choice.
Skill-format and bundle-integrity checks passed; installed files matched the
bundle and the upstream Composer reference remained unchanged. This evaluated
routing decisions, not another live deployment or the host's plugin-selection UI.

## Previous revision checks (`0.4.0-dev.3`)

The skill-format validator, bundle rebuild and integrity check, and existing
packaging regression test passed. All six installed bundle files and provenance
matched the checkout; fresh native Codex discovery found both enabled skills at
`0.4.0-dev.3`. The Composer reference matched the original `0.21.0` archive
byte-for-byte. Packaging code, its tests, marketplace configuration, README, and
ignore rules were unchanged by this revision.

An independent agent evaluated 13 supplied scenarios (including failure variants)
using only the authored workflow and its reference. It executed no Prisma
commands, network calls, or mutations. The resulting decisions covered:

| Supplied evidence | Observed decision |
| --- | --- |
| Explicit target; a different workspace is active | Select the chosen session, then verify the effective workspace; no repeated target question |
| Authoritative single/multiple memberships | Select the sole workspace or ask among multiple; combine missing region selection |
| One stored session with unknown membership; membership lookup fails | Ask once, offer known sessions as suggestions, and preserve the distinction between a discovery failure and an empty result |
| New project; existing region; conflicting requested region | Present all supplied supported regions for the new project, preserve the existing region, or clarify the conflict before provisioning |
| Pending target/login; local-only request | Continue local work; neither case permits cloud provisioning |
| Changed command runtime; DNS-only failure | Restore the verified executable pair in the actual context; handle network access separately from dependency resolution |
| Exact gzip/JSON failure; generic container, quota, authentication, or startup failures | Apply Bun only to the matching signature, preserve state/reports, and diagnose the other failures independently |
| Bun recovery succeeds with an existing build-and-deploy script | Retain the working invocation while preserving the npm build step, target configuration, and external credentials |
| Running verified app without Console history | Report live success and unavailable history separately; create no Git commit |

Review clarified selection-before-access-validation ordering, existing-region
precedence, and a distinct retry-report filename. A focused follow-up found those
ambiguities resolved. These are offline behavioral evaluations, not new live
deployments or tests of actual account-wide workspace discovery.

## Baseline checks (`0.4.0-dev.2`)

| Check | Evidence |
| --- | --- |
| Clean installation | In an empty temporary project, npm installed Composer/cloud `0.21.0`, ORM Postgres `8.0.0-rc.11`, and `prisma` `8.0.0-rc.15` without `--force` or `--legacy-peer-deps`; Node `24.16.0`, npm `11.13.0` |
| Required peer | `npm ls --depth=0` showed all four exact versions; imports of `@prisma/composer`, `@prisma/composer-prisma-cloud/control`, and `@prisma/orm-postgres/control` succeeded |
| CLI surface | Installed dev, deploy, project-list, and service-show help loaded; deploy supports `--stage` and `--report` |
| Existing authentication | `auth whoami --json` identified a stored session; `project list --json` successfully verified remote access without new credentials or browser login |
| Packaging | `node --test scripts/package-plugin.test.mjs` passed: repeat builds preserve authored files, additional authored references, and identical provenance; changed/missing files and unexpected skills fail verification |
| Skill format | The skill-creator validator accepted the authored workflow |
| Installed plugin | Native Codex plugin inspection and fresh skill discovery found exactly two enabled Prisma skills at `0.4.0-dev.2`, no MCP servers; installed content matched the source bundle |
| Upstream preservation | Installed Composer SKILL.md matched the original pinned npm archive byte-for-byte |

The clean install's npm audit reported 14 upstream dependency advisories (10
moderate, 4 high). This check did not assess exploitability or change the pinned
dependency tree. Installation success is not a security or production-readiness
assessment.

## Baseline offline workflow scenarios (`0.4.0-dev.2`)

An independent fresh agent read the installed skills and reference, then evaluated
these supplied scenarios without executing Prisma commands or making cloud calls.
All five produced the intended actions:

| Scenario | Observed behavior |
| --- | --- |
| Existing Next.js/pnpm app with newer Composer and ORM migrations | Preserves framework, manager, versions, and schema strategy; consults matching installed documentation |
| Stored session and remote access work; token variables unset | Reuses the session without requesting service tokens or login |
| Local-only request with no session | Continues local verification without cloud authentication or provisioning |
| Quota refusal after project/database/service creation; no live version | Reports partial provisioning and known IDs, preserves state, stops retries, avoids inventing quota limits |
| Failed update while an earlier version still serves | Reports the failed update and still-live previous version separately; does not claim outage or successful rollout |

These are behavioral checks against supplied evidence, not live failure injection.

## Application acceptance baseline (`0.4.0-dev.2`)

Use a fresh task and this ordinary prompt with the installed Prisma plugin:

> Build a simple Todo app with Prisma Composer and Postgres persistence. Run it
> locally, then deploy it to Prisma Compute and verify it works.

Pass criteria:

- Locally: typecheck/build pass; add/list/complete/delete work in the API and UI;
  data survives a service restart without resetting the database.
- Remotely: the resolved project/stage has a live version and reachable URL;
  a database-backed user action and browser interaction succeed.
- If deployment fails, record the actual state and blocker; do not mark the live
  test passed because local tests or resource creation succeeded.

### Local result: passed

An independent fresh agent received only the installed plugin and the local
portion of the ordinary request above. It built a Todo app in an empty temporary
directory using Composer, a Node HTTP service, and raw Postgres with `pg`. It did
not read the plugin source repository or parent conversation. It consulted public
Composer documentation and installed package types where needed. No cloud
credentials or resources were needed for local development.

- Typecheck and build passed. API create/list/complete/delete passed, and a blank
  title was rejected with HTTP 400.
- Chrome UI create/complete/delete passed. After an actual service-process
  restart, the same row ID, title, and completed state remained in Postgres and
  appeared on browser reload.
- The local service was stopped after verification; its database and shared
  emulators were preserved. The in-app browser refused localhost, so browser
  verification used Chrome.

The existing-app and absent-session cases above remain offline scenario checks;
this test does not claim a separate existing-app migration or real login exercise.

### Cloud result: passed

The same app was deployed in a user-selected empty workspace, region `us-east-1`,
stage `demo`, reusing the existing authenticated session. The first Node-based
attempt failed before creating a project; the confirmed runtime recovery is
recorded below. Retrying the same target with Bun succeeded.

- The structured deployment report recorded success with database and Compute
  service IDs. Service inspection independently showed a `running`, live version
  and a public URL.
- The live HTML returned HTTP 200. API create/list/complete/delete passed, with
  updated state retained by a subsequent read and invalid input rejected.
- Chrome UI create/complete/delete passed, with completion retained on page
  reload. Only disposable smoke-test rows were removed.

The smoke project and database remain available for manual review. The app is an
anonymous shared Todo demo without accounts or per-user ownership. This is a
release smoke test, never part of packaging or an automatic cloud deployment on
every change. Persistence across service restart was verified locally; no cloud
restart was performed. Quota failure recovery was evaluated offline, not induced
against the workspace.

## Second run: agent-reported evidence

A user-supplied report, reviewed on 2026-09-23, describes another successful Todo
deployment in the selected workspace, Frankfurt (`eu-central-1`), stage `demo`.
It reports local CRUD and persistence across an actual service restart, a running
live version, deployed database/API/browser checks, and cleanup of its test rows.
It also reports successful recovery from the same npm resolver and gzip/JSON
failures, plus a live app without a Console history entry because Git metadata
was absent. These outcomes were not rerun or independently inspected for dev.3.

The report's cookie-ownership and cross-origin checks apply to that app's design;
they do not impose an authentication model on plugin-generated applications.
No starter or generic smoke-test helper was added based on this report.

## Upstream findings kept outside the workflow

1. **Composer 0.21.0's bundled reference has stale CLI packaging language.** The
   core package's manifest has no binary and points to `@prisma/composer-cli`,
   while the skill says the core carries the CLI. The plugin toolchain reference
   corrects the installation path without editing the imported skill.
2. **Authentication guidance needs CLI scope.** Unified `prisma@8.0.0-rc.15`
   successfully reused a stored session. The standalone/control-API token path
   remains separate. A direct invocation of only the upstream concepts skill can
   still miss this distinction; use the build-and-deploy workflow for the journey.
3. **The missing ORM peer was not reproduced with normal installation.** Cloud
   `0.21.0` declares `@prisma/orm-postgres@8.0.0-rc.11` as a required peer. The clean
   install and cloud-control import passed with it present. The earlier failure
   after bypassing peer resolution does not establish an undeclared-dependency bug.
4. **The npm resolution failure reproduced in the fresh Todo test.** Node
   `23.11.0`/npm `10.9.2` failed with `Cannot read properties of null (reading
   'edgesOut')`. A process-scoped Node `24.16.0`/npm `11.13.0` invocation completed
   installation without bypass flags. The toolchain reference records this
   conditional recovery; it does not prescribe a global runtime change.
5. **The compressed-response failure reproduced during the cloud smoke test.**
   With the pinned package set and Node `24.16.0`, `prisma deploy module.ts --stage
   demo --report ...` failed with `DEPLOY.CONTAINER_FAILED`, a Management API
   container-resolution JSON parse error, and leading gzip bytes. The report had
   no resource nodes; a remote project listing confirmed the workspace was still
   empty. The failed report and target were preserved. Project-local Bun `1.4.2`
   with `bun run --bun prisma deploy ...` successfully deployed the same target.
   Both parent and child runtime probes reported Bun `1.4.2`. This is a verified
   conditional recovery, not an established root cause or a default runtime change.
6. **Local CLI exit did not stop the service in the tested invocation.** With
   unified CLI `8.0.0-rc.15`, Node `24.16.0`, and a Bun `1.1.18` service, Ctrl-C
   exited `npm exec -- prisma dev module.ts` while its listener still served.
   Inspection verified that the process belonged to this app. A supervised
   process restart proved persistence; the installed local target's app-scoped
   stop operation then stopped it without deleting data or shared emulators.
   The workflow requires observing the actual service restart. It does not
   prescribe the internal emulator endpoint as a general public command.

No upstream repository or platform changes are part of this revision.
