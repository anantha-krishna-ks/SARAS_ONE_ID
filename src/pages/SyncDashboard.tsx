import React from 'react'
import { createPortal } from 'react-dom'
import { PageHead, S, Icon, Th } from '../ui'
import { syncOutbox, syncApps, syncEntities, syncEventStatuses, syncAgo, syncFmt } from '../data'
import { syncStatusMeta } from '../components/SyncBits'

const SY_KTONE = { blue:'var(--primary)', green:'var(--success)', amber:'var(--warning)', red:'#DC2626' }
const SY_STAGE_HINT = { New:'Captured, waiting to fan out', Expanded:'Queued per subscriber', 'In Process':'Delivering to applications', Applied:'Confirmed by every subscriber' }

const SY_SEG = [
  { k:'applied', label:'Succeeded', c:['#4DA0F2', '#0070E0'], sw:'#0070E0' },
  { k:'pending', label:'Pending', c:['#FCC85A', '#F59E0B'], sw:'#F59E0B' },
  { k:'failed', label:'Failed', c:['#F37B7B', '#DC2626'], sw:'#DC2626' },
]
function syNice(max) {
  if (max <= 4) return { hi:4, step:1 }
  const raw = max / 4, mag = Math.pow(10, Math.floor(Math.log10(raw))), n = raw / mag
  const step = (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * mag
  return { hi:Math.ceil(max / step) * step, step }
}
function SyncHealthChart({ rows }) {
  const ref = React.useRef(null)
  const [W, setW] = React.useState(640)
  const [hi, setHi] = React.useState(null)
  const [sortBy, setSortBy] = React.useState('attention')
  const [showAll, setShowAll] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current; if (!el) return
    const upd = () => setW(Math.max(280, el.clientWidth))
    upd()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(upd) : null
    if (ro) ro.observe(el); else window.addEventListener('resize', upd)
    return () => { if (ro) ro.disconnect(); else window.removeEventListener('resize', upd) }
  }, [])
  const LIMIT = 6, MAXH = 8 * 36
  const sorted = [...rows].sort(sortBy === 'events' ? (a, b) => b.delivered - a.delivered : sortBy === 'az' ? (a, b) => a.a.name.localeCompare(b.a.name) : (a, b) => (b.failed - a.failed) || (b.pending - a.pending) || (b.delivered - a.delivered))
  const vis = showAll ? sorted : sorted.slice(0, LIMIT)
  const rest = sorted.slice(LIMIT)
  const restEv = rest.reduce((a, r) => a + r.delivered, 0), restIssues = rest.filter(r => r.failed || r.pending).length
  const narrow = W < 520
  const pl = narrow ? 112 : 168, pr = 44, rowH = 36, bh = 16, pt = 4
  const H = pt * 2 + vis.length * rowH
  const sc = syNice(Math.max(1, ...rows.map(r => r.delivered)))
  const iw = W - pl - pr
  const x = v => pl + v / sc.hi * iw
  const ticks = []; for (let v = 0; v <= sc.hi + 1e-9; v += sc.step) ticks.push(v)
  const tot = (k) => rows.reduce((a, r) => a + r[k], 0)
  const cur = hi !== null ? vis[hi] : null
  const scroller = React.useRef(null)
  const st = scroller.current ? scroller.current.scrollTop : 0
  const pill = (k, t) => { const on = sortBy === k; return <button key={k} type="button" role="tab" aria-selected={on} onClick={() => setSortBy(k)} style={{ border:'none', borderRadius:7, padding:'0 10px', height:28, fontFamily:'inherit', fontSize:12.4, fontWeight: on ? 700 : 600, color: on ? 'var(--ink)' : 'var(--muted)', background: on ? 'var(--surface)' : 'transparent', boxShadow: on ? '0 2px 6px -2px rgba(16,42,84,.2)' : 'none', cursor:'pointer', whiteSpace:'nowrap' }}>{t}</button> }
  return (
    <div style={{ padding:'14px 18px 8px', display:'flex', flexDirection:'column', gap:10 }}>
      <div style={{ display:'flex', alignItems:'center', gap:18, flexWrap:'wrap' }}>
        {SY_SEG.map(s => (
          <span key={s.k} style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12.8, color:'var(--ink)' }}>
            <span aria-hidden style={{ width:10, height:10, borderRadius:3, background:'linear-gradient(180deg,' + s.c[0] + ',' + s.c[1] + ')' }}></span>
            {s.label}<b style={{ fontWeight:600, fontVariantNumeric:'tabular-nums' }}>{tot(s.k)}</b>
          </span>
        ))}
        <div role="tablist" aria-label="Sort subscribers" style={{ marginLeft:'auto', display:'inline-flex', gap:2, padding:3, background:'#EAEEF3', border:'1px solid var(--border)', borderRadius:10 }}>
          {pill('attention', 'Needs attention')}{pill('events', 'Most events')}{pill('az', 'A–Z')}
        </div>
      </div>
      <div ref={ref} style={{ position:'relative', width:'100%' }} onMouseLeave={() => setHi(null)}>
        <div ref={scroller} onScroll={() => setHi(null)} style={{ maxHeight: showAll ? MAXH : 'none', overflowY: showAll ? 'auto' : 'visible' }}>
          <svg width={W} height={H} role="img" aria-label={vis.map(r => r.a.name + ': ' + r.applied + ' succeeded, ' + r.pending + ' pending, ' + r.failed + ' failed').join('; ')} style={{ display:'block' }}>
            <defs>
              {SY_SEG.map(s => <linearGradient key={s.k} id={'syh' + s.k} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={s.c[0]} /><stop offset="1" stopColor={s.c[1]} /></linearGradient>)}
              <linearGradient id="syhgl" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".34" /><stop offset=".5" stopColor="#fff" stopOpacity=".06" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
              <filter id="syhsh" x="-5%" y="-60%" width="110%" height="260%"><feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0B3A75" floodOpacity=".2" /></filter>
              {vis.map((r, i) => { const by = pt + i * rowH + (rowH - bh) / 2; return <clipPath key={i} id={'syhc' + i}><rect x={pl} y={by} width={Math.max(0, x(r.delivered) - pl)} height={bh} rx={bh / 2} /></clipPath> })}
            </defs>
            {ticks.map(v => <line key={v} x1={x(v)} x2={x(v)} y1={0} y2={H} stroke="#E4E9F0" strokeDasharray={v ? '3 4' : ''} />)}
            {vis.map((r, i) => {
              const cy = pt + i * rowH + rowH / 2, by = cy - bh / 2
              let acc = 0
              return (
                <g key={r.a.code} onMouseEnter={() => setHi(i)}>
                  <rect x={0} y={pt + i * rowH} width={W} height={rowH} fill={hi === i ? 'rgba(0,112,224,.05)' : 'transparent'} />
                  <text x={pl - 12} y={cy + 4} textAnchor="end" fontSize={narrow ? 12 : 13} fill={hi === i ? '#1A1E26' : '#344054'} fontWeight={hi === i ? 600 : 500}>{r.a.name.length > (narrow ? 14 : 22) ? r.a.name.slice(0, narrow ? 13 : 21) + '…' : r.a.name}</text>
                  {r.delivered > 0 ? (
                    <g filter="url(#syhsh)" opacity={hi === null || hi === i ? 1 : 0.55}>
                      <g clipPath={'url(#syhc' + i + ')'}>
                        {SY_SEG.map(s => { const v = r[s.k]; if (!v) return null; const x0 = x(acc); acc += v; return <rect key={s.k} x={x0} y={by} width={x(acc) - x0} height={bh} fill={'url(#syh' + s.k + ')'} /> })}
                        <rect x={pl} y={by} width={x(r.delivered) - pl} height={bh / 2} fill="url(#syhgl)" pointerEvents="none" />
                      </g>
                    </g>
                  ) : <rect x={pl} y={by} width={Math.min(iw, 40)} height={bh} rx={bh / 2} fill="#EEF2F7" />}
                  <text x={x(r.delivered) + 8} y={cy + 4} fontSize="12.5" fontWeight="600" fill={r.delivered ? '#1A1E26' : '#5A6675'} style={{ fontVariantNumeric:'tabular-nums' }}>{r.delivered || '0'}</text>
                </g>
              )
            })}
            <line x1={pl} x2={pl} y1={0} y2={H} stroke="#C9D3E0" />
          </svg>
        </div>
        <svg width={W} height={22} aria-hidden="true" style={{ display:'block', borderTop:'1px solid #C9D3E0' }}>
          {ticks.map(v => <text key={v} x={x(v)} y={16} textAnchor="middle" fontSize="12" fill="#5A6675">{v % 1 ? v.toFixed(1) : v}</text>)}
        </svg>
        {cur && (
          <div style={{ position:'absolute', left:Math.min(Math.max(x(cur.delivered / 2), 110), W - 110), top:pt + hi * rowH + (rowH - bh) / 2 - 8 - st, transform:'translate(-50%, -100%)', background:'#1A2740', color:'#fff', borderRadius:8, padding:'8px 12px', pointerEvents:'none', whiteSpace:'nowrap', boxShadow:'0 10px 24px -8px rgba(16,42,84,.5)', display:'flex', flexDirection:'column', gap:4, zIndex:2 }}>
            <span style={{ fontSize:11.5, color:'#C9D6EA' }}>{cur.a.name} · {cur.delivered} events</span>
            <span style={{ display:'flex', gap:12, fontSize:12.6, fontWeight:600 }}>
              {SY_SEG.map(s => <span key={s.k} style={{ display:'inline-flex', alignItems:'center', gap:6 }}><span aria-hidden style={{ width:8, height:8, borderRadius:2, background:s.c[0] }}></span>{cur[s.k]} {s.label.toLowerCase()}</span>)}
            </span>
          </div>
        )}
      </div>
      {rest.length > 0 && (
        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'8px 12px', borderRadius:10, background:'var(--primary-tint-2)', flexWrap:'wrap' }}>
          <span style={{ flex:1, minWidth:0, fontSize:12.8, color:'#344054' }}>
            {showAll ? 'Showing all ' + sorted.length + ' subscribers' : <span><b style={{ fontWeight:600, color:'var(--ink)' }}>+{rest.length} more</b> · {restEv} events{restIssues ? ' · ' + restIssues + ' with pending or failed' : ' · all healthy'}</span>}
          </span>
          <button type="button" onClick={() => { setShowAll(v => !v); setHi(null) }} style={{ border:'none', background:'transparent', color:'var(--primary)', fontFamily:'inherit', fontSize:12.8, fontWeight:600, cursor:'pointer', padding:'6px 4px', minHeight:32 }}>{showAll ? 'Show top ' + LIMIT : 'Show all'}</button>
        </div>
      )}
    </div>
  )
}

