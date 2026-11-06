# OneID Console — Project Context & Handoff

> Portable background doc. Attach this to a new project to carry over the full history, design system, and build conventions of the OneID Console. A freshly updated spec/workflow will be attached separately in the new project — treat that as the source of truth for scope, and this file as the source of truth for **how** things were built.

---

## 1. What this project is

**OneID Console** — a high-fidelity, static (clickable) admin UI for an **Identity & Access Management (IAM)** product by **ExcelSoft**, built on the **SARAS UX Standard**. It lets an administrator manage tenants, users, roles, and privileges across the SARAS product suite.

Two deliverables were produced:

1. **`OneID Console.dc.html`** — the full console UI (8 screens + 5 modals + toasts).
2. **`SARAS Compliance Checklist.dc.html`** — a tickable document auditing the console against every rule in the SARAS UX Standard (48 standards, grouped by section, with a live pass counter).
3. **`OneID Console.html`** — a bundled, offline standalone export of the console (regenerate with `super_inline_html`; do not hand-edit).

### Source-of-truth inputs (originally provided by the user)
- **`Skills.md` — "SARAS UX Standard & Component Library"** — the design bible. Every UI decision maps to a numbered rule (§1 Foundations, §2 Components, §3 App Shell, §4 Accessibility WCAG 2.2 AA, §5 Motion & Content). **This governs everything.** New patterns must extend it, not fork it.
- **`oneid_ui_navigation_flow.xlsx`** — the workflow: which pages exist and what operations each supports (see §3 below).
- **ExcelSoft primary logo** (`assets/excelsoft-logo.png`) — full logo with diamond mark + ® symbol.

---

## 2. Screens & structure (from the workflow Excel)

Left-nav switches between screens; nav is collapsible. Grouped into **Manage** and **Settings**.

| Screen | Nav group | Operations represented |
|---|---|---|
| **Login** | (pre-auth) | Sign in, Forgot password, SAML SSO, show/hide password |
| **Dashboard** | Manage | Stat cards, quick actions, recent activity |
| **Tenants** | Manage | New, Edit, Activate/Deactivate, Delete, Export, search, status filter chips, pagination |
| **Users** | Manage | New, Edit, Activate/Deactivate, Delete, Map Role(s), Reset Password, Import, Export |
| **Roles** | Manage | New, Edit, Activate/Deactivate, Delete, Map Privileges, Map Users (card grid, 3/row) |
| **Privileges** | Manage | View (read-only catalogue table) |
| **Password Policy** | Settings | Complexity toggles, min-length stepper, expiry/lockout, live summary |
| **Create Organization Structure** | Settings | Step indicator, hierarchy tree, apply role template |

**Modals (5):** New tenant, New user (with inline email validation), Map roles, New role, Map privileges. All are `role="dialog"` `aria-modal` with overlay + blur, title, Cancel + primary CTA.

---

## 3. Design system — SARAS UX Standard (the values actually used)

The attached **Design System** project is currently empty; the real spec is `Skills.md`. Below are the concrete tokens/patterns baked into the build. **Reuse these verbatim** for visual consistency.

