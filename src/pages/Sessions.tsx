import React, { useState } from 'react'
import { PageHead, S, SearchIcon, Icon, ExcelIcon, FilterBar, Checkbox, Pager, pageWindow, Empty, Dropdown, Modal, ModalFooter } from '../ui'
import { tenants } from '../data'
import { drBound } from '../components/DateRange'

const SES_NOW = (() => { const d = new Date(); d.setSeconds(0, 0); return d.getTime() })()
const SES_MIN = 60000, SES_H = 3600000, SES_D = 86400000
const SES_DEV = [
  { type:'Desktop', device:'Chrome 128 · Windows 11', icon:'M3 5h18v11H3z M8 20h8 M12 16v4' },
  { type:'Mobile', device:'Safari 17 · iPhone 15', icon:'M7 2h10v20H7z M11 18h2' },
  { type:'Desktop', device:'Edge 127 · macOS 14', icon:'M3 5h18v11H3z M8 20h8 M12 16v4' },
  { type:'Mobile', device:'Chrome · Pixel 8', icon:'M7 2h10v20H7z M11 18h2' },
  { type:'Tablet', device:'Safari · iPad Air', icon:'M5 3h14v18H5z M11 18h2' },
  { type:'Desktop', device:'Firefox 129 · Ubuntu', icon:'M3 5h18v11H3z M8 20h8 M12 16v4' },
  { type:'Mobile', device:'SARAS app · Android', icon:'M7 2h10v20H7z M11 18h2' },
]
const SES_METHOD = ['Password + TOTP', 'Google SSO', 'Microsoft Entra', 'Password', 'Passkey', 'Okta SAML']
const SES_CITY = ['Bengaluru, IN', 'Mysuru, IN', 'Chennai, IN', 'Pune, IN', 'Hyderabad, IN', 'Kochi, IN', 'Singapore, SG', 'Dubai, AE']
const SES_NAMES = ['Ravi Mohan', 'Anita Kulkarni', 'Rahul Menon', 'Priya Shah', 'Karthik Rao', 'Meera Iyer', 'Sara Fernandes', 'Arjun Nair', 'Divya Pillai', 'Vikram Sethi', 'Neha Joshi', 'Imran Khan', 'Lakshmi Rao', 'David Osei']
const SES_ACTIVE = [1, 3, 2, 5, 1, 0, 2, 1, 0, 4, 1, 0, 2, 1]
const SES_STATES = {
  active:{ label:'Active', fg:'var(--success-text)', bg:'var(--green-tint)', bd:'#BBE5C8' },
  idle:{ label:'Idle', fg:'var(--warning-text)', bg:'var(--amber-tint)', bd:'#F5D68A' },
  expired:{ label:'Expired', fg:'var(--muted)', bg:'var(--surface-alt)', bd:'var(--border)' },
  loggedOut:{ label:'Logged out', fg:'var(--muted)', bg:'var(--surface-alt)', bd:'var(--border)' },
  revoked:{ label:'Revoked', fg:'#B42318', bg:'#FEF2F2', bd:'#F3C2C2' },
  locked:{ label:'Locked', fg:'var(--warning-text)', bg:'var(--amber-tint)', bd:'#F5D68A' },
}
const SES_STATE_FILTER = { 'Expired':'expired', 'Logged out':'loggedOut', 'Revoked':'revoked', 'Locked':'locked' }

function sesSeed(t) {
  const s = t.code.charCodeAt(0) + t.code.charCodeAt(1) + t.code.charCodeAt(2)
  const domain = t.domain || 'example.edu'
  let id = 88000 + (s % 90) * 37
  return SES_NAMES.map((name, i) => {
    const parts = name.toLowerCase().split(' ')
    const login = parts[0] + '.' + parts[1][0]
    const sessions = []
    const nAct = SES_ACTIVE[(i + s) % SES_ACTIVE.length], nIn = ((s + i * 3) % 5) + 1
    for (let k = 0; k < nAct; k++) {
      const dv = SES_DEV[(i + k * 2 + s) % SES_DEV.length]
      const last = SES_NOW - ((i * 7 + k * 23) % 50 === 0 ? 2 : ((i * 7 + k * 23) % 200)) * SES_MIN
      const start = last - ((k + 1) * 95 + i * 11) * SES_MIN
      sessions.push({ id:'SES-' + (id++), ...dv, method:SES_METHOD[(i + k) % SES_METHOD.length], ip:(49 + (i * 13 + k) % 150) + '.' + ((s + k * 31) % 250) + '.' + ((i * 17) % 250) + '.' + (k * 41 % 250 + 2), place:SES_CITY[(i + k + s) % SES_CITY.length], start, last, expires:start + 12 * SES_H, state:'active' })
    }
    for (let k = 0; k < nIn; k++) {
      const dv = SES_DEV[(i + k + 3) % SES_DEV.length]
      const ended = SES_NOW - (k * 19 + i * 5 + 3) * SES_H
      const start = ended - (2 + (k + i) % 9) * SES_H
      const state = ['expired', 'loggedOut', 'expired', 'revoked', 'locked'][(i + k) % 5]
      const detail = state === 'expired' ? 'Timed out' : state === 'loggedOut' ? 'By user' : state === 'revoked' ? 'By ' + (k % 2 ? 'Anita Kulkarni' : 'Ravi Mohan') + ' · ' + (k % 2 ? 'Security concern' : 'Offboarding') : 'Account locked · 5 failed attempts'
      sessions.push({ id:'SES-' + (id++), ...dv, method:SES_METHOD[(i + k + 2) % SES_METHOD.length], ip:(103 + (i * 7 + k) % 120) + '.' + ((s + k * 13) % 250) + '.' + ((i * 29) % 250) + '.' + (k * 17 % 250 + 4), place:SES_CITY[(i + k * 3) % SES_CITY.length], start, last:ended, expires:start + 12 * SES_H, ended, state, detail })
    }
    return { name, login, email:login + '@' + domain, sessions }
  })
}

