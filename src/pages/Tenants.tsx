import React, { useState } from 'react'
import { PageHead, S, Icon, SearchBar, Dropdown, Th, pageWindow, Pager, StatusToggle, RowActions, IconBtn, TenantMenu, Empty, ExcelIcon } from '../ui'
import { tenants, statusBadge } from '../data'

export function Tenants({ search, setSearch, filter, setFilter, toast, openModal, editModal, confirmDelete, go, confirmCreate, openConfig, openAuthProviders, openHealth, openStatus, openLicense, openCreateLicense }) {
  const [sort, setSort] = useState({ key:'', dir:'asc' })
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [loc, setLoc] = useState('All locations')
  const [band, setBand] = useState('Any size')
  const [openDd, setOpenDd] = useState(null)
  React.useEffect(() => { setPage(1) }, [search, filter, loc, band, sort, size])
  const locOpts = ['All locations', ...Array.from(new Set(tenants.map(t => t.city)))]
  const statusOpts = ['All','Draft','Provisioning','Active','Inactive','Suspended','Expired','Deleted']
  const bandOpts = ['Any size', 'Under 500', '500–1,000', 'Over 1,000']
  const bandMatch = (b, n) => b === 'Any size' ? true : b === 'Under 500' ? n < 500 : b === '500–1,000' ? (n >= 500 && n <= 1000) : n > 1000
  const q = search.trim().toLowerCase()
  let rows = tenants.filter(t => (filter === 'All' || t.status === filter) && (loc === 'All locations' || t.city === loc) && bandMatch(band, t.users) && (!q || (t.name + ' ' + t.code + ' ' + t.domain).toLowerCase().includes(q)))
  const acc = { name:t=>t.name, domain:t=>t.domain, users:t=>t.users, status:t=>t.status, city:t=>t.city }
  if (sort.key && acc[sort.key]) {
    const dir = sort.dir === 'asc' ? 1 : -1
    rows = [...rows].sort((a,b) => { const av=acc[sort.key](a), bv=acc[sort.key](b); return (typeof av==='number' ? av-bv : String(av).localeCompare(String(bv))) * dir })
  }
  const w = pageWindow(rows.length, page, size)
  const pageRows = rows.slice(w.from > 0 ? w.from - 1 : 0, w.to)
  const doSort = (k) => setSort(s => s.key === k ? { key:k, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key:k, dir:'asc' })
  const cols = [['Tenant','name'],['Code','code'],['Domain','domain'],['Accounts','users'],['Location','city'],['Status','status'],['Actions',null]]
  const chip = (active) => ({ display:'inline-flex', alignItems:'center', gap:7, height:32, padding:'0 12px', borderRadius:999, background: active ? 'var(--primary)' : 'var(--surface)', color: active ? '#fff' : 'var(--muted)', border:'1px solid ' + (active ? 'var(--primary)' : 'var(--border)'), fontSize:12.9, fontWeight:600, cursor:'pointer' })
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Tenants" sub={`Organizations provisioned in SARAS One · ${tenants.length} total`}>
        <button data-ix="ghost" onClick={() => toast('Exporting tenants to Excel…', 'success')} style={S.ghost}><ExcelIcon />Export</button>
        <button data-ix="primary" onClick={openModal} style={S.primary}><Icon d="M12 5v14 M5 12h14" />New tenant</button>
      </PageHead>
      <section style={S.card}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tenants…">
          <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
            <div style={{ minWidth:212 }}><Dropdown value={filter} options={statusOpts} open={openDd === 'status'} onToggle={() => setOpenDd(o => o === 'status' ? null : 'status')} onSelect={(v) => { setFilter(v); setOpenDd(null) }} leadIcon="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" prefix="Status:" ariaLabel="Filter by status" /></div>
          </div>
        </SearchBar>
        {rows.length > 0 ? (
          <>
            <div className="tscroll" style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:900 }}>
                <thead><tr>
                  {cols.map(([label,key]) => <Th key={label} label={label} align={label === 'Actions' ? 'right' : 'left'} sortable={!!key} active={sort.key === key} dir={sort.dir} onSort={key ? () => doSort(key) : undefined} />)}
                </tr></thead>
                <tbody>
                  {pageRows.map(t => {
                    const badge = statusBadge(t.status)
                    return (
                      <tr key={t.code} data-ix="row" style={{ borderBottom:'1px solid var(--border)' }}>
                        <td style={{ padding:'13px 16px', fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>{t.name}</td>
                        <td style={{ padding:'13px 16px' }}><span style={{ fontSize:11.8, fontWeight:600, color:'var(--on-tint-blue)', background:'var(--primary-tint)', border:'1px solid var(--border-blue)', borderRadius:6, padding:'3px 9px', letterSpacing:'.02em', fontVariantNumeric:'tabular-nums' }}>{t.code}</span></td>
                        <td style={{ padding:'13px 16px', fontSize:13.5, color:'var(--ink)' }}>{t.domain}</td>
                        <td style={{ padding:'13px 16px', fontSize:13.5, color:'var(--ink)', fontVariantNumeric:'tabular-nums' }}>{t.users.toLocaleString()}</td>
                        <td style={{ padding:'13px 16px', fontSize:13.5, color:'var(--muted)' }}>{t.city}</td>
                        <td style={{ padding:'13px 16px' }}><StatusToggle status={t.status} name={t.name} toast={toast} /></td>
                        <td style={{ padding:'13px 16px' }}>
                          <RowActions>
                            <IconBtn label="Edit tenant" d="M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" onClick={() => editModal(t)} />
                            <IconBtn label="Delete tenant" ix="dang" d="M3 6h18 M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" onClick={() => confirmDelete({ danger:true, title:'Delete tenant?', message:'"' + t.name + '" will be permanently removed. This action cannot be undone.', confirmLabel:'Delete tenant', onConfirm:() => toast('Tenant deleted.', 'danger') })} />
                            <TenantMenu tenant={t} go={go} toast={toast} confirm={confirmCreate} openConfig={openConfig} openAuthProviders={openAuthProviders} openHealth={openHealth} openStatus={openStatus} openLicense={openLicense} openCreateLicense={openCreateLicense} />
                          </RowActions>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <Pager total={rows.length} page={w.cur} size={size} onPage={setPage} onSize={setSize} />
          </>
        ) : <Empty title="No tenants match your filters" hint="Try a different search term or status." />}
      </section>
    </div>
  )
}
