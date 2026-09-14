# Native Codex Workflow

## Start of every task

After the root `AGENTS.md`, read `../state/production-state.json`, then only the files named by its `nextAction` or the requested scope. Repository-authority and memory restrictions are defined in `../AGENTS.md`.

For routine work, use GPT-5.6 Sol with low reasoning. Escalate model or reasoning only for a demonstrated need such as ambiguous source conflicts, difficult visual diagnosis, or cross-system failures.

## Orchestration

Default sequence: orchestrator → production → QC → targeted repair when required.

Use temporary subagents only for independent, bounded work. Give each only its task, relevant authoritative file paths, relevant assets, and relevant output. Do not create persistent agents or pass accumulated project history.

## Production

Build from the applicable content source and locked template under `../production/templates/`. Write only to the assigned output path. Apply visual/output rules from `DESIGN_SYSTEM.md` and asset eligibility from `../assets/asset-manifest.json`.

If a source, asset, or decision is missing or conflicts with higher authority, record it and stop dependent work. Continue unrelated work only when safe. Never conceal a gap through invention.

## QC and repair

Apply `../QC_POLICY.md`; it exclusively defines QC, locking, repair scope, retry, section, and final gates.

After a successful scoped task, update `../state/production-state.json` atomically. Record existence, production, QC, approval, and repair independently; approval requires explicit evidence and cannot be inferred from a file or PASS result. Put detailed evidence in `../qc/`; keep the state file concise.

## Assembly and release

For assembly, apply the order in `CANONICAL.md`, construction constraints in `DESIGN_SYSTEM.md`, and gates in `../QC_POLICY.md`. Authorization boundaries are defined only in `../AGENTS.md`.
