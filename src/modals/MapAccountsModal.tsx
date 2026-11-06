import React from 'react'
import { createPortal } from 'react-dom'
import { Modal, S, SearchIcon, Icon } from '../ui'
import { users, orgTree } from '../data'

function flatOrgUnits(nodes, trail, out) {
  nodes.forEach(n => { const path = trail.concat([n.name]); out.push({ code: n.code, name: n.name, type: n.type, path, depth: path.length - 1 }); if (n.children) flatOrgUnits(n.children, path, out) })
  return out
}

export function MapVirtualList({ items, rowHeight, height, renderRow, empty, bg }) {
  const [st, setST] = React.useState(0)
  const ov = 6
  const total = items.length
  const vis = Math.ceil(height / rowHeight) + ov * 2
  const start = Math.max(0, Math.floor(st / rowHeight) - ov)
  const end = Math.min(total, start + vis)
  React.useEffect(() => { setST(0) }, [items])
  return (
    <div onScroll={e => setST(e.currentTarget.scrollTop)} style={{ height, overflowY:'auto', overflowX:'hidden', background: bg || 'var(--surface)' }}>
      {total === 0 ? <div style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>{empty}</div> : (
        <div style={{ height: total * rowHeight, position:'relative' }}>
          <div style={{ position:'absolute', top: start * rowHeight, left:0, right:0 }}>
            {items.slice(start, end).map(it => renderRow(it))}
          </div>
        </div>
      )}
    </div>
  )
}

