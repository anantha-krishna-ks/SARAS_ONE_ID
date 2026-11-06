import React, { useState } from 'react'
import { S, Modal, ModalFooter, Section, Field, Dropdown, useForm, ErrBanner, ToggleField, Icon, EMAIL_RE } from '../ui'
import { eventChannelOptions, eventTimingSuggestions, eventJobOptions, eventPriorityOptions, appClientNames } from '../data'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'
const PRIO_DOT = { High:'#DC2626', Medium:'var(--warning)', Low:'var(--success)' }
const CH_ICON = {
  Email: 'M4 5h16v14H4z M22 6l-10 7L2 6',
  SMS: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M8 9h8 M8 13h5',
  'In-app': 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0',
  Push: 'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M11 19h2',
  WhatsApp: 'M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z M9.1 8.2c-.2 0-.5.1-.6.3-.3.3-.7.8-.7 1.7 0 1 .7 2 .9 2.2.1.2 1.5 2.4 3.7 3.3 1.9.7 2.3.6 2.7.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.7-.3s-1-.5-1.2-.5c-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.1-.4 0-.3-.1-1-.4-1.7-1-.6-.5-1-1.1-1.1-1.4-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.4v-.4c0-.1-.5-1.2-.6-1.6-.2-.4-.4-.4-.5-.4z',
}

function ChipsInput({ id, values, onChange, placeholder, suggestions, mono }) {
  const [draft, setDraft] = useState('')
  const add = (v) => { const t = String(v).trim(); if (t && !values.includes(t)) onChange([...values, t]); setDraft('') }
  const remove = (i) => onChange(values.filter((_, x) => x !== i))
  const onKey = (e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(draft) } else if (e.key === 'Backspace' && !draft && values.length) remove(values.length - 1) }
  const avail = (suggestions || []).filter(s => !values.includes(s))
  return (
    <div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:7, alignItems:'center', minHeight:44, padding:'7px 10px', borderRadius:10, border:'1.5px solid #D5DBE4', background:'var(--surface)' }}>
        {values.map((v, i) => (
          <span key={v + i} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 6px 4px 10px', borderRadius:8, background:'var(--primary-tint)', color:'var(--on-tint-blue)', fontSize:12.8, fontWeight:600, fontFamily: mono ? MONO : 'inherit' }}>
            {v}
            <button type="button" aria-label={'Remove ' + v} onClick={() => remove(i)} style={{ display:'inline-flex', border:'none', background:'transparent', color:'var(--on-tint-blue)', cursor:'pointer', padding:2, lineHeight:0, borderRadius:5 }}><Icon d="M18 6L6 18 M6 6l12 12" size={12} sw={2.4} /></button>
          </span>
        ))}
        <input id={id} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={onKey} onBlur={() => draft && add(draft)} placeholder={values.length ? '' : placeholder} style={{ flex:1, minWidth:130, border:'none', outline:'none', background:'transparent', fontFamily:'inherit', fontSize:14, color:'var(--ink)' }} />
      </div>
      {avail.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:8 }}>
          {avail.map(s => <button key={s} type="button" onClick={() => add(s)} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:999, border:'1px dashed #C7D0DD', background:'var(--surface-alt)', color:'var(--muted)', fontSize:12.4, fontWeight:600, cursor:'pointer' }}><Icon d="M12 5v14 M5 12h14" size={12} sw={2.4} />{s}</button>)}
        </div>
      )}
    </div>
  )
}

