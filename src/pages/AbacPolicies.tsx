import React from 'react'
import { buildList } from '../data'
import { GenericList } from './GenericList'

// ABAC policies screen — generic list with policy builder wiring.
export function AbacPolicies({ listSearch, setListSearch, toast, openEdit, openView, openNew, openMap, confirm }) {
  const rec = (r, view) => ({ code: (r[0] && r[0].m) || r[0], name: r[1], status: (r[6] && r[6].b) || 'Active', view: !!view })
  const handlers = {
    view: (r) => openView(rec(r, true)),
    edit: (r) => openEdit(rec(r, false)),
    add: openNew,
    toggle: (r) => {
      const active = (r[6] && r[6].b) === 'Active'
      if (active) confirm({
        danger: true, title: 'Deactivate policy?',
        message: '\u201c' + r[1] + '\u201d will stop being evaluated. Access it currently grants or denies will fall back to role privileges.',
        confirmLabel: 'Deactivate',
        onConfirm: () => { confirm(null); toast('Policy \u201c' + r[1] + '\u201d deactivated.', 'success') },
      })
      else toast('Policy \u201c' + r[1] + '\u201d activated.', 'success')
    },
    mapResource: (r) => openMap(rec(r, false)),
    delete: (r) => confirm({
      danger: true, title: 'Delete policy?',
      message: '\u201c' + r[1] + '\u201d and its resource mappings will be permanently removed. This cannot be undone.',
      confirmLabel: 'Delete',
      onConfirm: () => { confirm(null); toast('Policy \u201c' + r[1] + '\u201d deleted.', 'success') },
    }),
  }
  const list = buildList('abacPolicies', listSearch, toast, handlers)
  return <GenericList key="abacPolicies" list={list} listSearch={listSearch} setListSearch={setListSearch} />
}
