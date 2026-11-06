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
  primary-ink: "#005BB8"
  primary-soft: "#1877D6"
  primary-deep: "#0F66C4"
  success-tint: "#E7F6EC"
  warning-tint: "#FEF3E2"
  error-tint: "#FEECEC"
  success-ink: "#0E7A36"
  warning-ink: "#B4790C"
  error-ink: "#B21E1E"
  control-border: "#8A93A2"
  primary-edge: "#0A5BBF"
  focus-ring: "rgba(0,112,224,0.35)"
  focus-ring-soft: "rgba(0,112,224,0.14)"

themes:
  switchedBy: "data-theme on the root element"
  set: "light (default) | dark | hc (high contrast)"
  remappable: "surface, text, border, and the wash/ink pairs — never the token names"
  rule: "author with tokens only; every theme measured independently"
  respects: "prefers-color-scheme, prefers-reduced-motion, prefers-contrast"

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

motion:
  ease: "cubic-bezier(.22,1,.36,1)"
  fast: 140ms
  base: 200ms
  slow: 280ms
  loader-delay: 200ms
  loader-min-visible: 400ms
  shimmer: "1.4s ease-in-out, inline direction"
  reveal: "opacity + 4px rise, 200ms"
  stagger: "40ms per row, capped at 6"
  reducedMotion: "no shimmer, no stagger, no rise"

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
  tree-panel:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    width: "clamp(260px, 24%, 320px)"
    padding: "{spacing.md}"
  tree-toolbar:
    buttonSize: 30px
    iconColor: "{colors.primary}"
    hoverBackground: "{colors.primary-tint}"
    gap: "{spacing.xs}"
    ariaLabel: required
  tree-item:
    minHeight: 44px
    rounded: "{rounded.md}"
    padding: "0 {spacing.sm}"
    gap: 10px
    textColor: "{colors.ink}"
    typography: "{typography.nav-link}"
    iconColor: "{colors.primary}"
    truncate: ellipsis
  tree-item-hover:
    backgroundColor: "{colors.primary-tint}"
  tree-item-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    iconColor: "{colors.on-primary}"
    fontWeight: 600
    rounded: "{rounded.md}"
    ariaCurrent: "true"
  tree-count:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-hover}"
    rounded: "{rounded.pill}"
    height: 22px
    minWidth: 28px
    fontSize: 12px
    fontWeight: 600
    tabularNums: true
    flexShrink: 0
  tree-count-active:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
  tree-indent-per-level: 20px
  slide-over:
    backgroundColor: "{colors.surface}"
    scrim: "{component.modal-overlay}"
    edge: inline-end
    width: "clamp(360px, 32%, 560px)"
    boxShadow: "{shadow.popover}"
    animation: "slide from inline-end, .28s"
    portal: true
    ariaRole: dialog
    ariaModal: true
    trapsFocus: true
  breadcrumb:
    typography: "{typography.meta}"
    textColor: "{colors.muted}"
    separator: "chevron, aria-hidden"
    currentCrumb: "plain text + aria-current=page"
    collapse: "middle ellipsis when deep"
  editor:
    output: html
    math: "stored as portable math markup; rendered output must expose MathML or a spoken label"
    toolbar: "grouped clusters, one tab stop, arrow-key movement, labelled buttons"
    sanitize: "allow-list before render, always"
  permission-gate:
    modes: "hide | disable-with-reason | explain"
    loadingState: "{component.skeleton} — never flash ungated UI"
    enforcement: "presentation only; re-checked server-side"
  date-time-picker:
    modes: "date | time | datetime"
    typedEntry: always
    height: 44px
    rounded: "{rounded.md}"
    borderColor: "{colors.control-border}"
    calendarGrid: "role=grid, arrow keys, Home/End, PageUp/PageDown"
    bounds: "min / max, disabled dates announced as disabled"
    clearable: true
    localeSource: "month and day names, week start and format from the locale"
  date-range:
    fields: "start and end, validated as a pair"
    zoneLabel: required
    nested: "an inner window must sit inside its outer window"
  assignment-picker:
    layout: "source list + assigned list, one screen"
    modes: "individual | group"
    bulk: "select all, clear, auto-distribute"
    counts: "total / assigned / unassigned always visible"
  review-queue:
    tabs: "pending | approved | rejected | all"
    decision: "approve or reject, reason required on reject"
    comparison: "side-by-side evidence where the decision is a comparison"
    refresh: "manual, plus polling that never interrupts a decision"
  upload-dropzone:
    accepts: "stated file types and record limit, before upload"
    template: "downloadable template beside the control"
    rounded: "{rounded.md}"
    border: "1.5px dashed {colors.control-border}"
  item-editor:
    layout: "authoring column + live learner preview"
    sections: "content · stimulus · metadata · scoring · feedback · workflow"
    previewParity: "preview renders the learner view, not an approximation"
  workflow-status:
    ramp: "neutral | warning | success | error | primary — the existing semantic ramp only"
    pairing: "wash background + matching -ink text + glyph"
    rule: "extra states are carried by the label, never by a new hue"
  workflow-comment:
    surface: "{component.slide-over}"
    order: newest-first
    attribution: "author, step and timestamp on every entry"
  version-history:
    compare: "selected version beside current"
    immutable: true
  similarity-panel:
    trigger: "as the author types, debounced"
    blocking: false
    dismissible: true
    shows: "match strength + item code + preview"
  ai-assist:
    provenance: "AI-generated items are labelled until a human accepts them"
    gate: "review-before-save, always"
    editable: "output is a draft, fully editable"
  job-status:
    states: "not started | in progress | completed | failed"
    surface: "job list with history, refresh and download"
    announce: "polite on completion"
  rubric-card:
    backgroundColor: "{colors.surface-alt}"
    rounded: "{rounded.md}"
    shows: "rubric name, criteria count, max score"
  switch:
    rounded: "{rounded.pill}"
    trackOff: "{colors.control-border}"
    trackOn: "{colors.primary}"
    thumb: "{colors.surface}"
    size: "40x22 track, 44x44 hit area"
    ariaRole: switch
    ariaChecked: required
  filter-chip:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.pill}"
    removable: "trailing x button with aria-label"
    clearAll: required
  info-popover:
    trigger: "{component.button-icon}, aria-expanded"
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    boxShadow: "{shadow.popover}"
    maxWidth: 320px
    dismiss: "Esc, outside click; focus returns to trigger"
  metric-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    iconTile: "{colors.primary-tint}"
    value: "28-32px, weight 600, tabular figures"
    label: "{typography.eyebrow}"
    trend: "glyph + text, never colour alone"
  tts-control:
    ariaPressed: true
    scope: "stem and each option separately"
    label: "Read aloud"
  signer-panel:
    ariaRole: dialog
    scope: "stem and each option separately"
    dismissible: true
  exam-aids:
    surface: "{component.slide-over}"
    scope: "reference documents permitted for this assessment"
  break-overlay:
    obscures: "all item content"
    ariaRole: dialog
    resumeExplicit: true
  review-grid:
    control: "{component.item-nav-button}"
    filters: "all | unanswered | flagged | answered"
    legend: "{component.status-legend}"
  a11y-toolbar:
    control: "{component.button-icon}"
    placement: "header action cluster"
    gap: "{spacing.xs}"
    ariaLabel: required
    touchTarget: "44x44 hit area"
  text-size-control:
    steps: "100% / 125% / 150%"
    mechanism: "root font-size; all type in rem"
    announce: "polite, via the single app announcer"
  contrast-theme:
    scope: "canvas, surface, ink, hairline only — never the semantic or brand ramp"
    minContrast: "4.5:1 text / 3:1 non-text in every theme"
    persistence: "per learner, restored on resume"
  item-nav-button:
    size: 40px
    rounded: "{rounded.sm}"
    typography: "{typography.body-strong}"
    tabularNums: true
    borderColor: "{colors.input-border}"
  item-nav-answered:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-primary}"
    glyph: "check"
  item-nav-unanswered:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    glyph: none
  item-nav-flagged:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    glyph: "bookmark"
  item-nav-current:
    outline: "3px solid {colors.primary}"
    outlineOffset: 2px
    ariaCurrent: "true"
  status-legend:
    pairing: "swatch + glyph + text label — never a swatch alone"
    typography: "{typography.meta}"
  header-blue:
    background: "linear-gradient(180deg, {colors.primary-soft}, {colors.primary-deep})"
    boxShadow: "0 2px 14px -4px rgba(0,46,110,.5)"
    height: 64px
    padding: "0 20px 0 16px"
    logo: "white plaque — see {component.logo}"
    controls: "white outline treatments at >=3:1"
  account-pill:
    height: 46px
    rounded: "{rounded.pill}"
    borderColor: "{colors.control-border}"
    avatar: "34px circle, gradient {colors.primary-soft} to {colors.primary-deep}, white initials"
    text: "name 14px/500 {colors.ink} over role 12px {colors.muted}"
    accessibleName: "the user's name, not 'Account menu'"
    menuWidth: 264px
    signOut: "last, separated, destructive wash"
  notification-bell:
    size: 40px
    rest: "{colors.muted} glyph on {colors.primary-tint}"
    hover: "{colors.primary-ink} glyph"
    badge: "min 17px pill, {colors.error} + white 10px/500, 2px {colors.surface} ring, pinned -3px"
    countInName: "Notifications, N unread"
    zeroState: "no badge, never a 0"
  header-search:
    width: "320px, max-width 26vw"
    height: 42px
    rounded: "{rounded.pill}"
    rest: "{colors.hairline} border on {colors.surface-alt}"
    focus: "solid {colors.primary} border + {colors.surface} fill + soft halo"
    padding: "0 46px 0 40px"
  voice-input:
    size: 32px
    ariaPressed: true
    listening: "{colors.error} fill, white glyph, pulsing ring, placeholder swaps"
    fallback: "typing always reaches the same result"
    reducedMotion: "no pulse — fill and placeholder carry the state"
    result: "editable text the user confirms, never auto-submitted"
  back-to-top:
    size: "48x48, {rounded.xl}"
    position: "fixed, right 26px, bottom 26px, z-index 50"
    fill: "linear-gradient(145deg, #1D8BFF, #0059C8)"
    appearsAfter: "~320px of scroll"
    reveal: "opacity + translateY(14px) scale(.9), .24s — never display toggling"
    onClick: "scrollTo top AND move focus to the top landmark"
    perCorner: "one floating control only"
  notification-popover:
    width: 340px
    listMaxHeight: 340px
    countPill: "{colors.primary-ink} on {colors.primary-tint}"
    typeTile: "glyph carries the type; semantic wash only for real success/warning/error"
    unread: "dot + title weight — never colour alone"
    timestamp: "relative in the row, absolute with zone in title and full-page view"
    footer: "sticky Mark all as read"
  segmented-tabs:
    track: "{colors.surface-page}, {rounded.md}, inset hairline"
    pill: "white, 9-10px radius, soft shadow, slides 200ms {motion.ease}"
    activeLabel: "{colors.primary} 500"
    inactiveLabel: "{colors.muted} — not muted-soft, which fails on the track"
    segments: "2-4"
    reducedMotion: "pill appears, does not slide"
  checkbox:
    size: "19px default, {rounded.xs} 6px, 1.5px border, box-sizing border-box"
    off: "{colors.surface} fill, {colors.control-border} border"
    offHover: "border {colors.primary}"
    on: "linear-gradient(180deg, #1A86F0, {colors.primary}), border {colors.primary-edge}, glow 0 2px 7px rgba(0,112,224,.28)"
    tick: "SVG polyline 20 6 9 17 4 12, white, stroke-width 3.4 on a 24 viewBox, round caps, ~62% of the box"
    transition: "background, border-color, box-shadow .18s ease"
    focus: "the standard solid 3px {colors.primary} outline — the soft glow is decoration, not the indicator"
    ariaRole: checkbox
    indeterminate: "aria-checked=mixed"
    hitArea: "44x44 regardless of box size"
  auth-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    width: "min(440px, 100%)"
    boxShadow: "{shadow.card}"
  otp-input:
    behavesAs: "one field, not N"
    paste: "fills every box"
    autocomplete: "one-time-code"
    groupName: required
    resend: "countdown, then an enabled button"
  sso-button:
    variant: "{component.button-ghost}, full width, equal weight"
    providerMark: "trademark — not re-drawn, not theme re-mapped, aria-hidden"
  app-tile:
    accent: "per-product, tile marker only — never a second hue inside the product"
    focusRing: required
  tenant-context:
    placement: "header, every screen"
    switching: "explicit and confirmed; resets filters and selections"
  log-view:
    order: newest-first
    timestamp: "first column, with zone, tabular figures"
    severity: "badge on the semantic ramp — never a coloured row"
    expand: in-place
    immutable: true
  brand-loader:
    scope: "cold start only, once per session"
    backgroundColor: "{colors.canvas}"
    motion: "single restrained mark or breath — never a spinning logo"
    exit: "fade into the shell, 240ms"
  content-reveal:
    transition: "{motion.reveal}"
    stagger: "{motion.stagger}"
    crossfade: "skeleton out as content in — no blank frame"
  lazy-region:
    boundary: "per pane, never per page"
    fallback: "{component.skeleton}"
    prefetch: "on hover or focus of the control that opens it"
  image-load:
    reservesBox: "intrinsic dimensions or aspect-ratio, always"
    placeholder: "{colors.primary-tint-2}"
    fadeIn: 200ms
    lazyBelowFold: true
  skeleton:
    backgroundColor: "{colors.primary-tint}"
    shimmer: "{colors.primary-tint-2}"
    rounded: "{rounded.sm}"
    ariaHidden: true
    announce: "one polite 'Loading …' on the region"
    reducedMotion: "shimmer disabled, flat tint"
  exam-timer:
    typography: "{typography.body-strong}"
    tabularNums: true
    ariaRole: timer
    announceAt: "50% / 10 min / 5 min / 1 min, polite"
    warnColor: "{colors.warning}"
    criticalColor: "{colors.error}"
  item-frame:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
    stemMeasure: "68ch"
    rhythm: "{spacing.section} between stimulus, prompt and response"
  item-stem:
    typography: "{typography.body}"
    fontSize: "1rem, scales with text-size-control"
    lineHeight: 1.65
  choice-tile:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.input-border}"
    rounded: "{rounded.md}"
    minHeight: 52px
    padding: "{spacing.sm} {spacing.md}"
    gap: "{spacing.sm}"
    indicator: "native radio or checkbox, always visible"
  choice-tile-hover:
    backgroundColor: "{colors.primary-tint-2}"
    borderColor: "{colors.hairline-blue}"
  choice-tile-selected:
    backgroundColor: "{colors.primary-tint}"
    borderColor: "{colors.primary}"
    borderWidth: 1.5px
    textColor: "{colors.ink}"
  choice-key:
    backgroundColor: "{colors.primary-tint}"
    textColor: "{colors.primary-hover}"
    rounded: "{rounded.sm}"
    size: 26px
    typography: "{typography.meta}"
  option-token:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline-blue}"
    rounded: "{rounded.pill}"
    minHeight: 44px
    grabAffordance: "leading grip glyph"
  option-token-placed:
    backgroundColor: "{colors.primary-tint}"
    borderColor: "{colors.primary}"
    textColor: "{colors.ink}"
  drop-target:
    border: "1.5px dashed {colors.input-border}"
    rounded: "{rounded.md}"
    minHeight: 44px
    backgroundColor: "{colors.surface-alt}"
  drop-target-active:
    border: "1.5px solid {colors.primary}"
    backgroundColor: "{colors.primary-tint}"
  inline-blank:
    borderBottom: "1.5px solid {colors.input-border}"
    rounded: "{rounded.xs}"
    minWidth: 96px
    align: baseline
    label: "Blank N of M"
  pair-row:
    layout: "prompt at inline-start, response slot at inline-end, one row"
    divider: "{colors.hairline}"
    minHeight: 56px
  scale-grid:
    header: "{typography.table-header}"
    rowDivider: "{colors.hairline}"
    collapseBelow: 768px
    collapsedAs: "one card per row"
  hot-text:
    resting: "underline {colors.input-border}"
    selected: "{colors.primary-tint} background + {colors.primary} underline"
    ariaPressed: true
  hotspot-marker:
    size: 28px
    resting: "2px {colors.primary} ring on {colors.surface}"
    selected: "{colors.primary} fill, white glyph"
  stimulus-pane:
    split: "clamp(38%, 46%, 56%)"
    scroll: independent
    stackBelow: 1024px
  media-stimulus:
    rounded: "{rounded.md}"
    autoplay: never
    requires: "captions and transcript"
  logo:
    asset: "assets/saras-logo.png — 509 x 166, transparent"
    aspectRatio: "3.07:1"
    sizing: "set height only; width: auto — never both, never distorted"
    height-header: 38px
    height-header-width: "~117px"
    height-auth-primary: 44px
    height-auth-secondary: 40px
    height-partner-lockup: 15px
    minHeight: 26px
    headerSlot: "matches the side-nav column width, 18px inset, hairline right divider"
    onDarkSurface: "white plaque — 11px radius, padding 6px 12px; mark drops to 30px so the plaque totals 42px"
    lockupBand: "38-42px of the 64px header bar, 11-13px clear above and below"
    clearSpace: "0.5x logo height on all four sides, free-standing"
    reserveBox: "declare the computed width so the header does not reflow on load"
    altText: "product name"
    placement: "header branding <span> — never the page <h1>"

engineering:
  organisation: "shared before local; extract on the second use"
  styleSource: "tokens only — no literal colour, size or spacing in components"
  handlers: "named functions, never inline markup attributes"
  http: "one configured client; every request has loading, empty and error states"
  messages: "inline = field · banner = form · modal = decide · toast = success/passive"
  responsive: "first pass, not a retro-fit"
  secrets: "never committed, including in prototypes"
  gate: "reviewed like the accessibility rules, not as a style preference"

