import React, { useState } from 'react'
import * as ReactDOM from 'react-dom'
import { PageHead, Icon, S } from '../ui'
import { tenants, licenses, userGrowth, tenantGrowth } from '../data'

const DASH_PAL = ['oklch(0.58 0.17 252)', 'oklch(0.42 0.13 256)', 'oklch(0.72 0.12 240)', 'oklch(0.85 0.07 236)']
const DASH_STATUS = { Active:'#16A34A', Suspended:'#DC2626', Provisioning:'#0070E0', Invited:'#5AA2EC', Locked:'#F59E0B' }
const DASH_TONES = { blue:['#4DA0F2', '#0070E0'], red:['#F37B7B', '#DC2626'], amber:['#FCC85A', '#F59E0B'], soft:['#BCD3EE', '#8DB1DC'] }
const DASH_KPI_GRID = `repeat(auto-fit, minmax(clamp(calc(25% - 12px), calc((848px - 100%) * 1000), clamp(calc(50% - 8px), calc((416px - 100%) * 1000), 100%)), 1fr))`
const DASH_ICON = {
  tenant:'M3 21h18 M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16 M9 7h4 M9 11h4 M9 15h4',
  users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  clock:'M12 6v6l4 2 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z',
  cal:'M8 2v4 M16 2v4 M3 9h18 M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z',
  key:'M21 2l-2 2 M15.5 7.5l3 3L22 7l-3-3 M11.39 11.61a5.5 5.5 0 1 1-7.78 7.78 5.5 5.5 0 0 1 7.78-7.78z M11.4 11.6L19 4',
  check:'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3',
  search:'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.35-4.35',
}
const dashFmt = n => Number(n).toLocaleString('en-US')
const dashK = v => v >= 1000 ? (v / 1000).toFixed(v % 1000 ? 1 : 0) + 'k' : String(v)
const dashDate = d => new Date(Date.now() + d * 864e5).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })
const dashMonths = () => { const out = [], now = new Date(); for (let i = 11; i >= 0; i--) out.push(new Date(now.getFullYear(), now.getMonth() - i, 1).toLocaleDateString('en-US', { month:'short' })); return out }
const dashDays = n => { const out = []; for (let i = n - 1; i >= 0; i--) out.push(new Date(Date.now() - i * 864e5).toLocaleDateString('en-GB', { day:'2-digit', month:'short' })); return out }
const dashToneText = d => d <= 7 ? '#B42318' : d <= 30 ? 'var(--warning-text)' : 'var(--success-text)'
const dashNice = (min, max, n = 4) => {
  const raw = (max - min || 1) / n, mag = Math.pow(10, Math.floor(Math.log10(raw)))
  const step = [1, 2, 2.5, 5, 10].find(s => s * mag >= raw) * mag
  const lo = Math.floor(min / step) * step, hi = Math.ceil(max / step) * step, ticks = []
  for (let v = lo; v <= hi + 1e-9; v += step) ticks.push(Math.round(v * 100) / 100)
  return { lo, hi, ticks }
}
const dashBarPath = (x, y, w, base, r) => { const rr = Math.min(r, w / 2, Math.max(0, base - y)); return `M${x} ${base}V${y + rr}Q${x} ${y} ${x + rr} ${y}H${x + w - rr}Q${x + w} ${y} ${x + w} ${y + rr}V${base}Z` }
const dashJump = id => {
  const el = document.getElementById(id); if (!el) return
  const m = document.getElementById('main'), sc = m && m.scrollHeight > m.clientHeight + 4 ? m : null
  if (sc) sc.scrollTo({ top: sc.scrollTop + el.getBoundingClientRect().top - sc.getBoundingClientRect().top - 12, behavior:'smooth' })
  else window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 80, behavior:'smooth' })
}

function useDashWidth(init = 560) {
  const ref = React.useRef(null)
  const [w, setW] = useState(init)
  React.useEffect(() => {
    const el = ref.current; if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(es => { const cw = Math.round(es[0].contentRect.width); if (cw > 0) setW(Math.max(220, cw)) })
    ro.observe(el); return () => ro.disconnect()
  }, [])
  return [ref, w]
}

const DASH_APP_LIST = [['Candidate Management', 'CM'], ['Test Delivery', 'TD'], ['Item Authoring & Test Bank', 'IA'], ['Remote Proctoring', 'RP'], ['eMarking', 'EM'], ['Test Construction', 'TC'], ['Learning Experience', 'LE'], ['Certification & Badging', 'CB'], ['Career Portal', 'CP']]
const DASH_APP_OFFS = [-12, 5, 16, 27, 44, 73, 118, 205, 296]
function dashAppLic(t) {
  const s = t.code.charCodeAt(0) + t.code.charCodeAt(1)
  return DASH_APP_LIST.map(([name, code], i) => ({ name, code, tenant:t.name, days: DASH_APP_OFFS[(i * 4 + s) % DASH_APP_OFFS.length] + ((s + i * 3) % 4) }))
}

function dashTenantStats(t) {
  const seed = t.code.charCodeAt(0) + t.code.charCodeAt(1) + t.code.charCodeAt(2)
  const factor = t.status === 'Active' ? 1 : t.status === 'Provisioning' ? 0.45 : 0.04
  const signins = Array.from({ length:14 }, (_, i) => Math.max(0, Math.round(t.users * factor * (0.42 + 0.16 * Math.sin((i + seed) / 1.6) + (((i + seed) % 7) >= 5 ? -0.2 : 0.05)))))
  const mix = t.status === 'Active' ? [0.86, 0.08, 0.04, 0.02] : t.status === 'Provisioning' ? [0.45, 0.5, 0, 0.05] : [0.02, 0, 0.98, 0]
  const status = ['Active', 'Invited', 'Suspended', 'Locked'].map((k, i) => ({ label:k, value:Math.round(t.users * mix[i]), color:DASH_STATUS[k] })).filter(p => p.value > 0)
  const rolesSplit = [['Tenant Admin', 0.02], ['Content Author', 0.18], ['Reviewer', 0.12], ['Candidate', 0.68]].map(([k, s], i) => ({ label:k, value:Math.max(1, Math.round(t.users * s)), color:DASH_PAL[i] }))
  const hr0 = new Date().getHours()
  const concurrent = Array.from({ length:24 }, (_, i) => { const h = (hr0 - 23 + i + 48) % 24, day = Math.max(0, Math.sin((h - 6) / 12 * Math.PI)); return Math.round(t.users * factor * (0.015 + 0.16 * day) * (0.9 + ((i + seed) % 5) * 0.05)) })
  const sent = Math.round(t.users * factor * 1.8) + 12
  const channels = [['Email', Math.round(sent * 0.012 * (1 + seed % 3))], ['SMS', Math.round(sent * 0.006 * (1 + seed % 2))], ['Push', seed % 4]].map(([label, value]) => ({ label, value }))
  const failed = channels.reduce((a, c) => a + c.value, 0)
  const reasons = []
  const sv = k => status.find(s => s.label === k)?.value || 0
  const mfaPct = 58 + (seed * 7) % 37
  const attention = [
    { k:'locked', label:'Locked accounts', hint:'Too many failed sign-in attempts', value:sv('Locked') + (seed % 3), tone:'#DC2626', icon:'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4' },
    { k:'invites', label:'Pending invites over 7 days', hint:'Invitation not yet accepted', value:Math.round(sv('Invited') * 0.6), tone:'#D97706', icon:'M4 4h16v16H4z M4 7l8 6 8-6' },
    { k:'mfa', label:'Accounts without MFA', hint:'Not enrolled in multi-factor authentication', value:Math.round(t.users * (100 - mfaPct) / 100), tone:'#D97706', icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { k:'pwd', label:'Passwords expiring in 7 days', hint:'Users will be prompted to reset', value:Math.round(t.users * factor * 0.03) + seed % 5, tone:'var(--primary)', icon:'M12 8v4l3 2 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z' },
    { k:'dormant', label:'Dormant accounts', hint:'No sign-in for 90+ days', value:Math.round(t.users * 0.06), tone:'var(--muted)', icon:'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z' },
  ].filter(a => a.value > 0)
  const failTotal = Math.round(t.users * factor * 0.35) + 6 + seed % 9
  const security = { failed:failTotal, lockouts:Math.round(failTotal * 0.08) + 1, blocked:Math.round(failTotal * 0.05), prev:Math.round(failTotal * (0.85 + (seed % 4) * 0.1)),
    reasons:[['Wrong password', 0.58], ['Expired password', 0.17], ['MFA not completed', 0.15], ['Unknown account', 0.1]].map(([label, s]) => ({ label, value:Math.round(failTotal * s) })) }
  const admins = t.code === 'EXA-01' ? ['Ravi Mohan', 'Priya Nair'] : ['Tenant Admin', 'Support Admin']
  const activity = [
    { who:admins[0], what:'reset MFA for', target:'3 accounts', area:'Accounts', when:'12 min ago' },
    { who:admins[0], what:'updated role', target:'Content Author', area:'Roles · 2 privileges added', when:'1 h ago' },
    { who:admins[1], what:'invited', target:'18 accounts', area:'Accounts · bulk import', when:'3 h ago' },
    { who:admins[0], what:'changed', target:'Password Policy', area:'Minimum length 10 → 12', when:'Yesterday' },
    { who:admins[1], what:'suspended', target:'' + (2 + seed % 3) + ' accounts', area:'Accounts', when:'2 days ago' },
  ]
  return { activity, signins, status, rolesSplit, mfa:mfaPct, active:status.find(s => s.label === 'Active')?.value || 0, concurrent, notif:{ sent, failed, channels, reasons }, attention, security }
}
const dashHours = () => { const out = [], h0 = new Date().getHours(); for (let i = 23; i >= 0; i--) out.push(String((h0 - i + 24) % 24).padStart(2, '0') + ':00'); return out }

function DashSection({ id, eyebrow, title, sub, action, children }) {
  return (
    <section id={id} aria-labelledby={id + '-h'} style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:32 }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:3, minWidth:0 }}>
          <span style={{ fontSize:12, fontWeight:600, letterSpacing:'.48px', textTransform:'uppercase', color:'var(--primary)' }}>{eyebrow}</span>
          <h2 id={id + '-h'} style={{ margin:0, fontSize:18, fontWeight:600, color:'var(--ink)' }}>{title}</h2>
          {sub && <span style={{ fontSize:12.5, color:'var(--muted)' }}>{sub}</span>}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

