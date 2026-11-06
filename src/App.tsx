import React, { useState, useCallback } from 'react'
import { nav, navGroupDefs, tenants, users, buildList, orgTree, roles as roleSeed, privTree, appClientNames, events as eventSeed, notifications as notifSeed, jobs as jobSeed } from './data'
import { Toasts, DD_DEFAULTS, AppBootLoader } from './ui'
import { Login } from './pages/Login'
import { MfaScreen } from './pages/Mfa'
import { Dashboard } from './pages/Dashboard'
import { Tenants } from './pages/Tenants'
import { Users } from './pages/Accounts'
import { Roles } from './pages/Roles'
import { PasswordPolicy } from './pages/PasswordPolicy'
import { OrgStructure } from './pages/OrgStructure'
import { Privileges } from './pages/Privileges'
import { GenericList } from './pages/GenericList'
import { Sessions } from './pages/Sessions'
import { AppClients } from './pages/AppClients'
import { Lookups } from './pages/Lookups'
import { AbacPolicies } from './pages/AbacPolicies'
import { SuperAdmins } from './pages/SuperAdmins'
import { Subject } from './pages/Subject'
import { Environment } from './pages/Environment'
import { Resource } from './pages/Resource'
import { UserNotifications } from './pages/UserNotifications'
import { TenantModal } from './modals/TenantModal'
import { UserModal } from './modals/UserModal'
import { AppClientModal } from './modals/AppClientModal'
import { SessionModal } from './modals/SessionModal'
import { LookupModal } from './modals/LookupModal'
import { PolicyModal } from './modals/PolicyModal'
import { PolicyResourcesModal } from './modals/PolicyResourcesModal'
import { SubjectAttrsModal } from './modals/SubjectAttrsModal'
import { SuperAdminModal } from './modals/SuperAdminModal'
import { RoleModal } from './modals/RoleModal'
import { MapRolesModal } from './modals/MapRolesModal'
import { MapAccountsModal } from './modals/MapAccountsModal'
import { MapPermsModal } from './modals/MapPrivilegesModal'
import { ConfirmModal } from './modals/ConfirmModal'
import { LogoutModal } from './modals/LogoutModal'
import { TenantConfigModal } from './modals/TenantConfigModal'
import { AuthProvidersModal } from './modals/AuthProvidersModal'
import { HealthCheckModal } from './modals/HealthCheckModal'
import { LicenseInfoModal } from './modals/LicenseInfoModal'
import { CreateLicenseModal } from './modals/CreateLicenseModal'
import { OrgUnitModal } from './modals/OrgUnitModal'
import { ManageStatusModal } from './modals/ManageStatusModal'
import { PrivilegeModal } from './modals/PrivilegeModal'
import { Events } from './pages/Events'
import { EventModal } from './modals/EventModal'
import { Notifications } from './pages/Notifications'
import { NotificationModal } from './modals/NotificationModal'
import { Jobs } from './pages/Jobs'
import { JobExecLog } from './pages/JobExecLog'
import { DataIntake } from './pages/DataIntake'
import { SyncDashboard } from './pages/SyncDashboard'
import { SyncSubscribers } from './pages/SyncSubscribers'
import { SyncOutbox } from './pages/SyncOutbox'
import { JobModal } from './modals/JobModal'
import { AppHeader } from './components/AppHeader'
import { SideNav } from './components/SideNav'

