import React, { useState } from 'react'
import { Modal, ModalFooter, Field, ToggleField, useForm, ErrBanner, S } from '../ui'
import { appClientDetails } from '../data'

export function AppClientModal({ onClose, stop, toast, record }) {
  const det = (record && appClientDetails[record.code]) || {}
  const [active, setActive] = useState(record ? record.status === 'Active' : true)
  const f = useForm({ name: record?.name || '', desc: det.desc || '', redirectUri: det.redirectUri || '' }, v => {
    const e = {}
    if (!v.name.trim()) e.name = 'Client name is required.'
    if (!v.redirectUri.trim()) e.redirectUri = 'Redirect URI is required.'
    else if (!/^https:\/\/.+\..+/i.test(v.redirectUri.trim())) e.redirectUri = 'Enter a valid https:// URL.'
    return e
  })
  const save = () => f.trySubmit(() => { onClose(); toast('Application client updated successfully.', 'success') })
  return (
    <Modal title="Edit application client" desc="Update this client application registration." onClose={onClose} stop={stop} width={620} shake={f.shake} onShakeEnd={f.clearShake} footer={<ModalFooter onClose={onClose} onSave={save} save="Save changes" />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <ErrBanner />}
        <div>
          <label style={S.label}>Code</label>
          <div style={{ minHeight:44, borderRadius:10, border:'1.5px solid #E4E9F0', background:'var(--surface-alt)', padding:'10px 14px', fontSize:14, color:'var(--muted)', display:'flex', alignItems:'center' }}>{record?.code || '\u2014'}</div>
        </div>
        <Field id="ac-name" label="Name" req value={f.values.name} onChange={f.set('name')} error={f.err('name')} placeholder="e.g. Career Portal" />
        <div>
          <label htmlFor="ac-desc" style={S.label}>Description</label>
          <textarea id="ac-desc" rows={3} value={f.values.desc} onChange={f.set('desc')} placeholder="What does this client application do?" style={{ ...S.input, height:'auto', padding:'11px 14px', resize:'vertical' }} />
        </div>
        <Field id="ac-uri" label="Redirect URI" req value={f.values.redirectUri} onChange={f.set('redirectUri')} error={f.err('redirectUri')} placeholder="https://app.example.edu/callback" />
        <ToggleField title="Active" hint="Whether this client can authenticate through SARAS One." checked={active} onChange={setActive} />
      </div>
    </Modal>
  )
}
