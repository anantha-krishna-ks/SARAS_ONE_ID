import React from 'react'
import { Modal, ModalFooter, MiniSwitch, S, Icon } from '../ui'
import { abacAttributeCatalog } from '../data'

const TONE = { string: { bg: '#EEF2FF', fg: '#3F51B5' }, number: { bg: '#ECFDF3', fg: '#1F7A4D' }, time: { bg: '#FFF4E5', fg: '#9A5B00' }, boolean: { bg: '#F3EEFF', fg: '#6D28D9' } }

export function SubjectAttrsModal({ account, onClose, stop, toast }) {
  const attrs = abacAttributeCatalog.subject
  const [vals, setVals] = React.useState(() => account && account.abac ? { ...account.abac } : {})
  const set = (k, v) => setVals(s => ({ ...s, [k]: v }))
  const clear = (k) => setVals(s => { const n = { ...s }; delete n[k]; return n })
  const isSet = (k) => vals[k] !== undefined && vals[k] !== ''
  const count = attrs.filter(a => isSet(a.key)).length
  const save = () => { onClose(); toast('Subject attributes saved for ' + account.name + ' \u2014 ' + count + ' of ' + attrs.length + ' set.', 'success') }
  const inp = { ...S.input, height: 42, borderRadius: 9, fontSize: 13.6 }
  return (
    <Modal title={'Subject attributes \u2014 ' + account.name} desc="Values ABAC policies evaluate for this account. Leave a field empty if the attribute does not apply." onClose={onClose} stop={stop} width={720} footer={<ModalFooter onClose={onClose} onSave={save} save="Save attributes" />}>
      <div style={{ padding: '18px 24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface-page)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <span aria-hidden style={{ flex: 'none', width: 34, height: 34, borderRadius: '50%', background: 'var(--primary-tint)', color: 'var(--primary)', fontSize: 12.2, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{account.initials || (account.name || '?').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()}</span>
            <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}><span style={{ fontSize: 13.6, fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{account.name}</span><span style={{ fontSize: 11.8, color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{account.email || account.login}</span></span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flex: 'none' }}>
            <span style={{ fontSize: 12.4, fontWeight: 600, color: count === attrs.length ? '#1F7A4D' : 'var(--ink-alt)', fontVariantNumeric: 'tabular-nums' }}>{count} of {attrs.length} set</span>
            <span aria-hidden style={{ width: 88, height: 6, borderRadius: 999, background: 'var(--border)', overflow: 'hidden' }}><span style={{ display: 'block', height: '100%', width: (count / attrs.length * 100) + '%', background: count === attrs.length ? '#2E9E6B' : 'var(--primary)', transition: 'width .25s ease' }} /></span>
          </span>
        </div>
        <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          {attrs.map((a, i) => {
            const on = isSet(a.key)
            const tone = TONE[a.type] || TONE.string
            return (
              <div key={a.key} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr) 32px', gap: 14, alignItems: 'center', padding: '13px 16px', borderTop: i ? '1px solid var(--border)' : 'none', background: on ? 'var(--surface)' : 'var(--surface-alt)', transition: 'background .15s ease' }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <label htmlFor={'sa-' + a.key} style={{ fontSize: 13.8, fontWeight: 600, color: 'var(--ink)' }}>{a.label}</label>
                    <span style={{ display: 'inline-flex', alignItems: 'center', height: 18, padding: '0 7px', borderRadius: 999, fontSize: 10.2, fontWeight: 700, letterSpacing: '.03em', textTransform: 'uppercase', background: tone.bg, color: tone.fg }}>{a.type}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2, lineHeight: 1.45 }}>{a.desc}</div>
                  <div style={{ fontSize: 11.2, color: '#9AA5B4', marginTop: 3, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>subject.{a.key}</div>
                </div>
                {a.type === 'boolean' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><MiniSwitch on={vals[a.key] === 'true'} onToggle={() => set(a.key, vals[a.key] === 'true' ? 'false' : 'true')} label={a.label} /><span style={{ fontSize: 12.8, color: 'var(--ink-alt)' }}>{vals[a.key] === 'true' ? 'Yes' : on ? 'No' : 'Not set'}</span></div>
                ) : a.options ? (
                  <select id={'sa-' + a.key} value={vals[a.key] || ''} onChange={(e) => set(a.key, e.target.value)} style={{ ...inp, appearance: 'auto', paddingRight: 10, color: on ? 'var(--ink)' : '#9AA5B4' }}>
                    <option value="">{'Select\u2026'}</option>{a.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input id={'sa-' + a.key} type={a.type === 'time' ? 'time' : 'text'} inputMode={a.type === 'number' ? 'decimal' : undefined} value={vals[a.key] || ''} onChange={(e) => set(a.key, a.type === 'number' ? e.target.value.replace(/[^0-9.\-]/g, '') : e.target.value)} placeholder={a.sample ? 'e.g. ' + a.sample : 'Value'} style={inp} />
                )}
                <button type="button" data-ix="ic" aria-label={'Clear ' + a.label} title="Clear value" disabled={!on} onClick={() => clear(a.key)} style={{ ...S.icon, width: 32, height: 32, border: 'none', background: 'transparent', color: on ? 'var(--muted)' : 'transparent', cursor: on ? 'pointer' : 'default' }}><Icon d="M18 6L6 18 M6 6l12 12" size={14} /></button>
              </div>
            )
          })}
        </div>
        <p style={{ margin: 0, fontSize: 12.2, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 7 }}><Icon d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16v-4 M12 8h.01" size={14} />{'Attributes take effect on the account\u2019s next request; active sessions are re-evaluated within a minute.'}</p>
      </div>
    </Modal>
  )
}
