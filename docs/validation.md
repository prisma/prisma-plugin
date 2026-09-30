# Plugin validation

## Persistence and default-target handoff `0.4.1-dev.4` (2026-09-30)

This revision changes four defaults: new persistent Composer apps use Prisma
Postgres; successful handoffs return app and project links; new apps deploy to
production on the default `main` branch without a stage override; and the GitHub
offer explains local source, private code storage, change history, and automatic
updates. Existing database choices, repositories, and named targets are preserved.
Three skills, dependency pins, and packaging behavior remain unchanged.

### Scenario reviews (not executed agent journeys)

| Scenario | Reviewed outcome |
| --- | --- |
| New persistent Todo | Composer provisions/wires Postgres locally and in the cloud; app reads/writes must reach that database. Browser storage/refresh alone cannot pass persistence. |
| Static app or local development without login | No unnecessary database for static content; Composer local Postgres and local verification do not require cloud login. |
| Existing app or explicit database choice | Preserve database strategy, framework, toolchain, repository/default branch, and deployment target; do not mandate ORM or introduce a driver migration. |
| New default deployment | Omit CLI `--stage` and action `stage`; verify service/database on the project's default `main` branch. Do not replace omission with `--stage main`. |
| Existing named `demo` deployment | Preserve its explicit stage and workflow mapping, even when GitHub's default branch is `main` or `trunk`; never relocate resources. |
| Deployment links | Match the live service URL and authenticated project page to workspace/project IDs. Verify a supported branch deep link or label the branch beside the project URL. An unresolved project link is an incomplete handoff. |
| Accepted offer | Save reviewed source privately, connect the same project, verify default-branch automation and preserved data, return all four links, then finish. No feature, PR, or preview exercise. |
| Declined or save-only | Decline ends the offer; save-only does not connect or add automation and checks whether an existing workflow would deploy the push. |
| Already saved/configured | Adapt the offer truthfully; reuse the existing repository/connection/workflow and matching successful-run evidence without duplicate setup. |

These reviews evaluate instruction consistency, not automatic enforcement or a new
user study. The database helper, connection investigations/regression suite, and
branch-development skill remain deferred. This revision makes no claim to resolve
Daylist/Handoff Check's reported connection behavior.

### Directly executed acceptance (macOS)

A new disposable `prisma-main-handoff-check` Todo was built with the pinned
Composer/cloud `0.21.0`, ORM peer `8.0.0-rc.11`, CLI `8.0.0-rc.17`, and `pg@8.22.0`.
This is a test fixture in a separate private repository, not a bundled starter,
connection helper, or new compatibility recommendation.

- Clean installation, typecheck, and build passed under Node `24.16.0`/npm
  `11.13.0`. Composer's local emulator used the available Bun `1.1.18` service
  runtime. Local API create/list/complete/delete and Chrome interactions passed.
- Local restart persistence passed: changing built output triggered a service
  restart (listener PID changed from `35588` to `35717`); the original row ID,
  title, and completed state survived and were visible after browser reload.
  The database was not reset. This is separate from cloud redeploy persistence.
- Unified CLI deployment without `--stage` succeeded. Workspace
  `vt3bpj2c1qjx4sw2ne1vq17n` (**ChatGPT Plugin Review**), project
  `proj_lww025chx98c15r44b9jk5o3`, Frankfurt (`eu-central-1`), had only branch
  `br_b0r9ceemrp4pp09a5ujd5q7q`: `main`, role `production`.
- Service `cps_v9e3dxrgjx4rxt11eiqvm2d5` and database
  `db_fd3lta4os5rgmkw8o94xuazw` were verified on that branch. The initial live
  version was `cpv_ianorjp1114zlhsajv3bflvr`. Live API CRUD passed; Studio on that
  exact database independently displayed the retained synthetic row
  `3afa26e0-810a-4565-8698-9a6135550492`, title and completed state. Browser creation
  and deletion were reflected in Studio. This verifies database persistence, not
  browser-storage survival.
