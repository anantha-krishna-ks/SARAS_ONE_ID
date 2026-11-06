import React, { useState } from 'react'
import { S, Icon, ModalFooter } from '../ui'

export function ConfirmModal({ title, message, confirm, danger, onClose, stop, onConfirm }) {
  const titleId = 'confirm-' + React.useId()
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={titleId + '-m'} style={S.overlay}>
      <div onClick={stop} style={{ ...S.modal, maxWidth:440 }}>
        <div style={{ padding:'26px 26px 22px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:6 }}>
          <span aria-hidden style={{ width:52, height:52, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background: danger ? '#FDECEC' : 'var(--primary-tint)', color: danger ? 'var(--danger)' : 'var(--primary)', marginBottom:6 }}>
            <Icon d={danger ? 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01' : 'M12 16v-4 M12 8h.01 M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z'} size={26} sw={2.2} />
          </span>
          <h3 id={titleId} style={{ fontSize:18, fontWeight:500, margin:0, color:'var(--ink)' }}>{title}</h3>
          <p id={titleId + '-m'} style={{ fontSize:13.6, color:'var(--muted)', margin:0, lineHeight:1.5, maxWidth:320 }}>{message}</p>
        </div>
        <div style={{ ...S.modalFoot, justifyContent:'center' }}><ModalFooter onClose={onClose} onSave={() => { onConfirm(); onClose() }} save={confirm} danger={danger} /></div>
      </div>
    </div>
  )
}
