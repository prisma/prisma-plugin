# Plugin validation

## Data-use restriction revision (2026-09-25)

Version remains `0.4.0`. The listing and authored workflow now prohibit processing
PHI and PCI-regulated payment card data, including through local files, CLI,
database operations, MCP, logs and application verification. The existing
diagnostic reference applies the same restriction before log access and preserves
secret redaction and the broader-permissions disclosure. No server, authentication,
dependency, packaging-behavior or upstream Composer changes were made.

Scenario review of the authored instructions (not executed agent tests or proof
of technical enforcement):

| Scenario | Reviewed behavior |
| --- | --- |
| Ordinary Todo request without restricted-data context | Continues the existing build/deploy journey without an extra questionnaire. |
| Healthcare prototype explicitly using synthetic data in an isolated environment | Remains supported; no real patient examples are requested. |
| Request to inspect real patient records | Stops before file/database/tool access, explains the restriction and offers a synthetic environment. |
| Deployment logs may contain restricted data | Clarifies before retrieval; does not fetch for later redaction or use CLI to bypass the restriction. |

The same paragraph requires stopping further access and avoiding reproduction in
responses or artifacts after unexpected exposure. It covers application/browser
verification as well as MCP, so switching tools does not remove the restriction.

Executed checks:

- The existing skill validator, packaging regression (one comprehensive test),
  rebuilt-bundle integrity check and whitespace check passed. Initial packaging
  attempts could not reach npm from the sandbox; rerunning with registry access
  and Node 24.16.0 passed without changing dependencies.
- Both installed skills and all seven bundle files match the rebuilt source
  byte-for-byte. Composer 0.21.0 retains SHA-256
  `67b50e78fbb6cafd00bb99b0e56fe8a49e4a7190219474bf1b9be933f08bbcbb`.
- Complete and individual workflow ZIP contents were compared with source bytes.
  Checksums were refreshed; the prior skills-only fallback and Composer skill ZIP
  remain unchanged. No cloud deployment or new recording was performed.

The public description was appended and verified after reloading the existing
portal draft. The revised workflow skill replaced the previous upload and passed
its new scan; Composer remains passed and exactly two skills are listed. All other
Info fields, icon asset identities, video URL and release notes were unchanged.
Publisher declarations remain unchecked and the draft has not been submitted.
Existing reviewer-access notes explicitly disclose missing dedicated credentials;
clearing form validation does not satisfy that requirement or establish an
OpenAI exception. Publisher declarations and submission remain Luan's decision.

## Current candidate: MCP draft preparation (2026-09-24)

The user approved resuming the existing With MCP draft after the isolated server
fix shipped. Version remains `0.4.0`; the two-skill structure, dependency pins,
upstream Composer reference, and CLI build/deploy path remain unchanged. Optional
diagnostic instructions are restored in the authored workflow and its existing
reference. No new upstream or packaging-behavior changes are part of this work.
The stopping point is Luan's review of the saved draft, not submission.

Direct production checks after PR prisma/pdp-control-plane#5458 merged:

- The challenge returned HTTP 200, `text/plain`, and the exact draft token;
  the OpenAI portal now shows **Domain verified**.
- A fresh OAuth-authorized scan in Plugins returned 31 tools. All three missing
  `openWorldHint` values are present; all 93 annotation explanations are saved.
- OAuth resource discovery returned HTTP 200; unauthenticated MCP returned 401;
  an unknown well-known path returned 404.
- A fresh read-only draft audit confirmed the five positive and three negative
  cases and listing copy match prior work. Icons, skills, reviewer credentials,
  and demo URL were still absent. The directory version is **Draft**. There is
  no visible editor audit trail, so this does not prove nobody else accessed it.

The authenticated scan verifies discovery, not execution of diagnostic tools.
Application/log smoke results and final packaging/upload outcomes follow below.
Dedicated reviewer access, reviewer-account tests,
the hosted recording, and publisher review remain pending. No submission or
publication is authorized by this preparation task.

### Draft preparation checks (2026-09-24–25)

- Existing packaging regression passed, and the authored skill passed the
  skill-creator validator. The validator needed PyYAML in an isolated temporary
  environment; no dependency was added to this repository.
