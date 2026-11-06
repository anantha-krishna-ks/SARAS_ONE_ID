import React, { useState } from 'react'
import { PageHead, S, Icon, MiniSwitch } from '../ui'
import { roles, users } from '../data'

const _me = users.find(u => u.login === 'anita.k') || users[0]
const ME = { name:_me.name, initials:_me.initials || 'AK', email:_me.email, login:_me.login, designation:_me.designation, tenant:_me.tenant, role:_me.role, status:_me.status, type:_me.type || 'Human', phone:'+91 98450 12345', created:'12 Mar 2024', lastLogin:_me.last, mfa:true }

const PROVIDERS = [
  { k:'Microsoft', group:'Social', ini:'MS', desc:'Sign in with your Microsoft personal account.' },
  { k:'Google', group:'Social', ini:'G', desc:'Sign in with your Google account.' },
  { k:'Meta', group:'Social', ini:'M', desc:'Sign in with Facebook / Meta.' },
  { k:'Apple', group:'Social', ini:'A', desc:'Sign in with Apple ID.' },
  { k:'Microsoft Entra ID', group:'Enterprise', ini:'ME', desc:'Workforce single sign-on via Entra ID.' },
  { k:'Okta', group:'Enterprise', ini:'OK', desc:'Federated sign-on through Okta.' },
]

