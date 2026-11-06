import React, { useState } from 'react'
import { PageHead, S, Icon, SearchBar, Th, Pager, pageWindow, RowActions, IconBtn, FilterBar, Empty, Modal, ModalFooter } from '../ui'
import { jobExecutions, jobExecStatusOptions } from '../data'
import { drBound } from '../components/DateRange'

const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace'

const EXEC_STATUS_META = {
  Queued:    { bg:'var(--surface-alt)', color:'var(--muted)', dot:'#9AA6B4' },
  Running:   { bg:'var(--primary-tint)', color:'var(--on-tint-blue)', dot:'var(--primary)' },
  Completed: { bg:'var(--green-tint)', color:'var(--success-text)', dot:'var(--success)' },
  Failed:    { bg:'#FDECEC', color:'#B42318', dot:'#DC2626' },
  Cancelled: { bg:'var(--surface-alt)', color:'var(--muted)', dot:'#9AA6B4' },
  TimedOut:  { bg:'var(--amber-tint)', color:'var(--warning-text)', dot:'var(--warning)' },
  Skipped:   { bg:'var(--surface-alt)', color:'var(--muted)', dot:'#B9C4D4' },
}
function ExecStatus({ status }) {
  const c = EXEC_STATUS_META[status] || EXEC_STATUS_META.Queued
  return <span style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'4px 11px', borderRadius:999, background:c.bg, color:c.color, fontSize:12.6, fontWeight:600, whiteSpace:'nowrap' }}><span aria-hidden style={{ width:8, height:8, borderRadius:'50%', flex:'none', background:c.dot }} />{status}</span>
}
function fmtDur(ms) {
  if (ms == null) return '\u2014'
  if (ms < 1000) return ms + ' ms'
  const s = Math.round(ms / 100) / 10
  if (s < 60) return s + ' s'
  const m = Math.floor(s / 60), rem = Math.round(s % 60)
  return m + 'm' + (rem ? ' ' + rem + 's' : '')
}

