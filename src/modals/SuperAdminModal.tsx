import React, { useState } from 'react'
import { Modal, ModalFooter, Section, Field, Dropdown, useForm, ErrBanner, EMAIL_RE, S } from '../ui'

const SA_ORGS = ['Excelsoft Academy', 'Nova Learning Group', 'Meridian University', 'Bright Future Schools', 'Horizon EdTech']

export function SuperAdminModal({ onClose, stop, toast, record }) {
  const edit = !!record
  const [ddo, setDdo] = useState(null)
  const [status, setStatus] = useState(record?.status || 'Active')
  const [gender, setGender] = useState(record?.gender || 'Select…')
  const dd = (id, value, options, onSelect) => ({ menuPortal:true, value, options, open: ddo === id, onToggle: () => setDdo(o => o === id ? null : id), onSelect: (v) => { onSelect(v); setDdo(null) } })
  const nameParts = (record?.display || '').split(' ')
  const f = useForm({
    login: record?.login || '', first: nameParts[0] || '', middle: nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '', last: nameParts.length > 1 ? nameParts[nameParts.length - 1] : '',
    display: record?.display || '', dob: record?.dob || '', email: record?.email || '', mobile: record?.mobile || '',
  }, v => {
    const e = {}
    if (!v.login.trim()) e.login = 'Login name is required.'
    if (!v.first.trim()) e.first = 'First name is required.'
    if (!v.last.trim()) e.last = 'Last name is required.'
    if (!v.display.trim()) e.display = 'Display name is required.'
    if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address.'
    if (v.mobile.trim() && !/^[+0-9][0-9 \-]{7,14}$/.test(v.mobile.trim())) e.mobile = 'Enter a valid mobile number.'
    return e
  })
  const save = () => f.trySubmit(() => { onClose(); toast(edit ? 'Super admin updated successfully.' : 'Super admin created successfully.', 'success') })
  return (
    <Modal title={edit ? 'Edit super admin' : 'New super admin'} desc={edit ? 'Update this super administrator account.' : 'Create a super administrator account.'} onClose={onClose} stop={stop} width={920} shake={f.shake} onShakeEnd={f.clearShake} footer={<ModalFooter onClose={onClose} onSave={save} save={edit ? 'Save changes' : 'Create super admin'} />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <div style={{ display:'grid' }}><ErrBanner /></div>}
        <Section title="Account" hint="How this administrator signs in and appears across the console." icon="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4">
          <Field id="sa-login" label="Login Name" req value={f.values.login} onChange={f.set('login')} error={f.err('login')} placeholder="e.g. anita.k" />
          <Field id="sa-display" label="Display Name" req value={f.values.display} onChange={f.set('display')} error={f.err('display')} placeholder="e.g. Anita Kulkarni" />
        </Section>
        <Section title="Personal details" hint="Name, gender and date of birth." icon="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z">
          <Field id="sa-first" label="First Name" req value={f.values.first} onChange={f.set('first')} error={f.err('first')} placeholder="e.g. Anita" />
          <Field id="sa-middle" label="Middle Name" value={f.values.middle} onChange={f.set('middle')} placeholder="Optional" />
          <Field id="sa-last" label="Last Name" req value={f.values.last} onChange={f.set('last')} error={f.err('last')} placeholder="e.g. Kulkarni" />
          <Field id="sa-gender" label="Gender"><Dropdown {...dd('gender', gender, ['Female', 'Male', 'Other', 'Prefer not to say'], setGender)} ariaLabel="Gender" /></Field>
          <div>
            <label htmlFor="sa-dob" style={S.label}>Date of Birth</label>
            <input id="sa-dob" type="date" value={f.values.dob} onChange={f.set('dob')} style={{ ...S.input }} />
          </div>
        </Section>
        <Section title="Contact" hint="How this administrator can be reached." icon="M4 5h16v14H4z M22 6l-10 7L2 6">
          <Field id="sa-email" label="Email" req type="email" value={f.values.email} onChange={f.set('email')} error={f.err('email')} placeholder="name@excelsoftcorp.com" />
          <Field id="sa-mobile" label="Mobile No" type="tel" value={f.values.mobile} onChange={f.set('mobile')} error={f.err('mobile')} placeholder="+91 98450 12345" />
        </Section>
      </div>
    </Modal>
  )
}
