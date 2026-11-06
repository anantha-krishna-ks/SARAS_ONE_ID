import React, { useState } from 'react'
import { Icon } from '../ui'

export function MfaScreen({ email, onVerify, onBack, toast }) {
  const LEN = 6
  const [otp, setOtp] = React.useState(['', '', '', '', '', ''])
  const [err, setErr] = React.useState('')
  const [shake, setShake] = React.useState(false)
  const [cooldown, setCooldown] = React.useState(0)
  const refs = React.useRef([])
  React.useEffect(() => { refs.current[0] && refs.current[0].focus() }, [])
  React.useEffect(() => { if (cooldown <= 0) return; const t = setTimeout(() => setCooldown(c => c - 1), 1000); return () => clearTimeout(t) }, [cooldown])
  const setDigit = (i, val) => {
    const d = (val || '').replace(/\D/g, '')
    setOtp(prev => { const n = [...prev]; n[i] = d.slice(-1); return n })
    setErr('')
    if (d && i < LEN - 1 && refs.current[i + 1]) refs.current[i + 1].focus()
  }
  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0 && refs.current[i - 1]) refs.current[i - 1].focus()
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1] && refs.current[i - 1].focus()
    if (e.key === 'ArrowRight' && i < LEN - 1) refs.current[i + 1] && refs.current[i + 1].focus()
  }
  const onPaste = (e) => {
    const t = ((e.clipboardData || window.clipboardData).getData('text') || '').replace(/\D/g, '').slice(0, LEN)
    if (!t) return; e.preventDefault()
    const n = Array.from({ length: LEN }, (_, k) => t[k] || '')
    setOtp(n); setErr('')
    const last = Math.min(t.length, LEN) - 1
    if (refs.current[last]) refs.current[last].focus()
  }
  const validate = () => {
    if (otp.some(d => d === '')) { setErr('Enter all 6 digits to continue.'); setShake(true); return }
    toast('Verified successfully.', 'success'); onVerify()
  }
  const resend = () => {
    if (cooldown > 0) return
    setCooldown(30); setOtp(['', '', '', '', '', '']); setErr('')
    if (refs.current[0]) refs.current[0].focus()
    toast('A new one-time code has been sent to your email.', 'info')
  }
  const complete = otp.every(d => d !== '')
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 24px', background:'radial-gradient(1100px 560px at 50% -8%,var(--primary-tint) 0%,var(--surface-page) 62%)' }}>
      <div onAnimationEnd={() => setShake(false)} style={{ width:'100%', maxWidth:420, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, boxShadow:'0 1px 0 rgba(255,255,255,.7) inset, 0 16px 34px -22px rgba(16,42,84,.3)', overflow:'hidden', animation: shake ? 'shakeX .3s ease' : 'fadeUp .32s cubic-bezier(.22,1,.36,1)' }}>
        <div style={{ padding:'32px 32px 30px' }}>
          <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201036.43%20292.82%22%20width%3D%221036.43%22%20height%3D%22292.82%22%3E%3Cg%20transform%3D%22translate(0%2C0)%22%3E%3Cg%20transform%3D%22translate(146.41%2C146.41)%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22p0%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%2225.49%22%20y1%3D%22-14.71%22%20x2%3D%22-96.49%22%20y2%3D%2255.71%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230A2432%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231B5C79%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22p1%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%220.00%22%20y1%3D%2229.43%22%20x2%3D%22-0.00%22%20y2%3D%22-111.41%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230A2432%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231B5C79%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22p2%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-25.49%22%20y1%3D%22-14.71%22%20x2%3D%2296.49%22%20y2%3D%2255.71%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230A2432%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231B5C79%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22core%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-20.00%22%20y1%3D%22-26.00%22%20x2%3D%2224.00%22%20y2%3D%2222.00%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23F4CE75%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B87A18%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Ccircle%20r%3D%22133.69%22%20fill%3D%22none%22%20stroke%3D%22%23103A4E%22%20stroke-width%3D%223.00%22%3E%3C%2Fcircle%3E%3Ccircle%20r%3D%22145.06%22%20fill%3D%22none%22%20stroke%3D%22%23B87A18%22%20stroke-width%3D%221.35%22%3E%3C%2Fcircle%3E%3Cpath%20d%3D%22M%20-96.4857%2055.7060%20A%20100.0000%20100.0000%200%200%201%2025.4857%20-14.7141%20A%20100.0000%20100.0000%200%200%201%20-96.4857%2055.7060%20Z%22%20fill%3D%22url(%23p0)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M%20-0.0000%20-111.4120%20A%20100.0000%20100.0000%200%200%201%200.0000%2029.4283%20A%20100.0000%20100.0000%200%200%201%20-0.0000%20-111.4120%20Z%22%20fill%3D%22url(%23p1)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M%2096.4857%2055.7060%20A%20100.0000%20100.0000%200%200%201%20-25.4857%20-14.7141%20A%20100.0000%20100.0000%200%200%201%2096.4857%2055.7060%20Z%22%20fill%3D%22url(%23p2)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M%2025.4857%20-14.7141%20A%20100.0000%20100.0000%200%200%200%20-25.4857%20-14.7141%20A%20100.0000%20100.0000%200%200%200%20-0.0000%2029.4283%20A%20100.0000%20100.0000%200%200%200%2025.4857%20-14.7141%20Z%22%20fill%3D%22url(%23core)%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cpath%20d%3D%22M402.04%20184.54Q394.27%20184.54%20388.04%20181.89Q381.81%20179.25%20377.77%20174.34Q373.73%20169.44%20372.51%20162.73L381.86%20161.25Q383.64%20168.17%20389.26%20172.06Q394.88%20175.94%20402.50%20175.94Q407.43%20175.94%20411.42%20174.39Q415.41%20172.84%20417.75%20169.95Q420.09%20167.05%20420.09%20163.08Q420.09%20160.64%20419.25%20158.89Q418.41%20157.13%20416.96%20155.89Q415.52%20154.64%20413.69%20153.78Q411.86%20152.92%20409.87%20152.36L391.22%20146.82Q388.17%20145.90%20385.32%20144.50Q382.47%20143.10%20380.24%20140.99Q378.00%20138.88%20376.68%20135.91Q375.35%20132.94%20375.35%20128.87Q375.35%20122.36%20378.74%20117.76Q382.12%20113.16%20387.91%20110.72Q393.71%20108.28%20400.98%20108.33Q408.35%20108.38%20414.17%20110.95Q419.99%20113.52%20423.83%20118.30Q427.67%20123.07%20428.99%20129.73L419.38%20131.41Q418.62%20126.94%20416.00%20123.71Q413.38%20120.48%20409.47%20118.73Q405.55%20116.97%20400.87%20116.92Q396.40%20116.87%20392.79%20118.35Q389.18%20119.82%20387.05%20122.44Q384.91%20125.06%20384.91%20128.46Q384.91%20131.82%20386.84%20133.88Q388.78%20135.94%20391.60%20137.13Q394.42%20138.33%20397.11%20139.09L411.04%20143.10Q413.43%20143.76%20416.56%20144.93Q419.68%20146.10%20422.63%20148.21Q425.58%20150.32%20427.51%20153.81Q429.44%20157.29%20429.44%20162.57Q429.44%20167.86%20427.33%20171.98Q425.23%20176.10%20421.46%20178.87Q417.70%20181.64%20412.72%20183.09Q407.74%20184.54%20402.04%20184.54ZM453.34%20183.01%20477.84%20109.81H490.45L514.95%20183.01H505.55L482.62%20115.09H485.47L462.74%20183.01ZM465.13%20165.88V157.39H503.16V165.88ZM542.40%20183.01V109.81H571.33Q572.40%20109.81%20573.87%20109.88Q575.34%20109.96%20576.72%20110.21Q582.67%20111.13%20586.71%20114.28Q590.75%20117.43%20592.78%20122.24Q594.81%20127.04%20594.81%20132.89Q594.81%20141.38%20590.39%20147.60Q585.97%20153.83%20577.43%20155.41L573.97%20155.97H551.45V183.01ZM585.97%20183.01%20571.53%20153.22%20580.48%20150.48%20596.34%20183.01ZM551.45%20147.37H571.02Q571.99%20147.37%20573.23%20147.27Q574.48%20147.17%20575.60%20146.92Q579.11%20146.10%20581.32%20143.94Q583.53%20141.78%20584.55%20138.86Q585.56%20135.94%20585.56%20132.89Q585.56%20129.84%20584.55%20126.91Q583.53%20123.99%20581.32%20121.80Q579.11%20119.62%20575.60%20118.86Q574.48%20118.55%20573.23%20118.47Q571.99%20118.40%20571.02%20118.40H551.45ZM620.74%20183.01%20645.24%20109.81H657.85L682.35%20183.01H672.95L650.02%20115.09H652.87L630.15%20183.01ZM632.54%20165.88V157.39H670.56V165.88ZM735.78%20184.54Q728.01%20184.54%20721.78%20181.89Q715.55%20179.25%20711.51%20174.34Q707.47%20169.44%20706.25%20162.73L715.60%20161.25Q717.38%20168.17%20723.00%20172.06Q728.62%20175.94%20736.24%20175.94Q741.17%20175.94%20745.16%20174.39Q749.15%20172.84%20751.49%20169.95Q753.83%20167.05%20753.83%20163.08Q753.83%20160.64%20752.99%20158.89Q752.15%20157.13%20750.70%20155.89Q749.26%20154.64%20747.43%20153.78Q745.60%20152.92%20743.61%20152.36L724.96%20146.82Q721.91%20145.90%20719.06%20144.50Q716.21%20143.10%20713.98%20140.99Q711.74%20138.88%20710.42%20135.91Q709.09%20132.94%20709.09%20128.87Q709.09%20122.36%20712.48%20117.76Q715.86%20113.16%20721.65%20110.72Q727.45%20108.28%20734.72%20108.33Q742.09%20108.38%20747.91%20110.95Q753.73%20113.52%20757.57%20118.30Q761.41%20123.07%20762.73%20129.73L753.12%20131.41Q752.36%20126.94%20749.74%20123.71Q747.12%20120.48%20743.21%20118.73Q739.29%20116.97%20734.61%20116.92Q730.14%20116.87%20726.53%20118.35Q722.92%20119.82%20720.79%20122.44Q718.65%20125.06%20718.65%20128.46Q718.65%20131.82%20720.58%20133.88Q722.52%20135.94%20725.34%20137.13Q728.16%20138.33%20730.85%20139.09L744.78%20143.10Q747.17%20143.76%20750.30%20144.93Q753.42%20146.10%20756.37%20148.21Q759.32%20150.32%20761.25%20153.81Q763.18%20157.29%20763.18%20162.57Q763.18%20167.86%20761.07%20171.98Q758.97%20176.10%20755.20%20178.87Q751.44%20181.64%20746.46%20183.09Q741.48%20184.54%20735.78%20184.54Z%22%20fill%3D%22%23103A4E%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M837.66%20184.54Q826.73%20184.54%20819.31%20179.68Q811.89%20174.83%20808.12%20166.23Q804.36%20157.64%20804.36%20146.41Q804.36%20135.17%20808.12%20126.58Q811.89%20117.99%20819.31%20113.14Q826.73%20108.28%20837.66%20108.28Q848.59%20108.28%20855.99%20113.14Q863.38%20117.99%20867.14%20126.58Q870.91%20135.17%20870.91%20146.41Q870.91%20157.64%20867.14%20166.23Q863.38%20174.83%20855.99%20179.68Q848.59%20184.54%20837.66%20184.54ZM837.66%20178.79Q846.66%20178.84%20852.66%20174.70Q858.66%20170.56%20861.65%20163.24Q864.65%20155.91%20864.65%20146.41Q864.65%20136.90%20861.65%20129.58Q858.66%20122.26%20852.66%20118.14Q846.66%20114.03%20837.66%20114.03Q828.66%20113.97%20822.69%20118.09Q816.72%20122.21%20813.72%20129.56Q810.72%20136.90%20810.61%20146.41Q810.51%20155.91%20813.54%20163.21Q816.56%20170.50%20822.61%20174.65Q828.66%20178.79%20837.66%20178.79ZM899.38%20183.01V109.81H905.27L947.67%20172.59V109.81H953.57V183.01H947.67L905.27%20120.13V183.01ZM986.10%20183.01V109.81H1031.35V115.50H991.95V143.31H1025.25V149.00H991.95V177.32H1031.35V183.01Z%22%20fill%3D%22%23B87A18%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="SARAS One" style={{ height:34, marginBottom:22, display:'block' }} />
          <span aria-hidden style={{ display:'flex', width:52, height:52, borderRadius:15, background:'var(--primary-tint)', color:'var(--on-tint-blue)', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
            <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4" size={26} />
          </span>
          <h1 style={{ fontSize:24, fontWeight:500, margin:'0 0 6px', color:'var(--ink)', letterSpacing:'-.02em' }}>Verify it's you</h1>
          <p style={{ fontSize:13.8, color:'var(--muted)', margin:'0 0 22px', lineHeight:1.55 }}>Enter the 6-digit verification code we sent to <strong style={{ color:'var(--ink)', fontWeight:600 }}>{email}</strong>.</p>
          <div style={{ display:'flex', gap:9, marginBottom: err ? 10 : 22 }}>
            {otp.map((v, i) => (
              <input key={i} ref={el => refs.current[i] = el} aria-label={'Digit ' + (i + 1)} inputMode="numeric" maxLength={1} value={v}
                onChange={e => setDigit(i, e.target.value)} onKeyDown={e => onKey(i, e)} onPaste={onPaste} onFocus={e => e.target.select()}
                style={{ width:'100%', height:54, textAlign:'center', fontSize:20.7, fontWeight:600, color:'var(--ink)', border:'1.5px solid ' + (err ? 'var(--danger)' : v ? 'var(--primary)' : '#D5DBE4'), borderRadius:11, background:'var(--surface)', fontFamily:'inherit', outline:'none', transition:'border-color .14s ease,box-shadow .14s ease' }} />
            ))}
          </div>
          {err && <p role="alert" style={{ display:'flex', alignItems:'center', gap:6, fontSize:12.9, color:'var(--danger)', margin:'0 0 18px' }}><Icon d="M12 8v4 M12 16h.01 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" size={14} />{err}</p>}
          <button data-ix="primary" type="button" onClick={validate} style={{ width:'100%', height:50, border:'none', borderRadius:12, background: complete ? 'linear-gradient(180deg,#1a86f0,#0070E0)' : '#C4CDD9', color:'#fff', fontWeight:600, fontSize:15.6, cursor:'pointer', boxShadow: complete ? '0 2px 6px -2px rgba(0,112,224,.3)' : 'none', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:9, transition:'background .16s ease' }}>
            <Icon d="M20 6L9 17l-5-5" size={16} sw={2.4} />Validate &amp; continue
          </button>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:18 }}>
            <span style={{ fontSize:12.9, color:'var(--muted)' }}>Didn't get a code?</span>
            <button className="gtext-btn" type="button" disabled={cooldown > 0} onClick={resend} style={cooldown > 0 ? { opacity:.55, cursor:'not-allowed' } : undefined}>{cooldown > 0 ? 'Resend in ' + cooldown + 's' : 'Resend code'}</button>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', marginTop:14, paddingTop:16, borderTop:'1px solid var(--border)' }}>
            <button className="gtext-btn" type="button" onClick={onBack} style={{ display:'inline-flex', alignItems:'center', gap:6 }}><Icon d="M15 18l-6-6 6-6" size={14} />Back to sign in</button>
          </div>
        </div>
      </div>
    </div>
  )
}
