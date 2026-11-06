import React, { useState } from 'react'
import { S, Icon, ssoBtn, Checkbox } from '../ui'
import { ForgotPasswordCard } from './ForgotPassword'
import { Captcha } from '../components/Captcha'

const BG = 'assets/login-bg.jpg'

export function Login({ toast, onContinue }) {
  const [pwShow, setPwShow] = useState(false)
  const [view, setView] = useState('signin')
  const [role, setRole] = useState('super')
  const [capOk, setCapOk] = useState(false)
  const [capErr, setCapErr] = useState(false)
  return (
        <div style={{ minHeight:'100vh', display:'grid', gridTemplateColumns: view !== 'forgot' ? '1.05fr .95fr' : '1fr', background:'var(--surface-page)' }}>
          {view !== 'forgot' && <div style={{ position:'relative', overflow:'hidden' }}>
            <div aria-hidden style={{ position:'absolute', inset:0, background:'linear-gradient(158deg,#0a3b7a 0%,#072a5c 55%,#04204a 100%)' }} />
            <div aria-hidden style={{ position:'absolute', inset:0, background:'linear-gradient(158deg,rgba(6,24,56,.92) 0%,rgba(9,52,116,.56) 46%,rgba(5,22,60,.94) 100%)' }} />
            <div aria-hidden style={{ position:'absolute', inset:0, background:'radial-gradient(115% 85% at 10% 4%, rgba(64,132,235,.30) 0%, rgba(0,0,0,0) 44%), radial-gradient(95% 85% at 102% 104%, rgba(226,163,45,.24) 0%, rgba(0,0,0,0) 46%)' }} />
            <div aria-hidden style={{ position:'absolute', inset:0, opacity:.35, backgroundImage:'radial-gradient(rgba(255,255,255,.07) 1px, transparent 1.5px)', backgroundSize:'24px 24px' }} />
            <div aria-hidden style={{ position:'absolute', inset:0, background:'linear-gradient(0deg, rgba(3,14,38,.6) 0%, rgba(0,0,0,0) 32%)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'48px 56px', color:'#fff' }}>
              <span style={{ display:'inline-flex', alignSelf:'flex-start', alignItems:'center', gap:9, fontSize:11.5, fontWeight:600, letterSpacing:'.16em', textTransform:'uppercase', color:'#fff', background:'rgba(255,255,255,.12)', border:'1px solid rgba(255,255,255,.24)', borderRadius:999, padding:'8px 15px', backdropFilter:'blur(8px)' }}>
                <span style={{ fontSize:10.5, fontWeight:600, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(255,255,255,.82)', whiteSpace:'nowrap' }}>Powered by</span><img src="assets/excelsoft-logo-trim.png" alt="ExcelSoft" style={{ height:15, display:'block', filter:'brightness(0) invert(1)' }} />
              </span>
              <div style={{ maxWidth:600 }}>
                <h2 style={{ fontSize:44, fontWeight:300, lineHeight:1.2, margin:'0 0 18px', letterSpacing:'-.015em', textShadow:'0 1px 14px rgba(0,0,0,.22)' }}>Identity, access and trust — <span style={{ fontWeight:500 }}>unified.</span></h2>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:15 }}>
                    <span style={{ fontSize:11, fontWeight:600, letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(255,255,255,.62)', whiteSpace:'nowrap' }}>The SARAS One platform</span>
                    <span aria-hidden style={{ height:1, flex:1, background:'linear-gradient(90deg, rgba(255,255,255,.24), rgba(255,255,255,0))' }} />
                    <span style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,.85)', background:'rgba(255,255,255,.12)', border:'1px solid rgba(255,255,255,.2)', borderRadius:999, padding:'2px 10px', whiteSpace:'nowrap' }}>9 apps</span>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:1, maxWidth:600, background:'rgba(255,255,255,.16)', border:'1px solid rgba(255,255,255,.18)', borderRadius:10, overflow:'hidden' }}>
                    {[
                      { name:'Candidate Management', cat:'App', d:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75', chip:'rgba(96,165,250,.22)', bd:'rgba(96,165,250,.45)', ic:'#BBD6FF' },
                      { name:'Career Portal', cat:'App', d:'M3 7h18v13H3z M8 7V4h8v3 M3 13h18', chip:'rgba(45,212,191,.22)', bd:'rgba(45,212,191,.45)', ic:'#A9F0E4' },
                      { name:'Certification & Badging', cat:'App', d:'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M8.2 13.9L7 23l5-3 5 3-1.2-9.1', chip:'rgba(226,163,45,.24)', bd:'rgba(226,163,45,.48)', ic:'#F4CE86' },
                      { name:'eMarking', cat:'App', d:'M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z', chip:'rgba(167,139,250,.22)', bd:'rgba(167,139,250,.45)', ic:'#D6C8FF' },
                      { name:'Item Authoring & Test Bank', cat:'App', d:'M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3z M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3', chip:'rgba(34,211,238,.22)', bd:'rgba(34,211,238,.45)', ic:'#A5EEF9' },
                      { name:'Learning Experience', cat:'App', d:'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z M4 19.5A2.5 2.5 0 0 1 6.5 17H20', chip:'rgba(52,211,153,.22)', bd:'rgba(52,211,153,.45)', ic:'#AEEFD3' },
                      { name:'Remote Proctoring', cat:'App', d:'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', chip:'rgba(251,113,133,.22)', bd:'rgba(251,113,133,.45)', ic:'#FDC1CB' },
                      { name:'Test Construction', cat:'App', d:'M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z', chip:'rgba(245,158,11,.24)', bd:'rgba(245,158,11,.48)', ic:'#FBD68A' },
                      { name:'Test Delivery', cat:'App', d:'M2 4h20v12H2z M8 20h8 M12 16v4', chip:'rgba(129,140,248,.22)', bd:'rgba(129,140,248,.45)', ic:'#C7CCFB' },
                    ].map((p,i) => (
                      <span data-app-tile key={p.name} title={p.name} style={{ position:'relative', display:'flex', flexDirection:'column', gap:12, padding:'17px 16px', background:'linear-gradient(160deg, rgba(255,255,255,.11), rgba(255,255,255,.035))', backdropFilter:'blur(4px)', cursor:'pointer', minWidth:0, boxShadow:'inset 0 1px 0 rgba(255,255,255,.07)', ['--acc']: p.ic, animation:'fadeUp .5s ease both', animationDelay:(i*0.045)+'s' }}>
                        <span aria-hidden style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:44, height:44, flex:'none', borderRadius:13, background:'linear-gradient(155deg, '+p.chip+', rgba(255,255,255,.05))', border:'1px solid '+p.bd, color:p.ic, boxShadow:'0 8px 18px -8px '+p.bd+', inset 0 1px 0 rgba(255,255,255,.28)' }}><Icon d={p.d} size={22} sw={2} /></span>
                        <span style={{ display:'flex', flexDirection:'column', gap:2, minWidth:0, width:'100%' }}>
                          <span style={{ fontSize:13.5, fontWeight:600, letterSpacing:'-.01em', color:'#fff', lineHeight:1.3 }}>{p.name}</span>
                        </span>
                        <svg className="app-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.72)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ position:'absolute', top:16, right:15, opacity:0, transform:'translateX(-4px)', transition:'opacity .18s ease, transform .18s ease' }}><path d="M5 12h14 M13 6l6 6-6 6" /></svg>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <span style={{ fontSize:12, color:'rgba(255,255,255,.62)' }}>© 2026 ExcelSoft Technologies · Single sign-on by SARAS</span>
            </div>
          </div>}

          <div style={{ position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px 28px', background:'radial-gradient(680px 480px at 70% 10%, var(--primary-tint) 0%, transparent 70%)' }}>
            {view === 'forgot' && <div aria-hidden style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,#F8FBFF 0%,#EEF4FC 54%,#F6F2E9 100%)' }} />
              <div style={{ position:'absolute', top:'-30%', left:'-18%', width:'72%', height:'80%', borderRadius:'50%', background:'radial-gradient(closest-side, rgba(26,134,240,.24), transparent 70%)', filter:'blur(72px)', animation:'auraFloat 16s ease-in-out infinite alternate' }} />
              <div style={{ position:'absolute', bottom:'-34%', right:'-20%', width:'78%', height:'86%', borderRadius:'50%', background:'radial-gradient(closest-side, rgba(226,163,45,.20), transparent 70%)', filter:'blur(82px)', animation:'auraFloat 21s ease-in-out infinite alternate-reverse' }} />
              <div style={{ position:'absolute', top:'16%', right:'6%', width:'42%', height:'48%', borderRadius:'50%', background:'radial-gradient(closest-side, rgba(10,74,140,.15), transparent 72%)', filter:'blur(66px)', animation:'auraFloat 26s ease-in-out infinite alternate' }} />
              <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}>
                <defs>
                  <linearGradient id="fpWaveA" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1a86f0" stopOpacity="0" /><stop offset=".45" stopColor="#1a86f0" stopOpacity=".38" /><stop offset="1" stopColor="#1a86f0" stopOpacity="0" /></linearGradient>
                  <linearGradient id="fpWaveB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#E2A32D" stopOpacity="0" /><stop offset=".55" stopColor="#C98F1F" stopOpacity=".4" /><stop offset="1" stopColor="#E2A32D" stopOpacity="0" /></linearGradient>
                </defs>
                <g style={{ animation:'auraDrift 26s ease-in-out infinite alternate' }}>
                  {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <path key={i} d="M-40 640 C 260 560, 520 730, 780 645 S 1240 555, 1480 645" transform={'translate(0 ' + i * 24 + ')'} fill="none" stroke={i % 3 === 2 ? 'url(#fpWaveB)' : 'url(#fpWaveA)'} strokeWidth={1.5 - i * 0.12} opacity={0.8 - i * 0.09} />)}
                </g>
                <g style={{ animation:'auraDrift 32s ease-in-out infinite alternate-reverse' }}>
                  {[0, 1, 2, 3, 4].map(i => <path key={i} d="M-40 150 C 280 90, 540 230, 800 155 S 1250 95, 1480 165" transform={'translate(0 ' + i * 22 + ')'} fill="none" stroke={i % 3 === 1 ? 'url(#fpWaveB)' : 'url(#fpWaveA)'} strokeWidth={1.3 - i * 0.14} opacity={0.55 - i * 0.09} />)}
                </g>
              </svg>
              <div style={{ position:'absolute', inset:0, opacity:.55, backgroundImage:'radial-gradient(rgba(10,74,140,.055) 1px, transparent 1.4px)', backgroundSize:'22px 22px' }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(840px 580px at 50% 46%, rgba(255,255,255,.7) 0%, rgba(255,255,255,0) 62%)' }} />
            </div>}
            <div style={{ position:'relative', width:'100%', maxWidth:428, animation:'fadeUp .32s cubic-bezier(.22,1,.36,1)' }}>
              <div aria-hidden style={{ position:'absolute', top:-13, left:'11%', right:'11%', height:34, borderRadius:'16px 16px 0 0', background:'linear-gradient(180deg,#f4f8fe 0%,#e7f0fc 100%)', border:'1px solid var(--border-blue)', borderBottom:'none', zIndex:0 }} />
              <div aria-hidden style={{ position:'absolute', top:-6, left:'6.5%', right:'6.5%', height:26, borderRadius:'16px 16px 0 0', background:'linear-gradient(180deg,#eef4fd 0%,#ffffff 100%)', border:'1px solid var(--border-blue)', borderBottom:'none', zIndex:0 }} />
              <div style={{ position:'relative', zIndex:1, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, boxShadow:'0 1px 0 rgba(255,255,255,.7) inset, 0 16px 34px -22px rgba(16,42,84,.3)', overflow:'hidden' }}>
              <div style={{ padding:'34px 36px 38px' }}>
                <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201036.43%20292.82%22%20width%3D%221036.43%22%20height%3D%22292.82%22%3E%3Cg%20transform%3D%22translate(0%2C0)%22%3E%3Cg%20transform%3D%22translate(146.41%2C146.41)%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22p0%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%2225.49%22%20y1%3D%22-14.71%22%20x2%3D%22-96.49%22%20y2%3D%2255.71%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230A2432%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231B5C79%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22p1%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%220.00%22%20y1%3D%2229.43%22%20x2%3D%22-0.00%22%20y2%3D%22-111.41%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230A2432%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231B5C79%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22p2%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-25.49%22%20y1%3D%22-14.71%22%20x2%3D%2296.49%22%20y2%3D%2255.71%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230A2432%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231B5C79%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22core%22%20gradientUnits%3D%22userSpaceOnUse%22%20x1%3D%22-20.00%22%20y1%3D%22-26.00%22%20x2%3D%2224.00%22%20y2%3D%2222.00%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23F4CE75%22%3E%3C%2Fstop%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23B87A18%22%3E%3C%2Fstop%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Ccircle%20r%3D%22133.69%22%20fill%3D%22none%22%20stroke%3D%22%23103A4E%22%20stroke-width%3D%223.00%22%3E%3C%2Fcircle%3E%3Ccircle%20r%3D%22145.06%22%20fill%3D%22none%22%20stroke%3D%22%23B87A18%22%20stroke-width%3D%221.35%22%3E%3C%2Fcircle%3E%3Cpath%20d%3D%22M%20-96.4857%2055.7060%20A%20100.0000%20100.0000%200%200%201%2025.4857%20-14.7141%20A%20100.0000%20100.0000%200%200%201%20-96.4857%2055.7060%20Z%22%20fill%3D%22url(%23p0)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M%20-0.0000%20-111.4120%20A%20100.0000%20100.0000%200%200%201%200.0000%2029.4283%20A%20100.0000%20100.0000%200%200%201%20-0.0000%20-111.4120%20Z%22%20fill%3D%22url(%23p1)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M%2096.4857%2055.7060%20A%20100.0000%20100.0000%200%200%201%20-25.4857%20-14.7141%20A%20100.0000%20100.0000%200%200%201%2096.4857%2055.7060%20Z%22%20fill%3D%22url(%23p2)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M%2025.4857%20-14.7141%20A%20100.0000%20100.0000%200%200%200%20-25.4857%20-14.7141%20A%20100.0000%20100.0000%200%200%200%20-0.0000%2029.4283%20A%20100.0000%20100.0000%200%200%200%2025.4857%20-14.7141%20Z%22%20fill%3D%22url(%23core)%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cpath%20d%3D%22M402.04%20184.54Q394.27%20184.54%20388.04%20181.89Q381.81%20179.25%20377.77%20174.34Q373.73%20169.44%20372.51%20162.73L381.86%20161.25Q383.64%20168.17%20389.26%20172.06Q394.88%20175.94%20402.50%20175.94Q407.43%20175.94%20411.42%20174.39Q415.41%20172.84%20417.75%20169.95Q420.09%20167.05%20420.09%20163.08Q420.09%20160.64%20419.25%20158.89Q418.41%20157.13%20416.96%20155.89Q415.52%20154.64%20413.69%20153.78Q411.86%20152.92%20409.87%20152.36L391.22%20146.82Q388.17%20145.90%20385.32%20144.50Q382.47%20143.10%20380.24%20140.99Q378.00%20138.88%20376.68%20135.91Q375.35%20132.94%20375.35%20128.87Q375.35%20122.36%20378.74%20117.76Q382.12%20113.16%20387.91%20110.72Q393.71%20108.28%20400.98%20108.33Q408.35%20108.38%20414.17%20110.95Q419.99%20113.52%20423.83%20118.30Q427.67%20123.07%20428.99%20129.73L419.38%20131.41Q418.62%20126.94%20416.00%20123.71Q413.38%20120.48%20409.47%20118.73Q405.55%20116.97%20400.87%20116.92Q396.40%20116.87%20392.79%20118.35Q389.18%20119.82%20387.05%20122.44Q384.91%20125.06%20384.91%20128.46Q384.91%20131.82%20386.84%20133.88Q388.78%20135.94%20391.60%20137.13Q394.42%20138.33%20397.11%20139.09L411.04%20143.10Q413.43%20143.76%20416.56%20144.93Q419.68%20146.10%20422.63%20148.21Q425.58%20150.32%20427.51%20153.81Q429.44%20157.29%20429.44%20162.57Q429.44%20167.86%20427.33%20171.98Q425.23%20176.10%20421.46%20178.87Q417.70%20181.64%20412.72%20183.09Q407.74%20184.54%20402.04%20184.54ZM453.34%20183.01%20477.84%20109.81H490.45L514.95%20183.01H505.55L482.62%20115.09H485.47L462.74%20183.01ZM465.13%20165.88V157.39H503.16V165.88ZM542.40%20183.01V109.81H571.33Q572.40%20109.81%20573.87%20109.88Q575.34%20109.96%20576.72%20110.21Q582.67%20111.13%20586.71%20114.28Q590.75%20117.43%20592.78%20122.24Q594.81%20127.04%20594.81%20132.89Q594.81%20141.38%20590.39%20147.60Q585.97%20153.83%20577.43%20155.41L573.97%20155.97H551.45V183.01ZM585.97%20183.01%20571.53%20153.22%20580.48%20150.48%20596.34%20183.01ZM551.45%20147.37H571.02Q571.99%20147.37%20573.23%20147.27Q574.48%20147.17%20575.60%20146.92Q579.11%20146.10%20581.32%20143.94Q583.53%20141.78%20584.55%20138.86Q585.56%20135.94%20585.56%20132.89Q585.56%20129.84%20584.55%20126.91Q583.53%20123.99%20581.32%20121.80Q579.11%20119.62%20575.60%20118.86Q574.48%20118.55%20573.23%20118.47Q571.99%20118.40%20571.02%20118.40H551.45ZM620.74%20183.01%20645.24%20109.81H657.85L682.35%20183.01H672.95L650.02%20115.09H652.87L630.15%20183.01ZM632.54%20165.88V157.39H670.56V165.88ZM735.78%20184.54Q728.01%20184.54%20721.78%20181.89Q715.55%20179.25%20711.51%20174.34Q707.47%20169.44%20706.25%20162.73L715.60%20161.25Q717.38%20168.17%20723.00%20172.06Q728.62%20175.94%20736.24%20175.94Q741.17%20175.94%20745.16%20174.39Q749.15%20172.84%20751.49%20169.95Q753.83%20167.05%20753.83%20163.08Q753.83%20160.64%20752.99%20158.89Q752.15%20157.13%20750.70%20155.89Q749.26%20154.64%20747.43%20153.78Q745.60%20152.92%20743.61%20152.36L724.96%20146.82Q721.91%20145.90%20719.06%20144.50Q716.21%20143.10%20713.98%20140.99Q711.74%20138.88%20710.42%20135.91Q709.09%20132.94%20709.09%20128.87Q709.09%20122.36%20712.48%20117.76Q715.86%20113.16%20721.65%20110.72Q727.45%20108.28%20734.72%20108.33Q742.09%20108.38%20747.91%20110.95Q753.73%20113.52%20757.57%20118.30Q761.41%20123.07%20762.73%20129.73L753.12%20131.41Q752.36%20126.94%20749.74%20123.71Q747.12%20120.48%20743.21%20118.73Q739.29%20116.97%20734.61%20116.92Q730.14%20116.87%20726.53%20118.35Q722.92%20119.82%20720.79%20122.44Q718.65%20125.06%20718.65%20128.46Q718.65%20131.82%20720.58%20133.88Q722.52%20135.94%20725.34%20137.13Q728.16%20138.33%20730.85%20139.09L744.78%20143.10Q747.17%20143.76%20750.30%20144.93Q753.42%20146.10%20756.37%20148.21Q759.32%20150.32%20761.25%20153.81Q763.18%20157.29%20763.18%20162.57Q763.18%20167.86%20761.07%20171.98Q758.97%20176.10%20755.20%20178.87Q751.44%20181.64%20746.46%20183.09Q741.48%20184.54%20735.78%20184.54Z%22%20fill%3D%22%23103A4E%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M837.66%20184.54Q826.73%20184.54%20819.31%20179.68Q811.89%20174.83%20808.12%20166.23Q804.36%20157.64%20804.36%20146.41Q804.36%20135.17%20808.12%20126.58Q811.89%20117.99%20819.31%20113.14Q826.73%20108.28%20837.66%20108.28Q848.59%20108.28%20855.99%20113.14Q863.38%20117.99%20867.14%20126.58Q870.91%20135.17%20870.91%20146.41Q870.91%20157.64%20867.14%20166.23Q863.38%20174.83%20855.99%20179.68Q848.59%20184.54%20837.66%20184.54ZM837.66%20178.79Q846.66%20178.84%20852.66%20174.70Q858.66%20170.56%20861.65%20163.24Q864.65%20155.91%20864.65%20146.41Q864.65%20136.90%20861.65%20129.58Q858.66%20122.26%20852.66%20118.14Q846.66%20114.03%20837.66%20114.03Q828.66%20113.97%20822.69%20118.09Q816.72%20122.21%20813.72%20129.56Q810.72%20136.90%20810.61%20146.41Q810.51%20155.91%20813.54%20163.21Q816.56%20170.50%20822.61%20174.65Q828.66%20178.79%20837.66%20178.79ZM899.38%20183.01V109.81H905.27L947.67%20172.59V109.81H953.57V183.01H947.67L905.27%20120.13V183.01ZM986.10%20183.01V109.81H1031.35V115.50H991.95V143.31H1025.25V149.00H991.95V177.32H1031.35V183.01Z%22%20fill%3D%22%23B87A18%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="SARAS One" style={{ height:38, display:'block', marginBottom:22 }} />
                {view === 'forgot' ? <ForgotPasswordCard toast={toast} onBack={() => setView('signin')} /> : <>
                <h1 style={{ fontSize:27, fontWeight:500, margin:'0 0 7px', color:'var(--ink)', letterSpacing:'-.025em' }}>Welcome back</h1>
                <p style={{ fontSize:14.3, color:'var(--muted)', margin:'0 0 28px', lineHeight:1.55 }}>Sign in to your <strong style={{ color:'var(--ink)', fontWeight:600 }}>SARAS One Console</strong> workspace.</p>

              <div role="radiogroup" aria-label="Sign in as" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4, padding:4, marginBottom:22, background:'var(--surface-page)', border:'1px solid var(--border)', borderRadius:12 }}>
                {[['super', 'Super Admin', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'], ['tenant', 'Tenant Admin', 'M3 21h18 M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16 M9 7h4 M9 11h4 M9 15h4']].map(([k, l, d]) => <button key={k} type="button" role="radio" aria-checked={role === k} onClick={() => setRole(k)} style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, height:40, border:'none', borderRadius:9, cursor:'pointer', fontFamily:'inherit', fontSize:13.4, fontWeight:600, background: role === k ? '#fff' : 'transparent', color: role === k ? 'var(--primary)' : 'var(--muted)', boxShadow: role === k ? '0 1px 3px rgba(16,42,84,.14)' : 'none', transition:'all .15s ease' }}><Icon d={d} size={15} />{l}</button>)}
              </div>

              <label htmlFor="login-user" style={{ display:'block', fontSize:13.3, fontWeight:600, color:'var(--ink)', marginBottom:7 }}>Username</label>
              <div style={{ position:'relative', marginBottom:18 }}>
                <span aria-hidden style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'flex' }}><Icon d="M4 6h16v12H4z M4 8l8 5 8-5" size={17} /></span>
                <input key={role} id="login-user" type="text" defaultValue={role === 'tenant' ? 'ravi.m@academy.excelsoft.edu' : 'anita.k@excelsoftcorp.com'} placeholder="name@organization.com" style={{ ...S.input, height:50, borderRadius:12, padding:'0 14px 0 42px' }} />
              </div>

              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:7 }}>
                <label htmlFor="login-pass" style={{ fontSize:13.3, fontWeight:600, color:'var(--ink)' }}>Password</label>
                <a href="#" onClick={(e) => { e.preventDefault(); setView('forgot') }} style={{ fontSize:12.9, fontWeight:600 }}>Forgot password?</a>
              </div>
              <div style={{ position:'relative', marginBottom:14 }}>
                <span aria-hidden style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'flex' }}><Icon d="M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0" size={17} /></span>
                <input id="login-pass" type={pwShow ? 'text' : 'password'} defaultValue="password123" placeholder="Enter your password" style={{ ...S.input, height:50, borderRadius:12, padding:'0 46px 0 42px' }} />
                <button data-ix="ic" type="button" aria-label="Show or hide password" onClick={() => setPwShow(v => !v)} style={{ position:'absolute', right:8, top:'50%', transform:'translateY(-50%)', width:34, height:34, border:'none', background:'transparent', color:'var(--muted)', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
                </button>
              </div>

              <Captcha toast={toast} error={capErr} onValid={(v) => { setCapOk(v); if (v) setCapErr(false) }} />

              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
                <label style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13.3, color:'var(--ink)', cursor:'pointer' }}>
                  <Checkbox defaultChecked />Remember this device
                </label>
                <a href="#" onClick={(e) => { e.preventDefault(); toast('Account unlock link sent to your email.', 'success') }} style={{ fontSize:12.9, fontWeight:600 }}>Unlock account</a>
              </div>

              <button data-ix="primary" className="signin-btn" type="button" onClick={() => { if (!capOk) { setCapErr(true); const el = document.getElementById('login-captcha'); if (el) el.focus(); return } onContinue(role) }} style={{ width:'100%', height:50, border:'none', borderRadius:12, background:'linear-gradient(180deg,#1a86f0,#0070E0)', color:'#fff', fontWeight:600, fontSize:15.6, cursor:'pointer', boxShadow:'0 2px 6px -2px rgba(0,112,224,.3)', display:'inline-flex', alignItems:'center', justifyContent:'center', gap:9 }}>
                <Icon d="M5 11h14v10H5z M8 11V7a5 5 0 0 1 10 0v4" size={16} sw={2.1} />
                Sign in
                <Icon className="signin-arrow" d="M5 12h14 M13 6l6 6-6 6" size={17} sw={2.2} />
              </button>

              <div style={{ position:'relative', height:1, background:'var(--border)', margin:'26px -36px' }}>
                <span aria-hidden style={{ position:'absolute', left:-9, top:'50%', width:18, height:18, borderRadius:'50%', background:'var(--surface-page)', border:'1px solid var(--border)', transform:'translateY(-50%)' }} />
                <span aria-hidden style={{ position:'absolute', right:-9, top:'50%', width:18, height:18, borderRadius:'50%', background:'var(--surface-page)', border:'1px solid var(--border)', transform:'translateY(-50%)' }} />
                <span style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', display:'inline-flex', alignItems:'center', justifyContent:'center', padding:'4px 14px', borderRadius:999, background:'var(--surface)', border:'1px solid var(--border)', fontSize:11, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'.14em', boxShadow:'0 1px 3px rgba(16,42,84,.06)' }}>or</span>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                <button data-ix="sso" type="button" aria-label="Continue with Microsoft" onClick={() => toast('Redirecting to Microsoft…', 'info')} style={{ ...ssoBtn, justifyContent:'center', gap:9 }}>
                  <svg width="17" height="17" viewBox="0 0 23 23" style={{ flex:'none' }}><path fill="#F25022" d="M1 1h10v10H1z" /><path fill="#7FBA00" d="M12 1h10v10H12z" /><path fill="#00A4EF" d="M1 12h10v10H1z" /><path fill="#FFB900" d="M12 12h10v10H12z" /></svg>Microsoft
                </button>
                <button data-ix="sso" type="button" aria-label="Continue with Google" onClick={() => toast('Redirecting to Google…', 'info')} style={{ ...ssoBtn, justifyContent:'center', gap:9 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" style={{ flex:'none' }}><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.5-.2-2.3H12v4.5h6.2c-.3 1.4-1.1 2.6-2.3 3.4v2.8h3.7C21.7 18.7 23 15.8 23 12.3z" /><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.8c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v2.9C3.7 21.3 7.5 24 12 24z" /><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.4-.4-2.1s.1-1.5.4-2.1V7.7H1.8C1 9 .6 10.5.6 12.1s.4 3.1 1.2 4.4l3.8-2.9z" /><path fill="#EA4335" d="M12 5.4c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.9 15.1.8 12 .8 7.5.8 3.7 3.5 1.8 7.7l3.8 2.9C6.5 7.4 9 5.4 12 5.4z" /></svg>Google
                </button>
                <button data-ix="sso" type="button" aria-label="Continue with Facebook" onClick={() => toast('Redirecting to Facebook…', 'info')} style={{ ...ssoBtn, justifyContent:'center', gap:9 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" style={{ flex:'none' }}><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2v2.9h-1.5c-1.5 0-1.9.9-1.9 1.8V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z" /></svg>Facebook
                </button>
                <button data-ix="sso" type="button" aria-label="Continue with Apple" onClick={() => toast('Redirecting to Apple…', 'info')} style={{ ...ssoBtn, justifyContent:'center', gap:9 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" style={{ flex:'none' }}><path fill="#000" d="M17.05 12.5c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.9-.9-3.1-.8-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7 2-1.1 2.8-2.2c.9-1.3 1.2-2.5 1.3-2.6-.1 0-2.4-.9-2.4-3.6z M14.8 5.7c.6-.8 1.1-1.9.9-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 2.9 1.1 0 2.3-.6 3-1.4z" /></svg>Apple
                </button>
              </div>

              <p style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, fontSize:12.4, color:'var(--muted)', margin:'24px 0 0' }}>
                <Icon d="M5 11h14v10H5z M8 11V7a5 5 0 0 1 10 0v4" size={13} />Protected by SARAS single sign-on
                </p>
              </>}
              </div>
              </div>
            </div>
          </div>
        </div>
  )
}
