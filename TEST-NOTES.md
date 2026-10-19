# Model verification

Ran `node --test tests/model.test.mjs` against the actual `assets/model.mjs` on 2026-10-19. Result: 7 tests passed, 0 failed, 0 skipped; process exit code 0.

Covered sale totals and stock changes, immutable source state, oversell/duplicate/empty-cart refusal; negative stock adjustments through zero and integer/upper/lower bounds; appointment conflicts by staff/date, adjacency on both sides, and cancelled appointments; quotation discounts, fractional-quantity and discount cent rounding, and invalid inputs; accepted quotation/order links and duplicate refusal; every seeded sale total; decimal price parsing and accent normalization.

No model defects were found in these covered behaviors. This is a focused model suite, not exhaustive validation or an inherited Marketday baseline. DOM interactions, browser storage, phone/desktop layouts, accessibility, and publishing were not tested here and remain Lead-owned. No browser, server, dependencies, Git operations, or cloud operations were used.

Changed files: `tests/model.test.mjs` and `TEST-NOTES.md` only. Production model and other owners' files were not edited.
