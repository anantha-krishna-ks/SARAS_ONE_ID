import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { DateRange } from './components/DateRange'

export const S = {
  card: { background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, boxShadow:'0 4px 16px -8px rgba(16,42,84,.12)', overflow:'hidden' },
  cardHead: { padding:'14px 18px 14px 15px', borderBottom:'1px solid var(--border)', borderLeft:'3px solid var(--primary)', background:'var(--surface)' },
  h1: { fontSize:22, fontWeight:600, margin:'0 0 4px', color:'var(--ink)' },
  sub: { fontSize:12.9, color:'var(--muted)', margin:0 },
  th: { textAlign:'left', fontSize:12, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', color:'#0a4a8c', padding:'14px 16px', borderBottom:'1px solid var(--border-blue)' },
  primary: { height:46, padding:'0 16px', borderRadius:11, border:'none', background:'linear-gradient(180deg,#1a86f0,#0070E0)', color:'#fff', fontWeight:600, fontSize:13.8, display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer', boxShadow:'0 2px 6px -2px rgba(0,112,224,.3)' },
  ghost: { height:46, padding:'0 14px', borderRadius:10, border:'1px solid var(--border-blue)', background:'var(--surface)', color:'var(--ink)', fontWeight:600, fontSize:13.8, display:'inline-flex', alignItems:'center', gap:8, cursor:'pointer' },
  icon: { width:32, height:32, borderRadius:8, border:'1px solid var(--border)', background:'var(--surface)', color:'var(--muted)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' },
  input: { width:'100%', height:44, borderRadius:10, border:'1.5px solid #D5DBE4', padding:'0 14px', fontFamily:'inherit', fontSize:14.3, color:'var(--ink)', background:'var(--surface)' },
  label: { display:'block', fontSize:14.3, fontWeight:500, color:'var(--ink)', marginBottom:7 },
  toggleTrack: { width:44, height:26, borderRadius:999, background:'var(--primary)', position:'relative', flex:'none' },
  toggleKnob: { position:'absolute', top:3, right:3, width:20, height:20, borderRadius:'50%', background:'#fff' },
  overlay: { position:'fixed', inset:0, zIndex:1200, background:'rgba(20,30,50,.42)', backdropFilter:'blur(2px)', display:'flex', alignItems:'center', justifyContent:'center', padding:24, animation:'fadeUp .2s ease' },
  modal: { background:'var(--surface)', borderRadius:16, boxShadow:'0 12px 32px -12px rgba(16,42,84,.25)', width:'100%', maxHeight:'92vh', display:'flex', flexDirection:'column', overflow:'hidden', animation:'popIn .2s ease' },
  modalHead: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, padding:'22px 24px 16px', borderBottom:'1px solid var(--border)', flex:'none' },
  modalBody: { flex:1, minHeight:0, overflowY:'auto', overflowX:'hidden' },
  modalFoot: { display:'flex', justifyContent:'flex-end', gap:10, padding:'16px 24px', borderTop:'1px solid var(--border)', flexWrap:'wrap', flex:'none' },
  modalBtnGhost: { height:44, padding:'0 18px', borderRadius:11, border:'1px solid var(--border-blue)', background:'var(--surface)', color:'var(--ink)', fontWeight:600, fontSize:14.3, cursor:'pointer', whiteSpace:'nowrap' },
  modalBtnPrimary: { height:44, padding:'0 22px', borderRadius:11, border:'none', background:'linear-gradient(180deg,#1a86f0,#0070E0)', color:'#fff', fontWeight:600, fontSize:14.3, cursor:'pointer', boxShadow:'0 2px 6px -2px rgba(0,112,224,.3)', whiteSpace:'nowrap' },
}

/* ---------- primitives ---------- */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const DD_DEFAULTS = { plan:'Enterprise', tCountry:'India', uTenant:'Excelsoft Academy', uRole:'Content Author', rScope:'Tenant', uFilter:'All tenants', tStatus:'Active', tCfgCategory:'Branding', ouParent:'None (root)', ouType:'Department', uAccountType:'Internal', uUserType:'Human', uGender:'Female', uManager:'None', uStatus:'Active', uLocale:'en-US', uTimezone:'(GMT+05:30) India Standard Time' }

export const ssoBtn = { width:'100%', height:46, border:'1.5px solid #dadce0', borderRadius:12, background:'var(--surface)', color:'#3c4043', fontFamily:'inherit', fontWeight:600, fontSize:13.8, cursor:'pointer', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:11 }

/* ===================== screens ===================== */

export function Icon({ d, size = 16, sw = 2, style, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" style={style}>
      <path d={d} />
    </svg>
  )
}

export function SearchIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" />
    </svg>
  )
}

export function Badge({ b }) { return <span style={b.style}><Icon d={b.icon} size={13} sw={2.5} />{b.label}</span> }

export function TabBar({ tabs, value, onChange, ariaLabel }) {
  return (
    <div role="tablist" aria-label={ariaLabel} style={{ display:'flex', flexWrap:'wrap', gap:4, borderBottom:'1px solid var(--border)' }}>
      {tabs.map(t => {
        const active = t.key === value
        return (
          <button key={t.key} role="tab" aria-selected={active} data-ix="tab" onClick={() => onChange(t.key)}
            style={{ display:'inline-flex', alignItems:'center', gap:8, height:40, padding:'0 14px', marginBottom:-1, border:'none', borderBottom:'2px solid ' + (active ? 'var(--primary)' : 'transparent'),
              background:'transparent', cursor:'pointer', font:'inherit', fontSize:13.6, fontWeight: active ? 600 : 500, color: active ? 'var(--primary)' : 'var(--muted)' }}>
            {t.label}
            {t.count != null && <span style={{ fontSize:11.5, fontWeight:700, fontVariantNumeric:'tabular-nums', minWidth:20, height:20, padding:'0 6px', borderRadius:999, display:'inline-flex', alignItems:'center', justifyContent:'center', background: active ? 'var(--primary-tint)' : 'var(--surface-alt)', color: active ? 'var(--on-tint-blue)' : 'var(--muted)' }}>{t.count}</span>}
          </button>
        )
      })}
    </div>
  )
}

export function Stepper({ value, onChange, min = 0, max = 9999, step = 1, label, helperText }) {
  const [draft, setDraft] = useState(null)
  const clamp = (n) => Math.min(max, Math.max(min, n))
  const commit = () => { if (draft !== null) { const n = parseInt(draft, 10); onChange(isNaN(n) ? value : clamp(n)) } setDraft(null) }
  const btn = (dis, side) => ({ flex:'none', width:38, alignSelf:'stretch', border:'none', [side]:'1px solid var(--border)', background:'var(--surface-alt)', color: dis ? '#B9C2CF' : 'var(--primary)', fontSize:18, lineHeight:1, display:'flex', alignItems:'center', justifyContent:'center', padding:0 })
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6, minWidth:0 }}>
      {label && <label style={{ fontSize:13.6, fontWeight:500, color:'var(--ink)', lineHeight:1.3 }}>{label}</label>}
      <div data-stepper style={{ display:'flex', alignItems:'stretch', height:42, borderRadius:10, border:'1.5px solid #D5DBE4', overflow:'hidden', background:'var(--surface)' }}>
        <button type="button" data-ix="stp" aria-label={'Decrease ' + (label || 'value')} disabled={value <= min} onClick={() => { setDraft(null); onChange(clamp(value - step)) }} style={btn(value <= min, 'borderRight')}>−</button>
        <input aria-label={label} value={draft === null ? String(value) : draft} inputMode="numeric"
          onChange={(e) => setDraft(e.target.value.replace(/[^0-9]/g, ''))}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.currentTarget.blur() } else if (e.key === 'ArrowUp') { e.preventDefault(); setDraft(null); onChange(clamp(value + step)) } else if (e.key === 'ArrowDown') { e.preventDefault(); setDraft(null); onChange(clamp(value - step)) } }}
          style={{ flex:1, minWidth:0, border:'none', outline:'none', textAlign:'center', fontFamily:'inherit', fontVariantNumeric:'tabular-nums', fontSize:14.6, fontWeight:600, color:'var(--ink)', background:'transparent', padding:'0 4px' }} />
        <button type="button" data-ix="stp" aria-label={'Increase ' + (label || 'value')} disabled={value >= max} onClick={() => { setDraft(null); onChange(clamp(value + step)) }} style={btn(value >= max, 'borderLeft')}>+</button>
      </div>
      {helperText && <div style={{ fontSize:12, color:'var(--muted)', lineHeight:1.4, overflowWrap:'anywhere' }}>{helperText}</div>}
    </div>
  )
}

export function Field({ id, label, req, hint, children, full, error, ...rest }) {
  const invalid = !!error
  return (
    <div style={full ? { gridColumn:'1 / -1' } : undefined}>
      <label htmlFor={id} style={S.label}>{label} {req && <span style={{ color:'var(--danger)' }}>*</span>}</label>
      {children || <input id={id} aria-invalid={invalid} style={{ ...S.input, ...(invalid ? { border:'1.5px solid var(--danger)', boxShadow:'0 0 0 3px rgba(220,38,38,.12)' } : {}) }} {...rest} />}
      {invalid
        ? <p role="alert" style={{ display:'flex', alignItems:'center', gap:6, fontSize:12.9, color:'var(--danger)', margin:'6px 0 0' }}><Icon d="M12 8v4 M12 16h.01 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" size={14} />{error}</p>
        : hint && <p style={{ fontSize:12, color:'var(--muted)', margin:'6px 0 0' }}>{hint}</p>}
    </div>
  )
}

