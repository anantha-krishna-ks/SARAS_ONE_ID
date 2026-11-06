import React from 'react'

export function Loader({ size = 48, color = 'var(--primary)', track = true }) {
  const d = 'M29.760000000000005 18.72 c0 7.28 -3.9200000000000004 13.600000000000001 -9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.840000000000002 2.64 c -3.6 0 -6.88 -0.96 -9.76 -2.64 c0 -7.28 3.9200000000000004 -13.52 9.840000000000002 -16.96 c2.8800000000000003 -1.6800000000000002 6.24 -2.64 9.76 -2.64 S26.880000000000003 17.040000000000003 29.760000000000005 18.72 c5.84 3.3600000000000003 9.76 9.68 9.840000000000002 16.96 c -2.8800000000000003 1.6800000000000002 -6.24 2.64 -9.76 2.64 c -3.6 0 -6.88 -0.96 -9.840000000000002 -2.64 c -5.84 -3.3600000000000003 -9.76 -9.68 -9.76 -16.96 c0 -7.28 3.9200000000000004 -13.600000000000001 9.76 -16.96 C25.84 5.120000000000001 29.760000000000005 11.440000000000001 29.760000000000005 18.72z'
  return (
    <span className="saras-loader" role="status" aria-label="Loading" style={{ display:'inline-flex', lineHeight:0 }}>
      <svg viewBox="0 0 40 40" width={size} height={size} preserveAspectRatio="xMidYMid meet" style={{ overflow:'visible' }}>
        {track && <path className="track" fill="none" stroke={color} strokeWidth={4} pathLength={100} style={{ opacity:.15 }} d={d} />}
        <path className="car" fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" pathLength={100} d={d} />
      </svg>
    </span>
  )
}

export function AppBootLoader({ label = 'Preparing your console\u2026' }) {
  return (
    <div role="status" aria-live="polite" style={{ position:'fixed', inset:0, zIndex:9999, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:26, background:'radial-gradient(120% 120% at 50% 0%, #0d5aa8 0%, #0a4a8c 55%, #08325f 100%)', animation:'fadeUp .3s ease' }}>
      <div style={{ display:'inline-flex', alignItems:'baseline', gap:8, letterSpacing:'.16em' }}>
        <span style={{ fontSize:25, fontWeight:700, color:'#fff' }}>SARAS</span>
        <span style={{ fontSize:25, fontWeight:700, color:'#F5B301' }}>ONE</span>
      </div>
      <Loader size={66} color="#EAF3FF" />
      <span style={{ fontSize:13, color:'rgba(255,255,255,.78)', letterSpacing:'.03em' }}>{label}</span>
    </div>
  )
}
