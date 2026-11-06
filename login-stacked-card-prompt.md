# Prompt — Stacked card effect behind the Login card (SARAS One Console)

Add a "stacked deck" effect behind the sign-in card on the Login screen (`src/pages/Login.tsx`), so the card looks like the front sheet of a short stack. It's decoration only: no interaction, no content, hidden from screen readers. Use inline styles, the SARAS UX Standard (blue tints on a neutral canvas, shallow shadows) and no new brand colours. Apply the same change to `preview.html` and `_standalone-src.html`.

## Structure
Wrap the existing login card in a `position: relative` container with no background, border or padding. Inside it, in this order:

1. **Back sheet** (furthest back, `aria-hidden="true"`)
   - `position: absolute; top: -13px; left: 11%; right: 11%; height: 34px`
   - `border-radius: 16px 16px 0 0`
   - `background: linear-gradient(180deg, #F4F8FE 0%, #E7F0FC 100%)`
   - No border, no shadow. `z-index: 0`.

2. **Middle sheet** (`aria-hidden="true"`)
   - `position: absolute; top: -6px; left: 6.5%; right: 6.5%; height: 26px`
   - `border-radius: 16px 16px 0 0`
   - `background: linear-gradient(180deg, #EEF4FD 0%, #FFFFFF 100%)`
   - No border, no shadow. `z-index: 0`.

3. **Front card**: the existing login card, unchanged in content.
   - `position: relative; z-index: 1; overflow: hidden`
   - `background: var(--surface)` (white); `border: 1px solid var(--border)` (#E4E9F0); `border-radius: 20px`
   - `box-shadow: inset 0 1px 0 rgba(255,255,255,.7), 0 16px 34px -22px rgba(16,42,84,.30)`

## Rules
- Only the top edge of each sheet peeks out. They sit above the card and are covered by it below that, so only 13px and 6px strips show.
- Each sheet is narrower than the one in front (back 78%, middle 87%, front 100%), so the stack reads as perspective.
- Gradients go from a cool blue tint at the top to near-white, so the sheets fade into the card. No hard borders on the sheets.
- Corner radius gets smaller towards the back (front 20px, sheets 16px) and only the top corners are rounded.
- Page background behind the stack: `radial-gradient(680px 480px at 70% 10%, #EEF2F7 0%, transparent 70%)`, padding `40px 28px`.
- The card should look like it floats: one soft, low shadow on the front card only.
- Responsive: widths are percentages, so the stack scales with the card. Nothing should overflow at 360px wide.
- Reduced motion: no animation is required. If you add an entry fade, keep it ≤ .28s and turn it off for `prefers-reduced-motion`.

## Don't
- Don't put text, shadows or borders on the sheets.
- Don't rotate or offset the sheets sideways. The stack is vertical and centred.
- Don't change the login form, buttons or SSO options.
