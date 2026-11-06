import React from 'react'
import { buildList } from '../data'
import { GenericList } from './GenericList'

// Application Clients screen — same UI as the generic list, componentized.
export function AppClients({ listSearch, setListSearch, toast, openEdit }) {
  const handlers = {
    edit: (r) => openEdit({ code: r[0], name: r[1], status: (r[2] && r[2].b) || 'Active' }),
  }
  const list = buildList('appClients', listSearch, toast, handlers)
  return <GenericList key="appClients" list={list} listSearch={listSearch} setListSearch={setListSearch} />
}
