import React, { useState } from 'react'
import { Modal, ModalFooter, Field, ToggleField, Dropdown, useForm, ErrBanner, S, Icon } from '../ui'

const LOOKUP_SEQ = { OU_FACULTY:1, OU_DEPT:2, EMP_FULL:1, EMP_CONTRACT:2, CH_EMAIL:1, CH_SMS:2, GEN_F:1, GEN_M:2 }

const LOOKUP_SETS = ['Delivery Channel', 'Designation']
const lookupSetFromCode = (c) => !c ? '' : c.indexOf('OU_') === 0 ? 'Org Unit Types' : c.indexOf('EMP_') === 0 ? 'Employee Types' : c.indexOf('CH_') === 0 ? 'Delivery Channel' : c.indexOf('GEN_') === 0 ? 'Genders' : 'Delivery Channel'

export function LookupModal({ onClose, stop, toast, record }) {
  const edit = !!record
  const [active, setActive] = useState(record ? record.status === 'Active' : true)
  const [lset, setLset] = useState(record ? lookupSetFromCode(record.code) : 'Delivery Channel')
  const [lsOpen, setLsOpen] = useState(false)
  const f = useForm({ code: record?.code || '', name: record?.name || '', desc: (record?.desc && record.desc !== '\u2014') ? record.desc : '', seq: String(record?.seq ?? LOOKUP_SEQ[record?.code] ?? 1) }, v => {
    const e = {}
    if (!record && !v.code.trim()) e.code = 'Code is required.'
    if (!v.name.trim()) e.name = 'Name is required.'
    if (v.seq === '' || isNaN(Number(v.seq)) || Number(v.seq) < 0) e.seq = 'Enter a valid sequence number.'
    return e
  })
  const save = () => f.trySubmit(() => { onClose(); toast(edit ? 'Lookup updated successfully.' : 'Lookup created successfully.', 'success') })
  return (
    <Modal title={edit ? 'Edit lookup' : 'New lookup'} desc={edit ? 'Update this lookup value.' : 'Add a value to a lookup set.'} onClose={onClose} stop={stop} width={560} shake={f.shake} onShakeEnd={f.clearShake} footer={<ModalFooter onClose={onClose} onSave={save} save={edit ? 'Save changes' : 'Create lookup'} />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <ErrBanner />}
        {edit ? (
          <div>
            <label style={S.label}>Lookup set</label>
            <div style={{ minHeight:44, borderRadius:10, border:'1.5px solid #E4E9F0', background:'var(--surface-alt)', padding:'10px 14px', fontSize:14, color:'var(--muted)', display:'flex', alignItems:'center', gap:8 }}><span style={{ minWidth:0, flex:1 }}>{lset || '\u2014'}</span><span aria-hidden style={{ flex:'none', color:'#B9C2CF', display:'flex' }} title="Read-only"><Icon d="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4" size={14} /></span></div>
          </div>
        ) : (
          <Field id="lk-set" label="Lookup set">
            <Dropdown menuPortal value={lset} options={LOOKUP_SETS} open={lsOpen} onToggle={() => setLsOpen(o => !o)} onSelect={(v) => { setLset(v); setLsOpen(false) }} ariaLabel="Lookup set" leadIcon="M4 6h16 M4 12h16 M4 18h16" />
          </Field>
        )}
        {edit ? (
          <div>
            <label style={S.label}>Code</label>
            <div style={{ minHeight:44, borderRadius:10, border:'1.5px solid #E4E9F0', background:'var(--surface-alt)', padding:'10px 14px', fontSize:14, fontFamily:'ui-monospace, SFMono-Regular, Menlo, monospace', color:'var(--muted)', display:'flex', alignItems:'center', gap:8 }}><span style={{ minWidth:0, flex:1 }}>{record?.code || '\u2014'}</span><span aria-hidden style={{ flex:'none', color:'#B9C2CF', display:'flex' }} title="Read-only"><Icon d="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4" size={14} /></span></div>
          </div>
        ) : <Field id="lk-code" label="Code" req value={f.values.code} onChange={f.set('code')} error={f.err('code')} placeholder="e.g. OU_FACULTY" />}
        <Field id="lk-name" label="Name" req value={f.values.name} onChange={f.set('name')} error={f.err('name')} placeholder="e.g. Faculty" />
        <div>
          <label htmlFor="lk-desc" style={S.label}>Description</label>
          <textarea id="lk-desc" rows={2} maxLength={250} value={f.values.desc} onChange={f.set('desc')} placeholder="What this lookup value represents…" style={{ ...S.input, height:'auto', padding:'11px 14px', resize:'vertical' }} />
        </div>
        <div>
          <label htmlFor="lk-seq" style={S.label}>Sequence No</label>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ display:'inline-flex', alignItems:'stretch', height:44, border:'1.5px solid ' + (f.err('seq') ? '#DC2626' : '#D5DBE4'), borderRadius:10, overflow:'hidden', background:'var(--surface)' }}>
              <button type="button" aria-label="Decrease sequence" disabled={Number(f.values.seq) <= 1} onClick={() => f.set('seq')({ target:{ value:String(Math.max(1, (Number(f.values.seq) || 1) - 1)) } })}
                style={{ width:42, border:'none', borderRight:'1px solid var(--border)', background:'var(--surface-alt)', color: Number(f.values.seq) <= 1 ? '#C4CDD9' : 'var(--ink)', cursor: Number(f.values.seq) <= 1 ? 'default' : 'pointer', display:'flex', alignItems:'center', justifyContent:'center' }} data-ix="ic"><Icon d="M5 12h14" size={15} sw={2.4} /></button>
              <input id="lk-seq" inputMode="numeric" pattern="[0-9]*" value={f.values.seq} onChange={(e) => { const v = e.target.value.replace(/[^0-9]/g, ''); f.set('seq')({ target:{ value:v } }) }} aria-label="Sequence number"
                style={{ width:64, border:'none', outline:'none', textAlign:'center', fontFamily:'inherit', fontSize:15, fontWeight:600, color:'var(--ink)', background:'transparent', fontVariantNumeric:'tabular-nums' }} />
              <button type="button" aria-label="Increase sequence" onClick={() => f.set('seq')({ target:{ value:String((Number(f.values.seq) || 0) + 1) } })}
                style={{ width:42, border:'none', borderLeft:'1px solid var(--border)', background:'var(--surface-alt)', color:'var(--ink)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }} data-ix="ic"><Icon d="M12 5v14 M5 12h14" size={15} sw={2.4} /></button>
            </div>
            <span style={{ fontSize:12.2, color:'var(--muted)' }}>Position of this value within its lookup set.</span>
          </div>
          {f.err('seq') && <div style={{ marginTop:6, fontSize:12.4, color:'#B42318' }}>{f.err('seq')}</div>}
        </div>
        <ToggleField title="Active" hint="Whether this lookup value is available for selection." checked={active} onChange={setActive} />
      </div>
    </Modal>
  )
}
