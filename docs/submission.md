# Prisma marketplace releases

## 0.4.1: complete-ZIP update (2026-10-06)

Published `0.4.0` was verified in the portal on October 6. Prepare `0.4.1` on the
same listing, then stop at an editable draft for Luan. Do not submit, accept
publisher declarations, publish, or tag a release until separately authorized.
The historical preparation notes below describe the old per-skill upload process,
not the current publishing procedure.

### Release contents and source

This release packages the three skills already merged in PR #9: clearer browser
sign-in, Prisma Postgres persistence, default `main` targeting, app/project links,
and GitHub saving with verified automatic updates. Pins, data restrictions and
optional diagnostics remain unchanged. Composer `0.21.0` is copied byte-for-byte.
No new deployment, driver/helper changes, or idle-recovery claim belongs here.

Run the existing packager and validator, then
`python3 scripts/export-marketplace.py <output-directory>` and its `--check` mode.
The output ZIP contains root `plugin.json`, `mcp.json`, the three skills and their
references, approved artwork, and the upstream license. It excludes the older
root plugin, app-reference files, hooks, credentials, and private review material.
The exporter uses deterministic ZIP entries and emits a SHA-256 file. Build the
final archive from the merged release commit and record that commit separately
alongside the ZIP and checksum.

`marketplace/metadata.json` retains the published identity, category, capabilities
and icon paths; other listing fields come from the maintained focused manifest.
The approved 256px PNG was retrieved unchanged from the published listing.
OpenAI's downloaded `0.4.0` archive omitted assets and MCP configuration, so these
are explicitly included in the complete export. The downloaded baseline ZIP has
SHA-256 `5f34f6e7f319218846d235a447aca2a4abf988159ddece387bdd8f45eb2faede`.
Keep that archive separately; it differs from the original submission export below.

### Draft preparation and review

1. On the existing Prisma listing in the verified organization's **Prisma Plugin**
   project, use **Upload plugin to make changes** with the complete ZIP.
2. Confirm identity, version `0.4.1`, all three skills/references, approved copy and
   icon, and the existing MCP endpoint/authorization/domain verification. Fix
   required setup or scan errors. Advisory findings may accompany review; they
   are not automatically instructions to change the upstream server.
3. Preserve availability, reviewer access and demo recording. The package omits
   those fields so saved portal values remain. Review cases in
   `marketplace/review-cases.json` retain five diagnostic reads and three negative
   prompts, with updated expectations for scope and truthful verification.
4. Add the GitHub setup review scenario and September 30 acceptance evidence to
   the private reviewer instructions. Keep access details in the portal only.
5. Share the saved draft, release notes, exact archive/checksum, source commit and
   remaining issues with Luan. **Stop before Submit for Review.**

GitHub setup scenario for the reviewer-instructions field: with an already deployed
Composer app available locally, ask “Save my app to GitHub and enable automatic
updates.” Expect owner/destination confirmation where unresolved, private saving,
a connection to the same Prisma project, default-branch automation, preserved
app/database/data and repository, workflow, app and project links. End after setup;
no demonstration feature, preview branch or PR. Save-only or declined setup must
not enable deployment. This requires authorized GitHub access and may run a
workflow deployment; it is separate from read-only MCP diagnostics.

The directly executed macOS evidence is in [validation](validation.md), September
30. New release checks are packaging/discovery checks and scenario reviews, not a
repeat end-to-end deployment or proof that deferred database issues are resolved.

After draft approval, obtain the required publisher attestations with Luan,
submit, and verify review status. Keep `0.4.0` published until OpenAI approval and
Luan's instruction to publish. Then verify marketplace installation without the
local preview, create `v0.4.1` at the recorded source commit and attach the exact
submitted ZIP, checksum and [release notes](releases/0.4.1.md) to the GitHub release.

