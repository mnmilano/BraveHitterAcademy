# Brave Hitter Academy — Workbook-to-App Content Migration

## Authority
The new web application is the primary active product. The existing approved Brave Hitter Academy workbook remains the authoritative source of truth for curriculum, stories, exercises, challenges, terminology, completion requirements, and approved visual assets.

Do not modify the workbook to accommodate the application.

Before migration, inspect the current canonical project/workbook and authority files. Historical location has been:

`~/.openclaw/workspace/brave_hitter/brave-hitter-academy`

Locate the current canonical repository if it has moved.

Relevant authority may include:
- canonical workbook/source chapter files
- `docs/CANONICAL.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/WORKFLOW.md`
- `state/production-state.json`
- `assets/asset-manifest.json`
- other files explicitly designated canonical

Archived OpenClaw personas, memory/bootstrap files, legacy manifests, and obsolete workflow files are not product authority unless a canonical file explicitly says otherwise.

## Complete migration requirement
V1 is not complete until the entire approved workbook curriculum is migrated, including all approved:
- chapters
- stories
- lessons
- exercises
- reflections
- challenges
- Parent Dugout material
- Game Day Journal material
- Brave Hitter Oath
- goals/thoughts
- other reusable curriculum components

Do not migrate only sample chapters and call V1 complete.

## UX freedom vs content freedom
Codex has high freedom over web UX/layout and low freedom over curriculum/content.

Do not reproduce seven workbook pages as seven web pages merely because that is how print is structured. Transform the material into a web-native flow using appropriate steps, cards, selections, reflections, Coach Mark moments, and activities.

Preserve the approved meaning, requirements, and content. Do not materially rewrite stories, lessons, exercises, challenges, or educational intent without clarification.

## Canonical character/assets
Preserve the approved Brave Hitter visual identity and canonical assets. Known workbook conventions include:
- red/black/cream/white palette
- no Cincinnati Reds branding
- canonical young-player illustration historically named Gio, jersey #13
- canonical Coach Mark illustration
- approved crest/environments/decorations in the asset library

In the app, display the actual player first name/nickname rather than “Gio.” Treat the visual asset generically in code so future avatar customization remains possible.

Use the canonical asset manifest rather than inventing replacements when approved assets exist.

## Completion mapping
Workbook requirements are authoritative for what constitutes meaningful completion. Translate them into structured web completion rules. Parents cannot manually mark chapters/challenges complete.

If a workbook requirement does not translate cleanly or its completion semantics are unclear, invoke the Ambiguity Stop Rule below.

## Practice mappings
Approved curriculum may be mapped into Practice Mode and recommendation tags. Practice use must not alter Journey progress unless the user is actually completing the Journey version of the activity.

Practice Again creates a new `practice`-context record and may feed trend analysis without changing the original completion/badge state.

## Recommendation mappings
Create structured mappings/tags so approved curriculum can be recommended for recognized confidence/mindset needs. AI may select/explain these mappings but cannot create new curriculum.

## Ambiguity Stop Rule
If any curriculum, asset, requirement, mapping, completion rule, or intended behavior is genuinely incomplete or ambiguous:

**Stop that portion of work and ask the user one specific clarification question.**

Do not:
- guess
- silently choose an interpretation
- silently “improve” content
- invent missing curriculum
- insert fake placeholders to conceal the issue
- implement an assumption merely to keep moving

Continue unrelated work when possible.

A clarification request should concisely state:
1. what is ambiguous;
2. which source material conflicts or is missing;
3. exactly what decision is needed.

Do not ask the user to reconfirm decisions already clearly documented.

## Migration validation
Maintain a concise migration inventory/checklist so every approved curriculum component can be accounted for without relying on chat history. Validate that the structured app content maps back to the authoritative workbook/source.

Before declaring migration complete, verify there are no silently skipped chapters, exercises, challenges, journal sections, Parent Dugout sections, oath material, or reusable approved content.
