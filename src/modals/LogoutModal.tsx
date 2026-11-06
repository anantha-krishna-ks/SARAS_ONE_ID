import React, { useState } from 'react'
import { S, Icon, Radio } from '../ui'

export function LogoutModal({ onClose, stop, onLogout, sessions }) {
  const titleId = 'logout-' + React.useId()
  const ICON = { desktop:'M3 5h18v11H3z M8 20h8 M12 16v4', mobile:'M7 2h10v20H7z M11 18h2', tablet:'M5 3h14v18H5z M11 18h2' }
  const LABEL = { desktop:'Desktop', mobile:'Mobile', tablet:'Tablet' }
  const list = sessions || [
    { id:'s1', type:'desktop', device:'Chrome · Windows 11', place:'Bengaluru, IN', when:'Active now', current:true },
    { id:'s2', type:'mobile', device:'Safari · iPhone 15', place:'Bengaluru, IN', when:'2 h ago' },
    { id:'s3', type:'desktop', device:'Edge · macOS', place:'Mysuru, IN', when:'Yesterday' },
    { id:'s4', type:'mobile', device:'Chrome · Pixel 8', place:'Chennai, IN', when:'Yesterday' },
    { id:'s5', type:'tablet', device:'Safari · iPad Air', place:'Bengaluru, IN', when:'2 days ago' },
    { id:'s6', type:'desktop', device:'Firefox · Ubuntu', place:'Pune, IN', when:'3 days ago' },
    { id:'s7', type:'desktop', device:'Chrome · Windows 10', place:'Hyderabad, IN', when:'4 days ago' },
    { id:'s8', type:'mobile', device:'SARAS app · Android', place:'Bengaluru, IN', when:'5 days ago' },
    { id:'s9', type:'desktop', device:'Chrome · macOS', place:'Singapore, SG', when:'6 days ago' },
  ]
  const cur = list.find(s => s.current)
  const others = list.filter(s => !s.current)
  const groups = ['desktop', 'mobile', 'tablet'].map(t => ({ t, items:others.filter(s => s.type === t) })).filter(g => g.items.length)
  const [scope, setScope] = useState('this')
  const [review, setReview] = useState(false)
  const [busy, setBusy] = useState(false)
  const all = scope === 'all'
  const go = () => { setBusy(true); setTimeout(() => { onLogout(scope, list.length); onClose() }, 450) }
  const opt = (k, title, sub, extra) => {
    const on = scope === k
    return (
      <div role="radio" tabIndex={0} aria-checked={on} onClick={() => setScope(k)} onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setScope(k) } }} style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'12px 14px', borderRadius:12, border:'1.5px solid ' + (on ? (k === 'all' ? 'var(--danger)' : 'var(--primary)') : 'var(--border)'), background: on ? (k === 'all' ? '#FEF2F2' : 'var(--primary-tint)') : 'var(--surface)', cursor:'pointer', transition:'border-color .15s ease, background .15s ease' }}>
        <span style={{ marginTop:1, display:'flex' }}><Radio checked={on} size={18} /></span>
        <span style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:4 }}>
          <span style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>{title}</span>
          <span style={{ fontSize:12.4, color:'var(--muted)', lineHeight:1.45 }}>{sub}</span>
          {extra}
        </span>
      </div>
    )
  }
  const chips = (
    <span style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:4 }}>
      {['desktop', 'mobile', 'tablet'].map(t => { const n = list.filter(s => s.type === t).length; return n ? (
        <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'3px 9px', borderRadius:999, background:'var(--surface)', border:'1px solid var(--border)', fontSize:11.8, fontWeight:600, color:'var(--ink)' }}><Icon d={ICON[t]} size={12} />{n} {LABEL[t]}</span>
      ) : null })}
    </span>
  )
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-labelledby={titleId} style={S.overlay}>
      <div onClick={stop} style={{ ...S.modal, maxWidth:440, display:'flex', flexDirection:'column' }}>
        <div style={{ flex:'none', padding:'22px 22px 6px', display:'flex', alignItems:'center', gap:12 }}>
          <span aria-hidden style={{ flex:'none', width:40, height:40, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--primary-tint)', color:'var(--primary)' }}><Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" size={19} sw={2.2} /></span>
          <div style={{ display:'flex', flexDirection:'column', gap:2, minWidth:0 }}>
            <h3 id={titleId} style={{ fontSize:17, fontWeight:600, margin:0, color:'var(--ink)' }}>Log out</h3>
            <span style={{ fontSize:12.6, color:'var(--muted)' }}>You're signed in on {list.length} device{list.length === 1 ? '' : 's'}.</span>
          </div>
        </div>
        <div style={{ flex:1, minHeight:0, overflowY:'auto' }}>
        <div role="radiogroup" aria-label="Log out from" style={{ padding:'14px 22px 4px', display:'flex', flexDirection:'column', gap:8 }}>
          {opt('this', 'This device only', cur ? cur.device + ' · ' + cur.place : 'End the current session.')}
          {opt('all', 'All devices (' + list.length + ')', 'Signs out everywhere, including here. Use if a device is lost or you suspect someone else has access.', chips)}
        </div>
        {others.length > 0 && <div style={{ padding:'6px 22px 16px' }}>
          <button type="button" data-ix="lnk" aria-expanded={review} onClick={() => setReview(r => !r)} style={{ display:'inline-flex', alignItems:'center', gap:6, background:'none', border:'none', padding:'4px 0', font:'inherit', fontSize:12.6, fontWeight:600, color:'var(--primary)', cursor:'pointer' }}>
            {review ? 'Hide' : 'Review'} other sessions ({others.length})
            <Icon d="M6 9l6 6 6-6" size={14} style={{ transform: review ? 'rotate(180deg)' : 'none', transition:'transform .18s ease' }} />
          </button>
          {review && <div style={{ marginTop:8, border:'1px solid var(--border)', borderRadius:12, maxHeight:216, overflowY:'auto', animation:'popIn .14s ease' }}>
            {groups.map(g => (
              <div key={g.t}>
                <div style={{ position:'sticky', top:0, zIndex:1, display:'flex', alignItems:'center', gap:6, padding:'6px 12px', background:'var(--surface-alt)', borderBottom:'1px solid var(--border)', fontSize:11, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}><Icon d={ICON[g.t]} size={12} />{LABEL[g.t]} · {g.items.length}</div>
                {g.items.map(s => (
                  <div key={s.id} style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10, padding:'8px 12px', borderBottom:'1px solid var(--border)', fontSize:12.6 }}>
                    <span style={{ minWidth:0, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.device}</span>
                    <span style={{ flex:'none', fontSize:11.6, color:'var(--muted)' }}>{s.place} · {s.when}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>}
        </div>}
        </div>
        <div style={{ ...S.modalFoot, flex:'none' }}>
          <button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Cancel</button>
          <button data-ix="primary" disabled={busy} onClick={go} style={{ ...S.modalBtnPrimary, background:'var(--danger)', borderColor:'var(--danger)', opacity: busy ? .7 : 1, minWidth:150, justifyContent:'center' }}>{busy ? 'Signing out…' : all ? 'Log out everywhere' : 'Log out'}</button>
        </div>
      </div>
    </div>
  )
}
