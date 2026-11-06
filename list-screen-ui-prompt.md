# List Screen UI — Exact Design Prompt (SARAS One Console)

Every value below is copied from the live code (`preview.html`), not estimated. Paste the whole file into a new project.

---

## Prompt

> Recreate this **data list screen** exactly. Font: **Poppins** (400/500/600) via Google Fonts, `-webkit-font-smoothing: antialiased`, page background `#F5F7FA`. All icons are 24×24 viewBox line icons: `fill:none; stroke:currentColor; stroke-linecap:round; stroke-linejoin:round`, default stroke-width 2.
>
> ### 1. Page header
> - Container: `display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap; margin-bottom:18px`.
> - Title `<h1>`: 22px / 600, `#1A1E26`, margin `0 0 4px`.
> - Subtitle `<p>`: 12.9px, `#5A6675`, margin 0, e.g. "Organizations provisioned in SARAS One · 6 total".
> - Right side: buttons in a flex row, `gap:10px; flex-wrap:wrap`. Order: **Export** (secondary, green Excel file icon) then **New tenant** (primary, "+" icon).
>
> ### 2. Buttons
> - **Primary:** `height:46px; padding:0 16px; border-radius:11px; border:none; background:linear-gradient(180deg,#1a86f0,#0070E0); color:#fff; font-weight:600; font-size:13.8px; display:inline-flex; align-items:center; gap:8px; box-shadow:0 2px 6px -2px rgba(0,112,224,.3)`. Icon 16px.
>   - Hover: `transform:translateY(-1.5px); filter:brightness(1.08); box-shadow:0 8px 18px -6px rgba(0,112,224,.5)`.
> - **Secondary (ghost):** `height:46px; padding:0 14px; border-radius:10px; border:1px solid #E1E6EF; background:#FFFFFF; color:#1A1E26; font-weight:600; font-size:13.8px; display:inline-flex; align-items:center; gap:8px`.
>   - Hover: `background:#F6F8FB; border-color:#0070E0; color:#0070E0; transform:translateY(-1.5px)`.
> - Both: active `transform:scale(.97)`; disabled `opacity:.5; cursor:not-allowed`.
> - Shared transition: `transform .15s cubic-bezier(.22,1,.36,1), box-shadow .16s ease, background-color .16s ease, border-color .16s ease, color .16s ease, filter .16s ease`.
>
> ### 3. Card container
> - `<section>`: `background:#FFFFFF; border:1px solid #E4E9F0; border-radius:14px; box-shadow:0 4px 16px -8px rgba(16,42,84,.12); overflow:hidden`.
>
> ### 4. Search bar (first row inside the card)
> - Row: `display:flex; gap:12px; align-items:center; flex-wrap:wrap; padding:14px 16px; border-bottom:1px solid #E4E9F0; background:#FBFCFD`.
> - Search field wrapper: `position:relative; flex:1; min-width:220px; max-width:340px`.
>   - Magnifier icon 16px, `position:absolute; left:12px; top:50%; transform:translateY(-50%)`, color `#5A6675`.
>   - Input: `width:100%; height:44px; border-radius:10px; border:1.5px solid #D5DBE4; padding:0 12px 0 36px; font-size:13.8px; color:#1A1E26; background:#FFFFFF`.
>   - Placeholder: `color:#9AA5B4; font-weight:400; font-style:italic` ("Search tenants…"). Once typed, the text is `#1A1E26`, weight 500, normal style.
> - **Status filter dropdown** (right of the search, wrapper `min-width:212px`):
>   - Trigger: `width:100%; height:44px; border-radius:10px; padding:0 12px 0 8px; display:flex; align-items:center; justify-content:space-between; font-size:14.3px; color:#1A1E26; background:#FFFFFF; border:1.5px solid #D5DBE4`. When open: `background:#EEF2F7; border-color:#0070E0`.
>   - Inside the trigger, left to right with an 8px gap:
>     - A lead-icon tile: 27×27, radius 7, `background:linear-gradient(155deg,#EEF2F7,#F6F8FB); border:1px solid #E1E6EF`, with a 15px funnel icon in `#005BB8` (stroke 2.1).
>     - Prefix "Status:" at 12.6px / 600, `#5A6675`.
>     - The value, ellipsized.
>   - Chevron-down on the right, `#5A6675`; it rotates 180° when open (`transition: transform .18s ease`).
>   - Menu: `position:absolute; top:calc(100% + 6px); list-style:none; padding:6px; background:#FFFFFF; border:1px solid #E4E9F0; border-radius:12px; box-shadow:0 12px 32px -12px rgba(16,42,84,.25); max-height:260px; overflow:auto`. Pop-in animation: .14s scale/fade.
>   - Option: `display:flex; justify-content:space-between; gap:10px; padding:10px 12px; border-radius:8px; font-size:13.8px; font-weight:500; color:#1A1E26`. Hover background `#F6F8FB`.
>   - Selected option: weight 600, color `#005BB8`, background `#EEF2F7`, with a 15px check icon (stroke 2.5) on the right.
>   - Options: All, Draft, Provisioning, Active, Inactive, Suspended, Expired, Deleted.
>
> ### 5. Table
> - Wrapper: `overflow-x:auto`. Table: `width:100%; border-collapse:collapse; min-width:900px`.
> - Columns: Tenant · Code · Domain · Accounts · Location · Status · Actions. All are sortable except Actions, which is right-aligned.
> - **Header cell `<th scope="col">`:** `font-size:11.5px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:#0a4a8c; padding:12px 16px; border-bottom:1px solid #E1E6EF; white-space:nowrap; background:#EAF3FF`.
>   - Sortable headers wrap the label in a reset `<button>` (`display:inline-flex; align-items:center; gap:5px`, same type styles).
>   - Each shows an 11px caret icon (stroke 2.4). Unsorted: double caret at opacity .4. Sorted: a single up or down caret at opacity 1, and the label turns `#0070E0`.
>   - Set `aria-sort` to ascending, descending or none.
> - **Row `<tr>`:** `border-bottom:1px solid #E4E9F0`. Hover `background:#F6F8FB`.
> - **Cells (`padding:13px 16px`):**
>   - Tenant: 13.8px / 600, `#1A1E26`.
>   - Code (chip): `font-size:11.8px; font-weight:600; color:#005BB8; background:#EEF2F7; border:1px solid #E1E6EF; border-radius:6px; padding:3px 9px; letter-spacing:.02em; font-variant-numeric:tabular-nums`.
>   - Domain: 13.5px, `#1A1E26`.
>   - Accounts: 13.5px, `#1A1E26`, tabular-nums, thousands separator.
>   - Location: 13.5px, `#5A6675`.
>   - Status pill: `display:inline-flex; align-items:center; gap:8px; padding:4px 11px; border-radius:999px; font-size:12.6px; font-weight:600; white-space:nowrap; border:1px solid <bd>`, with a leading 9×9 round dot. Colors per status (bg / text / border / dot):
>
>     | Status | Background | Text | Border | Dot |
>     |---|---|---|---|---|
>     | Active | `#E7F6EC` | `#0E7A36` | transparent | `#16A34A` |
>     | Inactive / Draft | `#FBFCFD` | `#5A6675` | `#E4E9F0` | `#9AA6B4` |
>     | Provisioning | `#EEF2F7` | `#005BB8` | transparent | `#005BB8` |
>     | Suspended / Deleted | `#FDECEC` | `#B42318` | transparent | `#DC2626` |
>     | Expired | `#FEF3E2` | `#B4790C` | transparent | `#F59E0B` |
>
> ### 6. Row actions (last cell)
> - Wrapper: `display:flex; gap:8px; align-items:center; justify-content:flex-end`.
> - **Icon button:** `width:32px; height:32px; border-radius:8px; border:1px solid #E4E9F0; background:#FFFFFF; color:#5A6675; display:flex; align-items:center; justify-content:center`. Icon 15px. Always set `title` and `aria-label`.
>   - Hover (normal): `background:#EEF2F7; border-color:#E1E6EF; color:#0070E0`.
>   - Hover (destructive): `background:#FEECEC; border-color:#F5C6C6; color:#DC2626`.
> - Order: **Edit** (pencil) → **Delete** (trash, destructive; opens a danger confirm modal) → **More** (⋯, 18px icon).
> - **More menu:**
>   - Opens in a portal with `position:fixed; z-index:4000; width:246px; list-style:none; margin:0; padding:6px; background:#FFFFFF; border:1px solid #E4E9F0; border-radius:12px; box-shadow:0 16px 40px -16px rgba(16,42,84,.32)`. Pop-in .14s.
>   - Aligned to the button's right edge 6px below it, flipping above when there isn't room. Clamped 12px from the viewport edges.
>   - Item `<li role="menuitem" tabindex="0">`: `display:flex; align-items:center; gap:11px; padding:10px 11px; border-radius:8px; font-size:13.3px; font-weight:500; color:#1A1E26`, with a 16px icon in `#5A6675`. Hover background `#F6F8FB`.
>   - Closes on Escape, an outside click, or picking an item. Enter and Space activate items.
>
> ### 7. Pagination (card footer)
> - Row: `display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; padding:12px 20px; border-top:1px solid #E4E9F0`.
> - **Left** (`gap:14px`): the range "1–10 of 46" (12.5px, `#5A6675`, tabular-nums), then "Show [size] per page" (12.5px `#5A6675`, inner `gap:8px`).
>   - Size select trigger: `height:32px; min-width:64px; padding:0 10px; border-radius:8px; border:1px solid #D5DBE4; background:#FFFFFF; font-size:13px; font-weight:600; gap:8px` with a 13px chevron. When open: `border-color:#0070E0; background:#EEF2F7`.
>   - The size list opens **upward** (`bottom:calc(100% + 6px)`), min-width 80px, radius 10px, padding 6px. Options are 10 / 20 / 30 / 40: `padding:8px 10px; border-radius:7px; font-size:13px`; the selected one is `#005BB8` at weight 600 on `#EEF2F7` with a check.
> - **Right** (page control group): `display:flex; align-items:center; gap:3px; padding:4px; border-radius:12px; background:#FBFCFD; border:1px solid #E4E9F0`.
>   - Prev/Next: `32×32; border-radius:8px; border:none; background:transparent; color:#1A1E26`, 15px chevrons. Disabled color `#B9C4D4`, cursor not-allowed.
>   - Page number: `min-width:32px; height:32px; padding:0 9px; border-radius:8px; border:none; background:transparent; color:#5A6675; font-size:13px; font-weight:600; tabular-nums`.
>   - Current page: `background:linear-gradient(155deg,#0070E0,#0070E0); color:#fff; box-shadow:0 3px 9px -3px rgba(10,74,140,.6)`, with `aria-current="page"`.
>   - Page windowing: show all pages when there are 7 or fewer. Otherwise show 1, current−1, current, current+1 and the last page, with "…" for gaps.
>
> ### 8. Empty state (replaces table + pager when there are no rows)
> - Centered column: `gap:8px; padding:36px 24px 44px`. A 180×180 looping illustration, then the title (15.6px / 600, `#1A1E26`) and hint (12.9px, `#5A6675`), e.g. "No tenants match your filters" / "Try a different search term or status."
>
> ### 9. Behavior
> - Changing search, filter, sort or page size resets to page 1.
> - Search matches across name, code and domain, case-insensitive.
> - Sort: clicking the same column toggles asc/desc; a new column starts at asc. Numbers sort numerically and text with `localeCompare`.
> - Page-level entrance: `fadeUp .28s ease`.

---

## Token sheet (exact)

```
--primary:        #0070E0   (gradient top #1a86f0)
--primary-hover:  #005BB8
--primary-tint:   #EEF2F7
--primary-tint-2: #F6F8FB   (row hover, option hover, ghost hover)
--on-tint-blue:   #005BB8
--ink:            #1A1E26
--muted:          #5A6675
--border:         #E4E9F0
--border-blue:    #E1E6EF
--surface:        #FFFFFF
--surface-alt:    #FBFCFD   (search bar bg, pager group bg)
--surface-page:   #F5F7FA
--success:        #16A34A   --success-text: #0E7A36   --green-tint: #E7F6EC
--danger:         #DC2626   danger text #B42318       danger tint #FDECEC / hover #FEECEC, border #F5C6C6
--warning:        #F59E0B   --warning-text: #B4790C   --amber-tint: #FEF3E2
Table header bg:  #EAF3FF   Table header text: #0a4a8c
Input border:     #D5DBE4   Placeholder: #9AA5B4
```
