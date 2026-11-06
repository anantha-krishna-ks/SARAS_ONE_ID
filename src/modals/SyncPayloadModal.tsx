import React from 'react'
import { Modal, S, Icon } from '../ui'
import { SyncOp, SyncStatus, syncMono } from '../components/SyncBits'

const SY_TOKEN = /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g
function syJsonLine(line) {
  const out = []
  let last = 0, m, k = 0
  SY_TOKEN.lastIndex = 0
  while ((m = SY_TOKEN.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index))
    if (m[1]) {
      if (m[2]) { out.push(<span key={k++} style={{ color:'#0a4a8c', fontWeight:600 }}>{m[1]}</span>); out.push(m[2]) }
      else out.push(<span key={k++} style={{ color:'var(--success-text)' }}>{m[1]}</span>)
    } else if (m[3]) out.push(<span key={k++} style={{ color:'#6D28D9', fontWeight:600 }}>{m[3]}</span>)
    else out.push(<span key={k++} style={{ color:'#B45309' }}>{m[4]}</span>)
    last = SY_TOKEN.lastIndex
  }
  if (last < line.length) out.push(line.slice(last))
  return out
}

export function SyncPayloadModal({ rec, onClose, stop, toast }) {
  const [wrap, setWrap] = React.useState(false)
  const json = JSON.stringify(rec.payload, null, 2)
  const lines = json.split('\n')
  const bytes = new Blob([json]).size
  const copy = () => { try { if (navigator.clipboard) navigator.clipboard.writeText(json).catch(() => {}) } catch (e) {} if (toast) toast('Payload copied to clipboard.', 'success') }
  const tool = { height:32, padding:'0 12px', borderRadius:8, border:'1px solid var(--border-blue)', background:'var(--surface)', color:'var(--ink)', fontFamily:'inherit', fontSize:12.6, fontWeight:600, display:'inline-flex', alignItems:'center', gap:7, cursor:'pointer' }
  return (
    <Modal title="Event payload" desc={rec.id + ' · ' + rec.entityName + ' · ' + rec.code} onClose={onClose} stop={stop} width={820}
      footer={<button data-ix="primary" onClick={onClose} style={S.modalBtnPrimary}>Close</button>}>
      <div style={{ padding:'18px 24px 22px', display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:14, flexWrap:'wrap' }}>
          <SyncOp op={rec.operation} />
          <SyncStatus status={rec.status} />
          <span style={{ fontSize:12.4, color:'var(--muted)', fontVariantNumeric:'tabular-nums' }}>{lines.length} lines · {bytes.toLocaleString()} bytes</span>
          <span style={{ marginLeft:'auto', display:'flex', gap:8 }}>
            <button type="button" data-ix="ghost" onClick={() => setWrap(w => !w)} aria-pressed={wrap} style={{ ...tool, background: wrap ? 'var(--primary-tint)' : 'var(--surface)', color: wrap ? 'var(--on-tint-blue)' : 'var(--ink)' }}><Icon d="M3 6h18 M3 12h15a3 3 0 0 1 0 6h-4 M16 15l-3 3 3 3 M3 18h7" size={14} />Wrap lines</button>
            <button type="button" data-ix="ghost" onClick={copy} style={tool}><Icon d="M9 9h11v11H9z M5 15H4V4h11v1" size={14} />Copy JSON</button>
          </span>
        </div>
        <div role="region" aria-label="JSON payload" tabIndex={0} style={{ border:'1px solid var(--border-blue)', borderRadius:12, background:'#F8FAFD', maxHeight:'56vh', overflow:'auto', fontFamily:syncMono, fontSize:12.6, lineHeight:1.7 }}>
          <div style={{ display:'grid', gridTemplateColumns:'auto minmax(0,1fr)', minWidth: wrap ? 0 : 'max-content' }}>
            {lines.map((ln, i) => (
              <React.Fragment key={i}>
                <span aria-hidden style={{ padding:'0 12px 0 14px', textAlign:'right', color:'#9AA6B4', userSelect:'none', borderRight:'1px solid var(--border)', background:'var(--surface)', fontVariantNumeric:'tabular-nums', position:'sticky', left:0 }}>{i + 1}</span>
                <span style={{ padding:'0 16px 0 14px', whiteSpace: wrap ? 'pre-wrap' : 'pre', wordBreak: wrap ? 'break-all' : 'normal', color:'var(--ink)' }}>{syJsonLine(ln)}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
