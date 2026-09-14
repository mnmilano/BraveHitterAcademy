# Brave Hitter Academy — Asset Provenance

**Recorded:** 2026-09-03  
**Repair method:** OpenAI built-in image-generation editing, one controlled asset at a time  
**Promotion rule:** candidates were visually inspected, checked for required dimensions/alpha, and promoted only after passing the named repair gate

## Preservation policy

- Canonical Gio and Coach Mark files were verified and retained without further regeneration during this repair pass.
- Every replaced canonical file has its prior version preserved under `production/staging/originals/assets/`.
- Every promoted generated file is also retained under `production/staging/asset-repairs/`.
- Generated-image cache copies remain in the agent's generated-image store; canonical project paths below control production use.

## Canonical inventory and SHA-256

| Asset | Canonical SHA-256 | Action |
|---|---|---|
| `assets/brand/crest.png` | `07d3bb963afe9ac3426c951f46671d8474fb9235b24f09db9f1139f279d2c3cf` | Background extraction; preserved crest wording/design; checkerboard removed |
| `assets/gio/gio_canonical.png` | `fc03f4aa2b8e5e76cd0883f7ede092b3473f89ccdbbaff55df1a9553fbc91b69` | Previously repaired and promoted; verified and retained |
| `assets/coach-mark/coach_mark_canonical.png` | `724ed2f40ec93493de7a301bf05ebf836dd88c7b993d2d0fd3a2e52330748be6` | Previously repaired and promoted; verified and retained |
| `assets/environments/evening_stadium.png` | `9d05e2875904133df2c18e7ed4d2d962e1389b22b2667af838af65b8fbd0a258` | Removed only center-field `400` marking |
| `assets/environments/daytime_field.png` | `cb6d8955a5130041a311e48e70b3a0b907a6b7d8a2929b3211582ff97d17f3dc` | Removed only center-field `400` marking |
| `assets/environments/dugout_interior.png` | `5aa505b8db776960ebc2581f45cd5248dd5fcf73a9c3206204980f8f091f9b59` | Removed only wall shield/Academy signage |
| `assets/environments/sunset_batting_cage.png` | `65fef29fc1e97548a071254f7f23d470afbe4b8a6828c7fe34a78f6fc42cac33` | Removed only wall `400` and bucket shield/logo |
| `assets/decorations/redbrush.png` | `91d39d4ea41bbfa6704efbb5f02a817c76d007f8e3d57a737b7f95ff300f13ea` | Existing clean transparent asset retained |
| `assets/decorations/blackbrush.png` | `6202f78c3f547ae6dbbe3b7de913513d2ab3e69a8974052c9dc3e2cf05bce0f1` | Background extraction; checkerboard removed |
| `assets/decorations/halftone.png` | `c74e5c3af7dc993f2a9684882fe9919650b0f6ea3abc8a7d576c4b3230e45c2b` | Background extraction; checkerboard removed |
| `assets/decorations/dirt.png` | `242cd2d5197898ebedbdb4c4728ea5a9f9780a3a9889f3394dd810047f903d07` | Background extraction; checkerboard removed |
| `assets/decorations/burst.png` | `f9e84f11d86c39e7dc8b66bcff06fd491ef1a222d9b51a8329755ca6204f87d8` | Background extraction; checkerboard removed |

## Repair-prompt invariants

### Background extraction

For the crest and four contaminated decorations, the edit removed only the baked checkerboard while preserving the complete existing subject, design, proportions, colors, texture, fine edges, and placement. Prompts required genuine transparent alpha with no box, checkerboard pixels, halo, new marks, text, logo, or watermark.

### Environment edits

Each environment edit removed only the named prohibited marking and reconstructed the underlying surface naturally. Prompts locked the empty baseball environment, geometry, viewpoint, lighting, colors, framing, and illustrated style and prohibited added text, numbers, signage, logos, branding, people, page furniture, watermarks, or new objects.

### Chapter 1 supporting illustrations

Two controlled raster illustrations were generated for deterministic page assembly and retained under `production/staging/chapter-1-art/`:

