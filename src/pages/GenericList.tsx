import React, { useState } from 'react'
import { PageHead, S, SearchIcon, Th, pageWindow, Pager, RowActions, IconBtn, Empty, ExcelIcon, FilterBar, Icon } from '../ui'
import { drBound } from '../components/DateRange'

export function GenericList({ list, listSearch, setListSearch }) {
  const [sort, setSort] = useState({ col:-1, dir:'asc' })
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [fStatus, setFStatus] = useState('All')
  const [fTag, setFTag] = useState('All')
  const [fWin, setFWin] = useState({ from:'', to:'' })
  React.useEffect(() => { setPage(1) }, [listSearch, size, sort, fStatus, fTag, fWin])
  const dataCols = list.hasActions ? list.columns.length - 1 : list.columns.length
  let rows = list.rows
  const fDef = list.filters
  const statusOpts = fDef && fDef.status != null ? ['All', ...Array.from(new Set(list.rows.map(r => r.cells[fDef.status].text)))] : null
  const tagOpts = fDef && fDef.tag ? ['All', ...Array.from(new Set(list.rows.map(r => r.tag).filter(Boolean)))] : null
  if (fDef) {
    const wf = fWin.from ? drBound(fWin.from, false) : null
    const wt = fWin.to ? drBound(fWin.to, true) : null
    const parseTs = (x) => {
      const s0 = String(x).replace(',', '')
      const hasYear = /\b\d{4}\b/.test(s0)
      return Date.parse(hasYear ? s0 : s0.replace(/^(\d{1,2} [A-Za-z]{3}) (?=\d)/, '$1 2026 '))
    }
    rows = rows.filter(r => {
      if (fDef.tag && fTag !== 'All' && r.tag !== fTag) return false
      if (fDef.status != null && fStatus !== 'All' && r.cells[fDef.status].text !== fStatus) return false
      if (fDef.window != null && (wf !== null || wt !== null)) {
        const t = parseTs(r.cells[fDef.window].text)
        if (isNaN(t)) return false
        if (wf !== null && t < wf) return false
        if (wt !== null && t > wt) return false
      }
      return true
    })
  }
  if (sort.col >= 0 && sort.col < dataCols) {
    const dir = sort.dir === 'asc' ? 1 : -1
    rows = [...rows].sort((a, b) => {
      const av = a.cells[sort.col].text, bv = b.cells[sort.col].text
      const an = parseFloat(String(av).replace(/[^\d.\-]/g, '')), bn = parseFloat(String(bv).replace(/[^\d.\-]/g, ''))
      if (!isNaN(an) && !isNaN(bn) && /\d/.test(String(av)) && /\d/.test(String(bv))) return (an - bn) * dir
      return String(av).localeCompare(String(bv)) * dir
    })
  }
  const w = pageWindow(rows.length, page, size)
  const pageRows = rows.slice(w.from > 0 ? w.from - 1 : 0, w.to)
  const doSort = (i) => setSort(s => s.col === i ? { col:i, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { col:i, dir:'asc' })
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title={list.title} sub={list.subtitle}>
        {list.exportable && <button data-ix="ghost" aria-label="Export to Excel" onClick={list.exportAction} style={S.ghost}><ExcelIcon />Export</button>}
        {list.newAction && <button data-ix="primary" onClick={list.newAction.onClick} style={S.primary}><Icon d="M12 5v14 M5 12h14" size={15} />{list.newAction.label}</button>}
      </PageHead>
      <section style={S.card}>
        <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap', padding:'14px 16px', borderBottom:'1px solid var(--border)', background:'var(--surface-alt)' }}>
          <div style={{ position:'relative', flex:1, minWidth:220, maxWidth:340 }}>
            <span aria-hidden style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'flex' }}><SearchIcon /></span>
            <input aria-label="Search" type="text" value={listSearch} onChange={(e) => setListSearch(e.target.value)} placeholder="Search…" style={{ ...S.input, height:38, fontSize:13.8, padding:'0 12px 0 36px' }} />
          </div>
          {fDef && <FilterBar filters={[
            ...(fDef.tag ? [{ key:'tag', label:fDef.tag.label || 'Set', value:fTag, onChange:setFTag, options:tagOpts }] : []),
            ...(fDef.status != null ? [{ key:'status', label:'Status', value:fStatus, onChange:setFStatus, options:statusOpts }] : []),
            ...(fDef.window != null ? [{ key:'win', label:'Window', type:'range', value:fWin, onChange:setFWin }] : []),
          ]} />}
        </div>
        {list.hasRows ? (
          <>
            <div className="tscroll" style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:list.minWidth }}>
                <thead><tr>{list.columns.map((c, i) => <Th key={i} label={c.label} align={c.align} sortable={c.sortable} active={sort.col === i} dir={sort.dir} onSort={() => doSort(i)} />)}</tr></thead>
                <tbody>
                  {pageRows.map(row => (
                    <tr key={row.key} data-ix="row" style={{ borderBottom:'1px solid var(--border)' }}>
                      {row.cells.map((cell, i) => (
                        <td key={i} style={cell.tdStyle}>{cell.isBadge ? <span style={cell.badgeStyle}>{cell.text}</span> : cell.text}</td>
                      ))}
                      {list.hasActions && (
                        <td style={{ padding:'13px 16px' }}>
                          <RowActions>{row.actions.map((a, i) => <IconBtn key={i} label={a.ariaLabel} d={a.icon} onClick={a.onClick} />)}</RowActions>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pager total={rows.length} page={w.cur} size={size} onPage={setPage} onSize={setSize} />
          </>
        ) : <Empty title="Nothing matches your search" hint="Try a different term." />}
      </section>
    </div>
  )
}