export function useForm(initial, validate) {
  const [values, setValues] = useState(initial)
  const [submitted, setSubmitted] = useState(false)
  const [shake, setShake] = useState(false)
  const errs = validate(values)
  const valid = Object.keys(errs).length === 0
  const set = (k) => (e) => { const val = e && e.target ? e.target.value : e; setValues(v => ({ ...v, [k]: val })) }
  const err = (k) => (submitted && errs[k]) || false
  const trySubmit = (onOk) => { if (valid) onOk(); else { setSubmitted(true); setShake(true) } }
  return { values, set, err, submitted, valid, shake, clearShake: () => setShake(false), trySubmit }
}

export function ErrBanner() {
  return (
    <div role="alert" style={{ gridColumn:'1 / -1', display:'flex', alignItems:'center', gap:9, padding:'11px 14px', background:'#FDECEC', border:'1px solid #F3C6C6', borderRadius:10, color:'#B42318', fontSize:13, fontWeight:500 }}>
      <Icon d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01" size={17} sw={2.2} />
      Please fix the highlighted fields before continuing.
    </div>
  )
}

export function Dropdown({ value, options, open, onToggle, onSelect, right, ariaLabel, prefix, leadIcon, menuPortal }) {
  const btnRef = React.useRef(null)
  const [pos, setPos] = React.useState(null)
  React.useLayoutEffect(() => {
    if (!(menuPortal && open && btnRef.current)) return
    const place = () => {
      const r = btnRef.current.getBoundingClientRect()
      const est = Math.min(260, (options ? options.length : 5) * 40 + 14)
      const spaceBelow = window.innerHeight - r.bottom - 8, spaceAbove = r.top - 8
      const up = spaceBelow < est && spaceAbove > spaceBelow
      const maxH = Math.max(120, Math.min(260, up ? spaceAbove : spaceBelow))
      const h = Math.min(est, maxH)
      let top = up ? r.top - 6 - h : r.bottom + 6
      top = Math.max(8, Math.min(top, window.innerHeight - 8 - h))
      const left = Math.max(8, Math.min(r.left, window.innerWidth - 8 - r.width))
      setPos({ left, width:r.width, top, maxH })
    }
    place(); window.addEventListener('scroll', place, true); window.addEventListener('resize', place)
    return () => { window.removeEventListener('scroll', place, true); window.removeEventListener('resize', place) }
  }, [menuPortal, open, options])
  const trigger = { width:'100%', height:44, borderRadius:10, padding:'0 12px 0 8px', display:'flex', alignItems:'center', justifyContent:'space-between', fontFamily:'inherit', fontSize:14.3, color:'var(--ink)', cursor:'pointer', background: open ? 'var(--primary-tint)' : 'var(--surface)', border:'1.5px solid ' + (open ? 'var(--primary)' : '#D5DBE4') }
  const baseMenu = { listStyle:'none', margin:0, padding:6, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, boxShadow:'0 12px 32px -12px rgba(16,42,84,.25)', maxHeight:260, overflow:'auto', animation:'popIn .14s ease' }
  const menu = menuPortal
    ? { ...baseMenu, position:'fixed', zIndex:5200, left: pos ? pos.left : -9999, width: pos ? pos.width : 'auto', top: pos ? pos.top : -9999, maxHeight: pos ? pos.maxH : 260 }
    : { ...baseMenu, position:'absolute', top:'calc(100% + 6px)', zIndex:3000, ...(right ? { right:0, minWidth:220 } : { left:0, right:0 }) }
  const list = (
    <ul role="listbox" aria-label={ariaLabel} style={menu}>
      {options.map(o => {
        const sel = o === value
        return (
          <li key={o} role="option" data-ix="opt" aria-selected={sel} onClick={() => onSelect(o)}
            style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, padding:'10px 12px', borderRadius:8, cursor:'pointer', fontSize:13.8, fontWeight: sel ? 600 : 500, color: sel ? 'var(--on-tint-blue)' : 'var(--ink)', background: sel ? 'var(--primary-tint)' : 'transparent' }}>
            {o}{sel && <Icon d="M20 6L9 17l-5-5" size={15} sw={2.5} />}
          </li>
        )
      })}
    </ul>
  )
  return (
    <div style={{ position:'relative' }}>
      <button ref={btnRef} type="button" data-ix="ix" onClick={onToggle} aria-haspopup="listbox" aria-expanded={open} aria-label={ariaLabel} style={trigger}>
        <span style={{ display:'flex', alignItems:'center', gap:8, minWidth:0, flex:'1 1 0', textAlign:'left', overflow:'hidden' }}>{leadIcon && <span aria-hidden style={{ flex:'none', width:27, height:27, borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(155deg, var(--primary-tint), var(--primary-tint-2))', border:'1px solid var(--border-blue)', color:'var(--on-tint-blue)' }}><Icon d={leadIcon} size={15} sw={2.1} style={{ stroke:'var(--on-tint-blue)' }} /></span>}{prefix && <span style={{ fontSize:12.6, fontWeight:600, color:'var(--muted)', whiteSpace:'nowrap' }}>{prefix}</span>}<span style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{value}</span></span>
        <Icon d="M6 9l6 6 6-6" style={{ transform: open ? 'rotate(180deg)' : 'none', transition:'transform .18s ease', flex:'none', stroke:'var(--muted)' }} />
      </button>
      {open && (menuPortal ? createPortal(list, document.body) : list)}
    </div>
  )
}

export function PageHead({ title, sub, children }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, flexWrap:'wrap', marginBottom:18 }}>
      <div><h1 style={S.h1}>{title}</h1><p style={S.sub}>{sub}</p></div>
      {children && <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>{children}</div>}
    </div>
  )
}

export function SearchBar({ value, onChange, placeholder, children, standalone, topRound }) {
  return (
    <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap', padding:'14px 16px', borderBottom: standalone ? 'none' : '1px solid var(--border)', borderRadius: standalone ? 13 : (topRound ? '13px 13px 0 0' : 0), background:'var(--surface-alt)' }}>
      <div style={{ position:'relative', flex:1, minWidth:220, maxWidth:340 }}>
        <span aria-hidden style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'flex' }}><SearchIcon /></span>
        <input aria-label="Search" type="text" value={value} onChange={onChange} placeholder={placeholder} style={{ ...S.input, height:44, fontSize:13.8, padding:'0 12px 0 36px' }} />
      </div>
      {children}
    </div>
  )
}

export function RowActions({ children }) { return <div style={{ display:'flex', gap:8, alignItems:'center', justifyContent:'flex-end' }}>{children}</div> }

export function IconBtn({ label, d, ix = 'ic', onClick, style }) {
  return <button data-ix={ix} aria-label={label} title={label} onClick={onClick} style={{ ...S.icon, ...style }}><Icon d={d} size={15} /></button>
}

export function StatusToggle({ status, name, toast }) {
  const COLORS = { Draft:{bg:'var(--surface-alt)',color:'var(--muted)',bd:'var(--border)',dot:'#9AA6B4'}, Provisioning:{bg:'var(--primary-tint)',color:'var(--on-tint-blue)',bd:'transparent',dot:'var(--on-tint-blue)'}, Active:{bg:'var(--green-tint)',color:'var(--success-text)',bd:'transparent',dot:'var(--success)'}, Inactive:{bg:'var(--surface-alt)',color:'var(--muted)',bd:'var(--border)',dot:'#9AA6B4'}, Suspended:{bg:'#FDECEC',color:'#B42318',bd:'transparent',dot:'#DC2626'}, Expired:{bg:'var(--amber-tint)',color:'var(--warning-text)',bd:'transparent',dot:'var(--warning)'}, Deleted:{bg:'#FDECEC',color:'#B42318',bd:'transparent',dot:'#DC2626'} }
  const c = COLORS[status] || COLORS.Inactive
  return (
    <span aria-label={`${name} status: ${status}`} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'4px 11px', borderRadius:999, background:c.bg, color:c.color, border:'1px solid '+c.bd, fontSize:12.6, fontWeight:600, whiteSpace:'nowrap' }}>
      <span aria-hidden style={{ width:9, height:9, borderRadius:'50%', flex:'none', background:c.dot }} />
      {status}
    </span>
  )
}

