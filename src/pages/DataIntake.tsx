import React, { useState } from 'react'
import { PageHead, S, Icon, SearchBar, Th, Empty, SegTabs, Dropdown } from '../ui'

const diMono = 'ui-monospace, SFMono-Regular, Menlo, monospace'
const DI_KIND_LABEL = { excel:'Excel workbook', entra:'Microsoft Entra ID', google:'Google Workspace' }
const DI_KIND_ICON = {
  excel:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h8',
  entra:'M3 21h18 M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16 M9 7h4 M9 11h4 M9 15h4',
  google:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M21.17 8H12 M3.95 6.06L8.54 14 M10.88 21.94L15.46 14',
}

const DI_CONNECTORS = [
  { id:'excel-hr-roster', name:'HR Roster Workbook', kind:'excel', feature:'Accounts', status:'Active', owner:'hr-ops@excelsoftcorp.com', schedule:'On demand', avgRecords:148, successRate:0.92, lastRunAt:'2026-08-25T09:12:00Z',
    description:'Monthly headcount workbook published by HR Operations. Sheet "Roster" is read from row 2 onward.',
    config:[{ label:'Source file', value:'roster-aug-2026.xlsx' }, { label:'Worksheet', value:'Roster' }, { label:'Header row', value:'1' }, { label:'Delimiter for multi-value', value:';' }],
    fieldMap:[{ source:'Employee ID', target:'externalId', required:true }, { source:'Full Name', target:'displayName', required:true }, { source:'Work Email', target:'email', required:true }, { source:'Dept', target:'department', required:false }, { source:'Reports To', target:'managerEmail', required:false }] },
  { id:'entra-directory', name:'Entra Directory Sync', kind:'entra', feature:'Accounts', status:'Active', owner:'identity@excelsoftcorp.com', schedule:'On demand', avgRecords:612, successRate:0.97, lastRunAt:'2026-08-24T17:40:00Z',
    description:'Reads enabled member accounts from the corporate Entra tenant, excluding guests and service principals.',
    config:[{ label:'Tenant', value:'excelsoft.onmicrosoft.com' }, { label:'Filter', value:"accountEnabled eq true and userType eq 'Member'" }, { label:'Page size', value:'200' }, { label:'Scopes', value:'User.Read.All, Directory.Read.All' }],
    fieldMap:[{ source:'employeeId', target:'externalId', required:true }, { source:'displayName', target:'displayName', required:true }, { source:'userPrincipalName', target:'email', required:true }, { source:'department', target:'department', required:false }, { source:'manager.mail', target:'managerEmail', required:false }] },
  { id:'google-workspace', name:'Google Workspace Accounts', kind:'google', feature:'Accounts', status:'Active', owner:'identity@excelsoftcorp.com', schedule:'On demand', avgRecords:204, successRate:0.88, lastRunAt:'2026-08-22T08:05:00Z',
    description:'Pulls active users from the primary Google Workspace domain including org unit placement.',
    config:[{ label:'Customer', value:'my_customer' }, { label:'Domain', value:'excelsoft.edu' }, { label:'Org unit', value:'/Employees' }, { label:'Scopes', value:'admin.directory.user.readonly' }],
    fieldMap:[{ source:'externalIds[0].value', target:'externalId', required:true }, { source:'name.fullName', target:'displayName', required:true }, { source:'primaryEmail', target:'email', required:true }, { source:'organizations[0].department', target:'department', required:false }, { source:'relations[manager]', target:'managerEmail', required:false }] },
  { id:'excel-contractors', name:'Contractor Intake Sheet', kind:'excel', feature:'Accounts', status:'Draft', owner:'procurement@excelsoftcorp.com', schedule:'On demand', avgRecords:36, successRate:0, lastRunAt:null,
    description:'Vendor-supplied contractor list. Field mapping is still being confirmed.',
    config:[{ label:'Source file', value:'contractors-q3.xlsx' }, { label:'Worksheet', value:'Sheet1' }, { label:'Header row', value:'3' }],
    fieldMap:[{ source:'Vendor Ref', target:'externalId', required:true }, { source:'Name', target:'displayName', required:true }, { source:'Email', target:'email', required:true }] },
  { id:'entra-b2b-guests', name:'Entra Guest Accounts', kind:'entra', feature:'Accounts', status:'Error', owner:'identity@excelsoftcorp.com', schedule:'On demand', avgRecords:74, successRate:0.61, lastRunAt:'2026-08-19T11:02:00Z',
    description:'Guest/B2B collaboration accounts. Last run failed: the directory read scope was revoked.',
    config:[{ label:'Tenant', value:'excelsoft.onmicrosoft.com' }, { label:'Filter', value:"userType eq 'Guest'" }, { label:'Page size', value:'100' }],
    fieldMap:[{ source:'id', target:'externalId', required:true }, { source:'displayName', target:'displayName', required:true }, { source:'mail', target:'email', required:true }] },
]

const DI_TARGET_TYPE = { externalId:'string', displayName:'string', email:'email', department:'string', designation:'string', orgUnit:'string', phone:'phone', location:'string', employmentType:'enum', startDate:'date', endDate:'date', managerEmail:'email', active:'boolean' }

const DI_RULES_SEED = [
  { id:'R-01', name:'External ID present', kind:'schema', target:'externalId', expression:'required && matches(/^[A-Z0-9-]{4,}$/)', severity:'Error', enabled:true, appliesTo:['excel','entra','google'] },
  { id:'R-02', name:'Email is a valid address', kind:'schema', target:'email', expression:'required && isEmail()', severity:'Error', enabled:true, appliesTo:['excel','entra','google'] },
  { id:'R-03', name:'Display name length', kind:'schema', target:'displayName', expression:'length between 2 and 120', severity:'Error', enabled:true, appliesTo:['excel','entra','google'] },
  { id:'R-04', name:'Email domain allow-list', kind:'business', target:'email', expression:"domain in ['excelsoftcorp.com', 'excelsoft.edu']", severity:'Error', enabled:true, appliesTo:['excel','entra','google'] },
  { id:'R-05', name:'Department must exist', kind:'business', target:'department', expression:'lookup(departments, department) != null', severity:'Error', enabled:true, appliesTo:['excel','entra'] },
  { id:'R-06', name:'Manager must resolve to an account', kind:'business', target:'managerEmail', expression:'lookup(accounts, managerEmail) != null', severity:'Warning', enabled:true, appliesTo:['excel','entra','google'] },
  { id:'R-07', name:'No duplicate external IDs in batch', kind:'business', target:'externalId', expression:'unique within batch', severity:'Error', enabled:true, appliesTo:['excel','entra','google'] },
  { id:'R-08', name:'Manager cannot be self', kind:'business', target:'managerEmail', expression:'managerEmail != email', severity:'Warning', enabled:false, appliesTo:['entra','google'] },
]

const DI_FIRST = ['Anita','Devon','Priya','Marcus','Lena','Tomas','Ruth','Samir','Yuki','Hana','Ivan','Claire','Owen','Nadia','Felix','Rosa']
const DI_LAST = ['Kapoor','Reyes','Mensah','Lindqvist','Okafor','Duarte','Novak','Haddad','Tanaka','Brennan','Petrov','Moreau','Walsh','Silva']
const DI_DEPTS = ['Engineering','Finance','People Ops','Sales','Legal','Logistics']

function diSeeded(seed) { let s = seed; return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648 } }

