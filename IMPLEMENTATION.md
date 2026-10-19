# Portfolio build brief

User approved a new separate static public portfolio + three functional demo apps, inspired by vCard/devportfolio/Tabler/SB Admin 2, not copied. Repo https://github.com/ParanoiaMkDev/business-app-portfolio.git. No Marketday edits or user/customer data. UI es-NI/C$. Fictional identities. No APIs/dependencies/backend/login. Buildless relative HTML/CSS/modules, GitHub Pages project-path compatible.

Lead owns main assets/demo.mjs, assets/model.mjs, landing files, repository/docs/publishing/preview/browser. Preserve concurrent-owner files. No Herdr control (current command environment HERDR_ENV absent). Built-in agents explicitly authorized by user; inherited automatic approval reviewer, no new terminal conversations.

## Styling agent

Create ONLY assets/demo.css and short DESIGN-NOTES.md. Read current portfolio.css for visual family (do not edit). Warm-light neutral with theme tokens blue for body[data-app=bodega], caramel for turno, forest for trazo. App fullheight sidebar230 + main widthfluid, airy organized business dashboard, max-width1480, phone responsive <=760 sidebar horizontal top menu/no overflow, content padding18. Native dialogs, usable44px touches, clear focus and status. No external assets/fonts/imports.

Lead's exact shared DOM/classes:
- body[data-app]; .demo-ribbon (global fictional/local data notice); .app-layout > aside.sidebar + div.workspace.
- .sidebar-brand .app-symbol + div > strong/small; .sidebar nav a.nav-item (.active) .nav-icon; .sidebar-bottom .back-link + .sidebar-footnote.
- .workspace > header.app-header (.header-breadcrumb strong/small, .header-actions .reset-button/.avatar); main#content.
- .page-heading > div (.eyebrow/h1/p) + .heading-actions; .button (.primary,.secondary,.danger,.small,.ghost), .icon-button; .page-tools .search-box input/.icon; .filter-tabs button.active.
- .kpi-grid > article.kpi (.kpi-icon,.kpi-label,.kpi-value,.kpi-note); .two-columns > section.panel; .panel-header h2/p + link/button; .panel-body; .chart .chart-column > .bar (.height CSS inline) + span; .chart-key; .subtle/.muted/.mono/.amount/.right/.nowrap/.positive/.negative.
- .table-wrap > table (thead/th/td), td .cell-primary (optional .product-thumb.tone-[sand,brown,gold,blue,green,peach,aqua,purple] with singleletter), .cell-title strong/small; .status (.green,.amber,.blue,.gray,.purple); .empty/.empty-icon; .table-actions.
- .catalog-grid > button.product-tile .product-visual.tone-* (letter), .product-category,.product-title,.product-price,.product-stock; .pos-layout > .pos-products + aside.cart-panel; .cart-list .cart-line (.cart-title,.quantity-controls buttons/span); .cart-totals .total-row; .cart-footer.
- .timeline-grid > section.staff-column > .staff-heading + .appointment-list > article.appointment (.appointment-time, .appointment-info strong/small/p, .appointment-actions); .appointment.cancelled; .schedule-empty; .date-picker.
- .client-grid > article.client-card (.client-avatar, h3, p, .client-footer); .service-grid > article.service-card (.service-icon,h3,.service-meta,.service-price).
- .quote-builder > .quote-editor.panel + aside.quote-summary.panel; .form-grid (.full spansall); label .field-help; input/select/textarea; .quote-line-grid > label + ... +button; .quote-lines; .quote-amount; .quote-note; .review-lines; .quote-document; .document-header; .document-meta; .order-grid > article.order-card (.order-heading,.order-steps .step.done/.current,.order-footer).
- dialog#modal form/div: .modal-header h2/p + .close-button; .modal-body; .modal-actions; .form-error[role=alert]; .confirmation-icon; .receipt-summary. All dialog fields fullwidth. #toast role=status fixed bottomright .visible, mobile fullwidth inset.

No tests/services/preview/publishing by styling agent; source review only, write report/freeze with allowed files.

## Test agent

Create ONLY tests/model.test.mjs and TEST-NOTES.md. Actual model.mjs is available. Write and run one compact Node test suite (no inherited Marketday baseline), covering: issueSale correct stock/total/immutable source and oversell refusal; adjustStock negative/bounds; makeAppointment overlap by staff/date plus adjacent allowed/cancelled ignored; quoteTotals discounts/cent rounding/invalid; acceptQuote order link/duplicate refusal; seed sale totals equal sum of line amounts; price parsing and accent-normalizer. Report any real defect to Lead; do not edit production. No browser/server/deps/git/cloud. Main DOM testing remains Lead-owned. Model may receive owner bug fixes, rerun only relevant affected checks if needed.
