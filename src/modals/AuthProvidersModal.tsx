import React, { useState } from 'react'
import { Modal, ModalFooter, MiniSwitch, Icon } from '../ui'

export function AuthProvidersModal({ tenant, onClose, stop, toast }) {
  const groups = [
    { k:'local', label:'Local Authentication', desc:'Username and password accounts managed in SARAS One.', icon:'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0', providers:[] },
    { k:'social', label:'Social Authentication', desc:'Sign in with consumer identity providers.', icon:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75', providers:['Microsoft', 'Google', 'Meta', 'Apple'] },
    { k:'ent', label:'Enterprise Federation', desc:'Federated single sign-on for workforce identity.', icon:'M3 21h18 M5 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16 M9 7h4 M9 11h4 M9 15h4', providers:['Microsoft Entra ID', 'Okta', 'SAML 2.0'] },
  ]
  const [state, setState] = useState({ local:true, social:true, ent:false, 'Microsoft':true, 'Google':true, 'Meta':false, 'Apple':false, 'Microsoft Entra ID':false, 'Okta':false, 'SAML 2.0':false })
  const flip = (k) => setState(s => ({ ...s, [k]:!s[k] }))
  const initials = { 'Microsoft':'MS', 'Google':'G', 'Meta':'M', 'Apple':'A', 'Microsoft Entra ID':'ME', 'Okta':'OK', 'SAML 2.0':'SA' }
  const save = () => { onClose(); toast('Authentication providers updated for ' + tenant.name + '.', 'success') }
  return (
    <Modal title={'Authentication providers \u2014 ' + tenant.name} desc="Choose how accounts in this tenant can sign in." onClose={onClose} stop={stop} width={640} footer={<ModalFooter onClose={onClose} onSave={save} save="Save providers" />}>
      <div style={{ maxHeight:'min(64vh, 620px)', overflowY:'auto', padding:'20px 24px 24px', display:'flex', flexDirection:'column', gap:16 }}>
        {groups.map(g => {
          const on = !!state[g.k]
          const enabledCount = g.providers.filter(p => state[p]).length
          return (
            <section key={g.k} aria-label={g.label} style={{ flex:'none', border:'1.5px solid ' + (on ? 'var(--border-blue)' : 'var(--border)'), borderRadius:14, background:'var(--surface)', overflow:'hidden', boxShadow: on ? '0 2px 8px -4px rgba(16,42,84,.12)' : 'none', opacity: on ? 1 : .78, transition:'all .2s ease' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:14, padding:'15px 18px', background: on ? 'linear-gradient(180deg, var(--primary-tint), rgba(230,240,252,.4))' : 'var(--surface-page)', transition:'background .2s ease' }}>
                <span style={{ display:'flex', alignItems:'center', gap:13, minWidth:0 }}>
                  <span style={{ display:'inline-flex', width:40, height:40, borderRadius:10, alignItems:'center', justifyContent:'center', flex:'none', background: on ? 'var(--primary)' : '#DCE2EC', color: on ? '#fff' : 'var(--muted)', transition:'all .2s ease' }}><Icon d={g.icon} size={18} sw={1.9} /></span>
                  <span style={{ display:'flex', flexDirection:'column', gap:2, minWidth:0 }}>
                    <span style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontSize:14.8, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap' }}>{g.label}</span>
                      {g.providers.length > 0 && on && <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:999, background:'#fff', border:'1px solid var(--border-blue)', color:'var(--primary)', whiteSpace:'nowrap' }}>{enabledCount + ' of ' + g.providers.length + ' on'}</span>}
                      {!on && <span style={{ fontSize:11, fontWeight:700, padding:'2px 8px', borderRadius:999, background:'#EEF1F6', color:'var(--muted)', whiteSpace:'nowrap' }}>Off</span>}
                    </span>
                    <span style={{ fontSize:12.2, color:'var(--muted)' }}>{g.desc}</span>
                  </span>
                </span>
                <MiniSwitch on={on} onToggle={() => flip(g.k)} label={g.label} />
              </div>
              {g.providers.length > 0 && on && <div style={{ borderTop:'1px solid var(--border)', background:'var(--surface)', padding:'6px 10px 10px' }}>
                {g.providers.map(p => (
                  <div key={p} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, padding:'9px 8px 9px 10px', borderRadius:9, marginTop:4, background: state[p] ? 'var(--surface)' : 'var(--surface-page)', border:'1px solid ' + (state[p] ? 'var(--border)' : 'transparent'), transition:'all .15s ease' }}>
                    <span style={{ display:'flex', alignItems:'center', gap:11, minWidth:0 }}>
                      <span aria-hidden style={{ display:'inline-flex', width:32, height:32, borderRadius:8, alignItems:'center', justifyContent:'center', fontSize:11.5, fontWeight:700, flex:'none', background: state[p] ? 'var(--primary-tint)' : '#EEF1F6', border:'1px solid ' + (state[p] ? 'var(--border-blue)' : 'var(--border)'), color: state[p] ? 'var(--primary)' : 'var(--muted)', transition:'all .15s ease' }}>{initials[p]}</span>
                      <span style={{ display:'flex', flexDirection:'column', gap:0, minWidth:0 }}>
                        <span style={{ fontSize:13.8, fontWeight:600, color:'var(--ink)', whiteSpace:'nowrap' }}>{p}</span>
                        <span style={{ fontSize:11.4, fontWeight:600, color: state[p] ? '#2E9E6B' : 'var(--muted)' }}>{state[p] ? 'Enabled' : 'Disabled'}</span>
                      </span>
                    </span>
                    <MiniSwitch on={!!state[p]} onToggle={() => flip(p)} label={p} />
                  </div>
                ))}
              </div>}
            </section>
          )
        })}
      </div>
    </Modal>
  )
}
