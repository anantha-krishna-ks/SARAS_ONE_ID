// SARAS One Console — data model & pure view helpers.
// Field vocabulary mirrors the SARAS One Data Dictionary; page/operation set mirrors
// the SARAS One UI Navigation Flow.

export const nav = [
  { key:'dashboard',      label:'Dashboard',       icon:'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z' },
  { key:'tenants',        label:'Tenants',         icon:'M3 21h18 M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16 M9 7h4 M9 11h4 M9 15h4' },
  { key:'users',          label:'Accounts',           icon:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75' },
  { key:'superAdmin',     label:'Super Admin',     icon:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M17 3l1.2 2.4L21 6l-2.8.6L17 9l-1.2-2.4L13 6l2.8-.6L17 3z' },
  { key:'roles',          label:'Roles',           icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4' },
  { key:'permissions',    label:'Privileges',     icon:'M11 6h9 M11 12h9 M11 18h9 M3.5 6l1.4 1.4L7 5 M3.5 12l1.4 1.4L7 11 M3.5 18l1.4 1.4L7 17' },
  { key:'events',         label:'Events',          icon:'M13 2L3 14h9l-1 8 10-12h-9z' },
  { key:'notifications',  label:'Notifications',   icon:'M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0' },
  { key:'jobs',           label:'Jobs',            icon:'M4 4h16v16H4z M8 9l3 3-3 3 M13 15h4' },
  { key:'jobExecLog',     label:'Job Execution Log', icon:'M4 17l6-6-6-6 M12 19h8' },
  { key:'schedules',      label:'Schedules',       icon:'M8 2v4 M16 2v4 M3 9h18 M3 5h18v16H3z M12 13v3l2 1' },
  { key:'scheduleLog',    label:'Schedule Log',    icon:'M12 6v6l4 2 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z' },
  { key:'executionLog',   label:'Execution Log',   icon:'M22 12h-4l-3 9L9 3l-3 9H2' },
  { key:'appLog',         label:'Application Log',  icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 13h6 M9 17h4' },
  { key:'navFlow',        label:'Navigation Flow',  icon:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M16 8l-2 6-6 2 2-6z' },
  { key:'auditLog',       label:'Audit Log',       icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4' },
  { key:'passwordPolicy', label:'Password Policy',  icon:'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4 M12 15v2' },
  { key:'org',            label:'Organization',    icon:'M9 3h6v4H9z M4 17h6v4H4z M14 17h6v4h-6z M12 7v4 M7 17v-2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2' },
  { key:'appClients',     label:'Application Clients', icon:'M3 5h18v14H3z M3 9h18 M7 7h.01 M10 7h.01' },
  { key:'lookups',        label:'Lookups',         icon:'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01' },
  { key:'accessScopes',   label:'Access Scopes',   icon:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 12h.01' },
  { key:'abacPolicies',   label:'ABAC Policies',   icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 15l2 2 4-4' },
  { key:'abacAttributes', label:'ABAC Attributes', icon:'M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6' },
  { key:'subject',        label:'Subject',         icon:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87' },
  { key:'environment',    label:'Environment',     icon:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z' },
  { key:'resource',       label:'Resource',        icon:'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z M3.27 6.96L12 12l8.73-5.04 M12 22V12' },
  { key:'integrations',   label:'Integrations',    icon:'M16 3h5v5 M4 20L21 3 M21 16v5h-5 M14 14l7 7 M3 4l6 6' },
  { key:'dataIntake',     label:'Data Intake',     icon:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3' },
  { key:'sessions',       label:'Sessions',        icon:'M5 3h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M8 21h8 M12 17v4' },
  { key:'credentials',    label:'Credentials',     icon:'M21 2l-3 3 M6.5 11.5a5 5 0 1 0 6 6 5 5 0 0 0-6-6z M14 9l4 4 M11.5 6.5L18 13' },
  { key:'passwordHistory',label:'Password History', icon:'M12 8v4l3 2 M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z' },
  { key:'syncDashboard',  label:'Sync Dashboard',  icon:'M3 3v18h18 M7 15l4-4 3 3 5-6' },
  { key:'syncSubscribers',label:'Sync Subscribers', icon:'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M17 14v6 M14 17h6' },
  { key:'syncOutbox',     label:'Sync Outbox',     icon:'M22 12h-6l-2 3h-4l-2-3H2 M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z' },
]

export const navGroupDefs = [
  { label:'Overview',   keys:['dashboard'] },
  { label:'Access',     keys:['tenants','users','superAdmin','appClients','roles','permissions','lookups'] },
  { label:'Access Control', keys:['abacPolicies','abacAttributes','subject','environment','resource'] },
  { label:'Automation', keys:['events','notifications','jobs','jobExecLog','dataIntake'] },
  { label:'Synchronization', keys:['syncDashboard','syncSubscribers','syncOutbox'] },
  { label:'Monitoring', keys:['sessions','appLog','navFlow','auditLog'] },
]

export const tenants = [
  { name:'Excelsoft Academy',      code:'EXA-01', domain:'academy.excelsoft.edu', city:'Mysuru, India',   plan:'Enterprise', users:1240, status:'Active',       created:'12 Jan 2024', hasOrg:true },
  { name:'Bright Future Schools',  code:'BFS-02', domain:'brightfuture.edu',      city:'Austin, USA',    plan:'Standard',   users:320,  status:'Active',       created:'03 Mar 2024', hasOrg:false },
  { name:'Nova Learning Group',    code:'NLG-03', domain:'novalearn.com',         city:'Singapore',      plan:'Enterprise', users:890,  status:'Active',       created:'21 Apr 2024', hasOrg:true },
  { name:'Pinnacle Training Inst.',code:'PIN-04', domain:'pinnacle.co',           city:'Manchester, UK', plan:'Standard',   users:145,  status:'Suspended',    created:'09 Jun 2024', hasOrg:false },
  { name:'Horizon EdTech',         code:'HZN-05', domain:'horizonedtech.io',      city:'Dubai, UAE',     plan:'Trial',      users:42,   status:'Provisioning', created:'28 Jul 2024', hasOrg:false },
  { name:'Meridian University',    code:'MER-06', domain:'meridian.edu',          city:'Boston, USA',    plan:'Enterprise', users:2110, status:'Active',       created:'15 Aug 2024', hasOrg:true },
]

export const licenses = [
  { id:'LIC-1051', tenant:'Pinnacle Training Inst.', product:'Test Delivery',    seats:200,  used:145,  days:3 },
  { id:'LIC-1042', tenant:'Bright Future Schools',   product:'Candidate Management',    seats:350,  used:320,  days:5 },
  { id:'LIC-1011', tenant:'Excelsoft Academy',       product:'Remote Proctoring',   seats:800,  used:610,  days:6 },
  { id:'LIC-1063', tenant:'Horizon EdTech',          product:'Learning Experience',     seats:50,   used:42,   days:12 },
  { id:'LIC-1018', tenant:'Nova Learning Group',     product:'Remote Proctoring',   seats:600,  used:512,  days:22 },
  { id:'LIC-1007', tenant:'Meridian University',     product:'eMarking', seats:2500, used:2110, days:28 },
  { id:'LIC-1019', tenant:'Nova Learning Group',     product:'Item Authoring & Test Bank',    seats:1000, used:890,  days:64 },
  { id:'LIC-1008', tenant:'Meridian University',     product:'Test Delivery',    seats:2500, used:2110, days:96 },
  { id:'LIC-1003', tenant:'Excelsoft Academy',       product:'Test Delivery',    seats:1500, used:1240, days:142 },
  { id:'LIC-1044', tenant:'Bright Future Schools',   product:'Certification & Badging', seats:350,  used:210,  days:180 },
]
export const userGrowth = [3120, 3260, 3390, 3480, 3610, 3790, 3920, 4080, 4210, 4390, 4560, 4747]
export const tenantGrowth = [2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6]

export const users = [
  { name:'Anita Kulkarni', login:'anita.k',     email:'anita.k@excelsoftcorp.com',    role:'System Administrator', tenant:'Excelsoft Academy',      designation:'Systems Lead',      status:'Active',    last:'2 min ago',   initials:'AK' },
  { name:'Rahul Menon',    login:'rahul.menon', email:'rahul.menon@novalearn.com',    role:'Tenant Admin',         tenant:'Nova Learning Group',    designation:'Principal',         status:'Active',    last:'1 hr ago',    initials:'RM' },
  { name:'Sara Fernandes', login:'sara.f',      email:'sara.f@brightfuture.edu',      role:'Content Author',       tenant:'Bright Future Schools',  designation:'Curriculum Author', status:'Active',    last:'3 hr ago',    initials:'SF' },
  { name:'David Osei',     login:'d.osei',      email:'d.osei@horizonedtech.io',      role:'Reviewer',             tenant:'Horizon EdTech',         designation:'QA Reviewer',       status:'Invited',   last:'Never',       initials:'DO' },
  { name:'Meera Iyer',     login:'meera.iyer',  email:'meera.iyer@meridian.edu',      role:'Tenant Admin',         tenant:'Meridian University',    designation:'Registrar',         status:'Active',    last:'Yesterday',   initials:'MI' },
  { name:'Tom Baker',      login:'tom.baker',   email:'tom.baker@pinnacle.co',        role:'Reviewer',             tenant:'Pinnacle Training Inst.',designation:'Adjunct Reviewer',  status:'Suspended', last:'12 days ago', initials:'TB' },
  { name:'Priya Nair',     login:'priya.nair',  email:'priya.nair@excelsoftcorp.com', role:'Content Author',       tenant:'Excelsoft Academy',      designation:'Content Author',    status:'Locked',    last:'5 hr ago',    initials:'PN' },
]

export const roles = [
  { name:'System Administrator', code:'SYS_ADMIN',      scope:'Global', privs:24, users:3,  status:'Active',   desc:'Full control across all tenants, users, roles and permissions.' },
  { name:'Tenant Admin',         code:'TENANT_ADMIN',   scope:'Tenant', privs:16, users:12, status:'Active',   desc:'Manages users, roles and settings within a single tenant.' },
  { name:'Content Author',       code:'CONTENT_AUTHOR', scope:'Tenant', privs:9,  users:48, status:'Active',   desc:'Creates and edits assessment content; no user management.' },
  { name:'Reviewer',             code:'REVIEWER',       scope:'Tenant', privs:5,  users:31, status:'Active',   desc:'Reviews and approves submitted content; read-only on users.' },
  { name:'Auditor',              code:'AUDITOR',        scope:'Global', privs:4,  users:2,  status:'Inactive', desc:'Read-only access to reports and activity logs.' },
]

export const permissions = [
  { name:'Manage Tenants',      module:'Tenants',    desc:'Create, edit, activate and delete tenant organizations.' },
  { name:'Manage Accounts',        module:'Accounts',      desc:'Create, edit, import and reset accounts.' },
  { name:'Map Roles',           module:'Accounts',      desc:'Assign and revoke roles for accounts.' },
  { name:'Manage Roles',        module:'Roles',      desc:'Create and edit roles and their scope.' },
  { name:'Map Privileges',     module:'Roles',      desc:'Attach or detach privileges from a role.' },
  { name:'Manage Events',       module:'Events',     desc:'Configure events, priorities and channels.' },
  { name:'Manage Jobs',         module:'Jobs',       desc:'Register jobs and manage schedules.' },
  { name:'Set Password Policy', module:'Security',   desc:'Configure complexity, expiry and lockout rules.' },
  { name:'View Audit Log',      module:'Monitoring', desc:'Read-only access to audit and activity logs.' },
]

export const privApps = [
  { code:'TNT', name:'Tenant Management', icon:'M3 21h18 M6 21V8l6-4 6 4v13 M10 21v-5h4v5', nodes:[
    { k:'tnt.view', name:'View Tenants', desc:'Browse the tenant directory.' },
    { k:'tnt.manage', name:'Manage Tenants', group:true, perms:[
      { k:'tnt.create', name:'Create Tenant', desc:'Provision a new tenant organization.' },
      { k:'tnt.edit', name:'Edit Tenant', desc:'Update tenant profile and plan.' },
      { k:'tnt.status', name:'Activate / Deactivate', desc:'Change tenant lifecycle status.' },
      { k:'tnt.delete', name:'Delete Tenant', desc:'Permanently remove a tenant.' } ] },
    { k:'tnt.config', name:'Configure Tenant', group:true, perms:[
      { k:'tnt.brand', name:'Branding', desc:'Logos, colors and theme.' },
      { k:'tnt.domain', name:'Domains & SSO', desc:'Custom domains and identity providers.' } ] } ] },
  { code:'ACC', name:'Account Management', icon:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87', nodes:[
    { k:'acc.view', name:'View Accounts', desc:'Browse account records.' },
    { k:'acc.manage', name:'Manage Accounts', group:true, perms:[
      { k:'acc.create', name:'Create Account', desc:'Add a new account.' },
      { k:'acc.edit', name:'Edit Account', desc:'Update account details.' },
      { k:'acc.import', name:'Bulk Import', desc:'Import accounts from a file.' },
      { k:'acc.reset', name:'Reset Password', desc:'Force a password reset.' } ] },
    { k:'acc.maprole', name:'Map Roles to Account', desc:'Assign or revoke account roles.' } ] },
  { code:'ROL', name:'Role & Access', icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4', nodes:[
    { k:'rol.view', name:'View Roles', desc:'Browse defined roles.' },
    { k:'rol.manage', name:'Manage Roles', group:true, perms:[
      { k:'rol.create', name:'Create Role', desc:'Define a new role.' },
      { k:'rol.edit', name:'Edit Role', desc:'Update role name and scope.' },
      { k:'rol.delete', name:'Delete Role', desc:'Remove a role.' } ] },
    { k:'rol.mappriv', name:'Map Privileges', desc:'Attach privileges to a role.' } ] },
  { code:'ORG', name:'Organization Structure', icon:'M3 3h7v7H3z M14 14h7v7h-7z M14 3h7v7h-7z M3 14h7v7H3z', nodes:[
    { k:'org.view', name:'View Structure', desc:'Explore the organization tree.' },
    { k:'org.manage', name:'Manage Units', group:true, perms:[
      { k:'org.create', name:'Create Unit', desc:'Add an organization unit.' },
      { k:'org.move', name:'Move / Reparent', desc:'Restructure the hierarchy.' },
      { k:'org.delete', name:'Delete Unit', desc:'Remove an organization unit.' } ] },
    { k:'org.scope', name:'Manage Access Scopes', desc:'Assign OU scoping to roles.' } ] },
  { code:'AUT', name:'Item Authoring & Test Bank', icon:'M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z', nodes:[
    { k:'aut.view', name:'View Item Bank', desc:'Browse questions and blueprints.' },
    { k:'aut.items', name:'Manage Items', group:true, perms:[
      { k:'aut.create', name:'Author Item', desc:'Create questions and passages.' },
      { k:'aut.edit', name:'Edit Item', desc:'Revise existing items.' },
      { k:'aut.review', name:'Review & Approve', desc:'Move items through workflow.' } ] },
    { k:'aut.blueprint', name:'Manage Blueprints', group:true, perms:[
      { k:'aut.bpcreate', name:'Create Blueprint', desc:'Define test structure.' },
      { k:'aut.bppublish', name:'Publish Blueprint', desc:'Release for delivery.' } ] } ] },
  { code:'DEL', name:'Test Delivery', icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M9 15l2 2 4-4', nodes:[
    { k:'del.view', name:'View Schedules', desc:'See scheduled assessments.' },
    { k:'del.schedule', name:'Schedule Sessions', group:true, perms:[
      { k:'del.create', name:'Create Session', desc:'Schedule a delivery window.' },
      { k:'del.assign', name:'Assign Candidates', desc:'Roster candidates to a session.' },
      { k:'del.cancel', name:'Cancel Session', desc:'Withdraw a scheduled session.' } ] },
    { k:'del.monitor', name:'Live Monitoring', desc:'Observe active sessions.' } ] },
  { code:'PRC', name:'Remote Proctoring', icon:'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', nodes:[
    { k:'prc.view', name:'View Sessions', desc:'Access proctoring dashboards.' },
    { k:'prc.review', name:'Review Flags', group:true, perms:[
      { k:'prc.flag', name:'Raise / Clear Flags', desc:'Adjudicate incidents.' },
      { k:'prc.evidence', name:'View Evidence', desc:'Access recordings and logs.' } ] },
    { k:'prc.rules', name:'Configure Rules', desc:'Set proctoring policies.' } ] },
  { code:'ANL', name:'Analytics & Reports', icon:'M3 3v18h18 M7 14l4-4 3 3 5-6', nodes:[
    { k:'anl.view', name:'View Dashboards', desc:'Read analytics dashboards.' },
    { k:'anl.reports', name:'Manage Reports', group:true, perms:[
      { k:'anl.build', name:'Build Report', desc:'Create custom reports.' },
      { k:'anl.export', name:'Export Data', desc:'Download report datasets.' },
      { k:'anl.schedule', name:'Schedule Delivery', desc:'Email reports on a cadence.' } ] } ] },
  { code:'LIB', name:'Content Library', icon:'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z', nodes:[
    { k:'lib.view', name:'Browse Library', desc:'View shared media and assets.' },
    { k:'lib.assets', name:'Manage Assets', group:true, perms:[
      { k:'lib.upload', name:'Upload Asset', desc:'Add media to the library.' },
      { k:'lib.tag', name:'Tag & Organize', desc:'Categorize assets.' },
      { k:'lib.delete', name:'Delete Asset', desc:'Remove library assets.' } ] } ] },
  { code:'SYS', name:'System Administration', icon:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z', nodes:[
    { k:'sys.settings', name:'Global Settings', desc:'Configure platform-wide options.' },
    { k:'sys.security', name:'Security Policies', group:true, perms:[
      { k:'sys.pwd', name:'Password Policy', desc:'Complexity and expiry rules.' },
      { k:'sys.mfa', name:'MFA Policy', desc:'Multi-factor requirements.' } ] },
    { k:'sys.audit', name:'View Audit Log', desc:'Read audit and activity logs.' } ] },
]

export function flattenPrivKeys(app){
  const out = []
  app.nodes.forEach(n => n.group ? n.perms.forEach(p => out.push(p.k)) : out.push(n.k))
  return out
}

// ---- Privilege catalogue (hierarchical) ----
// Mirrors the SARAS One data dictionary for `permissions`:
// id, parent_id (self-ref → hierarchy), tenant_id, app_id (→ app_client),
// code, name, description, wbs, is_active, is_default, permission_uuid.
// The catalogue is derived once from privApps so the Map-privileges tree and the
// Privileges admin screen stay in lock-step.
function toPriv(app, n, parentWbs){
  const seg = n.k.split('.').pop().toUpperCase()
  const wbs = (parentWbs || app.code) + '.' + seg
  const children = n.group ? n.perms.map(p => toPriv(app, p, wbs)) : []
  return {
    kind:'priv',
    code:'PRM_' + n.k.replace(/\./g, '_').toUpperCase(),
    name:n.name,
    desc:n.desc || (n.group ? 'Grouping of related privileges.' : ''),
    wbs,
    active:true,
    isDefault:/view|browse/i.test(n.name),
    children,
  }
}
export const privTree = privApps.map(a => ({
  kind:'app', appCode:'APP_' + a.code, code:'APP_' + a.code, name:a.name, icon:a.icon,
  children:a.nodes.map(n => toPriv(a, n)),
}))
export const appClientNames = privApps.map(a => a.name)
export function countPrivs(nodes){ return (nodes || []).reduce((sum, n) => sum + 1 + countPrivs(n.children), 0) }


export const eventChannelOptions = ['Email', 'SMS', 'In-app', 'Push', 'WhatsApp']
export const eventTimingSuggestions = ['Immediate', '08:00', '12:00', '20:00']
export const eventPriorityOptions = ['High', 'Medium', 'Low']
export const eventJobOptions = ['Bulk User Import', 'Notification Dispatch', 'Expired Session Cleanup', 'Audit Log Archival', 'Token Rotation']
export const events = [
  { code:'EVT_USER_INVITED', name:'User Invited', app:'Tenant Management', description:'Triggered when an administrator invites a new account to a tenant.', parameters:['user_name', 'tenant_name', 'invite_link'], priority:'High', subject:'You’re invited to SARAS One', shortMsg:'{user_name}, you have been invited to join {tenant_name}.', longMsg:'Hello {user_name},\n\nYou have been invited to join {tenant_name} on SARAS One. Use the secure link below to activate your account.\n\n{invite_link}', channels:['Email', 'SMS'], timings:['Immediate'], hasJob:false, jobName:'', active:true },
  { code:'EVT_PWD_RESET', name:'Password Reset', app:'Tenant Management', description:'Sent when an account requests a password reset.', parameters:['user_name', 'reset_link', 'expiry_minutes'], priority:'High', subject:'Reset your SARAS One password', shortMsg:'A password reset was requested for your account.', longMsg:'Hi {user_name},\n\nWe received a request to reset your password. This link expires in {expiry_minutes} minutes.\n\n{reset_link}', channels:['Email'], timings:['Immediate'], hasJob:false, jobName:'', active:true },
  { code:'EVT_ACC_LOCKED', name:'Account Locked', app:'Tenant Management', description:'Raised after repeated failed sign-in attempts lock an account.', parameters:['user_name', 'unlock_time'], priority:'Medium', subject:'Your account has been locked', shortMsg:'Your account was locked after multiple failed attempts.', longMsg:'Hi {user_name},\n\nYour account has been temporarily locked due to multiple failed sign-in attempts. It will unlock automatically at {unlock_time}.', channels:['Email'], timings:['Immediate'], hasJob:false, jobName:'', active:true },
  { code:'EVT_ROLE_MAPPED', name:'Role Assigned', app:'Tenant Management', description:'Fired when a role is granted to an account.', parameters:['user_name', 'role_name'], priority:'Low', subject:'A new role was assigned to you', shortMsg:'{user_name}, you have been granted the {role_name} role.', longMsg:'Hi {user_name},\n\nYou have been assigned the {role_name} role. Your available actions may change the next time you sign in.', channels:['In-app'], timings:['Immediate'], hasJob:false, jobName:'', active:true },
  { code:'EVT_TENANT_PROV', name:'Tenant Provisioned', app:'Tenant Management', description:'Emitted when a new tenant finishes provisioning.', parameters:['tenant_name', 'admin_email'], priority:'Medium', subject:'Your SARAS One tenant is ready', shortMsg:'{tenant_name} has been provisioned successfully.', longMsg:'Hello,\n\nThe tenant {tenant_name} has been provisioned and is ready to use. The primary administrator is {admin_email}.', channels:['Email', 'In-app'], timings:['Immediate'], hasJob:false, jobName:'', active:false },
  { code:'EVT_JOB_FAILED', name:'Job Failed', app:'Tenant Management', description:'Digest of failed background jobs, dispatched on a schedule.', parameters:['job_name', 'failed_reason', 'failed_at'], priority:'High', subject:'A scheduled job has failed', shortMsg:'{job_name} failed: {failed_reason}.', longMsg:'A scheduled job requires attention.\n\nJob: {job_name}\nReason: {failed_reason}\nTime: {failed_at}', channels:['Email', 'SMS', 'In-app'], timings:['08:00', '20:00'], hasJob:true, jobName:'Notification Dispatch', active:true },
]

export const notifications = [
  { event:'User Invited', sender:'Anita Kulkarni', recipient:'sara.f@brightfuture.edu', channel:'Email', message:'Sara, you have been invited to join Bright Future Schools on SARAS One.', status:'Delivered', completedAt:'17 Aug 2026, 09:12', iterations:1, priority:'High', failedReason:'' },
  { event:'Password Reset', sender:'System', recipient:'d.osei@horizonedtech.io', channel:'Email', message:'A password reset was requested for your account. The link expires in 30 minutes.', status:'Sent', completedAt:'17 Aug 2026, 08:58', iterations:1, priority:'High', failedReason:'' },
  { event:'Account Locked', sender:'System', recipient:'tom.baker@pinnacle.co', channel:'Email', message:'Your account was locked after multiple failed sign-in attempts.', status:'Processing', completedAt:'—', iterations:2, priority:'Medium', failedReason:'' },
  { event:'Role Assigned', sender:'Rahul Menon', recipient:'meera.iyer@meridian.edu', channel:'In-app', message:'You have been granted the Tenant Admin role.', status:'Queued', completedAt:'—', iterations:0, priority:'Low', failedReason:'' },
  { event:'Tenant Provisioned', sender:'System', recipient:'admin@novalearn.com', channel:'Email', message:'The tenant Nova Learning Group has been provisioned and is ready to use.', status:'Draft', completedAt:'—', iterations:0, priority:'Medium', failedReason:'' },
  { event:'Job Failed', sender:'System', recipient:'anita.k@excelsoftcorp.com', channel:'SMS', message:'Notification Dispatch failed: SMTP relay timeout.', status:'Failed', completedAt:'17 Aug 2026, 06:01', iterations:3, priority:'High', failedReason:'{\n  "code": "SMTP_TIMEOUT",\n  "detail": "Connection to relay timed out after 30s",\n  "retryable": true\n}' },
  { event:'User Invited', sender:'Meera Iyer', recipient:'priya.nair@excelsoftcorp.com', channel:'In-app', message:'You have been invited to collaborate on Excelsoft Academy.', status:'Cancelled', completedAt:'—', iterations:0, priority:'Low', failedReason:'' },
]
export const notifStatusOptions = ['Draft', 'Queued', 'Processing', 'Sent', 'Delivered', 'Failed', 'Cancelled']
export const notifSenderOptions = ['System', 'Anita Kulkarni', 'Rahul Menon', 'Sara Fernandes', 'Meera Iyer']
export const notifRecipientOptions = ['sara.f@brightfuture.edu', 'd.osei@horizonedtech.io', 'tom.baker@pinnacle.co', 'meera.iyer@meridian.edu', 'anita.k@excelsoftcorp.com', 'priya.nair@excelsoftcorp.com', 'admin@novalearn.com']
export const notifEventOptions = Array.from(new Set(events.map(e => e.name)))

const _recFn = ['Aarav','Isabella','Liam','Sophia','Noah','Mia','Ethan','Ava','Kabir','Ananya','Rahul','Meera','David','Sara','Tom','Priya','Omar','Lena','Yuki','Chen','Fatima','Diego','Nina','Ravi','Grace','Hassan','Elena','Marcus','Zara','Ibrahim','Leila','Sameer','Anita','Rohan','Divya','Arjun','Kiran','Naomi','Victor','Aisha']
const _recLn = ['Kulkarni','Menon','Fernandes','Osei','Iyer','Baker','Nair','Khan','Silva','Tanaka','Wang','Ahmed','Torres','Kapoor','Reddy','Bose','Chopra','Malhotra','Sharma','Gupta']
const _recTenants = ['Excelsoft Academy','Nova Learning Group','Bright Future Schools','Horizon EdTech','Meridian University','Pinnacle Training Inst.']
const _recRoles = ['System Administrator','Tenant Admin','Content Author','Reviewer','Learner']
export const recipientDirectory = (() => {
  const out = []
  for (let i = 0; i < 48; i++) {
    const fn = _recFn[i % _recFn.length], ln = _recLn[(i * 7) % _recLn.length]
    const t = _recTenants[i % _recTenants.length]
    const domain = t.toLowerCase().replace(/[^a-z]+/g, '') + '.edu'
    out.push({ name: fn + ' ' + ln, email: (fn + '.' + ln).toLowerCase() + '@' + domain, initials: (fn[0] + ln[0]).toUpperCase(), role: _recRoles[i % _recRoles.length], tenant: t })
  }
  return out
})()

export const jobs = [
  { code:'JOB_USER_IMPORT', name:'Bulk User Import', description:'Imports and provisions accounts in bulk from an uploaded roster.', assemblyName:'Saras.Jobs.dll', className:'Saras.Jobs.BulkUserImport', cronExpress:'0 2 * * *', cronExpressJson:'{\n  "minute": "0",\n  "hour": "2",\n  "dayOfMonth": "*",\n  "month": "*",\n  "dayOfWeek": "*"\n}', triggerDesc:'Daily at 02:00', allowParallel:false, active:true, priority:'High', maxRetries:3, retryInterval:60, parameters:['tenant_id', 'source_file', 'notify_on_complete'] },
  { code:'JOB_NOTIF_DISPATCH', name:'Notification Dispatch', description:'Drains the outbound notification queue across all channels.', assemblyName:'Saras.Jobs.dll', className:'Saras.Jobs.NotificationDispatch', cronExpress:'*/5 * * * *', cronExpressJson:'{\n  "minute": "*/5",\n  "hour": "*",\n  "dayOfWeek": "*"\n}', triggerDesc:'Every 5 minutes', allowParallel:true, active:true, priority:'Medium', maxRetries:5, retryInterval:30, parameters:['batch_size', 'channel'] },
  { code:'JOB_SESSION_CLEAN', name:'Expired Session Cleanup', description:'Removes expired sessions and revoked refresh tokens.', assemblyName:'Saras.Jobs.dll', className:'Saras.Jobs.SessionCleanup', cronExpress:'0 * * * *', cronExpressJson:'{\n  "minute": "0",\n  "hour": "*",\n  "dayOfWeek": "*"\n}', triggerDesc:'Hourly', allowParallel:false, active:true, priority:'Low', maxRetries:1, retryInterval:120, parameters:[] },
  { code:'JOB_AUDIT_ARCHIVE', name:'Audit Log Archival', description:'Archives audit records older than the retention window to cold storage.', assemblyName:'Saras.Jobs.dll', className:'Saras.Jobs.AuditArchival', cronExpress:'0 3 1 * *', cronExpressJson:'{\n  "minute": "0",\n  "hour": "3",\n  "dayOfMonth": "1",\n  "dayOfWeek": "*"\n}', triggerDesc:'Monthly on the 1st at 03:00', allowParallel:false, active:false, priority:'Low', maxRetries:2, retryInterval:300, parameters:['retention_days'] },
  { code:'JOB_TOKEN_ROTATE', name:'Token Rotation', description:'Rotates signing keys and service credentials in the vault.', assemblyName:'Saras.Jobs.dll', className:'Saras.Jobs.TokenRotation', cronExpress:'0 */6 * * *', cronExpressJson:'{\n  "minute": "0",\n  "hour": "*/6",\n  "dayOfWeek": "*"\n}', triggerDesc:'Every 6 hours', allowParallel:true, active:true, priority:'High', maxRetries:3, retryInterval:45, parameters:['scope'] },
]

export const jobExecStatusOptions = ['Queued', 'Running', 'Completed', 'Failed', 'Cancelled', 'TimedOut', 'Skipped']
export const jobExecWindowOptions = ['Last 1 hour', 'Last 24 hours', 'Last 7 days', 'Last 30 days']
export const jobExecutions = [
  { id:'EXE-92417', tenant:'Excelsoft Academy', job:'Notification Dispatch', jobCode:'JOB_NOTIF_DISPATCH', scheduleId:'SCH-1002', status:'Running', startedAt:'17 Aug 2026, 08:35', endedAt:'', durationMs:null, retries:0, agoHours:0.4, error:'', parameters:['batch_size=200', 'channel=Email'] },
  { id:'EXE-92416', tenant:'Nova Learning Group', job:'Notification Dispatch', jobCode:'JOB_NOTIF_DISPATCH', scheduleId:'SCH-1002', status:'Queued', startedAt:'17 Aug 2026, 08:40', endedAt:'', durationMs:null, retries:0, agoHours:0.1, error:'', parameters:['batch_size=200', 'channel=SMS'] },
  { id:'EXE-92410', tenant:'Excelsoft Academy', job:'Notification Dispatch', jobCode:'JOB_NOTIF_DISPATCH', scheduleId:'SCH-1002', status:'Completed', startedAt:'17 Aug 2026, 08:30', endedAt:'17 Aug 2026, 08:30', durationMs:4200, retries:0, agoHours:0.6, error:'', parameters:['batch_size=200', 'channel=In-app'] },
  { id:'EXE-92402', tenant:'Meridian University', job:'Expired Session Cleanup', jobCode:'JOB_SESSION_CLEAN', scheduleId:'SCH-1003', status:'Completed', startedAt:'17 Aug 2026, 08:00', endedAt:'17 Aug 2026, 08:00', durationMs:1800, retries:0, agoHours:1, error:'', parameters:[] },
  { id:'EXE-92388', tenant:'Excelsoft Academy', job:'Token Rotation', jobCode:'JOB_TOKEN_ROTATE', scheduleId:'SCH-1005', status:'Failed', startedAt:'17 Aug 2026, 06:00', endedAt:'17 Aug 2026, 06:00', durationMs:30000, retries:3, agoHours:3, error:'{\n  "code": "ECONNREFUSED",\n  "detail": "Vault connection refused after 3 attempts",\n  "host": "vault.internal:8200"\n}', parameters:['scope=signing-keys'], execSteps:['Acquired job lock', 'Connected to Vault', 'Rotated signing keys', 'Published JWKS'], iterErrors:[{ status:'Failed', message:'ECONNREFUSED vault.internal:8200 \u2014 connection refused (timeout 10s).' }, { status:'Failed', message:'ECONNREFUSED vault.internal:8200 \u2014 connection refused (timeout 10s). Backing off 20s.' }, { status:'TimedOut', message:'Vault handshake exceeded 10s ceiling.' }] },
  { id:'EXE-92386', tenant:'Nova Learning Group', job:'Notification Dispatch', jobCode:'JOB_NOTIF_DISPATCH', scheduleId:'SCH-1002', status:'TimedOut', startedAt:'17 Aug 2026, 05:55', endedAt:'17 Aug 2026, 06:00', durationMs:300000, retries:4, agoHours:3, error:'Execution exceeded the 300s ceiling and was terminated by the scheduler.', parameters:['batch_size=500', 'channel=Push'], execSteps:['Acquired job lock', 'Fetched 500 queued notifications', 'Dispatched via Push gateway', 'Marked batch complete'], iterErrors:[{ status:'Failed', message:'Push gateway returned 503 Service Unavailable.' }, { status:'Failed', message:'Push gateway returned 503 Service Unavailable. Backing off 30s.' }, { status:'TimedOut', message:'Gateway did not acknowledge batch within 60s.' }, { status:'Failed', message:'Push gateway returned 429 Too Many Requests.' }] },
  { id:'EXE-92375', tenant:'Meridian University', job:'Audit Log Archival', jobCode:'JOB_AUDIT_ARCHIVE', scheduleId:'SCH-1004', status:'Cancelled', startedAt:'17 Aug 2026, 03:00', endedAt:'17 Aug 2026, 03:01', durationMs:null, retries:0, agoHours:6, error:'', parameters:['retention_days=365'] },
  { id:'EXE-92360', tenant:'Excelsoft Academy', job:'Bulk User Import', jobCode:'JOB_USER_IMPORT', scheduleId:'SCH-1001', status:'Completed', startedAt:'17 Aug 2026, 02:00', endedAt:'17 Aug 2026, 02:04', durationMs:252000, retries:0, agoHours:6.5, error:'', parameters:['tenant_id=1240', 'source_file=roster_aug.xlsx', 'notify_on_complete=true'] },
  { id:'EXE-92140', tenant:'Bright Future Schools', job:'Bulk User Import', jobCode:'JOB_USER_IMPORT', scheduleId:'SCH-1001', status:'Failed', startedAt:'16 Aug 2026, 02:00', endedAt:'16 Aug 2026, 02:01', durationMs:70000, retries:3, agoHours:30, error:'Source file not found: roster_aug.xlsx. Upload the roster before the next run.', parameters:['tenant_id=320', 'source_file=roster_aug.xlsx'], execSteps:['Acquired job lock', 'Located source file', 'Parsed roster rows', 'Provisioned accounts'], iterErrors:[{ status:'Failed', message:'Source file not found: roster_aug.xlsx.' }, { status:'Failed', message:'Source file not found: roster_aug.xlsx. Backing off 15s.' }, { status:'Failed', message:'Source file not found: roster_aug.xlsx. Backing off 30s.' }] },
  { id:'EXE-92120', tenant:'Horizon EdTech', job:'Expired Session Cleanup', jobCode:'JOB_SESSION_CLEAN', scheduleId:'SCH-1003', status:'Skipped', startedAt:'16 Aug 2026, 07:00', endedAt:'16 Aug 2026, 07:00', durationMs:null, retries:0, agoHours:25, error:'', parameters:[] },
  { id:'EXE-92090', tenant:'Excelsoft Academy', job:'Token Rotation', jobCode:'JOB_TOKEN_ROTATE', scheduleId:'SCH-1005', status:'Completed', startedAt:'16 Aug 2026, 18:00', endedAt:'16 Aug 2026, 18:00', durationMs:21000, retries:1, agoHours:14, error:'', parameters:['scope=service-credentials'], execSteps:['Acquired job lock', 'Connected to Vault', 'Rotated service credentials', 'Published JWKS'], result:'12 service credentials rotated.', iterErrors:[{ status:'Failed', message:'Vault lease renewal failed: lease expired mid-rotation.' }] },
  { id:'EXE-90012', tenant:'Meridian University', job:'Audit Log Archival', jobCode:'JOB_AUDIT_ARCHIVE', scheduleId:'SCH-1004', status:'Completed', startedAt:'01 Aug 2026, 03:00', endedAt:'01 Aug 2026, 03:14', durationMs:845000, retries:0, agoHours:400, error:'', parameters:['retention_days=365'] },
]

export const listMeta = {
  appClients: { title:'Application Clients', sub:'Registered client applications that authenticate through SARAS One.', minW:720, exportable:true, actions:['edit'],
    cols:['Code','Name','Status'],
    rows:[
      ['APP_ONEID','SARAS One Console',{b:'Active'}],
      ['APP_CANDIDATE','Candidate Management',{b:'Active'}],
      ['APP_CAREER','Career Portal',{b:'Active'}],
      ['APP_CERT','Certification & Badging',{b:'Active'}],
      ['APP_EMARKING','eMarking',{b:'Active'}],
      ['APP_ITEMBANK','Item Authoring & Test Bank',{b:'Active'}],
      ['APP_LXP','Learning Experience',{b:'Active'}],
      ['APP_PROCTOR','Remote Proctoring',{b:'Inactive'}],
      ['APP_TESTCON','Test Construction',{b:'Active'}],
      ['APP_DELIVERY','Test Delivery',{b:'Active'}],
    ] },
  superAdmin: { title:'Super Admin', sub:'Super administrator accounts with estate-wide access.', minW:1000, exportable:true, actions:['edit','delete'], newLabel:'New super admin', filters:{ status:4 },
    cols:['First Name','Display Name','Email','Mobile No','Status'],
    rows:[
      ['Anita','Anita Kulkarni',{m:'anita.k@excelsoftcorp.com'},'+91 98450 12345',{b:'Active'}],
      ['Rahul','Rahul Menon',{m:'rahul.m@excelsoftcorp.com'},'+65 8123 4567',{b:'Active'}],
      ['Meera','Meera Iyer',{m:'meera.i@meridian.edu'},'+1 617 555 0184',{b:'Invited'}],
      ['David','David Osei',{m:'d.osei@horizonedtech.io'},'+971 50 555 2211',{b:'Suspended'}],
    ] },
  lookups: { title:'Lookups', sub:'Master data and lookup sets shared across the platform.', minW:720, exportable:true, actions:['edit','toggle'], newLabel:'New lookup',
    filters:{ tag:{ label:'Lookup Set' }, status:3 },
    rowTags:['Org Unit Types','Org Unit Types','Employee Types','Employee Types','Channels','Channels','Genders','Genders'],
    cols:['Code','Name','Description','Status'],
    rows:[
      [{m:'OU_FACULTY'},'Faculty','Top-level academic unit',{b:'Active'}],
      [{m:'OU_DEPT'},'Department','Sub-unit within a faculty',{b:'Active'}],
      [{m:'EMP_FULL'},'Full-time','Permanent staff',{b:'Active'}],
      [{m:'EMP_CONTRACT'},'Contract','Fixed-term staff',{b:'Active'}],
      [{m:'CH_EMAIL'},'Email','SMTP delivery channel',{b:'Active'}],
      [{m:'CH_SMS'},'SMS','SMS gateway channel',{b:'Inactive'}],
      [{m:'GEN_F'},'Female','\u2014',{b:'Active'}],
      [{m:'GEN_M'},'Male','\u2014',{b:'Active'}],
    ] },
  accessScopes: { title:'Access Scopes', sub:'Organization-unit scoping and access levels per account role.', minW:960, exportable:true, actions:['view','edit'],
    cols:['Account','Role','Organization Unit','Access Level','Effective From','Effective To'],
    rows:[
      ['Anita Kulkarni','System Administrator','Excelsoft Academy',{b:'all'},'01 Jan 2026','\u2014'],
      ['Rahul Menon','Tenant Admin','Nova Learning Group',{b:'descendants+self'},'01 Feb 2026','\u2014'],
      ['Meera Iyer','Tenant Admin','Meridian University',{b:'descendants'},'15 Aug 2026','\u2014'],
      ['Sara Fernandes','Content Author','Department of Physics',{b:'self'},'01 Mar 2026','31 Dec 2026'],
    ] },
  abacPolicies: { title:'ABAC Policies', sub:'Attribute-based access-control policies evaluated at request time.', minW:1140, exportable:true, actions:['view','edit','toggle','mapResource','delete'], newLabel:'New Policy', filters:{ status:6 },
    cols:['Policy Code','Policy Name','#Conditions','#Resources mapped','Applicable Resources','Created On','Status'],
    rows:[
      [{m:'101'},'Show Courses to creators only if it is in draft',{m:'2'},{m:'1'},'Courses View','10-09-2026',{b:'Active'}],
      [{m:'102'},'Business-hours access from managed desktops',{m:'2'},{m:'3'},'Courses View, Reports, Assessments View','01-03-2026',{b:'Active'}],
      [{m:'103'},'Same-tenant resources only',{m:'1'},{m:'4'},'Courses View, Assessments API, Reports, Admin Console','01-03-2026',{b:'Active'}],
      [{m:'104'},'High-risk IP block',{m:'3'},{m:'2'},'Admin Console, Reports','12-04-2026',{b:'Active'}],
      [{m:'105'},'Contractor read-only within own unit',{m:'3'},{m:'0'},'\u2014','20-05-2026',{b:'Inactive'}],
    ] },
  abacAttributes: { title:'ABAC Attributes', sub:'Environment, resource and account attributes available to policies.', minW:900, exportable:true, actions:['view','edit'],
    cols:['Scope','Attribute','Data Type','Sample Value','Status'],
    rows:[
      ['Environment','current_time','time',{m:'09:00\u201318:00'},{b:'Active'}],
      ['Environment','request_ip','string',{m:'103.21.44.0/24'},{b:'Active'}],
      ['Resource','resource_tenant','number',{m:'1240'},{b:'Active'}],
      ['Resource','sensitivity','string','confidential',{b:'Active'}],
      ['Account','designation','string','Systems Lead',{b:'Active'}],
      ['Account','department','string','Information Technology',{b:'Active'}],
    ] },
  subject: { title:'Subject Attributes', sub:'Subject (account) attributes available to ABAC policy evaluation.', minW:820, exportable:true, actions:[],
    cols:['Name','Description','Data Type'],
    rows:[
      ['Department','Organizational department the account belongs to.','string'],
      ['Designation','Job title or designation of the account holder.','string'],
      ['Clearance level','Security clearance level assigned to the account.','number'],
      ['Employment type','Employment category, e.g. full-time or contractor.','string'],
      ['Home location','Primary work location of the account holder.','string'],
    ] },
  environment: { title:'Environment Attributes', sub:'Environment (context) attributes evaluated at request time.', minW:820, exportable:true, actions:[],
    cols:['Name','Description','Data Type'],
    rows:[
      ['Request time','Time of day at which the access request is made.','time'],
      ['Request IP','Source IP address of the incoming request.','string'],
      ['Geo location','Geographic location resolved from the request.','string'],
      ['Device type','Category of device used, e.g. desktop or mobile.','string'],
      ['Risk score','Computed risk score for the request context.','number'],
    ] },
  resource: { title:'Resource Attributes', sub:'Resource (object) attributes available to ABAC policy evaluation.', minW:820, exportable:true, actions:[],
    cols:['Name','Description','Data Type'],
    rows:[
      ['Owning tenant','Tenant that owns the requested resource.','number'],
      ['Sensitivity','Sensitivity classification of the resource.','string'],
      ['Resource type','Type of the resource, e.g. report or document.','string'],
      ['Owner','Account that owns the resource.','string'],
      ['Organization unit','Organization unit the resource belongs to.','string'],
    ] },
  integrations: { title:'Integrations', sub:'Inbound data feeds and import requests across features.', minW:940, exportable:true, actions:['view','run'],
    cols:['Feature','Type','Entity','Source','Records','Status'],
    rows:[
      ['Excel Import','File','Accounts',{m:'accounts_aug.xlsx'},'214',{b:'Completed'}],
      ['SAP HR','Plugin','Accounts',{m:'/sap/hr/employees'},'1,024',{b:'Processing'}],
      ['Workday','Plugin','Organization Units',{m:'/workday/orgs'},'48',{b:'Queued'}],
      ['Excel Import','File','Roles',{m:'roles_map.xlsx'},'12',{b:'Failed'}],
      ['Text Import','File','Lookups',{m:'lookups.csv'},'60',{b:'Completed'}],
    ] },
  sessions: { title:'Sessions', sub:'Active and recent sign-in sessions across the estate.', minW:940, exportable:true, actions:['view','revoke'], filters:{ status:5, window:4 },
    cols:['Account','Device','IP Address','Location','Started','Status'],
    rows:[
      ['Anita Kulkarni','Chrome \u00b7 macOS',{m:'103.21.44.12'},'Mysuru, IN','17 Aug 09:02',{b:'Active'}],
      ['Rahul Menon','Safari \u00b7 iOS',{m:'49.207.11.8'},'Singapore','17 Aug 08:40',{b:'Active'}],
      ['Meera Iyer','Edge \u00b7 Windows',{m:'20.44.12.9'},'Boston, US','17 Aug 07:15',{b:'Active'}],
      ['Sara Fernandes','Chrome \u00b7 Android',{m:'102.89.3.1'},'Austin, US','16 Aug 22:10',{b:'Closed'}],
      ['David Osei','Firefox \u00b7 Linux',{m:'154.160.2.7'},'Dubai, AE','16 Aug 18:55',{b:'Expired'}],
    ] },
  credentials: { title:'Credentials', sub:'Authentication methods registered per account.', minW:920, exportable:true, actions:['view','revoke'],
    cols:['Account','Type','Identifier','Provider','Verified','Last Used'],
    rows:[
      ['Anita Kulkarni','Password',{m:'anita.k'},'Local',{b:'Verified'},'2 min ago'],
      ['Anita Kulkarni','Passkey',{m:'macbook-touchid'},'Local',{b:'Verified'},'Today'],
      ['Rahul Menon','OAuth',{m:'google:rahul'},'Google',{b:'Verified'},'1 hr ago'],
      ['Meera Iyer','Email OTP',{m:'m.iyer@meridian.edu'},'Local',{b:'Verified'},'Yesterday'],
      ['David Osei','Phone OTP',{m:'+971\u2022\u2022\u2022\u2022210'},'Local',{b:'Pending'},'\u2014'],
    ] },
  passwordHistory: { title:'Password History', sub:'Password change history, rotation reasons and expiry.', minW:860, exportable:true, actions:['view'],
    cols:['Account','Reason','Changed','Expires','By'],
    rows:[
      ['Anita Kulkarni','rotation','15 Aug 2026','15 Nov 2026','system'],
      ['Rahul Menon','reset','12 Aug 2026','12 Nov 2026','anita.k'],
      ['Meera Iyer','admin_reset','10 Aug 2026','10 Nov 2026','anita.k'],
      ['David Osei','policy_enforcement','08 Aug 2026','08 Nov 2026','system'],
      ['Sara Fernandes','rotation','05 Aug 2026','05 Nov 2026','system'],
    ] },

  schedules: { title:'Schedules', sub:'Cron schedules that trigger background jobs.', minW:900, actions:['view','edit','toggle'],
    cols:['Schedule','Job','Type','Cron','Window','Status'],
    rows:[
      ['Nightly user import','Bulk User Import','cron',{m:'0 2 * * *'},'01 Jan 2026 \u2013 \u2014',{b:'Active'}],
      ['Notification sweep','Notification Dispatch','cron',{m:'*/5 * * * *'},'01 Jan 2026 \u2013 \u2014',{b:'Active'}],
      ['Session cleanup','Expired Session Cleanup','cron',{m:'0 * * * *'},'01 Jan 2026 \u2013 \u2014',{b:'Active'}],
      ['Monthly audit archive','Audit Log Archival','cron',{m:'0 3 1 * *'},'01 Jan \u2013 31 Dec 2026',{b:'Inactive'}],
      ['Token rotation','Token Rotation','cron',{m:'0 */6 * * *'},'01 Jan 2026 \u2013 \u2014',{b:'Active'}],
    ] },
  scheduleLog: { title:'Schedule Log', sub:'Execution history per schedule.', minW:900, exportable:true, actions:['reexecute'],
    cols:['Schedule','Job','Status','Started','Ended','Duration','Retry'],
    rows:[
      ['Nightly user import','Bulk User Import',{b:'Completed'},'17 Aug 02:00','17 Aug 02:03','3m 12s','0'],
      ['Notification sweep','Notification Dispatch',{b:'Running'},'17 Aug 09:15','\u2014','\u2014','0'],
      ['Session cleanup','Expired Session Cleanup',{b:'Completed'},'17 Aug 09:00','17 Aug 09:00','8s','0'],
      ['Token rotation','Token Rotation',{b:'Failed'},'17 Aug 06:00','17 Aug 06:01','52s','2'],
      ['Monthly audit archive','Audit Log Archival',{b:'Skipped'},'\u2014','\u2014','\u2014','0'],
    ] },
  executionLog: { title:'Execution Log', sub:'Job execution history across the estate.', minW:940, exportable:true, actions:['reexecute','toggle'],
    cols:['Job','Status','Started','Ended','Duration','Retry','Error'],
    rows:[
      ['Bulk User Import',{b:'Completed'},'17 Aug 02:00','17 Aug 02:03','3m 12s','0','\u2014'],
      ['Notification Dispatch',{b:'Running'},'17 Aug 09:15','\u2014','\u2014','0','\u2014'],
      ['Token Rotation',{b:'Failed'},'17 Aug 06:00','17 Aug 06:01','52s','2','Vault timeout'],
      ['Expired Session Cleanup',{b:'Completed'},'17 Aug 09:00','17 Aug 09:00','8s','0','\u2014'],
      ['Audit Log Archival',{b:'TimedOut'},'01 Aug 03:00','01 Aug 03:30','30m','1','Exceeded window'],
    ] },
  appLog: { title:'Application Log', sub:'Structured application and system events.', minW:960, exportable:true,
    cols:['Level','Action','Category','Message','Account','When'],
    rows:[
      [{b:'Info'},{m:'Users.Create'},'Account','User account created','anita.k','17 Aug 09:12'],
      [{b:'Warning'},{m:'Login.Validate'},'Auth','MFA retry limit approaching','d.osei','17 Aug 09:05'],
      [{b:'Error'},{m:'Jobs.Execute'},'Scheduler','Token rotation failed: Vault timeout','system','17 Aug 06:01'],
      [{b:'Info'},{m:'Tenants.Update'},'Tenant','Tenant configuration updated','anita.k','16 Aug 18:40'],
      [{b:'Warning'},{m:'Notifications.Dispatch'},'Messaging','SMS provider latency high','system','16 Aug 12:22'],
    ] },
  navFlow: { title:'Navigation Flow', sub:'Page navigation trail by session and account.', minW:920, exportable:true,
    cols:['When','Account','Role','Application','Page','Path'],
    rows:[
      ['17 Aug 09:14','Anita Kulkarni','System Administrator','SARAS One Console','Accounts',{m:'/users'}],
      ['17 Aug 09:13','Anita Kulkarni','System Administrator','SARAS One Console','Dashboard',{m:'/dashboard'}],
      ['17 Aug 09:02','Rahul Menon','Tenant Admin','SARAS One Console','Roles',{m:'/roles'}],
      ['17 Aug 08:58','Meera Iyer','Tenant Admin','SARAS One Console','Tenants',{m:'/tenants'}],
      ['17 Aug 08:41','Sara Fernandes','Content Author','Item Authoring & Test Bank','Login',{m:'/login'}],
    ] },
  auditLog: { title:'Audit Log', sub:'Every change to governed entities, with before and after.', minW:980, exportable:true,
    cols:['When','Account','Role','Entity','Code','Action','Change'],
    rows:[
      ['17 Aug 09:12','Anita Kulkarni','System Administrator','Account',{m:'ACC-1042'},{b:'Create'},'name, email, role'],
      ['17 Aug 08:40','Rahul Menon','Tenant Admin','Role',{m:'ROL-004'},{b:'Update'},'permissions +3'],
      ['16 Aug 18:40','Anita Kulkarni','System Administrator','Tenant',{m:'MER-06'},{b:'Update'},'status: Provisioning\u2192Active'],
      ['16 Aug 15:20','Meera Iyer','Tenant Admin','Account',{m:'ACC-0991'},{b:'Delete'},'is_deleted: false\u2192true'],
      ['15 Aug 11:05','System','\u2014','Password Policy',{m:'PP-01'},{b:'Update'},'min_length: 10\u219212'],
    ] },
}

export const abacAttributeCatalog = {
  subject: [
    { key:'department', label:'Department', type:'string', desc:'Organizational department the account belongs to.', sample:'Information Technology' },
    { key:'designation', label:'Designation', type:'string', desc:'Job title or designation of the account holder.', sample:'Systems Lead' },
    { key:'clearance_level', label:'Clearance level', type:'number', desc:'Security clearance level assigned to the account.', sample:'3' },
    { key:'employment_type', label:'Employment type', type:'string', desc:'Employment category, e.g. full-time or contractor.', options:['Full-time', 'Part-time', 'Contractor', 'Intern'] },
    { key:'home_location', label:'Home location', type:'string', desc:'Primary work location of the account holder.', sample:'Mysuru' },
  ],
  resource: [
    { key:'owning_tenant', label:'Owning tenant', type:'number', desc:'Tenant that owns the requested resource.', sample:'1240' },
    { key:'sensitivity', label:'Sensitivity', type:'string', desc:'Sensitivity classification of the resource.', sample:'confidential' },
    { key:'resource_type', label:'Resource type', type:'string', desc:'Type of the resource, e.g. report or document.', sample:'report' },
    { key:'owner', label:'Owner', type:'string', desc:'Account that owns the resource.', sample:'anita.k' },
    { key:'org_unit', label:'Organization unit', type:'string', desc:'Organization unit the resource belongs to.', sample:'Department of Physics' },
  ],
  environment: [
    { key:'request_time', label:'Request time', type:'time', desc:'Time of day at which the access request is made.' },
    { key:'request_ip', label:'Request IP', type:'string', desc:'Source IP address of the incoming request.', sample:'103.21.44.10' },
    { key:'geo_location', label:'Geo location', type:'string', desc:'Geographic location resolved from the request.', sample:'India' },
    { key:'device_type', label:'Device type', type:'string', desc:'Category of device used, e.g. desktop or mobile.', sample:'desktop' },
    { key:'risk_score', label:'Risk score', type:'number', desc:'Computed risk score for the request context.', sample:'70' },
  ],
}

export const abacResourceTargets = [
  { id:'courses.view', name:'Courses View', module:'Courses', type:'View', path:'/courses' },
  { id:'courses.edit', name:'Edit Course', module:'Courses', type:'Action', path:'PUT /api/courses/{id}' },
  { id:'courses.publish', name:'Publish Course', module:'Courses', type:'Action', path:'POST /api/courses/{id}/publish' },
  { id:'assess.view', name:'Assessments View', module:'Assessments', type:'View', path:'/assessments' },
  { id:'assess.api', name:'Assessments API', module:'Assessments', type:'API', path:'/api/assessments/*' },
  { id:'reports.view', name:'Reports', module:'Reports', type:'Report', path:'/reports' },
  { id:'reports.export', name:'Export Report', module:'Reports', type:'Action', path:'POST /api/reports/export' },
  { id:'admin.console', name:'Admin Console', module:'Administration', type:'View', path:'/admin' },
  { id:'admin.accounts', name:'Accounts API', module:'Administration', type:'API', path:'/api/accounts/*' },
  { id:'admin.tenants', name:'Tenants API', module:'Administration', type:'API', path:'/api/tenants/*' },
]
export const abacPolicyMapped = { '101':['courses.view'], '102':['courses.view','reports.view','assess.view'], '103':['courses.view','assess.api','reports.view','admin.console'], '104':['admin.console','reports.view'], '105':[] }

export const abacPolicySeeds = {
  '101': { effect:'Allow', match:'all', desc:'Course creators may open a course only while it is still in draft.', conditions:[
    { lt:'Subject', la:'designation', op:'eq', rt:'Static value', v1:'Content Author' },
    { lt:'Resource', la:'resource_type', op:'eq', rt:'Static value', v1:'draft' },
  ] },
  '102': { effect:'Allow', match:'all', desc:'Grants access only during tenant business hours from managed desktops.', conditions:[
    { lt:'Environment', la:'request_time', op:'between', rt:'Static value', v1:'09:00', v2:'18:00' },
    { lt:'Environment', la:'device_type', op:'eq', rt:'Static value', v1:'desktop' },
  ] },
  '103': { effect:'Allow', match:'all', desc:'Resources may only be accessed within their owning tenant.', conditions:[
    { lt:'Resource', la:'owning_tenant', op:'eq', rt:'Static value', v1:'1240' },
  ] },
  '104': { effect:'Deny', match:'any', desc:'Blocks high-risk traffic and unexpected geographies.', conditions:[
    { lt:'Environment', la:'risk_score', op:'gt', rt:'Static value', v1:'70' },
    { lt:'Environment', la:'request_ip', op:'starts', rt:'Static value', v1:'103.21.' },
    { lt:'Environment', la:'geo_location', op:'neq', rt:'Static value', v1:'India' },
  ] },
  '105': { effect:'Allow', match:'all', desc:'Contractors see only public and internal material in their own unit.', conditions:[
    { lt:'Subject', la:'employment_type', op:'eq', rt:'Static value', v1:'Contractor' },
    { lt:'Resource', la:'sensitivity', op:'in', rt:'Static value', v1:'public, internal' },
    { lt:'Resource', la:'org_unit', op:'eq', rt:'Subject', ra:'department' },
  ] },
}

export const orgTree = [
  { code:'EXA-ROOT', name:'Excelsoft Academy', type:'Organization', wbs:'EXA', level:0, status:'Active', icon:'M3 21h18 M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16 M9 7h4', children:[
    { code:'SCI', name:'School of Sciences', type:'Faculty', wbs:'EXA.SCI', level:1, status:'Active', icon:'M22 10L12 5 2 10l10 5 10-5z M6 12v5c0 1 3 2 6 2s6-1 6-2v-5', children:[
      { code:'PHY', name:'Department of Physics', type:'Department', wbs:'EXA.SCI.PHY', level:2, status:'Active', icon:'M9 3h6v4H9z M4 17h6v4H4z M14 17h6v4h-6z M12 7v4', children:[
        { code:'APHY', name:'Applied Physics', type:'Division', wbs:'EXA.SCI.PHY.APHY', level:3, status:'Active', icon:'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z', children:[
          { code:'QLAB', name:'Quantum Lab Group', type:'Section', wbs:'EXA.SCI.PHY.APHY.QLAB', level:4, status:'Active', icon:'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01', children:[] },
          { code:'OLAB', name:'Optics Lab Group', type:'Section', wbs:'EXA.SCI.PHY.APHY.OLAB', level:4, status:'Inactive', icon:'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01', children:[] }
        ] }
      ] },
      { code:'CHE', name:'Department of Chemistry', type:'Department', wbs:'EXA.SCI.CHE', level:2, status:'Active', icon:'M9 3h6v4H9z M4 17h6v4H4z M14 17h6v4h-6z M12 7v4', children:[] }
    ] },
    { code:'HUM', name:'School of Humanities', type:'Faculty', wbs:'EXA.HUM', level:1, status:'Active', icon:'M22 10L12 5 2 10l10 5 10-5z M6 12v5c0 1 3 2 6 2s6-1 6-2v-5', children:[
      { code:'HIS', name:'Department of History', type:'Department', wbs:'EXA.HUM.HIS', level:2, status:'Inactive', icon:'M9 3h6v4H9z M4 17h6v4H4z M14 17h6v4h-6z M12 7v4', children:[] }
    ] }
  ] }
]

export function orgUnitNames() {
  const out = []
  const walk = (ns) => ns.forEach(n => { out.push(n.name); if (n.children) walk(n.children) })
  walk(orgTree)
  return out
}

export const roleTemplates = [
  { name:'Academic (default)', desc:'Tenant Admin, Content Author, Reviewer', checked:true },
  { name:'Assessment-only',    desc:'Content Author, Reviewer',                checked:false },
  { name:'Read-only',          desc:'Reviewer, Auditor',                       checked:false },
]

export const pwToggles = [
  { key:'require_uppercase',    label:'Require uppercase', code:'require_uppercase', hint:'Enforce mixed case.', on:true },
  { key:'require_lowercase',    label:'Require lowercase', code:'require_lowercase', hint:'Enforce mixed case.', on:true },
  { key:'require_number',       label:'Require a number',  code:'require_number',    hint:'Add numeric diversity.', on:true },
  { key:'require_special_char', label:'Require a symbol',  code:'require_special_char', hint:'Include symbols such as ! @ # $ % &', on:true },
]

export const pwPatternToggles = [
  { key:'disallow_repeated_chars',    label:'Disallow repeated characters', code:'disallow_repeated_chars',    hint:'Prevent \u201Caaaaaa\u201D or \u201C111111\u201D.', on:true },
  { key:'disallow_common_passwords',  label:'Block common passwords',       code:'disallow_common_passwords',  hint:'Block dictionary and leaked passwords.', on:true },
]

export const pwMfaToggles = [
  { key:'require_mfa_for_reset', label:'Require MFA for password reset', code:'require_mfa_for_reset', hint:'Secure the password reset flow.', on:true },
]

export const activity = [
  { who:'AK', text:'Created tenant "Meridian University" on the Enterprise plan.', time:'2 minutes ago' },
  { who:'RM', text:'Mapped role "Content Author" to Sara Fernandes.',            time:'1 hour ago' },
  { who:'MI', text:'Imported 214 users into Meridian University.',               time:'Yesterday, 4:12 PM' },
  { who:'AK', text:'Updated password policy \u2014 minimum length raised to 12.', time:'2 days ago' },
  { who:'SF', text:'Deactivated user account Tom Baker.',                        time:'3 days ago' },
]

// ---- pure view helpers ----

export function genBadge(label: string){
  const sem = {
    Active:'ok', Sent:'ok', Delivered:'ok', Completed:'ok', Create:'ok', Verified:'ok', Online:'ok',
    Inactive:'mut', Deactivated:'mut', Cancelled:'mut', Skipped:'mut', Low:'mut', '\u2014':'mut',
    Draft:'info', Queued:'info', Invited:'info', Provisioning:'info', Info:'info', Update:'info',
    Pending:'warn', Warning:'warn', Medium:'warn', Expired:'warn',
    Suspended:'danger', Locked:'danger', Failed:'danger', TimedOut:'danger', Error:'danger', High:'danger', Delete:'danger',
    Processing:'proc', Running:'proc',
  }[label] || 'mut'
  const c = {
    ok:{bg:'var(--green-tint)',color:'var(--success-text)'},
    mut:{bg:'var(--surface-alt)',color:'var(--muted)'},
    info:{bg:'var(--primary-tint)',color:'var(--on-tint-blue)'},
    warn:{bg:'var(--amber-tint)',color:'var(--warning-text)'},
    danger:{bg:'#FDECEC',color:'#B42318'},
    proc:{bg:'#EDE8FD',color:'#6D28D9'},
  }[sem]
  return { display:'inline-flex', alignItems:'center', gap:'6px', padding:'3px 10px', borderRadius:'999px', fontSize:'12.4px', fontWeight:600, whiteSpace:'nowrap', background:c.bg, color:c.color, border:'1px solid transparent' }
}

export function statusBadge(status: string){
  const map = {
    Active:       { bg:'var(--green-tint)', color:'var(--success-text)', icon:'M20 6L9 17l-5-5' },
    Inactive:     { bg:'var(--surface-alt)', color:'var(--muted)',       icon:'M5 12h14' },
    Deactivated:  { bg:'var(--surface-alt)', color:'var(--muted)',       icon:'M5 12h14' },
    Pending:      { bg:'var(--amber-tint)', color:'var(--warning-text)', icon:'M12 6v6l4 2 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z' },
    Provisioning: { bg:'var(--primary-tint)', color:'var(--on-tint-blue)', icon:'M12 6v6l4 2 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z' },
    Invited:      { bg:'var(--primary-tint)', color:'var(--on-tint-blue)', icon:'M4 4h16v16H4z M22 6l-10 7L2 6' },
    Draft:        { bg:'var(--surface-alt)', color:'var(--muted)',       icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6' },
    Expired:      { bg:'var(--amber-tint)', color:'var(--warning-text)', icon:'M12 6v6l4 2 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z' },
    Suspended:    { bg:'#FDECEC', color:'#B42318', icon:'M8 5v14 M16 5v14' },
    Locked:       { bg:'#FDECEC', color:'#B42318', icon:'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4' },
  }
  const c = map[status] || map.Inactive
  return {
    label: status, icon: c.icon,
    style: { display:'inline-flex', alignItems:'center', gap:'6px', padding:'3px 10px 3px 8px', borderRadius:'999px', flex:'none', whiteSpace:'nowrap',
      background:c.bg, color:c.color, fontSize:'12.4px', fontWeight:600, border:'1px solid '+(status==='Inactive'?'var(--border)':'transparent') },
  }
}

const ACTIONS = {
  view:      { icon:'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', label:'View', msg:'Opening details\u2026', kind:'info' },
  edit:      { icon:'M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z', label:'Edit', msg:'Opening editor\u2026', kind:'info' },
  toggle:    { icon:'M18.36 6.64a9 9 0 1 1-12.73 0 M12 2v10', label:'Activate or deactivate', msg:'Status updated.', kind:'success' },
  schedule:  { icon:'M8 2v4 M16 2v4 M3 9h18 M3 5h18v16H3z', label:'Set new schedule', msg:'Opening scheduler\u2026', kind:'info' },
  resend:    { icon:'M22 2L11 13 M22 2l-7 20-4-9-9-4z', label:'Resend', msg:'Notification re-queued.', kind:'success' },
  reexecute: { icon:'M23 4v6h-6 M20.49 15a9 9 0 1 1-2.12-9.36L23 10', label:'Re-execute', msg:'Re-execution queued.', kind:'success' },
  revoke:    { icon:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M15 9l-6 6 M9 9l6 6', label:'Revoke', msg:'Session/credential revoked.', kind:'danger' },
  run:       { icon:'M5 3l14 9-14 9V3z', label:'Run now', msg:'Execution started.', kind:'success' },
  delete:    { icon:'M3 6h18 M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6', label:'Delete', msg:'Record deleted.', kind:'danger' },
  mapResource: { icon:'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71', label:'Map to resource', msg:'Opening resource mapping\u2026', kind:'info' },
}

export function mkCell(c: any){
  if(c && typeof c==='object' && 'b' in c) return { isBadge:true, text:c.b, badgeStyle:genBadge(c.b), tdStyle:{padding:'13px 16px'} }
  if(c && typeof c==='object' && 'm' in c) return { isBadge:false, text:c.m, tdStyle:{padding:'13px 16px', fontSize:'12.9px', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', color:'var(--muted)', whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums'} }
  return { isBadge:false, text:String(c), tdStyle:{padding:'13px 16px', fontSize:'13.5px', color:'var(--ink)'} }
}

export const appClientDetails = {
  APP_ONEID:     { redirectUri:'https://oneid.excelsoft.edu/callback', desc:'Administrative console for SARAS One identity and access management.' },
  APP_CANDIDATE: { redirectUri:'https://candidate.excelsoft.edu/cb', desc:'Manages the complete candidate lifecycle, including registration, profiles, and assessment history.' },
  APP_CAREER: { redirectUri:'https://careers.excelsoft.edu/cb', desc:'Connects learners and certified candidates with career development and employment opportunities.' },
  APP_CERT: { redirectUri:'https://certify.excelsoft.edu/cb', desc:'Issues certifications, credentials, and digital badges based on assessment outcomes.' },
  APP_EMARKING: { redirectUri:'https://emarking.excelsoft.edu/cb', desc:'Facilitates digital evaluation and marking of candidate responses by assessors.' },
  APP_ITEMBANK: { redirectUri:'https://itembank.excelsoft.edu/cb', desc:'Enables creation, review, and management of assessment questions and question banks.' },
  APP_LXP: { redirectUri:'https://learn.excelsoft.edu/cb', desc:'Provides learners with access to courses, learning content, and training activities.' },
  APP_PROCTOR: { redirectUri:'https://proctor.excelsoft.edu/cb', desc:'Monitors candidates during online exams to maintain test integrity and detect suspicious activity.' },
  APP_TESTCON: { redirectUri:'https://testbuild.excelsoft.edu/cb', desc:'Supports assembling tests and exams from approved question banks based on assessment blueprints.' },
  APP_DELIVERY: { redirectUri:'https://delivery.excelsoft.edu/cb', desc:'Delivers online examinations and assessments securely to candidates.' },
}

export const sessionDetails = {
  'Anita Kulkarni': { id:'SES-88121', tenant:'Excelsoft Academy', method:'Password + TOTP', mfa:true, userAgent:'Chrome 128 \u00b7 macOS 14.6', lastActivity:'2 min ago', expires:'17 Aug 2026, 21:02' },
  'Rahul Menon': { id:'SES-88117', tenant:'Excelsoft Academy', method:'Google SSO', mfa:true, userAgent:'Safari 17 \u00b7 iOS 17.6', lastActivity:'18 min ago', expires:'17 Aug 2026, 20:40' },
  'Meera Iyer': { id:'SES-88102', tenant:'Meridian University', method:'Password + TOTP', mfa:true, userAgent:'Edge 127 \u00b7 Windows 11', lastActivity:'1 h ago', expires:'17 Aug 2026, 19:15' },
  'Sara Fernandes': { id:'SES-87960', tenant:'Bright Future Schools', method:'Password', mfa:false, userAgent:'Chrome 128 \u00b7 Android 14', lastActivity:'16 Aug, 23:45', expires:'Closed by user' },
  'David Osei': { id:'SES-87891', tenant:'Horizon EdTech', method:'Microsoft SSO', mfa:true, userAgent:'Firefox 129 \u00b7 Ubuntu 24.04', lastActivity:'16 Aug, 19:20', expires:'Expired 17 Aug 2026, 06:55' },
}

// Build a rendered list model for a generic screen. `toast` powers row actions.
export function buildList(screen: string, listSearch: string, toast: (msg: string, kind?: string) => void, handlers?: any){
  const def = listMeta[screen]
  if(!def) return null
  const q = (listSearch || '').trim().toLowerCase()
  const thBase = { fontSize:'12px', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', color:'#0a4a8c', padding:'14px 16px', borderBottom:'1px solid var(--border-blue)', whiteSpace:'nowrap' }
  const columns = def.cols.map(l => ({ label:l, align:'left', sortable:true, thStyle:{ ...thBase, textAlign:'left' } }))
  const hasActions = !!(def.actions && def.actions.length)
  if(hasActions) columns.push({ label:'Actions', align:'right', sortable:false, thStyle:{ ...thBase, textAlign:'right' } })
  let pairs = def.rows.map((r, i) => ({ r, tag: def.rowTags ? def.rowTags[i] : null }))
  if(q) pairs = pairs.filter(p => p.r.some(c => String((c && c.b) || (c && c.m) || c || '').toLowerCase().includes(q)))
  const mapped = pairs.map((p, i) => ({
    key: i,
    tag: p.tag,
    cells: p.r.map(mkCell),
    actions: (def.actions || []).map(a => { const A = ACTIONS[a]; const h = handlers && handlers[a]; return { icon:A.icon, ariaLabel:A.label, onClick: h ? () => h(p.r) : () => toast(A.msg, A.kind) } }),
  }))
  return {
    title:def.title, subtitle:def.sub, exportable:!!def.exportable,
    exportAction:() => toast('Exporting ' + def.title + ' to Excel\u2026', 'success'),
    columns, rows:mapped, hasActions, count:mapped.length, filters: def.filters || null,
    newAction: handlers && handlers.add ? { label: def.newLabel || 'New', onClick: handlers.add } : null,
    hasRows:mapped.length > 0, empty:mapped.length === 0, minWidth:(def.minW || 760) + 'px',
  }
}

/* ---------- Synchronization ---------- */
export const syncEntities = [
  { code:'TENANT', name:'Tenant', cols:[['tenant_id','uuid',1],['code','string'],['name','string'],['domain','string'],['plan','enum'],['country','string'],['status','enum'],['created_at','datetime'],['updated_at','datetime']] },
  { code:'ACCOUNT', name:'Account', cols:[['account_id','uuid',1],['login','string'],['first_name','string'],['last_name','string'],['email','string'],['phone','string'],['tenant_code','string'],['org_unit','string'],['status','enum'],['mfa_enabled','boolean'],['last_login_at','datetime'],['updated_at','datetime']] },
  { code:'ROLE', name:'Role', cols:[['role_id','uuid',1],['code','string'],['name','string'],['scope','enum'],['description','string'],['status','enum'],['updated_at','datetime']] },
  { code:'ACCOUNT_ROLE', name:'Account role', cols:[['mapping_id','uuid',1],['account_id','uuid'],['role_code','string'],['org_unit','string'],['access_level','enum'],['is_default','boolean'],['updated_at','datetime']] },
  { code:'ORG_UNIT', name:'Organization unit', cols:[['unit_id','uuid',1],['code','string'],['name','string'],['type','enum'],['parent_code','string'],['wbs','string'],['status','enum'],['updated_at','datetime']] },
  { code:'PRIVILEGE', name:'Privilege', cols:[['privilege_id','uuid',1],['code','string'],['name','string'],['application','string'],['wbs','string'],['active','boolean']] },
  { code:'LOOKUP', name:'Lookup', cols:[['lookup_id','uuid',1],['category','string'],['code','string'],['value','string'],['sort_order','number'],['active','boolean']] },
].map(e => ({ ...e, cols: e.cols.map(([name, type, key]) => ({ name, type, key: !!key })) }))

const syAll = (code) => syncEntities.find(e => e.code === code).cols.map(c => c.name)
const syFirst = (code, n) => syAll(code).slice(0, n)

export const syncApps = [
  { code:'ASMT',  name:'SARAS Assessment',    desc:'Test authoring, delivery and results', subscribed:true,  subs:{ TENANT:syAll('TENANT'), ACCOUNT:syAll('ACCOUNT'), ROLE:syAll('ROLE'), ACCOUNT_ROLE:syAll('ACCOUNT_ROLE'), ORG_UNIT:syAll('ORG_UNIT') } },
  { code:'LMS',   name:'SARAS LMS',           desc:'Courses, enrolments and progress',     subscribed:true,  subs:{ TENANT:syFirst('TENANT', 5), ACCOUNT:syFirst('ACCOUNT', 9), ORG_UNIT:syAll('ORG_UNIT'), ACCOUNT_ROLE:syAll('ACCOUNT_ROLE') } },
  { code:'QBANK', name:'Question Bank',       desc:'Item banking and review workflows',    subscribed:true,  subs:{ ACCOUNT:syFirst('ACCOUNT', 6), ROLE:syAll('ROLE') } },
  { code:'RPT',   name:'Reports & Analytics', desc:'Dashboards and scheduled reports',     subscribed:true,  subs:Object.fromEntries(syncEntities.map(e => [e.code, syAll(e.code)])) },
  { code:'PROC',  name:'Remote Proctoring',   desc:'Live and AI-assisted invigilation',    subscribed:true,  subs:{ TENANT:syFirst('TENANT', 4), ACCOUNT:syFirst('ACCOUNT', 7) } },
  { code:'CMS',   name:'Content Studio',      desc:'Learning content authoring',           subscribed:false, subs:{} },
  { code:'MOB',   name:'SARAS Mobile',        desc:'Learner mobile app',                   subscribed:false, subs:{} },
  { code:'HRMS',  name:'HRMS Connector',      desc:'Staff records from the HR system',     subscribed:false, subs:{ ACCOUNT:syFirst('ACCOUNT', 8), ORG_UNIT:syFirst('ORG_UNIT', 5) } },
]

export const syncOps = ['Create', 'Update', 'Delete']
export const syncEventStatuses = ['New', 'Expanded', 'In Process', 'Applied']
const syPad = (n) => String(n).padStart(2, '0')
const SY_MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
export function syncFmt(ts) { if (!ts) return '—'; const d = new Date(ts); return syPad(d.getDate()) + ' ' + SY_MON[d.getMonth()] + ' ' + d.getFullYear() + ', ' + syPad(d.getHours()) + ':' + syPad(d.getMinutes()) + ':' + syPad(d.getSeconds()) }
export function syncAgo(ts) { if (!ts) return '—'; const m = Math.round((Date.now() - ts) / 60000); if (m < 1) return 'just now'; if (m < 60) return m + ' min ago'; const h = Math.round(m / 60); if (h < 24) return h + ' h ago'; return Math.round(h / 24) + ' d ago' }

const SY_CODES = {
  ACCOUNT: ['priya.sharma','arjun.rao','meera.iyer','rahul.menon','sara.fernandes','kiran.das','neha.joshi','vikram.shetty','ananya.kulkarni','rohan.pillai'],
  ACCOUNT_ROLE: ['priya.sharma:CONTENT_AUTHOR','arjun.rao:REVIEWER','meera.iyer:TENANT_ADMIN','kiran.das:PROCTOR','neha.joshi:CANDIDATE'],
  TENANT: ['EXA-01','BFS-02','GLA-03','NIS-04'],
  ROLE: ['CONTENT_AUTHOR','REVIEWER','PROCTOR','TENANT_ADMIN'],
  ORG_UNIT: ['EXA-SCI','EXA-ENG-02','EXA-MATH','BFS-PRI-01'],
  PRIVILEGE: ['asmt.publish','tnt.view','rpt.export'],
  LOOKUP: ['GENDER.F','COUNTRY.IN','GRADE.10'],
}
const SY_MIX = ['ACCOUNT','ACCOUNT','ACCOUNT_ROLE','ACCOUNT','ORG_UNIT','ROLE','ACCOUNT','TENANT','ACCOUNT_ROLE','LOOKUP','ACCOUNT','PRIVILEGE']
const SY_CHANGE = { ACCOUNT:['status','Active','Suspended'], ACCOUNT_ROLE:['access_level','Local','Deep'], TENANT:['plan','Standard','Enterprise'], ROLE:['description','Reviews items','Reviews and approves items'], ORG_UNIT:['parent_code','EXA-ROOT','EXA-SCI'], PRIVILEGE:['active',true,false], LOOKUP:['sort_order',3,1] }
const syHex = (seed, n) => { let s = ''; for (let i = 0; i < n; i++) s += '0123456789abcdef'[Math.floor(Math.abs(Math.sin(seed * 12.9898 + i * 78.233) * 43758.5453)) % 16]; return s }
const syUuid = (s) => syHex(s, 8) + '-' + syHex(s + 1, 4) + '-4' + syHex(s + 2, 3) + '-a' + syHex(s + 3, 3) + '-' + syHex(s + 4, 12)
const syCap = (s) => s.split(' ').map(w => w ? w[0].toUpperCase() + w.slice(1) : w).join(' ')
function sySample(col, code, i, ts) {
  const t = col.type, n = col.name, base = code.split(':')[0]
  if (t === 'uuid') return syUuid(i * 7 + n.split('').reduce((h, ch) => h * 31 + ch.charCodeAt(0), 0) % 9973)
  if (t === 'boolean') return i % 3 !== 0
  if (t === 'datetime') return new Date(ts).toISOString()
  if (t === 'number') return (i % 9) + 1
  if (t === 'enum') return n === 'status' ? 'Active' : n === 'scope' ? 'Tenant' : n === 'access_level' ? 'Local' : n === 'type' ? 'Department' : n === 'plan' ? 'Enterprise' : 'Default'
  if (n === 'email') return base + '@academy.excelsoft.edu'
  if (n === 'login' || n === 'code') return base
  if (n === 'first_name') return syCap(base.split('.')[0])
  if (n === 'last_name') return syCap(base.split('.')[1] || 'user')
  if (n === 'name') return syCap(base.replace(/[._-]/g, ' ').toLowerCase())
  if (n === 'tenant_code') return 'EXA-01'
  if (n === 'role_code') return code.split(':')[1] || 'CANDIDATE'
  if (n === 'phone') return '+91 98450 ' + String(10000 + i * 37).slice(-5)
  if (n === 'domain') return 'academy.excelsoft.edu'
  if (n === 'org_unit' || n === 'parent_code') return 'EXA-SCI'
  if (n === 'country') return 'India'
  return base
}

const SY_NOW = Date.now()
export const syncOutbox = Array.from({ length: 68 }, (_, i) => {
  const entity = SY_MIX[i % SY_MIX.length]
  const ent = syncEntities.find(e => e.code === entity)
  const codes = SY_CODES[entity]
  const code = codes[(i * 3 + 1) % codes.length]
  const operation = i % 7 === 3 ? 'Delete' : i % 3 === 0 ? 'Create' : 'Update'
  const ageMin = i < 6 ? i * 2 + 1 : Math.round(12 + Math.pow(i - 5, 1.7) * 8)
  const ts = SY_NOW - ageMin * 60000 - ((i * 13) % 60) * 1000
  const stuck = i === 14 || i === 27
  const status = i < 2 ? 'New' : i < 4 ? 'Expanded' : (i < 8 || stuck) ? 'In Process' : 'Applied'
  const apps = syncApps.filter(a => a.subscribed && a.subs[entity]).map(a => a.name)
  const deliveries = status === 'New' ? [] : apps.map((app, k) => {
    if (status === 'Expanded') return { app, status:'Pending', at:null }
    if (status === 'Applied') return { app, status:'Applied', at: ts + (8 + k * 5 + (i % 7)) * 1000 }
    if (stuck && k === apps.length - 1) return { app, status:'Failed', at: ts + 40000, error:'HTTP 503 from subscriber endpoint — retry 3 of 5 scheduled' }
    if (k === 0 || (k === 1 && !stuck && apps.length > 2)) return { app, status:'Applied', at: ts + (6 + k * 4) * 1000 }
    return { app, status:'Pending', at:null }
  })
  const completedAt = status === 'Applied' ? Math.max(ts + 3000, ...deliveries.map(d => d.at)) : null
  const id = 'EVT-' + (482190 - i)
  const data = operation === 'Delete' ? { [ent.cols[0].name]: sySample(ent.cols[0], code, i, ts), deleted: true } : Object.fromEntries(ent.cols.map(c => [c.name, sySample(c, code, i, ts)]))
  const ch = SY_CHANGE[entity]
  const payload = { eventId:id, entity, operation:operation.toUpperCase(), recordCode:code, tenant:'EXA-01', occurredAt:new Date(ts).toISOString(), actor: i % 4 === 0 ? 'system:hrms-import' : 'anita.k@excelsoftcorp.com', version: 3 + (i % 5), data, ...(operation === 'Update' ? { changes:[{ field:ch[0], old:ch[1], new:ch[2] }] } : {}) }
  return { id, entity, entityName:ent.name, code, operation, ts, status, completedAt, subs: status === 'New' ? null : deliveries.length, applied: deliveries.filter(d => d.status === 'Applied').length, failed: deliveries.filter(d => d.status === 'Failed').length, deliveries, payload }
})
