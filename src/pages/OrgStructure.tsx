import React, { useState } from 'react'
import { S, Icon, PageHead, ExcelIcon } from '../ui'
import { orgTree } from '../data'

function UnitMenu({ node, openUnit, openStatus, confirmDelete, onDelete, toast }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top:0, left:0 })
  const ref = React.useRef(null)
  const del = 'M3 6h18 M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6'
  const pencil = 'M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'
  const openM = () => { const r = ref.current.getBoundingClientRect(); setPos({ top: r.bottom + 4, left: Math.max(8, r.right - 190) }); setOpen(true) }
  const mi = { display:'flex', alignItems:'center', gap:10, width:'100%', padding:'9px 10px', border:'none', background:'transparent', borderRadius:8, cursor:'pointer', font:'inherit', fontSize:13, fontWeight:500, textAlign:'left' }
  const ic = { flex:'none', width:26, height:26, borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center' }
  const dot = { width:'3.5px', height:'3.5px', borderRadius:'50%', background:'var(--muted)' }
  return (
    <span onClick={(e) => e.stopPropagation()} style={{ flex:'none' }}>
      <button ref={ref} data-ix="ic" aria-haspopup="menu" aria-expanded={open} aria-label={'Actions for ' + node.name} title="Actions" onClick={() => open ? setOpen(false) : openM()} style={{ width:30, height:30, borderRadius:8, border:'1px solid var(--border)', background: open ? 'var(--primary-tint)' : 'var(--surface)', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:'2.5px', cursor:'pointer', padding:0 }}>
        <span aria-hidden style={dot} /><span aria-hidden style={dot} /><span aria-hidden style={dot} />
      </button>
      {open && (
        <React.Fragment>
          <div onClick={() => setOpen(false)} style={{ position:'fixed', inset:0, zIndex:70 }} />
          <div role="menu" style={{ position:'fixed', top:pos.top, left:pos.left, zIndex:71, minWidth:190, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, boxShadow:'0 14px 34px -10px rgba(16,42,84,.3)', padding:6, animation:'fadeUp .12s ease' }}>
            <button data-ix="opt" role="menuitem" onClick={() => { setOpen(false); openUnit({ parentName: node.name, parentLevel: node.level }) }} style={{ ...mi, color:'var(--ink)' }}><span style={{ ...ic, color:'var(--on-tint-blue)', background:'var(--primary-tint)' }}><Icon d="M12 5v14 M5 12h14" size={14} /></span>Add sub-unit</button>
            <button data-ix="opt" role="menuitem" onClick={() => { setOpen(false); openUnit(node) }} style={{ ...mi, color:'var(--ink)' }}><span style={{ ...ic, color:'var(--ink)', background:'var(--surface-alt)' }}><Icon d={pencil} size={14} /></span>Edit unit</button>
            <button data-ix="opt" role="menuitem" onClick={() => { setOpen(false); openStatus(node) }} style={{ ...mi, color:'var(--ink)' }}><span style={{ ...ic, color:'var(--on-tint-blue)', background:'var(--primary-tint)' }}><Icon d="M22 12h-4l-3 9L9 3l-3 9H2" size={14} /></span>Manage status</button>
            <button data-ix="opt" role="menuitem" onClick={() => { setOpen(false); confirmDelete({ danger:true, title:'Delete organization unit?', message:node.name + ' and all its sub-units will be removed.', confirmLabel:'Delete unit', onConfirm:() => { onDelete(node.code); toast('Organization unit deleted.', 'danger') } }) }} style={{ ...mi, color:'#B42318' }}><span style={{ ...ic, color:'#B42318', background:'#FDECEC' }}><Icon d={del} size={14} /></span>Delete unit</button>
          </div>
        </React.Fragment>
      )}
    </span>
  )
}

