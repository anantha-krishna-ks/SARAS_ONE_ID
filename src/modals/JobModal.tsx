import React, { useState } from 'react'
import { S, Modal, ModalFooter, Section, Field, Dropdown, Stepper, useForm, ErrBanner, ToggleField, Icon } from '../ui'
import { eventPriorityOptions } from '../data'

const JMONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'
const JPRIO_DOT = { High:'#DC2626', Medium:'var(--warning)', Low:'var(--success)' }

function JChips({ id, values, onChange, placeholder }) {
  const [draft, setDraft] = useState('')
  const add = (v) => { const t = String(v).trim(); if (t && !values.includes(t)) onChange([...values, t]); setDraft('') }
  const remove = (i) => onChange(values.filter((_, x) => x !== i))
  const onKey = (e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(draft) } else if (e.key === 'Backspace' && !draft && values.length) remove(values.length - 1) }
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:7, alignItems:'center', minHeight:44, padding:'7px 10px', borderRadius:10, border:'1.5px solid #D5DBE4', background:'var(--surface)' }}>
      {values.map((v, i) => (
        <span key={v + i} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 6px 4px 10px', borderRadius:8, background:'var(--primary-tint)', color:'var(--on-tint-blue)', fontSize:12.8, fontWeight:600, fontFamily:JMONO }}>
          {v}
          <button type="button" aria-label={'Remove ' + v} onClick={() => remove(i)} style={{ display:'inline-flex', border:'none', background:'transparent', color:'var(--on-tint-blue)', cursor:'pointer', padding:2, lineHeight:0, borderRadius:5 }}><Icon d="M18 6L6 18 M6 6l12 12" size={12} sw={2.4} /></button>
        </span>
      ))}
      <input id={id} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={onKey} onBlur={() => draft && add(draft)} placeholder={values.length ? '' : placeholder} style={{ flex:1, minWidth:130, border:'none', outline:'none', background:'transparent', fontFamily:'inherit', fontSize:14, color:'var(--ink)' }} />
    </div>
  )
}