- The focused preview was installed as `prisma@prisma-preview`, version `0.4.0`.
  The bundle and installed files were compared byte-for-byte. The original broad
  installation was preserved. The Composer reference SHA-256 remains
  `67b50e78fbb6cafd00bb99b0e56fe8a49e4a7190219474bf1b9be933f08bbcbb`.
- CLI `auth whoami`, remote project listing, and service inspection succeeded
  for the existing Plugins Todo target. The service had a running live version.
  No deployment, restart, or cloud resource mutation was performed.
- MCP Inspector 2.8.0 completed a separately authorized OAuth connection to
  Plugins, using isolated temporary storage. All five diagnostic reads succeeded:
  workspace identity, project-filtered apps, branch-filtered builds, app
  deployments, and deployment logs. Workspace, project, app, live-version and
  endpoint identifiers matched the CLI target. There were no build-history
  records; logs returned a clean end at cursor `0`. CLI log inspection for the
  same version also succeeded with no retained lines. Empty history/logs are not
  represented as a build failure or proof of application health.
- The authenticated server advertised 31 tools with explicit annotation booleans.
  Inspector reported zero schema portability errors and 29 warnings across 13
  tools; the portal's successful scan remains the submission scan result. No
  upstream schema changes were made.
- An allowlisted 9-file source fixture was prepared outside this repository. It
  excludes credentials, local state, reports, dependencies, and machine paths.
  Reviewer-account testing and the hosted recording remain pending.
- Luan created ChatGPT Plugin Review and approved one isolated Todo deployment
  there. Its source copy has a distinct project name and passed clean dependency
  installation, typechecking, and build under Node 24.16.0. The first installation
  context resolved Node 23.11.0; it was repeated with the selected Node executable
  pinned in PATH. Luan completed its isolated CLI OAuth login. Authenticated
  identity and a remote empty project list confirmed the requested workspace.
  The approved fixture then deployed successfully with the previously working Bun
  invocation. CLI inspection confirmed a running live version; browser checks
  verified creation, completion, persistence after reload, and deletion. One
  sample Todo remains for review. Local restart persistence uses the earlier
  baseline; it was not repeated. The missing Git history warning was reported
  separately from application success. No commit was created to suppress it.
  This is owner-authorized setup, not a dedicated reviewer's sign-in test.
- Chrome upload permissions were enabled by Luan. Both approved PNG icons were
  uploaded and saved. The full plugin ZIP left no skills in the With MCP draft;
  individual skill ZIPs with root `SKILL.md` were accepted. Both skills are now
  listed and scanning. Skill source and supporting-reference bytes are unchanged;
  no packager behavior changed and the complete release/fallback ZIPs remain.
- The saved deployment test expectation was corrected to distinguish deployment
  records from live runtime status. The final portal page currently flags missing
  icons, private test credentials, and publisher declarations before the icon
  uploads. Release notes are
  present; availability remains the existing Allow all selection for Luan's review.
  Skill safety scans remain pending and the hosted recording is still absent.
  No declarations were accepted and nothing was submitted.

Static scenario review of the small instruction change: ordinary build/deploy
does not require MCP; unavailable/denied/mismatched access preserves the selected
target and app progress; partial deployment retains state and does not trigger
MCP writes or automatic cleanup. Explicit Vercel hosting, general PostgreSQL
education, and AWS diagnostics from supplied logs do not select this workflow.
These are instruction reviews, not executed fresh-agent or reviewer-account
tests. Inspection of the server schema also confirms deployment listing returns
records and version IDs, not runtime status; the reference now makes that limit
explicit. Existing local restart and live CRUD evidence remains the baseline.

## Historical skills-only candidate (2026-09-24, superseded)

The user ruled out all changes outside the plugin repository. The optional MCP
integration was removed from the candidate and listing; Composer/CLI remains the
working build-and-deploy path. MCP metadata, domain verification, and a new CLI
release are not dependencies of this package. The prior MCP scan/draft evidence
below is historical, not the current publication route. The existing unpublished
draft was preserved.

The official Skills only route is documented but absent from the verified Prisma
organization's Create plugin menu. Draft menus expose no type-conversion action.
OpenAI must provide the supported submission route; the cause of the missing
option has not been established. No upstream changes or public submission occurred.

## Initial submission candidate (`0.4.0`, 2026-09-24)

