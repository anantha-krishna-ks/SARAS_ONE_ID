import React from 'react'
import { Modal, Dropdown, S, Icon, ToggleField } from '../ui'
import { abacAttributeCatalog, abacPolicySeeds } from '../data'

const OPERAND_TYPES = ['Subject', 'Resource', 'Environment']
const OPS = {
  string: [['eq', 'equals'], ['neq', 'does not equal'], ['contains', 'contains'], ['starts', 'starts with'], ['in', 'is one of']],
  number: [['eq', '='], ['neq', '\u2260'], ['gt', '>'], ['gte', '\u2265'], ['lt', '<'], ['lte', '\u2264'], ['between', 'between']],
  time: [['eq', 'is at'], ['before', 'is before'], ['after', 'is after'], ['between', 'is between']],
}
const TYPE_TONE = { string: { bg: '#EEF2FF', fg: '#3F51B5' }, number: { bg: '#ECFDF3', fg: '#1F7A4D' }, time: { bg: '#FFF4E5', fg: '#9A5B00' } }
const attrsOf = (t) => abacAttributeCatalog[(t || '').toLowerCase()] || []
const findAttr = (t, key) => attrsOf(t).find(a => a.key === key) || null
let seq = 0
const blank = () => ({ id: 'c' + (++seq) + '_' + Date.now(), lt: 'Subject', la: '', op: '', rt: 'Static value', ra: '', v1: '', v2: '' })

