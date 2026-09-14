# Brave Hitter Academy — Deterministic Template System

**Version:** Chapter system v1 — frozen 2026-09-04  
**Gate:** User approved; Chapters 2–12 may scale from these seven template families

## Locked output contract

- Editable page source: SVG at 3300 × 2550 pixels
- Print proof: PNG at 3300 × 2550 pixels (11 × 8.5 inches at 300 PPI)
- PDF page box: 792 × 612 points
- No printed page numbers or simulated binding
- Canonical production assets only; staging paths fail preflight
- Display type: Oswald Bold, SIL Open Font License
- Body type: Source Sans 3 Regular/Semibold/Bold, SIL Open Font License
- Palette, margins, page-family order, footer rhythm, and image-crop behavior follow `MASTER_TEMPLATE_ANALYSIS.md`

## Locked seven-page family order

1. Chapter Cover
2. Story — Part 1
3. Story — Part 2
4. What Gio Learned
5. Parent Dugout
6. Reflection Time
7. Key Takeaways

## Build contract

From `production/templates/` run:

```sh
npm run production:chapter1
```

Chapter 2 is the first scale-validation implementation:

```sh
npm run production:chapter2
```

It populates the frozen Chapter 1 geometry with structured Chapter 2 content, replaces only the declared chapter-specific Story Part 2 asset, and writes isolated outputs under `production/pages/chapter-02/`.

Chapter 3 follows the same isolated build contract through `npm run production:chapter3` and writes to `production/pages/chapter-03/`.

Chapter 4 follows the same isolated build contract through `npm run production:chapter4` and writes to `production/pages/chapter-04/`.

Chapter 5 follows the same isolated build contract through `npm run production:chapter5` and writes to `production/pages/chapter-05/`.

Chapter 6 follows the same isolated build contract through `npm run production:chapter6` and writes to `production/pages/chapter-06/`.

The command creates editable SVG pages, 300-PPI PNG proofs, a seven-page print PDF, and `preflight.json`. The approved visual references are never overwritten.

## Automated rejection checks

- Incorrect page-family count or order
- Incorrect SVG, PNG, or PDF geometry
- Missing declared asset or font
- Any production dependency under `production/staging/`
- Missing authoritative Chapter 1 text anchors
- Legacy names, prohibited branding, page-number strings, or binding language
- Missing page output or wrong PDF page count

## Manual visual rejection checks

- Character drift, malformed anatomy, incorrect #13, or inconsistent equipment
- Left-handed or mechanically incoherent Gio action
- Contradictory home-plate, field, or ball-direction geometry
- Crowded text, weak hierarchy, unusable writing space, or unintended clipping
- Renderer mismatch between the PNG proofs and PDF

## PDF construction decision

The PDF embeds the validated 3300 × 2550 page proofs at exact 792 × 612-point page size. This intentionally prevents SVG filter, clipping-path, and image-compositing differences across PDF renderers. Editable real-typeset SVG sources remain the production source of record.
