import React, { useState } from 'react'
import { S, Icon, Stepper } from '../ui'
import { pwToggles, pwPatternToggles, pwMfaToggles } from '../data'

export function PasswordPolicy({ minLen, setMinLen, toast }) {
  const allToggles = [...pwToggles, ...pwPatternToggles, ...pwMfaToggles]
  const [tgState, setTgState] = useState(() => { const o = {}; allToggles.forEach(t => { o[t.key] = t.on }); return o })
  const [nums, setNums] = useState({ max_length:128, max_age_days:90, min_age_days:1, history_count:5, max_failed_attempts:5, lockout_duration_minutes:15 })
  const flip = (k) => setTgState(s => ({ ...s, [k]: !s[k] }))
  const complexity = pwToggles.filter(t => tgState[t.key]).length
  const summary = [
    'Minimum ' + minLen + ' characters, maximum ' + nums.max_length,
    complexity + ' of 4 complexity rules enforced',
    'Repeated and common passwords blocked',
    'Expires every ' + nums.max_age_days + ' days, changeable after ' + nums.min_age_days + ' day' + (nums.min_age_days === 1 ? '' : 's'),
    'Cannot reuse last ' + nums.history_count + ' passwords',
    'Locks for ' + nums.lockout_duration_minutes + ' min after ' + nums.max_failed_attempts + ' failed attempts',
    tgState.require_mfa_for_reset ? 'MFA required to reset a password' : 'MFA not required to reset',
  ]
  const numField = (label, code, unit, min, max, step) => (
    <Stepper key={code} label={label} value={nums[code]} min={min} max={max} step={step}
      onChange={(v) => setNums(s => ({ ...s, [code]: v }))} helperText={unit + ' \u00B7 ' + code} />
  )
  const toggleRow = (tg) => (
    <button key={tg.key} type="button" role="switch" aria-checked={tgState[tg.key]} data-ix="ix" onClick={() => flip(tg.key)} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, padding:'12px 14px', border:'1px solid var(--border)', borderRadius:10, background:'var(--surface-alt)', textAlign:'left', font:'inherit', width:'100%' }}>
      <span style={{ flex:1, minWidth:0 }}>
        <span style={{ display:'block', fontSize:13.8, fontWeight:600, color:'var(--ink)', lineHeight:1.4 }}>{tg.label}</span>
        <span style={{ display:'block', fontSize:12, color:'var(--muted)', lineHeight:1.45, marginTop:3 }}>{tg.hint}</span>
      </span>
      <span aria-hidden style={{ width:44, height:26, borderRadius:999, background: tgState[tg.key] ? 'var(--primary)' : '#C7D0DD', position:'relative', flex:'none', transition:'background-color .16s ease' }}><span style={{ position:'absolute', top:3, left: tgState[tg.key] ? 21 : 3, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'left .16s cubic-bezier(.22,1,.36,1)' }} /></span>
    </button>
  )
  const cardHead = (title, note) => (
    <div style={{ ...S.cardHead, display:'flex', alignItems:'baseline', justifyContent:'space-between', gap:12, flexWrap:'wrap' }}>
      <h2 style={{ fontSize:15.6, fontWeight:600, margin:0, color:'var(--ink)' }}>{title}</h2>
      <span style={{ fontSize:12, color:'var(--muted)' }}>{note}</span>
    </div>
  )
  return (
    <div style={{ animation:'fadeUp .28s ease', maxWidth:1040 }}>
      <div style={{ marginBottom:18 }}><h1 style={S.h1}>Password Policy</h1><p style={S.sub}>Applies to all users across every tenant.</p></div>
      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16, alignItems:'start' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <section style={S.card}>
            {cardHead('Length', 'Prevents short, brute-forceable passwords')}
            <div style={{ padding:18, display:'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))', gap:16, alignItems:'start' }}>
              <Stepper label="Minimum length" value={minLen} min={6} max={64} step={1} onChange={setMinLen} helperText={'chars · min_length'} />
              {numField('Maximum length', 'max_length', 'chars', 32, 256, 8)}
            </div>
          </section>
          <section style={S.card}>
            {cardHead('Complexity', 'Character classes a password must contain')}
            <div style={{ padding:18, display:'flex', flexDirection:'column', gap:12 }}>{pwToggles.map(toggleRow)}</div>
          </section>
          <section style={S.card}>
            {cardHead('Repetition & patterns', 'Blocks predictable and breached passwords')}
            <div style={{ padding:18, display:'flex', flexDirection:'column', gap:12 }}>{pwPatternToggles.map(toggleRow)}</div>
          </section>
          <section style={S.card}>
            {cardHead('Rotation, reuse & lockout', 'Ageing, history and failed-attempt handling')}
            <div style={{ padding:18, display:'grid', gridTemplateColumns:'repeat(2, minmax(0, 1fr))', gap:16 }}>
              {numField('Expires after', 'max_age_days', 'days', 0, 365, 15)}
              {numField('Minimum age', 'min_age_days', 'days', 0, 30, 1)}
              {numField('Remember last', 'history_count', 'passwords', 0, 24, 1)}
              {numField('Max failed attempts', 'max_failed_attempts', 'tries', 3, 10, 1)}
              {numField('Lockout duration', 'lockout_duration_minutes', 'minutes', 5, 120, 5)}
            </div>
          </section>
          <section style={S.card}>
            {cardHead('MFA integration', 'Secures the password reset flow')}
            <div style={{ padding:18, display:'flex', flexDirection:'column', gap:12 }}>{pwMfaToggles.map(toggleRow)}</div>
          </section>
        </div>
        <aside style={{ ...S.card, border:'1px solid var(--border-blue)', position:'sticky', top:88 }}>
          <div style={S.cardHead}><h2 style={{ fontSize:15.6, fontWeight:600, margin:0, color:'var(--ink)' }}>Current policy</h2></div>
          <ul style={{ listStyle:'none', margin:0, padding:'14px 18px', display:'flex', flexDirection:'column', gap:11 }}>
            {summary.map((row, i) => (
              <li key={i} style={{ display:'flex', alignItems:'center', gap:10, fontSize:13.3, color:'var(--ink)' }}>
                <span aria-hidden style={{ flex:'none', width:20, height:20, borderRadius:'50%', background:'var(--green-tint)', color:'var(--success)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon d="M20 6L9 17l-5-5" size={12} sw={3} /></span>{row}
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, marginTop:16, padding:'14px 18px', background:'var(--surface)', border:'1px solid var(--border-blue)', borderRadius:14, boxShadow:'0 4px 16px -8px rgba(16,42,84,.12)' }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12.9, color:'var(--success-text)' }}><Icon d="M20 6L9 17l-5-5" size={15} sw={2.5} />All changes saved automatically.</span>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          <button data-ix="ghost" onClick={() => toast('Policy reset to defaults.', 'info')} style={S.modalBtnGhost}>Reset to defaults</button>
          <button data-ix="primary" onClick={() => toast('Password policy saved.', 'success')} style={S.modalBtnPrimary}>Save policy</button>
        </div>
      </div>
    </div>
  )
}