function DashCard({ title, sub, action, summary, children, style, glow }) {
  return (
    <div key={glow || undefined} style={{ ...S.card, display:'flex', flexDirection:'column', minWidth:0, ...style, ...(glow ? { animation:'dashGlow 1.8s ease-out .35s 1 both' } : null) }}>
      <div style={{ ...S.cardHead, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:2, minWidth:0 }}>
          <h3 style={{ fontSize:16, fontWeight:600, margin:0, color:'var(--ink)' }}>{title}</h3>
          {sub && <span style={{ fontSize:12.5, color:'var(--muted)' }}>{sub}</span>}
        </div>
        {action}
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>{children}</div>
      {summary && <p style={{ margin:0, padding:'10px 18px 14px', borderTop:'1px solid var(--border)', fontSize:12.5, color:'var(--muted)', textWrap:'pretty' }}>{summary}</p>}
    </div>
  )
}

function DashKpi({ label, value, sub, icon, tone, onClick, children }) {
  const t = tone === 'danger' ? { bg:'#FDECEC', color:'#B42318' } : tone === 'warn' ? { bg:'var(--amber-tint)', color:'var(--warning-text)' } : { bg:'var(--primary-tint)', color:'var(--on-tint-blue)' }
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag data-ix={onClick ? 'card' : undefined} onClick={onClick} style={{ ...S.card, width:'100%', textAlign:'left', fontFamily:'inherit', cursor: onClick ? 'pointer' : 'default', padding:'16px 18px', display:'flex', flexDirection:'column', gap:10, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <span aria-hidden="true" style={{ flex:'none', width:34, height:34, borderRadius:8, background:t.bg, color:t.color, display:'flex', alignItems:'center', justifyContent:'center' }}><Icon d={icon} size={17} /></span>
        <span style={{ fontSize:12, fontWeight:600, letterSpacing:'.48px', textTransform:'uppercase', color:'var(--muted)', lineHeight:1.3 }}>{label}</span>
      </div>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:12 }}>
        <span style={{ fontSize:28, fontWeight:600, lineHeight:1, color: tone === 'danger' ? '#B42318' : 'var(--ink)', fontVariantNumeric:'tabular-nums' }}>{value}</span>
        {children}
      </div>
      <span style={{ fontSize:12.5, color:'var(--muted)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
        <span>{sub}</span>
        {onClick && <Icon d="M5 12h14 M12 5l7 7-7 7" size={14} />}
      </span>
    </Tag>
  )
}

function DashTip({ x, y, W, title, value }) {
  return (
    <div style={{ position:'absolute', left:Math.min(Math.max(x, 72), W - 72), top:Math.max(y, 50), transform:'translate(-50%, -100%)', background:'#1A2740', color:'#fff', borderRadius:8, padding:'7px 11px', pointerEvents:'none', whiteSpace:'nowrap', boxShadow:'0 10px 24px -8px rgba(16,42,84,.5)', display:'flex', flexDirection:'column', gap:2, zIndex:2 }}>
      <span style={{ fontSize:11.5, color:'#C9D6EA' }}>{title}</span>
      <span style={{ fontSize:13, fontWeight:600 }}>{value}</span>
    </div>
  )
}

function DashSpark({ data }) {
  const W = 92, H = 30, max = Math.max(...data), min = Math.min(...data)
  const pts = data.map((v, i) => [i * W / (data.length - 1), H - 4 - (v - min) / (max - min || 1) * (H - 8)])
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" style={{ flex:'none', overflow:'visible' }}>
      <defs><linearGradient id="dashSparkFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#0070E0" stopOpacity=".25" /><stop offset="1" stopColor="#0070E0" stopOpacity="0" /></linearGradient></defs>
      <path d={d + ` L${W} ${H} L0 ${H} Z`} fill="url(#dashSparkFill)" />
      <path d={d} fill="none" stroke="#0070E0" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function DashArea({ data, labels, unit, h = 240, id }) {
  const [ref, W] = useDashWidth()
  const [hi, setHi] = useState(null)
  const H = h, pl = 44, pr = 16, pt = 18, pb = 30, base = H - pb
  const sc = dashNice(Math.min(...data) * 0.92, Math.max(...data), 4)
  const iw = W - pl - pr
  const x = i => pl + i * iw / (data.length - 1)
  const y = v => pt + (1 - (v - sc.lo) / (sc.hi - sc.lo)) * (base - pt)
  const line = data.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ')
  const every = Math.max(1, Math.ceil(data.length * 46 / iw))
  const step = iw / (data.length - 1)
  return (
    <div ref={ref} style={{ position:'relative', width:'100%' }} onMouseLeave={() => setHi(null)}>
      <svg width={W} height={H} role="img" aria-label={labels.map((l, i) => l + ' ' + data[i]).join(', ')} style={{ display:'block' }}>
        <defs>
          <linearGradient id={id + 'f'} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#0070E0" stopOpacity=".30" /><stop offset=".6" stopColor="#4DA0F2" stopOpacity=".10" /><stop offset="1" stopColor="#4DA0F2" stopOpacity="0" /></linearGradient>
          <linearGradient id={id + 's'} x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#4DA0F2" /><stop offset="1" stopColor="#0058C4" /></linearGradient>
          <filter id={id + 'g'} x="-5%" y="-40%" width="110%" height="180%"><feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0070E0" floodOpacity=".35" /></filter>
        </defs>
        {sc.ticks.map(v => <g key={v}><line x1={pl} x2={W - pr} y1={y(v)} y2={y(v)} stroke="#E4E9F0" strokeDasharray={v === sc.lo ? '' : '3 4'} /><text x={pl - 8} y={y(v) + 4} textAnchor="end" fontSize="12" fill="#5A6675">{dashK(v)}</text></g>)}
        <path d={line + ` L${x(data.length - 1)} ${base} L${x(0)} ${base} Z`} fill={`url(#${id}f)`} />
        <path d={line} fill="none" stroke={`url(#${id}s)`} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" filter={`url(#${id}g)`} />
        {hi !== null && <line x1={x(hi)} x2={x(hi)} y1={pt} y2={base} stroke="#0070E0" strokeOpacity=".3" strokeDasharray="3 3" />}
        {data.map((v, i) => (hi === i || i === data.length - 1) && <circle key={i} cx={x(i)} cy={y(v)} r={hi === i ? 5.5 : 4.5} fill="#fff" stroke="#0070E0" strokeWidth="2.5" />)}
        {labels.map((l, i) => i % every === 0 && <text key={i} x={x(i)} y={H - 9} textAnchor="middle" fontSize="12" fill={hi === i ? '#1A1E26' : '#5A6675'} fontWeight={hi === i ? 600 : 400}>{l}</text>)}
        {data.map((v, i) => <rect key={'h' + i} x={x(i) - step / 2} y={pt} width={step} height={base - pt} fill="transparent" onMouseEnter={() => setHi(i)} />)}
      </svg>
      {hi !== null && <DashTip x={x(hi)} y={y(data[hi]) - 12} W={W} title={labels[hi]} value={dashFmt(data[hi]) + ' ' + unit} />}
    </div>
  )
}

function DashBars({ data, labels, tips, tones, h = 220, unit = '', id }) {
  const [ref, W] = useDashWidth()
  const [hi, setHi] = useState(null)
  const H = h, pl = 38, pr = 8, pt = 18, pb = 30, base = H - pb
  const sc = dashNice(0, Math.max(1, ...data), 3)
  const iw = W - pl - pr, slot = iw / data.length, bw = Math.min(44, slot * 0.58)
  const y = v => pt + (1 - v / sc.hi) * (base - pt)
  const lw = Math.max(...labels.map(l => String(l).length)) * 6.5 + 8, every = Math.max(1, Math.ceil(data.length * lw / iw))
  return (
    <div ref={ref} style={{ position:'relative', width:'100%' }} onMouseLeave={() => setHi(null)}>
      <svg width={W} height={H} role="img" aria-label={labels.map((l, i) => l + ' ' + data[i]).join(', ')} style={{ display:'block' }}>
        <defs>
          {Object.entries(DASH_TONES).map(([k, c]) => <linearGradient key={k} id={id + k} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={c[0]} /><stop offset="1" stopColor={c[1]} /></linearGradient>)}
          <linearGradient id={id + 'gl'} x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#fff" stopOpacity=".32" /><stop offset=".45" stopColor="#fff" stopOpacity=".06" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
          <filter id={id + 'sh'} x="-40%" y="-20%" width="180%" height="150%"><feDropShadow dx="0" dy="4" stdDeviation="3.5" floodColor="#0B3A75" floodOpacity=".22" /></filter>
        </defs>
        {sc.ticks.map(v => <g key={v}><line x1={pl} x2={W - pr} y1={y(v)} y2={y(v)} stroke="#E4E9F0" strokeDasharray={v ? '3 4' : ''} /><text x={pl - 8} y={y(v) + 4} textAnchor="end" fontSize="12" fill="#5A6675">{dashK(v)}</text></g>)}
        {data.map((v, i) => {
          const bx = pl + i * slot + (slot - bw) / 2, by = v ? Math.min(y(v), base - 3) : base, tone = (tones && tones[i]) || 'blue'
          return (
            <g key={i} onMouseEnter={() => setHi(i)}>
              <rect x={pl + i * slot} y={pt} width={slot} height={base - pt} fill={hi === i ? 'rgba(0,112,224,.06)' : 'transparent'} />
              {v > 0 && <path d={dashBarPath(bx, by, bw, base, 6)} fill={`url(#${id}${tone})`} filter={`url(#${id}sh)`} opacity={hi === null || hi === i ? 1 : 0.55} />}
              {v > 0 && <path d={dashBarPath(bx, by, bw * 0.55, base, 6)} fill={`url(#${id}gl)`} pointerEvents="none" />}
              {i % every === 0 && <text x={pl + i * slot + slot / 2} y={H - 9} textAnchor="middle" fontSize="12" fill={hi === i ? '#1A1E26' : '#5A6675'} fontWeight={hi === i ? 600 : 400}>{labels[i]}</text>}
            </g>
          )
        })}
        <line x1={pl} x2={W - pr} y1={base} y2={base} stroke="#C9D3E0" />
      </svg>
      {hi !== null && <DashTip x={pl + hi * slot + slot / 2} y={y(data[hi]) - 10} W={W} title={tips ? tips[hi] : labels[hi]} value={dashFmt(data[hi]) + ' ' + unit} />}
    </div>
  )
}

function DashDonut({ parts, center, centerSub, id }) {
  const [hi, setHi] = useState(null)
  const total = parts.reduce((a, p) => a + p.value, 0) || 1, r = 52, c = 2 * Math.PI * r
  let acc = 0
  const cur = hi !== null ? parts[hi] : null
  return (
    <div style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap', padding:'18px 20px', flex:1 }}>
      <svg width="150" height="150" viewBox="0 0 140 140" role="img" aria-label={parts.map(p => p.label + ' ' + p.value).join(', ')} style={{ flex:'none', margin:'0 auto' }}>
        <defs><filter id={id + 'g'} x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0B3A75" floodOpacity=".18" /></filter></defs>
        <circle cx="70" cy="70" r={r} fill="none" stroke="#EEF2F7" strokeWidth="18" />
        <g filter={`url(#${id}g)`}>
          {parts.map((p, i) => { const len = p.value / total * c, off = acc; acc += len; return <circle key={p.label} cx="70" cy="70" r={r} fill="none" stroke={p.color} strokeWidth={hi === i ? 22 : 18} strokeDasharray={`${Math.max(0, len - 1.5)} ${c}`} strokeDashoffset={-off} transform="rotate(-90 70 70)" onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)} style={{ transition:'stroke-width .15s ease' }} /> })}
        </g>
        <circle cx="70" cy="70" r="40" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
        <text x="70" y="68" textAnchor="middle" fontSize="22" fontWeight="600" fill="#1A1E26">{cur ? dashFmt(cur.value) : center}</text>
        <text x="70" y="86" textAnchor="middle" fontSize="10.5" fill="#5A6675">{cur ? Math.round(cur.value / total * 100) + '% · ' + cur.label : centerSub}</text>
      </svg>
      <ul style={{ listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:9, flex:'1 1 150px', minWidth:0 }}>
        {parts.map((p, i) => (
          <li key={p.label} onMouseEnter={() => setHi(i)} onMouseLeave={() => setHi(null)} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13, color:'var(--ink)', opacity: hi === null || hi === i ? 1 : 0.5, transition:'opacity .15s' }}>
            <span aria-hidden="true" style={{ width:10, height:10, borderRadius:3, background:p.color, flex:'none' }} />
            <span style={{ flex:1, minWidth:0 }}>{p.label}</span>
            <span style={{ fontWeight:600, fontVariantNumeric:'tabular-nums' }}>{dashFmt(p.value)}</span>
            <span style={{ width:38, textAlign:'right', color:'var(--muted)', fontSize:12, fontVariantNumeric:'tabular-nums' }}>{Math.round(p.value / total * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DashGauge({ pct, id }) {
  const r = 60, c = Math.PI * r
  const tone = pct >= 80 ? ['#4DA0F2', '#0070E0'] : ['#FCC85A', '#F59E0B']
  return (
    <svg width="190" height="110" viewBox="0 0 150 86" role="img" aria-label={pct + '% MFA adoption'} style={{ display:'block', margin:'0 auto' }}>
      <defs>
        <linearGradient id={id + 'l'} x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor={tone[0]} /><stop offset="1" stopColor={tone[1]} /></linearGradient>
        <filter id={id + 'g'} x="-20%" y="-40%" width="140%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" floodColor={tone[1]} floodOpacity=".35" /></filter>
      </defs>
      <path d="M15 78 A60 60 0 0 1 135 78" fill="none" stroke="#EEF2F7" strokeWidth="14" strokeLinecap="round" />
      <path d="M15 78 A60 60 0 0 1 135 78" fill="none" stroke={`url(#${id}l)`} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${c * pct / 100} ${c}`} filter={`url(#${id}g)`} />
      <text x="75" y="70" textAnchor="middle" fontSize="24" fontWeight="600" fill="#1A1E26">{pct}%</text>
    </svg>
  )
}

function DashTabs({ value, options, onChange, label }) {
  return (
    <div role="tablist" aria-label={label} style={{ display:'flex', gap:4, borderBottom:'1px solid var(--border)' }}>
      {options.map(o => { const on = o.v === value; return (
        <button key={o.v} role="tab" aria-selected={on} onClick={() => onChange(o.v)} style={{ height:36, padding:'0 12px', border:'none', borderBottom:'2px solid ' + (on ? 'var(--primary)' : 'transparent'), marginBottom:-1, background:'transparent', fontFamily:'inherit', fontSize:13, fontWeight:600, cursor:'pointer', color: on ? 'var(--primary)' : 'var(--muted)', whiteSpace:'nowrap' }}>{o.l}{o.n != null ? ' (' + o.n + ')' : ''}</button>) })}
    </div>
  )
}

function DashLicenseTable({ rows, toast, showTenant = true, onTenant }) {
  const th = { textAlign:'left', fontSize:12.5, fontWeight:600, letterSpacing:'.2px', color:'var(--ink-alt)', padding:'10px 14px', background:'var(--surface-alt)', borderBottom:'1px solid var(--border)', whiteSpace:'nowrap' }
  const td = { padding:'11px 14px', fontSize:13.5, color:'var(--ink)', borderBottom:'1px solid var(--border)', verticalAlign:'middle' }
  const [wref, ww] = useDashWidth(800)
  const [tip, setTip] = useState(null)
  const showTip = (e, always) => { const el = e.currentTarget, cut = el.scrollWidth > el.clientWidth + 1; if (cut || always) { const r = el.getBoundingClientRect(); setTip({ text: cut ? el.textContent : 'Open ' + el.textContent + ' dashboard', x:r.left + r.width / 2, y:r.top }) } }
  const hideTip = () => setTip(null)
  React.useEffect(() => { if (!tip) return; const h = () => setTip(null); window.addEventListener('scroll', h, true); return () => window.removeEventListener('scroll', h, true) }, [tip])
  const narrow = ww < (showTenant ? 700 : 600)
  const renew = l => <button data-ix="ghost" onClick={() => toast('License extension requested for ' + l.id + ' (' + l.tenant + ').', 'success')} style={{ ...S.ghost, height:36, fontSize:12.6, padding:'0 12px', borderRadius:9, whiteSpace:'nowrap', flex:'none' }}><Icon d="M3 12a9 9 0 1 0 2.64-6.36 M3 3v6h6" size={14} />Extend License</button>
  const tenantLink = (l, extra) => <button data-ix="link" onClick={() => onTenant && onTenant(l.tenant)} onMouseEnter={e => showTip(e, true)} onMouseLeave={hideTip} onFocus={e => showTip(e, true)} onBlur={hideTip} aria-label={'Open ' + l.tenant + ' dashboard'} style={{ display:'block', maxWidth:'100%', border:'none', background:'none', padding:0, fontFamily:'inherit', fontSize:13.5, fontWeight:500, color:'var(--primary)', cursor:'pointer', textAlign:'left', lineHeight:1.35, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', ...extra }}>{l.tenant}</button>
  const seatsBar = l => { const pct = Math.round(l.used / l.seats * 100); return <div style={{ display:'flex', alignItems:'center', gap:8, minWidth:110 }}><div style={{ flex:1, height:6, borderRadius:3, background:'#EEF2F7', overflow:'hidden' }}><div style={{ width:pct + '%', height:'100%', background: pct >= 90 ? '#DC2626' : pct >= 75 ? '#F59E0B' : '#0070E0' }} /></div><span style={{ fontSize:12, color:'var(--muted)', fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap' }}>{dashFmt(l.used)}/{dashFmt(l.seats)} accounts</span></div> }
  const appsCell = l => {
    const t = tenants.find(x => x.name === l.tenant)
    const al = t ? dashAppLic(t).sort((a, b) => a.days - b.days) : []
    const lap = al.filter(a => a.days < 0), soon = al.filter(a => a.days >= 0 && a.days <= 30)
    const nx = al.find(a => a.days >= 0)
    const pill = (n, txt, c, bg, bd) => <span style={{ fontSize:11.2, fontWeight:600, color:c, background:bg, border:'1px solid ' + bd, borderRadius:999, padding:'1px 8px', whiteSpace:'nowrap' }}>{n} {txt}</span>
    return (
      <div title={[...lap, ...soon].map(a => a.name + ' — ' + (a.days < 0 ? 'lapsed ' + dashDate(a.days) : dashDate(a.days))).join('\n') || undefined} style={{ display:'flex', flexDirection:'column', gap:4, minWidth:150, maxWidth:240 }}>
        {nx ? <span style={{ display:'flex', gap:6, alignItems:'baseline', minWidth:0, fontSize:12.8 }}><span style={{ fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', minWidth:0 }}>{nx.name}</span><span style={{ flex:'none', color:dashToneText(nx.days), fontWeight:600, whiteSpace:'nowrap' }}>{nx.days + ' d'}</span></span> : <span style={{ fontSize:12.8, color:'var(--muted)' }}>No active app licenses</span>}
        <span style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
          {lap.length > 0 && pill(lap.length, 'lapsed', '#B42318', '#FEF2F2', '#F3C2C2')}
          {soon.length > 0 && pill(soon.length, 'in 30 days', 'var(--warning-text)', 'var(--amber-tint)', '#F5D68A')}
          {!lap.length && !soon.length && <span style={{ fontSize:11.6, color:'var(--muted)' }}>All apps beyond 30 days</span>}
        </span>
      </div>
    )
  }
  const daysTxt = l => <span style={{ fontSize:12, fontWeight:600, color:dashToneText(l.days), whiteSpace:'nowrap' }}>{l.days === 0 ? 'Expires today' : l.days === 1 ? 'In 1 day' : 'In ' + l.days + ' days'}</span>
  return (
    <div ref={wref} style={{ minWidth:0 }}>
      {!rows.length ? <div style={{ padding:'32px 18px', textAlign:'center', fontSize:13, color:'var(--muted)' }}>No licenses expire in this window.</div>
      : narrow ? (
        <ul style={{ listStyle:'none', margin:0, padding:0 }}>
          {rows.map(l => (
            <li key={l.id} style={{ display:'flex', flexDirection:'column', gap:8, padding:'12px 14px', borderBottom:'1px solid var(--border)' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                <div style={{ display:'flex', flexDirection:'column', gap:2, flex:1, minWidth:0 }}>
                  <span onMouseEnter={showTip} onMouseLeave={hideTip} style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{l.product}</span>
                  <span style={{ fontFamily:'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize:11.8, color:'var(--muted)' }}>{l.id}</span>
                </div>
                {renew(l)}
              </div>
              {showTenant && tenantLink(l)}
              {appsCell(l)}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8, flexWrap:'wrap', fontSize:12.5, color:'var(--muted)' }}><span>Expires {dashDate(l.days)}</span>{daysTxt(l)}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr>{showTenant && <th scope="col" style={th}>Tenant</th>}<th scope="col" style={th}>Application expiry</th><th scope="col" style={th}>Expires</th><th scope="col" style={{ ...th, textAlign:'right' }}><span style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0 0 0 0)' }}>Action</span></th></tr></thead>
            <tbody>
              {rows.map(l => (
                <tr key={l.id}>
                  
                  {showTenant && <td style={td}>{tenantLink(l, { maxWidth:180 })}</td>}
                  <td style={td}>{appsCell(l)}</td>
                  <td style={td}><div style={{ display:'flex', flexDirection:'column', gap:2 }}><span style={{ whiteSpace:'nowrap' }}>{dashDate(l.days)}</span>{daysTxt(l)}</div></td>
                  <td style={{ ...td, textAlign:'right' }}>{renew(l)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tip && ReactDOM.createPortal(
        <div role="tooltip" style={{ position:'fixed', left:Math.min(Math.max(tip.x, 140), window.innerWidth - 140), top:tip.y - 8, transform:'translate(-50%, -100%)', zIndex:5000, background:'#1A2740', color:'#fff', fontSize:12.5, fontWeight:500, padding:'7px 11px', borderRadius:8, whiteSpace:'nowrap', maxWidth:'calc(100vw - 24px)', overflow:'hidden', textOverflow:'ellipsis', pointerEvents:'none', boxShadow:'0 10px 24px -8px rgba(16,42,84,.5)' }}>{tip.text}</div>,
        document.body)}
    </div>
  )
}

function DashTenantPicker({ value, options, onChange }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [act, setAct] = useState(0)
  const ref = React.useRef(null)
  React.useEffect(() => {
    if (!open) return
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h)
  }, [open])
  const cur = options.find(t => t.code === value)
  const list = options.filter(t => (t.name + ' ' + t.code + ' ' + t.domain).toLowerCase().includes(q.trim().toLowerCase()))
  const choose = t => { onChange(t.code); setOpen(false); setQ('') }
  const onKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setAct(i => Math.min(i + 1, list.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setAct(i => Math.max(i - 1, 0)) }
    else if (e.key === 'Enter' && list[act]) choose(list[act])
    else if (e.key === 'Escape') setOpen(false)
  }
  return (
    <div ref={ref} style={{ position:'relative', width:340, maxWidth:'100%' }}>
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => { setOpen(o => !o); setAct(0) }} style={{ width:'100%', height:44, display:'flex', alignItems:'center', gap:10, padding:'0 12px', borderRadius:10, border:'1.5px solid ' + (open ? 'var(--primary)' : 'var(--border-blue)'), background:'var(--surface)', fontFamily:'inherit', cursor:'pointer', textAlign:'left', boxShadow: open ? '0 0 0 3px rgba(0,112,224,.14)' : 'none' }}>
        <span aria-hidden="true" style={{ color:'var(--primary)', display:'flex' }}><Icon d={DASH_ICON.tenant} size={17} /></span>
        <span style={{ display:'flex', flexDirection:'column', minWidth:0, flex:1, lineHeight:1.25 }}>
          <span style={{ fontSize:11, fontWeight:600, letterSpacing:'.48px', textTransform:'uppercase', color:'var(--muted)' }}>Tenant</span>
          <span style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{cur ? cur.name : 'Select tenant'}</span>
        </span>
        <span aria-hidden="true" style={{ display:'flex', color:'var(--muted)', transform: open ? 'rotate(180deg)' : 'none', transition:'transform .18s' }}><Icon d="M6 9l6 6 6-6" size={16} /></span>
      </button>
      {open && (
        <div style={{ position:'absolute', top:'calc(100% + 6px)', right:0, width:'100%', minWidth:'min(300px, calc(100vw - 32px))', zIndex:1200, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, boxShadow:'0 18px 44px -14px rgba(16,42,84,.32)', overflow:'hidden', animation:'fadeUp .16s ease' }}>
          <div style={{ padding:8, borderBottom:'1px solid var(--border)' }}>
            <label style={{ display:'flex', alignItems:'center', gap:8, height:38, padding:'0 10px', borderRadius:9, border:'1.5px solid var(--border)', color:'var(--muted)' }}>
              <Icon d={DASH_ICON.search} size={15} />
              <input autoFocus value={q} onChange={e => { setQ(e.target.value); setAct(0) }} onKeyDown={onKey} placeholder="Search by name, code or domain" aria-label="Search tenants" style={{ flex:1, minWidth:0, border:'none', outline:'none', background:'transparent', fontFamily:'inherit', fontSize:13.5, color:'var(--ink)' }} />
            </label>
          </div>
          <div role="listbox" aria-label="Tenants" style={{ maxHeight:300, overflowY:'auto', padding:6, display:'flex', flexDirection:'column', gap:2 }}>
            {list.map((t, i) => { const on = t.code === value; return (
              <button key={t.code} type="button" role="option" aria-selected={on} onMouseEnter={() => setAct(i)} onClick={() => choose(t)} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, border:'none', background: act === i ? 'var(--primary-tint)' : 'transparent', fontFamily:'inherit', textAlign:'left', cursor:'pointer' }}>
                <span aria-hidden="true" title={t.status} style={{ width:8, height:8, borderRadius:'50%', background:DASH_STATUS[t.status], flex:'none' }} />
                <span style={{ display:'flex', flexDirection:'column', minWidth:0, flex:1 }}>
                  <span style={{ fontSize:13.5, fontWeight: on ? 600 : 500, color: on ? 'var(--primary)' : 'var(--ink)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{t.name}</span>
                  <span style={{ fontSize:11.8, color:'var(--muted)' }}>{t.code} · {t.status}</span>
                </span>
                <span style={{ fontSize:12.5, fontWeight:600, color:'var(--ink)', fontVariantNumeric:'tabular-nums' }}>{dashFmt(t.users)}</span>
                {on && <span aria-hidden="true" style={{ color:'var(--primary)', display:'flex' }}><Icon d="M20 6L9 17l-5-5" size={15} /></span>}
              </button>) })}
            {!list.length && <div style={{ padding:'20px 12px', textAlign:'center', fontSize:13, color:'var(--muted)' }}>No tenants match “{q}”.</div>}
          </div>
          <div style={{ padding:'8px 12px', borderTop:'1px solid var(--border)', fontSize:12, color:'var(--muted)', display:'flex', justifyContent:'space-between' }}><span>{list.length} of {options.length} tenants</span><span>Accounts</span></div>
        </div>
      )}
    </div>
  )
}

export function Dashboard({ go, toast, openTenant, openUser, tenantCode }) {
  const byUsers = [...tenants].sort((a, b) => b.users - a.users)
  const [sel, setSel] = useState(byUsers[0].code)
  const [win, setWin] = useState(7)
  const [series, setSeries] = useState('accounts')
  const [glow, setGlow] = useState(0)
  const [outlook, setOutlook] = useState('tenants')

  const byStatus = ['Active', 'Provisioning', 'Suspended'].map(k => ({ label:k === 'Provisioning' ? 'Inactive' : k, value:tenants.filter(t => t.status === k).length, color:DASH_STATUS[k] })).filter(p => p.value)
  const totalUsers = tenants.reduce((a, t) => a + t.users, 0)
  const wk = licenses.filter(l => l.days <= 7), mo = licenses.filter(l => l.days <= 30)
  const rows = licenses.filter(l => l.days <= win).sort((a, b) => a.days - b.days)
  const seatsOf = arr => dashFmt(arr.reduce((a, l) => a + l.seats, 0))
  const tenantsOf = arr => new Set(arr.map(l => l.tenant)).size
  const monthGain = userGrowth[11] - userGrowth[10]
  const growthPct = Math.round((userGrowth[11] / userGrowth[0] - 1) * 100)
  const buckets = [['0–7', 0, 7, 'red'], ['8–14', 8, 14, 'amber'], ['15–30', 15, 30, 'amber'], ['31–60', 31, 60, 'blue'], ['61–90', 61, 90, 'blue'], ['90+', 91, 1e9, 'soft']]
  const outBuckets = outlook === 'apps' ? [['Lapsed', -1e9, -1, 'red'], ...buckets] : buckets
  const appAll = tenants.flatMap(dashAppLic)
  const outSrc = outlook === 'apps' ? appAll : licenses
  const bucketVals = outBuckets.map(b => outSrc.filter(l => l.days >= b[1] && l.days <= b[2]).length)
  const appLapsed = appAll.filter(a => a.days < 0), appWk = appAll.filter(a => a.days >= 0 && a.days <= 7), appMo = appAll.filter(a => a.days >= 0 && a.days <= 30)
  const appTen = arr => new Set(arr.map(a => a.tenant)).size
  const tenant = tenants.find(t => t.code === sel) || byUsers[0]
  const openTenantDash = name => { const t = tenants.find(x => x.name === name); if (t) { setSel(t.code); setTimeout(() => dashJump('dash-tenant'), 30) } }
  const flexRow = { display:'flex', flexWrap:'wrap', gap:16, alignItems:'stretch' }

  const me = tenantCode ? tenants.find(t => t.code === tenantCode) : null
  if (me) return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Dashboard" sub={'Accounts, activity and licenses for ' + me.name + '.'}>
        <button data-ix="primary" onClick={openUser} style={{ ...S.primary, whiteSpace:'nowrap' }}><Icon d="M12 5v14 M5 12h14" />New account</button>
      </PageHead>
      <DashTenant t={me} toast={toast} go={go} self />
    </div>
  )

  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Dashboard" sub="Tenants, accounts and license renewals across the platform.">
        <button data-ix="primary" onClick={openTenant} style={{ ...S.primary, whiteSpace:'nowrap' }}><Icon d="M12 5v14 M5 12h14" />New tenant</button>
      </PageHead>

      <DashSection id="dash-overview" eyebrow="01 · Platform" title="Overview">
        <div style={{ display:'grid', gridTemplateColumns:DASH_KPI_GRID, gap:16 }}>
          <DashKpi label="Tenants" value={tenants.length} icon={DASH_ICON.tenant} sub={byStatus.map(p => p.value + ' ' + p.label.toLowerCase()).join(' · ')} />
          <DashKpi label="Accounts" value={dashFmt(totalUsers)} icon={DASH_ICON.users} sub={'+' + dashFmt(monthGain) + ' this month'} />
          <DashKpi label="Licenses expiring in 7 days" value={wk.length} tone="danger" icon={DASH_ICON.clock} sub={seatsOf(wk) + ' accounts · ' + tenantsOf(wk) + ' tenants'} onClick={() => { setWin(7); setGlow(Date.now()); dashJump('dash-licenses') }} />
          <DashKpi label="Licenses expiring in 30 days" value={mo.length} tone="warn" icon={DASH_ICON.cal} sub={seatsOf(mo) + ' accounts · ' + tenantsOf(mo) + ' tenants'} onClick={() => { setWin(30); setGlow(Date.now()); dashJump('dash-licenses') }} />
        </div>
        <div style={flexRow}>
          <DashCard title={series === 'accounts' ? 'Account growth' : 'Tenant growth'} sub="Last 12 months" style={{ flex:'2 1 min(100%, 480px)' }}
            action={<DashTabs label="Growth series" value={series} onChange={setSeries} options={[{ v:'accounts', l:'Accounts', n:dashK(totalUsers) }, { v:'tenants', l:'Tenants', n:tenants.length }]} />}
            summary={series === 'accounts' ? `Accounts grew from ${dashFmt(userGrowth[0])} to ${dashFmt(userGrowth[11])} (+${growthPct}%) over 12 months.` : `Tenants grew from ${tenantGrowth[0]} to ${tenantGrowth[11]} over 12 months.`}>
            <div style={{ padding:'14px 16px 6px' }}><DashArea key={series} id={'dashGr' + series} data={series === 'accounts' ? userGrowth : tenantGrowth} labels={dashMonths()} unit={series} /></div>
          </DashCard>
          <DashCard title="Tenants by status" sub={tenants.length + ' tenants'} style={{ flex:'1 1 min(100%, 300px)' }}
            summary={`${byStatus[0].value} of ${tenants.length} tenants are active.`}>
            <DashDonut id="dashTs" parts={byStatus} center={String(tenants.length)} centerSub="tenants" />
          </DashCard>
        </div>
      </DashSection>

      <DashSection id="dash-licenses" eyebrow="02 · Licenses" title="Renewals" sub="Extend licenses before expiry to avoid service interruption.">
        <div style={flexRow}>
          <DashCard title="Expiry outlook" sub="Licenses by days until expiry" style={{ flex:'1 1 min(100%, 360px)' }}
            action={<DashTabs label="Expiry outlook by" value={outlook} onChange={setOutlook} options={[{ v:'tenants', l:'Tenants' }, { v:'apps', l:'Applications' }]} />}
            summary={outlook === 'apps'
              ? (appLapsed.length ? `${appLapsed.length} application license${appLapsed.length === 1 ? ' has' : 's have'} lapsed across ${appTen(appLapsed)} tenants. ` : '') + `${appWk.length} expire within 7 days and ${appMo.length} within 30 days.`
              : `${wk.length} tenant license${wk.length === 1 ? '' : 's'} expire within 7 days and ${mo.length} within 30 days.`}>
            <div style={{ padding:'14px 16px 6px' }}><DashBars key={outlook} id={'dashExp' + outlook} data={bucketVals} labels={outBuckets.map(b => b[0])} tips={outBuckets.map(b => b[0] === 'Lapsed' ? 'Lapsed' : b[0] + ' days')} tones={outBuckets.map(b => b[3])} unit={outlook === 'apps' ? 'app license(s)' : 'license(s)'} /></div>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap', padding:'0 18px 12px', fontSize:12, color:'var(--muted)' }}>
              {[['red', outlook === 'apps' ? 'Lapsed / ≤ 7 days' : '≤ 7 days'], ['amber', '8–30 days'], ['blue', '31–90 days'], ['soft', '90+ days']].map(([k, l]) => <span key={k} style={{ display:'flex', alignItems:'center', gap:6 }}><span aria-hidden="true" style={{ width:10, height:10, borderRadius:3, background:DASH_TONES[k][1] }} />{l}</span>)}
            </div>
          </DashCard>
          <DashCard title="Expiring licenses" glow={glow} style={{ flex:'2 1 min(100%, 520px)' }}
            action={<DashTabs label="Expiry window" value={win} onChange={setWin} options={[{ v:7, l:'Next 7 days', n:wk.length }, { v:30, l:'Next 30 days', n:mo.length }]} />}>
            <DashLicenseTable rows={rows} toast={toast} onTenant={openTenantDash} />
          </DashCard>
        </div>
      </DashSection>

      <DashSection id="dash-tenant" eyebrow="03 · Tenant" title="Tenant dashboard" sub="Select a tenant to see its accounts, activity and licenses."
        action={<DashTenantPicker value={tenant.code} options={byUsers} onChange={setSel} />}>
        <DashTenant key={tenant.code} t={tenant} toast={toast} go={go} />
      </DashSection>
    </div>
  )
}

function DashAppUsage({ apps }) {
  const [appRef, appW] = useDashWidth(600)
  const appNarrow = appW < 460
  return (
  <div ref={appRef} style={{ display:'flex', flexDirection:'column', padding:'8px 18px 14px', minWidth:0 }}>
    {!appNarrow && <div aria-hidden="true" style={{ display:'grid', gridTemplateColumns:'minmax(120px,1.1fr) minmax(80px,2fr) 64px 72px', gap:14, padding:'6px 0 8px', fontSize:11.5, fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase', color:'var(--muted)', borderBottom:'1px solid var(--border)' }}><span>App</span><span>Adoption</span><span style={{ textAlign:'right' }}>Active</span><span style={{ textAlign:'right' }}>vs last wk</span></div>}
    {apps.map((a, i) => <div key={a.name} style={{ display:'grid', gridTemplateColumns: appNarrow ? 'minmax(0,1fr) auto auto' : 'minmax(120px,1.1fr) minmax(80px,2fr) 64px 72px', gridTemplateAreas: appNarrow ? '"n v d" "b b b"' : '"n b v d"', alignItems:'center', columnGap: appNarrow ? 10 : 14, rowGap:8, padding:'11px 0', borderTop: i ? '1px solid var(--border)' : 'none', fontSize:13 }}>
      <span style={{ gridArea:'n', display:'flex', alignItems:'center', gap:10, minWidth:0 }}><span aria-hidden="true" style={{ flex:'none', width:28, height:28, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--primary-tint)', color:'var(--primary)', fontSize:10.5, fontWeight:700 }}>{a.code}</span><span style={{ fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.name}</span></span>
      <span style={{ gridArea:'b', display:'flex', alignItems:'center', gap:10, minWidth:0 }}><span aria-hidden="true" style={{ flex:1, height:8, borderRadius:999, background:'var(--surface-alt)', overflow:'hidden' }}><span style={{ display:'block', height:'100%', width:a.pct + '%', borderRadius:999, background: a.pct < 25 ? 'linear-gradient(90deg,#F5C16C,#D97706)' : 'linear-gradient(90deg,#5AA2F0,#0a4a8c)' }} /></span><span style={{ flex:'none', width:36, textAlign:'right', fontSize:12.4, color:'var(--muted)', fontVariantNumeric:'tabular-nums' }}>{a.pct + '%'}</span></span>
      <span style={{ gridArea:'v', textAlign:'right', fontWeight:600, color:'var(--ink)', fontVariantNumeric:'tabular-nums' }}>{dashFmt(a.active)}</span>
      <span style={{ gridArea:'d', justifySelf:'end', display:'inline-flex', alignItems:'center', gap:4, padding:'2px 8px', borderRadius:999, fontSize:11.8, fontWeight:600, fontVariantNumeric:'tabular-nums', background: a.delta >= 0 ? '#EAF6EF' : '#FDECEC', color: a.delta >= 0 ? '#1E7A4F' : '#B42318' }}>{(a.delta >= 0 ? '+' : '') + a.delta + '%'}</span>
    </div>)}
  </div>
  )
}

function DashTenant({ t, toast, go, self }) {
  const st = dashTenantStats(t)
  const tl = licenses.filter(l => l.tenant === t.name).sort((a, b) => a.days - b.days)
  const seats = tl.reduce((a, l) => a + l.seats, 0), used = tl.reduce((a, l) => a + l.used, 0)
  const util = seats ? Math.round(used / seats * 100) : 0
  const next = tl[0]
  const days = dashDays(14)
  const avg = Math.round(st.signins.reduce((a, b) => a + b, 0) / 14)
  const peak = Math.max(...st.signins), peakDay = days[st.signins.indexOf(peak)]
  const initials = t.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const flexRow = { display:'flex', flexWrap:'wrap', gap:16, alignItems:'stretch' }
  const hours = dashHours()
  const ccNow = st.concurrent[23], ccPeak = Math.max(...st.concurrent), ccPeakAt = hours[st.concurrent.indexOf(ccPeak)]
  const nf = st.notif, nfRate = nf.sent ? (nf.failed / nf.sent * 100).toFixed(1) : '0.0', nfMax = Math.max(...nf.channels.map(c => c.value))
  const sec = st.security, secDelta = sec.prev ? Math.round((sec.failed - sec.prev) / sec.prev * 100) : 0, secUp = secDelta > 0, secMax = Math.max(...sec.reasons.map(r => r.value))
  const appSeed = t.code.charCodeAt(0) + t.code.charCodeAt(1)
  const apps = [['Candidate Management', 'CM', 0.88], ['Test Delivery', 'TD', 0.8], ['Item Authoring & Test Bank', 'IA', 0.62], ['Remote Proctoring', 'RP', 0.54], ['eMarking', 'EM', 0.47], ['Test Construction', 'TC', 0.36], ['Learning Experience', 'LE', 0.29], ['Certification & Badging', 'CB', 0.2], ['Career Portal', 'CP', 0.12]].map(([name, code, s], i) => { const pct = Math.max(3, Math.min(98, Math.round((s + (((appSeed + i * 7) % 9) - 4) / 100) * 100))); return { name, code, pct, active:Math.round(t.users * pct / 100), delta:((appSeed * (i + 3)) % 23) - 8 } }).sort((a, b) => b.active - a.active)
  const appsLow = apps.filter(a => a.pct < 25)
  const nfTone = nf.failed === 0 ? 'var(--ink)' : nf.failed / nf.sent > 0.03 ? '#B42318' : 'var(--warning-text)'
  const appLic = dashAppLic(t).map(x => ({ ...(apps.find(a => a.code === x.code) || {}), ...x })).sort((a, b) => a.days - b.days)
  const [expWin, setExpWin] = useState(90)
  const expTone = d => d < 0 ? { c:'#B42318', bg:'#FEF2F2', bd:'#F3C2C2', bar:'#DC2626', l: d < -30 ? 'Expired' : 'In grace' } : d <= 7 ? { c:'#B42318', bg:'#FEF2F2', bd:'#F3C2C2', bar:'#DC2626', l:'Critical' } : d <= 30 ? { c:'var(--warning-text)', bg:'var(--amber-tint)', bd:'#F5D68A', bar:'#F59E0B', l:'Expiring soon' } : { c:'var(--success-text)', bg:'var(--green-tint)', bd:'#BBE5C8', bar:'#16A34A', l:'Active' }
  const appShown = appLic.filter(a => expWin === 0 || a.days <= expWin)
  const nextApp = appLic.find(a => a.days >= 0) || appLic[0]
  const in30 = appLic.filter(a => a.days >= 0 && a.days <= 30).length, lapsed = appLic.filter(a => a.days < 0).length

  const attnCard = (
          <DashCard title="Needs attention" sub="Accounts that need an admin action" style={{ flex:'1 1 min(100%, 360px)' }}
            action={go && <button data-ix="ghost" onClick={() => go('users')} style={{ ...S.ghost, height:32, fontSize:12.5, padding:'0 12px', whiteSpace:'nowrap' }}>Accounts<Icon d="M5 12h14 M12 5l7 7-7 7" size={13} /></button>}
            summary={st.attention.length ? dashFmt(st.attention.reduce((a, x) => a + x.value, 0)) + ' items across ' + st.attention.length + ' categories.' : 'Nothing needs attention.'}>
            <div style={{ display:'flex', flexDirection:'column', padding:'6px 10px 10px' }}>
              {st.attention.map((a, i) => <button key={a.k} type="button" data-ix="row" onClick={() => go && go('users')} style={{ display:'grid', gridTemplateColumns:'34px minmax(0,1fr) auto 14px', alignItems:'center', gap:12, width:'100%', padding:'11px 8px', border:'none', borderTop: i ? '1px solid var(--border)' : 'none', background:'transparent', borderRadius:8, cursor:'pointer', textAlign:'left', fontFamily:'inherit' }}>
                <span aria-hidden="true" style={{ width:34, height:34, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--surface-page)', border:'1px solid var(--border)', color:a.tone }}><Icon d={a.icon} size={15} /></span>
                <span style={{ display:'flex', flexDirection:'column', gap:2, minWidth:0 }}><span style={{ fontSize:13.2, fontWeight:600, color:'var(--ink)' }}>{a.label}</span><span style={{ fontSize:12, color:'var(--muted)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{a.hint}</span></span>
                <span style={{ fontSize:17, fontWeight:600, color:a.tone, fontVariantNumeric:'tabular-nums' }}>{dashFmt(a.value)}</span>
                <Icon d="M9 18l6-6-6-6" size={14} style={{ color:'var(--muted)' }} />
              </button>)}
            </div>
          </DashCard>
  )
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16, animation:'fadeUp .24s ease' }}>
      <div style={{ ...S.card, padding:'16px 18px', display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
        <span aria-hidden="true" style={{ width:48, height:48, borderRadius:12, background:'#0a4a8c', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:600, flex:'none' }}>{initials}</span>
        <div style={{ display:'flex', flexDirection:'column', gap:4, flex:'1 1 240px', minWidth:0 }}>
          <span style={{ fontSize:17, fontWeight:600, color:'var(--ink)' }}>{t.name}</span>
          <span style={{ display:'flex', alignItems:'center', gap:'4px 12px', flexWrap:'wrap', fontSize:12.5, color:'var(--muted)' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontWeight:600, color:'var(--ink)' }}><span aria-hidden="true" style={{ width:8, height:8, borderRadius:'50%', background:DASH_STATUS[t.status] }} />{t.status}</span>
            <span>{t.plan} · {t.code} · {t.domain} · Since {t.created}</span>
          </span>
        </div>
        {!self && <button data-ix="ghost" onClick={() => go('tenants')} style={{ ...S.ghost, height:38, whiteSpace:'nowrap' }}><Icon d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6 M15 3h6v6 M10 14L21 3" size={15} />Manage tenant</button>}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:DASH_KPI_GRID, gap:16 }}>
        <DashKpi label="Accounts" value={dashFmt(t.users)} icon={DASH_ICON.users} sub={dashFmt(st.active) + ' active'} />
        <DashKpi label="Avg. daily sign-ins" value={dashFmt(avg)} icon={DASH_ICON.check} sub="Last 14 days" />
        <DashKpi label="Account utilization" value={util + '%'} icon={DASH_ICON.key} tone={util >= 90 ? 'danger' : util >= 75 ? 'warn' : undefined} sub={dashFmt(used) + ' of ' + dashFmt(seats) + ' accounts'} />
        <DashKpi label="Next app license expiry" value={nextApp ? nextApp.days + ' days' : '—'} icon={DASH_ICON.clock} tone={nextApp && nextApp.days <= 7 ? 'danger' : nextApp && nextApp.days <= 30 ? 'warn' : undefined} sub={nextApp ? nextApp.name + ' · ' + dashDate(nextApp.days) : 'No active licenses'} />
      </div>

      <DashCard title="Application license expiry" sub="When each application's license ends"
        action={<div role="group" aria-label="Expiry window" style={{ display:'flex', background:'var(--surface-alt)', border:'1px solid var(--border)', borderRadius:9, padding:2, gap:2 }}>
          {[[30, '30 days'], [90, '90 days'], [0, 'All']].map(([v, l]) => <button key={v} type="button" aria-pressed={expWin === v} onClick={() => setExpWin(v)} style={{ height:28, padding:'0 11px', borderRadius:7, border:'none', background: expWin === v ? 'var(--surface)' : 'transparent', boxShadow: expWin === v ? '0 1px 2px rgba(16,24,40,.1)' : 'none', color: expWin === v ? 'var(--on-tint-blue)' : 'var(--muted)', font:'inherit', fontSize:12.4, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap' }}>{l}</button>)}
        </div>}
        summary={(lapsed ? lapsed + ' app' + (lapsed === 1 ? ' has' : 's have') + ' lapsed · ' : '') + (in30 ? in30 + ' app' + (in30 === 1 ? '' : 's') + ' expire within 30 days.' : 'No apps expire in the next 30 days.') + (nextApp ? ' Next: ' + nextApp.name + ' on ' + dashDate(nextApp.days) + '.' : '')}>
        <div style={{ display:'flex', flexDirection:'column', padding:'6px 18px 10px' }}>
          {appShown.length === 0 && <div style={{ padding:'22px 0', textAlign:'center', fontSize:13, color:'var(--muted)' }}>No application licenses end in this window.</div>}
          {appShown.map((a, i) => { const tn = expTone(a.days); return (
            <div key={a.code} style={{ display:'grid', gridTemplateColumns:'34px minmax(0,1.4fr) 96px minmax(64px,1fr) 118px', alignItems:'center', gap:'10px 14px', padding:'10px 0', borderTop: i ? '1px solid var(--border)' : 'none' }}>
              <span aria-hidden="true" style={{ width:34, height:34, borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--primary-tint)', border:'1px solid var(--border-blue)', color:'var(--on-tint-blue)', fontSize:11.5, fontWeight:700 }}>{a.code}</span>
              <span style={{ display:'flex', flexDirection:'column', gap:2, minWidth:0 }}><span style={{ fontSize:13.2, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{a.name}</span><span style={{ fontSize:12, color:'var(--muted)' }}>{dashFmt(a.active)} active accounts</span></span>
              <span style={{ display:'flex', flexDirection:'column', gap:2 }}><span style={{ fontSize:11, fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase', color:'var(--muted)' }}>{a.days < 0 ? 'Ended' : 'Ends'}</span><span style={{ fontSize:13, fontWeight:500, color:'var(--ink)', fontVariantNumeric:'tabular-nums', whiteSpace:'nowrap' }}>{dashDate(a.days)}</span></span>
              <span style={{ display:'flex', flexDirection:'column', gap:5 }}>
                <span style={{ fontSize:12.4, fontWeight:600, color:tn.c, fontVariantNumeric:'tabular-nums' }}>{a.days < 0 ? Math.abs(a.days) + ' days ago' : a.days + ' days left'}</span>
                <span aria-hidden="true" style={{ height:6, borderRadius:999, background:'var(--surface-alt)', overflow:'hidden' }}><span style={{ display:'block', height:'100%', width: (a.days < 0 ? 100 : Math.max(4, Math.min(100, a.days / 365 * 100))) + '%', borderRadius:999, background:tn.bar, opacity: a.days < 0 ? .35 : 1 }} /></span>
              </span>
              <span style={{ justifySelf:'end', display:'inline-flex', alignItems:'center', gap:6, padding:'3px 10px', borderRadius:999, background:tn.bg, border:'1px solid ' + tn.bd, color:tn.c, fontSize:11.8, fontWeight:600, whiteSpace:'nowrap' }}><span aria-hidden="true" style={{ width:6, height:6, borderRadius:999, background:'currentColor' }} />{tn.l}</span>
            </div>
          ) })}
        </div>
      </DashCard>

      <div style={flexRow}>
        {!self && <DashCard title="Concurrent users" sub="Signed in right now" style={{ flex:'1 1 min(100%, 240px)' }} summary={`Peak of ${dashFmt(ccPeak)} at ${ccPeakAt} in the last 24 hours.`}>
          <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:10, padding:'20px 20px 22px' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap:8, width:'fit-content', height:26, padding:'0 10px', borderRadius:999, background:'#EAF6EF', border:'1px solid #BFE3CE', fontSize:12, fontWeight:600, color:'#1E7A4F' }}><span aria-hidden="true" style={{ width:7, height:7, borderRadius:'50%', background:'#16A34A', boxShadow:'0 0 0 3px rgba(22,163,74,.18)' }} />Live</span>
            <span style={{ fontSize:44, fontWeight:600, lineHeight:1, color:'var(--ink)', fontVariantNumeric:'tabular-nums' }}>{dashFmt(ccNow)}</span>
            <span style={{ fontSize:12.8, color:'var(--muted)' }}>{(t.users ? Math.round(ccNow / t.users * 100) : 0) + '% of ' + dashFmt(t.users) + ' accounts online'}</span>
          </div>
        </DashCard>}
        {self && <DashCard title="Application usage" sub="Active accounts per app, last 7 days" style={{ flex:'2 1 min(100%, 420px)' }}
          action={go && <button data-ix="ghost" onClick={() => go('appClients')} style={{ ...S.ghost, height:32, fontSize:12.5, padding:'0 12px', whiteSpace:'nowrap' }}>App clients<Icon d="M5 12h14 M12 5l7 7-7 7" size={13} /></button>}
          summary={`${apps[0].name} is the most used app (${apps[0].pct}% of accounts). ${appsLow.length ? appsLow.map(a => a.name).join(', ') + ' adoption is under 25%.' : 'All apps are above 25% adoption.'}`}>
          <DashAppUsage apps={apps} />
        </DashCard>}
        <DashCard title="Failed notifications" sub="Last 24 hours" style={{ flex:'1 1 min(100%, 300px)' }}
          action={go && <button data-ix="ghost" onClick={() => go('notifications')} style={{ ...S.ghost, height:32, fontSize:12.5, padding:'0 12px', whiteSpace:'nowrap' }}>View all<Icon d="M5 12h14 M12 5l7 7-7 7" size={13} /></button>}
          summary={nf.failed ? `${dashFmt(nf.failed)} of ${dashFmt(nf.sent)} notifications failed in the last 24 hours.` : 'All notifications were delivered.'}>
          <div style={{ flex:1, display:'flex', flexDirection:'column', gap:16, padding:'16px 18px' }}>
            <div style={{ display:'flex', alignItems:'flex-end', gap:12, flexWrap:'wrap' }}>
              <span style={{ fontSize:32, fontWeight:600, lineHeight:1, color: nfTone, fontVariantNumeric:'tabular-nums' }}>{dashFmt(nf.failed)}</span>
              <span style={{ fontSize:12.5, color:'var(--muted)', paddingBottom:3 }}>{'of ' + dashFmt(nf.sent) + ' sent · ' + nfRate + '% failure rate'}</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
              {nf.channels.map(c => <div key={c.label} style={{ display:'grid', gridTemplateColumns:'56px minmax(0,1fr) 36px', alignItems:'center', gap:10, fontSize:12.8 }}>
                <span style={{ color:'var(--ink)', fontWeight:500 }}>{c.label}</span>
                <span aria-hidden="true" style={{ height:8, borderRadius:999, background:'var(--surface-alt)', overflow:'hidden' }}><span style={{ display:'block', height:'100%', width: (nfMax ? c.value / nfMax * 100 : 0) + '%', borderRadius:999, background:'linear-gradient(90deg,#F37B7B,#DC2626)' }} /></span>
                <span style={{ textAlign:'right', fontWeight:600, color:'var(--ink)', fontVariantNumeric:'tabular-nums' }}>{dashFmt(c.value)}</span>
              </div>)}
            </div>
          </div>
        </DashCard>
      </div>

      {!self && <div style={flexRow}>{attnCard}</div>}

      <div style={flexRow}>
        <DashCard title="Daily sign-ins" sub="Last 14 days" style={{ flex:'2 1 min(100%, 420px)' }} summary={`Averaging ${dashFmt(avg)} sign-ins per day; peak of ${dashFmt(peak)} on ${peakDay}.`}>
          <div style={{ padding:'14px 16px 6px' }}><DashBars id={'dashSi' + t.code} data={st.signins} labels={days} unit="sign-ins" /></div>
        </DashCard>
        <DashCard title="MFA adoption" sub="Accounts with a second factor" style={{ flex:'1 1 min(100%, 240px)' }} summary={st.mfa < 80 ? 'Below the 80% recommended baseline.' : 'Meets the 80% recommended baseline.'}>
          <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', gap:6, padding:'18px 16px' }}>
            <DashGauge id={'dashMfa' + t.code} pct={st.mfa} />
            <span style={{ fontSize:13, color:'var(--ink)', fontWeight:500 }}>{dashFmt(Math.round(t.users * st.mfa / 100))} of {dashFmt(t.users)} accounts</span>
          </div>
        </DashCard>
      </div>

      <div style={flexRow}>
        {self && attnCard}
        {self && (
        <DashCard title="Recent admin activity" sub="Changes made in this tenant" style={{ flex:'1 1 min(100%, 340px)' }}
          action={go && <button data-ix="ghost" onClick={() => go('auditLog')} style={{ ...S.ghost, height:32, fontSize:12.5, padding:'0 12px', whiteSpace:'nowrap' }}>Audit log<Icon d="M5 12h14 M12 5l7 7-7 7" size={13} /></button>}
          summary={st.activity.length + ' recent changes; latest ' + st.activity[0].when + '.'}>
          <ol style={{ listStyle:'none', margin:0, padding:'8px 18px 12px', display:'flex', flexDirection:'column' }}>
            {st.activity.map((a, i) => <li key={i} style={{ display:'grid', gridTemplateColumns:'30px minmax(0,1fr) auto', alignItems:'start', gap:12, padding:'10px 0', borderTop: i ? '1px solid var(--border)' : 'none' }}>
              <span aria-hidden="true" style={{ width:30, height:30, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--primary-tint)', color:'var(--primary)', fontSize:11, fontWeight:600 }}>{a.who.split(' ').map(w => w[0]).join('')}</span>
              <span style={{ display:'flex', flexDirection:'column', gap:2, minWidth:0 }}>
                <span style={{ fontSize:13, color:'var(--ink)', lineHeight:1.4, textWrap:'pretty' }}><strong style={{ fontWeight:600 }}>{a.who}</strong>{' ' + a.what + ' '}<strong style={{ fontWeight:600 }}>{a.target}</strong></span>
                <span style={{ fontSize:11.8, color:'var(--muted)' }}>{a.area}</span>
              </span>
              <span style={{ fontSize:11.8, color:'var(--muted)', whiteSpace:'nowrap', paddingTop:2 }}>{a.when}</span>
            </li>)}
          </ol>
        </DashCard>
        )}
        {!self && <DashCard title="Accounts by role" style={{ flex:'1 1 min(100%, 320px)' }}><DashDonut id={'dashR' + t.code} parts={st.rolesSplit} center={dashK(t.users)} centerSub="accounts" /></DashCard>}
        {!self && <DashCard title="Accounts by status" style={{ flex:'1 1 min(100%, 320px)' }}><DashDonut id={'dashS' + t.code} parts={st.status} center={Math.round(st.active / t.users * 100) + '%'} centerSub="active" /></DashCard>}
      </div>

    </div>
  )
}