The initial release uses the verified `prisma@8.0.0-rc.15` package set and standard
`prisma auth login --json`. Plugin-specific browser completion wording is deferred;
the agent explains that the user should return to chat and continues to require
login completion, authenticated identity, and remote workspace access. The listing
now states the desktop-local requirement and macOS validation scope.

The CLI feature and release PRs were merged, but publication failed. A fresh npm
lookup on 2026-09-24 still returns E404 for `prisma@8.0.0-rc.16`; no unpublished
version or unsupported context option is used. Installed rc.15 login help confirms
the normal browser login command and JSON output are supported.

Direct checks: the existing packaging regression test, authored skill validator,
and rebuilt bundle integrity check passed. A stray macOS `.DS_Store` in the bundle
root caused the first integrity check to fail; removing that metadata file restored
the expected file set. The two skills, supporting reference, approved branding,
license, and provenance are included. The imported Composer `0.21.0` reference is
unchanged. No personal sessions, installed plugins, or cloud resources were changed.

The older root `0.3.0` installation is sourced from the local repository; its
visibility in Codex is not evidence of public directory publication. The user
subsequently obtained access to the existing verified Prisma business organization
and created its dedicated Prisma Plugin project. An unpublished With MCP draft
exists there. The portal offers separate MCP and Skills sections, so the server
is registered in the portal and the two-skill bundle is uploaded separately.
This supersedes the earlier unverified-organization/skills-only investigation.

Application/deployment evidence remains the previously completed macOS runs below;
no fresh-account signup or additional deployment was performed for this candidate.
The original fully verified novice-onboarding acceptance remains follow-up work.
The following sections are historical records; their dev.4 release hold does not
apply to this rc.15-based initial submission candidate.

### Optional MCP diagnostics (2026-09-24)

The workflow now routes explicit diagnostics or failure investigations to five
read-only operations on the existing Prisma MCP server. It preserves the CLI
target, requires matching workspace/application IDs, keeps MCP and CLI sessions
separate, and falls back to supported CLI inspection when MCP is unavailable.
The server's broader write tools and `workspace:admin`/`offline_access` scopes are
not narrowed by these instructions. No server, packaging behavior, or API changed.

Direct local checks passed: packaging regression, skill-format validation, bundle
integrity, and diff whitespace. The upstream Composer reference SHA-256 remains
`67b50e78fbb6cafd00bb99b0e56fe8a49e4a7190219474bf1b9be933f08bbcbb`.
Approved artwork was rendered to 512px and 96px square PNGs for the portal.

Static scenario review confirms that ordinary build/deploy requests do not require
MCP, missing/denied/mismatched MCP access preserves app progress, and partial
deployment recovery does not claim success or invoke MCP writes. These are
instruction reviews, not fresh-agent executions or authenticated MCP smoke tests.
Workflow, recovery, and the portal's five positive/three non-trigger cases are in
[submission materials](submission.md); unexecuted cases are not represented as
passed. Existing macOS deployment evidence below remains the application baseline.

### Authenticated submission scan (2026-09-24)

The user approved ChatGPT scanner OAuth access to the isolated Plugins workspace.
The scan succeeded and returned 31 tools, including all five intended diagnostics.
The draft contains explanations for all 90 supplied annotation values. It also
reports missing `openWorldHint` on `create_prisma_postgres_database`,
`create_prisma_postgres_connection_string`, and `create_prisma_postgres_recovery`.
Those explicit booleans must be supplied by the MCP server and rescanned; portal
text cannot repair them. The three source definitions were located in
`pdp-control-plane/services/mcp-server/mcp/tools/`; a three-line annotation patch
was prepared outside this repository and passed `git apply --check` against that
checkout. It was not applied or deployed. No MCP resource operation was executed during the scan,
so the app/state/log smoke test remains pending.

The domain challenge URL returned HTTP 404. The exact token and maintainer handoff
are kept with local submission artifacts, outside the repository. OAuth discovery
also reported enterprise domain restrictions unavailable; this was a warning,
not an observed blocker requiring an OIDC implementation in this revision.

The existing draft now contains listing copy, verified Prisma business identity,
starter prompts, release notes, and the required review-case drafts. Icon/ZIP
uploads were blocked by Chrome extension file access; native computer-use fallback
was also unavailable. Reviewer credentials, fixture checks, demo recording, domain
verification, missing server annotations, and publisher declarations remain
incomplete. No submission, legal acceptance, or public publication occurred.

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
