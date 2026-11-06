# Prompt — "Map accounts" role modal (SARAS One Console)

Build a **"Map accounts — {Role name}"** modal for the SARAS One Console (React + TSX, inline styles, SARAS UX Standard: Poppins, `#0a4a8c` headers, blue accent + tints on neutral canvas, solid buttons, shallow shadows). Use the existing `Modal`, `Icon`, `SearchIcon` and `S` style primitives from `src/ui.tsx`, data from `src/data.ts` (`users`, `orgTree`). Put it in `src/modals/MapAccountsModal.tsx` and open it from the Roles screen row action. Apply the same change to `preview.html` and `_standalone-src.html`.

## Shell
- Modal width **1280px**. Title: `Map accounts — {roleName}`.
- Description: "Add accounts from the left, then set each one's organization unit and access level on the right — select several to set them at once."
- Body: two panels side by side (flex, gap 14, padding `18px 22px 22px`, wraps on narrow screens).
  - Left panel **Available accounts**: flex `1 1 340px`, white, 3px top border `#64748B`.
  - Right panel **Assigned to role**: flex `1.45 1 560px`, light green tint background, 3px top border green (`--success`).
  - Both: 1px border, radius 13, overflow hidden, column layout.

## Panel header (both panels)
Left side: optional lead element → 27×27 rounded icon tile (white, accent icon, accent border at 20%) → title (12.8px, 700) → count pill (accent text, white bg, tabular numbers, `toLocaleString`).
Right side: optional extra control + outline action button (accent text/border) shown only when count > 0.
- Left header: users icon, grey `#64748B`, grey-alt background, extra = **org-unit filter chip** ("All units"), action = **Add all**.
- Right header: shield-check icon, green, green-tint background, lead = **select-all checkbox** (only when the list has rows), extra = **All / Current / New** segmented control with counts (only when anything is assigned), action = **Remove all**.

## Search row
Under each header: 38px search input with leading search icon, 10px padding, bottom border. Placeholders: "Search available accounts…" / "Search assigned accounts…". Matches name, email or tenant (case-insensitive).
On the right panel, the search row is **replaced by a bulk bar** while any account is selected.

## Lists
- Virtualised list (`MapVirtualList`): fixed row height **62px**, visible height **540px**, overscan 6, resets scroll when items change. Must handle ~2,400 accounts smoothly.
- Data pool: existing `users` plus ~2,400 generated accounts (first/last name lists, `first.last{n}@saras.edu`, rotating tenants, unit assigned round-robin from the flattened org tree, initials avatar).
- **Available row** (whole row clickable = add): grey initials avatar (34px circle) → name (13.6px 600) + "email · unit" (11.6px muted), both ellipsised → 28px blue-tint "+" tile.
- **Assigned row** (whole row click = toggle selection):
  - 18px checkbox (blue when on).
  - Avatar: grey for current members, green for newly added.
  - Name + email.
  - Pill: **CURRENT** (grey, check icon) for existing members, **NEW** (green, + icon) for additions.
  - **Unit chip** (purple, building icon) → tree picker.
  - **Access chip** (blue, key icon) → options `None, Local, Deep, Org, Tenant`.
  - 28px red-tint "×" remove button.
  - Left inset 3px bar: blue if selected, slate if current, green if new. Selected row bg = light blue tint.
- Empty states: centred Lottie (`dotlottie-player`, 160px, autoplay loop) + message:
  - Available: "No available accounts match your filters." / "Everyone is already assigned."
  - Assigned: "No assigned accounts match your search." / "No newly added accounts yet — add some from the left." / "No current members remain in this role." / "No accounts assigned yet — add some from the left."

## ScopeChip (shared component, exported)
Compact button + **portal** dropdown (`position: fixed`, z-index 5200, flips upward if no room below, repositions on scroll/resize, closes on outside click or Esc, `popIn` animation).
- Sizes: default 24px tall (max 112px wide), `lg` 32px (max 200px).
- Tones: `unit` purple (`#6D28D9` on `#F3EEFF`), `access` blue (primary tint), `filter` neutral white.
- An unset value (non-filter) shows as an amber dashed chip ("Set unit" / "Set access").
- **Tree mode** (org units): 292px menu, search box at top ("Search units…"), optional "All units" first option, units indented 16px per depth with an L-shaped connector, unit type shown on the right, check on the selected unit. While searching, the list is flat and shows the parent path ("A › B") under each name. Footer hint: "Indentation shows where a unit sits in the organization." Button tooltip = full unit path.
- **List mode** (access): 196px simple option list with a check on the selected option.

## Bulk bar (right panel, when selection > 0)
Blue-tint toolbar: "**{n} selected**" → lg unit chip "Set unit" → lg access chip "Set access level" → spacer → red **Remove** → 32px "×" clear-selection button. Applying a chip sets that field on all selected accounts and shows a toast: `Unit "X" applied to N accounts.` / `Access level "X" applied to N accounts.`

## Workflow / state rules
- `initial` = accounts whose role equals this role. They start assigned with scope `{ unit: home unit, access: 'Local' }`.
- Adding (row click or Add all) keeps any existing scope; otherwise the default is `{ unit: active unit filter or the account's home unit, access: 'Local' }`, so nothing lands unscoped.
- The unit filter applies to the left list only. Add all adds every account currently shown in the left list (filtered).
- Remove (×, bulk Remove, Remove all) takes accounts out of the assigned list and the selection. Remove all affects only the visible (filtered) assigned rows.
- The segmented view (All / Current / New) filters the right list and clears the selection when changed. Select-all toggles all visible assigned rows.
- Scopes are kept for removed accounts, so re-adding one restores its previous unit and access level.

## Footer
Left: "**{assigned}** assigned · +{added}, −{removed}" (diff shown only when something changed), plus an amber warning pill "{n} with no access level" when any assigned account has access `None`. Right: **Cancel** (ghost) and **Save accounts** (primary).
Save closes the modal and shows a toast: `Accounts updated for {role} — N added, M removed.` or `Scopes saved for {role}.` if nothing was added or removed.

## Accessibility
Listbox/option roles on menus, `aria-expanded`/`aria-haspopup` on chips, `role="checkbox"` with Space/Enter on checkboxes, `role="tablist"`/`tab` on the segmented control, `role="toolbar"` on the bulk bar, and aria-labels on every icon button.