const SY_WINDOWS = [
  { k:'1h', t:'1 hour', long:'Last 1 hour', ms:36e5 },
  { k:'4h', t:'4 hours', long:'Last 4 hours', ms:4 * 36e5 },
  { k:'8h', t:'8 hours', long:'Last 8 hours', ms:8 * 36e5 },
  { k:'24h', t:'24 hours', long:'Last 24 hours', ms:864e5 },
  { k:'today', t:'Today', long:'Today' },
  { k:'7d', t:'7 days', long:'Last 7 days', ms:7 * 864e5 },
]

export function SyncDashboard({ go }) {
  const [win, setWin] = React.useState('24h')
  const [openApps, setOpenApps] = React.useState({})
  const shWrap = React.useRef(null), shHead = React.useRef(null)
  const [sh, setSh] = React.useState({ vis:false, left:0, width:0, top:64, sx:0, tw:0 })
  const shSync = React.useCallback(() => {
    const w = shWrap.current, h = shHead.current
    if (!w || !h) return
    const hdr = document.querySelector('header')
    const top = hdr ? Math.max(0, hdr.getBoundingClientRect().bottom) : 0
    const hr = h.getBoundingClientRect(), wr = w.getBoundingClientRect()
    const vis = hr.bottom < top && wr.bottom > top + hr.height + 56
    setSh(p => (p.vis === vis && p.left === wr.left && p.width === w.clientWidth && p.top === top && p.sx === w.scrollLeft && p.tw === w.scrollWidth) ? p : { vis, left:wr.left, width:w.clientWidth, top, sx:w.scrollLeft, tw:w.scrollWidth })
  }, [])
  React.useEffect(() => {
    document.addEventListener('scroll', shSync, true); window.addEventListener('resize', shSync); shSync()
    return () => { document.removeEventListener('scroll', shSync, true); window.removeEventListener('resize', shSync) }
  }, [shSync])
  React.useEffect(() => { shSync() })
  const shCols = <colgroup><col /><col style={{ width:96 }} /><col style={{ width:88 }} /><col style={{ width:92 }} /><col style={{ width:84 }} /><col style={{ width:112 }} /><col style={{ width:124 }} /></colgroup>
  const shRow = <tr><Th label="Application" align="left" /><Th label="Entities" align="left" /><Th label="Events" align="left" /><Th label="Pending" align="left" /><Th label="Failed" align="left" /><Th label="Succeeded" align="left" /><Th label="Last applied" align="left" /></tr>
  const W = SY_WINDOWS.find(w => w.k === win)
  const now = Date.now()
  const since = W.k === 'today' ? new Date(new Date().setHours(0, 0, 0, 0)).getTime() : now - W.ms
  const sinceTxt = (() => { const d = new Date(since), p = (n) => String(n).padStart(2, '0'); return W.ms && W.ms >= 864e5 ? syncFmt(since).split(', ')[0] + ', ' + p(d.getHours()) + ':' + p(d.getMinutes()) : p(d.getHours()) + ':' + p(d.getMinutes()) })()
  const tag = W.k === 'today' ? 'today' : W.k
  const ev = syncOutbox.filter(e => e.ts >= since)
  const appliedN = ev.filter(e => e.status === 'Applied').length
  const cnt = (s) => ev.filter(e => e.status === s).length
  const inflight = cnt('New') + cnt('Expanded') + cnt('In Process')
  const allDel = ev.flatMap(e => e.deliveries.map(d => ({ ...d, e })))
  const failed = allDel.filter(d => d.status === 'Failed')
  const failedApps = Array.from(new Set(failed.map(d => d.app)))
  const subApps = syncApps.filter(a => a.subscribed)
  const health = subApps.map(a => {
    const d = allDel.filter(x => x.app === a.name)
    const perEnt = Object.keys(a.subs).map(code => {
      const de = d.filter(x => x.e.entity === code), en = syncEntities.find(z => z.code === code) || { name:code }
      return { code, name:en.name, cols:a.subs[code].length, events:de.length, pending:de.filter(x => x.status === 'Pending').length, failed:de.filter(x => x.status === 'Failed').length, applied:de.filter(x => x.status === 'Applied').length, last:de.reduce((m, x) => x.status === 'Applied' && x.at > m ? x.at : m, 0) }
    }).sort((p, q) => (q.failed - p.failed) || (q.pending - p.pending) || (q.events - p.events))
    return { a, perEnt, ents:Object.keys(a.subs).length, delivered:d.length, applied:d.filter(x => x.status === 'Applied').length, pending:d.filter(x => x.status === 'Pending').length, failed:d.filter(x => x.status === 'Failed').length, last:d.reduce((m, x) => x.status === 'Applied' && x.at > m ? x.at : m, 0) }
  })
  const activeSubs = health.filter(h => h.delivered > 0).length
  const winSeg = (
    <div role="tablist" aria-label="Time window" style={{ display:'inline-flex', alignItems:'stretch', boxSizing:'border-box', height:44, padding:4, gap:2, background:'#EAEEF3', border:'1px solid var(--border)', borderRadius:12, maxWidth:'100%', overflowX:'auto', flex:'none' }}>
      {SY_WINDOWS.map(w => { const on = w.k === win; return (
        <button key={w.k} type="button" role="tab" aria-selected={on} title={w.long} onClick={() => setWin(w.k)}
          style={{ border:'none', borderRadius:9, padding:'0 14px', fontFamily:'inherit', fontSize:13.2, fontWeight: on ? 700 : 600, color: on ? 'var(--ink)' : 'var(--muted)', background: on ? 'var(--surface)' : 'transparent', boxShadow: on ? '0 3px 8px -2px rgba(16,42,84,.18), 0 1px 2px rgba(16,42,84,.08)' : 'none', cursor:'pointer', whiteSpace:'nowrap', flex:'none', transition:'background .2s ease,color .2s ease,box-shadow .2s ease' }}>{w.t}</button>
      )})}
    </div>
  )
  const kpi = (label, value, sub, tone, pct, icon) => (
    <div style={{ ...S.card, padding:'17px 18px 15px', display:'flex', flexDirection:'column', gap:12, minWidth:0, border:'1px solid var(--border-blue)', boxShadow:'0 1px 2px rgba(16,42,84,.05), 0 5px 16px -8px rgba(16,42,84,.12)' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
        <span style={{ fontSize:11.5, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--muted)' }}>{label}</span>
        <Icon d={icon} size={17} style={{ color:'var(--muted)', opacity:.5, flex:'none' }} />
      </div>
      <div style={{ fontSize:30, fontWeight:600, color:'var(--ink)', lineHeight:1, fontVariantNumeric:'tabular-nums', letterSpacing:'-.02em' }}>{value.toLocaleString()}</div>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginTop:'auto', minHeight:24, minWidth:0 }}>
        <div style={{ flex:'1 0 48px', height:5, borderRadius:999, background:'#E9EEF5', overflow:'hidden' }}><div style={{ height:'100%', borderRadius:999, width:Math.min(100, Math.max(2, pct || 0)) + '%', background:SY_KTONE[tone] }} /></div>
        <span title={sub} style={{ fontSize:11.8, color:'var(--muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', minWidth:0 }}>{sub}</span>
      </div>
    </div>
  )
  const head = (title, sub, action) => (
    <div style={{ ...S.cardHead, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
      <div><div style={{ fontSize:14.6, fontWeight:600, color:'var(--ink)' }}>{title}</div>{sub && <div style={{ fontSize:12.2, color:'var(--muted)', marginTop:2 }}>{sub}</div>}</div>
      {action}
    </div>
  )
  const linkBtn = { border:'none', background:'transparent', color:'var(--primary)', fontFamily:'inherit', fontSize:12.8, fontWeight:600, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:5, padding:'6px 4px' }
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Sync Dashboard" sub={'Health of change delivery to subscribed applications · ' + W.long + ' (since ' + sinceTxt + ')'}>{winSeg}</PageHead>
      {failed.length > 0 && (
        <div role="status" style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', marginBottom:16, borderRadius:12, background:'#FDECEC', border:'1px solid #F3C6C6', color:'#B42318', flexWrap:'wrap' }}>
          <Icon d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01" size={18} sw={2.2} />
          <span style={{ flex:1, minWidth:0, fontSize:13.2, fontWeight:500 }}><b style={{ fontWeight:700 }}>{failed.length} {failed.length === 1 ? 'delivery' : 'deliveries'} failed</b> — {failedApps.join(', ')}. Retries are scheduled automatically.</span>
          <button type="button" onClick={() => go('syncOutbox')} style={{ ...linkBtn, color:'#B42318' }}>Review in outbox<Icon d="M5 12h14 M13 6l6 6-6 6" size={14} /></button>
        </div>
      )}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(210px, 1fr))', gap:14, marginBottom:16 }}>
        {kpi('Events', ev.length, ev.length ? appliedN + ' fully applied' : 'No events in this window', 'green', ev.length ? appliedN / ev.length * 100 : 0, 'M22 12h-4l-3 9L9 3l-3 9H2')}
        {kpi('In flight', inflight, cnt('New') + ' new · ' + cnt('Expanded') + ' expanded · ' + cnt('In Process') + ' in process', 'amber', ev.length ? inflight / ev.length * 100 : 0, 'M12 8v4l3 2 M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z')}
        {kpi('Failed deliveries', failed.length, failed.length ? 'across ' + failedApps.length + (failedApps.length === 1 ? ' application' : ' applications') : 'None', 'red', allDel.length ? failed.length / allDel.length * 100 : 0, 'M18 6L6 18 M6 6l12 12')}
        {kpi('Active subscribers', activeSubs, 'of ' + subApps.length + ' subscribed received events', 'blue', subApps.length ? activeSubs / subApps.length * 100 : 0, 'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M17 14v6 M14 17h6')}
      </div>
      <section style={{ ...S.card, marginBottom:16 }}>
        {head('Event pipeline', ev.length + ' events captured · ' + W.long.toLowerCase(), <button type="button" onClick={() => go('syncOutbox')} style={linkBtn}>Open outbox<Icon d="M5 12h14 M13 6l6 6-6 6" size={14} /></button>)}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(190px, 1fr))', gap:12, padding:16 }}>
          {syncEventStatuses.map((s, i) => {
            const c = syncStatusMeta[s]
            return (
              <div key={s} style={{ position:'relative', padding:'14px 16px', borderRadius:12, background:c.bg, border:'1px solid ' + (c.bd === 'transparent' ? 'var(--border)' : c.bd), display:'flex', flexDirection:'column', gap:6 }}>
                <span style={{ display:'flex', alignItems:'center', gap:8, fontSize:12.6, fontWeight:700, color:c.color }}><span aria-hidden style={{ width:8, height:8, borderRadius:'50%', background:c.dot }} />{i + 1}. {s}</span>
                <span style={{ fontSize:26, fontWeight:600, color:'var(--ink)', lineHeight:1.1, fontVariantNumeric:'tabular-nums' }}>{cnt(s)}</span>
                <span style={{ fontSize:12, color:'var(--muted)' }}>{SY_STAGE_HINT[s]}</span>
              </div>
            )
          })}
        </div>
      </section>
      <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
        <section style={S.card}>
          {head('Subscriber health', 'Deliveries per subscribed application · ' + W.long.toLowerCase() + ' · open a row for its entities', <button type="button" onClick={() => go('syncSubscribers')} style={linkBtn}>Manage<Icon d="M5 12h14 M13 6l6 6-6 6" size={14} /></button>)}
          <SyncHealthChart rows={health} />
          <div ref={shWrap} onScroll={shSync} className="tscroll" style={{ overflowX:'auto', borderTop:'1px solid var(--border)', marginTop:8 }}>
            <table style={{ width:'100%', borderCollapse:'collapse', minWidth:780, tableLayout:'fixed' }}>
              {shCols}
              <thead ref={shHead}>{shRow}</thead>
              <tbody>
                {health.map(h => {
                  const isOpen = !!openApps[h.a.code]
                  const toggle = () => setOpenApps(o => ({ ...o, [h.a.code]: !o[h.a.code] }))
                  const num = (v, tone) => <td style={{ padding:'12px 16px', textAlign:'left', fontSize:13, fontVariantNumeric:'tabular-nums', color: v ? tone : '#475467', fontWeight: v && tone !== 'var(--ink)' ? 600 : 400 }}>{v}</td>
                  return (
                  <React.Fragment key={h.a.code}>
                  <tr data-ix="row" tabIndex={0} aria-expanded={isOpen} onClick={toggle} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() } }} style={{ borderTop:'1px solid var(--border)', cursor:'pointer', background: isOpen ? 'var(--primary-tint-2)' : undefined }}>
                    <td style={{ padding:'12px 16px', fontSize:13.6, fontWeight:600, color:'var(--ink)' }}>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:10 }}>
                        <span aria-hidden style={{ width:24, height:24, borderRadius:7, display:'grid', placeItems:'center', flex:'none', background: isOpen ? 'var(--primary)' : 'var(--primary-tint)', color: isOpen ? '#fff' : 'var(--on-tint-blue)', transition:'background .16s ease' }}><Icon d="M9 18l6-6-6-6" size={14} sw={2.4} style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition:'transform .18s ease' }} /></span>
                        {h.a.name}
                      </span>
                    </td>
                    <td style={{ padding:'12px 16px', textAlign:'left', fontSize:13, fontVariantNumeric:'tabular-nums' }}>{h.ents}</td>
                    {num(h.delivered, 'var(--ink)')}
                    {num(h.pending, 'var(--warning-text)')}
                    {num(h.failed, '#B42318')}
                    {num(h.applied, 'var(--success-text)')}
                    <td style={{ padding:'12px 16px', fontSize:13, color: h.last ? 'var(--ink)' : '#475467', whiteSpace:'nowrap' }}>{h.last ? syncAgo(h.last) : 'None in window'}</td>
                  </tr>
                  {isOpen && (
                    <tr>
                      <td colSpan={7} style={{ padding:'0 16px 14px', background:'var(--primary-tint-2)' }}>
                        <div style={{ position:'relative', borderRadius:12, background:'var(--surface)', border:'1px solid var(--border-blue)', boxShadow:'0 1px 2px rgba(16,42,84,.05), 0 6px 16px -10px rgba(16,42,84,.18)', overflow:'hidden', animation:'fadeUp .2s ease both' }}>
                          {h.perEnt.map((p, k) => {
                            const last = k === h.perEnt.length - 1
                            const seg = (v, c) => v ? <span style={{ flex:v, background:c }}></span> : null
                            const n = (v, tone, strong) => <div style={{ padding:'0 16px', fontSize:13, fontVariantNumeric:'tabular-nums', color: v ? tone : '#475467', fontWeight: v && strong ? 600 : 400 }}>{v || '0'}</div>
                            return (
                              <div key={p.code} data-ix="row" style={{ display:'grid', gridTemplateColumns:'minmax(0,1fr) 95px 88px 92px 84px 112px 107px', alignItems:'center', minHeight:52, borderTop: k ? '1px solid var(--border)' : 'none' }}>
                                <div style={{ position:'relative', padding:'9px 16px 9px 44px', minWidth:0 }}>
                                  <span aria-hidden style={{ position:'absolute', left:11, top: k ? 0 : 10, bottom: last ? '50%' : 0, width:1.5, background:'#C9D6E8' }}></span>
                                  <span aria-hidden style={{ position:'absolute', left:11, top:'50%', width:16, height:1.5, background:'#C9D6E8' }}></span>
                                  <span aria-hidden style={{ position:'absolute', left:26, top:'50%', width:8, height:8, marginTop:-3.25, borderRadius:'50%', background: p.failed ? '#DC2626' : p.pending ? '#F59E0B' : p.events ? '#16A34A' : '#C9D3E0', boxShadow:'0 0 0 3px #fff' }}></span>
                                  <div style={{ fontSize:13.2, fontWeight:600, color:'var(--ink)', overflowWrap:'anywhere' }}>{p.name}</div>
                                  <div aria-hidden style={{ display:'flex', gap:2, height:4, width:'min(160px, 100%)', marginTop:6, borderRadius:999, overflow:'hidden', background:'#E9EEF5' }}>
                                    {seg(p.applied, '#0070E0')}{seg(p.pending, '#F59E0B')}{seg(p.failed, '#DC2626')}
                                  </div>
                                </div>
                                <div style={{ padding:'0 16px' }}><span style={{ display:'inline-flex', alignItems:'center', height:22, padding:'0 8px', borderRadius:6, background:'var(--primary-tint-2)', border:'1px solid var(--border)', fontSize:11.8, fontWeight:600, color:'#344054', whiteSpace:'nowrap', fontVariantNumeric:'tabular-nums' }}>{p.cols} cols</span></div>
                                {n(p.events, 'var(--ink)', false)}
                                {n(p.pending, 'var(--warning-text)', true)}
                                {n(p.failed, '#B42318', true)}
                                {n(p.applied, 'var(--success-text)', true)}
                                <div style={{ padding:'0 16px', fontSize:13, color: p.last ? 'var(--ink)' : '#475467' }}>{p.last ? syncAgo(p.last) : 'No events'}</div>
                              </div>
                            )
                          })}
                        </div>
                      </td>
                    </tr>
                  )}
                  </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      {createPortal(
        <div aria-hidden="true" style={{ position:'fixed', zIndex:50, top:sh.top, left:sh.left, width:sh.width, overflow:'hidden', pointerEvents:'none', opacity: sh.vis ? 1 : 0, transform: sh.vis ? 'translateY(0)' : 'translateY(-10px)', transition:'opacity .22s ease, transform .22s cubic-bezier(.2,.8,.2,1)', boxShadow:'0 8px 18px -10px rgba(16,42,84,.45)', borderRadius:'0 0 10px 10px', visibility: sh.width ? 'visible' : 'hidden' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 16px', background:'#0a4a8c', color:'#fff', fontSize:12, fontWeight:600, letterSpacing:'.02em' }}>Subscriber health<span style={{ fontWeight:400, color:'#C9D6EA' }}>· {W.long}</span></div>
          <table style={{ width:sh.tw || '100%', borderCollapse:'collapse', tableLayout:'fixed', transform:'translateX(' + (-sh.sx) + 'px)' }}>{shCols}<thead>{shRow}</thead></table>
        </div>, document.body
      )}
    </div>
  )
}
