# Demo design notes

The demos share the portfolio's light surfaces, restrained blue-gray type, fine borders, compact labels, and rounded cards. System fonts keep the build self-contained. Bodega uses blue, Turno uses caramel with warm paper, and Trazo uses forest green. Product illustrations are simple letter tiles with muted material colors; no external assets are used.

Desktop uses a 230px sidebar and a fluid workspace capped at 1480px. At 760px the sidebar becomes a horizontal top navigation, actions wrap, dashboard metrics become two columns, and primary work areas stack. Tables scroll within their own wrappers; appointment columns stack for phone use. Controls have 44px minimum touch targets, visible keyboard focus, and reduced-motion support. Native dialogs retain a bounded scroll area and a dimmed backdrop. Toasts expand between phone margins.

Only `assets/demo.css` and this note were created by the styling task. Source review covered the shared DOM contract, theme token fallbacks, responsive breakpoints, and local-only asset use. Browser, server, and runtime checks remain Lead-owned and were not performed in this task.

A bounded integration pass against the completed `assets/demo.mjs` added the actual sidebar guidance, ribbon spacing, stock/team/order lists, quote summary rows, product add indicators, date controls, and footer. It also aligned inline SVGs, positioned the actual search SVG, removed redundant quote panel padding, and adapted cart rows to the actual three-part markup. This was source review only; runtime and visual checks still remain Lead-owned.

## Practical system revision

The landing now uses the exact names “Sistema de gestión de inventario y ventas”, “Sistema de gestión de citas y servicios”, and “Sistema de gestión de pedidos”. Each description identifies its audience and actual actions. The orders example is specifically for a fictional print/sign workshop: quotation lines and discounts, one order per accepted quotation, production stages, and clients. The shared notice states local storage limits and the absence of real payments, emails, and invoices.

The visual revision uses neutral/navy system typography, straight previews, fine borders, modest 3–6px corners, compact headings, and subdued application accents. Long system titles wrap in the sidebar and landing previews rather than being truncated. Phone navigation retains its existing routes and horizontal layout. All landing script selectors and local consultation form fields remain present.

Tutorial styles cover the compact positioned dialog, actions, progress, and highlighted target. The orders workflow guide uses three compact steps on desktop and one column on phones. Changes in this revision are limited to `index.html`, `assets/portfolio.css`, `assets/demo.css`, and this note. Verification was source-only; no server, browser, or publication was performed by the styling agent.
