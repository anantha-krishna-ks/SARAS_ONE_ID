import React, { useState } from 'react'
import { PageHead, S, Icon, SearchBar, Dropdown, Th, pageWindow, Pager, StatusToggle, RowActions, IconBtn, Empty, ExcelIcon, FilterBar } from '../ui'
import { users, roles, statusBadge } from '../data'

export function Users({ search, setSearch, ddProps, ddVal, toast, openUser, editUser, openMapRoles, confirmDelete, openStatus, openSubjectAttrs, tenantScope, hideRoles }) {
  const [sort, setSort] = useState({ key:'', dir:'asc' })
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [fStatus, setFStatus] = useState('All')
  const [fRole, setFRole] = useState('All')
  const [fType, setFType] = useState('All')
  React.useEffect(() => { setPage(1) }, [search, fStatus, fRole, fType, sort, size])
  const q = search.trim().toLowerCase()
  let rows = users.filter(u => (!tenantScope || u.tenant === tenantScope) && (!hideRoles || !hideRoles.includes(u.role)) && (fStatus === 'All' || u.status === fStatus) && (fRole === 'All' || u.role === fRole) && (fType === 'All' || (u.type || 'Human') === fType) && (!q || (u.name + ' ' + u.email + ' ' + u.role).toLowerCase().includes(q)))
  const acc = { name:u=>u.name, role:u=>u.role, designation:u=>u.designation, status:u=>u.status, last:u=>u.last }
  if (sort.key && acc[sort.key]) {
    const dir = sort.dir === 'asc' ? 1 : -1
    rows = [...rows].sort((a,b) => String(acc[sort.key](a)).localeCompare(String(acc[sort.key](b))) * dir)
  }
  const w = pageWindow(rows.length, page, size)
  const pageRows = rows.slice(w.from > 0 ? w.from - 1 : 0, w.to)
  const doSort = (k) => setSort(s => s.key === k ? { key:k, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key:k, dir:'asc' })
  const cols = [['Account','name'],['Role','role'],['Designation','designation'],['Status','status'],['Last Login','last'],['Actions',null]]
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Accounts" sub={tenantScope ? 'Accounts in ' + tenantScope + '.' : 'All accounts across tenants.'}>
        <button data-ix="ghost" onClick={() => toast('Exporting accounts to Excel…', 'success')} style={S.ghost}><ExcelIcon />Export</button>
        <button data-ix="primary" onClick={openUser} style={S.primary}><Icon d="M12 5v14 M5 12h14" />New account</button>
      </PageHead>
      <section style={{ ...S.card, overflow:'visible' }}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email…">
          <FilterBar filters={[
            { key:'status', label:'Status', value:fStatus, onChange:setFStatus, options:['All', 'Active', 'Inactive', 'Invited', 'Suspended', 'Locked'] },
            { key:'role', label:'Role', type:'search', value:fRole, onChange:setFRole, options:['All', ...roles.map(r => r.name)] },
            { key:'type', label:'Account Type', value:fType, onChange:setFType, options:['All', 'Human', 'Service', 'API Client', 'System'] },
          ]} />
        </SearchBar>
        {rows.length > 0 ? (
          <>
            <div className="tscroll" style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:920 }}>
                <thead><tr>
                  {cols.map(([label,key]) => <Th key={label} label={label} align={label === 'Actions' ? 'right' : 'left'} sortable={!!key} active={sort.key === key} dir={sort.dir} onSort={key ? () => doSort(key) : undefined} />)}
                </tr></thead>
                <tbody>
                  {pageRows.map(u => {
                    const badge = statusBadge(u.status)
                    return (
                      <tr key={u.login} data-ix="row" style={{ borderBottom:'1px solid var(--border)' }}>
                        <td style={{ padding:'13px 16px' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                            <span aria-hidden style={{ flex:'none', width:34, height:34, borderRadius:'50%', background:'var(--primary-tint)', color:'var(--on-tint-blue)', fontSize:12.4, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center' }}>{u.initials}</span>
                            <span style={{ display:'flex', flexDirection:'column' }}><span style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>{u.name}</span><span style={{ fontSize:12, color:'var(--muted)' }}>{u.email}</span></span>
                          </div>
                        </td>
                        <td style={{ padding:'13px 16px', fontSize:13.5, color:'var(--ink)' }}>{u.role}</td>
                        <td style={{ padding:'13px 16px', fontSize:13.5, color:'var(--ink)' }}>{u.designation}</td>
                        <td style={{ padding:'13px 16px' }}><StatusToggle status={u.status} name={u.name} toast={toast} /></td>
                        <td style={{ padding:'13px 16px', fontSize:13.5, color:'var(--muted)' }}>{u.last}</td>
                        <td style={{ padding:'13px 16px' }}>
                          <RowActions>
                            <IconBtn label="Edit account" d="M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" onClick={() => editUser(u)} />
                            <IconBtn label="Map roles" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4" onClick={openMapRoles} />
                            <IconBtn label="Subject attributes" d="M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6" onClick={() => openSubjectAttrs(u)} />
                            <IconBtn label="Reset password" d="M8 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M10.85 12.15L19 4 M18 5l2 2 M15 8l2 2" onClick={() => toast('Password reset link sent to the user.', 'success')} />
                            <IconBtn label="Unlock account" d="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0" onClick={() => toast('Account unlocked.', 'success')} />
                            <IconBtn label="Manage status" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M8.5 12.5l2.5 2.5 4.5-5" onClick={() => openStatus(u)} />
                            <IconBtn label="Delete account" ix="dang" d="M3 6h18 M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" onClick={() => confirmDelete({ danger:true, title:'Delete account?', message:'"' + u.name + '" will be permanently removed. This action cannot be undone.', confirmLabel:'Delete account', onConfirm:() => toast('Account deleted.', 'danger') })} />
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
        ) : <Empty title="No accounts match your search" hint="Try a different name, email or role." />}
      </section>
    </div>
  )
}
