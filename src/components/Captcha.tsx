import React from 'react'
import { Icon, S } from '../ui'

const CAP_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const CAP_INK = ['#0a4a8c', '#0070E0', '#1A2740', '#2D5FA8']
const capGen = () => Array.from({ length:6 }, () => CAP_CHARS[Math.floor(Math.random() * CAP_CHARS.length)]).join('')

export function Captcha({ toast, onValid, error }) {
  const [code, setCode] = React.useState(capGen)
  const [val, setVal] = React.useState('')
  const [spin, setSpin] = React.useState(0)
  const [speaking, setSpeaking] = React.useState(false)
  const cv = React.useRef(null)
  const ok = val.trim().toUpperCase() === code
  const bad = !!error && !ok
  React.useEffect(() => { if (onValid) onValid(ok) }, [ok])
  React.useEffect(() => () => { try { window.speechSynthesis && window.speechSynthesis.cancel() } catch (e) {} }, [])
  React.useEffect(() => {
    const c = cv.current
    if (!c) return
    let alive = true
    const draw = () => {
      if (!alive || !c.clientWidth) return
      const w = c.clientWidth, h = c.clientHeight, dpr = window.devicePixelRatio || 1
      c.width = w * dpr; c.height = h * dpr
      const x = c.getContext('2d')
      x.setTransform(dpr, 0, 0, dpr, 0, 0)
      let s = code.split('').reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) % 2147483647, 7) || 1
      const r = () => (s = (s * 16807) % 2147483647) / 2147483647
      const g = x.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, '#F4F8FE'); g.addColorStop(1, '#E4EEFB')
      x.fillStyle = g; x.fillRect(0, 0, w, h)
      for (let i = 0; i < 3; i++) {
        const cx = r() * w, cy = r() * h, rad = 30 + r() * 40
        const rg = x.createRadialGradient(cx, cy, 0, cx, cy, rad)
        rg.addColorStop(0, 'rgba(0,112,224,.12)'); rg.addColorStop(1, 'rgba(0,112,224,0)')
        x.fillStyle = rg; x.fillRect(0, 0, w, h)
      }
      for (let i = 0; i < 70; i++) { x.fillStyle = 'rgba(10,74,140,' + (0.08 + r() * 0.16) + ')'; x.beginPath(); x.arc(r() * w, r() * h, 0.6 + r() * 1.1, 0, Math.PI * 2); x.fill() }
      for (let i = 0; i < 2; i++) {
        x.strokeStyle = 'rgba(0,112,224,' + (0.22 + r() * 0.16) + ')'; x.lineWidth = 1.2
        x.beginPath(); x.moveTo(0, r() * h); x.bezierCurveTo(w * 0.3, r() * h, w * 0.7, r() * h, w, r() * h); x.stroke()
      }
      const step = (w - 28) / code.length
      code.split('').forEach((ch, i) => {
        x.save()
        x.translate(14 + step * i + step / 2, h / 2 + (r() - 0.5) * 9)
        x.rotate((r() - 0.5) * 0.55)
        x.font = '600 ' + Math.round(23 + r() * 6) + 'px Poppins, system-ui, sans-serif'
        x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillStyle = 'rgba(255,255,255,.85)'; x.fillText(ch, 1, 1.5)
        x.fillStyle = CAP_INK[Math.floor(r() * CAP_INK.length)]; x.fillText(ch, 0, 0)
        x.restore()
      })
      x.strokeStyle = 'rgba(10,74,140,.42)'; x.lineWidth = 1.5
      x.beginPath()
      for (let px = 6; px <= w - 6; px += 4) { const py = h / 2 + Math.sin(px / 17 + s % 7) * 6; px === 6 ? x.moveTo(px, py) : x.lineTo(px, py) }
      x.stroke()
    }
    draw()
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(draw) : null
    if (ro) ro.observe(c)
    return () => { alive = false; if (ro) ro.disconnect() }
  }, [code])
  const refresh = () => {
    try { window.speechSynthesis && window.speechSynthesis.cancel() } catch (e) {}
    setSpeaking(false); setCode(capGen()); setVal(''); setSpin(n => n + 1)
  }
  const speak = () => {
    const ss = window.speechSynthesis
    if (!ss || typeof SpeechSynthesisUtterance === 'undefined') { if (toast) toast('Audio CAPTCHA isn’t supported in this browser.', 'error'); return }
    if (speaking) { ss.cancel(); setSpeaking(false); return }
    ss.cancel()
    const spelled = code.split('').join(', ')
    const u = new SpeechSynthesisUtterance('Type the following characters. ' + spelled + '. Once more. ' + spelled + '.')
    u.rate = 0.78
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    setSpeaking(true)
    ss.speak(u)
  }
  const tool = (on) => ({ width:50, height:50, flex:'none', borderRadius:12, border:'1px solid ' + (on ? 'var(--primary)' : 'var(--border)'), background: on ? 'var(--primary-tint)' : 'var(--surface)', color: on ? 'var(--primary)' : 'var(--on-tint-blue)', display:'grid', placeItems:'center', cursor:'pointer', transition:'background .16s ease,border-color .16s ease,color .16s ease' })
  return (
    <div style={{ position:'relative', marginBottom:16, padding:'14px 14px 14px', borderRadius:16, background:'linear-gradient(180deg, #F7FAFE 0%, #FFFFFF 100%)', border:'1px solid ' + (bad ? '#F3C6C6' : ok ? 'rgba(22,163,74,.35)' : 'var(--border-blue)'), boxShadow:'inset 0 1px 0 rgba(255,255,255,.9), 0 1px 2px rgba(16,42,84,.04), 0 8px 20px -16px rgba(16,42,84,.28)', transition:'border-color .2s ease' }}>
      <div style={{ display:'flex', alignItems:'center', marginBottom:12 }}>
        <span style={{ display:'flex', flexDirection:'column', gap:1, flex:1, minWidth:0 }}>
          <label htmlFor="login-captcha" style={{ fontSize:13.3, fontWeight:600, color:'var(--ink)' }}>Security check</label>
          <span style={{ fontSize:12, color:'#475467' }}>{ok ? 'Verified — you’re good to sign in' : 'Prove you’re human · not case-sensitive'}</span>
        </span>
      </div>
      <div style={{ display:'flex', gap:8, marginBottom:10 }}>
        <div style={{ position:'relative', flex:1, minWidth:0, height:50, borderRadius:12, overflow:'hidden', border:'1px solid var(--border-blue)', boxShadow:'inset 0 1px 2px rgba(16,42,84,.06)' }}>
          <canvas ref={cv} role="img" aria-label="CAPTCHA image. Use the audio button to hear the characters instead." style={{ width:'100%', height:'100%', display:'block', userSelect:'none' }}></canvas>
        </div>
        <button type="button" data-ix="sso" onClick={refresh} aria-label="Get a new CAPTCHA" title="New code" style={tool(false)}>
          <span style={{ display:'inline-flex', transform:'rotate(' + spin * 360 + 'deg)', transition:'transform .5s cubic-bezier(.2,.8,.2,1)' }}><Icon d="M21 12a9 9 0 1 1-2.64-6.36 M21 4v5h-5" size={18} sw={2.1} /></span>
        </button>
        <button type="button" data-ix="sso" onClick={speak} aria-label={speaking ? 'Stop audio CAPTCHA' : 'Play audio CAPTCHA'} aria-pressed={speaking} title={speaking ? 'Stop' : 'Listen'} style={tool(speaking)}>
          <Icon d={speaking ? 'M7 7h10v10H7z' : 'M11 5L6 9H2v6h4l5 4V5z M15.5 8.5a5 5 0 0 1 0 7 M19 5a10 10 0 0 1 0 14'} size={18} sw={2.1} />
        </button>
      </div>
      <span aria-live="polite" style={{ position:'absolute', width:1, height:1, overflow:'hidden', clip:'rect(0 0 0 0)' }}>{speaking ? 'Playing audio CAPTCHA' : ''}</span>
      <div style={{ position:'relative' }}>
        <span aria-hidden style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'flex' }}><Icon d="M3 6h18v12H3z M7 10h.01 M11 10h.01 M15 10h.01 M19 10h.01 M7 14h10" size={17} /></span>
        <input id="login-captcha" value={val} onChange={(e) => setVal(e.target.value.replace(/\s/g, '').slice(0, 6))} placeholder="Type the characters above" autoComplete="off" spellCheck={false} maxLength={6} aria-invalid={bad} aria-describedby={bad ? 'login-captcha-err' : undefined}
          style={{ ...S.input, height:50, borderRadius:12, padding:'0 46px 0 42px', background:'var(--surface)', textTransform: val ? 'uppercase' : 'none', letterSpacing: val ? '.22em' : 'normal', fontWeight: val ? 600 : 400, borderColor: bad ? '#DC2626' : ok ? 'var(--success)' : undefined }} />
        {ok && <span aria-label="CAPTCHA verified" style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', width:24, height:24, borderRadius:'50%', background:'var(--success)', color:'#fff', display:'grid', placeItems:'center', animation:'popIn .18s ease' }}><Icon d="M20 6L9 17l-5-5" size={13} sw={3} /></span>}
      </div>
      {bad && <div id="login-captcha-err" role="alert" style={{ display:'flex', alignItems:'center', gap:7, marginTop:7, fontSize:12.6, fontWeight:500, color:'#B42318' }}><Icon d="M12 8v4 M12 16h.01 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" size={14} sw={2.2} />{val ? 'Characters don’t match. Try again or get a new code.' : 'Enter the characters to continue.'}</div>}
    </div>
  )
}