export function Th({ label, align, sortable, active, dir, onSort }) {
  const base = { fontSize:'11.5px', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', color:'#0a4a8c', padding:'12px 16px', borderBottom:'1px solid var(--border-blue)', whiteSpace:'nowrap', textAlign:align, background:'#EAF3FF' }
  if (!sortable) return <th scope="col" style={base}>{label}</th>
  return (
    <th scope="col" style={base} aria-sort={active ? (dir === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <button type="button" onClick={onSort} style={{ display:'inline-flex', alignItems:'center', gap:5, background:'none', border:'none', font:'inherit', fontSize:'11.5px', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', color: active ? 'var(--primary)' : '#0a4a8c', cursor:'pointer', padding:0 }}>
        {label}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ opacity: active ? 1 : .4 }}>
          {active ? <path d={dir === 'asc' ? 'M6 15l6-6 6 6' : 'M6 9l6 6 6-6'} /> : <path d="M8 9l4-4 4 4 M8 15l4 4 4-4" />}
        </svg>
      </button>
    </th>
  )
}

export function pageWindow(total, page, size) {
  const pageCount = Math.max(1, Math.ceil(total / size))
  const cur = Math.min(Math.max(1, page), pageCount)
  const from = total === 0 ? 0 : (cur - 1) * size + 1
  const to = Math.min(total, cur * size)
  let pages
  if (pageCount <= 7) pages = Array.from({ length: pageCount }, (_, i) => i + 1)
  else {
    const set = [...new Set([1, pageCount, cur, cur - 1, cur + 1])].filter(n => n >= 1 && n <= pageCount).sort((a, b) => a - b)
    pages = []; let prev = 0
    for (const n of set) { if (n - prev > 1) pages.push('\u2026'); pages.push(n); prev = n }
  }
  return { from, to, pages, cur, pageCount }
}

export function SizeSelect({ size, onSize }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position:'relative' }}>
      <button type="button" data-ix="pg" onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label="Rows per page"
        style={{ height:32, minWidth:64, padding:'0 10px', borderRadius:8, border:'1px solid ' + (open ? 'var(--primary)' : '#D5DBE4'), background: open ? 'var(--primary-tint)' : 'var(--surface)', color:'var(--ink)', display:'inline-flex', alignItems:'center', gap:8, fontFamily:'inherit', fontSize:13, fontWeight:600, cursor:'pointer' }}>
        {size}<Icon d="M6 9l6 6 6-6" size={13} style={{ transform: open ? 'rotate(180deg)' : 'none', transition:'transform .18s ease', stroke:'var(--muted)' }} />
      </button>
      {open && (
        <ul role="listbox" aria-label="Rows per page" style={{ position:'absolute', bottom:'calc(100% + 6px)', left:0, minWidth:80, listStyle:'none', margin:0, padding:6, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, boxShadow:'0 12px 32px -12px rgba(16,42,84,.25)', zIndex:20, animation:'popIn .14s ease' }}>
          {[10, 20, 30, 40].map(n => {
            const sel = n === size
            return (
              <li key={n} role="option" aria-selected={sel} data-ix="opt" onClick={() => { onSize(n); setOpen(false) }}
                style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, padding:'8px 10px', borderRadius:7, cursor:'pointer', fontSize:13, fontWeight: sel ? 600 : 500, color: sel ? 'var(--on-tint-blue)' : 'var(--ink)', background: sel ? 'var(--primary-tint)' : 'transparent' }}>
                {n}{sel && <Icon d="M20 6L9 17l-5-5" size={14} sw={2.5} />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export function Pager({ total, page, size, onPage, onSize }) {
  const w = pageWindow(total, page, size)
  const navBtn = (disabled) => ({ width:32, height:32, borderRadius:8, border:'none', background:'transparent', color: disabled ? '#B9C4D4' : 'var(--ink)', display:'flex', alignItems:'center', justifyContent:'center', cursor: disabled ? 'not-allowed' : 'pointer', transition:'background .15s ease' })
  const numBtn = (active) => ({ minWidth:32, height:32, padding:'0 9px', borderRadius:8, border:'none', background: active ? 'linear-gradient(155deg, var(--primary), var(--primary-strong, var(--primary)))' : 'transparent', color: active ? '#fff' : 'var(--muted)', fontFamily:'inherit', fontSize:13, fontWeight:600, fontVariantNumeric:'tabular-nums', cursor: active ? 'default' : 'pointer', boxShadow: active ? '0 3px 9px -3px rgba(10,74,140,.6)' : 'none', transition:'background .15s ease, color .15s ease' })
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, padding:'12px 20px', borderTop:'1px solid var(--border)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
        <span style={{ fontSize:12.5, color:'var(--muted)', fontVariantNumeric:'tabular-nums' }}>{total === 0 ? '0 of 0' : w.from + '\u2013' + w.to + ' of ' + total}</span>
        <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12.5, color:'var(--muted)' }}>Show<SizeSelect size={size} onSize={onSize} />per page</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:3, padding:4, borderRadius:12, background:'var(--surface-alt)', border:'1px solid var(--border)' }}>
        <button data-ix="pg" type="button" aria-label="Previous" disabled={w.cur <= 1} onClick={() => onPage(w.cur - 1)} style={navBtn(w.cur <= 1)}><Icon d="M15 18l-6-6 6-6" size={15} /></button>
        {w.pages.map((p, i) => p === '\u2026'
          ? <span key={'e' + i} aria-hidden style={{ minWidth:20, textAlign:'center', color:'var(--muted)' }}>…</span>
          : <button key={p} data-ix="pg" type="button" aria-label={'Page ' + p} aria-current={p === w.cur ? 'page' : undefined} onClick={() => onPage(p)} style={numBtn(p === w.cur)}>{p}</button>)}
        <button data-ix="pg" type="button" aria-label="Next" disabled={w.cur >= w.pageCount} onClick={() => onPage(w.cur + 1)} style={navBtn(w.cur >= w.pageCount)}><Icon d="M9 18l6-6-6-6" size={15} /></button>
      </div>
    </div>
  )
}

export function Empty({ title, hint }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:8, padding:'36px 24px 44px' }}>
      <dotlottie-player src="https://lottie.host/0d569b89-b736-4549-9fab-0848dbf0d213/KO6VQFz4HM.lottie" autoplay loop style={{ width:180, height:180 }}></dotlottie-player>
      <div><p style={{ fontSize:15.6, fontWeight:600, color:'var(--ink)', margin:'0 0 4px' }}>{title}</p><p style={{ fontSize:12.9, color:'var(--muted)', margin:0 }}>{hint}</p></div>
    </div>
  )
}

export function Loader({ size = 48, color = 'var(--primary)', track = true }) {
  const d = 'M29.760000000000005 18.72 c0 7.28 -3.9200000000000004 13.600000000000001 -9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.840000000000002 2.64 c -3.6 0 -6.88 -0.96 -9.76 -2.64 c0 -7.28 3.9200000000000004 -13.52 9.840000000000002 -16.96 c2.8800000000000003 -1.6800000000000002 6.24 -2.64 9.76 -2.64 S26.880000000000003 17.040000000000003 29.760000000000005 18.72 c5.84 3.3600000000000003 9.76 9.68 9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.76 2.64 c -3.6 0 -6.88 -0.96 -9.840000000000002 -2.64 c -5.84 -3.3600000000000003 -9.76 -9.68 -9.76 -16.96 c0 -7.28 3.9200000000000004 -13.600000000000001 9.76 -16.96 C25.84 5.120000000000001 29.760000000000005 11.440000000000001 29.760000000000005 18.72z'
  return (
    <span className="saras-loader" role="status" aria-label="Loading" style={{ display:'inline-flex', lineHeight:0 }}>
      <svg viewBox="0 0 40 40" width={size} height={size} preserveAspectRatio="xMidYMid meet" style={{ overflow:'visible' }}>
        {track && <path className="track" fill="none" stroke={color} strokeWidth={4} pathLength={100} style={{ opacity:.15 }} d={d} />}
        <path className="car" fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" pathLength={100} d={d} />
      </svg>
    </span>
  )
}

export function AppBootLoader({ label = 'Preparing your console\u2026' }) {
  return (
    <div role="status" aria-live="polite" style={{ position:'fixed', inset:0, zIndex:9999, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:26, background:'radial-gradient(120% 120% at 50% 0%, #0d5aa8 0%, #0a4a8c 55%, #08325f 100%)', animation:'fadeUp .3s ease' }}>
      <div style={{ display:'inline-flex', alignItems:'baseline', gap:8, letterSpacing:'.16em' }}>
        <span style={{ fontSize:25, fontWeight:700, color:'#fff' }}>SARAS</span>
        <span style={{ fontSize:25, fontWeight:700, color:'#F5B301' }}>ONE</span>
      </div>
      <Loader size={66} color="#EAF3FF" />
      <span style={{ fontSize:13, color:'rgba(255,255,255,.78)', letterSpacing:'.03em' }}>{label}</span>
    </div>
  )
}

export function ExcelIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id="xlsxg" x1="3" y1="11" x2="15" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#21A366" /><stop offset="1" stopColor="#0F7A3D" /></linearGradient></defs><path d="M7 2.5h6.5L18.5 7.5V20A1.5 1.5 0 0 1 17 21.5H7A1.5 1.5 0 0 1 5.5 20V4A1.5 1.5 0 0 1 7 2.5z" fill="#fff" stroke="#CDD5DF" strokeWidth="1" /><path d="M13.5 2.5V7.5H18.5z" fill="#E6ECF3" stroke="#CDD5DF" strokeWidth="1" strokeLinejoin="round" /><path d="M9 11h8.5 M9 14.25h8.5 M9 17.5h8.5 M12 11v6.5 M15 11v6.5" stroke="#CDD5DF" strokeWidth="0.85" /><rect x="2.5" y="11" width="11.5" height="9.5" rx="2" fill="url(#xlsxg)" /><path d="M5.4 13.4l5.7 4.7 M11.1 13.4l-5.7 4.7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function CloseBtn({ onClose }) {
  return <button data-ix="close" onClick={onClose} aria-label="Close" style={{ ...S.icon, border:'none', width:34, height:34, borderRadius:9 }}><span className="cx" style={{ display:'inline-flex', transition:'transform .2s cubic-bezier(.22,1,.36,1)' }}><Icon d="M18 6L6 18 M6 6l12 12" size={18} /></span></button>
}

export function Modal({ title, desc, onClose, stop, width = 540, children, footer, shake, onShakeEnd }) {
  const titleId = 'modal-title-' + React.useId()
  const [entered, setEntered] = useState(false)
  const anim = shake ? 'shakeX .3s ease' : (entered ? 'none' : 'popIn .2s ease')
  const onEnd = () => { if (shake) onShakeEnd && onShakeEnd(); else setEntered(true) }
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={titleId + '-desc'} style={S.overlay}>
      <div onClick={stop} onAnimationEnd={onEnd} style={{ ...S.modal, maxWidth:width, animation:anim }}>
        <div style={S.modalHead}>
          <div>
            <h3 id={titleId} style={{ fontSize:19, fontWeight:500, margin:0, color:'var(--ink)', lineHeight:1.25 }}>{title}</h3>
            <p id={titleId + '-desc'} style={{ fontSize:14, color:'var(--muted)', margin:'5px 0 0', lineHeight:1.4 }}>{desc}</p>
          </div>
          <CloseBtn onClose={onClose} />
        </div>
        <div style={S.modalBody}>{children}</div>
        <div style={S.modalFoot}>{footer}</div>
      </div>
    </div>
  )
}

