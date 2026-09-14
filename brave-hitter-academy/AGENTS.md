# Brave Hitter Academy

Purpose: produce and validate the approved workbook without redesigning it.

Immutable rules: this project root is the source of truth; do not use conversation or archived memory as authority; do not alter approved decisions, pages, or artwork without explicit authorization; never invent missing material; external publishing, messaging, or distribution requires approval.

Authority: `docs/CANONICAL.md` owns content and structure, `docs/DESIGN_SYSTEM.md` owns visual construction, `QC_POLICY.md` owns quality and repair gates, `docs/WORKFLOW.md` owns execution, `assets/asset-manifest.json` owns asset eligibility, and `state/production-state.json` owns current status.

Orchestration: every routine run reads only this file and `state/production-state.json` first, then loads only files required by `nextAction`. Use temporary, narrowly scoped subagents only when useful. Follow production → QC → repair as directed by the workflow and QC policy.

# Brave Hitter Academy — Agent Router

1. The app is the primary active product; the approved workbook remains the curriculum/content source of truth.
2. Read `docs/PRODUCT_SPEC.md`, `docs/ARCHITECTURE.md`, `docs/PRIVACY_SECURITY.md`, and `docs/CONTENT_MIGRATION.md` before making product-level changes.
3. Use canonical workbook/content files and `assets/asset-manifest.json` for approved curriculum and assets.
4. Never invent, silently improve, or choose between genuinely ambiguous curriculum/product requirements. Stop that portion and ask one specific clarification question; continue unrelated work when possible.
5. Keep implementations web-native, mobile-first, launch-quality, and focused on baseball confidence/mindset—not baseball performance statistics.
6. Keep AI incremental and low-context: repository state over chat memory; structured signals over replaying full histories.
7. Enforce privacy and authorization server-side; never rely on hidden UI alone.
8. V1 is done only when the complete approved curriculum and required product flows are implemented, tested, deployed, and production-smoke-tested.
