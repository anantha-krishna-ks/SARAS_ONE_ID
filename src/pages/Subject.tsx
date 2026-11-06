import React from 'react'
import { buildList } from '../data'
import { GenericList } from './GenericList'

// Subject attributes screen — same UI as the generic list, componentized.
export function Subject({ listSearch, setListSearch, toast }) {
  const list = buildList('subject', listSearch, toast, {})
  return <GenericList key="subject" list={list} listSearch={listSearch} setListSearch={setListSearch} />
}