accessibility:
  conformance: "WCAG 2.2 AA · Section 508 · EN 301 549"
  principle: "HTML first → native first → keyboard first → screen reader first → ARIA only when required"
  focusOutline: "3px solid {colors.primary}"
  focusOutlineOffset: 2px
  focusHalo: "{colors.focus-ring}"
  textContrast: "4.5:1"
  nonTextContrast: "3:1"
  minTargetSize: "24x24 (AA floor, SC 2.5.8)"
  touchTargetSize: "44x44"
  zoom: "100% / 200% / 400%"
  screenReaders: "NVDA, JAWS, Narrator, ZoomText, VoiceOver (macOS/iOS), TalkBack"
  browsers: "Chrome, Edge, Firefox, Safari, iOS Safari, Chrome Android, Samsung Internet"
  gate: "Every rule in §Accessibility is a merge gate; a miss is a defect, not polish."
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

> Never place `{colors.primary}` **text** on a tinted blue background — at 4.25:1 the pairing
> fails. Use `{colors.primary-ink}` on the tint instead (5.9:1), per §Ink Variants & Control
> Borders.

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

### Ink Variants & Control Borders

Two rules that keep the palette usable at AA. Both exist because a colour that works as a
**fill** usually fails as **text**, and a colour that reads as a **decorative line** usually
fails as a **control boundary**.

**Every accent and semantic colour has an `-ink` partner for text.** Use the base colour for
fills, icons, and 3:1 non-text elements; use the ink for coloured text at any size.

| Role | Fill | Ink (for text) | Ink on white |
|---|---|---|---|
| Primary | `{colors.primary}` #0070E0 — 4.8:1 | `{colors.primary-ink}` #005BB8 | 6.6:1 |
| Success | `{colors.success}` #16A34A — 3.3:1, **fails as text** | `{colors.success-ink}` #0E7A36 | 5.5:1 |
| Warning | `{colors.warning}` #F59E0B — 2.2:1, **fails as text** | `{colors.warning-ink}` #B4790C | 3.7:1 (large/bold only) |
| Error | `{colors.error}` #DC2626 — 4.8:1 | `{colors.error-ink}` #B21E1E | 6.8:1 |

This is what makes badges, count pills, and status text safe: a tinted background carrying its
ink text, never the fill colour used as type. It also resolves the standing rule against
`{colors.primary}` text on a blue tint — at **4.25:1** it fails, while `{colors.primary-ink}`
on the same tint measures **5.9:1** and is the correct token.

**Control boundaries meet 3:1 (SC 1.4.11).** `{colors.input-border}` #D5DBE4 measures
**1.4:1** against white — a decorative hairline, not a boundary a low-vision user can find.
Where a border is **the only thing identifying a control** — the edge of a text field, select,
checkbox, radio, or secondary button — use `{colors.control-border}` #8A93A2 (3.1:1). Keep
`{colors.input-border}` for internal dividers and non-identifying edges.

## Themes

The palette above is the **light theme**, and it is the default. The system also ships a
**dark** theme and a **high-contrast** theme, switched by a `data-theme` attribute on the root
element. `prefers-color-scheme`, `prefers-contrast`, and `prefers-reduced-motion` are honoured
on first load; an explicit user choice overrides them and persists.

**The contract, not the values, is what this document fixes:**

- **Author with tokens, never literals.** Every colour in every component resolves through a
  token. A single hard-coded hex is a component that breaks in two of the three themes, and it
  will not be caught by review — only by a user.
- **Token names are stable across themes; only their values change.** `{colors.surface}` is
  "the raised surface" in every theme, not "white". Components never branch on theme.
- **Only surface, text, border, and wash/ink pairs are re-mapped.** Structure, spacing, radius,
  and motion are identical in all three; a theme is a repaint, never a relayout.
- **Every theme is measured independently.** A pairing that passes in light can fail in dark —
  a light theme's ink variants are usually too dark to serve as dark-theme text, and dark
  themes need *lighter* inks against their surfaces. Contrast is verified per theme, not
  inherited.
- **Dark is not inverted light.** Pure black surfaces and pure white text produce halation;
  raise the darkest surface off black and step text down from pure white. Shadows carry almost
  no signal on dark surfaces, so separation comes from surface steps and borders instead.
- **High contrast is a discrete theme, not a filter.** It is used when the user asks for it,
  and it is allowed to drop the brand accent in favour of maximum separation.
- Elevation, imagery, illustrations, and charts are all in scope. A chart palette tuned for a
  white canvas is unreadable on a dark one.

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
- **Delivery surfaces read longer.** Item stems, passages, and instructions use `item-stem`
  (1rem, 1.65 line height, ~68ch measure) rather than the 14px admin body — see §Assessment
  Items. Compact density governs admin screens, not reading under exam conditions.
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

**Where the primitives live.** The primitive set may be published as a shared package or live
in-repo — that is a packaging decision, not a design one. What this document fixes is the
**contract**: the token names here (`text-field`, `dropdown-trigger`, `pager`,
`step-indicator`, `skeleton`, `toast`, …) name the components, and every implementation maps
onto them. Two consequences: a screen must never fork a local copy of a primitive that already
exists — extend the shared one instead; and when more than one implementation of the same
primitive exists, they are a migration in progress, not a choice, and this document describes
the target both converge on.

### App Shell

**`header`** — 64px fixed bar, **z-index 60** (always above sticky filter bars). Semantic
`<header>` (no redundant `role="banner"`). Left: the logo lockup as a `<span>` (never an
`<h1>`), a 1 × 26px divider, then the product name. Right: tenant context (§App Switcher &
Tenant Context), `notification-bell`, and `account-pill` — all portal-mounted so their menus
escape the header stacking context.

**Two surfaces, same geometry.** The bar is either **white** with a bottom hairline, or
**blue** — a `180deg` gradient from `{colors.primary-soft}` to `{colors.primary-deep}` with a
soft downward shadow instead of a border. Height, padding (`0 20px 0 16px`), z-index and
contents are identical; only the surface changes, and it is a per-product choice, not a
per-screen one. On the blue bar every control is a white outline treatment,
and the logo takes its white plaque (§Logo).

> White text clears **4.5:1** at the gradient's lightest point (`{colors.primary-soft}`,
> 4.52:1) and 5.65:1 at its darkest — so it passes, but with almost no margin at the top of
> the bar. Don't lighten that stop, don't drop header text below 14px, and don't use a
> translucent white for anything that carries meaning.

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

### Authentication & Account Recovery

The first screen anyone sees, and the one most likely to be built once and never revisited. It
carries the brand more than any other surface, and it is also where a keyboard or screen reader
failure locks a user out of the product entirely.

**Sign-in** — a centred card on `{colors.surface}` over the page canvas, `{rounded.xl}`, capped
at `min(440px, 100%)`, with the wordmark above the form and any "powered by" lockup below it.
The optional hero panel beside it is the one place a richer treatment is allowed — it carries no
controls the user needs, so it may sit on a deep brand surface with the product tiles or
messaging on it.

- **Email and password are real fields** with visible labels, `autocomplete` (`username`,
  `current-password`), and a show/hide toggle labelled for its action, not for its state.
- **Sign in is a `<form>` with a submit button**, so Enter works from any field. This is the
  most-reported auth bug and the easiest to avoid.
- **Failed sign-in reports once, in one place** — a form-level `role="alert"` above the fields.
  Never a toast (it vanishes), and never separate errors on both fields (it implies which one
  was wrong).
- **Never say which factor was wrong.** "Email or password is incorrect", not "no such account".
- **SSO providers** sit below a labelled divider as full-width secondary buttons of equal weight,
  each `aria-label`ed "Continue with X" and carrying the provider mark as a decorative
  `aria-hidden` glyph. Provider marks are the one exception to the single stroke-icon rule
  (§Shapes) — they are trademarks and must not be redrawn — and are also exempt from theme
  re-mapping. Order them by what the audience actually uses.
- Sign-in never traps: forgotten-password and support routes are visible without scrolling.