| Candidate | Purpose | Prompt invariants |
|---|---|---|
| `story_part_1_candidate_01.png` | Gio nervous but ready at the plate in an evening stadium | Canonical eight-year-old Gio; red uniform and exact #13; coherent batting pose/equipment; no text, signage, logos, page furniture, or final copy |
| `story_part_2_candidate_01.png` | Gio making a committed Brave Swing and sending a hard ground ball into the infield | Canonical Gio and exact #13; hard-ground-ball action only; coherent anatomy/equipment; no claim that the play becomes a hit or run; no text, signage, logos, or page furniture |

The image model did not generate curriculum, body copy, page layout, or final multi-page artwork.

### Right-handed mechanics correction — 2026-09-03

The initial Chapter 1 batting illustrations were rejected after handedness review. They placed Gio on the viewer's right side of home plate in a behind-catcher view, making the action read as left-handed and causing an unnatural ball/field relationship.

The built-in image editor generated two replacement supporting illustrations:

| Passing candidate | SHA-256 | Required prompt geometry |
|---|---|---|
| `story_part_1_righty_candidate_02.png` | `2ccdee98f5fb62fd0b92bc4823b9d27d0a5f391d04345aa445ed0b4967b752e8` | Behind-catcher camera; Gio in viewer-left/third-base-side box; right-handed ready stance; left hand nearest knob, right hand above; coherent plate, boxes, foul lines, and mound |
| `story_part_2_righty_candidate_02.png` | `61f25fce37a8f08f6be0d2de52fa8d7cec4d9f8bf1577cc02b34959b13270809` | Same field orientation; left/front foot planted, right/rear foot pivoted; natural right-handed follow-through; hard ground ball moving forward into fair territory toward shortstop |

Both prompts locked Gio's identity, age, uniform, #13, style, complete anatomy/equipment, empty field, and prohibition on text/logos. The generator's story-image crop was anchored to the left edge so the mechanically correct batter remains visible without changing page-family structure.

## Chapter 1 master construction

- Editable SVG masters are stored at `production/chapter-1-masters/source/`.
- Raster review/export masters are stored at `production/chapter-1-masters/png/`.
- The deterministic generator is `production/templates/chapter1/build_chapter1.mjs`.
- The seven passing raster masters were promoted to `references/chapter-1/`.
- The seven superseded flattened references were preserved at `production/staging/originals/references/chapter-1/`.
- Redundant intermediate renderer outputs were archived at `production/staging/render-redundancies/` and are excluded from production inputs.

| Active Chapter 1 master | SHA-256 |
|---|---|
| `references/chapter-1/Chapter_1_Page_1.png` | `7c1fc731b9049fc4b8fa96706f5ea414dab472976885017a4ed1f70f081594d5` |
| `references/chapter-1/Chapter_1_Page_2.png` | `3251a04a855fbc190ec2a9b85ff2d2b32a6f6fe498438a389daf5ab68eba77bd` |
| `references/chapter-1/Chapter_1_Page_3.png` | `d8dd398a203c829b97a4b83ae94ade5eea9d4d61a673207f7b8db54f19611ac1` |
| `references/chapter-1/Chapter_1_Page_4.png` | `64bdd21a50e6c05d3cd92320c3cfebbc85d5dc93ec910e6ed0cd00026202ccf8` |
| `references/chapter-1/Chapter_1_Page_5.png` | `01a0c212df56d4e8be756c73cd37e96c720eb8b534e357dfafd28634f0db9eb5` |
| `references/chapter-1/Chapter_1_Page_6.png` | `b93889f840d6011ca9999f48a68699e586655faf2b2b906cc770de8735fa3e89` |
| `references/chapter-1/Chapter_1_Page_7.png` | `957ba89b4c8235880cc97bf7d66b089455d044b66a6d26f3a79a2e4d6994205a` |

## Chapter 2 supporting illustration — 2026-09-04

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-2/story_part_2.png` | `5e1bd602be29f5bffdc157786c3c7077eab6b4cef80c0302c069bdc0984ec81d` | 1426 × 1103 RGB PNG; canonical Gio #13; right-handed batter in the third-base-side box; left hand below right hand; coherent stride, rotation, bat path, and follow-through; no visible ball, flight trail, text, signage, logo, or watermark |

The first built-in image-generation candidate was rejected because it included a curved ball-flight trail. A single-change edit removed only that trail while preserving the passing identity, mechanics, field geometry, and composition. The accepted result was copied into the canonical project path before layout use.

## Chapter 3 supporting illustration — 2026-09-04

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-3/story_part_2.png` | `bb6bda9dd1ba5ff6773e0929a1a92f88ef9b7cffec5ac062e1871f7e891fe5ee` | 1426 × 1103 RGB PNG; canonical Gio #13; direct behind-catcher geometry; Gio in the viewer-left/third-base-side box; conventional right-handed grip and balanced load; one airborne pitch on a straight pitcher-to-plate path; natural pitcher delivery; no text, signage, logo, or watermark |

