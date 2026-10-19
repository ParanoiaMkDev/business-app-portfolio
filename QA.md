# Verification — 2026-10-19

## Automated

Independent focused Node model suite: **7 passed, 0 failed**, process exit0. See TEST-NOTES.md for the behaviors. This is a separate portfolio project; no Marketday tests/services/data were used. Lead syntax checks for demo.mjs and portfolio.mjs passed. Preview readiness returned HTTP200; the initial preview root-path separator bug was fixed before browser acceptance.

## Actual Brave browser acceptance

Local preview at127.0.0.1:4173, through the connected browser extension:

- Portfolio rendered its hero/project previews. Local inquiry dialog generated the entered fictional business summary, without sending it anywhere.
- Bodega: selected two rice packages, confirmation showed C$184; registration reduced stock24→22, search matched rice, and reload retained22. A stock adjustment+3 produced25. Inventory and sale/POS screens rendered.
- Turno: attempted09:00 for Valeria against an existing appointment; actual error refused the overlap. Changing to11:00 created the appointment with the entered note; agenda count increased4→5.
- Trazo: quotation2×C$2,400 +C$800 =C$5,600, discount10%=C$560, totalC$5,040; saved, marked sent with explicit no-email notice, accepted into one linked order and advanced to En producción.
- Customer dialog added a fictional customer, count3→4. Reset restored3. Reset on Bodega and Turno also restored their initial samples. These were all local synthetic demo changes; published-site origins start independently with their own initial data.
- Phone viewport390×844: all four pages measured no document-level horizontal overflow. Trazo order cards stacked; Turno agenda/navigation fit; appointment dialog stayed inside the viewport with scroll support; Bodega catalog/cart stacked. Portfolio heading measured43px inside a339px-wide hero content area and all3 projects remained present.
- Desktop screenshots inspected for portfolio, inventory and order tracking; phone order-card screenshot inspected. The browser screenshot backend produced an anomalously scaled landing-page capture after navigation despite correct DOM geometry/scale, so full visual phone-landing screenshot acceptance is limited to geometry inspection, not claimed pixel-perfect.
- The initial visible skip-link on demo pages was corrected by the styling owner. A strict duplicate-label browser locator was narrowed to the confirmation dialog; no production change was needed for that testing selection.
- Temporary viewport override was reset. Captured browser error logs returned an empty array.

Scope is a representative interactive prototype check, not exhaustive testing of every browser, field, download or altered localStorage value. No production security/authentication/payment guarantees: these apps deliberately have no backend. Quotation summary download code exists but was not exercised in browser acceptance. Clipboard-copy fallback was source-reviewed; local inquiry summary generation was exercised. Initial data and per-demo reset/persistence were exercised as described.

## Publication

Repository target: https://github.com/ParanoiaMkDev/business-app-portfolio . Static GitHub Pages publishing uses main/root and relative assets/hash navigation. Credentials are supplied by existing Git Credential Manager and never included in source, shell arguments or logs. No Marketday files, receipt data, Firebase credentials or local private artifacts are part of this repository.

Initial application commit `211c17c68d7a9ad53c44444d7ec47b35b3ad93e6` was pushed to the new public repository. GitHub Pages was enabled with main/root; native status and latest build both returned **built**, no build error, for that exact commit.

Public URL: https://paranoiamkdev.github.io/business-app-portfolio/ . Actual Brave navigation verified the live landing page, all three demo links with the correct project-path prefix, all three app modules rendering their expected headings/four navigation sections/demo notices, and working back-to-portfolio links. Browser error logs were empty. The deliverable browser tab was left on the public portfolio; temporary viewport override was reset. Local preview server was stopped after verification. This publication note is a documentation-only follow-up to the application commit; no application files changed after the accepted build.
