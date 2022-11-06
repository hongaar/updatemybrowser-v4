import { fetch } from '../fetch'
import { Document, Slug } from '../types'

// See https://github.com/Fyrd/caniuse
const URL = 'https://raw.githubusercontent.com/Fyrd/caniuse/master/data.json'

export type CanIUseSource = Document<'sourceCanIUse'> & {
  description: string
  slug: Slug
  agent: string
}

type CanIUseData = {
  eras: any
  agents: {
    [key: string]: {
      browser: string
      abbr: string
      prefix: string
      type: 'desktop' | 'mobile'
      usage_global: number[]
      versions: Array<string | null>
    }
  }
  statuses: any
  cats: any
  data: any
  updated: number
}

function fetchData() {
  return fetch<CanIUseData>(URL)
}

export async function fetchCanIUse(source: CanIUseSource) {
  const data = await fetchData()

  if (!data.agents[source.agent]) {
    throw new Error(
      `Agent ${
        source.agent
      } not found in CanIUse data, keys found: ${Object.keys(data.agents).join(
        ', '
      )}`
    )
  }

  const versions = data.agents[source.agent].versions

  return versions.filter(item => item !== null).reverse()[0] as string
}