function diGenerateRecords(connector, count, seed) {
  const rand = diSeeded(seed + connector.id.length * 977)
  const active = DI_RULES_SEED.filter(r => r.enabled && r.appliesTo.includes(connector.kind))
  const seenIds = new Set()
  const records = []
  const pick = (arr) => arr[Math.floor(rand() * arr.length)] || arr[0]
  for (let i = 0; i < count; i++) {
    const first = pick(DI_FIRST), last = pick(DI_LAST), roll = rand()
    let externalId = 'EMP-' + (1000 + i * 7)
    let email = first.toLowerCase() + '.' + last.toLowerCase() + '@excelsoftcorp.com'
    let department = pick(DI_DEPTS)
    let managerEmail = 'lead.' + pick(DI_DEPTS).split(' ')[0].toLowerCase() + '@excelsoftcorp.com'
    let displayName = first + ' ' + last
    if (roll > 0.93) email = first.toLowerCase() + '.' + last.toLowerCase() + '@contractor.io'
    else if (roll > 0.88) email = first.toLowerCase() + '[at]excelsoftcorp.com'
    else if (roll > 0.84) externalId = ''
    else if (roll > 0.8) department = 'Growth Hacking'
    else if (roll > 0.74) managerEmail = 'unknown.manager@excelsoftcorp.com'
    else if (roll > 0.71) displayName = first.slice(0, 1)
    else if (roll > 0.69 && records.length) externalId = records[0].externalId
    const issues = []
    const push = (ruleId, message) => { const rule = active.find(r => r.id === ruleId); if (rule) issues.push({ ruleId, ruleName:rule.name, severity:rule.severity, message }) }
    if (!externalId) push('R-01', 'Required field externalId is empty in the source row.')
    else if (seenIds.has(externalId)) push('R-07', 'Duplicate external ID ' + externalId + ' already present in this batch.')
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) push('R-02', email + ' is not a valid email address.')
    else if (!/@(excelsoftcorp\.com|excelsoft\.edu)$/i.test(email)) push('R-04', 'Domain ' + email.split('@')[1] + ' is not on the allow-list.')
    if (displayName.trim().length < 2) push('R-03', 'Display name must be between 2 and 120 characters.')
    if (!DI_DEPTS.includes(department)) push('R-05', 'Department "' + department + '" was not found in the reference list.')
    if (managerEmail.indexOf('unknown.') === 0) push('R-06', 'Manager ' + managerEmail + ' could not be resolved to an existing account.')
    if (externalId) seenIds.add(externalId)
    const hasError = issues.some(x => x.severity === 'Error')
    const status = hasError ? 'Failed' : issues.length ? 'Warning' : 'Success'
    records.push({ rowNumber:i + 2, externalId:externalId || '\u2014', displayName, email, department, managerEmail, status, issues })
  }
  return records
}

function diSummarize(records) {
  const failed = records.filter(r => r.status === 'Failed').length
  const warnings = records.filter(r => r.status === 'Warning').length
  return { total:records.length, failed, warnings, succeeded:records.length - failed }
}

function diBuildRun(id, connectorId, startedAt, count, seed, triggeredBy, status) {
  const connector = DI_CONNECTORS.find(c => c.id === connectorId)
  const records = diGenerateRecords(connector, count, seed)
  const s = diSummarize(records)
  return { id, connectorId, startedAt, durationMs:4200 + count * 31, triggeredBy, status: status || (s.failed > 0 ? 'Partial' : 'Completed'), records, total:s.total, succeeded:s.succeeded, failed:s.failed, warnings:s.warnings }
}

const DI_SEED_RUNS = [
  diBuildRun('RUN-2041', 'entra-directory', '2026-08-24T17:40:00Z', 64, 11, 'priya.kapoor@excelsoftcorp.com'),
  diBuildRun('RUN-2038', 'excel-hr-roster', '2026-08-25T09:12:00Z', 48, 5, 'hr-ops@excelsoftcorp.com'),
  diBuildRun('RUN-2035', 'google-workspace', '2026-08-22T08:05:00Z', 40, 23, 'identity@excelsoftcorp.com'),
  diBuildRun('RUN-2030', 'excel-hr-roster', '2026-07-28T09:03:00Z', 32, 77, 'hr-ops@excelsoftcorp.com'),
  diBuildRun('RUN-2019', 'entra-b2b-guests', '2026-08-19T11:02:00Z', 12, 91, 'identity@excelsoftcorp.com', 'Failed'),
]

function diConnectorById(id) { return DI_CONNECTORS.find(c => c.id === id) }
function diFmtDate(iso) { return iso ? new Date(iso).toLocaleString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : 'Never' }
function diDur(ms) { return (ms / 1000).toFixed(1) + 's' }

