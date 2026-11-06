import React from 'react'
import { createPortal } from 'react-dom'

const DR_ACC = '#0070E0'
const DR_FONT = "'Poppins', system-ui, sans-serif"
const DR_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DR_PRESETS = { today:'Today', month:'This Month', last:'Last Month', last2:'Last 2 Months', custom:'Custom Range' }
const drPad = n => String(n).padStart(2, '0')
const drISO = (y, m, d) => { const x = new Date(y, m, d); return x.getFullYear() + '-' + drPad(x.getMonth() + 1) + '-' + drPad(x.getDate()) }
const drParts = s => s ? { y:+s.slice(0, 4), m:+s.slice(5, 7) - 1, d:+s.slice(8, 10) } : null
const drToday = () => { const t = new Date(); return drISO(t.getFullYear(), t.getMonth(), t.getDate()) }
const drFmt = s => { const p = drParts(s); return p ? drPad(p.d) + '/' + (p.m + 1) + '/' + p.y : '' }
const drFmtUS = s => { const p = drParts(s); return p ? drPad(p.m + 1) + '/' + drPad(p.d) + '/' + p.y : '' }
const drLong = s => { const p = drParts(s); return p ? drPad(p.d) + ' ' + DR_MONTHS[p.m].slice(0, 3) + ' ' + p.y : '' }
function drPresetRange(k) {
  const t = new Date(), y = t.getFullYear(), m = t.getMonth()
  if (k === 'today') { const s = drToday(); return { from:s, to:s } }
  if (k === 'month') return { from:drISO(y, m, 1), to:drISO(y, m + 1, 0) }
  if (k === 'last') return { from:drISO(y, m - 1, 1), to:drISO(y, m, 0) }
  if (k === 'last2') return { from:drISO(y, m - 2, 1), to:drISO(y, m, 0) }
  return null
}

export function drBound(s, end) {
  if (!s) return null
  if (s.length === 10) { const p = drParts(s); return end ? new Date(p.y, p.m, p.d, 23, 59, 59, 999).getTime() : new Date(p.y, p.m, p.d).getTime() }
  return Date.parse(s)
}

export function inDates(dateISO, from, to) {
  if (!from && !to) return true
  if (!dateISO) return false
  const d = String(dateISO).slice(0, 10)
  return (!from || d >= from) && (!to || d <= to)
}

