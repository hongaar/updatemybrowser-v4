import {
  WikipediaSource,
  CanIUseSource,
  WhatIsMyBrowserSource
} from './sources'

export type Document<T = string> = {
  _createdAt: string
  _id: string
  _rev: string
  _type: T
  _updatedAt: string
}

export type Slug = {
  current: string
}

export type Ref = {
  _ref: string
  _type: 'reference'
}

export type Matcher = Document<'matcher'> & {
  description: string
  slug: Slug
  currentVersion: string
  upgradable: Ref
}

export type Updater = Document<'updater'> & {
  description: string
  slug: Slug
  matcher: Ref
  source: Ref
}

export type Source = WikipediaSource | CanIUseSource | WhatIsMyBrowserSource

export type QueryResult = {
  matchers: Matcher[]
  updaters: Updater[]
  sources: Source[]
}
