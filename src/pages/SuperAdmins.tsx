import React from 'react'
import { buildList } from '../data'
import { GenericList } from './GenericList'

// Super Admin screen — same UI as the generic list, componentized.
export function SuperAdmins({ listSearch, setListSearch, toast, openEdit, openNew, confirm }) {
  const handlers = {
    edit: (r) => openEdit({
      login: (r[2] && r[2].m ? r[2].m.split('@')[0] : ''), display: r[1],
      email: (r[2] && r[2].m) || '', mobile: r[3], org: r[4], status: (r[5] && r[5].b) || 'Active',
    }),
    add: openNew,
    delete: (r) => confirm({
      danger: true, title: 'Delete super admin?',
      message: '\u201c' + r[1] + '\u201d will permanently lose super administrator access.',
      confirmLabel: 'Delete',
      onConfirm: () => { confirm(null); toast('Super admin \u201c' + r[1] + '\u201d deleted.', 'success') },
    }),
  }
  const list = buildList('superAdmin', listSearch, toast, handlers)
  return <GenericList key="superAdmin" list={list} listSearch={listSearch} setListSearch={setListSearch} />
}
