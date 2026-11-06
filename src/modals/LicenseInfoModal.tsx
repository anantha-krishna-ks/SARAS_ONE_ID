import React, { useState } from 'react'
import { S, Icon, Modal, ModalFooter, Checkbox } from '../ui'
import { privApps } from '../data'

export function LicenseInfoModal({ tenant, onClose, stop, toast }) {
  const DAY = 86400000
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const iso = (d) => { const x = new Date(d); return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0') }
  const addDays = (d, n) => { const x = new Date(typeof d === 'string' ? P(d) : d); x.setDate(x.getDate() + n); return x }
  const addMonths = (d, n) => { const x = new Date(typeof d === 'string' ? P(d) : d); x.setMonth(x.getMonth() + n); return x }
  const fmt = (s) => s ? new Date(P(s)).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '—'
  const GRACE = 30
  const P = (s) => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, m - 1, d).getTime() }
  const seedRows = () => {
    const plan = [[-300, 220], [-200, 18], [-380, -12], [-340, 25], [-120, 245], [-420, -60], null, [-60, 305], [-250, 6]]
    return privApps.map((a, i) => {
      const p = plan[i % plan.length]
      return { name:a.name, code:a.code, icon:a.icon, start: p ? iso(addDays(today, p[0])) : '', end: p ? iso(addDays(today, p[1])) : '' }
    })
  }
  const [rows, setRows] = useState(seedRows)
  const [orig] = useState(() => JSON.stringify(seedRows()))
  const [sel, setSel] = useState([])
  const [filter, setFilter] = useState('all')
  const [period, setPeriod] = useState('12')
  const [customEnd, setCustomEnd] = useState('')
  const [flash, setFlash] = useState([])
  const [edit, setEdit] = useState(null)
  const [hist, setHist] = useState(null)
  const historyOf = (r, idx) => {
    const o = origRows.find(x => x.name === r.name)
    const out = []
    if (r.end && (r.start !== o.start || r.end !== o.end)) out.push({ start: o.end && P(r.start) <= P(o.end) + DAY ? iso(addDays(o.end, 1)) : r.start, end:r.end, type: o.end ? 'Renewal' : 'Assigned', by:'You', on:'Unsaved', tag:'Pending' })
    if (!o.start) return out
    out.push({ start:o.start, end:o.end, type: idx % 3 === 1 ? 'Assigned' : 'Renewal', by: idx % 2 ? 'System (auto-renew)' : 'Anita Kulkarni', on:fmt(iso(addDays(o.start, -6))), tag: P(o.end) < today.getTime() ? 'Expired' : 'Current' })
    const n = idx % 3 === 1 ? 0 : 1 + (idx % 2)
    let s = o.start
    for (let k = 0; k < n; k++) { const e = iso(addDays(s, -1)); const st = iso(addDays(addMonths(e, -12), 1)); out.push({ start:st, end:e, type: k === n - 1 ? 'Assigned' : 'Renewal', by: k % 2 ? 'Anita Kulkarni' : 'Ravi Mohan', on:fmt(iso(addDays(st, -5))), tag:'Past' }); s = st }
    return out
  }
  const statusOf = (r) => {
    if (!r.start || !r.end) return { k:'none', label:'Not licensed', fg:'var(--muted)', bg:'var(--surface-alt)', bd:'var(--border)', note:'No license assigned' }
    if (P(r.end) <= P(r.start)) return { k:'invalid', label:'Check dates', fg:'#B42318', bg:'#FEF2F2', bd:'#F3C2C2', note:'End must be after start' }
    const left = Math.round((P(r.end) - today.getTime()) / DAY)
    if (P(r.start) > today.getTime()) return { k:'active', label:'Scheduled', fg:'var(--on-tint-blue)', bg:'var(--primary-tint)', bd:'var(--border-blue)', note:'Starts ' + fmt(r.start) }
    if (left < -GRACE) return { k:'expired', label:'Expired', fg:'#B42318', bg:'#FEF2F2', bd:'#F3C2C2', note:'Expired ' + Math.abs(left) + ' days ago' }
    if (left < 0) return { k:'grace', label:'In grace', fg:'#B42318', bg:'#FFF4ED', bd:'#F9CDB0', note:(GRACE + left) + ' grace days left' }
    if (left <= 30) return { k:'expiring', label:'Expiring soon', fg:'#B45309', bg:'#FEF3C7', bd:'#F5D68A', note:left + ' days left' }
    return { k:'active', label:'Active', fg:'var(--success-text)', bg:'var(--green-tint)', bd:'#BBE5C8', note:left + ' days left' }
  }
  const withS = rows.map(r => ({ ...r, st:statusOf(r) }))
  const counts = withS.reduce((m, r) => { const k = r.st.k === 'grace' ? 'expired' : r.st.k === 'invalid' ? 'none' : r.st.k; m[k] = (m[k] || 0) + 1; return m }, {})
  const visible = withS.filter(r => filter === 'all' || (filter === 'expired' ? (r.st.k === 'expired' || r.st.k === 'grace') : r.st.k === filter))
  const allOn = visible.length > 0 && visible.every(r => sel.includes(r.name))
  const someOn = !allOn && visible.some(r => sel.includes(r.name))
  const toggle = (n) => setSel(s => s.includes(n) ? s.filter(x => x !== n) : [...s, n])
  const toggleAll = () => setSel(s => allOn ? s.filter(n => !visible.some(r => r.name === n)) : [...s, ...visible.map(r => r.name).filter(n => !s.includes(n))])
  const setField = (n, k) => (e) => { const v = e.target.value; setRows(rs => rs.map(r => r.name === n ? { ...r, [k]:v } : r)) }
  const renewed = (r, months, endOverride) => {
    const base = r.end && P(r.end) >= today.getTime() ? new Date(P(r.end)) : today
    const start = r.end && P(r.end) >= today.getTime() ? r.start : iso(today)
    const end = endOverride || iso(addMonths(base, months))
    return { ...r, start: start || iso(today), end }
  }
  const pulse = (names) => { setFlash(names); setTimeout(() => setFlash([]), 1400) }
  const openRenew = (r) => {
    const live = r.end && P(r.end) >= today.getTime()
    const start = live ? iso(addDays(r.end, 1)) : iso(today)
    setEdit({ name:r.name, start, end:iso(addDays(addMonths(start, 12), -1)), months:12 })
  }
  const preset = (m) => setEdit(x => ({ ...x, months:m, end:iso(addDays(addMonths(x.start, m), -1)) }))
  const editBad = !!edit && (!edit.start || !edit.end || P(edit.end) <= P(edit.start))
  const applyRenew = () => {
    if (!edit || editBad) return
    const e = edit
    setRows(rs => rs.map(r => {
      if (r.name !== e.name) return r
      const contiguous = r.start && r.end && P(r.end) >= today.getTime() && P(e.start) <= P(r.end) + DAY
      return { ...r, start: contiguous ? r.start : e.start, end:e.end }
    }))
    pulse([e.name]); setEdit(null)
    toast && toast(e.name + ' renewed until ' + fmt(e.end) + '.', 'success')
  }
  const customBad = period === 'custom' && (!customEnd || P(customEnd) <= today.getTime())
  const renewSelected = () => {
    if (!sel.length || customBad) return
    setRows(rs => rs.map(r => sel.includes(r.name) ? renewed(r, Number(period), period === 'custom' ? customEnd : null) : r))
    pulse(sel); toast && toast(sel.length + ' application' + (sel.length === 1 ? '' : 's') + ' renewed.', 'success'); setSel([])
  }
  const origRows = JSON.parse(orig)
  const changedList = rows.filter(r => { const o = origRows.find(x => x.name === r.name); return o && (o.start !== r.start || o.end !== r.end) })
  const changed = changedList.length
  const revert = (n) => { const o = origRows.find(x => x.name === n); setRows(rs => rs.map(r => r.name === n ? { ...r, start:o.start, end:o.end } : r)) }
  const nRenewed = changedList.filter(r => origRows.find(x => x.name === r.name).end).length, nAssigned = changed - nRenewed
  const licensed = rows.filter(r => r.start && r.end).length
  const footerSummary = (
    <span style={{ fontSize:13, color:'var(--muted)', marginRight:'auto', display:'inline-flex', alignItems:'center', gap:10 }}><span><b style={{ color:'var(--primary)', fontWeight:700, fontVariantNumeric:'tabular-nums' }}>{licensed}</b> of {rows.length} licensed{changed ? ' \u00b7 ' + [nRenewed ? nRenewed + ' renewed' : null, nAssigned ? nAssigned + ' assigned' : null].filter(Boolean).join(', ') : ''}</span></span>
  )
  const invalid = withS.some(r => r.st.k === 'invalid' || (!!r.start !== !!r.end))
  const save = () => { if (invalid) { toast && toast('Fix the highlighted dates before saving.', 'error'); return } onClose(); toast && toast('License updated for ' + tenant.name + (changed ? ' (' + changed + ' application' + (changed === 1 ? '' : 's') + ').' : '.'), 'success') }
  const chip = (k, label, n, dot) => {
    const on = filter === k
    return <button key={k} type="button" aria-pressed={on} onClick={() => setFilter(k)} style={{ display:'inline-flex', alignItems:'center', gap:7, height:32, padding:'0 12px', borderRadius:999, border:'1px solid ' + (on ? 'var(--primary)' : 'var(--border)'), background: on ? 'var(--primary-tint)' : 'var(--surface)', color: on ? 'var(--on-tint-blue)' : 'var(--ink)', font:'inherit', fontSize:12.6, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}>
      {dot && <span aria-hidden style={{ width:7, height:7, borderRadius:999, background:dot }} />}{label}<span style={{ fontVariantNumeric:'tabular-nums', color: on ? 'var(--on-tint-blue)' : 'var(--muted)', fontWeight:600 }}>{n || 0}</span>
    </button>
  }
  const dateInput = (r, k) => {
    const bad = (r.st.k === 'invalid' && k === 'end') || (!!r.start !== !!r.end && !r[k])
    return <input type="date" aria-label={(k === 'start' ? 'Start date for ' : 'End date for ') + r.name} value={r[k]} min={k === 'end' && r.start ? r.start : undefined} onChange={setField(r.name, k)} style={{ ...S.input, height:36, fontSize:12.8, padding:'0 10px', width:'100%', minWidth:0, ...(bad ? { borderColor:'var(--danger)', background:'#FEF7F7' } : {}) }} />
  }
  const th = { fontSize:11.5, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', color:'#0a4a8c', padding:'11px 12px', textAlign:'left', whiteSpace:'nowrap' }
  const cols = '44px minmax(200px,1.6fr) minmax(130px,1fr) minmax(130px,1fr) minmax(160px,1.1fr) 150px'
  return (
    <Modal title={'License info — ' + tenant.name} desc="Assign, review and renew licenses for each application." onClose={onClose} stop={stop} width={1080}
      footer={<React.Fragment>{footerSummary}<ModalFooter onClose={onClose} onSave={save} save={changed ? 'Save changes (' + changed + ')' : 'Save changes'} /></React.Fragment>}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:14 }}>
        <div role="group" aria-label="Filter by status" style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {chip('all', 'All applications', withS.length)}
          {chip('active', 'Active', counts.active, '#16A34A')}
          {chip('expiring', 'Expiring soon', counts.expiring, '#F59E0B')}
          {chip('expired', 'Expired / in grace', counts.expired, '#DC2626')}
          {chip('none', 'Not licensed', counts.none, '#94A3B8')}
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:10, minHeight:52, padding:'8px 12px 8px 14px', borderRadius:12, background: sel.length ? 'var(--primary-tint)' : 'var(--surface-alt)', border:'1px solid ' + (sel.length ? 'var(--border-blue)' : 'var(--border)'), transition:'background .15s ease' }}>
          <span style={{ fontSize:13, fontWeight:600, color: sel.length ? 'var(--on-tint-blue)' : 'var(--muted)', marginRight:'auto' }}>{sel.length ? sel.length + ' selected' : 'Select applications to renew them together'}</span>
          <label style={{ fontSize:12.6, color:'var(--ink)', fontWeight:500 }} htmlFor="lic-period">Renew for</label>
          <select id="lic-period" value={period} onChange={(e) => setPeriod(e.target.value)} disabled={!sel.length} style={{ ...S.input, height:36, width:'auto', fontSize:12.8, padding:'0 10px' }}>
            <option value="3">3 months</option><option value="6">6 months</option><option value="12">1 year</option><option value="24">2 years</option><option value="custom">Custom end date</option>
          </select>
          {period === 'custom' && <input type="date" aria-label="Custom end date" value={customEnd} min={iso(addDays(today, 1))} onChange={(e) => setCustomEnd(e.target.value)} disabled={!sel.length} style={{ ...S.input, height:36, width:'auto', fontSize:12.8, padding:'0 10px' }} />}
          <button type="button" data-ix="primary" disabled={!sel.length || customBad} onClick={renewSelected} style={{ ...S.modalBtnPrimary, height:36, padding:'0 16px', fontSize:13, display:'inline-flex', alignItems:'center', gap:7, opacity: (!sel.length || customBad) ? .5 : 1, cursor: (!sel.length || customBad) ? 'not-allowed' : 'pointer', whiteSpace:'nowrap' }}>
            <Icon d="M23 4v6h-6 M20.49 15a9 9 0 1 1-2.12-9.36L23 10" size={14} sw={2.2} />{sel.length > 1 ? 'Renew ' + sel.length + ' applications' : 'Renew selected'}
          </button>
        </div>
        <div style={{ border:'1px solid var(--border)', borderRadius:12, overflow:'auto' }}>
          <div style={{ minWidth:880 }}>
            <div style={{ display:'grid', gridTemplateColumns:cols, alignItems:'center', background:'#EAF3FF', borderBottom:'1px solid var(--border-blue)' }}>
              <span style={{ ...th, display:'flex', justifyContent:'center' }}><span role="checkbox" aria-checked={allOn ? 'true' : someOn ? 'mixed' : 'false'} aria-label="Select all applications" tabIndex={0} onClick={toggleAll} onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); toggleAll() } }} style={{ display:'flex', cursor:'pointer' }}><span style={{ display:'flex', pointerEvents:'none' }}><Checkbox checked={allOn} indeterminate={someOn} /></span></span></span>
              <span style={th}>Application</span><span style={th}>Start date</span><span style={th}>End date</span><span style={th}>Status</span><span style={{ ...th, textAlign:'right' }}>Action</span>
            </div>
            {visible.length === 0 && <div style={{ padding:'28px 16px', textAlign:'center', fontSize:13, color:'var(--muted)' }}>No applications match this status.</div>}
            {visible.map((r, i) => {
              const on = sel.includes(r.name), fl = flash.includes(r.name), open = !!edit && edit.name === r.name, done = changedList.some(c => c.name === r.name), hOpen = hist === r.name
              return (
                <React.Fragment key={r.name}>
                <div data-ix="row" style={{ display:'grid', gridTemplateColumns:cols, alignItems:'center', borderBottom: (i < visible.length - 1 || open || hOpen) ? '1px solid var(--border)' : 'none', background: fl ? 'var(--green-tint)' : (on || open || hOpen) ? 'var(--primary-tint-2)' : 'var(--surface)', transition:'background .4s ease' }}>
                  <span style={{ display:'flex', justifyContent:'center' }}><span role="checkbox" aria-checked={on} aria-label={'Select ' + r.name} tabIndex={0} onClick={() => toggle(r.name)} onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); toggle(r.name) } }} style={{ display:'flex', cursor:'pointer' }}><span style={{ display:'flex', pointerEvents:'none' }}><Checkbox checked={on} /></span></span></span>
                  <span style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', minWidth:0 }}>
                    <span aria-hidden style={{ flex:'none', width:32, height:32, borderRadius:9, display:'inline-flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(155deg, var(--primary-tint), var(--primary-tint-2))', border:'1px solid var(--border-blue)', color:'var(--on-tint-blue)' }}>{r.icon && <Icon d={r.icon} size={16} />}</span>
                    <span style={{ minWidth:0, display:'flex', flexDirection:'column' }}>
                      <span style={{ fontSize:13.4, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{r.name}</span>
                      <span style={{ fontSize:11.8, color:'var(--muted)' }}>{r.code}</span>
                    </span>
                  </span>
                  <span style={{ padding:'10px 12px', fontSize:13, color: r.start ? 'var(--ink)' : 'var(--muted)', fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap' }}>{fmt(r.start)}</span>
                  <span style={{ padding:'10px 12px', fontSize:13, color: r.end ? 'var(--ink)' : 'var(--muted)', fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap' }}>{fmt(r.end)}</span>
                  <span style={{ padding:'10px 12px', display:'flex', flexDirection:'column', alignItems:'flex-start', gap:3 }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'2px 10px', borderRadius:999, background:r.st.bg, border:'1px solid ' + r.st.bd, color:r.st.fg, fontSize:11.8, fontWeight:600, whiteSpace:'nowrap' }}><span aria-hidden style={{ width:6, height:6, borderRadius:999, background:'currentColor' }} />{r.st.label}</span>
                    <span style={{ fontSize:11.6, color:'var(--muted)', whiteSpace:'nowrap' }}>{r.st.note}</span>
                  </span>
                  <span style={{ padding:'10px 12px', display:'flex', justifyContent:'flex-end', gap:6 }}>
                    <button type="button" data-ix="ghost" aria-expanded={hOpen} aria-label={'License history for ' + r.name} title="License history" onMouseDown={(e) => e.preventDefault()} onClick={() => { setEdit(null); setHist(hOpen ? null : r.name) }} style={{ ...S.ghost, height:32, width:32, padding:0, justifyContent:'center', border:'1px solid ' + (hOpen ? 'var(--primary)' : 'var(--border-blue)'), background: hOpen ? 'var(--primary-tint)' : 'var(--surface)', color: hOpen ? 'var(--on-tint-blue)' : 'var(--ink)' }}><Icon d="M3 12a9 9 0 1 0 3-6.7L3 8 M3 3v5h5 M12 7v5l3 2" size={14} sw={2.1} /></button>
                    <button type="button" data-ix="ghost" aria-expanded={open} onMouseDown={(e) => e.preventDefault()} onClick={() => { setHist(null); open ? setEdit(null) : openRenew(r) }} title={done && !open ? 'Renewed — click to change the dates' : undefined} style={{ ...S.ghost, border:'1px solid ' + (open ? 'var(--primary)' : done ? '#86CFA0' : 'var(--border-blue)'), background: open ? 'var(--primary-tint)' : done ? 'var(--green-tint)' : 'var(--surface)', color: open ? 'var(--on-tint-blue)' : done ? 'var(--success-text)' : 'var(--ink)', height:32, padding:'0 12px', fontSize:12.6, whiteSpace:'nowrap', display:'inline-flex', alignItems:'center', gap:6 }}><Icon d={done && !open ? 'M20 6L9 17l-5-5' : r.st.k === 'none' ? 'M12 5v14 M5 12h14' : 'M23 4v6h-6 M20.49 15a9 9 0 1 1-2.12-9.36L23 10'} size={13} sw={done && !open ? 2.6 : 2.2} />{done && !open ? (origRows.find(x => x.name === r.name).end ? 'Renewed' : 'Assigned') : r.st.k === 'none' ? 'Assign' : 'Renew'}</button>
                  </span>
                </div>
                {open && <div role="region" aria-label={'Renew ' + r.name} style={{ padding:'14px 16px 16px 56px', background:'var(--primary-tint-2)', borderBottom: i < visible.length - 1 ? '1px solid var(--border)' : 'none', display:'flex', flexDirection:'column', gap:12, animation:'popIn .14s ease' }}>
                  <div style={{ display:'flex', flexWrap:'wrap', alignItems:'baseline', gap:'4px 10px' }}>
                    <span style={{ fontSize:13.4, fontWeight:600, color:'var(--ink)' }}>{r.st.k === 'none' ? 'Assign license' : 'Renew license'}</span>
                    <span style={{ fontSize:12.2, color:'var(--muted)' }}>{r.start ? 'Current: ' + fmt(r.start) + ' – ' + fmt(r.end) : 'No license assigned yet'}</span>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', alignItems:'flex-end', gap:12 }}>
                    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                      <label htmlFor={'rn-s-' + i} style={{ fontSize:12, fontWeight:600, color:'var(--ink)' }}>New start date</label>
                      <input id={'rn-s-' + i} type="date" value={edit.start} onChange={(e) => { const v = e.target.value; setEdit(x => ({ ...x, start:v, end: v && x.months ? iso(addDays(addMonths(v, x.months), -1)) : x.end })) }} style={{ ...S.input, height:38, width:170, fontSize:13, padding:'0 10px' }} />
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                      <label htmlFor={'rn-e-' + i} style={{ fontSize:12, fontWeight:600, color:'var(--ink)' }}>New end date</label>
                      <input id={'rn-e-' + i} type="date" value={edit.end} min={edit.start || undefined} onChange={(e) => { const v = e.target.value; setEdit(x => ({ ...x, end:v, months:null })) }} style={{ ...S.input, height:38, width:170, fontSize:13, padding:'0 10px', ...(editBad ? { borderColor:'var(--danger)', background:'#FEF7F7' } : {}) }} />
                    </div>
                    <div role="group" aria-label="Duration" style={{ display:'flex', flexWrap:'wrap', gap:6, paddingBottom:3 }}>
                      {[[3, '3 mo'], [6, '6 mo'], [12, '1 yr'], [24, '2 yr']].map(([m, l]) => (
                        <button key={m} type="button" aria-pressed={edit.months === m} onClick={() => preset(m)} style={{ height:32, padding:'0 11px', borderRadius:999, border:'1px solid ' + (edit.months === m ? 'var(--primary)' : 'var(--border)'), background: edit.months === m ? 'var(--primary)' : 'var(--surface)', color: edit.months === m ? '#fff' : 'var(--ink)', font:'inherit', fontSize:12.4, fontWeight:600, cursor:'pointer' }}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:12.4, color: editBad ? '#B42318' : 'var(--muted)', marginRight:'auto' }}>{editBad ? 'End date must be after the start date.' : Math.round((P(edit.end) - P(edit.start)) / DAY + 1) + ' days · valid ' + fmt(edit.start) + ' – ' + fmt(edit.end)}</span>
                    <button type="button" data-ix="ghost" onClick={() => setEdit(null)} style={{ ...S.ghost, height:36, padding:'0 14px', fontSize:13 }}>Cancel</button>
                    <button type="button" data-ix="primary" disabled={editBad} onClick={applyRenew} style={{ ...S.modalBtnPrimary, height:36, padding:'0 16px', fontSize:13, display:'inline-flex', alignItems:'center', gap:7, opacity: editBad ? .5 : 1, cursor: editBad ? 'not-allowed' : 'pointer' }}><Icon d="M20 6L9 17l-5-5" size={14} sw={2.4} />{r.st.k === 'none' ? 'Assign' : 'Apply renewal'}</button>
                  </div>
                </div>}
                {hOpen && (() => { const hl = historyOf(r, privApps.findIndex(a => a.name === r.name)); return (
                <div role="region" aria-label={'License history for ' + r.name} style={{ padding:'12px 16px 14px 56px', background:'var(--primary-tint-2)', borderBottom: i < visible.length - 1 ? '1px solid var(--border)' : 'none', display:'flex', flexDirection:'column', gap:10, animation:'popIn .14s ease' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <span style={{ fontSize:13.4, fontWeight:600, color:'var(--ink)' }}>License history</span>
                    <span style={{ fontSize:12.2, color:'var(--muted)' }}>{hl.length ? hl.length + ' period' + (hl.length === 1 ? '' : 's') + ', newest first' : ''}</span>
                    <button type="button" aria-label="Close history" onClick={() => setHist(null)} style={{ marginLeft:'auto', width:26, height:26, borderRadius:7, border:'none', background:'transparent', color:'var(--muted)', display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><Icon d="M18 6L6 18 M6 6l12 12" size={14} sw={2.2} /></button>
                  </div>
                  {hl.length === 0 ? <div style={{ fontSize:12.6, color:'var(--muted)', padding:'4px 0' }}>No licenses have been issued for this application yet.</div> : (
                  <div style={{ border:'1px solid var(--border)', borderRadius:10, overflow:'hidden', background:'var(--surface)' }}>
                    <div style={{ display:'grid', gridTemplateColumns:'minmax(210px,1.6fr) 90px 110px minmax(150px,1fr) 110px 92px', background:'var(--surface-alt)', borderBottom:'1px solid var(--border)' }}>
                      {['Period', 'Duration', 'Type', 'By', 'Issued on', 'Status'].map(h => <span key={h} style={{ padding:'7px 12px', fontSize:11, fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)', whiteSpace:'nowrap' }}>{h}</span>)}
                    </div>
                    {hl.map((e, k) => {
                      const tone = e.tag === 'Pending' ? ['var(--on-tint-blue)', 'var(--primary-tint)'] : e.tag === 'Current' ? ['var(--success-text)', 'var(--green-tint)'] : e.tag === 'Expired' ? ['#B42318', '#FEF2F2'] : ['var(--muted)', 'var(--surface-alt)']
                      return (
                        <div key={k} style={{ display:'grid', gridTemplateColumns:'minmax(210px,1.6fr) 90px 110px minmax(150px,1fr) 110px 92px', alignItems:'center', borderTop: k ? '1px solid var(--border)' : 'none', fontSize:12.6, color:'var(--ink)' }}>
                          <span style={{ padding:'8px 12px', fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap', fontWeight: k === 0 ? 600 : 400 }}>{fmt(e.start)} – {fmt(e.end)}</span>
                          <span style={{ padding:'8px 12px', color:'var(--muted)', fontVariantNumeric:'tabular-nums' }}>{Math.round((P(e.end) - P(e.start)) / DAY + 1)} days</span>
                          <span style={{ padding:'8px 12px' }}>{e.type}</span>
                          <span style={{ padding:'8px 12px', color:'var(--muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{e.by}</span>
                          <span style={{ padding:'8px 12px', color:'var(--muted)', fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap' }}>{e.on}</span>
                          <span style={{ padding:'8px 12px' }}><span style={{ fontSize:11, fontWeight:600, color:tone[0], background:tone[1], borderRadius:999, padding:'2px 8px' }}>{e.tag}</span></span>
                        </div>
                      )
                    })}
                  </div>)}
                </div>) })()}
                </React.Fragment>
              )
            })}
          </div>
        </div>
        <div style={{ fontSize:12, color:'var(--muted)', lineHeight:1.5 }}>Renew extends from the current end date, or from today if already expired. Use a row's <b style={{ fontWeight:600 }}>Renew</b> to set custom dates. Sign-in continues for {GRACE} days after expiry (grace period).</div>
      </div>
    </Modal>
  )
}