- Both handoff destinations were opened and verified in Chrome:
  [Open your app](https://v9e3dxrgjx4rxt11eiqvm2d5.fra.prisma.build) and
  [Manage your Prisma project](https://console.prisma.io/vt3bpj2c1qjx4sw2ne1vq17n/lww025chx98c15r44b9jk5o3)
  (branch `main`). Console initially lacked deployment history because the first
  CLI deploy had no Git commit; this did not prevent the app serving successfully.
- The accepted combined setup was exercised under Luan's explicit test approval.
  Private repository [luanvdw/prisma-main-handoff-check](https://github.com/luanvdw/prisma-main-handoff-check),
  ID `1397548718`, uses default branch `main`. The existing authorized personal
  GitHub installation was reused; connection `srcrepo_wmyktgk2gr3ewdjeknl7331s`
  points to the original project. CLI output and Console independently confirmed
  the mapping. There was no existing workflow or generated workflow PR to duplicate.

- The unchanged app was deployed by [GitHub run 36699611475](https://github.com/luanvdw/prisma-main-handoff-check/actions/runs/36699611475)
  for workflow commit `5222d558b00fb97d1ac8b83cb522d848dbb49a0a`. Its log explicitly
  selected `production (default branch, no --stage)` and reported `succeeded`.
  OIDC, Node `24.16.0`/npm `11.13.0`, and Bun `1.4.2` worked without copied secrets.
  The new live version `cpv_o4hv47cl5jiymmruo7zxecb8` retained the same service,
  database, production branch, and URL. The original synthetic Todo's ID, title,
  and completed state survived, confirmed by API and Chrome. Console showed
  `main · 5222d55`, matching the run. This verifies redeployment of unchanged
  application behavior, not an invented feature or an idle-recovery fix.
- GitHub and Prisma each still had only `main`; GitHub had no PRs. The only
  follow-up commit added the workflow and adjusted its README description.
  No demonstration feature, preview branch, merge, or cleanup exercise occurred.

The fixture contains only synthetic shared Todos. No original app was modified.
The checks do not qualify idle/suspension recovery or the deferred database
connection work. The offer's wording/routing was scenario-reviewed; this executed
acceptance was not a fresh uncoached novice conversation.

### Package and review checks

- All three skills passed the existing validator. Packaging regression, integrity,
  authored relative-link checks, and whitespace checks passed. Parsed YAML checks
  covered production/main with no stage override and the preserved named
  `demo`/GitHub `trunk` mapping, OIDC, serialization, and the unsuccessful-outcome
  guard. These scenario checks do not claim another live `demo` redeployment.
- The nine-file preview ZIP matches the generated bundle byte-for-byte. SHA-256:
  `31ab00fac7e1a5e68cf0287c32898aa040f0e6d09fc617833fd65fa10c3bb817`.
  The installed, enabled `prisma-preview` at `0.4.1-dev.4` matches all nine files,
  including three skills and both authored references.
- Imported Composer `0.21.0` retains SHA-256
  `67b50e78fbb6cafd00bb99b0e56fe8a49e4a7190219474bf1b9be933f08bbcbb`.
  Only the portable manifest version changed; branding, prompts, pins, MCP and
  data restrictions remain. The submitted source/history and OpenAI submission
  were not changed; no submitted archive was rebuilt or uploaded.
- Local review found and resolved one ambiguity: default-branch verification
  now checks the service and any required database, so static apps do not gain
  an unnecessary database. Database reliability work remains separately scoped.

Earlier sections below are historical results for their named versions.

## Focused GitHub handoff `0.4.1-dev.3` (2026-09-29)

This instruction revision ends at **build → deploy → save to GitHub → verify
automatic updates → finish**. New automation targets only the actual default
branch and the existing live stage. Existing working workflows, including
previews, remain intact. Save-only requests do not connect or deploy; already
configured apps reuse matching successful-run evidence. No feature, demonstration
PR, additional preview push, merge, or cleanup is required to finish setup.

The shared reference now covers runtime selection before work in each execution
context, network/credential-store errors, 30-second HTTP timeouts, response checks,
and explicit writable test-artifact paths outside Git. Recovery uses state, logs,
and database-backed behavior; it does not prescribe routine live stop/start or
unproven database workarounds. Claims distinguish immediate recovery from a
retested idle condition, redeployment from restart, and resource reuse from new
application code becoming live.

### Evidence basis and investigation follow-ups

The Daylist execution report and conversation supplied by Luan describe a
successful GitHub connection/deployment followed by an unnecessary preview
demonstration, runtime drift, an authentication false negative in a restricted
context, and verification-script failures. These are **agent-reported evidence**,
not actions reproduced during this revision. The reported versions were CLI
`8.0.0-rc.17`, Composer/cloud `0.21.0`, and Postgres.js `3.4.9`.

Two separate investigations remain deferred:

- **Idle database behavior:** DB-backed requests reportedly hung while `/health`
  returned 200. A connection-strategy change and immediate retry succeeded, but
  the relevant idle condition was not repeated. Establish a reproduction before
  selecting an application or upstream fix; this preview adds no connection recipe.
- **Live stop/start routing:** the report records a running version with
  `live: null`, a missing live URL, and a public 404 after stop/start. Redeployment
  restored routing. Verify the supported lifecycle semantics and reproduce with
  recorded versions before calling this a general platform bug.

The completed pilot below remains the directly executed deployment baseline.
This revision creates no cloud deployment, test PR, or Todo application change.
No upstream code, dependency pins, packaging behavior, or submission changes are
included. These instructions guide agents; they are not enforcement tests or a
guarantee against failures.

### Scenario reviews (not executed agent journeys)

| Scenario | Expected behavior under the revised guidance |
| --- | --- |
| Ordinary build/deploy or declined offer | Build/deploy retains its existing sequence; GitHub setup starts only after acceptance or a direct request. |
| Accepted offer or direct combined setup | Save reviewed source, connect the existing project, verify the workflow-configuration commit and app, return repository/run/live links, and finish. No invented feature or PR. |
| Explicit save-only, including an undeployed app | No Prisma login, provisioning, connection, or new automation is required. If an existing workflow would deploy the push, clarify a non-deploying destination before pushing. |
| Already configured repository, including previews | Reuse the matching connection/workflow and successful-run evidence; verify current app state without replacing the workflow or forcing a push. |
| Interrupted setup, denied access, or build failure | Inspect completed steps and resume the same target; report partial progress without duplicate repositories/projects or destructive recovery. |
| Successful no-op or skipped credentials | No-op convergence may pass with matching run/commit/app evidence; `skipped-no-credential` remains incomplete even if GitHub is green. No artificial version change. |
| Runtime drift after context switch | Resolve and verify Node, package-manager, and relevant Bun executables in the new context before install/build/deploy. Preserve app pins. |
| GitHub authentication error in a restricted context | Establish supported network and credential-store access and retry the read before claiming credentials are invalid or asking for login. |
| Timeout, non-JSON response, or test-script exception | Use a finite request timeout, 30 seconds by default; inspect status/format before JSON parsing and separate request failure from harness failure. |
| Lost artifact path or cookie identity | Establish explicit writable absolute paths outside Git; retain session identity and created record IDs as operations succeed for diagnosis and targeted cleanup. |
| Database failure with a healthy `/health` | Check DB-backed behavior, deployment state, routing, and logs; do not infer health from the static endpoint or routinely stop/start the live version. |
| Recovery uncertain or one retry succeeds after an idle failure | Preserve resources when safe recovery is unclear. After a supported fix, use the same deployment path and reverify; without repeating the idle condition, report only immediate recovery. |
| Data survives a redeploy or resources remain unchanged | Describe precisely those observations; do not claim an actual restart or activation of changed application code without corresponding evidence. |

### Maintainer-only preview exercise

The full preview acceptance exercise remains available for separately authorized
maintainer testing; it is not part of the installed setup journey or a new skill:

1. Record live target identities and synthetic sample data; verify an unchanged-app
   GitHub deployment preserves them.
2. With explicit test scope, push a harmless feature branch and open a PR. Verify
   an isolated preview service/database/URL and an unchanged live app/data.
3. Push a second application change. Verify the same preview resources, updated
   behavior, and retained preview data; a documentation-only no-op cannot prove
   activation of changed application code.
4. Only after approval, merge and verify the same live app updates with its data.
   After approved branch deletion, verify platform preview cleanup and intact
   live resources. Do not add an unsupported action destroy job or manually delete
   resources to make the check pass.

The `0.4.1-dev.2` pilot below completed this exercise. Its results remain historical
evidence and were not repeated for this instruction revision.

### Directly executed checks

- All three skills passed the existing skill validator. The existing packaging
  regression passed, including repeat builds, authored-file preservation, missing
  inputs, tampering, and exactly three skills. Bundle integrity and whitespace
  checks passed. No new test infrastructure was added.
- The revised YAML example parsed successfully. Static checks covered `main`/`demo`
  and a substituted `trunk`/`live` mapping: only the selected default branch has a
  push trigger, the live stage is explicit, OIDC and Node/Bun setup remain, deploys
  serialize, and outcomes other than `succeeded` fail the final step. This is not
  a newly executed GitHub deployment. Authored relative links and anchors resolve.
- The separate nine-file `prisma-0.4.1-dev.3-preview.zip` matches the rebuilt bundle
  byte-for-byte. SHA-256:
  `ffad7c8d6a3306cb078b58574e80a7698c3d0455d5c90570565c182f2f5f7ab7`.
- The refreshed local `prisma-preview` is enabled at `0.4.1-dev.3`. All nine
  installed files match, including all three skills and both authored references.
  Manifest comparison confirmed that only its version changed; branding, prompts,
  listing copy, and data-use restrictions were retained.
- Composer `0.21.0` remains byte-for-byte unchanged at SHA-256
  `67b50e78fbb6cafd00bb99b0e56fe8a49e4a7190219474bf1b9be933f08bbcbb`.
  The saved submission archive retains SHA-256
  `ad755a35a96fe9130251f3ca716fd122389556d6e81179cb2edba57fe765f225`.
  Earlier archives remain intact; the OpenAI submission was not accessed or edited.

## GitHub handoff retest `0.4.1-dev.2` (2026-09-29)

After deployment of [the personal-installation connection fix](https://github.com/prisma/pdp-control-plane/pull/5488),
the existing pilot resumed without a new repository, project, installation, or
permission change. Luan completed **Connect your GitHub account** in the browser.
The managed CLI returned an active repository connection; Console independently
confirmed the private repository on the existing project. The skill reference now
describes this choice separately from installing the App for a new account.

Directly executed on macOS with the pilot's existing isolated Prisma session:

- Repository `luanvdw/prisma-plugin-onboarding-todo` (GitHub ID `1392182365`)
  connected to project `proj_ywzp2e8yo8edvlq8lqt0occ0` in workspace
  `vt3bpj2c1qjx4sw2ne1vq17n`; connection ID
  `srcrepo_db6ke4y5l4p222lcc68qk72q`.
- [First GitHub deployment](https://github.com/luanvdw/prisma-plugin-onboarding-todo/actions/runs/36562607699)
  succeeded for commit `3e38635415453f56822e110c52352c867572a92f` with unchanged
  application code. Action `v1.7.0` obtained a short-lived credential through OIDC;
  build `bld_g0f1xpezs4z9hxvjwlkc4k3r` succeeded. The existing `demo` service,
  database, and URL below were preserved; live version became
  `cpv_q09unep5b20d5xjjqbur9n0y`. Both baseline Todos survived. Browser creation,
  completion, and deletion of an additional disposable Todo passed.
- [First feature-branch deployment](https://github.com/luanvdw/prisma-plugin-onboarding-todo/actions/runs/36562995539)
  succeeded for commit `6a9e9e31defe8808aa638b3fbcbb6bed2fd6ac20`, build
  `bld_sdi3xfbgdhtg5is7isjx9a1s`. It created preview branch
  `br_kizx8kms9o2s31q4fc6hrhr7`, service `cps_ieml1cwn91pw3fjqk2a552t8`,
  database `db_aeg2pfjfuf1nuog7jucxk3v5`, and version
  `cpv_jjxt1sggmvxf4y787ecbpud1`, all in Frankfurt. The preview browser displayed
  the changed subtitle and saved a synthetic Todo. The live browser retained its
  original subtitle and baseline Todo. [Pilot PR #1](https://github.com/luanvdw/prisma-plugin-onboarding-todo/pull/1)
  contained only the small copy change and deployment documentation.
- [Second feature-branch deployment](https://github.com/luanvdw/prisma-plugin-onboarding-todo/actions/runs/36563517042)
  succeeded for commit `02d76482aa1feaeeb557ec97457c384baa66016e`. The same preview
  branch, service, database, and URL were retained; live version became
  `cpv_pgxwuc6tanenzstzsvo7ex85`. The browser showed the second subtitle and its
  saved Todo after reload. Resource lists contained exactly one preview service
  and database. The live app's version, subtitle, and both baseline samples stayed
  unchanged. One live API read returned the previously observed HTTP 503; a retry
  succeeded with the original sample. This intermittent application behavior is
  still an observed limitation, not evidence of data loss or a failed CI run.

- Luan approved merging pilot PR #1 and deleting its feature branch. The
  [merge-triggered live deployment](https://github.com/luanvdw/prisma-plugin-onboarding-todo/actions/runs/36563968462)
  succeeded for commit `fc731bfa93507bb68c1d573d807a0ae61f6ef53d`, build
  `bld_ap8k11qew2vbwlez3o8yqpji`. The original live service, database, and URL
  remained, with running version `cpv_yncuuvho8c01f0bsrv1wp2ey`. The browser showed
  the merged subtitle and original Todo together; the API baseline also matched.
- After the approved branch deletion, platform cleanup removed the preview branch.
  The project-wide database list contained only the original live database, and
  the preview URL returned HTTP 404. The live service/version and API sample
  remained intact. No action destroy job or manual cloud-resource deletion was
  used. All four deployment runs completed successfully.

This completes the pilot's GitHub connection, OIDC deployment, repeat-preview,
merge-to-live, and branch-cleanup acceptance. It does not prove every framework,
package manager, operating system, or real-user authorization path. The existing
intermittent data-read behavior remains recorded above.

Packaging regression, all three skill validations, bundle integrity, and whitespace
checks passed. The nine-file ZIP and refreshed `prisma-preview` installation match
the bundle byte-for-byte at `0.4.1-dev.2`. Preview ZIP SHA-256:
`5b490d8d96fd12ec1a459f7b582e51feb174d9652c015182a4109c8be08a6d92`.
Composer's unchanged hash and the submitted `0.4.0` archive hash were verified
against the values recorded below. The dedicated reviewer Todo, personal login,
submission, and dependency pins are unchanged. Routing and recovery cases below
remain scenario reviews, not executed agent or security-enforcement tests.

## GitHub deployment preview `0.4.1-dev.2` (2026-09-28)

Historical initial preparation and blocked attempt; the dated retest above records
subsequent results without rewriting the evidence captured here.

This preview adds the authored `prisma-github-deploy` skill and one supporting
reference. Build-and-deploy offers a handoff only after a verified deployment.
Packaging now preserves both authored skills and imports the unchanged Composer
`0.21.0` reference, for exactly three skills. The older root `prisma-compute`
skill was inspected for overlap; its older CLI/configuration path is not reused
or included in this bundle. No root skill, upstream system, or submission changed.

The GitHub path pins `prisma/cloud-deploy-action@v1.7.0`, with OIDC, explicit live
stage mapping, separate branch previews, per-target serialization, and a guard
against green `skipped-no-credential` outcomes. The reference excludes the action's
unsupported destroy workflow. Runtime/dependency pins are preserved per app;
GitHub Actions execution does not enable browser/cloud agent execution.

### Directly executed checks

- Existing packaging regression passed: two authored skills and references survive
  repeat builds, missing inputs fail before replacement, tampering fails integrity,
  and the bundle contains exactly the three expected skills.
- All three skills passed the existing skill validator. Bundle integrity and
  whitespace checks passed. Composer SHA-256 remains
  `67b50e78fbb6cafd00bb99b0e56fe8a49e4a7190219474bf1b9be933f08bbcbb`.
- The example workflow parsed as YAML with push-only triggering, read-content/OIDC
  permissions, serialized deployment, and an explicit unsuccessful-outcome guard.
  Parsing is not evidence of a successful GitHub deployment.
- The pilot app's typecheck/build passed with its unchanged package pins:
  CLI `8.0.0-rc.15`, Composer/cloud `0.21.0`, ORM Postgres `8.0.0-rc.11`,
  Bun `1.4.2`, Node `24.16.0`, and npm `11.13.0`.

- The separate nine-file preview ZIP matches the bundle and the refreshed local
  `prisma-preview` installation byte-for-byte, including all three skills and both
  authored references. Installed version is `0.4.1-dev.2`. ZIP SHA-256:
  `5a7d0fe725cbbe6924af06a1c353a1a2f381bc49583e7693b3f7ce932d2f383f`.
- The submitted `prisma-0.4.0-mcp-draft.zip` retains SHA-256
  `ad755a35a96fe9130251f3ca716fd122389556d6e81179cb2edba57fe765f225`.
  No portal interaction, release, or submission replacement was performed.

### Pilot acceptance in progress

The approved app is **onboarding-todo** in **ChatGPT Plugin Review**, Frankfurt
(`eu-central-1`), live stage `demo`. The dedicated reviewer Todo is untouched.
Baseline inspection confirmed the existing project, service, database, and live
version. Source and the lockfile were reviewed and saved privately in
[luanvdw/prisma-plugin-onboarding-todo](https://github.com/luanvdw/prisma-plugin-onboarding-todo).
Local credentials, deploy reports/state, logs, and private test instructions are
excluded. The original isolated CLI credential environment is retained.

| Identity | Baseline |
| --- | --- |
| Workspace | `vt3bpj2c1qjx4sw2ne1vq17n` |
| Project | `proj_ywzp2e8yo8edvlq8lqt0occ0` |
| Live stage | `demo` |
| Service | `cps_u2dqk2l7etg77rc9bi3i55st` |
| Database | `db_szqv1hbn0sn85n6a4k9yw1k3` |
| Service version | `cpv_iqa86kwn1vyqi4u8ek7aen39` |

Live URL: <https://u2dqk2l7etg77rc9bi3i55st.fra.prisma.build>.
A synthetic Todo was created in Chrome; an independent API sample with ID
`9e97488a-64de-4707-9c3f-e10a7717ed0f` was recorded for comparison. Test cookies
remain outside Git. Before any deployment changes, occasional browser loading
failures and an API HTTP 503 occurred; subsequent health/list/create reads worked.
This pre-existing intermittent behavior is not attributed to GitHub automation.

The first managed `git connect` attempt timed out with
`GIT.REPO_INSTALLATION_REQUIRED` while GitHub awaited identity confirmation.
Luan subsequently completed that confirmation. GitHub then showed the existing
`luanvdw` installation (ID `29254405`, installed in 2022) covering all repositories;
its permission-review page reported that the App was already up to date.

On resuming, Prisma Console still showed no installation connected to **ChatGPT
Plugin Review**. Its supported existing-installation selector offered `prisma`,
not `luanvdw`. Both the CLI installation flow and Console's Add installation flow
led to GitHub's existing-installation configuration instead of completing the
workspace association. No permissions were changed and no other installation was
connected. This is a workspace-association blocker, not an outstanding request for
Luan to repeat identity confirmation. Its root cause is not yet established.

No repository connection or workflow deployment was created. The first unchanged-
code deployment, two preview pushes, approved merge, and approved branch-deletion
cleanup remain pending resolution of that association. CodeQL checks on draft
PR #9 passed. The original live resources, synthetic Todo samples, and dedicated
reviewer app remain unchanged. Do not read the
historical local/live deployment results below as proof of this new CI path.

### Scenario review (not executed agent or security-enforcement tests)

| Scenario | Expected behavior confirmed in the instructions |
| --- | --- |
| Cancel GitHub authorization | Keep app/repository progress; stop the old attempt, resume the same mapping when authorized. |
| Denied repository access | Explain the missing access; no public-repo, credential-copying, or replacement-project workaround. |
| Already connected correctly | Reuse connection/workflow; do not create duplicate automation. |
| Different repository/project or live-stage collision | Clarify before changes; never disconnect, rename resources, or overwrite live data to make setup pass. |
| Missing OIDC credentials | Treat `skipped-no-credential` as incomplete; inspect connection and permissions. |
| Build/startup/quota failure | Report failed phase and actual live/partial state; retain identifiers and prior live app. |
| PHI/PCI may be present | Stop affected access; synthetic environment only, with no MCP-to-CLI bypass. |

Routing review used five should-fire cases: accepted post-deploy offer; direct
“save this deployed Composer app to GitHub”; direct “enable automatic updates for
this Prisma app”; “resume the GitHub connection”; and “diagnose this Prisma branch
preview.” Each selects the new skill and retains the existing target.

Five should-not-fire cases: ordinary “build a Todo app and deploy it”; local-only
app work; unrelated Git refactoring; an ORM query question; and an explicit decline
of GitHub setup. These do not start repository setup. A direct GitHub request for
an undeployed app establishes the live target through the build workflow first.
No new automated scenario framework was added.

## Onboarding preview `0.4.1-dev.1` (2026-09-25)

This development preview selects released CLI `8.0.0-rc.17` for new apps and
passes `--ui-context prisma-plugin` during login. Existing apps retain their
toolchains; an older CLI without the option uses standard browser login and an
agent explanation to return to chat. No new deployment is required for this
instruction change. Composer/cloud `0.21.0`, ORM Postgres `8.0.0-rc.11`, branding,
MCP diagnostics, data-use restrictions, and the two-skill structure are retained.

Directly executed release checks on macOS with Node `24.16.0` and npm `11.13.0`:

- npm published `prisma@8.0.0-rc.17`; the publish workflow completed successfully.
- A clean installation of the exact CLI/Composer/cloud/ORM set succeeded without
  `--force` or `--legacy-peer-deps`. Composer, cloud-control and ORM target-control
  imports succeeded. The ORM package exports subpaths, not a root module.
- Released `auth login --help` lists `--ui-context` with `prisma-plugin` as its
  supported value. Inspection of the published bundle confirms context propagation,
  return-to-ChatGPT success/failure wording and conditional omission of the
  skills-install section. This inspection is not a completed browser login test.

Executed preview checks:

- The existing skill validator, packaging regression (one test), rebuilt-bundle
  integrity check and whitespace check passed. The installed `prisma-preview`
  reports `0.4.1-dev.1`; both skills and all seven installed files match the bundle.
- A separate seven-file preview ZIP matches the bundle byte-for-byte. SHA-256:
  `c340e05c8951d525f7640ff5c5e5034e7641f917623802a5a7dcf94910da3866`.
  Composer retains SHA-256
  `67b50e78fbb6cafd00bb99b0e56fe8a49e4a7190219474bf1b9be933f08bbcbb`.
- `auth login`, `dev`, `deploy`, and `project list` help commands ran successfully
  with the released CLI. Existing `0.4.0` submission archive checksums still pass.

Browser acceptance used a new isolated credential file, initially confirmed
unauthenticated. Luan completed the standard browser flow with his existing
account and selected **ChatGPT Plugin Review**. The login process exited zero;
the subsequent `auth whoami --json` reported both `authenticated: true` and
`verified: true`, and a remote `project list --json` succeeded with three existing
projects in that workspace. No personal session was reset and no cloud resource
was created or changed.

Luan's screenshot of the actual success page confirms the return-to-ChatGPT
wording and absence of the terminal/skills-install section. The page still uses
the CLI's previous logo; updating that embedded artwork is a separate upstream
follow-up. This was returning-account authorization, not fresh account creation
or a new application/deployment test. Failure-page wording was inspected in the
published code, not exercised through a new failed browser login.

Instruction review (not executed agent acceptance): existing valid sessions still
reuse identity and remote-access checks without login; older CLIs without the
option retain standard login without an automatic upgrade. No new test framework
or repeated cloud deployment was added.

The submitted `0.4.0` source is preserved in commit `7658737`; all seven bundle
files matched its saved archive before changes. Its archive and per-skill ZIPs
remain unchanged. Luan submitted that version, and the portal was observed in
**Review** on 2026-09-25. Older sections below record preparation-time results and
stopping points; they do not describe the current submission status or prove that
the new CLI has completed an end-to-end deployment.

## Historical data-use restriction revision (2026-09-25)

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
