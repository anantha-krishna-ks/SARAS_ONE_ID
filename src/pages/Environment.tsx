import React from 'react'
import { buildList } from '../data'
import { GenericList } from './GenericList'

// Environment attributes screen — same UI as the generic list, componentized.
export function Environment({ listSearch, setListSearch, toast }) {
  const list = buildList('environment', listSearch, toast, {})
  return <GenericList key="environment" list={list} listSearch={listSearch} setListSearch={setListSearch} />
}
