# SARAS One Console — project conventions

## Architecture: feature-split TSX (keep this)
- `src/App.tsx` is a THIN orchestrator only: state, routing, modal wiring. Do not put feature UI in it.
- One feature per file:
  - `src/pages/*` — screens (Login, Mfa, Dashboard, Tenants, Accounts, Roles, PasswordPolicy, OrgStructure, GenericList)
  - `src/modals/*` — modals (TenantModal, UserModal, RoleModal, MapRolesModal, MapPrivilegesModal, ConfirmModal, TenantConfigModal, HealthCheckModal)
  - `src/components/*` — shared shell (AppHeader, SideNav)
  - `src/ui.tsx` — shared primitives (Dropdown, Modal, Field, Th, Pager, StatusToggle, Icon, ExcelIcon, toasts, styles)
  - `src/data.ts` — data model + `listMeta`/`buildList` (generic list screens are added here, not as new components)
  - `src/theme.css` — tokens, resets, keyframes, `[data-ix]`/`[data-app-tile]` hover CSS
- When adding a new screen/modal, create a new file in the right folder and wire it in `App.tsx`. Never grow a monolith.

## Rendering artifacts (keep in sync)
- `preview.html` and `_standalone-src.html` are self-contained single-file builds (inline `#app-src`, Babel-in-browser). They mirror the src code but with `const` (no `export`) and asset paths differ:
  - preview.html / src use `assets/…` paths; `_standalone-src.html` uses `window.__resources.*`.
- Any code change must be applied to the src file(s) AND to `preview.html` + `_standalone-src.html` (same string edits), because the in-tool preview renders `preview.html`.
- After editing `_standalone-src.html`, re-bundle: `super_inline_html(_standalone-src.html → "ExcelSoft SARAS One Console.html")`.

## Product/brand
- Brand: **SARAS One** (rebranded from OneID). "Powered by ExcelSoft" on login hero.
- Terminology: Users→Accounts, Permissions→Privileges.
- Logo: gold SARAS One SVG inlined as data-URI (`assets/saras-one-primary-gold-one.svg`).
- Design system: SARAS UX Standard — `#0a4a8c` headers, blue accent + tints on neutral canvas, Poppins, solid buttons, shallow shadows, cards for lists. No new brand hues.

## Do not tamper existing workflow
Small requests = change only what's asked; preserve all other layout/behavior.
