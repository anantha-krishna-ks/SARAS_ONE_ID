# Sidebar Navigation — Reusable Design Prompt

A copy-paste prompt for generating a clean, grouped, collapsible **left sidebar navigation** in the style used across this console. Paste the whole file into a new project and (optionally) swap the palette block at the bottom. It is framework-agnostic — the recipe is described in plain terms plus concrete values so it can be rebuilt in React, Vue, plain HTML/CSS, etc.

---

## Prompt

> Build a fixed left **sidebar navigation** with the following structure, spacing, and colors. Keep it minimal and professional — no gradients, no emoji, no heavy borders. Use a single accent color for the active state only.
>
> **Layout & shell**
> - Fixed to the left edge, full height (top offset if there's a header bar, e.g. `top: 64px; bottom: 0`).
> - Width **256px** expanded, **72px** collapsed; animate width with `transition: width .28s ease`.
> - Background: surface white; a single hairline right border (`1px solid` a light neutral, e.g. `#D5DBE4`). No shadow.
> - Inner padding `16px 12px`. Vertical stack (`display:flex; flex-direction:column; gap:4px`). Scroll vertically if overflowing; never horizontally.
> - `aria-label="Main navigation"` on the `<nav>`.
>
> **Grouped items**
> - Items are organized into labeled **groups** (e.g. Overview, Access, Automation, Monitoring, Settings).
> - **Group heading:** uppercase, `font-size: 11px`, `font-weight: 600`, `letter-spacing: .12em`, muted low-contrast color (e.g. `#8A93A2`), padding `12px 12px 4px`. Hide group headings entirely when the sidebar is collapsed.
>
> **Nav item (button)**
> - Full-width button, `display:flex; align-items:center; gap:12px`, `border-radius:10px`, no border, `cursor:pointer`, `text-align:left`.
> - Padding `10px 12px` when expanded; when collapsed use `11px 0` and `justify-content:center`.
> - Typography: `font-size: 13.8px`; weight **500** default, **600** when active.
> - Leading **icon** at `19px`, `1.5–2px` stroke, line style (outline, not filled). Icon stroke = muted neutral when idle, accent color when active.
> - Label: `white-space:nowrap`; hide the label text when collapsed (icon-only, with the label kept as `title`/`aria-label` for tooltip + a11y).
> - **Idle:** transparent background, ink-colored text (near-black, e.g. `#1A1E26`), muted icon.
> - **Hover:** very subtle neutral wash (e.g. a 4–6% tint of the accent, or `#F5F7FA`). Keep it quiet.
> - **Active/current:** soft accent **tint** background (~10–12% of accent), accent-colored text and icon, `font-weight:600`, plus a **3px accent bar** pinned to the left edge (`height ~22px`, `border-radius:0 3px 3px 0`, vertically centered) that animates in. Set `aria-current="page"`.
> - Transition `background .16s, color .16s, padding .2s`.
>
> **Collapse control**
> - A small circular toggle button (30px, circle, hairline border, surface background, accent chevron) floating on the sidebar's right edge (`left: navWidth - 15px`, near the top). Rotate the chevron 180° between states. Toggles the width between 256 and 72.
>
> **Rhythm & principles**
> - Tight vertical rhythm: `4px` gap between items, group heading adds ~`12px` breathing room above.
> - One accent color, used ONLY for the active item (bar + tint + text/icon) and the collapse chevron. Everything else is ink/muted neutrals on white.
> - Icons are single-path line icons at a consistent 19px. Keep them optically balanced.
> - Fully keyboard/screen-reader friendly: real `<button>`s, `aria-current`, `aria-label` on icon-only collapsed items and the nav landmark.

---

## Reference values (this project's tokens)

Swap these for the target project's palette; the *relationships* (tint ≈ 10% accent, muted heading, hairline border) matter more than the exact hexes.

```
Accent (primary):     #0070E0   /* active text, icon, left bar, chevron */
Accent tint (active): rgba(0,112,224,.10)  /* active item background */
Hover wash:           #F5F7FA   /* or ~5% accent */
Ink (default text):   #1A1E26
Muted (idle icon):    #5A6675
Group heading:        #8A93A2
Border / hairline:    #D5DBE4
Surface (bg):         #FFFFFF
```

```
Widths:        256px expanded · 72px collapsed
Item padding:  10px 12px (expanded) · 11px 0 (collapsed)
Item radius:   10px
Item gap:      4px
Item font:     13.8px / 500 idle · 600 active
Group label:   11px / 600 / letter-spacing .12em / UPPERCASE
Icon:          19px, line style, 1.5–2px stroke
Active bar:    3px × 22px, radius 0 3px 3px 0, left edge, centered
Transitions:   width .28s · background/color .16s · padding .2s
```

## Data shape

```js
navGroups = [
  { label: 'Overview', items: [
    { key: 'dashboard', label: 'Dashboard', icon: '<svg-path-d>', current: true },
  ]},
  { label: 'Access', items: [
    { key: 'tenants', label: 'Tenants', icon: '<svg-path-d>' },
    { key: 'accounts', label: 'Accounts', icon: '<svg-path-d>' },
  ]},
  // …more groups
]
```

Render: for each group → a (hideable) uppercase heading, then its items as buttons. Mark exactly one item `current`. `icon` is an SVG path `d` string drawn in a 24×24 viewBox with `fill:none; stroke:currentColor`.
