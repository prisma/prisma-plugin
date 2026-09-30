---
name: prisma-github-deploy
description: >-
  Save a Prisma Composer app to GitHub, connect its existing Prisma project,
  and enable or diagnose default-branch automatic deployments. Use when
  the user accepts the offer to save their code to GitHub and connect it to Prisma
  for automatic updates, accepts the shorter GitHub-saving offer, or
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
For automatic deployments, establish a missing live target through that journey
first. A save-only request needs no cloud deployment or Prisma connection.
Do not add unrelated PR-management or migration work.

Accepting the build workflow's combined offer authorizes saving, connection, and
automatic-update setup. Honor an explicit save-only or no-deploy request: save
the source and finish without connecting or enabling deployments. Do not turn
setup into a branch-preview demonstration or invent an application change.

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
  For automatic updates, confirm the authenticated Prisma workspace and deployed
  project by ID, production/default versus named target, actual live branch,
  region, service/database IDs, and both verified app/project links; retain a
  non-sensitive persistence sample for verification.
  Resolve ambiguity before pushing or connecting; never infer identity from a
  matching display name alone.
- Reuse an appropriate existing repository. Otherwise propose an app-derived
  name, default to private visibility, and confirm owner/destination unless already
  specified. New repositories use `main` as the default branch; preserve an
  existing repository's default branch. Check access and contents before pushing. Never
  replace a remote, force-push, or overwrite repository contents to resolve a conflict.
- Save source, Composer configuration, and the lockfile. Review the exact staged
  files and diff first; exclude secrets, local auth, deployment state/reports, logs,
  and private test instructions. Do not commit an entire directory blindly.
  Record the repository and known workspace/project IDs, target kind and branch,
  region, verified app/project links,
  and deployment behavior in existing app documentation, without credentials or
  machine-specific paths. Keep dependency/runtime pins. For save-only requests,
  finish here without connecting, adding automation, or triggering a workflow;
  clarify before pushing if saving to that branch would itself deploy.

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
inspect other workflows to avoid duplicate deployments. For new automation,
deploy pushes only to the repository's actual default branch. For a verified
production/default target, omit the action's stage input; do not set `stage: main`.
For an existing named stage such as `demo`, retain its explicit stage mapping.
Serialize runs per target. Never relocate existing resources to match a branch
name. Preserve appropriate
existing workflows, including their previews; do not replace them just to match
the example. A green `skipped-no-credential` run means setup is incomplete.

Verify the deployment triggered by committing the workflow, leaving application
behavior unchanged. Match its commit and successful outcome to the same live
resources and preserved sample data. A successful no-op is valid when the deployed
app already matches that commit; do not manufacture a feature or new version to
prove an update. If setup is already complete, reuse matching successful-run
evidence and check the current app instead of creating another deployment.

Confirm the workflow's commit, deployment/build result, live service version, URL,
database-backed behavior, and browser result before saying automation is ready.
Follow the shared [verification and recovery guidance](../prisma-build-and-deploy/references/toolchain.md#verification-and-live-recovery)
and the app's existing persistence checks. Report partial progress and a specific
failing step for denied access, missing OIDC credentials, quota, build, or startup
failures. Preserve connections and state while fixing the cause; no automatic
destructive recovery.
Optional MCP diagnostics follow the existing workflow's identity and data-use rules.

Finish with repository and successful workflow-run links, **Open your app**, and
**Manage your Prisma project**, retaining the verified deployment links and branch.
Explain that
default-branch updates deploy automatically and state any incomplete checks. For
save-only requests, report only the saved repository. Finish setup here: do not
add demonstration features, PRs, extra preview pushes, merges, or branch cleanup.
