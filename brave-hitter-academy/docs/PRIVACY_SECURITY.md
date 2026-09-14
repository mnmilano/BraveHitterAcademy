# Brave Hitter Academy — V1 Privacy & Security Rules

## Core principle
This product involves children. Collect the minimum information required and enforce privacy/authorization in the data layer and server-side logic, not merely through hidden UI.

## Data minimization
Parent/family may require:
- verified parent email
- authentication credentials
- optional family name

Player may require:
- first name or nickname
- age
- optional team/season/calendar information

Do not require child last name, exact DOB, address, school, player photo, or other unnecessary identifying data. No player photo uploads in V1.

## Parent/guardian consent
Before a child/player profile can be created, require the adult to confirm parent/guardian/authorized-adult status and accept current Terms and Privacy Policy. Store an auditable consent record with appropriate timestamp and document/version references.

## Parent PIN
Parent PIN is separate from account authentication and protects parent/admin-within-family functions including:
- Parent Dugout
- parent Coach Mark conversation
- player/profile management
- team/season/calendar management
- reminder settings
- export/delete
- other parent-only settings

Do not store the PIN in plaintext. Never display/recover the existing PIN. A forgotten PIN is reset through verified parent account/email recovery.

## Family isolation
One family must never be able to access another family's data. Use proper Supabase row-level security plus server-side authorization and tests. Do not depend on client-side filtering.

## Parent visibility
Parents may see their own player's reflections and submitted content because the product is designed for parent/child use together.

## Admin privacy boundary
Application administrators must not have normal admin-interface access to private submitted content, including:
- child/player reflection text
- Parent Dugout text
- private journal text
- private confidence ratings
- equivalent private submitted reflection content

This boundary must be enforced architecturally, not merely by omitting fields from a screen. Admin may access only the operational/account metadata necessary for administration, support, usage, configuration, and system health.

## Journals and edit windows
- Player post-game reflection: editable for 24 hours after submission, then read-only.
- Parent Dugout: editable for 7 days.
- Preserve created and updated timestamps.
- Parent-only portions remain PIN protected.

## Export and deletion
Provide self-service, appropriately authenticated/PIN-protected ability to:
- export one player's data
- permanently delete one player's data
- export family account data
- permanently delete the family account

Deletion should intentionally handle dependent records and be documented/tested. Destructive operations should require appropriate reconfirmation.

## AI/privacy
AI processing is limited to Brave Hitter baseball confidence/mindset use cases. Analyze new relevant free-text entries incrementally rather than sending full histories repeatedly. Store compact structured signals/summaries for later use.

Do not build permanent ever-growing Coach Mark chat memory. Use limited raw transcript retention and structured takeaways. Document the retention design.

AI is not a general-purpose child chatbot and must not expand into mental-health counseling or unrelated life advice.

## Email privacy
Use email for game reminders and meaningful parent insights. Avoid unnecessary private child text in emails. Do not generate excessive notifications.

## Free-text scope
V1 treats submitted free text as baseball confidence/mindset content. A broad child-safety/content-classification system is not part of V1 unless a platform requirement makes it necessary. Do not silently expand product scope.

## Authentication and secrets
Use Supabase authentication appropriately. Keep secrets out of source control. Provide `.env.example`/equivalent with names only. Enforce privileged/admin operations server-side.

## Accessibility and child usability
Use semantic markup, keyboard support, sufficient contrast, clear labels/focus states, reasonable screen-reader behavior, reduced-motion consideration, readable typography, and large touch targets.
