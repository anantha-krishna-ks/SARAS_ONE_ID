import React, { useState } from 'react'
import { Modal, ModalFooter, Field, ToggleField, Dropdown, useForm, ErrBanner, S, Icon, AppMultiPicker } from '../ui'
import { orgTree, privApps } from '../data'

function flattenOrg(nodes, trail, out) {
  nodes.forEach(n => {
    const path = trail.concat([n.name])
    out.push({ code:n.code, name:n.name, type:n.type, path })
    if (n.children) flattenOrg(n.children, path, out)
  })
  return out
}

function findOrgChain(nodes, name, trail) {
  for (const n of nodes) {
    const path = trail.concat([n])
    if (n.name === name) return path
    if (n.children) { const r = findOrgChain(n.children, name, path); if (r) return r }
  }
  return null
}

const ORG_LEVEL_LABEL = ['Organization', 'Unit', 'Sub-unit', 'Team']

function OrgUnitCascade({ value, onChange }) {
  const [openLv, setOpenLv] = React.useState(null)
  const chain = (value && findOrgChain(orgTree, value, [])) || []
  const levels = []
  let opts = orgTree
  for (let d = 0; opts && opts.length; d++) {
    const sel = chain[d] || null
    levels.push({ opts, sel, d })
    opts = sel ? (sel.children || null) : null
  }
  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:12 }}>
        {levels.map(lv => (
          <div key={lv.d} style={{ minWidth:0 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)', marginBottom:5 }}>{ORG_LEVEL_LABEL[lv.d] || 'Level ' + (lv.d + 1)}</div>
            <Dropdown menuPortal value={lv.sel ? lv.sel.name : 'Select…'} options={lv.opts.map(o => o.name)} open={openLv === lv.d} onToggle={() => setOpenLv(o => o === lv.d ? null : lv.d)} onSelect={(v) => { onChange(v); setOpenLv(null) }} ariaLabel={(ORG_LEVEL_LABEL[lv.d] || 'Level ' + (lv.d + 1)) + ' selection'} />
          </div>
        ))}
      </div>
      {chain.length > 0 && (
        <div style={{ marginTop:9, display:'flex', alignItems:'center', gap:7, flexWrap:'wrap', fontSize:12.4 }}>
          <span style={{ color:'var(--muted)' }}>Selected:</span>
          {chain.map((n, i) => (
            <span key={n.code} style={{ display:'inline-flex', alignItems:'center', gap:7 }}>
              {i > 0 && <Icon d="M9 18l6-6-6-6" size={11} style={{ color:'#B9C2CF' }} />}
              <span style={{ fontWeight: i === chain.length - 1 ? 700 : 500, color: i === chain.length - 1 ? 'var(--primary)' : 'var(--ink)' }}>{n.name}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function RoleOrgPicker({ value, onChange }) {
  const [open, setOpen] = React.useState(false)
  const [q, setQ] = React.useState('')
  const [expanded, setExpanded] = React.useState({ 'EXA-ROOT': true })
  const all = React.useMemo(() => flattenOrg(orgTree, [], []), [])
  const sel = all.find(u => u.name === value)
  const t = q.trim().toLowerCase()
  const matches = t ? all.filter(u => u.name.toLowerCase().includes(t)).slice(0, 12) : null
  const pick = (name) => { onChange(name); setOpen(false); setQ('') }
  return (
    <div>
      <button type="button" onClick={() => setOpen(o => !o)} aria-haspopup="dialog" aria-expanded={open} style={{ ...S.input, height:'auto', minHeight:44, padding:'8px 14px', display:'flex', alignItems:'center', gap:10, cursor:'pointer', textAlign:'left', width:'100%' }}>
        <span aria-hidden style={{ display:'flex', alignItems:'center', justifyContent:'center', width:28, height:28, borderRadius:8, flex:'none', background:'var(--primary-tint)', color:'var(--primary)' }}><Icon d="M3 21h18 M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16 M9 9h1 M9 13h1 M14 9h1 M14 13h1" size={14} /></span>
        <span style={{ flex:1, minWidth:0 }}>
          {sel ? (
            <span style={{ display:'block' }}>
              <span style={{ display:'block', fontSize:13.8, fontWeight:600, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{sel.name}</span>
              {sel.path.length > 1 && <span style={{ display:'block', fontSize:11.6, color:'var(--muted)', marginTop:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{sel.path.slice(0, -1).join(' \u203a ')}</span>}
            </span>
          ) : <span style={{ fontSize:14, color:'var(--muted)' }}>Choose a unit…</span>}
        </span>
        <Icon d="M6 9l6 6 6-6" size={14} style={{ color:'var(--muted)', flex:'none', transform: open ? 'rotate(180deg)' : 'none', transition:'transform .15s ease' }} />
      </button>
      {open && (
        <div style={{ marginTop:6, border:'1px solid var(--border)', borderRadius:12, background:'var(--surface)', boxShadow:'0 14px 32px -14px rgba(16,42,84,.28)', overflow:'hidden' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'0 12px', borderBottom:'1px solid var(--border)', background:'var(--surface-alt)' }}>
            <Icon d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35" size={14} style={{ color:'var(--muted)', flex:'none' }} />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search units…" aria-label="Search organization units" style={{ flex:1, height:38, border:'none', outline:'none', background:'transparent', fontFamily:'inherit', fontSize:13.4, color:'var(--ink)', minWidth:0 }} />
            {q && <button type="button" aria-label="Clear search" onClick={() => setQ('')} style={{ display:'flex', border:'none', background:'transparent', color:'var(--muted)', cursor:'pointer', padding:2 }}><Icon d="M18 6L6 18 M6 6l12 12" size={13} sw={2.2} /></button>}
          </div>
          <div style={{ maxHeight:224, overflowY:'auto', padding:5 }}>
            {matches ? (matches.length ? matches.map(u => {
              const on = u.name === value
              return (
                <button key={u.code} type="button" data-ix="row" onClick={() => pick(u.name)} style={{ display:'flex', alignItems:'center', gap:9, width:'100%', textAlign:'left', padding:'8px 10px', borderRadius:8, border:'none', background: on ? 'var(--primary-tint)' : 'transparent', cursor:'pointer', fontFamily:'inherit' }}>
                  <span style={{ flex:1, minWidth:0 }}>
                    <span style={{ display:'block', fontSize:13.2, fontWeight:600, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.name}</span>
                    {u.path.length > 1 && <span style={{ display:'block', fontSize:11.4, color:'var(--muted)', marginTop:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.path.slice(0, -1).join(' \u203a ')}</span>}
                  </span>
                  <span style={{ fontSize:10.8, color:'var(--muted)', flex:'none' }}>{u.type}</span>
                  {on && <Icon d="M20 6L9 17l-5-5" size={13} sw={2.5} style={{ color:'var(--primary)', flex:'none' }} />}
                </button>
              )
            }) : <div style={{ padding:'12px 12px', fontSize:12.8, color:'var(--muted)' }}>No units match \u201c{q}\u201d.</div>)
            : all.map(u => {
              const on = u.name === value
              const depth = u.path.length - 1
              return (
                <button key={u.code} type="button" role="radio" aria-checked={on} data-ix="row" onClick={() => pick(u.name)}
                  style={{ display:'flex', alignItems:'center', gap:9, width:'100%', textAlign:'left', padding:'8px 10px', paddingLeft:10 + depth * 22, borderRadius:8, border:'none', background: on ? 'var(--primary-tint)' : 'transparent', cursor:'pointer', fontFamily:'inherit' }}>
                  <span aria-hidden style={{ width:16, height:16, borderRadius:'50%', flex:'none', border:'1.5px solid ' + (on ? 'var(--primary)' : '#C4CDD9'), display:'inline-flex', alignItems:'center', justifyContent:'center', background:'var(--surface)' }}>{on && <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--primary)' }} />}</span>
                  <span style={{ flex:1, minWidth:0, fontSize:13.2, fontWeight: on ? 600 : 500, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{u.name}</span>
                  <span style={{ fontSize:10.8, color:'var(--muted)', flex:'none' }}>{u.type}</span>
                </button>
              )
            })}
          </div>
          <div style={{ padding:'9px 12px', borderTop:'1px solid var(--border)', background:'var(--surface-alt)', fontSize:11.8, color:'var(--muted)' }}>Indentation shows where a unit sits in the organization.</div>
        </div>
      )}
    </div>
  )
}

export function RoleOrgNode({ node, depth, value, onSelect, expanded, setExpanded }) {
  const kids = node.children || []
  const open = !!expanded[node.code]
  const sel = value === node.name
  return (
    <div>
      <div data-ix="row" role="treeitem" aria-selected={sel} onClick={() => onSelect(node.name)}
        style={{ display:'flex', alignItems:'center', gap:7, padding:'7px 10px', paddingLeft:10 + depth * 20, borderRadius:8, cursor:'pointer', background: sel ? 'var(--primary-tint)' : 'transparent' }}>
        {kids.length > 0
          ? <button type="button" aria-label={(open ? 'Collapse ' : 'Expand ') + node.name} onClick={(e) => { e.stopPropagation(); setExpanded(x => ({ ...x, [node.code]: !open })) }}
              style={{ flex:'none', width:18, height:18, display:'flex', alignItems:'center', justifyContent:'center', border:'none', background:'transparent', color:'var(--muted)', cursor:'pointer', padding:0 }}>
              <Icon d="M9 18l6-6-6-6" size={11} style={{ transform: open ? 'rotate(90deg)' : 'none', transition:'transform .15s ease' }} />
            </button>
          : <span aria-hidden style={{ width:18, flex:'none' }} />}
        <span style={{ fontSize:13, fontWeight: sel ? 600 : 500, color:'var(--ink)', flex:1, minWidth:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{node.name}</span>
        <span style={{ fontSize:10.8, color:'var(--muted)', flex:'none' }}>{node.type}</span>
        {sel && <Icon d="M20 6L9 17l-5-5" size={12} sw={2.5} style={{ color:'var(--primary)', flex:'none' }} />}
      </div>
      {open && kids.map(k => <RoleOrgNode key={k.code} node={k} depth={depth + 1} value={value} onSelect={onSelect} expanded={expanded} setExpanded={setExpanded} />)}
    </div>
  )
}

export function RoleModal({ onClose, stop, toast, record, onSubmit }) {
  const edit = !!record
  const [active, setActive] = useState(record ? record.status !== 'Inactive' : true)
  const [mfaRequired, setMfaRequired] = useState(!!(record && record.mfaRequired))
  const [roleApps, setRoleApps] = useState((record && record.apps) || [])
  const [scoped, setScoped] = useState(!!(record && record.orgUnit))
  const [orgUnit, setOrgUnit] = useState((record && record.orgUnit) || '')
  const [accessLevel, setAccessLevel] = useState((record && record.accessLevel) || 'None')
  const [ouOpen, setOuOpen] = useState(false)
  const [ouExpanded, setOuExpanded] = useState({ 'EXA-ROOT': true })
  const [alOpen, setAlOpen] = useState(false)
  const f = useForm({ code:record?.code||'', name:record?.name||'', desc:record?.desc||'' }, v => {
    const e = {}
    if (!v.code.trim()) e.code = 'Role code is required.'
    if (!v.name.trim()) e.name = 'Role name is required.'
    return e
  })
  const save = () => f.trySubmit(() => {
    onSubmit && onSubmit({ code:f.values.code.trim(), name:f.values.name.trim(), desc:f.values.desc.trim(), scope: record?.scope || 'Tenant', status: active ? 'Active' : 'Inactive', mfaRequired, apps: roleApps, orgUnit: scoped ? orgUnit : '', accessLevel: scoped ? accessLevel : 'None' }, record)
    onClose()
    toast(edit ? 'Role updated successfully.' : 'Role created successfully.', 'success')
  })
  return (
    <Modal title={edit ? 'Edit role' : 'New role'} desc={edit ? 'Update this role.' : 'Define a role.'} onClose={onClose} stop={stop} width={780} shake={f.shake} onShakeEnd={f.clearShake} footer={<ModalFooter onClose={onClose} onSave={save} save={edit ? 'Save changes' : 'Create role'} />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <ErrBanner />}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:16 }}>
          <Field id="r-code" label="Role code" req value={f.values.code} onChange={f.set('code')} error={f.err('code')} placeholder="e.g. CONTENT_AUTHOR" />
          <Field id="r-name" label="Role name" req value={f.values.name} onChange={f.set('name')} error={f.err('name')} placeholder="e.g. Content Reviewer" />
        </div>
        <div>
          <label htmlFor="r-desc" style={S.label}>Description</label>
          <textarea id="r-desc" rows={3} value={f.values.desc} onChange={f.set('desc')} placeholder="What can this role do?" style={{ ...S.input, height:'auto', padding:'11px 14px', resize:'vertical' }} />
        </div>
        <ToggleField title="Scope to organization unit" hint="Restrict this role to a branch of the organization structure." checked={scoped} onChange={setScoped} />
        {scoped && (
          <div style={{ display:'flex', flexDirection:'column', gap:14, padding:16, border:'1px solid var(--border-blue)', borderRadius:12, background:'var(--primary-tint-2)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:9 }}>
              <span aria-hidden style={{ display:'flex', alignItems:'center', justifyContent:'center', width:28, height:28, borderRadius:8, flex:'none', background:'var(--primary-tint)', color:'var(--primary)' }}><Icon d="M3 21h18 M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16 M9 9h1 M9 13h1 M14 9h1 M14 13h1" size={14} /></span>
              <span style={{ fontSize:13.2, fontWeight:700, color:'var(--ink)' }}>Organization unit scope</span>
            </div>
            <div>
              <label style={S.label}>Organization unit</label>
              <OrgUnitCascade value={orgUnit} onChange={setOrgUnit} />
            </div>
            <div style={{ maxWidth:260 }}>
              <Field id="r-access" label="Access level">
                <Dropdown menuPortal value={accessLevel} options={['None', 'Local', 'Deep', 'Org', 'Tenant']} open={alOpen} onToggle={() => setAlOpen(o => !o)} onSelect={(v) => { setAccessLevel(v); setAlOpen(false) }} ariaLabel="Access level" leadIcon="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </Field>
            </div>
          </div>
        )}
        <div>
          <label style={S.label}>Applications</label>
          <AppMultiPicker value={roleApps} onChange={setRoleApps} apps={privApps} ariaLabel="Applications" />
          <div style={{ marginTop:6, fontSize:12.4, color:'var(--muted)' }}>Applications this role can access. Select one or more.</div>
        </div>
        <ToggleField title="MFA Required" hint="Accounts with this role must complete multi-factor authentication at sign-in." checked={mfaRequired} onChange={setMfaRequired} />
        {edit && <ToggleField title="Active" hint="Whether this role is active and assignable." checked={active} onChange={setActive} />}
      </div>
    </Modal>
  )
}
