import React, { useState } from 'react'
import { S, Modal, ModalFooter, Section, Field, Dropdown, RecipientPicker, Stepper, useForm, ErrBanner, Icon } from '../ui'
import { notifEventOptions, notifSenderOptions, notifStatusOptions, eventChannelOptions, eventPriorityOptions, recipientDirectory, genBadge } from '../data'

const NMONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'
const NPRIO_DOT = { High:'#DC2626', Medium:'var(--warning)', Low:'var(--success)' }

function NtRow({ label, children, full }) {
  return (
    <div style={{ gridColumn: full ? '1 / -1' : 'auto', display:'flex', flexDirection:'column', gap:6, minWidth:0 }}>
      <span style={{ fontSize:11.4, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}>{label}</span>
      <div style={{ fontSize:13.8, color:'var(--ink)', lineHeight:1.55 }}>{children}</div>
    </div>
  )
}

export function NotificationModal({ onClose, stop, toast, record, mode, onSubmit, onEdit }) {
  const view = mode === 'view'
  const edit = mode === 'edit'
  const [ddo, setDdo] = useState(null)
  const [event, setEvent] = useState((record && record.event) || notifEventOptions[0])
  const [sender, setSender] = useState((record && record.sender) || notifSenderOptions[0])
  const [recipient, setRecipient] = useState((record && record.recipient) || '')
  const [channel, setChannel] = useState((record && record.channel) || 'Email')
  const [priority, setPriority] = useState((record && record.priority) || 'Medium')
  const [status, setStatus] = useState((record && record.status) || 'Draft')
  const [iterations, setIterations] = useState(record ? (record.iterations || 0) : 0)
  const f = useForm({ message:(record && record.message) || '', completedAt:(record && record.completedAt && record.completedAt !== '—') ? record.completedAt : '', failedReason:(record && record.failedReason) || '' }, v => {
    const e = {}
    if (!recipient.trim()) e.recipient = 'Recipient is required.'
    if (!v.message.trim()) e.message = 'Message text is required.'
    return e
  })
  const dd = (id, value, options, onSelect) => ({ value, options, open: ddo === id, onToggle: () => setDdo(o => o === id ? null : id), onSelect: (v) => { onSelect(v); setDdo(null) } })
  const save = () => f.trySubmit(() => {
    onSubmit({ event, sender, recipient: recipient.trim(), channel, message:f.values.message.trim(), status, completedAt: f.values.completedAt.trim() || '—', iterations, priority, failedReason: status === 'Failed' ? f.values.failedReason.trim() : '' }, record)
    onClose()
    toast(edit ? 'Notification updated successfully.' : 'Notification created successfully.', 'success')
  })
  const taStyle = { ...S.input, height:'auto', padding:'10px 14px', resize:'vertical', lineHeight:1.5 }

  if (view) {
    return (
      <Modal title={record.event} desc={'Notification to ' + record.recipient} onClose={onClose} stop={stop} width={820}
        footer={<><button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Close</button><button data-ix="primary" onClick={onEdit} style={S.modalBtnPrimary}><Icon d="M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" size={15} />Edit notification</button></>}>
        <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
          <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:10, padding:'13px 16px', borderRadius:12, background:'var(--primary-tint-2)', border:'1px solid var(--border-blue)' }}>
            <span style={genBadge(record.status)}>{record.status}</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:12.8, fontWeight:600, color:'var(--ink)' }}><span aria-hidden style={{ width:8, height:8, borderRadius:'50%', background:NPRIO_DOT[record.priority] || NPRIO_DOT.Low }} />{record.priority} priority</span>
            <span aria-hidden style={{ width:1, height:16, background:'var(--border-blue)' }} />
            <span style={{ fontSize:12.8, color:'var(--muted)' }}>{record.channel}</span>
          </div>
          <Section title="Routing" hint="Event source and the accounts involved." icon="M4 4h16v16H4z M22 6l-10 7L2 6" cols={2}>
            <NtRow label="Event">{record.event}</NtRow>
            <NtRow label="Delivery channel">{record.channel}</NtRow>
            <NtRow label="Sender">{record.sender}</NtRow>
            <NtRow label="Recipient">{record.recipient}</NtRow>
          </Section>
          <Section title="Message" hint="The message body dispatched to the recipient." icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" cols={1}>
            <NtRow label="Message text"><span style={{ whiteSpace:'pre-wrap' }}>{record.message}</span></NtRow>
          </Section>
          <Section title="Delivery state" hint="Status, attempts and completion." icon="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M8.5 12.5l2.5 2.5 4.5-5" cols={2}>
            <NtRow label="Status"><span style={genBadge(record.status)}>{record.status}</span></NtRow>
            <NtRow label="Priority">{record.priority}</NtRow>
            <NtRow label="Iterations"><span style={{ fontVariantNumeric:'tabular-nums' }}>{record.iterations}</span></NtRow>
            <NtRow label="Completion time"><span style={{ fontVariantNumeric:'tabular-nums' }}>{record.completedAt}</span></NtRow>
            {record.status === 'Failed' && record.failedReason && <NtRow label="Failure reason" full><pre style={{ margin:0, padding:'12px 14px', background:'#FDECEC', border:'1px solid #F3C6C6', borderRadius:10, color:'#B42318', fontSize:12.6, fontFamily:NMONO, whiteSpace:'pre-wrap', lineHeight:1.5 }}>{record.failedReason}</pre></NtRow>}
          </Section>
        </div>
      </Modal>
    )
  }

  return (
    <Modal title={edit ? 'Edit notification' : 'New notification'} desc={edit ? 'Update this outbound message.' : 'Compose an outbound notification message.'} onClose={onClose} stop={stop} width={880} shake={f.shake} onShakeEnd={f.clearShake}
      footer={<ModalFooter onClose={onClose} onSave={save} save={edit ? 'Save changes' : 'Create notification'} />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        {f.submitted && !f.valid && <div style={{ display:'grid' }}><ErrBanner /></div>}
        <Section title="Routing" hint="The triggering event and the accounts involved." icon="M4 4h16v16H4z M22 6l-10 7L2 6" cols={2}>
          <Field id="nt-event" label="Event"><Dropdown menuPortal {...dd('event', event, notifEventOptions, setEvent)} ariaLabel="Event" leadIcon="M13 2L3 14h9l-1 8 10-12h-9z" /></Field>
          <Field id="nt-channel" label="Delivery channel"><Dropdown menuPortal {...dd('channel', channel, eventChannelOptions, setChannel)} ariaLabel="Delivery channel" leadIcon="M22 2L11 13 M22 2l-7 20-4-9-9-4z" /></Field>
          <Field id="nt-sender" label="Sender"><Dropdown menuPortal {...dd('sender', sender, notifSenderOptions, setSender)} ariaLabel="Sender" leadIcon="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" /></Field>
          <Field id="nt-recipient" label="Recipient" req error={f.err('recipient')}><RecipientPicker value={recipient} onChange={setRecipient} directory={recipientDirectory} ariaLabel="Recipient" /></Field>
        </Section>
        <Section title="Message" hint="The message body dispatched to the recipient." icon="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" cols={1}>
          <Field id="nt-message" label="Message text" req error={f.err('message')}>
            <textarea id="nt-message" value={f.values.message} onChange={f.set('message')} rows={4} placeholder="The message content sent to the recipient…" style={{ ...taStyle, ...(f.err('message') ? { border:'1.5px solid var(--danger)', boxShadow:'0 0 0 3px rgba(220,38,38,.12)' } : {}) }} />
          </Field>
        </Section>
        <Section title="Delivery state" hint="Priority, status, attempts and completion." icon="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M8.5 12.5l2.5 2.5 4.5-5" cols={2}>
          <Field id="nt-prio" label="Priority" hint="1-High, 2-Medium, 3-Low."><Dropdown menuPortal {...dd('prio', priority, eventPriorityOptions, setPriority)} ariaLabel="Priority" leadIcon="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></Field>
          <Field id="nt-status" label="Status"><Dropdown menuPortal {...dd('status', status, notifStatusOptions, setStatus)} ariaLabel="Status" leadIcon="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M8.5 12.5l2.5 2.5 4.5-5" /></Field>
          <div><label style={S.label}>Iterations</label><Stepper value={iterations} onChange={setIterations} min={0} max={99} /></div>
          <Field id="nt-completed" label="Completion time" hint="Sent datetime; leave blank if not yet sent." value={f.values.completedAt} onChange={f.set('completedAt')} placeholder="e.g. 17 Aug 2026, 09:12" />
          {status === 'Failed' && (
            <Field id="nt-failed" label="Failure reason" hint="Structured reason (JSON)." full>
              <textarea id="nt-failed" value={f.values.failedReason} onChange={f.set('failedReason')} rows={4} placeholder='{ "code": "SMTP_TIMEOUT", "detail": "…" }' style={{ ...taStyle, fontFamily:NMONO, fontSize:12.8 }} />
            </Field>
          )}
        </Section>
      </div>
    </Modal>
  )
}
