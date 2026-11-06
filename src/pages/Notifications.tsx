import React, { useState } from 'react'
import { PageHead, S, Icon, SearchBar, Dropdown, Th, Pager, pageWindow, RowActions, IconBtn, NotifMenu, FilterBar, Empty, ExcelIcon } from '../ui'
import { genBadge } from '../data'
import { drBound } from '../components/DateRange'

const NPRIO_META = {
  High:   { bg:'#FDECEC', color:'#B42318', dot:'#DC2626' },
  Medium: { bg:'var(--amber-tint)', color:'var(--warning-text)', dot:'var(--warning)' },
  Low:    { bg:'var(--green-tint)', color:'var(--success-text)', dot:'var(--success)' },
}
function NPriorityPill({ p }) {
  const c = NPRIO_META[p] || NPRIO_META.Low
  return <span style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'4px 11px', borderRadius:999, background:c.bg, color:c.color, fontSize:12.6, fontWeight:600, whiteSpace:'nowrap' }}><span aria-hidden style={{ width:8, height:8, borderRadius:'50%', flex:'none', background:c.dot }} />{p}</span>
}
const NOTIF_CHAN = {
  Email: 'M4 5h16v14H4z M22 6l-10 7L2 6',
  SMS: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z M8 9h8 M8 13h5',
  'In-app': 'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0',
  Push: 'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M11 19h2',
  WhatsApp: 'M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3z M9.1 8.2c-.2 0-.5.1-.6.3-.3.3-.7.8-.7 1.7 0 1 .7 2 .9 2.2.1.2 1.5 2.4 3.7 3.3 1.9.7 2.3.6 2.7.6.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1l-.7-.3s-1-.5-1.2-.5c-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.1-.4 0-.3-.1-1-.4-1.7-1-.6-.5-1-1.1-1.1-1.4-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.2-.4v-.4c0-.1-.5-1.2-.6-1.6-.2-.4-.4-.4-.5-.4z',
}
function NotifChannel({ channel }) {
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12.8, fontWeight:500, color:'var(--ink)', whiteSpace:'nowrap' }}>
      <span aria-hidden style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:26, height:26, borderRadius:7, background:'var(--primary-tint)', border:'1px solid var(--border-blue)', color:'var(--on-tint-blue)', flex:'none' }}><Icon d={NOTIF_CHAN[channel] || 'M12 8v.01 M12 12v4'} size={14} sw={1.9} /></span>
      {channel}
    </span>
  )
}

