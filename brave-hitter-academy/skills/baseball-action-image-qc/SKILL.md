---
---
name: "baseball-action-image-qc"
description: "Generate or review baseball action art; enforces handedness, field geometry, mechanics, and realistic ball direction."
---

# Baseball Action Image QC

## Procedure

1. Read the project's character and asset rules, then record each player's required batting side, throwing arm, glove hand, uniform, number, and identity markers; finish when every depicted player has explicit invariants.
2. Define the camera viewpoint, home plate, batter's boxes, mound, foul lines, bases, and intended ball path before generating action art; finish when the scene can be checked without guessing orientation.
3. Generate one text-free action composition while restating the handedness, grip, stance, footwork, rotation, equipment, field geometry, and ball-direction invariants; finish when one reviewable candidate exists outside canonical paths.
4. Inspect the candidate as a real baseball play: verify batter's-box side, hand order on the bat, lead/rear foot behavior, hip and shoulder rotation, bat path, plate and foul-line geometry, and ball movement into plausible fair or foul territory; for throws, verify glove on the non-throwing hand and a coherent throwing-arm path. Also verify that the player's gaze, attention, and body language match the depicted field role: a batter inside the box must attend to the pitcher, while a player looking toward the dugout or teammates belongs in foul territory or the on-deck/dugout area, clearly separated from any active at-bat. When the scene requires no visible ball, also reject motion streaks, curved trails, or impact effects that imply an ambiguous or contradictory ball path; remove only that effect while preserving passing mechanics and composition. Reject mirrored, crossed-grip, spatial-role contradictions, directionally contradictory, or mechanically impossible action.
5. Verify identity details and asset isolation before layout: confirm the uniform number is legible and located on the jersey rather than a wrist, limb, or equipment, and inspect caps, shoes, gloves, bats, and other apparel or equipment for invented letters, numerals, logos, or pseudo-text. Then inspect image metadata and a contrasting-background composite to confirm genuine alpha transparency instead of baked checkerboard pixels. Run a single-defect edit that preserves the approved pose when only a stray marking or isolation fails; finish when identity markers, all visible surfaces, and transparency pass.
6. Test the passing candidate inside its final crop or layout before promotion; adjust crop anchoring rather than mirroring the image when the correct handedness moves the player away from the prior focal point. When one crop cannot preserve every figure, keep the primary player's complete bat, hands, feet, stance, and mechanically relevant geometry visible before preserving a secondary distant player. Finish when the primary action remains complete and mechanically readable at final size.
7. Promote only a passing candidate, preserve the replaced version in staging, and record handedness and mechanics in provenance and page QC; finish when the canonical file and rebuild source reference the verified asset.