export function ModalFooter({ onClose, onSave, save, danger }) {
  return <><button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Cancel</button><button data-ix="primary" onClick={onSave} style={danger ? { ...S.modalBtnPrimary, background:'var(--danger)', boxShadow:'0 2px 6px -2px rgba(220,38,38,.35)' } : S.modalBtnPrimary}>{save}</button></>
}

export function Toggle({ title, hint }) {
  return (
    <div style={{ gridColumn:'1 / -1', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', border:'1px solid var(--border)', borderRadius:10, background:'var(--surface-alt)' }}>
      <span style={{ display:'flex', flexDirection:'column', gap:2 }}><span style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>{title}</span><span style={{ fontSize:12, color:'var(--muted)' }}>{hint}</span></span>
      <span aria-hidden style={S.toggleTrack}><span style={S.toggleKnob} /></span>
    </div>
  )
}

export function ToggleField({ title, hint, checked, onChange }) {
  return (
    <div style={{ gridColumn:'1 / -1', display:'flex', alignItems:'center', justifyContent:'space-between', gap:14, padding:'12px 14px', border:'1px solid var(--border)', borderRadius:10, background:'var(--surface)' }}>
      <span style={{ display:'flex', flexDirection:'column', gap:2 }}><span style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>{title}</span><span style={{ fontSize:12, color:'var(--muted)' }}>{hint}</span></span>
      <button type="button" role="switch" aria-checked={checked} aria-label={title} onClick={() => onChange(!checked)}
        style={{ flex:'none', width:44, height:26, borderRadius:999, border:'none', padding:3, background: checked ? 'var(--primary)' : '#C4CDD9', cursor:'pointer', display:'inline-flex', alignItems:'center', transition:'background .2s ease' }}>
        <span aria-hidden style={{ width:20, height:20, borderRadius:'50%', background:'#fff', boxShadow:'0 1px 3px rgba(16,42,84,.3)', transform: checked ? 'translateX(18px)' : 'translateX(0)', transition:'transform .2s cubic-bezier(.22,1,.36,1)' }} />
      </button>
    </div>
  )
}

export function Section({ title, hint, icon, children, cols = 3 }) {
  return (
    <section style={{ border:'1px solid var(--border)', borderRadius:12, background:'var(--surface)', boxShadow:'0 1px 2px rgba(16,42,84,.03)' }}>
      <header style={{ display:'flex', alignItems:'center', gap:11, padding:'11px 16px', background:'var(--surface-alt)', borderBottom:'1px solid var(--border)', borderRadius:'12px 12px 0 0' }}>
        <span aria-hidden style={{ flex:'none', width:30, height:30, borderRadius:8, background:'var(--primary-tint)', color:'var(--primary)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon d={icon} size={16} sw={2.1} /></span>
        <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
          <h4 style={{ fontSize:13.3, fontWeight:600, color:'var(--ink)', margin:0, lineHeight:1.2 }}>{title}</h4>
          {hint && <span style={{ fontSize:11.8, color:'var(--muted)' }}>{hint}</span>}
        </div>
      </header>
      <div style={{ padding:16, display:'grid', gridTemplateColumns:'repeat(' + cols + ',1fr)', gap:16, background:'var(--primary-tint-2)', borderRadius:'0 0 12px 12px' }}>{children}</div>
    </section>
  )
}

export function Toasts({ toasts, onDismiss }) {
  const map = {
    success: { icon:'M20 6L9 17l-5-5', color:'var(--success)', tint:'var(--green-tint)', title:'Success' },
    info: { icon:'M12 16v-4 M12 8h.01 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z', color:'var(--primary)', tint:'var(--primary-tint)', title:'Info' },
    danger: { icon:'M12 8v4 M12 16h.01 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z', color:'var(--danger)', tint:'#FDECEC', title:'Error' },
    warning: { icon:'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01', color:'var(--warning)', tint:'var(--amber-tint)', title:'Warning' },
  }
  return (
    <div aria-live="polite" style={{ position:'fixed', right:20, top:80, zIndex:5000, display:'flex', flexDirection:'column', gap:10, pointerEvents:'none' }}>
      {toasts.map(t => {
        const c = map[t.kind] || map.info
        return (
          <div key={t.id} role="status" style={{ position:'relative', display:'flex', alignItems:'flex-start', gap:12, width:344, padding:'13px 14px 13px 15px', background:'var(--surface)', border:'1px solid var(--border-blue)', borderLeft:'4px solid '+c.color, borderRadius:12, boxShadow:'0 12px 32px -12px rgba(16,42,84,.28)', animation:'toastIn .24s cubic-bezier(.22,1,.36,1)', pointerEvents:'auto', overflow:'hidden' }}>
            <span aria-hidden style={{ flex:'none', display:'inline-flex', alignItems:'center', justifyContent:'center', width:30, height:30, borderRadius:8, background:c.tint, color:c.color }}><Icon d={c.icon} size={17} sw={2.3} /></span>
            <div style={{ flex:1, minWidth:0, paddingTop:1 }}>
              <div style={{ fontSize:12.6, fontWeight:600, color:'var(--ink)', lineHeight:1.3 }}>{c.title}</div>
              <div style={{ fontSize:12.9, fontWeight:400, color:'var(--muted)', lineHeight:1.45, marginTop:2 }}>{t.msg}</div>
            </div>
            <button type="button" onClick={() => onDismiss(t.id)} aria-label="Dismiss notification" data-ix="tclose"
              style={{ flex:'none', width:24, height:24, marginTop:-1, marginRight:-2, borderRadius:7, border:'none', background:'transparent', color:'var(--muted)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <Icon d="M18 6L6 18 M6 6l12 12" size={14} sw={2.2} />
            </button>
            <span aria-hidden style={{ position:'absolute', left:0, bottom:0, height:2.5, background:c.color, opacity:.5, animation:'toastBar 4.5s linear forwards', width:'100%', transformOrigin:'left' }} />
          </div>
        )
      })}
    </div>
  )
}

/* ===================== modals ===================== */

export function TenantMenu({ tenant, go, toast, confirm, openConfig, openAuthProviders, openHealth, openStatus, openLicense, openCreateLicense }) {
  const [open, setOpen] = React.useState(false)
  const [pos, setPos] = React.useState(null)
  const btnRef = React.useRef(null)
  const menuRef = React.useRef(null)
  React.useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (btnRef.current && !btnRef.current.contains(e.target) && !(menuRef.current && menuRef.current.contains(e.target))) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onEsc)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc) }
  }, [open])
  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      const W = 246, H = 364
      let left = Math.max(12, Math.min(r.right - W, window.innerWidth - W - 12))
      let top = r.bottom + 6
      if (top + H > window.innerHeight - 12) top = Math.max(12, r.top - H - 6)
      setPos({ top, left })
    }
    setOpen(o => !o)
  }
  const items = [
    { label:'Configure', icon:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z', on:() => openConfig(tenant) },
    { label:'Business Configuration', icon:'M3 21h18 M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16 M9 7h4 M9 11h4 M9 15h4 M14 12h5a2 2 0 0 1 2 2v7', on:() => openConfig(tenant, 'business') },
    { label:'Authentication providers', icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4', on:() => openAuthProviders(tenant) },
    { label:'Manage status', icon:'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M8.5 12.5l2.5 2.5 4.5-5', on:() => openStatus(tenant) },
    { label:'Password policy', icon:'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0 M12 15v2', on:() => go('passwordPolicy') },
    tenant.hasOrg
      ? { label:'Organization structure', icon:'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z', on:() => go('org') }
      : { label:'Create organization structure', icon:'M9 3H5v4h4z M19 3h-4v4h4z M12 11V7 M6 11v4h12v-4 M4 15h4v4H4z M16 15h4v4h-4z', on:() => go('org') },
    { label:'Run health check', icon:'M22 12h-4l-3 9L9 3l-3 9H2', on:() => openHealth(tenant) },
    { label:'License info', icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h6', on:() => openLicense(tenant) },
    { label:'Create license', icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M12 12v6 M9 15h6', on:() => openCreateLicense(tenant) },
  ]
  const run = (fn) => { setOpen(false); fn() }
  const menu = open && pos ? createPortal(
    <ul ref={menuRef} role="menu" aria-label={'Actions for ' + tenant.name} style={{ position:'fixed', top:pos.top, left:pos.left, zIndex:4000, width:246, listStyle:'none', margin:0, padding:6, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, boxShadow:'0 16px 40px -16px rgba(16,42,84,.32)', animation:'popIn .14s ease' }}>
      {items.map(it => (
        <li key={it.label} role="menuitem" tabIndex={0} data-ix="opt" onClick={() => run(it.on)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run(it.on) } }}
          style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 11px', borderRadius:8, cursor:'pointer', fontSize:13.3, fontWeight:500, color:'var(--ink)' }}>
          <Icon d={it.icon} size={16} style={{ stroke:'var(--muted)', flex:'none' }} />{it.label}
        </li>
      ))}
    </ul>, document.body) : null
  return (<React.Fragment><button ref={btnRef} data-ix="ic" title="More actions" aria-label={'More actions for ' + tenant.name} aria-haspopup="menu" aria-expanded={open} onClick={toggle} style={{ ...S.icon }}><Icon d="M5 12h.01 M12 12h.01 M19 12h.01" size={18} /></button>{menu}</React.Fragment>)
}

export function MiniSwitch({ on, onToggle, label }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onToggle}
      style={{ width:44, height:26, borderRadius:999, border:'none', padding:3, background: on ? 'var(--primary)' : '#C4CDD9', cursor:'pointer', display:'inline-flex', alignItems:'center', transition:'background .2s ease', flex:'none' }}>
      <span aria-hidden style={{ width:20, height:20, borderRadius:'50%', background:'#fff', boxShadow:'0 1px 3px rgba(16,42,84,.3)', transform: on ? 'translateX(18px)' : 'translateX(0)', transition:'transform .2s cubic-bezier(.22,1,.36,1)' }} />
    </button>
  )
}