const ProviderLogo = ({ k, size = 22 }) => {
  const s = { width:size, height:size, display:'block' }
  if (k === 'Microsoft') return <svg viewBox="0 0 24 24" style={s} aria-hidden="true"><rect x="2" y="2" width="9.5" height="9.5" fill="#F25022"/><rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00"/><rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF"/><rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900"/></svg>
  if (k === 'Google') return <svg viewBox="0 0 24 24" style={s} aria-hidden="true"><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.1 3.5-8.7z"/><path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.2v3.1C3.3 21.4 7.3 24 12 24z"/><path fill="#FBBC05" d="M5.3 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.2C.4 8.2 0 10 0 12s.4 3.8 1.2 5.4l4.1-3.1z"/><path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.3 0 3.3 2.6 1.2 6.6l4.1 3.1c.9-2.9 3.6-4.9 6.7-4.9z"/></svg>
  if (k === 'Meta') return <svg viewBox="0 0 24 24" style={s} aria-hidden="true"><path fill="#0866FF" d="M6.9 5C4.2 5 1.5 8.7 1.5 13.1c0 2.9 1.3 4.9 3.5 4.9 1.6 0 2.7-1 4.2-3.4l1.6-2.7 1.4 2.4c1.8 3 2.9 3.7 4.4 3.7 2.2 0 3.9-1.9 3.9-5.3C20.5 8.5 18 5 15.3 5c-1.9 0-3.3 1.3-4.6 3.3L9.9 9.5 8.9 7.9C7.9 6.3 7.2 5 6.9 5zm-.1 2.5c.4 0 1 .9 1.9 2.4l.7 1.2-1.2 2c-1.1 1.8-1.7 2.4-2.6 2.4-.9 0-1.5-.9-1.5-2.4C4.1 10.3 5.6 7.5 6.8 7.5zm8.4 0c1.4 0 3 2.6 3 5.6 0 1.6-.5 2.4-1.3 2.4-.7 0-1.2-.4-2.4-2.4l-1.5-2.5.6-1c.7-1.2 1.1-2.1 1.6-2.1z"/></svg>
  if (k === 'Apple') return <svg viewBox="0 0 24 24" style={s} aria-hidden="true"><path fill="#000" d="M16.4 12.7c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1.9-4 2.4-1.7 3-.4 7.3 1.2 9.7.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8 0 0-2.5-1-2.5-3.9zM14.1 5.6c.7-.8 1.1-1.9 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z"/></svg>
  if (k === 'Microsoft Entra ID') return <svg viewBox="0 0 24 24" style={s} aria-hidden="true"><path fill="#225086" d="M12 2 2.5 13.2 12 22z"/><path fill="#6DF" d="M12 2v20l9.5-8.8z"/><path fill="#0078D4" d="M2.5 13.2 12 15.6l9.5-2.4L12 22z"/><path fill="#50E6FF" d="M2.5 13.2 12 8.8l9.5 4.4-9.5 2.4z"/></svg>
  if (k === 'Okta') return <svg viewBox="0 0 24 24" style={s} aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#007DC1"/><circle cx="12" cy="12" r="4.4" fill="#fff"/></svg>
  return null
}
const Card = ({ title, sub, icon, children, action }) => (
  <section style={{ ...S.card, overflow:'visible' }} aria-label={title}>
    <div style={{ ...S.cardHead, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
      <span style={{ display:'flex', alignItems:'center', gap:11, minWidth:0 }}>
        <span aria-hidden style={{ display:'inline-flex', width:34, height:34, borderRadius:9, alignItems:'center', justifyContent:'center', flex:'none', background:'var(--primary-tint)', color:'var(--primary)' }}><Icon d={icon} size={16} sw={1.9} /></span>
        <span style={{ display:'flex', flexDirection:'column', gap:1, minWidth:0 }}>
          <span style={{ fontSize:15, fontWeight:600, color:'var(--ink)' }}>{title}</span>
          {sub && <span style={{ fontSize:12.2, color:'var(--muted)' }}>{sub}</span>}
        </span>
      </span>
      {action}
    </div>
    {children}
  </section>
)

const Detail = ({ label, value, icon, mono }) => (
  <div style={{ display:'flex', alignItems:'flex-start', gap:12, minWidth:0, padding:'14px 16px', background:'var(--surface)', outline:'1px solid var(--border)', outlineOffset:0 }}>
    <span aria-hidden style={{ display:'inline-flex', width:32, height:32, borderRadius:8, alignItems:'center', justifyContent:'center', flex:'none', background:'var(--primary-tint)', color:'var(--primary)' }}><Icon d={icon} size={15} sw={1.9} /></span>
    <span style={{ display:'flex', flexDirection:'column', gap:3, minWidth:0, flex:1 }}>
      <span style={{ fontSize:11.2, fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)', lineHeight:1.3 }}>{label}</span>
      <span style={{ fontSize:13.8, fontWeight:500, color:'var(--ink)', lineHeight:1.4, fontFamily: mono ? 'ui-monospace,SFMono-Regular,Menlo,monospace' : 'inherit', overflowWrap:'anywhere', textWrap:'pretty' }}>{value}</span>
    </span>
  </div>
)

export function MyProfile({ toast }) {
  const [role, setRole] = useState(ME.role)
  const [defRole, setDefRole] = useState(ME.role)
  const [pick, setPick] = useState(null) // 'current' | 'default'
  const [pending, setPending] = useState(null)
  const [alsoDefault, setAlsoDefault] = useState(false)
  const [conn, setConn] = useState({ 'Microsoft': { on:true, id:'anita.k@outlook.com', at:'14 Aug 2026' }, 'Google': null, 'Meta': null, 'Apple': null, 'Microsoft Entra ID': { on:true, id:'anita.k@excelsoftcorp.com', at:'12 Mar 2024' }, 'Okta': null })
  const [busy, setBusy] = useState(null)

  const available = roles.filter(r => r.status === 'Active')
  const curRole = roles.find(r => r.name === role)
  const defRoleObj = roles.find(r => r.name === defRole)
  const closePick = () => { setPick(null); setPending(null); setAlsoDefault(false) }
  const applyRole = () => {
    if (pick === 'current') { setRole(pending); if (alsoDefault) setDefRole(pending); toast('Switched to ' + pending + (alsoDefault ? ' and set as default.' : ' for this session.'), 'success') }
    else { setDefRole(pending); toast('Default role set to ' + pending + '.', 'success') }
    closePick()
  }
  const setCurrentAsDefault = () => { setDefRole(role); toast(role + ' is now your default role.', 'success') }
  const revertToDefault = () => { setRole(defRole); toast('Reverted to default role ' + defRole + '.', 'success') }

  const connect = (p) => {
    setBusy(p.k)
    setTimeout(() => {
      setConn(c => ({ ...c, [p.k]: { on:true, id: p.group === 'Enterprise' ? ME.email : ME.login + '@' + p.k.toLowerCase().replace(/\s.*/, '') + '.com', at:'Today' } }))
      setBusy(null); toast(p.k + ' connected to your account.', 'success')
    }, 900)
  }
  const remove = (p) => { setConn(c => ({ ...c, [p.k]: null })); toast(p.k + ' disconnected.', 'success') }
  const connectedCount = Object.values(conn).filter(Boolean).length

  return (
    <div style={{ animation:'fadeUp .28s ease', display:'flex', flexDirection:'column', gap:18 }}>
      <PageHead title="My Profile" sub="Your account details, role and sign-in methods." />

      <section style={{ ...S.card, overflow:'hidden' }} aria-label="Profile summary">
        <div style={{ display:'flex', alignItems:'center', gap:18, padding:'22px 22px 20px', flexWrap:'wrap', background:'linear-gradient(180deg, var(--primary-tint) 0%, var(--surface) 100%)' }}>
          <span aria-hidden style={{ width:64, height:64, borderRadius:'50%', flex:'none', background:'linear-gradient(145deg,#1a86f0,#0a4a8c)', color:'#fff', fontSize:22, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 6px 16px -6px rgba(10,74,140,.5), 0 0 0 4px var(--surface)' }}>{ME.initials}</span>
          <div style={{ display:'flex', flexDirection:'column', gap:4, minWidth:0, flex:1 }}>
            <span style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
              <span style={{ fontSize:19, fontWeight:600, color:'var(--ink)' }}>{ME.name}</span>
              <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11.5, fontWeight:700, padding:'3px 10px', borderRadius:999, background:'#E7F6EE', color:'#1F7A4D' }}><span style={{ width:6, height:6, borderRadius:'50%', background:'#2E9E6B' }} />{ME.status}</span>
              {ME.mfa && <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:11.5, fontWeight:700, padding:'3px 10px', borderRadius:999, background:'var(--primary-tint)', color:'var(--on-tint-blue)' }}><Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4" size={12} sw={2.2} />MFA on</span>}
            </span>
            <span style={{ fontSize:13.4, color:'var(--muted)' }}>{ME.designation} · {ME.tenant}</span>
            <span style={{ fontSize:13, color:'var(--muted)' }}>{ME.email}</span>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            <button data-ix="ghost" onClick={() => toast('Password reset link sent to ' + ME.email + '.', 'success')} style={S.ghost}><Icon d="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0" />Change password</button>
            <button data-ix="primary" onClick={() => toast('Profile edit coming soon.', 'success')} style={S.primary}><Icon d="M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />Edit profile</button>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap:1, padding:1, borderTop:'1px solid var(--border)', background:'var(--border)' }}>
          <Detail label="Login ID" value={ME.login} mono icon="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          <Detail label="Email" value={ME.email} icon="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M22 6l-10 7L2 6" />
          <Detail label="Phone" value={ME.phone} icon="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
          <Detail label="Account type" value={ME.type} icon="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5z" />
          <Detail label="Tenant" value={ME.tenant} icon="M3 21h18 M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16 M9 7h4 M9 11h4 M9 15h4" />
          <Detail label="Designation" value={ME.designation} icon="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <Detail label="Member since" value={ME.created} icon="M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18" />
          <Detail label="Last login" value={ME.lastLogin} icon="M12 8v4l3 3 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
        </div>
      </section>

      <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
        <Card title="Roles" sub="Current role applies to this session; default role is loaded at every sign-in." icon="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5z M9 12l2 2 4-4"
          action={role !== defRole && !pick && <button data-ix="ghost" onClick={revertToDefault} style={{ ...S.ghost, height:38, fontSize:13 }}><Icon d="M3 12a9 9 0 1 0 2.64-6.36 M3 3v6h6" size={14} />Revert to default</button>}>
          <div style={{ padding:'16px 18px', display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap:12 }}>
              {[
                { kind:'current', label:'Current role', name:role, r:curRole, hint: role === defRole ? 'Same as your default role.' : 'Temporary — resets to default at next sign-in.', icon:'M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5z' },
                { kind:'default', label:'Default role', name:defRole, r:defRoleObj, hint:'Assigned automatically on every sign-in.', icon:'M12 17.3l-6.2 3.3 1.2-6.9L2 8.8l6.9-1L12 1.5l3.1 6.3 6.9 1-5 4.9 1.2 6.9z' },
              ].map(t => {
                const active = pick === t.kind
                return (
                  <div key={t.kind} style={{ display:'flex', flexDirection:'column', gap:12, padding:'14px 16px', borderRadius:12, background: t.kind === 'current' ? 'linear-gradient(180deg, var(--primary-tint), rgba(230,240,252,.4))' : 'var(--surface)', border:'1.5px solid ' + (active ? 'var(--primary)' : t.kind === 'current' ? 'var(--border-blue)' : 'var(--border)') }}>
                    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                      <span aria-hidden style={{ display:'inline-flex', width:44, height:44, borderRadius:11, alignItems:'center', justifyContent:'center', flex:'none', background: t.kind === 'current' ? 'var(--primary)' : 'var(--primary-tint)', color: t.kind === 'current' ? '#fff' : 'var(--primary)' }}><Icon d={t.icon} size={20} sw={1.9} /></span>
                      <span style={{ display:'flex', flexDirection:'column', gap:3, minWidth:0, flex:1 }}>
                        <span style={{ fontSize:11.2, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--primary)' }}>{t.label}</span>
                        <span style={{ fontSize:15.5, fontWeight:600, color:'var(--ink)' }}>{t.name}</span>
                        {t.r && <span style={{ fontSize:12.4, color:'var(--muted)' }}>{t.r.code} · {t.r.scope} scope · {t.r.privs} privileges</span>}
                      </span>
                    </div>
                    <span style={{ fontSize:12.2, color:'var(--muted)' }}>{t.hint}</span>
                    {!pick && (
                      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                        <button data-ix="ghost" onClick={() => { setPending(t.name); setPick(t.kind) }} style={{ ...S.ghost, height:36, fontSize:12.6, padding:'0 12px', borderRadius:9 }}><Icon d="M17 1l4 4-4 4 M3 11V9a4 4 0 0 1 4-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 0 1-4 4H3" size={14} />Change</button>
                        {t.kind === 'current' && role !== defRole && <button data-ix="ghost" onClick={setCurrentAsDefault} style={{ ...S.ghost, height:36, fontSize:12.6, padding:'0 12px', borderRadius:9 }}><Icon d="M12 17.3l-6.2 3.3 1.2-6.9L2 8.8l6.9-1L12 1.5l3.1 6.3 6.9 1-5 4.9 1.2 6.9z" size={14} />Set as default</button>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            {pick && (
              <div style={{ display:'flex', flexDirection:'column', gap:10, animation:'fadeUp .22s ease' }}>
                <span style={{ fontSize:12.6, fontWeight:600, color:'var(--ink)' }}>{pick === 'current' ? 'Switch role for this session' : 'Choose the role to load at every sign-in'}</span>
                <div role="radiogroup" aria-label="Available roles" style={{ display:'flex', flexDirection:'column', gap:6, maxHeight:280, overflowY:'auto', paddingRight:2 }}>
                  {available.map(r => {
                    const sel = pending === r.name
                    const tag = r.name === role && r.name === defRole ? 'Current · Default' : r.name === role ? 'Current' : r.name === defRole ? 'Default' : null
                    return (
                      <button key={r.code} role="radio" aria-checked={sel} data-ix="opt" onClick={() => setPending(r.name)} style={{ display:'flex', alignItems:'center', gap:12, textAlign:'left', padding:'10px 12px', borderRadius:10, border:'1.5px solid ' + (sel ? 'var(--primary)' : 'var(--border)'), background: sel ? 'var(--primary-tint)' : 'var(--surface)', fontFamily:'inherit', cursor:'pointer' }}>
                        <span aria-hidden style={{ width:18, height:18, borderRadius:'50%', flex:'none', border:'2px solid ' + (sel ? 'var(--primary)' : '#B9C4D4'), display:'flex', alignItems:'center', justifyContent:'center' }}>{sel && <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--primary)' }} />}</span>
                        <span style={{ display:'flex', flexDirection:'column', gap:1, minWidth:0, flex:1 }}>
                          <span style={{ fontSize:13.6, fontWeight:600, color:'var(--ink)' }}>{r.name}{tag && <span style={{ marginLeft:8, fontSize:10.5, fontWeight:700, padding:'1px 7px', borderRadius:999, background:'#EEF1F6', color:'var(--muted)' }}>{tag}</span>}</span>
                          <span style={{ fontSize:12, color:'var(--muted)' }}>{r.desc}</span>
                        </span>
                        <span style={{ fontSize:11.5, fontWeight:600, color:'var(--muted)', whiteSpace:'nowrap' }}>{r.scope}</span>
                      </button>
                    )
                  })}
                </div>
                {pick === 'current' && <label style={{ display:'flex', alignItems:'center', gap:10, fontSize:12.8, color:'var(--ink)', cursor:'pointer' }}><MiniSwitch on={alsoDefault} onToggle={() => setAlsoDefault(v => !v)} label="Also make this my default role" />Also make this my default role</label>}
                <div style={{ display:'flex', justifyContent:'flex-end', gap:8, paddingTop:4 }}>
                  <button data-ix="ghost" onClick={() => { setPick(null); setPending(null); setAlsoDefault(false) }} style={{ ...S.ghost, height:40 }}>Cancel</button>
                  <button data-ix="primary" disabled={!pending || pending === (pick === 'current' ? role : defRole)} onClick={applyRole} style={{ ...S.primary, height:40 }}>{pick === 'current' ? 'Switch role' : 'Save default'}</button>
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card title="Connect Authentication Providers" sub="Link external identities to sign in to SARAS One." icon="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          action={<span style={{ fontSize:11.5, fontWeight:700, padding:'3px 10px', borderRadius:999, background:'var(--primary-tint)', color:'var(--on-tint-blue)', whiteSpace:'nowrap' }}>{connectedCount} of {PROVIDERS.length} connected</span>}>
          <div style={{ padding:'10px 12px 14px', display:'flex', flexDirection:'column', gap:6 }}>
            {PROVIDERS.map(p => {
              const c = conn[p.k]
              const loading = busy === p.k
              return (
                <div key={p.k} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'11px 12px', borderRadius:11, border:'1px solid ' + (c ? 'var(--border-blue)' : 'var(--border)'), background: c ? 'var(--surface)' : 'var(--surface-page)', transition:'all .15s ease', flexWrap:'wrap' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:12, minWidth:0, flex:1 }}>
                    <span aria-hidden style={{ display:'inline-flex', width:40, height:40, borderRadius:10, alignItems:'center', justifyContent:'center', flex:'none', background:'#fff', border:'1px solid ' + (c ? 'var(--border-blue)' : 'var(--border)'), filter: c ? 'none' : 'grayscale(1) opacity(.6)', transition:'filter .2s ease' }}><ProviderLogo k={p.k} /></span>
                    <span style={{ display:'flex', flexDirection:'column', gap:2, minWidth:0 }}>
                      <span style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
                        <span style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)' }}>{p.k}</span>
                        <span style={{ fontSize:10.5, fontWeight:700, padding:'1px 7px', borderRadius:999, background:'#EEF1F6', color:'var(--muted)' }}>{p.group}</span>
                      </span>
                      {c
                        ? <span style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#1F7A4D', fontWeight:600, flexWrap:'wrap' }}><Icon d="M20 6L9 17l-5-5" size={12} sw={2.6} />Connected as <span style={{ fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', fontWeight:500, color:'var(--ink)' }}>{c.id}</span><span style={{ color:'var(--muted)', fontWeight:400 }}>· {c.at}</span></span>
                        : <span style={{ fontSize:12, color:'var(--muted)' }}>{loading ? 'Redirecting to ' + p.k + '…' : p.desc}</span>}
                    </span>
                  </span>
                  <span style={{ display:'flex', gap:6, flex:'none' }}>
                    {c ? (
                      <>
                        <button data-ix="ghost" onClick={() => { remove(p); setTimeout(() => connect(p), 200) }} style={{ ...S.ghost, height:36, fontSize:12.6, padding:'0 12px', borderRadius:9 }}><Icon d="M21 12a9 9 0 1 1-2.64-6.36 M21 3v6h-6" size={14} />Reconnect</button>
                        <button data-ix="dang" onClick={() => remove(p)} style={{ ...S.ghost, height:36, fontSize:12.6, padding:'0 12px', borderRadius:9, borderColor:'var(--border)', color:'var(--muted)' }}><Icon d="M18 6L6 18 M6 6l12 12" size={14} />Remove</button>
                      </>
                    ) : (
                      <button data-ix="primary" disabled={loading} onClick={() => connect(p)} style={{ ...S.primary, height:36, fontSize:12.8, padding:'0 14px', borderRadius:9 }}>{loading ? <span aria-hidden style={{ width:14, height:14, border:'2px solid rgba(255,255,255,.4)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin .7s linear infinite' }} /> : <Icon d="M12 5v14 M5 12h14" size={14} />}{loading ? 'Connecting' : 'Connect'}</button>
                    )}
                  </span>
                </div>
              )
            })}
            <p style={{ margin:'8px 4px 0', fontSize:12, color:'var(--muted)' }}>Only providers enabled for your tenant are listed. Local username &amp; password sign-in stays available.</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
