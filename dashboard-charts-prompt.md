# Dashboard + Glossy Charts — Exact Design Prompt (SARAS One Console)

Every value below comes from the live dashboard code in `preview.html` (`DashSection`, `DashCard`, `DashKpi`, `DashArea`, `DashBars`, `DashDonut`, `DashGauge`, `DashSpark`, `DashTabs`, `DashTip`). Charts are hand-built **SVG** with no chart library. Swap in your own data: every component takes plain arrays.

---

## Prompt

> Build an analytics **dashboard** using hand-drawn SVG charts (no chart library) that look **glossy**: gradient fills, a soft colored drop shadow under every data shape, and a white sheen highlight on bars. Font **Poppins** (400/500/600), antialiased, page background `#F5F7FA`. Numbers always use `font-variant-numeric: tabular-nums`. All charts are responsive: measure the container width with a `ResizeObserver` (minimum 220px) and redraw the SVG at that width. Never stretch the SVG with `preserveAspectRatio`.
>
> ### 1. Page layout
> - Page header: title "Dashboard" (22px / 600, `#1A1E26`, margin `0 0 4px`) + subtitle (12.9px, `#5A6675`). A primary button sits on the right. The page enters with `fadeUp .28s ease` (`from {opacity:0; translateY(10px)}`).
> - Content is split into **sections**. Each section is `display:flex; flex-direction:column; gap:14px; margin-bottom:32px`. Its header row is `display:flex; align-items:flex-end; justify-content:space-between; gap:12px; flex-wrap:wrap` and contains:
>   - **Eyebrow** (e.g. "01 · Platform"): 12px / 600, `letter-spacing:.48px`, UPPERCASE, `#0070E0`.
>   - **Section title** `<h2>`: 18px / 600, `#1A1E26`, margin 0.
>   - Optional sub-line: 12.5px, `#5A6675`.
>   - Optional action (e.g. a picker) on the right.
> - **KPI row**: CSS grid, `gap:16px`. Use 4 columns on wide screens, 2 below ~848px and 1 below ~416px. Exact template: `repeat(auto-fit, minmax(clamp(calc(25% - 12px), calc((848px - 100%) * 1000), clamp(calc(50% - 8px), calc((416px - 100%) * 1000), 100%)), 1fr))`.
> - **Chart rows**: `display:flex; flex-wrap:wrap; gap:16px; align-items:stretch`. Size cards with flex-basis, e.g. a wide card `flex:2 1 min(100%, 480px)` next to a narrow card `flex:1 1 min(100%, 300px)`.
>
> ### 2. Card
> - Container: `background:#FFFFFF; border:1px solid #E4E9F0; border-radius:14px; box-shadow:0 4px 16px -8px rgba(16,42,84,.12); overflow:hidden; display:flex; flex-direction:column; min-width:0`.
> - **Header**: `padding:14px 18px 14px 15px; border-bottom:1px solid #E4E9F0; border-left:3px solid #0070E0` (blue accent bar on the left). It's a flex row (`space-between`, `gap:12px`, wraps) holding:
>   - Title `<h3>`: 16px / 600, `#1A1E26`, margin 0.
>   - Optional sub-line: 12.5px, `#5A6675`.
>   - Optional action (tabs) on the right.
> - Body: `flex:1; display:flex; flex-direction:column; min-width:0`. Charts sit inside with `padding:14px 16px 6px`.
> - Optional **summary footer** (one plain-language sentence about the chart): `padding:10px 18px 14px; border-top:1px solid #E4E9F0; font-size:12.5px; color:#5A6675; text-wrap:pretty`.
> - **Attention glow** (when a KPI click jumps to this card): play `dashGlow 1.8s ease-out .35s 1 both`. At 18% it shows `box-shadow:0 0 0 4px rgba(0,112,224,.22), 0 0 28px 2px rgba(0,112,224,.28)`, then fades back to the normal card shadow.
>
> ### 3. KPI tile
> - Same card style with `padding:16px 18px; display:flex; flex-direction:column; gap:10px`. It becomes a `<button>` when clickable.
> - **Row 1** (`gap:10px`):
>   - Icon tile: 34×34, radius 8, 17px line icon.
>   - Label: 12px / 600, `letter-spacing:.48px`, UPPERCASE, `#5A6675`, line-height 1.3.
>   - Tones for the icon tile (bg / icon color):
>     - default `#EEF2F7` / `#005BB8`
>     - `warn` `#FEF3E2` / `#B4790C`
>     - `danger` `#FDECEC` / `#B42318`
> - **Row 2** (`align-items:flex-end; justify-content:space-between`):
>   - Value: 28px / 600, line-height 1, `#1A1E26`. The danger tone colors the value `#B42318`.
>   - Optional sparkline on the right.
> - **Row 3**: 12.5px, `#5A6675` sub-text (e.g. "+1,240 this month"). Clickable tiles add a 14px right-arrow icon at the far right.
>
> ### 4. Card tabs (series / window switch)
> - `role="tablist"`: `display:flex; gap:4px; border-bottom:1px solid #E4E9F0`.
> - Tab: `height:36px; padding:0 12px; border:none; background:transparent; font-size:13px; font-weight:600; margin-bottom:-1px; white-space:nowrap`.
>   - Inactive: color `#5A6675`, `border-bottom:2px solid transparent`.
>   - Active: color `#0070E0`, `border-bottom:2px solid #0070E0`.
> - An optional count is appended as " (n)", e.g. "Next 7 days (3)".
>
> ### 5. Shared chart conventions
> - **Grid lines**: `stroke:#E4E9F0`. The baseline is solid; other ticks are dashed `3 4`.
> - **Y-axis labels**: 12px, `#5A6675`, `text-anchor:end`, 8px left of the plot area. Values ≥ 1000 are abbreviated as "1.2k".
> - **Nice ticks**: raw step = range ÷ n. Round it up to {1, 2, 2.5, 5, 10} × 10^k, then floor the min and ceil the max to that step.
> - **X labels**: 12px, `#5A6675`, centered, 9px from the bottom. Thin them automatically so they never collide. Hovered label: `#1A1E26`, weight 600.
> - **Tooltip** (HTML, absolutely positioned above the point, `translate(-50%,-100%)`, clamped 72px from the chart edges):
>   - `background:#1A2740; color:#fff; border-radius:8px; padding:7px 11px; box-shadow:0 10px 24px -8px rgba(16,42,84,.5); pointer-events:none; white-space:nowrap`.
>   - Two lines (`gap:2px`): title 11.5px `#C9D6EA`, then value 13px / 600 white (e.g. "3 license(s)").
> - **A11y**: every chart `<svg role="img">` gets an `aria-label` listing "label value, label value, …".
> - Each chart instance takes a unique `id` prefix for its `<defs>` (gradients and filters), so two charts on a page never collide.
>
> ### 6. Area chart (trend line)
> - Height 240. Padding: left 44, right 16, top 18, bottom 30. The y-range starts at `min × 0.92` (4 nice ticks).
> - **Area fill** (vertical gradient): `#0070E0` @ .30 → `#4DA0F2` @ .10 at 60% → `#4DA0F2` @ 0.
> - **Line**: width 3, round joins/caps. Stroke is a horizontal gradient `#4DA0F2 → #0058C4`.
> - **Glow under the line**: `feDropShadow dx=0 dy=5 stdDeviation=4 flood #0070E0 opacity .35`.
> - **Points**: the last point always shows a dot (r 4.5, white fill, `#0070E0` stroke 2.5). The hovered point grows to r 5.5.
> - **Hover**: an invisible full-height hit-rect per point. Hovering shows a dashed `3 3` vertical guide (`#0070E0` at opacity .3) plus the tooltip.
>
> ### 7. Bar chart (glossy rounded bars)
> - Height 220. Padding: left 38, right 8, top 18, bottom 30. 3 nice ticks from 0. Bar width = `min(44, slot × 0.58)`, centered in its slot.
> - **Bar shape**: only the top corners are rounded (radius 6, clamped to half the width and to the bar height), and the bottom is flat on the baseline. Path: `M x base V y+r Q x y x+r y H x+w-r Q x+w y x+w y+r V base Z`. Non-zero values are drawn at least 3px tall.
> - **Fill**: a vertical gradient per tone (top → bottom):
>   - `blue` `#4DA0F2 → #0070E0`
>   - `red` `#F37B7B → #DC2626`
>   - `amber` `#FCC85A → #F59E0B`
>   - `soft` `#BCD3EE → #8DB1DC`
> - **Gloss sheen**: a second bar path over the left 55% of the width. Its horizontal gradient runs white @ .32 → white @ .06 at 45% → white @ 0, with `pointer-events:none`.
> - **Shadow**: `feDropShadow dx=0 dy=4 stdDeviation=3.5 flood #0B3A75 opacity .22`.
> - **Baseline**: solid `#C9D3E0`.
> - **Hover**: the whole slot gets a `rgba(0,112,224,.06)` column wash. Other bars dim to opacity .55, and the tooltip appears.
> - **Legend** under the chart: `display:flex; gap:14px; flex-wrap:wrap; padding:0 18px 12px; font-size:12px; color:#5A6675`. Each item is a 10×10 radius-3 swatch in the tone's dark stop + label (`gap:6px`).
>
> ### 8. Donut chart
> - Layout: `display:flex; align-items:center; gap:20px; flex-wrap:wrap; padding:18px 20px`, with the SVG on the left and the legend list on the right.
> - SVG 150×150 (viewBox 140). Ring r = 52, stroke-width 18.
> - Track circle `#EEF2F7`. Segments are `stroke-dasharray` arcs with a 1.5px gap between them, rotated −90° to start at 12 o'clock.
> - Segment shadow: `feDropShadow dy=3 stdDeviation=3 flood #0B3A75 opacity .18`.
> - Inner highlight ring: r 40, white stroke at opacity .5, width 2.
> - **Center text**: value 22px / 600 `#1A1E26` at y 68, then a sub-line 10.5px `#5A6675` at y 86.
>   - On segment hover the center switches to that segment's value plus "NN% · Label", and the hovered segment thickens to 22 (`transition: stroke-width .15s`).
> - **Legend list** (`gap:9px; flex:1 1 150px`). Each row: a 10×10 radius-3 swatch, the label (13px `#1A1E26`), the value (600, tabular), and the percent (38px right-aligned, 12px `#5A6675`). Hovering a row highlights its segment; the other rows dim to .5.
> - Example palette: Active `#16A34A`, Inactive `#0070E0`, Suspended `#DC2626`, Invited `#5AA2EC`, Locked `#F59E0B`.
>
> ### 9. Gauge (half-ring percentage)
> - SVG 190×110 (viewBox 150×86). Arc path `M15 78 A60 60 0 0 1 135 78`, stroke-width 14, round caps.
> - Track `#EEF2F7`. The value arc is drawn with `stroke-dasharray = π·60 × pct/100`.
> - Its horizontal gradient is `#4DA0F2 → #0070E0` when the value is ≥ 80%, otherwise `#FCC85A → #F59E0B`. Glow: `feDropShadow dy=3 stdDeviation=3`, flood = the dark stop, opacity .35.
> - Center: "NN%" at 24px / 600 `#1A1E26`, y 70.
>
> ### 10. Sparkline (inside KPI tiles)
> - 92×30, no axes.
> - Line `#0070E0`, width 2, round. Underneath, an area with a vertical gradient `#0070E0` @ .25 → 0.
>
> ### 11. Progress bar (table cells, e.g. seats used)
> - Track: `flex:1; height:6px; border-radius:3px; background:#EEF2F7; overflow:hidden`. Fill width = %.
> - Fill color: `#0070E0` below 75%, `#F59E0B` at 75–89%, `#DC2626` at ≥ 90%.
> - Caption on the right: 12px, `#5A6675`, tabular (e.g. "412/500 accounts").
>
> ### 12. Interactions
> - Clicking a KPI tile smooth-scrolls to its related section (12px offset) and fires the glow on the target card.
> - Tabs swap the dataset and re-key the chart so it redraws cleanly.
> - Every chart has a plain-language summary sentence in the card footer.

