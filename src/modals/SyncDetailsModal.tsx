import React from 'react'
import { Modal, S, Th } from '../ui'
import { syncFmt } from '../data'
import { SyncOp, SyncStatus, syncMono } from '../components/SyncBits'

export function SyncDetailsModal({ rec, onClose, stop }) {
  const total = rec.deliveries.length
  const pct = total ? rec.applied / total * 100 : 0
  const cell = (label, node, mono) => (
    <div style={{ display:'flex', flexDirection:'column', gap:4, minWidth:0 }}>
      <span style={{ fontSize:11.6, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}>{label}</span>
      <span style={{ fontSize:13.6, color:'var(--ink)', fontFamily: mono ? syncMono : 'inherit', fontVariantNumeric:'tabular-nums', overflowWrap:'anywhere' }}>{node}</span>
    </div>
  )
  return (
    <Modal title="Event details" desc={rec.id + ' · ' + rec.entityName + ' · ' + rec.code} onClose={onClose} stop={stop} width={760}
      footer={<button data-ix="primary" onClick={onClose} style={S.modalBtnPrimary}>Close</button>}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:18 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(170px, 1fr))', gap:16, padding:16, border:'1px solid var(--border)', borderRadius:12, background:'var(--primary-tint-2)' }}>
          {cell('Entity', rec.entityName)}
          {cell('Code', rec.code, true)}
          {cell('Operation', <SyncOp op={rec.operation} />)}
          {cell('Occurred at', syncFmt(rec.ts))}
          {cell('Status', <SyncStatus status={rec.status} />)}
          {cell('Completed at', syncFmt(rec.completedAt))}
        </div>
        {total > 0 && (
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:13, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap' }}>{rec.applied} of {total} subscriptions applied</span>
            <div style={{ flex:1, height:6, borderRadius:999, background:'#E9EEF5', overflow:'hidden' }}><div style={{ height:'100%', width:Math.max(2, pct) + '%', borderRadius:999, background: rec.failed ? '#DC2626' : 'var(--success)' }} /></div>
            {rec.failed > 0 && <span style={{ fontSize:12.4, fontWeight:600, color:'#B42318', whiteSpace:'nowrap' }}>{rec.failed} failed</span>}
          </div>
        )}
        <div style={{ border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
          {total > 0 ? (
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead><tr><Th label="Application" align="left" /><Th label="Status" align="left" /><Th label="Completed on" align="left" /></tr></thead>
              <tbody>
                {rec.deliveries.map(d => (
                  <tr key={d.app} style={{ borderTop:'1px solid var(--border)' }}>
                    <td style={{ padding:'12px 16px', verticalAlign:'top' }}>
                      <div style={{ fontSize:13.6, fontWeight:600, color:'var(--ink)' }}>{d.app}</div>
                      {d.error && <div style={{ fontSize:11.8, color:'#B42318', marginTop:3, fontFamily:syncMono }}>{d.error}</div>}
                    </td>
                    <td style={{ padding:'12px 16px', verticalAlign:'top' }}><SyncStatus status={d.status} /></td>
                    <td style={{ padding:'12px 16px', verticalAlign:'top', fontSize:13, color: d.at ? 'var(--ink)' : 'var(--muted)', whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums' }}>{d.status === 'Applied' ? syncFmt(d.at) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding:'26px 20px', textAlign:'center', display:'flex', flexDirection:'column', gap:6 }}>
              <span style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>Not expanded yet</span>
              <span style={{ fontSize:12.8, color:'var(--muted)' }}>Subscriber deliveries are created once this event is expanded.</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