const lighten = (hex, t) => { const h = ('' + hex).replace('#',''); const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16); const m = (c) => Math.round(c + (255 - c) * t); return 'rgb(' + m(r) + ',' + m(g) + ',' + m(b) + ')' }
function OrgNode({ node, guides, last, expanded, toggle, selected, onSelect, openUnit, openStatus, confirmDelete, onDelete, toast, viewOnly }) {
  const LVLC = ['#2F6FEB','#1FA463','#E0971A','#F26B21','#E0392B','#C21F8E','#7C3AED']
  const depth = guides.length
  const col = LVLC[Math.min(depth, LVLC.length - 1)]
  const has = !!(node.children && node.children.length)
  const open = expanded.has(node.code)
  const sel = selected === node.code
  const folder = 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'
  const doc = 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6'
  const del = 'M3 6h18 M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2 M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6'
  const pencil = 'M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z'
  const act = { width:30, height:30, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flex:'none', padding:0 }
  return (
    <div>
      <div data-ix="treerow" data-node-code={node.code} onClick={() => onSelect(node.code)} style={{ display:'flex', alignItems:'stretch', minHeight:50, cursor:'pointer', background: sel ? 'var(--primary-tint)' : 'transparent', borderRadius:8 }}>
        {guides.map((g, i) => (
          <span key={i} aria-hidden style={{ position:'relative', flex:'none', width:28, alignSelf:'stretch' }}>
            {g.line && <span style={{ position:'absolute', left:13, top:0, bottom:0, width:2.2, background:g.color, opacity:.5 }} />}
          </span>
        ))}
        <span aria-hidden style={{ position:'relative', flex:'none', width:28, alignSelf:'stretch' }}>
          <span style={{ position:'absolute', left:13, top:0, height:'calc(50% - 8px)', width:2.2, background:col, opacity:.5 }} />
          <span style={{ position:'absolute', left:13, top:'calc(50% - 8px)', width:10, height:10, borderLeft:'2.2px solid ' + col, borderBottom:'2.2px solid ' + col, borderBottomLeftRadius:8, opacity:.5 }} />
          <span style={{ position:'absolute', left:23, top:'calc(50% - 1.1px)', right:-1, height:2.2, background:col, opacity:.5 }} />
          {!last && <span style={{ position:'absolute', left:13, top:'calc(50% - 8px)', bottom:0, width:2.2, background:col, opacity:.5 }} />}
          {has && <button onClick={(e) => { e.stopPropagation(); toggle(node.code) }} aria-label={open ? 'Collapse' : 'Expand'} style={{ position:'absolute', left:5, top:'50%', transform:'translateY(-50%)', width:18, height:18, border:'none', background:col, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', padding:0, color:'#fff', boxShadow:'0 1px 3px -1px rgba(16,42,84,.35)', zIndex:1 }} data-ix="orgtoggle"><Icon d={open ? 'M5 12h14' : 'M12 5v14 M5 12h14'} size={10} sw={3} /></button>}
        </span>
        <span style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 8px 8px 3px', flex:1, minWidth:0, overflow:'hidden' }}>
          <span aria-hidden style={{ flex:'none', width:30, height:30, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', border:'1px solid var(--border)' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id={'fgrad-' + node.code} x1="12" y1="6" x2="12" y2="18" gradientUnits="userSpaceOnUse"><stop stopColor={lighten(col, 0.45)} /><stop offset="1" stopColor={col} /></linearGradient></defs><path d="M2.5 7.5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.41.59l.83.82a2 2 0 0 0 1.41.59H19.5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4.5a2 2 0 0 1-2-2v-9z" fill={'url(#fgrad-' + node.code + ')'} /><rect x="5" y="8.7" width="14" height="1.5" rx="0.75" fill="#fff" fillOpacity="0.92" /></svg></span>
          <span style={{ fontSize:15.5, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', minWidth:0 }}>{node.name}</span>
          <span style={{ fontSize:13, color:'var(--muted)', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace', whiteSpace:'nowrap', flex:'none' }}>{node.code}</span>
          <span style={{ fontSize:13, color:'var(--muted)', whiteSpace:'nowrap', flex:'none' }}>{node.type}</span>
        </span>
        {node.status === 'Inactive' && <span style={{ alignSelf:'center', fontSize:11, fontWeight:600, color:'var(--warning-text)', background:'var(--amber-tint)', borderRadius:999, padding:'2px 8px', flex:'none', marginRight:6 }}>Inactive</span>}
        {!viewOnly && <span style={{ flex:'none', paddingRight:10, display:'flex', alignItems:'center' }}><UnitMenu node={node} openUnit={openUnit} openStatus={openStatus} confirmDelete={confirmDelete} onDelete={onDelete} toast={toast} /></span>}
      </div>
      {has && open && node.children.map((c, i) => <OrgNode key={c.code} node={c} guides={[...guides, { line: !last, color: col }]} last={i === node.children.length - 1} expanded={expanded} toggle={toggle} selected={selected} onSelect={onSelect} openUnit={openUnit} openStatus={openStatus} confirmDelete={confirmDelete} onDelete={onDelete} toast={toast} viewOnly={viewOnly} />)}
    </div>
  )
}

export function OrgStructure({ toast, openUnit, openStatus, confirmDelete, tree, onDelete, viewOnly }) {
  const LVLC = ['#2F6FEB','#1FA463','#E0971A','#F26B21','#E0392B','#C21F8E','#7C3AED']
  const [expanded, setExpanded] = useState(() => { const s = new Set(); const w = (ns) => ns.forEach(n => { if (n.children && n.children.length) { s.add(n.code); w(n.children) } }); w(tree); return s })
  const [selected, setSelected] = useState('EXA-ROOT')
  const toggle = (code) => setExpanded(s => { const n = new Set(s); n.has(code) ? n.delete(code) : n.add(code); return n })
  const allCodes = () => { const a = []; const w = (ns) => ns.forEach(n => { if (n.children && n.children.length) { a.push(n.code); w(n.children) } }); w(tree); return a }
  const find = (nodes, code) => { for (const n of nodes) { if (n.code === code) return n; if (n.children) { const r = find(n.children, code); if (r) return r } } return null }
  const cur = find(tree, selected) || tree[0]
  const curKids = cur ? (cur.children || []) : []
  const pickChild = (c) => { setSelected(c.code); setExpanded(s => { const x = new Set(s); x.add(cur.code); return x }) }
  const wrapRef = React.useRef(null)
  const treeRef = React.useRef(null)
  const panelRef = React.useRef(null)
  const [line, setLine] = useState(null)
  React.useLayoutEffect(() => {
    const calc = () => {
      const wrap = wrapRef.current, tree = treeRef.current, panel = panelRef.current
      if (!wrap || !tree || !panel) { setLine(null); return }
      const row = wrap.querySelector('[data-node-code="' + selected + '"]')
      if (!row) { setLine(null); return }
      const w = wrap.getBoundingClientRect(), tr = tree.getBoundingClientRect(), pr = panel.getBoundingClientRect(), rr = row.getBoundingClientRect()
      if (pr.left < tr.right - 4) { setLine(null); return }
      setLine({ x1: tr.right - w.left, y1: rr.top - w.top + rr.height / 2, x2: pr.left - w.left, y2: pr.top - w.top + 34, col: LVLC[Math.min(cur ? cur.level : 0, LVLC.length - 1)] })
    }
    calc()
    const sc = document.getElementById('main')
    window.addEventListener('resize', calc)
    if (sc) sc.addEventListener('scroll', calc, true)
    let ro
    if (typeof ResizeObserver !== 'undefined' && wrapRef.current) { ro = new ResizeObserver(calc); ro.observe(wrapRef.current) }
    return () => { window.removeEventListener('resize', calc); if (sc) sc.removeEventListener('scroll', calc, true); if (ro) ro.disconnect() }
  }, [selected, expanded, curKids.length])
  return (
    <div style={{ animation:'fadeUp .28s ease' }}>
      <PageHead title="Organization Structure" sub="Excelsoft Academy · browse and build the unit hierarchy.">
        <button data-ix="ghost" onClick={() => toast('Exporting organization structure to Excel…', 'success')} style={S.ghost}><ExcelIcon />Export</button>
        {!viewOnly && <button data-ix="primary" onClick={() => openUnit(null)} style={S.primary}><Icon d="M12 5v14 M5 12h14" />New unit</button>}
      </PageHead>
      <div ref={wrapRef} style={{ position:'relative', display:'flex', flexWrap:'wrap', gap:24, alignItems:'flex-start' }}>
        {line && <svg aria-hidden style={{ position:'absolute', left:0, top:0, width:'100%', height:'100%', pointerEvents:'none', overflow:'visible', zIndex:5 }}><path d={'M ' + line.x1 + ' ' + line.y1 + ' C ' + (line.x1 + (line.x2 - line.x1) / 2) + ' ' + line.y1 + ', ' + (line.x2 - (line.x2 - line.x1) / 2) + ' ' + line.y2 + ', ' + line.x2 + ' ' + line.y2} stroke={line.col} strokeWidth="2" fill="none" /><circle cx={line.x1} cy={line.y1} r="3.5" fill={line.col} /><circle cx={line.x2} cy={line.y2} r="3.5" fill={line.col} /></svg>}
        <section ref={treeRef} style={{ ...S.card, borderRadius:16, flex:'2 1 340px', minWidth:0 }}>
          <div style={{ ...S.cardHead, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
            <h2 style={{ fontSize:15.6, fontWeight:600, margin:0, color:'var(--ink)' }}>Hierarchy</h2>
            <div style={{ display:'flex', gap:8 }}>
              <button data-ix="ghost" onClick={() => setExpanded(new Set(allCodes()))} style={{ ...S.ghost, height:32, padding:'0 12px', fontSize:12.6 }}><Icon d="M7 13l5 5 5-5 M7 6l5 5 5-5" size={14} />Expand all</button>
              <button data-ix="ghost" onClick={() => setExpanded(new Set())} style={{ ...S.ghost, height:32, padding:'0 12px', fontSize:12.6 }}><Icon d="M17 11l-5-5-5 5 M17 18l-5-5-5 5" size={14} />Collapse all</button>
            </div>
          </div>
          <div style={{ padding:'16px 18px', overflowX:'auto' }}>
            {tree.map((n, i) => <OrgNode key={n.code} node={n} guides={[]} last={i === tree.length - 1} expanded={expanded} toggle={toggle} selected={selected} onSelect={setSelected} openUnit={openUnit} openStatus={openStatus} confirmDelete={confirmDelete} onDelete={onDelete} toast={toast} viewOnly={viewOnly} />)}
          </div>
        </section>
        <section ref={panelRef} style={{ ...S.card, borderRadius:16, flex:'1 1 200px', minWidth:0, borderTop:'3px solid ' + LVLC[Math.min(cur ? cur.level : 0, LVLC.length - 1)] }}>
          <div style={{ ...S.cardHead, borderLeft:'none', padding:'14px 18px', display:'flex', alignItems:'center', gap:10 }}>
            <span aria-hidden style={{ flex:'none', width:38, height:38, borderRadius:10, background:'#fff', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><defs><linearGradient id="fgrad-panel" x1="12" y1="6" x2="12" y2="18" gradientUnits="userSpaceOnUse"><stop stopColor={lighten(LVLC[Math.min(cur ? cur.level : 0, LVLC.length - 1)], 0.45)} /><stop offset="1" stopColor={LVLC[Math.min(cur ? cur.level : 0, LVLC.length - 1)]} /></linearGradient></defs><path d="M2.5 7.5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.41.59l.83.82a2 2 0 0 0 1.41.59H19.5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4.5a2 2 0 0 1-2-2v-9z" fill="url(#fgrad-panel)" /><rect x="5" y="8.7" width="14" height="1.5" rx="0.75" fill="#fff" fillOpacity="0.92" /></svg></span>
            <div style={{ display:'flex', flexDirection:'column', gap:3, minWidth:0 }}>
              <h2 style={{ fontSize:14.5, fontWeight:600, margin:0, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{cur ? cur.name : '—'}</h2>
              <span style={{ fontSize:11.3, color:'var(--muted)' }}>{cur ? cur.type : ''} · Level {cur ? cur.level : 0} · {curKids.length} sub-unit{curKids.length === 1 ? '' : 's'}</span>
            </div>
          </div>
          <div style={{ padding:'14px 14px', display:'flex', flexDirection:'column', gap:10 }}>
            {curKids.length === 0
              ? <div style={{ textAlign:'center', padding:'22px 10px', color:'var(--muted)' }}>
                  <p style={{ margin:'0 0 12px', fontSize:12.8 }}>No sub-units under {cur ? cur.name : 'this unit'}.</p>
                  {!viewOnly && <button data-ix="ghost" onClick={() => openUnit(cur ? { parentName: cur.name, parentLevel: cur.level } : null)} style={{ ...S.ghost, margin:'0 auto', height:34 }}><Icon d="M12 5v14 M5 12h14" size={14} />Add sub-unit</button>}
                </div>
              : curKids.map(c => { const cc = LVLC[Math.min(c.level, LVLC.length - 1)]; const kk = (c.children || []).length; return (
                  <div key={c.code} data-ix="treerow" onClick={() => pickChild(c)} style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 13px', border:'1px solid var(--border)', borderRadius:12, cursor:'pointer' }}>
                    <span aria-hidden style={{ flex:'none', width:9, height:9, borderRadius:3, background:cc }} />
                    <span style={{ display:'flex', flexDirection:'column', gap:2, flex:1, minWidth:0 }}>
                      <span style={{ fontSize:13, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.name}</span>
                      <span style={{ fontSize:10.8, color:'var(--muted)', fontFamily:'ui-monospace,SFMono-Regular,Menlo,monospace' }}>{c.code} · {c.type}</span>
                    </span>
                    {c.status === 'Inactive' && <span aria-hidden style={{ flex:'none', width:7, height:7, borderRadius:'50%', background:'var(--warning)' }} />}
                    {!viewOnly && <span onClick={(e) => e.stopPropagation()} style={{ flex:'none' }}><UnitMenu node={c} openUnit={openUnit} openStatus={openStatus} confirmDelete={confirmDelete} onDelete={onDelete} toast={toast} /></span>}
                    {kk > 0 && <Icon d="M9 18l6-6-6-6" size={14} style={{ flex:'none', stroke:'var(--muted)' }} />}
                  </div>
                )})}
          </div>
        </section>
      </div>
    </div>
  )
}