---

## Tokens

```
Primary       #0070E0   gradient light #4DA0F2   deep #0058C4   shadow ink #0B3A75
Primary tint  #EEF2F7   (tracks, KPI icon bg)    tint-2 #F6F8FB
On-tint blue  #005BB8
Ink           #1A1E26   Ink-alt #1A2740 (tooltip bg)   Muted #5A6675   Tooltip sub #C9D6EA
Border        #E4E9F0   Baseline #C9D3E0
Surface       #FFFFFF   Page #F5F7FA
Tones         blue  #4DA0F2→#0070E0   red   #F37B7B→#DC2626
              amber #FCC85A→#F59E0B   soft  #BCD3EE→#8DB1DC
Status        success #16A34A  danger #DC2626 / text #B42318 / tint #FDECEC
              warning #F59E0B / text #B4790C / tint #FEF3E2
Radii         card 14 · KPI icon 8 · tooltip 8 · bar top 6 · swatch 3 · progress 3
```

---

## Data shapes (plug in your own)

```js
<KpiTile label="Licenses expiring in 7 days" value={3} tone="danger" icon={clockPath}
         sub="1,200 accounts · 2 tenants" onClick={jumpToRenewals} />

<AreaChart id="growth" data={[1200, 1350, …]} labels={['Nov','Dec', …]} unit="accounts" />

<BarChart id="expiry" data={[3,1,2,0,1,3]} labels={['0–7','8–14','15–30','31–60','61–90','90+']}
          tones={['red','amber','amber','blue','blue','soft']} unit="license(s)" />

<Donut id="status" parts={[{ label:'Active', value:4, color:'#16A34A' }, …]} center="6" centerSub="tenants" />

<Gauge id="mfa" pct={86} />
<Sparkline data={[4,6,5,8,7,9]} />
```