**`otp-input` — verification codes.** A row of single-character fields for the MFA or
verification code, with the destination stated in full above it ("we sent a 6-digit code to
…").

- **It behaves as one field, not six.** Typing advances, Backspace on an empty box moves back
  and clears, ← → move between boxes, and **pasting the whole code fills every box** — the way
  most people enter a code they just received.
- `inputMode="numeric"` and `autocomplete="one-time-code"`, so the platform can offer the code
  from the message.
- **One accessible name for the group** (`role="group"` labelled "Verification code"); each box
  is labelled by position ("digit 3 of 6"). Six unlabelled inputs read as six unrelated fields.
- Verify is `disabled` until the code is complete, and a wrong code clears the boxes, returns
  focus to the first, and announces the failure politely — it never silently blanks.
- **Resend is a countdown, not a dead control**: "Resend in 0:24", becoming an enabled button.
  State the wait rather than making the user guess whether the click registered.
- The route back to sign-in is always present.

**Recovery** — reset and set-password screens use the same card, state the **policy rules up
front** (below) rather than only on failure, and confirm success on a screen rather than a
toast, because the user is about to navigate away.

### Folder Tree & Repository Navigator

The standard pattern for **any hierarchical or scoped object list that filters the main
content area** — repositories, item banks, question folders, categories, course trees, media
libraries. Whenever a screen needs "pick a container on the left, work on its contents on the
right," build this; never invent a per-screen list.

**Anatomy — top to bottom**

**1 · Panel (`tree-panel`)** — a white `{colors.surface}` column at
`clamp(260px, 24%, 320px)`, `{spacing.md}` padding, separated from the content area by a
single `{colors.hairline}` right border (no shadow — this is chrome, not a card). It is a
flex sibling of `<main>`'s content region, scrolls independently (`overflow-y:auto`), and
collapses to a drawer below 768px per §Responsive Behavior.

**2 · Scope selector** — an optional full-width `dropdown-trigger` at the top under a
`{typography.card-title}` label naming the scope. It scopes the tree beneath it; changing it
**resets the tree selection and the content pane**, exactly like the parent/child dropdown
rule in §Layout. Skip this row when the tree has no parent scope.

**3 · Section header row** — a flex `space-between` row: an eyebrow label on the left
(`{typography.eyebrow}` — uppercase, 0.48px tracking, `{colors.muted-soft}`, e.g.
"REPOSITORIES") and the `tree-toolbar` on the right.

**4 · `tree-toolbar`** — `button-icon`s at `{spacing.xs}` gap, hover filling
`{colors.primary-tint}`. The standard trio is **Add · Edit · Delete**. Each **requires an
`aria-label`** naming the object, not the glyph ("Add repository", not "Add"). Edit and Delete
are `disabled` (+ `not-allowed`) whenever no node is selected — never live buttons that error
on click. Delete always routes through the destructive confirm dialog variant in §Building a
modal.

**5 · `tree-item` rows** — a 44px min-height row, `{rounded.md}`, `0 {spacing.sm}` padding,
10px gap, 4px vertical gap between siblings. Three parts in a `flex` row:
- **Folder icon**, 20px, from `icons.jsx` — `{colors.primary}` when idle,
  `{colors.on-primary}` when active. One stroke weight, like every other SARAS icon; never a
  per-screen SVG or a second icon style.
- **Label**, `{typography.nav-link}` `{colors.ink}`, `flex:1; min-width:0` with
  `overflow:hidden; text-overflow:ellipsis; white-space:nowrap` and a `title` carrying the
  full name. Long names must end in an ellipsis, never clip mid-glyph.
- **`tree-count` badge**, right-aligned, `flex-shrink:0` so it never gets squeezed out by a
  long label: `{rounded.pill}`, 22px tall, 28px min-width, 12px/600 tabular figures,
  `{colors.primary-tint}` background with `{colors.primary-hover}` text (**5.9:1** — plain
  `{colors.primary}` on the tint measures only 4.25:1 and fails AA at this size).

**6 · States**
- **Idle** — transparent background, ink label at weight 500.
- **Hover** — `{colors.primary-tint}` background, no border, no lift.
- **Active / selected** (`tree-item-active`) — solid `{colors.primary}` fill,
  `{colors.on-primary}` label at weight 600, white folder icon, and the count badge flips to
  `tree-count-active` (solid `{colors.primary-hover}` + white — 6.3:1). Exactly one active
  node at a time; it mirrors the content pane.
- **Empty** — when a scope has no children, render the animated `empty-state` with an "Add
  repository" action, never a blank column.
- **Loading** — the inline labelled `spinner`, never a blank column.

**7 · Nesting** — the tree caps at **three levels**. Children indent
**20px per level** (`tree-indent-per-level`); row height, radius, and badge never change with
depth. A parent with children gets a leading chevron button that rotates 90° when open — the
chevron is its own control, so clicking the row selects and clicking the chevron only expands.
Use the open-folder glyph for an expanded parent and the closed folder otherwise. Beyond three
levels, switch to a breadcrumb + drill-in list rather than deeper indentation.

**8 · Two counts, two meanings** — a leaf shows the items it holds; a parent shows the
**rollup including descendants**. Those are different facts and must not share one unlabelled
number: the accessible name says which ("Mathematical Reasoning, 60 items including
sub-repositories"), and the tooltip says it in the visual channel too.

**9 · Loading** — the panel renders a shape-matched `skeleton` (header row, then indented row
groups) while the tree loads, never a spinner over an empty column.

**Accessibility — two shapes, pick by structure**

- **Flat list (single level, the common case)** — this is navigation, so use native markup:
  `<nav aria-label="Repositories">` wrapping a `<ul>` of `<li>` with a `<button>` (or `<a>`
  if it changes route) per row. Mark the selected row with **`aria-current="true"`** — not
  `aria-selected`, which is meaningless outside a listbox/tree. Tab reaches every row in DOM
  order.
- **Genuinely nested tree** — follow the WAI-ARIA tree pattern: `role="tree"` on the
  container, `role="treeitem"` per node with `aria-expanded`, `aria-level`, `aria-selected`,
  and `role="group"` on child lists. Use **roving `tabindex`** (one node at `0`, the rest at
  `-1`); keys per §Accessibility → Keyboard: ↑ ↓ move, → expands / enters, ← collapses /
  goes to parent, Home/End jump, Enter/Space select.

Either shape: the count is part of the row's accessible name ("Mathematical Reasoning, 60
items") — a bare number read after the label is meaningless, so give the badge an
`aria-label` or an `sr-only` suffix and `aria-hidden` the digits. Selection changes announce
via the content region, and the row keeps the standard `:focus-visible` outline.

### Account Control

**`account-pill`** — the identity control at the inline-end of the `header`, and the route to
profile, credentials, and sign-out.

**The trigger** — a fully rounded pill, **46px** tall, `{colors.surface}` on a
`{colors.control-border}` hairline, holding three things left to right:

| Part | Spec |
|---|---|
| Layout | `flex`, `gap:10px`, padding `0 8px 0 6px` — tighter on the avatar side so the circle sits close to the edge |
| Avatar | **34px** circle, `linear-gradient(145deg, {colors.primary-soft}, {colors.primary-deep})`, initials in white at 13.5px/500, with a `0 2px 6px -2px rgba(0,112,224,.6)` glow |
| Text block | Two lines, both `white-space:nowrap` — name in `{colors.ink}` at 14px/500, role beneath in `{colors.muted}` at **12px** |
| Chevron | 16px inside a **26px** `{colors.surface-page}` circle, rotating 180° on open over `.2s {motion.ease}` |

- Hover: border to `{colors.hairline-blue}`, background `{colors.primary-tint-2}`, and a
  `0 2px 8px -3px rgba(33,46,75,.16)` lift, all over `.15s`.
- **The role line stays at 12px.** 11.5px breaches the type floor in §Typography, and this is
  exactly the line that matters to someone holding two accounts.
- The pill's own border is a hairline rather than `{colors.control-border}`, and that is
  correct here: unlike a checkbox, the avatar, name and chevron identify the control on their
  own, so the border is trim rather than the thing carrying SC 1.4.11.
- The avatar is **decorative** (`aria-hidden`) — the name beside it is the accessible content,
  and initials read as letters, not as a person.
- The trigger carries `aria-haspopup="menu"` and `aria-expanded`. Its accessible name is the
  user's name, not "Account menu" — a screen reader user should hear who they are signed in as
  without opening it.
- **Truncate the name, never the role.** A long name ellipses with a `title`; the role is what
  tells a user which of several accounts they are in, so it stays whole.

**The menu** — a **264px** card anchored to the trigger's bottom inline-end,
`{rounded.lg}` on a `{colors.input-border}` hairline with `{shadow.popover}`:

- A header row repeating the avatar with the full name and email, then the item list — each a
  real `<button role="menuitem">` with an 18px leading stroke icon — then a divider, then
  **sign out**, last and separated.
- Sign-out takes the destructive wash treatment. It is not destructive in the delete sense, but
  it is the one item with a consequence, and separating it stops the muscle-memory misclick.
- Closes on **Esc**, outside click, and selection; focus returns to the trigger every time.
  ↑ ↓ move between items, per §Accessibility → Keyboard.
- Never put a route the user needs frequently in here. This menu is for identity, not
  navigation — items that belong in the nav get lost behind an avatar.

### Header Search

**`header-search`** — the global search in the `header`, sized `320px` with `max-width: 26vw`
so it yields to the branding slot and account cluster before anything else wraps.

| Part | Spec |
|---|---|
| Input | full width, **42px**, `{rounded.pill}`, `{colors.hairline}` border on `{colors.surface-alt}`, padding `0 46px 0 40px` — room for the icon left and the mic right |
| Magnifier | absolute at `left:15px`, `{colors.muted-soft}`, `pointer-events:none` |
| Focus | border goes **solid `{colors.primary}`**, background to `{colors.surface}`, plus a `0 0 0 3px rgba(0,112,224,.14)` halo. Transitions over `.16s` |
| Mic | 32px circle at `right:5px` |

The input sits on a tinted fill rather than white so it reads as a control on a white bar
without needing a heavy border. On focus it inverts — white fill, solid blue edge — which is
the state change doing the work.

> The soft halo here is **not** carrying the focus indicator on its own; the border going solid
> `{colors.primary}` (4.8:1) is. That is the difference between this and the translucent rings
> flagged in §Focus & Focus Management: a halo beside a solid edge is decoration, a halo
> *instead of* one is a failure.

**`voice-input`** — the mic button inside the search field. Resting `{colors.muted}` on
`{colors.primary-tint}`; hover moves to `{colors.primary-ink}`. **Listening** fills
`{colors.error}` with a white glyph and a pulsing ring, and the placeholder swaps to
"Listening…".

- It is a **toggle**: `aria-pressed`, with an accessible name that names the action, not the
  state ("Search by voice"). The state change is announced politely — "Listening", then
  "Stopped".
- **Voice is never the only path.** Typing must reach the same result: no browser support, a
  denied microphone permission, a noisy room, and a speech difference all end at the keyboard.
- **Handle permission explicitly.** A denied or unavailable mic disables the button with a
  stated reason; it never silently does nothing, and it never re-prompts on every click.
- **The pulse stops under `prefers-reduced-motion`** — the listening state then reads from the
  fill and the placeholder, both of which carry it independently. Nothing pulses faster than
  3×/second.
- Recognised text lands in the field as **editable text the user confirms**, never as a
  submitted search. Speech recognition is wrong often enough that auto-submitting it loses
  people their query.

### App Switcher & Tenant Context

**App switcher** — where an estate spans several products, the switcher is a grid of product
tiles reachable from the header on every screen. Each tile carries the product name, a
one-line description, and a per-product accent used **only as a tile marker** — an inset top
bar or icon tint — never as a second brand hue inside the product itself. Tiles are real links
with a visible focus ring, arranged in a keyboard-navigable grid.

**Tenant context** — in a multi-tenant console, **which tenant you are acting in is always
visible**, in the header, on every screen. Not on the dashboard only, not implied by the data.

- Switching tenant is an explicit, confirmed action that states what it changes; it resets
  filters, selections, and in-progress work rather than carrying them across.
- Anything that reaches across tenants — estate-wide administration, cross-tenant reporting —
  is visually distinct from single-tenant work, so an administrator can tell at a glance which
  blast radius they are operating in.
- Tenant-scoped and estate-scoped actions never sit in the same menu group.

### Notifications

**`notification-bell`** — a **40px** circular button beside the `account-pill`. Resting:
`{colors.muted}` glyph on `{colors.primary-tint}`; hover and open move to `{colors.primary-ink}`
on `{colors.primary-tint}`, over `.15s`. The bell is a 2px stroke glyph from the icon set.

**The unread badge** pins to the top-inline-end at `-3px`: min-width 17px, height 17px,
`{rounded.pill}`, `{colors.error}` fill with white 10px/500 text and a **2px
`{colors.surface}` ring** so it separates from the bell beneath it. Counts above 9 read "9+".

- Use `{colors.error}` rather than a fresh red-orange. White on `{colors.error}` measures
  **4.8:1**; the warmer `#E5503A` measures 3.8:1, which is under the bar for 10px text — and it
  is a second red in a system that already has one.
- **The badge is not the message.** The accessible name carries the count — "Notifications, 3
  unread" — because a red circle is invisible to a screen reader and ambiguous to everyone else.
  `aria-haspopup="menu"`, `aria-expanded`, and the count updates politely.
- No badge when there is nothing unread; never a "0".

**`notification-popover`** — a **340px** card anchored bottom inline-end, `{rounded.lg}`,
`{colors.input-border}` hairline, `{shadow.popover}`:

- **Header** — "Notifications" on the left, an unread count pill on the right:
  `{colors.primary-ink}` on `{colors.primary-tint}`. Note the ink variant — `{colors.primary}`
  on a blue tint measures 4.15:1 and fails at pill size (§Ink Variants & Control Borders).
- **List** — scrollable to about **340px**, `role="list"`, each row carrying a rounded tinted
  icon tile, a title in `{colors.ink}` at 13.5px/500, a one-line body in `{colors.muted}`, a
  relative timestamp, and an unread dot. Hover tints the row `{colors.primary-tint-2}`.
- **Footer** — sticky, full-width **Mark all as read**, disabled when nothing is unread.

> **Type tiles use the semantic ramp, not a palette.** It is tempting to give each notification
> type its own hue — blue for marks, purple for scheduling, and so on. That is a second and
> third brand colour arriving through the back door (§Overview). Tiles carry the **glyph** as
> the type signal, on `{colors.primary-tint}` by default and on a semantic wash only where the
> notification genuinely is a success, warning, or error. A user learns four glyphs; they do
> not learn nine hues.

**Unread state** pairs the dot with a weight change on the title, so it survives a contrast
theme and colour-blindness. Reading an item is announced politely and does not re-order the
list under the user's cursor.

**Relative timestamps** ("25 minutes ago") are the scannable form and are correct here — but
each row also carries the **absolute time with its zone** in a `title` and in the full-page
view, per §Dates, Times & Time Zones. "2 hours ago" is not a timestamp anyone can act on.

**The full-page view** uses the same rows at larger scale, with the unread count beside the
`<h1>`, a mark-all-read action, and filters by type and read state as `filter-chip`s. It is the
same list, not a second implementation — the popover is a preview of it, and the popover's last
row links here rather than hiding older items.

### Breadcrumbs

The trail for any nested authoring surface (Program → Test → Section → Item, Repository →
Sub-repository). It sits in the page-title row, above the `<h1>`, never in place of it.

- Markup is `<nav aria-label="Breadcrumb">` wrapping an `<ol>`; each crumb is an `<li>` with a
  real `<a>`, and the **last crumb is plain text with `aria-current="page"`** — the current
  page is not a link.
- Separator chevrons are decorative: `aria-hidden="true"`, never a text `/` inside the link.
- Type is `{typography.meta}` (12.5px) `{colors.muted}` — **not** a smaller size and **not** an
  alpha-based color; the 12px floor in §Typography and the no-opacity-on-text rule in §Colors
  both apply here.
- Long trails collapse in the middle (`First › … › Parent › Current`) with the ellipsis as a
  real button that reveals the hidden crumbs; individual crumbs truncate with an ellipsis and
  a `title`, never wrap to a second line.
- Crumbs come from route state, so a deep link renders the same trail as a click-through.

### Learner Accessibility Toolbar

Delivery surfaces (test player, instructions, survey, report) carry a **learner-controlled
accessibility toolbar**. These are not settings buried in a preferences page — they are
persistent controls in the header, because a learner mid-assessment cannot leave to adjust
them.

**Controls** — each is a `button-icon` (32px, `{rounded.sm}`, `{colors.primary}` on
`{colors.primary-tint}`) in the header action cluster: a real `<button>`, an `aria-label`
naming the function, `aria-expanded` when it opens a panel, and a 44×44 hit area on touch per
§Accessibility → Target Size & Mobile. No new control shape — these sit in the same row as
every other header action.

- **Text size** (`text-size-control`) — three steps: **100% / 125% / 150%**. It must work by
  scaling the **root font size, with the whole scale in §Typography expressed in `rem`**.
  Setting pixel values on individual elements leaves the rest of the page behind and silently
  breaks the scale.
- **Contrast theme** (`contrast-theme`) — a small curated set of learner themes. Each theme
  re-maps **only** `{colors.canvas}`, `{colors.surface}`, `{colors.ink}`, and
  `{colors.hairline}`. It must **never** re-map the semantic ramp (`{colors.success}` /
  `{colors.warning}` / `{colors.error}`) or the brand accent, and **every theme is measured** —
  a hand-picked set of tint-on-tint pairs is a compliance failure, not a preference. Present
  the options as `chip`-style choices with a name and a checked state, never bare swatches.
- **Tool panels** — whatever aids a surface offers open as `slide-over` panels, or as a
  repositionable `modal` where the learner needs to see the question underneath. Either way: `role="dialog"` with `aria-labelledby`, focus in on
  open, Esc closes, focus returns to the trigger. Anything repositionable by pointer needs a
  **keyboard reposition path** (§Accessibility → Dragging & Pointer Alternatives) — a panel a
  keyboard user cannot move is a panel that can permanently cover the question.
- **Skip to content** — the first focusable element on every delivery page; `sr-only` until
  focused, then visible on `{colors.primary}`.
- **Appearance** — theme choice (light / dark / high contrast) per §Themes, exposed as a menu
  with the active option checked, not a bare icon that cycles blindly.

**The wider settings set.** Text size and theme are the two that must be in the header. The
rest belong in an appearance or accessibility panel reachable from it, and every one of them
is a real requirement rather than a nicety: **reduce motion**, **enhanced focus** (a thicker,
higher-contrast focus indicator), **underline links**, **increased line and letter spacing**,
**a dyslexia-friendly typeface**, and **colour-vision filters**. Two rules govern all of them:
nothing may break when they are switched on — a layout that only holds at default spacing is
a broken layout — and each is **measured in every theme**, since a filter that shifts hue can
push a passing pair below 3:1.

**`tts-control` — read aloud.** Where an assessment permits it, the stem and **each option
separately** carry a read-aloud control: a toggle `<button>` with `aria-pressed`, showing an
active indicator while speaking. Read-aloud is an accommodation, not a substitute for screen
reader support — both must work, and the item must be fully operable with neither. Reading
must be stoppable mid-utterance and must not reset the learner's position.

**`signer-panel` — sign language.** For learners whose first language is a signed one, written
text is a second language, and a reading-comprehension barrier in a maths exam is a scoring
error. Where the assessment provides signed video, expose it at the same two grains as
read-aloud — the stem and each option — in a dismissible panel that never covers the response
area. The signer is a stimulus like any other: never autoplay, always replayable.

**`exam-aids`** — reference material the assessment permits (formula sheets, code of practice,
glossaries) opens in a `slide-over`, listing only what is allowed for *this* assessment.
Availability is announced when the item first offers it; a learner who never discovers a
permitted aid has been disadvantaged by the interface.

**`break-overlay`** — where breaks are permitted, taking one **obscures all item content**
behind a `role="dialog"` overlay. Resuming is an explicit action, never a click anywhere.
State clearly, before the break starts, whether the clock keeps running — an ambiguous timer
during a break is the single most anxiety-producing thing a player can do.

**One announcer.** All of these announce through a **single app-level polite live region**,
not by writing `textContent` into an ad-hoc `<div>` per feature. Multiple uncoordinated live
regions interrupt each other and are a common cause of NVDA and JAWS dropping announcements
entirely.

**Menus** opened from the toolbar follow the WAI-ARIA menu pattern with real
`<button role="menuitem">` children: ↑ ↓ move, Enter/Space choose, Esc closes and restores
focus. Never put `role="menuitem"` on a `<div>` with a `tabIndex`, and never encode open state
in the accessible name — that is what `aria-expanded` is for, and a name that changes
underneath the user confuses every screen reader.

**Persistence** — every learner preference persists per learner and is restored on resume,
including after a disconnect. Losing a chosen text size mid-assessment is a defect.

### Status Legend & Item Navigator

The pattern for any grid of numbered, state-bearing items — question navigators, section maps,
seat grids, batch job lists.

**`item-nav-button`** — a square control on the `{rounded.md}` control radius, sized to the
44×44 touch bar, `{typography.body-strong}` with tabular figures, in a wrapping grid with
`{spacing.xs}` gaps. It is a real `<button>`; when rules lock navigation it is `disabled` +
`not-allowed`, not hidden.

**State is never color alone** — every state pairs a fill with a **glyph**:

| State | Fill | Glyph | Announced as |
|---|---|---|---|
| Answered | `{colors.success}` | check | "Question 4, answered" |
| Unanswered | `{colors.surface}` + `{colors.input-border}` | none | "Question 5, not answered" |
| Flagged / bookmarked | `{colors.primary}` | bookmark | "Question 6, flagged" |
| Current | any of the above + `item-nav-current` outline | — | plus `aria-current="true"` |

A green square and a grey square differ by hue only; for a learner with deuteranopia under
exam pressure that is not a distinction. The glyph carries the state, the fill reinforces it.

**`status-legend`** — the legend above the grid pairs **swatch + glyph + text label** in
`{typography.meta}`. A legend of bare color swatches is not an alternative to color; it is the
same information in the same channel.

Wrap the grid in `<nav aria-label="Question navigator">`, mark the current item with
`aria-current="true"`, and build each accessible name from number **plus state** — the digit
alone tells a screen reader user nothing about their progress.

### Timers & Countdowns

**`exam-timer`** — `{typography.body-strong}` with tabular figures so the digits don't jitter.
The countdown must stay accurate when the tab is backgrounded or throttled — a timer that
drifts against the server clock is a scoring dispute, so reconcile against an authoritative
time source rather than trusting local tick counting.

- The element is `role="timer"` but **must not** be an `aria-live` region that announces every
  tick — a per-second announcement makes a screen reader unusable. Announce **politely at
  thresholds only**: 50% elapsed, 10 minutes, 5 minutes, 1 minute, and expiry.
- Remaining time must be **readable on demand** — a keyboard-reachable, labelled region the
  learner can navigate to. A visual-only number is useless to someone who cannot poll it.
- Color shifts to `{colors.warning}` then `{colors.error}` at the warning thresholds, always
  **paired with a text or icon change**; never a color-only warning, never a flash faster than
  3×/second.
- Auto-submit on expiry announces itself — a dialog with its own countdown where test rules
  permit, an announcement where they don't. Never a silent navigation.
- **Extra time** (accommodations) is a first-class state, not an admin override: the timer
  reflects the learner's granted duration and says so.

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

### Assignment & Mapping

**`assignment-picker`** — the pattern for attaching a set of people or records to something:
candidates to a schedule, users to a group, markers to candidates, reviewers to a workflow
step.

- **Source and assigned lists sit on one screen**, each searchable and paginated, with movement
  between them explicit ("Map" / "Unmap"). A picker that hides what is already assigned
  invites double-assignment.
- **Counts are always visible** — total, assigned, unassigned — and update live. This is the
  number the user is actually working toward, so it belongs on screen, not behind a tab.
- **Individual and group modes are tabs over the same picker**, not separate screens. Assigning
  a group states how many people it resolves to *before* the action, since "Year 11" and "437
  candidates" feel very different to approve.
- **Bulk controls are scoped and say so**: "Select all on this page" versus "Select all 437
  matching" (§Selection, row actions & reordering). Auto-distribution states its rule and its
  result before committing ("Distribute 437 candidates evenly across 6 markers — about 73
  each").
- **Unmapping is reversible or confirmed.** Removing a person from a schedule they are sitting
  is a high-consequence action (below).
- Progress rollups — not started / in progress / completed — use the `status-legend` pairing of
  glyph and label, with a percentage stated in text beside any bar.

### Metric Cards

**`metric-card`** — the summary tile for dashboards and list-page headers: a
`{colors.primary-tint}` icon tile with an `{typography.eyebrow}` label, one large value at
28–32px weight 600 in tabular figures, and an optional sub-line or drill-in link.

- Lay them out in a responsive row that reduces column count rather than shrinking cards, like
  every other grid in §Layout.
- **A number needs its unit and its period** — "1,284 items · this month" beats "1,284".
- **Trend is never colour alone**: pair the direction glyph with the change in text, and use
  the `-ink` variants for the coloured figure. Remember that up is not always good — rising
  failure rates should not render green because the arrow points up.
- The whole card is a link only if the entire card leads to one place; otherwise the drill-in
  is an explicit link inside it. A card that is partly clickable is a card nobody trusts.

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
- Date → `date-time-picker` (44px, `{rounded.md}`), matching the text field exactly; the
  border flips to error color when invalid. Paired dates and nested windows follow §Dates,
  Times & Time Zones.
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

### Rich Text & Equation Authoring

Item and instruction authoring runs on a shared rich-text editor with math support. Because
its output is rendered to learners under exam conditions, the bar is higher than a normal
text field.

**Toolbar** — controls are grouped into clusters by purpose, separated by the standard
hairline, and use the single stroke-icon set from §Shapes at one visual weight. Every control
is a real `<button>` with an `aria-label` in natural language ("Bold", "Insert equation") —
the icon is never the name. The toolbar is a **single tab stop** with arrow-key movement
between controls, per the WAI-ARIA toolbar pattern: a long format bar must not cost a
keyboard user one Tab per button to get past it. Keep only the formats an author actually
needs for items; every extra control is permanent cost on every screen.

**Math** — equations are authored from a picker of common templates rather than typed as raw
markup, and stored in a **portable, re-renderable math format** — never as an image, and never
as pre-rendered HTML, both of which are unsearchable, unscalable, and unreadable to assistive
technology. Rendered math must expose an accessible representation: MathML output, or an
explicit label carrying the spoken form. Styled glyphs alone are silent to a screen reader,
which in a maths assessment makes the item unanswerable rather than merely awkward. Math
scales with the `text-size-control` like everything else.

**Blanks and placeholders** — fill-in-the-blank markers rendered into the question body must
carry an accessible name ("Blank 1 of 3") and a visible affordance that survives a contrast
theme. An underline drawn as a bare styled element is silent to a screen reader — the single
most common invisible failure in item rendering.

**Authored HTML is untrusted.** Editor output is sanitized against an allow-list before it is
rendered anywhere — an unsanitized `dangerouslySetInnerHTML` in a player is a stored-XSS path
straight into a proctored session. Sanitization must preserve the accessibility attributes
above.

**Images** carry author-supplied `alt` text; the upload flow **requires** it or an explicit
"decorative" choice, rather than allowing an empty default. Resizing keeps aspect ratio and
never sets a fixed pixel width that clips at 400% zoom.

### Authoring an Item

Item authoring is the highest-stakes form in the product: its output is rendered to learners
under exam conditions and scored. It follows the §Building a form recipe, with additions that
apply to every item type.

**Two columns above 1280px** — the authoring column and a **live learner preview**, the
preview at `clamp(360px, 38%, 560px)` with independent scroll. Below that the preview becomes
a tab or a `slide-over`. **The preview must render the real learner view**, using the §Assessment
Items primitives — not an approximation. An author who cannot see what the candidate sees will
ship items that read differently in the player, and nobody finds out until the exam.

**Sections, in this order**, each a `SectionCard` with its own tinted icon tile:

1. **Content** — the stem, the response set (options, blanks, pairs, targets — whatever the
   type needs), and the **answer key**. The key is part of authoring, not a separate screen,
   and it is visually distinct from the options themselves so it is never mistaken for
   learner-facing content.
2. **Stimulus** — an attached or shared passage, image, or media, with its own layout
   preference (side-by-side or stacked) previewed as the learner will get it.
3. **Metadata** — the classification, complexity, and tag fields that make an item findable and
   selectable by a blueprint. These are **not optional paperwork**: an item that can't be found
   can't be used, so required metadata is validated like any other required field.
4. **Scoring** — marks, negative marking, partial credit, and for constructed response a
   **`rubric-card`** naming the selected rubric, its criteria count, and its maximum score,
   with change and remove actions. Max score is derived and shown, never typed twice.
5. **Feedback and hints** — item-level feedback, per-option feedback, and ordered hints. Make
   clear at the point of entry **when each is shown to the learner** (immediately, after
   submission, never) — feedback authored for the wrong moment is worse than none.
6. **Workflow** — the submit section (below).

**Rules across all of them**

- **Validate on save and on step-change**, surfacing the form-level `role="alert"` banner plus
  per-field messages, then moving focus to the first invalid field. Item validation includes
  the answer key: an item saved without a key is a scoring failure waiting to happen, and the
  editor must say so in those terms.
- **Autosave drafts.** Losing a half-authored item with a media upload and a hand-built key is
  significant work lost.
- **Every response element is reorderable and removable** with a keyboard path
  (§Accessibility → Dragging & Pointer Alternatives), and removing one that carries the answer
  key warns before it does.
- **Accessibility fields are authoring fields.** Alt text for images, transcripts for media,
  and the spoken form of complex math are captured here, required at the point of upload, and
  never left as a post-hoc cleanup task.

### Policy Configuration

**Password rules, lockout, session limits, retention** — screens where an administrator
configures rules that apply to everyone else. They read as forms but behave as documents: the
reader is trying to understand the current policy at least as often as to change it.

- **Group by what the rule protects**, with a one-line plain-language purpose per group —
  "Length · prevents short, brute-forceable passwords", "Ageing · expiry, history and
  failed-attempt handling". The purpose is what makes the numbers meaningful to whoever
  inherits the screen.
- **Numeric rules use a labelled stepper** with the unit in the field, sensible bounds, and the
  effect stated in words beside it ("Locks for 15 minutes after 5 failed attempts"). A bare
  number in a box is a rule nobody can audit.
- **Show the resulting policy in plain language** — a summary the administrator can read back
  and, ideally, the same text the end user will see at the point they set a password. Two
  different wordings of one policy is how support tickets start.
- **Say what happens to existing users** when a rule tightens: applied at next change, forced
  reset, or not retroactive. Silence here is the difference between a change and an outage.
- Saving a policy is a high-consequence action (§High-consequence Actions) when it can lock
  people out.

### Segmented Tabs

**`segmented-tabs`** — a compact switch between two to four peer views of the same content
(list/board, day/week/month, all/mine). For navigating to different content, use `tabs`;
for a filter with many values, use a `dropdown-trigger`.

- A single track, `{rounded.md}`, `{colors.surface-page}` fill with a 1px inset hairline and a
  few pixels of inner padding. Buttons are `flex: 1` so they divide the track evenly, labels at
  13px on one line (`white-space: nowrap`), 8px vertical padding.
- The active tab is a **white pill inside the track** — 9–10px radius, soft shadow — that
  **slides** to the selected tab over **200ms** on `{motion.ease}`. Animate the pill's
  position; recolouring in place loses the one thing that makes the control legible, which is
  seeing where the selection went.
- Active label `{colors.primary}` at 500 on the white pill (4.8:1). Inactive labels are
  **`{colors.muted}`, not `{colors.muted-soft}`** — the softer grey measures 2.7:1 on the
  track and fails as text. Inactive labels darken to `{colors.ink}` on hover. An optional
  leading stroke icon takes the same colour as its label.
- `role="tablist"` with `role="tab"` and `aria-selected` on each button, driven by one active
  value. ← → move between tabs, Home/End jump to the ends, per §Tabs.
- **Under `prefers-reduced-motion` the pill does not slide** — it appears at the new position.
  Selection must never depend on having seen the animation.
- Two to four segments. Beyond that the labels compress until they are unreadable at the
  longest locale (§Internationalization & RTL) — switch control.

### Switches

**`switch`** — a binary setting that takes effect **immediately**: feature toggles, appearance
preferences, notification opt-ins. A 40×22 pill track with a `{colors.surface}` thumb —
`{colors.control-border}` when off, `{colors.primary}` when on — inside a 44×44 hit area.

- Use a switch only for instant-effect state. A choice that needs Save is a **checkbox**, and
  a choice between two named alternatives is a **radio pair**. Getting this wrong is the most
  common toggle mistake: a switch that does nothing until the user finds a Save button reads
  as broken.
- `role="switch"` with `aria-checked`, and a visible text label that names the **setting**, not
  the state ("Reduce motion", never "On"). The label is clickable.
- On and off must differ by more than fill colour — the thumb's position carries the state,
  which is why the track is a pill and the travel is visible.
- Asynchronous switches show a pending state and revert with a message if the change fails;
  they never silently snap back.

### Checkbox

**`checkbox`** — a drawn box replacing the native control's appearance while keeping its
behaviour. It is **visual only**: driven by an `on` boolean, label-agnostic, and wrapped in a
real control by the caller.

**Geometry** — **19px** square by default (size is a prop), `{rounded.xs}` 6px radius, **1.5px**
border, `box-sizing: border-box`, centred flex, `flex: none` so it never shrinks in a row.

| State | Spec |
|---|---|
| **Off** | `{colors.surface}` fill, `{colors.control-border}` border |
| **Off, hover** | border darkens to `{colors.primary}` |
| **On** | `linear-gradient(180deg, #1A86F0, {colors.primary})` fill, `{colors.primary-edge}` border, and a soft blue glow — `0 2px 7px rgba(0,112,224,.28)` |
| **Focus** | the standard `:focus-visible` outline (solid 3px `{colors.primary}`, 2px offset) |

The glow is what makes the checked state feel like it *lands* rather than just changing colour,
and it is the one piece of decoration this control gets. Don't add a second shadow, a scale
bounce, or a ring.

**The tick** — an SVG polyline, rendered only when on:

```html
<svg viewBox="0 0 24 24" fill="none" stroke="#fff"
     stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="20 6 9 17 4 12" />
</svg>
```

Sized at about **62% of the box** — 12px inside a 19px box — so it sits with air around it
rather than filling the square. White on the gradient measures **3.7:1** at its lightest point,
which clears the 3:1 bar for a non-text graphic.

**Motion** — `background`, `border-color` and `box-shadow` transition over **.18s ease**, so
the fill and glow animate in together on toggle. The tick draws in over ~150ms via
`stroke-dashoffset`, so the check lands rather than blinking on; if you prefer it to appear
with the fill, drop the dash animation and keep the .18s transition alone. Both are instant
under `prefers-reduced-motion`.

**Two values that had to change from the visual reference**

- **The resting border must be `{colors.control-border}` (3.1:1), not a pale grey.** A
  `#C2CCD8`-weight edge measures **1.63:1** and a `#9FB6D2` hover measures **2.08:1**. When a
  checkbox is off, that border is the *only* thing telling a low-vision user a control exists
  there, so it falls under SC 1.4.11's 3:1 requirement — this is the same failure mode as
  `{colors.input-border}` on a text field.
- **A translucent glow is not a focus indicator.** `0 0 0 3px rgba(0,112,224,.18)` resolves to
  roughly #D1E5F9 on white — **1.29:1**, invisible to the people who need it most. Keep it as
  an accompanying halo if you like the look, but the indicator itself is the solid outline
  defined once in `index.css` (§Focus & Focus Management).

**Behaviour**

- Render as a real `<button role="checkbox">` with `aria-checked`, driven by a boolean and an
  `onChange` — so Space toggles, Tab reaches it, and the focus outline applies. Support
  `aria-checked="mixed"` for the indeterminate parent used by bulk selection (§Selection, row
  actions & reordering); mixed shows a horizontal bar in place of the tick, on the same fill.
- **The box carries no label of its own.** The caller pairs it with adjacent text — and that
  text must be bound to the control with `aria-labelledby` (or a `<label for>` on a native
  input). A `<button>` nested inside a `<label>` is **not** labelled by it; that pairing looks
  right and announces as an unnamed checkbox.
- Clicking the paired text toggles the box.
- Size is a prop; the **hit area stays 44×44** regardless, via padding on the wrapper
  (§Accessibility → Target Size & Mobile). A 19px box is a 19px target unless someone thinks
  about it.

### Date & Time Pickers

**`date-time-picker`** — one control in three modes: `date`, `time`, `datetime`. A 44px
trigger on `{rounded.md}` with a `{colors.control-border}` edge, matching `text-field` exactly
so a date field doesn't read as a different species from the field beside it.

- **Typed entry always works.** The calendar is an aid, not the only path — a keyboard user
  entering a date they already know must never be forced to arrow through a grid to reach it.
  Parse what they type, show what you parsed, and correct rather than reject.
- **The calendar is a `role="grid"`** with the ARIA date-picker pattern: arrow keys move by day,
  Home/End to week ends, PageUp/PageDown by month, Enter selects, Esc closes and returns focus
  to the trigger. The focused day is the only tab stop inside the grid.
- **Bounds are announced, not just greyed.** Dates outside `min`/`max` are `aria-disabled` and
  the constraint is stated in a hint ("Select a date from today onward"), because a
  low-contrast grey cell tells a screen reader user nothing.
- **Today and the selected date are visually distinct from each other**, and neither is
  distinguished by colour alone — selected carries a fill *and* its accessible name says
  "selected".
- Month and year navigation is direct, not step-by-step: a year picker beside the month, so
  setting a date of birth or a date next year doesn't take twelve clicks.
- `clearable` where the field is optional, with the clear control labelled for what it clears.
- The trigger's accessible name includes the current value and the expected format.

### Chips, Pills & Badges

**`chip`** — 32px, `{rounded.pill}`, white + `{colors.hairline-blue}` border. **`chip-selected`**
= solid `{colors.primary}` white pill, often with a count. **`count-pill`** = solid blue or
`{colors.primary-tint}`. **Status badges** (`badge-success` / `-warning` / `-info`) are a
tinted background + darker text at 12px/600, and are always paired with an icon or label —
never color alone.

### Content Workflow & Review

Items move through a configurable review workflow before they can be used. Steps, the roles
that may act at each, and whether a step is mandatory are configured per product — so the UI
renders the workflow it is given rather than a hardcoded ladder.

**Status.** The visible states are Draft · In review · Approved · Rejected · Published, shown
as a status badge: a `-wash` background with its matching `-ink` text and a leading glyph, per
§Ink Variants & Control Borders.

| State | Ramp |
|---|---|
| Draft | neutral — `{colors.surface-alt}` + `{colors.muted}` |
| In review | `{colors.warning}` wash + `{colors.warning-ink}` |
| Approved | `{colors.success}` wash + `{colors.success-ink}` |
| Rejected | `{colors.error}` wash + `{colors.error-ink}` |
| Published | `{colors.primary-tint}` + `{colors.primary-ink}` |

> **The status set maps onto the existing semantic ramp and nothing else.** A workflow with
> more steps than the ramp has colours does not get a new hue — the extra distinction is
> carried by the **label**, which is what users read anyway. This is the one-accent rule
> applied to state.

**Actions** are Save · Submit · Send back · Reject, and which ones appear depends on the
user's role at the current step (§Permission & Feature Gating). Actions the user can't take
are `disabled` with a stated reason, not hidden — a reviewer who can't see why they can't
approve raises a ticket.

- **Send back and Reject require a comment.** They are the only actions that do; enforce it in
  the dialog rather than discovering it server-side.
- **Every action states its consequence before it happens**: who it goes to next, whether it is
  reversible, and what happens to the current version.

**`workflow-comment`** — the review thread opens in a `slide-over`, newest first, each entry
attributed to a person, a workflow step, and a timestamp. Comments are the audit trail of a
scoring decision, so they are **never edited or deleted**, only added to. Empty state invites
the first comment rather than showing a blank panel, and the trigger carries the comment count
so a reviewer sees there is something to read without opening it.

**`version-history`** — every published change creates a version. History shows the version
list with author and date, and lets a reviewer put a **selected version beside the current
one**. Versions are immutable; "restore" creates a new version rather than rewriting the past.

**Enemy items** — items that must never appear in the same form (because one gives away
another) are linked from the item, shown as a searchable, paginated list with the same columns
as the item bank, and surfaced **wherever the pairing matters** — on the item, and again when a
form is assembled. A constraint that only exists on the item record is a constraint that gets
violated at assembly time.

### Filter Chips

Applied filters are shown as removable **`filter-chip`**s in a row directly above the results,
so the current query is always visible. Selecting filters inside a panel and showing nothing
afterwards leaves the user staring at a short list wondering where their data went.

- `{colors.primary-tint}` background with `{colors.primary-ink}` text at `{rounded.pill}`, each
  with a trailing remove button labelled for what it removes ("Remove filter: Status Active").
- A **Clear all** control sits at the end of the row whenever more than one chip is present.
- The row announces the result count on change ("18 results"), politely.
- Chips reflect **applied** state, not pending selections inside the filter panel — the panel
  has its own Apply and Reset.

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

#### Selection, row actions & reordering

Three optional layers on the master table above. Add them only when the screen needs them —
every one costs a column.

**Bulk selection** — a checkbox column at the inline-start edge, with a header checkbox
carrying the **indeterminate** state when the page is partly selected. The header checkbox is
labelled "Select all on this page" and means exactly that: when a filter spans more pages,
offer an explicit "Select all N matching" affordance rather than silently changing scope.
Selection survives sorting and paging; it resets on a filter or search change, and says so.
When anything is selected, a **bulk action bar** replaces the card header rather than floating
over the rows, and states the count ("12 selected"). Rows that can't be actioned render the
checkbox `disabled` with a tooltip reason, never omitted — a missing checkbox reads as a
rendering bug.

**Row actions revealed on hover** are revealed on **`:hover` *and* `:focus-within`**, never
hover alone — otherwise they are invisible to keyboard users and unreachable on touch. The row
must also expose the same actions through its overflow menu, so discovery never depends on a
pointer passing over it.

**Row overflow menu** — a trailing `button-icon` (`aria-label="More actions for <row name>"`,
`aria-haspopup="menu"`, `aria-expanded`) opening a portal-mounted `role="menu"`. Only one menu
open at a time; Esc closes and returns focus to the trigger. Destructive entries sit last,
separated, and route through the confirm dialog. Never hide the only path to an action behind
row hover — hover-only actions are unreachable by keyboard and touch (§Accessibility →
Content on Hover or Focus).

**Drag reordering** — only for lists whose order is itself data (item sequence, section order),
never as a substitute for sorting. The handle is a real `<button>` with
`aria-label="Reorder <row name>"`, and **a keyboard path is mandatory** (§Accessibility →
Dragging & Pointer Alternatives): Space to lift, arrows to move, Space to drop, Esc to cancel,
with each move announced politely. Persist the new order immediately and show the standard
saved confirmation; a reorder that silently fails to save loses real work. Reordering and
column sorting are mutually exclusive — turn sort off while a manual order is in effect.

**Loading** — render `skeleton` rows matching the real column widths, not a spinner over an
empty table, so the layout doesn't jump when data lands.

### Authoring Assistance

Tools that help an author while they work. All of them share one rule: **assistance never
blocks authoring**. It appears alongside, is dismissible, and never steals focus from the
editor.

**`similarity-panel`** — as an author writes a stem, the bank is checked for near-duplicates
and matches surface in a dismissible, pinnable side panel showing match strength, item code,
type, and a preview. It runs debounced on typing and on paste, never on every keystroke.

- It is **advisory, not a gate**: near-duplicate items are sometimes deliberate (parallel forms
  need them), so the author decides. Never block save on similarity.
- Match strength is shown as a **number and a label**, not a colour bar alone.
- The panel is `aria-live="polite"` at most — results arriving must not interrupt typing, and
  the announcement is a count ("3 similar items found"), not the items themselves.

**`ai-assist` — generation and rewrite.** Where AI drafts or rewrites items, three rules hold
without exception:

- **Review before save, always.** AI output lands in a review view where the author sees each
  generated item, edits it, and accepts or discards individually. Nothing reaches the bank
  unreviewed, and there is no bulk "accept all" without opening them.
- **Provenance is visible.** Generated items are labelled as AI-drafted until a human has
  accepted them, and that fact persists in history. A bank where nobody can tell which items
  were machine-written cannot be audited.
- **Output is a draft, not an answer.** It is fully editable, it enters the same workflow as a
  hand-authored item, and it is subject to the same validation — including the answer key,
  which is the part most worth checking.

Generation parameters (item type, count, complexity, classification) are ordinary form fields
with the same validation as anywhere else, and long generations show progress with a way to
cancel — never a frozen dialog.

### Contextual Help

**`info-popover`** — a `button-icon` beside a page, section, or field label that opens a short
titled popover of plain-language guidance. It is how a dense authoring screen stays learnable
without permanent explanatory text crowding it.

- Content is two or three sentences and links onward if more is needed; it is never the only
  place a required instruction appears, because a popover is easy to miss.
- `aria-expanded` on the trigger, Esc and outside click dismiss, focus returns to the trigger,
  and the popover is **hoverable, dismissible, and persistent** per §Accessibility → Content
  on Hover or Focus. It never opens on hover alone.
- It is help, never validation: field requirements, formats, and errors belong in the label,
  hint, and error message.

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

### Slide-over Panels

**`slide-over`** — the right-hand panel for create/edit work that is too big for a
`modal` but must not lose the list behind it: add/edit a repository, configure an equation,
edit a tag set. **Choose by task, not by size:** a `modal` for a short, blocking decision; a
`slide-over` when the user needs the context behind it; a full page when the work has its own
URL.

- Portals to `<body>` above the standard `modal-overlay` scrim, pinned to the inline-end edge
  at full height, width `clamp(360px, 32%, 560px)` — the same clamp language as the two-pane
  workspace in §Layout, so it never needs a media query.
- Enters by sliding from the inline-end edge over ~.28s; **in RTL it enters from the left** —
  use `inset-inline-end`, not `right`, per §Internationalization & RTL.
- Same three-part structure as a modal: fixed header (title + `button-close`), one scrolling
  body, fixed footer with ghost Cancel + primary Save.
- **Accessibility is identical to a modal, and is where slide-overs usually fail:**
  `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on the header title. Focus moves
  in on open, is **trapped**, **Esc closes**, and focus returns to the trigger. The close
  control is the standard `button-close`, so the keyboard and pointer targets are the same
  element.
- The scrim closes on click unless the form is dirty, in which case confirm first.
- Never open a slide-over from inside a modal. Two stacked scrims trap focus in the wrong
  layer.

### Log & Audit Views

Event logs, job execution logs, audit trails, and application logs share one shape, and it is
not the ordinary data table: the reader is scanning for one entry among thousands, usually
after something went wrong.

- **Newest first, always**, with the timestamp column first and carrying its **time zone**
  (§Dates, Times & Time Zones). Timestamps use tabular figures so a scanned column aligns.
- **Severity is a badge on the semantic ramp**, glyph plus label — never a coloured row, which
  makes the whole table unreadable and fails colour-only rules the moment two severities sit
  adjacent.
- **Filter before paginating.** Date range, severity, actor, and entity are the filters that
  matter; applied ones show as `filter-chip`s so the reader always knows what they are looking
  at.
- **A row expands in place** to its full detail — payload, stack, before/after — rather than
  navigating away. The reader is comparing entries, and losing their position costs the scan.
- **Audit entries are immutable and say so.** No edit, no delete; the trail is the record.
- Long payloads are monospaced, wrapped rather than truncated, and copyable in one action.
- **Never auto-refresh under the reader.** Poll and offer "N new entries — refresh", per
  §Review Queues.

### Review Queues

**`review-queue`** — the pattern for a stream of items awaiting a human decision: identity
verification, submission review, appeals, content approval.

- **Tabs by state** — Pending · Approved · Rejected · All — each showing its count, with Pending
  first because that is the work. Deciding an item moves it out of Pending and announces the
  move.
- **Where the decision is a comparison, show the evidence side by side** at a size big enough to
  actually decide on, with each side labelled for what it is and when it was captured. A
  verification decision made from thumbnails is a decision made badly.
- **Reject requires a reason; approve does not.** The reason is stored with the decision and
  surfaced to whoever is affected — a rejection nobody can explain generates an appeal.
- **Decisions state their consequence before they are made**, especially where they block a
  person from sitting or completing an assessment.
- **Refresh is manual, plus polling that never interrupts.** An auto-refreshing queue that
  reloads while a reviewer is mid-decision loses their work; poll for new items, show "3 new
  items — refresh", and let them choose the moment. Never a page-level countdown that reloads
  under them.
- Empty is a good state here: "Nothing waiting for review" is success, and should read like it.

### Long-running Jobs

Bulk import, bulk export, publishing, and generation are **asynchronous jobs**, not requests
the user waits on. They share one pattern.

- **The job list is the interface**, not a modal that must stay open. Each row: file or job
  name, who started it, when, and status — **Not started · In progress · Completed · Failed** —
  as a status badge on the ramp above.
- **Leaving the page must not lose the job.** The user starts it, navigates away, and finds it
  in the list with its history on return.
- **Completion is announced politely** and, for export, offers the download in the row; a
  finished job whose result is unreachable is a failed job.
- **Failure states name the cause and the fix** — which rows failed and why, downloadable
  where the list is long. "Failed" alone forces the user to re-run blind.
- **Progress is honest.** Show a determinate bar only when the total is known; otherwise show
  activity plus what is happening. A fake progress bar that sits at 90% costs more trust than
  no bar at all.
- **Refresh is available but not required** — poll, and let the user refresh manually as a
  fallback rather than making them.
**`upload-dropzone` — template-driven import.** Where the import expects a structured file,
the **template is downloadable beside the control**, and the constraints are stated *before*
the upload, not discovered after it: accepted file types, the record limit per upload, and
which columns are required. The zone accepts drag-drop **and** a real file input reachable by
keyboard — a drop zone with no button is unusable without a pointer. Validation reports
row-level failures with row numbers, and a partially valid file states clearly whether the
valid rows were imported or the whole file was rejected.

- Selection-driven exports state exactly what is included ("12 items selected — only these
  will be exported") before the action, since the difference between "selected" and "all
  filtered" is the difference between a correct and a useless export.

### High-consequence Actions

Some admin actions reach into a live session or another person's record: force-submitting an
in-progress attempt, revoking access mid-window, unmapping a candidate, extending or cutting a
timer. They use the destructive confirm variant (§Building a modal) with three additions:

- **Name the person and the state**, not the row id — "Force submit Priya Nair's attempt,
  in progress, 34 of 60 answered".
- **State the irreversible part explicitly**: what the person will no longer be able to do, and
  whether their work is kept.
- **Require the reason where one will be asked for later**, at the point of action rather than
  reconstructed from memory afterwards.

These actions are never available in bulk without a per-row summary of what will happen, and
never sit next to a routine action in the same menu group.

### Back to Top

**`back-to-top`** — a floating return control for long scrolling views: report pages, log
tables, item banks.

| Part | Spec |
|---|---|
| Position | fixed, `right:26px; bottom:26px`, **z-index 50** — below the `header` (60) and every overlay |
| Shape | **48 × 48**, `{rounded.xl}` 16px, `linear-gradient(145deg, #1D8BFF, #0059C8)` with a `rgba(255,255,255,.35)` hairline |
| Glyph | white line arrow, `stroke-width:2.4`, round caps — 6.4:1 against the gradient's dark stop |
| Rest shadow | `0 12px 26px -8px rgba(0,89,200,.55), 0 2px 6px rgba(16,40,90,.18), inset 0 1px 0 rgba(255,255,255,.4)` |
| Hover | `translateY(-3px) scale(1.06)` with the shadow intensified |
| Appears | past **~320px** of scroll in its container |

- **Animate visibility, never toggle `display`.** Hidden is `opacity:0`,
  `translateY(14px) scale(.9)`, `pointer-events:none`; shown reverses it over `.24s`. Swapping
  `display` gives a control that pops rather than arrives, and it breaks the transition
  entirely.
- **Scrolling is not returning.** `scrollTo({top:0, behavior:'smooth'})` moves the viewport but
  leaves keyboard focus wherever it was — so a keyboard user "returns to top" and then tabs
  back into the middle of the page. Move focus to the top landmark or the page `<h1>` as well,
  or the control only works for people using a mouse.
- `behavior:'smooth'` is ignored under `prefers-reduced-motion` by the platform; don't
  re-implement it with a manual animation that isn't.
- A real `<button aria-label="Back to top">`, in the tab order at the end of the document where
  it sits visually. 48px clears the touch target on its own.
- **One floating control per corner.** If a screen already has a floating action or a chat
  launcher there, this one moves or goes — two stacked circles in the corner is how a
  scroll-to-top ends up covering a submit button on mobile.

### Steppers & Progress

**`step-indicator`** — Numbered circles (done = green tick), connector line, active step
blue. The footer stepper card (`{colors.hairline-blue}` border) puts Previous on the left and
actions on the right; buttons `flex-wrap` so the footer never overflows.

### Multi-step Create Flows

Long creation journeys (create a test, a blueprint, an adaptive form, a survey) split into
**three to five named steps** using `step-indicator`.

- The step indicator is **part of the page flow**, not a floating element positioned with a
  negative offset. It sits above the form, spans the content width, and reflows with it.
- Steps are **named, not numbered alone** ("Basic details · Assessment settings · Forms") and
  the current step is announced: "Step 2 of 3, Assessment settings".
- **Validate on leave, not on arrival.** Advancing runs the current step's validation, shows
  the standard form-level `role="alert"` banner on failure (§Building a form, step 6), and
  moves focus to the first invalid field. Never advance silently and never let the user
  discover a step-1 error on step 3.
- Completed steps stay **reachable** — a user must be able to go back and change an earlier
  answer. If a later step invalidates an earlier one, say so at the point of change.
- Draft state persists across steps and across a reload; losing a half-built assessment is a
  data-loss bug, not an inconvenience.
- The footer carries Previous (ghost) on the left and Next / Save (primary) on the right, and
  `flex-wrap`s like every other footer. On the final step the primary becomes the explicit
  action ("Create test"), never a bare "Next".

### Feedback States

**`spinner`** — Inline blue spinner **with a label** — never a blank loading screen.
**`skeleton`** — For a known layout that's still loading (dashboard, player shell, report,
table), render a **shape-matched skeleton** rather than a spinner: `{colors.primary-tint}`
blocks at `{rounded.sm}` in the real layout's proportions, with a `{colors.primary-tint-2}`
shimmer. Keep one skeleton per major layout, next to the layout it mirrors, so the two stay in
sync when the layout changes. Skeletons are decorative: `aria-hidden="true"` on the blocks,
with a single polite "Loading …" announced on the region, and the shimmer **disabled under
`prefers-reduced-motion`**. Use a spinner for an indeterminate wait inside an existing
layout, a skeleton when the layout itself hasn't arrived.
**`empty-state`** — Animated illustration + title + one-line explanation + a primary action.
The illustration is **decorative** (`aria-hidden`), self-hosted rather than pulled from a
third-party CDN at runtime, has a static first frame as its fallback, and does not loop
indefinitely under `prefers-reduced-motion`. The message carries the meaning; the animation
never does
(e.g. a Browse gate). **`toast`** — A Radix-based toast with a left color ribbon, a variant
icon (`info` / `success` / `warning` / `destructive`), title + description, and a hover-
revealed close button. It sits in a **top-right** viewport, shows **one toast at a time**,
auto-dismisses, and auto-infers its variant from keywords when none is passed. Full portable
spec (dependencies, tokens, and the four source files): **`docs/toast-ui.md`**. Announces via
`aria-live` and carries `aria-label="Close notification"` on the close button. Toasts carry
**success and passive notices only** — anything the user must act on or acknowledge is a modal
or an inline message (§Engineering Standards → Messages).

### Loading & Lazy Reveal

Loading is where an interface feels either expensive or cheap, and the difference is almost
never the animation itself — it is **not moving things the user was already looking at**. A
polished loading state is one the user barely registers; a flashy one draws attention to the
wait.

**Pick by how long, and by whether the shape is known:**

| Wait | Treatment |
|---|---|
| Under `{motion.loader-delay}` (200ms) | **Nothing.** Show no indicator at all |
| Short, layout already on screen | **`spinner`** — inline, labelled, in place |
| The layout itself hasn't arrived | **`skeleton`** — shape-matched to the real content |
| A known-length job | **Determinate bar** with the count (§Long-running Jobs) |
| Cold start / first paint only | **`brand-loader`**, once per session |

**1 · The delay is the whole trick.** Never render a loader before **200ms**
(`{motion.loader-delay}`). Most requests return faster than that, and a spinner that appears
and vanishes in 90ms reads as a glitch — the screen flickers and the user feels the app is
unstable, even though it was fast. Once a loader *is* shown, hold it for at least
`{motion.loader-min-visible}` (400ms) so it never strobes on a near-instant response.

**2 · Reserve the space before you fill it.** The loading state occupies the **exact
dimensions** of what replaces it — same height, same column widths, same card footprint.
Nothing below may jump when content lands. This single rule does more for perceived quality
than any easing curve, and it is the one most often skipped because it requires knowing the
layout in advance, which is precisely what `skeleton` encodes.

**3 · `skeleton` shimmer.** A single soft sweep of `{colors.primary-tint-2}` across
`{colors.primary-tint}` blocks, **1.4s, `ease-in-out`, travelling in the inline direction** —
so it runs right-to-left in RTL without a second implementation. One sweep pass across the
whole region, never per-block loops firing out of phase, which reads as noise. Blocks are
`{rounded.sm}`, and the last line of a paragraph block is short so it reads as text rather
than as bars.

**4 · `content-reveal` — the landing.** Content replaces its skeleton with a **200ms
`cubic-bezier(.22,1,.36,1)` fade plus a 4px rise** — the same curve as the rest of the system
(§Motion). For lists, **stagger by 40ms per row, capped at six rows**; beyond that everything
after the sixth lands together. Uncapped staggering on a fifty-row table means the last row
arrives two seconds late, which is slower-feeling than no animation at all. The skeleton fades
out as content fades in, crossing rather than swapping — no blank frame between them.

**5 · `lazy-region` — load panes, not pages.** Code-split and suspend at the **region**, not
the route: the shell, navigation, and page title render immediately while the heavy pane
resolves behind its own skeleton. A whole-page fallback throws away the chrome the user was
already reading and makes every navigation feel like a page load. Prefetch a region on
intent — hover or focus on the control that opens it — so it is usually already there.

**6 · `image-load`.** Every image declares its **intrinsic dimensions or aspect ratio** so its
box exists before it downloads, holds a `{colors.primary-tint-2}` placeholder, and fades in
over 200ms. Below-the-fold images are lazy by default. An image that lands without a reserved
box shoves the paragraph the user is reading — the most annoying failure in this whole
section.

**7 · Pending actions stay in place.** A button that triggers work shows its pending state
**in the button** — a small inline spinner, the label kept, the width held so nothing reflows —
and is disabled while in flight. Never cover a form with an overlay for an action that affects
one control.

**8 · Endless lists.** Lazy-loaded lists append `skeleton` rows at the boundary, keep the
scroll position exactly, and **always offer an explicit "Load more" control** as well as the
scroll trigger — infinite scroll alone is unreachable by keyboard and traps users trying to
reach anything below the list.

**Accessibility, and it is not optional here**

- The loading region carries `aria-busy="true"` while it loads, and announces **once**,
  politely — "Loading results", then "18 results". A skeleton's blocks are `aria-hidden`; a
  spinner has a text label.
- **Loading never steals focus.** If the user was typing or tabbing, they stay where they are;
  focus moves only to newly loaded content they explicitly asked to jump to.
- **Under `prefers-reduced-motion`: no shimmer, no stagger, no rise.** The skeleton is a flat
  `{colors.primary-tint}` block and content appears with a ≤150ms opacity fade or none at all.
  Everything above must still work with all motion removed — the reveal is decoration, the
  reserved space is the substance.
- Nothing pulses faster than 3×/second, and a loader that runs past a few seconds gains text
  saying what is happening, because an indefinite spinner with no explanation reads as broken.

**`brand-loader`** — the full-screen branded state is for **cold start only**: first paint,
before the shell exists. It is the wordmark on `{colors.canvas}` with a single restrained
motion — a slow opacity breath or a mark that draws once, never a spinning logo — and it exits
by fading into the app shell over 240ms rather than cutting. It carries `role="status"` with a
polite label saying what is happening ("Preparing your console…"), not a bare animation. It never appears again for
in-app navigation; a brand animation on every route change stops reading as polish within the
first minute of use.

### Permission & Feature Gating

Every admin surface renders against **privileges** (what this user may do) and **feature
flags** (what this organization, tenant, or product has enabled). Both change what the user
sees, so both are design concerns, not just plumbing.

**Three gate modes — pick deliberately:**

| Mode | Use when | Renders |
|---|---|---|
| **Hide** | The user has no view privilege for the whole capability | Nothing — no empty container, no gap in the layout |
| **Disable** | The capability exists but this user or state can't act now | The control, `disabled` + `not-allowed`, with a tooltip giving the **reason** |
| **Explain** | The user reached a page they can't view | A real access-denied state: title, one-line reason, and a route back |

- **Prefer disable-with-reason over silent hiding for actions.** A button that vanishes leaves
  the user thinking the product is broken; a disabled button with "You need the Publish
  privilege" is self-explanatory. Reserve hiding for whole capabilities the user should never
  know about.
- A blocked page gets the **explain** state, not a redirect to a 404 — "not found" is a lie
  that costs a support ticket. Route away only when the flag hides the feature entirely.
- **Never flash gated content.** While privileges or flags load, render the `skeleton`, not
  the ungated UI. A control that appears and then disappears is worse than a slow one.
- Gating is presentation, never security. Every gated action is re-checked server-side.
- Gate at the smallest sensible unit — a toolbar button, not the whole panel — so partial
  privileges still produce a coherent screen rather than an empty one.

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

The SARAS wordmark is a single horizontal lockup on a transparent background, so it drops onto
any surface: `assets/saras-logo.png`, artwork **509 × 166** — an aspect ratio of **3.07 : 1**.

**Sizing — set the height, never the width**

`height: <value>; width: auto`. Never set both, and never stretch, squash, or re-proportion the
mark. The widths below are **derived from the 3.07:1 ratio** and are given so a layout can
reserve the correct box, not so they can be applied directly.

| Context | Height | Derived width |
|---|---|---|
| **App header** | **38px** | ~117px |
| **Sign-in / role selection** (primary brand moment) | **44px** | ~135px |
| **Secondary auth** (staff sign-in, verification, reset) | **40px** | ~123px |
| **Partner or "powered by" lockup** | **15px** | ~46px |
| **Minimum anywhere** | **26px** | ~80px |

Below the minimum the wordmark stops being legible — omit it rather than shrink further.

**The header lockup**

In the 64px `header` bar the mark sits in a fixed branding slot at the inline-start edge, and
that slot is **the width of the side-nav column beside it**, so the logo and the nav items share
a left edge all the way down the screen:

| Part | Value |
|---|---|
| Bar | 64px, white → `{colors.surface-alt}` vertical gradient, `{colors.hairline}` bottom border |
| Branding slot | full bar height, **width = the nav column** (256px expanded, 190px on a narrow rail), `0 18px` inset, hairline right divider |
| Wordmark | **38px** tall, ~117px wide |
| Clear above and below | **13px** — the mark occupies 38 of the 64px bar |
| On mobile | the slot loses its fixed width and divider, insets drop to `0 6px`, and the hamburger precedes it |

**On a dark or blue header**, the mark takes a **white plaque** — 11px radius, `6px 12px`
padding — and drops to **30px** so the plaque totals 42px. That keeps the same optical weight
as the bare 38px mark and leaves 11px clear, and it means one asset serves every surface with
no knockout variant to keep in sync. Never place the transparent mark straight onto mid-blue;
the plaque is what guarantees the 3:1 separation.

> **The lockup band is 38–42px of the 64px bar**, whether the mark is bare or plaqued. That is
> the rule to hold when a new surface appears — not the individual pixel values.

**Clear space and placement**
- **Free-standing** (a card, a boot screen, a document): at least **half the logo's height** on
  all four sides — 22px around the 44px sign-in mark. Nothing enters that margin: no text, no
  control, no container edge.
- **In the header slot or a plaque**: the slot inset (18px) or plaque padding (6/12px) *is* the
  clear space, and the half-height rule then applies from that container's outer edge.
- **Reserve the computed width** so the header does not reflow when the asset loads (§Loading &
  Lazy Reveal).
- Render it as a semantic image with real alt text — `<img alt="…">` carrying the product name —
  inside the header `<span>` branding slot, **never as the page `<h1>`** (§Accessibility →
  Headings).
- One logo per screen. A wordmark in the header and again in the page body reads as a
  templating error.
- **Don't hand-tune optical alignment per screen.** If a mark needs a negative margin to sit
  flush against a container edge, the asset has transparent padding baked into it — trim the
  asset once rather than carrying a different offset on every screen that uses it.

**Don'ts**
- Don't distort, rotate, skew, or change the logo's aspect ratio.
- Don't recolor, add gradients, shadows, outlines, or effects to the mark.
- Don't place it on a busy background or a low-contrast surface — keep 3:1+ against whatever
  sits behind it.
- Don't crop the wordmark, add a tagline lockup, or reconstruct it from type.
- Don't rebuild it as text; always use the supplied asset.
- Don't let it fall below the **26px** minimum height or breach its clear-space margin.

## Assessment Items

SARAS delivers a wide catalogue of item types. They are **not** thirty-three separate designs
— they are one frame plus a small set of **response primitives**, recombined. Build a new item
type by choosing primitives, never by inventing a layout.

### The item frame

Every item, of every type, has the same three-part vertical structure inside `item-frame`,
separated by `{spacing.section}` rhythm and **nothing else** — no boxes inside boxes, no rules
between parts. Whitespace does the separating, exactly as in §Layout.

**1 · Stimulus (optional)** — the passage, image, video, audio, or table the item refers to.
Shared stimulus goes in a `stimulus-pane`; an item-specific one sits above the prompt.

**2 · Prompt** — the question itself, in `item-stem`. Set at **1rem with a 1.65 line height and
a measure capped near 68 characters**. Assessment prose is read under pressure, sometimes for
several minutes: the compact-density rule that governs admin screens does not apply here, and
a full-width line of 13px text is a comprehension problem. Any instruction line ("Select
two.", "Drag each label to its marker.") sits directly under the prompt in
`{typography.body-strong}`, never as placeholder text inside the response area.

**3 · Response** — one of the primitives below. It is visually quiet: the item number, the
stem, and the learner's own marks should be the only things drawing the eye. No per-option
fills, no gradient bars, no second accent — a screen of coloured blocks makes it harder to see
which one the learner actually chose, which is the only thing that matters.

The item number is a `count-pill` at the start of the prompt row, not a coloured square. Flag,
clear, and navigation controls belong to the player chrome (§Status Legend & Item Navigator),
**never inside the item frame** — they are not part of the question.

### Response primitives

**`choice-tile`** — the workhorse: single choice, multiple response, true/false, image choice,
Likert single-row. A full-width tile, `{rounded.md}`, `{colors.input-border}` hairline, min
52px, containing (in order) an optional `choice-key` (A · B · C), **the real native radio or
checkbox indicator**, and the option content. Hover raises `{colors.primary-tint-2}`; selected
is `{colors.primary-tint}` with a 1.5px `{colors.primary}` border **and the control
indicator filled** — selection is never carried by background colour alone, because a tinted
tile and a white tile are one hue apart under a contrast theme. The whole tile is the label,
so the entire area is clickable and the touch target is the tile, not the 16px dot.

> Options are content, not chrome: an option may be text, math, an image, or a mix. Image
> options sit in a responsive grid of tiles at `{rounded.md}`, each still carrying its
> indicator and accessible name.

**`option-token`** — a movable answer fragment: sequencing, ordering, drag-to-blank, matching
pools, classification. A pill on `{colors.hairline-blue}` with a leading grip glyph and a 44px
minimum height. Placed tokens take `option-token-placed`. Tokens never carry a per-item
colour; position and the placed state carry the meaning.

**`drop-target`** — where a token lands: dashed `{colors.input-border}` at rest on
`{colors.surface-alt}`, solid `{colors.primary}` on `{colors.primary-tint}` while a token is
over it **or while it is the keyboard's current destination**. Empty targets keep their full
height so the layout doesn't jump when a token lands.

**`inline-blank`** — a field inside running prose (cloze text entry, inline dropdown, inline
numeric). Baseline-aligned with the surrounding text, 96px minimum, growing with content, and
underlined rather than boxed so the sentence still reads as a sentence. Each blank is numbered
for its accessible name ("Blank 2 of 5") and each keeps a visible affordance under every
contrast theme.

**`pair-row`** — association: match-the-following, ranking, labelling by dropdown. **One row
per pair**: the prompt at the inline-start, the response control at the inline-end, a
`{colors.hairline}` divider between rows. This replaces the two-facing-columns pattern
entirely — facing columns force the learner to hold a mapping in their head, break completely
at mobile width, and are close to unusable with a screen reader. The response control is a
`dropdown-trigger` for a closed list, or a `drop-target` when the pool is shared.

**`scale-grid`** — Likert matrices and forced-choice (most/least) grids. A real `<table>` with
a header row of scale points and a header column of statements; each cell holds one radio.
Below 768px it **collapses to one card per statement** with the scale as a vertical choice
list — a five-column grid on a phone is a horizontal-scroll trap.

**`hot-text`** — selecting words or phrases inside prose (error identification, evidence
selection). Selectable spans carry a resting underline and become `{colors.primary-tint}` with
a `{colors.primary}` underline when chosen. Each span is a real toggle `<button>` with
`aria-pressed`, so selection is announced and keyboard-reachable.

**`hotspot-marker`** — selecting or labelling a region of an image. Markers are 28px, ringed in
`{colors.primary}` on white at rest and filled when active — never a bare coloured dot, which
disappears against a busy illustration and carries no name. Every marker is focusable with an
accessible name describing its position or referent, and the image itself carries alt text
that makes the task comprehensible without seeing it.

**`stimulus-pane`** — a shared passage or media with its own questions. Two panes side by side
above 1024px with **independent scroll** and a draggable divider (with keyboard resize), the
stimulus at `clamp(38%, 46%, 56%)`. Below that they stack, stimulus first, with the stimulus
collapsible so the learner can reclaim the screen. The stimulus never re-scrolls to the top
when the question changes.

- **Multiple stimuli** are `role="tablist"` tabs across the top of the pane, following the tab
  pattern in §Tabs. The selected tab persists across questions in the set.
- **The learner controls the layout.** A toggle switches between side-by-side and stacked
  regardless of viewport — a learner at 400% zoom, or one who simply reads better in one
  column, must not be forced into the split. Label the control by its destination state
  ("Stack panes" / "Side by side"), and persist the choice.

**`media-stimulus`** — video and audio. **Never autoplay.** Captions and a transcript are
required, not optional; the transcript is reachable without leaving the item. Where an item
limits plays, say so before the first play, not after the last.

**Constructed response** — short text uses `text-field`; extended writing uses the §Rich Text
& Equation Authoring editor with the format set trimmed to what the task needs. Numeric entry
uses `text-field` with `inputMode="numeric"`; where an on-screen keypad is offered it is an
**addition to** typing, never a replacement — a keypad that blocks the physical keyboard fails
keyboard-only users outright. File, audio, and video capture responses show state explicitly
(idle → recording/uploading → captured, with duration and a re-record path) and never discard
a capture without confirmation.

### Type → primitive map

| Family | Item types | Built from |
|---|---|---|
| Choice | Single choice, multiple response, true/false, image choice, single Likert | `choice-tile` |
| Text entry | Short text, numeric, formula, essay, multi-field, correction column | `text-field`, `inline-blank`, editor |
| Cloze | Inline blanks, inline dropdown, inline numeric | `inline-blank` |
| In-stimulus selection | Hot text, error identification, image hotspot | `hot-text`, `hotspot-marker` |
| Association | Match, classify, label image, drag-to-blank | `pair-row`, `option-token`, `drop-target` |
| Ordering | Sequencing, ranking | `option-token`, `pair-row` |
| Matrix | Likert grid, most/least forced choice | `scale-grid` |
| Media & capture | Video/audio stimulus, audio/video/file response, drawing canvas | `media-stimulus`, capture states |
| Shared stimulus | Passage sets, media sets | `stimulus-pane` + any of the above |

A type not in this table is a recombination, not a new design. If it genuinely needs a new
primitive, add the primitive here first.

### Review & Submit

The end of an assessment is where a well-built player earns its keep. A learner deciding
whether to submit needs to see what they have and have not done, at a glance, without leaving
the flow.

**`review-grid`** — the full-test view: the `status-legend` above a wrapping grid of
`item-nav-button`s covering every item in the assessment, marked with the same four states
defined in §Status Legend & Item Navigator. It is a `<nav>`, every button carries number plus
state in its accessible name, and clicking one goes straight to that item.

- **Filtered review modes** — All · Unanswered · Flagged · Answered. These are filters over the
  same grid, not four different screens, and each announces its result count ("14 unanswered
  questions"). A learner with eight minutes left needs the unanswered list in one action.
- **A count summary in text**, not just colour: "62 answered · 14 unanswered · 3 flagged".
  This is the sentence a learner actually reads before deciding, and it must be reachable by a
  screen reader without traversing a hundred buttons.
- **Leaving review** returns the learner to the item they came from, not to item 1.
- Where a section is time-locked or already submitted, its items are `disabled` with a stated
  reason rather than hidden.

**Submitting** is a confirm dialog per §Building a modal, and it must **state the consequences
in numbers before the action**: how many are unanswered, how many flagged, whether submission
is final, and whether time remains. "Are you sure?" is not informed consent. The primary
action names what it does ("Submit test"), and a route back to review sits beside it.

- **Auto-submit on expiry** follows the same rule as the timer: announced, never silent.
- **The submitted state is a real screen**, not a redirect — it confirms receipt, states what
  happens next and when results appear, and never leaves a learner unsure whether their work
  was recorded. Under proctoring, it is also where session-end instructions belong.

### Item accessibility

The bar is higher than for admin screens: a learner who cannot operate an item cannot
demonstrate what they know, and the score is wrong rather than the experience being poor.

- **Group semantics.** Every choice set is a `<fieldset>` with the prompt as its `<legend>`, or
  `role="radiogroup"` / `role="group"` with `aria-labelledby` pointing at the stem. Options are
  real `<input>`s with `<label>`s — the tile is styling on top of native controls, never a
  replacement for them.
- **The stem is part of every control's context.** Bind it with `aria-describedby` so a screen
  reader user who lands on option C still knows the question.
- **Every drag has a non-drag path.** Sequencing, matching, classification, and drag-to-blank
  each need click-to-select-then-place plus keyboard move controls, per §Accessibility →
  Dragging & Pointer Alternatives. Announce every placement: "Trunk placed in Blank 2 of 4."
- **Answer state is never colour alone** — indicator, glyph, or text, in every primitive.
- **Nothing is hover-only.** Tooltips, definitions, and magnifiers must be focusable and
  dismissible (§Accessibility → Content on Hover or Focus).
- **Everything survives 200% and 400% zoom and every contrast theme**, including images with
  hotspots, matrices, and inline blanks. Test items at the largest text size, not the default.
- **Autosave on every change**, with a quiet saved confirmation. A response lost to a
  disconnect is data loss, not a UI inconvenience.
- **Math is readable** — MathML or a spoken label, per §Rich Text & Equation Authoring. A maths
  item whose expressions are silent is unanswerable.
- **Timing pressure is not an excuse to skip any of this.** Under a countdown, a keyboard user
  fighting an inaccessible control loses marks for the design's failure.

## Accessibility (WCAG 2.2 Level AA)

Every rule below is a merge gate, not a suggestion. It applies to all SARAS products and
screens regardless of framework. Failure to meet any requirement in this section is a
**defect**, not a polish item.

### Conformance Targets

All code — hand-written or AI-generated — must satisfy:

- **WCAG 2.2 Level AA**
- **Section 508**
- **EN 301 549**
- Semantic HTML standards
- Full keyboard operability
- Screen readers: NVDA, JAWS, Narrator, ZoomText, VoiceOver (macOS + iOS), TalkBack
- Responsive + zoom behavior (§Zoom & Reflow)
- The browser matrix in §Support Matrix

The governing principle, in order:

> **HTML first → native elements first → keyboard first → screen reader first → ARIA only
> when required.**

ARIA patches what HTML cannot express. A native control that already behaves correctly always
beats a custom one wearing roles. Where SARAS deliberately departs from "native first" — the
custom `Dropdown` — the deviation is documented in §Dropdowns & Comboboxes and carries the
full custom-widget burden.

### Semantic HTML

Preferred elements — reach for these before anything else:

```html
<header> <nav> <main> <section> <article> <aside> <footer> <form> <label> <table> <button>
```

- **Never** `<div onclick>` or `<span onclick>` where `<button>` or `<a href>` is correct.
  `<button>` performs an action; `<a href>` navigates.
- Never use `role="link"` on an element that isn't an `<a>` navigating via `href` — use
  `role="button"`.
- When a clickable `<div>` is genuinely unavoidable it must carry `role="button"`,
  `tabIndex={0}`, and `onKeyDown` handling for Enter/Space. This is a documented exception,
  never the default.
- Don't add redundant roles (`role="main"` on `<main>`, `role="banner"` on `<header>`).

### Color & Contrast

- **NEVER use opacity modifiers on text** (e.g. `text-muted-foreground/60`). Always use full
  semantic tokens: `{colors.ink}` (`text-foreground`), `{colors.muted}`
  (`text-muted-foreground`).
- All text meets **4.5:1** against its background; decorative / non-text elements meet
  **3:1**. Measured against the SARAS palette: ink on white 15.9:1 (AAA), muted on white
  5.9:1 (AA), primary on white 4.6:1 (AA for text ≥13.5px), white on primary 4.6:1, white on
  `{colors.primary-hover}` 6.3:1.
- **Coloured text uses the `-ink` variant, never the fill colour** — `{colors.success}` and
  `{colors.warning}` both fail as text at 3.3:1 and 2.2:1. See §Ink Variants & Control Borders.
- **A border that identifies a control meets 3:1** — `{colors.control-border}`, not
  `{colors.input-border}` (1.4:1), on field, select, checkbox, radio, and secondary-button
  edges (SC 1.4.11).
- Muted text never below 12px. **Never convey status by color alone** — pair with an icon or
  text label.
- Every rule here is verified **per theme** (§Themes); light-theme contrast does not carry
  over to dark or high contrast.

### Focus & Focus Management

Every interactive element must **receive focus**, **show a visible focus indicator**, and sit
in a **logical DOM order**. Focus must never be lost to `<body>` or moved off-screen.

- `:focus-visible` is defined **once** in `index.css` and never overridden per component:

```css
:focus-visible {
  outline: 3px solid var(--color-primary); /* {colors.primary} — #0070E0 */
  outline-offset: 2px;
}
```

- Never `outline: none` without an equivalent replacement indicator.
- The indicator itself must clear **3:1** against adjacent colors (SC 1.4.11 Non-text
  Contrast, SC 2.4.11 Focus Appearance). `{colors.focus-ring}` — `rgba(0,112,224,0.35)` —
  resolves to roughly #A6CDF5 on white (≈1.9:1) and **fails on its own**: use it as a soft
  halo *around* the solid `{colors.primary}` outline, or as the inner ring on inputs
  (`text-field-focused`), never as the outline itself.
- **Modals / dialogs:** move focus into the dialog on open, trap it there, close on Esc,
  restore focus to the trigger on close.
- **Dynamic content:** after a route change, async render, or list mutation, move focus
  deliberately — never leave it stranded on a removed node.
- **A keyboard trap must never occur.** Any region reachable by Tab must be leavable by Tab
  or Esc.
- Avoid `tabindex` greater than `0`.

### Keyboard

All functionality must operate entirely from the keyboard. Every interactive element is
reachable by Tab in DOM order.

| Control | Required keys |
|---|---|
| Button | Enter, Space |
| Link | Enter |
| Checkbox | Space |
| Radio group | ↑ ↓ ← → |
| Tabs | ← →, Home, End, Enter, Space |
| Dropdown / combobox | ↑ ↓, Enter, Esc, Tab |
| Dialog | Tab, Shift + Tab, Esc |
| Tree view | Arrow keys, Enter, Space |
| Accordion header | Enter, Space |
| Expandable table row | Enter, Space |

- Modals trap focus, close on Esc, return focus to the trigger. Dropdown menus: arrows
  navigate, Enter selects, Esc closes. Expandable table rows toggle on Enter/Space.
- Drag handles: `role="button"`, `tabIndex={0}`, descriptive `aria-label`, plus a
  keyboard-operable alternative to the drag itself.
- No hover-only interaction anywhere — everything reachable by hover is reachable by focus.

### Screen Reader Support

The application must behave correctly on **all** of the following, not just the one used for
spot checks:

| Platform | Screen readers | Paired browser |
|---|---|---|
| Windows | NVDA, JAWS, Narrator, ZoomText | Chrome, Edge, Firefox |
| macOS | VoiceOver | Safari |
| iOS | VoiceOver | Safari |
| Android | TalkBack | Chrome |

### Accessible Naming

All controls must expose an understandable name in **natural language**.

Good: `aria-label="Search"` · `aria-label="Save"` · `aria-label="Country"`
Avoid: `aria-label="btn_save"` · `aria-label="icon-1"` · `aria-label="dropdown-country"`

Screen readers must never be left announcing **"image"**, **"graphic"**, **"icon"**, or
**"font awesome"** — decorative visuals are hidden, meaningful ones are named.

### Buttons & Interactive Elements

- Every `<button>` without visible text MUST have `aria-label="descriptive action"`
  (`button-icon` / `button-close` require the `label` prop).
- Clickable `<div>`s must have `role="button"`, `tabIndex={0}`, and `onKeyDown` handling for
  Enter/Space.
- Never use `role="link"` on elements that aren't `<a>` tags navigating via `href` — use
  `role="button"` instead.

```html
<!-- good -->
<button>Save</button>
<button aria-label="Close"><i aria-hidden="true"></i></button>

<!-- defect: no accessible name -->
<button><i></i></button>
```

### Icons & Decorative Elements

- All decorative icons: `aria-hidden="true" focusable="false"`.
- Decorative images: `role="presentation"` or `alt=""`.
- Decorative separators / dividers: `aria-hidden="true"`.
- A meaningful icon (status glyph, sole content of a control) carries a real accessible name
  on its **control**, not on the glyph.

### Forms & Inputs

- Every `<input>`, `<select>`, `<textarea>` MUST have a visible `<label>` or `aria-label`;
  bind labels programmatically (`htmlFor` / `id`). A placeholder is **never** a label.
- Help text and error text are associated with `aria-describedby`; required state is
  conveyed with the `required` attribute **and** in the visible label.

```html
<label for="username">Username</label>
<input id="username" aria-describedby="usernameHelp" required />
<p id="usernameHelp">Use your work email prefix.</p>
```

- For any custom or shadcn `<SelectTrigger>` (the SARAS `dropdown-trigger`), always add
  `aria-label="..."`, plus `aria-expanded` and `aria-haspopup="listbox"`; the menu is
  `role="listbox"` with `option` + `aria-selected`.
- Required fields are marked in the label **and** validated inline with text (not color
  alone); error text is `{colors.error}` + icon, wired via `role="alert"`.
- Labels sit **above** their control (§Typography → Principles), never as placeholder text.

### Error Messages

Errors must be announced automatically, the moment they appear.

```html
<div id="usernameError" role="alert">Username is required.</div>
```

Two layers, exactly as specified in §Building a form (step 6) and §Building a modal (step 4):
a form-level `role="alert"` banner when `submit && !valid`, and per-field `role="alert"`
messages under each invalid control with the border turned `{colors.error}`. Never color
alone.

### Dialogs

`modal` must ship:

```html
role="dialog"
aria-modal="true"
aria-labelledby="dialogTitle"
aria-describedby="dialogDescription"
```

Every `Dialog` includes a description node (visually hidden via `class="sr-only"` if it isn't
on screen). Focus moves in, is trapped, Esc closes, focus returns to the trigger.
`CloseBtn` carries `aria-label="Close"`.

Expected announcement for a confirm dialog:

> Delete Record — Are you sure you want to delete this record? — No, button

### Dropdowns & Comboboxes

**Documented deviation.** The accessibility baseline prefers a native `<select>`. SARAS
deliberately ships a **custom `Dropdown`** (`Dropdown.jsx`) instead, for portal-mounting,
search-over-7-options, multi-select, and consistent styling. Because it is custom, it carries
the *full* burden — a custom dropdown that misses any of these is a defect, and a native
`<select>` would have been the correct choice:

- Keyboard: ↑ ↓ navigate, Enter selects, Esc closes and returns focus to the trigger, Tab
  moves on without leaving the menu open.
- ARIA: trigger `aria-haspopup="listbox"` + `aria-expanded`; menu `role="listbox"`; items
  `role="option"` + `aria-selected`; the trigger has an `aria-label` or bound `<label>`.
- Focus returns to the trigger on close, always.

Expected announcement:

> Country, combo box, collapsed → Country, combo box, expanded, 5 options available

### Tabs

Must follow the WAI-ARIA Tab pattern. Required roles: `role="tablist"`, `role="tab"`,
`role="tabpanel"`, with `aria-selected` on the active tab and `aria-controls` /
`aria-labelledby` binding each tab to its panel. Keys: ← →, Home, End, Enter, Space.

Expected announcement:

> Profile, tab, selected, 2 of 5

### Tables

- Every table has an accessible name: a `<caption>` (may be `sr-only`) **or**
  `aria-labelledby` pointing at the card header `<h3>` from the data-table master anatomy.
- Header cells use real `<th scope="col">` / `<th scope="row">`.
- Screen reader users must be able to determine row count, column count, and header
  relationships.
- Pager nav buttons carry `aria-label="Previous"` / `"Next"`; ellipses are non-interactive;
  the range label ("1–10 of 128") is the live announcement of state.

```html
<table>
  <caption>Employee List</caption>
  ...
</table>
```

### Accordions & Disclosures

The toggle is a real `<button>` carrying `aria-expanded` and `aria-controls`:

```html
<button aria-expanded="false" aria-controls="panel1">Section Header</button>
```

Keys: Enter, Space. Screen readers must announce **expanded** / **collapsed** on change.

### Headings

- Exactly **ONE `<h1>` per page**. Use a `<span>` for branding / logos in the header, never the
  wordmark as the page heading.
- **Heading levels must not skip** (h1 → h2 → h3, never h1 → h3). Choose the level by position
  in the document outline, then style it — never pick a heading tag for its size.
- Every landmark region and every card or panel with a title has that title as a real heading,
  so a screen reader user can navigate the page by headings rather than reading it linearly.
- The same rules govern delivery surfaces: an item's stem is not automatically an `<h1>`, and
  the page keeps exactly one.

### ARIA

- Don't add redundant roles (`role="main"` on `<main>`, `role="banner"` on `<header>`).
- `aria-hidden` must be the string `"true"` or `"false"`, never a bare attribute.
- Every `Dialog` must include a `DialogDescription` (visually hidden via `class="sr-only"`
  if needed). Modals: `role="dialog"`, `aria-modal`, `aria-labelledby`.
- Status badges / toasts announce via `aria-live="polite"`. Charts get a text summary or a
  data-table fallback.

### Dragging & Pointer Alternatives

**SC 2.5.7 Dragging Movements is Level AA in WCAG 2.2** — every drag interaction must have a
single-pointer, non-dragging alternative, and a keyboard path.

- Drag-and-drop item types (sequencing, classification, match-the-following, drag-to-blank),
  reorderable lists, sliders, and draggable tool panels all qualify. A library that ships
  mouse dragging is not compliance on its own.
- Provide **either** click-to-select then click-to-place, **or** move up / move down / move to
  controls — plus keyboard equivalents (Space picks up, arrows move, Space drops, Esc
  cancels).
- Announce each move politely: "Option 2 moved to position 3 of 5."
- Drag handles: `role="button"`, `tabIndex={0}`, descriptive `aria-label`.
- **SC 2.5.4 Motion Actuation** — nothing may depend on device motion or a gesture with no
  button equivalent.

### Content on Hover or Focus

**SC 1.4.13.** Tooltips, hover cards, and flyout labels (collapsed nav labels, toolbar hints)
must be:

- **Hoverable** — the pointer can move onto the revealed content without it vanishing.
- **Dismissible** — Esc closes it without moving focus.
- **Persistent** — it stays until dismissed, focus moves, or it stops being valid; never on a
  timeout.

A hover-only tooltip is never the sole carrier of a control's accessible name — the name lives
on the control itself.

### Live Regions & Announcements

- **One app-level polite announcer.** Route status text through it rather than adding a live
  region per feature; competing regions interrupt each other and get dropped.
- `aria-live="assertive"` is reserved for genuine interruptions — a session about to
  terminate, a security violation, an unrecoverable error. Answer selections, saves, filter
  results, and progress updates are all **polite**.
- Never make a per-second value (a countdown, a stopwatch, a live counter) a live region; see
  §Timers & Countdowns for the threshold pattern.
- Never write announcements by mutating `textContent` on an arbitrary node — the region must
  exist in the DOM before the text changes, or it isn't announced.

### Landmarks & Navigation

- Use semantic HTML: `<main>`, `<header>`, `<nav>`, `<footer>`.
- Include a skip-to-main-content link as the first focusable element.
- Add `aria-label` to `<nav>` elements (e.g. `aria-label="Main navigation"`).
- Mark the current item in any navigation list — side nav, `tree-item`, breadcrumb — with
  `aria-current="true"` (or `"page"` for route links). `aria-selected` belongs only inside a
  listbox, tab list, or `role="tree"`.

### Images & Media

- All `<img>` have meaningful `alt` text, or `alt=""` if decorative.
- SVGs: `aria-hidden="true" focusable="false"` when decorative.

### Target Size & Mobile

- **AA floor (SC 2.5.8): 24×24 CSS px.** The 32px `button-icon`, `button-close`, and pager
  nav buttons clear this.
- **Touch surfaces target 44×44** (mobile, tablet, and any primary action): primary buttons
  are 46px, inputs and dropdown triggers 44px. Where a 32px control appears on a touch
  surface, give it a 44×44 hit area via padding or spacing rather than shrinking the
  spacing between neighbours.
- No hover-only interactions; no content hidden behind hover.
- Layout stays responsive per §Responsive Behavior; nothing becomes unreachable at mobile
  width.

### Zoom & Reflow

Must work at **100%**, **200%**, and **400%** zoom (SC 1.4.4 Resize Text, SC 1.4.10 Reflow):

- No clipping, no overlap, no hidden controls, no loss of function.
- No horizontal scrolling of the **page**. The one permitted exception is a wide data table
  inside its `.tscroll` region — 1.4.10 exempts data tables, and only the table region may
  scroll, never the page around it.

### Support Matrix

| Tier | Must support |
|---|---|
| Desktop browsers | Chrome, Microsoft Edge, Firefox, Safari |
| Mobile browsers | iOS Safari, Chrome Android, Samsung Internet |
| Screen readers | NVDA, JAWS, Narrator, ZoomText, VoiceOver (macOS/iOS), TalkBack |
| Zoom | 100%, 200%, 400% |

Behavior must remain consistent across all of them.

### Framework Rules

**React (primary — `react-app/v3/src/**`)**
- Reuse the shared primitives (`formKit.jsx`, `Dropdown.jsx`, `Pager.jsx`, `icons.jsx`);
  never re-implement a control and lose its a11y wiring.
- Manage focus explicitly after dynamic rendering, portal mounts, and route changes.
- `aria-hidden` takes the string `"true"` / `"false"`; `tabIndex={0}` on any documented
  clickable non-button.
- Handle `onKeyDown` for Enter/Space/Escape/ArrowUp/ArrowDown wherever a custom control
  replaces a native one.

**Angular (where a SARAS surface is Angular)**
- Prefer native HTML controls; use the Angular CDK a11y utilities (`FocusTrap`,
  `LiveAnnouncer`, `cdkTrapFocus`) rather than hand-rolled equivalents.
- Use `trackBy` in loops so DOM nodes — and the focus on them — survive re-renders.
- Manage focus after dynamic rendering; avoid `tabindex` greater than 0; never ship
  click-only interactions.
- Bind keyboard events where applicable:

```typescript
keydown.enter
keydown.space
keydown.escape
keydown.arrowdown
keydown.arrowup
```

### Pre-merge Accessibility Checklist

No pull request merges until every line passes:

- [ ] Semantic HTML verified
- [ ] Keyboard-only pass completed (no trap, no unreachable control)
- [ ] Focus order verified
- [ ] Focus restoration verified (modal / dropdown / route change)
- [ ] Visible focus verified (3px solid, ≥3:1)
- [ ] NVDA verified
- [ ] JAWS verified
- [ ] Narrator verified
- [ ] VoiceOver verified (macOS + iOS)
- [ ] TalkBack verified
- [ ] 200% zoom verified
- [ ] 400% zoom verified
- [ ] Responsive verified at all four breakpoints
- [ ] Chrome / Edge / Firefox / Safari verified
- [ ] iOS Safari / Chrome Android verified
- [ ] Color contrast verified (4.5:1 text, 3:1 non-text) in light, dark and high contrast
- [ ] Control-identifying borders meet 3:1
- [ ] Layout holds with reduce-motion, increased spacing and dyslexia font enabled
- [ ] Status never conveyed by color alone
- [ ] One `<h1>`, no skipped heading levels
- [ ] Every control has a natural-language accessible name
- [ ] Every drag interaction has a non-drag and keyboard alternative (SC 2.5.7)
- [ ] Tooltips / hover content are hoverable, dismissible, persistent (SC 1.4.13)
- [ ] RTL verified with `dir="rtl"`; no clipped labels at the longest locale
- [ ] Dates render correctly in a second time zone and across a DST transition
- [ ] Timers announce at thresholds, not per tick
- [ ] Authored HTML sanitized before render; math exposes MathML or a spoken label
- [ ] Gated UI never flashes before privileges resolve
- [ ] Alt text, transcripts and spoken math captured at authoring time, not after
- [ ] Every item type operable by keyboard alone, at 400% zoom, in every contrast theme
- [ ] WCAG 2.2 AA verified

### Rules for AI Coding Assistants

When generating any SARAS code:

1. Use semantic HTML first.
2. Use native controls wherever possible; the custom `Dropdown` is the one documented
   exception and must meet §Dropdowns & Comboboxes in full.
3. Ensure complete keyboard accessibility per the §Keyboard matrix.
4. Ensure compatibility with NVDA, JAWS, Narrator, VoiceOver, and TalkBack.
5. Maintain the visible focus indicator; never strip it.
6. Give every control a natural-language accessible name.
7. Use ARIA only where native HTML cannot achieve the behavior.
8. Ensure Chrome, Edge, Firefox, Safari, iOS Safari, Chrome Android, and Samsung Internet
   all behave the same.
9. Ensure 200% and 400% zoom support.
10. Emit WCAG 2.2 AA-compliant code by default — and SARAS tokens, never inline hex.

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
| Loader appearance | delayed 200ms, held ≥400ms once shown |
| Skeleton shimmer | single sweep, 1.4s `ease-in-out`, inline direction |
| Content reveal | opacity + 4px rise, 200ms, staggered 40ms per row (max 6) |
| Brand loader exit | fade into the shell, 240ms |

Easing stays `ease` / `ease-out` / `cubic-bezier(.22,1,.36,1)`; nothing over 300ms. **All
motion is gated by `prefers-reduced-motion`** — disable lift / fly-in / pulse, keep opacity
fades ≤150ms. No content flashes more than 3×/second.

## Do's and Don'ts

### Do
- Anchor every screen on the neutral canvas with white cards; keep one accent language (blue
  + its tints) across all products.
- Use cards, not tables, for object lists; 3-up on desktop, responsive to 1.
- Use the `tree-panel` folder navigator for any scoped or hierarchical container list
  (repositories, banks, categories) — one active node, counts on the right, never a
  per-screen list.
- Route inline styles through `css()`; change border *color* on hover, never the shorthand.
- Portal-mount every floating layer (dropdown menu, overlay, popover, flyout).
- Keep charts glossy and modern with bar baselines on the axis line; pair each with a text
  fallback.
- Ship loading, empty, and error states with every data view, each occupying the exact space
  the real content will.
- Build item types from the shared response primitives in §Assessment Items; a new type is a
  recombination, not a new layout.
- Show authors the real learner rendering, not an approximation of it.
- Run bulk work as a job with its own list and history, not a modal the user must sit through.
- Keep density compact — spend whitespace to group and separate, not to pad.

### Don't
- Don't introduce a second brand hue or a saturated gradient banner. One accent language.
- Don't put `{colors.primary}` text on a tinted blue background.
- Don't convey status by color alone.
- Don't use opacity modifiers on text, and don't hard-code a hex anywhere — a literal colour
  is a component that breaks in dark and high-contrast themes.
- Don't use a switch for anything that needs a Save button.
- Don't add a hue for a workflow state the semantic ramp doesn't cover — the label carries it.
- Don't hardcode a time-zone offset, a date format, or a week start — all three come from the
  locale and the zone database.
- Don't show an absolute time without its zone, or auto-refresh a screen someone is working in.
- Don't report a field error in a toast, or confirm a success with a modal.
- Don't show a loader before 200ms, replace a page with a full-screen fallback on navigation,
  or let content land in a box that wasn't reserved for it.
- Don't put behaviour in markup attributes, or a `<div>` inside a `<span>`.
- Don't reveal row actions on hover alone, or hide which tenant an admin is acting in.
- Don't give each notification or category type its own hue — the glyph carries the type.
- Don't draw a control's boundary in a hairline grey; a border that identifies a control is
  `{colors.control-border}`.
- Don't let AI output reach a content bank without a human accepting it item by item.
- Don't build a native `<select>`, a one-off button, or a bespoke pager — reuse the shared
  primitives.
- Don't skip heading levels or ship more than one `<h1>` per page.
- Don't name a control with a code string (`aria-label="btn_save"`) — accessible names are
  natural language.
- Don't attach behavior to a `<div>` or `<span>` where a `<button>` or `<a href>` belongs.
- Don't leave a control hover-only, or strip the focus outline without replacing it.
- Don't colour-code answer options, or put player chrome (flag, clear, next) inside the item
  frame.
- Don't lay out an association item as two facing columns — one `pair-row` per pair.
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
  (The AA floor is 24×24 — see §Accessibility → Target Size & Mobile.)
- Feature/report grids reduce column count rather than shrinking cards.
- Every breakpoint must also hold at 200% and 400% zoom without clipping, overlap, or page-
  level horizontal scroll — see §Accessibility → Zoom & Reflow. Browser and screen-reader
  coverage is fixed by §Accessibility → Support Matrix.

## Internationalization & RTL

SARAS ships in multiple languages, including **Arabic**, so direction and text expansion are
layout constraints, not a late localization pass.

### Strings
- **No hardcoded user-facing string.** Every label, message, `aria-label`, `alt`, placeholder,
  and announcement comes from the translation catalogue — accessible names included, since an
  untranslated `aria-label` leaves a screen reader user in the wrong language.
- Keys are namespaced by surface and nested by component (`dashboard.popup.button.cancel`),
  and **accessibility strings live in the catalogue too** (`…ariaLabel.prodStatus`).
- Never build a sentence by concatenating fragments — word order differs by language. Use
  interpolation and plural rules.
- Dates, times, durations, and numbers go through locale formatting; the timer and pager use
  tabular figures in every locale.

### Direction
- Set `dir` on the document root from the active language and let the tree inherit it; never
  per-component direction flags.
- **Use CSS logical properties** — `margin-inline-start`, `padding-inline-end`,
  `inset-inline-start`, `border-start-start-radius` — instead of left/right. This is what
  makes the side nav, `tree-panel` indentation, accent bars, and modal footers mirror for
  free.
- **Mirror** directional icons (chevrons, back arrows, progress direction, the nav collapse
  toggle). **Don't mirror** icons with a fixed real-world orientation: clocks, media
  play/pause, checkmarks, logos.
- Charts, steppers, and progress bars flow start-to-end, not left-to-right.

### Layout tolerance
- Allow for **+30–40% text expansion** (German, Finnish) and much shorter strings (Chinese,
  Japanese, Korean). Buttons, chips, table headers, and nav items size to content and wrap —
  never a fixed width that clips a translation.
- Test the type scale at the longest locale before shipping; the compact-density rule in
  §Layout never wins against a clipped label.
- Fonts: Poppins carries Latin. Non-Latin scripts fall back to `system-ui`, so verify line
  height and diacritic clipping in Arabic, Japanese, Korean, Thai, and Vietnamese rather than
  assuming the Latin metrics hold.

## Dates, Times & Time Zones

SARAS schedules assessments that people sit at a specific moment, sometimes in a different
country from the person who scheduled them. A time rendered in the wrong zone is not a
cosmetic bug — it is a candidate who misses their exam.

### Time zones

- **Store and transmit UTC. Render in an explicit zone.** The stored instant and the displayed
  wall-clock time are different things, and the conversion happens at the edge, once.
- **Never hardcode an offset.** A fixed `+05:30` in conversion code is correct for one region
  and silently wrong for every other, and wrong twice a year for any region with daylight
  saving. Use the platform's time-zone database and the locale's formatter.
- **Always show the zone** beside any absolute time that more than one person sees — a schedule
  window, a deadline, a session start. "09:00" is not a time; "09:00 IST" is.
- **Where the scheduler's zone and the candidate's differ, show both**, with the candidate's
  first. The person sitting the exam is the one who must not misread it.
- **Relative time never replaces absolute time** for anything actionable. "Starts in 2 hours"
  is a helpful addition beside "14:00 GMT, 3 March", never a replacement for it.
- **Daylight saving changes durations.** A window crossing a transition is not the length its
  wall-clock endpoints suggest — compute on instants, never by adding hours to a local time.
- Times sit in tabular figures so columns of them line up (§Typography).

### Formats

- **Never render an ambiguous numeric date.** `03-04-2026` is two different days depending on
  the reader. Use an unambiguous format with the month as a word wherever space allows, and a
  locale formatter everywhere else — never a hand-assembled `DD-MM-YYYY` string.
- **Month names, day names, week start, and calendar system come from the locale**, not from a
  hardcoded English array. Weeks do not start on Sunday everywhere; §Internationalization & RTL
  applies to the calendar as much as to the copy around it.
- Durations are stated in the units people use ("1 hr 30 min"), not raw minutes, and additional
  time granted as an accommodation is labelled as such rather than folded silently into the
  total.

### Windows and ranges

Scheduling deals in **paired times**, and often in **nested pairs** — a delivery window inside
which a test window sits. Validate them as a unit, not as two independent fields:

- End must be **after** start, never equal to it.
- An end in the past is invalid on creation; an already-running window is edited, not
  recreated.
- **An inner window must sit inside its outer window**, and the message must say which
  constraint failed — "Test times must be within the schedule window", not "Invalid date".
- Changing the outer window re-validates the inner one immediately, at the point of change.
- Validation messages name the field and the fix, per §Building a form. A date field is where
  vague errors cost the most, because the user cannot guess which of the four rules they broke.

## Engineering Standards

This document specifies what the interface must be; this section specifies how the code that
implements it is organised, because a design system only holds if the code is shaped to let it.
These are gates at review, like the accessibility rules.

### Code organisation

- **No page holds everything.** A screen file that carries its own layout, data fetching,
  formatting, validation, and every control it renders becomes unmaintainable and is where
  design-system drift starts — the fifth bespoke button gets written because reaching the
  shared one is harder than copying.
- **Shared before local.** Anything used on more than one screen — primitives, layout shells,
  formatters, validators, API access — lives in a shared module. Page files hold only what is
  genuinely specific to that page.
- **One responsibility per file.** Presentation, state, and data access are separate: a
  component renders, a hook or service fetches, a util transforms. A component that calls an
  endpoint directly cannot be reused on a screen with a different data source.
- **Extract on the second use, not the fifth.** The moment a pattern appears twice, it belongs
  in the shared layer — that is also the moment it should be checked against this document and
  given a token name.
- **Utilities are small and general.** A "util" that knows about one screen is that screen's
  code, not a utility.
- **Declare repeated screens, don't rebuild them.** Where an estate has many structurally
  identical screens — a list with a title, columns, filters, row actions and an export — define
  each one as **metadata in one place** and render them all through a single generic screen.
  Twenty hand-built list pages drift apart within a release; twenty declarations cannot. It
  also means a change to the table spec in this document is applied once, not twenty times.
  Only screens with genuinely distinct behaviour get their own component.

### Coding standards

- **Consistency beats preference.** Formatting, linting, and import order are decided once,
  enforced automatically, and never argued per pull request. Automatic formatting also keeps
  diffs semantic, which is what makes review — and merges — tractable.
- **Style comes from tokens, not literals.** No hard-coded hex, size, or spacing value anywhere
  in a component; every value resolves through the tokens in this document. This is what makes
  §Themes work, and it is the single most-violated rule in practice.
- **Types are not optional.** Props, API responses, and shared state are typed. `any` at a
  module boundary defeats the purpose.
- **Handlers live in functions, not in markup.** Inline `onclick` / `onchange` expressions in
  HTML attributes are not reviewable, not testable, and not reusable. Bind a named handler
  defined in the component — the markup should read as structure, not as behaviour.
- **HTTP goes through one client.** A single configured instance owns the base URL, auth
  headers, timeouts, retries, and error normalisation, so every screen fails the same way and
  no component invents its own error shape. Every request has a loading, empty, and error state
  in the UI (§Feedback States); a fetch with no error branch is an incomplete feature.
- **Images are assets with rules.** Correct format for the job, sized for the largest rendering
  they get, lazy-loaded below the fold, with intrinsic dimensions set so the layout does not
  shift as they land. Icons come from the single stroke-icon set (§Shapes) — never a one-off
  SVG pasted into a component.

### Semantic markup

- **Use the element that means the thing.** A `<div>` inside a `<span>` is invalid nesting —
  a block element cannot live inside an inline one — and browsers recover from it
  unpredictably. Wrapping every field label and value in nested generic elements is also what
  makes a screen hard to make editable later: there is no element that *is* the field, only
  boxes around text.
- **A displayed value should be one element**, so it can become an input, gain an `aria`
  attribute, or be targeted by a test without restructuring its ancestors.
- Text is text, fields are fields, actions are buttons, navigation is links. §Accessibility →
  Semantic HTML is the full rule; this is the maintainability reason for it.

### Messages: which surface says what

Four surfaces, and the choice is determined by **what the user must do about it**, not by
severity:

| Situation | Surface |
|---|---|
| A specific field is wrong | **Inline** message under the field, `role="alert"`, border in `{colors.error}` |
| The form as a whole can't be submitted | **Form-level alert banner** at the top of the form or modal body |
| A decision or acknowledgement is needed — confirmation, destructive action, a failure the user must act on | **Modal** (`role="dialog"`), per §Building a modal |
| Something succeeded, or a passive notice | **Toast**, top-right, one at a time, auto-dismissing, `aria-live="polite"` |

- **Success never blocks.** A modal to say "Saved" is an interruption charging the user a click
  for good news.
- **A failure the user must act on never auto-dismisses.** A toast that disappears after four
  seconds is not an error report — if the user has to do something about it, it is a modal or
  an inline message that stays.
- **Field errors are never toasts.** A toast cannot be associated with the input, does not
  survive long enough to be read while correcting, and leaves a screen reader user with no way
  back to the problem.
- Toast variants (`info` / `success` / `warning` / `destructive`) exist for passive notices of
  varying weight — a destructive-styled toast still means "this happened", never "decide".

### Responsive and secure by default

- **Responsive is the first pass, not a later one.** Build against §Responsive Behavior from the
  start; a desktop-only layout retro-fitted to mobile is a rewrite, and it is always the
  accessible behaviours (touch targets, reflow, focus order) that get lost in the retro-fit.
- **Prototypes and mocks follow the same security rules as production.** Specifically: no real
  candidate or user data in a mock — generate it; no credentials, tokens, keys, certificates,
  or `.env` files committed, ever, including in a throwaway branch; nothing rendered from
  untrusted HTML without sanitisation (§Rich Text & Equation Authoring); no secret in
  client-side code, since everything shipped to the browser is public.
- A mock that ships with a real dataset or a committed key is not a mock that got sloppy — it
  is a disclosure, and it outlives the prototype.

### Version control

- **Keep diffs semantic.** Enforced formatting, no reformat-the-file commits mixed with real
  changes, and no committed build output — these are what make a mid-development pull painful,
  because a formatting-churned or artefact-heavy diff conflicts on lines nobody edited.
- **Small, frequent, self-contained commits**, each leaving the app working. Long-lived
  branches carrying UI rewrites are the hardest thing to merge and the most likely to be
  resolved by overwriting someone's work.
- **Binary assets are not source.** Large images, media, and archives belong in asset storage,
  not in the repository, where they cannot be merged and every version is kept forever.
- **Design tokens change in one place.** A token edited per-component produces conflicts in
  every component; edited in the token file, it produces one line of diff.
- Generated files, dependency directories, environment files, and local editor settings are
  excluded from version control before the first commit, not after the first leak.

### Reference project structure

The layout for a new project or prototype. The frontend half is what this document governs; the
backend half applies where the project has one.

```
project/
├── backend/                 # API service
│   ├── app/
│   │   ├── config.py        # constants and environment configuration
│   │   ├── models/          # data models and schemas
│   │   ├── services/        # business logic
│   │   ├── routes/          # API endpoints
│   │   └── utils/           # small general-purpose helpers
│   ├── main.py              # entry point
│   ├── dependencies.py      # shared dependencies (data access, auth, integrations)
│   ├── requirements.txt     # pinned dependencies
│   ├── scripts/             # operational and build scripts
│   ├── docs/                # backend documentation
│   └── tests/
│       ├── unit/
│       └── integration/
│
├── frontend/                # web application
│   ├── public/              # static assets
│   ├── src/
│   │   ├── index.*          # entry point — mounts the root component
│   │   ├── App.*            # root component and routing
│   │   ├── components/      # shared primitives and reusable UI
│   │   ├── pages/           # one folder per screen, page-specific code only
│   │   ├── hooks/           # shared stateful logic
│   │   ├── services/        # the single HTTP client and API modules
│   │   ├── utils/           # pure helpers (formatting, validation)
│   │   ├── locales/         # translation catalogues (§Internationalization & RTL)
│   │   ├── styles/          # token definitions and global styles
│   │   └── types/           # shared type definitions
│   ├── package.json
│   ├── docs/
│   └── tests/
│
├── docs/                    # project-level documentation, incl. this design system
├── README.md                # what it is, how to run it, how to contribute
└── .gitignore               # environment files, build output, dependencies, editor settings
```

Two properties matter more than the exact folder names: **shared code has an obvious home, so
reusing is easier than copying**, and **environment files and secrets are excluded from the
first commit**. A team that renames these folders and keeps both properties has followed this
section; a team that matches the tree exactly and puts everything in one page file has not.

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
8. For a new item type, pick primitives from §Assessment Items before drawing anything; if
   none fit, add the primitive to that section first.
9. Any screen showing a time to more than one person states the zone; any screen taking a date
   uses `date-time-picker`, never a bare text field.

## Known Gaps

- Poppins is loaded from Google Fonts; `system-ui` is the fallback. No licensed display face.
- Exact chart internals (axis math, tooltip anchoring) live in the chart components rather
  than as tokens here; `chart-tooltip` captures only the visual style.
- Print / PDF layout for reports is owned by `reportWindow.js` and per-report PDF assets, not
  by this token set.
- More than one implementation of the same primitive is live across the estate, under
  different names. Which one owns a given component is unsettled, and their internal tokens
  are not reconciled with this document. Converging them is the migration; this document is
  the target.
- Some surfaces ship a primary blue other than `{colors.primary}` #0070E0. Two blues in
  production is exactly what the one-accent rule exists to prevent; the token here is the
  intended value, and drifted surfaces should be corrected toward it rather than the reverse.
- `{colors.input-border}` is used today as the resting edge of text fields and dropdown
  triggers, where it measures 1.4:1 and fails SC 1.4.11. Moving those edges to
  `{colors.control-border}` changes the look of every form on every screen, so it is a
  deliberate migration, not a patch — but the current value is a conformance failure, not a
  style choice.
- The **dark and high-contrast ramps are not authored yet**. §Themes fixes the contract and
  the rules; the actual token values need designing and measuring, and guessing them here
  would produce pairings nobody has verified.
- Scheduling surfaces convert times through a **hardcoded fixed offset** rather than the zone
  database. That is correct for one region only, and wrong across every daylight-saving
  transition even there. §Dates, Times & Time Zones states the target; migrating the existing
  conversions is a correctness fix, not a refinement, and it touches stored data as well as
  display.
- Calendar month and day names, week start, and date format are assembled in English in code
  rather than taken from the locale, so the picker does not localize even though the rest of
  the product does.
- Sibling products ship **different wordmark artwork** — this one at 3.07:1 (509 × 166 PNG),
  the identity console at 3.54:1 (SVG). The sizes here are correct for the 3.07:1 asset; a
  product on the other lockup must re-derive its widths from its own ratio rather than copying
  the pixel values. Converging on one asset, as SVG, would remove the whole class of problem.
- The wordmark PNG carries **transparent padding on its left edge**, which is why auth screens
  offset it by -8 to -9px to sit flush. Every new screen inherits that hand-tuning. Trim the
  asset once and drop the offsets.
- Item **analytics** (p-values, discrimination, distractor performance) exist as a surface but
  have no charting or table pattern here; §Charts covers style, not what a psychometric view
  needs to show.
- Whether AI features get their own accent is unresolved. A second hue for AI would breach the
  one-accent rule in §Overview; scoping it to a single, clearly-bounded surface is arguable,
  but it is a system-level decision and should be made deliberately rather than by the first
  screen that needs it.
- The type scale here is specified in **px**, which cannot respond to the `text-size-control`
  in the learner toolbar or to text-only zoom. Migrating the scale to `rem` on a root
  font-size is unresolved; until then, delivery surfaces and admin surfaces scale differently.
- Delivery surfaces offer **player skins** chosen per program, which sits against this
  document's "no per-product styling" rule. They are permitted only as token-level re-maps of
  canvas / surface / ink; any skin that forks a component's structure or behavior is a defect.
  No skin's palette is documented here yet.
- The delivery sections (§Learner Accessibility Toolbar, §Status Legend & Item Navigator,
  §Timers) describe the target state. They were written from requirements, not from existing
  screens, so expect current delivery code to fall short of them in places.
- The visible focus outline is specified as solid `{colors.primary}`, not `{colors.focus-ring}`.
  The translucent ring resolves to about **1.7:1** on white and cannot carry SC 1.4.11 on its
  own — and it is what shipping code currently sets globally on `:focus-visible`, so this is a
  live conformance failure across every product, not a theoretical one.
- 32px controls (`button-icon`, `button-close`, pager nav) meet the 24×24 AA floor but not the
  44×44 touch target; they rely on surrounding hit area/spacing on touch surfaces, which is
  not yet enforced in code.
- §Framework Rules carries an Angular subsection for SARAS surfaces built on Angular; the
  token set and component anatomy in this document are described in React terms and have no
  Angular equivalents documented yet.
- Source of truth for live values is `react-app/v3/src/**` and the shared primitives
  (`lib/css.js`, `Dropdown.jsx`, `Pager.jsx`, `formKit.jsx`, `icons.jsx`, `consoleUtils.js`).
  When a value here and the code disagree, the code wins — update this document to match.
