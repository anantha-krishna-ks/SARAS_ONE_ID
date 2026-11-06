import React from 'react'
import { PageHead, S, Icon, SearchBar, Th, Pager, pageWindow, RowActions, IconBtn, FilterBar, Empty, Modal } from '../ui'
import { ConfirmModal } from '../modals/ConfirmModal'

const NPRIO_META = {
  High:   { bg:'var(--danger-tint, #FDECEC)', color:'#B42318', dot:'var(--danger)' },
  Medium: { bg:'var(--amber-tint)', color:'#8A6116', dot:'var(--warning)' },
  Low:    { bg:'var(--green-tint)', color:'var(--success-text)', dot:'var(--success)' },
}
function NPriorityPill({ p }) {
  const c = NPRIO_META[p] || NPRIO_META.Low
  return <span style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'4px 11px', borderRadius:999, background:c.bg, color:c.color, fontSize:12.6, fontWeight:600, whiteSpace:'nowrap' }}><span aria-hidden style={{ width:7, height:7, borderRadius:'50%', background:c.dot }} />{p}</span>
}

const USER_NOTIF_SEED = [
  { id:1, event:'New Sign-in Detected', message:'Your account was used to sign in from Bengaluru, IN (103.27.9.44) on Chrome / Windows.', priority:'High', time:'17 Aug 2026, 09:14', unread:true },
  { id:2, event:'Bulk User Import', message:'1,240 accounts were provisioned for Excelsoft Academy without errors.', priority:'Medium', time:'17 Aug 2026, 08:38', unread:true },
  { id:3, event:'Role Change Request', message:'Rahul Menon requested the Tenant Admin role for Meridian University.', priority:'High', time:'17 Aug 2026, 08:02', unread:true },
  { id:4, event:'Scheduled Maintenance', message:'SARAS One will be read-only on Sunday 02:00\u201304:00 IST for a platform upgrade.', priority:'Low', time:'16 Aug 2026, 17:20', unread:false },
  { id:5, event:'Token Rotation Failed', message:'The vault rejected the new signing key. The previous key remains active.', priority:'High', time:'16 Aug 2026, 06:00', unread:false },
  { id:6, event:'Password Policy Updated', message:'Minimum length for Excelsoft Academy was raised to 12 characters.', priority:'Medium', time:'15 Aug 2026, 11:45', unread:false },
  { id:7, event:'New Sign-in Detected', message:'Your account was used to sign in from Mysuru, IN (49.205.118.7) on Safari / macOS.', priority:'Medium', time:'14 Aug 2026, 21:04', unread:false },
  { id:8, event:'Audit Log Archival', message:'July audit records were archived to cold storage successfully.', priority:'Low', time:'14 Aug 2026, 03:00', unread:false },
  { id:9, event:'Role Change Request', message:'Meera Iyer requested the Content Author role for Bright Future Schools.', priority:'Medium', time:'13 Aug 2026, 15:32', unread:false },
  { id:10, event:'Scheduled Maintenance', message:'Maintenance window completed \u2014 all services are back to read-write.', priority:'Low', time:'11 Aug 2026, 04:05', unread:false },
  { id:11, event:'Bulk User Import', message:'Import for Nova Learning Group finished with 3 skipped rows (duplicate emails).', priority:'Medium', time:'10 Aug 2026, 02:12', unread:false },
  { id:12, event:'New Sign-in Detected', message:'A sign-in attempt from an unrecognized device was blocked by MFA.', priority:'High', time:'09 Aug 2026, 22:47', unread:false },
]

