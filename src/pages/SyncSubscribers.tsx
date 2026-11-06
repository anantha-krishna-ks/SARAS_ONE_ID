import React, { useState } from 'react'
import { PageHead, S, SearchBar, Th, Pager, pageWindow, RowActions, IconBtn, FilterBar, Empty } from '../ui'
import { syncApps, syncEntities, syncOutbox, syncAgo } from '../data'
import { SyncStatus, syncMono } from '../components/SyncBits'
import { SyncSubscriptionModal } from '../modals/SyncSubscriptionModal'

export function SyncSubscribers({ toast }) {
  const [apps, setApps] = useState(syncApps)
  const [search, setSearch] = useState('')
  const [stat, setStat] = useState('All')
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [open, setOpen] = useState(null)
  React.useEffect(() => { setPage(1) }, [search, stat, size])
  const q = search.trim().toLowerCase()
  const rows = apps.filter(a => (stat === 'All' || (stat === 'Subscribed') === a.subscribed) && (!q || (a.name + ' ' + a.code + ' ' + a.desc).toLowerCase().includes(q)))
  const w = pageWindow(rows.length, page, size)
  const pageRows = rows.slice(w.from > 0 ? w.from - 1 : 0, w.to)
  const lastApplied = (a) => { let m = 0; syncOutbox.forEach(e => e.deliveries.forEach(d => { if (d.app === a.name && d.status === 'Applied' && d.at > m) m = d.at })); return m }
  const entName = (code) => (syncEntities.find(e => e.code === code) || {}).name
  const td = { padding:'13px 16px', fontSize:13, color:'var(--ink)' }
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Sync Subscribers" sub="Applications that receive SARAS One changes. Open an application to manage its subscription." />
      <section style={{ ...S.card, overflow:'visible' }}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search applications…" topRound>
          <FilterBar filters={[{ key:'stat', label:'Status', value:stat, onChange:setStat, options:['All', 'Subscribed', 'Not subscribed'] }]} />
        </SearchBar>
        {rows.length > 0 ? (
          <>
            <div className="tscroll" style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:960 }}>
                <thead><tr><Th label="Application" align="left" /><Th label="Status" align="left" /><Th label="Entities" align="left" /><Th label="Columns" align="right" /><Th label="Last applied" align="left" /><th scope="col" style={{ ...S.th, background:'#EAF3FF', textAlign:'right' }}>Actions</th></tr></thead>
                <tbody>
                  {pageRows.map(a => {
                    const codes = Object.keys(a.subs)
                    const nCols = Object.values(a.subs).reduce((s, l) => s + l.length, 0)
                    const last = a.subscribed ? lastApplied(a) : 0
                    return (
                      <tr key={a.code} data-ix="row" tabIndex={0} onClick={() => setOpen(a)} onKeyDown={(e) => { if (e.key === 'Enter') setOpen(a) }} aria-label={'Manage subscription for ' + a.name} style={{ borderBottom:'1px solid var(--border)', cursor:'pointer' }}>
                        <td style={td}><div style={{ fontSize:13.8, fontWeight:600 }}>{a.name}</div><div style={{ fontSize:11.6, color:'var(--muted)', marginTop:2 }}><span style={{ fontFamily:syncMono }}>{a.code}</span> · {a.desc}</div></td>
                        <td style={td}><SyncStatus status={a.subscribed ? 'Subscribed' : 'Not subscribed'} /></td>
                        <td style={td}>
                          {codes.length ? (
                            <span style={{ display:'flex', flexWrap:'wrap', gap:6, opacity: a.subscribed ? 1 : .6 }}>
                              {codes.slice(0, 3).map(c => <span key={c} style={{ padding:'2px 9px', borderRadius:999, background:'var(--primary-tint)', color:'var(--on-tint-blue)', fontSize:11.8, fontWeight:600, whiteSpace:'nowrap' }}>{entName(c)}</span>)}
                              {codes.length > 3 && <span style={{ padding:'2px 9px', borderRadius:999, border:'1px solid var(--border)', color:'var(--muted)', fontSize:11.8, fontWeight:600 }}>+{codes.length - 3}</span>}
                            </span>
                          ) : <span style={{ color:'var(--muted)' }}>None selected</span>}
                        </td>
                        <td style={{ ...td, textAlign:'right', fontVariantNumeric:'tabular-nums', color: nCols ? 'var(--ink)' : 'var(--muted)' }}>{nCols || '—'}</td>
                        <td style={{ ...td, whiteSpace:'nowrap', color: last ? 'var(--ink)' : 'var(--muted)' }}>{last ? syncAgo(last) : '—'}</td>
                        <td style={{ padding:'13px 16px' }} onClick={(e) => e.stopPropagation()}>
                          <RowActions><IconBtn label={'Manage subscription for ' + a.name} d="M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6" onClick={() => setOpen(a)} /></RowActions>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <Pager total={rows.length} page={w.cur} size={size} onPage={setPage} onSize={setSize} />
          </>
        ) : <Empty title="No applications match" hint="Try a different name or status." />}
      </section>
      {open && <SyncSubscriptionModal app={open} toast={toast} onClose={() => setOpen(null)} stop={(e) => e.stopPropagation()} onSave={(next) => setApps(list => list.map(x => x.code === next.code ? next : x))} />}
    </div>
  )
}