const DI_PILL_META = {
  Active:    { bg:'var(--green-tint)', color:'var(--success-text)', dot:'var(--success)' },
  Completed: { bg:'var(--green-tint)', color:'var(--success-text)', dot:'var(--success)' },
  Success:   { bg:'var(--green-tint)', color:'var(--success-text)', dot:'var(--success)' },
  Draft:     { bg:'var(--surface-alt)', color:'var(--muted)', dot:'#9AA6B4' },
  Running:   { bg:'var(--primary-tint)', color:'var(--on-tint-blue)', dot:'var(--primary)' },
  Partial:   { bg:'var(--amber-tint)', color:'var(--warning-text)', dot:'var(--warning)' },
  Warning:   { bg:'var(--amber-tint)', color:'var(--warning-text)', dot:'var(--warning)' },
  Error:     { bg:'#FDECEC', color:'#B42318', dot:'#DC2626' },
  Failed:    { bg:'#FDECEC', color:'#B42318', dot:'#DC2626' },
}
function DIPill({ status }) {
  const c = DI_PILL_META[status] || DI_PILL_META.Draft
  return <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'3px 10px', borderRadius:999, background:c.bg, color:c.color, fontSize:12.2, fontWeight:600, whiteSpace:'nowrap' }}><span aria-hidden style={{ width:7, height:7, borderRadius:'50%', flex:'none', background:c.dot }} />{status}</span>
}
function DITag({ label }) {
  return <span style={{ display:'inline-flex', alignItems:'center', padding:'3px 9px', borderRadius:6, background:'var(--primary-tint-2)', border:'1px solid var(--border)', color:'var(--muted)', fontSize:11.8, fontWeight:600, whiteSpace:'nowrap' }}>{label}</span>
}
const diCaps = { fontSize:11.2, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }
const diChip = (active) => ({ display:'inline-flex', alignItems:'center', gap:7, height:32, padding:'0 12px', borderRadius:999, background: active ? 'var(--primary)' : 'var(--surface)', color: active ? '#fff' : 'var(--ink)', border:'1px solid ' + (active ? 'var(--primary)' : 'var(--border)'), fontSize:12.8, fontWeight:600, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap' })
const diBtnPri = { ...S.primary, fontFamily:'inherit' }
const diBtnSec = { ...S.ghost, fontFamily:'inherit' }

function DISpark({ values }) {
  const w = 76, h = 24, n = values.length
  const max = Math.max.apply(null, values), min = Math.min.apply(null, values)
  const span = (max - min) || 1
  const pts = values.map((v, i) => ((n > 1 ? i * (w - 8) / (n - 1) : 0) + 4) + ',' + (h - 4 - ((v - min) / span) * (h - 9)))
  const last = pts[pts.length - 1].split(',')
  return (
    <svg width={w} height={h} viewBox={'0 0 ' + w + ' ' + h} aria-hidden="true" style={{ flex:'none', display:'block' }}>
      <polyline points={pts.join(' ')} fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <circle cx={last[0]} cy={last[1]} r="2.6" fill="var(--primary)" />
    </svg>
  )
}

function DIStatCards({ stats }) {
  const tones = { blue:'var(--primary)', green:'var(--success)', amber:'var(--warning)', red:'#DC2626' }
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(210px, 1fr))', gap:14, marginBottom:16 }}>
      {stats.map(s => {
        const tone = tones[s.tone] || tones.blue
        return (
          <div key={s.label} style={{ ...S.card, padding:'17px 18px 15px', marginBottom:0, display:'flex', flexDirection:'column', gap:12, border:'1px solid var(--border-blue)', boxShadow:'0 1px 2px rgba(16,42,84,.05), 0 5px 16px -8px rgba(16,42,84,.12)' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
              <span style={diCaps}>{s.label}</span>
              <Icon d={s.icon} size={17} style={{ color:'var(--muted)', opacity:.5, flex:'none' }} />
            </div>
            <div style={{ fontSize:30, fontWeight:600, color:'var(--ink)', lineHeight:1, fontVariantNumeric:'tabular-nums', letterSpacing:'-.02em' }}>{s.value}</div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:'auto', minHeight:24 }}>
              {s.pct != null ? (
                <div style={{ flex:1, height:5, borderRadius:999, background:'#E9EEF5', overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:999, width:Math.min(100, Math.max(2, s.pct)) + '%', background:tone }} />
                </div>
              ) : s.spark ? <DISpark values={s.spark} /> : null}
              {s.sub && <span style={{ fontSize:11.8, color:'var(--muted)', whiteSpace:'nowrap' }}>{s.sub}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DIRecordTable({ records }) {
  const [filter, setFilter] = useState('All')
  const opts = ['All', 'Failed', 'Warning', 'Success']
  const count = (f) => f === 'All' ? records.length : records.filter(r => r.status === f).length
  const shown = records.filter(r => filter === 'All' || r.status === filter)
  return (
    <div>
      <div style={{ marginBottom:10, maxWidth:'100%', overflowX:'auto' }}>
        <SegTabs tabs={opts.map(f => ({ k:f, t:(f === 'All' ? 'All records' : f) + ' (' + count(f) + ')' }))} value={filter} onChange={setFilter} ariaLabel="Filter records by status" />
      </div>
      <div style={{ ...S.card, marginBottom:0, overflow:'hidden' }}>
        <div className="tscroll" style={{ overflowX:'auto', maxHeight:'calc(100vh - 220px)', minHeight:420, overflowY:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', minWidth:960 }}>
            <thead><tr>{['Row', 'External ID', 'Name', 'Email', 'Department', 'Status', 'Reason'].map(h => <Th key={h} label={h} align="left" sortable={false} />)}</tr></thead>
            <tbody>
              {shown.map(r => (
                <tr key={r.rowNumber + '-' + r.email} style={{ borderBottom:'1px solid var(--border)', verticalAlign:'top' }}>
                  <td style={{ padding:'11px 16px', fontSize:12.2, color:'var(--muted)', fontFamily:diMono }}>{r.rowNumber}</td>
                  <td style={{ padding:'11px 16px', fontSize:12.4, fontFamily:diMono, whiteSpace:'nowrap' }}>{r.externalId}</td>
                  <td style={{ padding:'11px 16px', fontSize:13.2, color:'var(--ink)', whiteSpace:'nowrap' }}>{r.displayName}</td>
                  <td style={{ padding:'11px 16px', fontSize:12.4, fontFamily:diMono }}>{r.email}</td>
                  <td style={{ padding:'11px 16px', fontSize:13.2, color:'var(--ink)', whiteSpace:'nowrap' }}>{r.department}</td>
                  <td style={{ padding:'11px 16px' }}><DIPill status={r.status} /></td>
                  <td style={{ padding:'11px 16px', fontSize:12.4, color:'var(--muted)', minWidth:260 }}>
                    {r.issues.length === 0 ? '\u2014' : (
                      <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                        {r.issues.map(i => <span key={i.ruleId}><span style={{ fontFamily:diMono, color:'var(--ink)', fontWeight:600 }}>{i.ruleId}</span> {i.message}</span>)}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function DIConnectorDetail({ connector, runs, rules, onBack, onRunConnector, onOpenRun }) {
  const [tab, setTab] = useState('config')
  const myRuns = runs.filter(r => r.connectorId === connector.id)
  const myRules = rules.filter(r => r.appliesTo.includes(connector.kind))
  const tabs = [{ k:'config', t:'Configuration' }, { k:'mapping', t:'Field mapping' }, { k:'rules', t:'Validation' }, { k:'history', t:'Recent runs' }]
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, flexWrap:'wrap', marginBottom:14 }}>
        <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
          <button type="button" data-ix="ghost" aria-label="Back to catalog" title="Back to catalog" onClick={onBack} style={{ ...diBtnSec, width:46, padding:0, justifyContent:'center', flex:'none' }}><Icon d="M19 12H5 M12 19l-7-7 7-7" size={16} /></button>
          <div>
            <h1 style={{ fontSize:20, fontWeight:600, margin:0, color:'var(--ink)' }}>{connector.name}</h1>
            <p style={{ margin:'4px 0 0', fontSize:13.2, color:'var(--muted)', maxWidth:640 }}>{connector.description}</p>
          </div>
        </div>
        <button type="button" data-ix="primary" onClick={() => onRunConnector(connector.id)} style={diBtnPri}><Icon d="M5 3l14 9-14 9V3z" size={14} />Run this connector</button>
      </div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center', marginBottom:16 }}>
        <DIPill status={connector.status} />
        <DITag label={DI_KIND_LABEL[connector.kind]} />
        <DITag label={'Feature: ' + connector.feature} />
        <DITag label={'Owner: ' + connector.owner} />
        <DITag label={'Schedule: ' + connector.schedule} />
      </div>
      <div style={{ marginBottom:14, maxWidth:'100%', overflowX:'auto' }}>
        <SegTabs tabs={tabs} value={tab} onChange={setTab} ariaLabel="Connector detail sections" />
      </div>
      {tab === 'config' && (
        <section style={{ ...S.card, marginBottom:0 }}>
          {connector.config.map((c, i) => (
            <div key={c.label} style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:8, padding:'13px 18px', borderTop: i ? '1px solid var(--border)' : 'none' }}>
              <div style={{ ...diCaps, alignSelf:'center' }}>{c.label}</div>
              <div style={{ fontSize:13, fontFamily:diMono, color:'var(--ink)', wordBreak:'break-all' }}>{c.value}</div>
            </div>
          ))}
        </section>
      )}
      {tab === 'mapping' && (
        <section style={{ ...S.card, marginBottom:0, overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <colgroup><col style={{ width:'32%' }} /><col style={{ width:'30%' }} /><col style={{ width:'20%' }} /><col style={{ width:'18%' }} /></colgroup>
            <thead><tr><Th label="Source field" align="left" sortable={false} /><Th label="Target attribute" align="left" sortable={false} /><Th label="Data type" align="left" sortable={false} /><Th label="Required" align="left" sortable={false} /></tr></thead>
            <tbody>
              {connector.fieldMap.map(f => (
                <tr key={f.source} style={{ borderBottom:'1px solid var(--border)' }}>
                  <td style={{ padding:'12px 16px', fontSize:12.6, fontFamily:diMono }}>{f.source}</td>
                  <td style={{ padding:'12px 16px', fontSize:12.6, fontFamily:diMono, color:'var(--primary)', fontWeight:600 }}>{f.target}</td>
                  <td style={{ padding:'12px 16px' }}><span style={{ fontSize:11.8, fontWeight:600, fontFamily:diMono, color:'var(--muted)', background:'var(--surface-alt)', border:'1px solid var(--border)', borderRadius:6, padding:'2px 8px' }}>{f.type || DI_TARGET_TYPE[f.target] || 'string'}</span></td>
                  <td style={{ padding:'12px 16px', fontSize:13.2, color: f.required ? 'var(--ink)' : 'var(--muted)' }}>{f.required ? 'Yes' : 'Optional'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
      {tab === 'rules' && (
        <section style={{ ...S.card, marginBottom:0 }}>
          {myRules.map((r, i) => (
            <div key={r.id} style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:10, padding:'12px 18px', borderTop: i ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize:12, fontFamily:diMono, color:'var(--muted)' }}>{r.id}</span>
              <span style={{ fontSize:13.4, fontWeight:600, color:'var(--ink)' }}>{r.name}</span>
              <DITag label={r.kind === 'schema' ? 'Schema' : 'Business rule'} />
              <DIPill status={r.severity} />
              {!r.enabled && <DITag label="Disabled" />}
              <code style={{ marginLeft:'auto', fontSize:12, fontFamily:diMono, color:'var(--muted)' }}>{r.expression}</code>
            </div>
          ))}
        </section>
      )}
      {tab === 'history' && (
        <section style={{ ...S.card, marginBottom:0 }}>
          {myRuns.length === 0 && <div style={{ padding:'22px 18px', fontSize:13.2, color:'var(--muted)' }}>This connector has not been run yet.</div>}
          {myRuns.map((r, i) => (
            <button key={r.id} type="button" data-ix="row" onClick={() => onOpenRun(r.id)} style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:14, width:'100%', padding:'13px 18px', border:'none', borderTop: i ? '1px solid var(--border)' : 'none', background:'transparent', cursor:'pointer', fontFamily:'inherit', textAlign:'left' }}>
              <span style={{ fontSize:13, fontFamily:diMono, fontWeight:600, color:'var(--primary)' }}>{r.id}</span>
              <span style={{ fontSize:12.8, color:'var(--muted)' }}>{diFmtDate(r.startedAt)}</span>
              <DIPill status={r.status} />
              <span style={{ marginLeft:'auto', fontSize:12.4, fontFamily:diMono, color:'var(--muted)' }}>{r.succeeded + '/' + r.total + ' imported \u00b7 ' + r.failed + ' failed'}</span>
            </button>
          ))}
        </section>
      )}
    </div>
  )
}

function DIWizard({ runs, addRun, preselect, clearPreselect, toast, onOpenRun }) {
  const [step, setStep] = useState(preselect ? 1 : 0)
  const [selected, setSelected] = useState(preselect || null)
  const [fetching, setFetching] = useState(false)
  const [upFile, setUpFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [records, setRecords] = useState(null)
  const [committed, setCommitted] = useState(null)
  const connector = selected ? diConnectorById(selected) : null
  const summary = records ? diSummarize(records) : null
  const steps = ['Choose connector', 'Fetch data', 'Review validation', 'Commit']
  const runFetch = () => {
    if (!connector) return
    setFetching(true); setProgress(8)
    const count = 40 + (connector.name.length % 5) * 6
    const timer = setInterval(() => setProgress(p => p >= 100 ? 100 : p + 12), 160)
    setTimeout(() => {
      clearInterval(timer); setProgress(100)
      setRecords(diGenerateRecords(connector, count, connector.name.length * 3))
      setFetching(false); setStep(2)
    }, 1500)
  }
  const commit = () => {
    if (!connector || !records || !summary) return
    const maxId = Math.max.apply(null, runs.map(r => parseInt(r.id.slice(4), 10)))
    const run = { id:'RUN-' + (maxId + 1), connectorId:connector.id, startedAt:new Date().toISOString(), durationMs:1500 + records.length * 22, triggeredBy:'you@excelsoftcorp.com', status: summary.failed > 0 ? 'Partial' : 'Completed', records, total:summary.total, succeeded:summary.succeeded, failed:summary.failed, warnings:summary.warnings }
    addRun(run); setCommitted(run); setStep(3)
    toast(summary.succeeded + ' of ' + summary.total + ' records imported. ' + summary.failed + ' rejected.', 'success')
  }
  const reset = () => { setStep(0); setSelected(null); setRecords(null); setCommitted(null); setProgress(0); clearPreselect() }
  return (
    <div>
      <ol style={{ ...S.card, display:'flex', flexWrap:'wrap', listStyle:'none', margin:'0 0 16px', padding:0, overflow:'hidden' }}>
        {steps.map((label, i) => (
          <li key={label} style={{ flex:'1 1 160px', display:'flex', alignItems:'center', gap:9, padding:'13px 16px', borderLeft: i ? '1px solid var(--border)' : 'none', background: i === step ? 'var(--primary-tint)' : 'transparent', fontSize:13, fontWeight: i === step ? 600 : 500, color: i === step ? 'var(--primary)' : 'var(--muted)' }}>
            <span style={{ display:'flex', alignItems:'center', justifyContent:'center', width:21, height:21, borderRadius:'50%', flex:'none', fontSize:11, fontWeight:700, border:'1.5px solid ' + (i < step ? 'var(--success)' : i === step ? 'var(--primary)' : 'var(--border)'), background: i < step ? 'var(--success)' : 'transparent', color: i < step ? '#fff' : 'inherit' }}>
              {i < step ? <Icon d="M20 6L9 17l-5-5" size={11} sw={3} /> : i + 1}
            </span>
            {label}
          </li>
        ))}
      </ol>
      {step === 0 && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(360px, 1fr))', gap:14 }}>
          {DI_CONNECTORS.map(c => (
            <button key={c.id} type="button" disabled={c.status !== 'Active'} data-ix={c.status === 'Active' ? 'row' : undefined} onClick={() => { setSelected(c.id); setStep(1) }}
              style={{ ...S.card, marginBottom:0, padding:16, textAlign:'left', fontFamily:'inherit', cursor: c.status === 'Active' ? 'pointer' : 'not-allowed', opacity: c.status === 'Active' ? 1 : 0.55, border:'1px solid var(--border)' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
                <span style={{ fontSize:14, fontWeight:600, color:'var(--ink)' }}>{c.name}</span>
                <DIPill status={c.status} />
              </div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:9 }}>
                <DITag label={DI_KIND_LABEL[c.kind]} />
                <DITag label={'Feature: ' + c.feature} />
              </div>
              {c.status !== 'Active' && <p style={{ margin:'9px 0 0', fontSize:12.2, color:'var(--muted)' }}>Not runnable: connector is {c.status.toLowerCase()}.</p>}
            </button>
          ))}
        </div>
      )}
      {step === 1 && connector && (
        <div style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) 320px', gap:16 }}>
          <div style={{ ...S.card, marginBottom:0, padding:22 }}>
            <div style={diCaps}>Ready to invoke</div>
            <h2 style={{ margin:'6px 0 0', fontSize:17, fontWeight:600, color:'var(--ink)' }}>{connector.name}</h2>
            <p style={{ margin:'6px 0 0', fontSize:13.2, color:'var(--muted)' }}>{connector.description}</p>
            {connector.kind === 'excel' && (
              <div style={{ marginTop:16 }}>
                {upFile ? (
                  <div style={{ display:'flex', alignItems:'center', gap:11, padding:'10px 12px', border:'1px solid var(--border-blue)', borderRadius:10, background:'var(--primary-tint-2)' }}>
                    <span aria-hidden style={{ display:'flex', alignItems:'center', justifyContent:'center', width:32, height:32, borderRadius:8, flex:'none', background:'var(--green-tint)', color:'var(--success-text)' }}><Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" size={15} /></span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13.2, fontWeight:600, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{upFile.name}</div>
                      <div style={{ fontSize:11.6, color:'var(--muted)', marginTop:1 }}>{((upFile.size / 1024).toFixed(1)) + ' KB \u00b7 ready to import'}</div>
                    </div>
                    <button type="button" aria-label="Remove uploaded file" onClick={() => setUpFile(null)} style={{ display:'flex', border:'none', background:'transparent', color:'var(--muted)', cursor:'pointer', padding:4, borderRadius:6, flex:'none' }}><Icon d="M18 6L6 18 M6 6l12 12" size={14} sw={2.2} /></button>
                  </div>
                ) : (
                  <label data-ix="row" style={{ display:'flex', alignItems:'center', gap:11, padding:'12px 14px', border:'1.5px dashed #C7D0DD', borderRadius:10, background:'var(--surface-alt)', cursor:'pointer' }}>
                    <span aria-hidden style={{ display:'flex', alignItems:'center', justifyContent:'center', width:32, height:32, borderRadius:8, flex:'none', background:'var(--primary-tint)', color:'var(--primary)' }}><Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12" size={15} /></span>
                    <span style={{ flex:1, minWidth:0 }}>
                      <span style={{ display:'block', fontSize:13.2, fontWeight:600, color:'var(--ink)' }}>Upload workbook</span>
                      <span style={{ display:'block', fontSize:11.8, color:'var(--muted)', marginTop:1 }}>{'.xlsx or .csv \u2014 defaults to the configured file if skipped'}</span>
                    </span>
                    <span style={{ flex:'none', fontSize:12.6, fontWeight:600, color:'var(--primary)' }}>Browse</span>
                    <input type="file" accept=".xlsx,.xls,.csv" style={{ display:'none' }} onChange={(e) => { const fl = e.target.files && e.target.files[0]; if (fl) setUpFile({ name:fl.name, size:fl.size }); e.target.value = '' }} />
                  </label>
                )}
              </div>
            )}
            <div style={{ marginTop:20, height:9, borderRadius:999, background:'#E9EEF5', boxShadow:'inset 0 1px 2px rgba(16,42,84,.12)', overflow:'hidden' }}>
              <div style={{ height:'100%', width:progress + '%', borderRadius:999, background:'linear-gradient(180deg, #4AA3F0, var(--primary))', boxShadow:'inset 0 1px 0 rgba(255,255,255,.45)', transition:'width .18s ease' }} />
            </div>
            <div style={{ marginTop:9, fontSize:12.2, fontFamily:diMono, color:'var(--muted)' }}>{fetching ? 'Fetching from ' + (upFile ? upFile.name : DI_KIND_LABEL[connector.kind]) + '\u2026' : upFile ? 'Ready \u2014 ' + upFile.name + ' will be imported.' : 'Idle \u2014 no request sent yet.'}</div>
            <div style={{ display:'flex', gap:10, marginTop:20 }}>
              <button type="button" data-ix="primary" onClick={runFetch} disabled={fetching} style={{ ...diBtnPri, opacity: fetching ? 0.7 : 1 }}><Icon d="M5 3l14 9-14 9V3z" size={14} />{fetching ? 'Executing\u2026' : 'Execute operation'}</button>
              <button type="button" data-ix="ghost" onClick={() => { setSelected(null); setStep(0); setUpFile(null); clearPreselect() }} disabled={fetching} style={diBtnSec}><Icon d="M19 12H5 M12 19l-7-7 7-7" size={14} />Change connector</button>
            </div>
          </div>
          <div style={{ ...S.card, marginBottom:0, padding:18, alignSelf:'start' }}>
            <div style={diCaps}>Field mapping in effect</div>
            <ul style={{ listStyle:'none', margin:'10px 0 0', padding:0, display:'flex', flexDirection:'column', gap:7 }}>
              {connector.fieldMap.map(f => (
                <li key={f.source} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, fontSize:12.2, fontFamily:diMono }}>
                  <span style={{ color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{f.source}</span>
                  <span style={{ color:'var(--primary)', fontWeight:600, flex:'none' }}>{'\u2192 ' + f.target}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {step === 2 && records && summary && connector && (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <DIStatCards stats={[
            { label:'Records fetched', value:summary.total, sub:'from source', icon:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3' },
            { label:'Will import', value:summary.succeeded, pct:Math.round((summary.succeeded / summary.total) * 100), sub:Math.round((summary.succeeded / summary.total) * 100) + '%', tone:'green', icon:'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M8.5 12.5l2.5 2.5 4.5-5' },
            { label:'With warnings', value:summary.warnings, pct:Math.round((summary.warnings / summary.total) * 100), sub:Math.round((summary.warnings / summary.total) * 100) + '%', tone:'amber', icon:'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01' },
            { label:'Rejected', value:summary.failed, pct:Math.round((summary.failed / summary.total) * 100), sub:Math.round((summary.failed / summary.total) * 100) + '%', tone:'red', icon:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M15 9l-6 6 M9 9l6 6' },
          ]} />
          <DIRecordTable records={records} />
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <button type="button" data-ix="primary" onClick={commit} style={diBtnPri}><Icon d="M20 6L9 17l-5-5" size={15} />Commit {summary.succeeded} valid records</button>
            <button type="button" data-ix="ghost" onClick={() => setStep(1)} style={diBtnSec}><Icon d="M23 4v6h-6 M20.49 15a9 9 0 1 1-2.12-9.36L23 10" size={14} />Re-fetch</button>
          </div>
        </div>
      )}
      {step === 3 && committed && (
        <div style={{ ...S.card, marginBottom:0, padding:26 }}>
          <DIPill status={committed.status} />
          <h2 style={{ margin:'12px 0 0', fontSize:17, fontWeight:600, color:'var(--ink)' }}>Import {committed.id} finished</h2>
          <p style={{ margin:'6px 0 0', fontSize:13.2, color:'var(--muted)', maxWidth:620 }}>
            {committed.succeeded} of {committed.total} records were committed to the Accounts feature. {committed.failed} records were rejected and are available for correction and re-import.
          </p>
          <div style={{ display:'flex', gap:10, marginTop:20 }}>
            <button type="button" data-ix="primary" onClick={() => onOpenRun(committed.id)} style={diBtnPri}><Icon d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" size={15} />Open run detail</button>
            <button type="button" data-ix="ghost" onClick={reset} style={diBtnSec}><Icon d="M12 5v14 M5 12h14" size={14} />Start another import</button>
          </div>
        </div>
      )}
    </div>
  )
}

function DIDonut({ run }) {
  const clean = run.succeeded - run.warnings
  const segs = [
    { label:'Imported clean', value:clean, color:'#16A34A', grad:'url(#diGradG)' },
    { label:'With warnings', value:run.warnings, color:'#F59E0B', grad:'url(#diGradA)' },
    { label:'Rejected', value:run.failed, color:'#DC2626', grad:'url(#diGradR)' },
  ].filter(s => s.value > 0)
  const R = 50, C = 2 * Math.PI * R
  const gap = segs.length > 1 ? 2.5 : 0
  let cum = 0
  const arcs = segs.map(s => {
    const frac = s.value / run.total
    const dash = Math.max(0, frac * C - gap)
    const a = { ...s, dash, offset:-cum * C }
    cum += frac
    return a
  })
  const rate = Math.round((run.succeeded / run.total) * 100)
  return (
    <section style={{ ...S.card, padding:18, marginBottom:0, display:'flex', flexDirection:'column' }}>
      <div style={diCaps}>Run outcome</div>
      <div style={{ display:'flex', alignItems:'center', gap:20, marginTop:14, flex:1 }}>
        <div style={{ position:'relative', width:132, height:132, flex:'none' }}>
          <svg width="132" height="132" viewBox="0 0 120 120" role="img" aria-label={rate + '% of records imported'}>
            <defs>
              <linearGradient id="diGradG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3DC46E" /><stop offset="1" stopColor="#0E8A3C" /></linearGradient>
              <linearGradient id="diGradA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FBC14B" /><stop offset="1" stopColor="#E08A06" /></linearGradient>
              <linearGradient id="diGradR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F0655A" /><stop offset="1" stopColor="#C21F1F" /></linearGradient>
            </defs>
            <circle cx="60" cy="60" r={R} fill="none" stroke="#E9EEF5" strokeWidth="13" />
            {arcs.map(a => (
              <circle key={a.label} cx="60" cy="60" r={R} fill="none" stroke={a.grad} strokeWidth="13" strokeLinecap="round"
                strokeDasharray={a.dash + ' ' + C} strokeDashoffset={a.offset} transform="rotate(-90 60 60)" />
            ))}
            <circle cx="60" cy="60" r={R + 4.5} fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.5" />
            <circle cx="60" cy="60" r={R - 4.5} fill="none" stroke="rgba(16,42,84,.07)" strokeWidth="1" />
          </svg>
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:23, fontWeight:700, color:'var(--ink)', fontVariantNumeric:'tabular-nums', lineHeight:1 }}>{rate}%</span>
            <span style={{ marginTop:4, fontSize:10.6, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--muted)' }}>imported</span>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10, minWidth:0 }}>
          {segs.map(s => (
            <div key={s.label} style={{ display:'flex', alignItems:'center', gap:9 }}>
              <span aria-hidden style={{ width:9, height:9, borderRadius:3, flex:'none', background:s.color }} />
              <span style={{ fontSize:12.8, color:'var(--muted)', whiteSpace:'nowrap' }}>{s.label}</span>
              <span style={{ marginLeft:'auto', fontSize:12.8, fontWeight:700, fontFamily:diMono, color:'var(--ink)', fontVariantNumeric:'tabular-nums' }}>{s.value}</span>
            </div>
          ))}
          <div style={{ display:'flex', alignItems:'center', gap:9, borderTop:'1px solid var(--border)', paddingTop:10 }}>
            <span style={{ fontSize:12.8, color:'var(--muted)' }}>Total fetched</span>
            <span style={{ marginLeft:'auto', fontSize:12.8, fontWeight:700, fontFamily:diMono, color:'var(--ink)' }}>{run.total}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function DIRunDetail({ run, rules, onBack, onReimport, toast }) {
  const connector = diConnectorById(run.connectorId)
  const breakdown = rules
    .map(rule => ({ rule, count:run.records.filter(r => r.issues.some(i => i.ruleId === rule.id)).length }))
    .filter(b => b.count > 0)
    .sort((a, b) => b.count - a.count)
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16, flexWrap:'wrap', marginBottom:14 }}>
        <div style={{ display:'flex', gap:14, alignItems:'flex-start' }}>
          <button type="button" data-ix="ghost" aria-label="Back to run history" title="Back to run history" onClick={onBack} style={{ ...diBtnSec, width:46, padding:0, justifyContent:'center', flex:'none' }}><Icon d="M19 12H5 M12 19l-7-7 7-7" size={16} /></button>
          <div>
            <h1 style={{ fontSize:20, fontWeight:600, margin:0, color:'var(--ink)' }}>Run {run.id}</h1>
            <p style={{ margin:'4px 0 0', fontSize:13.2, color:'var(--muted)' }}>{(connector ? connector.name : run.connectorId) + ' \u00b7 started ' + diFmtDate(run.startedAt) + ' by ' + run.triggeredBy}</p>
          </div>
        </div>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          <button type="button" data-ix="ghost" onClick={() => toast('Failure report exported.', 'success')} style={diBtnSec}><Icon d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3" size={15} />Export failures</button>
          <button type="button" data-ix="primary" onClick={() => onReimport(run.connectorId)} style={diBtnPri}><Icon d="M23 4v6h-6 M20.49 15a9 9 0 1 1-2.12-9.36L23 10" size={14} />Re-import</button>
        </div>
      </div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center', marginBottom:16 }}>
        <DIPill status={run.status} />
        <DITag label={'Duration ' + diDur(run.durationMs)} />
        <DITag label="Partial commit policy" />
      </div>
      <DIStatCards stats={[
        { label:'Records fetched', value:run.total, sub:'from source', icon:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3' },
        { label:'Imported', value:run.succeeded, pct:Math.round((run.succeeded / run.total) * 100), sub:Math.round((run.succeeded / run.total) * 100) + '%', tone:'green', icon:'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M8.5 12.5l2.5 2.5 4.5-5' },
        { label:'Imported with warnings', value:run.warnings, pct:Math.round((run.warnings / run.total) * 100), sub:Math.round((run.warnings / run.total) * 100) + '%', tone:'amber', icon:'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01' },
        { label:'Rejected', value:run.failed, pct:Math.round((run.failed / run.total) * 100), sub:Math.round((run.failed / run.total) * 100) + '%', tone:'red', icon:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M15 9l-6 6 M9 9l6 6' },
      ]} />
      <div style={{ display:'grid', gridTemplateColumns:'minmax(280px, 360px) minmax(0, 1fr)', gap:16, marginBottom:16, alignItems:'stretch' }}>
        <DIDonut run={run} />
        <section style={{ ...S.card, padding:18, marginBottom:0 }}>
          <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:10 }}>
            <div style={diCaps}>Failure reasons by rule</div>
            {breakdown.length > 0 && <span style={{ fontSize:11.8, color:'var(--muted)' }}>share of {run.total} records</span>}
          </div>
          {breakdown.length > 0 ? (
            <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:14 }}>
              {breakdown.map(({ rule, count }, i) => {
                const maxCount = breakdown[0].count
                const pct = Math.round((count / run.total) * 100)
                const err = rule.severity === 'Error'
                return (
                  <div key={rule.id}>
                    <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:6, minWidth:0 }}>
                      <span style={{ fontSize:11.4, fontWeight:700, fontFamily:diMono, color: err ? '#B42318' : 'var(--warning-text)', background: err ? '#FDECEC' : 'var(--amber-tint)', borderRadius:6, padding:'2px 7px', flex:'none' }}>{rule.id}</span>
                      <span style={{ fontSize:13, fontWeight:600, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{rule.name}</span>
                      <span style={{ marginLeft:'auto', flex:'none', fontSize:12.2, fontFamily:diMono, color:'var(--ink)', fontVariantNumeric:'tabular-nums' }}><strong>{count}</strong><span style={{ color:'var(--muted)' }}>{' \u00b7 ' + pct + '%'}</span></span>
                    </div>
                    <div style={{ height:10, borderRadius:999, background:'#E9EEF5', boxShadow:'inset 0 1px 2px rgba(16,42,84,.12)', overflow:'hidden' }}>
                      <div style={{ height:'100%', borderRadius:999, width:Math.max(3, Math.round((count / maxCount) * 100)) + '%', background: err ? 'linear-gradient(180deg, #F27059, #C21F1F)' : 'linear-gradient(180deg, #FBC14B, #E08A06)', boxShadow:'inset 0 1px 0 rgba(255,255,255,.5), inset 0 -1px 1px rgba(0,0,0,.1)', animation:'diBarGrow .7s cubic-bezier(.22,1,.36,1) both', animationDelay:(i * 70) + 'ms' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, padding:'30px 0' }}>
              <span style={{ display:'flex', alignItems:'center', justifyContent:'center', width:38, height:38, borderRadius:'50%', background:'var(--green-tint)', color:'var(--success-text)' }}><Icon d="M20 6L9 17l-5-5" size={17} sw={2.5} /></span>
              <span style={{ fontSize:13.2, color:'var(--muted)' }}>No validation failures in this run.</span>
            </div>
          )}
        </section>
      </div>
      <DIRecordTable records={run.records} />
    </div>
  )
}

export function DataIntake({ toast }) {
  const [tab, setTab] = useState('connectors')
  const [selConn, setSelConn] = useState(null)
  const [selRun, setSelRun] = useState(null)
  const [preselect, setPreselect] = useState(null)
  const [wizKey, setWizKey] = useState(0)
  const [runs, setRuns] = useState(DI_SEED_RUNS)
  const [rules, setRules] = useState(DI_RULES_SEED)
  const [search, setSearch] = useState('')
  const [kind, setKind] = useState('All')
  const [kindDd, setKindDd] = useState(false)
  const [runStatus, setRunStatus] = useState('All')
  const [ruleKind, setRuleKind] = useState('all')
  const addRun = (r) => setRuns(rs => [r, ...rs])
  const toggleRule = (id) => setRules(rs => rs.map(r => { if (r.id !== id) return r; toast(r.id + (r.enabled ? ' disabled' : ' enabled') + ' for future runs.', 'success'); return { ...r, enabled:!r.enabled } }))
  const gotoWizard = (connId) => { setPreselect(connId || null); setWizKey(k => k + 1); setSelConn(null); setSelRun(null); setTab('import') }
  const openRun = (id) => { setSelRun(id); setSelConn(null); setTab('runs') }
  const tabs = [
    ['connectors', 'Connectors', 'M16 3h5v5 M4 20L21 3 M21 16v5h-5 M14 14l7 7 M3 4l6 6'],
    ['import', 'Run Import', 'M5 3l14 9-14 9V3z'],
    ['runs', 'Run History', 'M12 6v6l4 2 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z'],
    ['rules', 'Validation Rules', 'M11 6h9 M11 12h9 M11 18h9 M3.5 6l1.4 1.4L7 5 M3.5 12l1.4 1.4L7 11 M3.5 18l1.4 1.4L7 17'],
  ]
  const q = search.trim().toLowerCase()
  const filteredConns = DI_CONNECTORS.filter(c => (kind === 'All' || DI_KIND_LABEL[c.kind] === kind) && (!q || (c.name + ' ' + c.feature).toLowerCase().includes(q)))
  const shownRuns = runs.filter(r => runStatus === 'All' || r.status === runStatus)
  const shownRules = rules.filter(r => ruleKind === 'all' || r.kind === ruleKind)
  const runDetail = selRun ? runs.find(r => r.id === selRun) : null
  const connDetail = selConn ? diConnectorById(selConn) : null
  const diActiveN = DI_CONNECTORS.filter(c => c.status === 'Active').length
  const diKindMix = ['excel', 'entra', 'google'].map(k => DI_CONNECTORS.filter(c => c.kind === k).length + ' ' + ({ excel:'Excel', entra:'Entra', google:'Google' })[k]).join(' \u00b7 ')
  const diRunSpark = runs.slice().reverse().map(r => r.total)
  return (
    <div data-screen-label="Data Intake" style={{ animation:'fadeUp .28s ease' }}>
      {!connDetail && !runDetail && (
        <>
          <PageHead title="Data Intake" sub={'Import data for platform features from external sources \u00b7 ' + DI_CONNECTORS.length + ' connectors'}>
            <button type="button" data-ix="primary" onClick={() => gotoWizard(null)} style={diBtnPri}><Icon d="M5 3l14 9-14 9V3z" size={14} />Run import</button>
          </PageHead>
          <div role="tablist" aria-label="Data intake sections" style={{ display:'flex', gap:4, flexWrap:'wrap', borderBottom:'1px solid var(--border)', marginBottom:18 }}>
            {tabs.map(([k, label, icon]) => (
              <button key={k} type="button" role="tab" aria-selected={tab === k} data-ix="nav" onClick={() => { setTab(k); setSelConn(null); setSelRun(null) }}
                style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'10px 14px 11px', marginBottom:-1, border:'none', borderBottom:'2.5px solid ' + (tab === k ? 'var(--primary)' : 'transparent'), borderRadius:'8px 8px 0 0', background:'transparent', color: tab === k ? 'var(--primary)' : 'var(--muted)', fontSize:13.4, fontWeight:600, fontFamily:'inherit', cursor:'pointer', transition:'color .16s ease, border-color .16s ease' }}>
                <Icon d={icon} size={15} />{label}
              </button>
            ))}
          </div>
        </>
      )}
      {connDetail ? (
        <DIConnectorDetail connector={connDetail} runs={runs} rules={rules} onBack={() => setSelConn(null)} onRunConnector={gotoWizard} onOpenRun={openRun} />
      ) : runDetail ? (
        <DIRunDetail run={runDetail} rules={rules} onBack={() => setSelRun(null)} onReimport={gotoWizard} toast={toast} />
      ) : tab === 'connectors' ? (
        <>
          <DIStatCards stats={[
            { label:'Connectors', value:DI_CONNECTORS.length, sub:diKindMix, icon:'M16 3h5v5 M4 20L21 3 M21 16v5h-5 M14 14l7 7 M3 4l6 6' },
            { label:'Active', value:diActiveN, pct:Math.round((diActiveN / DI_CONNECTORS.length) * 100), sub:diActiveN + ' of ' + DI_CONNECTORS.length, tone:'green', icon:'M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z M8.5 12.5l2.5 2.5 4.5-5' },
            { label:'Runs logged', value:runs.length, spark:diRunSpark, sub:'all time', icon:'M12 6v6l4 2 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z' },
            { label:'Records last 30d', value:runs.reduce((a, r) => a + r.total, 0), spark:diRunSpark, sub:'per run', icon:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3' },
          ]} />
          <section style={{ ...S.card, overflow:'visible', marginBottom:0 }}>
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search connectors…" topRound>
              <div style={{ display:'flex', gap:10, alignItems:'center', flexWrap:'wrap' }}>
                <div style={{ minWidth:232 }}><Dropdown value={kind} options={['All', DI_KIND_LABEL.excel, DI_KIND_LABEL.entra, DI_KIND_LABEL.google]} open={kindDd} onToggle={() => setKindDd(o => !o)} onSelect={(v) => { setKind(v); setKindDd(false) }} leadIcon="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" prefix="Source:" ariaLabel="Filter by source" /></div>
              </div>
            </SearchBar>
            {filteredConns.length > 0 ? (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(380px, 1fr))', gap:14, padding:16 }}>
                {filteredConns.map(c => (
                  <button key={c.id} type="button" data-ix="card" aria-label={'Open ' + c.name} onClick={() => setSelConn(c.id)} style={{ display:'flex', flexDirection:'column', gap:11, padding:16, borderRadius:12, border:'1.5px solid var(--border-blue)', background:'var(--surface)', boxShadow:'0 1px 2px rgba(16,42,84,.06), 0 4px 14px -6px rgba(16,42,84,.14)', cursor:'pointer', fontFamily:'inherit', textAlign:'left' }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10 }}>
                      <div style={{ display:'flex', gap:11, alignItems:'flex-start' }}>
                        <span style={{ display:'flex', alignItems:'center', justifyContent:'center', width:36, height:36, borderRadius:10, flex:'none', background:'var(--primary-tint)', color:'var(--primary)' }}><Icon d={DI_KIND_ICON[c.kind]} size={17} /></span>
                        <div>
                          <div style={{ fontSize:14, fontWeight:600, color:'var(--ink)' }}>{c.name}</div>
                          <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:6 }}>
                            <DITag label={DI_KIND_LABEL[c.kind]} />
                            <DITag label={'Feature: ' + c.feature} />
                          </div>
                        </div>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:8, flex:'none' }}>
                        <DIPill status={c.status} />
                        <span className="card-arrow" aria-hidden style={{ display:'flex', alignItems:'center', justifyContent:'center', width:26, height:26, borderRadius:8, background:'var(--primary-tint)', color:'var(--primary)', opacity:.45, transform:'translate(-2px,2px)', transition:'opacity .18s ease, transform .18s ease' }}><Icon d="M7 17L17 7 M7 7h10v10" size={13} sw={2.2} /></span>
                      </div>
                    </div>
                    <p style={{ margin:0, fontSize:12.8, color:'var(--muted)', lineHeight:1.55 }}>{c.description}</p>
                    <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, borderTop:'1px solid var(--border)', paddingTop:11, marginTop:'auto' }}>
                      <div><div style={diCaps}>Last run</div><div style={{ marginTop:3, fontSize:12, fontFamily:diMono, color:'var(--ink)' }}>{diFmtDate(c.lastRunAt)}</div></div>
                      <div><div style={diCaps}>Avg records</div><div style={{ marginTop:3, fontSize:12, fontFamily:diMono, color:'var(--ink)' }}>{c.avgRecords}</div></div>
                      <div><div style={diCaps}>Success rate</div><div style={{ marginTop:3, fontSize:12, fontFamily:diMono, color:'var(--ink)' }}>{c.successRate ? Math.round(c.successRate * 100) + '%' : '\u2014'}</div></div>
                    </div>
                  </button>
                ))}
              </div>
            ) : <Empty title="No connectors match your search" hint="Try a different name or source type." />}
          </section>
        </>
      ) : tab === 'import' ? (
        <DIWizard key={wizKey} runs={runs} addRun={addRun} preselect={preselect} clearPreselect={() => setPreselect(null)} toast={toast} onOpenRun={openRun} />
      ) : tab === 'runs' ? (
        <>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
            {['All', 'Completed', 'Partial', 'Failed'].map(s => <button key={s} type="button" data-ix="chip" onClick={() => setRunStatus(s)} style={diChip(runStatus === s)}>{s === 'All' ? 'All runs' : s}</button>)}
          </div>
          <section style={{ ...S.card, marginBottom:0, overflow:'hidden' }}>
            {shownRuns.length > 0 ? (
              <div className="tscroll" style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse', minWidth:980 }}>
                  <thead><tr>{['Run', 'Connector', 'Started', 'Duration', 'Triggered by', 'Records', 'Imported', 'Failed', 'Status'].map(h => <Th key={h} label={h} align="left" sortable={false} />)}</tr></thead>
                  <tbody>
                    {shownRuns.map(r => (
                      <tr key={r.id} data-ix="row" style={{ borderBottom:'1px solid var(--border)', cursor:'pointer' }} onClick={() => openRun(r.id)}>
                        <td style={{ padding:'13px 16px', fontSize:12.8, fontFamily:diMono, fontWeight:600, color:'var(--primary)' }}>{r.id}</td>
                        <td style={{ padding:'13px 16px', fontSize:13.4, color:'var(--ink)', whiteSpace:'nowrap' }}>{(diConnectorById(r.connectorId) || { name:r.connectorId }).name}</td>
                        <td style={{ padding:'13px 16px', fontSize:12.8, color:'var(--muted)', whiteSpace:'nowrap' }}>{diFmtDate(r.startedAt)}</td>
                        <td style={{ padding:'13px 16px', fontSize:12.4, fontFamily:diMono }}>{diDur(r.durationMs)}</td>
                        <td style={{ padding:'13px 16px', fontSize:12.4, fontFamily:diMono, whiteSpace:'nowrap' }}>{r.triggeredBy}</td>
                        <td style={{ padding:'13px 16px', fontSize:12.4, fontFamily:diMono }}>{r.total}</td>
                        <td style={{ padding:'13px 16px', fontSize:12.4, fontFamily:diMono, color:'var(--success-text)', fontWeight:600 }}>{r.succeeded}</td>
                        <td style={{ padding:'13px 16px', fontSize:12.4, fontFamily:diMono, color: r.failed > 0 ? '#B42318' : 'var(--muted)', fontWeight: r.failed > 0 ? 600 : 400 }}>{r.failed}</td>
                        <td style={{ padding:'13px 16px' }}><DIPill status={r.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <Empty title="No runs match this status" hint="Try a different status filter." />}
          </section>
        </>
      ) : (
        <>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
            {[['all', 'All rules'], ['schema', 'Schema'], ['business', 'Business rules']].map(([k, label]) => <button key={k} type="button" data-ix="chip" onClick={() => setRuleKind(k)} style={diChip(ruleKind === k)}>{label}</button>)}
          </div>
          <section style={{ ...S.card, marginBottom:0 }}>
            {shownRules.map((r, i) => (
              <div key={r.id} style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) auto', gap:14, alignItems:'center', padding:'15px 18px', borderTop: i ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:9 }}>
                    <span style={{ fontSize:12, fontFamily:diMono, color:'var(--muted)' }}>{r.id}</span>
                    <span style={{ fontSize:13.6, fontWeight:600, color:'var(--ink)' }}>{r.name}</span>
                    <DITag label={r.kind === 'schema' ? 'Schema' : 'Business rule'} />
                    <DIPill status={r.severity} />
                  </div>
                  <code style={{ display:'block', marginTop:7, fontSize:12, fontFamily:diMono, color:'var(--muted)' }}>{r.target + ' \u00b7 ' + r.expression}</code>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginTop:8 }}>
                    {r.appliesTo.map(k => <DITag key={k} label={DI_KIND_LABEL[k]} />)}
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                  <span style={diCaps}>{r.enabled ? 'Enabled' : 'Disabled'}</span>
                  <button type="button" role="switch" aria-checked={r.enabled} aria-label={(r.enabled ? 'Disable ' : 'Enable ') + r.name} onClick={() => toggleRule(r.id)}
                    style={{ position:'relative', width:40, height:22, borderRadius:999, border:'none', cursor:'pointer', background: r.enabled ? 'var(--primary)' : '#C6CFDB', transition:'background .18s ease', flex:'none', padding:0 }}>
                    <span aria-hidden style={{ position:'absolute', top:3, left: r.enabled ? 21 : 3, width:16, height:16, borderRadius:'50%', background:'#fff', boxShadow:'0 1px 3px rgba(16,42,84,.3)', transition:'left .18s ease' }} />
                  </button>
                </div>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  )
}
