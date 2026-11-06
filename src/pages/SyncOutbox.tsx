import React, { useState } from 'react'
import { PageHead, S, SearchBar, Th, Pager, pageWindow, RowActions, IconBtn, FilterBar, Empty } from '../ui'
import { syncOutbox, syncEntities, syncOps, syncEventStatuses, syncFmt } from '../data'
import { drBound } from '../components/DateRange'
import { SyncStatus, SyncOp, syncMono } from '../components/SyncBits'
import { SyncPayloadModal } from '../modals/SyncPayloadModal'
import { SyncDetailsModal } from '../modals/SyncDetailsModal'

export function SyncOutbox({ toast }) {
  const [code, setCode] = useState('')
  const [entity, setEntity] = useState('All')
  const [op, setOp] = useState('All')
  const [stat, setStat] = useState('All')
  const [win, setWin] = useState({ from:'', to:'' })
  const [sort, setSort] = useState({ col:-1, dir:'asc' })
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [payloadRec, setPayloadRec] = useState(null)
  const [detailRec, setDetailRec] = useState(null)
  React.useEffect(() => { setPage(1) }, [code, entity, op, stat, win, size, sort])
  const q = code.trim().toLowerCase()
  const from = win.from ? drBound(win.from, false) : null
  const to = win.to ? drBound(win.to, true) : null
  let rows = syncOutbox.filter(e =>
    (entity === 'All' || e.entityName === entity) &&
    (op === 'All' || e.operation === op) &&
    (stat === 'All' || e.status === stat) &&
    (from === null || e.ts >= from) && (to === null || e.ts <= to) &&
    (!q || e.code.toLowerCase().includes(q)))
  const keyf = [e => e.entityName, e => e.code, e => e.operation, e => e.ts, e => syncEventStatuses.indexOf(e.status), e => e.completedAt || 0, e => (e.subs == null ? -1 : e.subs), e => e.applied]
  if (sort.col >= 0) {
    const f = keyf[sort.col], dir = sort.dir === 'asc' ? 1 : -1
    rows = [...rows].sort((a, b) => { const av = f(a), bv = f(b); return (av < bv ? -1 : av > bv ? 1 : 0) * dir })
  }
  const w = pageWindow(rows.length, page, size)
  const pageRows = rows.slice(w.from > 0 ? w.from - 1 : 0, w.to)
  const doSort = (i) => setSort(s => s.col === i ? { col:i, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col:i, dir:'asc' })
  const cols = ['Entity', 'Code', 'Operation', 'Occurred at', 'Status', 'Completed at', '# Subscriptions', '# Applied']
  const td = { padding:'13px 16px', fontSize:13, color:'var(--ink)' }
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Sync Outbox" sub="Change events captured in SARAS One and their delivery to subscribed applications" />
      <section style={{ ...S.card, overflow:'visible' }}>
        <SearchBar value={code} onChange={(e) => setCode(e.target.value)} placeholder="Search by code…" topRound>
          <FilterBar wide filters={[
            { key:'entity', label:'Entity', icon:'M12 2C7 2 4 3.3 4 5v14c0 1.7 3 3 8 3s8-1.3 8-3V5c0-1.7-3-3-8-3z M4 5c0 1.7 3 3 8 3s8-1.3 8-3 M4 12c0 1.7 3 3 8 3s8-1.3 8-3', value:entity, onChange:setEntity, options:['All', ...syncEntities.map(e => e.name)] },
            { key:'op', label:'Operation', icon:'M13 2L3 14h9l-1 8 10-12h-9l1-8z', value:op, onChange:setOp, options:['All', ...syncOps] },
            { key:'stat', label:'Status', icon:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', value:stat, onChange:setStat, options:['All', ...syncEventStatuses] },
            { key:'win', label:'Timeframe', icon:'M3 5h18v16H3z M3 10h18 M8 3v4 M16 3v4', type:'range', value:win, onChange:setWin },
          ]} />
        </SearchBar>
        {rows.length > 0 ? (
          <>
            <div className="tscroll" style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:1180 }}>
                <thead><tr>{cols.map((c, i) => <Th key={c} label={c} align={i >= 6 ? 'right' : 'left'} sortable active={sort.col === i} dir={sort.dir} onSort={() => doSort(i)} />)}<th scope="col" style={{ ...S.th, background:'#EAF3FF', textAlign:'right' }}>Actions</th></tr></thead>
                <tbody>
                  {pageRows.map(e => (
                    <tr key={e.id} data-ix="row" style={{ borderBottom:'1px solid var(--border)' }}>
                      <td style={td}><div style={{ fontSize:13.8, fontWeight:600 }}>{e.entityName}</div><div style={{ fontSize:11.4, color:'var(--muted)', marginTop:2, fontFamily:syncMono }}>{e.id}</div></td>
                      <td style={{ ...td, fontFamily:syncMono, fontSize:12.6 }}>{e.code}</td>
                      <td style={td}><SyncOp op={e.operation} /></td>
                      <td style={{ ...td, whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums' }}>{syncFmt(e.ts)}</td>
                      <td style={td}><SyncStatus status={e.status} /></td>
                      <td style={{ ...td, whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums', color: e.completedAt ? 'var(--ink)' : 'var(--muted)' }}>{syncFmt(e.completedAt)}</td>
                      <td style={{ ...td, textAlign:'right', fontVariantNumeric:'tabular-nums', color: e.subs == null ? 'var(--muted)' : 'var(--ink)' }}>{e.subs == null ? '—' : e.subs}</td>
                      <td style={{ ...td, textAlign:'right', whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums' }}>
                        <span style={{ display:'inline-flex', alignItems:'center', gap:8, justifyContent:'flex-end' }}>
                          {e.failed > 0 && <span style={{ padding:'2px 8px', borderRadius:999, background:'#FDECEC', color:'#B42318', fontSize:11.4, fontWeight:600 }}>{e.failed} failed</span>}
                          <span style={{ fontWeight:600, color: e.subs && e.applied === e.subs ? 'var(--success-text)' : 'var(--ink)' }}>{e.subs == null ? '—' : e.applied}</span>
                        </span>
                      </td>
                      <td style={{ padding:'13px 16px' }}>
                        <RowActions>
                          <IconBtn label="View payload" d="M16 18l6-6-6-6 M8 6l-6 6 6 6" onClick={() => setPayloadRec(e)} />
                          <IconBtn label="Delivery details" d="M11 6h10 M11 12h10 M11 18h10 M3 6l1.5 1.5L7.5 4.5 M3 12l1.5 1.5L7.5 10.5 M3 18l1.5 1.5L7.5 16.5" onClick={() => setDetailRec(e)} />
                        </RowActions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager total={rows.length} page={w.cur} size={size} onPage={setPage} onSize={setSize} />
          </>
        ) : <Empty title="No events match your filters" hint="Try a different entity, operation, status or timeframe." />}
      </section>
      {payloadRec && <SyncPayloadModal rec={payloadRec} onClose={() => setPayloadRec(null)} stop={(ev) => ev.stopPropagation()} toast={toast} />}
      {detailRec && <SyncDetailsModal rec={detailRec} onClose={() => setDetailRec(null)} stop={(ev) => ev.stopPropagation()} />}
    </div>
  )
}
