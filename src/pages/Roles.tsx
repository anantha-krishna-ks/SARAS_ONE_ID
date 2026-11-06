import React, { useState } from 'react'
import { PageHead, S, Icon, Badge, IconBtn, SearchBar, Dropdown, Empty } from '../ui'
import { statusBadge, users } from '../data'

export function Roles({ roles, toast, openRole, editRole, openMapPerms, openMapAccounts, deleteRole }) {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [openDd, setOpenDd] = useState(false)
  const statusOpts = ['All', 'Active', 'Inactive']
  const maxPrivs = Math.max(...roles.map(x => x.privs))
  const q = search.trim().toLowerCase()
  const shown = roles.filter(r => (filter === 'All' || r.status === filter) && (!q || (r.name + ' ' + r.code + ' ' + r.desc).toLowerCase().includes(q)))
  const scopeMeta = (s) => s === 'Global'
    ? { color:'#0a4a8c', bg:'var(--primary-tint)', icon:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2c3 3 3 17 0 20 M12 2c-3 3-3 17 0 20' }
    : { color:'#1FA463', bg:'var(--green-tint)', icon:'M3 21h18 M5 21V7l7-4 7 4v14 M9 9h.01 M15 9h.01 M9 13h.01 M15 13h.01' }
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Roles" sub={`Reusable privilege sets \u00B7 ${roles.length} defined`}>
        <button data-ix="primary" onClick={openRole} style={S.primary}><Icon d="M12 5v14 M5 12h14" />New role</button>
      </PageHead>
      <section style={{ ...S.card, marginBottom:16, overflow:'visible' }}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search roles…" standalone>
          <div style={{ minWidth:212 }}><Dropdown value={filter} options={statusOpts} open={openDd} onToggle={() => setOpenDd(o => !o)} onSelect={(v) => { setFilter(v); setOpenDd(false) }} leadIcon="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" prefix="Status:" ariaLabel="Filter by status" /></div>
        </SearchBar>
      </section>
      {shown.length > 0 ? (
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:16 }}>
        {shown.map(r => {
          const badge = statusBadge(r.status)
          const sm = scopeMeta(r.scope)
          const acctCount = users.filter(u => u.role === r.name).length
          return (
            <section key={r.code} data-ix="card" style={{ ...S.card, position:'relative', display:'flex', flexDirection:'column', borderRadius:16, boxShadow:'0 1px 2px rgba(16,42,84,.05)' }}>
              <div style={{ padding:'20px 22px 0', flex:1 }}>
                <div style={{ position:'relative', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
                  <span aria-hidden style={{ position:'absolute', left:-22, top:0, bottom:0, width:3, borderRadius:'0 2px 2px 0', background: r.status === 'Active' ? 'var(--primary)' : '#C4CDD9' }} />
                  <h3 style={{ fontSize:19, fontWeight:600, color:'var(--ink)', margin:0, lineHeight:1.25, letterSpacing:'-.015em' }}>{r.name}</h3>
                  <Badge b={badge} />
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:9, marginTop:6, flexWrap:'wrap' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', fontSize:11.4, fontWeight:700, fontFamily:'ui-monospace, SFMono-Regular, Menlo, monospace', color:'#0a4a8c', letterSpacing:'.03em', background:'var(--primary-tint)', border:'1px solid #0a4a8c33', borderRadius:6, padding:'3px 9px' }}>{r.code}</span>
                </div>
                <p style={{ fontSize:12.9, lineHeight:1.6, color:'var(--muted)', margin:'13px 0 18px', textWrap:'pretty' }}>{r.desc}</p>
                <div style={{ display:'flex', alignItems:'stretch', gap:24, padding:'14px 16px', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', background:'var(--surface-alt)', borderRadius:10 }}>
                  <div>
                    <div style={{ fontSize:18, fontWeight:700, color:'var(--ink)', lineHeight:1, fontVariantNumeric:'tabular-nums' }}>{r.privs}</div>
                    <div style={{ fontSize:12.5, color:'var(--muted)', marginTop:6 }}>Privileges</div>
                  </div>
                  <div aria-hidden style={{ width:1, background:'var(--border)', alignSelf:'stretch' }} />
                  <div>
                    <div style={{ fontSize:18, fontWeight:700, color:'var(--ink)', lineHeight:1, fontVariantNumeric:'tabular-nums' }}>{acctCount}</div>
                    <div style={{ fontSize:12.5, color:'var(--muted)', marginTop:6 }}>Accounts</div>
                  </div>
                  <div aria-hidden style={{ width:1, background:'var(--border)', alignSelf:'stretch' }} />
                  <div>
                    <div style={{ fontSize:18, fontWeight:700, color:'var(--ink)', lineHeight:1, fontVariantNumeric:'tabular-nums' }}>{Array.isArray(r.apps) ? r.apps.length : Math.max(1, Math.min(9, Math.ceil((r.privs || 0) / 6)))}</div>
                    <div style={{ fontSize:12.5, color:'var(--muted)', marginTop:6 }}>Applications</div>
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', gap:8, padding:'16px 22px 18px', marginTop:4 }}>
                <button data-ix="primary" onClick={() => openMapPerms(r.name)} style={{ ...S.primary, flex:1, minWidth:0, height:40, justifyContent:'center', fontSize:13 }}><Icon d="M11 6h9 M11 12h9 M3.5 6l1.4 1.4L7 5" size={15} />Map privileges</button>
                <IconBtn label="Map accounts to this role" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" style={{ width:40, height:40 }} onClick={() => openMapAccounts(r)} />
                <IconBtn label="Edit role" d="M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" style={{ width:40, height:40 }} onClick={() => editRole(r)} />
                <IconBtn label="Delete role" ix="dang" d="M3 6h18 M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" style={{ width:40, height:40 }} onClick={() => deleteRole(r)} />
              </div>
            </section>
          )
        })}
      </div>
      ) : <Empty title="No roles match your filters" hint="Try a different search term or status." />}
    </div>
  )
}