export default function App() {
  const [screen, setScreen] = useState('login')
  const [role, setRole] = useState('super')
  const TENANT_CODE = 'EXA-01'
  const [modal, setModal] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [editRec, setEditRec] = useState(null)
  const [menuRec, setMenuRec] = useState(null)
  const [mapRole, setMapRole] = useState(null)
  const [rolesList, setRolesList] = useState(roleSeed)
  const roleSubmit = (vals, rec) => {
    if (rec) setRolesList(list => list.map(r => r === rec ? { ...r, ...vals } : r))
    else setRolesList(list => [{ ...vals, privs:0, users:0 }, ...list])
  }
  const [mapAcctRole, setMapAcctRole] = useState(null)
  const deleteRole = (r) => setConfirm({ danger:true, title:'Delete role?', message: r.name + ' will be permanently removed. Accounts holding this role will lose it.', confirmLabel:'Delete role', onConfirm: () => { setRolesList(list => list.filter(x => x !== r)); setConfirm(null); toast('Role deleted.', 'danger') } })
  const [eventsList, setEventsList] = useState(eventSeed)
  const [eventView, setEventView] = useState(false)
  const eventSubmit = (vals, rec) => {
    if (rec) setEventsList(list => list.map(e => e === rec ? { ...e, ...vals } : e))
    else setEventsList(list => [{ ...vals }, ...list])
  }
  const toggleEvent = (e) => setEventsList(list => list.map(x => x === e ? { ...x, active: !x.active } : x))
  const deleteEvent = (e) => setConfirm({ danger:true, title:'Delete event?', message: '“' + e.name + '” will be permanently removed. Notifications relying on it will stop firing.', confirmLabel:'Delete event', onConfirm: () => { setEventsList(list => list.filter(x => x !== e)); setConfirm(null); toast('Event deleted.', 'danger') } })
  const openEventNew = () => { setEditRec(null); setEventView(false); setModal('event') }
  const openEventView = (e) => { setEditRec(e); setEventView(true); setModal('event') }
  const openEventEdit = (e) => { setEditRec(e); setEventView(false); setModal('event') }
  const [notifList, setNotifList] = useState(notifSeed)
  const [notifView, setNotifView] = useState(false)
  const notifSubmit = (vals, rec) => {
    if (rec) setNotifList(list => list.map(n => n === rec ? { ...n, ...vals } : n))
    else setNotifList(list => [{ ...vals }, ...list])
  }
  const setNotifStatus = (n, status, extra) => setNotifList(list => list.map(x => x === n ? { ...x, status, ...(extra || {}) } : x))
  const resendNotif = (n) => setNotifStatus(n, 'Queued', { completedAt:'—', iterations:(n.iterations || 0) + 1 })
  const cancelNotif = (n) => setNotifStatus(n, 'Cancelled')
  const deleteNotif = (n) => setConfirm({ danger:true, title:'Delete notification?', message: 'This message to ' + n.recipient + ' will be permanently removed.', confirmLabel:'Delete notification', onConfirm: () => { setNotifList(list => list.filter(x => x !== n)); setConfirm(null); toast('Notification deleted.', 'danger') } })
  const openNotifNew = () => { setEditRec(null); setNotifView(false); setModal('notif') }
  const openNotifView = (n) => { setEditRec(n); setNotifView(true); setModal('notif') }
  const openNotifEdit = (n) => { setEditRec(n); setNotifView(false); setModal('notif') }
  const [jobsList, setJobsList] = useState(jobSeed)
  const [jobView, setJobView] = useState(false)
  const jobSubmit = (vals, rec) => {
    if (rec) setJobsList(list => list.map(j => j === rec ? { ...j, ...vals } : j))
    else setJobsList(list => [{ ...vals }, ...list])
  }
  const toggleJob = (j) => setJobsList(list => list.map(x => x === j ? { ...x, active: !x.active } : x))
  const runJob = (j) => {}
  const deleteJob = (j) => setConfirm({ danger:true, title:'Delete job?', message: '“' + j.name + '” will be permanently removed from the scheduler. Its schedules will stop firing.', confirmLabel:'Delete job', onConfirm: () => { setJobsList(list => list.filter(x => x !== j)); setConfirm(null); toast('Job deleted.', 'danger') } })
  const openJobNew = () => { setEditRec(null); setJobView(false); setModal('job') }
  const openJobView = (j) => { setEditRec(j); setJobView(true); setModal('job') }
  const openJobEdit = (j) => { setEditRec(j); setJobView(false); setModal('job') }
  const [navCollapsed, setNavCollapsed] = useState(false)
  const [tenantSearch, setTenantSearch] = useState('')
  const [tenantFilter, setTenantFilter] = useState('All')
  const [userSearch, setUserSearch] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [listSearch, setListSearch] = useState('')
  const [dd, setDd] = useState({})
  const [ddOpen, setDdOpen] = useState(null)
  const [minLen, setMinLen] = useState(12)
  const [pwShow, setPwShow] = useState(false)
  const [toasts, setToasts] = useState([])
  const [booting, setBooting] = useState(true)
  React.useEffect(() => { const t = setTimeout(() => setBooting(false), 1200); return () => clearTimeout(t) }, [])
  const [orgData, setOrgData] = useState(orgTree)
  const [privData, setPrivData] = useState(privTree)

  const toast = useCallback((msg, kind = 'info') => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, msg, kind }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4500)
  }, [])
  const dismissToast = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), [])

  const [orgViewOnly, setOrgViewOnly] = useState(false)
  const go = (key, viewOnly) => { setScreen(key); setModal(null); setListSearch(''); setOrgViewOnly(!!viewOnly) }
  const ddVal = (id) => dd[id] ?? DD_DEFAULTS[id]
  const ddProps = (id, options) => ({
    value: ddVal(id), options, open: ddOpen === id,
    onToggle: () => setDdOpen(o => (o === id ? null : id)),
    onSelect: (v) => { setDd(d => ({ ...d, [id]: v })); setDdOpen(null) },
  })

  const cloneAdd = (nodes, parentName, unit) => nodes.map(n => n.name === parentName ? { ...n, children: [...(n.children || []), unit] } : (n.children ? { ...n, children: cloneAdd(n.children, parentName, unit) } : n))
  const cloneUpd = (nodes, code, patch) => nodes.map(n => n.code === code ? { ...n, ...patch } : (n.children ? { ...n, children: cloneUpd(n.children, code, patch) } : n))
  const cloneDel = (nodes, code) => nodes.filter(n => n.code !== code).map(n => n.children ? { ...n, children: cloneDel(n.children, code) } : n)
  const orgDelete = (code) => setOrgData(d => cloneDel(d, code))
  const cloneStatus = (nodes, codes, status) => nodes.map(n => { const m = codes.has(n.code) ? { ...n, status } : n; return m.children ? { ...m, children: cloneStatus(m.children, codes, status) } : m })
  const orgStatus = (code, status, opts) => { const codes = new Set([code, ...((opts && opts.targets) || [])]); setOrgData(d => cloneStatus(d, codes, status)) }
  const privDelete = (code) => setPrivData(d => cloneDel(d, code))
  const cloneToggle = (nodes, code) => nodes.map(n => n.code === code ? { ...n, active: n.active === false } : (n.children ? { ...n, children: cloneToggle(n.children, code) } : n))
  const privToggleActive = (code) => setPrivData(d => cloneToggle(d, code))
  const openPriv = (rec) => { setEditRec(rec); setModal('priv') }
  const privSubmit = (v) => {
    if (v.edit) { setPrivData(d => cloneUpd(d, v.origCode, { code:v.code, name:v.name, wbs:v.wbs, desc:v.desc, active:v.active, isDefault:v.isDefault })) }
    else { const node = { kind:'priv', code:v.code, name:v.name, wbs:v.wbs, desc:v.desc, active:v.active, isDefault:v.isDefault, children:[] }; setPrivData(d => cloneAdd(d, v.parentName || v.appName, node)) }
  }
  const orgSubmit = (vals) => {
    const type = ddVal('ouType')
    if (editRec && editRec.code) { setOrgData(d => cloneUpd(d, editRec.code, { code:vals.code, name:vals.name, wbs:vals.wbs, type, status: vals.active ? 'Active' : 'Inactive' })); toast('Organization unit updated successfully.', 'success') }
    else {
      const parentName = editRec ? editRec.parentName : (ddVal('ouParent') !== 'None (root)' ? ddVal('ouParent') : null)
      const level = editRec && editRec.parentLevel != null ? editRec.parentLevel + 1 : 0
      const unit = { code:vals.code, name:vals.name, type, wbs:vals.wbs, level, status: vals.active ? 'Active' : 'Inactive', children: [] }
      setOrgData(d => parentName ? cloneAdd(d, parentName, unit) : [...d, unit])
      toast('Organization unit created successfully.', 'success')
    }
  }
  const openNew = (type) => { setEditRec(null); setModal(type) }
  const openEdit = (type, rec) => { setEditRec(rec); setModal(type) }
  const openMenuModal = (type, rec) => { setMenuRec(rec); setModal(type) }
  const closeModal = () => { setModal(null); setEditRec(null); setMenuRec(null); setEventView(false); setNotifView(false); setJobView(false) }
  const stop = (e) => e.stopPropagation()
  const listHandlers = screen === 'sessions' ? { view:(r) => { setEditRec({ account:r[0], device:r[1], ip:(r[2] && r[2].m) || '', location:r[3], started:r[4], status:(r[5] && r[5].b) || 'Closed' }); setModal('session') } } : undefined
  const navW = navCollapsed ? 72 : 256

  if (booting) return <AppBootLoader />

  /* ===================== LOGIN ===================== */
  if (screen === 'login') {
    return (
      <>
        <Login toast={toast} onContinue={(r) => { setRole(r || 'super'); setScreen('mfa') }} />
        <Toasts toasts={toasts} onDismiss={dismissToast} />
      </>
    )
  }

  /* ===================== MFA ===================== */
  if (screen === 'mfa') {
    return (
      <>
        <MfaScreen email={role === 'tenant' ? 'ravi.m@academy.excelsoft.edu' : 'anita.k@excelsoftcorp.com'} onVerify={() => setScreen('dashboard')} onBack={() => setScreen('login')} toast={toast} />
        <Toasts toasts={toasts} onDismiss={dismissToast} />
      </>
    )
  }

  /* ===================== APP SHELL ===================== */
  const scopeName = role === 'tenant' ? (tenants.find(t => t.code === TENANT_CODE) || {}).name : null
  const navItems = nav.map(n => ({ ...n, current: screen === n.key }))
  const byKey = Object.fromEntries(navItems.map(n => [n.key, n]))
  const hidden = role === 'tenant' ? ['tenants', 'superAdmin', 'syncDashboard', 'syncSubscribers', 'syncOutbox'] : []
  const navGroups = navGroupDefs.map(g => ({ label:g.label, items:g.keys.filter(k => !hidden.includes(k)).map(k => byKey[k]) })).filter(g => g.items.length)

  return (
    <div style={{ minHeight:'100vh' }}>
      <a href="#main" className="skip-link">Skip to main content</a>

      <AppHeader role={role} tenantCode={TENANT_CODE} onSignOut={() => setModal('logout')} onBell={() => go('userNotifs')} />

      <SideNav navGroups={navGroups} navCollapsed={navCollapsed} setNavCollapsed={setNavCollapsed} navW={navW} go={go} />

      <main id="main" style={{ marginLeft:navW, marginTop:64, padding:'24px 28px 48px', minHeight:'calc(100vh - 64px)', transition:'margin-left .28s ease' }}>
        {screen === 'dashboard' && <Dashboard go={go} toast={toast} openTenant={() => openNew('tenant')} openUser={() => openNew('user')} tenantCode={role === 'tenant' ? TENANT_CODE : null} />}
        {screen === 'tenants' && <Tenants search={tenantSearch} setSearch={setTenantSearch} filter={tenantFilter} setFilter={setTenantFilter} toast={toast} openModal={() => openNew('tenant')} editModal={(t) => openEdit('tenant', t)} confirmDelete={setConfirm} go={go} confirmCreate={setConfirm} openConfig={(t, mode) => openMenuModal(mode === 'business' ? 'tenantBizConfig' : 'tenantConfig', t)} openAuthProviders={(t) => openMenuModal('authProviders', t)} openHealth={(t) => openMenuModal('health', t)} openStatus={(t) => openMenuModal('tenantStatus', t)} openLicense={(t) => openMenuModal('licenseInfo', t)} openCreateLicense={(t) => openMenuModal('createLicense', t)} />}
        {screen === 'users' && <Users tenantScope={scopeName} hideRoles={role === 'tenant' ? rolesList.filter(r => r.scope === 'Global').map(r => r.name) : null} search={userSearch} setSearch={setUserSearch} ddProps={ddProps} ddVal={ddVal} toast={toast} openUser={() => openNew('user')} editUser={(u) => openEdit('user', u)} openStatus={(u) => { setMenuRec({ name:u.name, code:u.login, status: (u.status === 'Active' || u.status === 'Inactive' || u.status === 'Suspended') ? u.status : 'Active' }); setModal('accountStatus') }} openMapRoles={() => setModal('mapRoles')} confirmDelete={setConfirm} openSubjectAttrs={(u) => { setMenuRec(u); setModal('subjectAttrs') }} />}
        {screen === 'roles' && <Roles roles={role === 'tenant' ? rolesList.filter(r => r.scope !== 'Global') : rolesList} toast={toast} openRole={() => openNew('role')} editRole={(r) => openEdit('role', r)} openMapPerms={(nm) => { setMapRole(nm); setModal('mapPrivs') }} openMapAccounts={(r) => { setMapAcctRole(r); setModal('mapAccounts') }} deleteRole={deleteRole} />}
        {screen === 'passwordPolicy' && <PasswordPolicy minLen={minLen} setMinLen={setMinLen} toast={toast} />}
        {screen === 'org' && <OrgStructure toast={toast} confirmCreate={setConfirm} openUnit={(rec) => { setEditRec(rec); setModal('orgUnit') }} confirmDelete={setConfirm} tree={orgData} onDelete={orgDelete} openStatus={(rec) => { setMenuRec(rec); setModal('orgStatus') }} viewOnly={orgViewOnly} />}
        {screen === 'permissions' && <Privileges tree={privData} toast={toast} onToggleActive={privToggleActive} />}
        {screen === 'events' && <Events events={eventsList} toast={toast} openNew={openEventNew} openView={openEventView} openEdit={openEventEdit} deleteEvent={deleteEvent} toggleEvent={toggleEvent} />}
        {screen === 'notifications' && <Notifications notifications={role === 'tenant' ? notifList.filter(n => { const t = JSON.stringify(n).toLowerCase(); const me = tenants.find(x => x.name === scopeName); return (me && t.includes(me.domain)) || users.some(u => u.tenant === scopeName && u.role !== 'System Administrator' && (t.includes(u.email.toLowerCase()) || t.includes('"' + u.login.toLowerCase() + '"'))) }) : notifList} toast={toast} openNew={openNotifNew} openView={openNotifView} openEdit={openNotifEdit} deleteNotif={deleteNotif} resendNotif={resendNotif} cancelNotif={cancelNotif} exportAction={() => toast('Exporting notifications to Excel…', 'success')} />}
        {screen === 'jobs' && <Jobs jobs={jobsList} toast={toast} openNew={openJobNew} openView={openJobView} openEdit={openJobEdit} deleteJob={deleteJob} toggleJob={toggleJob} runJob={runJob} />}
        {screen === 'jobExecLog' && <JobExecLog />}
        {screen === 'dataIntake' && <DataIntake toast={toast} />}
        {screen === 'syncDashboard' && <SyncDashboard go={go} />}
        {screen === 'syncSubscribers' && <SyncSubscribers toast={toast} />}
        {screen === 'syncOutbox' && <SyncOutbox toast={toast} />}
        {screen === 'userNotifs' && <UserNotifications toast={toast} />}
        {screen === 'appClients' && <AppClients listSearch={listSearch} setListSearch={setListSearch} toast={toast} openEdit={(rec) => { setEditRec(rec); setModal('appClient') }} />}
        {screen === 'lookups' && <Lookups listSearch={listSearch} setListSearch={setListSearch} toast={toast} openEdit={(rec) => { setEditRec(rec); setModal('lookup') }} openNew={() => { setEditRec(null); setModal('lookup') }} confirm={setConfirm} />}
        {screen === 'superAdmin' && <SuperAdmins listSearch={listSearch} setListSearch={setListSearch} toast={toast} openEdit={(rec) => { setEditRec(rec); setModal('superAdmin') }} openNew={() => { setEditRec(null); setModal('superAdmin') }} confirm={setConfirm} />}
        {screen === 'abacPolicies' && <AbacPolicies listSearch={listSearch} setListSearch={setListSearch} toast={toast} openEdit={(rec) => { setEditRec(rec); setModal('policy') }} openView={(rec) => { setEditRec(rec); setModal('policy') }} openNew={() => { setEditRec(null); setModal('policy') }} openMap={(rec) => { setEditRec(rec); setModal('policyMap') }} confirm={setConfirm} />}
        {screen === 'subject' && <Subject listSearch={listSearch} setListSearch={setListSearch} toast={toast} />}
        {screen === 'environment' && <Environment listSearch={listSearch} setListSearch={setListSearch} toast={toast} />}
        {screen === 'resource' && <Resource listSearch={listSearch} setListSearch={setListSearch} toast={toast} />}
        {screen === 'sessions' && <Sessions toast={toast} tenantScope={scopeName} adminName={role === 'tenant' ? 'Ravi Mohan' : 'Anita Kulkarni'} />}
        {!['appClients', 'lookups', 'superAdmin', 'subject', 'environment', 'resource', 'abacPolicies', 'sessions', 'syncDashboard', 'syncSubscribers', 'syncOutbox'].includes(screen) && buildList(screen, listSearch, toast, listHandlers) && <GenericList key={screen} list={buildList(screen, listSearch, toast, listHandlers)} listSearch={listSearch} setListSearch={setListSearch} />}
      </main>

      {modal === 'tenant' && <TenantModal onClose={closeModal} stop={stop} ddProps={ddProps} toast={toast} record={editRec} confirmCreate={setConfirm} />}
      {modal === 'user' && <UserModal onClose={closeModal} stop={stop} ddProps={ddProps} ddVal={ddVal} toast={toast} record={editRec} />}
      {modal === 'appClient' && <AppClientModal onClose={closeModal} stop={stop} toast={toast} record={editRec} />}
      {modal === 'session' && <SessionModal onClose={closeModal} stop={stop} toast={toast} record={editRec} />}
      {modal === 'lookup' && <LookupModal onClose={closeModal} stop={stop} toast={toast} record={editRec} />}
      {modal === 'policy' && <PolicyModal onClose={closeModal} stop={stop} toast={toast} record={editRec} />}
      {modal === 'policyMap' && editRec && <PolicyResourcesModal onClose={closeModal} stop={stop} toast={toast} policy={editRec} />}
      {modal === 'subjectAttrs' && menuRec && <SubjectAttrsModal account={menuRec} onClose={closeModal} stop={stop} toast={toast} />}
      {modal === 'superAdmin' && <SuperAdminModal onClose={closeModal} stop={stop} toast={toast} record={editRec} />}
      {modal === 'mapRoles' && <MapRolesModal onClose={closeModal} stop={stop} toast={toast} />}
      {modal === 'role' && <RoleModal onClose={closeModal} stop={stop} toast={toast} record={editRec} onSubmit={roleSubmit} />}
      {modal === 'mapPrivs' && <MapPermsModal onClose={closeModal} stop={stop} toast={toast} roleName={mapRole} />}
      {modal === 'mapAccounts' && <MapAccountsModal onClose={closeModal} stop={stop} toast={toast} role={mapAcctRole} />}
      {modal === 'tenantConfig' && menuRec && <TenantConfigModal tenant={menuRec} onClose={closeModal} stop={stop} ddProps={ddProps} toast={toast} />}
      {modal === 'tenantBizConfig' && menuRec && <TenantConfigModal key="biz" mode="business" tenant={menuRec} onClose={closeModal} stop={stop} ddProps={ddProps} toast={toast} />}
      {modal === 'authProviders' && menuRec && <AuthProvidersModal tenant={menuRec} onClose={closeModal} stop={stop} toast={toast} />}
      {modal === 'health' && menuRec && <HealthCheckModal tenant={menuRec} onClose={closeModal} stop={stop} toast={toast} />}
      {modal === 'licenseInfo' && menuRec && <LicenseInfoModal tenant={menuRec} onClose={closeModal} stop={stop} toast={toast} />}
      {modal === 'createLicense' && menuRec && <CreateLicenseModal tenant={menuRec} onClose={closeModal} stop={stop} toast={toast} />}
      {modal === 'orgUnit' && <OrgUnitModal onClose={closeModal} stop={stop} ddProps={ddProps} toast={toast} record={editRec} onSubmit={orgSubmit} />}
      {modal === 'orgStatus' && menuRec && <ManageStatusModal node={menuRec} onClose={closeModal} stop={stop} toast={toast} onSubmit={orgStatus} />}
      {modal === 'tenantStatus' && menuRec && <ManageStatusModal node={menuRec} onClose={closeModal} stop={stop} toast={toast} onSubmit={() => {}} />}
      {modal === 'accountStatus' && menuRec && <ManageStatusModal node={menuRec} onClose={closeModal} stop={stop} toast={toast} onSubmit={() => {}} />}
      {modal === 'priv' && <PrivilegeModal onClose={closeModal} stop={stop} toast={toast} record={editRec} onSubmit={privSubmit} apps={appClientNames} tree={privData} />}
      {modal === 'event' && <EventModal onClose={closeModal} stop={stop} toast={toast} record={editRec} mode={eventView ? 'view' : (editRec ? 'edit' : 'create')} onSubmit={eventSubmit} onEdit={() => setEventView(false)} />}
      {modal === 'notif' && <NotificationModal onClose={closeModal} stop={stop} toast={toast} record={editRec} mode={notifView ? 'view' : (editRec ? 'edit' : 'create')} onSubmit={notifSubmit} onEdit={() => setNotifView(false)} />}
      {modal === 'job' && <JobModal onClose={closeModal} stop={stop} toast={toast} record={editRec} mode={jobView ? 'view' : (editRec ? 'edit' : 'create')} onSubmit={jobSubmit} onEdit={() => setJobView(false)} />}
      {modal === 'logout' && <LogoutModal onClose={closeModal} stop={stop} onLogout={(scope, n) => { setScreen('login'); toast(scope === 'all' ? 'Signed out of all ' + n + ' sessions.' : 'You have been signed out.', 'success') }} />}
      {confirm && <ConfirmModal onClose={() => setConfirm(null)} stop={stop} danger={confirm.danger} title={confirm.title} message={confirm.message} confirm={confirm.confirmLabel} onConfirm={confirm.onConfirm} />}

      <Toasts toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
