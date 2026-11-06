import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Modal, ModalFooter, Icon, Checkbox, Radio, Dropdown } from '../ui'
import { roles, orgTree } from '../data'
import { RoleOrgNode } from './RoleModal'

export function MapRolesModal({ onClose, stop, toast }) {
  const [sel, setSel] = useState(() => new Set(roles.slice(0, 2).map(r => r.code)))
  const [def, setDef] = useState(roles[0].code)
  const [tip, setTip] = useState(null)
  const showTip = (code, el) => { const rect = el.getBoundingClientRect(); setTip({ code, rect, up: rect.bottom + 120 > window.innerHeight }) }
  const [scopes, setScopes] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [shake, setShake] = useState(false)
  const valid = sel.size > 0
  const toggle = (code) => { const n = new Set(sel); n.has(code) ? n.delete(code) : n.add(code); setSel(n); if (!n.has(def)) setDef((roles.find(r => n.has(r.code)) || { code:'' }).code) }
  const makeDefault = (e, code) => { e.preventDefault(); e.stopPropagation(); setDef(code) }
  const defName = (roles.find(r => r.code === def) || {}).name
  const setScope = (code, patch) => setScopes(sc => ({ ...sc, [code]: { orgUnit:'', accessLevel:'None', alOpen:false, ...(sc[code] || {}), ...patch } }))
  const save = () => { if (valid) { onClose(); toast('Roles mapped — ' + defName + ' is the default role.', 'success') } else { setSubmitted(true); setShake(true) } }
  return (
    <Modal title="Map roles — Sara Fernandes" desc="Select the roles this user should hold, with organization and access level for each. One selected role is the default — the role they land in after sign-in." onClose={onClose} stop={stop} width={860} shake={shake} onShakeEnd={() => setShake(false)} footer={<ModalFooter onClose={onClose} onSave={save} save="Save roles" />}>
      <div style={{ padding:'20px 24px', display:'flex', flexDirection:'column', gap:10 }}>
        {submitted && !valid && <div role="alert" style={{ display:'flex', alignItems:'center', gap:9, padding:'11px 14px', background:'#FDECEC', border:'1px solid #F3C6C6', borderRadius:10, color:'#B42318', fontSize:13, fontWeight:500 }}><Icon d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01" size={17} sw={2.2} />Select at least one role to continue.</div>}
        {roles.map((r) => {
          const on = sel.has(r.code)
          const isDef = on && def === r.code
          const sc = scopes[r.code] || { orgUnit:'', accessLevel:'None', alOpen:false }
          return (
          <div key={r.code} style={{ position:'relative', border:'1px solid ' + (on ? 'var(--primary)' : 'var(--border)'), background: on ? 'var(--primary-tint-2)' : 'var(--surface)', boxShadow: isDef ? '0 0 0 1px var(--primary), 0 4px 14px rgba(10,74,140,.10)' : 'none', borderRadius:10, transition:'border-color .14s ease,background .14s ease,box-shadow .14s ease' }}>
            <label style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', cursor:'pointer' }}>
              <Checkbox checked={on} onChange={() => toggle(r.code)} />
              <span style={{ display:'flex', flexDirection:'column', gap:2, flex:1, minWidth:0 }}>
                <span style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                  <span style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>{r.name}</span>
                  <span aria-hidden style={{ fontSize:11.5, fontWeight:600, color:'var(--on-tint-blue)', background:'var(--primary-tint)', borderRadius:999, padding:'1px 8px' }}>{r.code}</span>
                </span>
                <span style={{ fontSize:12, color:'var(--muted)' }}>{r.desc}</span>
              </span>
              {on && (
                <span style={{ position:'relative', flex:'none', display:'inline-flex' }}>
                  <button type="button" role="radio" onClick={(e) => makeDefault(e, r.code)} aria-checked={isDef} aria-label={isDef ? r.name + ' is the default role' : 'Set ' + r.name + ' as the default role'} aria-describedby={'deftip-' + r.code} onMouseEnter={(e) => showTip(r.code, e.currentTarget)} onMouseLeave={() => setTip(null)} onFocus={(e) => showTip(r.code, e.currentTarget)} onBlur={() => setTip(null)}
                    style={{ flex:'none', height:34, display:'inline-flex', alignItems:'center', gap:8, padding:'0 14px 0 10px', borderRadius:999, fontFamily:'inherit', fontSize:12.8, fontWeight:600, cursor: isDef ? 'default' : 'pointer', whiteSpace:'nowrap', transition:'background .14s ease,color .14s ease,border-color .14s ease',
                      border:'1.5px solid ' + (isDef ? 'var(--primary)' : 'rgba(10,74,140,.35)'), background: isDef ? 'var(--primary)' : 'var(--surface)', color: isDef ? '#fff' : 'var(--ink)' }}>
                    <Radio checked={isDef} size={18} soft={isDef ? 'rgba(255,255,255,.28)' : undefined} />
                    {isDef ? 'Default role' : 'Set as default'}
                  </button>
                  {tip && tip.code === r.code && createPortal(
                    <span role="tooltip" id={'deftip-' + r.code} style={{ position:'fixed', zIndex:6000, left:Math.max(8, tip.rect.right - 250), top: tip.up ? tip.rect.top - 10 : tip.rect.bottom + 10, transform: tip.up ? 'translateY(-100%)' : 'none', width:250, padding:'10px 12px', borderRadius:10, background:'#0F172A', color:'#fff', fontSize:12, fontWeight:400, lineHeight:1.45, textAlign:'left', whiteSpace:'normal', boxShadow:'0 8px 24px rgba(15,23,42,.22)', pointerEvents:'none' }}>
                      <span aria-hidden="true" style={{ position:'absolute', [tip.up ? 'bottom' : 'top']:-5, right:22, width:10, height:10, background:'#0F172A', transform:'rotate(45deg)' }}></span>
                      <b style={{ display:'block', fontWeight:600, marginBottom:3 }}>{isDef ? 'Default role' : 'Set as default role'}</b>
                      {isDef ? 'Sara lands in this role right after sign-in. To change it, set another selected role as default.' : 'Sara will land in this role right after sign-in. Replaces ' + defName + ' as the default.'}
                    </span>, document.body
                  )}
                </span>
              )}
            </label>
            {on && (
              <div style={{ padding:'0 14px 14px 44px', display:'grid', gridTemplateColumns:'minmax(0,1fr) 190px', gap:14, alignItems:'start' }}>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)', marginBottom:6 }}>Organization</div>
                  <div role="tree" aria-label={'Organization for ' + r.name} style={{ border:'1px solid var(--border)', borderRadius:10, background:'var(--surface)', padding:5, maxHeight:196, overflowY:'auto' }}>
                    {orgTree.map(n => <RoleOrgNode key={n.code} node={n} depth={0} value={sc.orgUnit} onSelect={(v) => setScope(r.code, { orgUnit:v })} expanded={sc.expanded || { 'EXA-ROOT': true }} setExpanded={(fn) => setScope(r.code, { expanded: fn(sc.expanded || { 'EXA-ROOT': true }) })} />)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)', marginBottom:6 }}>Access level</div>
                  <Dropdown menuPortal value={sc.accessLevel} options={['None', 'Local', 'Deep', 'Org', 'Tenant']} open={!!sc.alOpen} onToggle={() => setScope(r.code, { alOpen:!sc.alOpen })} onSelect={(v) => setScope(r.code, { accessLevel:v, alOpen:false })} ariaLabel={'Access level for ' + r.name} leadIcon="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </div>
              </div>
            )}
          </div>
          )
        })}
        <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:12.5, color:'var(--muted)', paddingTop:2 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--primary)" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          {defName ? <span>{sel.size} {sel.size === 1 ? 'role' : 'roles'} selected · Default: <b style={{ color:'var(--ink)', fontWeight:600 }}>{defName}</b></span> : <span>Select a role to set the default.</span>}
        </div>
      </div>
    </Modal>
  )
}
