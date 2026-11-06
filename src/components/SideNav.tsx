import React from 'react'
import { Icon } from '../ui'

export function SideNav({ navGroups, navCollapsed, setNavCollapsed, navW, go }) {
  return (
    <>
      <nav aria-label="Main navigation" style={{ position:'fixed', top:64, left:0, bottom:0, width:navW, background:'var(--surface)', borderRight:'1px solid #D5DBE4', padding:'16px 12px', display:'flex', flexDirection:'column', gap:4, overflowY:'auto', overflowX:'hidden', transition:'width .28s ease' }}>
        {navGroups.map(g => (
          <React.Fragment key={g.label}>
            {!navCollapsed && <span style={{ fontSize:11, fontWeight:600, letterSpacing:'.12em', textTransform:'uppercase', color:'#8A93A2', padding:'12px 12px 4px' }}>{g.label}</span>}
            {g.items.map(item => (
              <button key={item.key} data-ix="nav" onClick={() => go(item.key)} aria-current={item.current ? 'page' : undefined} title={item.label} aria-label={item.label}
                style={{ position:'relative', display:'flex', alignItems:'center', gap:12, width:'100%', padding: navCollapsed ? '11px 0' : '10px 12px', justifyContent: navCollapsed ? 'center' : 'flex-start', borderRadius:10, border:'none', cursor:'pointer', fontFamily:'inherit', fontSize:13.8, fontWeight: item.current ? 600 : 500, textAlign:'left', background: item.current ? 'var(--primary-tint)' : 'transparent', color: item.current ? 'var(--primary)' : 'var(--ink)', transition:'background .16s ease,color .16s ease,padding .2s ease' }}>
                {item.current && <span aria-hidden style={{ position:'absolute', left:0, top:'50%', width:3, height:22, borderRadius:'0 3px 3px 0', background:'var(--primary)', transform:'translateY(-50%)', animation:'barIn .22s cubic-bezier(.22,1,.36,1)' }} />}
                <Icon d={item.icon} size={19} style={item.current ? { stroke:'var(--primary)' } : { stroke:'var(--muted)' }} />
                {!navCollapsed && <span style={{ whiteSpace:'nowrap' }}>{item.label}</span>}
              </button>
            ))}
          </React.Fragment>
        ))}
      </nav>

      <button type="button" onClick={() => setNavCollapsed(v => !v)} aria-label={navCollapsed ? 'Expand menu' : 'Collapse menu'} title={navCollapsed ? 'Expand menu' : 'Collapse menu'}
        style={{ position:'fixed', top:78, left:navW - 15, zIndex:59, width:30, height:30, borderRadius:'50%', border:'1px solid #D5DBE4', background:'var(--surface)', color:'var(--primary)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 3px 10px -3px rgba(16,42,84,.25)', cursor:'pointer', transition:'left .28s ease' }}>
        <Icon d="M15 18l-6-6 6-6" size={15} style={{ transform: navCollapsed ? 'rotate(180deg)' : 'none', transition:'transform .2s ease' }} />
      </button>
    </>
  )
}
