import React from 'react'
import { buildList } from '../data'
import { GenericList } from './GenericList'

// Navigation Flow screen — page navigation trail by session and account, componentized.
export function NavigationFlow({ listSearch, setListSearch, toast }) {
  const list = buildList('navFlow', listSearch, toast, {})
  return <GenericList key="navFlow" list={list} listSearch={listSearch} setListSearch={setListSearch} />
}
