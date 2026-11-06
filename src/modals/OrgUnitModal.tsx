import React, { useState } from 'react'
import { Modal, ModalFooter, Section, Field, Dropdown, useForm, ErrBanner, ToggleField, Icon, S } from '../ui'
import { orgUnitNames, orgTree } from '../data'

export function OrgUnitModal({ onClose, stop, ddProps, toast, record, onSubmit }) {
  const edit = !!(record && record.code)
  const child = !!(record && record.parentName && !edit)
  const [active, setActive] = useState(record && record.status ? record.status === 'Active' : true)
  const f = useForm({ code:record?.code || '', name:record?.name || '', wbs:record?.wbs || '' }, v => {
    const e = {}
    if (!v.code.trim()) e.code = 'Code is required.'
    if (!v.name.trim()) e.name = 'Name is required.'
    return e
  })
  const save = () => f.trySubmit(() => { onSubmit({ code:f.values.code, name:f.values.name, wbs:f.values.wbs, active }); onClose() })
  const parents = ['None (root)', ...orgUnitNames()]
  const folder = 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
  const lvl = child && record.parentLevel != null ? record.parentLevel + 1 : (edit ? record.level : 0)
  const parentSel = ddProps('ouParent', parents).value || 'None (root)'
  const setParent = (nm) => ddProps('ouParent', parents).onSelect(nm)
  const folderTree = 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
  const renderParentTree = (nodes, depth) => nodes.map(nd => (
    <React.Fragment key={nd.code}>
      <button type="button" onClick={() => setParent(nd.name)} style={{ display:'flex', alignItems:'center', gap:9, width:'100%', textAlign:'left', padding:'9px 10px', paddingLeft: 10 + depth * 20, border:'none', borderRadius:8, cursor:'pointer', background: parentSel === nd.name ? 'var(--primary-tint)' : 'transparent', font:'inherit' }}>
        <Icon d={folderTree} size={15} style={{ flex:'none', stroke: parentSel === nd.name ? 'var(--primary)' : 'var(--muted)' }} />
        <span style={{ fontSize:13.2, fontWeight: parentSel === nd.name ? 600 : 500, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{nd.name}</span>
        {parentSel === nd.name && <Icon d="M20 6L9 17l-5-5" size={14} sw={2.5} style={{ marginLeft:'auto', flex:'none', stroke:'var(--primary)' }} />}
      </button>
      {nd.children && nd.children.length > 0 && renderParentTree(nd.children, depth + 1)}
    </React.Fragment>
  ))
  return (
    <Modal title={edit ? 'Edit organization unit' : (child ? 'New sub-unit' : 'New organization unit')} desc={edit ? 'Update this unit in the hierarchy.' : (child ? 'Adding a unit under ' + record.parentName + '.' : 'Add a top-level unit to the hierarchy.')} onClose={onClose} stop={stop} width={720} shake={f.shake} onShakeEnd={f.clearShake} footer={<ModalFooter onClose={onClose} onSave={save} save={edit ? 'Save changes' : 'Create unit'} />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <div style={{ display:'grid' }}><ErrBanner /></div>}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:12, background:'var(--primary-tint-2)', border:'1px solid var(--border-blue)' }}>
          <span aria-hidden style={{ flex:'none', width:32, height:32, borderRadius:9, background:'var(--primary-tint)', color:'var(--on-tint-blue)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon d={folder} size={17} /></span>
          <span style={{ fontSize:13, color:'var(--ink)', lineHeight:1.5 }}>{child ? <>Nested under <strong>{record.parentName}</strong> as a <strong>level {lvl}</strong> unit.</> : (edit ? <>Level <strong>{lvl}</strong> unit in the hierarchy.</> : <>A new <strong>top-level</strong> (level 0) unit.</>)}</span>
        </div>
        <Section title="Details" icon="M9 3h6v4H9z M4 17h6v4H4z M14 17h6v4h-6z M12 7v4 M7 17v-2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2" cols={2}>
          <Field id="ou-code" label="Code" req value={f.values.code} onChange={f.set('code')} error={f.err('code')} placeholder="e.g. SCI" />
          <Field id="ou-name" label="Name" req value={f.values.name} onChange={f.set('name')} error={f.err('name')} placeholder="e.g. School of Sciences" />
          <Field id="ou-type" label="Type"><Dropdown {...ddProps('ouType', ['Org Group','Organization','Faculty','Department','Division','Section','Branch'])} ariaLabel="Type" /></Field>
          {edit && <Field id="ou-wbs" label="Work breakdown structure"><div style={{ display:'flex', alignItems:'center', gap:8, minHeight:44, padding:'8px 12px', borderRadius:10, background:'var(--surface-alt)', border:'1px dashed var(--border)', fontSize:13.6, fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace' }}><Icon d="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0" size={14} style={{ flex:'none', stroke:'var(--muted)' }} /><span style={{ color:'var(--ink)' }}>{record.wbs || '\u2014'}</span><span style={{ marginLeft:'auto', fontSize:10.6, fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase', color:'var(--muted)', fontFamily:'inherit' }}>Read-only</span></div></Field>}
        </Section>
        {!child && !edit && (
          <div>
            <label style={S.label}>Parent unit</label>
            <div style={{ maxHeight:220, overflowY:'auto', border:'1px solid var(--border)', borderRadius:12, padding:6, background:'var(--surface)', display:'flex', flexDirection:'column', gap:2 }}>
              <button type="button" onClick={() => setParent('None (root)')} style={{ display:'flex', alignItems:'center', gap:9, width:'100%', textAlign:'left', padding:'9px 10px', border:'none', borderRadius:8, cursor:'pointer', background: parentSel === 'None (root)' ? 'var(--primary-tint)' : 'transparent', font:'inherit' }}>
                <Icon d="M3 21h18 M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16 M9 7h4" size={15} style={{ flex:'none', stroke: parentSel === 'None (root)' ? 'var(--primary)' : 'var(--muted)' }} />
                <span style={{ fontSize:13.2, fontWeight: parentSel === 'None (root)' ? 600 : 500, color:'var(--ink)' }}>None (root)</span>
                {parentSel === 'None (root)' && <Icon d="M20 6L9 17l-5-5" size={14} sw={2.5} style={{ marginLeft:'auto', flex:'none', stroke:'var(--primary)' }} />}
              </button>
              {renderParentTree(orgTree, 0)}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}
