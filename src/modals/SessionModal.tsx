import React from 'react'
import { Modal, S, Icon } from '../ui'
import { sessionDetails } from '../data'

const SMONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'
const SESS_META = {
  Active:  { bg:'var(--green-tint)', color:'var(--success-text)', dot:'var(--success)' },
  Closed:  { bg:'var(--surface-alt)', color:'var(--muted)', dot:'#9AA6B4' },
  Expired: { bg:'var(--amber-tint)', color:'var(--warning-text)', dot:'var(--warning)' },
}

export function SessionModal({ onClose, stop, toast, record }) {
  const det = (record && sessionDetails[record.account]) || {}
  const c = SESS_META[record.status] || SESS_META.Closed
  const row = (label, node, mono) => (
    <div style={{ display:'flex', flexDirection:'column', gap:4, minWidth:0 }}>
      <span style={{ fontSize:11.6, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}>{label}</span>
      <span style={{ fontSize:13.8, color:'var(--ink)', fontFamily: mono ? SMONO : 'inherit', fontVariantNumeric:'tabular-nums', overflowWrap:'anywhere' }}>{node || '\u2014'}</span>
    </div>
  )
  const revoke = () => { onClose(); toast('Session ' + (det.id || '') + ' revoked.', 'success') }
  return (
    <Modal title={record.account} desc={'Session ' + (det.id || '') + ' \u00b7 ' + (det.tenant || '')} onClose={onClose} stop={stop} width={640}
      footer={<>
        {record.status === 'Active' && <button data-ix="ghost" onClick={revoke} style={{ ...S.modalBtnGhost, color:'#B42318', borderColor:'#F3C6C6', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:7, whiteSpace:'nowrap' }}><Icon d="M18.36 6.64a9 9 0 1 1-12.73 0 M12 2v10" size={15} />Revoke session</button>}
        <button data-ix="primary" onClick={onClose} style={S.modalBtnPrimary}>Close</button>
      </>}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:18 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'12px 16px', borderRadius:12, background:c.bg }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:12.8, fontWeight:600, color:c.color }}><span aria-hidden style={{ width:8, height:8, borderRadius:'50%', flex:'none', background:c.dot }} />{record.status}</span>
          <span style={{ fontSize:12.8, color:'var(--muted)', fontFamily:SMONO }}>{det.id}</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16, padding:16, border:'1px solid var(--border)', borderRadius:12, background:'var(--primary-tint-2)' }}>
          {row('Account', record.account)}
          {row('Tenant', det.tenant)}
          {row('Sign-in method', det.method)}
          {row('Multi-factor', det.mfa ? 'Satisfied' : 'Not used')}
          {row('Started', record.started)}
          {row('Last activity', det.lastActivity)}
          {row('Expires', det.expires)}
          {row('IP address', record.ip, true)}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          <span style={{ fontSize:11.6, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}>Device</span>
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 14px', border:'1px solid var(--border)', borderRadius:10, background:'var(--surface)' }}>
            <span aria-hidden style={{ display:'flex', alignItems:'center', justifyContent:'center', width:34, height:34, borderRadius:9, flex:'none', background:'var(--primary-tint)', color:'var(--primary)' }}><Icon d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9 M2 16h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z" size={16} /></span>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:13.6, fontWeight:600, color:'var(--ink)' }}>{record.device}</div>
              <div style={{ fontSize:12.2, color:'var(--muted)', marginTop:2 }}>{(det.userAgent || '\u2014') + ' \u00b7 ' + record.location}</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