export function Notifications({ notifications, toast, openNew, openView, openEdit, deleteNotif, resendNotif, cancelNotif, exportAction }) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [evt, setEvt] = useState('All')
  const [prio, setPrio] = useState('All')
  const [chan, setChan] = useState('All')
  const [win, setWin] = useState({ from:'', to:'' })
  const [openDd, setOpenDd] = useState(null)
  const [sort, setSort] = useState({ col:-1, dir:'asc' })
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  React.useEffect(() => { setPage(1) }, [search, status, evt, prio, chan, win, size, sort])
  const statusOpts = ['All', 'Draft', 'Queued', 'Processing', 'Sent', 'Delivered', 'Failed', 'Cancelled']
  const eventOpts = ['All', ...Array.from(new Set(notifications.map(n => n.event)))]
  const q = search.trim().toLowerCase()
  const winFrom = win.from ? drBound(win.from, false) : null
  const winTo = win.to ? drBound(win.to, true) : null
  const inWindow = (n) => {
    if (winFrom === null && winTo === null) return true
    const t = Date.parse(String(n.completedAt).replace(',', ''))
    if (isNaN(t)) return false
    return (winFrom === null || t >= winFrom) && (winTo === null || t <= winTo)
  }
  let rows = notifications.filter(n => (status === 'All' || n.status === status) && (evt === 'All' || n.event === evt) && (prio === 'All' || n.priority === prio) && (chan === 'All' || n.channel === chan) && inWindow(n) && (!q || (n.event + ' ' + n.recipient + ' ' + n.message).toLowerCase().includes(q)))
  if (sort.col >= 0) {
    const keyf = [n => n.event, n => n.recipient, n => n.channel, n => ({ High:0, Medium:1, Low:2 }[n.priority]), n => n.status][sort.col]
    const dir = sort.dir === 'asc' ? 1 : -1
    rows = [...rows].sort((a, b) => { const av = keyf(a), bv = keyf(b); return (av < bv ? -1 : av > bv ? 1 : 0) * dir })
  }
  const w = pageWindow(rows.length, page, size)
  const pageRows = rows.slice(w.from > 0 ? w.from - 1 : 0, w.to)
  const doSort = (i) => setSort(s => s.col === i ? { col:i, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col:i, dir:'asc' })
  const cols = [{ label:'Event', s:true }, { label:'Recipient', s:true }, { label:'Channel', s:true }, { label:'Priority', s:true }, { label:'Status', s:true }, { label:'Completed' }]
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Notifications" sub={'Outbound message queue across all channels · ' + notifications.length + ' messages'}>
        <button data-ix="ghost" onClick={exportAction} style={S.ghost}><ExcelIcon />Export</button>
      </PageHead>
      <section style={{ ...S.card, overflow:'visible' }}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notifications…" topRound>
          <FilterBar filters={[
            { key:'evt', label:'Event', type:'search', value:evt, onChange:setEvt, options:eventOpts },
            { key:'status', label:'Status', value:status, onChange:setStatus, options:statusOpts },
            { key:'prio', label:'Priority', value:prio, onChange:setPrio, options:['All', 'High', 'Medium', 'Low'] },
            { key:'chan', label:'Channel', value:chan, onChange:setChan, options:['All', 'Email', 'SMS', 'In-app', 'Push', 'WhatsApp'] },
            { key:'win', label:'Window', type:'range', value:win, onChange:setWin },
          ]} />
        </SearchBar>
        {rows.length > 0 ? (
          <>
            <div className="tscroll" style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:920 }}>
                <thead><tr>{cols.map((c, i) => <Th key={i} label={c.label} align="left" sortable={c.s} active={sort.col === i} dir={sort.dir} onSort={() => doSort(i)} />)}<th scope="col" style={{ ...S.th, background:'#EAF3FF', textAlign:'right' }}>Actions</th></tr></thead>
                <tbody>
                  {pageRows.map((n, i) => (
                    <tr key={i} data-ix="row" style={{ borderBottom:'1px solid var(--border)' }}>
                      <td style={{ padding:'13px 16px' }}><div style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>{n.event}</div><div style={{ fontSize:12, color:'var(--muted)', marginTop:2, maxWidth:260, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{n.message}</div></td>
                      <td style={{ padding:'13px 16px', fontSize:13.4, color:'var(--ink)', whiteSpace:'nowrap' }}>{n.recipient}</td>
                      <td style={{ padding:'13px 16px' }}><NotifChannel channel={n.channel} /></td>
                      <td style={{ padding:'13px 16px' }}><NPriorityPill p={n.priority} /></td>
                      <td style={{ padding:'13px 16px' }}><span style={genBadge(n.status)}>{n.status}</span></td>
                      <td style={{ padding:'13px 16px', fontSize:12.8, color:'var(--muted)', whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums' }}>{n.completedAt}</td>
                      <td style={{ padding:'13px 16px' }}>
                        <RowActions>
                          <IconBtn label="View notification" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" onClick={() => openView(n)} />
                          <IconBtn label="Resend notification" d="M23 4v6h-6 M20.49 15a9 9 0 1 1-2.12-9.36L23 10" onClick={() => resendNotif(n)} />
                        </RowActions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager total={rows.length} page={w.cur} size={size} onPage={setPage} onSize={setSize} />
          </>
        ) : <Empty title="No notifications match your filters" hint="Try a different term or status." />}
      </section>
    </div>
  )
}
