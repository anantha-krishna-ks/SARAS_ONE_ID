import React, { useState } from 'react'
import { Modal, ModalFooter, Icon, Checkbox, MiniSwitch, SearchIcon } from '../ui'
import { syncEntities } from '../data'
import { syncMono } from '../components/SyncBits'

const SY_TYPE = {
  uuid:     { label:'Identifier',  dot:'#0a4a8c' },
  string:   { label:'Text',        dot:'#94A3B8' },
  enum:     { label:'Option list', dot:'#7C3AED' },
  boolean:  { label:'Yes / No',    dot:'#16A34A' },
  datetime: { label:'Date & time', dot:'#D97706' },
  number:   { label:'Number',      dot:'#0891B2' },
}

export function SyncSubscriptionModal({ app, onClose, stop, onSave, toast }) {
  const [on, setOn] = useState(app.subscribed)
  const [subs, setSubs] = useState(() => JSON.parse(JSON.stringify(app.subs || {})))
  const [active, setActive] = useState(Object.keys(app.subs || {})[0] || syncEntities[0].code)
  const [eq, setEq] = useState('')
  const [cq, setCq] = useState('')
  const [err, setErr] = useState(false)
  const [shake, setShake] = useState(false)
  const ent = syncEntities.find(e => e.code === active)
  const keyCols = (e) => e.cols.filter(c => c.key).map(c => c.name)
  const toggleEntity = (e) => setSubs(s => { const n = { ...s }; if (n[e.code]) delete n[e.code]; else n[e.code] = e.cols.map(c => c.name); return n })
  const toggleCol = (e, c) => setSubs(s => {
    const cur = s[e.code] || keyCols(e)
    const next = cur.includes(c.name) ? cur.filter(x => x !== c.name) : [...cur, c.name]
    return { ...s, [e.code]: e.cols.map(x => x.name).filter(x => next.includes(x)) }
  })
  const setAll = (e, val) => setSubs(s => ({ ...s, [e.code]: val ? e.cols.map(c => c.name) : keyCols(e) }))
  const nEnt = Object.keys(subs).length
  const nCols = Object.values(subs).reduce((a, l) => a + l.length, 0)
  const entSel = subs[ent.code] || []
  const optional = ent.cols.filter(c => !c.key)
  const optSel = optional.filter(c => entSel.includes(c.name)).length
  const eqq = eq.trim().toLowerCase(), cqq = cq.trim().toLowerCase()
  const ents = syncEntities.filter(e => !eqq || (e.name + ' ' + e.code).toLowerCase().includes(eqq))
  const cols = ent.cols.filter(c => !cqq || c.name.includes(cqq))
  const save = () => {
    if (on && nEnt === 0) { setErr(true); setShake(true); return }
    onSave({ ...app, subscribed:on, subs })
    onClose()
    toast(on ? app.name + ' subscribed to ' + nEnt + (nEnt === 1 ? ' entity' : ' entities') + ' · ' + nCols + ' columns.' : app.name + ' unsubscribed. Its selections are kept.', 'success')
  }
  const caps = { fontSize:11.6, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }
  const search = (val, set, ph) => (
    <div style={{ position:'relative', padding:'10px 12px', borderBottom:'1px solid var(--border)' }}>
      <span style={{ position:'absolute', left:24, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'inline-flex' }}><SearchIcon size={15} /></span>
      <input value={val} onChange={(e) => set(e.target.value)} placeholder={ph} aria-label={ph} style={{ width:'100%', height:38, borderRadius:9, border:'1.5px solid #D5DBE4', padding:'0 12px 0 34px', fontFamily:'inherit', fontSize:13.4, color:'var(--ink)', background:'var(--surface)' }} />
    </div>
  )
  return (
    <Modal title={'Subscription — ' + app.name} desc="Choose which SARAS One entities and columns this application receives as change events." onClose={onClose} stop={stop} width={1060} shake={shake} onShakeEnd={() => setShake(false)}
      footer={<><span style={{ marginRight:'auto', alignSelf:'center', fontSize:13, color:'var(--muted)' }}>{on ? <span><b style={{ color:'var(--ink)', fontWeight:600 }}>{nEnt}</b> {nEnt === 1 ? 'entity' : 'entities'} · <b style={{ color:'var(--ink)', fontWeight:600 }}>{nCols}</b> columns</span> : 'Not subscribed — no events will be delivered'}</span><ModalFooter onClose={onClose} onSave={save} save="Save subscription" /></>}>
      <div style={{ padding:'18px 24px 22px', display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', borderRadius:12, border:'1px solid ' + (on ? 'var(--primary)' : 'var(--border)'), background: on ? 'var(--primary-tint-2)' : 'var(--surface)', transition:'background .16s ease,border-color .16s ease' }}>
          <span aria-hidden style={{ width:38, height:38, borderRadius:10, display:'grid', placeItems:'center', flex:'none', background: on ? 'var(--primary)' : 'var(--primary-tint)', color: on ? '#fff' : 'var(--muted)' }}><Icon d="M21 12a9 9 0 0 1-15.5 6.2 M3 12a9 9 0 0 1 15.5-6.2 M21 4v5h-5 M3 20v-5h5" size={18} /></span>
          <span style={{ display:'flex', flexDirection:'column', gap:2, flex:1, minWidth:0 }}>
            <span style={{ fontSize:14, fontWeight:600, color:'var(--ink)' }}>{on ? 'Subscribed' : 'Not subscribed'}</span>
            <span style={{ fontSize:12.4, color:'var(--muted)' }}>{on ? app.name + ' receives outbox events for the entities and columns selected below.' : 'Turn on to start delivering change events to ' + app.name + '.'}</span>
          </span>
          <MiniSwitch on={on} onToggle={() => { setOn(v => !v); setErr(false) }} label={'Subscribe ' + app.name} />
        </div>
        {err && on && nEnt === 0 && <div role="alert" style={{ display:'flex', alignItems:'center', gap:9, padding:'11px 14px', background:'#FDECEC', border:'1px solid #F3C6C6', borderRadius:10, color:'#B42318', fontSize:13, fontWeight:500 }}><Icon d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01" size={17} sw={2.2} />Select at least one entity, or turn the subscription off.</div>}
        <div aria-disabled={!on} style={{ display:'grid', gridTemplateColumns:'minmax(240px, 320px) minmax(0, 1fr)', gap:14, opacity: on ? 1 : .5, pointerEvents: on ? 'auto' : 'none', transition:'opacity .16s ease' }}>
          <div style={{ border:'1px solid var(--border)', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', background:'var(--surface)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 14px', background:'var(--surface-alt)', borderBottom:'1px solid var(--border)' }}>
              <span style={caps}>Entities</span>
              <span style={{ fontSize:12, fontWeight:600, color:'var(--on-tint-blue)', background:'var(--primary-tint)', borderRadius:999, padding:'2px 9px', fontVariantNumeric:'tabular-nums' }}>{nEnt} of {syncEntities.length}</span>
            </div>
            {search(eq, setEq, 'Search entities…')}
            <div role="listbox" aria-label="Entities" style={{ height:380, overflowY:'auto', padding:6, display:'flex', flexDirection:'column', gap:2 }}>
              {ents.map(e => {
                const inc = !!subs[e.code], cur = e.code === active
                return (
                  <div key={e.code} role="option" aria-selected={cur} tabIndex={0} onClick={() => setActive(e.code)} onKeyDown={(k) => { if (k.key === 'Enter') setActive(e.code) }}
                    style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 10px', borderRadius:9, cursor:'pointer', background: cur ? 'var(--primary-tint)' : 'transparent', boxShadow: cur ? 'inset 3px 0 0 var(--primary)' : 'none', transition:'background .14s ease' }}>
                    <Checkbox checked={inc} onChange={() => toggleEntity(e)} />
                    <span style={{ display:'flex', flexDirection:'column', gap:1, flex:1, minWidth:0 }}>
                      <span style={{ fontSize:13.6, fontWeight:600, color:'var(--ink)' }}>{e.name}</span>
                      <span style={{ fontSize:11.4, color:'var(--muted)', fontFamily:syncMono }}>{e.code}</span>
                    </span>
                    <span style={{ fontSize:11.8, fontWeight:600, color: inc ? 'var(--on-tint-blue)' : 'var(--muted)', fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap' }}>{inc ? subs[e.code].length + '/' + e.cols.length : '—'}</span>
                    <Icon d="M9 18l6-6-6-6" size={15} style={{ stroke: cur ? 'var(--primary)' : '#B9C4D4', flex:'none' }} />
                  </div>
                )
              })}
              {ents.length === 0 && <div style={{ padding:'24px 12px', textAlign:'center', fontSize:12.8, color:'var(--muted)' }}>No entities match.</div>}
            </div>
          </div>
          <div style={{ border:'1px solid var(--border)', borderRadius:12, overflow:'hidden', display:'flex', flexDirection:'column', background:'var(--surface)', minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, padding:'9px 14px', background:'var(--surface-alt)', borderBottom:'1px solid var(--border)', flexWrap:'wrap' }}>
              <span style={{ display:'flex', alignItems:'baseline', gap:8, flex:1, minWidth:0 }}>
                <span style={caps}>Columns</span>
                <span style={{ fontSize:13.4, fontWeight:600, color:'var(--ink)' }}>{ent.name}</span>
                <span style={{ fontSize:12, color:'var(--muted)', fontVariantNumeric:'tabular-nums' }}>{entSel.length} of {ent.cols.length} selected</span>
              </span>
              <label style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12.8, fontWeight:600, color:'var(--ink)', cursor:'pointer', height:32 }}>
                <Checkbox checked={!!subs[ent.code] && optSel === optional.length} indeterminate={!!subs[ent.code] && optSel > 0 && optSel < optional.length} onChange={() => setAll(ent, !(subs[ent.code] && optSel === optional.length))} />
                Select all
              </label>
            </div>
            {search(cq, setCq, 'Search columns…')}
            {!subs[ent.code] && <div style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 14px', background:'var(--amber-tint)', color:'var(--warning-text)', fontSize:12.6, fontWeight:500, borderBottom:'1px solid var(--border)' }}><Icon d="M12 8v4 M12 16h.01 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" size={15} />{ent.name} isn’t subscribed. Pick a column to include it.</div>}
            <div style={{ height: subs[ent.code] ? 380 : 343, overflowY:'auto', padding:12, display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px, 1fr))', gap:10, alignContent:'start' }}>
              {cols.map(c => {
                const sel = entSel.includes(c.name) || (c.key && !!subs[ent.code])
                const tm = SY_TYPE[c.type] || SY_TYPE.string
                const text = (
                  <span style={{ display:'flex', flexDirection:'column', gap:4, flex:1, minWidth:0 }}>
                    <span title={c.name} style={{ fontSize:14, fontWeight:600, fontFamily:syncMono, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.name}</span>
                    <span style={{ display:'flex', alignItems:'center', gap:7, fontSize:12.4, color:'#475467', minWidth:0 }}>
                      <span aria-hidden style={{ width:7, height:7, borderRadius:2, background:tm.dot, flex:'none' }}></span>
                      <span style={{ whiteSpace:'nowrap' }}>{tm.label}</span>
                      {c.key && <span style={{ whiteSpace:'nowrap', color:'#0a4a8c', fontWeight:600 }}>· Key, always sent</span>}
                    </span>
                  </span>
                )
                const tile = { display:'flex', alignItems:'center', gap:12, padding:'11px 14px', minHeight:62, borderRadius:10, border:'1px solid ' + (sel ? 'rgba(10,74,140,.16)' : 'transparent'), background: sel ? '#EEF4FC' : '#F6F8FB', transition:'background .14s ease,border-color .14s ease' }
                return c.key ? (
                  <div key={c.name} title="Key column — always sent so subscribers can match records" style={{ ...tile, cursor:'default' }}>
                    <span aria-label="Locked" style={{ width:20, height:20, display:'grid', placeItems:'center', flex:'none', color:'#0a4a8c' }}><Icon d="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4" size={15} sw={2.2} /></span>
                    {text}
                  </div>
                ) : (
                  <label key={c.name} style={{ ...tile, cursor:'pointer' }}>
                    <Checkbox checked={sel} onChange={() => toggleCol(ent, c)} />
                    {text}
                  </label>
                )
              })}
              {cols.length === 0 && <div style={{ gridColumn:'1 / -1', padding:'24px 12px', textAlign:'center', fontSize:12.8, color:'var(--muted)' }}>No columns match.</div>}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
