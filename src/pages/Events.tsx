import React, { useState } from 'react'
import { PageHead, S, Icon, SearchBar, Dropdown, Th, Pager, pageWindow, RowActions, IconBtn, StatusToggle, EventMenu, FilterBar, Empty } from '../ui'

const PRIO_META = {
  High:   { bg:'#FDECEC', color:'#B42318', dot:'#DC2626' },
  Medium: { bg:'var(--amber-tint)', color:'var(--warning-text)', dot:'var(--warning)' },
  Low:    { bg:'var(--green-tint)', color:'var(--success-text)', dot:'var(--success)' },
}
function PriorityPill({ p }) {
  const c = PRIO_META[p] || PRIO_META.Low
  return <span style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'4px 11px', borderRadius:999, background:c.bg, color:c.color, fontSize:12.6, fontWeight:600, whiteSpace:'nowrap' }}><span aria-hidden style={{ width:8, height:8, borderRadius:'50%', flex:'none', background:c.dot }} />{p}</span>
}

const CHANNEL_ICON = {
  Email: 'M4 5h16v14H4z M22 6l-10 7L2 6',
  SMS: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M8 9h8 M8 13h5',
  'In-app': 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0',
  Push: 'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M11 19h2',
  WhatsApp: 'M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z M9.1 8.2c-.2 0-.5.1-.6.3-.3.3-.7.8-.7 1.7 0 1 .7 2 .9 2.2.1.2 1.5 2.4 3.7 3.3 1.9.7 2.3.6 2.7.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.7-.3s-1-.5-1.2-.5c-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.1-.4 0-.3-.1-1-.4-1.7-1-.6-.5-1-1.1-1.1-1.4-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.4v-.4c0-.1-.5-1.2-.6-1.6-.2-.4-.4-.4-.5-.4z',
}
function ChannelBadges({ channels }) {
  return (
    <div role="list" aria-label={'Channels: ' + channels.join(', ')} style={{ display:'flex', alignItems:'center', gap:6 }}>
      {channels.map(ch => (
        <span key={ch} role="listitem" title={ch} aria-label={ch} style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:28, height:28, borderRadius:8, background:'var(--primary-tint)', border:'1px solid var(--border-blue)', color:'var(--on-tint-blue)', flex:'none' }}>
          <Icon d={CHANNEL_ICON[ch] || 'M12 8v.01 M12 12v4'} size={15} sw={1.9} />
        </span>
      ))}
    </div>
  )
}

export function Events({ events, toast, openNew, openView, openEdit, deleteEvent, toggleEvent }) {
  const [search, setSearch] = useState('')
  const [prio, setPrio] = useState('All')
  const [chan, setChan] = useState('All')
  const [inv, setInv] = useState('All')
  const [stat, setStat] = useState('All')
  const [openDd, setOpenDd] = useState(null)
  const [sort, setSort] = useState({ col:-1, dir:'asc' })
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  React.useEffect(() => { setPage(1) }, [search, prio, chan, inv, stat, size, sort])
  const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace'
  const q = search.trim().toLowerCase()
  let rows = events.filter(e => (prio === 'All' || e.priority === prio) && (chan === 'All' || e.channels.includes(chan)) && (inv === 'All' || (inv === 'Scheduled job' ? e.hasJob : !e.hasJob)) && (stat === 'All' || (stat === 'Active' ? e.active : !e.active)) && (!q || (e.code + ' ' + e.name + ' ' + e.description).toLowerCase().includes(q)))
  if (sort.col >= 0) {
    const keyf = [e => e.code, e => e.name, e => ({ High:0, Medium:1, Low:2 }[e.priority])][sort.col]
    const dir = sort.dir === 'asc' ? 1 : -1
    rows = [...rows].sort((a, b) => { const av = keyf(a), bv = keyf(b); return (av < bv ? -1 : av > bv ? 1 : 0) * dir })
  }
  const w = pageWindow(rows.length, page, size)
  const pageRows = rows.slice(w.from > 0 ? w.from - 1 : 0, w.to)
  const doSort = (i) => setSort(s => s.col === i ? { col:i, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col:i, dir:'asc' })
  const cols = [{ label:'Code', s:true }, { label:'Event', s:true }, { label:'Priority', s:true }, { label:'Trigger' }, { label:'Channels' }, { label:'Status' }]
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Events" sub={'Notification-triggering events and their delivery configuration · ' + events.length + ' defined'} />
      <section style={{ ...S.card, overflow:'visible' }}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events…" topRound />
        {rows.length > 0 ? (
          <>
            <div className="tscroll" style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:940 }}>
                <thead><tr>{cols.map((c, i) => <Th key={i} label={c.label} align="left" sortable={c.s} active={sort.col === i} dir={sort.dir} onSort={() => doSort(i)} />)}<th scope="col" style={{ ...S.th, background:'#EAF3FF', textAlign:'right' }}>Actions</th></tr></thead>
                <tbody>
                  {pageRows.map(e => (
                    <tr key={e.code} data-ix="row" style={{ borderBottom:'1px solid var(--border)' }}>
                      <td style={{ padding:'13px 16px' }}><span style={{ fontSize:12.4, fontWeight:700, fontFamily:mono, color:'#0a4a8c', letterSpacing:'.02em', background:'var(--primary-tint)', border:'1px solid #0a4a8c22', borderRadius:6, padding:'3px 8px', whiteSpace:'nowrap' }}>{e.code}</span></td>
                      <td style={{ padding:'13px 16px' }}><div style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>{e.name}</div><div style={{ fontSize:12, color:'var(--muted)', marginTop:2, maxWidth:300, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{e.subject}</div></td>
                      <td style={{ padding:'13px 16px' }}><PriorityPill p={e.priority} /></td>
                      <td style={{ padding:'13px 16px' }}>
                        <span style={{ display:'inline-flex', alignItems:'center', gap:7, fontSize:12.8, fontWeight:500, color:'var(--ink)' }}><Icon d={e.hasJob ? 'M8 2v4 M16 2v4 M3 9h18 M3 5h18v16H3z' : 'M13 2L3 14h9l-1 8 10-12h-9z'} size={14} style={{ stroke:'var(--muted)' }} />{e.hasJob ? 'Scheduled job' : 'Manual trigger'}</span>
                        {e.hasJob && e.jobName && <div style={{ fontSize:11.6, color:'var(--muted)', marginTop:3, marginLeft:21 }}>{e.jobName}</div>}
                      </td>
                      <td style={{ padding:'13px 16px' }}><ChannelBadges channels={e.channels} /></td>
                      <td style={{ padding:'13px 16px' }}><StatusToggle status={e.active ? 'Active' : 'Inactive'} name={e.name} /></td>
                      <td style={{ padding:'13px 16px' }}>
                        <RowActions>
                          <IconBtn label="Edit event" d="M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" onClick={() => openEdit(e)} />
                          <EventMenu event={e} onView={openView} onToggle={toggleEvent} toast={toast} />
                        </RowActions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager total={rows.length} page={w.cur} size={size} onPage={setPage} onSize={setSize} />
          </>
        ) : <Empty title="No events match your filters" hint="Try a different term or priority." />}
      </section>
    </div>
  )
}