### Color tokens (CSS `:root` custom properties)
```
--primary:#0070E0;        --primary-hover:#005BB8;   --primary-tint:#EAF3FE;   --primary-tint-2:#F4F9FF;
--ink:#1A1E26;            --ink-alt:#1A2740;         --muted:#5A6675;
--border:#E4E9F0;         --border-blue:#DCE7F5;
--surface:#FFFFFF;        --surface-alt:#FBFCFD;     --surface-page:#F5F7FA;
--success:#16A34A;        --success-text:#0E7A36;    --green-tint:#E7F6EE;
--danger:#DC2626;         --warning:#F59E0B;         --warning-text:#8A5200;   --amber-tint:#FEF2E0;
--on-tint-blue:#005BB8;
```
**Critical color rules (from Skills.md §1.1 / §4.1):**
- Never `#0070E0` text on a blue tint — use `--on-tint-blue` (#005BB8) for text/icons on tint.
- Status **fill/icon** uses `--success`/`--warning`; status **text** uses the pre-darkened `-text` tokens.
- No opacity modifiers on text — always a full semantic token.
- Status is never conveyed by color alone: badge = tint bg + icon + text label.
- New hues derive from primary via `oklch()`; no ad-hoc hex.

### Typography
- **Poppins** (400/500/600/700), loaded from Google Fonts, `system-ui` fallback.
- Headings 600, letter-spacing ~-0.02em on large sizes. Nothing below 12px. Slide/mobile minimums per Skills.md.

### Spacing / radii / shadows
- Spacing scale: 4 / 8 / 12 / 14 / 16 / 20 / 24. Layout uses flex/grid **gap**, not margins.
- Radii: cards 14–16px, buttons/inputs 10–12px, chips/pills 999px, icon tiles 8–10px.
- Shadows are soft and shallow (user explicitly dislikes deep shadows): cards `0 4px 16px -8px rgba(16,42,84,.12)`; primary-button hover `0 8px 18px -6px rgba(0,112,224,.5)`; active nav pill is a **subtle** `0 2px 6px -3px rgba(0,0,0,.28)`.

### Buttons & interaction states — IMPORTANT runtime gotcha
This DC runtime generates **empty** `:hover` rules from the `style-hover` attribute, so hover/press effects driven that way **do not work**. The fix used throughout: real CSS in `<helmet><style>` keyed off a **`data-ix`** attribute, with `!important` to beat the inline styles.

```css
[data-ix]{transition:transform .15s cubic-bezier(.22,1,.36,1),box-shadow .16s,background-color .16s,border-color .16s,color .16s,filter .16s;}
[data-ix="primary"]:hover:not(:disabled){transform:translateY(-1.5px)!important;filter:brightness(1.08)!important;box-shadow:0 8px 18px -6px rgba(0,112,224,.5)!important;}
[data-ix="ghost"]:hover:not(:disabled){background:var(--primary-tint-2)!important;border-color:var(--primary)!important;color:var(--primary)!important;transform:translateY(-1.5px)!important;}
[data-ix="ic"]:hover:not(:disabled){background:var(--primary-tint)!important;border-color:var(--border-blue)!important;color:var(--primary)!important;}
[data-ix="dang"]:hover:not(:disabled){background:#FEECEC!important;border-color:#F5C6C6!important;color:var(--danger)!important;}
[data-ix="nav"]:not([aria-current]):hover{background:rgba(255,255,255,.14)!important;}
[data-ix="opt"]:hover{background:var(--primary-tint-2)!important;}
tr[data-ix="row"]:hover{background:var(--primary-tint-2)!important;}
[data-ix]:active:not(:disabled){transform:scale(.96)!important;}
```
Tag every interactive element with `data-ix="primary|ghost|ic|dang|nav|opt|row"`.

**Button styling:** primary = **solid** blue gradient `linear-gradient(180deg,#1a86f0,#0070E0)` (user wanted solid, not flashy gradients). Min hit target 44×44 (§4.4).

### App shell
- Fixed **header 64px**, z-index 60, semantic `<header>`; logo is a `<span><img></span>` (NOT an `<h1>`).
- **Side nav**: blue gradient rail `linear-gradient(180deg,#0a4a9e,#0f66c7)`, `<nav aria-label="Main navigation">`, collapsible (236px ↔ ~92px icon-only with `title` tooltips), grouped **Manage/Settings** with eyebrow labels, white active pills.
  - User removed: workspace switcher chip, bottom profile card. Sign-out lives in the **header**.
- Content in `<main>`; **skip-to-main-content** link is first focusable element.
- Each screen: single `<h1>` left, actions right.

### Login (current design)
- Editorial split: **left** = full-bleed Unsplash photo (`photo-1522071820081-009f0129c71c`, team collaborating) under a blue scrim `linear-gradient(160deg,rgba(5,26,58,.82)…)`, with eyebrow + display headline + generic trust chips + photographer credit.
- **right** = form: username, password with show/hide toggle, Sign in (solid), "or" divider, **Continue with SAML SSO** ghost button, footer trust line.
- Note: AI-generated images from the image tool are **blocked from loading in-browser** and can't be fetched into the project — use **Unsplash URLs** (verified loadable) or user-dropped images instead.

### Accessibility (WCAG 2.2 AA — merge gates per §4)
Icon-only buttons have `aria-label`; decorative SVGs `aria-hidden="true" focusable="false"`; every input has a bound `<label>`/`aria-label`; required fields validated inline with `role="alert"` (color + text + icon); one `<h1>` per screen; no redundant roles; dialogs labelled; visible `:focus-visible` ring (3px) defined once; toasts via `aria-live`.

### Motion (§5.1)
Hover lift ≤ .16s; modal fadeUp .2s; nothing over 300ms; all gated by `prefers-reduced-motion`.

---

## 4. Build conventions (how to work in this project)

- **Everything is a Design Component (`.dc.html`)** authored with the `dc_*` tools. Template between `<x-dc>`, logic class `class Component extends DCLogic { renderVals(){…} }`, optional props JSON.
- **Inline styles only** — no CSS classes for layout/theme. The only `<helmet><style>` content: `@font-face`, `@keyframes`, body resets, the `:focus-visible` ring, and the `data-ix` interaction rules above.
- **Don't put JS expressions in `{{ }}` holes** — dotted lookups only. Compute everything (styles objects, derived values, handlers) in `renderVals()` and expose by name. Static styles must be literal in the template (holes can't resolve mid-stream) — a style hole is only OK for a genuinely live runtime value.
- **Control flow:** `<sc-for list as hint-placeholder-count>`, `<sc-if value hint-placeholder-val>`. Always set the hints.
- **One DC** holds all screens (state `screen` switches them); modals are `<sc-if>` blocks; a small toast system lives in state.
- Prefer `dc_html_str_replace` / `dc_js_str_replace` for edits; `run_script` for bulk mechanical passes.
- **Verify** with `ready_for_verification`. Standalone export: add a `<template id="__bundler_thumbnail">` then `super_inline_html`.