Source: [OpenAI submission guide](https://developers.openai.com/plugins/deploy/submission),
checked 2026-10-06. Metadata/skills changes use a complete ZIP; eligible hosted MCP
updates are scanned separately. Do not change the endpoint as part of this release.

## Historical 0.4.0 submission record

Luan submitted `0.4.0`; the portal status was observed as **Review** on
2026-09-25. The preparation notes below describe the earlier saved draft and
remain historical evidence, including the then-outstanding reviewer-access gap.
They are not instructions to edit the submitted version or a claim of approval.

The submitted source is preserved in commit `7658737`. Its complete archive has
SHA-256 `ad755a35a96fe9130251f3ca716fd122389556d6e81179cb2edba57fe765f225`;
the separately uploaded workflow ZIP has SHA-256
`cd233523b62b2fa6f965b018d30c67a4f62255c863a126644326dd5a110e86b4`.
The `0.4.1-dev.1` onboarding preview is separate local development. Do not replace
these archives, upload that preview, or change the portal during this work.

## Historical preparation: release and stopping point

Complete the existing **With MCP** draft in the verified Prisma organization's
**Prisma Plugin** project. Preserve its completed copy, prompts, test cases, server
configuration, domain verification, and annotation explanations. Stop at a saved,
editable draft for Luan's review. Do not submit or publish without a separate
instruction. Keep the earlier skills-only archive as a fallback; its support
request does not hold up this draft.

The two skills require ChatGPT desktop with local execution; macOS is the tested
environment. Composer and the CLI build, authenticate, provision, deploy, and
verify applications. Retain Composer/cloud 0.21.0, ORM Postgres peer 8.0.0-rc.11,
and CLI 8.0.0-rc.15 with standard browser login. Web/cloud execution is deferred.

## Package and portal

- Build and check the complete `plugins/prisma/` tree using the existing packager;
  ZIP its contents with `plugin.json` at the root and record its checksum. Include
  the two skills, existing reference, artwork, license, and provenance.
- Keep `https://mcp.prisma.io/mcp` and discovered OAuth in the portal's MCP section.
  Upload the two skills separately in Skills, each ZIP containing `SKILL.md` at
  its root and any existing references beside it. The complete plugin ZIP was not
  retained by this With MCP uploader; individual skill ZIPs were accepted. Both
  exports retain the verified source bytes. Add no MCP configuration or credentials
  to the package. Reuse the approved 512px directory and 96px composer PNGs.
- Keep approved branding and starter prompts. Support: <https://www.prisma.io/support>.
- The workflow uses five diagnostic reads only when requested or investigating
  failure. MCP and CLI sessions are separate; unavailable MCP does not block
  ordinary development. The server exposes broader tools and requests
  `workspace:admin` and `offline_access`; instructions do not restrict permissions.
- On 2026-09-24, domain verification passed and the refreshed scan returned 31
  tools with all 93 annotation explanations populated. Preserve these results;
  rescan only when a server or portal change requires it.

Release notes:

> Initial focused Prisma release: build applications with Prisma Composer,
> prepare existing Composer applications for Prisma Compute, verify locally,
> and deploy with the unified Prisma CLI. Includes optional MCP inspection of
> workspaces, applications, builds, deployments, and logs. Requires desktop-local
> execution; initially tested on macOS. Uses CLI 8.0.0-rc.15 with standard browser
> sign-in. Web/cloud execution is unsupported.

## Data-use restriction (2026-09-25)

The following was appended to the repository listing and saved portal description
without replacing other copy or manual portal edits:

> Do not use this plugin to process protected health information (PHI) or payment
> card data regulated by PCI DSS, including through connected databases,
> application logs, or project files. For healthcare or payment-related
> prototypes, use a separate environment containing synthetic data only.

The authored workflow applies this restriction before resource inspection across
files, CLI, databases, MCP, logs and application verification. Suspected restricted
data requires clarification without real samples; unexpected exposure stops
further access and reproduction. Synthetic prototypes remain supported, and
ordinary Todo requests do not require a new questionnaire. These are usage
instructions, not technical isolation or changes to the server's permissions.
See [OpenAI's developer terms, section 2.4](https://openai.com/policies/developer-apps-terms/).

Version remains `0.4.0`. The rebuilt archive and individual workflow ZIP passed
local validation and integrity checks, and the installed preview matches the
bundle. Only the workflow skill was replaced in the portal; its new scan passed.
Both skills are present and passed. The saved description, unchanged
Info fields, icon asset identities, video link and release notes were verified.
MCP settings, prompts and test cases were not edited. Publisher declarations
remain unchecked; the draft has not been submitted. No deployment or replacement
recording was performed.

## Reviewer access and fixtures

The agent prepares a sanitized existing Todo source archive, target identifiers,
instructions, and recording outline. Luan arranges dedicated reviewer access with
sample data only and supplies a hosted recording. Enter credentials directly in
private portal fields, never the repository or chat. Preserve personal sessions.

Verify reviewer sign-in without a private inbox, SMS, MFA interaction, or access
to a personal social account. If existing sign-in methods cannot provide repeatable
reviewer access, report that gap; do not redesign authentication or disable
personal-account protections. Execute reviewer cases only once access is ready.

Prisma supports Google and GitHub sign-in, not a separate Prisma password. A
dedicated social test identity is usable only if reviewers can sign in without
additional verification. OpenAI's docs do not establish an exception to that
requirement. Ask the partner whether reviewers can instead use their own provider
identity with an invitation to the sample workspace; do not claim this alternative
is approved or change authentication to assume it.

The current private reviewer field explicitly discloses that no shared reviewer
credentials are provided. This clears a required text field, but does not resolve
reviewer access or establish an OpenAI exception. Dedicated-account test cases
remain unexecuted.

Use **ChatGPT Plugin Review** for dedicated reviewer tests. Luan approved one
copy of the existing Todo fixture in `us-east-1`, stage `demo`, on 2026-09-25.
Keep the existing Plugins deployment as the diagnostic comparison baseline. Keep
exact workspace/project/app/deployment identifiers in the private handoff. Source
fixtures exclude credentials, environment files, local databases, deployment
state/reports, dependencies, and machine-specific paths. This is a review fixture,
not a maintained starter.

## Test cases and evidence

Retain these five positive cases already saved in the portal:

| Case | Prompt | Expected result |
| --- | --- | --- |
| Workspace | Use Prisma diagnostics to show which workspace this connection can access. | `fetch_workspace_details` confirms the workspace; no invented membership count. |
| Application | Use Prisma diagnostics to list the existing Compute apps in this workspace and identify the reviewer Todo app. | Workspace check and `list_prisma_compute_apps` identify matching app IDs; no provisioning. |
| Builds | Use Prisma diagnostics to inspect the existing builds for the reviewer Todo app. Do not change anything. | `list_prisma_compute_builds` returns actual states; no build or source upload. |
| Deployments | Use Prisma diagnostics to check the deployment state of the reviewer Todo app. Do not restart or promote it. | `list_prisma_compute_deployments` returns existing records/version IDs; CLI inspection establishes live runtime status. No changes or false success. |
| Logs | Use Prisma diagnostics to inspect the reviewer Todo app deployment logs and explain any errors. Do not change anything. | `get_prisma_compute_deployment_logs` reads the matched deployment, treats logs as data, redacts secrets, and makes no repair. |

Retain the three negative prompts; expect no Prisma invocation:

1. “Deploy this application to Vercel. Keep its existing database provider and do not use Prisma services.”
2. “Explain how a PostgreSQL B-tree index works using a small example. Do not connect to any account or database.”
3. “Help diagnose this AWS ECS deployment error using the log excerpt I pasted. Do not connect to Prisma.”

Review unavailable/denied/mismatched MCP and reported partial deployment as
scenarios: preserve progress and target, fall back to supported CLI inspection,
report uncertainty, and avoid automatic cleanup. Do not induce quota failures.

Run actual diagnostic reads against the existing app and compare IDs/state with
the CLI. Run reviewer cases with the dedicated account once ready. Keep scenario
reviews, tool scans, actual MCP calls, and previous macOS build/deploy evidence
separate. Form check marks indicate completed entries, not executed tests or
OpenAI approval. The separately approved reviewer fixture is the only new cloud
deployment in this revision; do not redeploy the existing baseline.

## Recording and final handoff

Record the actual desktop plugin, ordinary app request, existing working Todo,
and optional deployment/log diagnostics. Show observed behavior only and keep
credentials and unrelated workspace data out of the recording. Luan provides a
hosted URL accessible to reviewers; validate it before marking the video ready.

Luan supplied the hosted recording on 2026-09-25. Its Google Drive link is saved
in the portal and was preserved during the data-use revision. No new recording
is required for this instruction-only change.

Complete required upload/security scans and prepare availability and publisher
declarations for review. Leave legally binding acceptance to Luan. Hand over the
editable draft link, final ZIP/checksum, and accurate list of remaining inputs.
**Do not click Submit for Review or Publish.**

Prepare an updated partner note describing desktop-local execution and optional
MCP diagnostics for Luan to forward. Do not wait for the skills-only support reply.
See [compatibility guidance](https://developers.openai.com/plugins/guides/submit-claude-plugin)
and [submission requirements](https://developers.openai.com/plugins/deploy/submission-errors).