function JRow({ label, children, full }) {
  return (
    <div style={{ gridColumn: full ? '1 / -1' : 'auto', display:'flex', flexDirection:'column', gap:6, minWidth:0 }}>
      <span style={{ fontSize:11.4, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}>{label}</span>
      <div style={{ fontSize:13.8, color:'var(--ink)', lineHeight:1.55 }}>{children}</div>
    </div>
  )
}
function jtags(arr) {
  if (!arr || !arr.length) return <span style={{ color:'var(--muted)' }}>—</span>
  return <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>{arr.map(x => <span key={x} style={{ fontSize:12.2, fontWeight:600, color:'var(--on-tint-blue)', background:'var(--primary-tint)', borderRadius:6, padding:'3px 9px', fontFamily:JMONO }}>{x}</span>)}</div>
}

export function JobModal({ onClose, stop, toast, record, mode, onSubmit, onEdit }) {
  const view = mode === 'view'
  const edit = mode === 'edit'
  const [ddo, setDdo] = useState(null)
  const [priority, setPriority] = useState((record && record.priority) || 'Medium')
  const [params, setParams] = useState(record && record.parameters ? [...record.parameters] : [])
  const [maxRetries, setMaxRetries] = useState(record ? (record.maxRetries || 0) : 3)
  const [retryInterval, setRetryInterval] = useState(record ? (record.retryInterval || 0) : 60)
  const [allowParallel, setAllowParallel] = useState(!!(record && record.allowParallel))
  const [active, setActive] = useState(record ? record.active !== false : true)
  const f = useForm({ code:(record && record.code) || '', name:(record && record.name) || '', description:(record && record.description) || '', assemblyName:(record && record.assemblyName) || '', className:(record && record.className) || '', cronExpress:(record && record.cronExpress) || '', cronExpressJson:(record && record.cronExpressJson) || '', triggerDesc:(record && record.triggerDesc) || '' }, v => {
    const e = {}
    if (!v.code.trim()) e.code = 'Code is required.'
    if (!v.name.trim()) e.name = 'Name is required.'
    if (!v.className.trim()) e.className = 'Class name is required.'
    return e
  })
  const dd = (id, value, options, onSelect) => ({ value, options, open: ddo === id, onToggle: () => setDdo(o => o === id ? null : id), onSelect: (v) => { onSelect(v); setDdo(null) } })
  const save = () => f.trySubmit(() => {
    onSubmit({ code:f.values.code.trim(), name:f.values.name.trim(), description:f.values.description.trim(), assemblyName:f.values.assemblyName.trim(), className:f.values.className.trim(), cronExpress:f.values.cronExpress.trim(), cronExpressJson:f.values.cronExpressJson.trim(), triggerDesc:f.values.triggerDesc.trim(), allowParallel, active, priority, maxRetries, retryInterval, parameters:params }, record)
    onClose()
    toast(edit ? 'Job updated successfully.' : 'Job created successfully.', 'success')
  })
  const taStyle = { ...S.input, height:'auto', padding:'10px 14px', resize:'vertical', lineHeight:1.5 }

  if (view) {
    return (
      <Modal title={record.name} desc={'Job configuration · ' + record.code} onClose={onClose} stop={stop} width={840}
        footer={<><button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Close</button><button data-ix="primary" onClick={onEdit} style={S.modalBtnPrimary}><Icon d="M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" size={15} />Edit job</button></>}>
        <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:10, padding:'13px 16px', borderRadius:12, background:'var(--primary-tint-2)', border:'1px solid var(--border-blue)' }}>
            <span style={{ fontSize:12.6, fontWeight:700, fontFamily:JMONO, color:'#0a4a8c', background:'var(--primary-tint)', border:'1px solid #0a4a8c22', borderRadius:6, padding:'3px 9px' }}>{record.code}</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:12.8, fontWeight:600, color:'var(--ink)' }}><span aria-hidden style={{ width:8, height:8, borderRadius:'50%', background:JPRIO_DOT[record.priority] || JPRIO_DOT.Low }} />{record.priority} priority</span>
            <span aria-hidden style={{ width:1, height:16, background:'var(--border-blue)' }} />
            <span style={{ fontSize:12.8, fontWeight:600, color: record.active ? 'var(--success-text)' : 'var(--muted)' }}>{record.active ? 'Active' : 'Inactive'}</span>
          </div>
          <Section title="Identification" hint="Code, name and parameters." icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" cols={2}>
            <JRow label="Code"><span style={{ fontFamily:JMONO }}>{record.code}</span></JRow>
            <JRow label="Name">{record.name}</JRow>
            <JRow label="Description" full>{record.description || <span style={{ color:'var(--muted)' }}>—</span>}</JRow>
            <JRow label="Parameters list" full>{jtags(record.parameters)}</JRow>
          </Section>
          <Section title="Implementation" hint="The .NET assembly and class executed." icon="M16 18l6-6-6-6 M8 6l-6 6 6 6" cols={2}>
            <JRow label="Assembly name"><span style={{ fontFamily:JMONO }}>{record.assemblyName || '—'}</span></JRow>
            <JRow label="Class name"><span style={{ fontFamily:JMONO }}>{record.className || '—'}</span></JRow>
          </Section>
          <Section title="Scheduling" hint="Cron expression and trigger cadence." icon="M8 2v4 M16 2v4 M3 9h18 M3 5h18v16H3z" cols={2}>
            <JRow label="Triggering schedule">{record.triggerDesc || <span style={{ color:'var(--muted)' }}>—</span>}</JRow>
            <JRow label="Cron expression"><span style={{ fontFamily:JMONO }}>{record.cronExpress || '—'}</span></JRow>
            <JRow label="Cron JSON" full><pre style={{ margin:0, padding:'10px 12px', background:'var(--surface-alt)', border:'1px solid var(--border)', borderRadius:8, fontSize:12.4, fontFamily:JMONO, whiteSpace:'pre-wrap', lineHeight:1.5, color:'var(--ink)' }}>{record.cronExpressJson || '—'}</pre></JRow>
            <JRow label="Parallel execution">{record.allowParallel ? 'Allowed' : 'Not allowed'}</JRow>
          </Section>
          <Section title="Execution" hint="Priority and retry behaviour." icon="M13 2L3 14h9l-1 8 10-12h-9z" cols={3}>
            <JRow label="Priority">{record.priority}</JRow>
            <JRow label="Max retries"><span style={{ fontVariantNumeric:'tabular-nums' }}>{record.maxRetries}</span></JRow>
            <JRow label="Retry interval"><span style={{ fontVariantNumeric:'tabular-nums' }}>{record.retryInterval}s</span></JRow>
          </Section>
        </div>
      </Modal>
    )
  }

  return (
    <Modal title={edit ? 'Edit job' : 'New job'} desc={edit ? 'Update this scheduled job.' : 'Register a background job in the scheduler.'} onClose={onClose} stop={stop} width={880} shake={f.shake} onShakeEnd={f.clearShake}
      footer={<ModalFooter onClose={onClose} onSave={save} save={edit ? 'Save changes' : 'Create job'} />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <div style={{ display:'grid' }}><ErrBanner /></div>}
        <Section title="Identification" hint="Code, name, description and parameters." icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" cols={2}>
          <Field id="jb-code" label="Code" req value={f.values.code} onChange={f.set('code')} error={f.err('code')} placeholder="e.g. JOB_USER_IMPORT" />
          <Field id="jb-name" label="Name" req value={f.values.name} onChange={f.set('name')} error={f.err('name')} placeholder="e.g. Bulk User Import" />
          <Field id="jb-desc" label="Description" full>
            <textarea id="jb-desc" value={f.values.description} onChange={f.set('description')} rows={2} maxLength={500} placeholder="What this job does and when it runs…" style={taStyle} />
          </Field>
          <Field id="jb-params" label="Parameters list" hint="Arguments passed to the job at runtime." full>
            <JChips id="jb-params" values={params} onChange={setParams} placeholder="Type a parameter, press Enter" />
          </Field>
        </Section>
        <Section title="Implementation" hint="The assembly and class the scheduler invokes." icon="M16 18l6-6-6-6 M8 6l-6 6 6 6" cols={2}>
          <Field id="jb-asm" label="Assembly name" value={f.values.assemblyName} onChange={f.set('assemblyName')} placeholder="e.g. Saras.Jobs.dll" />
          <Field id="jb-class" label="Class name" req value={f.values.className} onChange={f.set('className')} error={f.err('className')} placeholder="e.g. Saras.Jobs.BulkUserImport" />
        </Section>
        <Section title="Scheduling" hint="Cron expression and trigger cadence." icon="M8 2v4 M16 2v4 M3 9h18 M3 5h18v16H3z" cols={2}>
          <div style={{ gridColumn:'1 / -1', display:'flex', gap:16, flexWrap:'wrap' }}>
            <div style={{ flex:'2 1 280px', minWidth:0 }}><Field id="jb-trigger" label="Triggering schedule" value={f.values.triggerDesc} onChange={f.set('triggerDesc')} placeholder="e.g. Daily at 02:00" /></div>
            <div style={{ flex:'1 1 150px', minWidth:0 }}><Field id="jb-cron" label="Cron expression" value={f.values.cronExpress} onChange={f.set('cronExpress')} placeholder="e.g. 0 2 * * *" /></div>
          </div>
          <Field id="jb-cronjson" label="Cron JSON" hint="Structured form of the cron expression — generated automatically." full>
            <pre style={{ margin:0, minHeight:44, padding:'10px 14px', background:'var(--surface-alt)', border:'1.5px solid #E4E9F0', borderRadius:10, fontSize:12.6, fontFamily:JMONO, color:'var(--muted)', whiteSpace:'pre-wrap', lineHeight:1.5, display:'flex', alignItems:'center', gap:8 }}><span style={{ minWidth:0, flex:1 }}>{f.values.cronExpressJson || '—'}</span><span aria-hidden style={{ flex:'none', color:'#B9C2CF', display:'flex' }} title="Read-only"><Icon d="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4" size={14} /></span></pre>
          </Field>
          <div style={{ gridColumn:'1 / -1' }}>
            <ToggleField title="Allow parallel execution" hint="Permit overlapping runs when a previous run is still in progress." checked={allowParallel} onChange={setAllowParallel} />
          </div>
        </Section>
        <Section title="Execution" hint="Priority and retry behaviour." icon="M13 2L3 14h9l-1 8 10-12h-9z" cols={3}>
          <Field id="jb-prio" label="Priority" hint="1-High, 2-Medium, 3-Low."><Dropdown menuPortal {...dd('prio', priority, eventPriorityOptions, setPriority)} ariaLabel="Priority" leadIcon="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></Field>
          <div><label style={S.label}>Max retries allowed</label><Stepper value={maxRetries} onChange={setMaxRetries} min={0} max={99} /></div>
          <div><label style={S.label}>Retry interval (seconds)</label><Stepper value={retryInterval} onChange={setRetryInterval} min={0} max={86400} step={30} /></div>
        </Section>
        <ToggleField title="Active" hint="Whether this job is active and eligible to run." checked={active} onChange={setActive} />
      </div>
    </Modal>
  )
}
