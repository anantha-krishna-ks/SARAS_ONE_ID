import React from 'react'
import { buildList } from '../data'
import { GenericList } from './GenericList'

// Resource attributes screen — same UI as the generic list, componentized.
export function Resource({ listSearch, setListSearch, toast }) {
  const list = buildList('resource', listSearch, toast, {})
  return <GenericList key="resource" list={list} listSearch={listSearch} setListSearch={setListSearch} />
}
