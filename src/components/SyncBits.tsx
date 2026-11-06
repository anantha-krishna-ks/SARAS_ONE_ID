import React from 'react'
import { Icon } from '../ui'

export const syncMono = 'ui-monospace, SFMono-Regular, Menlo, monospace'

const SY_GREY = { bg:'var(--surface-alt)', color:'var(--muted)', dot:'#9AA6B4', bd:'var(--border)' }
const SY_GREEN = { bg:'var(--green-tint)', color:'var(--success-text)', dot:'var(--success)', bd:'transparent' }
export const syncStatusMeta = {
  New: SY_GREY,
  Expanded: { bg:'var(--primary-tint)', color:'var(--on-tint-blue)', dot:'var(--primary)', bd:'transparent' },
  'In Process': { bg:'var(--amber-tint)', color:'var(--warning-text)', dot:'var(--warning)', bd:'transparent' },
  Applied: SY_GREEN,
  Pending: SY_GREY,
  Failed: { bg:'#FDECEC', color:'#B42318', dot:'#DC2626', bd:'transparent' },
  Subscribed: SY_GREEN,
  'Not subscribed': SY_GREY,
}

export function SyncStatus({ status }) {
  const c = syncStatusMeta[status] || SY_GREY
  return <span style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'4px 11px', borderRadius:999, background:c.bg, border:'1px solid ' + c.bd, color:c.color, fontSize:12.6, fontWeight:600, whiteSpace:'nowrap' }}><span aria-hidden style={{ width:8, height:8, borderRadius:'50%', flex:'none', background:c.dot }} />{status}</span>
}

const SY_OP = {
  Create: { bg:'var(--green-tint)', color:'var(--success-text)', dot:'var(--success)' },
  Update: { bg:'var(--primary-tint)', color:'var(--on-tint-blue)', dot:'var(--primary)' },
  Delete: { bg:'#FDECEC', color:'#B42318', dot:'#DC2626' },
}
export function SyncOp({ op }) {
  const o = SY_OP[op] || SY_OP.Update
  return <span title={'Operation: ' + op} style={{ display:'inline-flex', alignItems:'center', gap:6, height:24, padding:'0 9px', borderRadius:6, background:o.bg, color:o.color, fontSize:11.6, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', whiteSpace:'nowrap', cursor:'default', userSelect:'none' }}><span aria-hidden style={{ width:6, height:6, borderRadius:1.5, background:o.dot, flex:'none' }}></span>{op}</span>
}
