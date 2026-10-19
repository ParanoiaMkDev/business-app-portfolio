# Demo design notes

The demos share the portfolio's light surfaces, restrained blue-gray type, fine borders, compact labels, and rounded cards. System fonts keep the build self-contained. Bodega uses blue, Turno uses caramel with warm paper, and Trazo uses forest green. Product illustrations are simple letter tiles with muted material colors; no external assets are used.

Desktop uses a 230px sidebar and a fluid workspace capped at 1480px. At 760px the sidebar becomes a horizontal top navigation, actions wrap, dashboard metrics become two columns, and primary work areas stack. Tables scroll within their own wrappers; appointment columns stack for phone use. Controls have 44px minimum touch targets, visible keyboard focus, and reduced-motion support. Native dialogs retain a bounded scroll area and a dimmed backdrop. Toasts expand between phone margins.

Only `assets/demo.css` and this note were created by the styling task. Source review covered the shared DOM contract, theme token fallbacks, responsive breakpoints, and local-only asset use. Browser, server, and runtime checks remain Lead-owned and were not performed in this task.

A bounded integration pass against the completed `assets/demo.mjs` added the actual sidebar guidance, ribbon spacing, stock/team/order lists, quote summary rows, product add indicators, date controls, and footer. It also aligned inline SVGs, positioned the actual search SVG, removed redundant quote panel padding, and adapted cart rows to the actual three-part markup. This was source review only; runtime and visual checks still remain Lead-owned.