function DrIcon({ d, size = 16, color = 'currentColor', sw = 2 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={{ flex:'none' }}><path d={d} /></svg>
}
const DR_CAL = 'M8 2v4 M16 2v4 M3 9h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'
const DR_LIST = 'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01'
const DR_CALCHECK = DR_CAL + ' M9 15l2 2 4-4'

export function DateRange({ value, onChange, presets, allLabel, ariaLabel }) {
  const keys = (presets && presets.length ? presets : ['today', 'month', 'last', 'last2', 'custom']).filter(k => DR_PRESETS[k])
  const v = value || {}
  const [open, setOpen] = React.useState(false)
  const [mode, setMode] = React.useState('custom')
  const [preset, setPreset] = React.useState('custom')
  const [from, setFrom] = React.useState(null)
  const [to, setTo] = React.useState(null)
  const [hover, setHover] = React.useState(null)
  const [view, setView] = React.useState({ y:2026, m:0 })
  const [pos, setPos] = React.useState(null)
  const [compact, setCompact] = React.useState(typeof window !== 'undefined' && window.innerWidth <= 720)
  const trigRef = React.useRef(null)
  const popRef = React.useRef(null)

  const openPicker = () => {
    const f = v.from || null, t = v.to || null
    setFrom(f); setTo(t); setHover(null)
    setMode(allLabel && !f ? 'all' : 'custom')
    const match = f && keys.find(k => { const r = drPresetRange(k); return r && r.from === f && r.to === t })
    setPreset(match || 'custom')
    const base = drParts(f || drToday())
    setView({ y:base.y, m:base.m })
    setPos(null); setOpen(true)
  }
  const close = () => { setOpen(false); setPos(null) }
  const apply = () => {
    if (mode === 'all') onChange && onChange(null, null)
    else if (from) onChange && onChange(from, to || from)
    close()
  }

  const place = React.useCallback(() => {
    if (!trigRef.current || !popRef.current) return
    const r = trigRef.current.getBoundingClientRect(), p = popRef.current.getBoundingClientRect()
    const vw = window.innerWidth, vh = window.innerHeight, M = 12, G = 8
    const w = p.width, h = p.height
    let left = r.right - w
    left = Math.max(M, Math.min(left, vw - M - w))
    const below = vh - r.bottom - G - M, above = r.top - G - M
    let top = (h <= below || below >= above) ? r.bottom + G : r.top - G - h
    const maxH = vh - 2 * M
    top = Math.max(M, Math.min(top, vh - M - Math.min(h, maxH)))
    setPos({ left, top, maxH })
    setCompact(vw <= 720)
  }, [])

  React.useLayoutEffect(() => { if (open) place() }, [open, mode, preset, view, compact, place])
  React.useEffect(() => {
    if (!open) return
    const onDown = e => { if (trigRef.current && trigRef.current.contains(e.target)) return; if (popRef.current && popRef.current.contains(e.target)) return; close() }
    const onKey = e => { if (e.key === 'Escape') close() }
    const onMove = () => place()
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onMove); window.addEventListener('scroll', onMove, true)
    let ro = null
    if (typeof ResizeObserver !== 'undefined' && popRef.current) { ro = new ResizeObserver(() => place()); ro.observe(popRef.current) }
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onMove); window.removeEventListener('scroll', onMove, true); ro && ro.disconnect() }
  }, [open, place])

  const pickPreset = k => {
    setMode('custom')
    if (k === 'custom') { setPreset('custom'); return }
    const r = drPresetRange(k); setFrom(r.from); setTo(r.to); setPreset(k)
    const b = drParts(r.from); setView({ y:b.y, m:b.m })
  }
  const pickDay = iso => {
    setPreset('custom')
    if (!from || (from && to)) { setFrom(iso); setTo(null); return }
    if (iso < from) { setTo(from); setFrom(iso) } else setTo(iso)
    setHover(null)
  }
  const shift = n => setView(x => { const d = new Date(x.y, x.m + n, 1); return { y:d.getFullYear(), m:d.getMonth() } })

  const label = v.from ? drFmt(v.from) + ' - ' + drFmt(v.to || v.from) : (allLabel || 'Select date range')
  const trig = { width:'100%', height:44, boxSizing:'border-box', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, padding:'0 12px 0 14px', borderRadius:11, border:'1.5px solid ' + (open ? DR_ACC : '#D5DBE4'), boxShadow: open ? '0 0 0 3px rgba(0,112,224,.14)' : 'none', background:'#fff', fontFamily:DR_FONT, fontSize:13.6, fontWeight:500, color: v.from ? '#1B2433' : '#6B7689', cursor:'pointer', textAlign:'left', transition:'border-color .15s ease, box-shadow .15s ease' }
  const btnPrimary = { height:40, padding:'0 18px', borderRadius:10, border:'none', background:DR_ACC, color:'#fff', fontFamily:DR_FONT, fontSize:13.4, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }
  const btnGhost = { height:40, padding:'0 16px', borderRadius:10, border:'1.5px solid #D5DBE4', background:'#fff', color:'#1B2433', fontFamily:DR_FONT, fontSize:13.4, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }

  const rangeEnd = to || (from && hover ? hover : null)
  const lo = from && rangeEnd ? (from < rangeEnd ? from : rangeEnd) : from
  const hi = from && rangeEnd ? (from < rangeEnd ? rangeEnd : from) : from
  const todayISO = drToday()

  const month = (y, m, nav) => {
    const first = new Date(y, m, 1).getDay()
    const cells = Array.from({ length:42 }, (_, i) => { const d = new Date(y, m, 1 - first + i); return { iso:drISO(d.getFullYear(), d.getMonth(), d.getDate()), day:d.getDate(), inM:d.getMonth() === m } })
    const navBtn = (dir) => <button type="button" aria-label={dir < 0 ? 'Previous month' : 'Next month'} onClick={() => shift(dir)} style={{ width:30, height:30, borderRadius:8, border:'1px solid #E4E7EC', background:'#fff', color:'#1B2433', display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:16, lineHeight:1, padding:0 }}>{dir < 0 ? '‹' : '›'}</button>
    return (
      <div style={{ width:238, flex:'none' }}>
        <div style={{ height:34, display:'grid', gridTemplateColumns:'30px 1fr 30px', alignItems:'center', marginBottom:6 }}>
          <span>{nav === 'prev' && navBtn(-1)}</span>
          <span style={{ textAlign:'center', fontSize:13.6, fontWeight:600, color:'#1B2433' }}>{DR_MONTHS[m]} {y}</span>
          <span style={{ display:'flex', justifyContent:'flex-end' }}>{nav === 'next' && navBtn(1)}</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(7, 34px)' }}>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(w => <span key={w} style={{ height:28, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11.4, fontWeight:600, color:'#8A94A6' }}>{w}</span>)}
          {cells.map(c => {
            const isS = lo && c.iso === lo, isE = hi && c.iso === hi
            const edge = isS || isE
            const mid = lo && hi && c.iso > lo && c.iso < hi
            return (
              <button key={c.iso + (c.inM ? '' : 'o')} type="button" aria-label={drLong(c.iso)} aria-pressed={!!edge} onClick={() => pickDay(c.iso)} onMouseEnter={() => { if (from && !to) setHover(c.iso) }}
                style={{ width:34, height:34, padding:0, border:'none', fontFamily:DR_FONT, fontSize:12.8, cursor:'pointer', fontVariantNumeric:'tabular-nums',
                  borderRadius: edge ? 8 : 0,
                  background: edge ? DR_ACC : mid ? '#EAF3FF' : 'transparent',
                  color: edge ? '#fff' : !c.inM ? '#C6CCD6' : '#1B2433',
                  fontWeight: edge ? 700 : c.iso === todayISO ? 700 : 500,
                  boxShadow: !edge && c.iso === todayISO ? 'inset 0 0 0 1px #BCD3EE' : 'none' }}>{c.day}</button>
            )
          })}
        </div>
      </div>
    )
  }
  const next = new Date(view.y, view.m + 1, 1)
  const dateBox = (lab, val) => (
    <div style={{ display:'flex', flexDirection:'column', gap:5, minWidth:0 }}>
      <span style={{ fontSize:11.6, fontWeight:600, color:'#46566a' }}>{lab}</span>
      <div style={{ height:42, boxSizing:'border-box', display:'flex', alignItems:'center', gap:8, padding:'0 12px', borderRadius:10, border:'1.5px solid #E4E7EC', background:'#F9FAFC', fontSize:13.4, color: val ? '#1B2433' : '#A0A9B8', fontVariantNumeric:'tabular-nums' }}>
        <DrIcon d={DR_CAL} size={14} color="#8A94A6" />{val ? drFmtUS(val) : 'MM/DD/YYYY'}
      </div>
    </div>
  )
  const tab = (k, lab, icon) => {
    const on = mode === k
    return <button type="button" role="tab" aria-selected={on} onClick={() => setMode(k)} style={{ flex:1, height:38, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, border:'none', borderRadius:8, background: on ? '#fff' : 'transparent', color: on ? DR_ACC : '#46566a', boxShadow: on ? '0 1px 3px rgba(16,42,84,.16)' : 'none', fontFamily:DR_FONT, fontSize:13.2, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap', transition:'all .15s ease' }}><DrIcon d={icon} size={15} />{lab}</button>
  }
  const footer = (
    <div style={{ display:'flex', gap:8, ...(compact || mode === 'all' ? { justifyContent:'flex-end' } : { flexDirection:'column' }) }}>
      {(compact || mode === 'all') && <button type="button" onClick={close} style={btnGhost}>Cancel</button>}
      <button type="button" onClick={apply} disabled={mode !== 'all' && !from} style={{ ...btnPrimary, opacity: mode !== 'all' && !from ? .5 : 1, cursor: mode !== 'all' && !from ? 'not-allowed' : 'pointer' }}>Apply</button>
      {!(compact || mode === 'all') && <button type="button" onClick={close} style={btnGhost}>Cancel</button>}
    </div>
  )

  const pop = open ? createPortal(
    <div ref={popRef} data-daterange-pop="" role="dialog" aria-label={ariaLabel || 'Choose date range'}
      style={{ position:'fixed', zIndex:9000, left: pos ? pos.left : -9999, top: pos ? pos.top : 0, visibility: pos ? 'visible' : 'hidden', maxHeight: pos ? pos.maxH : undefined, maxWidth:'calc(100vw - 24px)', overflow:'auto', boxSizing:'border-box', background:'#fff', borderRadius:16, border:'1px solid #E4E7EC', boxShadow:'0 24px 60px -16px rgba(16,40,90,.4)', padding:16, fontFamily:DR_FONT, color:'#1B2433', display:'flex', flexDirection:'column', gap:14 }}>
      {allLabel && <div role="tablist" aria-label="Range mode" style={{ display:'flex', gap:4, padding:4, borderRadius:11, background:'#F1F4F8' }}>
        {tab('all', allLabel, DR_LIST)}
        {tab('custom', 'Custom Range', DR_CAL)}
      </div>}
      {mode === 'all' ? footer : (
        <div style={{ display:'flex', flexDirection: compact ? 'column' : 'row', gap:16 }}>
          <div style={{ width: compact ? 'auto' : 140, flex:'none', display:'flex', flexDirection:'column', gap:6 }}>
            <div style={{ display:'flex', flexDirection: compact ? 'row' : 'column', flexWrap: compact ? 'wrap' : 'nowrap', gap:6 }}>
              {keys.map(k => {
                const on = preset === k
                return <button key={k} type="button" aria-pressed={on} onClick={() => pickPreset(k)} style={{ height:40, padding:'0 12px', border:'none', borderRadius:9, background: on ? DR_ACC : '#F4F7FB', color: on ? '#fff' : '#46566a', fontFamily:DR_FONT, fontSize:13, fontWeight:600, textAlign: compact ? 'center' : 'left', cursor:'pointer', whiteSpace:'nowrap' }}>{k === 'custom' && allLabel ? 'Pick Dates' : DR_PRESETS[k]}</button>
              })}
            </div>
            {!compact && <div style={{ flex:1, minHeight:12 }} />}
            {!compact && footer}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:14, minWidth:0 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {dateBox('Start date', from)}
              {dateBox('End date', to || (from && preset !== 'custom' ? from : null))}
            </div>
            {preset === 'custom' ? (
              <div style={{ display:'flex', flexDirection: compact ? 'column' : 'row', gap:20, alignItems: compact ? 'center' : 'flex-start' }} onMouseLeave={() => setHover(null)}>
                {month(view.y, view.m, 'prev')}
                {month(next.getFullYear(), next.getMonth(), 'next')}
              </div>
            ) : (
              <div style={{ width: compact ? 'auto' : 496, boxSizing:'border-box', minHeight:250, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10, padding:24, borderRadius:12, border:'1.5px dashed #BCD3EE', background:'#F7FAFE', textAlign:'center' }}>
                <span style={{ width:48, height:48, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', background:'#EAF3FF', color:DR_ACC }}><DrIcon d={DR_CALCHECK} size={22} /></span>
                <span style={{ fontSize:15, fontWeight:600 }}>{DR_PRESETS[preset]} selected</span>
                <span style={{ fontSize:13, color:'#46566a', fontVariantNumeric:'tabular-nums' }}>{drLong(from)} – {drLong(to || from)}</span>
                <button type="button" onClick={() => setPreset('custom')} style={{ marginTop:4, height:36, padding:'0 14px', borderRadius:9, border:'1.5px solid #BCD3EE', background:'#fff', color:DR_ACC, fontFamily:DR_FONT, fontSize:12.8, fontWeight:600, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:7 }}><DrIcon d={DR_CAL} size={14} />Pick custom dates</button>
              </div>
            )}
          </div>
          {compact && footer}
        </div>
      )}
    </div>, document.body) : null

  return (
    <div style={{ position:'relative', width:'100%', fontFamily:DR_FONT }}>
      <button ref={trigRef} type="button" aria-haspopup="dialog" aria-expanded={open} aria-label={ariaLabel ? ariaLabel + ': ' + label : label} onClick={() => open ? close() : openPicker()} style={trig}>
        <span style={{ minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums' }}>{label}</span>
        <DrIcon d={DR_CAL} size={17} color={DR_ACC} />
      </button>
      {pop}
    </div>
  )
}

export function RecordRangeFilter(props) {
  return <DateRange allLabel="All Records" {...props} />
}
