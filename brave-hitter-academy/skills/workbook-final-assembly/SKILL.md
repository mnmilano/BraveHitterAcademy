---
---
name: "workbook-final-assembly"
description: "Compile or recompile an approved workbook; validates locked section PDFs, assembles canonical order, and records final preflight integrity."
---

# Workbook Final Assembly

## Procedure

1. From the project root, read `docs/CANONICAL.md`, `state/production-state.json`, and `QC_POLICY.md`; open section/page QC evidence only for the inputs being assembled. Identify section order, counts, geometry, and approval gate, completing this step only when every input requirement is explicit.
2. Resolve stale summary entries against the most recent detailed QC proof in the canonical logs; update only clearly superseded status text, and stop for any unresolved approval, missing section artifact, or contradictory evidence.
3. Inventory the locked section PDFs and their preflight records; verify every required section exists and every recorded preflight status is `PASS`, completing this step only when the full canonical sequence is available.
4. Assemble by copying pages directly from the approved section PDFs in canonical order without scaling, rerendering, or recomposing content; reject a source whose page count or page geometry differs from the contract.
5. Save the final PDF, reopen it, and verify the exact total page count plus every page’s required dimensions; fail the build if serialization, count, or geometry validation fails.
6. Write a machine-readable manifest containing generation time, output path, total pages, geometry, section page ranges, source hashes, and final SHA-256 hash; complete this step only when the manifest matches the saved artifact.
7. Write the canonical final preflight report with section arithmetic, count and geometry results, source-copy method, integrity hash, and disposition; preserve existing section-level visual QC as the visual evidence because direct PDF page copying does not alter approved content.
8. Verify the final artifact’s existence, file size, SHA-256 value, reopened metadata, page count, and geometry, then report the artifact, preflight report, manifest, and hash.

## Compressed Distribution Copy

9. When a smaller delivery PDF is requested, retain the assembled master unchanged and write a distinctly named sibling artifact, completing this step only when the master hash still matches its recorded value.
10. Prefer a dedicated PDF optimizer when available; for an image-heavy workbook without one, render each page at 144 DPI onto white and encode it as JPEG at quality 0.82 while recreating the original PDF media box, completing this step only when the size falls materially without changing page order or dimensions.
11. Reopen the compressed PDF and verify the exact page count and required geometry on every page; render and visually inspect samples from the beginning, middle, and end for orientation, clipping, blank pages, gross artifacts, and text readability.
12. Record source and compressed byte sizes, percentage reduction, method, resolution, quality, both SHA-256 hashes, geometry results, sampled pages, and disposition in a separate manifest and compressed preflight report; label the compressed file for distribution and the unchanged original for archival, maximum print fidelity, and selectable text.