The accepted asset was generated once with the built-in image tool using the canonical Gio and approved Chapter 1 action style as references. It passed identity, mechanics, ball-path, anatomy, field-geometry, and final-layout-crop review before promotion.

## Chapter 4 supporting illustration — 2026-09-04

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-4/story_part_2.png` | `f0132059c86aaac8f10c9e1e11be70ccd5b358250c054af9c451da43cb79ce5c` | 1427 × 1102 RGB PNG; canonical Gio #13; calm right-handed reset stance in the viewer-left/third-base-side box; left hand below right hand; both feet inside chalk; stationary pitcher on mound; no visible ball, trail, text, signage, logo, or watermark |

The built-in image-generation result passed identity, mechanics, anatomy, field-geometry, and story-fit review. Final crop testing prioritized keeping Gio’s complete bat, stance, and feet readable; the distant stationary pitcher is secondary at the far-right page edge.

## Chapter 5 supporting illustration — 2026-09-04

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-5/story_part_2.png` | `e0bf1a95ddbf37c5959d348a4ca05ab03f772470297ada6a58dc485400e948c1` | 1427 × 1102 RGB PNG; canonical Gio #13; balanced right-handed follow-through in the viewer-left/third-base-side box; coherent home-plate geometry; no visible ball, trail, defender, text, signage, logo, or watermark |

The first built-in image-generation candidate was rejected because its visible ball and defender implied a viewer-right field outcome, conflicting with the authoritative left-fielder catch. A targeted edit removed only the ball, trail, and defender while preserving Gio, the right-handed action, and the field. The accepted result passed final-layout crop and baseball-mechanics review before promotion.

## Chapter 6 supporting illustration — 2026-09-04

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-6/story_part_2.png` | `2ddd667a97b19f96c504292074516ad5f2ef55dc2f5d8752d6a97c5fa7e7aaf3` | 1426 × 1103 RGB PNG; canonical Gio #13; calm ready position in the viewer-left/third-base-side box; conventional right-handed grip with left hand below right; both feet inside chalk; coherent home-plate and mound direction; no visible ball, trail, text, signage, logo, or watermark |

The accepted built-in image-generation result was conditioned on the canonical Gio asset and the approved Chapter 4 baseball-scene style. It passed identity, anatomy, right-handed mechanics, field-geometry, story-fit, and final-layout-crop review before promotion.

## Chapter 7 supporting illustration — 2026-09-06

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-7/story_part_2.png` | `9ea54def4fa0cad10e07c1760d57a6fcb8a597a00b353e4e0a3369702d3af8a0` | 1536 × 1024 RGB PNG; canonical Gio #13 encouraging one disappointed teammate in a youth dugout; natural supportive hand placement and anatomy; no batting/throwing action, visible ball, text, signage, professional branding, pseudo-text, or watermark |

The first built-in image-generation candidate was rejected because invented numeral-like markings appeared on the players' shoe tongues. A single-change edit removed only those markings while preserving Gio's identity, jersey #13, teammate interaction, anatomy, dugout, lighting, and composition. The accepted result passed identity, story-fit, final-layout-crop, and no-pseudo-text review before promotion.

