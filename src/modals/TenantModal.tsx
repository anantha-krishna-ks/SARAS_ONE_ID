import React, { useState } from 'react'
import { Modal, ModalFooter, Section, Field, Dropdown, useForm, ErrBanner, ToggleField, S, Icon, EMAIL_RE } from '../ui'

export function TenantModal({ onClose, stop, ddProps, toast, record, confirmCreate }) {
  const edit = !!record
  const [allowLogin, setAllowLogin] = useState(record ? (record.status !== 'Inactive') : true)
  const [cfgDefault, setCfgDefault] = useState(record?.cfgDefault ?? true)
  const f = useForm({ name:record?.name||'', code:record?.code||'', domain:record?.domain||'', addr1:record?.addr1||'', addr2:record?.addr2||'', city:record?.city||'', state:record?.state||'', pin:record?.pin||'', contact:record?.contact||'', cdesig:record?.cdesig||'', cemail:record?.cemail|| (record ? 'admin@'+(record.domain||'organization.edu') : ''), cmobile:record?.cmobile||'', configuration: record?.configuration || '{\n  "theme": "default",\n  "locale": "en-IN"\n}', loginRemarks:record?.loginRemarks||'' }, v => {
    const e = {}
    if (!v.name.trim()) e.name = 'Tenant name is required.'
    if (!v.code.trim()) e.code = 'Tenant code is required.'
    if (!v.cemail.trim()) e.cemail = 'Contact email is required.'
    else if (!EMAIL_RE.test(v.cemail)) e.cemail = 'Enter a valid email address.'
    return e
  })
  const save = () => f.trySubmit(() => { onClose(); if (edit) { toast('Tenant updated successfully.', 'success') } else { confirmCreate({ danger:false, title:'Create this tenant?', message:'“' + (f.values.name || 'New tenant') + '” will be provisioned in SARAS One with the details you entered. You can edit them later.', confirmLabel:'Confirm & create', onConfirm:() => toast('Tenant created successfully.', 'success') }) } })
  return (
    <Modal title={edit ? 'Edit tenant' : 'New tenant'} desc={edit ? 'Update this organization\u2019s details.' : 'Provision a new organization in SARAS One.'} onClose={onClose} stop={stop} width={880} shake={f.shake} onShakeEnd={f.clearShake} footer={<ModalFooter onClose={onClose} onSave={save} save={edit ? 'Save changes' : 'Create tenant'} />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <div style={{ display:'grid' }}><ErrBanner /></div>}
        <Section title="Organization" hint="Identity and access for the tenant." icon="M3 21h18 M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16 M14 21V9h3a1 1 0 0 1 1 1v11 M9 8h2 M9 12h2 M9 16h2">
          <Field id="t-name" label="Tenant name" req value={f.values.name} onChange={f.set('name')} error={f.err('name')} placeholder="e.g. Meridian University" />
          <Field id="t-code" label="Tenant code" req hint="Unique short code, uppercase." value={f.values.code} onChange={f.set('code')} error={f.err('code')} placeholder="e.g. MER-06" />
          <Field id="t-domain" label="Domain name" value={f.values.domain} onChange={f.set('domain')} placeholder="organization.edu" />
        </Section>
        <Section title="Address" icon="M12 22s8-4 8-10a8 8 0 1 0-16 0c0 6 8 10 8 10z M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z">
          <Field id="t-addr1" label="Address line 1" value={f.values.addr1} onChange={f.set('addr1')} />
          <Field id="t-addr2" label="Address line 2" value={f.values.addr2} onChange={f.set('addr2')} />
          <Field id="t-city" label="City" value={f.values.city} onChange={f.set('city')} />
          <Field id="t-state" label="State" value={f.values.state} onChange={f.set('state')} />
          <Field id="t-country" label="Country"><Dropdown {...ddProps('tCountry', ['India','United States','United Kingdom','Singapore','UAE'])} ariaLabel="Country" /></Field>
          <Field id="t-pin" label="PIN / ZIP" value={f.values.pin} onChange={f.set('pin')} />
        </Section>
        <Section title="Primary contact" icon="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z">
          <Field id="t-contact" label="Contact person" value={f.values.contact} onChange={f.set('contact')} placeholder="Full name" />
          <Field id="t-cdesig" label="Designation" value={f.values.cdesig} onChange={f.set('cdesig')} placeholder="e.g. IT Administrator" />
          <Field id="t-cemail" label="Contact email" req type="email" value={f.values.cemail} onChange={f.set('cemail')} error={f.err('cemail')} placeholder="admin@organization.edu" />
          <Field id="t-cmobile" label="Contact mobile no." type="tel" value={f.values.cmobile} onChange={f.set('cmobile')} placeholder="+91 …" />
        </Section>
        <Section title="Branding" hint="Optional tenant logo." icon="M3 3h18v18H3z M9 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M21 15l-5-5L5 21">
          <div>
            <label style={S.label}>Logo</label>
            <div style={{ display:'flex', alignItems:'center', gap:12, padding:14, border:'1.5px dashed #C7D0DD', borderRadius:10, background:'var(--surface-alt)' }}>
              <span aria-hidden style={{ flex:'none', width:40, height:40, borderRadius:10, background:'var(--primary-tint)', color:'var(--on-tint-blue)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon d="M12 3v12 M7 8l5-5 5 5 M5 21h14" size={20} /></span>
              <span style={{ display:'flex', flexDirection:'column', gap:2 }}><span style={{ fontSize:13.3, fontWeight:600, color:'var(--ink)' }}>Upload tenant logo</span><span style={{ fontSize:12, color:'var(--muted)' }}>PNG or SVG, up to 1 MB.</span></span>
            </div>
          </div>
        </Section>
      </div>
    </Modal>
  )
}