export function Radio({ checked, color, soft, size }) {
  const c = color || 'var(--primary)', sf = soft || 'rgba(10,74,140,.14)', sz = size || 22
  return (
    <span aria-hidden style={{ flex:'none', width:sz, height:sz, borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', background:'var(--surface)', border:'2px solid ' + (checked ? c : 'var(--muted)'), boxShadow: checked ? '0 0 0 4px ' + sf : 'none', transition:'border-color .18s ease, box-shadow .18s ease' }}>{checked && <span style={{ width:Math.round(sz*0.45), height:Math.round(sz*0.45), borderRadius:'50%', background:c }} />}</span>
  )
}
export function Checkbox({ checked, defaultChecked, onChange, indeterminate, size, disabled }) {
  const [inner, setInner] = React.useState(!!defaultChecked)
  const [hover, setHover] = React.useState(false)
  const [focus, setFocus] = React.useState(false)
  const sz = size || 19
  const controlled = checked !== undefined
  const on = controlled ? checked : inner
  const ind = !!indeterminate
  const filled = on || ind
  const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const handle = (e) => { if (!controlled) setInner(e.target.checked); if (onChange) onChange(e) }
  const pad = Math.max(0, (44 - sz) / 2)
  const tick = Math.round(sz * 0.62)
  return (
    <span onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ position:'relative', display:'inline-flex', flex:'none', width:sz, height:sz, opacity: disabled ? .5 : 1 }}>
      <input type="checkbox" checked={on} disabled={disabled} onChange={handle} aria-checked={ind ? 'mixed' : on}
        onFocus={(e) => { let fv = true; try { fv = e.target.matches(':focus-visible') } catch (x) {} setFocus(fv) }} onBlur={() => setFocus(false)}
        ref={el => { if (el) el.indeterminate = ind }}
        style={{ position:'absolute', top:-pad, left:-pad, width:sz + pad * 2, height:sz + pad * 2, opacity:0, margin:0, cursor: disabled ? 'not-allowed' : 'pointer', zIndex:1 }} />
      <span aria-hidden style={{ boxSizing:'border-box', width:sz, height:sz, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flex:'none',
        background: filled ? 'linear-gradient(180deg, #1A86F0, #0070E0)' : '#FFFFFF',
        border:'1.5px solid ' + (filled ? '#0A5BBF' : (hover && !disabled ? '#0070E0' : '#8A93A2')),
        boxShadow: filled ? '0 2px 7px rgba(0,112,224,.28)' : 'none',
        outline: focus ? '3px solid #0070E0' : 'none', outlineOffset:2,
        transition: reduce ? 'none' : 'background .18s ease, border-color .18s ease, box-shadow .18s ease' }}>
        {ind
          ? <span style={{ width:Math.round(sz * 0.5), height:2.5, borderRadius:2, background:'#fff' }} />
          : (on && <svg width={tick} height={tick} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" style={reduce ? undefined : { strokeDasharray:24, strokeDashoffset:0, animation:'cbTick .15s ease-out' }} /></svg>)}
      </span>
    </span>
  )
}

export function SegTabs({ tabs, value, onChange, ariaLabel }) {
  const n = tabs.length
  const idx = Math.max(0, tabs.findIndex(t => t.k === value))
  const seg = 'calc((100% - 10px) / ' + n + ')'
  return (
    <div role="tablist" aria-label={ariaLabel} style={{ position: 'relative', display: 'flex', alignItems: 'center', width: n * 150, padding: 5, background: '#EAEEF3', border: '1px solid var(--border)', borderRadius: 12 }}>
      <div aria-hidden style={{ position: 'absolute', top: 5, bottom: 5, left: 'calc(5px + ' + idx + ' * ' + seg + ')', width: seg, borderRadius: 9, background: 'var(--surface)', boxShadow: '0 3px 8px -2px rgba(16,42,84,.18), 0 1px 2px rgba(16,42,84,.08)', transition: 'left .3s cubic-bezier(.25,.1,.25,1), width .3s cubic-bezier(.25,.1,.25,1)' }} />
      {tabs.map(o => { const on = value === o.k; return (
        <button key={o.k} type="button" role="tab" aria-selected={on} onClick={() => onChange(o.k)} style={{ position: 'relative', zIndex: 1, flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 20px', borderRadius: 9, border: 'none', cursor: 'pointer', background: 'transparent', font: 'inherit', fontSize: 13.5, fontWeight: on ? 700 : 600, color: on ? 'var(--ink)' : 'var(--muted)', whiteSpace: 'nowrap', transition: 'color .3s ease' }}>{o.d && <Icon d={o.d} size={15} sw={2} aria-hidden="true" focusable="false" />}{o.t}</button>
      )})}
    </div>
  )
}

export function EventMenu({ event, onView, onToggle, toast }) {
  const [open, setOpen] = React.useState(false)
  const [pos, setPos] = React.useState(null)
  const btnRef = React.useRef(null)
  const menuRef = React.useRef(null)
  React.useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (btnRef.current && !btnRef.current.contains(e.target) && !(menuRef.current && menuRef.current.contains(e.target))) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onEsc)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc) }
  }, [open])
  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      const W = 220, H = 108
      let left = Math.max(12, Math.min(r.right - W, window.innerWidth - W - 12))
      let top = r.bottom + 6
      if (top + H > window.innerHeight - 12) top = Math.max(12, r.top - H - 6)
      setPos({ top, left })
    }
    setOpen(o => !o)
  }
  const items = [
    { label:'View details', icon:'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', on:() => onView(event) },
    { label: event.active ? 'Deactivate' : 'Activate', icon:'M18.36 6.64a9 9 0 1 1-12.73 0 M12 2v10', on:() => { onToggle(event); toast(event.active ? 'Event deactivated.' : 'Event activated.', 'success') } },
  ]
  const run = (fn) => { setOpen(false); fn() }
  const menu = open && pos ? createPortal(
    <ul ref={menuRef} role="menu" aria-label={'Actions for ' + event.name} style={{ position:'fixed', top:pos.top, left:pos.left, zIndex:4000, width:220, listStyle:'none', margin:0, padding:6, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, boxShadow:'0 16px 40px -16px rgba(16,42,84,.32)', animation:'popIn .14s ease' }}>
      {items.map(it => (
        <li key={it.label} role="menuitem" tabIndex={0} data-ix="opt" onClick={() => run(it.on)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run(it.on) } }}
          style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 11px', borderRadius:8, cursor:'pointer', fontSize:13.3, fontWeight:500, color:'var(--ink)' }}>
          <Icon d={it.icon} size={16} style={{ stroke:'var(--muted)', flex:'none' }} />{it.label}
        </li>
      ))}
    </ul>, document.body) : null
  return (<React.Fragment><button ref={btnRef} data-ix="ic" title="More actions" aria-label={'More actions for ' + event.name} aria-haspopup="menu" aria-expanded={open} onClick={toggle} style={{ ...S.icon }}><Icon d="M5 12h.01 M12 12h.01 M19 12h.01" size={18} /></button>{menu}</React.Fragment>)
}

export function NotifMenu({ notif, onView, onResend, onCancel, toast }) {
  const [open, setOpen] = React.useState(false)
  const [pos, setPos] = React.useState(null)
  const btnRef = React.useRef(null)
  const menuRef = React.useRef(null)
  React.useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (btnRef.current && !btnRef.current.contains(e.target) && !(menuRef.current && menuRef.current.contains(e.target))) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onEsc)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc) }
  }, [open])
  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      const W = 220, H = 152
      let left = Math.max(12, Math.min(r.right - W, window.innerWidth - W - 12))
      let top = r.bottom + 6
      if (top + H > window.innerHeight - 12) top = Math.max(12, r.top - H - 6)
      setPos({ top, left })
    }
    setOpen(o => !o)
  }
  const done = notif.status === 'Delivered' || notif.status === 'Cancelled'
  const items = [
    { label:'View details', icon:'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', on:() => onView(notif) },
    { label:'Resend', icon:'M23 4v6h-6 M20.49 15a9 9 0 1 1-2.12-9.36L23 10', on:() => { onResend(notif); toast('Notification re-queued.', 'success') } },
    { label:'Cancel', icon:'M18 6L6 18 M6 6l12 12', danger:true, disabled: done, on:() => { onCancel(notif); toast('Notification cancelled.', 'danger') } },
  ]
  const run = (fn) => { setOpen(false); fn() }
  const menu = open && pos ? createPortal(
    <ul ref={menuRef} role="menu" aria-label={'Actions for notification to ' + notif.recipient} style={{ position:'fixed', top:pos.top, left:pos.left, zIndex:4000, width:220, listStyle:'none', margin:0, padding:6, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, boxShadow:'0 16px 40px -16px rgba(16,42,84,.32)', animation:'popIn .14s ease' }}>
      {items.map(it => (
        <li key={it.label} role="menuitem" tabIndex={it.disabled ? -1 : 0} aria-disabled={it.disabled || undefined} data-ix={it.disabled ? undefined : 'opt'} onClick={() => { if (!it.disabled) run(it.on) }} onKeyDown={(e) => { if (!it.disabled && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); run(it.on) } }}
          style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 11px', borderRadius:8, cursor: it.disabled ? 'not-allowed' : 'pointer', opacity: it.disabled ? .45 : 1, fontSize:13.3, fontWeight:500, color: it.danger ? '#B42318' : 'var(--ink)' }}>
          <Icon d={it.icon} size={16} style={{ stroke: it.danger ? '#B42318' : 'var(--muted)', flex:'none' }} />{it.label}
        </li>
      ))}
    </ul>, document.body) : null
  return (<React.Fragment><button ref={btnRef} data-ix="ic" title="More actions" aria-label={'More actions for notification to ' + notif.recipient} aria-haspopup="menu" aria-expanded={open} onClick={toggle} style={{ ...S.icon }}><Icon d="M5 12h.01 M12 12h.01 M19 12h.01" size={18} /></button>{menu}</React.Fragment>)
}

