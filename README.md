# Forma · Business app portfolio

A Spanish-language, responsive portfolio with three interactive **fictional business demonstrations**. Built with plain HTML, CSS and JavaScript, ready for GitHub Pages. No installation or build step, no database, accounts, analytics, external fonts or API keys.

**Live site:** https://paranoiamkdev.github.io/business-app-portfolio/

## Explore

| Demo | Screens | Try this |
| --- | --- | --- |
| [Sistema de gestión de inventario y ventas](https://paranoiamkdev.github.io/business-app-portfolio/bodega/) | Overview, inventory, point of sale, sales | Sell two products, see stock decrease, replenish inventory, edit/add a product and inspect a sale. |
| [Sistema de gestión de citas y servicios](https://paranoiamkdev.github.io/business-app-portfolio/turno/) | Agenda, customers, services, overview | Book an appointment, try a conflicting time, complete/cancel an appointment and manage customers/services. |
| [Sistema de gestión de pedidos](https://paranoiamkdev.github.io/business-app-portfolio/trazo/) | Overview, quotations, orders, customers | A fictional sign/print workshop: quote materials and work, apply a discount, accept a proposal and advance the linked job through production to delivery. |

Each demo includes an optional **Ayuda** guided walkthrough. It explains controls and navigates between screens without creating, changing or resetting records. It is repeatable, keyboard-dismissable with Escape, and does not add tracking or a backend. Original route names remain for stable existing links.

All initial businesses, names, contacts, products and transactions are fictional. Amounts use Nicaraguan córdobas (`C$`). A visible demo notice appears in each app. There are no real payments, reservations, messages, fiscal invoices or business integrations. The dashboard weekly chart is explicitly illustrative, not calculated analytics. The portfolio inquiry dialog prepares a local text summary; it does not send a message.

Changes are saved in browser `localStorage`, separately for each demo (`forma.demo.v1.bodega`, `.turno`, `.trazo`). Use **Restablecer demo** inside an app to restore its sample data. No cross-device synchronization. Do not enter sensitive/personal customer data: this is a public demonstration, not a production service.

## Run locally

With Node.js installed:

```text
npm run dev
```

Open http://127.0.0.1:4173/ . The preview binds only to loopback. Set `PORT` if that port is occupied. Stop it with Ctrl+C. Any ordinary static HTTP server also works. Opening `index.html` directly through `file://` is not supported by ES modules.

Focused verification (no dependencies to install):

```text
npm run check
```

This checks module syntax and the actual sale/stock, appointment and quotation model behaviors. See [TEST-NOTES.md](TEST-NOTES.md) and [QA.md](QA.md) for the precise scope of automated and browser checks.

## GitHub Pages

The repository is intentionally buildless. In repository **Settings → Pages**, select **Deploy from a branch → main → / (root)**, then Save. `.nojekyll` is included. All app assets and links are relative, so the project URL's `/business-app-portfolio/` prefix works without router rewrites. App screen navigation uses URL fragments (`#inventario`, `#agenda`, etc.).

This site is a static portfolio and product demonstration, not a live commercial transaction system or SaaS. Actual client operations need appropriate separate hosting/backends. Review [GitHub Pages usage limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) before changing its purpose.

## Customize for your business

- `index.html` and `assets/portfolio.css`: portfolio brand, copy, project previews and visual style.
- `assets/portfolio.mjs`: local project-inquiry summary.
- `assets/demo.mjs`: app screens, interactions and fictional business labels.
- `assets/model.mjs`: seeded data and pure business calculations.
- `assets/demo.css`: restrained shared business-software UI, with subtle per-demo accent colors.
- `assets/tutorial.mjs`: UI-only, accessible walkthroughs for the three demos.
- `bodega/`, `turno/`, `trazo/`: independent static app entry points.

**Forma** is the working portfolio brand, not a claim about an established company. Replace it and the local inquiry flow with your actual business identity/contact method before presenting it as a finished service website. No invented client testimonials, client counts or completed-project claims are included. The three apps are labeled conceptual demonstrations, not commissioned customer work. Marketday source, data and credentials are not included.

## Design inspiration and licensing

Original implementation inspired by the *ideas and visual patterns* in:

- [vCard Personal Portfolio](https://github.com/codewithsadee/vcard-personal-portfolio)
- [DevPortfolio](https://github.com/RyanFitzgerald/devportfolio)
- [Tabler](https://github.com/tabler/tabler)
- [SB Admin 2](https://github.com/StartBootstrap/startbootstrap-sb-admin-2)

No code, libraries, fonts, photos or other assets were copied or bundled from these repositories. All interface graphics are local CSS or inline SVG. This project's original code is MIT licensed; see [LICENSE](LICENSE). Review individual licenses if you later introduce third-party components (a project's core license does not necessarily cover all bundled charting/assets).
