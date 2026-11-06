import React, { useState } from 'react'
import { S, Modal, ModalFooter, Section, Field, Dropdown, useForm, ErrBanner, ToggleField, Icon } from '../ui'

export function PrivilegeModal({ onClose, stop, toast, record, onSubmit, apps, tree }) {
  const edit = !!(record && record.edit)
  const child = !!(record && record.parentName && !edit)
  const [app, setApp] = useState((record && record.appName) || apps[0])
  const [parent, setParent] = useState((record && record.parentName) || 'None (root of application)')
  const [active, setActive] = useState(record ? record.active !== false : true)
  const [isDefault, setIsDefault] = useState(record ? !!record.isDefault : false)
  const [ddo, setDdo] = useState(null)
  const f = useForm({ code:record?.code || '', name:record?.name || '', wbs:record?.wbs || '', desc:record?.desc || '' }, v => {
    const e = {}
    if (!v.code.trim()) e.code = 'Code is required.'
    if (!v.name.trim()) e.name = 'Name is required.'
    return e
  })
  const appNode = tree.find(a => a.name === app)
  const flat = []
  const walk = (ns) => (ns || []).forEach(n => { if (!edit || n.code !== record.origCode) { flat.push(n.name); walk(n.children) } })
  if (appNode) walk(appNode.children)
  const parents = ['None (root of application)', ...flat]
  const save = () => f.trySubmit(() => {
    onSubmit({ edit, origCode: record && record.origCode, appName: app, parentName: parent === 'None (root of application)' ? null : parent, code:f.values.code.trim(), name:f.values.name.trim(), wbs:f.values.wbs.trim(), desc:f.values.desc.trim(), active, isDefault })
    onClose()
    toast(edit ? 'Privilege updated successfully.' : 'Privilege created successfully.', 'success')
  })
  const dd = (id, value, options, onSelect) => ({ value, options, open: ddo === id, onToggle: () => setDdo(o => o === id ? null : id), onSelect: (v) => { onSelect(v); setDdo(null) } })
  const shield = 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
  return (
    <Modal title={edit ? 'Edit privilege' : (child ? 'New child privilege' : 'New privilege')}
      desc={edit ? 'Update this privilege in the catalogue.' : (child ? 'Nested under ' + record.parentName + '.' : 'Add a privilege to an application.')}
      onClose={onClose} stop={stop} width={760} shake={f.shake} onShakeEnd={f.clearShake}
      footer={<ModalFooter onClose={onClose} onSave={save} save={edit ? 'Save changes' : 'Create privilege'} />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <div style={{ display:'grid' }}><ErrBanner /></div>}
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:12, background:'var(--primary-tint-2)', border:'1px solid var(--border-blue)' }}>
          <span aria-hidden style={{ flex:'none', width:32, height:32, borderRadius:9, background:'var(--primary-tint)', color:'var(--on-tint-blue)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon d={shield} size={17} /></span>
          <span style={{ fontSize:13, color:'var(--ink)', lineHeight:1.5 }}>
            {parent !== 'None (root of application)'
              ? <>A child privilege under <strong>{parent}</strong> in <strong>{app}</strong>.</>
              : <>A <strong>top-level</strong> privilege in <strong>{app}</strong>.</>}
          </span>
        </div>
        <Section title="Placement" hint="Application and parent in the hierarchy." icon="M9 3H5v4h4z M19 3h-4v4h4z M12 11V7 M6 11v4h12v-4 M4 15h4v4H4z M16 15h4v4h-4z" cols={2}>
          <Field id="pv-app" label="Application" req><Dropdown menuPortal {...dd('app', app, apps, (v) => { setApp(v); setParent('None (root of application)') })} ariaLabel="Application" leadIcon="M3 5h18v14H3z M3 9h18 M7 7h.01" /></Field>
          <Field id="pv-parent" label="Parent privilege"><Dropdown menuPortal {...dd('parent', parent, parents, setParent)} ariaLabel="Parent privilege" /></Field>
        </Section>
        <Section title="Details" icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" cols={2}>
          <Field id="pv-code" label="Code" req value={f.values.code} onChange={f.set('code')} error={f.err('code')} placeholder="e.g. PRM_TENANT_VIEW" />
          <Field id="pv-name" label="Name" req value={f.values.name} onChange={f.set('name')} error={f.err('name')} placeholder="e.g. View Tenants" />
          <Field id="pv-wbs" label="Work breakdown structure" value={f.values.wbs} onChange={f.set('wbs')} placeholder="e.g. TNT.VIEW" />
          <div />
          <Field id="pv-desc" label="Description" full>
            <textarea id="pv-desc" value={f.values.desc} onChange={f.set('desc')} rows={3} maxLength={500} placeholder="What this privilege allows the holder to do…" style={{ ...S.input, height:'auto', padding:'10px 14px', resize:'vertical', lineHeight:1.5 }} />
          </Field>
        </Section>
        <ToggleField title="Active" hint="Whether this privilege is active and grantable to roles." checked={active} onChange={setActive} />
        <ToggleField title="Default" hint="Automatically granted to new roles in this application." checked={isDefault} onChange={setIsDefault} />
      </div>
    </Modal>
  )
}