export function RecipientPicker({ value, onChange, directory, ariaLabel }) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [active, setActive] = React.useState(0)
  const [pos, setPos] = React.useState(null)
  const wrapRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const all = directory || []
  const selected = all.find(d => d.email === value)
  const q = query.trim().toLowerCase()
  const filtered = q ? all.filter(d => (d.name + ' ' + d.email + ' ' + (d.role || '') + ' ' + (d.tenant || '')).toLowerCase().includes(q)) : all
  const CAP = 50
  const shown = filtered.slice(0, CAP)
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query.trim())
  const custom = isEmail && !all.some(d => d.email.toLowerCase() === query.trim().toLowerCase())
  const rows = custom ? [{ custom:true, email:query.trim() }, ...shown] : shown
  React.useLayoutEffect(() => {
    if (!(open && wrapRef.current)) return
    const place = () => {
      const r = wrapRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - r.bottom - 8, spaceAbove = r.top - 8
      const up = spaceBelow < 360 && spaceAbove > spaceBelow
      const maxH = Math.max(200, Math.min(384, up ? spaceAbove : spaceBelow))
      let top = up ? r.top - 6 - maxH : r.bottom + 6
      top = Math.max(8, Math.min(top, window.innerHeight - 8 - maxH))
      const left = Math.max(8, Math.min(r.left, window.innerWidth - 8 - r.width))
      setPos({ left, width:r.width, top, maxH })
    }
    place(); window.addEventListener('scroll', place, true); window.addEventListener('resize', place)
    return () => { window.removeEventListener('scroll', place, true); window.removeEventListener('resize', place) }
  }, [open])
  React.useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target) && !(e.target.closest && e.target.closest('[data-recip-panel]'))) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onEsc)
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 20)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc); clearTimeout(t) }
  }, [open])
  React.useEffect(() => { setActive(0) }, [query, open])
  const initials = (name) => name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  const avatar = (init, size) => <span aria-hidden style={{ flex:'none', width:size, height:size, borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(155deg, var(--primary-tint), var(--primary-tint-2))', border:'1px solid var(--border-blue)', color:'var(--on-tint-blue)', fontSize: size * 0.4, fontWeight:700 }}>{init}</span>
  const pick = (r) => { onChange(r.email); setOpen(false); setQuery('') }
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, rows.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); if (rows[active]) pick(rows[active]) }
  }
  const triggerBox = { width:'100%', minHeight:44, borderRadius:10, border:'1.5px solid ' + (open ? 'var(--primary)' : '#D5DBE4'), background: open ? 'var(--primary-tint)' : 'var(--surface)', padding:'6px 8px 6px 10px', display:'flex', alignItems:'center', gap:10, cursor:'pointer' }
  const panel = pos ? createPortal(
    <div data-recip-panel style={{ position:'fixed', left:pos.left, width:pos.width, top:pos.top, maxHeight:pos.maxH, display:'flex', flexDirection:'column', zIndex:5200, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, boxShadow:'0 16px 40px -16px rgba(16,42,84,.3)', overflow:'hidden', animation:'popIn .14s ease' }}>
      <div style={{ flex:'none', padding:10, borderBottom:'1px solid var(--border)', background:'var(--surface-alt)' }}>
        <div style={{ position:'relative' }}>
          <span aria-hidden style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'flex' }}><SearchIcon /></span>
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={onKey} placeholder="Search by name or email…" aria-label="Search recipients" style={{ ...S.input, height:40, fontSize:13.6, padding:'0 12px 0 34px' }} />
        </div>
      </div>
      <ul role="listbox" aria-label={ariaLabel} style={{ listStyle:'none', margin:0, padding:6, flex:1, minHeight:0, overflow:'auto' }}>
        {rows.length === 0 && <li style={{ padding:'18px 12px', textAlign:'center', fontSize:13, color:'var(--muted)' }}>No accounts found</li>}
        {rows.map((r, i) => {
          const on = i === active
          if (r.custom) return (
            <li key="__custom" role="option" aria-selected={on} data-ix="opt" onMouseEnter={() => setActive(i)} onClick={() => pick(r)} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 10px', borderRadius:8, cursor:'pointer', background: on ? 'var(--primary-tint)' : 'transparent' }}>
              <span aria-hidden style={{ flex:'none', width:30, height:30, borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', background:'var(--primary-tint)', color:'var(--on-tint-blue)' }}><Icon d="M12 5v14 M5 12h14" size={15} /></span>
              <span style={{ fontSize:13.4, color:'var(--ink)' }}>Use <strong>{r.email}</strong></span>
            </li>
          )
          return (
            <li key={r.email} role="option" aria-selected={on} data-ix="opt" onMouseEnter={() => setActive(i)} onClick={() => pick(r)} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, cursor:'pointer', background: on ? 'var(--primary-tint)' : 'transparent' }}>
              {avatar(initials(r.name), 30)}
              <span style={{ minWidth:0, flex:1, display:'flex', flexDirection:'column' }}>
                <span style={{ fontSize:13.4, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.name}</span>
                <span style={{ fontSize:12, color:'var(--muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.email}{r.role ? ' · ' + r.role : ''}</span>
              </span>
              {r.email === value && <Icon d="M20 6L9 17l-5-5" size={15} sw={2.5} style={{ stroke:'var(--on-tint-blue)', flex:'none' }} />}
            </li>
          )
        })}
      </ul>
      <div style={{ flex:'none', padding:'8px 12px', borderTop:'1px solid var(--border)', fontSize:11.6, color:'var(--muted)', display:'flex', justifyContent:'space-between', gap:12 }}>
        <span>{filtered.length > CAP ? 'Showing ' + CAP + ' of ' + filtered.length : filtered.length + ' account' + (filtered.length === 1 ? '' : 's')}</span>
        {filtered.length > CAP && <span>Refine your search</span>}
      </div>
    </div>, document.body) : null
  return (
    <div ref={wrapRef} style={{ position:'relative' }}>
      <div role="button" tabIndex={0} aria-haspopup="listbox" aria-expanded={open} aria-label={ariaLabel} onClick={() => setOpen(o => !o)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true) } }} style={triggerBox}>
        {selected ? (
          <React.Fragment>
            {avatar(initials(selected.name), 30)}
            <span style={{ minWidth:0, flex:1, display:'flex', flexDirection:'column' }}>
              <span style={{ fontSize:13.6, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{selected.name}</span>
              <span style={{ fontSize:12, color:'var(--muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{selected.email}</span>
            </span>
          </React.Fragment>
        ) : value ? (
          <React.Fragment>
            <span aria-hidden style={{ flex:'none', width:30, height:30, borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', background:'var(--primary-tint)', color:'var(--on-tint-blue)' }}><Icon d="M4 5h16v14H4z M22 6l-10 7L2 6" size={15} /></span>
            <span style={{ minWidth:0, flex:1, fontSize:13.6, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{value}</span>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <span aria-hidden style={{ color:'var(--muted)', display:'flex', flex:'none' }}><SearchIcon /></span>
            <span style={{ flex:1, fontSize:13.8, color:'var(--muted)' }}>Search accounts to add a recipient…</span>
          </React.Fragment>
        )}
        {value
          ? <button type="button" aria-label="Clear recipient" onClick={(e) => { e.stopPropagation(); onChange('') }} style={{ ...S.icon, border:'none', width:28, height:28, flex:'none' }}><Icon d="M18 6L6 18 M6 6l12 12" size={15} /></button>
          : <Icon d="M6 9l6 6 6-6" style={{ transform: open ? 'rotate(180deg)' : 'none', transition:'transform .18s ease', flex:'none', stroke:'var(--muted)' }} />}
      </div>
      {open && panel}
    </div>
  )
}

export function AppMultiPicker({ value, onChange, apps, ariaLabel, placeholder }) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [pos, setPos] = React.useState(null)
  const wrapRef = React.useRef(null)
  const inputRef = React.useRef(null)
  const all = apps || []
  const sel = value || []
  const q = query.trim().toLowerCase()
  const filtered = q ? all.filter(a => (a.name + ' ' + (a.code || '')).toLowerCase().includes(q)) : all
  React.useLayoutEffect(() => {
    if (!(open && wrapRef.current)) return
    const place = () => {
      const r = wrapRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - r.bottom - 8, spaceAbove = r.top - 8
      const up = spaceBelow < 360 && spaceAbove > spaceBelow
      const maxH = Math.max(200, Math.min(384, up ? spaceAbove : spaceBelow))
      let top = up ? r.top - 6 - maxH : r.bottom + 6
      top = Math.max(8, Math.min(top, window.innerHeight - 8 - maxH))
      const left = Math.max(8, Math.min(r.left, window.innerWidth - 8 - r.width))
      setPos({ left, width:r.width, top, maxH })
    }
    place(); window.addEventListener('scroll', place, true); window.addEventListener('resize', place)
    return () => { window.removeEventListener('scroll', place, true); window.removeEventListener('resize', place) }
  }, [open, sel.length])
  React.useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target) && !(e.target.closest && e.target.closest('[data-appms-panel]'))) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onEsc)
    const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 20)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc); clearTimeout(t) }
  }, [open])
  const toggle = (n) => onChange(sel.includes(n) ? sel.filter(x => x !== n) : [...sel, n])
  const allOn = filtered.length > 0 && filtered.every(a => sel.includes(a.name))
  const someOn = !allOn && filtered.some(a => sel.includes(a.name))
  const toggleAll = () => onChange(allOn ? sel.filter(n => !filtered.some(a => a.name === n)) : [...sel, ...filtered.map(a => a.name).filter(n => !sel.includes(n))])
  const appIcon = (a, size) => <span aria-hidden style={{ flex:'none', width:size, height:size, borderRadius:8, display:'inline-flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(155deg, var(--primary-tint), var(--primary-tint-2))', border:'1px solid var(--border-blue)', color:'var(--on-tint-blue)' }}>{a && a.icon ? <Icon d={a.icon} size={Math.round(size * 0.5)} /> : null}</span>
  const triggerBox = { width:'100%', minHeight:44, borderRadius:10, border:'1.5px solid ' + (open ? 'var(--primary)' : '#D5DBE4'), background: open ? 'var(--primary-tint)' : 'var(--surface)', padding:'6px 8px 6px 10px', display:'flex', alignItems:'center', gap:10, cursor:'pointer' }
  const panel = pos ? createPortal(
    <div data-appms-panel style={{ position:'fixed', left:pos.left, width:pos.width, top:pos.top, maxHeight:pos.maxH, display:'flex', flexDirection:'column', zIndex:5200, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, boxShadow:'0 16px 40px -16px rgba(16,42,84,.3)', overflow:'hidden', animation:'popIn .14s ease' }}>
      <div style={{ flex:'none', padding:10, borderBottom:'1px solid var(--border)', background:'var(--surface-alt)' }}>
        <div style={{ position:'relative' }}>
          <span aria-hidden style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'flex' }}><SearchIcon /></span>
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search applications…" aria-label="Search applications" style={{ ...S.input, height:40, fontSize:13.6, padding:'0 12px 0 34px' }} />
        </div>
      </div>
      <ul role="listbox" aria-multiselectable="true" aria-label={ariaLabel} style={{ listStyle:'none', margin:0, padding:6, flex:1, minHeight:0, overflow:'auto' }}>
        {filtered.length === 0 && <li style={{ padding:'18px 12px', textAlign:'center', fontSize:13, color:'var(--muted)' }}>No applications found</li>}
        {filtered.length > 1 && <li role="option" aria-selected={allOn} data-ix="opt" onClick={toggleAll} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, cursor:'pointer', borderBottom:'1px solid var(--border)', marginBottom:4 }}>
          <span style={{ display:'flex', pointerEvents:'none' }}><Checkbox checked={allOn} indeterminate={someOn} /></span>
          <span style={{ fontSize:13.4, fontWeight:600, color:'var(--ink)' }}>{q ? 'Select all matching' : 'Select all'}</span>
        </li>}
        {filtered.map(a => {
          const on = sel.includes(a.name)
          return (
            <li key={a.name} role="option" aria-selected={on} data-ix="opt" onClick={() => toggle(a.name)} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, cursor:'pointer', background: on ? 'var(--primary-tint)' : 'transparent' }}>
              <span style={{ display:'flex', pointerEvents:'none' }}><Checkbox checked={on} /></span>
              {appIcon(a, 28)}
              <span style={{ minWidth:0, flex:1, display:'flex', flexDirection:'column' }}>
                <span style={{ fontSize:13.4, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.name}</span>
                {a.code && <span style={{ fontSize:12, color:'var(--muted)' }}>{a.code}</span>}
              </span>
            </li>
          )
        })}
      </ul>
      <div style={{ flex:'none', padding:'8px 12px', borderTop:'1px solid var(--border)', fontSize:11.6, color:'var(--muted)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12 }}>
        <span>{sel.length} of {all.length} selected</span>
        {sel.length > 0 && <button type="button" data-ix="lnk" onClick={() => onChange([])} style={{ background:'none', border:'none', font:'inherit', fontSize:12, fontWeight:600, color:'var(--primary)', cursor:'pointer', padding:'2px 4px' }}>Clear all</button>}
      </div>
    </div>, document.body) : null
  return (
    <div ref={wrapRef} style={{ position:'relative' }}>
      <div role="button" tabIndex={0} aria-haspopup="listbox" aria-expanded={open} aria-label={ariaLabel} onClick={() => setOpen(o => !o)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true) } }} style={triggerBox}>
        {sel.length ? (
          <div style={{ flex:1, minWidth:0, display:'flex', flexWrap:'wrap', gap:6 }}>
            {sel.map(n => (
              <span key={n} style={{ display:'inline-flex', alignItems:'center', gap:4, maxWidth:'100%', padding:'3px 4px 3px 10px', borderRadius:999, background:'var(--primary-tint)', border:'1px solid var(--border-blue)', color:'var(--on-tint-blue)', fontSize:12.6, fontWeight:600 }}>
                <span style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{n}</span>
                <button type="button" aria-label={'Remove ' + n} onClick={(e) => { e.stopPropagation(); toggle(n) }} style={{ border:'none', background:'transparent', color:'inherit', width:20, height:20, borderRadius:999, display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer', padding:0 }}><Icon d="M18 6L6 18 M6 6l12 12" size={12} sw={2.5} /></button>
              </span>
            ))}
          </div>
        ) : (
          <React.Fragment>
            <span aria-hidden style={{ color:'var(--muted)', display:'flex', flex:'none' }}><SearchIcon /></span>
            <span style={{ flex:1, fontSize:13.8, color:'var(--muted)' }}>{placeholder || 'Select applications…'}</span>
          </React.Fragment>
        )}
        <Icon d="M6 9l6 6 6-6" style={{ transform: open ? 'rotate(180deg)' : 'none', transition:'transform .18s ease', flex:'none', stroke:'var(--muted)' }} />
      </div>
      {open && panel}
    </div>
  )
}