export function PolicyModal({ onClose, stop, toast, record }) {
  const edit = !!record
  const seed = record ? abacPolicySeeds[record.code] : null
  const [ro, setRo] = React.useState(!!(record && record.view))
  const [name, setName] = React.useState(record ? record.name : '')
  const [code, setCode] = React.useState(record ? record.code : '')
  const [desc, setDesc] = React.useState(seed ? seed.desc || '' : '')
  const [effect, setEffect] = React.useState(seed ? seed.effect : 'Allow')
  const [match, setMatch] = React.useState(seed ? seed.match : 'all')
  const [active, setActive] = React.useState(record ? record.status === 'Active' : true)
  const [conds, setConds] = React.useState(() => (seed && seed.conditions.length ? seed.conditions.map(c => ({ ...blank(), ...c })) : [blank()]))
  const [ddOpen, setDdOpen] = React.useState(null)
  const [submitted, setSubmitted] = React.useState(false)
  const [shake, setShake] = React.useState(false)
  const dd = (id, value, options, onSelect, ariaLabel) => (
    <Dropdown menuPortal value={value} options={options} open={ddOpen === id} onToggle={() => !ro && setDdOpen(o => (o === id ? null : id))} onSelect={(v) => { onSelect(v); setDdOpen(null) }} ariaLabel={ariaLabel} />
  )
  const upd = (id, patch) => setConds(cs => cs.map(c => {
    if (c.id !== id) return c
    const n = { ...c, ...patch }
    const attr = findAttr(n.lt, n.la)
    const ops = attr ? OPS[attr.type] : []
    if (!ops.find(o => o[0] === n.op)) n.op = ops.length ? ops[0][0] : ''
    if (n.rt !== 'Static value') { const ra = findAttr(n.rt, n.ra); if (!ra || !attr || ra.type !== attr.type) n.ra = '' }
    if (n.op === 'between' && n.rt !== 'Static value') n.rt = 'Static value'
    return n
  }))
  const remove = (id) => setConds(cs => cs.length > 1 ? cs.filter(c => c.id !== id) : cs)
  const add = () => setConds(cs => [...cs, blank()])
  const complete = (c) => { const a = findAttr(c.lt, c.la); if (!a || !c.op) return false; if (c.rt === 'Static value') return c.op === 'between' ? !!(c.v1 && c.v2) : !!c.v1; return !!c.ra }
  const errs = { name: !name.trim() ? 'Policy name is required.' : '', code: !edit && !code.trim() ? 'Code is required.' : '', conds: !conds.every(complete) ? 'Complete every condition or remove the unfinished ones.' : '' }
  const valid = !errs.name && !errs.code && !errs.conds
  const save = () => { if (!valid) { setSubmitted(true); setShake(true); return } onClose(); toast(edit ? 'Policy \u201c' + name + '\u201d updated.' : 'Policy \u201c' + name + '\u201d created.', 'success') }
  const opLabel = (c) => { const a = findAttr(c.lt, c.la); const o = a && OPS[a.type].find(x => x[0] === c.op); return o ? o[1] : '' }
  const rhs = (c) => c.rt === 'Static value' ? (c.op === 'between' ? (c.v1 || '\u2026') + ' and ' + (c.v2 || '\u2026') : (c.v1 ? (c.op === 'in' ? '[' + c.v1 + ']' : '\u201c' + c.v1 + '\u201d') : '\u2026')) : (c.ra ? c.rt.toLowerCase() + '.' + c.ra : '\u2026')
  const sentence = (c) => (c.la ? c.lt.toLowerCase() + '.' + c.la : '\u2026') + ' ' + (opLabel(c) || '\u2026') + ' ' + rhs(c)
  const L = { display: 'block', fontSize: 11.2, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }
  const inp = { ...S.input, height: 44 }
  const TypePill = ({ t }) => t ? <span style={{ display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 8px', borderRadius: 999, fontSize: 10.8, fontWeight: 700, letterSpacing: '.03em', textTransform: 'uppercase', background: TYPE_TONE[t].bg, color: TYPE_TONE[t].fg, flex: 'none' }}>{t}</span> : null
  const footer = ro
    ? <><button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Close</button><button data-ix="primary" onClick={() => setRo(false)} style={S.modalBtnPrimary}>Edit policy</button></>
    : <><button data-ix="ghost" onClick={onClose} style={S.modalBtnGhost}>Cancel</button><button data-ix="primary" onClick={save} style={S.modalBtnPrimary}>{edit ? 'Save changes' : 'Create policy'}</button></>
  return (
    <Modal title={ro ? 'Policy \u2014 ' + name : edit ? 'Edit policy' : 'New ABAC policy'} desc={ro ? 'Read-only view of this policy\u2019s rules.' : 'Define who may access what, under which conditions.'} onClose={onClose} stop={stop} width={1160} shake={shake} onShakeEnd={() => setShake(false)} footer={footer}>
      <div style={{ padding: '22px 26px 26px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {submitted && !valid && <div role="alert" style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 14px', background: '#FDECEC', border: '1px solid #F3C6C6', borderRadius: 10, color: '#B42318', fontSize: 13.2, fontWeight: 500 }}><Icon d="M12 9v4 M12 17h.01 M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" size={15} />{errs.name || errs.code || errs.conds}</div>}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(160px, 260px)', gap: 16 }}>
          <div>
            <label htmlFor="pol-name" style={S.label}>Policy name <span style={{ color: '#DC2626' }}>*</span></label>
            <input id="pol-name" value={name} readOnly={ro} onChange={(e) => { setName(e.target.value); if (!edit) setCode('POL_' + e.target.value.trim().toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 24)) }} placeholder="e.g. Business-hours access" style={submitted && errs.name ? { ...inp, borderColor: '#DC2626' } : inp} />
          </div>
          <div>
            <label htmlFor="pol-code" style={S.label}>Code</label>
            <input id="pol-code" value={code} readOnly={ro || edit} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="POL_…" style={{ ...inp, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13.4, background: (ro || edit) ? 'var(--surface-alt)' : 'var(--surface)', color: (ro || edit) ? 'var(--muted)' : 'var(--ink)' }} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="pol-desc" style={S.label}>Description</label>
            <textarea id="pol-desc" rows={3} readOnly={ro} value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="What this policy protects and why…" style={{ ...S.input, height: 'auto', minHeight: 88, padding: '11px 14px', resize: 'vertical', lineHeight: 1.5 }} />
          </div>
        </div>
        <section style={{ border: '1px solid var(--border)', borderRadius: 14, background: 'var(--surface)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', background: 'var(--surface-page)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontSize: 14.4, fontWeight: 600, color: 'var(--ink)' }}>Conditions</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: conds.every(complete) ? '#1F7A4D' : 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 999, padding: '3px 10px', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}><span aria-hidden style={{ width: 7, height: 7, borderRadius: '50%', background: conds.every(complete) ? '#2E9E6B' : '#E2A32D' }} />{conds.filter(complete).length} of {conds.length} condition{conds.length === 1 ? '' : 's'} complete</span>
            </div>
          </div>
          <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {conds.map((c, i) => {
              const attr = findAttr(c.lt, c.la)
              const ops = attr ? OPS[attr.type] : []
              const done = complete(c)
              const bad = submitted && !done
              const rightAttrs = c.rt !== 'Static value' ? attrsOf(c.rt).filter(a => attr && a.type === attr.type) : []
              const rtOptions = c.op === 'between' ? ['Static value'] : ['Static value', ...OPERAND_TYPES]
              return (
                <React.Fragment key={c.id}>
                  {i > 0 && <div aria-hidden style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0 6px 22px' }}><span style={{ width: 2, height: 14, background: 'var(--border-blue)', marginLeft: 9 }} /><span style={{ fontSize: 10.8, fontWeight: 700, letterSpacing: '.08em', color: 'var(--primary)', background: 'var(--primary-tint)', border: '1px solid var(--border-blue)', borderRadius: 999, padding: '2px 9px' }}>{match === 'all' ? 'AND' : 'OR'}</span></div>}
                  <div style={{ display: 'grid', gridTemplateColumns: '36px minmax(0, 1fr) 36px', gap: 12, alignItems: 'start', padding: 16, border: '1px solid ' + (bad ? '#F3C6C6' : done ? 'var(--border-blue)' : 'var(--border)'), borderRadius: 12, background: bad ? '#FFF8F8' : 'var(--surface)', boxShadow: '0 1px 2px rgba(16,42,84,.04)' }}>
                    <span aria-hidden style={{ width: 36, height: 36, borderRadius: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12.6, fontWeight: 700, background: done ? 'var(--primary)' : 'var(--surface-page)', color: done ? '#fff' : 'var(--muted)', border: '1px solid ' + (done ? 'var(--primary)' : 'var(--border)'), marginTop: 22 }}>{done ? <Icon d="M20 6L9 17l-5-5" size={14} sw={3} /> : i + 1}</span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(185px, 1fr))', gap: 14, minWidth: 0 }}>
                      <div style={{ minWidth: 0 }}>
                        <span style={L}>Attribute</span>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 8 }}>
                          {dd(c.id + 'lt', c.lt, OPERAND_TYPES, (v) => upd(c.id, { lt: v, la: '' }), 'Attribute type')}
                          {dd(c.id + 'la', attr ? attr.label : 'Select attribute\u2026', attrsOf(c.lt).map(a => a.label), (v) => upd(c.id, { la: attrsOf(c.lt).find(a => a.label === v).key }), 'Attribute')}
                        </div>
                        <div style={{ marginTop: 7, minHeight: 20, display: 'flex', alignItems: 'center', gap: 8 }}>{attr ? <><TypePill t={attr.type} /><span style={{ fontSize: 11.8, color: 'var(--muted)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>{c.lt.toLowerCase()}.{attr.key}</span></> : <span style={{ fontSize: 11.8, color: 'var(--muted)' }}>Pick the attribute to evaluate.</span>}</div>
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <span style={L}>Operator</span>
                        {attr ? dd(c.id + 'op', opLabel(c) || 'Select\u2026', ops.map(o => o[1]), (v) => upd(c.id, { op: ops.find(o => o[1] === v)[0] }), 'Operator')
                          : <div style={{ ...inp, display: 'flex', alignItems: 'center', background: 'var(--surface-alt)', color: '#B9C2CF', border: '1.5px dashed #D5DBE4', fontSize: 13.4 }}>Operator</div>}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <span style={L}>Compare with</span>
                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 8 }}>
                          {dd(c.id + 'rt', c.rt, rtOptions, (v) => upd(c.id, { rt: v, ra: '', v1: '', v2: '' }), 'Compare with')}
                          {c.rt === 'Static value' ? (
                            c.op === 'between' ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                                <input aria-label="From" readOnly={ro} type={attr && attr.type === 'time' ? 'time' : 'text'} inputMode={attr && attr.type === 'number' ? 'decimal' : undefined} value={c.v1} onChange={(e) => upd(c.id, { v1: e.target.value })} placeholder={attr && attr.type === 'number' ? '0' : 'From'} style={{ ...inp, padding: '0 10px', minWidth: 0 }} />
                                <span style={{ fontSize: 12, color: 'var(--muted)', flex: 'none' }}>to</span>
                                <input aria-label="To" readOnly={ro} type={attr && attr.type === 'time' ? 'time' : 'text'} inputMode={attr && attr.type === 'number' ? 'decimal' : undefined} value={c.v2} onChange={(e) => upd(c.id, { v2: e.target.value })} placeholder={attr && attr.type === 'number' ? '100' : 'To'} style={{ ...inp, padding: '0 10px', minWidth: 0 }} />
                              </div>
                            ) : <input aria-label="Value" readOnly={ro} type={attr && attr.type === 'time' ? 'time' : 'text'} inputMode={attr && attr.type === 'number' ? 'decimal' : undefined} value={c.v1} onChange={(e) => upd(c.id, { v1: e.target.value })} placeholder={!attr ? 'Value' : c.op === 'in' ? 'Comma-separated values' : attr.type === 'number' ? 'e.g. 70' : attr.type === 'time' ? 'HH:MM' : 'e.g. ' + (attr.sample || 'value')} style={{ ...inp, minWidth: 0 }} />
                          ) : dd(c.id + 'ra', c.ra ? (findAttr(c.rt, c.ra) || {}).label : (rightAttrs.length ? 'Select attribute\u2026' : 'No matching attribute'), rightAttrs.map(a => a.label), (v) => upd(c.id, { ra: rightAttrs.find(a => a.label === v).key }), 'Compared attribute')}
                        </div>
                        <div style={{ marginTop: 7, minHeight: 20, fontSize: 11.8, color: 'var(--muted)' }}>{c.rt === 'Static value' ? (c.op === 'in' ? 'Separate values with commas.' : attr && attr.type === 'time' ? 'Tenant local time.' : 'Fixed value entered here.') : (attr ? 'Only ' + attr.type + ' attributes are comparable.' : 'Pick the left attribute first.')}</div>
                      </div>
                    </div>
                    <button type="button" data-ix="dang" aria-label="Remove condition" title={conds.length === 1 ? 'A policy needs at least one condition' : 'Remove condition'} disabled={ro || conds.length === 1} onClick={() => remove(c.id)} style={{ ...S.icon, width: 36, height: 36, borderRadius: 10, marginTop: 22, color: conds.length === 1 || ro ? '#C4CDD9' : '#B42318', cursor: conds.length === 1 || ro ? 'default' : 'pointer' }}><Icon d="M18 6L6 18 M6 6l12 12" size={15} /></button>
                  </div>
                </React.Fragment>
              )
            })}
            {!ro && <button type="button" data-ix="ghost" onClick={add} style={{ marginTop: 14, alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px', border: '1.5px dashed var(--border-blue)', borderRadius: 10, background: 'var(--primary-tint-2)', color: 'var(--primary)', fontFamily: 'inherit', fontSize: 13.4, fontWeight: 600, cursor: 'pointer' }}><Icon d="M12 5v14 M5 12h14" size={15} sw={2.4} />Add condition</button>}
          </div>
          <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border)', background: 'var(--surface-page)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span aria-hidden style={{ flex: 'none', width: 30, height: 30, borderRadius: 8, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: effect === 'Allow' ? '#ECFDF3' : '#FDECEC', color: effect === 'Allow' ? '#1F7A4D' : '#B42318' }}><Icon d={effect === 'Allow' ? 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4' : 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M15 9l-6 6 M9 9l6 6'} size={15} /></span>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 11.2, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 3 }}>Policy summary</div>
              <p style={{ margin: 0, fontSize: 13.4, lineHeight: 1.6, color: 'var(--ink)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', wordBreak: 'break-word' }}><b style={{ color: effect === 'Allow' ? '#1F7A4D' : '#B42318' }}>{effect.toUpperCase()}</b> when {conds.map((c, i) => <React.Fragment key={c.id}>{i > 0 && <b style={{ color: 'var(--primary)' }}> {match === 'all' ? 'AND' : 'OR'} </b>}{sentence(c)}</React.Fragment>)}</p>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  )
}
