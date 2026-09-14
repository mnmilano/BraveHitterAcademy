# Brave Hitter Academy QC Policy

QC each page independently as PASS or FAIL. A passing page is locked unless a later authorized change directly affects it.

## Page gate

A page passes only when it matches its authoritative content source, the applicable page family, every relevant rule in `docs/DESIGN_SYSTEM.md`, and every asset/character source referenced there. Record content, visual, and technical checks independently; any failure makes the page FAIL.

## Minimum-scope repair

1. Repair an individual element when possible.
2. Otherwise repair only the failed page.
3. Repair multiple pages only when one shared defect affects them.
4. Regenerate a chapter only when its authoritative design system changed or its structure/source is fundamentally invalid and page-level repair cannot solve it.

After repair, re-run QC only on affected pages/components. Do not re-QC locked pages unless directly affected. After two failed targeted repair attempts on the same page, stop and report the defect and attempted fixes; do not escalate automatically to chapter regeneration.

## Section and final gates

Section QC verifies the canonical count/order, cross-page consistency, applicable character/action continuity, and a passing automated preflight. Final assembly QC verifies the canonical workbook structure, required geometry on every page, successful reopen, and integrity hashes. Assembly construction rules live in `docs/DESIGN_SYSTEM.md`.

Current status is authoritative only in `state/production-state.json`. Detailed evidence belongs in `qc/`; historical gate language there does not supersede the state file.
