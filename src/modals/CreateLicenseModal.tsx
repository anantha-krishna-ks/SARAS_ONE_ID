import React, { useState } from 'react'
import { S, Icon, Modal, ModalFooter, Section, Stepper, useForm, ErrBanner } from '../ui'

export function CreateLicenseModal({ tenant, onClose, stop, toast }) {
  const [grace, setGrace] = useState(30)
  const [users, setUsers] = useState(1000)
  const f = useForm({ from:'', to:'' }, v => {
    const e = {}
    if (!v.from) e.from = 'From date is required.'
    if (!v.to) e.to = 'To date is required.'
    if (v.from && v.to && Date.parse(v.to) <= Date.parse(v.from)) e.to = 'To date must be after the from date.'
    return e
  })
  const dur = (f.values.from && f.values.to && Date.parse(f.values.to) > Date.parse(f.values.from)) ? Math.round((Date.parse(f.values.to) - Date.parse(f.values.from)) / 86400000) : null
  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : null
  const save = () => f.trySubmit(() => { onClose(); toast('License created for ' + tenant.name + '.', 'success') })
  return (
    <Modal title={'Create license — ' + tenant.name} desc="Issue a new license for this tenant." onClose={onClose} stop={stop} width={680} shake={f.shake} onShakeEnd={f.clearShake}
      footer={<ModalFooter onClose={onClose} onSave={save} save="Create license" />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <div style={{ display:'grid' }}><ErrBanner /></div>}
        <Section title="Validity period" hint="When this license starts, ends, and the grace window after expiry." icon="M8 2v4 M16 2v4 M3 9h18 M3 5h18v16H3z" cols={2}>
          <div>
            <label htmlFor="lic-from" style={S.label}>From Date <span aria-hidden style={{ color:'var(--danger)' }}>*</span></label>
            <input id="lic-from" type="date" value={f.values.from} onChange={f.set('from')} style={{ ...S.input, ...(f.err('from') ? { borderColor:'var(--danger)' } : {}) }} />
            {f.err('from') && <div style={{ marginTop:6, fontSize:12.4, color:'#B42318' }}>{f.err('from')}</div>}
          </div>
          <div>
            <label htmlFor="lic-to" style={S.label}>To Date <span aria-hidden style={{ color:'var(--danger)' }}>*</span></label>
            <input id="lic-to" type="date" value={f.values.to} onChange={f.set('to')} min={f.values.from || undefined} style={{ ...S.input, ...(f.err('to') ? { borderColor:'var(--danger)' } : {}) }} />
            {f.err('to') && <div style={{ marginTop:6, fontSize:12.4, color:'#B42318' }}>{f.err('to')}</div>}
          </div>
          <div>
            <label style={S.label}>Grace Period (no of days)</label>
            <Stepper value={grace} onChange={setGrace} min={0} max={180} step={5} />
            <div style={{ marginTop:6, fontSize:11.8, color:'var(--muted)' }}>Sign-in stays available this many days after expiry.</div>
          </div>
        </Section>
        <Section title="Capacity" hint="How many accounts this license covers." icon="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" cols={2}>
          <div>
            <label style={S.label}>No of Users</label>
            <Stepper value={users} onChange={setUsers} min={100} max={100000} step={100} />
          </div>
        </Section>
        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:10, padding:'12px 16px', borderRadius:12, background:'var(--primary-tint-2)', border:'1px solid var(--border-blue)' }}>
          <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h6" size={15} style={{ stroke:'var(--on-tint-blue)', flex:'none' }} />
          <span style={{ fontSize:12.9, color:'var(--ink)', lineHeight:1.5 }}>
            {dur
              ? <React.Fragment>Valid <b style={{ fontWeight:600 }}>{fmt(f.values.from)}</b> to <b style={{ fontWeight:600 }}>{fmt(f.values.to)}</b> ({dur} days) <span aria-hidden>·</span> <b style={{ fontWeight:600, fontVariantNumeric:'tabular-nums' }}>{users.toLocaleString()}</b> users <span aria-hidden>·</span> {grace}-day grace</React.Fragment>
              : <span style={{ color:'var(--muted)' }}>Pick the from and to dates to see the license summary.</span>}
          </span>
        </div>
      </div>
    </Modal>
  )
}
