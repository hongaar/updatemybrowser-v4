import { fetch } from '../fetch'
import { Document, Slug } from '../types'

// Schema: https://developers.whatismybrowser.com/static/main/api-docs/v2/swagger-ui/
const URL =
  'https://api.whatismybrowser.com/api/v2/software_version_numbers/all'

export type WhatIsMyBrowserSource = Document<'sourceWhatIsMyBrowser'> & {
  description: string
  slug: Slug
  software: string
  platform: string
}

type WhatIsMyBrowserData = {
  version_data: {
    [software: string]: {
      [platform: string]: {
        release_date: string
        update_url: string
        latest_version: string[]
        download_url: string
        package_type: string
      }
    }
  }
}

function fetchData() {
  const key = (process.env.SANITY_STUDIO_WHATISMYBROWSER_TOKEN ||
    process.env.WHATISMYBROWSER_TOKEN) as string

  return fetch<WhatIsMyBrowserData>(URL, {
    headers: {
      'x-api-key': key
    }
  })
}

export async function fetchWhatIsMyBrowser(source: WhatIsMyBrowserSource) {
  const data = await fetchData()

  if (!data.version_data[source.software]) {
    throw new Error(
      `Software ${
        source.software
      } not found in WhatIsMyBrowser data, keys found: ${Object.keys(
        data.version_data
      ).join(', ')}`
    )
  }

  const software = data.version_data[source.software]

  if (!software[source.platform]) {
    throw new Error(
      `Platform ${
        source.platform
      } not found in WhatIsMyBrowser data, keys found: ${Object.keys(
        software
      ).join(', ')}`
    )
  }

  return software[source.platform].latest_version.join('.')
}
