---
name: prisma-github-deploy
description: >-
  Save a Prisma Composer app to GitHub, connect its existing Prisma project,
  and enable or diagnose automatic deployments and branch previews. Use when
  the user accepts "Save your app to GitHub and enable automatic updates?" or
  directly requests this setup, including resuming an interrupted connection.
  Do not start GitHub setup for an ordinary build/deploy request, unrelated Git
  work, or a request to deploy an app before a live target has been established.
---

# Save to GitHub and enable automatic updates

Take a working Composer app with a verified Prisma deployment through repository
saving, project connection, and verified GitHub deployments. Use the existing
[build-and-deploy workflow](../prisma-build-and-deploy/SKILL.md) for local setup,
authentication, and application verification, and its Composer reference for APIs.
Read [GitHub deployment details](references/github-deploy.md) before configuring CI.
If the live target has not been established, finish that journey first and resume
this request afterward. Do not add unrelated PR-management or migration work.

The agent works locally in the desktop app; GitHub Actions executes the resulting
workflow remotely. Browser/cloud agent execution remains unsupported. Handle
commands and supported authentication yourself. The user completes browser consent
when required, without terminal commands, pasted tokens, or credential copying.

Do not access or upload PHI or PCI-regulated payment card data, including project
files, databases, and logs. If context suggests it is present, stop before access,
clarify without requesting real examples, and offer a separate synthetic-data
environment. If encountered unexpectedly, stop and do not reproduce it. Never
switch from MCP to CLI or GitHub to bypass the restriction. Ordinary Todo apps
need no extra questionnaire. Preserve secret redaction during diagnostics.

## Establish the same app and save its code

- Inspect Git state, remotes, package manifest, lockfile, Composer configuration,
  and existing workflows. Preserve the user's uncommitted work and app conventions.
  Confirm the authenticated Prisma workspace and deployed project by ID, live
  stage, region, service/database IDs, URL, and a non-sensitive persistence sample.
  Resolve ambiguity before pushing or connecting; never infer identity from a
  matching display name alone.
- Reuse an appropriate existing repository. Otherwise propose an app-derived
  name, default to private visibility, and confirm owner/destination unless already
  specified. Check access and existing contents before creating or pushing. Never
  replace a remote, force-push, or overwrite repository contents to resolve a conflict.
- Save source, Composer configuration, and the lockfile. Review the exact staged
  files and diff first; exclude secrets, local auth, deployment state/reports, logs,
  and private test instructions. Do not commit an entire directory blindly.
  Record repository, Prisma workspace/project IDs, live stage/URL, region, and
  deployment behavior in the app's existing documentation, without credentials
  or machine-specific paths. Keep established dependency/runtime pins.

## Connect the existing Prisma project

Check its current repository connection through a supported platform read or
Console. An already-correct connection is reusable. A different connection or a
repository linked elsewhere is a conflict to clarify, not permission to disconnect
it or create another project. Connect with the explicit project ID using the CLI
in the reference, then verify the repository identity and project mapping before
enabling automation.

GitHub authorization to save code and the Prisma GitHub App's repository access
are separate. Explain whichever connection is missing in plain language. Keep a
managed interactive connection attempt alive during browser authorization; do not
claim success from the browser alone. On interruption, inspect completed steps and
resume with the same repository/project. Do not restart by provisioning replacements.

## Enable and verify deployment automation

Adapt the reference's workflow using `prisma/cloud-deploy-action@v1.7.0`, GitHub
OIDC, and compatible Node/Bun runtimes. Preserve existing install/build conventions;
inspect other workflows to avoid duplicate deployments. Deploy branch pushes only:
the default branch must update the existing live stage (including `demo`), and
other branches get isolated stages named after their branches. Guard live-stage
name collisions and serialize runs per target. Branch deletion uses platform
cleanup, not an action `destroy` job. A green `skipped-no-credential` run means
setup is incomplete, not deployed.

First verify an unchanged-code deployment updates the same live resources and
preserves sample data. Then, within the user's authorized test scope, push a
harmless feature change and open a PR; verify a separate preview URL and database,
and unchanged live data. A second push must update that preview rather than create
duplicate resources. Keep PR merges and branch deletion under the user's control;
after approval, verify the live update and preview cleanup respectively. Do not
describe pending merge/cleanup checks as passed.

Confirm the workflow's commit, deployment/build result, live service version, URL,
database-backed behavior, and browser result before saying automation is ready.
Use the original app's persistence/verification approach; never seed previews by
copying production data. Report partial progress and a specific failing step for
denied access, missing OIDC credentials, quota, build, or startup failures. Preserve
connections and state while fixing the cause; no automatic destructive recovery.
Optional MCP diagnostics follow the existing workflow's identity and data-use rules.

Finish with repository, workflow/PR, live app, and verified preview links. Explain
that merging approved changes into the default branch updates the live app, while
other branches are previews; mention any checks or consent still outstanding.