export function Sessions({ toast, tenantScope, adminName }) {
  const scoped = !!tenantScope
  const tenantNames = tenants.map(t => t.name)
  const [tenantName, setTenantName] = useState(tenantScope || (typeof window !== 'undefined' && window.__sarasTenant) || tenantNames[0])
  React.useEffect(() => { if (scoped) return; const on = (e) => setTenantName(e.detail); window.addEventListener('saras:tenant', on); return () => window.removeEventListener('saras:tenant', on) }, [scoped])
  const tenant = tenants.find(t => t.name === tenantName) || tenants[0]
  const [data, setData] = useState(() => sesSeed(tenant))
  const [view, setView] = useState('active')
  const [search, setSearch] = useState('')
  const [fDevice, setFDevice] = useState('All')
  const [fCount, setFCount] = useState('All')
  const [fState, setFState] = useState('All')
  const [fWin, setFWin] = useState({ from:'', to:'' })
  const [sel, setSel] = useState([])
  const [openAcc, setOpenAcc] = useState(null)
  const [accView, setAccView] = useState('active')
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [updatedAt, setUpdatedAt] = useState(SES_NOW - 2 * SES_MIN)
  const [, setTick] = useState(0)
  const [dd, setDd] = useState(null)
  const [confirm, setConfirm] = useState(null)
  React.useEffect(() => { setData(sesSeed(tenant)); setSel([]); setOpenAcc(null) }, [tenant.code])
  React.useEffect(() => { const t = setInterval(() => setTick(x => x + 1), 30000); return () => clearInterval(t) }, [])
  React.useEffect(() => { setPage(1) }, [view, search, fDevice, fState, fWin, fCount, size])

  const isActive = s => s.state === 'active'
  const isIdle = s => isActive(s) && SES_NOW - s.last > 30 * SES_MIN
  const winFrom = fWin.from ? drBound(fWin.from, false) : null, winTo = fWin.to ? drBound(fWin.to, true) : null
  const hasWin = winFrom !== null || winTo !== null
  const inWin = s => { if (!hasWin) return true; const end = s.ended || SES_NOW; return (winTo === null || s.start <= winTo) && (winFrom === null || end >= winFrom) }
  const devOk = s => fDevice === 'All' || s.type === fDevice
  const stateOk = s => fState === 'All' || s.state === SES_STATE_FILTER[fState]
  const viewOk = (s, v) => v === 'active' ? isActive(s) : v === 'inactive' ? !isActive(s) : true
  const fmtT = ts => { const d = new Date(ts), today = new Date(SES_NOW); const hm = d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' }); return d.toDateString() === today.toDateString() ? 'Today, ' + hm : d.toLocaleDateString('en-GB', { day:'2-digit', month:'short' }) + ', ' + hm }
  const rel = ts => { const m = Math.round((SES_NOW - ts) / SES_MIN); return m < 1 ? 'Just now' : m < 60 ? m + ' min ago' : m < 1440 ? Math.round(m / 60) + ' h ago' : Math.round(m / 1440) + ' d ago' }
  const isMe = (a, s) => !!adminName && a.name === adminName && isActive(s) && s === a.sessions.find(isActive)

  const q = search.trim().toLowerCase()
  const accRows = data.map(a => {
    const scopedS = a.sessions.filter(s => inWin(s) && devOk(s))
    const act = scopedS.filter(isActive)
    const inact = scopedS.filter(s => !isActive(s))
    const inact24 = a.sessions.filter(s => !isActive(s) && (hasWin ? inWin(s) : SES_NOW - s.ended <= SES_D))
    const latest = [...a.sessions].sort((x, y) => y.last - x.last)[0]
    const match = scopedS.filter(s => viewOk(s, view) && (view === 'active' || stateOk(s)))
    return { ...a, act, inact, inact24, latest, match, locked:a.sessions.some(s => s.state === 'locked') }
  }).filter(a => a.match.length > 0 && (fCount === 'All' || (fCount === '1' ? a.act.length === 1 : fCount === '2' ? a.act.length === 2 : fCount === '3+' ? a.act.length >= 3 : a.act.length >= 5)) && (!q || (a.name + ' ' + a.email + ' ' + a.sessions.map(s => s.ip).join(' ')).toLowerCase().includes(q)))
    .sort((x, y) => (y.act.length - x.act.length) || (y.latest.last - x.latest.last))
  const w = pageWindow(accRows.length, page, size)
  const pageRows = accRows.slice(w.from > 0 ? w.from - 1 : 0, w.to)

  const allAct = data.flatMap(a => a.sessions.filter(s => isActive(s) && inWin(s)))
  const signedIn = data.filter(a => a.sessions.some(s => isActive(s) && inWin(s))).length
  const heavy = data.filter(a => a.sessions.filter(s => isActive(s) && inWin(s)).length >= 3).length
  const in24 = data.flatMap(a => a.sessions.filter(s => !isActive(s) && (hasWin ? inWin(s) : SES_NOW - s.ended <= SES_D)))
  const breakdown = arr => ['expired', 'loggedOut', 'revoked', 'locked'].map(k => [k, arr.filter(s => s.state === k).length]).filter(x => x[1]).map(([k, n]) => n + ' ' + SES_STATES[k].label.toLowerCase()).join(' · ')

  const selAccts = accRows.filter(a => sel.includes(a.login))
  const selActive = selAccts.reduce((n, a) => n + a.act.filter(s => !isMe(a, s)).length, 0)
  const pageAll = pageRows.length > 0 && pageRows.every(a => sel.includes(a.login))
  const pageSome = !pageAll && pageRows.some(a => sel.includes(a.login))
  const togglePage = () => setSel(s => pageAll ? s.filter(l => !pageRows.some(a => a.login === l)) : [...s, ...pageRows.map(a => a.login).filter(l => !s.includes(l))])
  const toggleSel = l => setSel(s => s.includes(l) ? s.filter(x => x !== l) : [...s, l])

  const doRevoke = (c, reason, reset, comment) => {
    const by = 'By ' + (adminName || 'Admin') + ' · ' + reason + (comment ? ' — “' + comment + '”' : '')
    setData(d => d.map(a => {
      if (!c.logins.includes(a.login)) return a
      const mine = adminName && a.name === adminName ? a.sessions.find(isActive) : null
      return { ...a, sessions:a.sessions.map(s => {
        const hit = c.ids ? c.ids.includes(s.id) : isActive(s) && s !== mine
        if (!hit || !isActive(s)) return s
        return { ...s, state:'revoked', ended:SES_NOW, last:SES_NOW, detail:by }
      }) }
    }))
    setConfirm(null); setSel([])
    toast && toast((c.ids ? 'Session revoked' : c.count + ' session' + (c.count === 1 ? '' : 's') + ' revoked') + (c.logins.length > 1 ? ' across ' + c.logins.length + ' accounts' : '') + '.' + (reset ? ' Password reset required on next sign-in.' : ''), 'success')
  }
  const askOne = (a, s) => setConfirm({ kind:'one', title:'Revoke session?', logins:[a.login], ids:[s.id], count:1, msg:<span>Revoke <b style={{ fontWeight:600 }}>{s.id}</b> on <b style={{ fontWeight:600 }}>{s.device}</b> for {a.name}? They’ll be signed out on this device.</span> })
  const askAll = a => { const n = a.act.filter(s => !isMe(a, s)).length; setConfirm({ kind:'all', title:'Revoke all sessions?', logins:[a.login], count:n, msg:<span>Revoke all <b style={{ fontWeight:600 }}>{n} active session{n === 1 ? '' : 's'}</b> for {a.name}? They’ll be signed out on every device.</span> }) }
  const askBulk = () => setConfirm({ kind:'bulk', title:'Revoke sessions for ' + selAccts.length + ' accounts?', logins:selAccts.map(a => a.login), count:selActive, msg:<span>Revoke <b style={{ fontWeight:600 }}>{selActive} active session{selActive === 1 ? '' : 's'}</b> across {selAccts.length} accounts? Each account will be signed out on every device.</span> })
  const refresh = () => { setUpdatedAt(Date.now()); toast && toast('Sessions refreshed.', 'success') }
  const ago = Math.max(0, Math.round((Date.now() - updatedAt) / SES_MIN))
  const canRevoke = view !== 'inactive'
  const openRow = (a, open) => { setOpenAcc(open ? null : a.login); setAccView(view === 'inactive' ? 'inactive' : 'active') }

  const seg = (value, onChange, opts, small) => (
    <div role="tablist" style={{ display:'inline-flex', alignItems:'stretch', boxSizing:'border-box', height: small ? undefined : 44, background:'var(--surface-page)', border:'1px solid var(--border)', borderRadius: small ? 9 : 10, padding:3, gap:2, flex:'none' }}>
      {opts.map(([v, l, n]) => { const on = value === v; return <button key={v} type="button" role="tab" aria-selected={on} onClick={() => onChange(v)} style={{ border:'none', borderRadius:7, padding: small ? '5px 12px' : '0 16px', fontFamily:'inherit', fontSize: small ? 12.2 : 12.8, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap', display:'inline-flex', alignItems:'center', gap:6, background: on ? '#fff' : 'transparent', color: on ? 'var(--primary)' : 'var(--muted)', boxShadow: on ? '0 1px 3px rgba(16,42,84,.14)' : 'none', transition:'all .15s ease' }}>{l}{n != null && <span style={{ fontSize:11.4, fontWeight:700, opacity:.8, fontVariantNumeric:'tabular-nums' }}>{n}</span>}</button> })}
    </div>
  )
  const badge = (n, warn) => <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'3px 10px', borderRadius:999, fontSize:12, fontWeight:600, whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums', ...(n === 0 ? { background:'var(--surface-alt)', color:'var(--muted)', border:'1px solid var(--border)' } : warn ? { background:'var(--amber-tint)', color:'var(--warning-text)', border:'1px solid #F5D68A' } : { background:'var(--green-tint)', color:'var(--success-text)', border:'1px solid #BBE5C8' }) }}>{n > 0 && <span aria-hidden style={{ width:6, height:6, borderRadius:999, background:'currentColor' }} />}{n} active</span>
  const KTONE = { blue:'var(--primary)', green:'var(--success)', amber:'var(--warning)', red:'#DC2626' }
  const kpi = (label, value, sub, tone, pct, icon) => (
    <div style={{ ...S.card, padding:'17px 18px 15px', marginBottom:0, display:'flex', flexDirection:'column', gap:12, minWidth:0, border:'1px solid var(--border-blue)', boxShadow:'0 1px 2px rgba(16,42,84,.05), 0 5px 16px -8px rgba(16,42,84,.12)' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
        <span style={{ fontSize:11.5, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--muted)' }}>{label}</span>
        <Icon d={icon} size={17} style={{ color:'var(--muted)', opacity:.5, flex:'none' }} />
      </div>
      <div style={{ fontSize:30, fontWeight:600, color:'var(--ink)', lineHeight:1, fontVariantNumeric:'tabular-nums', letterSpacing:'-.02em' }}>{value.toLocaleString()}</div>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:'auto', minHeight:24, minWidth:0 }}>
        <div style={{ flex:'1 0 48px', height:5, borderRadius:999, background:'#E9EEF5', overflow:'hidden' }}>
          <div style={{ height:'100%', borderRadius:999, width:Math.min(100, Math.max(2, pct || 0)) + '%', background:KTONE[tone] || KTONE.blue }} />
        </div>
        {sub && <span title={sub} style={{ fontSize:11.8, color:'var(--muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', minWidth:0 }}>{sub}</span>}
      </div>
    </div>
  )
  const idleN = allAct.filter(isIdle).length
  const endedHard = in24.filter(s => s.state === 'revoked' || s.state === 'locked').length
  const th = { fontSize:11.5, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', color:'#0a4a8c', padding:'12px 14px', textAlign:'left', whiteSpace:'nowrap', borderBottom:'1px solid var(--border-blue)', background:'#EAF3FF' }
  const td = { padding:'12px 14px', fontSize:13.2, color:'var(--ink)', verticalAlign:'middle' }
  const sth = { fontSize:'11.5px', fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', color:'#0a4a8c', padding:'12px 16px', textAlign:'left', whiteSpace:'nowrap', background:'#EAF3FF', borderBottom:'1px solid var(--border-blue)' }
  const std = { padding:'13px 16px', fontSize:'13.5px', color:'var(--ink)', whiteSpace:'nowrap', verticalAlign:'middle' }
  const dangerGhost = { height:32, padding:'0 12px', borderRadius:9, border:'1px solid #F3C2C2', background:'#FEF2F2', color:'#B42318', fontFamily:'inherit', fontSize:12.6, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap', display:'inline-flex', alignItems:'center', gap:6 }
  const winDay = x => x.length === 10 ? x.slice(8, 10) + '/' + (+x.slice(5, 7)) + '/' + x.slice(0, 4) : x.replace('T', ' ')
  const winLabel = hasWin ? (fWin.from ? winDay(fWin.from) : '…') + ' → ' + (fWin.to ? winDay(fWin.to) : 'now') : null
  const monoS = { fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', fontSize:'12.9px', color:'var(--muted)' }

  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Sessions" sub={'Sign-in sessions for ' + tenant.name + ' accounts. Inactive history loads on demand.'}>
        <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
          <span style={{ fontSize:12.4, color:'var(--muted)', whiteSpace:'nowrap' }}>{'Updated ' + (ago < 1 ? 'just now' : ago + ' min ago')}</span>
          <button data-ix="ghost" onClick={refresh} style={S.ghost}><Icon d="M23 4v6h-6 M20.49 15a9 9 0 1 1-2.12-9.36L23 10" size={15} />Refresh</button>
          <button data-ix="ghost" aria-label="Export to Excel" onClick={() => toast && toast('Export started. You will be notified when the file is ready.', 'success')} style={S.ghost}><ExcelIcon />Export</button>
        </div>
      </PageHead>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(210px, 1fr))', gap:14, marginBottom:16 }}>
        {kpi(hasWin ? 'Active in range' : 'Active sessions', allAct.length, idleN + ' idle > 30 min', 'green', allAct.length ? (allAct.length - idleN) / allAct.length * 100 : 0, 'M3 5h18v11H3z M8 20h8 M12 16v4')}
        {kpi('Accounts signed in', signedIn, signedIn + ' of ' + data.length, 'blue', data.length ? signedIn / data.length * 100 : 0, 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75')}
        {kpi('3+ sessions', heavy, heavy ? 'Review shared use' : 'None flagged', 'amber', signedIn ? heavy / signedIn * 100 : 0, 'M12 9v4 M12 17h.01 M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z')}
        {kpi(hasWin ? 'Inactive in range' : 'Inactive · 24h', in24.length, breakdown(in24) || '—', 'red', in24.length ? endedHard / in24.length * 100 : 0, 'M12 8v4l3 2 M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z')}
      </div>

      <section style={S.card}>
        <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap', padding:'14px 16px', borderBottom:'1px solid var(--border)', background:'var(--surface-alt)' }}>
          <div style={{ position:'relative', flex:1, minWidth:220, maxWidth:340 }}>
            <span aria-hidden style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'flex' }}><SearchIcon /></span>
            <input aria-label="Search sessions" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, email or IP…" style={{ ...S.input, height:38, fontSize:13.8, padding:'0 12px 0 36px' }} />
          </div>
          <FilterBar filters={[
            { key:'win', label:'Date', type:'range', value:fWin, onChange:setFWin },
            { key:'device', label:'Device', value:fDevice, onChange:setFDevice, options:['All', 'Desktop', 'Mobile', 'Tablet'] },
            ...(view !== 'inactive' ? [{ key:'count', label:'Active sessions', value:fCount, onChange:setFCount, options:['All', '1', '2', '3+', '5+'] }] : []),
            ...(view !== 'active' ? [{ key:'state', label:'State', value:fState, onChange:setFState, options:['All', 'Expired', 'Logged out', 'Revoked', 'Locked'] }] : []),
          ]} />
          <div style={{ marginLeft:'auto' }}>{seg(view, (v) => { setView(v); if (v === 'active') setFState('All'); if (v === 'inactive') { setSel([]); setFCount('All') } }, [['active', 'Active'], ['inactive', 'Inactive'], ['all', 'All']])}</div>
        </div>

        {hasWin && <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', padding:'10px 16px', borderBottom:'1px solid var(--border)', fontSize:12.8, color:'var(--muted)' }}>
          <Icon d="M8 2v4 M16 2v4 M3 9h18 M3 5h18v16H3z" size={14} style={{ color:'var(--primary)' }} />
          <span>Showing sessions <b style={{ fontWeight:600, color:'var(--ink)' }}>active at any time between {winLabel}</b> · {accRows.length} account{accRows.length === 1 ? '' : 's'}</span>
          <button type="button" onClick={() => setFWin({ from:'', to:'' })} style={{ marginLeft:'auto', border:'none', background:'transparent', color:'var(--primary)', fontFamily:'inherit', fontSize:12.8, fontWeight:600, cursor:'pointer', padding:0 }}>Back to live view</button>
        </div>}

        {canRevoke && sel.length > 0 && <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap', padding:'10px 16px', background:'var(--primary-tint)', borderBottom:'1px solid var(--border-blue)', fontSize:13 }}>
          <b style={{ fontWeight:600, color:'var(--on-tint-blue)' }}>{sel.length} account{sel.length === 1 ? '' : 's'} selected</b>
          <span style={{ color:'var(--muted)' }}>· {selActive} active session{selActive === 1 ? '' : 's'}</span>
          <button type="button" disabled={!selActive} onClick={askBulk} style={{ marginLeft:'auto', ...S.modalBtnPrimary, height:34, padding:'0 14px', fontSize:13, background:'var(--danger)', boxShadow:'none', display:'inline-flex', alignItems:'center', gap:7, opacity: selActive ? 1 : .5 }}><Icon d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9" size={14} sw={2.2} />Revoke all sessions ({selAccts.length})</button>
          <button type="button" data-ix="ghost" onClick={() => setSel([])} style={{ ...S.ghost, height:34, fontSize:13 }}>Clear</button>
        </div>}

        {accRows.length ? (
          <>
            <div className="tscroll" style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse', minWidth:920 }}>
                <thead><tr>
                  {canRevoke && <th scope="col" style={{ ...th, width:44, textAlign:'center' }}><span role="checkbox" aria-checked={pageAll ? 'true' : pageSome ? 'mixed' : 'false'} aria-label="Select all on page" tabIndex={0} onClick={togglePage} onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); togglePage() } }} style={{ display:'inline-flex', cursor:'pointer' }}><span style={{ display:'flex', pointerEvents:'none' }}><Checkbox checked={pageAll} indeterminate={pageSome} /></span></span></th>}
                  <th scope="col" style={th}>Account</th>
                  <th scope="col" style={th}>Active sessions</th>
                  <th scope="col" style={th}>Last activity</th>
                  <th scope="col" style={th}>Last device · location</th>
                  <th scope="col" style={th}>{hasWin ? 'Inactive (range)' : 'Inactive (24h)'}</th>
                  <th scope="col" style={{ ...th, textAlign:'right' }}>Actions</th>
                </tr></thead>
                <tbody>
                  {pageRows.map(a => {
                    const on = sel.includes(a.login), open = openAcc === a.login
                    const revocable = a.act.filter(s => !isMe(a, s)).length
                    const accList = a.sessions.filter(s => inWin(s) && devOk(s) && viewOk(s, accView) && (accView === 'active' || stateOk(s))).sort((x, y) => y.last - x.last)
                    return (
                      <React.Fragment key={a.login}>
                        <tr data-ix="row" style={{ borderBottom:'1px solid var(--border)', background: open || on ? 'var(--primary-tint-2)' : undefined }}>
                          {canRevoke && <td style={{ ...td, textAlign:'center' }}><span role="checkbox" aria-checked={on} aria-label={'Select ' + a.name} tabIndex={0} onClick={() => toggleSel(a.login)} onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); toggleSel(a.login) } }} style={{ display:'inline-flex', cursor:'pointer' }}><span style={{ display:'flex', pointerEvents:'none' }}><Checkbox checked={on} /></span></span></td>}
                          <td style={td}>
                            <button type="button" aria-expanded={open} onClick={() => openRow(a, open)} style={{ display:'flex', alignItems:'center', gap:10, border:'none', background:'transparent', padding:0, fontFamily:'inherit', cursor:'pointer', textAlign:'left', minWidth:0 }}>
                              <Icon d="M9 18l6-6-6-6" size={14} style={{ flex:'none', color: open ? 'var(--primary)' : 'var(--muted)', transform: open ? 'rotate(90deg)' : 'none', transition:'transform .18s ease' }} />
                              <span style={{ display:'flex', flexDirection:'column', gap:1, minWidth:0 }}>
                                <span style={{ display:'flex', alignItems:'center', gap:8, fontSize:13.4, fontWeight:600, color:'var(--ink)' }}>{a.name}{a.locked && <span style={{ fontSize:10.6, fontWeight:700, letterSpacing:'.04em', textTransform:'uppercase', color:'var(--warning-text)', background:'var(--amber-tint)', border:'1px solid #F5D68A', borderRadius:999, padding:'1px 7px' }}>Locked</span>}</span>
                                <span style={{ fontSize:12, color:'var(--muted)' }}>{a.email}</span>
                              </span>
                            </button>
                          </td>
                          <td style={td}>{badge(a.act.length, a.act.length >= 3)}</td>
                          <td style={{ ...td, whiteSpace:'nowrap' }}>{rel(a.latest.last)}</td>
                          <td style={{ ...td, whiteSpace:'nowrap', color:'var(--muted)' }}><span style={{ color:'var(--ink)' }}>{a.latest.device.replace(/ \d+(\.\d+)?/g, '')}</span> · {a.latest.place}</td>
                          <td style={td}><span title={breakdown(a.inact24) || 'None'} style={{ fontVariantNumeric:'tabular-nums', color: a.inact24.length ? 'var(--ink)' : 'var(--muted)', borderBottom: a.inact24.length ? '1px dotted var(--muted)' : 'none', cursor: a.inact24.length ? 'help' : 'default' }}>{a.inact24.length}</span></td>
                          <td style={{ ...td, textAlign:'right' }}>
                            <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
                              <button type="button" data-ix="ghost" onMouseDown={(e) => e.preventDefault()} onClick={() => openRow(a, open)} style={{ ...S.ghost, height:32, fontSize:12.6, padding:'0 12px', whiteSpace:'nowrap' }}>{open ? 'Hide' : 'View'}</button>
                              {canRevoke && <button type="button" disabled={!revocable} onClick={() => askAll(a)} style={{ ...dangerGhost, opacity: revocable ? 1 : .45, cursor: revocable ? 'pointer' : 'not-allowed' }}>Revoke all{revocable ? ' (' + revocable + ')' : ''}</button>}
                            </div>
                          </td>
                        </tr>
                        {open && <tr style={{ borderBottom:'1px solid var(--border)' }}><td colSpan={canRevoke ? 7 : 6} style={{ padding: canRevoke ? '12px 16px 16px 58px' : '12px 16px 16px 40px', background:'var(--primary-tint-2)' }}>
                          <div style={{ width:0, minWidth:'100%' }}>
                          <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginBottom:10 }}>
                            <span style={{ fontSize:13.4, fontWeight:600, color:'#0a4a8c' }}>Sessions for {a.name}</span>
                            <div style={{ marginLeft:'auto' }}>{seg(accView, setAccView, [['active', 'Active', a.act.length], ['inactive', 'Inactive', a.inact.length], ['all', 'All']], true)}</div>
                          </div>
                          <div style={{ ...S.card, overflow:'auto', maxHeight:360 }}>
                            <table style={{ width:'100%', borderCollapse:'collapse' }}>
                              <thead><tr>{['Session ID', 'Device / browser', 'Sign-in method', 'IP address', 'Started', 'Last activity', accView === 'active' ? 'Expires' : 'Expires / ended', 'Status', ''].map((h, i) => <th key={i} scope="col" style={{ ...sth, position:'sticky', top:0, textAlign: i === 8 ? 'right' : 'left' }}>{h}</th>)}</tr></thead>
                              <tbody>
                                {accList.length === 0 && <tr><td colSpan={9} style={{ padding:'22px 16px', textAlign:'center', fontSize:12.6, color:'var(--muted)' }}>No {accView === 'all' ? '' : accView + ' '}sessions{hasWin ? ' in this date range' : ''}.</td></tr>}
                                {accList.map((s, k) => {
                                  const st = SES_STATES[isIdle(s) ? 'idle' : s.state], me = isMe(a, s), act = isActive(s)
                                  return (
                                    <tr key={s.id} data-ix="row" style={{ borderBottom: k < accList.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                      <td style={{ ...std, ...monoS }}>{s.id}</td>
                                      <td style={std}><span style={{ display:'inline-flex', alignItems:'center', gap:7 }}><Icon d={s.icon} size={13} style={{ color:'var(--muted)' }} />{s.device}{me && <span style={{ fontSize:10.4, fontWeight:700, letterSpacing:'.04em', textTransform:'uppercase', color:'var(--on-tint-blue)', background:'var(--primary-tint)', borderRadius:999, padding:'1px 7px' }}>This session</span>}</span></td>
                                      <td style={std}>{s.method}</td>
                                      <td style={{ ...std, ...monoS }}>{s.ip}</td>
                                      <td style={std}>{fmtT(s.start)}</td>
                                      <td style={std}>{act ? rel(s.last) : '—'}</td>
                                      <td style={std}>{act ? fmtT(s.expires) : fmtT(s.ended)}</td>
                                      <td style={std}>
                                        <span style={{ display:'flex', flexDirection:'column', gap:2 }}>
                                          <span style={{ display:'inline-flex', alignItems:'center', gap:6, width:'fit-content', padding:'1px 9px', borderRadius:999, background:st.bg, border:'1px solid ' + st.bd, color:st.fg, fontSize:11.6, fontWeight:600 }}><span aria-hidden style={{ width:6, height:6, borderRadius:999, background:'currentColor' }} />{st.label}</span>
                                          {!act && s.detail && <span style={{ fontSize:11.2, color:'var(--muted)' }}>{s.detail}</span>}
                                        </span>
                                      </td>
                                      <td style={{ ...std, textAlign:'right' }}>{act ? (me ? <span style={{ fontSize:11.6, color:'var(--muted)' }}>Current</span> : <button type="button" onClick={() => askOne(a, s)} style={{ ...dangerGhost, height:28, fontSize:12, padding:'0 10px', background:'var(--surface)' }}>Revoke</button>) : s.state === 'locked' ? <span style={{ fontSize:11.6, color:'var(--muted)' }}>Unlock in Accounts</span> : null}</td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                          {accView !== 'active' && <div style={{ marginTop:8, fontSize:11.6, color:'var(--muted)' }}>Inactive sessions are read-only{hasWin ? '' : ' · last 7 days, newest first'}.</div>}
                          </div>
                        </td></tr>}
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <Pager total={accRows.length} page={w.cur} size={size} onPage={setPage} onSize={setSize} />
          </>
        ) : <Empty title={view === 'active' ? 'No active sessions' : 'No sessions match'} hint={q || hasWin || fDevice !== 'All' || fState !== 'All' || fCount !== 'All' ? 'Try clearing the search or filters.' : view === 'active' ? 'Nobody in this tenant is signed in right now.' : 'There is no inactive session history.'} />}
      </section>

      {confirm && <SessionRevokeModal c={confirm} onClose={() => setConfirm(null)} onConfirm={doRevoke} />}
    </div>
  )
}

function SessionRevokeModal({ c, onClose, onConfirm }) {
  const reasons = ['Security concern', 'Offboarding', 'Admin request', 'Lost or stolen device', 'Other']
  const [reason, setReason] = useState(reasons[0])
  const [open, setOpen] = useState(false)
  const [reset, setReset] = useState(false)
  const [comment, setComment] = useState('')
  const stop = (e) => e.stopPropagation()
  return (
    <Modal title={c.title} onClose={onClose} stop={stop} width={500}
      footer={<ModalFooter onClose={onClose} onSave={() => onConfirm(c, reason, reset, comment.trim())} save={c.kind === 'one' ? 'Revoke session' : 'Revoke ' + c.count + ' session' + (c.count === 1 ? '' : 's')} danger />}>
      <div style={{ padding:24, display:'flex', flexDirection:'column', gap:16 }}>
        <div style={{ fontSize:13.6, color:'var(--ink)', lineHeight:1.55 }}>{c.msg}</div>
        <div>
          <label style={S.label}>Reason</label>
          <Dropdown ariaLabel="Reason" value={reason} options={reasons} open={open} onToggle={() => setOpen(o => !o)} onSelect={(v) => { setReason(v); setOpen(false) }} menuPortal />
          <div style={{ marginTop:6, fontSize:12, color:'var(--muted)' }}>Recorded in the Audit Log with this action.</div>
        </div>
        <div>
          <label htmlFor="revoke-comment" style={{ ...S.label, display:'flex', justifyContent:'space-between', gap:8 }}><span>Comments <span style={{ fontWeight:500, color:'var(--muted)' }}>(optional)</span></span><span style={{ fontWeight:500, color:'var(--muted)', fontVariantNumeric:'tabular-nums' }}>{comment.length}/250</span></label>
          <textarea id="revoke-comment" value={comment} maxLength={250} rows={3} onChange={(e) => setComment(e.target.value)} placeholder="Add context for the audit trail, e.g. ticket number" style={{ ...S.input, height:'auto', minHeight:84, padding:'10px 14px', lineHeight:1.5, resize:'vertical', fontSize:13.6 }} />
        </div>
        {c.kind !== 'one' && <div role="checkbox" aria-checked={reset} tabIndex={0} onClick={() => setReset(r => !r)} onKeyDown={(e) => { if (e.key === ' ') { e.preventDefault(); setReset(r => !r) } }} style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer', fontSize:13.2, color:'var(--ink)' }}>
          <span style={{ display:'flex', marginTop:1, pointerEvents:'none' }}><Checkbox checked={reset} /></span>
          <span style={{ display:'flex', flexDirection:'column', gap:2 }}><span style={{ fontWeight:600 }}>Also require password reset on next sign-in</span><span style={{ fontSize:12, color:'var(--muted)' }}>Use when an account may be compromised.</span></span>
        </div>}
        <div style={{ display:'flex', gap:10, alignItems:'flex-start', padding:'10px 12px', borderRadius:10, background:'var(--surface-alt)', border:'1px solid var(--border)', fontSize:12.2, color:'var(--muted)', lineHeight:1.5 }}>
          <Icon d="M12 16v-4 M12 8h.01 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" size={14} style={{ flex:'none', marginTop:2 }} />
          Refresh tokens for these sessions are invalidated too, so the user can’t silently sign back in.
        </div>
      </div>
    </Modal>
  )
}
