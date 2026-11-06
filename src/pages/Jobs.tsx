import React, { useState } from 'react'
import { PageHead, S, Icon, SearchBar, Dropdown, Th, Pager, pageWindow, RowActions, IconBtn, StatusToggle, JobMenu, FilterBar, Empty } from '../ui'

const JPRIO_META = {
  High:   { bg:'#FDECEC', color:'#B42318', dot:'#DC2626' },
  Medium: { bg:'var(--amber-tint)', color:'var(--warning-text)', dot:'var(--warning)' },
  Low:    { bg:'var(--green-tint)', color:'var(--success-text)', dot:'var(--success)' },
}
function JPriorityPill({ p }) {
  const c = JPRIO_META[p] || JPRIO_META.Low
  return <span style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'4px 11px', borderRadius:999, background:c.bg, color:c.color, fontSize:12.6, fontWeight:600, whiteSpace:'nowrap' }}><span aria-hidden style={{ width:8, height:8, borderRadius:'50%', flex:'none', background:c.dot }} />{p}</span>
}

export function Jobs({ jobs, toast, openNew, openView, openEdit, deleteJob, toggleJob, runJob }) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ col:-1, dir:'asc' })
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  React.useEffect(() => { setPage(1) }, [search, size, sort])
  const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace'
  const q = search.trim().toLowerCase()
  let rows = jobs.filter(j => !q || (j.code + ' ' + j.name + ' ' + j.description + ' ' + j.triggerDesc).toLowerCase().includes(q))
  if (sort.col >= 0) {
    const keyf = [j => j.code, j => j.name, j => ({ High:0, Medium:1, Low:2 }[j.priority])][sort.col]
    const dir = sort.dir === 'asc' ? 1 : -1
    rows = [...rows].sort((a, b) => { const av = keyf(a), bv = keyf(b); return (av < bv ? -1 : av > bv ? 1 : 0) * dir })
  }
  const w = pageWindow(rows.length, page, size)
  const pageRows = rows.slice(w.from > 0 ? w.from - 1 : 0, w.to)
  const doSort = (i) => setSort(s => s.col === i ? { col:i, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col:i, dir:'asc' })
  const cols = [{ label:'Code', s:true }, { label:'Job', s:true }, { label:'Priority', s:true }, { label:'Status' }]
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Jobs" sub={'Background jobs registered in the scheduler · ' + jobs.length + ' defined'} />
      <section style={{ ...S.card, overflow:'visible' }}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search jobs…" topRound />
        {rows.length > 0 ? (
          <>
            <div className="tscroll" style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:760 }}>
                <thead><tr>{cols.map((c, i) => <Th key={i} label={c.label} align="left" sortable={c.s} active={sort.col === i} dir={sort.dir} onSort={() => doSort(i)} />)}<th scope="col" style={{ ...S.th, background:'#EAF3FF', textAlign:'right' }}>Actions</th></tr></thead>
                <tbody>
                  {pageRows.map(j => (
                    <tr key={j.code} data-ix="row" style={{ borderBottom:'1px solid var(--border)' }}>
                      <td style={{ padding:'13px 16px' }}><span style={{ fontSize:12.4, fontWeight:700, fontFamily:mono, color:'#0a4a8c', letterSpacing:'.02em', background:'var(--primary-tint)', border:'1px solid #0a4a8c22', borderRadius:6, padding:'3px 8px', whiteSpace:'nowrap' }}>{j.code}</span></td>
                      <td style={{ padding:'13px 16px' }}><div style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>{j.name}</div><div style={{ fontSize:12, color:'var(--muted)', marginTop:2, maxWidth:520, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{j.description}</div></td>
                      <td style={{ padding:'13px 16px' }}><JPriorityPill p={j.priority} /></td>
                      <td style={{ padding:'13px 16px' }}><StatusToggle status={j.active ? 'Active' : 'Inactive'} name={j.name} /></td>
                      <td style={{ padding:'13px 16px' }}>
                        <RowActions>
                          <IconBtn label="Edit job" d="M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" onClick={() => openEdit(j)} />
                          <JobMenu job={j} onView={openView} onToggle={toggleJob} onRun={runJob} toast={toast} />
                        </RowActions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager total={rows.length} page={w.cur} size={size} onPage={setPage} onSize={setSize} />
          </>
        ) : <Empty title="No jobs match your search" hint="Try a different term." />}
      </section>
    </div>
  )
}
