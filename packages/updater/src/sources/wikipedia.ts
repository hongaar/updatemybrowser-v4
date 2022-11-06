import parser from 'fast-xml-parser'

import { fetch } from '../fetch'
import { Document, Slug } from '../types'

// See https://en.wikipedia.org/w/api.php?action=help&modules=parse
const URL =
  'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=parsetree'

// const CORS_PROXY_URL = 'https://crossorigin.me/'
const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/'

export type WikipediaSource = Document<'sourceWikipedia'> & {
  description: string
  slug: Slug
  pageId: string
  field: string
}

type WikipediaData = {
  parse: {
    title: string
    pageid: number
    parsetree: {
      '*': string
    }
  }
}

function isNode() {
  if (typeof process === 'object') {
    if (typeof process.versions === 'object') {
      if (typeof process.versions.node !== 'undefined') {
        return true
      }
    }
  }
}

function getCorsProxyUrl(url: string) {
  return isNode() ? url : `${CORS_PROXY_URL}${url}`
}

function fetchData(pageId: string) {
  const url = `${URL}&pageid=${pageId}`

  return fetch<WikipediaData>(getCorsProxyUrl(url))
}

function findField(data: any, field: string) {
  // Do we have a field?
  if (data.name && data.value && data.name === field) {
    return data.value
  }

  if (Array.isArray(data)) {
    let found
    data.some(item => {
      const iterVal = findField(item, field)
      if (iterVal) {
        found = iterVal
        return true
      }
      return false
    })
    return found
  }

  if (typeof data === 'object') {
    let found
    Object.keys(data).some(key => {
      const iterVal = findField(data[key], field)
      if (iterVal) {
        found = iterVal
        return true
      }
      return false
    })
    return found
  }
}

export async function fetchWikipedia(source: WikipediaSource) {
  const data = await fetchData(source.pageId)
  const xmlData = data.parse.parsetree['*']
  const parsedData = parser.parse(xmlData)

  const version = findField(parsedData, source.field)

  if (!version) {
    throw new Error(
      `Field ${source.field} not found in XML:\n${JSON.stringify(
        parsedData,
        undefined,
        2
      )}`
    )
  }

  return version as string
}