## Chapter 8 supporting illustration — 2026-09-07

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-8/story_part_2.png` | `e9edaf8ba63a548b9e82084798091740c4fc624fd49819ddb0f54490bcfd0d7f` | 1536 × 1024 RGB PNG; canonical Gio #13 in the viewer-left/third-base-side box; balanced right-handed follow-through with left/front foot planted, right/rear foot released, coherent two-handed bat path, and complete bat/hands/feet; consistent plate, boxes, foul lines, and mound; no visible ball, trail, defender, result, text, signage, pseudo-text, logo, or watermark |

The built-in image-generation result was conditioned on the canonical Gio and approved Chapter 5 action-art references. The prompt defined a direct behind-catcher viewpoint and required a committed swing without depicting a result. It passed identity, anatomy, right-handed mechanics, field geometry, equipment-surface, story-fit, and final-layout-crop review before promotion.

## Chapter 9 supporting illustration — 2026-09-07

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-9/story_part_2.png` | `13014e85b4af36e9d433ee56c872e43983e8b5b14f4e8530ee348ea46ab88d3d` | 1536 × 1024 RGB PNG; canonical Gio #13 calmly waiting in foul territory beside the dugout/on-deck area; full bat, hands, and feet remain visible in the final crop; Gio stands completely outside all batter's-box chalk while a separate red-uniformed batter appears at the distant plate; pitcher and catcher remain blue; no visible ball, trail, swing, outcome, text, signage, pseudo-text, logo, or watermark |

The built-in image-generation result was conditioned on the prior Chapter 9 scene. A 2026-09-08 user-directed edit preserved Gio's calm pose while relocating him from the batter's box to foul territory beside the dugout, where his gaze is natural. A second targeted edit changed only the distant active batter's uniform from blue to red; Gio and the blue pitcher/catcher remained unchanged. It passed identity, anatomy, equipment, spatial-role, uniform-color, story-fit, and final-layout-crop review before promotion. Replaced versions are preserved under `production/staging/originals/chapter-9-user-feedback/`.

## Chapter 10 supporting illustration — 2026-09-08

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-10/story_part_2.png` | `a31080bef15255766a256dd23b694812f9ffb6c6b9b49abd880ae00f2f683cd3` | 1536 × 1024 RGB PNG; canonical Gio #13 in a balanced, alert infielder-ready stance; fielding glove correctly worn on his left hand for a right-handed thrower; complete hands, glove, and feet preserved in the final Page 3 crop; no visible ball, throw, motion trail, text, signage, pseudo-text, logo, or watermark |

The Chapter 10 supporting scene depicts recovery after an error rather than the error itself. It passed identity, anatomy, glove-hand, field-role, equipment-surface, story-fit, and final-layout-crop review before being recorded as the canonical Chapter 10 illustration. Rejected checkerboard-background fielding-pose candidates were not promoted and remain outside production inputs.

## Validation notes

## Chapter 11 supporting illustration — 2026-09-08

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-11/story_part_2.png` | `d8583fd37f3d6b030d0f13564901b02971c6f1d009aed14ea336fc956196cf1b` | 1536 × 1024 RGB PNG; canonical Gio #13 in the viewer-left/third-base-side batter’s box; conventional right-handed grip with left hand below right; balanced stance and complete bat/hands/feet; coherent plate/box/mound geometry; no visible ball, trail, pitcher, catcher, defender, text, signage, pseudo-text, logo, or watermark |

The first controlled generation was retained because the frozen Page 3 art window anchors the source image’s left side, preserving Gio’s complete mechanically correct stance in the final crop. A later composition-only candidate that moved Gio to the viewer-right box was rejected and remains outside production inputs.