function ChoiceChips({ options, values, onChange }) {
  const toggle = (o) => onChange(values.includes(o) ? values.filter(v => v !== o) : [...values, o])
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
      {options.map(o => {
        const on = values.includes(o)
        return (
          <button key={o} type="button" role="checkbox" aria-checked={on} onClick={() => toggle(o)} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 13px', borderRadius:10, cursor:'pointer', fontSize:13.2, fontWeight:600, border:'1.5px solid ' + (on ? 'var(--primary)' : '#D5DBE4'), background: on ? 'var(--primary-tint)' : 'var(--surface)', color: on ? 'var(--on-tint-blue)' : 'var(--ink)' }}>
            <span aria-hidden style={{ width:17, height:17, borderRadius:5, flex:'none', display:'inline-flex', alignItems:'center', justifyContent:'center', border:'1.5px solid ' + (on ? 'var(--primary)' : '#C4CDD9'), background: on ? 'var(--primary)' : 'transparent' }}>{on && <Icon d="M20 6L9 17l-5-5" size={11} sw={3} style={{ stroke:'#fff' }} />}</span>
            {CH_ICON[o] && <Icon d={CH_ICON[o]} size={15} sw={1.9} style={{ stroke: on ? 'var(--on-tint-blue)' : 'var(--muted)', flex:'none' }} />}
            {o}
          </button>
        )
      })}
    </div>
  )
}

