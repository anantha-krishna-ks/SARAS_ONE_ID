import React, { useState } from 'react'
import { Modal, ModalFooter, Dropdown, MiniSwitch, S, Icon } from '../ui'

export function TenantConfigModal({ tenant, onClose, stop, ddProps, toast, mode = 'system' }) {
  const business = mode === 'business'
  const [view, setView] = useState(business ? 'lifecycle' : 'database')
  const [saved, setSaved] = useState({})
  const [savedCfg, setSavedCfg] = useState(null)
  const [notifTab, setNotifTab] = useState('smtp')
  const [socTab, setSocTab] = useState('microsoft')
  const [socMode, setSocMode] = useState('edit')
  const [socFocus, setSocFocus] = useState(false)
  const [fedTab, setFedTab] = useState('entra')
  const [intTab, setIntTab] = useState('entra')
  const [tabSaved, setTabSaved] = useState({})
  const socGutter = React.useRef(null)
  const [ddOpen, setDdOpen] = useState(null)
  const [showPw, setShowPw] = useState({})
  const [cfg, setCfg] = useState({
    dbServerType:'Perpetual', dbHost:'pg-cluster.internal', dbPort:'5432', dbUser:'saras_app', dbName:'saras_one',
    cacheProvider:'Redis', cacheEnabled:'true', cacheConn:'redis://cache.internal:6379',
    logProvider:'None', storProvider:'MinIO', storEndpoint:'https://minio.internal:9000', smtpSsl:'Yes',
    sesProviderName:'AWS SES', sesProviderType:'REST API', sesConfigSet:'default',
    smsConfigName:'default', waAuth:'Bearer Token', waMsgType:'default',
    mfaEnabled:true, totpEnabled:true, schedProvider:'Quartz', schedEnabled:'Yes',
    phProvider:'Argon', phUsePepper:'no',
    soc_google_clientId:'482913-saras.apps.googleusercontent.com', soc_google_scopes:'openid email profile', soc_microsoft_scopes:'openid email profile', soc_apple_scopes:'name email', soc_meta_scopes:'email public_profile',
    fedProtocol:'SAML 2.0', fedNameId:'Email Address', fedSignReq:'Yes', fedResponse:'code', fedJit:true,
    alpInvitedOn:false, alpInvitedDays:'', alpNotifyOn:false, alpNotifyDays:'', alpInactiveOn:false, alpInactiveDays:'',
  })
  const set = (k) => (e) => { const v = e && e.target ? e.target.value : e; setCfg(c => ({ ...c, [k]:v })) }
  const dd = (id, options) => ({ value: cfg[id], options, open: ddOpen === id, onToggle: () => setDdOpen(o => (o === id ? null : id)), onSelect: (v) => { setCfg(c => ({ ...c, [id]:v })); setDdOpen(null) }, menuPortal: true })
  const L = { display:'block', fontSize:12.6, fontWeight:600, color:'var(--ink)', marginBottom:6 }
  const inp = { ...S.input, height:40, borderRadius:9, fontSize:13.2, boxSizing:'border-box', maxWidth:'100%' }
  const Txt = ({ id, label, ph, full, num }) => (
    <div style={{ gridColumn: full ? '1 / -1' : 'auto', minWidth:0 }}>
      <label htmlFor={'tc-' + id} style={L}>{label}</label>
      <input id={'tc-' + id} value={cfg[id] || ''} onChange={set(id)} placeholder={ph || ''} inputMode={num ? 'numeric' : undefined} style={inp} />
    </div>
  )
  const Pw = ({ id, label, full, ph }) => (
    <div style={{ gridColumn: full ? '1 / -1' : 'auto', minWidth:0 }}>
      <label htmlFor={'tc-' + id} style={L}>{label}</label>
      <div style={{ position:'relative' }}>
        <input id={'tc-' + id} type={showPw[id] ? 'text' : 'password'} value={cfg[id] || ''} onChange={set(id)} placeholder={ph || '••••••••'} style={{ ...inp, paddingRight:40 }} />
        <button data-ix="ic" type="button" aria-label="Show or hide" onClick={() => setShowPw(s => ({ ...s, [id]:!s[id] }))} style={{ position:'absolute', right:5, top:'50%', transform:'translateY(-50%)', width:30, height:30, border:'none', background:'transparent', color:'var(--muted)', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:7, cursor:'pointer' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
        </button>
      </div>
    </div>
  )
  const Radio = ({ id, label, options, full }) => (
    <div style={{ gridColumn: full ? '1 / -1' : 'auto' }}>
      <span style={L}>{label}</span>
      <div role="radiogroup" aria-label={label} style={{ display:'inline-flex', background:'var(--surface-page)', border:'1px solid var(--border)', borderRadius:9, padding:3, gap:2 }}>
        {options.map(o => <button key={o} type="button" role="radio" aria-checked={cfg[id] === o} onClick={() => setCfg(c => ({ ...c, [id]:o }))} style={{ border:'none', borderRadius:7, padding:'7px 16px', fontSize:12.8, fontWeight:600, cursor:'pointer', background: cfg[id] === o ? '#fff' : 'transparent', color: cfg[id] === o ? 'var(--primary)' : 'var(--muted)', boxShadow: cfg[id] === o ? '0 1px 3px rgba(16,42,84,.14)' : 'none', transition:'all .15s ease' }}>{o}</button>)}
      </div>
    </div>
  )
  const Dd = ({ id, label, options }) => (
    <div style={{ minWidth:0 }}><span style={L}>{label}</span><Dropdown {...dd(id, options)} ariaLabel={label} /></div>
  )
  const SwitchRow = ({ id, label, hint }) => (
    <div style={{ gridColumn:'1 / -1', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'11px 14px', border:'1px solid var(--border)', borderRadius:10, background:'var(--surface)' }}>
      <span style={{ display:'flex', flexDirection:'column', gap:2 }}><span style={{ fontSize:13.4, fontWeight:600, color:'var(--ink)' }}>{label}</span>{hint && <span style={{ fontSize:11.8, color:'var(--muted)' }}>{hint}</span>}</span>
      <MiniSwitch on={!!cfg[id]} onToggle={() => setCfg(c => ({ ...c, [id]:!c[id] }))} label={label} />
    </div>
  )
  const PolicyRow = ({ onId, daysId, code, label, daysLabel }) => (
    <div style={{ gridColumn:'1 / -1', display:'grid', gridTemplateColumns:'minmax(0,1fr) 150px', alignItems:'center', gap:16, padding:'13px 16px', border:'1px solid ' + (cfg[onId] ? 'var(--primary-tint-strong, #BFD8F5)' : 'var(--border)'), borderRadius:10, background: cfg[onId] ? 'var(--primary-tint)' : 'var(--surface)', transition:'all .15s ease' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, minWidth:0 }}>
        <MiniSwitch on={!!cfg[onId]} onToggle={() => setCfg(c => ({ ...c, [onId]:!c[onId] }))} label={label} />
        <span style={{ display:'flex', flexDirection:'column', gap:3, minWidth:0 }}>
          <span style={{ fontSize:13.4, fontWeight:600, color:'var(--ink)' }}>{label}</span>
          <span style={{ fontSize:11.6, fontWeight:600, letterSpacing:'.04em', color:'var(--muted)', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace' }}>{code}</span>
        </span>
      </div>
      <div style={{ minWidth:0 }}>
        <label htmlFor={'tc-' + daysId} style={{ ...L, fontSize:11.6, color: cfg[onId] ? 'var(--ink)' : 'var(--muted)', marginBottom:4 }}>{daysLabel}</label>
        <div style={{ position:'relative' }}>
          <input id={'tc-' + daysId} value={cfg[daysId] || ''} onChange={(e) => setCfg(c => ({ ...c, [daysId]: e.target.value.replace(/[^\d]/g, '') }))} placeholder="—" inputMode="numeric" disabled={!cfg[onId]} aria-label={label + ' — ' + daysLabel} style={{ ...inp, height:38, paddingRight:48, opacity: cfg[onId] ? 1 : .55, cursor: cfg[onId] ? 'text' : 'not-allowed', background: cfg[onId] ? '#fff' : 'var(--surface-page)' }} />
          <span aria-hidden style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', fontSize:12, color:'var(--muted)', pointerEvents:'none' }}>days</span>
        </div>
      </div>
    </div>
  )
  const Head = ({ t }) => (
    <div style={{ gridColumn:'1 / -1', display:'flex', alignItems:'center', gap:10, margin:'8px 0 -4px' }}>
      <span style={{ fontSize:11.2, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--primary)' }}>{t}</span>
      <span aria-hidden style={{ flex:1, height:1, background:'var(--border)' }} />
    </div>
  )
  const KeyRow = ({ name, file, ok }) => (
    <div style={{ gridColumn:'1 / -1', display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'14px 16px', border:'1px solid var(--border)', borderRadius:10, background:'var(--surface)' }}>
      <span style={{ display:'flex', alignItems:'center', gap:12 }}>
        <span style={{ display:'inline-flex', width:36, height:36, borderRadius:9, alignItems:'center', justifyContent:'center', background:'var(--primary-tint)', color:'var(--primary)', flex:'none' }}><Icon d="M21 2l-9.6 9.6 M15.5 7.5l3 3 M8 11a5 5 0 1 0 5 5 5 5 0 0 0-5-5z" size={17} /></span>
        <span style={{ display:'flex', flexDirection:'column', gap:2 }}><span style={{ fontSize:13.6, fontWeight:600, color:'var(--ink)' }}>{name}</span><span style={{ fontSize:11.8, color:'var(--muted)', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace' }}>{file}</span></span>
      </span>
      <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 11px', borderRadius:999, fontSize:12, fontWeight:600, flex:'none', whiteSpace:'nowrap', background: ok ? '#EAF6EF' : '#FBEFEF', border:'1px solid ' + (ok ? '#BFE3CE' : '#EEC9C9'), color: ok ? '#2E9E6B' : '#B85C5C' }}>
        <Icon d={ok ? 'M20 6L9 17l-5-5' : 'M18 6L6 18 M6 6l12 12'} size={12} sw={2.6} />{ok ? 'Configured' : 'Not configured'}
      </span>
    </div>
  )
  const socTabs = [['microsoft', 'Microsoft'], ['google', 'Google'], ['meta', 'Meta'], ['apple', 'Apple']]
  const socDefJson = k => JSON.stringify(k === 'apple' ? { servicesId:'', teamId:'', keyId:'', privateKey:'', scopes:['name', 'email'], redirectUri:'https://id.saras.one/signin-apple' } : { clientId: k === 'google' ? '482913-saras.apps.googleusercontent.com' : '', clientSecret:'', ...(k === 'microsoft' ? { tenantId:'common' } : {}), scopes: k === 'meta' ? ['email', 'public_profile'] : ['openid', 'email', 'profile'], redirectUri:'https://id.saras.one/signin-' + k }, null, 2)
  const parseJ = t => { try { return { ok:true, v: JSON.parse(t) } } catch (e) { return { ok:false, err: e.message } } }
  const hlJson = t => { const out = []; const re = /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; let last = 0, m, i = 0; while ((m = re.exec(t))) { if (m.index > last) out.push(t.slice(last, m.index)); const c = m[1] ? (m[2] ? 'var(--primary)' : '#2E7D4F') : m[3] ? (m[3] === 'null' ? '#8A94A6' : '#B8860B') : '#B85C5C'; out.push(<span key={i++} style={{ color:c }}>{m[1] || m[0]}</span>); if (m[2]) out.push(m[2]); last = re.lastIndex } out.push(t.slice(last)); return out }
  const socReady = k => { const p = parseJ(cfg['soc_' + k + '_json'] ?? socDefJson(k)); return p.ok && !!p.v && !!(p.v.clientId || p.v.servicesId) }
  const socialOn = socTabs.filter(([k]) => tabSaved['soc_' + k] != null).map(([, l]) => l)
  const fedTabs = [['entra', 'Microsoft Entra'], ['okta', 'Okta'], ['saml', 'SAML'], ['ping', 'Ping']]
  const fedDefJson = k => { const cb = 'https://id.saras.one/federation/' + k + '/callback'; const sc = ['openid', 'email', 'profile']; return JSON.stringify(k === 'entra' ? { tenantId:'', clientId:'', clientSecret:'', authority:'https://login.microsoftonline.com/{tenantId}/v2.0', scopes:sc, redirectUri:cb } : k === 'okta' ? { domain:'your-org.okta.com', authorizationServerId:'default', clientId:'', clientSecret:'', scopes:sc, redirectUri:cb } : k === 'ping' ? { environmentId:'', region:'NA', issuer:'https://auth.pingone.com/{environmentId}/as', clientId:'', clientSecret:'', scopes:sc, redirectUri:cb } : { idpEntityId:'', ssoUrl:'', sloUrl:'', x509Certificate:'', nameIdFormat:'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress', signAuthnRequests:true, spEntityId:'https://id.saras.one/saml/metadata', acsUrl:'https://id.saras.one/saml/acs' }, null, 2) }
  const fedReady = k => { const p = parseJ(cfg['fed_' + k + '_json'] ?? fedDefJson(k)); return p.ok && !!p.v && !!(p.v.clientId || p.v.idpEntityId) }
  const fedOn = fedTabs.filter(([k]) => tabSaved['fed_' + k] != null).map(([, l]) => l)
  const intTabs = [['entra', 'Microsoft Entra'], ['google', 'Google Workspace']]
  const intDefJson = k => JSON.stringify(k === 'entra' ? { tenantId:'', clientId:'', clientSecret:'', graphEndpoint:'https://graph.microsoft.com/v1.0', syncObjects:['users', 'groups'], userFilter:'accountEnabled eq true', schedule:'every 6 hours', deltaSync:true, attributeMapping:{ email:'mail', firstName:'givenName', lastName:'surname', department:'department', employeeId:'employeeId' } } : { customerId:'my_customer', domain:'', adminEmail:'', serviceAccount:{ client_email:'', private_key:'' }, scopes:['https://www.googleapis.com/auth/admin.directory.user.readonly', 'https://www.googleapis.com/auth/admin.directory.group.readonly'], syncObjects:['users', 'groups'], orgUnitPath:'/', schedule:'every 6 hours', attributeMapping:{ email:'primaryEmail', firstName:'name.givenName', lastName:'name.familyName', department:'organizations[0].department' } }, null, 2)
  const intOn = intTabs.filter(([k]) => tabSaved['int_' + k] != null).map(([, l]) => l)
  const TABBED = { social:{ p:'soc', tabs:socTabs, tab:socTab, def:socDefJson, noun:'provider' }, federation:{ p:'fed', tabs:fedTabs, tab:fedTab, def:fedDefJson, noun:'identity provider' }, intake:{ p:'int', tabs:intTabs, tab:intTab, def:intDefJson, noun:'connector' } }
  const tb = TABBED[view]
  const tabTxt = (p, k, def) => cfg[p + '_' + k + '_json'] ?? def(k)
  const tabLbl = tb ? (tb.tabs.find(([k]) => k === tb.tab) || tb.tabs[0])[1] : ''
  const tabSv = tb ? tabSaved[tb.p + '_' + tb.tab] : null
  const tabChanged = !!tb && tabSv != null && tabSv !== tabTxt(tb.p, tb.tab, tb.def)
  const saveTab = () => { const t = tabTxt(tb.p, tb.tab, tb.def); if (!parseJ(t).ok) { toast('Fix the JSON before saving ' + tabLbl + '.', 'error'); return } setTabSaved(s => ({ ...s, [tb.p + '_' + tb.tab]: t })); toast(tabLbl + ' ' + tb.noun + ' saved for ' + tenant.name + '.', 'success') }
  const allSections = [
    { k:'database', label:'Database', icon:'M12 2C7.6 2 4 3.3 4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5c0-1.7-3.6-3-8-3z M4 5c0 1.7 3.6 3 8 3s8-1.3 8-3 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3', desc:'Server, connection and schema', ok: cfg.dbServerType === 'Cloud' ? !!cfg.dbConfigUrl : !!cfg.dbHost, summary: cfg.dbServerType === 'Cloud' ? (cfg.dbConfigUrl ? 'Cloud · ' + cfg.dbConfigUrl : 'Configuration URL not set') : (cfg.dbHost ? cfg.dbHost + ':' + (cfg.dbPort || '5432') : 'Connection not set') },
    { k:'cache', label:'Cache', icon:'M13 2L3 14h7l-1 8 10-12h-7l1-8z', desc:'Provider, TTL and key prefix', ok: cfg.cacheEnabled === 'true' && !!cfg.cacheConn, summary: cfg.cacheProvider + (cfg.cacheEnabled === 'true' ? ' · Enabled' : ' · Disabled') },
    { k:'rsa', label:'RSA Keys', icon:'M21 2l-9.6 9.6 M15.5 7.5l3 3 M8 11a5 5 0 1 0 5 5 5 5 0 0 0-5-5z', desc:'Token signing key pair', ok:false, summary:'Private key only' },
    { k:'logging', label:'Logging', icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h5', ok: cfg.logProvider !== 'None', desc:'Sinks, levels and batching', summary: cfg.logProvider === 'None' ? 'No provider' : cfg.logProvider },
    { k:'storage', label:'Storage', icon:'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', desc:'Object store for files and media', ok:!!cfg.storEndpoint, summary: cfg.storProvider },
    { k:'notification', label:'Notification', icon:'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.7 21a2 2 0 0 1-3.4 0', desc:'Email, SMS and WhatsApp channels', ok:true, summary:'SMTP · SES · SMS · WhatsApp' },
    { k:'mfa', label:'MFA', icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', desc:'Second factor and recovery codes', ok:!!cfg.mfaEnabled, summary: cfg.mfaEnabled ? 'Enabled' + (cfg.totpEnabled ? ' · TOTP' : '') : 'Disabled' },
    { k:'scheduler', label:'Scheduler', icon:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 6v6l4 2', desc:'Background job engine', ok: cfg.schedEnabled === 'Yes', summary: cfg.schedProvider + ' · ' + (cfg.schedEnabled === 'Yes' ? 'Enabled' : 'Disabled') },
    { k:'passwordHash', label:'Password Hash', icon:'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z', desc:'Hashing algorithm and cost parameters', ok: !!(cfg.phMemory && cfg.phIterations), summary: cfg.phProvider + (cfg.phUsePepper === 'yes' ? ' · Pepper' : '') },
    { k:'social', label:'Social Authentication', icon:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75', desc:'Sign in with Microsoft, Google, Meta and Apple', ok: socialOn.length > 0, summary: socialOn.length ? socialOn.join(' · ') : 'No providers enabled' },
    { k:'federation', label:'Enterprise Federation', icon:'M3 21h18 M5 21V7l7-4 7 4v14 M9 9h1 M14 9h1 M9 13h1 M14 13h1 M9 17h1 M14 17h1', desc:'Single sign-on with Microsoft Entra, Okta, Ping or any SAML 2.0 identity provider', ok: fedOn.length > 0, summary: fedOn.length ? fedOn.join(' · ') : 'No providers configured' },
    { k:'intake', label:'Data Intake Connectors', icon:'M12 3v12 M7 10l5 5 5-5 M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2', desc:'Import accounts and groups from Microsoft Entra or Google Workspace directories', ok: intOn.length > 0, summary: intOn.length ? intOn.join(' · ') : 'No connectors saved' },
    { k:'lifecycle', label:'Account Lifecycle Policy', icon:'M21 12a9 9 0 1 1-2.64-6.36 M21 3v6h-6 M12 7v5l3 3', desc:'Automatic inactivation and inactivity notices for accounts', ok: !!((cfg.alpInvitedOn && cfg.alpInvitedDays) || (cfg.alpNotifyOn && cfg.alpNotifyDays) || (cfg.alpInactiveOn && cfg.alpInactiveDays)), summary: [cfg.alpInvitedOn && 'suspend_invited_accounts', cfg.alpNotifyOn && 'last_login_notification', cfg.alpInactiveOn && 'last_login_suspension'].filter(Boolean).join(' · ') || 'No rules enabled' },
  ]
  const sections = allSections.filter(s => business ? s.k === 'lifecycle' : s.k !== 'lifecycle')
  const cur = sections.find(s => s.k === view) || sections[0]
  const idx = sections.findIndex(s => s.k === view)
  const prevS = idx > 0 ? sections[idx - 1] : null
  const nextS = idx < sections.length - 1 ? sections[idx + 1] : null
  const okCount = sections.filter(s => s.ok).length
  const notifTabs = [['smtp', 'SMTP Email'], ['ses', 'Amazon SES'], ['sms', 'SMS'], ['wa', 'WhatsApp']]
  const showMongo = cfg.logProvider === 'MongoDB' || cfg.logProvider === 'Both'
  const dbCloud = cfg.dbServerType === 'Cloud'
  const grid = { display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, alignItems:'start' }
  const saveSection = () => { setSaved(s => ({ ...s, [view]: true })); setSavedCfg(c => ({ ...(c || {}), [view]: JSON.stringify(cfg) })); toast(cur.label + ' configuration saved for ' + tenant.name + '.', 'success') }
  const dirty = saved[view] && savedCfg && savedCfg[view] !== JSON.stringify(cfg)
  const StatusDot = ({ ok }) => (
    <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11.8, fontWeight:600, color: ok ? '#2E9E6B' : '#B8860B' }}>
      <span aria-hidden style={{ width:7, height:7, borderRadius:'50%', background: ok ? '#2E9E6B' : '#E2A32D' }} />{ok ? 'Configured' : 'Needs setup'}
    </span>
  )
  const jsonEditor = (jk, file, lbl, def) => { const txt = cfg[jk] ?? def; const p = parseJ(txt); const view = socMode === 'view'; const bad = !!txt && !p.ok; const shown = view && p.ok ? JSON.stringify(p.v, null, 2) : txt; const nLines = Math.max(shown.split('\n').length, 15); const seg = (m, lbl) => <button type="button" role="radio" aria-checked={socMode === m} onClick={() => setSocMode(m)} style={{ border:'none', borderRadius:6, padding:'5px 11px', fontSize:12, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap', background: socMode === m ? '#fff' : 'transparent', color: socMode === m ? 'var(--primary)' : 'var(--muted)', boxShadow: socMode === m ? '0 1px 2px rgba(16,42,84,.12)' : 'none', transition:'all .15s ease' }}>{lbl}</button>; const body = { flex:1, minWidth:0, margin:0, height:340, boxSizing:'border-box', padding:'12px 16px', border:'none', outline:'none', background:'transparent', resize:'none', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', fontSize:12.6, lineHeight:'20px', color:'var(--ink)', whiteSpace:'pre', overflow:'auto', tabSize:2 }; return <div style={{ gridColumn:'1 / -1', minWidth:0 }}>
    <label htmlFor={'tc-' + jk} style={L}>{lbl + ' Configuration'}</label>
    <div style={{ border:'1px solid ' + (bad ? '#E3A5A5' : socFocus ? 'var(--primary)' : 'var(--border)'), borderRadius:12, overflow:'hidden', background:'#fff', boxShadow: socFocus ? '0 0 0 3px ' + (bad ? 'rgba(184,92,92,.14)' : 'rgba(10,74,140,.12)') : '0 1px 2px rgba(16,42,84,.05)', transition:'border-color .15s ease, box-shadow .15s ease' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, flexWrap:'wrap', padding:'7px 8px 7px 14px', borderBottom:'1px solid var(--border)', background:'var(--surface-page)' }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12.2, fontWeight:600, color:'var(--ink)', minWidth:0 }}><span aria-hidden style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:22, height:22, borderRadius:6, background:'var(--primary-tint)', color:'var(--primary)', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', fontSize:11, fontWeight:700 }}>{'{ }'}</span><span style={{ fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', fontWeight:500, color:'var(--muted)' }}>{file}</span></span>
        <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
          <span role="radiogroup" aria-label="Editor view" style={{ display:'inline-flex', background:'rgba(16,42,84,.05)', borderRadius:8, padding:2, gap:2 }}>{seg('edit', 'Edit')}{seg('view', 'Formatted')}</span>
          <button data-ix="ic" type="button" disabled={!p.ok} title="Format JSON" onClick={() => setCfg(c => ({ ...c, [jk]: JSON.stringify(p.v, null, 2).slice(0, 2000) }))} style={{ display:'inline-flex', alignItems:'center', gap:6, height:28, padding:'0 10px', border:'none', borderRadius:7, background:'transparent', color: p.ok ? 'var(--primary)' : 'var(--muted)', fontSize:12, fontWeight:600, cursor: p.ok ? 'pointer' : 'not-allowed', opacity: p.ok ? 1 : .5, whiteSpace:'nowrap' }}><Icon d="M4 6h16 M4 12h10 M4 18h13" size={13} />Format</button>
        </span>
      </div>
      <div style={{ display:'flex', background: view ? 'var(--surface-page)' : '#fff' }}>
        <div ref={socGutter} aria-hidden style={{ flex:'none', width:44, height:340, overflow:'hidden', padding:'12px 10px 12px 0', boxSizing:'border-box', textAlign:'right', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', fontSize:11.6, lineHeight:'20px', color:'#A7B0BF', background:'var(--surface-page)', borderRight:'1px solid var(--border)', userSelect:'none' }}>{Array.from({ length: nLines + 4 }, (_, i) => <div key={i}>{i + 1}</div>)}</div>
        {view ? <pre aria-label={lbl + ' configuration, formatted'} onScroll={e => { if (socGutter.current) socGutter.current.scrollTop = e.currentTarget.scrollTop }} style={body}>{p.ok ? hlJson(shown) : <span style={{ color: txt ? '#B85C5C' : 'var(--muted)', whiteSpace:'pre-wrap', fontFamily:'inherit' }}>{txt ? 'Cannot format — fix the JSON in Edit view.' : 'No configuration yet.'}</span>}</pre>
        : <textarea id={'tc-' + jk} value={txt} onChange={(e) => setCfg(c => ({ ...c, [jk]: e.target.value.slice(0, 2000) }))} onScroll={e => { if (socGutter.current) socGutter.current.scrollTop = e.currentTarget.scrollTop }} onFocus={() => setSocFocus(true)} onBlur={() => setSocFocus(false)} maxLength={2000} spellCheck={false} wrap="off" placeholder={'Paste the ' + lbl + ' provider JSON here'} style={body} />}
      </div>
      <div role="status" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, padding:'7px 14px', borderTop:'1px solid var(--border)', background: bad ? '#FBEFEF' : 'var(--surface-page)', fontSize:11.8 }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:6, minWidth:0, fontWeight:600, color: !txt ? 'var(--muted)' : p.ok ? '#2E9E6B' : '#B85C5C' }}>{txt ? <Icon d={p.ok ? 'M20 6L9 17l-5-5' : 'M12 8v5 M12 16.5v.5 M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'} size={12} sw={2.4} /> : null}<span style={{ overflowWrap:'anywhere' }}>{!txt ? 'Empty' : p.ok ? 'Valid JSON' : p.err}</span></span>
        <span style={{ flex:'none', color: txt.length >= 2000 ? '#B85C5C' : 'var(--muted)', fontVariantNumeric:'tabular-nums', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace' }}>{txt.length.toLocaleString() + ' / 2,000'}</span>
      </div>
    </div>
  </div> }
  return (
    <Modal title={(business ? 'Business Configuration \u2014 ' : 'Configure \u2014 ') + tenant.name} desc={business ? 'Account lifecycle rules for this tenant' : okCount + ' of ' + sections.length + ' services configured'} onClose={onClose} stop={stop} width={1120} footer={<React.Fragment><span style={{ flex:1, alignSelf:'center', minWidth:0, fontSize:12.4, color: (tb ? tabChanged : dirty) ? '#B8860B' : 'var(--muted)', fontWeight: (tb ? tabChanged : dirty) ? 600 : 400 }}>{tb ? (tabChanged ? 'Unsaved changes in ' + tabLbl : tabSv != null ? tabLbl + ' ' + tb.noun + ' saved' : '') : dirty ? 'Unsaved changes in ' + cur.label : (saved[view] ? cur.label + ' saved' : '')}</span><button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Close</button><button data-ix="primary" onClick={tb ? saveTab : saveSection} style={S.modalBtnPrimary}>{'Save ' + (tb ? tabLbl : cur.label)}</button></React.Fragment>}>
      <div style={{ display:'flex', minHeight:560 }}>
        <nav aria-label="Configuration sections" style={{ width:252, flexShrink:0, borderRight:'1px solid var(--border)', background:'var(--surface-page)', padding:'18px 14px', display:'flex', flexDirection:'column', gap:2 }}>
          {sections.map((s, i) => {
            const active = view === s.k
            return (
              <button key={s.k} type="button" aria-current={active ? 'true' : undefined} onClick={() => setView(s.k)} style={{ display:'flex', alignItems:'center', gap:12, width:'100%', border:'none', textAlign:'left', padding:'9px 14px', borderRadius:10, cursor:'pointer', fontSize:14.4, fontWeight:600, lineHeight:1.3, background: active ? 'var(--primary-tint)' : 'transparent', color: active ? 'var(--primary)' : 'var(--muted)', transition:'all .15s ease' }}>
                <span aria-hidden style={{ width:26, height:26, borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flex:'none', background: active ? 'var(--primary)' : (s.ok ? '#EAF6EF' : 'var(--surface)'), color: active ? '#fff' : (s.ok ? '#2E9E6B' : 'var(--muted)'), border:'1.5px solid ' + (active ? 'var(--primary)' : (s.ok ? '#BFE3CE' : '#D5DBE6')), transition:'all .15s ease' }}>{s.ok && !active ? <Icon d="M20 6L9 17l-5-5" size={11} sw={3} /> : i + 1}</span>
                <span style={{ flex:1, minWidth:0, overflowWrap:'break-word' }}>{s.label}</span>
                {saved[s.k] && <span aria-label="Saved" title="Saved" style={{ width:8, height:8, borderRadius:'50%', flex:'none', background:'#2E9E6B' }} />}
              </button>
            )
          })}
        </nav>
        <div key={view} style={{ flex:1, minWidth:0, maxHeight:'min(70vh, 760px)', overflowY:'auto', overflowX:'hidden', padding:'22px 28px 26px' }}>
          <div style={{ marginBottom:20, paddingBottom:14, borderBottom:'1px solid var(--border)' }}>
            <h4 style={{ fontSize:17, fontWeight:600, color:'var(--ink)', margin:0 }}>{cur.label}</h4>
            <p style={{ fontSize:12.8, color:'var(--muted)', margin:'3px 0 0' }}>{cur.desc}</p>
          </div>
          {view === 'database' && <div style={grid}>
            <Radio id="dbServerType" label="Server Type" options={['Perpetual', 'Cloud']} full />
            {dbCloud ? <Txt id="dbConfigUrl" label="Configuration URL" ph="https://…" full /> : <React.Fragment>
              <Txt id="dbHost" label="Host" ph="db.internal.example.com" />
              <Txt id="dbPort" label="Port" ph="5432" num />
              <Txt id="dbUser" label="User Name" ph="saras_app" />
              <Pw id="dbPass" label="Password" ph="Database password" />
              <Txt id="dbName" label="Database" ph="saras_one" />
              <Txt id="dbSearchPath" label="Search Path" ph="public" />
              <Txt id="dbAppName" label="Application Name" ph="SARAS One Console" full />
            </React.Fragment>}
          </div>}
          {view === 'cache' && <div style={grid}>
            <Dd id="cacheProvider" label="Provider" options={['Memory', 'Redis', 'Memcache', 'NCache']} />
            <Radio id="cacheEnabled" label="Enabled" options={['true', 'false']} />
            <Txt id="cacheConn" label="Connection String" ph="redis://…" full />
            <Txt id="cacheKeyPrefix" label="Key Prefix" ph="saras:" />
            <Txt id="cacheTtl" label="Default TTL Value" ph="300" num />
          </div>}
          {view === 'rsa' && <div style={grid}>
            <p style={{ gridColumn:'1 / -1', fontSize:12.8, color:'var(--muted)', margin:0 }}>Signing key pair used for token issuance. Keys are provisioned by the platform operator.</p>
            <KeyRow name="Private Key" file="rsa-private.pem" ok={true} />
            <KeyRow name="Public Key" file="rsa-public.pem" ok={false} />
          </div>}
          {view === 'logging' && <div style={grid}>
            <Dd id="logProvider" label="Provider" options={['None', 'MongoDB', 'OpenTelemetry', 'Both']} />
            <Txt id="logMinLevel" label="Minimum Level" ph="Information" />
            {showMongo && <React.Fragment>
              <Head t="MongoDB" />
              <Txt id="logMongoConn" label="Connection String" ph="mongodb://…" full />
              <Txt id="logMongoDb" label="Database" ph="saras_logs" />
              <Txt id="logMongoColl" label="Collection" ph="app_logs" />
              <Txt id="logQueueCap" label="Queue Capacity" ph="10000" num />
              <Txt id="logBatchSize" label="Batch Size" ph="100" num />
              <Txt id="logFlush" label="Flush Interval" ph="5" num />
              <Txt id="logRetry" label="Retry Count" ph="3" num />
            </React.Fragment>}
          </div>}
          {view === 'storage' && <div style={grid}>
            <Dd id="storProvider" label="Provider" options={['AWS S3', 'Azure BLOB', 'MinIO']} />
            <Txt id="storContainer" label="Container Name" ph="saras-one-files" />
            <Txt id="storRegion" label="Region" ph="ap-south-1" />
            <Txt id="storEndpoint" label="End Point" ph="https://minio.internal:9000" />
            <Txt id="storAccessKey" label="Access Key" ph="AKIA…" />
            <Pw id="storSecretKey" label="Secret Key" ph="Secret key" />
            <Txt id="storConn" label="Connection String" ph="Endpoint=…;AccessKey=…;SecretKey=…" full />
          </div>}
          {view === 'notification' && <div>
            <div role="tablist" aria-label="Notification channels" style={{ display:'flex', width:'fit-content', maxWidth:'100%', overflowX:'auto', background:'var(--surface-page)', border:'1px solid var(--border)', borderRadius:10, padding:3, gap:2, marginBottom:18 }}>
              {notifTabs.map(([k, lbl]) => <button key={k} type="button" role="tab" aria-selected={notifTab === k} onClick={() => setNotifTab(k)} style={{ flex:'none', whiteSpace:'nowrap', border:'none', borderRadius:8, padding:'7px 11px', fontSize:12.4, fontWeight:600, cursor:'pointer', background: notifTab === k ? '#fff' : 'transparent', color: notifTab === k ? 'var(--primary)' : 'var(--muted)', boxShadow: notifTab === k ? '0 1px 3px rgba(16,42,84,.14)' : 'none', transition:'all .15s ease' }}>{lbl}</button>)}
            </div>
            {notifTab === 'smtp' && <div style={grid}>
              <Txt id="smtpProvider" label="Provider" ph="Amazon SES, SendGrid, Microsoft 365…" />
              <Txt id="smtpFromEmail" label="From Email Address" ph="noreply@example.com" />
              <Txt id="smtpFromName" label="From Display Name" ph="SARAS One" />
              <Txt id="smtpHost" label="SMTP Host" ph="smtp.example.com" />
              <Txt id="smtpPort" label="SMTP Port" ph="587" num />
              <Txt id="smtpUser" label="Username" ph="smtp-user" />
              <Pw id="smtpPass" label="Password" ph="SMTP password" />
              <Radio id="smtpSsl" label="Enable SSL" options={['Yes', 'No']} />
            </div>}
            {notifTab === 'ses' && <div style={grid}>
              <Txt id="sesProviderName" label="Provider Name" ph="AWS SES" />
              <Txt id="sesProviderType" label="Provider Type" ph="REST API" />
              <Txt id="sesEndpoint" label="API Endpoint" ph="https://email.us-east-1.amazonaws.com" full />
              <Txt id="sesRegion" label="AWS Region" ph="us-east-1" />
              <Txt id="sesAccessKey" label="Access Key ID" ph="AKIA…" />
              <Pw id="sesSecretKey" label="Secret Access Key" ph="Secret access key" />
              <Txt id="sesConfigSet" label="Configuration Set Name" ph="default" />
            </div>}
            {notifTab === 'sms' && <div style={grid}>
              <Txt id="smsProviderName" label="Provider Name" ph="AWS SNS" />
              <Txt id="smsProviderType" label="Provider Type" ph="REST API" />
              <Txt id="smsEndpoint" label="API Endpoint" ph="https://sns.ap-south-1.amazonaws.com" full />
              <Txt id="smsRegion" label="Region" ph="ap-south-1" />
              <Txt id="smsAccessKey" label="Access Key ID" ph="AKIA…" />
              <Pw id="smsSecretKey" label="Secret Access Key" ph="Secret access key" />
              <Txt id="smsSenderId" label="Sender ID" ph="SARAS1" />
              <Txt id="smsType" label="SMS Type" ph="Transactional" />
              <Txt id="smsConfigName" label="Configuration Name" ph="default" />
            </div>}
            {notifTab === 'wa' && <div style={grid}>
              <Txt id="waProviderName" label="Provider Name" ph="Meta Cloud API" />
              <Txt id="waProviderType" label="Provider Type" ph="REST API" />
              <Txt id="waEndpoint" label="API Endpoint" ph="https://graph.facebook.com/v19.0" full />
              <Dd id="waAuth" label="Authentication Method" options={['Bearer Token', 'Oauth 2.0', 'API Key']} />
              <Pw id="waToken" label="Access Token" ph="Access token" />
              <Txt id="waAppId" label="App ID" ph="1234567890" />
              <Pw id="waAppSecret" label="App Secret" ph="App secret" />
              <Txt id="waBizId" label="Business Account ID" ph="Business account ID" />
              <Txt id="waPhoneId" label="Phone Number ID" ph="Phone number ID" />
              <Txt id="waNumber" label="WhatsApp Number" ph="+91 98765 43210" />
              <Txt id="waDisplayName" label="Display Name" ph="SARAS One" />
              <Txt id="waMsgType" label="Message Type" ph="template" />
              <Txt id="waWebhook" label="Webhook" ph="https://api.example.com/webhooks/whatsapp" full />
            </div>}
          </div>}
          {view === 'mfa' && <div style={grid}>
            <SwitchRow id="mfaEnabled" label="Enabled" hint="Require multi-factor authentication for this tenant." />
            <Txt id="mfaLifetime" label="Challenging Lifetime" ph="300" num />
            <Txt id="mfaMaxAttempts" label="Maximum Attempts" ph="5" num />
            <Txt id="mfaIssuer" label="Issuer" ph="SARAS One" full />
            <Head t="TOTP" />
            <SwitchRow id="totpEnabled" label="Enabled" hint="Time-based one-time passwords via authenticator apps." />
            <Txt id="totpDigits" label="Digits" ph="6" num />
            <Txt id="totpPeriod" label="Period in seconds" ph="30" num />
            <Txt id="totpDrift" label="Allowed Time drift windows" ph="1" num />
            <Head t="Recovery codes" />
            <Txt id="rcCount" label="No of Codes" ph="10" num />
            <Txt id="rcBytes" label="Bytes Per Code" ph="8" num />
          </div>}
          {view === 'scheduler' && <div style={grid}>
            <Dd id="schedProvider" label="Provider" options={['Hangfire', 'Quartz']} />
            <Dd id="schedEnabled" label="Enabled" options={['Yes', 'No']} />
            <Txt id="schedConn" label="Connection String" ph="Host=pg.internal;Database=saras_jobs;…" full />
            <Txt id="schedSchema" label="Schema" ph="quartz" />
            <Txt id="schedWorkers" label="Worker Processes Count" ph="2" num />
          </div>}
          {view === 'passwordHash' && <div style={grid}>
            <Dd id="phProvider" label="Provider" options={['Argon']} />
            <Radio id="phUsePepper" label="Use Pepper" options={['yes', 'no']} />
            <Txt id="phMemory" label="MemorySize in KB" ph="65536" num />
            <Txt id="phIterations" label="Iterations" ph="3" num />
            <Txt id="phParallelism" label="Degree of Parallelism" ph="2" num />
            <Txt id="phHashLen" label="Hash Length" ph="32" num />
            <Txt id="phSaltLen" label="Salt Length" ph="16" num />
            {cfg.phUsePepper === 'yes' && <Txt id="phPepperId" label="Pepper ID" ph="pepper-v1" />}
            <Txt id="phMaxLen" label="Maximum Password length" ph="128" num />
            <Txt id="phVersion" label="Version" ph="19" />
          </div>}
          {view === 'social' && <div>
            <div role="tablist" aria-label="Social providers" style={{ display:'flex', width:'fit-content', maxWidth:'100%', overflowX:'auto', background:'var(--surface-page)', border:'1px solid var(--border)', borderRadius:10, padding:3, gap:2, marginBottom:18 }}>
              {socTabs.map(([k, lbl]) => <button key={k} type="button" role="tab" aria-selected={socTab === k} onClick={() => setSocTab(k)} style={{ flex:'none', display:'inline-flex', alignItems:'center', gap:7, whiteSpace:'nowrap', border:'none', borderRadius:8, padding:'7px 11px', fontSize:12.4, fontWeight:600, cursor:'pointer', background: socTab === k ? '#fff' : 'transparent', color: socTab === k ? 'var(--primary)' : 'var(--muted)', boxShadow: socTab === k ? '0 1px 3px rgba(16,42,84,.14)' : 'none', transition:'all .15s ease' }}>{lbl}{tabSaved['soc_' + k] != null && <span aria-label="Saved" style={{ width:7, height:7, borderRadius:'50%', background:'#2E9E6B' }} />}</button>)}
            </div>
            {socTabs.filter(([k]) => k === socTab).map(([k, lbl]) => <div key={k} style={grid}>
              {jsonEditor('soc_' + k + '_json', k + '.json', lbl, socDefJson(k))}
            </div>)}
          </div>}
          {view === 'federation' && <div>
            <div role="tablist" aria-label="Identity providers" style={{ display:'flex', width:'fit-content', maxWidth:'100%', overflowX:'auto', background:'var(--surface-page)', border:'1px solid var(--border)', borderRadius:10, padding:3, gap:2, marginBottom:18 }}>
              {fedTabs.map(([k, lbl]) => <button key={k} type="button" role="tab" aria-selected={fedTab === k} onClick={() => setFedTab(k)} style={{ flex:'none', display:'inline-flex', alignItems:'center', gap:7, whiteSpace:'nowrap', border:'none', borderRadius:8, padding:'7px 11px', fontSize:12.4, fontWeight:600, cursor:'pointer', background: fedTab === k ? '#fff' : 'transparent', color: fedTab === k ? 'var(--primary)' : 'var(--muted)', boxShadow: fedTab === k ? '0 1px 3px rgba(16,42,84,.14)' : 'none', transition:'all .15s ease' }}>{lbl}{tabSaved['fed_' + k] != null && <span aria-label="Saved" style={{ width:7, height:7, borderRadius:'50%', background:'#2E9E6B' }} />}</button>)}
            </div>
            {fedTabs.filter(([k]) => k === fedTab).map(([k, lbl]) => <div key={k} style={grid}>
              {jsonEditor('fed_' + k + '_json', k + '.json', lbl, fedDefJson(k))}
            </div>)}
          </div>}
          {view === 'intake' && <div>
            <div role="tablist" aria-label="Data intake connectors" style={{ display:'flex', width:'fit-content', maxWidth:'100%', overflowX:'auto', background:'var(--surface-page)', border:'1px solid var(--border)', borderRadius:10, padding:3, gap:2, marginBottom:18 }}>
              {intTabs.map(([k, lbl]) => <button key={k} type="button" role="tab" aria-selected={intTab === k} onClick={() => setIntTab(k)} style={{ flex:'none', display:'inline-flex', alignItems:'center', gap:7, whiteSpace:'nowrap', border:'none', borderRadius:8, padding:'7px 11px', fontSize:12.4, fontWeight:600, cursor:'pointer', background: intTab === k ? '#fff' : 'transparent', color: intTab === k ? 'var(--primary)' : 'var(--muted)', boxShadow: intTab === k ? '0 1px 3px rgba(16,42,84,.14)' : 'none', transition:'all .15s ease' }}>{lbl}{tabSaved['int_' + k] != null && <span aria-label="Saved" style={{ width:7, height:7, borderRadius:'50%', background:'#2E9E6B' }} />}</button>)}
            </div>
            {intTabs.filter(([k]) => k === intTab).map(([k, lbl]) => <div key={k} style={grid}>
              {jsonEditor('int_' + k + '_json', k + '-connector.json', lbl, intDefJson(k))}
            </div>)}
          </div>}
          {view === 'lifecycle' && <div style={grid}>
            <p style={{ gridColumn:'1 / -1', fontSize:12.8, color:'var(--muted)', margin:'0 0 2px' }}>Each rule runs as a scheduled job. Enable a rule and set the number of days after which it applies.</p>
            <PolicyRow onId="alpInvitedOn" daysId="alpInvitedDays" code="suspend_invited_accounts" label="Inactivate account if the account status is Invited" daysLabel="After days" />
            <PolicyRow onId="alpNotifyOn" daysId="alpNotifyDays" code="last_login_notification" label="Send a notification after a prolonged period of inactivity" daysLabel="After inactive days" />
            <PolicyRow onId="alpInactiveOn" daysId="alpInactiveDays" code="last_login_suspension" label="Inactivate the account after a prolonged period of inactivity" daysLabel="After inactive days" />
          </div>}
        </div>
      </div>
    </Modal>
  )
}
