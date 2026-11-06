import React, { useState } from 'react'
import { Modal, ModalFooter, Icon, Radio, Checkbox } from '../ui'

export function ManageStatusModal({ node, onClose, stop, toast, onSubmit }) {
  const OPTS = [
    { key:'Active', color:'var(--success)', bg:'var(--green-tint)', soft:'rgba(31,164,99,.16)', icon:'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M8.5 12.5l2.5 2.5 4.5-5', desc:'Operational and available across the platform' },
    { key:'Inactive', color:'#6B7787', bg:'var(--surface-alt)', soft:'rgba(107,119,135,.16)', icon:'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M8 12h8', desc:'Hidden from selection but retained for records' },
    { key:'Suspended', color:'#DC2626', bg:'#FDECEC', soft:'rgba(220,38,38,.15)', icon:'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M4.9 4.9l14.2 14.2', desc:'Access to this unit is temporarily blocked' },
  ]
  const dotFor = (st) => st === 'Active' ? 'var(--success)' : st === 'Suspended' ? '#DC2626' : '#9AA6B4'
  const kids = node && node.children ? node.children : []
  const [sel, setSel] = useState(node && node.status ? node.status : 'Active')
  const [reason, setReason] = useState('')
  const [picked, setPicked] = useState(() => new Set())
  const hasKids = kids.length > 0
  const allSel = hasKids && picked.size === kids.length
  const toggleAll = () => setPicked(() => allSel ? new Set() : new Set(kids.map(c => c.code)))
  const togglePick = (code) => setPicked(p => { const n = new Set(p); n.has(code) ? n.delete(code) : n.add(code); return n })
  const save = () => { onSubmit(node.code, sel, { reason, targets: [...picked] }); const extra = picked.size ? ' (+' + picked.size + ' sub-unit' + (picked.size === 1 ? '' : 's') + ')' : ''; toast('Status for ' + node.name + extra + ' set to ' + sel + '.', sel === 'Active' ? 'success' : 'info'); onClose() }
  return (
    <Modal title="Manage status" desc={node ? node.name + (node.type ? ' · ' + node.type : '') : 'Set the unit status.'} onClose={onClose} stop={stop} width={500} footer={<ModalFooter onClose={onClose} onSave={save} save="Save status" />}>
      <div style={{ padding:'20px 22px', display:'flex', flexDirection:'column', gap:18 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
          <span style={{ fontSize:11.5, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}>Status</span>
          <div role="radiogroup" aria-label="Status" style={{ display:'flex', flexDirection:'column', gap:9 }}>
            {OPTS.map(o => { const active = sel === o.key; return (
              <button key={o.key} type="button" role="radio" aria-checked={active} onClick={() => setSel(o.key)} style={{ position:'relative', display:'flex', alignItems:'center', gap:14, width:'100%', textAlign:'left', padding:'14px 16px', borderRadius:15, cursor:'pointer', border:'1.5px solid ' + (active ? o.color : 'var(--border)'), background: active ? o.bg : 'var(--surface)', boxShadow:'none', transition:'border-color .18s ease, background .18s ease' }}>
                <span aria-hidden style={{ flex:'none', width:40, height:40, borderRadius:12, background: active ? 'var(--surface)' : o.bg, color:o.color, display:'flex', alignItems:'center', justifyContent:'center', transition:'background .18s ease' }}><Icon d={o.icon} size={20} sw={2.1} /></span>
                <span style={{ display:'flex', flexDirection:'column', gap:2, flex:1, minWidth:0 }}>
                  <span style={{ fontSize:14.5, fontWeight:600, color:'var(--ink)', letterSpacing:'-.01em' }}>{o.key}</span>
                  <span style={{ fontSize:12, color:'var(--muted)', lineHeight:1.4 }}>{o.desc}</span>
                </span>
                <Radio checked={active} color={o.color} soft={o.soft} />
              </button>
            )})}
          </div>
        </div>
        {hasKids && (
          <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
              <span style={{ fontSize:11.5, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}>Cascade to sub-units{picked.size ? ' · ' + picked.size : ''}</span>
              <button type="button" data-ix="opt" onClick={toggleAll} style={{ border:'none', background:'transparent', padding:0, cursor:'pointer', font:'inherit', fontSize:12, fontWeight:600, color:'var(--primary)' }}>{allSel ? 'Clear all' : 'Select all'}</button>
            </div>
            <div style={{ border:'1px solid var(--border)', borderRadius:12, background:'var(--surface)', maxHeight:168, overflowY:'auto', padding:6, display:'flex', flexDirection:'column', gap:2 }}>
              {kids.map(c => { const on = picked.has(c.code); return (
                <label key={c.code} data-ix="treerow" style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 11px', borderRadius:10, cursor:'pointer', background: on ? 'var(--primary-tint-2)' : 'transparent', border:'1px solid ' + (on ? 'var(--border-blue)' : 'transparent'), transition:'background .15s ease, border-color .15s ease' }}>
                  <Checkbox checked={on} onChange={() => togglePick(c.code)} />
                  <span aria-hidden style={{ flex:'none', width:8, height:8, borderRadius:'50%', background:dotFor(c.status) }} />
                  <span style={{ fontSize:13, fontWeight:500, color:'var(--ink)', flex:1, minWidth:0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.name}</span>
                  <span style={{ fontSize:11, color:'var(--muted)', flex:'none' }}>{c.status}</span>
                </label>
              )})}
            </div>
          </div>
        )}
        <textarea value={reason} onChange={e => setReason(e.target.value)} rows={2} placeholder="Reason for this change (optional)…" style={{ width:'100%', resize:'vertical', font:'inherit', fontSize:13, color:'var(--ink)', padding:'10px 12px', borderRadius:11, border:'1px solid var(--border)', background:'var(--surface)', boxSizing:'border-box' }} />
      </div>
    </Modal>
  )
}