### User preferences observed (carry these forward)
- Concise, direct communication.
- **Solid colors, not flashy gradients.**
- **Reduced/shallow shadows** — no deep drop shadows.
- All buttons must have real hover / press / disabled states (see `data-ix` fix).
- Validation should fire **after** input, not by default on load.
- Likes clean, modern, "premium" but uncluttered UI; pulled design taste from the *ui-ux-pro-max-skill* (editorial layouts, strong hierarchy, trust signals, SVG icons, no AI purple/pink gradients).

---

## 5. Sample data domain (invent more in the same spirit)

Tenants (e.g. *Excelsoft Academy EXA-01*, *Meridian University*, plans Enterprise/Standard/Trial), Users (name/email/role/tenant/status/last-active), Roles (*System Administrator, Tenant Admin, Content Author, Reviewer, Auditor* with scope Global/Tenant, priv & user counts), Privileges (module-grouped: Tenants, Users, Roles, Privileges, Security, Reports). Status values: **Active / Inactive / Pending**. EdTech/assessment flavor throughout.

---

## 6. File inventory

- `OneID Console.dc.html` — main console (edit this).
- `SARAS Compliance Checklist.dc.html` — compliance audit doc.
- `OneID Console.html` — bundled standalone (generated; regenerate, don't edit).
- `assets/excelsoft-logo.png` — full ExcelSoft logo.
- `image-slot.js` — drag-drop image placeholder web component (starter).
- `support.js` — DC runtime (auto-written; never edit).

---

## 7. Handoff notes for the NEW project

1. Attach the **updated spec/workflow document** — it supersedes §2/§3 scope where they differ. This file supersedes nothing about the *new* requirements; it only tells you the established **visual language, tokens, and build conventions** to keep continuity.
2. Recreate the token block, Poppins load, `data-ix` interaction CSS, and app-shell structure first — they're the backbone.
3. Keep the SARAS UX Standard rules (accessibility gates, color-on-tint rule, solid buttons, shallow shadows) as hard constraints.
4. If the design system project is populated in the new environment, explore it and prefer its real tokens/components over the literals here.
