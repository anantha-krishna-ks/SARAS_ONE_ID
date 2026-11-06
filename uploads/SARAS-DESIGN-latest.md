---
version: 1.0
name: SARAS-design-system
description: A calm, information-dense product interface for SARAS applications. The system anchors on a light neutral canvas with a single confident blue accent, Poppins throughout, and card-first layouts (lists are cards, never bare tables). Brand voltage comes from one accent language — a primary blue (#0070E0) and its tints — applied consistently across every product and screen so everything reads as one system. Charts are glossy and modern (gradient fills, soft glows, dark rounded hover tooltips). Every surface targets WCAG 2.2 AA. This document is the consolidated single source of truth for all SARAS products.

colors:
  primary: "#0070E0"
  primary-hover: "#005BB8"
  primary-tint: "#EEF2F7"
  primary-tint-2: "#F6F8FB"
  primary-disabled: "#B9C4D4"
  ink: "#1A1E26"
  ink-alt: "#1A2740"
  muted: "#5A6675"
  muted-soft: "#8A93A2"
  hairline: "#E4E9F0"
  hairline-blue: "#E1E6EF"
  input-border: "#D5DBE4"
  canvas: "#F5F7FA"
  surface: "#FFFFFF"
  surface-alt: "#FBFCFD"
  on-primary: "#FFFFFF"
  success: "#16A34A"
  warning: "#F59E0B"
  error: "#DC2626"
  focus-ring: "rgba(0,112,224,0.35)"
  focus-ring-soft: "rgba(0,112,224,0.14)"

typography:
  page-title:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  section-heading:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0
  card-title:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  eyebrow:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.48px
    textTransform: uppercase
  body:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-strong:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.55
    letterSpacing: 0
  meta:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: 12.5px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  table-header:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: 12.5px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.2px
  button:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  nav-link:
    fontFamily: "Poppins, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 8px
  md: 10px
  lg: 14px
  xl: 16px
  pill: 999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  base: 14px
  md: 16px
  lg: 20px
  xl: 24px
  section: 32px

shadow:
  card: "0 4px 16px -8px rgba(16,42,84,0.12)"
  card-hover: "0 8px 24px -10px rgba(16,42,84,0.18)"
  button-primary-hover: "0 6px 16px -6px rgba(0,112,224,0.45)"
  popover: "0 12px 32px -12px rgba(16,42,84,0.25)"

components:
  header:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    height: 64px
    zIndex: 60
  side-nav-blue:
    backgroundColor: "linear-gradient(168deg,#2F7BE0 0%,#2569C8 100%)"
    highlightOverlay: "radial-gradient(130% 55% at 100% 0%, rgba(255,255,255,.09), transparent 55%)"
    textColor: "{colors.on-primary}"
    borderRadius: "0 26px 26px 0"
    widthCollapsed: 92px
    widthExpanded: 236px
    typography: "{typography.nav-link}"
    useCase: "Daily-driver, task-focused product surfaces"
  side-nav-white:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.input-border}"
    textColor: "{colors.ink}"
    widthCollapsed: 72px
    widthExpanded: 256px
    typography: "{typography.nav-link}"
    useCase: "Data-dense management surfaces (dashboards, tables, reports)"
  side-nav-item-active-blue:
    backgroundColor: "rgba(255,255,255,0.16)"
    pillBackground: "{colors.surface}"
    textColor: "#0A3E78"
    iconColor: "{colors.primary}"
    rounded: "{rounded.pill}"
  side-nav-item-active-white:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary}"
    iconColor: "{colors.primary}"
    rounded: "{rounded.md}"
    accentBar: "3px left bar, {colors.primary}, radius 0 3px 3px 0, height animates in"
  button-primary:
    backgroundColor: "{colors.primary}"
    backgroundGradient: "linear-gradient(180deg,#1a86f0,#0070E0)"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: 11px
    height: 46px
    padding: 0 20px
  button-primary-hover:
    transform: "translateY(-1.5px)"
    boxShadow: "{shadow.button-primary-hover}"
  button-primary-disabled:
    backgroundColor: "{colors.primary-disabled}"
    textColor: "{colors.on-primary}"
    cursor: not-allowed
  button-ghost:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline-blue}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    height: 46px
  button-outline:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline-blue}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    leadingIcon: true
  button-icon:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary}"
    size: 32px
    rounded: "{rounded.sm}"
    ariaLabel: required
  button-close:
    size: 32px
    rounded: "{rounded.sm}"
    ariaLabel: "Close"
  card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    boxShadow: "{shadow.card}"
  card-hover:
    borderColor: "{colors.hairline-blue}"
    boxShadow: "{shadow.card-hover}"
    titleColor: "{colors.primary}"
  card-header-strip:
    backgroundColor: "{colors.primary-tint-2}"
    iconTileBackground: "{colors.primary-tint}"
    iconTileSize: 28px
  list-card:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline-blue}"
    rounded: "{rounded.lg}"
    perRowDesktop: 3
  text-field:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.input-border}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: 44px
    labelAbove: true
  text-field-focused:
    borderColor: "{colors.primary}"
    boxShadow: "0 0 0 3px {colors.focus-ring-soft}"
  text-field-error:
    borderColor: "{colors.error}"
    ariaRole: alert
  dropdown-trigger:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline-blue}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: 44px
    chevronRotateOnOpen: 180deg
    ariaHaspopup: listbox
  dropdown-trigger-active:
    backgroundColor: "{colors.primary-tint}"
    borderColor: "{colors.primary}"
    textColor: "{colors.primary}"
  dropdown-menu:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    boxShadow: "{shadow.popover}"
    portal: true
    animation: popIn
    autoSearchOver: 7
    ariaRole: listbox
  dropdown-item-selected:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary}"
    check: true
  chip:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline-blue}"
    textColor: "{colors.ink}"
    height: 32px
    rounded: "{rounded.pill}"
  chip-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  count-pill:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  badge-success:
    backgroundColor: "#E7F6EC"
    textColor: "{colors.success}"
    rounded: "{rounded.pill}"
    pairIconOrLabel: true
  badge-warning:
    backgroundColor: "#FEF3E2"
    textColor: "#B4790C"
    rounded: "{rounded.pill}"
  badge-info:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
  table:
    headerBackground: "{colors.surface-alt}"
    headerTextColor: "{colors.ink-alt}"
    headerTypography: "{typography.table-header}"
    rowDivider: "{colors.hairline}"
    rowHoverBackground: "{colors.primary-tint-2}"
    numericAlign: right
  pager:
    style: windowed
    firstEllipsisWindowEllipsisLast: true
  modal-overlay:
    backgroundColor: "rgba(20,30,50,0.42)"
    backdropBlur: 2px
    portal: true
    animation: fadeUp
  modal:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    boxShadow: "{shadow.popover}"
    ariaRole: dialog
    ariaModal: true
    requiresDescription: true
  empty-state:
    animated: true
    hasTitle: true
    hasAction: true
  toast:
    engine: "@radix-ui/react-toast"
    origin: top-right
    viewport: "fixed top-4 right-4, sm:max-w-[420px]"
    limit: 1
    ribbon: "1px left color bar, colored per variant"
    variants: "default | info | success | warning | destructive"
    icon: "lucide (Info / CheckCircle2 / AlertTriangle / AlertCircle)"
    close: "hover/focus-revealed, aria-label='Close notification'"
    autoVariant: "inferVariant() keyword inference when none passed"
    spec: "docs/toast-ui.md"
  chart-tooltip:
    backgroundColor: "{colors.ink-alt}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    style: dark-rounded
  step-indicator:
    doneColor: "{colors.success}"
    activeColor: "{colors.primary}"
    connectorLine: true
  spinner:
    color: "{colors.primary}"
    withLabel: true
  logo:
    asset: "assets/saras-logo.png"
    intrinsicSize: "509x166"
    aspectRatio: "3.07:1"
    transparentBackground: true
    headerHeight: 44px
    minHeight: 28px
    clearSpace: "0.5x logo height on all sides"
    altText: "SARAS"
    scale: "height fixed, width auto — never distort"
