import React, { useState } from 'react'
import { Modal, S, Icon } from '../ui'

export function HealthCheckModal({ tenant, onClose, stop, toast }) {
  const [running, setRunning] = useState(true)
  React.useEffect(() => { const id = setTimeout(() => setRunning(false), 900); return () => clearTimeout(id) }, [])
  const checks = [
    { label:'Authentication service', ok:true, detail:'Responding · 42 ms' },
    { label:'Directory sync', ok:true, detail:'Last run 6 min ago' },
    { label:'MFA provider', ok:true, detail:'Operational' },
    { label:'License quota', ok:false, detail:'82% of seats used' },
    { label:'Audit log pipeline', ok:true, detail:'Streaming' },
    { label:'Data backup', ok:true, detail:'Completed 03:00' },
  ]
  const warns = checks.filter(c => !c.ok).length
  return (
    <Modal title={'Health check — ' + tenant.name} desc="Live status of core services for this tenant." onClose={onClose} stop={stop} width={560}
      footer={<><button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Close</button><button data-ix="primary" onClick={() => { onClose(); toast('Health report exported.', 'success') }} style={S.modalBtnPrimary}>Export report</button></>}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', borderRadius:12, background: warns ? 'var(--amber-tint)' : 'var(--green-tint)', border:'1px solid ' + (warns ? '#F1D8A8' : '#BFE6CC') }}>
          <span aria-hidden style={{ flex:'none', width:38, height:38, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: warns ? 'var(--warning)' : 'var(--success)', color:'#fff' }}><Icon d={warns ? 'M12 9v4 M12 17h.01 M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' : 'M20 6L9 17l-5-5'} size={19} sw={2.4} /></span>
          <div style={{ display:'flex', flexDirection:'column', gap:2, flex:1, minWidth:0 }}>
            <span style={{ fontSize:14.3, fontWeight:600, color:'var(--ink)', lineHeight:1.3 }}>{running ? 'Running checks…' : warns ? warns + ' item needs attention' : 'All systems healthy'}</span>
            <span style={{ fontSize:12.4, color:'var(--muted)', lineHeight:1.3 }}>{checks.length} services checked</span>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {checks.map((c, i) => (
            <div key={c.label} style={{ display:'flex', alignItems:'center', gap:12, padding:'11px 14px', border:'1px solid var(--border)', borderRadius:10, background:'var(--surface)', opacity: running ? .5 : 1, transition:'opacity .3s ease ' + (i * 60) + 'ms' }}>
              <span aria-hidden style={{ flex:'none', width:26, height:26, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: c.ok ? 'var(--green-tint)' : 'var(--amber-tint)', color: c.ok ? 'var(--success)' : 'var(--warning)' }}><Icon d={c.ok ? 'M20 6L9 17l-5-5' : 'M12 8v4 M12 16h.01 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z'} size={14} sw={2.6} /></span>
              <span style={{ flex:1, minWidth:0, fontSize:13.5, fontWeight:500, color:'var(--ink)' }}>{c.label}</span>
              <span style={{ fontSize:12, color:'var(--muted)', whiteSpace:'nowrap', flex:'none' }}>{running ? '…' : c.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