function EvtRow({ label, children, full }) {
  return (
    <div style={{ gridColumn: full ? '1 / -1' : 'auto', display:'flex', flexDirection:'column', gap:6, minWidth:0 }}>
      <span style={{ fontSize:11.4, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}>{label}</span>
      <div style={{ fontSize:13.8, color:'var(--ink)', lineHeight:1.55 }}>{children}</div>
    </div>
  )
}

function tagRow(arr, mono) {
  if (!arr || !arr.length) return <span style={{ color:'var(--muted)' }}>—</span>
  return <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>{arr.map(x => <span key={x} style={{ fontSize:12.2, fontWeight:600, color:'var(--on-tint-blue)', background:'var(--primary-tint)', borderRadius:6, padding:'3px 9px', fontFamily: mono ? MONO : 'inherit' }}>{x}</span>)}</div>
}

function RO({ children }) {
  const empty = children === '' || children === undefined || children === null
  return <div style={{ minHeight:44, borderRadius:10, border:'1.5px solid #E4E9F0', background:'var(--surface-alt)', padding:'10px 14px', fontSize:14, color:'var(--muted)', display:'flex', alignItems:'center', gap:8, lineHeight:1.5 }}><span style={{ minWidth:0, flex:1 }}>{empty ? '—' : children}</span><span aria-hidden style={{ flex:'none', color:'#B9C2CF', display:'flex' }} title="Read-only"><Icon d="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4" size={14} /></span></div>
}

export function EventModal({ onClose, stop, toast, record, mode, onSubmit, onEdit }) {
  const view = mode === 'view'
  const edit = mode === 'edit'
  const [ddo, setDdo] = useState(null)
  const [app, setApp] = useState((record && record.app) || appClientNames[0])
  const [priority, setPriority] = useState((record && record.priority) || 'Medium')
  const [channels, setChannels] = useState(record && record.channels ? [...record.channels] : ['Email'])
  const [timings] = useState(record && record.timings ? [...record.timings] : ['Immediate'])
  const [deliveryMode, setDeliveryMode] = useState(record && record.timings && !(record.timings.length === 1 && record.timings[0] === 'Immediate') ? 'Scheduled' : 'Immediate')
  const [schedTimings, setSchedTimings] = useState(record && record.timings ? record.timings.filter(t => t !== 'Immediate').map(t => { const m = String(t).match(/([01]?\d|2[0-3]):[0-5]\d/); return m ? (m[0].length === 4 ? '0' + m[0] : m[0]) : null }).filter(Boolean) : [])
  const [schedTime, setSchedTime] = useState('')
  const addSchedTime = () => { if (!/^\d{2}:\d{2}$/.test(schedTime)) { toast('Pick a time in HH:MM format.', 'warning'); return } setSchedTimings(v => v.includes(schedTime) ? v : [...v, schedTime].sort()); setSchedTime('') }
  const [bcc, setBcc] = useState(record && record.bcc ? [...record.bcc] : [])
  const [msgCheck, setMsgCheck] = useState(null)
  const [params, setParams] = useState(record && record.parameters ? [...record.parameters] : [])
  const [hasJob, setHasJob] = useState(!!(record && record.hasJob))
  const [jobName, setJobName] = useState((record && record.jobName) || '')
  const [active, setActive] = useState(record ? record.active !== false : true)
  const f = useForm({ code:(record && record.code) || '', name:(record && record.name) || '', description:(record && record.description) || '', subject:(record && record.subject) || '', shortMsg:(record && record.shortMsg) || '', longMsg:(record && record.longMsg) || '' }, v => {
    const e = {}
    if (!v.code.trim()) e.code = 'Code is required.'
    if (!v.name.trim()) e.name = 'Name is required.'
    if (!v.subject.trim()) e.subject = 'Subject is required.'
    return e
  })
  const dd = (id, value, options, onSelect) => ({ value, options, open: ddo === id, onToggle: () => setDdo(o => o === id ? null : id), onSelect: (v) => { onSelect(v); setDdo(null) } })
  const validateMsg = () => {
    const issues = []
    if (!f.values.subject.trim()) issues.push('Subject is empty.')
    if (!f.values.shortMsg.trim() && !f.values.longMsg.trim()) issues.push('Provide a short or long message body.')
    if ((channels.includes('SMS') || channels.includes('Push')) && !f.values.shortMsg.trim()) issues.push('Short message is required for SMS / push channels.')
    const used = []
    const re = /\{\{\s*([\w.]+)\s*\}\}|\{(\w+)\}/g
    const scan = f.values.subject + ' ' + f.values.shortMsg + ' ' + f.values.longMsg
    let m
    while ((m = re.exec(scan))) used.push(m[1] || m[2])
    used.filter((v, i) => used.indexOf(v) === i).forEach(p => { if (!params.includes(p)) issues.push('Placeholder \u201c' + p + '\u201d is not in the parameters list.') })
    const ok = issues.length === 0
    setMsgCheck({ ok, issues })
    toast(ok ? 'Message validated \u2014 ready to send.' : 'Validation found ' + issues.length + ' issue' + (issues.length > 1 ? 's' : '') + '.', ok ? 'success' : 'warning')
  }
  const exportEvt = () => toast('Exporting event configuration\u2026', 'success')
  const save = () => f.trySubmit(() => {
    if (channels.length === 0) { toast('Select at least one delivery channel.', 'warning'); return }
    if (hasJob && !jobName) { toast('Select a job for scheduled invocation.', 'warning'); return }
    if (deliveryMode === 'Scheduled' && schedTimings.length === 0) { toast('Add at least one scheduled delivery timing.', 'warning'); return }
    if (bcc.some(b => !EMAIL_RE.test(b))) { toast('BCC contains an invalid email id.', 'warning'); return }
    onSubmit({ code:f.values.code.trim(), name:f.values.name.trim(), app, description:f.values.description.trim(), parameters:params, priority, subject:f.values.subject.trim(), shortMsg:f.values.shortMsg.trim(), longMsg:f.values.longMsg.trim(), channels, timings: deliveryMode === 'Immediate' ? ['Immediate'] : schedTimings, bcc, hasJob, jobName: hasJob ? jobName : '', active }, record)
    onClose()
    toast(edit ? 'Event updated successfully.' : 'Event created successfully.', 'success')
  })
  const taStyle = { ...S.input, height:'auto', padding:'10px 14px', resize:'vertical', lineHeight:1.5 }

  if (view) {
    return (
      <Modal title={record.name} desc={'Event configuration · ' + record.code} onClose={onClose} stop={stop} width={820}
        footer={<><button data-ix="ghost" onClick={() => toast('Exporting event configuration\u2026', 'success')} style={S.modalBtnGhost}><Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3" size={15} />Export</button><button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Close</button><button data-ix="primary" onClick={onEdit} style={S.modalBtnPrimary}><Icon d="M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" size={15} />Edit event</button></>}>
        <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:10, padding:'13px 16px', borderRadius:12, background:'var(--primary-tint-2)', border:'1px solid var(--border-blue)' }}>
            <span style={{ fontSize:12.6, fontWeight:700, fontFamily:MONO, color:'#0a4a8c', background:'var(--primary-tint)', border:'1px solid #0a4a8c22', borderRadius:6, padding:'3px 9px' }}>{record.code}</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:12.8, fontWeight:600, color:'var(--ink)' }}><span aria-hidden style={{ width:8, height:8, borderRadius:'50%', background:PRIO_DOT[record.priority] || PRIO_DOT.Low }} />{record.priority} priority</span>
            <span aria-hidden style={{ width:1, height:16, background:'var(--border-blue)' }} />
            <span style={{ fontSize:12.8, fontWeight:600, color: record.active ? 'var(--success-text)' : 'var(--muted)' }}>{record.active ? 'Active' : 'Inactive'}</span>
          </div>
          <Section title="Identification" hint="What this event is and where it belongs." icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" cols={2}>
            <EvtRow label="Code"><span style={{ fontFamily:MONO }}>{record.code}</span></EvtRow>
            <EvtRow label="Name">{record.name}</EvtRow>
            <EvtRow label="Application">{record.app}</EvtRow>
            <EvtRow label="Parameters">{tagRow(record.parameters, true)}</EvtRow>
            <EvtRow label="Description" full>{record.description || <span style={{ color:'var(--muted)' }}>—</span>}</EvtRow>
          </Section>
          <Section title="Message content" hint="Subject and body dispatched to recipients." icon="M4 4h16v16H4z M22 6l-10 7L2 6" cols={1}>
            <EvtRow label="Subject">{record.subject}</EvtRow>
            <EvtRow label="Short message">{record.shortMsg || <span style={{ color:'var(--muted)' }}>—</span>}</EvtRow>
            <EvtRow label="Long message"><span style={{ whiteSpace:'pre-wrap' }}>{record.longMsg || '—'}</span></EvtRow>
          </Section>
          <Section title="Delivery & invocation" hint="Channels, timings and how the event fires." icon="M22 2L11 13 M22 2l-7 20-4-9-9-4z" cols={2}>
            <EvtRow label="Delivery channels">{tagRow(record.channels)}</EvtRow>
            <EvtRow label="Message delivery timings">{tagRow(record.timings)}</EvtRow>
            <EvtRow label="Invocation through">{record.hasJob ? 'Scheduled job' : 'Manual trigger'}</EvtRow>
            <EvtRow label="Job name">{record.hasJob ? (record.jobName || '—') : <span style={{ color:'var(--muted)' }}>Not applicable</span>}</EvtRow>
          </Section>
        </div>
      </Modal>
    )
  }

  return (
    <Modal title={edit ? 'Edit event' : 'New event'} desc={edit ? 'Update this event’s configuration.' : 'Define a notification-triggering event.'} onClose={onClose} stop={stop} width={880} shake={f.shake} onShakeEnd={f.clearShake}
      footer={<><button data-ix="ghost" onClick={exportEvt} style={S.modalBtnGhost}><Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3" size={15} />Export</button><button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Cancel</button><button data-ix="primary" onClick={save} style={S.modalBtnPrimary}>{edit ? 'Save changes' : 'Create event'}</button></>}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <div style={{ display:'grid' }}><ErrBanner /></div>}
        {edit && <div style={{ display:'flex', alignItems:'center', gap:9, padding:'10px 14px', borderRadius:10, background:'var(--primary-tint-2)', border:'1px solid var(--border-blue)', color:'var(--ink)', fontSize:12.8, lineHeight:1.5 }}><Icon d="M12 16v-4 M12 8h.01 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" size={16} style={{ stroke:'var(--on-tint-blue)', flex:'none' }} />When editing an event, the subject, messages, delivery channels, delivery timing and status can be changed.</div>}
        <Section title="Identification" hint="Code, name and the application this event belongs to." icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" cols={2}>
          <Field id="ev-code" label="Code" req value={f.values.code} onChange={f.set('code')} error={f.err('code')} placeholder="e.g. EVT_USER_INVITED">{edit ? <RO>{f.values.code}</RO> : null}</Field>
          <Field id="ev-name" label="Name" req value={f.values.name} onChange={f.set('name')} error={f.err('name')} placeholder="e.g. User Invited">{edit ? <RO>{f.values.name}</RO> : null}</Field>
          <Field id="ev-app" label="Application">{edit ? <RO>{app}</RO> : <Dropdown menuPortal {...dd('app', app, appClientNames, setApp)} ariaLabel="Application" leadIcon="M3 5h18v14H3z M3 9h18 M7 7h.01" />}</Field>
          <Field id="ev-desc" label="Description" full>
            {edit ? <RO>{f.values.description || '—'}</RO> : <textarea id="ev-desc" value={f.values.description} onChange={f.set('description')} rows={2} maxLength={500} placeholder="What this event represents and when it fires…" style={taStyle} />}
          </Field>
        </Section>
        <Section title="Message content" hint="Subject and body sent to recipients." icon="M4 4h16v16H4z M22 6l-10 7L2 6" cols={1}>
          <Field id="ev-subject" label="Subject" req value={f.values.subject} onChange={f.set('subject')} error={f.err('subject')} placeholder="e.g. You’re invited to SARAS One" />
          <Field id="ev-short" label="Short message" hint="Up to 250 characters — used for SMS and push.">
            <textarea id="ev-short" value={f.values.shortMsg} onChange={f.set('shortMsg')} rows={2} maxLength={250} placeholder="Concise message for SMS / push…" style={taStyle} />
          </Field>
          <Field id="ev-long" label="Long message" hint="Up to 500 characters — used for email and in-app.">
            <textarea id="ev-long" value={f.values.longMsg} onChange={f.set('longMsg')} rows={4} maxLength={500} placeholder="Full message body…" style={taStyle} />
          </Field>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <div>
              <button type="button" data-ix="ghost" onClick={validateMsg} style={{ ...S.ghost, fontFamily:'inherit' }}><Icon d="M9 12l2 2 4-4 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" size={15} />Validate message</button>
            </div>
            {msgCheck && (msgCheck.ok
              ? <div role="status" style={{ display:'flex', alignItems:'center', gap:9, padding:'10px 14px', borderRadius:10, background:'var(--green-tint)', border:'1px solid #BBE3C5', color:'var(--success-text)', fontSize:13 }}><Icon d="M20 6L9 17l-5-5" size={15} sw={2.5} style={{ flex:'none' }} />Message looks good — subject, body and parameters are consistent.</div>
              : <div role="alert" style={{ padding:'10px 14px', borderRadius:10, background:'#FDECEC', border:'1px solid #F5C6C6', color:'#B42318', fontSize:13, lineHeight:1.6 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, fontWeight:600 }}><Icon d="M12 9v4 M12 17h.01 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" size={15} style={{ flex:'none' }} />Message needs attention</div>
                  <ul style={{ margin:'6px 0 0', paddingLeft:22 }}>{msgCheck.issues.map((x, i) => <li key={i}>{x}</li>)}</ul>
                </div>)}
          </div>
        </Section>
        <Section title="Delivery" hint="Priority, channels and delivery timing." icon="M22 2L11 13 M22 2l-7 20-4-9-9-4z" cols={2}>
          <Field id="ev-prio" label="Priority" hint="1-High, 2-Medium, 3-Low.">{edit ? <RO>{priority}</RO> : <Dropdown menuPortal {...dd('prio', priority, eventPriorityOptions, setPriority)} ariaLabel="Priority" leadIcon="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />}</Field>
          <div />
          <Field id="ev-channels" label="Delivery channels" req full>
            <ChoiceChips options={eventChannelOptions} values={channels} onChange={setChannels} />
          </Field>
          <Field id="ev-bcc" label="BCC" hint="Email ids blind-copied on every delivery — type an address, press Enter." full>
            <ChipsInput id="ev-bcc" values={bcc} onChange={setBcc} placeholder="Add an email id, press Enter" mono />
          </Field>
          <Field id="ev-timings" label="Message delivery timing" full>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div role="radiogroup" aria-label="Delivery timing" style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {['Immediate', 'Scheduled'].map(o => {
                  const on = deliveryMode === o
                  return (
                    <button key={o} type="button" role="radio" aria-checked={on} onClick={() => setDeliveryMode(o)} style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'8px 13px', borderRadius:10, cursor:'pointer', fontSize:13.2, fontWeight:600, border:'1.5px solid ' + (on ? 'var(--primary)' : '#D5DBE4'), background: on ? 'var(--primary-tint)' : 'var(--surface)', color: on ? 'var(--on-tint-blue)' : 'var(--ink)' }}>
                      <span aria-hidden style={{ width:15, height:15, borderRadius:'50%', flex:'none', border:'1.5px solid ' + (on ? 'var(--primary)' : '#C4CDD9'), display:'inline-flex', alignItems:'center', justifyContent:'center' }}>{on && <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--primary)' }} />}</span>
                      {o}
                    </button>
                  )
                })}
              </div>
              {deliveryMode === 'Scheduled' && (
                <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                    <input id="ev-timings" type="time" value={schedTime} onChange={(e) => setSchedTime(e.target.value)} aria-label="Delivery time in HH:MM" style={{ ...S.input, width:132, fontVariantNumeric:'tabular-nums' }} />
                    <button type="button" data-ix="opt" onClick={addSchedTime} style={{ display:'inline-flex', alignItems:'center', gap:7, border:'1px solid var(--border-blue)', background:'var(--primary-tint)', color:'var(--on-tint-blue)', padding:'9px 14px', borderRadius:9, cursor:'pointer', font:'inherit', fontSize:12.8, fontWeight:600 }}><Icon d="M12 5v14 M5 12h14" size={13} />Add timing</button>
                    <span style={{ fontSize:12, color:'var(--muted)' }}>24-hour HH:MM — add as many timings as needed.</span>
                  </div>
                  {schedTimings.length > 0 && (
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                      {schedTimings.map(t => (
                        <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 8px 5px 12px', borderRadius:999, background:'var(--primary-tint)', border:'1px solid var(--border-blue)', color:'var(--on-tint-blue)', fontSize:12.8, fontWeight:600, fontVariantNumeric:'tabular-nums' }}>
                          <Icon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2" size={13} />{t}
                          <button type="button" aria-label={'Remove ' + t} onClick={() => setSchedTimings(v => v.filter(x => x !== t))} style={{ display:'flex', border:'none', background:'transparent', color:'inherit', cursor:'pointer', padding:2 }}><Icon d="M18 6L6 18 M6 6l12 12" size={11} sw={2.4} /></button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </Field>
        </Section>
        <Section title="Invocation" hint="How this event is triggered." icon="M13 2L3 14h9l-1 8 10-12h-9z" cols={2}>
          <div style={{ gridColumn:'1 / -1' }}>
            {edit ? <div><label style={S.label}>Invocation through</label><RO>{hasJob ? 'Scheduled job' : 'Manual trigger'}</RO></div> : <ToggleField title="Invocation through scheduled job" hint="Off: manual trigger · On: fired by a scheduled job." checked={hasJob} onChange={setHasJob} />}
          </div>
          {hasJob && (
            <Field id="ev-job" label="Job name" full>
              {edit ? <RO>{jobName || '—'}</RO> : <Dropdown menuPortal {...dd('job', jobName || 'Select a job…', eventJobOptions, setJobName)} ariaLabel="Job name" leadIcon="M4 4h16v16H4z M8 9l3 3-3 3 M13 15h4" />}
            </Field>
          )}
        </Section>
        <ToggleField title="Active" hint="Whether this event is active and able to fire notifications." checked={active} onChange={setActive} />
      </div>
    </Modal>
  )
}