export function JobMenu({ job, onView, onToggle, onRun, toast }) {
  const [open, setOpen] = React.useState(false)
  const [pos, setPos] = React.useState(null)
  const btnRef = React.useRef(null)
  const menuRef = React.useRef(null)
  React.useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (btnRef.current && !btnRef.current.contains(e.target) && !(menuRef.current && menuRef.current.contains(e.target))) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onEsc)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc) }
  }, [open])
  const toggle = () => {
    if (!open && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      const W = 220, H = 152
      let left = Math.max(12, Math.min(r.right - W, window.innerWidth - W - 12))
      let top = r.bottom + 6
      if (top + H > window.innerHeight - 12) top = Math.max(12, r.top - H - 6)
      setPos({ top, left })
    }
    setOpen(o => !o)
  }
  const items = [
    { label:'View details', icon:'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', on:() => onView(job) },
    { label:'Run now', icon:'M5 3l14 9-14 9V3z', on:() => { onRun(job); toast('Job execution queued.', 'success') } },
    { label: job.active ? 'Deactivate' : 'Activate', icon:'M18.36 6.64a9 9 0 1 1-12.73 0 M12 2v10', on:() => { onToggle(job); toast(job.active ? 'Job deactivated.' : 'Job activated.', 'success') } },
  ]
  const run = (fn) => { setOpen(false); fn() }
  const menu = open && pos ? createPortal(
    <ul ref={menuRef} role="menu" aria-label={'Actions for ' + job.name} style={{ position:'fixed', top:pos.top, left:pos.left, zIndex:4000, width:220, listStyle:'none', margin:0, padding:6, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, boxShadow:'0 16px 40px -16px rgba(16,42,84,.32)', animation:'popIn .14s ease' }}>
      {items.map(it => (
        <li key={it.label} role="menuitem" tabIndex={0} data-ix="opt" onClick={() => run(it.on)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run(it.on) } }}
          style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 11px', borderRadius:8, cursor:'pointer', fontSize:13.3, fontWeight:500, color:'var(--ink)' }}>
          <Icon d={it.icon} size={16} style={{ stroke:'var(--muted)', flex:'none' }} />{it.label}
        </li>
      ))}
    </ul>, document.body) : null
  return (<React.Fragment><button ref={btnRef} data-ix="ic" title="More actions" aria-label={'More actions for ' + job.name} aria-haspopup="menu" aria-expanded={open} onClick={toggle} style={{ ...S.icon }}><Icon d="M5 12h.01 M12 12h.01 M19 12h.01" size={18} /></button>{menu}</React.Fragment>)
}

