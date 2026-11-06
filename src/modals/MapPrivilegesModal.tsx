import React, { useState } from 'react'
import { Modal, S, Icon, SearchIcon } from '../ui'
import { privApps, flattenPrivKeys } from '../data'

export function MapPermsModal({ onClose, stop, toast, roleName }) {
  const [sel, setSel] = useState(() => new Set(['tnt.view','acc.view','rol.view','rol.mappriv']))
  const [active, setActive] = useState(0)
  const [q, setQ] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [shake, setShake] = useState(false)

  const allLeaves = privApps.flatMap(flattenPrivKeys)
  const total = allLeaves.length
  const count = sel.size
  const valid = count > 0

  const setKeys = (keys, on) => setSel(s => { const n = new Set(s); keys.forEach(k => on ? n.add(k) : n.delete(k)); return n })
  const toggleLeaf = (k) => setSel(s => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n })
  const appOn = (app) => flattenPrivKeys(app).filter(k => sel.has(k)).length
  const stateOf = (keys) => { const on = keys.filter(k => sel.has(k)).length; return on === 0 ? 'none' : on === keys.length ? 'all' : 'some' }

  const grantAll = () => setSel(new Set(allLeaves))
  const revokeAll = () => setSel(new Set())
  const save = () => { if (valid) { onClose(); toast(`${count} privileges saved to ${roleName || 'role'}.`, 'success') } else { setSubmitted(true); setShake(true) } }

  const query = q.trim().toLowerCase()
  const shownApps = privApps.map((a, i) => ({ a, i })).filter(({ a }) => !query || a.name.toLowerCase().includes(query) || a.nodes.some(n => n.name.toLowerCase().includes(query) || (n.group && n.perms.some(p => p.name.toLowerCase().includes(query)))))
  const app = privApps[active]
  const appLeaves = flattenPrivKeys(app)
  const appCount = appOn(app)
  const appPct = Math.round(appCount / appLeaves.length * 100)
  const cats = []
  const direct = app.nodes.filter(n => !n.group)
  if (direct.length) cats.push({ id:'general', name:'General', perms: direct.map(n => ({ k:n.k, name:n.name, desc:n.desc })) })
  app.nodes.filter(n => n.group).forEach(n => cats.push({ id:n.k, name:n.name, perms:n.perms }))

  const Check = ({ on, onClick, label }) => (
    <button type="button" role="checkbox" aria-checked={on} aria-label={label} onClick={onClick} data-ix="chk"
      style={{ flex:'none', width:22, height:22, borderRadius:7, border:'1.5px solid ' + (on ? 'var(--primary)' : '#C4CDD9'), background: on ? 'var(--primary)' : 'var(--surface)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', padding:0, transition:'background .13s ease,border-color .13s ease' }}>
      {on && <Icon d="M20 6L9 17l-5-5" size={14} sw={3} />}
    </button>
  )

  return (
    <Modal title="Module permissions" desc={`Grant application privileges to ${roleName || 'this role'}.`} onClose={onClose} stop={stop} width={1320} shake={shake} onShakeEnd={() => setShake(false)}
      footer={<div style={{ display:'flex', alignItems:'center', gap:12, width:'100%' }}>
        <span style={{ fontSize:13, color:'var(--muted)', marginRight:'auto' }}><b style={{ color:'var(--primary)', fontWeight:700, fontVariantNumeric:'tabular-nums' }}>{count}</b> of {total} privileges granted</span>
        <button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Cancel</button>
        <button data-ix="primary" onClick={save} style={S.modalBtnPrimary}>Save privileges</button>
      </div>}>
      <div style={{ display:'flex', alignItems:'center', gap:16, padding:'13px 24px', borderBottom:'1px solid var(--border)', background:'var(--surface-alt)', flexWrap:'wrap' }}>
        <span style={{ fontSize:13, color:'var(--muted)' }}><b style={{ color:'var(--ink)', fontWeight:700, fontVariantNumeric:'tabular-nums' }}>{count}</b> of {total} granted across {privApps.length} applications</span>
        <div style={{ display:'flex', gap:6, marginLeft:'auto' }}>
          <button data-ix="lnk" onClick={grantAll} style={{ background:'none', border:'none', font:'inherit', fontSize:13, fontWeight:600, color:'var(--primary)', cursor:'pointer', padding:'6px 8px', borderRadius:8 }}>Grant all</button>
          <button data-ix="lnk" onClick={revokeAll} style={{ background:'none', border:'none', font:'inherit', fontSize:13, fontWeight:600, color:'var(--muted)', cursor:'pointer', padding:'6px 8px', borderRadius:8 }}>Revoke all</button>
        </div>
      </div>
      {submitted && !valid && <div role="alert" style={{ margin:'14px 24px 0', display:'flex', alignItems:'center', gap:9, padding:'11px 14px', background:'#FDECEC', border:'1px solid #F3C6C6', borderRadius:10, color:'#B42318', fontSize:13, fontWeight:500 }}><Icon d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01" size={17} sw={2.2} />Select at least one privilege to continue.</div>}
      <div style={{ display:'grid', gridTemplateColumns:'344px 1fr', height:'72vh', minHeight:560 }}>
        <div style={{ borderRight:'1px solid var(--border)', display:'flex', flexDirection:'column', background:'var(--surface-alt)', minHeight:0 }}>
          <div style={{ padding:'16px 16px 10px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
              <span style={{ fontSize:11.5, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--muted)' }}>Applications</span>
              <span style={{ fontSize:11.5, fontWeight:700, color:'var(--on-tint-blue)', background:'var(--primary-tint)', borderRadius:999, padding:'2px 9px' }}>{privApps.length}</span>
            </div>
            <div style={{ position:'relative' }}>
              <span aria-hidden style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'flex' }}><SearchIcon size={15} /></span>
              <input aria-label="Search applications" type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search applications…" style={{ ...S.input, height:38, fontSize:13.2, padding:'0 12px 0 35px' }} />
            </div>
          </div>
          <div style={{ overflowY:'auto', padding:'2px 10px 12px', display:'flex', flexDirection:'column', gap:4 }}>
            {shownApps.map(({ a, i }) => {
              const on = appOn(a), lv = flattenPrivKeys(a), pct = Math.round(on / lv.length * 100)
              const isActive = i === active
              return (
                <button key={a.code} data-ix="approw" aria-pressed={isActive} onClick={() => setActive(i)}
                  style={{ position:'relative', display:'flex', alignItems:'center', gap:13, textAlign:'left', width:'100%', padding:'13px 14px', borderRadius:13, cursor:'pointer', font:'inherit',
                    border:'1px solid ' + (isActive ? 'var(--primary)' : 'transparent'),
                    background: isActive ? 'var(--primary-tint)' : 'transparent', boxShadow: isActive ? '0 4px 12px -4px rgba(10,74,140,.28)' : 'none' }}>
                  {isActive && <span aria-hidden style={{ position:'absolute', left:0, top:9, bottom:9, width:4, borderRadius:'0 4px 4px 0', background:'var(--primary)' }} />}
                  <span aria-hidden style={{ flex:'none', width:40, height:40, borderRadius:11, background: isActive ? 'var(--primary)' : 'var(--surface)', color: isActive ? '#fff' : 'var(--on-tint-blue)', border: isActive ? 'none' : '1px solid var(--border-blue)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon d={a.icon} size={19} /></span>
                  <span style={{ flex:1, minWidth:0 }}>
                    <span style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                      <span style={{ fontSize:13.6, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.name}</span>
                      <span style={{ fontSize:11.2, fontWeight:700, fontVariantNumeric:'tabular-nums', flex:'none', color: on > 0 ? 'var(--on-tint-blue)' : 'var(--muted)', background: on > 0 ? 'var(--primary-tint)' : 'var(--border)', borderRadius:999, padding:'1px 8px' }}>{on}/{lv.length}</span>
                    </span>
                    <span aria-hidden style={{ display:'block', height:5, marginTop:9, borderRadius:999, background:'var(--border)', overflow:'hidden' }}>
                      <span style={{ display:'block', height:'100%', width: pct + '%', borderRadius:999, background: on > 0 ? 'var(--primary)' : 'transparent', transition:'width .2s ease' }} />
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', minWidth:0, minHeight:0 }}>
          <div style={{ padding:'22px 26px', borderBottom:'1px solid var(--border)', flex:'none' }}>
            <div style={{ display:'flex', alignItems:'center', gap:14 }}>
              <span aria-hidden style={{ flex:'none', width:46, height:46, borderRadius:12, background:'var(--primary-tint)', border:'1px solid var(--border-blue)', color:'var(--on-tint-blue)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon d={app.icon} size={23} /></span>
              <div style={{ flex:1, minWidth:0 }}>
                <h3 style={{ fontSize:17, fontWeight:600, color:'var(--ink)', margin:0 }}>{app.name}</h3>
                <p style={{ fontSize:12.6, color:'var(--muted)', margin:'3px 0 0' }}>{app.nodes.length} categories · {appLeaves.length} privileges</p>
              </div>
              <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', flex:'none' }}>
                <span style={{ fontSize:13, fontWeight:600, color: appCount > 0 ? 'var(--primary)' : 'var(--muted)' }}>{appCount > 0 ? 'Enabled' : 'Disabled'}</span>
                <button type="button" role="switch" aria-checked={appCount > 0} aria-label={'Toggle all privileges in ' + app.name} onClick={() => setKeys(appLeaves, appCount === 0)}
                  style={{ flex:'none', width:46, height:26, borderRadius:999, border:'none', padding:3, background: appCount > 0 ? 'var(--primary)' : '#C4CDD9', cursor:'pointer', display:'inline-flex', justifyContent: appCount > 0 ? 'flex-end' : 'flex-start', transition:'background .16s ease' }}>
                  <span style={{ width:20, height:20, borderRadius:'50%', background:'#fff', boxShadow:'0 1px 2px rgba(0,0,0,.25)' }} />
                </button>
              </label>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:16 }}>
              <div aria-hidden style={{ flex:1, height:8, borderRadius:999, background:'var(--surface-alt)', overflow:'hidden', boxShadow:'inset 0 0 0 1px var(--border)' }}>
                <div style={{ height:'100%', width: appPct + '%', borderRadius:999, background:'var(--primary)', transition:'width .2s ease' }} />
              </div>
              <span style={{ fontSize:12.6, color:'var(--muted)', fontVariantNumeric:'tabular-nums', flex:'none' }}><b style={{ color:'var(--ink)', fontWeight:700 }}>{appCount}</b> of {appLeaves.length} permissions</span>
            </div>
          </div>
          <div style={{ padding:'8px 26px 22px', overflowY:'auto', flex:1, minHeight:0 }}>
            {cats.map(cat => {
              const keys = cat.perms.map(p => p.k)
              const on = keys.filter(k => sel.has(k)).length
              const st = stateOf(keys)
              return (
                <div key={cat.id} style={{ padding:'16px 0', borderBottom:'1px solid var(--border)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
                    <h4 style={{ fontSize:13.6, fontWeight:600, color:'var(--ink)', margin:0 }}>{cat.name}</h4>
                    <span style={{ fontSize:11.4, fontWeight:700, fontVariantNumeric:'tabular-nums', color: st === 'all' ? 'var(--success)' : on > 0 ? 'var(--on-tint-blue)' : 'var(--muted)', background: st === 'all' ? 'var(--green-tint)' : on > 0 ? 'var(--primary-tint)' : 'var(--surface-alt)', borderRadius:999, padding:'2px 9px' }}>{on}/{keys.length}</span>
                    <button data-ix="lnk" onClick={() => setKeys(keys, st !== 'all')} style={{ marginLeft:'auto', background:'none', border:'none', font:'inherit', fontSize:12.4, fontWeight:600, color: st === 'all' ? 'var(--muted)' : 'var(--primary)', cursor:'pointer', padding:'4px 6px', borderRadius:7 }}>{st === 'all' ? 'Deselect all' : 'Select all'}</button>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:12 }}>
                    {cat.perms.map(p => {
                      const isOn = sel.has(p.k)
                      return (
                        <label key={p.k} data-ix="prow" style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'12px 13px', borderRadius:11, cursor:'pointer', border:'1px solid ' + (isOn ? 'var(--border-blue)' : 'var(--border)'), background: isOn ? 'var(--primary-tint)' : 'var(--surface)', transition:'background .13s ease,border-color .13s ease' }}>
                          <Check on={isOn} onClick={() => toggleLeaf(p.k)} label={p.name} />
                          <span style={{ display:'flex', flexDirection:'column', gap:3, minWidth:0 }}>
                            <span style={{ fontSize:13.4, fontWeight:600, color:'var(--ink)', lineHeight:1.3 }}>{p.name}</span>
                            {p.desc && <span style={{ fontSize:11.8, color:'var(--muted)', lineHeight:1.45, textWrap:'pretty' }}>{p.desc}</span>}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Modal>
  )
}
