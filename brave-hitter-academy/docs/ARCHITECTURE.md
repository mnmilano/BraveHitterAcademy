# Brave Hitter Academy — V1 Architecture

## Stack
Use:
- Next.js
- TypeScript
- Tailwind CSS
- Supabase for authentication, relational application data, authorization/data access, and persistent cloud data
- Resend for transactional/reminder email
- Markdown/MDX plus typed structured metadata for curriculum

Do not add a CMS or unnecessary vendors in V1.

## Hosting and portability
Deploy the initial V1 to the existing Vercel environment for testing. Treat Vercel as the hosting layer, not the application architecture. Avoid proprietary Vercel dependencies when a portable implementation is practical.

Keep Supabase responsible for auth/data, Resend for email, and curriculum in the repository so a later move to Vercel Pro or another commercial Next.js host is straightforward.

No payments in V1. Structure account/entitlement concepts so future paid Season Mode/long-term storage can be introduced without a major rewrite.

## Content architecture
Separate curriculum from application logic.

Use Markdown/MDX for human-readable narrative content such as stories, lesson explanations, and approved Coach Mark curriculum copy.

Use JSON and/or typed TypeScript configuration for structured concepts such as:
- chapter/activity IDs and order
- completion requirements
- challenge targets
- badge mappings
- recommendation tags/themes
- Practice Mode mappings
- recommended sequencing
- game-day goals/thoughts

Curriculum must be human-editable without rewriting application logic.

## Core data model principles
Model at minimum the concepts needed for:
- family/account
- player
- parent consent
- Parent PIN/security state
- team
- season
- calendar source/import
- game
- chapter/Journey progress
- curriculum activity completion
- challenge/progress
- badge award
- reflection/journal entry with source/context
- pre-game check-in
- post-game reflection
- Parent Dugout entry
- Practice Again record
- structured AI theme/signal
- compact player trend summary
- curriculum recommendation and rationale
- reminder configuration/delivery state
- admin role/account state
- future entitlement extension

Keep game records stable even if an imported calendar changes. Preserve historical journal associations.

## Trend and recommendation engine
Use a hybrid architecture.

Deterministic/rules-based logic detects inspectable structured patterns such as ratings, repeated selections, pre/post changes, challenge patterns, inactivity, recurring themes, and similar signals.

AI may analyze new written reflections incrementally for confidence/mindset themes such as hesitation, fear of mistakes, frustration, negative self-talk, resilience, confidence, and readiness against faster pitching.

Do not resend complete journal history for every analysis. Preferred flow:
1. analyze only the new relevant entry;
2. store compact structured themes/signals;
3. update compact aggregate summaries as needed;
4. use those structures for later recommendations/explanations.

Optimize for privacy, predictable cost, low token usage, and traceability.

## Curriculum recommendation guardrail
Every actionable recommendation must resolve to an existing approved curriculum object: chapter, exercise, challenge, thought, goal, Practice activity, or equivalent.

AI may interpret and explain; it may not invent new training/curriculum. Make recommendations traceable where practical, e.g. “based on the last three post-game check-ins.”

## Coach Mark parent conversation
The parent-only Coach Mark experience should retrieve only relevant compact player context and approved curriculum mappings. Do not treat the conversation transcript as permanent memory or continually replay full history.

Persist useful structured takeaways such as parent observation, identified theme, recommendation, and timestamp/context. Define and document a limited raw-chat retention approach.

## Reminder architecture
Use Resend for email reminders and meaningful parent trend/recommendation notifications. Prevent duplicate/nagging reminders. Keep reminder scheduling idempotent and testable. Avoid unnecessary email volume and unnecessary private child content in email.

## Admin
Admin lives inside the same application, e.g. `/admin`, with explicit role-based server-side authorization. Operational capabilities may include account/family management, limited support metadata, usage metrics, disabling accounts, system/error visibility, curriculum/recommendation configuration, and operational status.

Admin architecture must enforce the privacy boundary in `PRIVACY_SECURITY.md`.

## PWA/responsiveness
Build mobile-first and PWA-ready. Full offline support is out of scope. Use accessible, large interaction targets and readable typography appropriate for ages 7–10.

## Testing
Use unit/integration/end-to-end testing where appropriate, focused on behavior rather than test count. Critical coverage includes:
- auth/account creation
- consent
- Parent PIN protection
- player creation/switching
- chapter progress/completion
- Practice Mode isolation from Journey
- challenge completion
- game creation/import where testable
- pre/post game journals
- edit windows
- Parent Dugout authorization
- reminder scheduling/idempotency
- curriculum-only recommendation guardrail
- export/delete authorization
- admin authorization/privacy boundary

Before completion: lint, typecheck, tests, production build, migrations, and production smoke tests must pass.

## Developer operations
Provide reproducible Supabase migrations, indexes/constraints, environment-variable example without secrets, development fixtures/seed tooling clearly separated from production data, concise setup docs, and deployment docs.

Repository state is durable memory. Avoid giant persistent agent conversations and duplicated specifications. Read only relevant files for each task.
