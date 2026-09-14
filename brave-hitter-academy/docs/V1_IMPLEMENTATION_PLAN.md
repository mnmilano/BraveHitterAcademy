# V1 implementation audit and plan

## Audit (2026-09-13)

- Canonical workbook: 162 pages, correct 792 x 612-point geometry, final preflight PASS. Pages 14-20 and 157-162 have explicit approval; all remaining pages are produced and QC-passed but approval-pending.
- Curriculum authority is complete across 12 chapters, 13 front-matter pages, 6 toolkit pages, 12 weekly missions plus divider, 20 repeated game-journal pairs, and 6 graduation pages.
- Approved reusable visual system includes the crest, Coach Mark, four player-character poses, four environments, and five decorations. Chapter 1 story art is approved; Chapters 2-12 story-part-2 art is review-status only.
- Repository initially contained no web application, package manifest, database schema, automated app tests, deployment configuration, or environment template.

## Delivery sequence

1. Foundation: Next.js, TypeScript, Tailwind, responsive/PWA shell, environment contract.
2. Content: typed IDs and source mapping for every canonical curriculum component; automated coverage inventory.
3. Data/security: Supabase schema, complete RLS, Parent PIN, consent, family isolation, edit windows, export/deletion, admin privacy projection.
4. Product flows: onboarding, multi-player dashboard, Journey, Practice isolation, challenges/badges, teams/seasons/games/ICS, game check-ins, journal, Parent Dugout, reminders, Coach Mark.
5. Intelligence: deterministic signals plus incremental AI adapter; every recommendation constrained to a canonical ID.
6. Release: lint, typecheck, tests, build, migration verification, Vercel deployment, production smoke test.

## Current release gates

- Obtain explicit visual approval for workbook pages 1-13 and 21-156 before treating their visual designs as release-approved.
- Supply/link Supabase, Resend, AI-provider, and Vercel environment credentials for cloud persistence, emails, AI, deployment, and production smoke testing.
