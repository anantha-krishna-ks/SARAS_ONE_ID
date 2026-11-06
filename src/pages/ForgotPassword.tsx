import React, { useState } from 'react'
import { S, Icon, EMAIL_RE } from '../ui'

export function ForgotPasswordCard({ toast, onBack }) {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('anita.k@excelsoftcorp.com')
  const [pw, setPw] = useState('')
  const [pw2, setPw2] = useState('')
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const fpBtn = { width:'100%', height:52, border:'none', borderRadius:13, background:'linear-gradient(180deg,#1a86f0,#0070E0)', color:'#fff', fontWeight:600, fontSize:15.3, cursor:'pointer', boxShadow:'0 14px 26px -14px rgba(0,112,224,.55), inset 0 1px 0 rgba(255,255,255,.22)', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:9, letterSpacing:'.01em' }
  const fpLabel = { display:'block', fontSize:13.3, fontWeight:600, color:'var(--ink)', marginBottom:7 }
  const fpIcon = { position:'absolute', left:15, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'flex' }
  const fpInput = { ...S.input, height:52, borderRadius:13, padding:'0 15px 0 44px', fontSize:14.2 }
  const eyeBtn = { position:'absolute', right:9, top:'50%', transform:'translateY(-50%)', width:34, height:34, border:'none', background:'transparent', color:'var(--muted)', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:9, cursor:'pointer' }
  const EYE = <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
  const strength = (pw.length >= 8 ? 1 : 0) + (/[a-z]/.test(pw) && /[A-Z]/.test(pw) ? 1 : 0) + (/\d/.test(pw) ? 1 : 0) + (/[^A-Za-z0-9]/.test(pw) ? 1 : 0)
  const stLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const stColor = ['#D5DBE6', '#D9534F', '#E2A32D', '#1a86f0', '#2E9E6B'][strength]
  const sendCode = (e) => { e.preventDefault(); if (!EMAIL_RE.test(email.trim())) { toast('Enter a valid email id.', 'warning'); return } setStep(2) }
  const resetPw = (e) => { e.preventDefault(); if (pw.length < 8) { toast('New password must be at least 8 characters.', 'warning'); return } if (pw !== pw2) { toast('Passwords do not match.', 'warning'); return } setStep(3) }
  if (step === 3) return (
    <div style={{ textAlign:'center', padding:'10px 0 4px', animation:'fadeUp .4s cubic-bezier(.22,1,.36,1)' }}>
      <span style={{ display:'inline-flex', width:66, height:66, borderRadius:'50%', alignItems:'center', justifyContent:'center', background:'linear-gradient(155deg,#EAF6EF,#D8EFE2)', border:'1px solid #BFE3CE', color:'#2E9E6B', marginBottom:20, boxShadow:'0 16px 30px -18px rgba(46,158,107,.6), inset 0 1px 0 rgba(255,255,255,.8)' }}><Icon d="M20 6L9 17l-5-5" size={28} sw={2.4} /></span>
      <h1 style={{ fontSize:26, fontWeight:500, margin:'0 0 8px', color:'var(--ink)', letterSpacing:'-.025em' }}>Password changed</h1>
      <p style={{ fontSize:14.2, color:'var(--muted)', margin:'0 auto 26px', lineHeight:1.6, maxWidth:300 }}>Your password was updated for <strong style={{ color:'var(--ink)', fontWeight:600 }}>{email.trim()}</strong>. Use it the next time you sign in.</p>
      <button data-ix="primary" type="button" onClick={onBack} style={fpBtn}>Return to sign in<Icon d="M5 12h14 M13 6l6 6-6 6" size={17} sw={2.2} /></button>
    </div>
  )
  return (
    <>
      <a href="#" onClick={(e) => { e.preventDefault(); step === 2 ? setStep(1) : onBack() }} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12.9, fontWeight:600, marginBottom:22, whiteSpace:'nowrap' }}><Icon d="M19 12H5 M11 18l-6-6 6-6" size={14} sw={2.2} />{step === 2 ? 'Back' : 'Back to sign in'}</a>
      <h1 style={{ fontSize:27, fontWeight:500, margin:'0 0 8px', color:'var(--ink)', letterSpacing:'-.028em' }}>{step === 1 ? 'Reset your password' : 'Choose a new password'}</h1>
      <p style={{ fontSize:14.3, color:'var(--muted)', margin:'0 0 28px', lineHeight:1.6 }}>{step === 1 ? 'Enter the email id linked to your account to set a new password.' : 'Setting a new password for '}{step === 2 && <strong style={{ color:'var(--ink)', fontWeight:600 }}>{email.trim()}</strong>}{step === 2 && '.'}</p>
      {step === 1 ? (
        <form onSubmit={sendCode}>
          <label htmlFor="fp-email" style={fpLabel}>Email</label>
          <div style={{ position:'relative', marginBottom:24 }}>
            <span aria-hidden style={fpIcon}><Icon d="M4 6h16v12H4z M4 8l8 5 8-5" size={17} /></span>
            <input id="fp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@organization.com" style={fpInput} />
          </div>
          <button data-ix="primary" type="submit" style={fpBtn}>Continue<Icon d="M5 12h14 M13 6l6 6-6 6" size={17} sw={2.2} /></button>
        </form>
      ) : (
        <form onSubmit={resetPw}>
          <label htmlFor="fp-pw" style={fpLabel}>New password</label>
          <div style={{ position:'relative', marginBottom:10 }}>
            <span aria-hidden style={fpIcon}><Icon d="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0" size={17} /></span>
            <input id="fp-pw" type={show ? 'text' : 'password'} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter a new password" style={{ ...fpInput, paddingRight:48 }} />
            <button data-ix="ic" type="button" aria-label="Show or hide password" onClick={() => setShow(v => !v)} style={eyeBtn}>{EYE}</button>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, minHeight:14 }}>
            <span style={{ display:'flex', gap:5, flex:1 }}>{[1, 2, 3, 4].map(i => <span key={i} style={{ height:4, flex:1, borderRadius:999, background: pw && i <= strength ? stColor : '#E7EBF2', transition:'background .3s ease' }} />)}</span>
            <span style={{ fontSize:11.5, fontWeight:600, color: pw ? stColor : 'var(--muted)', minWidth:44, textAlign:'right' }}>{pw ? stLabel : ''}</span>
          </div>
          <label htmlFor="fp-pw2" style={fpLabel}>Confirm new password</label>
          <div style={{ position:'relative', marginBottom:10 }}>
            <span aria-hidden style={fpIcon}><Icon d="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0" size={17} /></span>
            <input id="fp-pw2" type={show2 ? 'text' : 'password'} value={pw2} onChange={(e) => setPw2(e.target.value)} placeholder="Re-enter the new password" style={{ ...fpInput, paddingRight:48, borderColor: pw2 && pw2 !== pw ? '#E5B3B3' : undefined }} />
            <button data-ix="ic" type="button" aria-label="Show or hide password" onClick={() => setShow2(v => !v)} style={eyeBtn}>{EYE}</button>
          </div>
          <p style={{ display:'flex', alignItems:'center', gap:7, fontSize:12.3, margin:'0 0 22px', minHeight:16, color: pw2 ? (pw2 === pw ? '#2E9E6B' : '#B85C5C') : 'var(--muted)' }}>
            {pw2 ? <><Icon d={pw2 === pw ? 'M20 6L9 17l-5-5' : 'M18 6L6 18 M6 6l12 12'} size={12} sw={2.6} />{pw2 === pw ? 'Passwords match' : 'Passwords do not match yet'}</> : 'Minimum 8 characters, per your password policy.'}
          </p>
          <button data-ix="primary" type="submit" style={fpBtn}><Icon d="M5 11h14v10H5z M8 11V7a5 5 0 0 1 10 0v4" size={16} sw={2.1} />Change password</button>
        </form>
      )}
    </>
  )
}