// Compact chip + portal listbox used for per-row and bulk scope picking.
export function ScopeChip({ value, placeholder, options, units, allLabel, onSelect, ariaLabel, iconD, tone, size }) {
  const [open, setOpen] = React.useState(false)
  const [pos, setPos] = React.useState(null)
  const [q, setQ] = React.useState('')
  const tree = !!units
  const tq = q.trim().toLowerCase()
  const shown = tree ? (tq ? units.filter(u => u.name.toLowerCase().includes(tq)) : units) : null
  const selUnit = tree ? units.find(u => u.name === value) : null
  React.useEffect(() => { if (!open) setQ('') }, [open])
  const btnRef = React.useRef(null), menuRef = React.useRef(null)
  const unset = value == null || value === '' || value === 'None'
  const big = size === 'lg'
  React.useLayoutEffect(() => {
    if (!open || !btnRef.current) return
    const place = () => {
      const r = btnRef.current.getBoundingClientRect()
      const h = tree ? Math.min(340, units.length * 36 + 60) : Math.min(260, options.length * 36 + 14), w = tree ? 292 : 196
      const up = window.innerHeight - r.bottom - 8 < h && r.top > h
      const top = up ? r.top - 6 - h : r.bottom + 6
      const left = Math.max(8, Math.min(r.right - w, window.innerWidth - 8 - w))
      setPos({ top, left, w })
    }
    place()
    const out = (e) => { if (menuRef.current && !menuRef.current.contains(e.target) && !btnRef.current.contains(e.target)) setOpen(false) }
    const esc = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('scroll', place, true); window.addEventListener('resize', place); document.addEventListener('mousedown', out); document.addEventListener('keydown', esc)
    return () => { window.removeEventListener('scroll', place, true); window.removeEventListener('resize', place); document.removeEventListener('mousedown', out); document.removeEventListener('keydown', esc) }
  }, [open, options, units])
  const palette = tone === 'access'
    ? { fg: 'var(--on-tint-blue)', bg: 'var(--primary-tint)', bd: 'var(--border-blue)' }
    : tone === 'filter' ? { fg: 'var(--ink)', bg: 'var(--surface)', bd: '#64748B44' }
    : { fg: '#6D28D9', bg: '#F3EEFF', bd: '#DDD2FA' }
  const st = (unset && tone !== 'filter')
    ? { color: '#92400E', background: '#FFF7E6', border: '1px dashed #F0C36B' }
    : { color: palette.fg, background: palette.bg, border: '1px solid ' + palette.bd }
  const menu = open && pos ? createPortal(
    tree ? (
    <div ref={menuRef} style={{ position: 'fixed', top: pos.top, left: pos.left, width: pos.w, zIndex: 5200, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: '0 12px 32px -12px rgba(16,42,84,.25)', overflow: 'hidden', animation: 'popIn .14s ease', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 11px', borderBottom: '1px solid var(--border)', background: 'var(--surface-alt)' }}>
        <Icon d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35" size={13} style={{ color: 'var(--muted)', flex: 'none' }} />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onClick={(e) => e.stopPropagation()} placeholder="Search units…" aria-label="Search organization units" style={{ flex: 1, height: 36, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 12.8, color: 'var(--ink)', minWidth: 0 }} />
      </div>
      <div role="listbox" aria-label={ariaLabel} style={{ maxHeight: 280, overflowY: 'auto', padding: 5 }}>
        {allLabel && !tq && (() => { const sel = value === allLabel; return (
          <div role="option" data-ix="opt" aria-selected={sel} onClick={(e) => { e.stopPropagation(); onSelect(allLabel); setOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, cursor: 'pointer', fontSize: 12.8, fontWeight: sel ? 600 : 500, color: sel ? 'var(--on-tint-blue)' : 'var(--ink)', background: sel ? 'var(--primary-tint)' : 'transparent', borderBottom: '1px solid var(--border)', marginBottom: 3 }}><span style={{ flex: 1 }}>{allLabel}</span>{sel && <Icon d="M20 6L9 17l-5-5" size={13} sw={2.5} />}</div>
        )})()}
        {shown.length === 0 && <div style={{ padding: '10px 10px', fontSize: 12.4, color: 'var(--muted)' }}>No units match “{q}”.</div>}
        {shown.map(u => { const sel = u.name === value; return (
          <div key={u.code} role="option" data-ix="opt" aria-selected={sel} title={u.path.join(' › ')} onClick={(e) => { e.stopPropagation(); onSelect(u.name); setOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', paddingLeft: tq ? 10 : 10 + u.depth * 16, borderRadius: 8, cursor: 'pointer', background: sel ? 'var(--primary-tint)' : 'transparent' }}>
            {!tq && u.depth > 0 && <span aria-hidden style={{ flex: 'none', width: 8, height: 8, borderLeft: '1.5px solid #C4CDD9', borderBottom: '1.5px solid #C4CDD9', borderRadius: '0 0 0 3px', marginTop: -6 }} />}
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 12.8, fontWeight: sel ? 600 : 500, color: sel ? 'var(--on-tint-blue)' : 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</span>
              {tq && u.path.length > 1 && <span style={{ display: 'block', fontSize: 11, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.path.slice(0, -1).join(' › ')}</span>}
            </span>
            <span style={{ fontSize: 10.6, color: 'var(--muted)', flex: 'none' }}>{u.type}</span>
            {sel && <Icon d="M20 6L9 17l-5-5" size={13} sw={2.5} style={{ flex: 'none' }} />}
          </div>
        )})}
      </div>
      <div style={{ padding: '7px 11px', borderTop: '1px solid var(--border)', background: 'var(--surface-alt)', fontSize: 11.2, color: 'var(--muted)' }}>Indentation shows where a unit sits in the organization.</div>
    </div>
    ) : (
    <ul ref={menuRef} role="listbox" aria-label={ariaLabel} style={{ position: 'fixed', top: pos.top, left: pos.left, width: pos.w, zIndex: 5200, listStyle: 'none', margin: 0, padding: 6, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: '0 12px 32px -12px rgba(16,42,84,.25)', maxHeight: 260, overflow: 'auto', animation: 'popIn .14s ease' }}>
      {options.map(o => { const sel = o === value; return (
        <li key={o} role="option" data-ix="opt" aria-selected={sel} onClick={(e) => { e.stopPropagation(); onSelect(o); setOpen(false) }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '8px 11px', borderRadius: 8, cursor: 'pointer', fontSize: 12.8, fontWeight: sel ? 600 : 500, color: sel ? 'var(--on-tint-blue)' : 'var(--ink)', background: sel ? 'var(--primary-tint)' : 'transparent' }}>{o}{sel && <Icon d="M20 6L9 17l-5-5" size={13} sw={2.5} />}</li>
      )})}
    </ul>
    ), document.body) : null
  return (
    <>
      <button ref={btnRef} type="button" data-ix="opt" aria-haspopup="listbox" aria-expanded={open} aria-label={ariaLabel} title={selUnit ? selUnit.path.join(' \u203a ') : ariaLabel} onClick={(e) => { e.stopPropagation(); setOpen(o => !o) }}
        style={{ ...st, flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, height: big ? 32 : 24, maxWidth: big ? 200 : 112, padding: big ? '0 9px 0 10px' : '0 6px 0 7px', borderRadius: 7, cursor: 'pointer', font: 'inherit', fontSize: big ? 12.6 : 11.6, fontWeight: 600, whiteSpace: 'nowrap', boxShadow: open ? '0 0 0 2px var(--border-blue)' : 'none' }}>
        {iconD && <Icon d={iconD} size={big ? 13 : 12} sw={2.2} style={{ flex: 'none' }} />}
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{unset ? (placeholder || 'Set') : value}</span>
        <Icon d="M6 9l6 6 6-6" size={11} style={{ flex: 'none', opacity: .75, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .18s ease' }} />
      </button>
      {menu}
    </>
  )
}

export function MapAccountsModal({ onClose, stop, toast, role }) {
  const roleName = role ? role.name : 'role'
  const ORG_UNITS = React.useMemo(() => flatOrgUnits(orgTree, [], []), [])
  const UNITS = React.useMemo(() => ORG_UNITS.map(u => u.name), [ORG_UNITS])
  const ACCESS = ['None','Local','Deep','Org','Tenant']
  const POOL = React.useMemo(() => {
    const first = ['Aarav','Isha','Liam','Sofia','Noah','Mia','Arjun','Zara','Ethan','Ava','Vihaan','Riya','Lucas','Emma','Kabir','Aisha','Leo','Nora','Dev','Tara','Omar','Lena','Ian','Maya','Sam','Ivy','Raj','Ana','Ben','Elle']
    const last = ['Sharma','Patel','Khan','Silva','Chen','Garcia','Kumar','Reddy','Nair','Bose','Iyer','Das','Roy','Mehta','Shah','Rao','Verma','Gupta','Joshi','Menon','Pillai','Bhat','Sinha','Ghosh']
    const tenants = ['Excelsoft Academy','Bright Future Schools','Nova Learning Group','Horizon EdTech','Meridian University','Pinnacle Training Inst.']
    const arr = users.map((u, i) => ({ ...u, unit: UNITS[i % UNITS.length] }))
    const seen = new Set(arr.map(u => u.login))
    for (let i = 0; i < 2400; i++) {
      const fn = first[i % first.length], ln = last[(i * 7) % last.length]
      const login = (fn + '.' + ln).toLowerCase() + (i + 1)
      if (seen.has(login)) continue
      seen.add(login)
      arr.push({ name: fn + ' ' + ln, login, email: login + '@saras.edu', tenant: tenants[i % tenants.length], unit: UNITS[(i * 5 + 1) % UNITS.length], role: '\u2014', initials: (fn[0] + ln[0]).toUpperCase() })
    }
    return arr
  }, [])
  const byLogin = React.useMemo(() => { const m = new Map(); POOL.forEach(u => m.set(u.login, u)); return m }, [POOL])
  const initial = React.useMemo(() => new Set(POOL.filter(u => u.role === roleName).map(u => u.login)), [POOL, roleName])
  const [assigned, setAssigned] = React.useState(() => new Set(initial))
  // login -> { unit, access }; current members start scoped to their home unit with Local access
  const [scopes, setScopes] = React.useState(() => { const o = {}; initial.forEach(l => { o[l] = { unit: byLogin.get(l).unit, access: 'Local' } }); return o })
  const [sel, setSel] = React.useState(() => new Set())
  const [unit, setUnit] = React.useState('All units')
  const [qa, setQa] = React.useState('')
  const [qs, setQs] = React.useState('')
  const [view, setView] = React.useState('All')
  const matches = (u, q) => !q || (u.name + ' ' + u.email + ' ' + u.tenant).toLowerCase().includes(q)
  const qav = qa.trim().toLowerCase(), qas = qs.trim().toLowerCase()
  const available = React.useMemo(() => POOL.filter(u => !assigned.has(u.login) && (unit === 'All units' || u.unit === unit) && matches(u, qav)), [POOL, assigned, qav, unit])
  const assignedList = React.useMemo(() => POOL.filter(u => assigned.has(u.login) && (view === 'All' || (view === 'Current') === initial.has(u.login)) && matches(u, qas)), [POOL, assigned, qas, view, initial])
  const curCount = [...assigned].filter(l => initial.has(l)).length, newCount = assigned.size - curCount
  // New additions inherit the active unit filter (or their home unit) and Local access, so nothing lands unscoped.
  const defaultScope = (login) => ({ unit: unit !== 'All units' ? unit : byLogin.get(login).unit, access: 'Local' })
  const add = (login) => { setAssigned(s => { const n = new Set(s); n.add(login); return n }); setScopes(sc => ({ ...sc, [login]: sc[login] || defaultScope(login) })) }
  const remove = (login) => { setAssigned(s => { const n = new Set(s); n.delete(login); return n }); setSel(s => { if (!s.has(login)) return s; const n = new Set(s); n.delete(login); return n }) }
  const addAll = () => { const logins = available.map(u => u.login); setAssigned(s => { const n = new Set(s); logins.forEach(l => n.add(l)); return n }); setScopes(sc => { const n = { ...sc }; logins.forEach(l => { n[l] = n[l] || defaultScope(l) }); return n }) }
  const removeAll = () => { const logins = new Set(assignedList.map(u => u.login)); setAssigned(s => { const n = new Set(s); logins.forEach(l => n.delete(l)); return n }); setSel(s => { const n = new Set(s); logins.forEach(l => n.delete(l)); return n }) }
  const setScope = (logins, patch) => setScopes(sc => { const n = { ...sc }; logins.forEach(l => { n[l] = { ...(n[l] || defaultScope(l)), ...patch } }); return n })
  const toggleSel = (login) => setSel(s => { const n = new Set(s); n.has(login) ? n.delete(login) : n.add(login); return n })
  const visibleSel = assignedList.filter(u => sel.has(u.login)).length
  const allVisibleSel = assignedList.length > 0 && visibleSel === assignedList.length
  const toggleAllSel = () => setSel(s => { const n = new Set(s); if (allVisibleSel) assignedList.forEach(u => n.delete(u.login)); else assignedList.forEach(u => n.add(u.login)); return n })
  const selLogins = [...sel].filter(l => assigned.has(l))
  const removeSelected = () => { setAssigned(s => { const n = new Set(s); selLogins.forEach(l => n.delete(l)); return n }); setSel(new Set()) }
  const bulkApply = (patch, label) => { setScope(selLogins, patch); toast(label + ' applied to ' + selLogins.length + ' account' + (selLogins.length === 1 ? '' : 's') + '.', 'success') }
  const added = [...assigned].filter(l => !initial.has(l)).length
  const removed = [...initial].filter(l => !assigned.has(l)).length
  const noAccess = [...assigned].filter(l => !scopes[l] || scopes[l].access === 'None').length
  const save = () => { onClose(); const parts = []; if (added) parts.push(added + ' added'); if (removed) parts.push(removed + ' removed'); toast(parts.length ? ('Accounts updated for ' + roleName + ' \u2014 ' + parts.join(', ') + '.') : ('Scopes saved for ' + roleName + '.'), 'success') }
  const ROW = 62
  const rowBase = { height: ROW, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', borderBottom: '1px solid var(--border)', cursor: 'pointer' }
  const av = (u, bg, color) => <span aria-hidden style={{ flex: 'none', width: 34, height: 34, borderRadius: '50%', background: bg, color, fontSize: 12.2, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{u.initials}</span>
  const meta = (u, sub) => <span style={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1, minWidth: 96 }}><span style={{ fontSize: 13.6, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.name}</span><span style={{ fontSize: 11.6, color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub}</span></span>
  const checkbox = (on, onChange, label) => (
    <span role="checkbox" aria-checked={on} aria-label={label} tabIndex={0} onClick={(e) => { e.stopPropagation(); onChange() }} onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onChange() } }}
      style={{ flex: 'none', width: 18, height: 18, borderRadius: 5, border: '1.5px solid ' + (on ? 'var(--primary)' : '#B9C2CF'), background: on ? 'var(--primary)' : 'var(--surface)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background .12s, border-color .12s' }}>
      {on && <Icon d="M20 6L9 17l-5-5" size={12} sw={3} style={{ stroke: '#fff' }} />}
    </span>
  )
  const unitIcon = 'M3 21h18 M5 21V7l7-4 7 4v14 M9 21v-5h6v5'
  const keyIcon = 'M21 2l-2 2m-7.6 7.6a5.5 5.5 0 1 1-7.8 7.8 5.5 5.5 0 0 1 7.8-7.8zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3'
  const renderAvail = (u) => (
    <div key={u.login} data-ix="treerow" onClick={() => add(u.login)} style={rowBase} title={'Add ' + u.name}>
      {av(u, 'var(--surface-alt)', 'var(--muted)')}
      {meta(u, u.email + ' \u00b7 ' + u.unit)}
      <span aria-hidden style={{ flex: 'none', width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary-tint)', color: 'var(--on-tint-blue)' }}><Icon d="M12 5v14 M5 12h14" size={15} /></span>
    </div>
  )
  const renderAssigned = (u) => {
    const sc = scopes[u.login] || { unit: '', access: 'None' }
    const on = sel.has(u.login), cur = initial.has(u.login)
    return (
      <div key={u.login} data-ix="treerow" onClick={() => toggleSel(u.login)} style={{ ...rowBase, background: on ? 'var(--primary-tint-2)' : cur ? 'var(--surface)' : 'transparent', boxShadow: 'inset 3px 0 0 ' + (on ? 'var(--primary)' : cur ? '#94A3B8' : 'var(--success)') }} title={on ? 'Deselect ' + u.name : 'Select ' + u.name}>
        {checkbox(on, () => toggleSel(u.login), 'Select ' + u.name)}
        {cur ? av(u, '#E9EEF5', '#475569') : av(u, 'var(--green-tint)', 'var(--success-text)')}
        {meta(u, u.email)}
        {cur ? <span style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: '#475569', background: '#E9EEF5', border: '1px solid #CBD5E1', borderRadius: 999, padding: '2px 8px 2px 6px' }}><Icon d="M20 6L9 17l-5-5" size={10} sw={3} />Current</span>
             : <span style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--success-text)', background: 'var(--green-tint)', border: '1px solid var(--success)55', borderRadius: 999, padding: '2px 8px 2px 6px' }}><Icon d="M12 5v14 M5 12h14" size={10} sw={3} />New</span>}
        <ScopeChip tone="unit" iconD={unitIcon} value={sc.unit} placeholder="Set unit" units={ORG_UNITS} ariaLabel={'Organization unit for ' + u.name} onSelect={(v) => setScope([u.login], { unit: v })} />
        <ScopeChip tone="access" iconD={keyIcon} value={sc.access} placeholder="Set access" options={ACCESS} ariaLabel={'Access level for ' + u.name} onSelect={(v) => setScope([u.login], { access: v })} />
        <button type="button" data-ix="opt" aria-label={'Remove ' + u.name} title="Remove from role" onClick={(e) => { e.stopPropagation(); remove(u.login) }} style={{ flex: 'none', width: 28, height: 28, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDECEC', color: '#DC2626', border: 0, cursor: 'pointer', padding: 0 }}><Icon d="M18 6L6 18 M6 6l12 12" size={15} /></button>
      </div>
    )
  }
  const unitDd = <ScopeChip size="lg" tone="filter" iconD={unitIcon} value={unit} units={ORG_UNITS} allLabel="All units" ariaLabel="Filter available accounts by organization unit" onSelect={setUnit} />
  const viewSeg = (
    <span role="tablist" aria-label="Show assigned accounts" style={{ display: 'inline-flex', flex: 'none', background: 'var(--surface)', border: '1px solid var(--success)44', borderRadius: 8, padding: 2, gap: 2 }}>
      {[['All', assigned.size], ['Current', curCount], ['New', newCount]].map(([k, c]) => { const on = view === k; return (
        <button key={k} type="button" role="tab" aria-selected={on} data-ix={on ? 'seg-on' : 'opt'} onClick={() => { setView(k); setSel(new Set()) }} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 24, padding: '0 9px', border: 0, borderRadius: 6, cursor: 'pointer', font: 'inherit', fontSize: 11.8, fontWeight: 600, whiteSpace: 'nowrap', color: on ? '#fff' : 'var(--ink-alt)', background: on ? 'var(--success)' : 'transparent', transition: 'background .12s, color .12s' }}>{k}<span style={{ fontSize: 10.6, fontWeight: 700, fontVariantNumeric: 'tabular-nums', opacity: on ? .9 : .7 }}>{c}</span></button>
      )})}
    </span>
  )
  const searchBox = (val, on, ph) => (
    <div style={{ position: 'relative', padding: 10, borderBottom: '1px solid var(--border)' }}>
      <span aria-hidden style={{ position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', display: 'flex' }}><SearchIcon size={14} /></span>
      <input aria-label={ph} type="text" value={val} onChange={(e) => on(e.target.value)} placeholder={ph} style={{ ...S.input, height: 38, fontSize: 13.4, padding: '0 12px 0 34px' }} />
    </div>
  )
  // Bulk bar swaps in for the search box while a selection exists.
  const bulkBar = (
    <div role="toolbar" aria-label="Bulk actions for selected accounts" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', minHeight: 58, boxSizing: 'border-box', background: 'var(--primary-tint)', borderBottom: '1px solid var(--border-blue)', animation: 'popIn .14s ease', flexWrap: 'wrap' }}>
      <span style={{ fontSize: 12.8, fontWeight: 700, color: 'var(--on-tint-blue)', fontVariantNumeric: 'tabular-nums', marginRight: 2 }}>{selLogins.length} selected</span>
      <ScopeChip size="lg" tone="unit" iconD={unitIcon} value="" placeholder="Set unit" units={ORG_UNITS} ariaLabel="Set organization unit for selected" onSelect={(v) => bulkApply({ unit: v }, 'Unit \u201c' + v + '\u201d')} />
      <ScopeChip size="lg" tone="access" iconD={keyIcon} value="" placeholder="Set access level" options={ACCESS} ariaLabel="Set access level for selected" onSelect={(v) => bulkApply({ access: v }, 'Access level \u201c' + v + '\u201d')} />
      <span style={{ flex: 1 }} />
      <button type="button" data-ix="opt" onClick={removeSelected} style={{ height: 32, border: '1px solid #F3C6C6', background: '#FDECEC', color: '#B91C1C', padding: '0 10px', borderRadius: 7, cursor: 'pointer', font: 'inherit', fontSize: 12.4, fontWeight: 600, whiteSpace: 'nowrap' }}>Remove</button>
      <button type="button" data-ix="opt" onClick={() => setSel(new Set())} aria-label="Clear selection" title="Clear selection" style={{ width: 32, height: 32, border: '1px solid var(--border-blue)', background: 'var(--surface)', color: 'var(--ink)', borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><Icon d="M18 6L6 18 M6 6l12 12" size={14} /></button>
    </div>
  )
  const panelHead = (title, count, actionLabel, onAction, iconD, accent, accentBg, extra, lead) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '11px 13px', background: accentBg, borderBottom: '1px solid var(--border)' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: 12.8, fontWeight: 700, letterSpacing: '.01em', color: 'var(--ink)' }}>{lead}<span aria-hidden style={{ flex: 'none', width: 27, height: 27, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', color: accent, border: '1px solid ' + accent + '33' }}><Icon d={iconD} size={15} /></span>{title}<span style={{ fontSize: 11.4, fontWeight: 700, color: accent, background: 'var(--surface)', border: '1px solid ' + accent + '33', borderRadius: 999, padding: '1px 8px', fontVariantNumeric: 'tabular-nums' }}>{count.toLocaleString()}</span></span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 'none' }}>{extra}{count > 0 && <button type="button" data-ix="opt" onClick={onAction} style={{ border: '1px solid ' + accent + '44', background: 'var(--surface)', padding: '5px 11px', borderRadius: 8, cursor: 'pointer', font: 'inherit', fontSize: 12, fontWeight: 600, color: accent, whiteSpace: 'nowrap' }}>{actionLabel}</button>}</span>
    </div>
  )
  const panel = (accent, bg, grow, basis) => ({ flex: grow + ' 1 ' + (basis || 340) + 'px', minWidth: 0, border: '1px solid var(--border)', borderTop: '3px solid ' + accent, borderRadius: 13, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: bg })
  const usersIcon = 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75'
  const shieldIcon = 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4'
  const emptyState = (text) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 20px', animation: 'mapFadeUp .4s ease' }}>
      <dotlottie-player src="https://lottie.host/0d569b89-b736-4549-9fab-0848dbf0d213/KO6VQFz4HM.lottie" autoplay loop style={{ width: 160, height: 160 }}></dotlottie-player>
      <span style={{ fontSize: 13, color: 'var(--ink-alt)', textAlign: 'center', maxWidth: 240, lineHeight: 1.5, marginTop: -8 }}>{text}</span>
    </div>
  )
  return (
    <Modal title={'Map accounts \u2014 ' + roleName} desc={'Add accounts from the left, then set each one\u2019s organization unit and access level on the right \u2014 select several to set them at once.'} onClose={onClose} stop={stop} width={1280} footer={<div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
      <span style={{ fontSize: 13, color: 'var(--muted)', marginRight: 'auto', display: 'inline-flex', alignItems: 'center', gap: 10 }}><span><b style={{ color: 'var(--primary)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{assigned.size.toLocaleString()}</b> assigned{(added || removed) ? ' \u00b7 ' + [added ? '+' + added : null, removed ? '\u2212' + removed : null].filter(Boolean).join(', ') : ''}</span>{noAccess > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#92400E', background: '#FFF7E6', border: '1px solid #F0C36B', borderRadius: 999, padding: '2px 9px' }}><Icon d="M12 9v4 M12 17h.01 M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" size={12} sw={2.2} />{noAccess} with no access level</span>}</span>
      <button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Cancel</button>
      <button data-ix="primary" onClick={save} style={S.modalBtnPrimary}>Save accounts</button>
    </div>}>
      <div style={{ display: 'flex', gap: 14, padding: '18px 22px 22px', flexWrap: 'wrap', alignItems: 'stretch' }}>
        <div style={panel('#64748B', 'var(--surface)', 1)}>
          {panelHead('Available accounts', available.length, 'Add all', addAll, usersIcon, '#64748B', 'var(--surface-alt)', unitDd)}
          {searchBox(qa, setQa, 'Search available accounts\u2026')}
          <MapVirtualList items={available} rowHeight={ROW} height={540} renderRow={renderAvail} bg={'var(--surface)'} empty={emptyState((qav || unit !== 'All units') ? 'No available accounts match your filters.' : 'Everyone is already assigned.')} />
        </div>
        <div style={panel('var(--success)', 'var(--green-tint-2)', 1.45, 560)}>
          {panelHead('Assigned to role', assignedList.length, 'Remove all', removeAll, shieldIcon, 'var(--success)', 'var(--green-tint)', assigned.size > 0 ? viewSeg : null, assignedList.length > 0 ? checkbox(allVisibleSel, toggleAllSel, allVisibleSel ? 'Deselect all assigned' : 'Select all assigned') : null)}
          {selLogins.length > 0 ? bulkBar : searchBox(qs, setQs, 'Search assigned accounts\u2026')}
          <MapVirtualList items={assignedList} rowHeight={ROW} height={540} renderRow={renderAssigned} bg={'transparent'} empty={emptyState(qas ? 'No assigned accounts match your search.' : view === 'New' ? 'No newly added accounts yet \u2014 add some from the left.' : view === 'Current' ? 'No current members remain in this role.' : 'No accounts assigned yet \u2014 add some from the left.')} />
        </div>
      </div>
    </Modal>
  )
}
