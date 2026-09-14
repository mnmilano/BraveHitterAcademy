# Brave Hitter Academy — V1 Product Specification

## Purpose
Brave Hitter Academy is a parent-and-child baseball confidence and mental-toughness experience, primarily for players ages 7–10. It develops confidence, willingness to swing, resilience after mistakes, constructive self-talk, and readiness for faster pitching.

It is not a baseball performance/statistics product. Do not add batting average, hits, strikeouts, exit velocity, rankings, leaderboards, or similar performance tracking.

## Product model
- Parent and child use the product together.
- One family account may contain multiple player profiles.
- Each player has independent Journey progress, reflections, challenges, badges, Practice activity, games, journals, Parent Dugout entries, recommendations, teams, seasons, and calendars.
- Player switching is one-tap and does not require a PIN.
- V1 has one shared player dashboard rather than separate parent/kid modes.

## Dashboard
Primary CTA: **Continue Your Journey**.

Default recommendation: next unfinished chapter. A timely action may override it, such as an upcoming pre-game check-in, post-game reflection, or relevant Coach Mark recommendation.

Suggested hierarchy:
1. Continue Your Journey / most timely action
2. Upcoming game or check-in
3. Coach Mark guidance
4. Challenges/progress
5. Recent activity

Do not show confidence graphs or analytical scorecards on the shared dashboard.

## Academy Journey
- Chapters have a recommended order but are not hard-locked.
- Families may jump when needed.
- Progress should be deliberate, not optimized for rapid completion.
- After a chapter, Coach Mark should encourage applying the lesson in real baseball before moving on.
- No artificial waiting periods, cooldowns, or minimum days between chapters. Trust parents to judge readiness.
- Avoid binge mechanics, XP, aggressive streak pressure, and automatic pushes into the next chapter.
- Workbook requirements define chapter completion. Completion occurs automatically when required actions are finished; parents cannot manually force completion.

## Completion and badges
Every completed chapter or qualifying challenge earns a badge. V1 uses a cohesive reusable badge template/system rather than unique custom artwork for every badge.

Celebrations are restrained: subtle badge reveal/movement plus a brief Coach Mark message reinforcing what was learned or practiced. No confetti, XP, or points.

## Practice Mode
Practice Mode is separate from Journey progress and contains:
- **Recommended for [Player]** — Coach Mark/system recommendations.
- **Browse the Academy** — family-controlled browsing.

Coach Mark may recommend material from chapters the player has not formally reached. Using future material in Practice Mode must not start, advance, or complete that Journey chapter.

For relevant curriculum offer:
- **Review** — revisit content with no progress/data changes.
- **Practice Again** — repeat the activity and save a new reflection without changing original chapter completion or awarding duplicate chapter badges.

Practice Again records feed trend analysis and are explicitly tagged with `practice` context.

## Challenges
Support both on-screen and real-world/off-screen challenges, including multi-day or multi-game challenges. Incremental progress may be recorded and the challenge completes automatically at the curriculum-defined target.

Example: tracking intentional “Brave Swings” as a mindset challenge. This is not baseball statistical performance tracking.

Parents cannot manually force challenge completion.

## Coach Mark
Coach Mark is the ongoing Academy guide. Use him selectively for onboarding, chapter introductions, activity guidance, game-day thoughts, recommendations, Practice Mode, and completion moments. He should feel present without becoming an intrusive mascot.

The existing Gio illustration is the default visual player character in V1, but application text must use the actual player first name/nickname. Internally use a generic concept such as `player-character`; do not couple logic to “Gio.” Future avatar customization should remain possible but is out of V1 scope.

## Parent observations and Coach Mark conversation
Parent Dugout allows structured observations/themes plus optional free text. These observations may feed recommendations from day one.

V1 includes a Parent-PIN-protected, parent-only Coach Mark conversation. It is constrained to Brave Hitter confidence/mindset needs and approved curriculum. It is not a general-purpose chatbot. Children do not receive open-ended AI chat in V1.

Coach Mark may interpret player signals, discuss what the parent is seeing, and recommend approved Academy material. He may not invent curriculum, exercises, training, or unrelated advice.

Conversation retention is limited. Preserve useful structured takeaways/recommendations, not an ever-growing permanent transcript.

## Teams, seasons, calendars, and games
A player may have multiple active teams/seasons/calendars.

V1 supports:
- manual game entry;
- `.ics` calendar import/subscription where practical.

Direct Google/Apple Calendar OAuth is out of V1 scope.

Each scheduled game is a persistent record. Tie its pre-game check-in, post-game player reflection, and Parent Dugout entry to that game permanently. Standalone reflections without a scheduled game are also allowed.

## Pre-game
Adapt the approved workbook “Before the Game” experience, including the approved equivalent of:
- How do I feel? rating
- Coach Mark thought/quote
- Today’s Goal
- Brave Hitter Thought

For goals/thoughts, show a small recommended curriculum-based set plus **See All**. Recommendations must come from approved content.

## Post-game and Parent Dugout
Post-game includes player reflection and Parent Dugout observation. Do not ask for baseball performance statistics.

- Player reflection: editable for 24 hours after submission, then read-only.
- Parent Dugout: editable for 7 days.
- Preserve created and updated timestamps.

## Journal
Each player has a Journal archive browsable chronologically and filterable by season. Full-text search is not required in V1. Parent-only portions remain PIN protected.

## Reminders
Email only in V1; no push notifications.

Defaults:
- pre-game: one email about 24 hours before first pitch;
- post-game: one email about 4 hours after first pitch.

No nagging/follow-up reminders for an incomplete action. Parent can configure reminder timing per relevant player/team/calendar context behind the Parent PIN. Emails may identify player first name/nickname, team, game time, and relevant check-in, while avoiding unnecessary private content.

## Season Mode
After the main curriculum is completed, transition naturally into Season Mode centered on game-day check-ins, reflections, Parent Dugout, Practice Mode, challenges, Coach Mark recommendations, and revisiting curriculum.

No payment restriction in V1, but Season Mode is a likely future ongoing-access/storage entitlement.

## Onboarding
1. Create parent/family account.
2. Verify parent email.
3. Accept parent/guardian confirmation, Terms, and Privacy.
4. Create Parent PIN.
5. Create first player.
6. Optionally create team/season.
7. Optionally add/import calendar.
8. Enter player dashboard.
9. Coach Mark welcomes family/player.
10. Present first recommended chapter.

Calendar setup is optional and must not block onboarding.

## Visual/interaction design
- Mobile-first responsive web app; excellent on phone/tablet and functional/polished on desktop.
- PWA-ready; full offline support is not required.
- Preserve Brave Hitter red/black/cream/white identity using theme/design tokens.
- No Cincinnati Reds/MLB branding.
- Restrained motion only: subtle character reactions, transitions, badge reveals. No confetti.
- Read-only chapter stories in V1; no “Read to Me.”
- Polished interactive academy, not a game or digitized PDF.
- Reward reflection/engagement, not speed.

## V1 scope exclusions
Do not add payments, CMS, native apps, push notifications, full offline mode, avatar builder, coach portal, social feeds/comments/friends/likes/messaging, direct Google/Apple calendar OAuth, baseball performance statistics, or child AI chat.

## Launch/access
No invite codes or allowlist. Anyone who has the URL may sign up. Initial practical access is controlled by limited URL sharing.

## Quality bar
V1 is launch-quality: polished responsive UI, accessibility basics, intentional loading/empty/error states, real persistent data flows, automated protection of critical workflows, and no obvious placeholder UI.
