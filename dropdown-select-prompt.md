# Dropdown Select + Options List — Exact Design Prompt (SARAS One Console)

Every value below comes from the live `Dropdown` and `Field` components in `preview.html`. Example: the **Country** field in the New tenant modal.

---

## Prompt

> Build a custom **single-select dropdown** (not a native `<select>`) with a label, a trigger button and a floating options list, exactly as specified. Font **Poppins** (400/500/600), antialiased. Icons are 24×24 viewBox line icons: `fill:none; stroke:currentColor; stroke-linecap:round; stroke-linejoin:round`, default stroke-width 2.
>
> ### 1. Field wrapper + label
> - Wrapper: a plain `<div>`. In a 3-column form grid the field takes one column; `full` spans it across all columns (`grid-column:1 / -1`).
> - Label `<label>`: `display:block; font-size:14.3px; font-weight:500; color:#1A1E26; margin-bottom:7px`. Required fields add a red asterisk: `<span style="color:#DC2626">*</span>` after a space.
> - Optional hint under the control: `font-size:12px; color:#5A6675; margin:6px 0 0`.
> - Error (replaces the hint): `display:flex; align-items:center; gap:6px; font-size:12.9px; color:#DC2626; margin:6px 0 0`, with a 14px alert-circle icon, `role="alert"`.
>
> ### 2. Trigger (closed state)
> - `<button type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Country">`
> - Styles: `width:100%; height:44px; border-radius:10px; padding:0 12px 0 8px; display:flex; align-items:center; justify-content:space-between; font-family:inherit; font-size:14.3px; color:#1A1E26; cursor:pointer; background:#FFFFFF; border:1.5px solid #D5DBE4`.
> - **Left group**: `display:flex; align-items:center; gap:8px; min-width:0; flex:1 1 0; text-align:left; overflow:hidden`. It contains, in order:
>   1. *(Optional)* **lead-icon tile**: `flex:none; width:27px; height:27px; border-radius:7px; display:flex; align-items:center; justify-content:center; background:linear-gradient(155deg,#EEF2F7,#F6F8FB); border:1px solid #E1E6EF`, with a 15px icon (stroke 2.1) in `#005BB8`.
>   2. *(Optional)* **prefix** (e.g. "Status:"): `font-size:12.6px; font-weight:600; color:#5A6675; white-space:nowrap`.
>   3. **Value** (e.g. "India"): `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`. It inherits 14.3px / 400 / `#1A1E26`.
>   - With no lead icon, the 8px left padding still applies, so the value starts 8px in.
> - **Right**: chevron-down icon (path `M6 9l6 6 6-6`), 16px, stroke `#5A6675`, `flex:none; transition:transform .18s ease`.
>
> ### 3. Trigger (open state)
> - `aria-expanded="true"`.
> - Background `#EEF2F7` and border `1.5px solid #0070E0`.
> - Chevron `transform:rotate(180deg)`.
> - Transition on the trigger: `background-color .16s ease, border-color .16s ease, color .16s ease, box-shadow .16s ease, transform .15s cubic-bezier(.22,1,.36,1)`.
> - Keyboard focus: `outline:3px solid rgba(0,112,224,.35); outline-offset:2px` on `:focus-visible`.
>
> ### 4. Options list (menu)
> - `<ul role="listbox" aria-label="Country">`
> - Styles: `list-style:none; margin:0; padding:6px; background:#FFFFFF; border:1px solid #E4E9F0; border-radius:12px; box-shadow:0 12px 32px -12px rgba(16,42,84,.25); max-height:260px; overflow:auto; animation:popIn .14s ease`.
> - `@keyframes popIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:translateY(0); } }`
> - **Inline mode** (default): `position:absolute; top:calc(100% + 6px); left:0; right:0; z-index:3000`, so the menu is exactly as wide as the trigger, 6px below it. A `right` variant pins it with `right:0; min-width:220px` instead.
> - **Portal mode** (use inside modals and scroll containers): render into `document.body` with `position:fixed; z-index:5200`.
>   - Left edge = the trigger's left edge, and width = the trigger's width.
>   - Estimated height = `min(260, options × 40 + 14)`.
>   - If there isn't room below but there's more room above, open **upward** (`top = trigger.top − 6 − height`). Otherwise open downward (`top = trigger.bottom + 6`).
>   - `max-height` = available space clamped to 120–260px, and the menu is clamped 8px from every viewport edge.
>   - Re-position on scroll (capture phase) and on resize.
> - Scrollbar (WebKit): `width:10px`. Thumb `#CDD6E2`, `border-radius:999px; border:2px solid transparent; background-clip:content-box`.
>
> ### 5. Option rows
> - `<li role="option" aria-selected>`
> - Styles: `display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; border-radius:8px; cursor:pointer; font-size:13.8px`.
> - **Unselected**: `font-weight:500; color:#1A1E26; background:transparent`. Hover: `background:#F6F8FB`.
> - **Selected**: `font-weight:600; color:#005BB8; background:#EEF2F7`, with a **check icon** on the right (path `M20 6L9 17l-5-5`, 15px, stroke-width 2.5, `currentColor`).
> - No dividers between options; the 6px menu padding plus the 8px row radius create the inset pill look.
> - Example options: India · United States · United Kingdom · Singapore · UAE.
>
> ### 6. Behavior
> - Clicking the trigger toggles open/closed. Only one dropdown is open at a time (the parent owns the `openId` state).
> - Clicking an option calls `onSelect(value)` and closes the menu.
> - Clicking outside or pressing Escape closes it.
> - The trigger always shows the current value; there's no empty placeholder state (each field has a default, e.g. Country = "India").
> - Error state (when used inside a validated form): trigger border `1.5px solid #DC2626` + `box-shadow:0 0 0 3px rgba(220,38,38,.12)`, with the error line below.

---

## Tokens used

```
--primary:        #0070E0   (open border)
--primary-tint:   #EEF2F7   (open trigger bg, selected option bg)
--primary-tint-2: #F6F8FB   (option hover, lead-tile gradient end)
--on-tint-blue:   #005BB8   (selected option text + check, lead icon)
--ink:            #1A1E26   (value, option text, label)
--muted:          #5A6675   (chevron, prefix, hint)
--border:         #E4E9F0   (menu border)
--border-blue:    #E1E6EF   (lead-tile border)
Trigger border:   #D5DBE4   (1.5px)
--danger:         #DC2626
Radii:            trigger 10 · menu 12 · option 8 · lead tile 7
Heights:          trigger 44 · option ≈ 40 (10px + 13.8px line + 10px)
```

---

## Reference JSX (structure only)

```jsx
<div>
  <label htmlFor="t-country">Country</label>
  <div style={{ position:'relative' }}>
    <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-label="Country" onClick={toggle}>
      <span>{value}</span>
      <ChevronDown />
    </button>
    {open && (
      <ul role="listbox" aria-label="Country">
        {options.map(o => (
          <li key={o} role="option" aria-selected={o === value} onClick={() => select(o)}>
            {o}{o === value && <Check />}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
```