function FilterSearchList({ f, value, onPick }) {
  const [q, setQ] = React.useState('')
  const t = q.trim().toLowerCase()
  const opts = f.options.filter(o => o === 'All' || !t || o.toLowerCase().includes(t))
  return (
    <div style={{ border:'1.5px solid #D5DBE4', borderRadius:10, overflow:'hidden', background:'var(--surface)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, padding:'0 11px', borderBottom:'1px solid var(--border)' }}>
        <Icon d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35" size={14} style={{ color:'var(--muted)', flex:'none' }} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={'Search…'} aria-label={'Search ' + f.label} style={{ flex:1, height:36, border:'none', outline:'none', background:'transparent', fontFamily:'inherit', fontSize:13, color:'var(--ink)', minWidth:0 }} />
      </div>
      <div role="listbox" aria-label={f.label} style={{ maxHeight:168, overflowY:'auto', padding:5 }}>
        {opts.length ? opts.map(o => {
          const on = o === value
          return (
            <button key={o} type="button" role="option" aria-selected={on} onClick={() => onPick(o)} style={{ display:'flex', alignItems:'center', gap:8, width:'100%', textAlign:'left', padding:'8px 10px', borderRadius:8, border:'none', background: on ? 'var(--primary-tint)' : 'transparent', color: on ? 'var(--on-tint-blue)' : 'var(--ink)', fontFamily:'inherit', fontSize:13, fontWeight: on ? 600 : 500, cursor:'pointer' }}>
              <span style={{ flex:1, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{o === 'All' ? 'All ' + f.label.toLowerCase() + 's' : o}</span>
              {on && <Icon d="M20 6L9 17l-5-5" size={13} sw={2.5} style={{ flex:'none' }} />}
            </button>
          )
        }) : <div style={{ padding:'10px 12px', fontSize:12.6, color:'var(--muted)' }}>No matches.</div>}
      </div>
    </div>
  )
}

export function FilterBar({ filters, wide }) {
  const isOn = (f, v) => f.type === 'range' ? !!(v && (v.from || v.to)) : (v || 'All') !== 'All'
  const blank = (f) => f.type === 'range' ? { from:'', to:'' } : 'All'
  const fmtDT = (x) => x ? (x.length === 10 ? x.slice(8, 10) + '/' + (+x.slice(5, 7)) + '/' + x.slice(0, 4) : x.replace('T', ' ')) : '…'
  const [open, setOpen] = React.useState(false)
  const [pos, setPos] = React.useState(null)
  const btnRef = React.useRef(null)
  const panelRef = React.useRef(null)
  const [draft, setDraft] = React.useState(null)
  const d = draft || {}
  const active = filters.filter(f => isOn(f, f.value))
  React.useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (e.target.closest && e.target.closest('[data-daterange-pop]')) return; if (btnRef.current && !btnRef.current.contains(e.target) && !(panelRef.current && panelRef.current.contains(e.target))) setOpen(false) }
    const onEsc = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown); document.addEventListener('keydown', onEsc)
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onEsc) }
  }, [open])
  React.useLayoutEffect(() => {
    if (!(open && btnRef.current)) return
    const place = () => { const r = btnRef.current.getBoundingClientRect(); const W = wide ? Math.min(600, window.innerWidth - 24) : 304; const left = Math.max(12, Math.min(r.left, window.innerWidth - W - 12)); const top = Math.min(r.bottom + 8, window.innerHeight - 12); setPos(p => ({ top: wide && p && p.anchor === r.bottom ? p.top : top, left, width: W, anchor: r.bottom })) }
    place(); window.addEventListener('scroll', place, true); window.addEventListener('resize', place)
    return () => { window.removeEventListener('scroll', place, true); window.removeEventListener('resize', place) }
  }, [open])
  React.useLayoutEffect(() => {
    if (!(wide && open && pos && panelRef.current)) return
    const h = panelRef.current.offsetHeight
    const t = Math.max(76, Math.min(pos.anchor + 8, window.innerHeight - h - 12))
    if (Math.abs(t - pos.top) > 0.5) setPos(p => ({ ...p, top: t }))
  })
  const anyDraft = filters.some(f => isOn(f, d[f.key]))
  const clearAll = () => setDraft(Object.fromEntries(filters.map(f => [f.key, blank(f)])))
  const openPanel = () => { setDraft(Object.fromEntries(filters.map(f => [f.key, f.value]))); setOpen(true) }
  const applyFilters = () => { filters.forEach(f => { if (d[f.key] !== f.value) f.onChange(d[f.key]) }); setOpen(false) }
  const pill = (on) => ({ padding: wide ? '5px 11px' : '6px 12px', borderRadius:999, border:'1.5px solid ' + (on ? 'var(--primary)' : '#D5DBE4'), background: on ? 'var(--primary-tint)' : 'var(--surface)', color: on ? 'var(--on-tint-blue)' : 'var(--ink)', fontFamily:'inherit', fontSize:12.8, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' })
  const panel = open && pos ? createPortal(
    <div ref={panelRef} style={{ position:'fixed', top:pos.top, left:pos.left, width:pos.width, maxHeight: wide ? window.innerHeight - 88 : 'min(66vh, ' + (window.innerHeight - pos.top - 12) + 'px)', display:'flex', flexDirection:'column', zIndex:5200, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:14, boxShadow:'0 16px 40px -16px rgba(16,42,84,.3)', overflow:'hidden', animation:'popIn .14s ease' }}>
      <div style={{ flex:'none', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', borderBottom:'1px solid var(--border)', background:'var(--surface-alt)' }}>
        <span style={{ fontSize:13.4, fontWeight:700, color:'var(--ink)' }}>Filters</span>
        <button type="button" onClick={clearAll} disabled={!anyDraft} style={{ border:'none', background:'transparent', color: anyDraft ? 'var(--primary)' : 'var(--muted)', fontFamily:'inherit', fontSize:12.6, fontWeight:600, cursor: anyDraft ? 'pointer' : 'default', padding:0 }}>Clear all</button>
      </div>
      <div style={wide ? { flex:1, minHeight:0, overflow:'auto', padding:'2px 16px', display:'flex', flexDirection:'column' } : { flex:1, minHeight:0, overflow:'auto', padding:14, display:'flex', flexDirection:'column', gap:16 }}>
        {filters.map((f, fi) => (
          <div key={f.key} style={wide ? { display:'grid', gridTemplateColumns:'118px minmax(0, 1fr)', alignItems:'start', gap:14, padding:'13px 0', borderTop: fi ? '1px solid var(--border)' : 'none' } : { display:'flex', flexDirection:'column', gap:8 }}>
            {wide ? (
              <span style={{ display:'flex', alignItems:'center', gap:9, minHeight:32 }}>
                {f.icon && <span aria-hidden style={{ width:26, height:26, borderRadius:7, display:'grid', placeItems:'center', flex:'none', background: isOn(f, d[f.key]) ? 'var(--primary)' : 'var(--primary-tint)', color: isOn(f, d[f.key]) ? '#fff' : 'var(--on-tint-blue)', transition:'background .16s ease,color .16s ease' }}><Icon d={f.icon} size={14} sw={2} /></span>}
                <span style={{ fontSize:13, fontWeight:600, color:'var(--ink)' }}>{f.label}</span>
              </span>
            ) : <span style={{ fontSize:11.6, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}>{f.label}</span>}
            {f.type === 'range' ? (
              <DateRange ariaLabel={f.label} value={d[f.key] || { from:'', to:'' }} onChange={(from, to) => setDraft(s => ({ ...(s || {}), [f.key]: { from:from || '', to:to || '' } }))} />
            ) : f.type === 'search' ? (
              <FilterSearchList f={f} value={d[f.key]} onPick={(o) => setDraft(s => ({ ...(s || {}), [f.key]: o }))} />
            ) : (
              <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                {f.options.map(o => <button key={o} type="button" onClick={() => setDraft(s => ({ ...(s || {}), [f.key]: o }))} style={pill(o === d[f.key])}>{o === 'All' ? 'All' : o}</button>)}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ flex:'none', display:'flex', gap:10, padding:'12px 14px', borderTop:'1px solid var(--border)', background:'var(--surface-alt)' }}>
        <button type="button" onClick={() => setOpen(false)} style={{ flex:'none', height:40, padding:'0 14px', borderRadius:10, border:'1px solid var(--border-blue)', background:'var(--surface)', color:'var(--ink)', fontFamily:'inherit', fontWeight:600, fontSize:13.4, cursor:'pointer' }}>Cancel</button>
        <button type="button" onClick={applyFilters} style={{ flex:1, height:40, borderRadius:10, border:'none', background:'linear-gradient(180deg,#1a86f0,#0070E0)', color:'#fff', fontFamily:'inherit', fontWeight:600, fontSize:13.6, cursor:'pointer', boxShadow:'0 2px 6px -2px rgba(0,112,224,.3)' }}>Apply filters</button>
      </div>
    </div>, document.body) : null
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
      <button ref={btnRef} type="button" onClick={() => open ? setOpen(false) : openPanel()} aria-haspopup="dialog" aria-expanded={open} aria-label="Filters"
        style={{ height:44, padding:'0 14px', borderRadius:10, border:'1.5px solid ' + (open || active.length ? 'var(--primary)' : '#D5DBE4'), background: open || active.length ? 'var(--primary-tint)' : 'var(--surface)', color: active.length ? 'var(--on-tint-blue)' : 'var(--ink)', fontFamily:'inherit', fontWeight:600, fontSize:13.8, display:'inline-flex', alignItems:'center', gap:9, cursor:'pointer' }}>
        <Icon d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" size={16} />Filters
        {active.length > 0 && <span style={{ minWidth:20, height:20, padding:'0 6px', borderRadius:999, background:'var(--primary)', color:'#fff', fontSize:11.5, fontWeight:700, display:'inline-flex', alignItems:'center', justifyContent:'center', fontVariantNumeric:'tabular-nums' }}>{active.length}</span>}
      </button>
      {active.map(f => (
        <span key={f.key} style={{ display:'inline-flex', alignItems:'center', gap:6, height:32, padding:'0 6px 0 11px', borderRadius:999, background:'var(--primary-tint)', border:'1px solid var(--border-blue)', color:'var(--on-tint-blue)', fontSize:12.6, fontWeight:600, whiteSpace:'nowrap' }}>
          <span style={{ color:'var(--muted)', fontWeight:600 }}>{f.label}:</span>{f.type === 'range' ? fmtDT(f.value.from) + ' \u2192 ' + fmtDT(f.value.to) : f.value}
          <button type="button" aria-label={'Clear ' + f.label + ' filter'} onClick={() => f.onChange(blank(f))} style={{ display:'inline-flex', border:'none', background:'transparent', color:'var(--on-tint-blue)', cursor:'pointer', padding:2, borderRadius:5, lineHeight:0 }}><Icon d="M18 6L6 18 M6 6l12 12" size={12} sw={2.4} /></button>
        </span>
      ))}
      {panel}
    </div>
  )
}