## Chapter 12 supporting illustration — 2026-09-08

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-12/story_part_2.png` | `5798bf7907c29c5b93981c07b8d2356b045199fccc5c10c64ec108e51d33b285` | 1536 × 1024 RGB PNG; canonical Gio #13 calmly stepping from foul territory toward the field; complete natural hands, bat, and feet; outside all batter's-box chalk; no active swing, ball, trail, outcome, other people, text, signage, pseudo-text, logo, professional branding, or watermark |

The first controlled candidate was rejected because both cleats carried swoosh-like brand marks. A single-defect edit removed only those shoe markings while preserving Gio's identity, #13, pose, anatomy, bat, foul-territory placement, field geometry, warm lighting, and composition. The accepted result passed character, equipment-surface, spatial-role, story-fit, and final-layout-crop review before promotion. The rejected candidate remains in `production/staging/candidates/chapter-12/`.

- Alpha status was checked with macOS image metadata and white-background composites for difficult black/transparent assets.
- Character identity, clothing, jersey number, sunglasses, beard, anatomy, and isolation were visually inspected.
- Environment repairs were visually inspected for residual text, numbers, signage, logos, people, or unwanted added objects.
- Environment native resolution remains a documented use constraint; it was not concealed by metadata-only upscaling.

## Canonical Chapter 1 story art promotion — 2026-09-03

| Canonical production path | SHA-256 | Validation |
|---|---|---|
| `assets/story/chapter-1/story_part_1.png` | `36606888a08f72ddf0e7bc51c3de47b1bb41db47ce415dbd0e3c23be941d588b` | Gio #13; right-handed ready stance; both cleats fully inside the viewer-left/third-base-side batter's box; final layout crop verified |
| `assets/story/chapter-1/story_part_2.png` | `0ba4785b6dedc54d861ab22835007474d70d63fdfca9185e8825a38afc2146e4` | Gio #13; right-handed follow-through; visible ball removed; player, field geometry, and story copy preserved |

The current files are promotions of user-feedback repair candidates. Superseded canonical versions remain under `production/staging/originals/chapter-1-user-feedback/`; production templates reference only canonical asset paths.

## Chapter 1 user-feedback image revision — 2026-09-03

| Passing candidate | Built-in edit request | Final-crop result |
|---|---|---|
| `production/staging/candidates/chapter-1-user-feedback/story_part_1_batter_box_fixed.png` | Change only Gio's lower-body/ground placement so both cleats sit completely inside the viewer-left, third-base-side box; preserve behind-catcher geometry, right-handed grip/stance, identity, #13, field, and lighting | PASS — complete batter, box, plate, mound, and orientation remain mechanically readable in Page 2 |
| `production/staging/candidates/chapter-1-user-feedback/story_part_2_ball_removed.png` | Remove only the visible baseball and reconstruct the grass; preserve Gio's right-handed follow-through, #13, anatomy, bat, field, and framing | PASS — no baseball is visible in Page 3; the hard-ground-ball outcome remains stated in authoritative typeset copy |

Both edits used the OpenAI built-in image editor. No curriculum, body copy, page layout, or additional character art was generated.

## Distinct Gio pose set — 2026-09-04

Three page-specific Gio derivatives were created from `assets/gio/gio_canonical.png` with the OpenAI built-in image editor. The final pass for each asset removed the generated checkerboard and produced verified RGBA transparency. Rejected RGB/checkerboard candidates were not promoted. The two defective reflection variants with #13 on Gio's forearm were removed from the generated-image library on 2026-09-04 and retained only under `production/staging/rejected/gio-poses-2026-09-04/` for recoverability.

| Canonical production path | SHA-256 | Intended use | Validation |
|---|---|---|---|
| `assets/gio/gio_ready_righty.png` | `b813ce4560d7528318a7cbbc58632e9052f860cadc87780362b6fcfdc7221a27` | Chapter 1 Page 2 | Focused pre-at-bat pose; bat by right shoulder; coherent two-handed right-handed grip and stance; helmet, full bat/body, and exact jersey #13 visible; 1024 × 1536 RGBA |
| `assets/gio/gio_reflect.png` | `92a9daba7b04d342218ed6cf3602851900e68b4c60cb84498dc5531d9c1c7923` | Chapter 1 Page 6 | Thoughtful right-hand-at-chin pose; unobstructed exact jersey #13; natural hands/anatomy; 1024 × 1536 RGBA |
| `assets/gio/gio_celebrate.png` | `07cf7f905f59a737832dda9f5b2f5e288f4e4c5f129a99ed78e601ec43630f2c` | Chapter 1 Page 7 | Age-appropriate raised-right-fist celebration; exact jersey #13; natural hands/anatomy; 1024 × 1536 RGBA |

Prompt invariants for all three assets locked Gio's canonical face, age, proportions, skin tone, red Academy uniform, white pants with red piping, black/red cleats, exact #13, polished comic-sports style, complete uncropped anatomy, and prohibition on professional branding, pseudo-text, scenery, or added objects. The Page 2 prompt additionally locked right-handed grip and stance mechanics. Each final background-extraction prompt required genuine alpha and prohibited checkerboard pixels, white boxes, halos, or shadow rectangles.

Passing copies are retained under `production/staging/candidates/gio-poses-2026-09-04/`. The original canonical standing pose remains unchanged and continues to serve Page 1.