function ExecDetail({ rec, onClose, stop }) {
  const c = EXEC_STATUS_META[rec.status] || EXEC_STATUS_META.Queued
  const failed = rec.status === 'Failed' || rec.status === 'TimedOut'
  const steps = (rec.execSteps && rec.execSteps.length) ? rec.execSteps : ['Acquired job lock', 'Loaded parameters', 'Executed ' + rec.job.toLowerCase(), 'Released lock']
  const executed = rec.status === 'Completed' ? steps.join(' \u2192 ') : rec.status === 'Running' ? steps.slice(0, Math.max(1, steps.length - 1)).join(' \u2192 ') + ' \u2192 \u2026' : rec.status === 'Queued' ? 'Waiting for scheduler slot' : steps.slice(0, Math.max(1, steps.length - 1)).join(' \u2192 ') + ' \u2192 aborted'
  const row = (label, node, mono2) => (
    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
      <span style={{ fontSize:11.6, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}>{label}</span>
      <span style={{ fontSize:13.8, color:'var(--ink)', fontFamily: mono2 ? mono : 'inherit', fontVariantNumeric:'tabular-nums' }}>{node}</span>
    </div>
  )
  return (
    <Modal title="Job Execution Details" desc={rec.job + ' \u00b7 ' + rec.id} onClose={onClose} stop={stop} width={720} footer={<button data-ix="primary" onClick={onClose} style={S.modalBtnPrimary}>Close</button>}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:18 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'12px 16px', borderRadius:12, background:c.bg }}>
          <ExecStatus status={rec.status} />
          <span style={{ fontSize:12.8, color:'var(--muted)', fontFamily:mono }}>{rec.jobCode}</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, padding:16, border:'1px solid var(--border)', borderRadius:12, background:'var(--primary-tint-2)' }}>
          {row('Execution ID', rec.id, true)}
          {row('Duration', fmtDur(rec.durationMs))}
          {row('Started at', rec.startedAt)}
          {row('Ended at', rec.endedAt || '\u2014')}
        </div>
        <div style={{ border:'1px solid ' + (failed ? '#F3C6C6' : 'var(--border)'), borderRadius:12, background: failed ? '#FFF8F8' : 'var(--surface)', overflow:'hidden' }}>
          <div style={{ padding:'12px 14px', display:'grid', gridTemplateColumns:'130px minmax(0,1fr)', rowGap:8, columnGap:12, fontSize:12.8 }}>
            <span style={{ color:'var(--muted)', fontWeight:600 }}>Exception Details</span>
            <span style={{ color:'var(--ink)' }}>{executed}</span>
            {rec.status === 'Completed' && <React.Fragment><span style={{ color:'var(--muted)', fontWeight:600 }}>Result</span><span style={{ color:'var(--success-text)', fontWeight:600 }}>{rec.result || 'Job completed successfully.'}</span></React.Fragment>}
          </div>
          {failed && rec.error && (
            <div style={{ padding:'0 14px 12px' }}>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'#B42318', marginBottom:6 }}>Error message</div>
              <pre style={{ margin:0, padding:'10px 12px', background:'#FDECEC', border:'1px solid #F3C6C6', borderLeft:'3px solid #DC2626', borderRadius:8, color:'#B42318', fontSize:12.4, fontFamily:mono, whiteSpace:'pre-wrap', wordBreak:'break-word', lineHeight:1.5 }}>{rec.error}</pre>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export function JobExecLog() {
  const [search, setSearch] = useState('')
  const [job, setJob] = useState('All')
  const [stat, setStat] = useState('All')
  const [win, setWin] = useState({ from:'', to:'' })
  const [sort, setSort] = useState({ col:-1, dir:'asc' })
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [viewRec, setViewRec] = useState(null)
  React.useEffect(() => { setPage(1) }, [search, job, stat, win, size, sort])
  const jobOptions = ['All', ...Array.from(new Set(jobExecutions.map(e => e.job)))]
  const q = search.trim().toLowerCase()
  const winFrom = win.from ? drBound(win.from, false) : null
  const winTo = win.to ? drBound(win.to, true) : null
  const inWindow = (e) => {
    if (winFrom === null && winTo === null) return true
    const t = Date.parse(String(e.startedAt).replace(',', ''))
    if (isNaN(t)) return false
    return (winFrom === null || t >= winFrom) && (winTo === null || t <= winTo)
  }
  let rows = jobExecutions.filter(e =>
    (job === 'All' || e.job === job) &&
    (stat === 'All' || e.status === stat) &&
    inWindow(e) &&
    (!q || (e.id + ' ' + e.job + ' ' + e.jobCode + ' ' + e.status + ' ' + e.tenant).toLowerCase().includes(q)))
  if (sort.col >= 0) {
    const keyf = [e => e.job, e => e.status, e => e.agoHours, e => (e.durationMs == null ? -1 : e.durationMs)][sort.col]
    const dir = sort.dir === 'asc' ? 1 : -1
    rows = [...rows].sort((a, b) => { const av = keyf(a), bv = keyf(b); return (av < bv ? -1 : av > bv ? 1 : 0) * dir })
  }
  const w = pageWindow(rows.length, page, size)
  const pageRows = rows.slice(w.from > 0 ? w.from - 1 : 0, w.to)
  const doSort = (i) => setSort(s => s.col === i ? { col:i, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col:i, dir:'asc' })
  const cols = [{ label:'Job', s:true }, { label:'Status', s:true }, { label:'Started at', s:true }, { label:'Duration', s:true }]
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Job Execution Log" sub="History of background job runs" />
      <section style={{ ...S.card, overflow:'visible' }}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search executions…" topRound>
          <FilterBar filters={[
            { key:'job', label:'Job', type:'search', value:job, onChange:setJob, options:jobOptions },
            { key:'stat', label:'Status', value:stat, onChange:setStat, options:['All', ...jobExecStatusOptions] },
            { key:'win', label:'Window', type:'range', value:win, onChange:setWin },
          ]} />
        </SearchBar>
        {rows.length > 0 ? (
          <>
            <div className="tscroll" style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:860 }}>
                <thead><tr>{cols.map((c, i) => <Th key={i} label={c.label} align={i >= 3 ? 'right' : 'left'} sortable={c.s} active={sort.col === i} dir={sort.dir} onSort={() => doSort(i)} />)}<th scope="col" style={{ ...S.th, background:'#EAF3FF', textAlign:'right' }}>Actions</th></tr></thead>
                <tbody>
                  {pageRows.map(e => (
                    <tr key={e.id} data-ix="row" style={{ borderBottom:'1px solid var(--border)' }}>
                      <td style={{ padding:'13px 16px' }}><div style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>{e.job}</div><div style={{ fontSize:11.6, color:'var(--muted)', marginTop:2, fontFamily:mono }}>{e.jobCode}</div></td>
                      <td style={{ padding:'13px 16px' }}><ExecStatus status={e.status} /></td>
                      <td style={{ padding:'13px 16px', fontSize:13, color:'var(--ink)', whiteSpace:'nowrap' }}>{e.startedAt}</td>
                      <td style={{ padding:'13px 16px', textAlign:'right', fontSize:13, color:'var(--ink)', fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap' }}>{fmtDur(e.durationMs)}</td>
                      <td style={{ padding:'13px 16px' }}>
                        <RowActions>
                          <IconBtn label="View execution details" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" onClick={() => setViewRec(e)} />
                        </RowActions>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager total={rows.length} page={w.cur} size={size} onPage={setPage} onSize={setSize} />
          </>
        ) : <Empty title="No executions match your filters" hint="Try a different job, status or time window." />}
      </section>
      {viewRec && <ExecDetail rec={viewRec} onClose={() => setViewRec(null)} stop={(e) => e.stopPropagation()} />}
    </div>
  )
}