---

## Overview

This document is the consolidated SARAS design system: a single source of truth that applies
identically to every SARAS product, application, and screen so everything reads as one
system. There is no per-product or per-surface styling — a card in one application and a card
in another are the same component.

The base atmosphere is a **light neutral canvas** (`{colors.canvas}` — #F5F7FA) carrying
white cards. Type is **Poppins** everywhere. Brand voltage comes from **one accent
language**: a confident primary blue (`{colors.primary}` — #0070E0) and a small family of
blue tints (`{colors.primary-tint}`, `{colors.primary-tint-2}`). There is no second brand
hue — the discipline of a single accent is what makes dense, information-heavy screens feel
calm and coherent.

The system has three working surface layers:
1. **Canvas** (`{colors.canvas}`) — the app background floor.
2. **White surface** (`{colors.surface}`) — cards, panels, modals, the header.
3. **Tinted accents** (`{colors.primary-tint}` / `{colors.primary-tint-2}`) — icon tiles,
   card-header strips, selected states, count pills.

**Key Characteristics:**
- One accent language across the whole product. Blue and its tints only — never a saturated
  gradient banner, never a competing second hue.
- **Cards, not tables, for object lists.** List galleries are card grids (3-up on desktop,
  responsive to 1); the card title turns `{colors.primary}` on hover and the card lifts.
- Charts are glossy and modern: gradient fills, soft glows, dark rounded hover tooltips
  (`chart-tooltip`). Bar baselines sit exactly on the axis line.
- Compact density is a first principle — the product minimizes vertical space; whitespace is
  spent deliberately, not to pad.
- Hierarchical radius: `{rounded.md}` (10px) for controls, `{rounded.lg}` (14px) /
  `{rounded.xl}` (16px) for cards and modals, `{rounded.pill}` for chips and badges.
- Depth comes from soft, low-alpha shadows (`{shadow.card}`) plus hairline borders, never
  heavy elevation. Hover raises a slightly deeper lift shadow.
- Every surface targets **WCAG 2.2 Level AA** (§Accessibility). Status is never color alone.

## Colors

### Brand & Accent
- **Primary** (`{colors.primary}` — #0070E0): The single brand color. Primary buttons,
  links, active nav, focus rings, selected chips, count pills. On white it measures 4.6:1 —
  AA for text ≥13.5px and for all UI/graphics.
- **Primary Hover** (`{colors.primary-hover}` — #005BB8): Link and button hover-darker
  variant. White text on it measures 6.3:1.
- **Primary Tint** (`{colors.primary-tint}` — #EEF2F7): Icon tiles, selected-item
  backgrounds, count-pill fills, row-selection highlight.
- **Primary Tint 2** (`{colors.primary-tint-2}` — #F6F8FB): Card-header strips, subtle
  panels, table row-hover. One step lighter than Tint.
- **Primary Disabled** (`{colors.primary-disabled}` — #B9C4D4): Desaturated disabled fill
  for primary buttons; paired with `not-allowed` cursor.

> Never place `{colors.primary}` **text** on a tinted blue background — the pairing fails
> contrast. Tint backgrounds carry ink text or a blue icon, not blue body copy.

### Surface
- **Canvas** (`{colors.canvas}` — #F5F7FA): The app background floor.
- **Surface** (`{colors.surface}` — #FFFFFF): Cards, modals, panels, the header.
- **Surface Alt** (`{colors.surface-alt}` — #FBFCFD): Scroll areas, table header rows, inset
  panels. Barely off-white to separate scrollable regions.

### Lines
- **Hairline** (`{colors.hairline}` — #E4E9F0): Default card and table borders, dividers.
- **Hairline Blue** (`{colors.hairline-blue}` — #E1E6EF): Emphasized card borders, footers,
  stepper cards — one step bluer than the neutral hairline.
- **Input Border** (`{colors.input-border}` — #D5DBE4): The 1.5px resting border on text
  fields.

### Text
- **Ink** (`{colors.ink}` — #1A1E26): Primary text and most headings. On white 15.9:1 (AAA).
- **Ink Alt** (`{colors.ink-alt}` — #1A2740): Dense headings and table headers; also the
  chart-tooltip surface color.
- **Muted** (`{colors.muted}` — #5A6675): Secondary text, meta, helper lines. On white
  5.9:1 (AA at all sizes).
- **Muted Soft** (`{colors.muted-soft}` — #8A93A2): Uppercase eyebrow labels and the very
  finest print — used only at 12px+ and never for essential body copy.
- **On Primary** (`{colors.on-primary}` — #FFFFFF): Text on blue buttons and pills; button
  text stays weight 600 to hold contrast.

### Semantic
- **Success** (`{colors.success}` — #16A34A): Saved ticks, the Excel-export icon, positive
  status badges.
- **Warning** (`{colors.warning}` — #F59E0B): Pending / attention badges (badge text uses a
  darker #B4790C for AA on the amber tint).
- **Error** (`{colors.error}` — #DC2626): Destructive hover, inline validation errors.

> **Never use opacity modifiers on text** (e.g. a `/60` alpha). Always use a full semantic
> token — `{colors.ink}` or `{colors.muted}`. Opacity on text is unpredictable against
> varied backgrounds and usually breaks the 4.5:1 requirement.

## Typography

### Font Family
The entire product runs **Poppins** (Google Fonts), fallback `system-ui, sans-serif`. There
is no display/body split and no second family — a single humanist geometric sans, weighted
for hierarchy. Weights used: 400 (body), 500 (labels, emphasis, nav), 600 (headings,
buttons, table headers). Poppins 700 is avoided; emphasis comes from size and 600, not heavy
weight.

### Hierarchy

| Token | Size | Weight | Letter Spacing | Use |
|---|---|---|---|---|
| `{typography.page-title}` | 22px | 600 | 0 | The single `<h1>` per screen |
| `{typography.section-heading}` | 18px | 600 | 0 | Section headers within a screen |
| `{typography.card-title}` | 16px | 600 | 0 | Content card titles |
| `{typography.eyebrow}` | 12px | 600 | 0.48px, uppercase | Field labels above controls, section eyebrows |
| `{typography.body-strong}` | 14px | 500 | 0 | Emphasized body, list labels |
| `{typography.body}` | 14px | 400 | 0 | Default running text and table cells |
| `{typography.meta}` | 12.5px | 400 | 0 | Helper text, captions, secondary meta |
| `{typography.table-header}` | 12.5px | 600 | 0.2px | Table column headers |
| `{typography.button}` | 14px | 600 | 0 | Button labels |
| `{typography.nav-link}` | 14px | 500 | 0 | Side-nav items |

### Principles
- **Minimum 12px** anywhere in product UI; body defaults to 14px. Muted text never drops
  below 12px.
- **Exactly one `<h1>` per screen**; use a `<span>` for the logo/wordmark in the header.
- **Heading levels never skip** (h1 → h2 → h3, never h1 → h3).
- Numbers in tables are right-aligned and use tabular figures.
- Uppercase eyebrow labels sit above their control (label-above pattern) — never a
  placeholder standing in for a label.

## Layout

### Spacing System
- **Base unit:** 4px.
- **Tokens:** `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.base}` 14
  · `{spacing.md}` 16 · `{spacing.lg}` 20 · `{spacing.xl}` 24 · `{spacing.section}` 32.
- **Card padding:** `{spacing.base}`–`{spacing.lg}` (14–20px).
- **Gap between grouped siblings:** 10–16px.
- **Section rhythm:** `{spacing.section}` (32px) between major regions — compact by design.

### Grid & Container
- Content is fluid with 20–24px gutters; no fixed max-width — data-dense screens use the full
  width available.
- **Card galleries:** 3-up on desktop, 2-up on tablet, 1-up on mobile.
- **Two-pane workspaces** (e.g. picked-tray + library): side by side on wide screens; the
  side panel uses a `clamp()` width such as `clamp(340px, 44%, 560px)` and stacks below the
  main pane at ≤1100px.
- Filter bars sit in a single wrapping row above the results. When one filter scopes another
  (a parent/child pair), keep them as two separate dropdowns and reset the child when the
  parent changes.

### Layout Rules
- **Lay out with flex/grid `gap`, never margin-spaced inline siblings.** Gap survives
  direct-manipulation edits (drag-reorder, delete, duplicate); whitespace text nodes do not.
- Button rows `flex-wrap` so footers never overflow at narrow widths.
- Collapsible panels animate `grid-template-columns` / width; a collapsed panel becomes a
  56px vertical rail (icon tile, count pill, vertical label, chevron).

### Whitespace Philosophy
SARAS optimizes for density: the user repeatedly asks for less vertical space. Whitespace is
spent to group and separate, not to decorate. An empty-feeling region is a layout problem,
not a content gap — fill it with a real `empty-state`, not padding.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, hairline border only | Table rows, inline chips, nav items |
| Card resting | `{shadow.card}` + hairline border | All cards and panels |
| Card hover | `{shadow.card-hover}` + `{colors.hairline-blue}` border + blue title | Interactive cards |
| Button hover | `{shadow.button-primary-hover}` + `translateY(-1.5px)` | Primary/CTA buttons |
| Popover / modal | `{shadow.popover}` | Dropdown menus, modals, flyouts, toasts |

The elevation philosophy is **soft-shadow + hairline first**. Depth is low-alpha and warm-
neutral (`rgba(16,42,84,…)`), never a hard drop shadow. Most separation comes from the
canvas-vs-white surface contrast plus a 1px hairline; shadows only deepen on hover and on
floating layers.

> **Never a black border on hover.** A real historical bug: mutating the `border`
> shorthand in a hover handler flashed a black edge. Change border *color* only, and route
> inline styles through the `css()` helper, which expands every `border` shorthand into
> longhands so React diffs like-for-like across renders.

### Stacking order (z-index)
`header` (60) sits above sticky filter bars (30), which sit above page content. Floating
layers — dropdown menus, overlays, popovers — portal to `<body>` at 1200–4000 so no
ancestor `overflow` / `transform` can clip or trap them.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Tiny accents |
| `{rounded.sm}` | 8px | Icon tiles, icon buttons, chart tooltips |
| `{rounded.md}` | 10px | Buttons, inputs, dropdown triggers, category tabs |
| `{rounded.lg}` | 14px | Cards, panels, list cards |
| `{rounded.xl}` | 16px | Modals, the largest containers |
| `{rounded.pill}` | 999px | Chips, count pills, status badges |
| `{rounded.full}` | 9999px / 50% | Avatars, circular indicators |

### Icons & Imagery
- Icons come from a **single stroke-icon source** (`icons.jsx`): 2px stroke, round caps, one
  visual weight. No ad-hoc per-screen SVGs.
- Icon tiles are `{rounded.sm}` squares on `{colors.primary-tint}` with a blue icon — the
  recurring "header strip" motif on cards and panels.
- Excel export is a dedicated green Excel-sheet glyph (folded corner + white X).
- Avatars crop to circles; no decorative marketing illustration in product UI.
- No emoji in product UI.

## Components

> All SARAS UI is built from one small set of shared primitives, reused identically across
> every product and screen. Never re-implement a native `<select>`, a bespoke button, or a one-off
> pager. Route every inline style through the `css()` helper (`lib/css.js`), which converts a
> CSS string to a React style object and expands `border` shorthands into longhands.

### App Shell

**`header`** — 64px fixed white bar, bottom hairline border, **z-index 60** (always above
sticky filter bars). Semantic `<header>` (no redundant `role="banner"`). Left: logo as a
`<span>` (never an `<h1>`) + product name. Right: account/profile popover and sign-out,
both portal-mounted so they escape the header stacking context.

**Side navigation — two variants, one system.** SARAS ships two nav treatments and the
product picks per use case; both use `<nav aria-label="Main navigation">`, a `.26s`
width/transform transition, `{typography.nav-link}` items, icons-only when collapsed with
flyout labels on hover, flyout sub-menus, and a drawer overlay on mobile. Every item is a
real focusable control in DOM order.

- **`side-nav-blue`** — The deeper blue-gradient rail:
  `linear-gradient(168deg,#2F7BE0,#2569C8)` with a soft top-right white highlight overlay and
  a rounded outer edge (`0 26px 26px 0`), **92px collapsed / 236px expanded**. Active item is
  a white pill with a blue icon and `#0A3E78` label (`side-nav-item-active-blue`); hover is a
  translucent-white overlay. This is the confident, branded rail — use it for
  **daily-driver, task-focused product surfaces**. Note it reads as a saturated blue by
  design; this is the one place the blue is meant to be strong, not softened.
- **`side-nav-white`** — A white rail (`{colors.surface}`) with a
  `{colors.input-border}` right border, **72px collapsed / 256px expanded**. Each item
  (`NavButton`) is a 10px-radius row holding three layers: a **left accent bar**, a 20px
  icon, and the label. The **active item** paints a `{colors.primary-tint}` background with
  `{colors.primary}` icon + text, and reveals a **3px vertical accent bar** flush to the
  item's left edge (`{colors.primary}`, radius `0 3px 3px 0`) whose height animates in over
  `.22s cubic-bezier(.22,1,.36,1)` — the signature "current page" marker on the white rail.
  Hover shows the same tint background without the bar. Use it for **data-dense management
  surfaces** (dashboards, tables, reports).

**Choosing:** default to `side-nav-blue` for task-driven surfaces where the brand rail helps
orientation; use `side-nav-white` for surfaces dominated by dense grids and tables, where a
quieter chrome reduces visual competition. Both share every other behavior above, so
switching variants is a surface-color decision, not a layout change.

**Collapse / expand (`CollapseBtn`).** On desktop the rail toggles between an expanded and a
collapsed width, controlled by a single `collapsed` boolean:
- **Expanded** shows icon + label per item; **collapsed** shows icons only (labels hidden),
  with the full label appearing as a hover flyout. Widths are per variant —
  `side-nav-white` 256px ↔ 72px, `side-nav-blue` 236px ↔ 92px — and animate over
  `.26s cubic-bezier(.22,1,.36,1)` on `flex-basis`/`width`.
- **The toggle** is a 30px circular button pinned to the rail's right edge
  (`top:14px; right:-15px`) so it straddles the border; white icon on the accent fill,
  `z-index` above the rail. It carries `title`/`aria-label` that flip between **"Collapse
  menu"** and **"Expand menu"**, and its chevron rotates 180° between the two states. Hidden
  on mobile (the rail is a drawer there instead).
- State persists for the session; the main content area reflows to the freed width
  automatically (the rail is a flex sibling, not an overlay).

**Content region** — `<main>` (no redundant `role="main"`) on `{colors.canvas}` with 20–24px
gutters. A **skip-to-main-content** link is the first focusable element on every page. The
page-title row carries the single `<h1>` + back/breadcrumb on the left, actions on the right.

### Buttons

**`button-primary`** — The signature CTA. Blue gradient
`linear-gradient(180deg,#1a86f0,#0070E0)`, white 600 text, radius 11px, height 46px. Hover
lifts `translateY(-1.5px)` with a soft blue shadow; press scales to ~.97. Disabled =
`{colors.primary-disabled}`, `not-allowed`. `AddBtn` is the same with a leading + icon.

**`button-ghost` / `button-outline`** — White, `{colors.hairline-blue}` border, ink text;
hover adds a blue-tint background + lift. `button-outline` carries a leading icon.

**`button-icon`** — 32px square, `{rounded.sm}`, tint background, configurable hover color.
**Requires an `aria-label`** (the `label` prop) since it has no visible text.

**`button-close`** — 32px; the X rotates 90° on hover; `aria-label="Close"`.

Excel-export buttons use the green Excel-sheet icon. All buttons share one hover/press
behavior (`useFx`): hover = lift + shadow, press = scale-down.

### Cards & Containers

**`card`** — White surface, `{rounded.lg}`, `{colors.hairline}` border (emphasized cards use
`{colors.hairline-blue}`), `{shadow.card}`, padding `{spacing.lg}`. Optional
`card-header-strip`: a `{colors.primary-tint-2}` gradient strip with a 28px
`{colors.primary-tint}` icon tile.

**`list-card`** — The list/gallery card. **Object lists are cards, not tables** — 3 per
row on desktop, responsive to 1. The title turns `{colors.primary}` on hover and the card
raises `{shadow.card-hover}`. Slightly thicker `{colors.hairline-blue}` border. Never a
black border on hover.

### Inputs & Forms

**`text-field`** (`formKit.jsx`) — 44px, `{rounded.md}`, 1.5px `{colors.input-border}`
border, label above in `{typography.eyebrow}`. Focus = `{colors.primary}` border + a 3px
`{colors.focus-ring-soft}` ring. Error = red border + a `role="alert"` message, never color
alone. Optional 11.5px muted hint.

**`dropdown-trigger` + `dropdown-menu`** (`Dropdown.jsx`) — A custom dropdown, **not a native
`<select>`**. 44px trigger with a chevron that rotates 180° when open; the menu is
**portal-mounted** (so it never clips inside overflow or a modal), animates with `popIn`, and
flips above the trigger when there is no room below. Auto-shows a search box over 7 options.
Selected item = `{colors.primary-tint}` background + blue text + check. Non-default selection
puts the trigger into the `dropdown-trigger-active` (blue tint) state. Supports single and
`multi` (checkbox) modes, plus `disabled` (lock) and `error` states. ARIA:
`aria-haspopup="listbox"`, `aria-expanded`, menu `role="listbox"`, items
`role="option"` + `aria-selected`.

**Dependent dropdowns** (a parent/child pair) are always two separate controls; the child's
options are scoped to the chosen parent and reset when the parent changes. Stepper inputs
(e.g. a duration) are 44px with a leading icon, numeric field, unit suffix, and ± chevrons.

#### Building a form — reference: the multi-section record editor

Long create/edit forms follow this exact recipe. Use it as the template for any
"Manage / Create / Edit X" screen.

**1 · Page frame** — a full-width container with, top to bottom: a ghost **back button**
("← Back to …", 34px, transparent, `{colors.muted}`), then a title block — `<h2>` 22px/500
`{colors.ink}` with `-0.01em` tracking + a 13.5px `{colors.muted}` one-line description of
what the form does.

**2 · Section cards (`SectionCard`)** — the form is split into titled cards, one per topic,
stacked with 18px gaps. Each card: white, `{rounded.xl}` (16px), `#D5DBE4` border, the
standard card shadow, `22px 24px` padding. The card header is a **tinted icon tile + title +
sub-label**, and each card carries its own accent tint so sections are visually distinct but
share one language. Give each section a distinct-but-harmonious accent tint, e.g.:
- Identity / primary details → tint `#EAF3FF`, icon `{colors.primary}`
- Configuration / scheduling → tint `#F2EDFC`, icon `#5A3AA6`
- Billing / licensing → tint `#FEF3E0`, icon `#8A5200`
- Address / contact → tint `#FDEEE4`, icon `#6D3A22`

**3 · Field grid** — inside a card, fields sit in a `repeat(3,1fr)` CSS grid with 16px gaps
(the `.rgrid` class collapses to fewer columns on narrow screens). Full-width fields
(Address textarea) span the grid. Every control has a **label above it** (`labelCss`:
14px/500 `{colors.ink}`, 6px bottom margin); required fields append a red `*`.

**4 · Field types**
- Text → `TextField` (`formKit.jsx`), 44px, with `label`, `required`, `error`, `placeholder`,
  and input masking done in `onChange` (e.g. uppercase + strip non-alphanumerics + length
  cap for a code field).
- Choice → the `Sel` wrapper around `Dropdown` — a placeholder option ("Select…") as the
  empty value, `error` styling, min-width 200px.
- Date → native `<input type="date">` styled to match (`dateCss`: 44px, `{rounded.md}`,
  1.5px border); the border flips to error color when invalid.
- Numeric → `TextField` with `inputMode="numeric"` and numeric parsing/validation.
- Rich pickers (image upload, multi-level mappings) open their own sub-components or a modal
  (`Overlay`) rather than crowding the grid.

**5 · Validation model** — validation is **derived, not stored**: compute an `err` object
every render from the form state (`name: !f.name.trim() ? 'Name is required.' : ''`,
positive-number checks, end-date-after-start-date, etc.). A `submit`
boolean gates display — errors only show after the first save attempt via
`showErr(k) = submit && err[k]`. `valid` is `!Object.values(err).some(Boolean)`.

**6 · Error surfacing** — two layers: (a) a **form-level alert banner** at the top when
`submit && !valid` — `role="alert"`, red-tinted (`rgba(229,80,58,.08)` bg,
`rgba(229,80,58,.25)` border, `#C13D2B` text), with a warning icon and "Please complete the
required fields highlighted below."; and (b) **per-field messages** (`errCss`: 12px
`#C13D2B`, `role="alert"`) under each invalid control, with the control's border turned red.

**7 · Save / cancel** — the footer uses `GhostBtn` Cancel + `PrimaryBtn` Save. On save: if
`!valid`, set `submit=true` to reveal errors and stop; otherwise assemble the record, call
`onSave(rec)`, and fire a success `toast` (""…" created/updated"). The same component
handles both create and edit via an `initial`/`isEdit` prop — labels and copy switch on
`isEdit`.

**8 · Mode switching** — when one form covers structurally different record kinds, a
`KindCard` selector at the top flips a `mode` state; the validation map and the rendered
sections both branch on `mode`, and switching resets `submit`.

### Chips, Pills & Badges

**`chip`** — 32px, `{rounded.pill}`, white + `{colors.hairline-blue}` border. **`chip-selected`**
= solid `{colors.primary}` white pill, often with a count. **`count-pill`** = solid blue or
`{colors.primary-tint}`. **Status badges** (`badge-success` / `-warning` / `-info`) are a
tinted background + darker text at 12px/600, and are always paired with an icon or label —
never color alone.

### Tables & Pagination

**`table`** — Header row in `{typography.table-header}` `{colors.ink-alt}` on
`{colors.surface-alt}`, using real `<th scope>`. Rows 13.5px with `{colors.hairline}`
dividers and a `{colors.primary-tint-2}` row-hover; numeric columns right-aligned with
tabular figures. Expandable rows use a chevron that toggles a detail panel (also toggles on
Enter/Space).

**`pager`** (`Pager.jsx`) — Every report table paginates via a windowed footer (first · … ·
window · … · last) plus the `pageWindow()` slice helper; page buttons are labelled. When a
table has no rows it renders the animated `empty-state`, never a blank area.

#### Reference anatomy — the data-table master

Every list/master table in SARAS follows this exact composition. Use it as the template.

**1 · Card wrapper** — the whole table lives inside a standard `card` (white surface,
`{rounded.lg}`, hairline border, `{shadow.card}`).

**2 · Card header** — a flex row (`space-between`, `flex-wrap`, 14px gap, 16px bottom
margin): an `<h3>` title at 17px/500 `{colors.ink}` with a 12.5px `{colors.muted}` subtitle
below it (a short title + a one-line descriptive subtitle). Right side holds optional actions
(Add, Export).

**3 · Search row** — a `SearchBox` (default 340px wide, "Search …" placeholder) directly
above the table; typing resets the page to 1.

**4 · Scroll region** — the table sits in a `.tscroll` wrapper so it scrolls horizontally on
narrow screens rather than wrapping cells.

**5 · Table head** — one header row on a `#EAF3FF` (primary-tint) band. Sortable columns use
the `Th` component with a sort caret; clicking toggles asc/desc (`onSort`). Non-sortable
columns pass a plain `label`. Header text is `table-header` style, real `<th scope>`.

**6 · Table body** — rows use `HoverRow` (row-hover tint, never a black border). Cells pad
`13px 16px` at 13.5px: the primary cell is 500-weight `{colors.ink}`, secondary cells are
`{colors.muted}`, and numeric/code cells add `font-variant-numeric:tabular-nums` with an em-
dash (—) fallback for empty values. Rich cells render a component (e.g. `StageCell`).

**7 · Empty state** — when the filtered set is empty, an `EmptyState` ("Nothing found" /
"Try a different search.") replaces the rows — never a blank table.

**8 · Pagination footer** (`<Pager total page size onPage onSize>`) — a top-hairline-
bordered row (`12px 20px` padding, `space-between`, `flex-wrap`) with two clusters:
- **Left — range + page size:** a 12.5px `{colors.muted}` count label reading `"1–10 of
  128"` (`"0 of 0"` when empty), then a `Show [ 10 ▾ ] per page` control — a 92px `Dropdown`
  with options 10 / 20 / 30 / 40; changing it resets to page 1.
- **Right — page controls:** a 32px Previous nav button (disabled + `not-allowed` on page 1),
  the windowed page-number buttons (first · … · sliding window of ±1 around current · … ·
  last; the window collapses to a plain 1…N list at ≤7 pages), then a 32px Next nav button
  (disabled on the last page). The active page button is a solid `{colors.primary}` fill with
  white text; idle buttons are white with a `#D5DBE4` border that turns `#BCD8FB` on hover;
  numbers use tabular figures. Nav buttons carry `aria-label="Previous"` / `"Next"`; ellipses
  are non-interactive.

The footer hides itself entirely when there is a single page **and** no page-size control is
needed. `pageWindow(total, page, size)` returns `{from, to, pages, cur}` for slicing the
current page out of the sorted+filtered array — always filter → sort → window in that order.

### Modals & Popovers

**`modal-overlay`** (`Overlay` in `formKit.jsx`) — Portals to `<body>`; dim
`rgba(20,30,50,.42)` + 2px blur; enters with `fadeUp`. **`modal`** — White, `{rounded.xl}`,
`{shadow.popover}`; title 16px/600 with a `button-close`; footer right-aligned (ghost Cancel
+ primary CTA) with inline required-field validation. ARIA: `role="dialog"`, `aria-modal`,
`aria-labelledby`, and a description (`sr-only` if not visible). Focus is trapped, Esc
closes, and focus returns to the trigger.

#### Building a modal — reference: the create/edit record dialog

Every create/edit and confirm dialog follows this recipe. It stays fully responsive from a
wide desktop down to a small phone.

**1 · Overlay (`Overlay`)** — `createPortal` to `<body>` (so ancestor `transform`/`overflow`
never traps the fixed layer and the nav can't paint over it). A full-viewport
`position:fixed; inset:0` scrim at **z-index 1200**, `rgba(20,30,50,.42)` + `blur(2px)`,
flex-centered, with **24px padding** — that padding is what guarantees the dialog never
touches the screen edges on small viewports.

**2 · Dialog shell** — the panel width is **`width:min(940px, 100%)`**: it caps at its design
width on desktop and shrinks to fill the 24px-inset viewport on mobile, with no fixed pixel
width or media query needed. It's white, `{rounded.xl}` (18px), `{shadow.popover}`,
`overflow:hidden`, and — critically — **`max-height:92vh` + `display:flex;
flex-direction:column`** so the dialog can never exceed the screen height. It enters with
`popIn .2s`; an invalid save triggers a `shakeX .4s` shake (reset on `animationEnd`).

**3 · Three-part vertical structure** — the flex column splits into:
- **Header (fixed):** `22px 24px 16px` padding, a title block (`<h3>` 19px/500 `{colors.ink}`
  + 14px `{colors.muted}` sub-line, e.g. a "Create …" title + a one-line description) on
  the left and a `CloseBtn` on the right.
- **Body (scrolls):** `overflow-y:auto` with `flex-direction:column; gap:16px`. **This is the
  only scrolling region** — long forms scroll here while header and footer stay pinned, which
  is what keeps tall forms usable on short screens.
- **Footer (fixed):** right-aligned `GhostBtn` Cancel + `PrimaryBtn` Save.

**4 · In-modal error banner** — same pattern as forms: when `submit && !valid`, the first
body child is a `role="alert"` red-tinted banner ("Please fix the highlighted fields before
continuing.") with a warning icon; individual fields show their own red messages below.

**5 · Field layout inside the body** — group fields under an `FGroup` icon+title subheader,
then lay them out with `display:flex; gap:16px; flex-wrap:wrap` where each field is
`flex:1; min-width:200px`. Because fields wrap at a 200px floor, a 3-across row on desktop
becomes 2-across, then 1-across on a phone automatically — again with no media query.

**6 · Behavior & a11y** — Esc closes; clicking the scrim closes (unless mid-edit); focus is
trapped inside the dialog and returns to the trigger on close. Provide `role="dialog"`,
`aria-modal="true"`, `aria-labelledby` pointing at the `<h3>`, and a description node.
`CloseBtn` carries `aria-label="Close"`.

**Responsive summary:** `min(width,100%)` + 24px overlay padding handles horizontal fit;
`max-height:92vh` + a single scrolling body handles vertical fit; `flex-wrap` + `min-width`
on fields handles the internal grid. One shell, no breakpoints — it works at every size.

**Confirm/alert variant** — a small dialog uses the same `Overlay` with a narrower shell
(e.g. `min(440px,100%)`), an icon + message body, and a footer of `GhostBtn` Cancel +
`PrimaryBtn` (red-tinted for destructive actions). Same portal, scrim, and a11y rules apply.

### Steppers & Progress

**`step-indicator`** — Numbered circles (done = green tick), connector line, active step
blue. The footer stepper card (`{colors.hairline-blue}` border) puts Previous on the left and
actions on the right; buttons `flex-wrap` so the footer never overflows.

### Feedback States

**`spinner`** — Inline blue spinner **with a label** — never a blank loading screen.
**`empty-state`** — Animated illustration + title + one-line explanation + a primary action
(e.g. a Browse gate). **`toast`** — A Radix-based toast with a left color ribbon, a variant
icon (`info` / `success` / `warning` / `destructive`), title + description, and a hover-
revealed close button. It sits in a **top-right** viewport, shows **one toast at a time**,
auto-dismisses, and auto-infers its variant from keywords when none is passed. Full portable
spec (dependencies, tokens, and the four source files): **`docs/toast-ui.md`**. Announces via
`aria-live` and carries `aria-label="Close notification"` on the close button.

### Charts

**`chart-tooltip`** and chart styling — Glossy and modern: richer gradient fills, glowing
line drop-shadows, and a dark rounded hover tooltip (`{colors.ink-alt}` surface, white text,
`{rounded.sm}`). **Bar baselines sit exactly on the axis line.** The chart palette derives
from `{colors.primary}` plus harmonious `oklch()` neighbours. Every chart pairs with a text
summary or a data-table fallback for accessibility.

### Report PDFs
Report PDFs open in a **new window** (not a tab) via `reportWindow.js`: the popup is opened
synchronously, then pointed at a same-origin blob (the raw path returns 401 without a preview
token).

### Logo

The SARAS wordmark is a single horizontal lockup: `assets/saras-logo.png`, intrinsic
**509 × 166** (aspect **~3.07:1**), on a transparent background so it drops onto any surface.

**Sizing & placement**
- Set a **fixed height and let width scale automatically** (`height: 44px; width: auto`) —
  the header lockup is **44px** tall. Never set both width and height, and never stretch,
  squash, or re-proportion the mark.
- **Minimum height 28px** on screen so the wordmark stays legible; below that, omit it
  rather than shrink further.
- Maintain **clear space** of at least half the logo's height on all four sides — keep other
  elements, text, and edges out of that margin.
- Render it as a semantic image with real alt text — in markup it is an `<img alt="SARAS">`,
  and in the page it lives inside the header `<span>` branding slot, **never as the page
  `<h1>`**.

**On light vs. blue surfaces**
- On white / canvas headers, use the standard transparent logo as-is.
- On the `side-nav-blue` rail or any dark/blue surface, use a white/knockout version of the
  wordmark if one exists; if only the standard asset is available, place it on a white
  header band rather than directly on the blue.

**Don'ts**
- Don't distort, rotate, skew, or change the logo's aspect ratio.
- Don't recolor, add gradients, shadows, outlines, or effects to the mark.
- Don't place it on a busy background or a low-contrast surface — keep 3:1+ against whatever
  sits behind it.
- Don't crop the wordmark, add a tagline lockup, or reconstruct it from type.
- Don't rebuild it as text; always use the supplied asset.
- Don't let it fall below the 24px minimum height or breach its clear-space margin.

## Accessibility (WCAG 2.2 Level AA)

Every rule below is a merge gate, not a suggestion. It applies to all SARAS products and
screens regardless of framework.

### Color & Contrast
- **NEVER use opacity modifiers on text** (e.g. `text-muted-foreground/60`). Always use full
  semantic tokens: `{colors.ink}` (`text-foreground`), `{colors.muted}`
  (`text-muted-foreground`).
- All text meets **4.5:1** against its background; decorative / non-text elements meet
  **3:1**. Measured against the SARAS palette: ink on white 15.9:1 (AAA), muted on white
  5.9:1 (AA), primary on white 4.6:1 (AA for text ≥13.5px), white on primary 4.6:1, white on
  `{colors.primary-hover}` 6.3:1.
- Never place `{colors.primary}` text on a tinted blue background; muted text never below
  12px. **Never convey status by color alone** — pair with an icon or text label.

### Buttons & Interactive Elements
- Every `<button>` without visible text MUST have `aria-label="descriptive action"`
  (`button-icon` / `button-close` require the `label` prop).
- Clickable `<div>`s must have `role="button"`, `tabIndex={0}`, and `onKeyDown` handling for
  Enter/Space.
- Never use `role="link"` on elements that aren't `<a>` tags navigating via `href` — use
  `role="button"` instead.

### Icons & Decorative Elements
- All decorative icons: `aria-hidden="true" focusable="false"`.
- Decorative images: `role="presentation"` or `alt=""`.
- Decorative separators / dividers: `aria-hidden="true"`.

### Forms & Inputs
- Every `<input>`, `<select>`, `<textarea>` MUST have a visible `<label>` or `aria-label`;
  bind labels programmatically (`htmlFor` / `id`).
- For any custom or shadcn `<SelectTrigger>` (the SARAS `dropdown-trigger`), always add
  `aria-label="..."`, plus `aria-expanded` and `aria-haspopup="listbox"`; the menu is
  `role="listbox"` with `option` + `aria-selected`.
- Required fields are marked in the label **and** validated inline with text (not color
  alone); error text is `{colors.error}` + icon, wired via `role="alert"`.
- Minimum touch target **44×44px**.

### Headings
- Exactly ONE `<h1>` per page. Use `<span>` for branding / logos in the header.
- Heading levels must not skip (h1 → h2 → h3, never h1 → h3).

### ARIA
- Don't add redundant roles (`role="main"` on `<main>`, `role="banner"` on `<header>`).
- `aria-hidden` must be the string `"true"` or `"false"`, never a bare attribute.
- Every `Dialog` must include a `DialogDescription` (visually hidden via `class="sr-only"`
  if needed). Modals: `role="dialog"`, `aria-modal`, `aria-labelledby`.
- Status badges / toasts announce via `aria-live="polite"`. Charts get a text summary or a
  data-table fallback.

### Landmarks & Navigation
- Use semantic HTML: `<main>`, `<header>`, `<nav>`, `<footer>`.
- Include a skip-to-main-content link as the first focusable element.
- Add `aria-label` to `<nav>` elements (e.g. `aria-label="Main navigation"`).

### Keyboard
- All interactive elements keyboard-accessible: Tab, Enter, Space, Escape.
- Focus indicators: `focus-visible` with a visible outline — 3px `{colors.focus-ring}`;
  never `outline: none` without a replacement. Defined once in `index.css`.
- Modals trap focus, close on Esc, return focus to the trigger. Dropdown menus: arrows
  navigate, Enter selects, Esc closes. Expandable table rows toggle on Enter/Space.
- Drag handles: `role="button"`, `tabIndex={0}`, descriptive `aria-label`.
- Every interactive element is reachable by Tab in DOM order.

### Images & Media
- All `<img>` have meaningful `alt` text, or `alt=""` if decorative.
- SVGs: `aria-hidden="true" focusable="false"` when decorative.

## Motion

| Pattern | Spec |
|---|---|
| Panel collapse / expand | width / `grid-template-columns`, `.28s ease` |
| Hover lift | `translateY(-1.5px)` + hover shadow, `.16s cubic-bezier(.22,1,.36,1)` |
| Press | scale `.88`–`.97` |
| Fly-in rows (added items) | slide + fade ~250ms, then a green tick pop |
| Saved confirmation | tick animates in, auto-fades |
| Dropdown / popover | `popIn` fade + 4px slide, ~140ms |
| Modal overlay | `fadeUp`, .2s ease |
| Toast | slide in from top-right, swipe-to-dismiss, auto-dismiss on timer |

Easing stays `ease` / `ease-out` / `cubic-bezier(.22,1,.36,1)`; nothing over 300ms. **All
motion is gated by `prefers-reduced-motion`** — disable lift / fly-in / pulse, keep opacity
fades ≤150ms. No content flashes more than 3×/second.

## Do's and Don'ts

### Do
- Anchor every screen on the neutral canvas with white cards; keep one accent language (blue
  + its tints) across all products.
- Use cards, not tables, for object lists; 3-up on desktop, responsive to 1.
- Route inline styles through `css()`; change border *color* on hover, never the shorthand.
- Portal-mount every floating layer (dropdown menu, overlay, popover, flyout).
- Keep charts glossy and modern with bar baselines on the axis line; pair each with a text
  fallback.
- Ship loading, empty, and error states with every data view.
- Keep density compact — spend whitespace to group and separate, not to pad.

### Don't
- Don't introduce a second brand hue or a saturated gradient banner. One accent language.
- Don't put `{colors.primary}` text on a tinted blue background.
- Don't convey status by color alone.
- Don't use opacity modifiers on text.
- Don't build a native `<select>`, a one-off button, or a bespoke pager — reuse the shared
  primitives.
- Don't skip heading levels or ship more than one `<h1>` per page.
- Don't style per product or per screen — the system is consolidated; a component looks the
  same everywhere it appears.

## Responsive Behavior

### Breakpoints

| Name | Width | Key changes |
|---|---|---|
| Wide | > 1440px | 3 report cards/row; two-pane workspaces side by side; extra outer breathing room |
| Desktop | 1100–1440px | 2–3 cards/row; side panels use `clamp()` widths (e.g. `clamp(340px,44%,560px)`) |
| Tablet | 768–1100px | Two-pane layouts stack to one column; side panels go static full-width |
| Mobile | < 768px | 1 card/row; nav rail → drawer overlay; tables scroll horizontally or collapse to cards |

### Rules
- Collapsible panels animate width; collapsed = a 56px vertical rail (icon tile, count pill,
  vertical label, chevron).
- Button rows `flex-wrap` so footers never overflow.
- Touch targets stay ≥44px; primary buttons are 46px, inputs and dropdown triggers 44px.
- Feature/report grids reduce column count rather than shrinking cards.

## Iteration Guide

1. Focus on ONE component at a time; reference its YAML key (`{component.report-card}`,
   `{component.dropdown-menu}`).
2. Variants live as separate `components:` entries (`-active`, `-disabled`, `-focused`,
   `-hover`).
3. Use `{token.refs}` everywhere — never inline hex.
4. The system is consolidated: never fork a component per product or screen.
5. Blue + its tints + neutral canvas is the palette. Don't add a fourth brand tone.
6. When in doubt about emphasis: larger size or weight 600 before a new color.
7. Accessibility rules are gates, not polish — every screen passes §Accessibility.

## Known Gaps

- Poppins is loaded from Google Fonts; `system-ui` is the fallback. No licensed display face.
- Exact chart internals (axis math, tooltip anchoring) live in the chart components rather
  than as tokens here; `chart-tooltip` captures only the visual style.
- Print / PDF layout for reports is owned by `reportWindow.js` and per-report PDF assets, not
  by this token set.
- Source of truth for live values is `react-app/v3/src/**` and the shared primitives
  (`lib/css.js`, `Dropdown.jsx`, `Pager.jsx`, `formKit.jsx`, `icons.jsx`, `consoleUtils.js`).
  When a value here and the code disagree, the code wins — update this document to match.