export function UserNotifications({ toast }) {
  const [items, setItems] = React.useState(USER_NOTIF_SEED)
  const [search, setSearch] = React.useState('')
  const [prio, setPrio] = React.useState('All')
  const [evt, setEvt] = React.useState('All')
  const [sort, setSort] = React.useState({ col:-1, dir:'asc' })
  const [page, setPage] = React.useState(1)
  const [size, setSize] = React.useState(10)
  const [view, setView] = React.useState(null)
  const [confirmDel, setConfirmDel] = React.useState(null)
  React.useEffect(() => { setPage(1) }, [search, prio, evt, size, sort])
  const unread = items.filter(i => i.unread).length
  const eventOpts = ['All', ...Array.from(new Set(items.map(n => n.event)))]
  const q = search.trim().toLowerCase()
  let rows = items.filter(n => (prio === 'All' || n.priority === prio) && (evt === 'All' || n.event === evt) && (!q || (n.event + ' ' + n.message).toLowerCase().includes(q)))
  if (sort.col >= 0) {
    const keyf = [n => (n.unread ? 0 : 1), n => n.event, null, n => ({ High:0, Medium:1, Low:2 }[n.priority]), n => Date.parse(String(n.time).replace(',', ''))][sort.col]
    if (keyf) { const dir = sort.dir === 'asc' ? 1 : -1; rows = [...rows].sort((a, b) => { const av = keyf(a), bv = keyf(b); return (av < bv ? -1 : av > bv ? 1 : 0) * dir }) }
  }
  const w = pageWindow(rows.length, page, size)
  const pageRows = rows.slice(w.from > 0 ? w.from - 1 : 0, w.to)
  const doSort = (i) => setSort(s => s.col === i ? { col:i, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col:i, dir:'asc' })
  const setRead = (n, read) => setItems(list => list.map(x => x.id === n.id ? { ...x, unread: !read } : x))
  const del = (n) => setConfirmDel(n)
  const doDelete = () => { const n = confirmDel; setConfirmDel(null); setItems(list => list.filter(x => x.id !== n.id)); toast('Notification deleted.', 'danger') }
  const markAll = () => { setItems(list => list.map(i => ({ ...i, unread:false }))); toast('All notifications marked as read.', 'success') }
  const openView = (n) => { setRead(n, true); setView(n) }
  const cols = [{ label:'', s:true }, { label:'Event name', s:true }, { label:'Message' }, { label:'Priority', s:true }, { label:'Timestamp', s:true }]
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="User notifications" sub={unread ? unread + ' unread notification' + (unread > 1 ? 's' : '') + ' for your account \u00b7 ' + items.length + ' total' : 'You\u2019re all caught up \u00b7 ' + items.length + ' total'}>
        <button data-ix="ghost" onClick={markAll} disabled={!unread} style={{ ...S.ghost, fontFamily:'inherit' }}><Icon d="M20 6L9 17l-5-5" size={15} />Mark all as read</button>
      </PageHead>
      <section style={{ ...S.card, overflow:'visible' }}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notifications…" topRound>
          <FilterBar filters={[
            { key:'evt', label:'Event', type:'search', value:evt, onChange:setEvt, options:eventOpts },
            { key:'prio', label:'Priority', value:prio, onChange:setPrio, options:['All', 'High', 'Medium', 'Low'] },
          ]} />
        </SearchBar>
        {rows.length > 0 ? (
          <>
            <div className="tscroll" style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:880 }}>
                <thead><tr>{cols.map((c, i) => <Th key={i} label={c.label} align="left" sortable={c.s} active={sort.col === i} dir={sort.dir} onSort={() => doSort(i)} />)}<th scope="col" style={{ ...S.th, background:'#EAF3FF', textAlign:'right' }}>Actions</th></tr></thead>
                <tbody>
                  {pageRows.map((n) => (
                    <tr key={n.id} data-ix="row" style={{ borderBottom:'1px solid var(--border)', background: n.unread ? 'var(--primary-tint-2)' : 'transparent' }}>
                      <td style={{ padding:'13px 10px 13px 16px', width:34 }}>
                        <span title={n.unread ? 'Unread' : 'Read'} aria-label={n.unread ? 'Unread' : 'Read'} style={{ display:'inline-block', width:9, height:9, borderRadius:'50%', background: n.unread ? 'var(--primary)' : 'transparent', border: n.unread ? 'none' : '1.5px solid #C4CDD9' }} />
                      </td>
                      <td style={{ padding:'13px 16px', fontSize:13.8, fontWeight: n.unread ? 600 : 500, color:'var(--ink)', whiteSpace:'nowrap' }}>{n.event}</td>
                      <td style={{ padding:'13px 16px', fontSize:12.9, color:'var(--muted)', maxWidth:380, minWidth:260 }}><div style={{ lineHeight:1.55, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{n.message}</div></td>
                      <td style={{ padding:'13px 16px' }}><NPriorityPill p={n.priority} /></td>
                      <td style={{ padding:'13px 16px', fontSize:12.8, color:'var(--muted)', whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums' }}>{n.time}</td>
                      <td style={{ padding:'13px 16px' }}>
                        <RowActions>
                          <IconBtn label="View notification" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" onClick={() => openView(n)} />
                          {n.unread
                            ? <IconBtn label="Mark as read" d="M20 6L9 17l-5-5" onClick={() => { setRead(n, true); toast('Marked as read.', 'success') }} />
                            : <IconBtn label="Mark as unread" d="M4 4h16v14H4z M4 6l8 6 8-6" onClick={() => { setRead(n, false); toast('Marked as unread.', 'info') }} />}
                          <IconBtn label="Delete notification" ix="dang" d="M3 6h18 M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" onClick={() => del(n)} />
                        </RowActions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager total={rows.length} page={w.cur} size={size} onPage={setPage} onSize={setSize} />
          </>
        ) : <Empty title="No notifications match your filters" hint="Try a different term, event or priority." />}
      </section>
      {confirmDel && <ConfirmModal onClose={() => setConfirmDel(null)} stop={(e) => e.stopPropagation()} danger title="Delete notification?" message={'\u201c' + confirmDel.event + '\u201d from ' + confirmDel.time + ' will be permanently removed.'} confirm="Delete" onConfirm={doDelete} />}
      {view && (
        <Modal title={view.event} desc={'Received ' + view.time} onClose={() => setView(null)} stop={(e) => e.stopPropagation()} width={560}
          footer={<button data-ix="primary" onClick={() => setView(null)} style={S.modalBtnPrimary}>Close</button>}>
          <div style={{ padding:24, display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <NPriorityPill p={view.priority} />
              <span style={{ fontSize:12.4, color:'var(--muted)', fontVariantNumeric:'tabular-nums' }}>{view.time}</span>
            </div>
            <p style={{ margin:0, fontSize:13.6, color:'var(--ink)', lineHeight:1.65 }}>{view.message}</p>
          </div>
        </Modal>
      )}
    </div>
  )
}
