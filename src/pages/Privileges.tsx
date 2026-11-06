import React, { useState } from 'react'
import { S, Icon, PageHead, ExcelIcon, Dropdown, SearchBar, MiniSwitch, SegTabs } from '../ui'
import { countPrivs } from '../data'

const LVLC = ['var(--primary)', '#1FA463', '#E0971A', '#7C3AED', '#E0392B', '#C21F8E', '#2F6FEB']
const lighten = (hex, t) => { const h = ('' + hex); if (h[0] !== '#') return h; const x = h.slice(1); const r = parseInt(x.slice(0,2),16), g = parseInt(x.slice(2,4),16), b = parseInt(x.slice(4,6),16); const m = (c) => Math.round(c + (255 - c) * t); return 'rgb(' + m(r) + ',' + m(g) + ',' + m(b) + ')' }

function PrivNode({ node, appName, guides, last, expanded, toggle, selected, onSelect, onToggleActive, toast }) {
  const isApp = node.kind === 'app'
  const depth = guides.length
  const col = LVLC[Math.min(depth, LVLC.length - 1)]
  const has = !!(node.children && node.children.length)
  const open = expanded.has(node.code)
  const sel = selected === node.code
  const folder = 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
  const shield = 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
  const childName = isApp ? node.name : appName
  return (
    <div>
      <div data-ix="treerow" data-node-code={node.code} onClick={() => onSelect(node.code)} style={{ display:'flex', alignItems:'stretch', minHeight:50, cursor:'pointer', background: sel ? 'var(--primary-tint)' : 'transparent', borderRadius:8 }}>
        {guides.map((g, i) => (
          <span key={i} aria-hidden style={{ position:'relative', flex:'none', width:28, alignSelf:'stretch' }}>
            {g.line && <span style={{ position:'absolute', left:13, top:0, bottom:0, width:2.2, background:g.color, opacity:.5 }} />}
          </span>
        ))}
        {!isApp && (
          <span aria-hidden style={{ position:'relative', flex:'none', width:28, alignSelf:'stretch' }}>
            {depth > 0 && (
              <React.Fragment>
                <span style={{ position:'absolute', left:13, top:0, height:'calc(50% - 8px)', width:2.2, background:col, opacity:.5 }} />
                <span style={{ position:'absolute', left:13, top:'calc(50% - 8px)', width:10, height:10, borderLeft:'2.2px solid ' + col, borderBottom:'2.2px solid ' + col, borderBottomLeftRadius:8, opacity:.5 }} />
                <span style={{ position:'absolute', left:23, top:'calc(50% - 1.1px)', right:-1, height:2.2, background:col, opacity:.5 }} />
                {!last && <span style={{ position:'absolute', left:13, top:'calc(50% - 8px)', bottom:0, width:2.2, background:col, opacity:.5 }} />}
              </React.Fragment>
            )}
            {has && <button onClick={(e) => { e.stopPropagation(); toggle(node.code) }} aria-label={open ? 'Collapse' : 'Expand'} style={{ position:'absolute', left:5, top:'50%', transform:'translateY(-50%)', width:18, height:18, border:'none', background:col, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', padding:0, color:'#fff', boxShadow:'0 1px 3px -1px rgba(16,42,84,.35)', zIndex:1 }} data-ix="orgtoggle"><Icon d={open ? 'M5 12h14' : 'M12 5v14 M5 12h14'} size={10} sw={3} /></button>}
          </span>
        )}
        {isApp && has && (
          <span aria-hidden style={{ position:'relative', flex:'none', width:24, alignSelf:'stretch' }}>
            <button onClick={(e) => { e.stopPropagation(); toggle(node.code) }} aria-label={open ? 'Collapse' : 'Expand'} style={{ position:'absolute', left:2, top:'50%', transform:'translateY(-50%)', width:20, height:20, border:'none', background:col, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', padding:0, color:'#fff', boxShadow:'0 1px 3px -1px rgba(16,42,84,.35)', zIndex:1 }} data-ix="orgtoggle"><Icon d={open ? 'M5 12h14' : 'M12 5v14 M5 12h14'} size={11} sw={3} /></button>
          </span>
        )}
        <span style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 8px 8px 6px', flex:1, minWidth:0, overflow:'hidden' }}>
          {isApp ? (
            <span aria-hidden style={{ flex:'none', width:32, height:32, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', background: col, color:'#fff' }}><Icon d={node.icon} size={18} /></span>
          ) : (
            <span aria-hidden style={{ flex:'none', width:30, height:30, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', border:'1px solid var(--border)' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id={'fpv-' + node.code} x1="12" y1="6" x2="12" y2="18" gradientUnits="userSpaceOnUse"><stop stopColor={lighten(col, 0.45)} /><stop offset="1" stopColor={col} /></linearGradient></defs><path d="M2.5 7.5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.41.59l.83.82a2 2 0 0 0 1.41.59H19.5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4.5a2 2 0 0 1-2-2v-9z" fill={'url(#fpv-' + node.code + ')'} /><rect x="5" y="8.7" width="14" height="1.5" rx="0.75" fill="#fff" fillOpacity="0.92" /></svg></span>
          )}
          <span style={{ fontSize: isApp ? 15.5 : 14.5, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', minWidth:0 }}>{node.name}</span>
          {!isApp && node.wbs && <span style={{ fontSize:12, color:'var(--muted)', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', whiteSpace:'nowrap', flex:'none' }}>{node.wbs}</span>}
          {isApp && <span style={{ fontSize:12.5, color:'var(--muted)', whiteSpace:'nowrap', flex:'none' }}>{countPrivs(node.children)} privilege{countPrivs(node.children) === 1 ? '' : 's'}</span>}
        </span>
        {!isApp && <span onClick={(e) => e.stopPropagation()} style={{ flex:'none', display:'flex', alignItems:'center', gap:9, paddingRight:12 }}><span style={{ fontSize:11.5, fontWeight:600, color: node.active === false ? 'var(--muted)' : 'var(--success-text)' }}>{node.active === false ? 'Inactive' : 'Active'}</span><MiniSwitch on={node.active !== false} onToggle={() => onToggleActive(node.code)} label={'Toggle ' + node.name} /></span>}
      </div>
      {has && open && node.children.map((c, i) => <PrivNode key={c.code} node={c} appName={childName} guides={isApp ? [] : [...guides, { line: !last, color: col }]} last={i === node.children.length - 1} expanded={expanded} toggle={toggle} selected={selected} onSelect={onSelect} onToggleActive={onToggleActive} toast={toast} />)}
    </div>
  )
}

function PrivTableApp({ app, expanded, toggle, onToggleActive, onSelect }) {
  const open = expanded.has(app.code)
  const n = countPrivs(app.children)
  const cols = 'minmax(0,1fr) 138px'
  const mono = 'ui-monospace,SFMono-Regular,Menlo,monospace'
  const star = 'M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 9.5l6.9-.6z'
  const rows = []
  const walk = (nodes, depth) => nodes.forEach(nd => {
    const has = nd.children && nd.children.length
    const rOpen = expanded.has(nd.code)
    const col = LVLC[Math.min(depth + 1, LVLC.length - 1)]
    rows.push(
      <div key={nd.code} data-ix="treerow" onClick={() => has ? toggle(nd.code) : onSelect(nd.code)} style={{ display: 'grid', gridTemplateColumns: cols, alignItems: 'center', gap: 12, padding: '11px 16px', borderTop: '1px solid var(--border)', cursor: 'pointer', background: depth > 0 ? 'var(--surface-alt)' : 'var(--surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, minWidth: 0, paddingLeft: depth * 22 }}>
          {has
            ? <span onClick={(e) => { e.stopPropagation(); toggle(nd.code) }} aria-label={rOpen ? 'Collapse' : 'Expand'} style={{ flex: 'none', width: 22, height: 22, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: col }}><Icon d="M9 18l6-6-6-6" size={13} style={{ transform: rOpen ? 'rotate(90deg)' : 'none', transition: 'transform .18s ease' }} /></span>
            : <span aria-hidden style={{ flex: 'none', width: 22, display: 'flex', justifyContent: 'center' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: nd.active === false ? 'var(--muted)' : col }} /></span>}
          <span style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
            <span style={{ fontSize: 13.4, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nd.name}</span>
            <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: mono, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nd.code}</span>
          </span>
        </div>
        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <MiniSwitch on={nd.active !== false} onToggle={() => onToggleActive(nd.code)} label={'Toggle ' + nd.name} />
          <span style={{ fontSize: 11.6, fontWeight: 600, color: nd.active === false ? 'var(--muted)' : 'var(--success-text)' }}>{nd.active === false ? 'Inactive' : 'Active'}</span>
        </div>
      </div>
    )
    if (has && rOpen) walk(nd.children, depth + 1)
  })
  walk(app.children, 0)
  const thStyle = { fontSize: 10.6, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--muted)' }
  return (
    <section style={{ ...S.card, borderRadius: 16 }}>
      <div data-ix="treerow" onClick={() => toggle(app.code)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer', borderLeft: '3px solid ' + LVLC[0], borderRadius: open ? '16px 16px 0 0' : 16 }}>
        <span aria-hidden style={{ flex: 'none', width: 38, height: 38, borderRadius: 10, background: LVLC[0], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon d={app.icon} size={20} /></span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 15.5, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.name}</span>
          <span style={{ fontSize: 12.3, color: 'var(--muted)' }}>{n} privilege{n === 1 ? '' : 's'}</span>
        </div>
        <span aria-hidden style={{ flex: 'none', width: 30, height: 30, borderRadius: 8, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}><Icon d="M6 9l6 6 6-6" size={16} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s ease' }} /></span>
      </div>
      {open && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 12, padding: '9px 16px', background: 'var(--surface-alt)', borderTop: '1px solid var(--border)' }}>
            <div style={thStyle}>Privilege</div><div style={thStyle}>Status</div>
          </div>
          {app.children.length === 0 ? <p style={{ margin: '12px 16px', fontSize: 12.6, color: 'var(--muted)' }}>No privileges in this application.</p> : rows}
        </div>
      )}
    </section>
  )
}

function PrivTableView({ tree, expanded, toggle, onToggleActive, onSelect }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {tree.length === 0
        ? <section style={{ ...S.card, borderRadius: 16, padding: '40px 10px', textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>No privileges match your search.</section>
        : tree.map(app => <PrivTableApp key={app.code} app={app} expanded={expanded} toggle={toggle} onToggleActive={onToggleActive} onSelect={onSelect} />)}
    </div>
  )
}

export function Privileges({ tree, toast, onToggleActive }) {
  const allCodes = () => { const a = []; const w = (ns) => ns.forEach(n => { if (n.children && n.children.length) { a.push(n.code); w(n.children) } }); w(tree); return a }
  const [expanded, setExpanded] = useState(() => new Set(tree.map(a => a.code)))
  const [selected, setSelected] = useState(tree[0] ? tree[0].code : null)
  const [search, setSearch] = useState('')
  const [appFilter, setAppFilter] = useState('All applications')
  const [ddOpen, setDdOpen] = useState(false)
  const [view, setView] = useState('table')
  const toggle = (code) => setExpanded(s => { const n = new Set(s); n.has(code) ? n.delete(code) : n.add(code); return n })

  const q = search.trim().toLowerCase()
  const matches = (n) => !q || n.name.toLowerCase().includes(q) || (n.code || '').toLowerCase().includes(q) || (n.wbs || '').toLowerCase().includes(q)
  const prune = (nodes) => nodes.map(n => {
    const kids = prune(n.children || [])
    if (matches(n) || kids.length) return { ...n, children: kids }
    return null
  }).filter(Boolean)
  let shownTree = appFilter === 'All applications' ? tree : tree.filter(a => a.name === appFilter)
  if (q) shownTree = prune(shownTree)

  const find = (nodes, code, app) => { for (const n of nodes) { if (n.code === code) return { node:n, app }; if (n.children) { const r = find(n.children, code, n.kind === 'app' ? n.name : app); if (r) return r } } return null }
  const hit = find(tree, selected) || (tree[0] ? { node: tree[0], app: null } : null)
  const cur = hit ? hit.node : null
  const curApp = hit ? hit.app : null
  const curIsApp = cur && cur.kind === 'app'
  const kids = cur ? (cur.children || []) : []
  const col = curIsApp ? LVLC[0] : LVLC[1]
  const pickChild = (c) => { setSelected(c.code); if (cur) setExpanded(s => { const x = new Set(s); x.add(cur.code); return x }) }
  const shield = 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
  const folder = 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'

  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Privileges" sub={'Privilege catalogue \u00B7 ' + tree.length + ' applications \u00B7 ' + countPrivs(tree.flatMap(a => a.children)) + ' privileges'}>
        <button data-ix="ghost" onClick={() => toast('Exporting privilege catalogue to Excel\u2026', 'success')} style={S.ghost}><ExcelIcon />Export</button>
      </PageHead>
      <section style={{ ...S.card, borderRadius:16, marginBottom:16, overflow:'visible' }}>
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search privileges by name, code or WBS…" topRound>
          <div style={{ minWidth:230 }}><Dropdown value={appFilter} options={['All applications', ...tree.map(a => a.name)]} open={ddOpen} onToggle={() => setDdOpen(o => !o)} onSelect={(v) => { setAppFilter(v); setDdOpen(false) }} leadIcon="M3 5h18v14H3z M3 9h18 M7 7h.01" prefix="App:" ariaLabel="Filter by application" /></div>
        </SearchBar>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:8, padding:'10px 16px', borderBottomLeftRadius:15, borderBottomRightRadius:15 }}>
          <button data-ix="ghost" onClick={() => setExpanded(new Set(allCodes()))} style={{ ...S.ghost, height:32, padding:'0 12px', fontSize:12.6 }}><Icon d="M7 13l5 5 5-5 M7 6l5 5 5-5" size={14} />Expand all</button>
          <button data-ix="ghost" onClick={() => setExpanded(new Set())} style={{ ...S.ghost, height:32, padding:'0 12px', fontSize:12.6 }}><Icon d="M17 11l-5-5-5 5 M17 18l-5-5-5 5" size={14} />Collapse all</button>
        </div>
      </section>
      {view === 'table' && <PrivTableView tree={shownTree} expanded={expanded} toggle={toggle} onToggleActive={onToggleActive} onSelect={setSelected} />}
      {view === 'cards' && <div style={{ display:'flex', flexWrap:'wrap', gap:24, alignItems:'flex-start' }}>
        <div style={{ flex:'2 1 380px', minWidth:0, display:'flex', flexDirection:'column', gap:14 }}>
          {shownTree.length === 0
            ? <section style={{ ...S.card, borderRadius:16, padding:'40px 10px', textAlign:'center', color:'var(--muted)', fontSize:13 }}>No privileges match your search.</section>
            : shownTree.map(app => {
                const aOpen = expanded.has(app.code)
                const aSel = selected === app.code
                const n = countPrivs(app.children)
                return (
                  <section key={app.code} style={{ ...S.card, borderRadius:16, border: aSel ? '1px solid var(--primary)' : '1px solid var(--border)', boxShadow: aSel ? '0 0 0 3px var(--primary-tint)' : S.card.boxShadow }}>
                    <div data-ix="treerow" data-node-code={app.code} onClick={() => { setSelected(app.code); toggle(app.code) }} style={{ display:'flex', alignItems:'center', gap:12, padding:'14px 16px', cursor:'pointer', borderLeft:'3px solid ' + LVLC[0], borderRadius: aOpen ? '16px 16px 0 0' : 16 }}>
                      <span aria-hidden style={{ flex:'none', width:38, height:38, borderRadius:10, background:LVLC[0], color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon d={app.icon} size={20} /></span>
                      <div style={{ display:'flex', flexDirection:'column', gap:2, flex:1, minWidth:0 }}>
                        <span style={{ fontSize:15.5, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{app.name}</span>
                        <span style={{ fontSize:12.3, color:'var(--muted)' }}>{n} privilege{n === 1 ? '' : 's'}</span>
                      </div>
                      <span aria-hidden style={{ flex:'none', width:30, height:30, borderRadius:8, border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)' }}><Icon d="M6 9l6 6 6-6" size={16} style={{ transform: aOpen ? 'rotate(180deg)' : 'none', transition:'transform .2s ease' }} /></span>
                    </div>
                    {aOpen && <div style={{ padding:'8px 14px 14px', borderTop:'1px solid var(--border)', overflowX:'auto' }}>
                      {app.children.length === 0
                        ? <p style={{ margin:'10px 4px', fontSize:12.6, color:'var(--muted)' }}>No privileges in this application yet.</p>
                        : app.children.map((c, i) => <PrivNode key={c.code} node={c} appName={app.name} guides={[]} last={i === app.children.length - 1} expanded={expanded} toggle={toggle} selected={selected} onSelect={setSelected} onToggleActive={onToggleActive} toast={toast} />)}
                    </div>}
                  </section>
                )
              })}
        </div>

        <section style={{ ...S.card, borderRadius:16, flex:'1 1 260px', minWidth:0, borderTop:'3px solid ' + col, position:'sticky', top:80, alignSelf:'flex-start', maxHeight:'calc(100vh - 96px)', overflowY:'auto' }}>
          {!cur ? <div style={{ padding:'40px 20px', textAlign:'center', color:'var(--muted)', fontSize:13 }}>Select a privilege to see its details.</div> : (
          <React.Fragment>
            <div style={{ ...S.cardHead, borderLeft:'none', padding:'14px 18px', display:'flex', alignItems:'center', gap:11 }}>
              <span aria-hidden style={{ flex:'none', width:36, height:36, borderRadius:9, background: curIsApp ? col : 'var(--primary-tint)', color: curIsApp ? '#fff' : col, display:'flex', alignItems:'center', justifyContent:'center' }}><Icon d={curIsApp ? cur.icon : ((cur.children && cur.children.length) ? folder : shield)} size={19} /></span>
              <div style={{ display:'flex', flexDirection:'column', gap:3, minWidth:0, flex:1 }}>
                <h2 style={{ fontSize:15, fontWeight:600, margin:0, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{cur.name}</h2>
                <span style={{ fontSize:11.4, color:'var(--muted)' }}>{curIsApp ? 'Application' : (curApp || 'Privilege')} \u00B7 {kids.length} child{kids.length === 1 ? '' : 'ren'}</span>
              </div>
              {!curIsApp && (cur.active === false
                ? <span style={{ flex:'none', fontSize:11.4, fontWeight:600, color:'var(--warning-text)', background:'var(--amber-tint)', borderRadius:999, padding:'3px 10px' }}>Inactive</span>
                : <span style={{ flex:'none', display:'inline-flex', alignItems:'center', gap:5, fontSize:11.4, fontWeight:600, color:'var(--success-text)', background:'var(--green-tint)', borderRadius:999, padding:'3px 10px 3px 8px' }}><Icon d="M20 6L9 17l-5-5" size={12} sw={2.6} />Active</span>)}
            </div>
            <div style={{ padding:'16px 18px', display:'flex', flexDirection:'column', gap:16 }}>
              {!curIsApp && (
                <React.Fragment>
                  <dl style={{ margin:0, display:'grid', gridTemplateColumns:'auto 1fr', gap:'9px 16px', fontSize:12.8 }}>
                    <dt style={{ color:'var(--muted)' }}>Code</dt><dd style={{ margin:0, fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', color:'var(--ink)', wordBreak:'break-all' }}>{cur.code}</dd>
                    <dt style={{ color:'var(--muted)' }}>WBS</dt><dd style={{ margin:0, fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', color:'var(--ink)' }}>{cur.wbs || '\u2014'}</dd>
                    <dt style={{ color:'var(--muted)' }}>Application</dt><dd style={{ margin:0, color:'var(--ink)' }}>{curApp || '\u2014'}</dd>
                    <dt style={{ color:'var(--muted)' }}>Default</dt><dd style={{ margin:0, color:'var(--ink)' }}>{cur.isDefault ? 'Yes \u2014 granted to new roles' : 'No'}</dd>
                  </dl>
                  {cur.desc && <p style={{ margin:0, fontSize:12.9, lineHeight:1.6, color:'var(--muted)', textWrap:'pretty' }}>{cur.desc}</p>}
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'13px 15px', border:'1px solid var(--border)', borderRadius:12, background:'var(--surface-alt)' }}>
                    <span style={{ display:'flex', flexDirection:'column', gap:2 }}><span style={{ fontSize:13.6, fontWeight:600, color:'var(--ink)' }}>{cur.active === false ? 'Inactive' : 'Active'}</span><span style={{ fontSize:11.8, color:'var(--muted)' }}>{cur.active === false ? 'Hidden from role mapping.' : 'Available for role mapping.'}</span></span>
                    <MiniSwitch on={cur.active !== false} onToggle={() => onToggleActive(cur.code)} label="Toggle privilege active" />
                  </div>
                </React.Fragment>
              )}
              <div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                  <span style={{ fontSize:11, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--muted)' }}>{curIsApp ? 'Top-level privileges' : 'Child privileges'}</span>
                </div>
                {kids.length === 0
                  ? <p style={{ margin:0, fontSize:12.6, color:'var(--muted)' }}>No {curIsApp ? 'privileges' : 'children'} yet.</p>
                  : <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                      {kids.map(c => { const kk = (c.children || []).length; return (
                        <div key={c.code} data-ix="treerow" onClick={() => pickChild(c)} style={{ display:'flex', alignItems:'center', gap:10, padding:'11px 12px', border:'1px solid var(--border)', borderRadius:12, cursor:'pointer' }}>
                          <span aria-hidden style={{ flex:'none', width:9, height:9, borderRadius:3, background: c.active === false ? 'var(--warning)' : LVLC[1] }} />
                          <span style={{ display:'flex', flexDirection:'column', gap:2, flex:1, minWidth:0 }}>
                            <span style={{ fontSize:13, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.name}</span>
                            <span style={{ fontSize:10.8, color:'var(--muted)', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace' }}>{c.code}</span>
                          </span>
                          {c.isDefault && <span aria-hidden title="Default" style={{ flex:'none', color:'var(--on-tint-blue)' }}><Icon d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 9.5l6.9-.6z" size={13} sw={1.8} /></span>}
                          {kk > 0 && <span style={{ flex:'none', fontSize:11, color:'var(--muted)', fontVariantNumeric:'tabular-nums' }}>{kk}</span>}
                          <Icon d="M9 18l6-6-6-6" size={14} style={{ flex:'none', stroke:'var(--muted)' }} />
                        </div>
                      )})}
                    </div>}
              </div>
            </div>
          </React.Fragment>
          )}
        </section>
      </div>}
    </div>
  )
}
