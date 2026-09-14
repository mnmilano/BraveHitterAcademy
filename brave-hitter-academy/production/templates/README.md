# Brave Hitter Academy deterministic templates

## Locked production stack

- Canvas: 3300 × 2550 pixels (11 × 8.5 inches at 300 PPI)
- PDF page: 792 × 612 points
- Display font: Oswald static TTF (SIL Open Font License)
- Body font: Source Sans 3 static TTF (SIL Open Font License)
- Editable source: SVG
- Proof render: PNG via resvg
- Print artifact: visually matched 300-PPI PDF via PDFKit

## Chapter 1 gate

Run from this directory:

```sh
npm run production:chapter1
```

The command rebuilds seven SVG pages, renders seven 300-PPI PNG proofs and a visually identical seven-page PDF, then validates page families, geometry, assets, prohibited text, staging dependencies, and output counts. The SVG files preserve editable real typeset text; the PDF embeds the validated page renders to prevent renderer-specific clipping/filter drift.

Production outputs live under `../pages/chapter-01/`. Approved visual masters under `../../references/chapter-1/` are never overwritten by the build.
