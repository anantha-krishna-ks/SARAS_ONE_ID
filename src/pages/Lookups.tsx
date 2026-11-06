import React from 'react'
import { buildList } from '../data'
import { GenericList } from './GenericList'

// Lookups screen — same UI as the generic list, componentized.
export function Lookups({ listSearch, setListSearch, toast, openEdit, openNew, confirm }) {
  const handlers = {
    edit: (r) => openEdit({ code: (r[0] && r[0].m) || '', name: r[1], desc: r[2], status: (r[3] && r[3].b) || 'Active' }),
    add: openNew,
    toggle: (r) => {
      const active = (r[3] && r[3].b) === 'Active'
      if (active) confirm({
        danger: true, title: 'Deactivate lookup?',
        message: '\u201c' + r[1] + '\u201d will no longer be available for selection across the console.',
        confirmLabel: 'Deactivate',
        onConfirm: () => { confirm(null); toast('Lookup \u201c' + r[1] + '\u201d deactivated.', 'success') },
      })
      else toast('Lookup \u201c' + r[1] + '\u201d activated.', 'success')
    },
  }
  const list = buildList('lookups', listSearch, toast, handlers)
  return <GenericList key="lookups" list={list} listSearch={listSearch} setListSearch={setListSearch} />
}
