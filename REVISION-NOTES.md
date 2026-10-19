# Portfolio revision — 2026-10-19

## Requested changes

- Replaced visible Bodega/Turno/Trazo branding with the three descriptive Spanish system names. Stable routes and browser-local data keys remain unchanged.
- Retained page/navigation structure and demo business behavior; refined the visual system to restrained neutral/navy, finer borders, modest corners, straight previews and direct headings rather than marketing slogans.
- Rewrote landing descriptions around actual tasks and intended small-business audiences.
- Explained the orders example as a fictional sign/print workshop, not a generic online store: quotation lines and discount → acceptance creates one linked job → pending/production/ready/delivered. This is original code, not a copied repository app. No real email, payment, delivery integration or invoice functionality is claimed.
- Added an optional five-step guided tutorial to each demo, launched from Ayuda. UI-only navigation and highlighting; no create/update/reset actions, no backend, tracking or dependencies. Escape/Close and previous/next controls; focus restored to Help, viewport-bounded placement.

## Verification

- Module syntax, 20 static HTML references and all 7 existing focused business-model tests passed (`npm run check`). Pure model source unchanged.
- Actual Brave desktop inspection: landing and orders dashboard, full names and workshop workflow guide; existing app entry pages render with new titles.
- Actual 390×844 phone preview: all three tutorials launched, navigated to their three relevant business screens, and orders tutorial completed. Inventory tutorial Escape dismissal cleared target highlight and returned focus to Ayuda.
- Corrected tutorial phone width using actual document clientWidth (scrollbar-aware): measured available width375, dialog left12/right363. Services step measured top448/bottom688 inside844 height. Four pages showed no document-level horizontal overflow during these checks. Phone table contents may scroll within their own containers.
- Tutorials did not submit any record forms or invoke reset. Existing data storage/routes and core business actions remain unchanged. No claims of exhaustive browser or accessibility testing.
- Historical QA.md/TEST-NOTES.md retain original-build evidence; this note describes only this revision. Deployment result is reported separately after GitHub push/build verification.
